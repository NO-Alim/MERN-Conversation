const mongoose = require('mongoose');

const convertObjectId = (id) => {
  const newId = new mongoose.Types.ObjectId(id);
  return newId;
};

module.exports = convertObjectId;
