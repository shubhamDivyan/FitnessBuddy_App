# 🏋️‍♂️ FitnessBuddy Gym Finder

[![Live Site](https://img.shields.io/badge/Visit-Live--Demo-brightgreen?style=for-the-badge)](https://resonant-melomakarona-ed90b4.netlify.app/gym)
[![GitHub Repo](https://img.shields.io/badge/View-GitHub%20Repo-blue?style=for-the-badge&logo=github)](https://github.com/shubhamDivyan/FitnessBuddy_App)

**FitnessBuddy Gym Finder** is a real-time, map-powered web tool built to help users find nearby gyms using their **current location** or **manual city input**. It uses the OpenStreetMap Overpass API and Nominatim geocoding for results, showing gym names, addresses, and Google Maps directions.

This feature is part of the full [FitnessBuddy_App](https://github.com/shubhamDivyan/FitnessBuddy_App), a social fitness tracking platform.

---

## 🧭 Features

- 📍 Find gyms **near your current location** using Geolocation API
- 🏙️ Search gyms by **city name or postal code**
- 🗺️ View **name, address**, and get **directions via Google Maps**
- ⚡ Fast, responsive UI
- ❌ Error handling if no gyms or invalid location
- 🖥️ Fully **responsive layout** for mobile and desktop

---

## 🌐 Live Demo

🔗 **Live URL:**  
https://resonant-melomakarona-ed90b4.netlify.app/

> This link opens the Gym Finder section of the full FitnessBuddy web app.

---

## 🖼️ Screenshots

> Place your screenshots in the `assets/screenshots/` folder.

### 📌 Gym Search by Location
![Search by location](assets/screenshots/gym-location.png)

### 🔍 Gym Search by City
![Search by city](assets/screenshots/gym-city.png)

### 📱 Responsive Mobile View
![Mobile View](assets/screenshots/gym-mobile.png)

---

## 🛠️ Tech Stack

| Area         | Technology                        |
|--------------|------------------------------------|
| Markup       | HTML5                              |
| Styling      | CSS3                               |
| Logic        | JavaScript (ES6+)                  |
| Location     | Geolocation API                    |
| Map Data     | OpenStreetMap Overpass API         |
| Geocoding    | Nominatim API                      |
| Hosting      | Netlify                            |

---

## 📁 Folder/File Structure (Gym Feature)

/FitnessBuddy_App
├── /gym.html
├── /css/
│ └── gym.css
├── /js/
│ └── gym.js
├── /assets/screenshots/
│ ├── gym-location.png
│ ├── gym-city.png
│ └── gym-mobile.png



---

## 🚀 How to Use

1. Clone the repo:
   ```bash
   git clone https://github.com/shubhamDivyan/FitnessBuddy_App.git
   cd FitnessBuddy_App
2. Open gym.html in your browser or use VS Code Live Server.

3. Search gyms by entering a location or by using the "Find Gyms Near Me" button.

🧩 APIs Used

    🗺️ OpenStreetMap Overpass API – for gym data

    🌍 Nominatim – for converting city/postal name to coordinates

    📌 Geolocation API – for user's current location


📌 Future Improvements

Add gym rating and distance info

Integrate map preview with Leaflet.js or Google Maps

Filter gyms by type (e.g., CrossFit, Yoga, etc.)

    Save favorite gyms in localStorage or Firebase

🙌 Author

Built with 💪 and ☕ by Shubham Divyanshu

📄 License

This project is licensed under the MIT License


---

### ✅ What to Do Next:

1. Save the content above in a file named `README.md` in your GitHub repo.
2. Push it to your repo:
```bash
git add README.md
git commit -m "Add complete README for Gym Finder"
git push origin main
