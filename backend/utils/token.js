import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';

dotenv.config();

export const createToken = async id => {
  const token = await jwt.sign(
    {
      data: id
    },
    process.env.JWT_SECRET,
    { expiresIn: '72h' }
  );
  return token;
};

export const checkToken = async (id, token) => {
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
  return decodedToken.data == id;
};


