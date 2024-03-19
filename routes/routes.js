const router = require('express').Router();
const db = require('../db/db').promise(); 


router.get("/ticker=:ticker&column=:columns&period=:period", async (req, res) => {
    try {
        const { ticker, columns, period } = req.params;
        const periods = period.slice(0, -1);
        const p = new Date().getFullYear() - parseInt(periods);

        const coll = columns.split(",");
        const formattedColumns = coll.map(col => `\`${col}\``).join(', ');

        const sql = `SELECT ${formattedColumns} FROM mytable2 WHERE substring(date,-4) >= ? AND ticker = ?`;
        const [result] = await db.query(sql, [p, ticker]);

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.get('/ticker=:ticker&column=:columns', async (req, res) => {
    try {
        const { ticker, columns } = req.params;
        const coll = columns.split(",");
        const formattedColumns = coll.map(col => `\`${col}\``).join(', ');

        const sql = `SELECT ${formattedColumns} FROM mytable2 WHERE ticker = ?`;
        const [result] = await db.query(sql, [ticker]);

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.get('/ticker=:ticker', async (req, res) => {
    try {
        const { ticker } = req.params;
        const sql = `SELECT * FROM mytable2 WHERE ticker = ?`;
        const [result] = await db.query(sql, [ticker]);

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.get('/ticker', async (req, res) => {
    try {
        const sql = `SELECT * FROM mytable2`;
        const [result] = await db.query(sql);

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
