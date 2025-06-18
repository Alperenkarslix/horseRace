# 🏇 Horse Racing Game

A real-time horse racing simulation game built with Vue 3, Vuex, and Tailwind CSS.

## 🎮 Live Demo

Experience the excitement of horse racing! Try out our live demo:

[![Live Demo](https://img.shields.io/badge/Live_Demo-Click_Here-blue?style=for-the-badge)](https://alperenkarslix.github.io/horseRace/)

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Alperenkarslix/horseRace.git
cd horseRace
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start development server
```bash
npm run dev
# or
yarn dev
```

4. Build for production
```bash
npm run build
# or
yarn build
```

## 🎮 How to Play

1. Click "GENERATE PROGRAM" to create a new race schedule
2. Press "START RACES" to begin the races
3. Watch horses compete in real-time
4. Use PAUSE/RESUME to control the race
5. Check results in the right panel

## 🏗️ Project Structure

```
src/
├── components/         # Vue components
│   ├── ui/            # Reusable UI components
│   └── icons/         # Icon components
├── store/             # Vuex store modules
│   └── modules/       # Store modules
└── assets/            # Static assets
```

## 🧪 Unit Tests

The project includes comprehensive unit tests to ensure code reliability and maintainability. Vitest is used as the testing framework.

Test coverage includes:
- Component Tests
  - AppHeader
  - HorseList
  - RaceResults
  - RaceSchedule
  - RaceTrack
- Store Tests
  - Race Module

To run the tests:
```bash
npm run test
# or
yarn test
```

## 🎭 Visual Testing (E2E)

End-to-end and visual testing is implemented using Playwright to ensure the application works correctly across different browsers and scenarios.

Test scenarios include:
- **Initial State**: Game title and UI elements visibility
- **Race Program Generation**: Correct race creation and status updates
- **Race Execution**: Race track functionality and horse animations
- **Basic Functionality**: Page reload handling and state persistence

Cross-browser testing support:
- Chromium
- Firefox
- WebKit

To run visual tests:
```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all E2E tests
npm run test:e2e
# or
yarn test:e2e

## 🛠️ Built With

- [Vue 3](https://v3.vuejs.org/) - The Progressive JavaScript Framework
- [Vuex 4](https://vuex.vuejs.org/) - State Management Pattern + Library
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
