const Package = require('../models/Package');

// PUBLIC: list packages
exports.listPackages = async (req, res) => {
  try {
    const packages = await Package.find().sort({ price: 1 });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: create package
exports.createPackage = async (req, res) => {
  try {
    const { name, description, price, features, isPopular } = req.body;

    if (!name || price == null) {
      return res.status(400).json({ error: 'Name and price required' });
    }

    const pkg = await Package.create({
      name,
      description,
      price,
      features,
      isPopular: !!isPopular
    });

    res.status(201).json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: update package
exports.updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        features: req.body.features,
        isPopular: req.body.isPopular
      },
      { new: true }
    );

    if (!pkg) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: delete package
exports.deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) return res.status(404).json({ error: 'Package not found' });

    res.json({ message: 'Package deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
