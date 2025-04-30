# 🔍 DiffQL

**A blazing-fast CLI tool to detect breaking and non-breaking changes between two GraphQL schemas.**

---

## 📦 Installation

Install globally via NPM:

```bash
npm install -g diffql
```

---

## 🚀 Usage

```bash
diffql ./schemas/oldSchema.graphql ./schemas/newSchema.graphql
```

You can also run directly using Node:

```bash
node src/index.js ./schemas/oldSchema.graphql ./schemas/newSchema.graphql
```

---

## ✅ Output Example

```
🔍 Schema Diff Results:

❌ Breaking: Type 'User' removed
✅ Non-breaking: Type 'Post' added
```

- ✅ Green: Non-breaking change (e.g., new types or fields)
- ❌ Red: Breaking change (e.g., removed types or required fields removed)

---

## 📖 Features

- 🔍 Detect breaking and non-breaking changes
- 🎨 Color-coded CLI output (tick/cross icons)
- 🛠 Works on any GraphQL schema file
- 🔁 Easily integratable into CI/CD

---

## 🗺 Roadmap (Coming Soon)

- 🚫 CI/CD enforcement mode (`--fail-on-breaking`)
- ⚙️ Custom rule engine via config file
- 🕘 Schema version history & timeline
- 🧠 Smart impact analysis

---

## 🧪 Testing

We use Jest for tests:

```bash
npm run test
```

---

## 👨‍💻 Contributing

Pull requests and ideas are welcome!

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a PR

---

## 📄 License

MIT License. Use it freely.

---

## 🌍 Links

- NPM: [https://www.npmjs.com/package/diffql](https://www.npmjs.com/package/diffql)
- GitHub: [https://github.com/pranjalbareth/diffql](https://github.com/pranjalbareth/diffql)