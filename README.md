
# 🎓 Campus Placement Portal

A modern, AI-powered campus placement portal designed to streamline training and placement activities within educational institutions. Built using a microservices architecture, this platform ensures scalability, security, and a seamless experience for both students and Training & Placement Officers (TPOs).

## 🚀 Features

- 🔐 **JWT-Based Authentication**: Role-based secure login for Students and TPOs.
- 📝 **Content Management**: TPOs can post jobs and announcements; students can share placement experiences.
- 🤖 **AI Chatbot Assistant**: Powered by **Phi-3 Instruct (4K)** and **GTE-Large**, integrated with **Retrieval-Augmented Generation (RAG)** for interview preparation.
- 🧠 **Semantic Search**: Uses vector embeddings with MongoDB Atlas for personalized, context-aware chatbot responses.
- 🌐 **Modern UI**: Built with React + Vite, using Tailwind CSS and Mantine UI for responsive and accessible design.
- 📦 **Microservices Architecture**: Loosely coupled services (Auth, Content, LLM, GTE) for independent scaling and maintenance.

## 🧱 Project Structure

```
major-project/
├── auth/              # JWT-based Authentication service
├── content-service/   # CRUD for jobs, articles, resumes, etc.
├── llm-service/       # AI Chatbot using Phi-3 and RAG
├── gte-service/       # Embedding generation and vector search
└── ui/                # React + Vite frontend
```

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Mantine UI
- **Backend**: Node.js (Express), Python (Flask)
- **Database**: MongoDB + Vector Search
- **AI Models**: Phi-3 Instruct, GTE-Large
- **Security**: JWT, bcrypt, HTTPS, RBAC
- **Deployment**: Docker-ready, supports cloud/VPS hosting

## 💡 Key Functionalities

### 🔑 Authentication
- Login/Register with email verification
- Role-based access (Student / TPO)
- Secure token storage and session handling

### 📂 Content Management
- Job postings and announcements (TPO)
- Placement experience sharing (Students)
- Resume uploads with file validation

### 🤖 AI Chatbot (RAG-based)
- Contextual interview preparation
- Semantic search over internal knowledge base
- Real-time response generation using Phi-3 + GTE embeddings

### 🔍 Semantic Search
- Vector embeddings stored in MongoDB
- Fast and accurate content retrieval based on query meaning

## 📸 Screenshots

> _(Include relevant screenshots or demo GIFs if available)_  
> Add `/ui/public/demo.gif` or `/ui/assets/screenshots/` for visual walkthroughs.

## 🧪 Run Locally

### Prerequisites

- Node.js, Python 3.10+
- MongoDB instance (with vector search support)
- Docker (optional)

### Development Setup

```bash
# Clone the repo
git clone https://github.com/Akhilendra01/major-project
cd major-project

# Run all services (example script)
bash run-dev.sh
```

> Each service can also be run individually using `npm` or `python`.

## 🔐 Security Measures

- JWT authentication and refresh tokens
- Password hashing with bcrypt
- Email verification tokens
- Input sanitization and validation
- CORS restrictions
- HTTPS for all communication

## 🧠 AI Details

- **Model**: Microsoft Phi-3 (4K Instruct)
- **Retrieval**: RAG pipeline with GTE-Large embeddings
- **Search**: Cosine similarity over MongoDB vector index
- **Hosting**: All models run locally to avoid API costs

## 📊 Future Scope

- Mobile app support (React Native / Flutter)
- Advanced analytics for placement trends
- Integration with LinkedIn / GitHub for enriched profiles
- Real-time chat with recruiters
- Resume auto-analysis

## 👥 Authors

- [Akhilendra Pratap](https://github.com/Akhilendra01)
- Ankit Kushwaha  
- Pratham Agrawal  

_Developed as a final-year major project under the guidance of Dr. Namita Tiwari (Dept. of CSE, MANIT Bhopal)._

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
