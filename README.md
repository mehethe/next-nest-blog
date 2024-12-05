# Next.js Frontend and Nest.js Backend Sample Project

A sample, minimal blogging platform showcasing best practices, project organization, and modern web development.

**Live Demo:** https://nn-blog-alpha.vercel.app

**Login Information**

#### Admin:

- Email: `admin@email.com`
- Password: `Abc123`

#### User:

- Email: `user1@email.com`
- Password: `Abc123`

## Features

- Authentication and authorization with role-based access control (e.g., Admin, Author).
- Blog management, including creation, updating, and deletion.
- Sorting, filtering, and pagination for seamless browsing.
- Modern UI and UX for both frontend and admin dashboard.

## Tech Stack

- **Frontend**: Next.js, NextAuth.js, React Hook Form, Zod, Zustand, Tailwind CSS, Shadcn/ui.
- **Backend**: Node.js, Nest.js, Prisma, PostgreSQL, jsonwebtoken.
- **Additional**: TypeScript, Cloudinary

## Project setup

This project is divided into separate frontend and backend applications. To run the project locally, you need to navigate to each folder, install dependencies, and configure the environment variables.

**Environment Variables:** Ensure to copy and configure the environment variables from the provided `env.example` files into `.env` files for both the frontend and backend projects.

### Frontend Setup

```bash
# Navigate to the frontend directory
$ cd frontend

# Install dependencies
$ npm install

# Start the development server
$ npm run dev
```

### Backend Setup

```bash
# Navigate to the backend directory
$ cd backend

# Install dependencies
$ npm install

# Start the development server
$ npm run start:dev
```

---

## Preview

![Home](https://res.cloudinary.com/dsupg9oa8/image/upload/v1733390155/samples/Create-Next-App_bwsopc.png)
![Admin Dashboard](https://res.cloudinary.com/dsupg9oa8/image/upload/v1733390149/samples/Create-Next-App_1_aqovv8.png)
![Admin privilege](https://res.cloudinary.com/dsupg9oa8/image/upload/v1733390148/samples/Create-Next-App_2_tbq4ba.png)
![Author privilege](https://res.cloudinary.com/dsupg9oa8/image/upload/v1733390150/samples/Create-Next-App_3_uqbgfx.png)
