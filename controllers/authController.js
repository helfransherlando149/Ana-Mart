const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { nama, role, password } = req.body;
  try {
    let user = await User.findOne({ where: { nama } });
    if (user) return res.status(400).send('User already exists');
    user = await User.create({ nama, role, password });
    res.status(201).send({user});
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {
  const { nama, password } = req.body;

  try {
    const user = await User.findOne({ where: { nama } });
    if (!user) return res.status(400).send('Invalid Credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid Credentials');
    const token = jwt.sign({ id: user.id_user, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};
