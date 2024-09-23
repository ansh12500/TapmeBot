const User = require('../models/User');

const Query = {
  user: async (_, { username }) => {
    return User.findOne({ username });
  },

  allUsers: async () => {
    return User.find();
  },
};

module.exports = Query;
