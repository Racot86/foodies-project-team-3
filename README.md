# Foodies Project - Team 3

## Tech Stack

### Front-end

- **React** (v19.1.0) & **React DOM** (v19.1.0) - UI library
- **Vite** (v7.0.0) - Build tool and development server
- **Formik** (v2.4.6) & **Yup** (v1.6.1) - Form handling and validation
- **Redux** (v5.0.1), **Redux Toolkit** (v2.8.2) & **React-Redux** (v9.2.0) - State management
- **Axios** (v1.10.0) - HTTP client for API requests
- **React Router DOM** (v7.6.3) - Routing and navigation
- **clsx** (v2.1.1) - Utility for constructing className strings conditionally
- **modern-normalize** (v3.0.1) - CSS normalizer

## Development

### Development Tools

- **ESLint** (v9.29.0) - Code linting and quality tool
- **TypeScript** types for React - Type checking during development
- **@vitejs/plugin-react** (v4.5.2) - React integration for Vite

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### ESLint Configuration

This project uses ESLint for code quality. You can run the linter with:

```bash
npm run lint
```

## Additional Information

For more information about Vite plugins:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)
  uses [SWC](https://swc.rs/) for Fast Refresh
