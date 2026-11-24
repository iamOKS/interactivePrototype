## 1. Project Overview

**ThinkFirst** is a browser-based intelligent interactive prototype designed to foster **appropriate reliance**—rather than blind acceptance or blanket distrust—when users interact with Large Language Model (LLM) agents for everyday information seeking and decision-making.

Standard conversational interfaces reveal fluent AI responses immediately, which anchors user judgment, encourages skipped task comprehension, and triggers automation bias through an *"illusion of explanatory depth."* ThinkFirst interrupts passive copy-paste behavior using a structured **three-step pre-commitment and verification workflow**:

1. **Step 1 — Query Selection or Entry:** Users choose from three pre-loaded everyday evaluation scenarios or enter a custom open-ended prompt.
2. **Step 2 — Pre-Commitment Gate:** The AI output remains locked until the user records their own initial hypothesis and self-reported confidence level (`Low`, `Medium`, or `High`), activating their prior mental model before seeing the AI's claim.
3. **Step 3 — Side-by-Side Grounded Comparison & Decision:** Users inspect their locked hypothesis alongside a concise (2–3 sentence) AI explanation, expand a primary-source reference snippet with a clickable official URL, and make an explicit **Accept AI Answer** or **Flag Mistake** decision with immediate calibration feedback.

---

## 2. Repository File Structure

```text
thinkfirst-ai/
├── index.html          # Semantic three-step card layout, pre-commitment gate, and comparison UI
├── styles.css          # Responsive two-column comparison grid, lock banners, and feedback styling
├── data.js             # Pre-loaded everyday evaluation scenarios, seeded hallucination, and official URLs
├── app.js              # Client controller: step state machine, gate validation, API router, and evaluator
└── README.md           # Project overview, setup instructions, iteration log (1–3), and AI disclosure
```

---

## 3. Setup and Running Locally

### Prerequisites
* Any modern web browser (Chrome, Firefox, Edge, or Safari).
* *(Optional)* A local static server (e.g., VS Code Live Server or Python `http.server`) and a backend proxy endpoint (`/api/gemini`) configured with a valid Gemini API key for custom open-ended queries.

### Quick Start (Offline / Pre-Loaded Scenarios)
1. Clone the repository:
   ```bash
   git clone https://github.com/iamOKS/interactivePrototype.git
   cd thinkfirst-ai
   ```
2. Open `index.html` directly in your browser, or serve the directory locally:
   ```bash
   python3 -m http.server 8080
   ```
3. Navigate to `http://localhost:8080` to test the three pre-loaded scenarios without requiring an external API key.

### Enabling Live Custom Queries (Optional)
* Custom prompts entered in Step 1 route through `app.js` to `/api/gemini` (`gemini-3-flash-preview`), constrained by a system instruction limiting responses to 2–3 direct sentences.
* Because custom queries are not backed by the curated offline snippet store, Step 3 automatically displays an **Unverified Boundary Notice** and hides the official external source link to communicate system boundaries transparently.

---

## 4. Pre-Loaded Evaluation Scenarios

| Scenario | Query | AI Output Behavior | Grounded Primary Source | Target Learning / Calibration Goal |
| :--- | :--- | :--- | :--- | :--- |
| **Preset 1** | *"Should you take antibiotics to cure a common cold or the flu?"* | **Accurate** (Explains colds/flu are viral; antibiotics only treat bacterial infections) | **NHS Health Guidance** (`nhs.uk`) | Calibrated acceptance when initial user intuition is uncertain or inaccurate. |
| **Preset 2** | *"Is the year 2100 a leap year?"* | **Accurate** (Explains the Gregorian century divisibility rule by 400) | **Royal Museums Greenwich** (`rmg.co.uk`) | Resolving common misconceptions via concise explanation + authoritative provenance. |
| **Preset 3** | *"Is it safe to put crumpled aluminum foil inside a microwave oven to keep food warm?"* | **Seeded Hallucination** (Fluently claims crinkled foil safely scatters microwaves) | **USDA Food Safety and Inspection Service** (`fsis.usda.gov`) | Detecting a plausible, high-fluency safety hallucination via pre-commitment conflict and source checking. |

---


### AI Usage Disclosure
Generative AI (**Google Gemini**) was used during development to assist with front-end HTML/CSS/JavaScript boilerplate structuring and documentation formatting. All interaction logic, evaluation scenarios, seeded hallucination text, primary-source snippets, official URLs, and design rationale claims were authored, reviewed, tested, and verified by **Ooi Khai Shen**.