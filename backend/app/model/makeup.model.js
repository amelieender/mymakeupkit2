const sql = require("./db.js");

// constructor
const MakeupItem = function(item) {
    this.productname = item.productname;
    this.brandname = item.brandname;
    this.category = item.category;
    this.opened = item.opened;
    this.durability = item.durability;
    this.image = item.image;
    this.latitude = item.latitude;
    this.longitude = item.longitude;
};

const tableName = 'makeupItems';

MakeupItem.create = (item, result) => {
    sql.query(`INSERT INTO ${tableName} SET ?`, item, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created makeupItem: ", { id: res.insertId, ...item });
        result(null, { id: res.insertId, ...item });
    });
};

MakeupItem.findById = (id, result) => {
    sql.query(`SELECT * FROM ${tableName} WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found member: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Member with the id
        result({ kind: "not_found" }, null);
    });
};

MakeupItem.getAll = result => {
    sql.query(`SELECT * FROM ${tableName}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("makeupItems: ", res);
        result(null, res);
    });
};

MakeupItem.updateById = (id, item, result) => {
    sql.query(
        `UPDATE ${tableName} SET productname = ?, brandname = ?, category = ?, opened = ?, durability = ?, image = ?,
        latitude = ?, longitude = ? WHERE id = ?`,
        [item.productname, item.brandname, item.category, item.opened, item.durability, item.image, item.latitude, item.longitude, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found MakeupItem with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated makeupItem: ", { id: id, ...item });
            result(null, { id: id, ...item });
        }
    );
};

MakeupItem.remove = (id, result) => {
    sql.query(`DELETE FROM ${tableName} WHERE id = ?`, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found MakeupItem with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted makeupItem with id: ", id);
        result(null, res);
    });
};

MakeupItem.removeAll = result => {
    sql.query(`DELETE FROM ${tableName}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} makeupItems`);
        result(null, res);
    });
};

module.exports = MakeupItem;