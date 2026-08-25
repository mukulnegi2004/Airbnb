<div align="center">

# 🌍 Wanderlust

### Discover. List. Explore. Share.

A full-stack **travel listing platform** where users can explore destinations, list their own stays, upload stunning photos, and share honest reviews — built in the spirit of Airbnb.

[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-Server-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![EJS](https://img.shields.io/badge/EJS-Templating-B4CA65?style=flat-square&logo=ejs&logoColor=black)](https://ejs.co/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-UI-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Hosting-3448C5?style=flat-square&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Passport.js](https://img.shields.io/badge/Passport.js-Auth-34E27A?style=flat-square&logo=passport&logoColor=white)](https://www.passportjs.org/)
[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=flat-square&logo=render&logoColor=white)](https://wanderlust-8y09.onrender.com)

**[🚀 Live Demo](https://wanderlust-8y09.onrender.com)**

</div>

---

## 📖 About

**Wanderlust** is a full-stack travel listing web app that lets users explore destinations around the world, publish their own listings with images and locations, and leave reviews for places they've visited. It's a hands-on demonstration of building a complete **CRUD + Auth + File Upload** application with **Node.js, Express, MongoDB, and EJS** — from database design to deployment.

---

## ✨ Features

| Category | What it does |
|---|---|
| 🔐 **Authentication** | Secure signup, login, and logout using Passport.js (Local Strategy) |
| 🏡 **Listings CRUD** | Create, view, edit, and delete travel listings |
| 🖼️ **Image Uploads** | Listing photos hosted on Cloudinary via Multer |
| ⭐ **Reviews** | Add and delete reviews with ratings on any listing |
| 🛡️ **Authorization** | Only listing owners can edit/delete their own listings; only review authors can delete their reviews |
| 💬 **Flash Messages** | Instant success/error feedback after every action |
| ✅ **Validation** | Server-side request validation using Joi schemas |
| 🍪 **Session Management** | Persistent sessions stored in MongoDB via `connect-mongo` |
| 🗺️ **Map Support** | Location data stored using GeoJSON for future map integration |
| 📱 **Responsive UI** | Clean, mobile-friendly design with Bootstrap |

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose

**Authentication**
- Passport.js
- Passport Local Strategy
- Passport-Local-Mongoose

</td>
<td valign="top" width="50%">

**Frontend**
- EJS (Embedded JavaScript templates)
- Bootstrap
- CSS

**File Upload & Storage**
- Multer
- Cloudinary
- Multer-Storage-Cloudinary

</td>
</tr>
</table>

**Other Tools:** Joi (validation) · Express Session · Connect Flash · Connect Mongo

---

## 📂 Project Structure

```
wanderlust/
│
├── models/            # Mongoose schemas
│   ├── listing.js     # Listing schema
│   ├── review.js      # Review schema
│   └── user.js        # User schema
│
├── routes/            # Express route definitions
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── controllers/       # Route handler logic
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/              # EJS templates (pages, partials, layouts)
│
├── public/             # Static assets (CSS, client-side JS)
│
├── utils/               # Helper utilities (e.g. wrapAsync, ExpressError)
│
├── middleware.js       # Custom middleware (auth checks, ownership checks)
├── schema.js           # Joi validation schemas
├── cloudConfig.js      # Cloudinary configuration
└── app.js              # Main server entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- A Cloudinary account (for image uploads)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/mukulnegi2004/wanderlust.git
cd wanderlust
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file in the root directory:
```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_map_api_token
```

**4. Run the app**
```bash
node app.js
```
or, if using nodemon:
```bash
nodemon app.js
```

The app will be running at `http://localhost:8080` 🎉

---

## 🖼️ How It Works

```
User signs up / logs in (Passport.js)
            │
            ▼
   Browses & creates listings
            │
            ▼
  Uploads listing image → Cloudinary
            │
            ▼
   Listing saved in MongoDB (with GeoJSON location)
            │
            ▼
Other users view listing → leave a review
            │
            ▼
Only the owner can edit/delete their listing
Only the review author can delete their review
```

---

## 🌐 Deployment

This project is live and deployed on **Render**.

**🔗 Live Demo:** [wanderlust-8y09.onrender.com](https://wanderlust-8y09.onrender.com)

---

## 🗺️ Roadmap

- [ ] Interactive map view for listings
- [ ] Search & filter by location, price, category
- [ ] Wishlist / save-for-later feature
- [ ] Booking / availability calendar
- [ ] Star-rating aggregation on listings

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

```bash
# Fork the repo, then:
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
# Open a Pull Request 🚀
```

---

## 📬 Connect with Me

<p>
<a href="https://github.com/mukulnegi2004"><img src="https://img.shields.io/badge/GitHub-mukulnegi2004-181717?style=flat-square&logo=github&logoColor=white" /></a>
<a href="https://www.linkedin.com/in/mukul-negi-431039378/"><img src="https://img.shields.io/badge/LinkedIn-Mukul%20Negi-0A66C2?style=flat-square&logo=linkedin&logoColor=white" /></a>
<a href="mailto:mannunegi126@gmail.com"><img src="https://img.shields.io/badge/Email-mannunegi126%40gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white" /></a>
</p>

---

<div align="center">

### ⭐ If you like this project, give it a star — it helps a lot!

Made with ❤️ and lots of ☕ by [Mukul Negi](https://github.com/mukulnegi2004)

</div>
