# Vue 3 E-commerce Store Assessment

A modern, high-performance e-commerce prototype built with **Vue 3**, **TypeScript**, and **Pinia**. This project was developed as a technical assessment for a Mid-level Frontend Developer position.

## 🚀 Features

- **Product Listing**: Dynamic display of products with high-quality images.
- **Real-time Search**: Instant filtering of products based on name or category.
- **Advanced Basket Logic**:
  - Persistent state management using Pinia.
  - Automatic quantity handling (incrementing existing items).
  - Real-time total price calculation.
- **Modern Styling**: Built with **Tailwind CSS v4** for a clean, responsive UI.
- **Unit Testing**: Core business logic (store/basket) covered by **Vitest**.

---

## 🛠️ Technical Stack

| Technology                  | Purpose                          |
| :-------------------------- | :------------------------------- |
| **Vue 3 (Composition API)** | Frontend Framework               |
| **TypeScript**              | Static Typing & Code Reliability |
| **Pinia**                   | State Management                 |
| **Vite**                    | Build Tool & Dev Server          |
| **Tailwind CSS v4**         | Utility-first CSS                |
| **Vitest**                  | Unit Testing                     |

---

## 📦 Installation & Setup

1. _Clone the project and enter the directory:_
   npm install

2. _Run the development server:_
   npm run dev

3. _Run Unit Tests:_
   npm test

4. _Build for production:_
   npm run build

## 🧠 Architectural Decisions

**Service Layer:** Data fetching is isolated in productService.ts to simulate a real-world API interaction and keep components clean.

**State Management:** Pinia was chosen over Vuex for its superior TypeScript support and simpler API.

T**ypeScript Interfaces:** Centralized types in src/types/index.ts ensure data consistency across the app.

**Tailwind v4:** Utilized the latest CSS-first engine for faster builds and modern styling capabilities.

## 💡 Challenges & Solutions
**LocalStorage Persistence in Testing**: Integrating localStorage for data persistence caused ReferenceError during unit tests in the Node.js environment.

Solution: I configured the test environment to use jsdom and implemented a clean-up strategy in beforeEach to ensure test isolation.

**Inventory Control**: Implementing a robust "Add to Basket" logic that respects product stock required careful state synchronization.

Solution: Developed a centralized validation method within the Pinia store to handle quantity updates and stock limits globally.

## ✨ Bonus Features Implemented
**Data Persistence**: Integrated localStorage to ensure the basket state survives page reloads.

**Stock Management Logic**: Added a validation layer to prevent overselling based on mock data availability.

**Responsive UI**: Fully responsive design using Tailwind's mobile-first breakpoints.

**Edge Case Testing**: Unit tests cover not just basic success paths but also boundary conditions (e.g., removing last item, exceeding stock).

## 📝 Author

Georgios Mitsios Frontend Developer Assessment - 2026


