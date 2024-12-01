# TopBrico Express

This repository is a **Node.js** and **TypeScript** starter template for building backend applications with **Express.js**, **Mongoose**, and a modern development workflow including **Husky**, **Nodemon**, and **ESLint**.

---

## Features

- **Express.js**: Fast and unopinionated web framework.
- **TypeScript**: Strong typing for better developer experience and code safety.
- **Mongoose**: Elegant MongoDB object modeling.
- **Husky**: Git hooks to enforce pre-commit and commit message linting.
- **Nodemon**: Automatic server restarts during development.
- **ESLint** & **Prettier**: Code linting and formatting for clean, consistent code.
- **Commitlint**: Enforce conventional commit messages.

---

## Requirements

- **Node.js**: v20+
- **Yarn**: v1.22.22+
- **MongoDB**: Local or cloud-based instance (e.g., MongoDB Atlas)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:EDAMGHY/express-starter.git
cd topbrico-express
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following:

```env
PORT=PORT_HERE
MONGO_URI=MONGO_URI_HERE
JWT_SECRET=JWT_SECRET_HERE
JWT_LIFETIME=JWT_LIFETIME_HERE
```

### 4. Run the Development Server

```bash
yarn dev
```

---

## Project Structure

```
├── src
│   ├── config           # Configuration files (e.g., database connection)
│   ├── controllers      # Request handlers
│   ├── middleware       # Express middlewares
│   ├── models           # Mongoose schemas and models
│   ├── routes           # API route definitions
│   ├── utils            # Utility functions
│   └── index.ts         # Application entry point
├── .eslintrc.js         # ESLint configuration
├── .prettierrc          # Prettier configuration
├── package.json         # Project metadata and dependencies
├── tsconfig.json        # TypeScript configuration
├── nodemon.json         # Nodemon configuration
└── README.md            # Documentation
```

---

## Scripts

| Script     | Command                                                              | Description                      |
| ---------- | -------------------------------------------------------------------- | -------------------------------- |
| `dev`      | `nodemon`                                                            | Run the development server       |
| `build`    | `tsc && tsc-alias`                                                   | Compile TypeScript to JavaScript |
| `start`    | `npm run build && cross-env NODE_ENV=production node dist/server.js` | Start the production server      |
| `lint`     | `eslint src --ext .ts`                                               | Run ESLint for code linting      |
| `lint:fix` | `eslint src --ext .ts --fix`                                         | Auto-fix linting errors          |
| `prepare`  | `husky`                                                              | Prepare Husky Git hooks          |

---

## Tools and Configurations

### ESLint & Prettier

- Configured to enforce a clean and consistent coding style.
- Rules are defined in `.eslintrc.js` and `.prettierrc`.

### Husky & Commitlint

- Husky runs pre-commit hooks defined in `package.json` to lint and format code.
- Commitlint ensures commits follow conventional standards.

### Nodemon

- Automatically restarts the server on file changes during development.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "feat: Add your feature"
   ```
4. Push your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Happy Coding! 😊
