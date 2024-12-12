const Joi = require("joi");
const userService = require("../services/users.service");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  avatar_url: Joi.string().optional(),
  fullname: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const isValid = await userService.login(value);
    res.status(200).json({ data: isValid });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const user = await userService.createUser(value);
    res.status(201).json({ data: user });
  } catch (error) {
    console.log(error, "error");
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = { createUser, login };
