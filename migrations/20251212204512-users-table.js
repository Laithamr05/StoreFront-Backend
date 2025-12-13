"use strict";

var fs = require("fs");
var path = require("path");
var Promise;

exports.setup = function (options, seedLink) {
  Promise = options.Promise;
};

exports.up = function (db) {
  var filePath = path.join(__dirname, "sqls", "20251212204512-users-table-up.sql");
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, { encoding: "utf-8" }, function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  }).then(function (data) {
    return db.runSql(data);
  });
};

exports.down = function (db) {
  var filePath = path.join(__dirname, "sqls", "20251212204512-users-table-down.sql");
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, { encoding: "utf-8" }, function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  }).then(function (data) {
    return db.runSql(data);
  });
};

exports._meta = { version: 1 };
