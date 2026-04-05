const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, confirm } = req.body;

    console.log('📝 REGISTRATION ATTEMPT:', email);

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email exists
    const exists = await User.findOne({ email });
    if (exists) {
      console.log('❌ Email already registered:', email);
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one uppercase letter' });
    }

    if (!/\d/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one number' });
    }

    console.log('✅ Password validation passed');

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    console.log('✅ Password hashed');

    // Create user
    const user = await User.create({
      name,
      email,
      passwordHash
    });

    console.log('✅ User created:', email);

    const token = generateToken(user);

    console.log('✅ TOKEN GENERATED:', email);

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (err) {
    console.error('❌ REGISTER ERROR:', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 LOGIN ATTEMPT:', email);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('✅ User found:', email);

    // Verify password
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      console.log('❌ Password mismatch for:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('✅ Password verified for:', email);

    const token = generateToken(user);

    console.log('✅ LOGIN SUCCESS:', email);

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (err) {
    console.error('❌ LOGIN ERROR:', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};
