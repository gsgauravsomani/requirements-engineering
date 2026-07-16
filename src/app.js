const data = window.WELKOLN_DATA;

const state = {
  screen: "login",
  role: null,
  pendingRole: null,
  currentUser: JSON.parse(localStorage.getItem("welkolnUser") || "null"),
  selectedPlace: data.places[0],
  selectedPlan: data.plans[0],
  bookingStatus: "pending",
  planJoinStatus: {},
  reviewDraft: { rating: 0, text: "" },
  reviewSubmitted: false,
  newPlanVisibility: "public",
  transportOrigin: "Cologne Cathedral",
  transportDestination: "Ehrenfeld",
  reportedPlans: {},
  toast: "",
};

const app = document.querySelector("#app");

const MODERATION_QUEUE_KEY = "welkoln_moderation_queue";

function saveModerationQueue(queue) {
  try {
    localStorage.setItem(MODERATION_QUEUE_KEY, JSON.stringify(queue));
  } catch (e) {
    // localStorage unavailable (e.g. restrictive file:// policy) - report still works within this page session
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

function setScreen(screen) {
  state.screen = screen;
  state.toast = "";
  render();
}

function showToast(message) {
  state.toast = message;
  render();
}

function login(role, toastOverride) {
  state.role = role;
  state.currentUser = role === "business" ? data.demoUsers.business : data.demoUsers.traveller;
  localStorage.setItem("welkolnUser", JSON.stringify(state.currentUser));
  state.screen = role === "business" ? "business" : "home";
  state.toast = toastOverride || (role === "business" ? "Logged in as Business" : "Location consent active near Cologne Cathedral");
  render();
}

function startRegistration(role) {
  state.pendingRole = role;
  state.screen = role === "business" ? "registerBusiness" : "registerTraveller";
  state.toast = "";
  render();
}

function saveRegistration(event, role) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const user = Object.fromEntries(formData.entries());
  const { password, ...storedUser } = user;

  state.role = role;
  state.pendingRole = role;
  state.currentUser = { ...storedUser, role };
  localStorage.setItem("welkolnUser", JSON.stringify(state.currentUser));
  state.screen = "consent";
  state.toast = "";
  render();
}

function finishConsent() {
  if (state.role === "business" && state.currentUser) {
    Object.assign(data.business, {
      name: state.currentUser.businessName || data.business.name,
      address: state.currentUser.address || data.business.address,
      openingHours: state.currentUser.openingHours || data.business.openingHours,
      type: state.currentUser.businessType || data.business.type,
      description: state.currentUser.description || data.business.description,
    });
  }
  state.screen = state.role === "business" ? "business" : "home";
  state.toast = state.role === "business"
    ? "Business account created"
    : "Traveller account created. Location consent active.";
  render();
}

function bookPlace() {
  const place = state.selectedPlace;
  if (place.slotStatus === "available") {
    state.bookingStatus = "confirmed";
    showToast(`Booking confirmed at ${place.name}. Confirmation sent.`);
  } else {
    state.bookingStatus = "pending";
    showToast(`Waitlist request sent to ${place.name}.`);
  }
}

function acceptBooking() {
  state.bookingStatus = "accepted";
  showToast("Booking accepted. Alex receives confirmation.");
}

function rejectBooking() {
  state.bookingStatus = "rejected";
  showToast("Request rejected and traveller notified");
}

function openPlan(id) {
  state.selectedPlan = data.plans.find((p) => p.id === id) || state.selectedPlan;
  setScreen("planDetail");
}

function reportPlan() {
  const plan = state.selectedPlan;
  const queue = loadModerationQueue();
  queue.push({
    id: `report-${plan.id}-${queue.length + 1}`,
    type: "PlanShare post",
    involved: plan.creator || "Unknown",
    content: plan.title,
    reason: "Flagged by a traveller as inappropriate or spam",
  });
  saveModerationQueue(queue);
  state.reportedPlans[plan.id] = true;
  showToast("Plan reported. It now appears in the Admin moderation queue.");
}

function requestPlan() {
  state.planJoinStatus[state.selectedPlan.id] = "pending";
  showToast("Join request sent to the plan creator");
}

function acceptPlan() {
  state.planJoinStatus[state.selectedPlan.id] = "joined";
  showToast("Plan joined. Update sent within 60 seconds.");
}

function setVisibility(value) {
  state.newPlanVisibility = value;
  document.getElementById("visPublic").classList.toggle("active", value === "public");
  document.getElementById("visPrivate").classList.toggle("active", value === "private");
}

function publishPlan() {
  const title = document.getElementById("planTitle").value.trim();
  const description = document.getElementById("planDescription").value.trim();
  const location = document.getElementById("planLocation").value.trim();
  const date = document.getElementById("planDate").value.trim();
  const time = document.getElementById("planTime").value.trim();

  if (!title || !description || !location || !date || !time) {
    showToast("Please fill in title, description, location, date, and time.");
    return;
  }

  const plan = {
    id: `plan-${data.plans.length + 1}`,
    title,
    description,
    location,
    place: location,
    time: `${date}, ${time}`,
    creator: state.currentUser?.name || state.currentUser?.businessName || (state.role === "business" ? data.user.business : data.user.traveller),
    people: "1 joined",
    status: state.newPlanVisibility === "private" ? "Private" : "Open to join",
  };
  data.plans.unshift(plan);
  state.selectedPlan = plan;
  state.newPlanVisibility = "public";
  setScreen("planDetail");
  showToast("Plan published");
}

function startReview() {
  state.reviewDraft = { rating: 0, text: "" };
  state.reviewSubmitted = false;
  setScreen("review");
}

function setRating(n) {
  const textEl = document.getElementById("reviewText");
  if (textEl) state.reviewDraft.text = textEl.value;
  state.reviewDraft.rating = n;
  render();
}

function submitReview() {
  const textEl = document.getElementById("reviewText");
  const text = textEl ? textEl.value.trim() : state.reviewDraft.text.trim();
  state.reviewDraft.text = text;

  if (!state.reviewDraft.rating) {
    showToast("Please select a star rating.");
    return;
  }
  if (text.length < 10 || text.length > 1000) {
    showToast("Review must be between 10 and 1000 characters.");
    return;
  }

  state.reviewSubmitted = true;
  showToast("Review published and visible to travellers within 60 seconds.");
}

function setTransportOrigin(value) {
  state.transportOrigin = value;
  if (state.transportDestination === value) {
    state.transportDestination = data.transport.stops.find((s) => s !== value);
  }
  render();
}

function setTransportDestination(value) {
  state.transportDestination = value;
  render();
}

function publishReply() {
  const textEl = document.getElementById("replyText");
  const text = textEl ? textEl.value.trim() : "";
  if (!text) {
    showToast("Please write a reply before publishing.");
    return;
  }
  data.reviews[0].reply = text;
  showToast("Reply published and visible to travellers");
}

function shell(content, nav = true) {
  return `
    <header class="app-header">
      <button class="icon-button" onclick="setScreen('${state.role === "business" ? "business" : "home"}')" aria-label="Home">
        <img src="assets/welkoln-logo.svg" alt="" />
      </button>
      <div>
        <span class="tiny">${state.role === "business" ? "Business section" : "Traveller section"}</span>
        <strong>WelKoln</strong>
      </div>
      <button class="pill-button" onclick="setScreen('login')">Switch</button>
    </header>
    <section class="content">
      ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
      ${content}
    </section>
    ${nav ? bottomNav() : ""}
  `;
}

function bottomNav() {
  if (state.role === "business") {
    return `
      <nav class="bottom-nav">
        <button onclick="setScreen('business')" class="${state.screen === "business" ? "active" : ""}">Dash</button>
        <button onclick="setScreen('waitlist')" class="${state.screen === "waitlist" ? "active" : ""}">Waitlist</button>
        <button onclick="setScreen('businessReviews')" class="${state.screen === "businessReviews" ? "active" : ""}">Reviews</button>
      </nav>
    `;
  }

  return `
    <nav class="bottom-nav">
      <button onclick="setScreen('home')" class="${state.screen === "home" ? "active" : ""}">Home</button>
      <button onclick="setScreen('explore')" class="${state.screen === "explore" ? "active" : ""}">Explore</button>
      <button onclick="setScreen('plans')" class="${state.screen === "plans" ? "active" : ""}">Plans</button>
      <button onclick="setScreen('profile')" class="${state.screen === "profile" ? "active" : ""}">Profile</button>
    </nav>
  `;
}

function loginScreen() {
  return `
    <section class="login-screen">
      <img src="assets/welkoln-logo.svg" alt="WelKoln logo" class="login-logo" />
      <p class="eyebrow">Cologne in one app</p>
      <h2>Plan, move, book, and meet.</h2>
      <p class="muted">Traveller and Business use the same app. The role selected here opens the right section.</p>
      <div class="login-group">
        <div class="section-kicker">Demo login</div>
        <div class="role-grid">
          <button onclick="login('traveller')" class="role-card">
            <span>Traveller demo</span>
            <strong>Alex Gonzales</strong>
            <small>Explore, book, join plans</small>
          </button>
          <button onclick="login('business')" class="role-card">
            <span>Business demo</span>
            <strong>Maria Muller</strong>
            <small>Manage waitlist and replies</small>
          </button>
        </div>
      </div>
      <div class="login-group">
        <div class="section-kicker">Create account</div>
        <div class="role-grid compact">
          <button onclick="startRegistration('traveller')" class="role-card">
            <span>Traveller</span>
            <strong>Register as visitor</strong>
            <small>Name, username, email, password, age, nationality</small>
          </button>
          <button onclick="startRegistration('business')" class="role-card">
            <span>Business</span>
            <strong>Register a business</strong>
            <small>Business details, address, opening hours</small>
          </button>
        </div>
      </div>
      <p class="register-links">
        Administrator? <a href="admin.html">Admin login</a>
      </p>
    </section>
  `;
}

function registerTravellerScreen() {
  return authShell(`
    <form class="form-card" onsubmit="saveRegistration(event, 'traveller')">
      <div>
        <p class="eyebrow">Traveller account</p>
        <h2>Your details</h2>
        <p class="muted">Registration takes less than 3 minutes.</p>
      </div>
      <label>Name<input name="name" value="Alex Gonzales" required /></label>
      <label>Username<input name="username" value="alex.dom" required /></label>
      <label>Email<input name="email" type="email" value="alex@example.com" required /></label>
      <label>Password<input name="password" type="password" value="welkoln-demo" required /></label>
      <label>Age<input name="age" type="number" min="13" value="23" required /></label>
      <label>Nationality<input name="nationality" value="Mexican" required /></label>
      <div class="action-row">
        <button type="button" onclick="setScreen('login')">Back</button>
        <button class="primary" type="submit">Continue</button>
      </div>
    </form>
  `);
}

function registerBusinessScreen() {
  return authShell(`
    <form class="form-card" onsubmit="saveRegistration(event, 'business')">
      <div>
        <p class="eyebrow">Business account</p>
        <h2>Business details</h2>
      </div>
      <label>Business name<input name="businessName" value="Maria's Altstadt Cafe" required /></label>
      <label>Owner/legal name<input name="ownerName" value="Maria Muller" required /></label>
      <label>Email<input name="email" type="email" value="maria@example.com" required /></label>
      <label>Password<input name="password" type="password" value="welkoln-demo" required /></label>
      <label>Address<input name="address" value="Alter Markt 12, Cologne" required /></label>
      <label>Business type
        <select name="businessType" required>
          <option>Cafe</option>
          <option>Restaurant</option>
          <option>Hotel</option>
          <option>Museum</option>
          <option>Cinema</option>
          <option>Club</option>
          <option>Tourism service</option>
        </select>
      </label>
      <label>Opening hours<input name="openingHours" value="08:00-22:00" required /></label>
      <label>License number<input name="licenseNumber" value="CGN-CAFE-2042" required /></label>
      <label>Description<textarea name="description" required>Small cafe near the Cathedral with easy waitlist booking.</textarea></label>
      <div class="action-row">
        <button type="button" onclick="setScreen('login')">Back</button>
        <button class="primary" type="submit">Continue</button>
      </div>
    </form>
  `);
}

function consentScreen() {
  const isBusiness = state.role === "business";
  return authShell(`
    <section class="form-card">
      <div>
        <p class="eyebrow">${isBusiness ? "Business" : "Traveller"} consent</p>
        <h2>Privacy settings</h2>
        <p class="muted">These can be changed later in Profile.</p>
      </div>
      <label class="toggle-row">
        <span class="toggle-icon">📍</span>
        <span>Location access</span>
        <input type="checkbox" checked />
      </label>
      <label class="toggle-row">
        <span class="toggle-icon">👤</span>
        <span>Profile data</span>
        <input type="checkbox" checked />
      </label>
      <label class="toggle-row">
        <span class="toggle-icon">📅</span>
        <span>Booking and activity data</span>
        <input type="checkbox" checked />
      </label>
      <label class="toggle-row">
        <span class="toggle-icon">🤝</span>
        <span>PlanShare visibility</span>
        <input type="checkbox" ${isBusiness ? "" : "checked"} />
      </label>
      <label class="toggle-row">
        <span class="toggle-icon">🔒</span>
        <span>Allow admin access when needed</span>
        <input type="checkbox" />
      </label>
      <button class="primary" onclick="finishConsent()">Create account</button>
    </section>
  `);
}

function authShell(content) {
  return `
    <section class="login-screen auth-flow">
      <img src="assets/welkoln-logo.svg" alt="WelKoln logo" class="auth-logo" />
      ${content}
    </section>
  `;
}

function homeScreen() {
  const userName = state.currentUser?.name || data.demoUsers.traveller.name;
  return shell(`
    <section class="hero-card">
      <p class="tiny">Welcome back, ${userName}</p>
      <h2>Cologne Cathedral</h2>
      <p>${data.transport.message}. ${data.transport.nextRoute}.</p>
      <button onclick="setScreen('explore')" class="primary">Explore nearby</button>
    </section>
    ${mapCard()}
    <div class="two-cards">
      ${infoCard("Weather", `${data.weather.temp}, rain ${data.weather.rain}`, data.weather.updated, "", "teal")}
      ${infoCard("Transport", data.transport.line, data.transport.updated)}
    </div>
    <button class="wide-button secondary" onclick="setScreen('transport')">View full transport schedule</button>
    <section class="list-section">
      <div class="section-title">
        <h3>Recommended within 500 m</h3>
        <button onclick="setScreen('explore')">See all</button>
      </div>
      ${placeCard(data.places[0])}
      ${placeCard(data.places[1])}
    </section>
  `);
}

function exploreScreen() {
  return shell(`
    <div class="search-box">Search attractions, cafes, museums...</div>
    <div class="chips">
      <button class="chip active">Near me</button>
      <button class="chip">Open now</button>
      <button class="chip">Indoor</button>
      <button class="chip">Available</button>
    </div>
    ${mapCard()}
    <section class="list-section">
      <h3>Results around the Dom</h3>
      ${data.places.map(placeCard).join("")}
    </section>
  `);
}

function placeDetailScreen() {
  const place = state.selectedPlace;
  const isFull = place.slotStatus === "full";

  let availabilityLabel = place.availability;
  let availabilityTone = "";
  if (state.bookingStatus === "confirmed" || state.bookingStatus === "accepted") {
    availabilityLabel = "Confirmed";
    availabilityTone = "ok";
  } else if (state.bookingStatus === "pending") {
    availabilityLabel = "Pending waitlist";
  } else if (state.bookingStatus === "rejected") {
    availabilityLabel = "Request rejected";
    availabilityTone = "bad";
  } else if (isFull) {
    availabilityLabel = "Fully booked";
    availabilityTone = "warn";
  }

  const canBook = state.bookingStatus === "none" || state.bookingStatus === "rejected";
  const actionButton = canBook
    ? `<button class="primary" onclick="bookPlace()">${isFull ? "Join waitlist" : "Book now"}</button>`
    : `<button class="primary" disabled>${state.bookingStatus === "pending" ? "Waitlist pending" : "Booking confirmed"}</button>`;

  return shell(`
    <button class="back-button" onclick="setScreen('explore')">Back to results</button>
    <section class="detail-hero">
      <span>${place.type}</span>
      <h2>${place.name}</h2>
      <p>${place.distance} from you - ${place.weather}</p>
    </section>
    <div class="two-cards">
      ${infoCard("Rating", `${place.rating} stars`, "Recent traveller reviews", "", "amber")}
      ${infoCard("Availability", availabilityLabel, place.price, availabilityTone)}
    </div>
    <section class="route-card">
      <h3>Route context</h3>
      <p>${data.transport.nextRoute}. ${data.transport.message}.</p>
    </section>
    <div class="action-row">
      ${actionButton}
      <button onclick="setScreen('plans')">Add to plan</button>
    </div>
    <button class="wide-button secondary" onclick="startReview()">Write review</button>
  `);
}

function plansScreen() {
  return shell(`
    <div class="section-title">
      <h2>PlanShare</h2>
      <button onclick="setScreen('createPlan')">Create</button>
    </div>
    ${data.plans.map(plan => `
      <article class="plan-card">
        <span>${plan.status}</span>
        <h3>${plan.title}</h3>
        <p>${plan.place} - ${plan.time}</p>
        <small>${plan.people}</small>
        <button class="primary" onclick="openPlan('${plan.id}')">View plan</button>
      </article>
    `).join("")}
  `);
}

function planDetailScreen() {
  const plan = state.selectedPlan;
  const joinStatus = state.planJoinStatus[plan.id] || "not_joined";
  const joinAction =
    joinStatus === "joined"
      ? `<div class="reply-box">You're in. This plan now appears on your Plans page.</div>`
      : joinStatus === "pending"
        ? `
          <p class="muted note">Request pending - waiting for ${plan.creator || "the plan creator"} to respond.</p>
          <button class="wide-button secondary" onclick="acceptPlan()">Check for response</button>
        `
        : `<button class="primary wide-button" onclick="requestPlan()">Request to join</button>`;

  return shell(`
    <button class="back-button" onclick="setScreen('plans')">Back to plans</button>
    <section class="detail-hero">
      <span>${plan.status}</span>
      <h2>${plan.title}</h2>
      <p>${plan.place} - ${plan.time}</p>
    </section>
    <section class="route-card">
      <h3>About this plan</h3>
      <p>${plan.description || "No description provided."}</p>
      <p class="muted">Created by ${plan.creator || "a traveller"} - ${plan.people}</p>
    </section>
    ${joinAction}
    ${
      state.reportedPlans[plan.id]
        ? `<button class="wide-button secondary" disabled>Reported - pending moderation</button>`
        : `<button class="wide-button secondary" onclick="reportPlan()">Report plan</button>`
    }
  `);
}

function createPlanScreen() {
  return shell(`
    <button class="back-button" onclick="setScreen('plans')">Cancel</button>
    <h2>Create a plan</h2>
    <div class="field">
      <label>Title</label>
      <input id="planTitle" type="text" placeholder="e.g. Rhine walk and dinner" />
    </div>
    <div class="field">
      <label>Description</label>
      <textarea id="planDescription" rows="3" placeholder="What is this plan about?"></textarea>
    </div>
    <div class="field">
      <label>Location</label>
      <input id="planLocation" type="text" placeholder="e.g. Rheinauhafen" />
    </div>
    <div class="two-cards">
      <div class="field">
        <label>Date</label>
        <input id="planDate" type="text" placeholder="e.g. Tomorrow" />
      </div>
      <div class="field">
        <label>Time</label>
        <input id="planTime" type="text" placeholder="e.g. 18:00" />
      </div>
    </div>
    <div class="chips">
      <button class="chip active" id="visPublic" onclick="setVisibility('public')">Public</button>
      <button class="chip" id="visPrivate" onclick="setVisibility('private')">Private</button>
    </div>
    <button class="primary wide-button" onclick="publishPlan()">Publish plan</button>
  `, false);
}

function profileScreen() {
  const user = state.currentUser || data.demoUsers.traveller;
  return shell(`
    <section class="profile-card">
      <h2>${user.name || data.demoUsers.traveller.name}</h2>
      <p>${user.username ? `@${user.username}` : "Erasmus student"} ${user.age ? `- Age ${user.age}` : ""}</p>
    </section>
    <section class="settings-card">
      <h3>Privacy controls</h3>
      <label><input type="checkbox" checked /> Location access</label>
      <label><input type="checkbox" checked /> Booking data consent</label>
      <label><input type="checkbox" /> Admin profile access</label>
    </section>
    <section class="settings-card">
      <h3>Support</h3>
      <p>Live and emergency chat: 06:00 to 22:00</p>
      <button onclick="setScreen('support')">Open support</button>
    </section>
  `);
}

function supportScreen() {
  const hour = new Date().getHours();
  const withinHours = hour >= 6 && hour < 22;

  return shell(`
    <h2>Support</h2>
    <div class="search-box">Search FAQ...</div>
    <section class="list-section">
      <h3>Frequently asked</h3>
      ${data.support.faqs.map(f => `
        <article class="request-card">
          <h3>${f.q}</h3>
          <p>${f.a}</p>
        </article>
      `).join("")}
    </section>
    <section class="settings-card">
      <h3>Live chat</h3>
      <p class="muted">Working hours: 06:00 to 22:00</p>
      ${
        withinHours
          ? `
            <p>Estimated wait: under 5 minutes. An AI assistant responds first, with the option to escalate to a human agent.</p>
            <button class="primary wide-button" onclick="showToast('Connecting to AI assistant...')">Open live chat</button>
          `
          : `
            <p class="muted">Support is currently outside working hours. Next available at 06:00.</p>
            <button class="wide-button secondary" disabled>Live chat unavailable</button>
          `
      }
    </section>
    <section class="settings-card">
      <h3>Emergency chat</h3>
      <p class="muted">For conflicts travellers and businesses cannot resolve directly.</p>
      ${
        withinHours
          ? `<button class="primary wide-button" onclick="showToast('Connecting to emergency support...')">Open emergency chat</button>`
          : `<button class="wide-button secondary" disabled>Unavailable outside working hours</button>`
      }
    </section>
  `);
}

function businessScreen() {
  return shell(`
    <section class="profile-card business">
      <span>${data.business.name}</span>
      <h2>Today at a glance</h2>
      <p>Waitlist requests, review replies, and profile visibility.</p>
    </section>
    <div class="two-cards">
      ${infoCard("Waitlist", state.bookingStatus === "pending" ? "1 pending" : "0 pending", "Updates within 5 sec", "", "teal")}
      ${infoCard("Rating", "4.8 stars", "Reply to reviews", "", "amber")}
    </div>
    <button class="wide-button" onclick="setScreen('waitlist')">Open waitlist</button>
    <button class="wide-button secondary" onclick="setScreen('manageProfile')">Manage profile</button>
    <button class="wide-button secondary" onclick="setScreen('businessReviews')">Reply to reviews</button>
  `);
}

function manageProfileScreen() {
  const b = data.business;
  return shell(`
    <h2>Manage business profile</h2>
    <div class="field">
      <label>Business name</label>
      <input id="bizName" type="text" value="${b.name}" />
    </div>
    <div class="field">
      <label>Address</label>
      <input id="bizAddress" type="text" value="${b.address}" />
    </div>
    <div class="field">
      <label>Opening hours</label>
      <input id="bizHours" type="text" value="${b.openingHours}" />
    </div>
    <div class="field">
      <label>Type</label>
      <select id="bizType">
        ${["Hotel", "Restaurant", "Cafe", "Museum", "Cinema", "Club", "Other tourism service"]
          .map((t) => `<option ${t === b.type ? "selected" : ""}>${t}</option>`)
          .join("")}
      </select>
    </div>
    <div class="field">
      <label>Description</label>
      <textarea id="bizDescription" rows="3">${b.description}</textarea>
    </div>
    <div class="field">
      <label>Current offers</label>
      <input id="bizOffers" type="text" value="${b.offers}" />
    </div>
    <button class="primary wide-button" onclick="saveBusinessProfile()">Save and publish</button>
  `, false);
}

function saveBusinessProfile() {
  const name = document.getElementById("bizName").value.trim();
  const address = document.getElementById("bizAddress").value.trim();
  const openingHours = document.getElementById("bizHours").value.trim();
  const type = document.getElementById("bizType").value;
  const description = document.getElementById("bizDescription").value.trim();
  const offers = document.getElementById("bizOffers").value.trim();

  if (!name || !address || !openingHours) {
    showToast("Please fill in business name, address, and opening hours.");
    return;
  }

  Object.assign(data.business, { name, address, openingHours, type, description, offers });
  setScreen("business");
  showToast("Profile updated and visible to travellers");
}

function waitlistScreen() {
  const hasPending = state.bookingStatus === "pending";
  return shell(`
    <h2>Online waitlist</h2>
    ${
      hasPending
        ? `
          <article class="request-card">
            <span>Pending</span>
            <h3>Alex Gonzales</h3>
            <p>Today, 18:00 - 2 guests</p>
            <div class="action-row">
              <button class="primary" onclick="acceptBooking()">Accept</button>
              <button onclick="rejectBooking()">Reject</button>
            </div>
          </article>
        `
        : `<p class="muted">No pending waitlist requests right now.</p>`
    }
  `);
}

function businessReviewsScreen() {
  const review = data.reviews[0];
  return shell(`
    <h2>Reviews</h2>
    <article class="review-card">
      <span>${review.rating} stars</span>
      <p>${review.text}</p>
      ${review.reply ? `<div class="reply-box">${review.reply}</div>` : `<p class="muted note">No public reply yet.</p>`}
      <div class="field">
        <label>Reply publicly</label>
        <textarea id="replyText" rows="3" placeholder="Write a public reply...">${review.reply || ""}</textarea>
      </div>
      <button class="primary" onclick="publishReply()">Publish reply</button>
    </article>
  `);
}

function reviewScreen() {
  const place = state.selectedPlace;
  const draft = state.reviewDraft;

  if (state.reviewSubmitted) {
    return shell(`
      <button class="back-button" onclick="setScreen('detail')">Back to ${place.name}</button>
      <h2>Review submitted</h2>
      <article class="review-card">
        <span>${draft.rating} stars</span>
        <p>${draft.text}</p>
        <p class="muted note">Published - visible to other travellers within 60 seconds.</p>
      </article>
    `, false);
  }

  return shell(`
    <button class="back-button" onclick="setScreen('detail')">Cancel</button>
    <h2>Review ${place.name}</h2>
    <p class="muted">Eligible: visited or booked within the last 14 days.</p>
    <div class="stars">
      ${[1, 2, 3, 4, 5].map(n => `<button class="star ${draft.rating >= n ? "filled" : ""}" onclick="setRating(${n})">&#9733;</button>`).join("")}
    </div>
    <div class="field">
      <label>Your review</label>
      <textarea id="reviewText" rows="4" placeholder="Share details of your visit (10-1000 characters)"
        oninput="document.getElementById('charCount').textContent = this.value.length">${draft.text}</textarea>
      <small><span id="charCount">${draft.text.length}</span>/1000 characters</small>
    </div>
    <button class="primary wide-button" onclick="submitReview()">Submit review</button>
  `, false);
}

function transportScreen() {
  const stops = data.transport.stops;
  const origin = state.transportOrigin;
  const destination = state.transportDestination;
  const route = data.transport.routesByDestination[destination];

  const originOptions = stops
    .map((s) => `<option value="${s}" ${s === origin ? "selected" : ""}>${s}${s === "Cologne Cathedral" ? " (current location)" : ""}</option>`)
    .join("");
  const destinationOptions = stops
    .filter((s) => s !== origin)
    .map((s) => `<option value="${s}" ${s === destination ? "selected" : ""}>${s}</option>`)
    .join("");

  const resultBlock = route
    ? `
      <section class="route-card">
        <h3>${route.nextRoute}</h3>
        <p>${data.transport.message}</p>
      </section>
      <section class="list-section">
        <h3>Live departures</h3>
        ${route.departures.map(d => `
          <article class="request-card">
            <span>${d.status}</span>
            <h3>${d.line} to ${d.destination}</h3>
            <p>Departs in ${d.time}</p>
          </article>
        `).join("")}
      </section>
    `
    : `
      <section class="route-card">
        <h3>No route available</h3>
        <p>There is currently no direct connection from ${origin} to ${destination}. Try a nearby stop or check back later.</p>
      </section>
    `;

  return shell(`
    <div class="field">
      <label>From</label>
      <select id="originSelect" onchange="setTransportOrigin(this.value)">${originOptions}</select>
    </div>
    <div class="field">
      <label>To</label>
      <select id="destinationSelect" onchange="setTransportDestination(this.value)">${destinationOptions}</select>
    </div>
    ${resultBlock}
    <p class="muted note">${data.transport.updated}. Manual refresh available every 30 seconds.</p>
    <button class="wide-button secondary" onclick="showToast('Schedule refreshed')">Refresh</button>
  `);
}

function mapCard() {
  return `
    <section class="map-card" aria-label="Dummy live map around Cologne Cathedral">
      <div class="map-grid"></div>
      <span class="map-pin dom">Dom</span>
      <span class="map-pin cafe">Cafe</span>
      <span class="map-pin museum">Museum</span>
      <span class="live-location">You</span>
      <div class="map-footer">Dummy live location - GPS accuracy within 10 m</div>
    </section>
  `;
}

function infoCard(title, value, meta, tone = "", accent = "") {
  return `
    <article class="info-card ${accent ? "accent-" + accent : ""}">
      <span>${title}</span>
      <strong class="${tone}">${value}</strong>
      <small>${meta}</small>
    </article>
  `;
}

function placeCard(place) {
  return `
    <button class="place-card" onclick="state.selectedPlace = data.places.find(p => p.id === '${place.id}'); state.bookingStatus = 'none'; setScreen('detail')">
      <div>
        <span>${place.type} - ${place.distance}</span>
        <h3>${place.name}</h3>
        <p>${place.availability} - ${place.weather}</p>
      </div>
      <strong>${place.rating}</strong>
    </button>
  `;
}

function render() {
  const screens = {
    login: loginScreen,
    registerTraveller: registerTravellerScreen,
    registerBusiness: registerBusinessScreen,
    consent: consentScreen,
    home: homeScreen,
    explore: exploreScreen,
    detail: placeDetailScreen,
    plans: plansScreen,
    planDetail: planDetailScreen,
    createPlan: createPlanScreen,
    review: reviewScreen,
    transport: transportScreen,
    support: supportScreen,
    profile: profileScreen,
    business: businessScreen,
    manageProfile: manageProfileScreen,
    waitlist: waitlistScreen,
    businessReviews: businessReviewsScreen,
  };

  app.innerHTML = screens[state.screen]();
}

render();
