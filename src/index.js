#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const commander = require("commander");
require("./db");

const program = new commander.Command();

program.version("1.0.0");

const dir = path.join(__dirname, "commands");

fs.readdirSync(dir).map(file => {
  const filePath = path.join(dir, file);
  const isFile = fs.lstatSync(filePath).isFile();
  if (isFile) {
    const commandModule = require(filePath);
    commandModule(program);
  }
});

program.parse(process.argv);
