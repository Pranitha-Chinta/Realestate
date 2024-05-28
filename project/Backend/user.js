

const User = require('./userController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ _id: user._id }, 'secretKey');
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};
