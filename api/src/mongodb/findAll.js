"use strict";
exports.__esModule = true;
var connect_1 = require("./connect");
var findAll = function (collectionName) {
    return new Promise(function (resolve, rejects) {
        connect_1["default"]()
            .then(function (client) {
            client
                .db('test')
                .collection(collectionName)
                .find({})
                .toArray()
                .then(function (res) {
                resolve(res);
            })["catch"](function (err) {
                rejects(err);
                console.warn('[mongodb] Collection Error: ' + err);
            });
        })["catch"](function (err) {
            rejects(err);
            console.warn('[mongodb] Connection Error: ' + err);
        });
    });
};
exports["default"] = findAll;
