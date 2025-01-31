# 🎨 Landing Page Builder

![Last Updated](https://img.shields.io/badge/last%20update-2024--01--31-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

> A modern, open-source landing page builder with drag-and-drop functionality built using Next.js 14, TypeScript, and Tailwind CSS.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Contributing](#-contributing)
- [Project Structure](#-project-structure)
- [Documentation](#-documentation)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## ✨ Features

### Core Features
- 🎯 **Drag & Drop Interface**
  - Intuitive component placement
  - Real-time visual feedback
  - Grid snapping system

- 🎨 **Component Library**
  - Pre-built responsive components
  - Custom component creation
  - Component nesting support

- 📱 **Responsive Design**
  - Mobile-first approach
  - Device preview modes
  - Breakpoint customization

### Advanced Features
- 🔄 **Version Control**
  - Undo/redo functionality
  - Change history
  - Auto-save

- 🎯 **Custom Styling**
  - Visual style editor
  - Custom CSS support
  - Theme management

- 📤 **Export Options**
  - HTML/CSS export
  - Static site generation
  - Hosting integration

---

## 🛠 Tech Stack

### Frontend

- Next.js 14
- TypeScript
- Tailwind CSS
- DND Kit
- Axios
- React Context API
- Custom Hooks

### 📦 Installation
Prerequisites
Node.js >= 18.0.0
npm >= 9.0.0
git


Frontend Setup
Clone the repository:

bash
Copy
git clone https://github.com/nashihamm/landing-page-builder.git
cd landing-page-builder
Install dependencies:

bash
Copy
cd frontend
npm install
Environment setup:
Create .env.local:

env
Copy
NEXT_PUBLIC_API_URL=http://localhost:8000/api
Start development server:

bash
Copy
npm run dev
# Server runs on http://localhost:3000
Backend Setup
Navigate to backend:

bash
Copy
cd backend
Install dependencies:

bash
Copy
npm install
Environment setup:
Create .env:

env
Copy
PORT=8000
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
Database setup:

bash
Copy
npm run migrate
Start backend server:

bash
Copy
npm run dev
# API runs on http://localhost:8000
🤝 Contributing
We welcome contributions! Follow these steps:

Fork the Repository:

bash
Copy
# Click Fork button on GitHub
Clone your fork:

bash
Copy
git clone https://github.com/your-username/landing-page-builder.git
Create a branch:

bash
Copy
git checkout -b feature/amazing-feature
Make changes and commit:

bash
Copy
git commit -m 'Add amazing feature'
Push to your fork:

bash
Copy
git push origin feature/amazing-feature
Open a Pull Request

Contribution Guidelines
Follow existing code style

Write meaningful commit messages

Update documentation

Add tests for new features

Ensure all tests pass

📁 Project Structure
text
Copy
landing-page-builder/
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   │   └── Editor/
│   │   │       ├── AdvancedToolbar.tsx
│   │   │       ├── ComponentSidebar.tsx
│   │   │       ├── EditorCanvas.tsx
│   │   │       └── PropertiesPanel.tsx
│   │   ├── contexts/
│   │   │   └── EditorContext.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   └── types/
│   │       └── index.ts
│   ├── public/
│   └── package.json
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── services/
    └── package.json
📖 Documentation
API Documentation
API documentation is available at:

text
Copy
http://localhost:8000/api/docs
Environment Variables
Frontend (.env.local):

env
Copy
NEXT_PUBLIC_API_URL=http://localhost:8000/api
Backend (.env):

env
Copy
PORT=8000
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
🎯 Roadmap
Component Templates
Add more pre-built components

Custom component creation

Collaboration Features
Real-time editing

Team permissions

Advanced Customization
Custom CSS editor

JavaScript injection

Custom fonts

🐛 Bug Reports
Submit bug reports through GitHub Issues including:

Bug description

Steps to reproduce

Expected behavior

Actual behavior

Screenshots (if applicable)

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

📞 Contact
Developer: @nashihamm

Project: landing-page-builder