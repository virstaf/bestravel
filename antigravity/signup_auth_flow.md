# Update Sign Up Form and API Process

The goal is to update the sign-up process to collect Title, First Name, Last Name, Email, Password, and Confirm Password. We will also modify the API integration so that only `email` and `password` are sent to the `/v1/app/register` endpoint, and the remaining details (Title, First Name, Last Name) are passed to the `/v1/app/complete-kyc` endpoint.

## Proposed Changes

### `components/ui/signupForm.jsx`
- Replace the `fullname` field with three new fields:
  - **Title**: A dropdown/select component with options (Mr, Ms, Mrs).
  - **First Name**: A text input.
  - **Last Name**: A text input.
- Keep **Email**, **Password**, and **Confirm Password** fields.
- Update the Zod schema to enforce validation for all these fields (all required).
- Update the `onSubmit` handler to pass `title`, `firstName`, `lastName`, `email`, and `password` to the `signupAction`.

### `actions/users.js`
- Update `signupAction` to accept the new signature: `(email, password, title, firstName, lastName)`.
- Change the `registerWithAPI` call to only pass `email` and `password`.
- **New Step**: After successful registration, call the KYC endpoint with the rest of the data. 

### `lib/api/auth.js`
- Update `registerWithAPI` signature and payload to only include `email` and `password` in the `apiPost("/v1/app/register")` request.

## Open Questions

> [!WARNING]
> How should we authenticate the call to `complete-kyc` right after registration?
> The `completeKYC(kycData, token)` endpoint in `lib/api/users.js` requires an authentication token. Does the `/v1/app/register` endpoint return a token that we can use? If not, should we silently log the user in using `loginWithAPI` to get the token before calling `complete-kyc`, or should we redirect the user to a dedicated "Complete Profile" page where they log in first?

## Verification Plan

### Manual Verification
- Render the sign-up form and verify all fields (Title, First Name, Last Name, Email, Password, Confirm Password) are displayed and validated correctly.
- Submit the form and inspect the network/server logs to verify:
  1. `/v1/app/register` is called with only `email` and `password`.
  2. The `complete-kyc` endpoint is subsequently called with `title`, `first_name`, and `last_name`.
