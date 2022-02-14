const router = require('express').Router()
const Accounts = require('./accounts-model');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const accounts = await Accounts.getAll()
    res.json(accounts);
  } catch (err){
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const getById = await Accounts.getById()
    res.json(getById);
  } catch (err){
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const post = await Accounts.create()
    res.json(post);
  } catch (err){
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const update = await Accounts.updateById()
    res.json(update);
  } catch (err){
    next(err)
  }
});

router.delete('/:id', async (req, res, next) => {
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
