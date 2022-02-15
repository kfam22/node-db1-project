const Accounts = require('./accounts-model');
const yup = require('yup')


// const accountPayloadSchema = yup.object({
//   name: yup
//   .string()
//   .trim()
//   .min(3, 'name of account must be between 3 and 100')
//   .max(100, 'name of account must be between 3 and 100')
//   .required('name and budget are required'),
//   budget: yup
//   .number()
//   .typeError('budget of account must be a number')
//   .positive('budget of account is too large or too small')
//   .max(100000000, 'budget of account is too large or too small')
//   .required('name and budget are required')
// })

// try{
//   const validated = await accountPayloadSchema.validate(req.body);
//   req.body = validated;
//       next();
// } catch(err) {
//   next({ status: 400, message: err.message })
// }

exports.checkAccountPayload = (req, res, next) => {
  const error = { status: 400 };
  const { name, budget } = req.body
  if (name === undefined || budget === undefined){
    error.message = 'name and budget are required';
  } else if(typeof name !== 'string'){
    error.message = 'name of account must be a string';
  } else if(name.trim().length < 3 || name.trim().length > 100){
    error.message = 'name of account must be between 3 and 100'
  } else if(typeof budget !== 'number' || isNaN(budget)){
    error.message = 'budget of account must be a number'
  } else if(budget < 0 || budget > 1000000){
    error.message = 'budget of account is too large or too small'
  } 

  if(error.message){
    next(error)
  } else {
    next()
  }
  }

// - `checkAccountPayload` returns a status 400 with if `req.body` is invalid:

// - If either name or budget are undefined, return `{ message: "name and budget are required" }`
// - If the _trimmed_ name is shorter than 3 or longer than 100, return `{ message: "name of account must be between 3 and 100" }`
// - If budget is not able to be converted into a number, return `{ message: "budget of account must be a number" }`
// - If budget is a negative number or over one million, return  `{ message: "budget of account is too large or too small" }`

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
