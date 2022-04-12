const passwordValidator = require('password-validator');

const passwordRulesSchema = new passwordValidator();

// Add properties to it
passwordRulesSchema
.is().min(6)                                    // Minimum length 8
.has().uppercase(1)                              // Must have uppercase letters
// .is().max(100)                                  // Maximum length 100
// .has().lowercase()                              // Must have lowercase letters
// .has().digits()                                // Must have  digits ( number )
// .has().not().spaces()                           // Should not have spaces
// .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


module.exports = (req, res, next) => {
  console.log(req.body.passwd)
  if( !passwordRulesSchema.validate(req.body.passwd) ){
    console.log('password rules not respect :', passwordRulesSchema.validate(`${req.body.password}`, { list: true }))
    return res.status(406).json({ error : ' Doit contenir au minimum 6 caractères dont 1 majuscule !'})
  }else{
    next();
  }
}