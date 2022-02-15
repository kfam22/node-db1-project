const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  console.log('checkAccountPayload middleware')
  next()
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
}

exports.checkAccountNameUnique = (req, res, next) => {
  console.log('checkAccountNameUnique middleware')
  next()
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  console.log('checkAccountId middleware')
  try{
    const account = await Accounts.getById(req.params.id)
    if(!account){
      next({status: 404, message: 'account not found' })
    } else {
      req.account = account;
      next()
    }
  } catch(err){
    next(err)
  }
}
