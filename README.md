# Move It - Moving & Transportation Service Platform

A comprehensive full-stack web application for managing moving services and transportation bookings with real-time notifications, payment processing, and admin dashboard.

## 🌟 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Booking Management**: Create, view, and manage moving/transportation orders
- **Payment Integration**: Razorpay payment gateway integration
- **Real-time Notifications**: Push notifications for order updates and status changes
- **Admin Dashboard**: Comprehensive admin panel for managing users, orders, packages, and crew
- **Package Management**: Pre-defined and custom moving packages
- **Vehicle Management**: Track available vehicles and their details
- **Contact & Support**: Contact form and support messaging system
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS
- **Role-based Access Control**: Different user roles (user, admin, team)

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Razorpay
- **Environment**: Node.js with dotenv configuration

### Frontend
- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Build Tool**: Vite

### Deployment
- **Backend**: Railway
- **Frontend**: Vercel
- **Containerization**: Docker

## 📁 Project Structure

```
Move It/
├── backend/                 # Node.js/Express server
│   ├── config/             # Database and third-party service configs
│   ├── controllers/        # Request handlers for routes
│   ├── middleware/         # Custom middleware (auth, roles)
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API route definitions
│   ├── utils/             # Utility functions
│   ├── index.js           # Server entry point
│   └── package.json       # Backend dependencies
├── frontend/              # React + Vite application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── api/           # API integration services
│   │   ├── assets/        # Static assets
│   │   └── styles/        # Global styles
│   ├── public/            # Static files
│   ├── index.html         # HTML entry point
│   ├── vite.config.js     # Vite configuration
│   └── tailwind.config.js # Tailwind CSS configuration
├── docker-compose.yml     # Docker setup
├── railway.json           # Railway deployment config
├── vercel.json            # Vercel deployment config
└── README.md              # Project documentation

```

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud: MongoDB Atlas)
- Razorpay account for payment processing
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Ranjan05-coder/Move-It.git
cd Move It
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
NODE_ENV=development
EOF

# Start the backend server
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file (if needed)
cat > .env.local << EOF
VITE_API_URL=http://localhost:5000
EOF

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:5000`

## 🔧 Configuration

### Database Configuration
Database credentials should be set in `backend/config/db.js`. The MongoDB connection string should be provided via environment variable `MONGODB_URI`.

### Razorpay Payment Gateway
Update your Razorpay keys in `backend/config/razorpay.js`:
- `RAZORPAY_KEY_ID`: Your Razorpay Key ID
- `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret

### JWT Configuration
Set a strong `JWT_SECRET` in your `.env` file for secure token generation.

## 📚 API Documentation

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile (protected)

### Order Routes (`/api/orders`)
- `GET /` - Get all orders
- `POST /` - Create new order
- `GET /:id` - Get order details
- `PUT /:id` - Update order
- `DELETE /:id` - Cancel order

### Payment Routes (`/api/payments`)
- `POST /process` - Process payment
- `POST /verify` - Verify payment

### Admin Routes (`/api/admin`)
- `GET /dashboard` - Admin dashboard data
- `GET /users` - Manage users
- `GET /orders` - Manage orders
- `GET /packages` - Manage packages

### Notification Routes (`/api/notifications`)
- `GET /` - Get notifications
- `POST /` - Create notification
- `PUT /:id/read` - Mark as read

### Vehicle Routes (`/api/vehicles`)
- `GET /` - List available vehicles
- `POST /` - Add vehicle
- `PUT /:id` - Update vehicle

### Package Routes (`/api/packages`)
- `GET /` - List available packages
- `POST /` - Create package

## 🔐 Authentication & Authorization

The application uses JWT-based authentication with role-based access control:

- **User**: Can book orders, make payments, view own orders
- **Admin**: Full access to dashboard, manage users, orders, packages
- **Team**: Can manage crew assignments and deliveries

Middleware checks are implemented in `backend/middleware/auth.js` and `backend/middleware/roles.js`

## 📞 Contact & Support

- Contact form available at `/contact`
- Support system with messaging capability
- Email notifications for order updates

## 🐳 Docker Deployment

Build and run using Docker:
```bash
docker build -t move-it .
docker run -p 5000:5000 -p 5173:5173 move-it
```

## 🚢 Deployment

### Railway (Backend)
Configuration file: `railway.json`

### Vercel (Frontend)
Configuration file: `vercel.json`

For deployment instructions, refer to the respective platform documentation.

## 📝 Environment Variables

### Backend
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_jwt_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
NODE_ENV=development
```

### Frontend
```
VITE_API_URL=http://localhost:5000
```

## 🤝 Contributing

1. Create a new branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Ranjan05-coder**

## 📧 Support

For support and queries, please create an issue in the repository or contact through the platform's support system.

---

**Last Updated**: May 2026
