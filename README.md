# 🔍 TruthLens: Media & Information Literacy Platform for Youth

> **"Don't Just Know. Learn to Verify."**  
> An AI-powered, explainable Media & Information Literacy (MIL) web application engineered to transform youth from passive consumers of algorithmic misinformation into independent critical thinkers.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-emerald?style=for-the-badge&logo=vercel)](https://truthlens.vercel.app)
[![API Status](https://img.shields.io/badge/Backend_API-FastAPI-blue?style=for-the-badge&logo=fastapi)](https://truthlens-backend.onrender.com)
[![GitHub License](https://img.shields.io/badge/License-MIT-teal?style=for-the-badge)](LICENSE)

---

## 🌐 Quick Links
* **Live Public Application:** [https://truthlens.vercel.app](https://truthlens-plv9.vercel.app)
* **API Documentation (Swagger UI):** https://truthlens-backend.onrender.com/docs
* **Codebase Repository:** https://github.com/NishchaySahoo/truthlens

---

## 💡 The Core Problem: The "Oracle Fallacy"
Most automated fact-checkers operate as authoritarian black boxes: they deliver a binary **True** or **False** verdict without explaining the evidence or teaching the user how to evaluate claims independently. This creates **digital dependency**—the moment automated tools are absent, youth remain defenseless against viral misinformation, manufactured urgency, decontextualized media, and synthetic AI deepfakes.

**TruthLens inverts this paradigm:**
> *"The goal is not to make you dependent on TruthLens. It is to make you need TruthLens less over time."*

---

## 🔄 The 5-Step Pedagogical Loop
| Stage | Action | Educational Outcome |
| :--- | :--- | :--- |
| **1. Analyze** | Inspect raw text, links, or visual media | Isolates core assertions from emotional hyperbole |
| **2. Explain** | Deconstruct evidence & manipulation levers | Exposes artificial urgency, decontextualization & bias |
| **3. Learn** | *"Learn From This"* contextual takeaway | Teaches reusable mental models (e.g., domain sleuthing) |
| **4. Challenge** | Solve real-world scenario dilemmas | Reinforces discernment habits with instant feedback (+50 XP) |
| **5. Progress** | Track competency across 6 skill pillars | Visualizes learning growth without cognitive dependency |

---

## ✨ Key Features & Demo Benchmarks

* **Multi-Modal Verification Engine:** Inspects raw text, article URLs, and synthetic media artifacts.
* **Preloaded Zero-Key Benchmark Cases:**
  * 🎓 **₹50,000 Scholarship Scam:** Exposes manufactured urgency, phishing URLs, and pyramid forwarding traps.
  * 🌊 **Decontextualized Disaster Video:** Identifies authentic historical footage recirculated as breaking news.
  * 📊 **Statistical Framing Bias:** Exposes relative percentage distortions concealing micro sample baselines.
  * 🏛️ **Synthetic AI Media:** Detects optical, physical, and lighting anomalies in generative diffusion imagery.
  * 🩺 **Sensational Health Miracle Claim:** Demystifies conspiracy framing and instant-cure fallacies.
* **Interactive Learning Hub:** 6 deep-dive modules on deepfakes, algorithms, filter bubbles, and the SIFT verification method.
* **Constructive Assessment Engine:** Shame-free feedback rewarding critical exploration and methodology over rote memorization.

---

## 🛠️ Architecture & Tech Stack

### Project Layout
* **`backend/`** — Python FastAPI Microservice
  * `main.py` — REST API routes & dependency injection
  * `models.py` — Pydantic v2 data contracts & schemas
  * `database.py` — SQLite persistent layer & state manager
  * `mock_data.py` — Benchmark demo cases, challenges & lessons
  * `requirements.txt` — Python dependencies
* **`frontend/`** — Next.js 14 Web Application
  * `src/app/page.tsx` — Landing page & visual product flow
  * `src/app/dashboard/` — Competency overview & daily challenges
  * `src/app/analyze/` — Multi-modal verification engine
  * `src/app/results/[id]/` — Diagnostic report & "Learn From This"
  * `src/app/challenge/` — Interactive decision scenarios
  * `src/app/learn/` — Structured MIL learning modules
  * `src/app/progress/` — Skill mastery, XP, streaks & badges
  * `src/app/history/` — Persistent audit trail & past verifications
  * `src/components/` — Reusable UI elements (Navbar, Footer, Cards)
  * `src/lib/api.ts` — API client & network utilities

### Core Technologies
* **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons (Hosted on Vercel)
* **Backend:** Python 3.12, FastAPI, Pydantic, SQLite (Hosted on Render)
* **Design Philosophy:** Clean, youthful, trustworthy, accessible, mobile-responsive, and enterprise-grade.

---

## 🚀 Local Development Setup

### 1. Backend Setup
```bash
cd backend
python -m venv venv

# Windows:
.\venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
Backend API will be accessible at: http://localhost:8000 (Docs: http://localhost:8000/docs)

2. Frontend Setup
Bash
cd frontend
npm install
npm run dev
Frontend Web App will be accessible at: http://localhost:3000

👥 Authors & Acknowledgments
Developers: Nishchay Sahoo, Chhavi Varma, Soham Sawant, Shivani Ram
Institution: Thakur College of Engineering and Technology, Mumbai
Built in alignment with UNESCO Media and Information Literacy (MIL) competencies for youth empowerment.
