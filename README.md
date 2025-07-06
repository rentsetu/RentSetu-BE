---
# RentSetu Backend

> **A complete Node.js + Express backend for managing property listings, user authentication, document uploads, and admin control.**
> Built with ❤️ by the **RentSetu Development Team**
---

###  Tech Stack

* **Backend**: Node.js, Express
* **Database**: MongoDB (via Mongoose)
* **Auth**: JWT-based authentication
* **Upload**: Multer (Cloudinary integration)
* **Security**: Rate limiting, secure headers
* **Mailing**: Nodemailer (Gmail SMTP)
* **Validation**: Custom middleware
* **Deployment-Ready**: Compatible with Render, Railway, etc.

---

## 📂 Folder Structure

```
rentsetu-backend/
├── controllers/
│   └── authController.js
│   └── propertyController.js
│   └── userController.js
├── middlewares/
│   └── auth.js
│   └── isAdmin.js
│   └── rateLimiter.js
│   └── upload.js
├── models/
│   └── User.js
│   └── Property.js
├── routes/
│   └── authRoutes.js
│   └── propertyRoutes.js
│   └── userRoutes.js
├── utils/
│   └── cloudinary.js
│   └── mailer.js
├── app.js
├── server.js
└── .env
```

---

## ⚙️ Setup Instructions

1. **Clone the repo**

   ```bash
   git clone https://github.com/rentsetu/rentsetu-backend.git
   cd rentsetu-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   EMAIL=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ADMIN_EMAIL=admin@example.com
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the server**

   ```bash
   npm run dev
   ```

---

##  API Routes

###  Auth Routes – `/api/auth`

| Method | Endpoint    | Description              |
| ------ | ----------- | ------------------------ |
| POST   | `/register` | Register a new user      |
| POST   | `/login`    | Login with credentials   |
| POST   | `/refresh`  | Get new access token     |
| GET    | `/me`       | Get current user profile |

---

### Property Routes – `/api/properties`

| Method | Endpoint  | Description                     |
| ------ | --------- | ------------------------------- |
| POST   | `/create` | Create property (requires auth) |
| GET    | `/`       | Get all properties              |
| GET    | `/:id`    | Get property by ID              |
| DELETE | `/:id`    | Delete property (admin only)    |

---

### User Routes – `/api/users`

| Method | Endpoint         | Description                        |
| ------ | ---------------- | ---------------------------------- |
| GET    | `/profile`       | Get user profile (auth)            |
| PUT    | `/update`        | Update user profile                |
| GET    | `/favorites`     | Get favorite properties            |
| POST   | `/favorites/:id` | Add/remove property from favorites |

---

### 🛡 Admin Routes – `/api/admin`

| Method | Endpoint        | Description                      |
| ------ | --------------- | -------------------------------- |
| GET    | `/dashboard`    | Admin overview                   |
| PUT    | `/approve/:id`  | Approve a property listing       |
| DELETE | `/property/:id` | Remove any property (admin only) |

---

##  Upload Fields (via `/api/properties/create`)

Supports `multipart/form-data` with these fields:

* `identityProof` – (pdf/jpg)
* `ownershipProof` – (pdf/jpg)
* `floorPlan` – (optional)
* `propertyPhotos[]` – up to 10 images

All uploads go directly to **Cloudinary** and store URLs in MongoDB.

---

## ✉ Email Integration

* Admin receives a summary email of every new listing
* User receives a "Thank You" confirmation email
* Emails sent via **Gmail SMTP (Nodemailer)**

---

## 🛡 Security Features

* JWT authentication with refresh token support
* Admin-only routes via `isAdmin` middleware
* Multer validation for MIME types + file sizes
* Rate limiting via `express-rate-limit`

---

##  Future Enhancements

* OTP email verification
* Tenant-buyer dashboard
* Role-based access (superadmin, moderator)
* Full Swagger / Postman documentation

---

##  Deployment Tips

* Use **Render** or **Railway** for full Express/Mongo backend
* Vercel not recommended (no persistent server, no disk access)
* Use `.env.production` for secret separation

---

##  Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## 🧾 License

MIT © 2025

---

###  Maintained By

Made with ❤️ by the **RentSetu Development Team**
Contact: [rentsetutech@gmail.com](mailto:rentsetu.tech@gmail.com)

---


