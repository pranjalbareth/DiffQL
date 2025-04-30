#!/usr/bin/env node

const { compareSchemas } = require('./diffEngine');
const path = require('path');

const oldSchemaPath = path.resolve(process.argv[2]);
const newSchemaPath = path.resolve(process.argv[3]);

if (!oldSchemaPath || !newSchemaPath) {
    console.error('Please provide paths to two GraphQL schema files.');
    process.exit(1);
}

const diffs = compareSchemas(oldSchemaPath, newSchemaPath);

if (diffs.length > 0) {
    console.log('Differences between schemas:');
    diffs.forEach(diff => console.log(diff));
} else {
    console.log('No differences found.');
}
