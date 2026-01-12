const permit = (...allowed) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userRole = req.user.role.toUpperCase();

    if (!allowed.map(r => r.toUpperCase()).includes(userRole)) {
      return res.status(403).json({
        error: 'Forbidden: insufficient role',
        role: userRole,
        allowed
      });
    }

    next();
  };
};

module.exports = permit;
