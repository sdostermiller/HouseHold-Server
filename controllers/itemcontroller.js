const { Router } = require("express");
const validateSession = require("../middleware/validate-session");
const { Item } = require("../models");

const router = Router();

router.get("/test", validateSession, (req, res) => {
    res.send("testing the protected item route")
});

/*
===================
    Create Item
===================
*/

router.post("/create", validateSession, async (req, res) => {

    const { itemName, itemQuantity, itemUrgent, itemFavorite } = req.body;
    

    const entry = {
        itemName,
        itemQuantity,
        itemUrgent,
        itemFavorite,
        userId: req.user.id,
        houseId: req.user.houseId
    }

    try {
        const newEntry = await Item.create(entry);
        res.status(200).json({
            message: "Merchandise added",
            newEntry
        });
    } catch (e) {
        res.status(500).json({
            message: "Failed to add Merchandise",
            error: e
        });
    }
});

/*
==============================
    Get all Items by House
==============================
*/

router.get("/ours", validateSession, async (req, res) => {
    let { houseId } = req.user;
    try {
        const ourItems = await Item.findAll({
            where: {
                houseId: houseId
            }
        });
        res.status(200).json(ourItems);
    } catch(e) {
        res.status(500).json({ error: e })
    }
});

/*
==============================
    Get all Items by Owner
==============================
*/

router.get("/mine", validateSession, async (req, res) => {
  
    try {
        const myItems = await Item.findAll({
            where: {
                userId: req.user.id
            }
        });
        res.status(200).json(myItems);
    } catch(e) {
        res.status(500).json({ error: e })
    }
});

/*
===================
    Edit Item
===================
*/

router.put("/edit/:id",  validateSession, async (req, res) => {
    const { itemName, itemQuantity, itemUrgent, itemFavorite } = req.body;
    const itemId = req.params.id;

    const query = {
        where: {
            id: itemId
        }
    };

    const editedItem = {
        itemName: itemName,
        itemQuantity: itemQuantity,
        itemUrgent: itemUrgent,
        itemFavorite: itemFavorite
    };

    try {
        await Item.update(editedItem, query);
        res.status(200).json({
            message: "Item updated successfully!",
            editedItem,
            
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

/*
===================
    Delete Item
===================
*/

router.delete("/delete/:id", validateSession, async (req, res) => {
    const itemId = req.params.id;

    try {
        const query = {
            where: {
                id: itemId
            }
        };

        await Item.destroy(query);
        res.status(200).json({ message: "Item Deleted" });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;