import jwt from 'jsonwebtoken';

export const verifyAdminToken = (req, res, next) => {
 // Retrieve token from cookies or authorization header
 const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

 if (!token) {
   return res.status(401).json({
     status: false,
     message: 'Access denied. No token provided.',
   });
 }

 try {
   // Verify and decode the token
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.adminId = decoded.id; // Attach the decoded admin ID to the request object
   next(); // Proceed to the next middleware or route handler
 } catch (error) {
   console.error('Token validation error:', error);

   // Handle specific JWT errors
   const errorMessage =
     error.name === 'TokenExpiredError'
       ? 'Token has expired. Please log in again.'
       : 'Invalid token. Authentication failed.';

   return res.status(403).json({
     status: false,
     message: errorMessage,
   });
 }
};
