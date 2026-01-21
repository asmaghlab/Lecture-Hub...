# 📚 LectureHub

A modern, professional web application for managing and organizing lecture files with a beautiful UI and seamless user experience.

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 🔐 Authentication
- Secure login system with mock API integration
- Persistent sessions using LocalStorage
- Protected routes for authenticated users
- Beautiful logout confirmation dialogs

### 📤 File Upload
- **Drag & Drop Interface** - Intuitive file upload experience
- **Multiple File Support** - Upload several files simultaneously
- **Progress Tracking** - Real-time upload progress with animated progress bars
- **File Type Support**:
  - 📄 PDF Documents
  - 📊 CSV Spreadsheets
  - 🖼️ Images (JPG, PNG, GIF)
  - 🎥 Videos (MP4, MOV, AVI)
  - 📦 Archives (ZIP, RAR, 7Z)
- **Smart Validation** - File size limits (100MB max) and duplicate detection

### 📋 Lecture Management
- **Your Lectures Dashboard** - View all uploaded files in a beautiful grid layout
- **Advanced Filtering** - Filter by file type (PDF, Video, CSV, Images, Archives)
- **Smart Search** - Real-time search with clear functionality
- **Pagination** - Navigate through large collections easily
- **File Actions**:
  - 👁️ **View** - Preview files in a professional modal dialog
  - 💾 **Download** - Download files with progress notifications

### 🎨 Design & UX
- **Modern UI** - Clean, professional interface with gradient accents
- **Fully Responsive** - Perfect experience on desktop, tablet, and mobile
- **Smooth Animations** - Delightful micro-interactions throughout
- **Toast Notifications** - Real-time feedback for all user actions
- **Baby Blue Theme** - Consistent color scheme with professional aesthetics

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lecture-hub.git
   cd lecture-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## 🏗️ Project Structure

```
lecture-hub/
├── src/
│   ├── api/              # API integration layer
│   │   └── auth.api.js
│   ├── components/       # Reusable components
│   │   ├── Avatar.jsx
│   │   ├── Navbar/
│   │   └── ProtectedRoute.jsx
│   ├── context/          # React Context providers
│   │   └── AuthContext.jsx
│   ├── pages/            # Application pages
│   │   ├── Login/
│   │   ├── Upload/
│   │   └── Results/
│   ├── routes/           # Route configuration
│   │   └── AppRoutes.jsx
│   ├── services/         # Business logic
│   │   ├── auth.service.js
│   │   └── storage.service.js
│   └── utils/            # Helper functions
│       └── helpers.js
├── public/
└── package.json
```

## 🛠️ Technologies Used

- **Frontend Framework**: React 19
- **Build Tool**: Vite 7.3
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **File Upload**: React Dropzone
- **Notifications**: React Hot Toast
- **Alerts**: SweetAlert2
- **Icons**: React Icons
- **Styling**: Custom CSS with modern design patterns

## 📱 Responsive Design

LectureHub is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🔒 Security Features

- Protected routes requiring authentication
- Secure token-based authentication
- LocalStorage encryption for sensitive data
- Input validation and sanitization

## 🎯 Key Highlights

- **Zero Configuration**: Works out of the box
- **Fast Performance**: Optimized with Vite for lightning-fast HMR
- **Modern Stack**: Built with the latest React 19 features
- **Professional UI**: World-class design inspired by modern web applications
- **User-Friendly**: Intuitive interface requiring no learning curve

## 📝 Usage

### Login
1. Navigate to the login page
2. Enter your credentials:
   - Email: `test@example.com`
   - Password: `password`
3. Click "Login" to access the dashboard

### Upload Files
1. Go to the Upload page
2. Drag & drop files or click to browse
3. Review selected files
4. Click "Upload" to save

### Manage Lectures
1. Visit "Your Lectures" page
2. Use search to find specific files
3. Filter by file type
4. Click "View" to preview
5. Click "Download" to save locally

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ by the LectureHub Team

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing-fast build tool
- All open-source contributors

---

**Made with passion for education and learning** 🎓
