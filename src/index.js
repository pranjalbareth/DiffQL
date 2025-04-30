#!/usr/bin/env node

const { compareSchemas } = require('./diffEngine');
const chalk = require('chalk');

const args = process.argv.slice(2);
if (args.length < 2) {
    console.log(chalk.red('[i] Please provide paths to old and new schema files.'));
    process.exit(1);
}

const [oldPath, newPath] = args;

const diffs = compareSchemas(oldPath, newPath);

if (diffs.length === 0) {
    console.log(chalk.greenBright('[✓] No changes detected between the schemas.'));
    process.exit(0);
}

console.log(chalk.bold.underline('\nSchema Diff Results:\n'));

diffs.forEach(diff => {
    if (diff.startsWith('Breaking')) {
        console.log(`${chalk.red('[i]')} ${chalk.red(diff)}`);
    } else {
        console.log(`${chalk.green('[√]')} ${chalk.green(diff)}`);
    }
});
