# Simple Product Cart (React)

A React-based shopping cart application that demonstrates inventory management, cart state handling, and automatic cart expiration.

## Features

- Displays a list of products with available stock levels
- Prevents adding out-of-stock products to the cart
- Prevents adding more items than available stock
- Updates inventory levels in real time when products are added to the cart
- Shopping cart with quantity management
- Automatic cart expiration after 5 minutes
- Countdown timer showing the remaining cart lifetime
- Persists cart data using Local Storage
- Restores cart state after page refresh

## Tech Stack

- React
- TypeScript
- CSS
- Local Storage API

## Business Logic

The application starts with three products:

| Product | Initial Stock |
|----------|----------|
| Product Mango | 0 |
| Product Orange | 1 |
| Product Apple | 6 |

### Inventory Management

- Users can only add products that are in stock
- Stock is reduced when products are added to the cart
- Users cannot exceed the available inventory
- Inventory is updated immediately within the UI

### Cart Expiration

- A 5-minute timer starts when the first item is added to the cart
- The remaining time is displayed to the user
- When the timer expires:
  - The cart is automatically cleared
  - Product inventory is reset to its original state

### State Persistence

- Cart contents are stored in Local Storage
- The application restores the cart state after page refresh
- The remaining cart lifetime is preserved while the session is active

## Installation

```bash
npm install
npm start