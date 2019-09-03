import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv();

const createToken = (username: string) => {
  const exp = Math.floor(Date.now() / 1000) + 30;
  return jwt.sign({userID: username, exp: exp}, process.env.secret)
};

export default createToken;
