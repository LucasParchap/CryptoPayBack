module.exports = class CreateTransactionsTable {
    name = 'CreateTransactionsTable';

    async up(db) {
        await db.query(`
            CREATE TABLE transactions (
                hash VARCHAR(66) PRIMARY KEY, 
                from_address VARCHAR(42) NOT NULL, 
                to_address VARCHAR(42) NOT NULL, 
                value DECIMAL(38, 0) NOT NULL,
                items TEXT NOT NULL, 
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
            )
        `);

        console.log("Table 'transactions' created successfully.");
    }

    async down(db) {
        await db.query(`DROP TABLE IF EXISTS transactions`);
        console.log("Table 'transactions' dropped.");
    }
};
