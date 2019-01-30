const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');

const API_PORT = 3001;
const app = express();
const router = express.Router();

const dbRoute = "mongodb://vivalalax10:4Ronnoco@ds217125.mlab.com:17125/blackbird";

mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
)

// accessing the default connecting created by mongoose.connect

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

db.on("error", console.error.bind(console, "MongoDB connection error"));

const myLogger = function (req, res, next) {
    console.log('LOGGED');
    console.log(req);
    next();
}

app.use(myLogger);
app.use(cors());

router.get('/test', (req, res) => {
    return res.json([{
        id: 1,
        username: 'tyler'
    }, {
        id: 2,
        username: 'ginna'
    }
  ])
})

router.get('/getData', (req, res) => {
    Data.find((error, data) => {
        if (err) return res.json({success: false, error: error})
        return res.json({success: true, data: data})
    });
});

router.post("/updateData", (req, res) => {
    const { id, update } = req.body;
    Data.findOneAndUpdateid(id, update, err => {
        if (err) return res.json({success: false, error: err})
        return res.json({success: true})
    })
})

router.delete("/deleteData", (req, res) => {
    const { id } = req.body;
    Data.findOneAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({success: true})
    })
})

router.post("/createMethod", (req, res) => {
    let data = new Data();
    const { id, message } = req.body;
    if ((!id && id !== 0 || !message)) {
        return res.json({ success: false, error: "Invalid inputs"})
    }
    data.message = message;
    data.id = id;
    data.save(err => {
        if (err) return res.json({ success: false, error: err});
        return res.json({success: true})
    })
})

app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));
