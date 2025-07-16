# Foodies Project - Team 3

## Deployment
The application is deployed and accessible at: [https://foodies-project-team-3.vercel.app](https://foodies-project-team-3.vercel.app)

## Tech Stack

### Front-end

- **React** (v19.1.0) & **React DOM** (v19.1.0) - JavaScript library for building user interfaces with component-based architecture
- **Vite** (v7.0.0) - Next-generation frontend build tool and development server offering fast HMR (Hot Module Replacement)
- **Formik** (v2.4.6) & **Yup** (v1.6.1) - Form handling library with schema-based validation
- **Redux** (v5.0.1), **Redux Toolkit** (v2.8.2) & **React-Redux** (v9.2.0) - State management solution for predictable state containers
- **Axios** (v1.10.0) - Promise-based HTTP client for making API requests
- **React Router DOM** (v7.6.3) - Declarative routing library for React applications
- **React Icons** (v5.5.0) - Library providing popular icon sets as React components
- **clsx** (v2.1.1) - Utility for constructing className strings conditionally
- **modern-normalize** (v3.0.1) - CSS normalizer for consistent styling across browsers

## Development

### Development Tools

- **ESLint** (v9.29.0) - Static code analysis tool for identifying problematic patterns and enforcing code style
- **TypeScript** types for React - Type checking system for improved developer experience and code reliability
- **@vitejs/plugin-react** (v4.5.2) - Vite plugin that provides React integration with Babel for Fast Refresh

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
