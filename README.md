# FlipStore Recommendation System

<div align="center">
  <img src="https://github.com/Adi-ty/FlipStore/assets/52607235/ad887a04-fe7a-4693-9228-d400e544b7fa" alt="FlipStore Logo" width=300 height = 300/>
</div>

Welcome to the FlipStore Recommendation System project! This repository contains both the Flask-based recommendation server and the Next.js web application for a fashion e-commerce website named FlipStore.

## Block Diagram
![ml-grid drawio (7)](https://github.com/Adi-ty/FlipStore/assets/52607235/21347a6b-1b5a-490f-996d-354dcc6e7277)


## Setup

### Flask Recommendation Server

1. Move to the `recommendation-server` directory:

   ```bash
   cd recommendation-server
   ```

2. Create a virtual environment:

   ```bash
   python -m venv .venv
   ```

3. Activate the virtual environment:

- For Windows: `.venv/Scripts/activate`
- For macOS/Linux: `source .venv/bin/activate`

4. Install required packages:

   ```bash
   pip install -r requirements.txt
   ```

5. Run the Flask server:

   ```bash
   flask run
   ```

### Next.js Web Application

1. Install dependencies:

   ```bash
   cd web
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

## Usage

- Access the Next.js web application at `http://localhost:3000`.
- The Flask recommendation server runs at `http://localhost:5000` and provides recommendation APIs for the web application.

### You can Access the Flask Recommendation API at [https://flipgrid-api.azurewebsites.net/](https://flipgrid-api.azurewebsites.net/)

### Recommendation API Endpoints

- `GET /api/newuser/predict`: Get recommendations for a new user.
- `GET /api/user/predict/[product]`: Get recommendations for a user based on similar user for a given product.
- `GET /api/similarProducts/predict/[product]`: Get recommendations for a product based on similar products.
- `GET /api/past/predict/[product]`: Get recommendations for a product based on past purchases.
