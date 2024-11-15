import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, adminId) => {
  const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: '1d' // Token expiration time (1 day)
  });

  // Set token as a cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true in production
    sameSite: 'strict',
  });
};
