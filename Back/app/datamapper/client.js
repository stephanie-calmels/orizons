// Il vaut mieux utiliser un système de pool pour traiter plusieurs requête en même
const {
    Client
} = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Pas besoin de connect car c'est le Pool qui va se charger d'établir les connexions

module.exports = client;