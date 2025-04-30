const { parse, buildSchema } = require('graphql');
const fs = require('fs');

function parseSchema(filePath) {
    const schemaContent = fs.readFileSync(filePath, 'utf8');
    try {
        const schema = buildSchema(schemaContent);
        return schema;
    } catch (error) {
        throw new Error('Invalid GraphQL schema file: ' + error.message);
    }
}

module.exports = { parseSchema };
