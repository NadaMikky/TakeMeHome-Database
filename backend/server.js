const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

//database connection
const db = mysql.createConnection({
    host: 'mysql-edcf05-take-me-home.l.aivencloud.com',
    port: 15398,
    name: "TakeMeHomeDatabase",
    user: 'avnadmin',
    password: 'AVNS_CPA5OmNrKwBD2xMko_a',
    database: 'defaultdb',
    ssl: {
        rejectUnauthorized: false // optional, but recommended
    }
});
// subbject to be removed 
function handleDisconnect() {
    db.connect(err => {
        if (err) {
            console.error('Error reconnecting to the database:', err);
           process.exit(1); 
        } else {
            console.log('Reconnected to the database.');
        }
    });

    db.on('error', err => {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // Reconnect if the connection is lost
        } else {
            throw err;
        }
    });
}

handleDisconnect();

app.get('/', (req, res) => {
    return res.json('Hi, this is a testing msg from Backend -nada');
});

app.get('/Users', (req, res) => {
    const sql = 'SELECT * FROM Users'
    db.query(sql, (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})
    app.listen(8081, () => {
        console.log('Listening');
    })

