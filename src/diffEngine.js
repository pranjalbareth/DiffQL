const { parseSchema } = require('./parser');

function compareSchemas(oldPath, newPath) {
    const oldSchema = parseSchema(oldPath);
    const newSchema = parseSchema(newPath);

    const diffs = [];

    const oldTypes = oldSchema.getTypeMap();
    const newTypes = newSchema.getTypeMap();

    for (let typeName in oldTypes) {
        if (!newTypes[typeName]) {
            diffs.push(`Breaking: Type '${typeName}' removed`);
            continue;
        }

        const oldFields = oldTypes[typeName].getFields?.();
        const newFields = newTypes[typeName].getFields?.();

        if (oldFields && newFields) {
            for (let fieldName in oldFields) {
                if (!newFields[fieldName]) {
                    diffs.push(`Breaking: Field '${fieldName}' removed from type '${typeName}'`);
                } else {
                    const oldType = oldFields[fieldName].type.toString();
                    const newType = newFields[fieldName].type.toString();
                    if (oldType !== newType) {
                        diffs.push(`Breaking: Field '${fieldName}' changed type from '${oldType}' to '${newType}' in '${typeName}'`);
                    }
                }
            }

            for (let fieldName in newFields) {
                if (!oldFields[fieldName]) {
                    diffs.push(`Non-breaking: Field '${fieldName}' added to type '${typeName}'`);
                }
            }
        }
    }

    for (let typeName in newTypes) {
        if (!oldTypes[typeName]) {
            diffs.push(`Non-breaking: Type '${typeName}' added`);
        }
    }

    return diffs;
}

module.exports = { compareSchemas };
