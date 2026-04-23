# Sign-up Form and Process Update Walkthrough

We have successfully updated the sign-up process to collect additional user information (Title, First Name, Last Name) and updated the integration with our FastAPI backend to perform a two-step registration and KYC flow silently.

## Changes Made

1. **Frontend Updates (`components/ui/signupForm.jsx`)**
   - Replaced the single `fullname` field with separate fields: `title`, `firstName`, and `lastName`.
   - Used Shadcn's `Select` component for the `title` field with options: Mr, Ms, Mrs.
   - Updated the Zod validation schema to validate the new fields as required.
   - Updated the form submission logic to pass these new fields to the `signupAction`.

2. **Backend API Changes (`lib/api/auth.js`)**
   - Updated `registerWithAPI` payload signature so that we only send `email` and `password` to the `/v1/app/register` endpoint as per requirements.

3. **Server Actions Update (`actions/users.js`)**
   - Refactored `signupAction` to follow the new requested flow:
     1. **Register**: Call `registerWithAPI` to create the user with just email and password.
     2. **Silent Login**: Automatically log the user in using `loginWithAPI` to obtain the authentication token (`access_token`).
     3. **Complete KYC**: Call the `completeKYC` endpoint with the newly acquired token to pass the `title`, `firstName`, and `lastName` fields.
     4. **Session**: Set the server token session cookie so that the user is considered authenticated and ready.

## Testing Your Changes
- Try creating a new account using the new signup form. You will see the new Title, First Name, and Last Name fields. 
- You can inspect the network tab in your browser or Next.js server logs to verify that `/v1/app/register` fires first, followed by `/v1/app/login`, and finally `/v1/app/complete-kyc`.
