# CentaShield – System Design Document

## 1. Introduction

This document describes the system architecture, components, and design of the CentaShield platform. It explains how different modules interact to perform vulnerability analysis and report generation.

---

## 2. System Architecture

CentaShield follows a client-server architecture.

### High-Level Architecture

User Browser
|
Frontend (Web UI)
|
Backend API Server
|
Vulnerability Scanner Engine
|
Result Processor & Report Generator
|
Database (User & Scan Data)

yaml
Copy code

---

## 3. Component Design

### 3.1 Frontend Module
- Provides user interface for:
  - Login & registration
  - Scan submission
  - Viewing scan progress
  - Displaying reports
- Built using HTML, CSS, and JavaScript.

---

### 3.2 Backend Module
- Handles user requests.
- Validates inputs.
- Sends data to scanning engine.
- Returns processed results to frontend.

---

### 3.3 Vulnerability Scanner Engine
- Core logic of the system.
- Uses predefined rules and patterns to detect:
  - SQL injection
  - XSS
  - Insecure headers
- Produces raw vulnerability data.

---

### 3.4 Result Processing Module
- Converts raw scan data into structured results.
- Assigns severity levels.
- Formats data for UI and reports.

---

### 3.5 Database Module
Stores:
- User details
- Scan history
- Vulnerability results
- Report metadata

---

## 4. Data Design

### User Entity
User {
userId
username
email
passwordHash
}

shell
Copy code

### Scan Entity
Scan {
scanId
userId
target
scanDate
status
}

shell
Copy code

### Vulnerability Entity
Vulnerability {
vulnId
scanId
type
severity
description
mitigation
}

yaml
Copy code

---

## 5. API Design

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/register | POST | Register user |
| /api/login | POST | Authenticate user |
| /api/scan | POST | Start scan |
| /api/results/{id} | GET | Get scan result |

---

## 6. UI Design

Main pages:
- Home Page
- Login / Register Page
- Scan Page
- Results Page
- Dashboard Page

UI Features:
- Navigation bar
- Progress bar for scan
- Risk severity indicators
- Downloadable reports

---

## 7. Security Design

- Input sanitization
- Encrypted password storage
- Role-based access control
- Secure session handling

---

## 8. Error Handling

- User-friendly error messages
- Backend logs for debugging
- Timeout handling for long scans

---

## 9. Testing Strategy

- Unit testing for scanner logic
- Integration testing for API endpoints
- UI testing for user flow
- Security testing for input validation

---

## 10. Future Design Extensions

- AI/ML-based detection engine
- Cloud deployment
- Multi-language support
- Enterprise dashboard

---
