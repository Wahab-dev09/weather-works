# Weather App

## Overview

The Weather App is a React-based application designed to provide real-time weather information. It includes several components that fetch and display weather data, handle errors, and provide a user-friendly interface. The app features lazy-loaded components to improve performance and provides dynamic backgrounds based on the current weather conditions.

## Components

### Weather Page

The main component that displays the current weather information.

- **File:** `Weather.jsx`
- **Features:**
  - Fetches and displays current weather data from the WeatherAPI.
  - Shows temperature, condition, and humidity.
  - Updates background image dynamically based on weather conditions.
  - Utilizes Framer Motion for smooth animations.
- **CSS:** `Weather.css`

### Error Page

Handles errors such as invalid locations or issues with data fetching.

- **File:** `Error.jsx`
- **Features:**
  - Displays an error message if there is an issue with the API request or user input.
  - Provides guidance for users to correct their input.
- **CSS:** `Index.css`

### Main Component

Manages routing and displays the appropriate page based on the URL.

- **File:** `Main.jsx`
- **Features:**
  - Routes between different components (e.g., Weather and Error pages).
  - Shows a fallback page for unmatched routes, redirecting users to the Weather page.
- **CSS:** `Index.css`

## Technologies Used

- **React:** For building the user interface.
- **Framer Motion:** For animations and transitions.
- **WeatherAPI:** For fetching real-time weather data.
- **CSS:** For styling the application.

## Dependencies

- `react`: Core library for building the user interface.
- `framer-motion`: For animations and transitions.
- `react-router-dom`: For routing between pages.