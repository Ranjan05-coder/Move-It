import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Public pages
import Home from './pages/Home.jsx';
import Packages from './pages/Packages.jsx';
import Services from './pages/Services.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

// Auth pages
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

// User pages
import Checkout from './pages/Checkout.jsx';
import Payment from './pages/Payment.jsx';
import PaymentSuccess from './pages/PaymentSuccess.jsx';
import MyOrders from './pages/MyOrders.jsx';
import OrderDetail from './pages/OrderDetail.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import Support from './pages/Support.jsx';

// Team pages
import TeamDashboard from './pages/team/TeamDashboard.jsx';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminPackages from './pages/admin/AdminPackages.jsx';
import AdminMessages from './pages/admin/AdminMessages.jsx';
import AdminUsers from './pages/admin/AdminUsers.jsx';
import AdminCrew from './pages/admin/AdminCrew.jsx';

export default function App() {
  const location = useLocation();

  // App/Dashboard routes
  const isAppRoute =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/team') ||
    location.pathname.startsWith('/support') ||
    location.pathname.startsWith('/my-orders') ||
    location.pathname.startsWith('/orders') ||
    location.pathname.startsWith('/payment');

  return (
    <>
      {/* Hide marketing navbar on app routes */}
      {!isAppRoute && <Navbar />}

      <main>
        <Routes>

          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment/:orderId"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment-success"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            }
          />

          {/* Team */}
          <Route
            path="/team"
            element={
              <ProtectedRoute role="TEAM">
                <TeamDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/packages"
            element={
              <ProtectedRoute adminOnly>
                <AdminPackages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute adminOnly>
                <AdminMessages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute adminOnly>
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/crew"
            element={
              <ProtectedRoute adminOnly>
                <AdminCrew />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>
    </>
  );
}