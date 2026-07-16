# Things To Implement

This file tracks missing or weak areas in the current WelKoln clickable prototype compared with `PLAN_MOCK_UP.md`.

## Highest Priority

- Build the separate Admin dashboard.
  - Add admin login or entry point.
  - Add moderation queues for flagged reviews and PlanShare posts.
  - Add user management with privacy-restricted profile details.
  - Add system health and activity indicators.

- Add the missing Traveller `Bookings` section.
  - Add `Bookings` to the bottom navigation.
  - Show upcoming bookings, pending waitlist requests, and past bookings.
  - Show booking detail, confirmation, rejection, payment/refund status, and review prompts.

- Expand registration and consent.
  - Replace the current shortcut role cards with a simple registration/login flow.
  - Add traveller fields: name, username, email, password, age/date of birth, nationality.
  - Add business fields: business name, owner/legal name, email, address, license number, business type, opening hours, description.
  - Split consent into separate toggles for location data, personal/profile data, booking/activity data, PlanShare visibility, and admin access.

- Complete the booking and waitlist flow.
  - Add date/time picker and guest count.
  - Add available-slot booking path.
  - Add unavailable-slot waitlist path.
  - Add payment summary and optional NFC/payment state.
  - Add statuses: pending, accepted, rejected, confirmed.
  - Add traveller-facing notification after the business accepts or rejects.

- Complete PlanShare.
  - Add plan detail pages.
  - Add create/edit plan form.
  - Add public/private visibility toggle.
  - Add required-field validation.
  - Add cancel plan state.
  - Add creator accept/reject state for join requests.
  - Add moderation/flagged-content state.

## Important Missing Screens

- Add dedicated Weather screen.
  - Show temperature, wind speed/direction, humidity, rain probability, forecast, and last updated timestamp.
  - Show the 10-minute update cue.

- Add dedicated Transport screen.
  - Add origin/destination search.
  - Show nearby stops, live departures, delays, cancellations, platform changes, and next-best route.
  - Add manual refresh and last updated timestamp.
  - Add no-alternative-route explanation state.

- Add Support and Emergency Chat screen.
  - Add FAQ search/list.
  - Add live chat and emergency chat actions.
  - Show working hours: 06:00 to 22:00.
  - Show estimated wait time.
  - Add AI first response, human escalation, and off-hours unavailable state.

- Add Traveller review submission.
  - Add 1-to-5 star input.
  - Add review text field and character counter.
  - Add eligibility check for visited/booked businesses within 14 days.
  - Add too-short/too-long, duplicate-review, and moderation states.
  - Add edit/delete state.

- Add Business profile and availability management.
  - Add profile edit form.
  - Add opening hours, description, photos/placeholders, category/type, offers.
  - Add subtype fields such as menu, fees, occupancy, movie list, or club theme.
  - Add availability/calendar management.

## Current Risks And Concerns

- The prototype currently does not meet the minimum clickable scope listed in `PLAN_MOCK_UP.md`.
- The README says the Admin dashboard is planned but not built, while the plan requires it.
- The demo path mentions booking, but the current detail page only supports joining a waitlist.
- The business waitlist always shows Alex's request, even before a traveller submits one.
- There is no dedicated traveller booking confirmation screen after the business accepts a request.
- Search and filters are mostly visual only; they do not change results or show empty/error states.
- The dummy map is acceptable for a mockup, but it does not yet show route alternatives, disruption markers, start route, save route, or no-alternative route behavior.
- Privacy and consent are too simplified for the SRS/GDPR requirements.
- Weather and transport are only cards on the Home screen, not complete flows.
- Reviews are currently represented from the business side only; traveller submission and validation are missing.
- PlanShare has list/request basics, but no real detail, creation, editing, privacy, cancellation, or moderation flow.
- The traceability checklist in the plan is not yet visibly covered by the app.

## Lower Priority Improvements

- Add more Cologne-specific sample places and business types.
- Add map/list toggle behavior.
- Add manual refresh buttons for weather and transport.
- Add location-off prompt and limited-permission state.
- Add no-results state for search.
- Add external service unavailable states for weather/transport.
- Add notification examples for booking, plans, reviews, support, weather, and transport.
- Add stronger visual distinction between traveller, business, and admin areas.

