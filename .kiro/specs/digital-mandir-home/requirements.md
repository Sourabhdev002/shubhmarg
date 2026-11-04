# Requirements Document

## Introduction

This feature turns the ShubhMarg home page (`src/app/page.tsx`) into a calm "digital mandir". A visitor should come every day to ring the bell, read the day's chalisa, do aarti, and see upcoming festivals. The many-astrologer and astrology-hype sections leave the home page. One honest Pandit Ji takes their place.

One rule beats every other rule: NOTHING on the home page may be fake. No invented names, photos, numbers, reviews, "live" claims or urgency. If a fact is not real and confirmed, it is not shown.

The new home page order is:

1. Welcome and Temple Bell
2. आज का पाठ (Today's Paath)
3. आरती (Aarti) - new
4. Festivals
5. पंडित जी (Pandit Ji card) - new
6. ₹11 Aashirwad

The Welcome section replaces the current Hero at the top of the page. A weekday deity image (the "darshan") fills the top and stays fixed behind the rest of the page, which shows as ivory glass cards. The old sections (astrologer roster, testimonials, practitioner bio, live ticker, concern picker, verified delivery, free tools row, rashi today, pricing grid) are taken off the home page. Their own pages and routes stay live for SEO. The Owner has approved deleting old components that have no importer left after this change (see Requirement 9).

## Glossary

- **Home_Page**: The page rendered by `src/app/page.tsx` at `/`.
- **Welcome_Section**: The top section with the heading "मंदिर में आपका स्वागत है" and the temple bell. It REPLACES the current `Hero` component and holds the only `h1` of the Home_Page.
- **Aashirwad_Page**: A small page at `/aashirwad` that hosts the existing ₹11 "Aaj Ka Aashirwad" flow (`RashiToday` with `QuickUnlockModal`), so the flow keeps working after `RashiToday` leaves the Home_Page.
- **Temple_Bell**: The tappable bell in `TempleBellStrip`, using `RealisticTempleBell3D` and `playTempleBellResonance`.
- **Paath_Section**: The existing `TodaysPaath` section showing the paath for today's weekday.
- **Aarti_Section**: The new home section showing today's aarti.
- **Aarti_Config**: The data file that holds each aarti (deity, title, lyrics, weekdays, optional audio, `verified` flag).
- **Verified_Flag**: A boolean `verified` on a paath or aarti. It is `true` only after Pandit Ji has checked the text.
- **Diya_Button**: The button in the Aarti_Section that the visitor taps to wave the diya.
- **Festival_Section**: The existing `UpcomingFestivals` section.
- **Pandit_Card**: The new single card that introduces Pandit Ji and shows the buy ladder.
- **Pandit_Config**: The ONE config file that holds Pandit Ji's real name, photo, city, years of practice and languages.
- **Buy_Ladder**: The three offers in the Pandit_Card: Quick Answer, Personal Guidance, Temple Sankalp.
- **Pricing_Source**: `getServicePrice` in `src/lib/pricing.ts`.
- **Aashirwad_Section**: The existing `AashirwadStrip` section.
- **Removed_Sections**: AstrologerRoster, TestimonialCarousel, PractitionerBio, CelestialLiveTicker, ChooseByConcern, VerifiedDelivery, FreeToolsRow, RashiToday, PricingGrid.
- **IST_Weekday**: The day of the week (0 = Sunday to 6 = Saturday) computed on the server in the Asia/Kolkata time zone.
- **Owner**: Dhruv (Aryan), the site owner.
- **Pandit_Ji**: The one real priest/astrologer who gives guidance on ShubhMarg.
- **Reduced_Motion**: The visitor's `prefers-reduced-motion` setting.
- **Darshan_Picker**: The pure function `pickDarshanImage(weekday)` in `src/lib/darshan.ts` that maps an IST_Weekday to a deity key.
- **Deity_Key**: One of `shiv`, `hanuman`, `durga`, `vishnu`.
- **Darshan_Image**: The Owner-supplied file `public/images/darshan/<Deity_Key>.jpg`.
- **Available_Darshan_List**: The config list in `src/config/darshan.ts` of Deity_Keys whose Darshan_Image file exists.
- **Darshan_Backdrop**: The `position: fixed` layer that shows the Darshan_Image behind the page content.
- **Glass_Card**: A section surface with an ivory, cream or saffron tint at 85% opacity or more and a light backdrop blur.

## Requirements

### Requirement 1: Home page order

**User Story:** As a visitor, I want the home page to feel like a temple, so that I can ring the bell, read the paath and do aarti first.

#### Acceptance Criteria

1. THE Home_Page SHALL render these sections in this order: Welcome_Section, Paath_Section, Aarti_Section, Festival_Section, Pandit_Card, Aashirwad_Section.
2. WHEN the Festival_Section has no upcoming festivals, THE Home_Page SHALL skip the Festival_Section and keep the order of the other sections.
3. THE Home_Page SHALL place a `section-seam` divider between neighbouring sections.
4. THE Home_Page SHALL alternate section surfaces so that no two neighbouring sections use the same surface class. (With the Darshan_Backdrop, the surface classes are ivory glass, cream glass and saffron wash tints.)
5. WHEN today is a festival day, THE Home_Page SHALL show the existing `FestivalDayRibbon` above the Welcome_Section.

### Requirement 2: Welcome and Temple Bell

**User Story:** As a visitor, I want to be welcomed and ring the bell, so that I start my visit with a small prayer.

#### Acceptance Criteria

1. THE Welcome_Section SHALL show the heading "मंदिर में आपका स्वागत है".
2. THE Welcome_Section SHALL contain the existing Temple_Bell from `TempleBellStrip` without changing its sound or 3D bell components.
3. WHEN a visitor taps or presses Enter or Space on the Temple_Bell, THE Temple_Bell SHALL play the bell sound through `playTempleBellResonance`.
4. THE Temple_Bell SHALL be a button with an accessible label that names the action in the visitor's language.
5. WHILE Reduced_Motion is on, THE Temple_Bell SHALL play the sound and skip the swinging animation.
6. THE Welcome_Section SHALL show no claim of live visitors, live counts or timers.
7. THE Welcome_Section SHALL contain the one and only `h1` of the Home_Page.
8. THE Home_Page SHALL no longer render the `Hero` component.

### Requirement 3: आज का पाठ

**User Story:** As a devotee, I want to see today's paath on the home page, so that I can read it the same day.

#### Acceptance Criteria

1. THE Home_Page SHALL compute the IST_Weekday on the server and pass it to the Paath_Section as a prop.
2. WHEN the IST_Weekday is given, THE Paath_Section SHALL show the paath that `getTodaysPaath` returns for that weekday.
3. WHERE the paath is Hanuman Chalisa, THE Paath_Section SHALL show the image at `public/images/paath/hanuman-chalisa.jpg`.
4. IF a paath has Verified_Flag set to false, THEN THE Paath_Section SHALL leave that paath out of the home page.
5. THE Paath_Section SHALL give the same output on the server and in the browser for the same IST_Weekday, so that no hydration mismatch happens.

### Requirement 4: Aarti section

**User Story:** As a devotee, I want today's aarti with lyrics and a diya to wave, so that I can do aarti at home.

#### Acceptance Criteria

1. THE Aarti_Config SHALL hold one entry each for Hanuman, Shiv, Durga and Om Jai Jagdish.
2. WHEN the IST_Weekday is given, THE Aarti_Section SHALL pick today's aarti using the `weekdays` list of each Aarti_Config entry.
3. THE Home_Page SHALL compute the IST_Weekday for the Aarti_Section on the server and pass it as a prop.
4. IF the chosen aarti has Verified_Flag set to false, THEN THE Aarti_Section SHALL show no lyrics for that aarti.
5. IF no aarti with Verified_Flag set to true exists for today, THEN THE Home_Page SHALL leave the Aarti_Section out completely.
6. THE Aarti_Config SHALL set Verified_Flag to false for every entry until Pandit Ji has checked the text.
7. WHERE an aarti entry has an `audioSrc` file provided by the Owner, THE Aarti_Section SHALL show a play button for that audio.
8. IF an aarti entry has no `audioSrc`, THEN THE Aarti_Section SHALL show lyrics only and no audio control.
9. THE Aarti_Section SHALL use audio files supplied by the Owner only.
10. WHEN a visitor taps the Diya_Button, THE Aarti_Section SHALL play a diya-wave animation that uses only `transform` and `opacity`.
11. WHILE Reduced_Motion is on, THE Diya_Button SHALL show a short glow change instead of the wave animation.
12. THE Diya_Button SHALL be a `button` element with an accessible label and SHALL work with Enter and Space.
13. IF the audio file fails to load, THEN THE Aarti_Section SHALL hide the audio control and keep the lyrics visible.

### Requirement 5: Festivals

**User Story:** As a devotee, I want to see upcoming festivals, so that I can plan my prayers.

#### Acceptance Criteria

1. THE Home_Page SHALL render the existing Festival_Section with festival items built by `buildFestivalItems`.
2. THE Festival_Section SHALL keep its current look and links.

### Requirement 6: Pandit Ji card

**User Story:** As a visitor, I want to meet one honest Pandit Ji, so that I know who I am asking for guidance.

#### Acceptance Criteria

1. THE Pandit_Config SHALL be the ONLY place that holds Pandit Ji's real name, photo path, city, years of practice and languages.
2. WHEN a Pandit_Config field has a real value, THE Pandit_Card SHALL show that field.
3. IF a Pandit_Config field is missing or empty, THEN THE Pandit_Card SHALL hide that field and its label completely.
4. IF the photo is missing, THEN THE Pandit_Card SHALL show no photo and no placeholder face.
5. IF the Pandit_Config has no real name, THEN THE Pandit_Card SHALL show only the heading "पंडित जी" and the honesty promises.
6. THE Pandit_Card SHALL show three honesty promises: no fear-selling, no guaranteed results, and an honest answer.
7. THE Pandit_Card SHALL contain no star rating, reviews, customer count, "live" or "online now" claim, countdown or limited-seats message.
8. THE Pandit_Card SHALL show the Buy_Ladder with three offers in this order: Quick Answer, Personal Guidance, Temple Sankalp.
9. THE Pandit_Card SHALL read each Buy_Ladder price from the Pricing_Source using `getServicePrice` and show it with the ₹ symbol.
10. THE Pandit_Card SHALL link Quick Answer to `/quick-answer`.
11. THE Pandit_Card SHALL link Personal Guidance to `/request-guidance?service=vedic-guidance`.
12. THE Pandit_Card SHALL link Temple Sankalp to `/request-guidance?service=temple-puja`.
13. WHEN the price in the Pricing_Source changes, THE Pandit_Card SHALL show the new price without any other code change.
14. THE Pandit_Card SHALL show each offer as a link with visible focus styling and a touch target of at least 44 by 44 pixels.

### Requirement 7: ₹11 Aashirwad

**User Story:** As a visitor, I want a small ₹11 offering, so that I can take a first simple step.

#### Acceptance Criteria

1. THE Home_Page SHALL render the existing Aashirwad_Section as the last section of the page.
2. THE Aashirwad_Section SHALL keep its current offer and its ₹11 price.
3. WHEN a visitor taps the Aashirwad_Section, THE Home_Page SHALL take the visitor to the Aashirwad_Page, because the old scroll target `#rashi-today` no longer exists on the Home_Page.
4. THE Aashirwad_Page SHALL render the existing ₹11 flow so that a visitor can still unlock Aaj Ka Aashirwad.
5. THE header link "Aaj Ka Aashirwad · ₹11" SHALL point to the Aashirwad_Page.

### Requirement 8: Remove sections from the home page

**User Story:** As the owner, I want the unproven or hype sections off the home page, so that the site stays honest.

#### Acceptance Criteria

1. THE Home_Page SHALL render none of the Removed_Sections and not the `Hero`.
2. THE Home_Page SHALL contain no import of any Removed_Section component.
3. THE Home_Page SHALL render no section that shows an unverified number, such as "500+", or an invented testimonial.
4. WHEN the Removed_Sections are taken off the Home_Page, THE System SHALL keep every existing route and page that links to them reachable and unchanged.
5. THE Home_Page SHALL keep its metadata and `revalidate = 3600` setting.

### Requirement 9: Safe-delete candidate list

**User Story:** As the developer, I want a checked list of components that become unused, so that I can delete dead code without breaking pages.

#### Acceptance Criteria

The Owner has approved deleting components that become unused. The requirement below replaces the earlier "ask before delete" rule.

1. WHEN the Home_Page change is done, THE System SHALL delete every component under `src/components` that has zero remaining importers, after a full search that covers static imports, dynamic imports (`import(` and `next/dynamic`), tests in `src/__tests__`, and string references.
2. THE System SHALL also delete each helper file, library file and public asset that becomes unused only because of those deletions, after the same full search proves it has no other user.
3. WHEN a component is deleted, THE verified delete list in `design.md` SHALL show the search evidence that proves it has no importer.
4. IF a component is still imported by any other page, component or test, THEN THE System SHALL keep that component and THE verified list SHALL name the importer.
5. THE System SHALL keep `GlassAstralPanchang`, `TodayEventCard`, `MoonPhaseGlyph`, `SankalpMandala`, `RealisticTempleBell3D` and `celestialAudio`, because `/shubh-calendar` and the Temple_Bell still use them.
6. THE System SHALL check every other file in `src/components/home` (for example `LiveActivityFeed`, `Testimonials`, `SocialProof`, `Hero`) and delete it when it has no importer after the Home_Page change.
7. WHERE a key in `translations.ts` is proven unused by a search that also covers dynamic key prefixes such as ``t(`day.${n}`)``, THE System MAY remove that key.
8. THE System SHALL keep every file that a kept page still needs, including `RashiToday`, `QuickUnlockModal` and their helpers while the Aashirwad_Page uses them.

### Requirement 10: Honesty rule

**User Story:** As the owner, I want a hard no-fake rule, so that visitors can trust everything they see.

#### Acceptance Criteria

1. THE Home_Page SHALL show no invented person name, photo, statistic, testimonial, "live" claim or urgency message.
2. IF a fact is not confirmed by the Owner, THEN THE Home_Page SHALL leave that fact out.
3. WHERE a paath or aarti has Verified_Flag set to false, THE Home_Page SHALL not show its text.
4. THE Home_Page SHALL show no countdown timer, limited-time offer or "only N left" message.

### Requirement 11: Look, motion and accessibility

**User Story:** As a visitor on a phone, I want a bright, calm and easy page, so that I can use it daily.

#### Acceptance Criteria

1. THE Home_Page SHALL use the bright temple colours: ivory `#FBF6EC`, saffron `#E8791E`, antique gold `#B8860B`, ink `#2A1810`, with dark text on light surfaces.
2. THE Home_Page SHALL use Cormorant Garamond for headings and Tiro Devanagari for Devanagari text.
3. THE Home_Page SHALL animate only `transform` and `opacity`.
4. WHILE Reduced_Motion is on, THE Home_Page SHALL turn off infinite and looping animations.
5. THE Home_Page SHALL be designed mobile-first and SHALL show no horizontal scroll at 360 pixel width.
6. THE Home_Page SHALL show every price with the ₹ symbol and never with "Rs.".
7. WHERE a user-facing string follows the existing `useT()` pattern, THE new sections SHALL read that string through `useT()` with entries in `translations.ts`.
8. THE Home_Page SHALL keep heading order logical, with one `h1` and section headings below it.
9. THE Home_Page SHALL give text a colour contrast ratio of at least 4.5 to 1 against its background.
10. THE Home_Page SHALL keep all interactive controls usable with the keyboard.

### Requirement 12: Build and test safety

**User Story:** As the developer, I want the change to be safe, so that the site keeps building and the old tests keep passing.

#### Acceptance Criteria

1. WHEN `npm run build` runs after the change, THE System SHALL finish with zero errors.
2. WHEN the Vitest suite in `src/__tests__` runs, THE System SHALL pass all 43 existing tests.
3. THE new logic for picking today's aarti and for hiding missing Pandit_Config fields SHALL have automated tests in `src/__tests__`.
4. THE Home_Page SHALL not add any new network request on the client at first load, except the single Darshan_Image request.

### Requirement 13: Open questions that do not block the build

**User Story:** As the owner, I want the design to work before I answer open questions, so that nothing waits on me.

#### Acceptance Criteria

1. THE System SHALL work with Pandit_Config empty, showing the honesty promises and Buy_Ladder only.
2. THE System SHALL work with no aarti audio file, showing lyrics only.
3. THE System SHALL work with every aarti Verified_Flag set to false, by leaving the Aarti_Section out.
4. WHEN the Owner later fills Pandit_Config or sets an aarti Verified_Flag to true, THE Home_Page SHALL show the new content with no change outside the config files.

### Requirement 14: Darshan backdrop

**User Story:** As a devotee, I want to see the deity of the day behind the page, so that the home page feels like standing in front of a mandir.

#### Acceptance Criteria

1. WHEN an IST_Weekday from 0 to 6 is given, THE Darshan_Picker SHALL return `shiv` for Monday, `hanuman` for Tuesday and Saturday, `durga` for Friday, and `vishnu` for Sunday, Wednesday and Thursday.
2. IF the given weekday is not an integer from 0 to 6, THEN THE Darshan_Picker SHALL return no deity key.
3. WHEN the picked Deity_Key is in the Available_Darshan_List, THE Home_Page SHALL show the Darshan_Image at `/images/darshan/<Deity_Key>.jpg`.
4. IF the picked Deity_Key is not in the Available_Darshan_List, THEN THE Home_Page SHALL show the plain ivory surface and no image element.
5. THE Home_Page SHALL compute the IST_Weekday for the Darshan_Picker on the server and pass the result as a prop, so that no hydration mismatch happens.
6. THE Darshan_Backdrop SHALL be a `position: fixed` element placed below the page content in stacking order.
7. THE Darshan_Backdrop SHALL render the Darshan_Image with `next/image` using `priority`, `sizes="100vw"` and `object-fit: cover`.
8. THE Darshan_Backdrop SHALL be hidden from assistive technology and use an empty `alt`, because the Welcome_Section text carries the meaning.
9. THE Home_Page SHALL not use `background-attachment: fixed` and SHALL not use `will-change` on `backdrop-filter`.
10. THE Welcome_Section SHALL show the Darshan_Image full width, with the heading, text and Temple_Bell inside an ivory glass panel over the lower part of the section.
11. THE Home_Page SHALL render every section after the Welcome_Section as a Glass_Card with an opacity of at least 85% and a backdrop blur of at most 8 pixels below the `md` breakpoint.
12. THE Home_Page SHALL show dark text on every Glass_Card with a colour contrast ratio of at least 4.5 to 1, including over the darkest pixel of any Darshan_Image.
13. THE Home_Page SHALL scroll natively, without parallax and without scroll-linked motion on the Darshan_Image.
14. WHILE Reduced_Motion is on, THE Darshan_Backdrop SHALL show the Darshan_Image with no motion at all.
15. THE Home_Page SHALL request one Darshan_Image per page load and no other new client network request for it.
16. THE System SHALL use Darshan_Image files supplied by the Owner with the Owner's rights only.
17. WHEN the Owner adds a Deity_Key to the Available_Darshan_List, THE Home_Page SHALL show that image with no change outside the config file.
18. THE Available_Darshan_List SHALL contain only Deity_Keys whose Darshan_Image file exists in `public/images/darshan`.

## Open Questions (Owner has not answered)

The design must work without these answers. Each answer only fills a config file later. (The delete question and the Hero question are now answered and are written into Requirements 2 and 9.)

1. **Pandit Ji real details**: What are his real name, photo, city, years of practice and languages? Until answered, the Pandit_Card hides these fields.
2. **Testimonials**: Are the current testimonials from real customers? Until confirmed real, TestimonialCarousel stays off the home page.
3. **Aarti audio**: Does the Owner have audio files of the four aartis that he has the right to use? Until supplied, the Aarti_Section shows lyrics only.
4. **Roster astrologers**: Is any astrologer in the current roster a real person who works with ShubhMarg? Until confirmed, AstrologerRoster stays off the home page.

## Verified Delete List

The Owner approved deleting unused components. The full list with search evidence is in `design.md` (section "Verified Delete List"). Note: `RashiToday` and `QuickUnlockModal` are KEPT for now, because they carry the ₹11 flow that the Aashirwad_Page hosts.
