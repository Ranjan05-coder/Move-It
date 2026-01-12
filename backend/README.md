# MoveIt - Backend

## Setup
1. Copy `.env.example` to `.env` and fill values (MONGO_URI, JWT_SECRET).
2. Install dependencies:
   npm install

3. Start dev server:
   npm run dev

## Notes
- Default port: 5000 (change via PORT in .env)
- Endpoints:
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/packages
  - POST /api/orders
  - GET /api/orders/my
  - PUT /api/orders/:id/pay
  - Admin routes prefixed with /api/admin (require admin role)
