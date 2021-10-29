const { Router } = require("express");
const validateSession = require("../middleware/validate-session");
const { List } = require("../models");

const router = Router();

router.get("/test", validateSession, (req, res) => {
    res.send("testing protected get list route")
});

/*
===================
    Create List
===================
*/

router.post("/create", validateSession, async (req, res) => {

    const { listName, listType } = req.body;
    const houseName = req.user.houseName;
    const  id  = req.user.id;
    const house = req.user.houseId;

    const entry = {
        listName,
        listType,
        houseName: houseName,
        userId: id,
        houseId: house
    }

    try {
        const newEntry = await List.create(entry);
        res.status(200).json({
            message: "List created",
            newEntry
        });
    } catch (e) {
        res.status(500).json({
            message: "Failed to create list",
            error: e
        });
    }
});

/*
==================================
    Get all lists by HouseHold
==================================
*/

router.get("/ours", validateSession, async (req,res) => {


    try {
        const ourLists = await List.findAll()({
            where: {
                houseName: req.user.houseName
            }
        });
        res.status(200).json(ourLists);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

/*
=========================
    Get Lists by User
=========================
*/

router.get("/mine", validateSession, async (req, res) => {

    try {
        const myLists = await List.findAll({
            where: {
                userId: req.user.id
            }
        });
        res.status(200).json(myLists);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

/*
=========================
    Get Lists by ID
=========================
*/

router.get("/:id", validateSession, async (req, res) => {

    try {
        const thisList = await List.findAll({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(thisList);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

/*
=================================
    Get List by ID WITH ITEMS
=================================
*/

router.get("/withitems/:id", validateSession, async (req, res) => {

    try {
        const thisList = await List.findAll({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: models.List
                }
            ] 
        });
        res.status(200).json(thisList);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

/*
=================
    Edit List
=================
*/

router.put("/edit/:id", validateSession, async (req, res) => {
    const { listName, listType } = req.body;
    const listId = req.params.id;

    const query = {
        where: {
            id: listId
        }
    };

    const editedList = {
        listName: listName,
        listType: listType
    };

    try {
        await List.update(editedList, query);
        res.status(200).json({
            message: "List updated successfully",
            editedList
        });
    } catch (e)
 {
     res.status(500).json({ error: e });
 }});

 /*
==================
    Delete List
==================
*/

router.delete("/delete/:id", validateSession, async (req, res) => {
    const listId = req.params.id;

    try {
        const query = {
            where: {
                id: listId
            }
        };

        await List.destroy(query);
        res.status(200).json({ message: "List deleted." });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;