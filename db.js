var spicedPg = require("spiced-pg");
var db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg("postgres:postgres:postgres@localhost:5432/social");
}

exports.registerUsers = (first, last, mail, pass) => {
    return db.query(
        "INSERT INTO users (first, last, mail, pass) VALUES ($1,$2,$3,$4) RETURNING *",
        [first, last, mail, pass]
    );
};

exports.checkLogin = mail => {
    return db.query("SELECT * FROM users WHERE mail=$1", [mail]);
};

exports.getUserInfo = id => {
    return db.query("SELECT * FROM users WHERE id=$1", [id]);
};

exports.insertUpload = (path, id) => {
    return db.query("INSERT INTO users profilepic=$1 WHERE id=$2", [path, id]);
};
