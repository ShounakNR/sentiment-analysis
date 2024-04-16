const { db } = require('@vercel/postgres');

const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    // const insertedUsers = await Promise.all(
    //   users.map(async (user) => {
    //     const hashedPassword = await bcrypt.hash(user.password, 10);
    //     return client.sql`
    //     INSERT INTO users (id, name, email, password)
    //     VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
    //     ON CONFLICT (id) DO NOTHING;
    //   `;
    //   }),
    // );

    // console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      // users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedSearches(client) {
  try {

    // Create the "searches" table
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS searches (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    score INT NOT NULL,
    sentiment VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    // const insertedInvoices = await Promise.all(
    //   invoices.map(
    //     (invoice) => client.sql`
    //     INSERT INTO invoices (customer_id, amount, status, date)
    //     VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
    //     ON CONFLICT (id) DO NOTHING;
    //   `,
    //   ),
    // );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      // invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedSearches(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});