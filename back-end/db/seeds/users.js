const sharedHelper = require('../../sharedHelper');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const salt = await sharedHelper.generateSalt();
  const hashedPassword = await sharedHelper.hashPassword('admin', salt);

  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { username: 'admin', email: 'admin@email.com', password: hashedPassword },
  ]);
};
