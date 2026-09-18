# Requirements Document

## Introduction

This document defines what "launch-ready" means for ShubhMarg, a Vedic astrology guidance platform built on Next.js 16 (Turbopack) with Supabase, deploying to the `shubhmarg` domain on Vercel with a target go-live on Janmashtami.

The purpose of this spec is **not** to build new product features. It is to define a verifiable go-live process: a set of checks and approval gates that surface every error, bug, configuration gap, and required owner action **before** production deployment. Most requirements are therefore **verification gates** (confirm a condition holds) or **owner-approval/manual-action gates** (a human with production access must perform or authorize an action). These are captured explicitly so that no launch-blocking step is silently skipped.

The primary actor throughout is the **Launch Operator** (the person running the go-live checklist) and, where production credentials, billing, or external accounts are involved, the **Site Owner**.

## Glossary

- **Launch_Readiness_Process**: The end-to-end checklist and verification workflow that determines whether ShubhMarg may be deployed to production.
- **Launch_Operator**: The person executing the launch-readiness checklist against the codebase and deployment.
- **Site_Owner**: The person with production account access (Vercel, Supabase, Telegram, UPI, DNS, billing) who authorizes and performs privileged actions.
- **Production_Environment**: The Vercel deployment serving the `shubhmarg` domain to end users.
- **Build_System**: The Next.js 16 Turbopack build and TypeScript type-checker.
- **Env_Config**: The set of environment variables required by ShubhMarg in a given environment.
- **Supabase_Backend**: The Supabase project providing Postgres, Auth, and RLS for ShubhMarg.
- **Migration_Set**: The ordered SQL files in `database/migrations/` that define the production database schema.
- **RLS**: Row Level Security policies enforced by Supabase Postgres.
- **Phone_Auth**: Supabase phone-OTP authentication using an SMS provider, consumed via `@supabase/ssr`.
- **Proxy_Layer**: The Next.js 16 middleware-equivalent (`proxy.ts`) that performs admin Basic Auth and Supabase session refresh.
- **Wallet_System**: The user wallet, balance, and `wallet_transactions` subsystem.
- **Telegram_Approval_Flow**: The manual wallet top-up approve/reject flow driven by the Telegram bot webhook at `/api/telegram-webhook`.
- **UPI_Payment_Flow**: The UPI QR + manual/webhook verification flow at `/api/upi-webhook` for guidance orders.
- **Webhook_Endpoint**: An externally-callable route (`/api/telegram-webhook`, `/api/upi-webhook`) protected by a shared secret.
- **Admin_Dashboard**: The administrative UI gated by `ADMIN_USERNAME`/`ADMIN_PASSWORD` Basic Auth.
- **Translation_System**: The 8-language `useT()` string system.
- **Festival_Greeting**: The date-detected Janmashtami greeting.
- **SEO_Assets**: Metadata, Open Graph tags, `sitemap`, and `robots` configuration for the `shubhmarg` domain.
- **PWA_Assets**: Favicon, web manifest, and installable-app icons/assets.
- **Analytics_Integration**: The Meta Pixel tracking integration.
- **Legal_Pages**: The privacy policy, terms of service, and refunds/cancellation pages.
- **Rollback_Plan**: The documented procedure to revert Production_Environment to the last known-good state.
- **Launch_Readiness_Report**: The recorded outcome (pass/fail per requirement, with owner-action items) produced by the Launch_Readiness_Process.
- **Owner_Action_Item**: A launch-blocking step that requires the Site_Owner to perform or authorize a privileged/external action.

## Requirements

### Requirement 1: Build and Type-Check Integrity

**User Story:** As the Launch Operator, I want the production build and type-check to pass with zero errors, so that I do not deploy code that fails to compile.

#### Acceptance Criteria

1. WHEN the Launch_Operator runs the production build, THE Build_System SHALL complete with zero errors.
2. WHEN the Launch_Operator runs the TypeScript type-check, THE Build_System SHALL report zero type errors.
3. IF the Build_System reports any error or the build exits with a non-zero status, THEN THE Launch_Readiness_Process SHALL mark the build gate as failed and block deployment.
4. WHEN the production build completes, THE Launch_Readiness_Process SHALL record the build result in the Launch_Readiness_Report.

### Requirement 2: Production Environment Variables Configured

**User Story:** As the Launch Operator, I want every required environment variable present and valid in production, so that runtime features do not fail due to missing configuration.

#### Acceptance Criteria

1. THE Launch_Readiness_Process SHALL verify that the following variables are present in the Production_Environment Env_Config: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ASTROLOGY_API_ACCESS_TOKEN`, `UPI_WEBHOOK_SECRET`, `NEXT_PUBLIC_UPI_VPA`, `NEXT_PUBLIC_UPI_PAYEE_NAME`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, and `TELEGRAM_WEBHOOK_SECRET`.
2. IF any required variable in the Production_Environment Env_Config is missing or empty, THEN THE Launch_Readiness_Process SHALL mark the environment gate as failed and identify each missing variable by name.
3. WHERE a variable holds a secret value, THE Launch_Readiness_Process SHALL report the variable by name only and SHALL exclude the secret value from the Launch_Readiness_Report.
4. THE Launch_Readiness_Process SHALL record setting production environment variables and secrets in Vercel as an Owner_Action_Item requiring Site_Owner action.

### Requirement 3: Database Migrations Applied and RLS Verified

**User Story:** As the Launch Operator, I want all database migrations applied and RLS enforced in production, so that the schema is complete and user data is protected.

#### Acceptance Criteria

1. THE Launch_Readiness_Process SHALL verify that every migration in the Migration_Set has been applied to the production Supabase_Backend in filename order.
2. WHEN the Migration_Set is verified, THE Launch_Readiness_Process SHALL confirm that the `guidance_requests`, `user_profiles`, `wallets`, and `wallet_transactions` tables exist in the production Supabase_Backend.
3. THE Launch_Readiness_Process SHALL verify that RLS is enabled on each table that stores user-owned data.
4. IF any table storing user-owned data has RLS disabled or has no policy restricting rows to their owner, THEN THE Launch_Readiness_Process SHALL mark the RLS gate as failed and identify each affected table.
5. THE Launch_Readiness_Process SHALL record running the Migration_Set against the production Supabase_Backend as an Owner_Action_Item requiring Site_Owner action.

### Requirement 4: Supabase Phone Auth and OTP Login

**User Story:** As the Launch Operator, I want phone-OTP login working in production, so that users can authenticate and access the Wallet_System.

#### Acceptance Criteria

1. THE Launch_Readiness_Process SHALL verify that Phone_Auth is enabled with a configured SMS provider in the production Supabase_Backend.
2. WHEN a user submits a valid phone number in the Production_Environment, THE Phone_Auth SHALL deliver a one-time password to that phone number.
3. WHEN a user submits the correct one-time password, THE Phone_Auth SHALL establish an authenticated session.
4. IF a user submits an incorrect or expired one-time password, THEN THE Phone_Auth SHALL reject the login attempt and return an error message.
5. THE Launch_Readiness_Process SHALL record enabling Supabase Phone_Auth and funding the SMS provider billing as an Owner_Action_Item requiring Site_Owner action.

### Requirement 5: Wallet Top-Up and Telegram Approval Flow

**User Story:** As the Launch Operator, I want the wallet top-up and Telegram approve/reject flow working end-to-end in production, so that users can add funds and the owner can approve them.

#### Acceptance Criteria

1. WHEN an authenticated user submits a wallet top-up request in the Production_Environment, THE Wallet_System SHALL create a pending transaction and notify the Site_Owner through the Telegram bot.
2. WHEN the Site_Owner approves a pending top-up through the Telegram_Approval_Flow, THE Wallet_System SHALL credit the approved amount to the user's wallet and mark the transaction approved.
3. WHEN the Site_Owner rejects a pending top-up through the Telegram_Approval_Flow, THE Wallet_System SHALL mark the transaction rejected and leave the wallet balance unchanged.
4. IF a request to `/api/telegram-webhook` does not present the value matching `TELEGRAM_WEBHOOK_SECRET`, THEN THE Webhook_Endpoint SHALL reject the request without changing any wallet balance.
5. THE Launch_Readiness_Process SHALL record registering the Telegram webhook (`setWebhook`) against the production URL as an Owner_Action_Item requiring Site_Owner action.

### Requirement 6: UPI Payment and Verification Flow

**User Story:** As the Launch Operator, I want the UPI payment and verification flow working in production, so that guidance orders can be paid and confirmed.

#### Acceptance Criteria

1. WHEN a user initiates a guidance order payment in the Production_Environment, THE UPI_Payment_Flow SHALL present a UPI QR code containing `NEXT_PUBLIC_UPI_VPA` and `NEXT_PUBLIC_UPI_PAYEE_NAME`.
2. WHEN a valid payment confirmation is received at `/api/upi-webhook`, THE UPI_Payment_Flow SHALL mark the associated guidance order as paid.
3. IF a request to `/api/upi-webhook` does not present the value matching `UPI_WEBHOOK_SECRET`, THEN THE Webhook_Endpoint SHALL reject the request without marking any order as paid.
4. THE Launch_Readiness_Process SHALL record registering the UPI webhook and configuring the production UPI VPA as an Owner_Action_Item requiring Site_Owner action.

### Requirement 7: Webhook Secrets Set and Endpoints Protected

**User Story:** As the Launch Operator, I want all webhook endpoints protected by shared secrets in production, so that external callers cannot forge payment or approval events.

#### Acceptance Criteria

1. THE Launch_Readiness_Process SHALL verify that `TELEGRAM_WEBHOOK_SECRET` and `UPI_WEBHOOK_SECRET` are set in the Production_Environment Env_Config.
2. WHEN a request reaches a Webhook_Endpoint without the matching secret, THE Webhook_Endpoint SHALL return an authentication failure and perform no state change.
3. IF a Webhook_Endpoint has no secret configured in the Production_Environment, THEN THE Launch_Readiness_Process SHALL mark the webhook gate as failed and block deployment.

### Requirement 8: Admin Dashboard Protected (Fail-Closed)

**User Story:** As the Launch Operator, I want the admin dashboard to be inaccessible without valid credentials in production, so that administrative functions are never exposed.

#### Acceptance Criteria

1. WHEN a request for the Admin_Dashboard presents credentials matching `ADMIN_USERNAME` and `ADMIN_PASSWORD`, THE Proxy_Layer SHALL grant access.
2. IF a request for the Admin_Dashboard presents missing or incorrect credentials, THEN THE Proxy_Layer SHALL deny access and return an authentication challenge.
3. IF `ADMIN_USERNAME` or `ADMIN_PASSWORD` is missing from the Production_Environment Env_Config, THEN THE Proxy_Layer SHALL deny all access to the Admin_Dashboard (fail-closed).
4. THE Launch_Readiness_Process SHALL verify the fail-closed behavior of the Admin_Dashboard before deployment.

### Requirement 9: SEO, Metadata, and Crawler Assets

**User Story:** As the Launch Operator, I want SEO metadata, Open Graph tags, sitemap, and robots configured for the shubhmarg domain, so that the site is discoverable and shares correctly.

#### Acceptance Criteria

1. THE Launch_Readiness_Process SHALL verify that page metadata (title and description) is present and references the `shubhmarg` domain.
2. THE SEO_Assets SHALL include Open Graph tags with a resolvable image, title, and URL on the `shubhmarg` domain.
3. THE SEO_Assets SHALL include a `sitemap` and a `robots` configuration that reference the `shubhmarg` production URL.
4. IF the `robots` configuration disallows crawling of the production site, THEN THE Launch_Readiness_Process SHALL mark the SEO gate as failed.

### Requirement 10: Favicon, Manifest, and PWA Assets

**User Story:** As the Launch Operator, I want favicon, manifest, and PWA assets present, so that the site renders a proper icon and is installable.

#### Acceptance Criteria

1. THE Launch_Readiness_Process SHALL verify that a favicon and a web manifest are served in the Production_Environment.
2. THE PWA_Assets SHALL include the icon sizes referenced by the web manifest.
3. IF any icon referenced by the web manifest is missing, THEN THE Launch_Readiness_Process SHALL mark the PWA asset gate as failed and identify each missing asset.

### Requirement 11: Mobile and iOS Performance Verified

**User Story:** As the Launch Operator, I want mobile and iOS performance safeguards verified, so that the site stays smooth on phones per the design-system rules.

#### Acceptance Criteria

1. THE Launch_Readiness_Process SHALL verify that native scroll is preserved on touch devices (Lenis `syncTouch` remains disabled).
2. THE Launch_Readiness_Process SHALL verify that every WebGL/Three.js canvas pauses rendering while off-screen.
3. THE Launch_Readiness_Process SHALL verify that ambient-glow blur is capped on viewports narrower than 768px per the design-system mobile guard.
4. IF the Site_Owner reports a rendering or scroll defect during device spot-check, THEN THE Launch_Readiness_Process SHALL record the defect and mark the mobile-performance gate as failed.
5. THE Launch_Readiness_Process SHALL record an iOS device spot-check as an Owner_Action_Item requiring Site_Owner action.

### Requirement 12: Accessibility Basics

**User Story:** As the Launch Operator, I want accessibility basics verified, so that the site meets contrast, focus, and reduced-motion expectations.

#### Acceptance Criteria

1. THE Launch_Readiness_Process SHALL verify that body and heading text meets the design-system dark-on-light contrast rule (no faint light text on light background).
2. THE Launch_Readiness_Process SHALL verify that interactive elements expose a visible focus state.
3. WHILE the user has enabled a reduced-motion preference, THE Launch_Readiness_Process SHALL verify that infinite motion loops are suppressed.
4. IF an interactive element lacks a visible focus state, THEN THE Launch_Readiness_Process SHALL mark the accessibility gate as failed and identify the affected element.

### Requirement 13: Analytics Configured

**User Story:** As the Launch Operator, I want Meta Pixel analytics configured in production, so that launch traffic is measurable.

#### Acceptance Criteria

1. THE Launch_Readiness_Process SHALL verify that the Analytics_Integration is present with a configured Meta Pixel identifier in the Production_Environment.
2. WHEN a page loads in the Production_Environment, THE Analytics_Integration SHALL send a page-view event to Meta Pixel.
3. IF the Meta Pixel identifier is missing, THEN THE Launch_Readiness_Process SHALL mark the analytics gate as incomplete and record it as an Owner_Action_Item requiring Site_Owner action.

### Requirement 14: Error, Empty, and Loading States

**User Story:** As the Launch Operator, I want error, empty, and loading states present for data-driven sections, so that users never see broken or blank screens.

#### Acceptance Criteria

1. WHILE a data-driven section is loading, THE section SHALL display a skeleton or loading state.
2. WHEN a data-driven section resolves with no data, THE section SHALL display an empty state with a prompt or call to action.
3. IF a data request fails, THEN THE section SHALL display an error state rather than a blank region.
4. THE Launch_Readiness_Process SHALL verify that a branded not-found (404) page is served for unknown routes.

### Requirement 15: Legal Pages Present and Linked

**User Story:** As the Launch Operator, I want privacy, terms, and refunds pages present and linked, so that the launch complies with payment and legal obligations.

#### Acceptance Criteria

1. THE Launch_Readiness_Process SHALL verify that the privacy policy, terms of service, and refunds/cancellation Legal_Pages are reachable in the Production_Environment.
2. THE Launch_Readiness_Process SHALL verify that each of the Legal_Pages is linked from a persistent navigation element such as the footer.
3. IF any of the Legal_Pages returns a not-found response, THEN THE Launch_Readiness_Process SHALL mark the legal gate as failed and identify the missing page.

### Requirement 16: Rollback Plan

**User Story:** As the Launch Operator, I want a documented rollback plan, so that I can revert quickly if the launch deployment is defective.

#### Acceptance Criteria

1. THE Launch_Readiness_Process SHALL confirm that a Rollback_Plan is documented before deployment.
2. THE Rollback_Plan SHALL identify the last known-good deployment and the procedure to promote it in Vercel.
3. THE Rollback_Plan SHALL state the procedure for handling database changes that cannot be reverted by redeploying code.
4. WHEN a launch-blocking defect is detected in the Production_Environment after go-live, THE Rollback_Plan SHALL provide the steps to restore the last known-good state.

### Requirement 17: Owner Approval and Manual-Action Gate

**User Story:** As the Launch Operator, I want every privileged and external action captured as an explicit owner-approval item, so that nothing requiring the Site_Owner is silently skipped before go-live.

#### Acceptance Criteria

1. THE Launch_Readiness_Process SHALL maintain a list of Owner_Action_Item entries covering, at minimum: enabling Supabase Phone_Auth and funding SMS billing, setting production environment variables and secrets in Vercel, pointing DNS for the `shubhmarg` domain, running the Migration_Set against the production Supabase_Backend, registering the Telegram and UPI webhooks, and funding the UPI payee account.
2. THE Launch_Readiness_Process SHALL record each Owner_Action_Item as pending until the Site_Owner confirms completion.
3. IF any Owner_Action_Item remains pending, THEN THE Launch_Readiness_Process SHALL block go-live and identify each pending item.
4. WHEN all Owner_Action_Item entries are confirmed complete and all verification gates pass, THE Launch_Readiness_Process SHALL mark ShubhMarg as launch-ready in the Launch_Readiness_Report.

### Requirement 18: Theme and Festival Greeting Verification

**User Story:** As the Launch Operator, I want the temple-aesthetic theme and Janmashtami greeting verified, so that the launch-day presentation is correct and the recent background-flash fix holds.

#### Acceptance Criteria

1. WHEN a page loads in the Production_Environment, THE site SHALL render the bright temple-aesthetic theme without a body background flash.
2. WHILE the current date matches the Janmashtami festival date, THE Festival_Greeting SHALL be displayed.
3. THE Launch_Readiness_Process SHALL verify that the Translation_System resolves user-facing strings for all 8 supported languages without missing keys.
4. IF a user-facing string has no translation for a supported language, THEN THE Launch_Readiness_Process SHALL mark the translation gate as failed and identify the missing key.
