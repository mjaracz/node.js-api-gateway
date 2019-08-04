"use strict";
exports.__esModule = true;
var connect_1 = require("./connect");
var findById = function (collectionName, id) {
    return new Promise(function (response, rejects) {
        connect_1["default"]()
            .then(function (client) {
            var cursor = client.db('test').collection(collectionName).find({ id: id });
            cursor.hasNext().then(function (isDocuments) {
                if (isDocuments)
                    cursor
                        .toArray()
                        .then(function (arr) {
                        response(arr);
                    })["catch"](function (err) {
                        rejects(err);
                        console.warn('[mongodb] Collection Error ' + err);
                    });
                else
                    throw new Error('ID without rang');
            })["catch"](function (err) {
                rejects(err);
                console.warn('[mongodb] Documents ' + err);
            });
        });
    });
};
exports["default"] = findById;
