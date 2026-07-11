# Pulse Care Pro: Smart AI Assistant (Appointment Booking System)

Pulse Care Pro is an automated, AI-driven medical appointment booking system built on the **n8n orchestration platform**. The system acts as an intelligent bridge between a user-facing chatbot interface and backend healthcare management tools, allowing 24/7 seamless patient scheduling while keeping clinical staff synchronized in real-time.

---

## 🚀 Features & Automation Logic

*   **Intelligent AI Agent:** Powered by an advanced language model structured with a strict system prompt to avoid off-topic discussions and eliminate hallucinations.
*   **Dynamic Information Retrieval:** Reads medical staff metadata directly from a central `Doctors Sheet` to identify specializations, working schedules, and target calendar destinations.
*   **Smart Scheduling & Day Validation:** Automatically matches patient requests against specific doctor availability (e.g., validating days of the week using standard reference baselines).
*   **Two-Way Google Integration:**
    *   **Google Sheets:** Appends verified appointment entries sequentially (generating incremental IDs like `PCP-001`) with a default `"Confirmed"` status.
    *   **Google Calendar:** Automatically creates 30-minute block events directly into the assigned doctor’s unique calendar using ISO 8601 formatting.
*   **Administrative Alerts:** Dispatches instantaneous confirmation summaries via **Gmail** to the clinic administration team (`mtaha22220@gmail.com`) upon successful logging.

---

## 🛠️ System Architecture & Knowledge Infrastructure

The workflow connects several cloud services using a clean node blueprint within n8n:

### 1. Data Structure (Google Sheets)
*   **Doctors Sheet:** Stores vital provider metadata including names, specialization streams, active shift days, and calendar configurations.
*   **Appointment Sheet:** Centralized ledger recording `appointment_id`, `patient_name`, `phone`, `specialization`, `doctor_name`, `date`, `time`, and booking `status`.

### 2. Provider Availability Rules Built Into the Agent
*   **Minahil Sultan Alvi (General):** Monday to Friday | 09:00 AM – 05:00 PM
*   **M. Taha (Dentist):** Monday, Wednesday, Friday | 10:00 AM – 06:00 PM
*   **M. Saad Fateh (Cardiologist):** Tuesday, Thursday | 09:00 AM – 03:00 PM

---

## 📦 Active Nodes Blueprint

To recreate or import this workflow in your n8n workspace, ensure the following nodes are connected and authenticated:
1.  **Webhook Node:** Listens to incoming chat interface connections.
2.  **AI Agent Node:** Executes the system prompt constraints and dynamically routes tool definitions.
3.  **Google Sheets Node (Get Rows):** Used by the AI to pull dynamic staff availability.
4.  **Google Sheets Node (Append Row):** Safely logs new patient profiles and timeslots.
5.  **Google Calendar Node (Create Event):** Books slots on corresponding physician calendars.
6.  **Gmail Node (Send Message):** Fires an administrative notification layout to the office inbox.

---

## 🔧 Installation & Configuration

1. **Import Workflow:** Download the project JSON from n8n and import it directly into your local or cloud instances.
2. **Setup Google Service Account / OAuth:** Connect your Google Workspace credentials inside n8n to grant permissions for Google Sheets, Google Calendar, and Gmail.
3. **Sheet IDs Mapping:** Ensure your Google Sheet node targets correspond perfectly with your custom `Doctors` and `Appointment` layout headers.
4. **Environment Timezone Setup:** Set your n8n workspace environment variables to match your region's time context to ensure strict `ISO 8601` adherence during calculations.

---

## 🤖 Guardrails & Prompt Restrictions

*   **Strict Scope:** The assistant is restricted strictly to Pulse Care Pro parameters. Off-topic queries are answered with a polite disclaimer: *"I am sorry, but I am only authorized to assist with Pulse Care Pro inquiries and appointment bookings."*
*   **Step-By-Step Collection:** Prompts are collected one by one seamlessly to optimize conversation context stability.
*   **Hidden Mechanics:** Internal script IDs, database indices, and logic flow remain completely hidden from end-user visibility.

---

## 📄 License
This system is developed for academic evaluation and clinical management digitization. Distributed under the MIT License.