# Products treker

**Products treker** – is a simple web application designed to help manage and track available inventory in a warehouse.

---

## 📂 Project Structure

```text
products-delivery-treker/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── products.js
│   └── db.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── stories/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── .storybook/
│   ├── docs/
│   └── vite.config.ts
├── README.md
├── package.json
└── privacy_policy.md
```

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/naazarchiik/products-delivery-tracker.git
cd products-delivery-tracker
```

### 2. Start the backend

```bash
cd backend
npm install
npm start
```

> The server will run at **[http://localhost:3000](http://localhost:3000)**

### 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

> The frontend will run at **[http://localhost:5173](http://localhost:5173)**

---

## 🔧 Technologies

- **Backend**

  - Node.js + Express
  - REST API (CRUD)

- **Frontend**

  - React 18 + TypeScript
  - Vite
  - CSS Modules

- **Other**

  - Git for version control

---

## 🌐 API Endpoints

| Method | URL                 | Description            |
| :----: | ------------------- | ---------------------- |
|  GET   | `/api/products`     | Retrieve all products  |
|  POST  | `/api/products`     | Add a new product      |
| PATCH  | `/api/products/:id` | Update a product       |
| DELETE | `/api/products/:id` | Delete a product       |

## ⚙️ Available Commands

Run these inside the `frontend/` directory:

```bash
cd frontend
```

### Development

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Start the development server  |
| `npm run build`   | Build the production bundle   |
| `npm run lint`    | Run ESLint                    |
| `npm run preview` | Preview the built app         |

### Storybook

| Command                   | Description            |
| ------------------------- | ---------------------- |
| `npm run storybook`       | Launch Storybook UI    |
| `npm run build-storybook` | Build static Storybook |

### Code Documentation

| Command              | Description                             |
| -------------------- | --------------------------------------- |
| `npm run docs`       | Generate code documentation via TypeDoc |
| `npm run docs:serve` | View generated documentation            |

### API Documentation (Swagger)

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `npm run swagger` | Start Swagger UI for API docs   |

### Sample `POST /api/products` request

```json
{
	"name": "IPad mini",
	"category": "Tablet",
	"condition": "Good"
}
```

Run these inside the `backend/` directory:

```bash
cd frontend
```

### Code Documentation

| Command              | Description                             |
| -------------------- | --------------------------------------- |
| `npm run docs`       | Generate code documentation via TypeDoc |
| `npm run docs:serve` | View generated documentation            |

---

## ⚙️ Configuration

### Backend

- Port: **3000**
- CORS configured for **[http://localhost:5173](http://localhost:5173)**
- "Database": in-memory array in `db.js`

### Frontend

- Port: **5173**
- Proxy for API in `vite.config.ts`:

```ts
export default defineConfig({
	server: {
		proxy: {
			'/api': 'http://localhost:3000',
		},
	},
})
```

---

## 📜 License

This project is licensed under the **MIT License**.
See the `LICENSE` file for more details..

---

## 👨‍💼 Author

- **Nazarii Kryvolap**

---

© 2025 Products Delivery Tracker
