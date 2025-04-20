# Security Policy

## 🔐 Overview

MITPA.tech is committed to maintaining a secure and reliable open-source platform for students and contributors worldwide. This document outlines our security guidelines, best practices, and how to responsibly report vulnerabilities.

---

## ✅ Current Security Measures

### 1. **Scope**
- This policy applies to all public-facing systems and components within the MITPA ecosystem, including:
    - The MITPA.tech web platform
    - The MITPA API
    - Discord Bot integrations
    - Simulated Exams (SEs) system
    - Data stored on Amazon S3

### 2. **Security Principles**
- Least privilege access for users, admins, and systems
- Input sanitization and validation across all user-facing forms and APIs
- CORS restrictions and domain-level protections on API usage
- Rate limiting and bot protection to prevent abuse
- Secure email verification with code expiration and attempt limits
- Audit logs and error tracking for rapid incident response

### 3. **Known Security Practices**
- All verification codes are stored server-side (e.g., in memory or Redis)
- Inputs are sanitized on both frontend and backend
- `alert()` messages are replaced with toast notifications
- Discord interactions are validated and rate-limited
- The system blocks API usage from unauthorized domains via CORS
- Email verification systems include rate limits and cooldown mechanisms
- Proactive logging is in place to detect anomalies

### 4. **Dependencies and Updates**
- We regularly audit and update dependencies using:
    - `npm audit`
    - `npm-check-updates`
    - Dependabot alerts

- Contributors should ensure all new code follows secure practices and is free of known vulnerabilities.

---

## ⚠️ Potential Vulnerabilities (monitored)

- Brute-force attempts on code input (rate-limiting suggested server-side)
- Abuse of verification endpoint with spoofed `id` (handled server-side)

---

## 🧪 Secure Development Tips

- Always validate inputs server-side as well
- Use rate-limiting and CAPTCHA score thresholds
- Log suspicious activity (e.g., failed attempts or unusual request volume)
- Regularly rotate email and verification code secrets

---

## 🤝 Report a Vulnerability

If you discover a security issue, please:

1. **Do not open a public issue**
2. Report it **privately and responsibly** via:

📧 Email: **security@mitpa.tech**

Include the following:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes or mitigation

We respond within **48 hours** and will coordinate resolution with you.

---

## 🛠️ Planned Improvements

- Add OTP length enforcement and lockout mechanism on frontend
- Visual feedback on password strength for future auth pages
- Optional biometric authentication (WebAuthn) support in 2025
- Integration with MITPA SSO

---

Thank you for helping keep MITPA secure for all students and contributors. 🔒
