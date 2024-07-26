const User  = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { nama, role, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).send('User not found');

    user.nama = nama || user.nama;
    user.role = role || user.role;
    if (password) user.password = password;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).send('User not found');

    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
