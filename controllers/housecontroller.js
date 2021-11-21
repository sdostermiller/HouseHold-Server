const { Router } = require("express");
const validateSession = require("../middleware/validate-session");
const { House } = require("../models");
const { UniqueConstraintError } = require("sequelize");

const router = Router();

router.get("/test", validateSession, (req, res) => {
    res.send("testing the house route")
});

/*
========================
    Create HouseHold
========================
*/

router.post("/create", validateSession, async (req, res) => {
    console.log
    const { houseName } = req.body;
    const  userId  = req.user.id;

    const newEntry = {
        houseName: houseName,
        ownerId: userId
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
              message: "House name already in use.  Please log in.",
              error: e
            });
        } else {
            console.log(e)
            res.status(500).json({
                message: "Failed to create House",
                error: e,
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

router.get("/mine", validateSession, async (req, res) => {

    try {
        const thisHouse = await House.findOne({
            where: {
                id: req.user.houseId
            }
        });
        res.status(200).json(thisHouse);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

/*
=======================================
    Get HouseHold by logged in user with Users
=======================================
*/

router.get("/roster", validateSession, async (req, res) => {

    try {
        const thisHouse = await House.findOne({
            where: {
                id: req.user.houseId
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