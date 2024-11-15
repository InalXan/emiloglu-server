import jwt from "jsonwebtoken";

// secret token
const SECRET =
  "d0d9dc77406ef8cf1f1d461335680c2699db2354816c8077526441907d76d647";

const auth_middleware = function (req, res, next) {
  // Get token from request header
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, auth failed" });
  }
  try {
    // Verify token & extract payload
    const decoded = jwt.verify(token, SECRET);
    console.log("Decoded token:", decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log("Token verification failed:", err.message);

    console.log("Error during token verification:", err);
    res.status(401).json({ msg: "Token is invalid" });
  }
};

export default auth_middleware;
