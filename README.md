# 🔗 URL Shortener API

An backend service that shortens long URLs, inspired by services like Bitly. 

## 🚀 Features

* **Shorten Long URLs**
  Generate unique, short codes for long URLs using a simple `POST` request.

* **Redirect to Original URL**
  Redirect users to the original URL when they visit the shortened code.

* **Track URL Usage**
  View statistics on how many times a short URL has been accessed.

* **Input Validation**
  Ensures only valid URLs are accepted.

* **Timestamps**
  Each shortened URL is stored with a creation timestamp.

---

## 📦 Tech Stack

* **Node.js** with **Express**
* **MongoDB** (for URL and stats storage)
* 
---

## ✅ Validations

* Ensures `longUrl` is a valid URL format.
* Prevents duplicate short codes.
* Handles missing or invalid short codes gracefully.

---

## 📌 Setup Instructions

1. **Clone the repository:**
2. **Install dependencies:**
   npm install
3. **Set environment variables (Mongo URI, base URL, etc.) in `.env`:**
   MONGO_URI=your_mongodb_uri
4. **Run the server:**
   node index.js
---
