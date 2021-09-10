const { default: axios } = require("axios");
const express = require("express");
const Redis = require("ioredis");

const app = express();
const redis = new Redis(6379, "localhost");
const PORT = 3000;

app.use(express.json());

app.get("/users", async (req, res, next) => {
    // nyari di cache apakah ada
    // kalau ada langsung balikin
    // kalau gak ada : request ke services users
    // dapetin datanya dan simpen di cache
    // balikin datanya ke client
    const dataUser = await redis.get("users");

    if (dataUser) {
        const data = JSON.parse(dataUser);
        res.status(data.meta.status).json({ ...data });
    } else {
        axios({
            method: "GET",
            url: "http://localhost:3002/users",
        })
            .then(({ data }) => {
                redis.set("users", JSON.stringify(data));
                res.status(data.meta.status).json({ ...data });
            })
            .catch(next);
    }
});

app.post("/users", (req, res, next) => {
    axios({
        method: "POST",
        url: "http://localhost:3002/users",
        data: {
            ...req.body,
        },
    })
        .then(({ data }) => {
            // membuat cache gak valid
            /**
             * POST,
             * PUT, PATCH,
             * DELETE
             */
            redis.del("users");
            res.status(data.meta.status).json({ ...data });
        })
        .catch(next);
});

// TODO : rest enpoint users
// TODO : enpoint products

// ERR HANDLER BEGIN
app.use((err, req, res, next) => {
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

app.listen(PORT, () => {
    console.log("Orchestrator running on :: PORT " + PORT);
});
