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
    res.json(req.account);
})

router.post(
  '/', 
  checkAccountPayload, 
  checkAccountNameUnique, 
  async (req, res, next) => {
  try{
    const post = await Accounts.create(req.body)
    res.status(201).json(post);
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
  try{
    const update = await Accounts.updateById(req.params.id, req.body)
    res.status(200).json(update);
  } catch (err){
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    await Accounts.deleteById(req.params.id)
    res.json(req.account);
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
