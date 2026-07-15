const data = window.WELKOLN_DATA;

const state = {
  screen: "login",
  role: null,
  pendingRole: null,
  currentUser: JSON.parse(localStorage.getItem("welkolnUser") || "null"),
  selectedPlace: data.places[0],
  bookingStatus: "none",
  planStatus: "not_joined",
  toast: "",
};

const app = document.querySelector("#app");

function setScreen(screen) {
  state.screen = screen;
  state.toast = "";
  render();
}

function showToast(message) {
  state.toast = message;
  render();
}

function login(role) {
  state.role = role;
  state.currentUser = role === "business" ? data.demoUsers.business : data.demoUsers.traveller;
  localStorage.setItem("welkolnUser", JSON.stringify(state.currentUser));
  state.screen = role === "business" ? "business" : "home";
  state.toast = role === "business"
    ? "Logged in as Business"
    : "Location consent active near Cologne Cathedral";
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
  state.screen = state.role === "business" ? "business" : "home";
  state.toast = state.role === "business"
    ? "Business account created"
    : "Traveller account created. Location consent active.";
  render();
}

function bookPlace() {
  state.bookingStatus = "pending";
  showToast("Waitlist request sent to Maria's Altstadt Cafe");
}

function acceptBooking() {
  state.bookingStatus = "accepted";
  showToast("Booking accepted. Alex receives confirmation.");
}

function requestPlan() {
  state.planStatus = "pending";
  showToast("Join request sent to the plan creator");
}

function acceptPlan() {
  state.planStatus = "joined";
  showToast("Plan joined. Update sent within 60 seconds.");
}

function submitReview() {
  showToast("Review published and visible to travellers");
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
            <small>Name, username, email, password, age</small>
          </button>
          <button onclick="startRegistration('business')" class="role-card">
            <span>Business</span>
            <strong>Register a business</strong>
            <small>Business details, address, opening hours</small>
          </button>
        </div>
      </div>
    </section>
  `;
}

function registerTravellerScreen() {
  return authShell(`
    <form class="form-card" onsubmit="saveRegistration(event, 'traveller')">
      <div>
        <p class="eyebrow">Traveller account</p>
        <h2>Your details</h2>
        <p class="muted">Nationality is not required for registration.</p>
      </div>
      <label>Name<input name="name" value="Alex Gonzales" required /></label>
      <label>Username<input name="username" value="alex.dom" required /></label>
      <label>Email<input name="email" type="email" value="alex@example.com" required /></label>
      <label>Password<input name="password" type="password" value="welkoln-demo" required /></label>
      <label>Age<input name="age" type="number" min="13" value="23" required /></label>
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
      <p class="tiny">Live near</p>
      <h2>Hi, ${userName}</h2>
      <p>${data.transport.message}. ${data.transport.nextRoute}.</p>
      <button onclick="setScreen('explore')" class="primary">Explore nearby</button>
    </section>
    ${mapCard()}
    <div class="two-cards">
      ${infoCard("Weather", `${data.weather.temp}, rain ${data.weather.rain}`, data.weather.updated)}
      ${infoCard("Transport", data.transport.line, data.transport.updated)}
    </div>
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
  const status = state.bookingStatus === "accepted" ? "Confirmed" : state.bookingStatus === "pending" ? "Pending waitlist" : place.availability;
  return shell(`
    <button class="back-button" onclick="setScreen('explore')">Back to results</button>
    <section class="detail-hero">
      <span>${place.type}</span>
      <h2>${place.name}</h2>
      <p>${place.distance} from you - ${place.weather}</p>
    </section>
    <div class="two-cards">
      ${infoCard("Rating", `${place.rating} stars`, "Recent traveller reviews")}
      ${infoCard("Availability", status, place.price)}
    </div>
    <section class="route-card">
      <h3>Route context</h3>
      <p>${data.transport.nextRoute}. ${data.transport.message}.</p>
    </section>
    <div class="action-row">
      <button class="primary" onclick="bookPlace()">Join waitlist</button>
      <button onclick="setScreen('plans')">Add to plan</button>
    </div>
  `);
}

function plansScreen() {
  return shell(`
    <div class="section-title">
      <h2>PlanShare</h2>
      <button onclick="showToast('Create plan form would open here')">Create</button>
    </div>
    ${data.plans.map(plan => `
      <article class="plan-card">
        <span>${plan.status}</span>
        <h3>${plan.title}</h3>
        <p>${plan.place} - ${plan.time}</p>
        <small>${plan.people}</small>
        <button class="primary" onclick="requestPlan()">Request to join</button>
      </article>
    `).join("")}
    ${state.planStatus === "pending" ? `<button class="wide-button" onclick="acceptPlan()">Simulate creator accepts</button>` : ""}
  `);
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
      <button onclick="showToast('Estimated support connection: under 5 minutes')">Open support</button>
    </section>
  `);
}

function businessScreen() {
  const businessName = state.currentUser?.businessName || "Maria's Altstadt Cafe";
  return shell(`
    <section class="profile-card business">
      <span>${businessName}</span>
      <h2>Today at a glance</h2>
      <p>Waitlist requests, review replies, and profile visibility.</p>
    </section>
    <div class="two-cards">
      ${infoCard("Waitlist", state.bookingStatus === "pending" ? "1 pending" : "0 pending", "Updates within 5 sec")}
      ${infoCard("Rating", "4.8 stars", "Reply to reviews")}
    </div>
    <button class="wide-button" onclick="setScreen('waitlist')">Open waitlist</button>
    <button class="wide-button secondary" onclick="setScreen('businessReviews')">Reply to reviews</button>
  `);
}

function waitlistScreen() {
  return shell(`
    <h2>Online waitlist</h2>
    <article class="request-card">
      <span>${state.bookingStatus === "accepted" ? "Accepted" : "Pending"}</span>
      <h3>Alex Gonzales</h3>
      <p>Today, 18:00 - 2 guests</p>
      <div class="action-row">
        <button class="primary" onclick="acceptBooking()">Accept</button>
        <button onclick="showToast('Request rejected and traveller notified')">Reject</button>
      </div>
    </article>
  `);
}

function businessReviewsScreen() {
  const review = data.reviews[0];
  return shell(`
    <h2>Reviews</h2>
    <article class="review-card">
      <span>${review.rating} stars</span>
      <p>${review.text}</p>
      <div class="reply-box">${review.reply}</div>
      <button class="primary" onclick="submitReview()">Publish reply</button>
    </article>
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

function infoCard(title, value, meta) {
  return `
    <article class="info-card">
      <span>${title}</span>
      <strong>${value}</strong>
      <small>${meta}</small>
    </article>
  `;
}

function placeCard(place) {
  return `
    <button class="place-card" onclick="state.selectedPlace = data.places.find(p => p.id === '${place.id}'); setScreen('detail')">
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
    profile: profileScreen,
    business: businessScreen,
    waitlist: waitlistScreen,
    businessReviews: businessReviewsScreen,
  };

  app.innerHTML = screens[state.screen]();
}

render();
