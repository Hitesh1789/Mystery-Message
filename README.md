# Mystery Message
Mystery Message is a full-stack anonymous messaging platform built with Next.js, TypeScript, NextAuth, MongoDB, and Tailwind CSS. Users can securely create accounts, verify their email addresses, share unique public profile links, receive anonymous messages, and generate AI-powered message suggestions for a more engaging user experience.

## Features

* Secure Authentication with NextAuth
* Email Verification
* Anonymous Messaging
* Unique Public Profile Links
* User Dashboard
* Accept/Disable Incoming Messages
* Real-time Username Availability Check
* Responsive UI
* Message Deletion
* AI Message Suggestions

## Tech Stack

**Frontend**

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

**Backend**

* Next.js API Routes
* NextAuth
* MongoDB Atlas
* Mongoose

**Libraries**

* React Hook Form
* Zod
* Axios

## Project Structure

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

## Installation

```bash
git clone https://github.com/Hitesh1789/Mystery-Message.git
cd Mystery-Message
npm install
npm run dev
```

Create a `.env` file and add the required environment variables.

## Future Improvements

* Dark Mode
* User Analytics
* Spam Protection

## Author

Hitesh

GitHub: https://github.com/Hitesh1789
