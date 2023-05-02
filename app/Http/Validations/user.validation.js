const joi = require("joi")

 const register = joi.object({
     lastname: joi.string().max(50).required().messages({
         'any.required': 'lastname field is required',
         'string.base': 'lastname must be a text',
         'string.max': 'lastname must not be more than 50 characters'
     }),
     firstname: joi.string().max(50).required().messages({
         'any.required': 'firstname field is required',
         'string.base': 'firstname must be a text',
         'string.max': 'firstname must not be more than 50 characters'
     }),
     middlename: joi.string().max(50).required().messages({
         'any.required': 'middlename field is required',
         'string.base': 'middlename must be a text',
         'string.max': 'middlename must not be more than 50 characters'
     }),
    email: joi.string().email().trim(true).required().messages({
        'any.required': 'email field is required',
        'string.base': 'email must be a text',
        'email.base':  ''
    }),
     phone: joi.string().length(11).pattern(/[6-9]{1}[0-9]{9}/).required().messages({
         'any.required': 'phone field is required',
     }),
    password: joi.string().min(6).required().messages({
        'any.required': 'password field is required',
    }),

     password_confirmation: joi.any().valid(joi.ref('password')).required().messages({
         "any.only": "The two passwords do not match",
         "any.required": "Please re-enter the password",
     }),

});

 const login = joi.object({
     email: joi.string().email().trim(true).required().messages({
         'any.required': 'email field is required',
         'string.base': 'email must be a text',
         'email.base':  ''
     }),
     password: joi.string().required().messages({
         'any.required': 'password field is required',
     }),
});

const resetPassword = joi.object({
    email: joi.string().email().trim(true).required().messages({
        'any.required': 'email field is required',
        'string.base': 'email must be a text',
        'email.base':  ''
    })
});

const activeStatus = joi.object({
    active: joi.boolean().required().messages({
        'any.required': 'active field is required',
        'boolean.base': 'active must be either true or false',
    })
});

const adminStatus = joi.object({
    is_admin: joi.boolean().required().messages({
        'any.required': 'is_admin field is required',
        'boolean.base': 'is_admin must be either true or false',
    })
});

const updatePassword = joi.object({
    password: joi.string().min(6).required().messages({
        'any.required': 'password field is required',
    }),

    password_confirmation: joi.any().valid(joi.ref('password')).required().messages({
        "any.only": "The two passwords do not match",
        "any.required": "Please re-enter the password",
    }),
});

const update = joi.object({
    lastname: joi.string().max(50).messages({
        'string.base': 'lastname must be a text',
        'string.max': 'lastname must not be more than 50 characters'
    }),
    firstname: joi.string().max(50).messages({
        'string.base': 'firstname must be a text',
        'string.max': 'firstname must not be more than 50 characters'
    }),
    middlename: joi.string().max(50).messages({
        'string.base': 'middlename must be a text',
        'string.max': 'middlename must not be more than 50 characters'
    }),
    email: joi.string().email().trim(true).messages({
        'string.base': 'email must be a text',
        'email.base':  ''
    }),
    phone: joi.string().length(11).pattern(/[6-9]{1}[0-9]{9}/)

});


// joi.object({
//     userName: joi.string().alphanum().min(3).max(25).trim(true).required(),
//     email: joi.string().email().trim(true).required(),
//     password: joi.string().min(8).trim(true).required(),
//     mobileNumber: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
//     birthYear: joi.number().integer().min(1920).max(2000),
//     skillSet: joi.array().items(joi.string().alphanum().trim(true))
//         .default([]),
//     is_active: joi.boolean().default(true),
// });

module.exports = { register, login, resetPassword, updatePassword, update, activeStatus, adminStatus };
// export default { register, login };