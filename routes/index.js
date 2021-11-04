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

router.put("/edit-student/:id", async (req, res) => {
  //edit a student

  const client = await mongoClient.connect(MONGODBURL);

  try {
    const db = client.db("studentManagement");
    let data = await db.collection("students").updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
        },
      }
    );

    res.send({
      message: "Success",
      details: data,
    });
  } catch (error) {
    res.send({
      message: "Error in connection " + error,
    });
  } finally {
    client.close();
  }
});

router.delete("/delete-student/:id", async (req, res) => {
  //delete by id
  const client = await mongoClient.connect(MONGODBURL);

  try {
    const db = client.db("studentManagement");
    let data = await db
      .collection("students")
      .deleteOne({ _id: ObjectId(req.params.id) });
    res.send({
      message: "Success",
      details: data,
    });
  } catch (error) {
    res.send({
      message: "Error in connection " + error,
    });
  } finally {
    client.close();
  }
});

router.delete("/delete-many", async (req, res) => {
  // delete many

  const client = await mongoClient.connect(MONGODBURL);

  try {
    const db = client.db("studentManagement");

    let deleteIDS = [];
    req.body.map((element) => {
      deleteIDS.push(ObjectId(element.id));
    });

    let data = await db
      .collection("students")
      .deleteMany({ _id: { $in: deleteIDS } });
    res.send({
      message: "Success",
      details: data,
    });
  } catch (error) {
    res.send({
      message: "Error in Connection " + error,
    });
  } finally {
    client.close();
  }
});

module.exports = router;
