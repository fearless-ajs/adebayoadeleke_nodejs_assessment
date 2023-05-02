const jwt  = require('jsonwebtoken');

const AppError = require('./../Exceptions/appError');

class AuthServiceProvider {
    constructor() {
        this.role = undefined;
        this.permission = undefined;
    }

    createSendToken =  async (user,  statusCode, res) => {
        const token = this.signToken(user._id);

        //Sets the cookie also
        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
            sameSite: 'none',
            secure: true
        }
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
        res.cookie('jwt', token, cookieOptions);

        //Remove password from the output
        user.password = undefined;

        await res.status(statusCode).json({
            statusCode: 'SUCCESS',
            token,
            data: {
                ...user._doc
            }
        });
    };

    restrictTo = (...roles) => {
        return (req, res, next) => {
            // roles ['admin', 'lead-guide']. role='user'
            if (!roles.includes(req.user.role)){
                return next(
                    new AppError('You do not have the permission to perform this action', 403)
                );
            }

            next();
        };
    };

    signToken = id => {
        return jwt.sign({ id: id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
    };


}
module.exports = AuthServiceProvider;