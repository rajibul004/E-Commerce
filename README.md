
```markdown
# 🛒 E-Commerce Full Stack Application

A full-featured e-commerce application built with:

- 🧠 **Backend:** Java + Spring Boot (`/backend`)
- 🎨 **Frontend:** React + Vite (`/frontend`)

---

## 📁 Project Structure

```

E-Commerce/
├── backend/           # Spring Boot REST API
├── frontend/          # React + Vite frontend
└── README.md

````

---

## 🚀 Features

### ✅ Backend (Spring Boot)
- User Authentication & Authorization (JWT)
- Product Management (CRUD)
- Cart Management
- Checkout & Order Processing
- Role-based Access (Admin/User)
- RESTful API design
- PostgreSQL or MySQL DB integration

### ✅ Frontend (React + Vite)
- Responsive UI with TailwindCSS
- User login & registration
- Product listings and filtering
- Shopping cart with quantity control
- Checkout and payment UI
- Admin dashboard (Product/Order management)
- API integration with Axios

---

## 🧪 Technologies Used

### Backend:
- Java 17+
- Spring Boot
- Spring Security (JWT)
- JPA + Hibernate
- PostgreSQL / MySQL
- Maven

### Frontend:
- React + Vite
- React Router
- Redux (or Context API)
- Tailwind CSS
- Axios

---

## 🛠️ How to Run Locally

### 🔧 Backend Setup (`/backend`)
```bash
cd backend
# Configure DB in src/main/resources/application.properties
./mvnw spring-boot:run
````

Make sure your PostgreSQL or MySQL DB is running and matches the config.

---

### 💻 Frontend Setup (`/frontend`)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (`application.properties`)

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=your_db_user
spring.datasource.password=your_db_pass
jwt.secret=your_secret_key
```

### Frontend (`.env`)

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

---

## 📦 API Endpoints

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| POST   | `/auth/register` | Register new user          |
| POST   | `/auth/login`    | Login and get JWT          |
| GET    | `/products`      | List all products          |
| POST   | `/products`      | Add product (admin)        |
| GET    | `/cart`          | Get user cart              |
| POST   | `/checkout`      | Checkout cart              |
| ...    |                  | More in Postman collection |

