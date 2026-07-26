# Mystery Message

Mystery Message is a full-stack anonymous messaging platform built with **Next.js, TypeScript, NextAuth, MongoDB, and Tailwind CSS**. Users can securely create accounts, verify their email addresses, share unique public profile links, receive anonymous messages, and generate AI-powered message suggestions for a more engaging experience.

> **Demo Notice**
>
> The email OTP verification system is fully implemented. However, OTP delivery is temporarily unavailable in the deployed demo while the production email domain is being configured. To explore the application, please use the demo credentials below.

### Demo Credentials

```text
Email: demo@gmail.com
Password: Demo@123
```

---

## ✨ Features

- 🔐 Secure Authentication with NextAuth
- 📧 Email Verification (OTP)
- 💬 Anonymous Messaging
- 🔗 Unique Public Profile Links
- 🤖 AI-Powered Message Suggestions
- 📋 User Dashboard
- ✅ Accept / Disable Incoming Messages
- 👤 Real-time Username Availability Check
- 🗑️ Message Deletion
- 🌙 Dark & Light Mode Support
- 📱 Fully Responsive UI

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend

- Next.js API Routes
- NextAuth
- MongoDB Atlas
- Mongoose

### Libraries

- React Hook Form
- Zod
- Axios

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── (app)/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── verify/
│   ├── api/
│   └── u/
├── components/
├── context/
├── helpers/
├── lib/
├── model/
├── schemas/
├── types/
└── proxy.ts
```

---

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/Hitesh1789/Mystery-Message.git
```

Move into the project directory:

```bash
cd Mystery-Message
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add the required environment variables.

Start the development server:

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 🎯 Future Improvements

- User Analytics Dashboard
- Spam Detection & Protection
- Message Search & Filtering
- User Profile Customization
- Email Notifications
- Social Sharing Enhancements

---

## 👨‍💻 Author

**Hitesh**

GitHub: **https://github.com/Hitesh1789**
