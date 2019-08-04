"use strict";
exports.__esModule = true;
var amqp_connection_manager_1 = require("amqp-connection-manager");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var connection = amqp_connection_manager_1["default"].connect([process.env.amqp_URL]);
exports["default"] = connection;
