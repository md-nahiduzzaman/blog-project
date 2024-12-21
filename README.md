# Blog Project

## Overview

This is the backend API for a blog platform where users can create, update, delete, and view blogs. It includes secure authentication, role-based access control, and the ability to perform CRUD operations on blogs. Admin users have extra privileges to manage users and their blogs.

**Live URL:** [https://blog-project-delta-pink.vercel.app/](https://blog-project-delta-pink.vercel.app/)

## Features

- **User Registration & Login**: Allows users to register and log in with JWT-based authentication.
- **Role-based Access Control**: Differentiates between Admin and User roles. Admins have special privileges like deleting blogs and blocking users.
- **Blog Management**:
  - **Create Blog**: Authenticated users can create blogs with a title and content.
  - **Update Blog**: Authenticated users can update their own blogs.
  - **Delete Blog**: Authenticated users can delete their own blogs. Admin users can delete any blog.
- **Public Blog API**: Allows users to fetch blogs with search, sort, and filter functionality.
- **Admin Actions**: Admins can block users and delete any blog.
- **Error Handling**: A structured error response format for easy debugging and user-friendly messages.

## Technologies Used

- **TypeScript**: For type-safe development.
- **Node.js**: The JavaScript runtime for the backend server.
- **Express.js**: The web framework to build the API.
- **MongoDB**: A NoSQL database to store user and blog data.
- **Mongoose**: ODM for MongoDB to manage the data models and schema.
- **JWT**: For authentication via JSON Web Tokens.

## Getting Started

### Prerequisites

Before you start, ensure you have the following installed:

- Node.js and npm
- MongoDB running locally or use a cloud service like MongoDB Atlas.

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/md-nahiduzzaman/blog-project.git
   ```

2. Navigate to the project directory:

   ```
   cd blog-project
   ```

3. Install the required dependencies:

   ```
   npm install
   ```

4. Create a `.env` file at the root of the project and configure the following:

   ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    PORT=5000
    NODE_ENV=development
    BCRYPT_SALT_ROUNDS=10
    JWT_ACCESS_SECRET=your_jwt_access_secret
    JWT_ACCESS_EXPIRES_IN=365d
   ```

   Replace `your_mongodb_connection_string` with your actual MongoDB URI, and `your_secret_key` with a strong secret key for JWT signing.

### Running the Application

To start the backend server, run:

```
npm run dev
```

By default, the server will run on `http://localhost:5000`.

### Testing

To test the API, use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

### Admin Login Credentials

- **Email:** admin@example.com
- **Password:** 12345

### API Documentation

#### Authentication API

- **Register User**: `POST /api/auth/register`
- **Login User**: `POST /api/auth/login`

#### Blog Management API

- **Create Blog**: `POST /api/blogs`
- **Update Blog**: `PATCH /api/blogs/:id`
- **Delete Blog**: `DELETE /api/blogs/:id`
- **Get All Blogs**: `GET /api/blogs`

#### Admin Actions

- **Block User**: `PATCH /api/admin/users/:userId/block`
- **Delete Blog**: `DELETE /api/admin/blogs/:id`

#### Query Parameters for Blog API

- **search**: Search blogs by title or content.
- **sortBy**: Sort blogs by fields like `createdAt`.
- **sortOrder**: Defines the order of sorting (`asc` or `desc`).
- **filter**: Filter blogs by author ID.

Example request to search for "technology" blogs:

```sql
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=authorId
```

---

### Acknowledgements

- **Express.js**: A web framework for building APIs.
- **MongoDB**: A NoSQL database that provides flexible schema management.
- **Mongoose**: ODM for MongoDB to manage the data models and schema.
