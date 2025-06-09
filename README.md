# Rem Waste Skip Selector (React + Vite)

This project is a modern skip selection UI for Rem Waste, built with React, Vite, and Tailwind CSS. The goal was to create a fast, interactive, and user-friendly experience for customers choosing skip sizes, with features like theme switching and AI-powered recommendations.

## Approach

- **Modern Stack**: Used [Vite](https://vitejs.dev/) for lightning-fast development and build, and [React 19](https://react.dev/) for UI.
- **Component-Driven**: Built reusable UI components (`Button`, `Card`, `Stepper`, etc.) for maintainability and scalability.
- **Tailwind CSS**: Leveraged utility-first CSS for rapid styling and easy dark mode support.
- **Custom Hooks**: Created hooks like [`useTheme`](src/hooks/useTheme.js) for theme management and [`useSkips`](src/hooks/useSkips.js) for fetching skip data.
- **API Integration**: Fetches skip options from a remote API, transforming the data for display.
- **AI Recommendation**: Integrated an AI modal ([`RecommendationModal`](src/components/RecommendationModal.jsx)) to suggest the best skip size based on user input.
- **Responsive & Accessible**: Ensured the UI works well on all devices and supports keyboard navigation and accessibility best practices.
- **Sticky Footer**: Added a sticky summary/footer ([`StickyFooter`](src/components/StickyFooter.jsx)) for quick actions on mobile.

## How I Built This

1. **Project Setup**: Initialized with Vite’s React template for fast HMR and minimal config.
2. **Styling**: Configured Tailwind CSS and PostCSS for utility-first styling.
3. **Component Design**: Broke down the UI into logical, reusable components.
4. **State Management**: Used React hooks for local state and effects.
5. **API Handling**: Used `fetch` in a custom hook to load skip data and handle loading/error states.
6. **Theme Support**: Implemented light/dark mode with a toggle and persisted user preference.
7. **AI Integration**: Added a modal to call an AI API for skip recommendations based on project description.
8. **Testing & Linting**: Used ESLint for code quality and followed best practices for maintainability.

## Running Locally

```sh
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Folder Structure

- `src/components/` – UI components
- `src/hooks/` – Custom React hooks
- `src/config/` – App configuration
- `public/` – Static assets

## Future Improvements

- Add unit and integration tests
- Improve accessibility and keyboard navigation
- Expand AI recommendation logic
- Add more steps to the skip hire process

---

Built with ❤️ using React, Vite, and Tailwind CSS.