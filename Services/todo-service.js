const query = require('./db');

// get all
const getAll = async () => {
  return await query('select * from todos');
};

// get by id
const getById = async (id) => {
  return await query('select * from todos where id=?', [id]);
};

// post
const add = async (todo) => {
  return await query('insert into todos (name, complete) values (?,?)', [
    todo.name,
    todo.complete,
  ]);
};

// put
const update = async (todo) => {
  return await query('update todos set name=?, complete=? where id=?', [
    todo.name,
    todo.complete,
    todo.id,
  ]);
};

// delete
const remove = async (id) => {
  return await query('delete from todos where id=?', [id]);
};

module.exports = { getAll, getById, add, update, remove };
