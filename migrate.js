const fs = require('fs');
const path = require('path');
const pool = require('./config/db');

const migrationDir = path.join(__dirname, 'migrations');

const runMigration = async (migrationFile) => {
    const migration = require(migrationFile);
    const conn = await pool.getConnection();
    try {
        await migration(conn); // Call the migration function with the DB connection
        console.log(`Migration ${migrationFile} executed successfully.`);
    } catch (err) {
        console.error(`Migration ${migrationFile} failed:`, err);
    } finally {
        conn.end();
    }
};

const migrate = async () => {
    const files = fs.readdirSync(migrationDir);
    for (const file of files) {
        const filePath = path.join(migrationDir, file);
        if (file.endsWith('.js')) {
            await runMigration(filePath);
        }
    }
};

migrate()
    .then(() => console.log('All migrations executed.'))
    .catch((err) => console.error('Migration error:', err));
