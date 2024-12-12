const Joi = require("joi");
const bcrypt = require("bcrypt");
const userRepository = require("../repositories/users.repository");

const createUser = async (userData) => {
  let user = await userRepository.findUserByEmail(userData.email);
  if (user.rows.length > 0) {
    console.log(userData)
    throw new Error("user already exist");
  }

  // bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const newUser = { ...userData, password: hashedPassword };
  
  user = await userRepository.createUser(newUser);
  return user;
};

const login = async (loginData) => {
  const user = await userRepository.findUserByEmail(loginData.email);
  
  if (user.rows.length === 0) {
    throw new Error("User not found");
  }

  const validPassword = await bcrypt.compare(loginData.password, user.rows[0].password);
  if (!validPassword) {
    throw new Error("Invalid password");
  }

  return user.isValid = true;
};


module.exports = { createUser , login};
