const { compareSchemas } = require('../src/diffEngine');
const { parseSchema } = require('../src/parser');

jest.mock('../src/parser.js');

describe('compareSchemas', () => {
    it('should detect a non-breaking change', () => {
        parseSchema.mockImplementationOnce(() => ({
            getTypeMap: () => ({
                User: {},
            }),
        }));

        parseSchema.mockImplementationOnce(() => ({
            getTypeMap: () => ({
                User: {},
                Post: {},
            }),
        }));

        const diffs = compareSchemas('./schemas/oldSchema.graphql', './schemas/newSchema.graphql');
        expect(diffs).toContain("Non-breaking: Type 'Post' added");
    });

    it('should detect a breaking change', () => {
        parseSchema.mockImplementationOnce(() => ({
            getTypeMap: () => ({
                User: {},
                Post: {},
            }),
        }));

        parseSchema.mockImplementationOnce(() => ({
            getTypeMap: () => ({
                Post: {},
            }),
        }));

        const diffs = compareSchemas('./schemas/oldSchema.graphql', './schemas/newSchema.graphql');
        expect(diffs).toContain("Breaking: Type 'User' removed");
    });
    it('should detect a removed field (breaking)', () => {
        parseSchema.mockImplementationOnce(() => ({
            getTypeMap: () => ({
                User: {
                    getFields: () => ({
                        id: { type: { toString: () => 'ID!' } },
                        email: { type: { toString: () => 'String!' } },
                    }),
                },
            }),
        }));

        parseSchema.mockImplementationOnce(() => ({
            getTypeMap: () => ({
                User: {
                    getFields: () => ({
                        id: { type: { toString: () => 'ID!' } },
                    }),
                },
            }),
        }));

        const diffs = compareSchemas('oldSchema.graphql', 'newSchema.graphql');
        expect(diffs).toContain("Breaking: Field 'email' removed from type 'User'");
    });

    it('should detect an added field (non-breaking)', () => {
        parseSchema.mockImplementationOnce(() => ({
            getTypeMap: () => ({
                User: {
                    getFields: () => ({
                        id: { type: { toString: () => 'ID!' } },
                    }),
                },
            }),
        }));

        parseSchema.mockImplementationOnce(() => ({
            getTypeMap: () => ({
                User: {
                    getFields: () => ({
                        id: { type: { toString: () => 'ID!' } },
                        avatar: { type: { toString: () => 'String' } },
                    }),
                },
            }),
        }));

        const diffs = compareSchemas('oldSchema.graphql', 'newSchema.graphql');
        expect(diffs).toContain("Non-breaking: Field 'avatar' added to type 'User'");
    });

    it('should detect a changed field type (breaking)', () => {
        parseSchema.mockImplementationOnce(() => ({
            getTypeMap: () => ({
                User: {
                    getFields: () => ({
                        age: { type: { toString: () => 'Int' } },
                    }),
                },
            }),
        }));

        parseSchema.mockImplementationOnce(() => ({
            getTypeMap: () => ({
                User: {
                    getFields: () => ({
                        age: { type: { toString: () => 'String' } },
                    }),
                },
            }),
        }));

        const diffs = compareSchemas('oldSchema.graphql', 'newSchema.graphql');
        expect(diffs).toContain("Breaking: Field 'age' changed type from 'Int' to 'String' in 'User'");
    });

});
