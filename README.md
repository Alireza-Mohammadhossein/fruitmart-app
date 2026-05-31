# FruitMart

A React and TypeScript shopping cart application that demonstrates inventory management, cart persistence, automated cart expiration, and modern development workflows.

## Live Demo

**Application URL:** https://fruitmart-app.vercel.app/

## Features

### Product Inventory Management

* Displays available products and stock quantities
* Prevents adding out-of-stock products
* Prevents adding more items than available inventory
* Updates stock levels in real time when items are added to the cart

### Shopping Cart

* Add products to the cart
* Manage item quantities
* Real-time cart updates
* Inventory-aware cart validation

### Cart Expiration

* Automatically starts a countdown when the first item is added
* Displays the remaining cart lifetime to the user
* Automatically clears the cart after 5 minutes
* Restores inventory when the cart expires

### State Persistence

* Persists cart data using Local Storage
* Restores cart contents after page refresh
* Preserves user progress during the active session

### Development Workflow

* Source control using Git and GitHub
* Continuous Integration using GitHub Actions
* Automated production deployment using Vercel

## Tech Stack

* React
* TypeScript
* CSS
* Local Storage API
* GitHub Actions
* Vercel

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm start
```

### Production Build

```bash
npm run build
```

## CI/CD

The project includes a simple CI pipeline using GitHub Actions that automatically validates the application when code is pushed to the repository.

Deployment is handled through Vercel, enabling automated publishing of production builds.

## Learning Objectives

This project was created to practice:

* React component architecture
* TypeScript development
* State management
* Inventory management logic
* Time-based application behaviour
* Browser storage persistence
* CI/CD fundamentals
* Deployment workflows

## Future Improvements

* Backend API integration
* User authentication
* Product management dashboard
* Automated testing
* Responsive mobile-first design
* Order history functionality
