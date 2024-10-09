module.exports = async (conn) => {
  await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL
      );
  `);
  console.log('Table "users" created successfully.');

  const sampleUsers = [
      { name: 'John Doe', email: 'john@example.com', password: 'password1' },
      { name: 'Jane Smith', email: 'jane@example.com', password: 'password2' },
      { name: 'Alice Johnson', email: 'alice@example.com', password: 'password3' },
  ];

  for (const user of sampleUsers) {
      try {
          await conn.query(`
              INSERT INTO users (name, email, password)
              VALUES (?, ?, ?)
              ON DUPLICATE KEY UPDATE id=id;
          `, [user.name, user.email, user.password]);
          console.log(`Inserted sample user: ${user.name}`);
      } catch (insertErr) {
          console.error(`Error inserting user ${user.name}:`, insertErr.message);
      }
  }
};
