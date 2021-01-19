import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { AvatarGenerator } from 'random-avatar-generator';
const generator = new AvatarGenerator();

// Local Imports
import User from '../models/user.js';
import { createToken, checkToken } from '../utils/token.js';

export const findUserWithEmail = async email => {
  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    return next(new Error('[ERROR][USERS] Could not find user with email: ', +error));
  }
  return user;
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ message: 'Access denied, invalid Entries.', access: false });
    return next();
  }

  // Find User with email
  const user = await findUserWithEmail(email);
  if (!user) {
    res.json({ message: 'Access denied, incorrect Email.', access: false });
    return next();
  }

  // Decrypt password & Check if password is valid
  const decryptedPassword = await bcrypt.compare(password, user.password);
  if (!decryptedPassword) {
    res.json({ message: 'Access denied, incorrect Password.', access: false });
    return next();
  }

  // Create token
  let token = await createToken(user.id);

  // Send response
  res.json({
    message: '[USER][LOGIN] Access granted.',
    access: true,
    user: { id: user.id, username: user.username, image: user.image, token }
  });
};

export const signup = async (req, res, next) => {
  const { email, password, username } = req.body;
  const defaultImage = generator.generateRandomAvatar();

  // Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ message: 'Access denied, invalid Entries.', access: false });
    return next();
  }

  // Check if user with this email already exists
  const existingUser = await findUserWithEmail(email);
  if (existingUser) {
    res.json({ message: 'Access denied, email already used.', access: false });
    return next();
  }
  // Encrypt password
  const hashedPassword = await bcrypt.hash(password, 8);

  // Create new user.
  const newUser = new User({ email, password: hashedPassword, username, image: defaultImage });
  try {
    await newUser.save();
  } catch (error) {
    return next(new Error('[ERROR][USERS] Could not save user in DB: ' + error));
  }

  // Create token
  let token = await createToken(newUser.id);

  // Send response
  res.json({
    message: '[USER][SIGNUP] Access granted.',
    access: true,
    user: { id: newUser.id, username: newUser.username, image: newUser.image, token }
  });
};

export const guest = async (req, res, next) => {
  const randomUsername = `Guest${Math.floor(Math.random() * 99999) + 1}`;
  const defaultImage = generator.generateRandomAvatar();

  // Create Guest
  const newGuest = new User({ username: randomUsername, image: defaultImage });
  try {
    await newGuest.save();
  } catch (error) {
    return next(new Error('[ERROR][USERS] Could not save guest in DB: ' + error));
  }

  // Send response
  res.json({
    message: '[USER][GUEST] Access granted.',
    access: true,
    user: { id: newGuest.id, username: newGuest.username, image: newGuest.image }
  });
};

export const verify = async (req, res, next) => {
  const { id, token } = req.body;

  // Find user with id
  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    return next(new Error('[ERROR][USERS] Could not find user by id: ' + error));
  }

  // Verify Token
  const tokenIsValid = await checkToken(id, token);
  if (!tokenIsValid) {
    res.json({ message: '[USER][VERIFY] Access denied, invalid token.', access: false });
    return next();
  }

  // Send response
  res.json({
    message: '[USER][LOGIN] Access granted.',
    access: true,
    user: { id: user.id, username: user.username, image: user.image, token }
  });
};

export const edit = async (req, res, next) => {
  const { id, username, image } = req.body;

  // Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Error('[ERROR][USERS] Edit invalid entries: ' + error));
  }

  // Find user by id
  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    return next(new Error('[ERROR][USERS] Could not find user by id: ' + error));
  }

  // Edit username and image
  user.username = username;
  user.image = image;

  // Save changes
  try {
    await user.save();
  } catch (error) {
    return next(new Error('[ERROR][USERS] Could not save user update: ' + error));
  }

  // Send response
  res.json({
    message: '[USER][EDIT] User updated.',
    access: true,
    user: { username: user.username, image: user.image }
  });
};


