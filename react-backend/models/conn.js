const host = "lallah.db.elephantsql.com";
const database = "vtllkyei";
const user = "vtllkyei";
const password = "Ina4AiDwEJ4WqlLTvFGah6oboaurvKfv";


const pgp = require('pg-promise')({
    query: function (event) {
        console.log("QUERY: ", event.query)
    }
});

const options = {
    host: host,
    database: database,
    user: user,
    password: password
}
const db = pgp(options);

module.exports = db;