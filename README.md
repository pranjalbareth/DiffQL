# DiffQL

> CLI tool to detect breaking/non-breaking changes between two GraphQL schemas.

## Example Usage

```bash
diffql ./schemas/oldSchema.graphql ./schemas/newSchema.graphql
Breaking: Field 'email' removed from type 'User'
Non-breaking: Type 'Post' added
```
---

## ✅ Final Check: Local Install Test

From root:

```bash
npm install -g .
diffql ./schemas/oldSchema.graphql ./schemas/newSchema.graphql
```