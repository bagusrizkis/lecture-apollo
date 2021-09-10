const express = require("express");
const app = express();
const PORT = 3002;
const { mongodb, User } = require("./model");
app.use(express.json());

// ROUTER BEGIN
app.get("/", (_, res) => {
    res.status(200).json({
        meta: {
            success: true,
            status: 200,
            description: "Server running",
        },
        body: null,
    });
});

app.get("/users", (_, res, next) => {
    console.log("masuk");
    User.findAll()
        .then((data) => {
            res.status(200).json({
                meta: {
                    success: true,
                    status: 200,
                    description: "Success get users data",
                },
                body: {
                    users: data,
                },
            });
        })
        .catch(next);
});

app.get("/users/:ID", (req, res, next) => {
    User.findOne({ _id: req.params.ID })
        .then((data) => {
            console.log(data);
            res.status(200).json({
                meta: {
                    success: true,
                    status: 200,
                    description: "Success get user details",
                },
                body: {
                    users: data,
                },
            });
        })
        .catch(next);
});

app.post("/users", (req, res, next) => {
    User.create({
        ...req.body,
    })
        .then((data) => {
            return User.findOne({ _id: data.insertedId });
        })
        .then((data) => {
            res.status(201).json({
                meta: {
                    success: true,
                    status: 201,
                    description: "Success create new user",
                },
                body: {
                    user: data,
                },
            });
        })
        .catch(next);
});

app.delete("/users/:id", (req, res, next) => {
    User.destroy({ id: req.params.id })
        .then(() => {
            res.status(200).json({
                meta: {
                    success: true,
                    status: 200,
                    description: "Success delete user with id " + req.params.id,
                },
                body: {
                    id: req.params.id,
                },
            });
        })
        .catch(next);
});

// ERR HANDLER BEGIN
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        meta: {
            success: false,
            status: 500,
            description: "Internal Server Error",
        },
        body: {
            error: err,
        },
    });
});
// ERR HANDLER END

mongodb
    .run()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server User Run on :: " + PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
