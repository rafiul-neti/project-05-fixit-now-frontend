# FixItNow

FixItNow is a full-stack home services booking platform that connects customers with verified technicians for services like electrical work, plumbing, appliance repair, cleaning, and pest control. This repository contains the frontend application.

**Live site:** [fixit-now-frontend-eight.vercel.app](https://fixit-now-frontend-eight.vercel.app/)

## Overview

Customers can browse services by category, view ranked technician profiles for a given service, and book a technician directly from the platform. Technicians manage their own dashboard — accepting or declining booking requests, tracking jobs in progress, editing their offered services and availability, and reviewing their earnings and ratings. Admins get a platform-wide overview and user management tools.

The app is built around three role-based dashboards (customer, technician, admin) sitting behind a public-facing marketing site and service catalog.

## Features

**Public**
- Browsable service catalog with category filtering
- Technician listings ranked by rating, with detailed profiles
- Booking flow with existing or new address selection

**Customer dashboard**
- Booking history and detailed booking view
- Stripe-powered payments, with a full payment history and per-payment detail page
- Leave star ratings and written reviews after a completed booking

**Technician dashboard**
- At-a-glance overview: profile, availability, earnings, ratings, and booking counts
- Accept or decline incoming booking requests
- Track jobs currently in progress and mark them complete
- Manage offered services, including per-service pricing and active/inactive status
- Edit weekly availability and working hours

**Admin dashboard**
- Platform-wide stats: total users, bookings, and revenue
- Recent booking activity across all technicians
- User management, including account status control

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router) with TypeScript
- **UI:** [Base UI](https://base-ui.com/) primitives via shadcn-style components, [Tailwind CSS v4](https://tailwindcss.com/)
- **Forms & validation:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/)
- **Payments:** [Stripe](https://stripe.com/)
- **Deployment:** [Vercel](https://vercel.com/)

The backend (Express, Prisma, PostgreSQL) lives in a separate repository.

## Getting Started

```bash
git clone <repository-url>
cd fixit-now-frontend
npm install
```

Create a `.env.local` file with the required environment variables (backend API URL and any auth-related secrets), then run:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## License

This project was built as part of a full-stack development bootcamp and is not currently licensed for reuse.
