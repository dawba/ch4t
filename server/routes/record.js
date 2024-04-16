import express from "express";

// This will be used to connect to database
import db from "../db/connection.js";

// This helps convert the id from string to ObjectId for _id
import {ObjectId} from "mongodb";

// router is an instance of express router
// We use it to define our routes
// The router will be added as a middleware and will take control of requests starting with path /record
const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
    let collection = await db.collection("records");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) {
        res.status(404).send("Record not found");
    } else {
        res.send(result).status(200);
    }
});

router.post("/", async (req, res) => {
   try {
       let newDocument = {
           name: req.body.name,
           position: req.body.position,
           level: req.body.level,
       };

       let collection = await db.collection("records");
       let result = await collection.insertOne(newDocument);
       res.send(result).status(204);
   } catch(error){
       console.error(error);
       res.status(500).send("Error adding record");
   }
});

router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id)};
        const updates = {
            $set: {
                name: req.body.name,
                position: req.body.position,
                level: req.body.level,
            },
        };

        let collection = await db.collection("records");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    }  catch(error){
        console.error(error);
        res.status(500).send("Error updating record");
    }
});

router.delete("/:id", async(req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id)};

        const collection = db.collection("records");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch(error){
        console.error(error);
        res.status(500).send("Error deleting record");
    }
});

export default router;