const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 || 192.168.50.155:8080"
});
const compression = require("compression");
const bodyParser = require("body-parser");
const {
    registerUsers,
    checkLogin,
    getUserInfo,
    insertUpload,
    bioInsert,
    checkFriendshipStatus,
    makeFriendRequest,
    acceptFriendRequest,
    endFriendship,
    checkFriends
} = require("./db.js");
const { hashPassword, checkPassword } = require("./bcrypt.js");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const s3 = require("./s3.js");
const conf = require("./config.json");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

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

const cookieSessionMiddleware = cookieSession({
    name: "session",
    keys: ["Super secret key"],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000
});

app.use(cookieSessionMiddleware);
io.use((socket, next) => {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

////LOGIN REQUIRED///////
function requireLogin(req, res, next) {
    if (!req.session.userId) {
        res.sendStatus(403);
    } else {
        next();
    }
}
//////////////////////////

app.get("/userInfo", requireLogin, (req, res) => {
    getUserInfo(req.session.userId)
        .then(response => {
            req.session.user = {
                ...response.rows[0]
            };
            response.rows[0].pass = null;
            res.json({
                success: true,
                userData: response.rows[0]
            });
        })
        .catch(e => {
            console.log(e);
            res.json({
                success: false
            });
        });
});

app.get("/userInfo/:userId", requireLogin, (req, res) => {
    getUserInfo(req.params.userId)
        .then(response => {
            response.rows[0].pass = null;
            res.json({
                success: true,
                userInfo: response.rows[0],
                sameUser: req.session.userId == req.params.userId
            });
        })
        .catch(e => {
            console.log(e);
        });
});

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
    if (req.body.mail && req.body.password) {
        checkLogin(req.body.mail)
            .then(response => {
                if (response.rowCount == 0) {
                    res.json({
                        success: false
                    });
                } else {
                    req.session.userId = response.rows[0].id;
                    checkPassword(req.body.password, response.rows[0].pass)
                        .then(response => {
                            if (response) {
                                res.json({
                                    success: true,
                                    logged: req.session.userId
                                });
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            })
            .catch(e => {
                console.log(e);
            });
    } else {
        res.json({
            success: false
        });
    }
});

/////////////////////MULTER//////////////////////////
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    if (req.file.path) {
        let path = `${conf.s3Url}aaron/${req.file.filename}`;
        insertUpload(path, req.session.userId)
            .then(response => {
                if (response.rows) {
                    res.json({
                        success: true,
                        userData: response.rows[0]
                    });
                } else {
                    res.json({
                        success: false
                    });
                }
            })
            .catch(e => {
                console.log(e);
            });
    } else {
        res.json({
            success: false
        });
    }
});
////////////////////////////////////////////////////
app.post("/bioSubmission", (req, res) => {
    if (req.body.bio == "") {
        re.body.bio = null;
    }
    if (req.body) {
        bioInsert(req.body.bio, req.session.userId)
            .then(response => {
                response.rows[0].pass = null;
                res.json({
                    success: true,
                    userData: response.rows[0]
                });
            })
            .catch(e => {
                console.log(e);
            });
    } else {
        res.json({
            success: false
        });
    }
});

//////////Friendships////////////////////
app.get("/checkFriends", (req, res) => {
    checkFriends(req.session.userId)
        .then(response => {
            res.json({
                success: true,
                friends: response.rows
            });
        })
        .catch(e => {
            console.log(e);
        });
});

app.get("/friendshipStatus/:profileId", (req, res) => {
    checkFriendshipStatus(req.session.userId, req.params.profileId)
        .then(response => {
            if (response.rowCount != 0) {
                res.json({
                    success: true,
                    userData: response.rows[0],
                    currentUser: req.session.userId
                });
            } else {
                res.json({
                    success: false,
                    friendshipStatus: 0
                });
            }
        })
        .catch(e => {
            console.log(e);
        });
});

app.post("/makeFriendRequest/:profileId", (req, res) => {
    makeFriendRequest(req.session.userId, req.params.profileId)
        .then(response => {
            res.json({
                success: true,
                friendshipStatus: 1
            });
        })
        .catch(e => {
            console.log(e);
        });
});

app.post("/acceptFriendRequest/:profileId", (req, res) => {
    acceptFriendRequest(req.params.profileId, req.session.userId)
        .then(response => {
            res.json({
                success: true,
                friendshipStatus: 2
            });
        })
        .catch(e => {
            console.log(e);
        });
});

app.post("/endFriendship/:profileId", (req, res) => {
    endFriendship(req.params.profileId, req.session.userId)
        .then(response => {
            res.json({
                success: true
            });
        })
        .catch(e => {
            console.log(e);
        });
});
/////////////////////////////
app.get("/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("/welcome");
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", requireLogin, (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

let onlineUsers = [];

io.on("connection", socket => {
    let session = socket.request.session;
    // console.log("Socket session", session);
    socket.on("newLogin", data => {
        if (!onlineUsers.includes(data.newLogin)) {
            onlineUsers.unshift(data.newLogin);
            console.log("NEW LOGIN", onlineUsers);
        }
    });
    socket.on("disconnect", () => {
        console.log(`${session.userId} disconnected`);
    });
});

server.listen(8080, () => {
    console.log("I'm listening.");
});
