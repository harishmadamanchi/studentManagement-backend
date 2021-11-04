const { ObjectId } = require("bson");
var express = require("express");
var router = express.Router();
var { MONGODBURL, mongoDB, mongoClient } = require("../dbConfig");

router.get("/all-students", async (req, res) => {
  //return all student details

  const client = await mongoClient.connect(MONGODBURL);

  try {
    const db = client.db("studentManagement");
    let data = await db.collection("students").find().toArray();

    res.send({
      message: "Success",
      Data: data,
    });
  } catch (error) {
    res.send({
      message: "Error in Connection" + error,
    });
  } finally {
    client.close();
  }
});

router.get("/:id", async (req, res) => {
  //return a student by ID
  const id = req.params.id;
  const client = await mongoClient.connect(MONGODBURL);

  try {
    const db = client.db("studentManagement");
    let data = await db.collection("students").findOne({ _id: ObjectId(id) });
    res.send({
      message: "Success",
      Data: data,
    });
    // console.log(data);
  } catch (error) {
    res.send({
      message: "Error in connection" + error,
    });
  } finally {
    client.close();
  }
});

router.post("/add-single-student", async (req, res) => {
  //insert a student

  const client = await mongoClient.connect(MONGODBURL);

  try {
    const db = client.db("studentManagement");
    let data = await db.collection("students").insertOne(req.body);
    res.send({
      message: "Success",
      insertedData: data,
    });
    // console.log(data);
  } catch (error) {
    res.send({
      message: "Error in connection" + error,
    });
  } finally {
    client.close();
  }
});

router.post("/add-multiple-students", async (req, res) => {
  //insert a student

  const client = await mongoClient.connect(MONGODBURL);

  try {
    const db = client.db("studentManagement");
    let data = await db.collection("students").insertMany(req.body);
    res.send({
      message: "Success",
      insertedData: data,
    });
    // console.log(data);
  } catch (error) {
    res.send({
      message: "Error in connection" + error,
    });
  } finally {
    client.close();
  }
});

module.exports = router;
