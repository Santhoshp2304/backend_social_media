# social media backend

# 📱 Social Media Backend

A Node.js + Express backend for a social media platform. This backend provides RESTful APIs to handle user authentication, posts, likes, comments, friend requests, and more.

## 🚀 Features

- User registration and login (JWT-based authentication)
- Create a posts
- Like and comment on posts
- Follow and unfollow users
- Friend request management
- Change profile visiblity
- Secure password hashing with bcrypt
- Token-based authentication with JWT

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (DATABASE) with **Mongoose** (ORM)
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment variable management
- **Cors** for cross-origin requests
- **Multer / Cloudinary**  for images or videos uploads

## 📁 Folder Structure

backend_social_media/
│
├── config/ # Configuration files (e.g., Cloudinary connection)
├── middleware/ # Auth
├── models/ # Mongoose data models
├── routes/ # API routes
├── .env # Environment variables
├── package-lock.json
├── package.json
└── server.js # Entry point


## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Santhoshp2304/backend_social_media.git
   cd backend_social_media

2. **Install dependencies**

   ```bash
   npm install express cors mongoose jsonwebtoken bcryptjs multer cloudinary dotenv

3. **Create .env file**

    PORT = 3000
    MONGODB = your DB connection
    JWT_SECRET_KEY = your jwt secret key
    CLOUDINARY_CLOUD_NAME = your cloudinary cloud name
    CLOUDINARY_API_KEY = your cloudinary api key
    CLOUDINARY_API_SECRET = your cloudinary api secret

4. **Start the server**

   ```bash
   npm run start:dev

   The server should now be running at http://localhost:3000
   

📫 API Endpoints

Method	      Endpoint	                             Description

POST	     /user/register	                   Register a new user and get a token
POST	     /user/login	                     Log in and get a token
POST	     /user/:id/friend-request          Give a friend request
POST       /user/:id/accept-request	         Accept a friend request
POST	     /user/:id/follow                  Follow a user
POST	     /user/:id/unfollow                Unfollow a user
PUT	       /user/change-visiblity	           Change profile visiblity to public or private
POST	     /post/create-post                 Create a new post
POST	     /post/:id/like                    Like  a post
POST       /post/:id/comment                 Add a comment to a post

📌 More endpoints available in the /routes folder.

🧪 Testing
You can use tools like Postman to test the REST API endpoints.
   

   

   

   
