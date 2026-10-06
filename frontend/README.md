# LINEAGE — Trusted Collaborative Research Ecosystem

> *"Every contribution has a lineage. Every reward has evidence."*

LINEAGE is a trusted collaborative research platform connecting **Sponsors**, **Domain Experts**, **Students**, and **AI Agents**. The platform enables sponsors to post research problems, scope charters, match candidates, collaborate using AI, verify contribution integrity, and distribute accepted rewards fairly.

---

## 🎯 Key Highlights

* **Evidence-First Attribution ("Credit by Survival")**: Calculates token survival ratios in accepted final research artifacts to distribute rewards fairly.
* **Cryptographic SHA-256 Audit Ledger**: Immutable hash-chained audit trail that makes retrospective modifications immediately detectable (`CHAIN BROKEN`).
* **TF-IDF Integrity Signal**: Automated similarity scoring (e.g., 87% match flag) that routes submissions to Expert Human Review queues.
* **Auditable Project AI Gateway**: Proxy layer for external LLMs (Gemini / Nemotron) with redacted API keys & passwords, attributing 100% of author credit to human operators.
* **Multi-Sig Charter Governance**: Versioned project charters (v1.0 / v1.2) with digital signatures from all participating roles before work begins.
* **Under-18 Minor Safeguards**: Automatic minor detection (`age < 18`) with guardian consent status verification for paid workspaces.

---

## 🚀 Tech Stack

### **Frontend**
* **Framework**: React 19 + Vite + React Router DOM v7
* **Styling**: Tailwind CSS + Lucide Icons + Framer Motion
* **API Integration**: Centralized Axios client (`VITE_API_BASE_URL` defaulting to `http://localhost:8000/api`)

### **Backend (`Lineage_server`)**
* **Framework**: Python FastAPI
* **ORM & Database**: SQLAlchemy + PostgreSQL / SQLite
* **Validation**: Pydantic v2 schemas
* **Authentication**: JWT Bearer Tokens + Passlib/Bcrypt password hashing

---

## 🛠️ Quick Start

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The application will be running live at `http://localhost:5173/`.

### Build for Production
```bash
npm run build
```

---

## 🎭 Live Demo Personas

LINEAGE includes built-in persona switching in the top navigation bar for live presentations:

| Persona | Name | Role | Focus |
| :--- | :--- | :--- | :--- |
| **Sponsor** | Vikram Patel | `sponsor` | Post projects, fund escrow, release milestone payouts |
| **Domain Expert** | Dr. Priya Menon / Dr. Meera | `expert` | Clinical validation, similarity review queue, charter sign-off |
| **Student A** | Arjun Sharma (Age 17) | `student` | Preprocessing scripts, INT8 quantization, minor consent state |
| **Student B** | Kavitha Rajan | `student` | Data cleaning, model evaluation |
| **Admin** | Neha Gupta | `admin` | Cryptographic ledger audit, dispute resolution |

---

## 📜 License

Built for hackathon demonstration. All rights reserved.
