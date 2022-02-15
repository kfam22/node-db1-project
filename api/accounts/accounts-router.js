const router = require('express').Router();
const { 
  checkAccountId, 
  checkAccountPayload, 
  checkAccountNameUnique
} = require('./accounts-middleware');
const Accounts = require('./accounts-model');

router.get('/', async (req, res, next) => {
  try{
    const accounts = await Accounts.getAll()
    res.json(accounts);
  } catch (err){
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try{
    const account = await Accounts.getById(req.params.id)
    res.json(account);
  } catch (err){
    next(err)
  }
})

router.post(
  '/', 
  checkAccountPayload, 
  checkAccountNameUnique, 
  async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const post = await Accounts.create()
    res.json(post);
  } catch (err){
    next(err)
  }
})

router.put(
  '/:id', 
  checkAccountId, 
  checkAccountPayload, 
  checkAccountNameUnique, 
  async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const update = await Accounts.updateById()
    res.json(update);
  } catch (err){
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const del = await Accounts.deleteById()
    res.json(del);
  } catch (err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
 
})

module.exports = router;
