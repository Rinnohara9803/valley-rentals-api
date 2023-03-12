const {check, validationResult} = require('express-validator');
exports.RentFloorValidation=[
    check('City',"City must be selected").not().isEmpty(),
    check('BHK',"BHK shouldnot be empty").not().isEmpty(),
    check('Address',"Address shouldnot be empty").not().isEmpty(),
    check('Preference',"Preference mustnot be empty").not().isEmpty(),
    check('Amountpm',"Amount should not be empty").not().isEmpty(),
    check('Amountpm',"It should be in numeric form").isNumeric(),
    (req, res, next) => {
      console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
      }
]