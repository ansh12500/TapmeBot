const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const Mutation = {
  signUp: async (_, { username, password }) => {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    return newUser.save();
  },

  signIn: async (_, { username, password }) => {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User does not exist');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return { token, user };
  },

  tap: async (_, { userId }, { db }) => {
    // Find user and increment balance
    const user = await db.collection('users').findOne({ _id: userId });
    if (!user) return { success: false, balance: 0 };

    const newBalance = user.balance + 1;
    await db.collection('users').updateOne({ _id: userId }, { $set: { balance: newBalance } });
    return { success: true, balance: newBalance };
  }
};

module.exports = Mutation;
