const router = require('express').Router();
const path = require('path');
const db = require('../db/db').promise(); // Importing the promise-based version of the db object

router.get("/ticker=:ticker&column=:columns&period=:period", async (req, res) => {
    try {
        const { ticker, columns, period } = req.params;
        const periods = period.slice(0, -1);
        const p = new Date().getFullYear() - parseInt(periods);

        const coll = columns.split(",");
        const formattedColumns = coll.map(col => `\`${col}\``).join(', ');

        // Using the promise-based API
        const [result] = await db.query(`SELECT ${formattedColumns} FROM mytable2 WHERE substring(date,-4) >= ? AND ticker = ?`, [p, ticker]);

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

        // Using the promise-based API
        const [result] = await db.query(`SELECT ${formattedColumns} FROM mytable2 WHERE ticker = ?`, [ticker]);

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/ticker=:ticker', async (req, res) => {
    try {
        const { ticker } = req.params;

        // Using the promise-based API
        const [result] = await db.query(`SELECT * FROM mytable2 WHERE ticker = ?`, [ticker]);

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.get('/ticker', async (req, res) => {
    try {
        const { ticker } = req.params;

        // Using the promise-based API
        const [result] = await db.query(`SELECT * FROM mytable2 `, );

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
