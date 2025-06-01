# QUADRA Blog

A dynamic web application for reading and managing chapters of the "QUADRA" story, built with Next.js for the frontend and Node.js with Express for the backend. Features a public chapter list, individual chapter pages, a character gallery, and an admin panel for chapter management, styled with Tailwind CSS.

## Features
- **Public Pages**:
  - Home page with a list of chapters and a character gallery.
  - Dynamic chapter pages accessible via `/chapters/:id`.
- **Admin Panel**:
  - Login page at `/admin/login` for admin access.
  - Chapter management at `/admin/chapters` to add new chapters.
- **Backend**: Node.js with Express, MongoDB for data storage, and JWT-based authentication.
- **Styling**: Responsive design using Tailwind CSS and Framer Motion for animations.

## Tech Stack
- **Frontend**: Next.js (JavaScript), Tailwind CSS, Framer Motion, React Social Icons
- **Backend**: Node.js, Express, Mongoose, MongoDB
- **Authentication**: bcryptjs for password hashing, jsonwebtoken for JWT

## Folder Structure
```
quadra-blog/
├── backend/                    # Node.js backend
│   ├── models/                 # Mongoose models
│   │   ├── Chapter.js          # Chapter schema
│   │   └── User.js            # Admin user schema
│   ├── routes/                 # API routes
│   │   ├── auth.js            # Admin login route
│   │   └── chapters.js        # Chapter CRUD routes
│   ├── .env                   # Environment variables
│   └── server.js              # Express server
├── src/                        # Next.js source
│   ├── components/             # Reusable components
│   │   ├── CharacterGallery.js # Character gallery component
│   │   ├── Chapter.js          # Single chapter display
│   │   ├── ChapterList.js      # List of chapters
│   │   ├── CustomImage.js      # Custom image component
│   │   ├── MyFooter.js         # Footer component
│   │   └── MyNavbar.js         # Navigation bar
│   ├── pages/                  # Next.js pages
│   │   ├── _document.js        # Custom document for Tailwind
│   │   ├── index.js            # Home page (chapter list)
│   │   ├── admin/login.js      # Admin login page
│   │   ├── admin/chapters.js   # Admin chapter management
│   │   └── chapters/[id].js    # Dynamic chapter page
│   ├── public/                 # Static assets
│   │   ├── images/             # Character images
│   │   │   ├── kozo.png        # Placeholder image
│   │   │   ├── shiron.png      # Placeholder image
│   │   │   └── nichuki.png     # Placeholder image
│   ├── styles/                 # CSS styles
│   │   └── globals.css         # Global Tailwind styles
│   └── package.json            # Frontend dependencies
├── package.json                # Root project file
└── tailwind.config.js          # Tailwind configuration
```

## Prerequisites
- Node.js (v18 recommended) and npm
- Git
- MongoDB (local or Atlas)
- Character images (`kozo.png`, `shiron.png`, `nichuki.png`)

## Setup Instructions

### 1. Clone the Project
```bash
git clone <your-repo-url>
cd quadra-blog
```

### 2. Frontend Setup
- Navigate to the root directory:
```bash
npm install
```
- Install dependencies: Next.js, Framer Motion, React Social Icons.
- Place character images in `src/public/images/`.

### 3. Backend Setup
- Navigate to the backend folder:
```bash
cd backend
npm install
```
- Install dependencies: Express, Mongoose, bcryptjs, jsonwebtoken, cors, dotenv.
- Create a `.env` file in `backend/`:
```
MONGODB_URI=mongodb://localhost:27017/quadra-blog
JWT_SECRET=your_jwt_secret_key_here
```
- For MongoDB Atlas, replace `MONGODB_URI` with your connection string.

### 4. Run Locally
- **Backend**:
  - Start MongoDB (local or ensure Atlas is active).
  - In `backend/`:
```bash
node server.js
```
  - Runs on `http://localhost:5000`.
- **Frontend**:
  - In the root directory:
```bash
npm run dev
```
  - Runs on `http://localhost:3000`.
- **Test**:
  - Visit `http://localhost:3000` for the home page.
  - Go to `http://localhost:3000/admin/login` for admin login (default: `username: admin`, `password: admin123`).
  - Manage chapters at `http://localhost:3000/admin/chapters`.

## Notes
- **Security**: Update admin credentials in MongoDB, secure `JWT_SECRET`, and use HTTPS in production.
- **Images**: Ensure `kozo.png`, `shiron.png`, and `nichuki.png` are in `src/public/images/`.
- **Support**: For issues, contact via the "Contact Me" link in the navbar.