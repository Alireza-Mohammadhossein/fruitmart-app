# Simple Product Cart (React)

A simple React-based shopping cart application where users can add products to a cart with stock management and an auto-expiring cart feature.

## Features

- Displays a list of products with stock availability
- Prevents adding out-of-stock products to the cart
- Enforces stock limits when adding items to the cart
- Automatically updates stock when items are added to the cart
- Shopping cart with real-time quantity updates
- Cart automatically clears after 5 minutes of inactivity (timer-based reset)

## Tech Stack

- React
- JavaScript / TypeScript (if used, mention correct one)
- CSS

## How it works

- The app starts with a predefined list of 3 products:
  - One product with 0 stock (disabled for purchase)
  - One product with 1 stock
  - One product with 5 stock

- When a product is added to the cart:
  - Stock is decreased accordingly
  - Cart state is updated immediately
  - User cannot exceed available stock

- A 5-minute countdown starts when the first item is added to the cart
- When the timer expires, the cart is automatically cleared

## How to run the project

```bash
npm install
npm start