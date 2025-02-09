const pool = require('./db');
const fs = require('fs');
const path = require('path');

const runMigration = async () => {
    const migrationPath = path.join(__dirname, './migrations');
    const files = fs.readdirSync(migrationPath);

    for (const file of files) {
        const Migration = require(path.join(migrationPath, file));
        const migrationInstance = new Migration();

        console.log(`Running migration: ${migrationInstance.name}`);
        try {
            await migrationInstance.up(pool);
        } catch (error) {
            console.error(`Error running migration ${migrationInstance.name}:`, error);
        }
    }

    pool.end();
};

runMigration();
