# AI Chatbot Backend with RAG Pipeline

## Project Overview

This project is a backend-only AI chatbot system built using Node.js, Express, TypeScript, and PostgreSQL.  
It supports secure user authentication, chat history storage, and an AI chatbot powered by a Retrieval-Augmented Generation (RAG) pipeline.

The chatbot retrieves relevant documents from a knowledge base and combines them with an AI model to generate accurate, contextual responses.

---

## Features

- User authentication (Signup, Login, JWT-based security)
- Secure password hashing with bcrypt
- Chat history storage per user
- Retrieval-Augmented Generation (RAG) chatbot
- Knowledge base document retrieval
- OpenAI integration for AI-generated responses
- Background jobs (old chat cleanup, email sending)
- PostgreSQL database with Prisma ORM
- Modular and scalable backend architecture

---

## Technologies Used

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT (JSON Web Tokens)
- OpenAI API
- Nodemailer
- node-cron

---

## System Architecture

1. User sends a message to the chatbot  
2. The system retrieves relevant documents from the database  
3. Retrieved documents are injected into the AI prompt  
4. The AI model generates a contextual response  
5. Both user messages and AI responses are stored in PostgreSQL  

---

## API Endpoints

### Authentication
- POST `/api/auth/signup` – Register a new user  
- POST `/api/auth/login` – Login and receive JWT token  

### Chat
- GET `/chat/api/history` – Retrieve chat history (Protected)  
- POST `/chat/api/create/chat` – Send message to chatbot (Protected)

---

## Database Design

- **User** → Stores user credentials and profile information  
- **Chat** → Stores user and assistant messages with timestamps  
- **Document** → Stores knowledge base content for RAG pipeline  

This structure ensures data integrity, scalability, and secure isolation of user chat histories.

---

## RAG Pipeline Explanation

The system uses a Retrieval-Augmented Generation (RAG) pipeline.  
When a user submits a query, the backend searches the Document table for relevant content.  
The retrieved documents are injected into the AI prompt.  
The AI model then generates a response grounded in both the user query and retrieved knowledge.

This approach improves factual accuracy, relevance, and domain alignment.

---

## Authentication & Security

- Passwords are hashed using bcrypt before storage  
- JWT tokens are generated upon login  
- Protected routes are secured with authentication middleware  
- Tokens include expiration settings  
- Sensitive credentials are stored in environment variables  
- Unauthorized access is blocked at middleware level  

---

## Background Tasks

- A scheduled cron job runs daily to delete chat history older than 30 days  
- Email service sends verification emails after signup  
- Background jobs are isolated from request lifecycle to improve performance  

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/rjriajul1/ai-chatbot-backend
cd ai-chatbot-backend
npm install

.env file
DATABASE_URL=postgresql://user:password@localhost:5432/aichatbot
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

npx prisma migrate dev

npm run dev


Design Questions & Technical Decisions


How did you integrate the RAG pipeline for the chatbot, and what role does document retrieval play in the response generation?

I implemented a Retrieval-Augmented Generation (RAG) pipeline where every user query first goes through a document retrieval step before reaching the AI model.
The system searches a knowledge base stored in PostgreSQL to find the most relevant documents related to the user’s question. These retrieved documents are then injected into the AI prompt as contextual information.
This ensures that the AI model generates responses grounded in real data instead of relying only on its general knowledge.

What database and model structure did you use for storing user and chat history, and why did you choose this approach?

I used PostgreSQL with Prisma ORM and designed separate models for Users, Chats, and Documents.
This relational structure ensures data integrity, easy scalability, and efficient querying. It also allows chat history to be securely isolated per user and supports future extensions.

How did you implement user authentication using JWT? What security measures did you take for handling passwords and tokens?

Passwords are hashed using bcrypt before storage.
JWT tokens are generated after successful login and verified on every protected request.
Security measures include password hashing, token expiration, protected middleware, and environment-based secrets.

How does the chatbot generate responses using the AI model after retrieving documents?

After retrieving documents, their contents are merged with the user’s question to build a structured prompt.
This prompt is sent to the OpenAI API, which generates a response based on both the retrieved context and the query.

How did you schedule and implement background tasks for cleaning up old chat history, and how often do these tasks run?

Background tasks are implemented using node-cron.
A scheduled job runs once every 24 hours to remove chat history older than 30 days from the database.

What testing strategies did you use to ensure the functionality of the chatbot, authentication, and background tasks?

All endpoints were tested using Postman.
This included authentication flows, protected routes, chat processing, and background task verification.
Edge cases such as invalid tokens and incorrect credentials were also tested.

What external services did you integrate, and how did you configure them?

OpenAI API for AI responses

PostgreSQL for data storage

Nodemailer for email service

All services are configured through environment variables and initialized centrally.

How would you expand this chatbot to support more advanced features?

Future improvements could include:

Vector databases (FAISS, Pinecone)

Real-time chat with WebSockets

Admin dashboard for document management

Live document embedding updates

Redis caching

Multi-user chat rooms

Why Node.js instead of Python?

Although the task suggested Python, this system was implemented using Node.js and TypeScript to ensure high scalability, strong typing, and efficient asynchronous processing, while fully meeting all functional requirements.




