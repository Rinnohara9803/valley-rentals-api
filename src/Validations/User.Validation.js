const {check, validationResult} = require('express-validator');
exports.UserValidation=[
    check('Fullname',"Fullname must not be empty!").not().isEmpty(),
    check('Email',"Email is required!!").not().isEmpty(),
    check('Email',"Invalid Email").isEmail(),
    check('Password',"Password is required").not().isEmpty(),
    check(
        'Password',
        "Please enter a password at least 6 character and contain At least one uppercase.At least one lower case.At least one special character. ",
      )
  .isLength({ min: 6 })
  .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
          ),

    check('Password',"Password should not excceed more than 15 character")
    .isLength({max:15})   ,
    check('Gender',"You must select one gender!").not().isEmpty(),
    check('Contact',"Contact number is required!").not().isEmpty(),
    
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    }
]