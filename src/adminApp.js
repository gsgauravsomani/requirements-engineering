const data = window.WELKOLN_DATA;

const MODERATION_QUEUE_KEY = "welkoln_moderation_queue";

function saveModerationQueue(queue) {
  try {
    localStorage.setItem(MODERATION_QUEUE_KEY, JSON.stringify(queue));
  } catch (e) {
    // localStorage unavailable (e.g. restrictive file:// policy) - falls back to static seed data
  }
}

function loadModerationQueue() {
  try {
    const stored = localStorage.getItem(MODERATION_QUEUE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    // fall through to seed data
  }
  saveModerationQueue(data.admin.moderationQueue);
  return data.admin.moderationQueue;
}

data.admin.moderationQueue = loadModerationQueue();

const ADMIN_CREDENTIALS = { username: "admin.cologne", password: "cologne2026" };

const adminState = {
  screen: "adminLogin",
  toast: "",
  selectedUserId: null,
};

const adminAppEl = document.querySelector("#adminApp");

function exitAdminMode() {
  window.location.href = "index.html";
}

function setAdminScreen(screen) {
  adminState.screen = screen;
  adminState.toast = "";
  adminState.selectedUserId = null;
  adminRender();
}

function showAdminToast(message) {
  adminState.toast = message;
  adminRender();
}

function adminLogin() {
  const username = document.getElementById("adminUsername").value.trim();
  const password = document.getElementById("adminPassword").value.trim();

  if (!username || !password) {
    showAdminToast("Please enter both username and password.");
    return;
  }
  if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
    showAdminToast("Invalid admin username or password.");
    return;
  }

  adminState.screen = "adminDashboard";
  adminState.toast = `Logged in as Admin (${username})`;
  adminRender();
}

function viewUserDetails(id) {
  adminState.selectedUserId = id;
  adminState.toast = "";
  adminRender();
}

function closeUserDetails() {
  adminState.selectedUserId = null;
  adminRender();
}

function userDetailPanel() {
  const user = data.admin.users.find((u) => u.id === adminState.selectedUserId);
  if (!user) return "";

  const allowed = user.flagged || user.consented;

  if (!allowed) {
    return `
      <article class="admin-card flag">
        <span>Restricted</span>
        <p>${user.name} has not granted admin profile access, and no fraud/suspicious-activity flag is present.</p>
        <small>Per privacy policy, personal details cannot be shown.</small>
        <div class="admin-actions">
          <button class="admin-secondary" onclick="closeUserDetails()">Close</button>
        </div>
      </article>
    `;
  }

  return `
    <article class="admin-card">
      <span>${user.flagged ? "Shown via fraud/suspicious-activity flag override" : "Shown - user granted admin access"}</span>
      <h2>${user.name}</h2>
      <p class="admin-muted">${user.role} - joined ${user.joined} - last active ${user.lastActive}</p>
      <p class="admin-muted">Email: ${user.email}</p>
      <p class="admin-muted">Location: ${user.location}</p>
      ${user.flagged ? `<p class="admin-muted">Flag reason: ${user.flagReason}</p>` : ""}
      <div class="admin-actions">
        <button class="admin-secondary" onclick="closeUserDetails()">Close</button>
      </div>
    </article>
  `;
}

function resolveModeration(id, action) {
  const idx = data.admin.moderationQueue.findIndex((m) => m.id === id);
  if (idx === -1) return;
  const item = data.admin.moderationQueue[idx];
  data.admin.moderationQueue.splice(idx, 1);
  saveModerationQueue(data.admin.moderationQueue);
  showAdminToast(`${item.type} ${action === "approve" ? "approved and restored" : "removed"}.`);
}

function adminShellWrap(content, activeTab) {
  return `
    <header class="admin-topbar">
      <div class="admin-brand">
        <img src="assets/welkoln-logo.svg" alt="" />
        <div>
          <span class="admin-eyebrow">WelKoln</span>
          <strong>Admin dashboard</strong>
        </div>
      </div>
      <nav class="admin-nav">
        <button class="${activeTab === "dashboard" ? "active" : ""}" onclick="setAdminScreen('adminDashboard')">Dashboard</button>
        <button class="${activeTab === "users" ? "active" : ""}" onclick="setAdminScreen('adminUsers')">Users</button>
        <button class="${activeTab === "moderation" ? "active" : ""}" onclick="setAdminScreen('adminModeration')">Moderation</button>
      </nav>
      <button class="admin-exit" onclick="exitAdminMode()">Exit to app</button>
    </header>
    <section class="admin-content">
      ${adminState.toast ? `<div class="admin-toast">${adminState.toast}</div>` : ""}
      ${content}
    </section>
  `;
}

function adminLoginScreen() {
  return `
    <section class="admin-login">
      <img src="assets/welkoln-logo.svg" alt="" class="admin-login-logo" />
      <p class="admin-eyebrow">Secure access</p>
      <h1>WelKoln Admin</h1>
      <p class="admin-muted">Operational dashboard for the City of Cologne team. Kept separate from the shared Traveller/Business app.</p>
      ${adminState.toast ? `<div class="admin-toast">${adminState.toast}</div>` : ""}
      <div class="admin-field">
        <label>Admin username</label>
        <input id="adminUsername" type="text" placeholder="e.g. admin.cologne" />
      </div>
      <div class="admin-field">
        <label>Password</label>
        <input id="adminPassword" type="password" placeholder="********" />
      </div>
      <button class="admin-primary" onclick="adminLogin()">Log in as Admin</button>
      <button class="admin-link" onclick="exitAdminMode()">Back to traveller / business app</button>
    </section>
  `;
}

function adminDashboardScreen() {
  const health = data.admin.systemHealth;
  const flaggedUsers = data.admin.users.filter((u) => u.flagged).length;
  return adminShellWrap(`
    <h1>Platform overview</h1>
    <div class="admin-grid">
      <article class="admin-card">
        <span>Active users</span>
        <strong>${health.activeUsers}</strong>
        <small>Last 24 hours</small>
      </article>
      <article class="admin-card">
        <span>System uptime</span>
        <strong>${health.uptime}</strong>
        <small>Target: 99% over 30 days</small>
      </article>
      <article class="admin-card warn">
        <span>Flagged content</span>
        <strong>${data.admin.moderationQueue.length}</strong>
        <small>Awaiting moderation</small>
      </article>
      <article class="admin-card warn">
        <span>Fraud flags</span>
        <strong>${flaggedUsers}</strong>
        <small>User accounts under review</small>
      </article>
    </div>
    <div class="admin-actions">
      <button class="admin-primary" onclick="setAdminScreen('adminModeration')">Open moderation queue</button>
      <button class="admin-secondary" onclick="setAdminScreen('adminUsers')">Manage users</button>
    </div>
  `, "dashboard");
}

function adminUsersScreen() {
  return adminShellWrap(`
    <h1>Manage users</h1>
    <table class="admin-table">
      <thead>
        <tr><th>Name</th><th>Role</th><th>Consent</th><th>Status</th><th></th></tr>
      </thead>
      <tbody>
        ${data.admin.users.map(u => `
          <tr>
            <td>${u.name}</td>
            <td>${u.role}</td>
            <td>${u.consented ? "Granted" : "Not granted"}</td>
            <td>${u.flagged ? '<span class="admin-badge warn">Flagged</span>' : '<span class="admin-badge ok">Normal</span>'}</td>
            <td><button class="admin-secondary" onclick="viewUserDetails(${u.id})">View details</button></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    ${adminState.selectedUserId ? userDetailPanel() : ""}
    <p class="admin-muted">Admins can only view personal details when a user has granted admin access, or when a fraud/suspicious-activity flag is present.</p>
  `, "users");
}

function adminModerationScreen() {
  const queue = data.admin.moderationQueue;
  return adminShellWrap(`
    <h1>Moderation queue</h1>
    ${
      queue.length === 0
        ? `<p class="admin-muted">No flagged content right now. New reports will appear here.</p>`
        : queue.map(item => `
          <article class="admin-card flag">
            <span>${item.type} - ${item.involved}</span>
            <p>"${item.content}"</p>
            <small>${item.reason}</small>
            <div class="admin-actions">
              <button class="admin-primary" onclick="resolveModeration('${item.id}', 'approve')">Approve</button>
              <button class="admin-secondary" onclick="resolveModeration('${item.id}', 'remove')">Remove</button>
            </div>
          </article>
        `).join("")
    }
  `, "moderation");
}

function adminRender() {
  const screens = {
    adminLogin: adminLoginScreen,
    adminDashboard: adminDashboardScreen,
    adminUsers: adminUsersScreen,
    adminModeration: adminModerationScreen,
  };
  adminAppEl.innerHTML = screens[adminState.screen]();
}

adminRender();
