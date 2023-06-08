/** Import Item class, express and express router */
const Item = require('../item');
const express = require('express');
const router = new express.Router();

/** for GET "/items", return list of all items using findAll() method from Item class */
router.get("", (req, res, next) => {
    try {
        return res.json({items: Item.findAll()});
    } catch (err) {
        return next(err)
    }
});

/** for POST "/items", create a new instance of Item class */
router.post("", (req, res, next) => {
    try {
        let newItem = new Item(req.body.name, req.body.price);
        return res.json({item: newItem})
    } catch (err) {
        return next(err);
    }
});

/** for GET "/items/[name]", returns item from fakeDb using find() method from Item class */
router.get("/:name", (req, res, next) => {
    try {
        let foundItem = Item.find(req.params.name);
        return res.json({item: foundItem});
    } catch (err) {
        return next(err);
    }
});

/** for PATCH "/items/[name]", updates item data from fadeDb using update() method from item class */
router.patch("/:name", (req, res, next) => {
    try {
        let foundItem = Item.update(req.params.name, req.body);
        return res.json({item: foundItem});
    } catch (err) {
        return next(err);
    }
});

/** for DELETE "/items/[name]", deletes item from fakeDb using remove() method from item class */
router.delete("/:name", (req, res, next) => {
    try {
        Item.remove(req.params.name);
        return res.json({message: "Deleted"});
    } catch (err) {
        return next(err);
    }
})

/** export router for app.js to use */
module.exports = router;