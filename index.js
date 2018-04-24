const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const { registerUsers, checkLogin } = require("./db.js");
const { hashPassword, checkPassword } = require("./bcrypt.js");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(
    cookieSession({
        name: "session",
        keys: ["Super secret key"],
        // Cookie Options
        maxAge: 24 * 60 * 60 * 1000
    })
);
app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

////LOGIN REQUIRED///////
function requireLogin() {
    if (!req.session.user) {
        res.sendStatus(403);
    } else {
        next();
    }
}

app.post("/register", (req, res) => {
    if (req.body.first && req.body.last && req.body.mail && req.body.password) {
        hashPassword(req.body.password).then(response => {
            registerUsers(
                req.body.first,
                req.body.last,
                req.body.mail,
                response
            )
                .then(response => {
                    req.session.userId = response.rows[0].id;
                    res.json({
                        success: true,
                        logged: req.session.userId
                    });
                })
                .catch(e => {
                    console.log(e);
                });
        });
    } else {
        res.json({
            success: false
        });
    }
});

app.post("/login", (req, res) => {
    checkLogin(req.body.mail)
        .then(response => {
            if (response.rowCount == 0) {
                res.json({
                    success: false
                });
            } else {
                req.session.userId = response.rows[0].id;
                checkPassword(req.body.password, response.rows[0].pass).then(
                    response => {
                        if (response) {
                            res.json({
                                success: true,
                                logged: req.session.userId
                            });
                        } else {
                            res.json({
                                success: false
                            });
                        }
                    }
                );
            }
        })
        .catch(e => {
            console.log(e);
        });
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
