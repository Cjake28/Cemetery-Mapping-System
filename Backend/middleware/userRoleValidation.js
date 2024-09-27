export const userRoleValidate = (req, res, next) => {
    if (req.userRole === 'user' || req.userRole === 'admin') {
      return next(); // User is allowed to proceed
    }
  
    return res.status(403).json({ success: false, message: "Forbidden - insufficient permissions" });
  };