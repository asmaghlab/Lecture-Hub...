# 📚 LectureHub

**LectureHub** is a production-ready web application designed for organizations and educational teams to securely upload, manage, and access lecture materials through a clean, modern interface.

Built with scalability, maintainability, and user experience in mind, LectureHub demonstrates industry-level frontend architecture and best practices.

---

## 🔍 Overview

LectureHub enables authenticated users to upload lecture-related files, process and organize them efficiently, and view results in a dedicated dashboard. The application focuses on clarity, performance, and a professional user experience suitable for real-world company environments.

---

## 🧩 Core Features

### 🔐 Authentication & Access Control

* Secure login flow using a mock API (ready for backend integration)
* Persistent authentication using LocalStorage
* Protected routes to prevent unauthorized access
* Clean and professional logout handling

---

### 📤 File Upload System

* Drag & Drop upload experience
* Multiple file upload support
* Real-time upload progress indicators
* Client-side validation (file size & type)
* Supported file types:

  * PDF documents
  * CSV files
  * Images (JPG, PNG, GIF)
  * Videos (MP4, MOV, AVI)
  * Compressed archives (ZIP, RAR, 7Z)
* Maximum file size: **100MB per file**

---

### 📊 Lecture Management Dashboard

* Centralized dashboard displaying all uploaded lectures
* Search functionality with instant filtering
* File type filtering (PDF, Video, Image, CSV, Archive)
* Pagination for large data sets
* File actions:

  * Preview files in a modal view
  * Download files securely

---

### 🎨 UI / UX Design

* Clean, modern, company-grade interface
* Fully responsive across all screen sizes
* Smooth animations and transitions
* Toast notifications for system feedback
* Consistent color system and spacing

---

## 🏗️ Project Architecture

The project follows a scalable and maintainable frontend structure inspired by real-world production systems.

```
lecture-hub/
├── src/
│   ├── api/              # API layer (mocked, backend-ready)
│   ├── components/       # Reusable UI components
│   ├── context/          # Global state management
│   ├── pages/            # Application pages
│   ├── routes/           # Route configuration & guards
│   ├── services/         # Business & storage logic
│   ├── utils/            # Helper utilities
│   └── assets/           # Static assets
├── public/
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

* **React 19** – Frontend framework
* **Vite** – Development & build tooling
* **React Router DOM** – Client-side routing
* **Axios** – HTTP requests
* **React Dropzone** – File upload handling
* **React Hot Toast** – Notifications
* **SweetAlert2** – User alerts & confirmations
* **React Icons** – Icon system
* **CSS** – Custom modern styling

---

## 🚀 Getting Started

### Prerequisites

* Node.js v16 or higher
* npm or yarn

### Installation

```bash
git clone https://github.com/your-username/lecture-hub.git
cd lecture-hub
npm install
npm run dev
```

Open your browser at:

```
http://localhost:5173
```

---

### Production Build

```bash
npm run build
```

The optimized output will be generated in the `dist/` directory.

---

## 🔒 Security Considerations

* Route protection for authenticated users
* Token-based session handling (mocked)
* Input validation on file uploads
* Architecture ready for backend authentication & authorization

---

## 🧪 Demo Credentials

For testing purposes:

* **Email:** [test@example.com](mailto:test@example.com)
* **Password:** test123

---

## 🎯 Professional Highlights

* Clean separation of concerns
* Scalable folder structure
* Production-oriented UI decisions
* Backend-ready architecture
* Suitable as a company task, internship project, or portfolio application

---

## 🤝 Contribution

Pull requests are welcome. This project follows clean code principles and encourages clear commit messages and structured contributions.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👩‍💻 Author

Developed by **Asmaa Adel**
Frontend Developer

---

**LectureHub – Built with a real-world, production mindset.**
