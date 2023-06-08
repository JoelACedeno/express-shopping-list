const items = require('./fakeDb')

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;

        //upon creation of an item push it to the fakdDb
        items.push(this);
    }

    /** returns all items from fakeDb */
    static findAll() {
        return items
    }

    /** returns item with matching name from fakeDb */
    static find(name) {
        const foundItem = items.find(i => i.name === name);  //find item where item.name === name 
        if(foundItem === undefined){
            throw { message: "Not Found", status: 404 }
        }
        return foundItem
    }

    /** updates data for item with matching name from fakeDb */
    static update(name, data) {
        let foundItem = items.find(i => i.name === name);
        if(foundItem === undefined) {
            throw { message: "Not Found", status: 404 }
        }
        foundItem.name = data.name;
        foundItem.price = data.price;

        return foundItem;
    }

    /** removes item with matching name from fakeDb */
    static remove(name) {
        let foundItemIdx = items.find(i => i.name === name);
        if (foundItemIdx === -1){
            throw { message: "Not Found", status: 404 }
        }
        items.splice(foundItemIdx, 1);
    }
}

module.exports = Item