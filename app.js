const http = require('http');
const url = require('url');
const db = require('./db/db').promise(); // Importing the promise-based version of the db object

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (req.method === 'GET') {
        if (pathname.startsWith('/ticker') && query.ticker) {
            const ticker = query.ticker;

            try {
                let sql = 'SELECT * FROM mytable2 WHERE ticker = ?';
                let queryParams = [ticker];

                if (query.columns) {
                    const columns = query.columns.split(',');
                    const formattedColumns = columns.map(col => `\`${col}\``).join(', ');
                    sql = `SELECT ${formattedColumns} FROM mytable2 WHERE ticker = ?`;
                }

                if (query.period) {
                    const periods = query.period.slice(0, -1);
                    const p = new Date().getFullYear() - parseInt(periods);
                    sql += ' AND substring(date,-4) >= ?';
                    queryParams.push(p);
                }

                const [result] = await db.query(sql, queryParams);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            } catch (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Method Not Allowed' }));
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});
