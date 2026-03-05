# Wanderlust 🌍

A full-stack travel listing web application where users can explore destinations, create listings, upload images, and share reviews.

This project is inspired by platforms like Airbnb and demonstrates full-stack development using **Node.js, Express, MongoDB, and EJS**.

---

## 🚀 Features

- User Authentication (Signup / Login / Logout)
- Create, Edit, and Delete Listings
- Upload listing images using Cloudinary
- Add and Delete Reviews
- Authorization (Only owners can edit/delete listings)
- Flash Messages for user feedback
- Server-side validation using Joi
- Session management using MongoDB
- Map location support using GeoJSON
- Responsive UI using Bootstrap

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend
- EJS
- Bootstrap
- CSS

### Authentication
- Passport.js
- Passport Local Strategy
- Passport-Local-Mongoose

### File Upload & Storage
- Multer
- Cloudinary
- Multer-Storage-Cloudinary

### Other Tools
- Joi (Validation)
- Express Session
- Connect Flash
- Connect Mongo

---

## 📂 Project Structure

```
wanderlust/
│
├── models/          # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/          # Express routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── controllers/     # Route logic
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/           # EJS templates
│
├── public/          # Static files (CSS, JS)
│
├── utils/           # Helper utilities
│
├── middleware.js    # Custom middleware
├── schema.js        # Joi validation schemas
├── cloudConfig.js   # Cloudinary configuration
├── app.js           # Main server file
```

---

## 🌐 Deployment

The project deployed on platform:
- Render

---

## 🌐 Live Demo

🚀 Try the application here:  
👉 (https://airbnb-k6sz.onrender.com/listings)

---

## 📬 Connect with Me

- 💼 [GitHub](https://github.com/mukulnegi2004)
- 💬 [LinkedIn](https://www.linkedin.com/in/mukul-negi-431039378/)
- 📫 Email: mannunegi126@gmail.com

---

⭐ If you like this project, feel free to star it and give feedback!


