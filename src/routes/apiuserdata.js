const router = require("express").Router();
const { User, validate } = require("../models/apiuserdata");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.get("/:id", async (req, res) => {
  try {
    const { error } = validate(req.params);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ _id: req.params.id });

    if (!user) return res.status(401).send({ message: "Invalid request" });

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log("error");
  }
});

module.exports = router;
