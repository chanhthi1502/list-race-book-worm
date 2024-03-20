const bcrypt = require('bcrypt');

const generateSalt = async () => {
  return await bcrypt.genSalt(10);
};

const hashPassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const salt = await generateSalt();
  const hashedPassword = await hashPassword('admin', salt);

  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { username: 'admin', email: 'admin@email.com', password: hashedPassword },
  ]);
};
