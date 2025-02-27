# 🛒 E-Commerce Scraper

## **📌 Project Overview**

This project is a **full-stack e-commerce scraper** that fetches **product details** using **web scraping** and stores them in a database. The frontend allows users to:

- Search for **products by category**
- **🔎 Search Bar with Debounce Effect:** Users can **search for products by name**, and requests will be triggered **after a delay** to prevent excessive API calls.

- Submit **Product URLs** for scraping
- **Refetch product details** if data is outdated
- View **product images** in a **carousel**

Both the backend (**Ruby on Rails**) and frontend (**React with Material-UI**) ensure **seamless user experience** and **real-time updates** via **Sidekiq jobs**.

---

## **⚡ Tech Stack Used**

| Layer         | Tech                                      |
| ------------- | ----------------------------------------- |
| **Frontend**  | React.js (Vite), Material-UI, Axios       |
| **Backend**   | Ruby on Rails, PostgreSQL, Sidekiq, Redis |
| **Scraping**  | Nokogiri (for parsing HTML)               |
| **Job Queue** | Sidekiq (for async scraping)              |
| **Storage**   | Active Storage (for product images)       |

---

## **🚀 Features**

### **🔹 Frontend (React + Material-UI)**

- **📌 Category-Based Filtering:** Select a category from a dropdown to view related products.
- **🔍 Product Search & Submission:** Users can **paste a Flipkart URL** to scrape product details.
- **📷 Image Carousel:** Products with **multiple images** are displayed using a **carousel slider**.
- **🔄 Refetch Data:** If a product’s data is **older than 1 week**, users can **update it asynchronously**.
- **📜 Pagination Support:** Paginated product lists to enhance user experience.
- **🎨 Modern UI:** Dark-themed **Material-UI** styling with **glassmorphism effects**.

### **🔹 Backend (Rails API)**

- **🛠 Web Scraping:** Uses **Nokogiri** to fetch **title, price, discount, images, and seller info**.
- **📦 Data Storage:** Stores **products** in **PostgreSQL** along with **categories** and **product images**.
- **🔄 Async Processing:** **Sidekiq (Redis)** is used for **asynchronous scraping** to prevent UI blocking.

---

## **🎯 API Routes Summary**

| Method   | Endpoint                                            | Description                                                                       |
| -------- | --------------------------------------------------- | --------------------------------------------------------------------------------- |
| **GET**  | `/api/categories`                                   | Fetch all product categories                                                      |
| **GET**  | `/api/products?page=1&category_id=1&search=glasses` | Fetch products (supports **pagination, filtering by category, and search query**) |
| **POST** | `/api/products`                                     | Scrape a new product                                                              |
| **POST** | `/api/products/:id/refetch`                         | Refetch product data if outdated                                                  |

## **🛠 Installation & Setup**

---

### **🔹 Backend (Rails API) Setup**

1️⃣ **Navigate to the Backend Directory**

```sh
Set Up Ruby & Install Dependencies
cd backend

Install the required Ruby version (if using rbenv):

rbenv install <ruby-version>

bundle install

rails db:create

rails db:migrate

Start the Rails API Server
rails s

Start Sidekiq for Background Jobs
Ensure Redis is installed and running
bundle exec sidekiq

```

### 🔹 Frontend (React + Vite) Setup

2️⃣ Navigate to the Frontend Directory

```sh

cd frontend

Install Dependencies
npm install

Start React Development Server
npm run dev

```

### ✅ Now project should now be running at http://localhost:5173! 🎉

Simply select a category, search for products, or paste a Product URL to scrape new product data.
