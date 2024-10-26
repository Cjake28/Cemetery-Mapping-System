import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = (res, userPayload) => {
    const token = jwt.sign(userPayload, process.env.JWT_SECRET,
        // {
        //     expiresIn:"30d"
        // } 
    );

    res.cookie("HimlayanToken", token, {
        httpOnly: false,
        secure:true,
        strict:'none',
        // domain: '4de5-136-158-61-27.ngrok-free.app', 
    });

    return token;
}