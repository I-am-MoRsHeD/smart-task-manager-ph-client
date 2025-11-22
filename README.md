# 🧠 Smart Task Manager — Frontend

A modern task and team management web application built with **Next.js**, designed to help users manage projects, assign tasks, track team capacity, and maintain balanced workloads using an automated task reassignment system.

---

## 🚀 Features

### 👤 User & Team Management
- User authentication (register & login)
- Create multiple teams
- Add team members manually (no email required)
- Member fields:
  - Name
  - Role
  - Capacity (# of tasks they can handle)
  - Current tasks auto-tracked

### 📌 Project & Task Management
- Create and manage multiple projects
- Assign projects to a specific team
- Tasks include:
  - Title, Description
  - Assigned Member
  - Priority (Low / Medium / High)
  - Status (Pending / In Progress / Done)
- Edit, Delete, and Filter tasks

### 🎯 Smart Workload Assignment
- Warn when assigning a task beyond member capacity
- Auto-assign selects the member with least workload

### 🔄 Auto Reassignment (Dashboard Button)
- Detects overloaded members
- Moves tasks automatically to free members
- High-priority tasks stay with current member

### 📊 Dashboard Insights
- Total Projects & Total Tasks
- Team Workload Bar Chart
- Auto Reassign button
- Recent Activity Logs (latest 5)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js (App Router)** | Frontend framework |
| **TypeScript** | Type safety |
| **TailwindCSS + Shadcn UI** | Modern UI components |
| **React Server Actions** | Secure API interactions |
| **Recharts** | Dashboard data visualization |
| **JWT Auth** | Secure session handling |


---
## 🧰 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/I-am-MoRsHeD/smart-task-manager-ph-client.git
cd smart-task-manager-ph-client
```

### 2️⃣ Install dependencies

```bash
bun install
# or
npm install
```

### 3️⃣ Add environment variables
```bash
NEXT_PUBLIC_BASE_URL=https://your-backend-api-url.com/api
JWT_ACCESS_SECRET=access-secret
JWT_ACCESS_EXPIRES=access_expires
```
### 4️⃣ Run the development server
```bash
bun run dev
# or
npm run dev
```
### 4️⃣ Build for production
```bash
bun run build
bun start
# or
npm run build
npm start
```
