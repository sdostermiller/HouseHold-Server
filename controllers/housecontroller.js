const { Router } = require("express");
const validateSession = require("../middleware/validate-session");
const { House } = require("../models");
const { UniqueConstraintError } = require("sequelize");her

const router = Router();

router.get("/test", (req, res) => {
    res.send("testing the house route")
});

/*
========================
    Create HouseHold
========================
*/

router.post("/create", validateSession, async (req, res) => {
    const { houseName } = req.body;


    const newEntry = {
        houseName: houseName
    }

    try {
        await House.create(newEntry);
        res.status(200).json({
            message: "HouseHold created",
            newEntry
        });
    } catch (e) {

        if (e instanceof UniqueConstraintError) {
            res.status(409).json({
              message: "Email already in use.  Please log in.",
              error: e
            });
        } else {

        res.status(500).json({
            message: "Failed to create House",
            error: e
        });
    }}
});



/*
=========================
    Get All Houses
=========================
*/

router.get("/all", validateSession, async (req, res) => {

    try {
        const allHouses = await House.findAll();
        res.status(200).json(allHouses);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

/*
============================
    Get HouseHold by ID
============================
*/

router.get("/:id", validateSession, async (req, res) => {

    try {
        const thisHouse = await House.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(thisHouse);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

/*
=======================================
    Get HouseHold by ID with Users
=======================================
*/

router.get("/roster/:id", validateSession, async (req, res) => {

    try {
        const thisHouse = await House.findOne({
            where: {
                id: req.params.id
            },
            include: ["users"]

        });
        res.status(200).json(thisHouse);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

/*
======================
    Edit HouseHold
======================
*/

router.put("/edit/:id", validateSession, async (req, res) => {
    const { houseName, } = req.body;
    const houseId = req.params.id;


    const query = {
        where: {
            id: houseId
        }
    };

    const editedHouse = {
        houseName: houseName,


    };

    try {
        await House.update(editedHouse, query);
        res.status(200).json({
            message: "House updated!",
            editedHouse
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

/*
====================
    Delete House
====================
*/

router.delete("/delete/:id", validateSession, async (req, res) => {
    const houseId = req.params.id;

    try {
        const query = {
            where: {
                id: houseId
            }
        };

        await House.destroy(query);
        res.status(200).json({ message: "HouseHold Removed"});
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;