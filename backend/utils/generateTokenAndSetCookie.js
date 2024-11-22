import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, adminId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is missing.");
  }

  // Generate the JWT token
  const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: '1d' // Token expiration time (1 day)
  });

  // Set the token as a cookie
  const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day from now

  res.cookie('token', token, {
    httpOnly: true, // Make the cookie inaccessible to JavaScript
    secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
    sameSite: 'strict', // Prevent CSRF attacks
    expires: expirationTime,  // Optional: set cookie expiration time
    path: '/',  // Optional: specify the path for the cookie (default is '/')
  });
};
