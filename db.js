var spicedPg = require("spiced-pg");
var db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg("postgres:postgres:postgres@localhost:5432/social");
}

exports.registerUsers = (first, last, mail, pass) => {
    return db.query(
        "INSERT INTO users (first, last, mail, pass) VALUES ($1,$2,$3,$4)",
        [first, last, mail, pass]
    );
};
