# Haven — Pet Care & Animal Adoption Portal

A full-stack web app to rescue, manage, and adopt animals — built with Next.js, MongoDB, Cloudinary, and Razorpay.

## Features

- **Browse & search animals** — filter by type, gender, age, location; view full profiles (health status, vaccination info, rescue story).
- **Adoption requests** — logged-in users can apply to adopt an animal; admins approve/reject from the dashboard.
- **Report a stray/injured animal** — logged-in users submit a report with a photo (uploaded to Cloudinary), location, and description; admins track and update its rescue status.
- **Donations** — logged-in users can donate via Razorpay Checkout; payments are verified server-side before being recorded.
- **Admin dashboard** (`/admin`) — stats overview, animal management (add/edit/delete with photo upload), adoption request management, rescue report management, donation records.
- **Auth** — register/login with JWT, forgot/reset password via email.

## Requirements

- Node.js 20+ and npm
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (free tier is enough)
- A [Cloudinary](https://cloudinary.com) account (free tier) — for animal & rescue-report photo uploads
- A [Razorpay](https://razorpay.com) account — for donations (Test Mode is enough for development; see note below)
- A Gmail account with an [App Password](https://myaccount.google.com/apppasswords) — for sending password-reset emails

## Project Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create your environment file** — copy the example and fill in your own values:
   ```bash
   cp .env.example .env.local
   ```
   Required variables:
   | Variable | Where to get it |
   |---|---|
   | `MONGODB_URI` | MongoDB Atlas → Connect → Drivers |
   | `JWT_SECRET` | any long random string |
   | `EMAIL_USER` / `EMAIL_PASS` | a Gmail address + its App Password |
   | `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` / `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay Dashboard → Settings → API Keys (Test Mode) |
   | `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Cloudinary Dashboard → Account Details |

3. **Run the dev server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

   > Restart the dev server any time you change `.env.local` — Next.js only reads it at startup.

## Logging in as Admin

There is no self-service way to become an admin (by design — see below). To create an admin account:

1. Register a normal account first at `/register` with the email you want to use.
2. Promote it to admin from your machine, using your own `MONGODB_URI`:
   ```bash
   npm run make-admin -- youremail@example.com
   ```
3. Log in at `/login` with that email — you'll be redirected to `/admin` automatically.

Admin access can only be granted this way (a local script with direct database access), not through any public API route — so there's no admin email or secret hidden in the code for anyone to find.

## Payments — Test Mode Notice

The Razorpay integration is currently running in **Test Mode**. As long as `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` are your **test** keys (they start with `rzp_test_`), **no real money will ever be deducted** from any card, UPI, or bank account — donations only work with Razorpay's official test card numbers (e.g. `4111 1111 1111 1111`, any future expiry, any CVV). Switch to live keys (`rzp_live_...`) only when you're ready to accept real donations, after completing Razorpay's KYC.

## Tech Stack

Next.js (App Router) · MongoDB / Mongoose · JWT auth · Cloudinary · Razorpay · Tailwind CSS
