#!/usr/bin/env node
/* eslint no-var: 0 */

var babylon = require("babylon");
var fs      = require("fs");

var filename = process.argv[2];
if (!filename) {
  console.error("no filename specified");
  process.exit(0);
}

var file = fs.readFileSync(filename, "utf8");
var ast  = babylon.parse(file, { sourceType: 'module' });

console.log(JSON.stringify(ast, null, "  "));
