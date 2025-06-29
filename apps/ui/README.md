# Inspection App Frontend

A modern web UI for the Inspection App, built with **React**, **Next.js**, **React Query**, and **ShadCN**. This frontend enables users to manage templates, properties, and inspections via a clean, responsive interface.

<p align="center">
    <a href="https://inspection-ui.vercel.app/" target="blank">UI Demo</a>
</p>

<img width="900" src="../../screenshots/ui/home.png" alt="home" />
<img width="900" src="../../screenshots/ui/template.png" alt="template" />
<img width="900" src="../../screenshots/ui/property.png" alt="property" />
<img width="900" src="../../screenshots/ui/inspection.png" alt="inspection" />

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [App Structure](#app-structure)
- [API Integration](#api-integration)
- [Docker](#docker)
- [Assumptions & Limitations](#assumptions--limitations)
- [License](#license)

## Features

- Browse, create, and view inspection templates
- Manage property objects (add, list, view)
- Create and fill out inspections using templates
- Responsive UI with **ShadCN** components
- Data fetching and caching with **React Query**
- Basic error handling

## Tech Stack

- **React** (UI library)
- **Next.js** (SSR/SSG framework)
- **React Query** (data fetching & caching)
- **ShadCN** (UI components)
- **Docker** & **Docker Compose**

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)

### Local Development

#### Install dependencies

`npm install`

#### Start development server

`npm run dev`

> The app will be available at `http://localhost:3000`.

## App Structure

- `/src/app`: Next.js routes
- `/components`: Reusable UI components (ShadCN-based)
- `/modules`: Modules for the business logic UI/UX
- `/services`: API client logic
- `/modules/hooks`: Custom hooks (e.g., for React Query)

## API Integration

- Expects the backend API to be running at `http://localhost:4000` (configurable)
- Uses React Query for all data fetching and caching

## Assumptions & Limitations

- No authentication implemented (can be extended)
- Only core flows implemented for demonstration
- Write unit tests & cypress test
- I18N for multiple languages
- dockerize the Application

## Author

> Ravisankar Chinnam
