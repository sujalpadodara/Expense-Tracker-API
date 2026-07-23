<<<<<<< HEAD
# Expense Tracker API 
=======
# Expense Tracker API 💰
>>>>>>> fad2d4b (Add README and environment example)

A secure REST API for managing personal expenses built using Node.js, Express.js, MongoDB, and JWT Authentication.

---

## Features

- User Signup
- User Login
- JWT Authentication
- Protected Routes
- Create Expense
- Get Expenses
- Update Expense
- Delete Expense
- Search Expenses
- Category Filter
- Date Filter
- Pagination
- Total Expense Summary
- Category-wise Summary
- Monthly Expense Summary

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- dotenv

---

## Project Structure

```
Expense-Tracker-API
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── .gitignore
├── package.json
├── server.js
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/sujalpadodara/Expense-Tracker-API.git
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the server

```bash
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | /auth/signup |
| POST | /auth/login |

### Expenses

| Method | Endpoint |
|---------|----------|
| POST | /expenses |
| GET | /expenses |
| GET | /expenses/:id |
| PUT | /expenses/:id |
| DELETE | /expenses/:id |

### Summary

| Method | Endpoint |
|---------|----------|
| GET | /expenses/summary/total |
| GET | /expenses/summary/category |
| GET | /expenses/summary/monthly |

---

## Future Improvements

- Budget Management
- Expense Charts
- Email Notifications
- Export to PDF
- Frontend Dashboard

---

## Author

**Sujal Padodara**
