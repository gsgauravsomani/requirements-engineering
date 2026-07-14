# PLAN_MOCK_UP.md

# WelKoln Clickable Mockup Plan

Source document: `D:\Downloads\Requirements_Engineering_SuSe__26 .pdf`  
SRS title: `WelKoIn / WelKoln - A Tourist Support Platform for Cologne`  
Version/date in PDF: Version 8.0, 14 July 2026

## 1. Product Summary

WelKoln is a mobile tourist support platform for Cologne. It gives travellers one trusted app for discovering attractions, finding nearby businesses, checking transport and weather, booking services, reviewing places, and connecting with other travellers through shared activity plans.

The mockup should feel like a practical city companion, not a marketing site. The first screen should put the user directly into the app experience: map, nearby recommendations, weather, transport alerts, and quick actions.

## 2. Main User Groups

### Traveller

Primary user. Usually a tourist, exchange student, or visitor with little local knowledge.

Traveller needs:
- Discover nearby attractions, restaurants, cafes, museums, nightlife, hotels, and services.
- Navigate through Cologne with route recommendations and shortest path support.
- Check live transport schedules, delays, cancellations, platform changes, and timetable updates.
- Check real-time weather and forecasts.
- Book restaurants, hotels, museum tickets, tours, or other services.
- Join public activity plans and create their own public or private plans.
- Submit reviews and ratings for businesses visited recently.
- Contact customer support or emergency chat.
- Control privacy and consent for location, personal data, activity data, and admin access.

Traveller persona from the SRS:
- Name: Alex Gonzales.
- Age: 23.
- Occupation: Erasmus student.
- Location: Cologne, Germany.
- Nationality: Mexican.
- Status: single.
- Personality: curious, adventurous, introverted, open-minded.
- Goals: meet new people, explore sightseeing places, try restaurants and cafes, travel easily around Cologne.
- Frustrations: shy and finds it hard to meet people alone, does not know good restaurants/cafes, hates sudden weather changes, dislikes train cancellations and delays.
- Existing tools: Google Maps, Instagram, DB Navigator, Airbnb, Yelp/TripAdvisor.
- Mockup implication: support a shy traveller with low-pressure discovery, join buttons, clear plan previews, trusted transport/weather context, and easy wishlist/book actions.

### Business

Business users include hotels, restaurants, cafes, museums, cinemas, clubs, entertainment providers, tour guides, cab/bike/luggage services, and other service providers.

Business needs:
- Create and manage a business profile.
- Share business information, offers, opening hours, menus/prices, availability, and booking slots.
- Manage reservations and an online waitlist.
- Accept or reject pending booking requests.
- Reply publicly to reviews.
- Increase visibility to visitors.
- Communicate reliably with travellers.

Business persona from the SRS:
- Name: Maria Muller.
- Age: 42.
- Occupation: restaurant owner.
- Location: Cologne, Germany.
- Tier: small business.
- Archetype: provider.
- Traits: reliable, hospitable, traditional, friendly.
- Goals: attract more international tourists, reduce missed/double bookings, respond quickly to reviews, keep business info up to date.
- Frustrations: tourists cannot find her business online, phone bookings cause scheduling chaos, negative reviews cannot be answered, no time to manage many platforms.
- Existing channels: phone/email, paper calendar, WhatsApp, Google Search, word of mouth.
- Mockup implication: business dashboard should be simple, low-friction, and focused on profile visibility, waitlist, bookings, and reviews.

### Administrator

Operational team managing the platform for the City of Cologne.

Admin needs:
- Manage user accounts.
- Monitor users, reviews, and system activity.
- Moderate inappropriate or spam content in reviews and plans.
- View user profiles only when allowed by privacy settings or when suspicious activity/fraud is flagged.
- Maintain trust, security, reliability, and data quality.

### City of Cologne

Sponsor and public data provider.

City needs:
- Improve tourist experience.
- Increase local tourism.
- Provide transport schedules and event/public information.
- Keep the app reliable, secure, and representative of Cologne.

### Payment Service Provider

External provider for bookings and optional NFC payments.

Payment provider needs:
- Process payments and refunds.
- Confirm successful transactions to WelKoln.
- Handle chargebacks.
- Maintain secure financial and data-protection compliance.

## 3. Core App Value Proposition

The app should replace scattered tourism tools with one Cologne-specific starting point.

Core promise:
- Discover where to go.
- See what is nearby.
- Understand how to get there.
- Know whether weather or transport affects the plan.
- Book or join activities.
- Meet people through PlanShare.
- Leave trusted reviews after visiting.

## 4. Required Mockup Platforms And Layout

Primary target:
- One shared mobile app mockup for Travellers and Businesses.
- The prototype should look and behave like a phone app, because the SRS defines WelKoln as a mobile tourist support platform used by travellers on smartphones.

Secondary target:
- Separate Admin web dashboard.

Recommended prototype structure:
- Build the prototype as a browser page containing a centered mobile app frame, approximately 390px wide by 844px tall.
- Use a simple phone-looking frame around the app screen for presentation polish. Keep the frame minimal so it does not distract from the actual UI.
- The clickable content should live inside the phone frame: login, traveller screens, business screens, bottom navigation, cards, forms, and notifications.
- The surrounding desktop page should be neutral and simple, used only to present the phone app clearly during the demo.
- Mobile-first app shell with bottom navigation.
- Traveller and Business use the same app. The login/registration flow selects the role and then shows the relevant role-based section.
- Admins use a separate web dashboard, not the shared Traveller/Business mobile app.
- Use Cologne-specific sample content throughout.

Recommended implementation format:
- A small static HTML/CSS/JavaScript prototype is a good fit because it can run in a normal browser, feel clickable like a real app, and be pushed/demoed from this repository.
- Figma or hyperlinked slides are acceptable, but a browser prototype will better show app-like navigation, role switching, status changes, and notifications.

Recommended traveller bottom navigation:
- Home
- Explore
- Plans
- Bookings
- Profile

Recommended floating or persistent actions:
- Search
- Map/list toggle
- Support/emergency access
- Manual refresh

## 5. Traveller Screens

### 5.1 Welcome / Login / Registration

Purpose:
- Let users register or log in.
- Let users choose Traveller or Business account type.
- Get consent for privacy/location features.

Required elements:
- App name: WelKoln.
- Account type selector: Traveller, Business.
- Clear note or visual behavior that Traveller and Business are roles inside the same shared app.
- Registration fields: name, username, email, password, age or date of birth, nationality for traveller, business details for business.
- Consent toggles:
  - Location data.
  - Booking data.
  - Activity plan visibility.
  - Admin access to profile data.
- Expected feedback: registration completes in less than 3 minutes.

Clickable states:
- Register traveller.
- Register business.
- Log in as existing traveller.
- Log in as existing business.
- Traveller login opens the traveller section.
- Business login opens the business section.
- Continue with limited permissions if location consent is off.
- Prompt to enable location when needed.

### 5.2 Traveller Home Dashboard

Purpose:
- First screen after login. Gives an immediate overview of Cologne today.

Required elements:
- Current location status.
- Current weather card: temperature, wind speed/direction, humidity, rain probability.
- Transport alert card: delays, cancellations, platform changes, timetable updates.
- Nearby recommendations within 500 meters.
- Upcoming public plans nearby.
- Saved wishlist preview.
- Quick actions:
  - Search attractions.
  - View map.
  - Create PlanShare.
  - Check transport.
  - Contact support.

Data update cues:
- Weather updates every 10 minutes.
- Transport schedules update every minute.
- Manual refresh available every 30 seconds.

### 5.3 Explore / Search Attractions

Purpose:
- Search for attractions and businesses using current location, category, and availability.

Required flow from activity diagram:
1. Check whether user is logged in.
2. Check whether location services are on.
3. If location is off, prompt user to enable location.
4. Open search screen.
5. User enters query or selects category.
6. System fetches attraction listings.
7. System fetches weather data.
8. System fetches business availability.
9. If no results are found, prompt user to refine search.
10. If results are found, display results list.
11. Traveller selects attraction.

Required elements:
- Search input.
- Category chips:
  - Attractions
  - Restaurants
  - Cafes
  - Museums
  - Hotels
  - Cinema
  - Clubs
  - Tours
  - Bikes/cabs/luggage
- Filter controls:
  - Distance.
  - Open now.
  - Available today.
  - Rating.
  - Weather-friendly indoor/outdoor.
- Results list with map toggle.
- Each result card:
  - Name.
  - Type.
  - Distance.
  - Rating.
  - Availability.
  - Weather note.
  - Book/save/get route buttons.

Empty state:
- "No matching places found. Try widening the distance or changing the category."

### 5.4 Map And Navigation

Purpose:
- Show integrated map with attractions, businesses, weather, transport, and routes.

Required elements:
- Map centered on user's current location.
- Pins for nearby attractions and businesses.
- Weather overlay or compact weather indicator.
- Transport disruption markers.
- Route summary with shortest path.
- Alternative routes ranked by shortest travel time and earliest arrival.
- Destination search.
- "Start route" and "Save" actions.

Transport disruption behavior:
- Show delays, cancellations, platform changes, and timetable updates.
- When original route is disrupted, show next best route.
- If no alternative exists, explain why, such as service outage or no connections available.

### 5.5 Attraction / Business Detail Page

Purpose:
- Let travellers evaluate, book, review, and navigate to a place.

Required elements:
- Business or attraction name.
- Type: hotel, restaurant, museum, cinema, club, entertainment, etc.
- Address.
- Opening hours.
- Distance from user.
- Availability.
- Rating summary.
- Review list.
- Photos or visual placeholder.
- Weather note for visit.
- Transport route preview.
- Actions:
  - Book.
  - Join waitlist if no immediate slot exists.
  - Save to wishlist.
  - Get navigation.
  - Write review if eligible.
  - Share or add to plan.

Business subtype fields:
- Hotel: occupancy percentage, opening hours.
- Restaurant: menu, occupancy percentage.
- Museum: entry fee.
- Cinema: movie fee, movie list.
- Club: entry fee, theme.

### 5.6 Booking Flow

Purpose:
- Let travellers book a restaurant, hotel room, museum ticket, or service.

Required elements:
- Date and time picker.
- Party size or number of guests.
- Availability display.
- Price/payment summary where relevant.
- Payment method.
- Optional NFC payment state if device has NFC enabled.
- Booking status:
  - Pending.
  - Accepted.
  - Rejected.
  - Confirmed.
- Confirmation notification.

Rules:
- User must be logged in.
- Business must have available bookings for immediate reservation.
- If no immediate slot exists, traveller can submit a waitlist request.
- Users should receive booking confirmation in less than 30 minutes.
- When a booking request is accepted, system sends a confirmation notification.

Clickable states:
- Slot available: request booking -> payment -> confirmation.
- Slot unavailable: join waitlist -> pending status.
- Business accepts request -> confirmation notification.
- Business rejects request -> rejection notification.

### 5.7 Bookings Page

Purpose:
- Let travellers track reservations, waitlist requests, and booking notifications.

Required elements:
- Upcoming bookings.
- Pending waitlist requests.
- Past bookings.
- Booking detail page.
- Payment/refund status where relevant.
- Review prompt for visited businesses within the last 14 days.

### 5.8 PlanShare List

Purpose:
- Let travellers view nearby or upcoming public plans.

Required elements:
- Public plan cards:
  - Title.
  - Description preview.
  - Location.
  - Date/time.
  - Creator.
  - Participant count.
  - Distance.
  - Join/request button.
- Filters:
  - Nearby.
  - Today.
  - This week.
  - Category.
  - Open to join.
- Empty state for no nearby plans.

Rules:
- Public plans are visible before the planned activity starts.
- Private plans are not visible to others.
- Plans with inappropriate content or spam are rejected or flagged for moderation.

### 5.9 PlanShare Detail

Purpose:
- Let travellers inspect and join a public activity plan.

Required elements:
- Plan title.
- Description.
- Location.
- Date and time.
- Creator.
- Participant list/count.
- Included businesses/places.
- Visibility status.
- Join/request-to-join button.
- Report plan button.
- Route to meeting location.

Join flow:
- Traveller requests to join a public plan.
- System notifies creator.
- Creator accepts or rejects request.
- Joined participant sees plan in their Plans page.

### 5.10 Create / Edit Activity Plan

Purpose:
- Let travellers create public or private activity plans.

Required fields:
- Title.
- Description.
- Location.
- Date.
- Time.
- Visibility: public/private.
- Businesses or places included in plan.

Rules:
- Plan must contain title, description, location, date, and time.
- Creator can set public or private visibility.
- Changes or cancellation must be communicated to joined participants within 60 seconds.
- Inappropriate or spam content is rejected or flagged.

Clickable states:
- Create public plan.
- Create private plan.
- Edit plan.
- Cancel plan.
- Validation error for missing fields.
- Moderation flag for prohibited text.

### 5.11 Reviews And Ratings

Purpose:
- Let eligible travellers rate and review businesses.

Required elements:
- Rating input from 1 to 5.
- Text review field with character counter.
- Eligibility note.
- Submit button.
- Edit/delete existing review.
- Moderation state.

Rules:
- Traveller can submit a rating between 1 and 5.
- Review text must be between 10 and 1000 characters.
- Traveller can review only a business visited or booked within the last 14 days.
- Traveller can have only one active review per business.
- Submitted review visible to other users within 60 seconds after successful submission.
- Traveller can edit or delete review within 14 days of submission.
- Prohibited or inappropriate content is rejected or flagged before publication.
- Business can reply publicly.

Sequence behavior:
1. Traveller selects business.
2. System validates business.
3. Traveller gives rating.
4. System validates visit/booking within last 2 weeks.
5. Traveller adds review.
6. System checks for inappropriate language.
7. Traveller submits.
8. System confirms or flags.

### 5.12 Transport Schedule Screen

Purpose:
- Let travellers see live transport schedules and route disruptions.

Required elements:
- Search origin/destination.
- Current nearby stops/stations.
- Live departures.
- Delay/cancellation/platform change indicators.
- Next best route panel.
- Last updated timestamp.
- Manual refresh button.

Rules:
- City of Cologne sends schedules every minute.
- Schedule changes should be presented within 1 minute of transport provider publication.
- Transport API response to UI rendering target: 1 minute; minimum acceptable: under 2 minutes; outstanding: 45 seconds.

### 5.13 Weather Screen

Purpose:
- Show real-time weather and forecast for Cologne.

Required elements:
- Current temperature.
- Wind speed and direction.
- Humidity.
- Rain probability.
- Forecast.
- Last updated timestamp.

Rules:
- Data must come from approved weather service affiliated with the City of Cologne.
- Weather data updates every 10 minutes.
- Weather is visible to logged-in travellers.

### 5.14 Support And Emergency Chat

Purpose:
- Provide FAQ, live support, and emergency conflict handling.

Required elements:
- FAQ search/list.
- Live chat button.
- Emergency chat button.
- Working hours display: 06:00 to 22:00.
- Estimated wait time while waiting for customer support.
- AI assistant first response.
- Human escalation state.

Rules:
- All users can access FAQ.
- All users can contact support during working hours.
- Response within 5 minutes during working hours.
- Emergency chat is available only during the selected working hours shown in the UI, 06:00 to 22:00, and is used when travellers and businesses cannot resolve a conflict directly.
- Outside working hours, emergency chat should show an unavailable/off-hours state or a next-available-hours message.

### 5.15 Profile / Privacy Settings

Purpose:
- Let users manage personal data, app permissions, and consent.

Required elements:
- Profile details.
- Saved wishlist.
- Plan history.
- Review history.
- Privacy and consent toggles:
  - Location access.
  - Personal profile access.
  - Booking/activity data.
  - Allow admin access when needed.
- Data access explanation.
- Logout.

Privacy rule:
- The system must not collect, store, or share personal data, location data, or activity data unless the user gives explicit consent through privacy settings.

Admin access rule:
- Admins can see user profiles only if users allow access, except controlled flagged fraud/safety cases.

## 6. Business Screens

### 6.1 Business Registration / Login

Required fields:
- Business name.
- Owner/legal name.
- Email.
- Address.
- License number.
- Business type.
- Opening hours.
- Profile description.

Business types:
- Hotel.
- Restaurant.
- Entertainment.
- Museum.
- Cinema.
- Club.
- Other tourism service.

### 6.2 Business Dashboard

Purpose:
- Give a simple operating overview.

Required elements:
- Today bookings.
- Pending waitlist requests.
- Profile completeness.
- Average rating/recent reviews.
- Availability status.
- Quick actions:
  - Update profile.
  - Manage availability.
  - View waitlist.
  - Reply to reviews.
  - Contact support.

### 6.3 Manage Business Profile

Required elements:
- Name.
- Address.
- Opening hours.
- Description.
- Photos/placeholders.
- Category/type.
- Menu, price, fees, occupancy, movie list, theme depending on type.
- Offers.
- Save/publish action.

### 6.4 Manage Availability And Bookings

Required elements:
- Calendar/list view.
- Available slots.
- Booked slots.
- Pending requests.
- Accept/reject actions.
- Confirmation/rejection notification preview.

### 6.5 Online Waitlist

Required elements:
- Pending requests in chronological order.
- For each request:
  - Traveller name.
  - Requested date/time.
  - Number of guests.
  - Status: Pending, Accepted, Rejected.
  - Accept button.
  - Reject button.

Rules:
- Travellers submit a booking request when no immediate reservation slot is available.
- Requests automatically join the business waitlist.
- Waitlist updates within 5 seconds of a new request.
- Notifications delivered within 60 seconds.
- Only authorized business owners can access/manage their waitlist.

### 6.6 Reviews And Replies

Required elements:
- Review list.
- Rating summary.
- Reply box.
- Public reply preview.
- Report inappropriate review action.

Rules:
- Businesses can reply publicly to reviews.
- Reviews may be moderated for prohibited/inappropriate content.

## 7. Admin Screens

### 7.1 Admin Login

Required elements:
- Secure admin login.
- Admin role indicator.

### 7.2 Admin Dashboard

Purpose:
- Monitor platform safety, quality, and reliability.

Required elements:
- User activity overview.
- Review moderation queue.
- Plan moderation queue.
- Fraud/suspicious activity flags.
- System health indicators.
- Reports/analytics placeholder.

### 7.3 Manage Users

Required elements:
- User list.
- Filters: Traveller, Business, flagged, consented.
- Create/read/update/delete controls.
- Restricted details view.
- Consent/flag status.

Rules:
- Admin can create, read, update, and delete users.
- Admin may only view personal user details when suspicious activity or a fraud report is flagged, or when user privacy settings allow it.

### 7.4 Monitor Platform

Required elements:
- Users.
- Reviews.
- System activity.
- Content flags.
- Data update status.

### 7.5 Moderation Queue

Required elements:
- Flagged PlanShare posts.
- Flagged reviews.
- Reason for flag.
- Approve/reject/remove actions.
- User/business involved.

## 8. External Systems And Integrations To Represent

The clickable mockup can simulate these integrations with static data and loading states.

Required integrations:
- Device GPS sensor: sends traveller location to app.
- City of Cologne transport schedules: updates every minute.
- Approved weather agency/service: updates every 10 minutes.
- External map/routing service: shortest path and route alternatives.
- External payment provider: payments, refunds, chargebacks, confirmation.
- Optional NFC payment if device supports NFC.

Integration constraints:
- Transport and weather information must only come from approved City of Cologne transport sources or affiliated weather agencies.
- Personal and booking data must use encrypted channels. Target: TLS 1.3.

## 9. Data Objects Needed In The Mockup

### User

Fields:
- legal_name.
- user_name.
- age.
- email.
- role.
- privacy/consent settings.

### Traveller

Fields:
- travellerID.
- nationality.
- location.
- wishlist.
- bookings.
- plans.
- reviews.

### Business

Fields:
- businessID.
- business name.
- address.
- licenseNumber.
- openingHours.
- type.
- availability.
- rating summary.
- reviews.

Business subtypes:
- Hotel: occupancyPercentage, openingHours.
- Restaurant: menu, occupancyPercentage.
- Entertainment: openingHours.
- Museum: entryFee.
- Cinema: movieFee, movieList.
- Club: entryFee, theme.

### Plan

Fields:
- title.
- description.
- location.
- date.
- time.
- visibility: public/private.
- businessList.
- participantList.
- creator.
- status.
- moderation status.

### Rating

Fields:
- ratingNumber: 1 to 5.
- creator user.
- business.
- created date.

### Review

Fields:
- ratingText.
- linked rating.
- moderation status.
- business reply.
- edit/delete eligibility.

### Booking

Fields:
- traveller.
- business.
- requested date/time.
- number of guests.
- payment status.
- status: Pending, Accepted, Rejected, Confirmed.
- confirmation notification.

## 10. Sample Prototype Content

Use Cologne-specific examples to make the mockup credible.

Traveller sample:
- Alex Gonzales, Erasmus student, Mexico, currently near Cologne Cathedral.

Business sample:
- Maria's Altstadt Cafe, restaurant/cafe, small business, hospitable/traditional.
- Cologne Cathedral, attraction.
- Museum Ludwig, museum.
- Riverside Cinema, cinema.
- Club Ehrenfeld, club.
- Luggage Keepers Cologne Hbf, service.

PlanShare sample plans:
- "Museum Ludwig afternoon visit"
- "Cafe meetup near the Cathedral"
- "Rhine walk and dinner"
- "Student nightlife in Ehrenfeld"

Transport sample:
- Delay on tram line.
- Platform change at Cologne Hbf.
- No alternative available state.
- Next best route available state.

Weather sample:
- Temperature.
- Humidity.
- Wind direction.
- Rain probability.
- Suggest indoor attraction when rain probability is high.

Review sample:
- 5-star review for a cafe.
- Business public reply.
- Flagged inappropriate review state.

## 11. Priority And Kano Signals

High-priority mockup areas:
- PlanShare, because it is a high-priority differentiating feature and a Kano delighter.
- Reviews and ratings, because they are high priority for transparency.
- Advance booking/waitlist, because stakeholders rated it as a delighter and it supports core business value.
- Integrated map/search/transport/weather, because this is the app's combined city-support promise.

Medium-priority mockup areas:
- Weather forecast integration.
- Customer support and emergency chat.

Transport note:
- The SRS team considered transport central, but Kano feedback from another group marked it indifferent due to lack of context. For the mockup, transport should still appear prominently because it is repeatedly described as part of the core experience.

## 12. Key User Journeys For Clickable Prototype

Presentation guidance from the prototype brief:
- The prototype must be clickable and navigable, not a slideshow of isolated static screens.
- The audience should see one complete scenario walked through end-to-end.
- One well-chosen scenario is enough if it exercises several connected core features.
- The scenario should be based on what users do inside the system, not on an external journey such as how they first heard about the app.
- A real backend is not required. Static data, mocked states, and linked screens are acceptable.
- Acceptable tools include Figma, Penpot, Adobe XD, Sketch + InVision, Framer, Canva, hyperlinked PowerPoint/Google Slides, or a small static HTML/CSS/front-end mockup.

Recommended main demo scenario:
1. Alex logs into the shared WelKoln app as a Traveller.
2. He grants location consent and lands on the Traveller Home dashboard.
3. He searches for nearby attractions around Cologne Cathedral.
4. He opens a place detail, checks weather and live transport context, and saves or books it.
5. If no immediate slot is available, he joins the business waitlist.
6. He opens PlanShare, finds a public cafe meetup nearby, and requests to join.
7. The prototype switches to the Business section for Maria in the same app, where she accepts a waitlist booking or manages a relevant request.
8. The prototype returns to Alex, showing the confirmation/notification.
9. Alex later submits a review, and Maria replies from the Business section.

Optional admin add-on, only if presentation time allows:
- Open the separate Admin web dashboard to show a flagged review or PlanShare post in moderation and the privacy-restricted user details view.

### Journey A: New Traveller Arrives In Cologne

1. Open app.
2. Register as Traveller.
3. Grant location and privacy consent.
4. Land on Home.
5. See weather and transport update.
6. Search attractions near Cologne Cathedral.
7. Save Museum Ludwig to wishlist.
8. Open route to museum.

### Journey B: Traveller Books Or Joins Waitlist

1. Open business detail.
2. Choose date/time and guests.
3. If slot available, submit booking.
4. Pay or confirm.
5. Receive booking confirmation.
6. If slot unavailable, join waitlist.
7. See pending status.
8. Receive accepted/rejected notification.

### Journey C: Traveller Joins A Public Plan

1. Open PlanShare list.
2. Filter nearby public plans.
3. Open "Cafe meetup near the Cathedral".
4. Request to join.
5. See pending state.
6. Creator accepts.
7. Plan appears in traveller's Plans page.

### Journey D: Traveller Creates A Plan

1. Open Plans.
2. Tap Create Plan.
3. Add title, description, location, date, time.
4. Choose public/private.
5. Publish.
6. See plan detail.
7. Edit or cancel plan.
8. Joined participants receive update/cancellation notification.

### Journey E: Traveller Handles Transport Disruption

1. Open Transport.
2. Search route.
3. See delay/cancellation/platform change.
4. App shows next best route.
5. User selects alternative route.
6. If no alternative exists, app explains why.

### Journey F: Traveller Reviews A Visited Business

1. Open past booking or business detail.
2. Tap Write Review.
3. System validates visit within 14 days.
4. Choose 1 to 5 stars.
5. Write 10 to 1000 character review.
6. Submit.
7. See success state or moderation flag.
8. Review appears publicly.
9. Business replies.

### Journey G: Business Manages Waitlist

1. Log in as Business.
2. Open dashboard.
3. Open waitlist.
4. View pending requests in chronological order.
5. Accept one request.
6. Reject another request.
7. See status updated.
8. Traveller receives notifications.

### Journey H: Admin Moderates Content

1. Log in as Admin.
2. Open moderation queue.
3. Review flagged PlanShare post.
4. Approve or remove.
5. Review flagged review.
6. Approve or reject.
7. Open user management.
8. See restricted personal details unless consent or fraud flag exists.

## 13. Notifications And System Feedback

Mockup should include notification examples for:
- Booking request accepted.
- Booking request rejected.
- Booking confirmed.
- Join request received by plan creator.
- Join request accepted or rejected.
- Plan changed.
- Plan cancelled.
- Transport delay.
- Weather refreshed.
- Support connection estimate.
- Review published.
- Review flagged for moderation.

Timing cues to show in UI:
- Weather refreshed 10 minutes ago / updating.
- Transport updated 1 minute ago.
- Manual refresh available every 30 seconds.
- Support response within 5 minutes.
- Plan changes sent within 60 seconds.
- Review visible within 60 seconds.
- Waitlist updates within 5 seconds.

## 14. Validation, Error, And Empty States

Required states:
- Location services off: prompt user to enable location.
- No search results: prompt user to refine search.
- No alternative route: explain reason.
- Registration validation errors.
- Booking slot unavailable.
- Waitlist pending.
- Support outside working hours.
- Review ineligible because business was not visited/booked within 14 days.
- Review too short or too long.
- Duplicate active review for same business.
- Inappropriate review or plan content flagged.
- Admin cannot view details due to privacy settings.
- External weather/transport unavailable.

## 15. Privacy, Security, And Compliance Requirements For Mockup

Privacy requirements:
- Explicit consent must be shown for personal data, location data, booking data, activity data, and private plans.
- Privacy settings must be editable.
- Admin access should be visibly constrained.
- Private activity plans must not appear in public discovery.

Security requirements:
- Personal and booking data protected during transmission.
- Target encryption: TLS 1.3.
- Outstanding target: TLS 1.3 plus verified end-to-end encryption for highly sensitive data.

GDPR constraint:
- Do not collect, store, process, or share user data unless the user gives explicit consent through privacy settings.

## 16. Quality Requirements To Reflect In Prototype

Performance:
- Transport updates should render quickly.
- UI can show "updated 45 sec ago", "updated 1 min ago", and loading states.

Availability:
- Target uptime: 99 percent over 30 days.
- Minimum: 97 percent.
- Outstanding: 99.9 percent.
- Mockup can include admin/system health indicator.

Reliability:
- Booking flows should avoid duplicate/conflicting states.
- Reliability target: 500 simultaneous booking requests without error.
- Minimum: 100.
- Outstanding: 1000.

Support:
- Working hours: 06:00 to 22:00.
- Support response within 5 minutes during working hours.

Location:
- GPS accuracy target: within 10 meters.

Nearby recommendations:
- Recommend businesses within 500 meters of traveller location.

## 17. Suggested Information Architecture

Traveller:
- Home
- Explore
  - Search
  - Map
  - Business/attraction detail
  - Route
- Plans
  - Public plans
  - My plans
  - Create/edit plan
  - Plan detail
- Bookings
  - Upcoming
  - Pending waitlist
  - Past
  - Booking detail
- Profile
  - Wishlist
  - Reviews
  - Privacy settings
  - Support

Business:
- Dashboard
- Profile
- Availability
- Bookings/waitlist
- Reviews
- Support

Admin:
- Dashboard
- Users
- Moderation
- Platform activity
- Reports/system health

## 18. Minimum Clickable Prototype Scope

To satisfy the SRS for a working clickable mockup, include at least:
- Shared Traveller/Business mobile app registration/login with role-based sections and consent.
- Traveller home dashboard.
- Explore search with map/list toggle.
- Attraction/business detail.
- Booking and waitlist flow.
- PlanShare list, detail, create, join, and creator accept/reject states.
- Transport disruption and next-best-route screen.
- Weather screen/card.
- Review submission and business reply flow.
- Support/FAQ/live chat/emergency chat screen.
- Privacy settings screen.
- Business dashboard with profile, waitlist, and review reply screens.
- Separate Admin web dashboard with user access restrictions and moderation queue.

For the presentation, prioritize connecting these screens into one end-to-end scenario over showing every screen independently.

## 19. Visual And Interaction Guidance

Design direction:
- Mobile-first, practical, clear, trustworthy.
- Present the Traveller/Business experience inside a simple phone frame, not as a full-width desktop website.
- The phone frame should make the audience immediately understand that WelKoln is a mobile app.
- Do not overdesign the device frame. A rounded rectangle with subtle border/shadow, top speaker/dynamic-island detail, and app viewport is enough.
- Use the desktop browser only as the stage for the phone mockup. The app UI itself should remain mobile-sized and touch-oriented.
- Use Cologne context: landmarks, transit, weather, local businesses.
- Avoid generic tourism brochure screens; make the app functional immediately.
- Use bottom navigation for traveller app.
- Keep Traveller and Business in the same mobile app, but make the role-based section obvious after login.
- Make the Admin area visually distinct as a separate web dashboard.
- Use clear chips, filters, toggles, map pins, status badges, and notification banners.
- Make PlanShare friendly for introverted users: low-pressure joining, participant counts, clear visibility settings, and reassuring privacy controls.
- Make business tools simple enough for a small owner who currently relies on phone, email, paper calendar, and WhatsApp.

Important clickable UI controls:
- Search input.
- Category filters.
- Map/list toggle.
- Save to wishlist.
- Book.
- Join waitlist.
- Create plan.
- Public/private toggle.
- Request to join.
- Accept/reject join request.
- Rating stars.
- Review text input.
- Reply to review.
- Manual refresh.
- Enable location prompt.
- Privacy consent toggles.
- FAQ/live chat/emergency chat.

## 20. Traceability Checklist

The mockup should visibly cover these SRS requirements:
- REQ-PS-1 to REQ-PS-6: PlanShare create, visibility, browse/join, creator notification, plan updates, moderation.
- REQ-WF-1 to REQ-WF-3: weather data fields, 10-minute updates, Cologne forecast for logged-in travellers.
- REQ-CS-1 to REQ-CS-4: FAQ, live chat, 5-minute support response, emergency chat.
- REQ-RR-1 to REQ-RR-6: review eligibility, rating, character limits, one active review, visibility, moderation, business reply.
- REQ-CC-1: registration.
- REQ-CC-2: shortest path.
- REQ-CC-3: GPS location.
- REQ-CC-4: reservations.
- REQ-CC-5: transport schedules.
- REQ-CC-6: submit reviews.
- REQ-CC-7: weather data.
- REQ-CC-8: customer support.
- REQ-CC-9: nearby attraction search.
- REQ-CC-10: activity plan creation.

## 21. Resolved Assumptions And Open Questions

Resolved assumptions for this mockup:
- Travellers and Businesses use the same mobile app.
- Traveller and Business sections differ based on the role selected during login.
- Emergency chat is available only during selected working hours, 06:00 to 22:00.
- Admins have a separate web dashboard.

The SRS does not specify these remaining details, so choose reasonable defaults during mockup creation:
- Exact brand colors and logo.
- Exact payment provider.
- Exact map provider.
- Exact City of Cologne transport API format.
- Exact weather provider.
