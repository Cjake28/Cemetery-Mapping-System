import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = (res, userPayload) => {
    const token = jwt.sign(userPayload, process.env.JWT_SECRET,
        // {
        //     expiresIn:"30d"
        // } 
    );

    res.cookie("HimlayanToken", token, {
        httpOnly: true,
        secure:true,
        strict:'none',
        domain: 'cemetery-mapping-system.onrender.com', 
    });

    return token;
}