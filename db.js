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
    return db.query("UPDATE users SET profilepic=$1 WHERE id=$2 RETURNING *", [
        path,
        id
    ]);
};

exports.bioInsert = (bio, id) => {
    return db.query("UPDATE users SET bio=$1 WHERE id=$2 RETURNING *", [
        bio,
        id
    ]);
};

exports.checkFriendshipStatus = (requester, receiver) => {
    return db.query(
        "SELECT * FROM friendships WHERE requester_id=$1 AND receiver_id=$2 OR requester_id=$2 AND receiver_id=$1",
        [requester, receiver]
    );
};

exports.makeFriendRequest = (requester, receiver) => {
    return db.query(
        "INSERT INTO friendships (requester_id, receiver_id, status) VALUES ($1, $2, 1)",
        [requester, receiver]
    );
};

exports.acceptFriendRequest = (requester, receiver) => {
    return db.query(
        "UPDATE friendships SET status=2 WHERE requester_id=$1 AND receiver_id=$2",
        [requester, receiver]
    );
};

exports.endFriendship = (requester, receiver) => {
    return db.query(
        "DELETE FROM friendships WHERE requester_id=$1 AND receiver_id=$2 OR requester_id=$2 AND receiver_id=$1",
        [requester, receiver]
    );
};
