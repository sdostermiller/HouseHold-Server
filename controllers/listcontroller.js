const { Router } = require("express");
const validateSession = require("../middleware/validate-session");
const { List } = require("../models");
const { UniqueConstraintError } = require("sequelize");

const router = Router();

router.get("/test", validateSession, (res) => {
    res.send("testing protected get list route")
});

/*
===================
    Create List
===================
*/

router.post("/create", validateSession, async (req, res) => {
    try {
    const { listName, listType } = req.body;
    const  userId  = req.user.id;
    const houseId = req.user.houseId;

    const newEntry = {
        listName,
        listType,
        userId: userId,
        houseId: houseId
    }
// console.log("User:",userId, "House:", houseId)

        await List.create(newEntry);
        res.status(200).json({
            message: "List created",
            newEntry
        });
    } catch (e) {


    if (e instanceof UniqueConstraintError) {
        res.status(409).json({
          message: "List name already in use.  Please try again.",
          error: e
        });
    } else {
        res.status(500).json({
            message: "Failed to create list",
            error: e
        });
    }
}
});

/*
==================================
    Get all lists by HouseHold
==================================
*/

router.get("/ours", validateSession, async (req,res) => {
console.log(req.user.houseId)

    try {
        const ourLists = await List.findAll({
            where: {
                houseId: req.user.houseId
            }
        });
        res.status(200).json(ourLists);
    } catch (e) {
        res.status(500).json({ error: JSON.stringify(e) });
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
            include: [ "items" ] 
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