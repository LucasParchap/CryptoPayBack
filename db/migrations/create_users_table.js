module.exports = class CreateUsersTable {
    name = 'CreateUsersTable';

    async up(db) {
        await db.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(100) UNIQUE NOT NULL,
                email VARCHAR(150) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("Table 'users' created successfully.");
    }

    async down(db) {
        await db.query(`DROP TABLE IF EXISTS users`);
        console.log("Table 'users' dropped.");
    }
};
