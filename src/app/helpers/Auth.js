import jwt from "jsonwebtoken";
import "dotenv/config.js"; // import dotenv to use process.env


class Auth {
    static createJWTToken(email) {
        const payLoad =  {
            email: email
        };

        const options = {
            expiresIn: '1h',
            algorithm: 'HS256'
        };

        const token = jwt.sign(payLoad, process.env.SECRET_KEY, options);
        console.log(`Token: ${token}`);
        return token;
    }

    // verify token
    static verifyJWTToken = (req, res, next) => {
        // get token from http header Authorization
        let token = null;
        const authHeader = req.headers['authorization']; console.log(`AuthHeader: ${authHeader}`);
        if(authHeader != null) 
        {
            token = authHeader && authHeader.split(' ')[1]; console.log(`Token from Header: ${token}`);
        } else {
            // get token from http cookie
            token = req.cookies.token; console.log(`Token from Cookie: ${token}`);
        }
        // if(token == null) return res.status(401).json({ message: 'Unauthorized' });

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error(err);
                req.email = null;
                // return res.status(403).json({ message: 'Invalid token' });
                next();
            } else {
                console.log(`Decoded: ${decoded}`);
                req.email = decoded.email; 
                console.log(`Email: ${req.email}`);
                next();
            }
        });
    }
}

export default Auth;