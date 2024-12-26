# 🌟 Blog App Website

Welcome to the **Blog App Website**, a modern, feature-rich blogging platform built using the **MERN stack** (MongoDB, Express, React, Node.js) and **Next.js**. This app allows users to easily create, read, update, and delete blog posts. It features a smooth and interactive UI with seamless performance thanks to server-side rendering (SSR) and modern web technologies.

## 🚀 Features

### Key Features of the Blog App:

- **User Authentication**:  
  Users can register, log in, and manage their sessions securely with **JWT** and **bcrypt** for hashing passwords.
  
- **CRUD Blog Functionality**:  
  Users can create, read, update, and delete blogs with full control over their posts. The admin has more capabilities to manage content.

- **Responsive Design**:  
  The app is built using **Tailwind CSS** for styling, ensuring a responsive and smooth user experience across all screen sizes.

- **Image Uploading**:  
  Users can upload images associated with their blogs, leveraging **Cloudinary** for cloud storage and optimized image hosting.

- **Comment System**:  
  A dynamic comment system allows users to comment on blogs, enabling interaction with the content.

- **Rich Text Editor**:  
  Blogs can be written with rich text formatting such as bold, italics, headings, and bullet points using a built-in rich text editor.

- **Search & Filter**:  
  Users can search and filter blogs by keywords or tags for easier navigation.

- **SEO & SSR (Server-Side Rendering)**:  
  With **Next.js**, the app is optimized for **SEO** using SSR, which boosts performance and makes blogs more accessible via search engines.

- **Pagination**:  
  Pagination is implemented to divide large lists of blogs into pages, making it easier to browse content.

## 🔧 Tech Stack

### Frontend:
- **Next.js**: Framework for server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces in a component-based structure.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: A promise-based HTTP client for making API requests to the backend.

### Backend:
- **Node.js**: JavaScript runtime for building scalable backend applications.
- **Express.js**: A minimal web application framework for Node.js to handle routes and API endpoints.
- **MongoDB**: A NoSQL database to store user and blog data.
- **Mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment.

### Authentication & Security:
- **JWT (JSON Web Tokens)**: For securing APIs and handling user authentication.
- **bcrypt**: For securely hashing passwords during user registration and login.

### Additional Tools:
- **Cloudinary**: A cloud-based image storage and CDN service for managing image uploads.
- **dotenv**: Loads environment variables from a `.env` file to keep configuration secure and separate from the code.

## ⚙️ Installation

### Prerequisites:
- Node.js (v16 or later)
- MongoDB Atlas (or local MongoDB instance)
- Cloudinary account (optional, for image uploads)