# QUADRA Blog

A dynamic web application for reading chapters of the "QUADRA" story, built with Next.js for the frontend and Node.js with Express for the backend. Features a public chapter list, individual chapter pages, and a character gallery, styled with Tailwind CSS and animated with Framer Motion.

## Features
- **Public Pages**:
  - Home page with a list of chapters and a character gallery.
  - Dynamic chapter pages accessible via `/chapters/:id`.
- **Backend**: Node.js with Express, MongoDB for data storage, and JWT-based authentication.
- **Styling**: Responsive design using Tailwind CSS and Framer Motion for animations.

## Tech Stack
- **Frontend**: Next.js (JavaScript), Tailwind CSS, Framer Motion, React Social Icons
- **Backend**: Node.js, Express, Mongoose, MongoDB
- **Authentication**: bcryptjs for password hashing, jsonwebtoken for JWT

## Folder Structure
```
quadra-blog/
├── .env                   # Environment variables
├── server.js              # Express server
├── models/                # Mongoose models
│   ├── Chapter.js         # Chapter schema
│   └── User.js            # User schema
├── routes/                # API routes
│   ├── auth.js            # Authentication routes
│   └── chapters.js        # Chapter CRUD routes
├── src/                   # Next.js source
│   ├── components/        # Reusable components
│   │   ├── CharacterGallery.js # Character gallery component
│   │   ├── Chapter.js          # Single chapter display
│   │   ├── ChapterList.js      # List of chapters
│   │   ├── CustomImage.js      # Custom image component
│   │   ├── MyFooter.js         # Footer component
│   │   └── MyNavbar.js         # Navigation bar
│   ├── pages/             # Next.js pages
│   │   ├── _document.js   # Custom document for Tailwind
│   │   ├── index.js       # Home page (chapter list)
│   │   ├── admin/         # Admin-related pages
│   │   │   ├── login.js   # Login page
│   │   │   └── chapters.js # Chapter management
│   │   └── chapters/      # Dynamic routes
│   │       └── [id].js    # Dynamic chapter page
│   ├── public/            # Static assets
│   │   ├── images/        # Character images
│   │   │   ├── kozo.png   # Character image
│   │   │   ├── shiron.png # Character image
│   │   │   └── nichuki.png # Character image
│   ├── styles/            # CSS styles
│   │   └── globals.css    # Global Tailwind styles
├── package.json           # Project dependencies
├── tailwind.config.js     # Tailwind configuration
├── Dockerfile             # Docker configuration
└── docker-compose.yml     # Docker Compose configuration
```

## Prerequisites
- Node.js (v18 recommended) and npm
- Git
- MongoDB Atlas (or local MongoDB)
- Character images (`kozo.png`, `shiron.png`, `nichuki.png`)

## Setup Instructions

### 1. Clone the Project
```bash
git clone https://github.com/<username>/<repo>.git
cd quadra-blog
```

### 2. Install Dependencies
- Install dependencies for the project:
```bash
npm install
```
- This installs Next.js, Express, Mongoose, bcryptjs, jsonwebtoken, cors, dotenv, Framer Motion, React Social Icons, and other dependencies listed in `package.json`.

### 3. Set Up Environment Variables
- Create a `.env` file in the project root:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/quadra?retryWrites=true&w=majority
JWT_SECRET_TOKEN=your-secure-jwt-secret-token
```
- Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB Atlas credentials.
- Generate a secure `JWT_SECRET_TOKEN` (e.g., using `openssl rand -base64 32`).
- Ensure `.env` is listed in `.gitignore` to avoid committing sensitive data.

### 4. Place Character Images
- Ensure the following images are in `src/public/images/`:
  - `kozo.png`
  - `shiron.png`
  - `nichuki.png`

### 5. Run Locally
- Start the application in development mode:
```bash
npm run dev
```
- This runs both the Next.js frontend and Express backend (via `server.js`) on `http://localhost:3000`.
- **Test**:
  - Visit `http://localhost:3000` for the home page (chapter list and character gallery).
  - Access `http://localhost:3000/chapters/<id>` for specific chapters (replace `<id>` with a valid chapter ID).

### 6. Run with Docker (Optional)
- Ensure Docker and Docker Compose are installed.
- Use the provided `docker-compose.yml` to run the app:
```bash
docker-compose up --build
```
- Access the app at `http://localhost:3000`.

## Notes
- **Security**: Secure `JWT_SECRET_TOKEN` and use HTTPS in production. Do not expose sensitive data in the GitHub repository.
- **MongoDB Atlas**: Configure network access in MongoDB Atlas to allow connections from your local machine (add your IP or allow `0.0.0.0/0` for testing).
- **Images**: Ensure character images are correctly placed in `src/public/images/` to avoid broken links in the character gallery.
- **Support**: For issues, use the "Contact Me" link in the navbar or open an issue on the GitHub repository. .