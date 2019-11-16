const db = require('../dbConfig.js');

const TABLE = 'cars';

const get = ({ id } = {}) => {
  return (id === undefined)
    ? db(TABLE)
    : db(TABLE)
      .where('id', id);
};

const insert = ({ account }) => db(TABLE)
  .insert(account)
  .then(([id]) => get({ id }));

const update = ({ id, changes }) => db(TABLE)
  .where('id', id)
  .update(changes)
  .then((count) => (count > 0 ? get({ id }) : null));

const remove = ({ id }) => db(TABLE)
  .where('id', id)
  .del();


module.exports = {
  get,
  insert,
  update,
  remove,
};