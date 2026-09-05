![Next.js](https://img.shields.io/badge/Next.js-14-black)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![Python](https://img.shields.io/badge/Python-3.10-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![NeonDB](https://img.shields.io/badge/NeonDB-Serverless-green)
![Gemini](https://img.shields.io/badge/Gemini-AI-purple)
![Vercel](https://img.shields.io/badge/Vercel-Frontend-black)
![Render](https://img.shields.io/badge/Render-Backend-46E3B7)
![Status](https://img.shields.io/badge/Status-Live-success)
# RevenuePilot

Autonomous AI-Powered Revenue Recovery Platform

RevenuePilot helps businesses recover failed payments by automatically detecting payment failures, analyzing recovery probability, selecting the best intervention channel, generating recovery workflows, tracking customer commitments, and measuring recovered revenue in real time.

---

## Live Demo

### Frontend (Vercel)
https://revenue-pilot-git-main-fatimazaki1811d-gmailcoms-projects.vercel.app/dashboard

### Backend API (Render)
https://revenuepilot-y2li.onrender.com

### API Documentation
https://revenuepilot-y2li.onrender.com/docs

---



## Problem Statement

Revenue leakage often occurs because of:

- Payment gateway failures
- Insufficient balance
- Checkout abandonment
- Subscription payment failures
- Invoice collection delays
- Failed UPI or card transactions

Most businesses only detect these failures after revenue has already been lost.

RevenuePilot creates an autonomous recovery workflow that:

1. Detects failed transactions
2. Analyzes recovery probability
3. Chooses the best recovery strategy
4. Executes recovery actions
5. Tracks customer commitments
6. Measures recovered revenue

---

## Key Features

### Failed Payment Detection

Tracks payment failures in real time and stores them for recovery processing.

### AI Recovery Decision Engine

Analyzes:

- Failure reason
- Amount
- Customer behavior
- Recovery probability

Generates:

- Recovery score
- Priority level
- Recommended action
- Recommended channel

### Autonomous Recovery Workflow

Automatically creates recovery actions such as:

- WhatsApp follow-up
- Voice agent outreach
- Promise-to-Pay collection
- Manual escalation

### AI Decision Timeline

Visual representation of:

- Failure detected
- Analysis completed
- Recovery strategy selected
- Recovery campaign launched

### Revenue Recovery Analytics

Tracks:

- Revenue at risk
- Recovered revenue
- Recovery rate
- Failed transaction count

### Promise-to-Pay Tracker

Tracks customer commitments.

Status lifecycle:

Pending → Promised → Paid

### Voice Agent Recovery

AI-assisted voice recovery workflow for customer engagement.

### Recovery Dashboard

Single interface for:

- Monitoring failures
- Viewing AI recommendations
- Launching recovery actions
- Measuring recovered revenue

---

## System Architecture

<img width="1536" height="1024" alt="Backend (FastAPI)" src="https://github.com/user-attachments/assets/9d91f535-169f-4cb1-b2f8-5c79f5952707" />





---

## Dashboard Screenshots

### Main Dashboard

<img width="1912" height="940" alt="image" src="https://github.com/user-attachments/assets/d9020688-71d3-4479-b699-a59954b43a27" />


### Failed Transactions

<img width="1917" height="752" alt="image" src="https://github.com/user-attachments/assets/7a28314c-4ea8-41d6-81b8-7ee4f671a6f0" />


### AI Decision Engine

<img width="1917" height="657" alt="image" src="https://github.com/user-attachments/assets/495898ac-85a8-469f-818f-67c825a12040" />


### Promise-To-Pay Queue

<img width="1917" height="277" alt="image" src="https://github.com/user-attachments/assets/edb578e7-9ced-4d8f-8aeb-20fb16f3d055" />


### Voice Agent Recovery

<img width="1917" height="563" alt="image" src="https://github.com/user-attachments/assets/319ca44c-c028-4074-90e0-0c1836664928" />


---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- FastAPI
- Python

### Database

- PostgreSQL
- NeonDB

### Deployment

- Vercel
- Render

### AI Layer

- Gemini API

---

## Recovery Workflow

```text
Failed Payment
        |
        v
AI Analysis Engine
        |
        v
Recovery Score Generated
        |
        v
Channel Recommendation
        |
        v
Recovery Action Triggered
        |
        +----> WhatsApp Recovery
        |
        +----> Voice Agent
        |
        +----> Promise To Pay
        |
        +----> Manual Escalation
        |
        v
Revenue Recovered
```

---

## API Endpoints

### Dashboard

```http
GET /dashboard-metrics
```

Returns overall recovery metrics.

---

### Failed Events

```http
GET /failed-events
```

Returns all failed payment events.

```http
POST /create-event
```

Creates a new failed payment event.

---

### AI Decision

```http
GET /ai-decision/{event_id}
```

Returns AI-generated recovery recommendation.

---

### Recovery Workflow

```http
POST /recover/{event_id}
```

Triggers recovery process.

---

### Promise To Pay

```http
POST /promise/{event_id}
```

Creates Promise-To-Pay record.

```http
GET /promises
```

Returns all Promise-To-Pay records.

```http
POST /promise-paid/{promise_id}
```

Marks promise as paid.

---

### Recovery Analytics

```http
GET /recovery-chart
```

Returns recovery trend data.

---

### Voice Agent

```http
POST /voice-agent/{event_id}
```

Triggers voice recovery workflow.

---

## Project Structure

```text
RevenuePilot
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── models
│   │   ├── services
│   │   ├── schemas
│   │   └── core
│   │
│   ├── main.py
│   └── requirements.txt
│
├── frontend
│   ├── app
│   │   ├── dashboard
│   │   └── components
│   │
│   ├── public
│   └── package.json
│
└── docs
```

---

## Local Setup

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

## Environment Variables

Create a `.env` file:

```env
APP_NAME=RevenuePilot

DATABASE_URL=your_neon_database_url

GEMINI_API_KEY=your_gemini_api_key

RAZORPAY_KEY_ID=your_key

RAZORPAY_KEY_SECRET=your_secret
```

---

## Future Improvements

- Real WhatsApp integration using Twilio
- Razorpay webhook integration
- Automated payment retries
- Customer segmentation engine
- Predictive churn detection
- Agent memory and conversation history
- Multi-channel recovery orchestration
- Email recovery campaigns
- SMS recovery workflows
- Real-time event streaming
- Enterprise audit logs
- Multi-tenant support

---

## Team

RevenuePilot was built as an autonomous revenue recovery platform to demonstrate how AI agents can detect, analyze, and recover lost revenue through intelligent workflow automation.

---
