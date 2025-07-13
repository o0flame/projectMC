# Market Cap Dashboard

This repository contains a minimal implementation of a market capitalization dashboard inspired by **8marketcap.com**.

## Structure

- `backend` – Node.js server exposing an `/api/assets` endpoint and serving the frontend files.
- `frontend` – Static files (HTML/CSS/JS) that fetch and display asset data.

## Running the project

1. `cd backend`
2. Install dependencies (none required).
3. Run the server:
   ```bash
   node server.js
   ```
4. Open `http://localhost:3000` in your browser.

## Tests

From the `backend` directory run:

```bash
npm test
```

This uses Node's built-in test runner to verify that the API returns data.
