import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = (res, userPayload) => {
    const token = jwt.sign(userPayload, process.env.JWT_SECRET,
        {
            expiresIn:"30d"
        } 
    );

    res.cookie("HimlayanToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return token;
}