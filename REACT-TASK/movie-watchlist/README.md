# Movie Watchlist App 🎬

This project is a **Movie Watchlist Application** built using **React, TypeScript, and Vite**.
It allows users to search for movies using the OMDb API, add movies to a personal watchlist, and track whether they have watched them or plan to watch them later.

The project demonstrates modern frontend development using **React functional components, hooks, API integration, and localStorage persistence**.

---

## 🚀 Features

* 🔍 Search movies using the OMDb API
* ➕ Add movies to a personal watchlist
* ❌ Remove movies from the watchlist
* 🎯 Mark movies as **Watched** or **To Watch**
* 💾 Persist watchlist using **localStorage**
* 🎛 Filter watchlist by status (All / Watched / To Watch)
* 📱 Responsive UI styled with Tailwind CSS

---

## 🛠 Tech Stack

* React (Functional Components + Hooks)
* TypeScript
* Vite
* Tailwind CSS
* OMDb API

---

## 📦 Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate to the project folder:

```bash
cd movie-watchlist
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app will run at:

```
http://localhost:5173
```

---

## 🔑 API Setup

This project uses the **OMDb API** to fetch movie data.

1. Get a free API key from:

   https://www.omdbapi.com/apikey.aspx

2. Open:

```
src/App.tsx
```

3. Replace:

```ts
const API_KEY = "YOUR_API_KEY"
```

with your API key.

---

## 🧪 How to Test the App

1. Start the development server.
2. Search for a movie (e.g., *Batman*).
3. Click **Add** to add the movie to your watchlist.
4. Toggle movie status between **Watched** and **To Watch**.
5. Remove movies from the watchlist.
6. Refresh the page to confirm that data persists using localStorage.

---

## 📂 Project Structure

```
src
 ├─ components
 │   ├─ MovieCard.tsx
 │   ├─ MovieList.tsx
 │   └─ Filter.tsx
 ├─ types.ts
 ├─ App.tsx
 ├─ main.tsx
 └─ index.css
```

---

## 🌟 Future Improvements

Possible enhancements:

* Movie details modal
* Loading spinner while fetching data
* Debounced search
* Pagination for movie results
* Better UI animations

---

## 📜 License

This project is for educational and learning purposes.
