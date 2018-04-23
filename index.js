const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const { registerUsers } = require("./db.js");

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
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.post("/register", (req, res) => {
    console.log(req.body);
    registerUsers(
        req.body.name,
        req.body.last,
        req.body.mail,
        req.body.password
    )
        .then(response => {
            console.log(response);
            if (response) {
                res.json({
                    success: true
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
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
