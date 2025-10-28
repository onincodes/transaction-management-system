# Transaction Management System

## 📌 Overview

A simple transaction management system consisting of:

- **Backend:** Ruby on Rails API using CSV files for data storage (no database)  
- **Frontend:** Next.js + TypeScript + Tailwind CSS
- **HTTP Requests:** Axios is used in the frontend to communicate with the API

### ✅ Functionality

1. Display all transactions retrieved from the API in a table.  
2. Add a new transaction via a modal form, which:  
   - Submits data to the backend API  
   - Randomly assigns a status: **Pending**, **Settled**, or **Failed**  
   - Updates the table to show the new transaction  

---

## ✅ Prerequisites

Before running the project, make sure the following are installed on your system.<br>
These are the versions used during development (using the same or newer versions is recommended):

### **Backend**
- Ruby **3.2.2** or later
- Rails **7.2.2.1** or later
- *(No database required; transactions are stored in a CSV file using the Ruby CSV library)*

### **Frontend**
- Node.js **v24.1.0** or later
- npm **v11.3.0** or later  
- Next.js (with TypeScript & Tailwind CSS)
- Axios (for API requests)

### **Other**
- Git (for cloning the repository)

---

## ✅ Installation

### **Backend Setup**

```bash
# 1. Clone the repository
git clone https://github.com/onincodes/transaction-management-system.git

# 2. Navigate to the backend folder
cd transaction_system_backend

# 3. Install Ruby gems
bundle install
```

> 💡 *This installs all required Ruby gems listed in the `Gemfile`.*

No database setup needed — the backend reads/writes directly to `data/transactions.csv`.

---

### **Frontend Setup**

```bash
# 1. Navigate to the frontend folder
cd transaction_system_frontend

# 2. Install dependencies
npm install
```

> 💡 *This installs React, Next.js, TypeScript, Tailwind CSS, Axios, and all other dependencies from `package.json`.*

---

## ✅ Configuration

### **Backend**
- No database is used.  
- Transactions are stored in `data/transactions.csv`.  
- Ensure this file exists and is writable by the Rails server.

### **Frontend**
- No additional environment variables required.  
- The frontend fetches from the backend at:  
  **http://localhost:3001**

---

## ✅ Running the Application

### **Backend (Rails API)**

```bash
cd transaction_system_backend
rails s -p 3001
```

Backend will run at: **http://localhost:3001**

---

### **Frontend (Next.js)**

```bash
cd transaction_system_frontend
npm run dev
```

Frontend will run at: **http://localhost:3000**

---

## ✅ API Documentation

### **📍 Get all transactions**

- **Endpoint:** `GET /transactions`  
- **Request Body:** None  
- **Response Example:**

```json
[
   {
     "transactionDate": "2025-03-01",
     "accountNumber": "7289-3445-1121",
     "accountHolderName": "Juan Dela Cruz",
     "amount": 181.08,
     "status": "Settled"
   },
   {
     "transactionDate": "2025-03-02",
     "accountNumber": "1122-3456-7890",
     "accountHolderName": "John Cruz",
     "amount": 75.50,
     "status": "Pending"
   }
]
```

---

### **📍 Add a transaction**

- **Endpoint:** `POST /transactions`  
- **Request Example:**

```json
{
  "transaction_date": "2025-10-24",
  "account_number": "4646-8282-1919",
  "account_holder_name": "Juan Dela Cruz",
  "amount": 110.24
}
```

- **Response Example:**

```json
{
  "transactionDate": "2025-10-24",
  "accountNumber": "4646-8282-1919",
  "accountHolderName": "Juan Dela Cruz",
  "amount": "110.24",
  "status": "Failed"
}
```

### **Notes**
- The **Status** field is randomly assigned as *Pending*, *Settled*, or *Failed*.  
- All transactions are stored in `data/transactions.csv`.

---

## ✅ Testing

1. Start both backend & frontend (see **Running the Application**).  
2. Visit **http://localhost:3000** in your browser.  
3. Confirm:
   - All transactions are displayed in the table.  
   - Clicking “Add Transaction” opens a modal form.  
4. When submitting the form:
   - Data is sent to the backend API.  
   - A random status is assigned.  
   - Table updates with the new transaction.  
5. Check validation:
   - Form shows errors if required fields are empty or invalid.  
6. (Optional) Open `data/transactions.csv` to verify that data was saved correctly.

---

