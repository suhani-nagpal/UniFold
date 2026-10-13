# UniFold — Modern Campus OS 🎓

A sleek, responsive, and modern college campus portal built with **React** and **Vite**. UniFold centralizes campus life by providing easy access to study resources, previous year question papers (PYQs), timetables, society directories, and upcoming campus events.

---

## ✨ Features

- **🌓 Dual Theme Experience**:
  - **Light Mode**: Clean, warm editorial minimalist campus design.
  - **Dark Mode (Obsidian Emerald)**: High-contrast, deep dark UI with glowing emerald accents and glassmorphism.
  - Automatic persistence using `localStorage` and system color scheme preference.
- **🏷️ Modern Brand Identity**: Scalable isometric folded vector logo mark with custom branding support.
- **📚 Academic Repository**: Filter and search through courses, lecture notes, formula sheets, and lab materials.
- **❤️ Bookmarking System**: Save high-priority course materials with instant bookmark toggling.
- **📅 Campus Events Calendar**: Track upcoming workshops, hackathons, and cultural fests with one-click RSVP.
- **👥 Student Societies Portal**: Discover technical clubs, creative chapters, and join active campus communities.
- **🔒 Portal Sign-In**: College email authentication form and mock Google Campus SSO.
- **📱 Fully Responsive**: Optimized for desktops, tablets, and mobile screens with mobile navigation drawer.

---

## 🛠️ Tech Stack

- **Frontend**: [React](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: Modern CSS3 (Custom CSS variables, Flexbox/Grid, Glassmorphism, animations)
- **Typography**: DM Sans, Manrope
- **Version Control**: Git & GitHub

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/suhani-nagpal/unifold-app.git
   cd unifold-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

---

## 📁 Project Structure

```text
unifold-app/
├── public/              # Favicon and static assets
├── src/
│   ├── assets/          # Images and vector graphics
│   ├── App.css          # Design system, CSS variables & theme tokens
│   ├── App.jsx          # Main application component & views
│   ├── index.css        # Clean CSS reset & typography imports
│   └── main.jsx         # React application entry point
├── package.json         # Dependencies & scripts
└── vite.config.js       # Vite configuration
```

---

## 🤝 Collaboration & Backend Integration

This frontend is designed to easily connect with backend REST APIs:
- `POST /api/auth/login` — Student authentication
- `GET /api/courses` — Course material & PYQs feed
- `GET /api/events` — Upcoming campus event schedule
- `POST /api/events/:id/rsvp` — Event RSVP tracking

---

## 👩‍💻 Authors

- **Frontend**: Suhani Nagpal ([@suhani-nagpal](https://github.com/suhani-nagpal))
- **Backend**: *Collaborator*

---

*Made with ❤️ for campus life.*
