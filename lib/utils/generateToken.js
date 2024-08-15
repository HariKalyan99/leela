import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, response) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: '10d'
    })

    response.cookie("jwt", token, {
        maxAge: 10*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== 'development'
    })
}

