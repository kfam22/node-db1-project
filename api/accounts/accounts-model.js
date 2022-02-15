const db = require('../../data/db-config');


const getAll = () => {
  // select * from accounts
  return db('accounts')
}

const getById = id => {
  // select * from account where id = {id}
  return db('accounts')
  .where({id})
  .first()
}

const create = account => {
  return 'create wired'
}

const updateById = (id, account) => {
  return 'updateById wired'
}

const deleteById = id => {
  return 'deleteById wired'
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
