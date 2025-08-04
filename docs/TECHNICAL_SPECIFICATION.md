Below is an **ultra‑granular MVP blueprint** (an _engineering‑ready_ spec) for your Ghana “Common App” platform (working name: **UniBridge GH**). It drills deeper than the prior outline so you can start coding with minimal ambiguity.

---

# 0. Guiding Principles

1. **Vertical slice early**: Auth → Profile → Form load → Draft save → Validate → Submit → View snapshot.
2. **Extensibility > completeness**: A lean Form DSL that can evolve without migrations.
3. **Deterministic integrity**: Every submission = _immutable snapshot + cryptographic hash_.
4. **Isolation of concerns**: Validation engine is# 14. MVP Sprint Plan (3-Week Focus)

## Week 1: Foundation & Authentication

**Day 1-2: Project Setup**

- Initialize Git repo with backend/frontend structure
- FastAPI + SQLAlchemy setup with simplified schema
- Docker Compose with PostgreSQL
- Basic JWT authentication (register/login)

**Day 3-4: Core Models & Profile**

- User and student_profile models
- Profile CRUD endpoints
- Basic form_definitions and institutions tables
- Seed 2 institutions (KNUST + UG) with simple forms

**Day 5-7: Testing & Polish**

- Unit tests for auth and profile
- Basic validation
- API documentation
- Environment configuration

## Week 2: Application Flow

**Day 8-9: Form System**

- Form definition loading from database
- Application draft creation
- Dynamic form rendering logic (backend)

**Day 10-11: Answer Management**

- Application answers CRUD
- Field validation (required, min/max length)
- Single cross-field validation rule

**Day 12-14: Document Upload**

- Simple file upload endpoint
- Document storage and retrieval
- Link documents to applications

## Week 3: Submission & Admin

**Day 15-16: Payment & Submission**

- Payment stub implementation (boolean flag)
- Application submission flow
- Snapshot creation with SHA256 hash

**Day 17-18: University Admin**

- Admin authentication
- Application listing for institution
- Decision making (ADMIT/REJECT)

**Day 19-21: Integration & Demo**

- End-to-end testing
- Basic frontend (or API testing interface)
- Demo data generation
- Documentation and presentation prep

## Success Criteria (End of Week 3)

✅ Student can register, complete profile, and apply to 2 universities  
✅ Forms load dynamically from database definitions  
✅ Basic validation works (required fields + one cross-field rule)  
✅ File upload and document attachment works  
✅ Payment stub and submission creates immutable snapshot  
✅ University admin can view applications and make decisions  
✅ All critical paths have basic tests  
✅ System ready for demo with sample data

## Deferred to Phase 2

- WASSCE results management
- Advanced document categorization
- Complex validation rules
- Comprehensive audit logging
- Advanced metrics and monitoring
- Frontend polish and UX enhancementsd; storage/service layers are thin wrappers.

5. **Observability baked in**: Metrics, structured logs, and audit events from day 1.

---

# 1. Core User Stories (MVP MUST Satisfy - Refined)

| ID  | Story                                | Acceptance Criteria                                | Priority |
| --- | ------------------------------------ | -------------------------------------------------- | -------- |
| S1  | Student registers with email/phone   | Register returns JWT token; basic validation       | P0       |
| S2  | Student completes basic profile      | Name, email, phone, high school saved              | P0       |
| S3  | Student views available institutions | API returns KNUST + UG with active forms           | P0       |
| S4  | Student starts an application        | Draft created with form schema loaded              | P0       |
| S5  | Student fills application form       | Text/select fields saved via PATCH                 | P0       |
| S6  | Student uploads single document      | File stored with basic validation                  | P0       |
| S7  | Student validates application        | Required fields checked, one cross-field rule      | P0       |
| S8  | Student pays fee (stub)              | Payment flag set to true                           | P0       |
| S9  | Student submits application          | Snapshot created, status SUBMITTED, edits blocked  | P0       |
| S10 | University admin logs in             | JWT token with admin role                          | P0       |
| S11 | University admin views applications  | List of submissions for their institution          | P0       |
| S12 | University admin makes decision      | ADMIT/REJECT saved with timestamp                  | P0       |
| S13 | Student sees application status      | Dashboard shows submitted apps + decisions         | P1       |
| S14 | Basic audit trail                    | Critical actions logged (register, submit, decide) | P1       |

**Deferred Stories:**

- WASSCE results entry → Replace with simple "Previous Results" text field
- Document categorization → Single upload per application
- Profile completion % → Simple "Complete/Incomplete" status
- Advanced validation → Start with basic required + one cross-field rule
- Multi-document management → Single file upload

---

# 2. Domain Enumerations

```text
Role: STUDENT | UNIV_ADMIN | PLATFORM_ADMIN
ApplicationStatus: DRAFT | READY_FOR_SUBMIT | SUBMITTED | UNDER_REVIEW | DECIDED
Decision: ADMIT | REJECT | WAITLIST | NULL
DocumentType: TRANSCRIPT | PHOTO | RECOMMENDATION | OTHER
PaymentMethod: VOUCHER | MOMO_STUB
PaymentStatus: PENDING | SUCCESS | FAILED
Grade: A1 | B2 | B3 | C4 | C5 | C6 | D7 | E8 | F9
Subject (subset): ENGLISH | CORE_MATH | INT_SCI | SOCIAL | ELECT_MATH | PHYSICS | CHEMISTRY | BIOLOGY | ECONOMICS | GEOGRAPHY | ICT | CRS | GOVT (… extend)
```

---

# 3. Data Model (SQL-Level Detail)

### 3.1 Tables (PostgreSQL)

```sql
-- Simplified MVP Schema
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email CITEXT UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('STUDENT','UNIV_ADMIN')),
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE student_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  high_school_name TEXT,
  grad_year INT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Simplified document storage (one file per application)
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  original_filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes INT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  short_code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('ACTIVE','TEST')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE form_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
  version INT NOT NULL DEFAULT 1,
  status TEXT NOT NULL CHECK (status IN ('ACTIVE','DEPRECATED')) DEFAULT 'ACTIVE',
  json_schema JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (institution_id, version)
);

CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  institution_id UUID REFERENCES institutions(id),
  form_definition_id UUID REFERENCES form_definitions(id),
  status TEXT NOT NULL CHECK (status IN ('DRAFT','SUBMITTED','UNDER_REVIEW','DECIDED')) DEFAULT 'DRAFT',
  decision TEXT CHECK (decision IN ('ADMIT','REJECT') OR decision IS NULL),
  decision_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ,
  fee_paid BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, institution_id) -- One application per student per institution
);

CREATE TABLE application_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  field_key TEXT NOT NULL,
  value JSONB,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (application_id, field_key)
);

CREATE TABLE application_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID UNIQUE REFERENCES applications(id) ON DELETE CASCADE,
  snapshot_json JSONB NOT NULL,
  hash_sha256 TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Simplified activity log
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Essential indexes
CREATE INDEX idx_applications_user ON applications(user_id);
CREATE INDEX idx_applications_inst ON applications(institution_id);
CREATE INDEX idx_answers_app ON application_answers(application_id);
```

---

# 4. Form Definition DSL (Detailed)

### 4.1 Field Types Supported (MVP)

| Type                      | Rendering                                           | Storage      |
| ------------------------- | --------------------------------------------------- | ------------ |
| `text`                    | Input                                               | String       |
| `longtext`                | Textarea                                            | String       |
| `select`                  | Dropdown (static options or external programs list) | String       |
| `multiselect` _(stretch)_ | Chips                                               | Array        |
| `number`                  | Numeric input                                       | Number       |
| `date`                    | Date picker                                         | ISO date     |
| `grade`                   | Enum dropdown (A1–F9)                               | String       |
| `computed` _(read-only)_  | Derived from expression                             | Value cached |

### 4.2 Conditional Logic

```json
"conditions": [
  { "target": "second_choice_program", "when": "first_choice_program != null", "visible": true }
]
```

Evaluation engine:

- Expression grammar: simple `IDENTIFIER`, literals, operators: `==`, `!=`, `&&`, `||`, comparison for numbers.
- Library: create a tiny parser or safe eval mapping tokens.

### 4.3 Cross-Field Validation Object

```json
"validation": {
  "rules": [
    { "expr": "second_choice_program == first_choice_program", "error": "Second choice must differ." },
    { "expr": "len(personal_statement) < 500", "error": "Personal statement must be at least 500 chars." }
  ]
}
```

DSL support functions: `len(field_key)`.

### 4.4 Reference to Profile Fields

```json
{ "key": "first_name", "type": "text", "source": "profile", "readonly": true }
```

### 4.5 Fees Block

```json
"fees": { "base": 200.00, "currency": "GHS" }
```

### 4.6 Simplified MVP Form JSON Examples

**KNUST Undergraduate Application (MVP Version):**

```json
{
  "title": "KNUST 2025 Undergraduate Application",
  "version": 1,
  "sections": [
    {
      "id": "personal",
      "label": "Personal Information",
      "fields": [
        {
          "key": "first_name",
          "type": "text",
          "label": "First Name",
          "source": "profile",
          "readonly": true
        },
        {
          "key": "last_name",
          "type": "text",
          "label": "Last Name",
          "source": "profile",
          "readonly": true
        },
        {
          "key": "phone",
          "type": "text",
          "label": "Phone Number",
          "source": "profile",
          "readonly": true
        }
      ]
    },
    {
      "id": "academic",
      "label": "Academic Information",
      "fields": [
        {
          "key": "previous_results",
          "type": "longtext",
          "label": "Previous Academic Results",
          "required": true,
          "maxLength": 1000,
          "placeholder": "Please describe your WASSCE or equivalent results"
        },
        {
          "key": "first_choice_program",
          "type": "select",
          "label": "First Choice Program",
          "required": true,
          "options": [
            "BSC_COMPUTER_ENGINEERING",
            "BSC_ELECTRICAL_ENGINEERING",
            "BSC_COMPUTER_SCIENCE",
            "BSC_MECHANICAL_ENGINEERING"
          ]
        },
        {
          "key": "second_choice_program",
          "type": "select",
          "label": "Second Choice Program",
          "required": false,
          "options": [
            "BSC_COMPUTER_ENGINEERING",
            "BSC_ELECTRICAL_ENGINEERING",
            "BSC_COMPUTER_SCIENCE",
            "BSC_MECHANICAL_ENGINEERING"
          ]
        }
      ]
    },
    {
      "id": "essay",
      "label": "Personal Statement",
      "fields": [
        {
          "key": "personal_statement",
          "type": "longtext",
          "label": "Why do you want to study at KNUST?",
          "required": true,
          "minLength": 200,
          "maxLength": 1500
        }
      ]
    }
  ],
  "validation": {
    "rules": [
      {
        "expr": "second_choice_program == first_choice_program",
        "error": "Second choice must be different from first choice"
      }
    ]
  },
  "fees": {
    "base": 150.0,
    "currency": "GHS"
  }
}
```

**University of Ghana Application (MVP Version):**

```json
{
  "title": "University of Ghana 2025 Undergraduate Application",
  "version": 1,
  "sections": [
    {
      "id": "personal",
      "label": "Personal Details",
      "fields": [
        {
          "key": "first_name",
          "type": "text",
          "label": "First Name",
          "source": "profile",
          "readonly": true
        },
        {
          "key": "last_name",
          "type": "text",
          "label": "Last Name",
          "source": "profile",
          "readonly": true
        }
      ]
    },
    {
      "id": "programs",
      "label": "Program Selection",
      "fields": [
        {
          "key": "preferred_program",
          "type": "select",
          "label": "Preferred Program",
          "required": true,
          "options": [
            "BA_ECONOMICS",
            "BSC_PSYCHOLOGY",
            "BSC_MATHEMATICS",
            "BA_ENGLISH"
          ]
        }
      ]
    },
    {
      "id": "motivation",
      "label": "Motivation",
      "fields": [
        {
          "key": "motivation_letter",
          "type": "longtext",
          "label": "Letter of Motivation",
          "required": true,
          "minLength": 300,
          "maxLength": 2000
        }
      ]
    }
  ],
  "validation": {
    "rules": []
  },
  "fees": {
    "base": 120.0,
    "currency": "GHS"
  }
}
```

---

# 5. Backend Project Skeleton (FastAPI Example)

```
backend/
  app/
    main.py
    core/
      config.py
      security.py (hashing, JWT)
      logging.py
    db/
      session.py
      base.py
      models/ (SQLAlchemy models)
      migrations/
    schemas/ (Pydantic)
      auth.py
      profile.py
      forms.py
      applications.py
    routers/
      auth.py
      profile.py
      wassce.py
      documents.py
      institutions.py
      forms.py
      applications.py
      admin.py
    services/
      validation_engine.py
      forms_service.py
      payment_stub.py
      snapshot_service.py
      audit.py
      storage.py
    utils/
      expressions.py
    tests/
      unit/
      integration/
    scripts/
      seed_institutions.py
      gen_synthetic.py
```

---

# 6. Key Pydantic Schemas (Illustrative)

```python
# schemas/forms.py
class Field(BaseModel):
    key: str
    type: Literal["text","longtext","select","number","date","grade"]
    label: str
    required: bool = False
    source: Optional[str] = None
    readonly: bool = False
    options: Optional[List[str]] = None
    minLength: Optional[int] = None
    maxLength: Optional[int] = None

class Section(BaseModel):
    id: str
    label: str
    fields: List[Field]

class ValidationRule(BaseModel):
    expr: str
    error: str

class Fees(BaseModel):
    base: Decimal
    currency: str

class FormDefinitionSchema(BaseModel):
    title: str
    version: int
    sections: List[Section]
    validation: Optional[Dict[str, List[ValidationRule]]] = None
    fees: Fees
```

---

# 7. Validation Engine Design

**Input:** `form_schema`, `answers` dict, `profile` (for source reference).
**Steps:**

1. Build `resolved` context: merge profile + answers (answers override).
2. Field-level checks:

   - Required presence
   - Type coercion
   - Length / numeric range

3. Cross-field rules: parse expressions → tokenized evaluation against context.
4. Document prerequisites (e.g., transcript & photo exist).
5. Payment (if in submit phase).

**Output:**

```json
{
  "valid": false,
  "errors": [
    {
      "field": "personal_statement",
      "code": "MIN_LENGTH",
      "message": "Minimum 500 chars required"
    },
    {
      "field": "second_choice_program",
      "code": "CROSS_FIELD",
      "message": "Second choice must differ."
    }
  ]
}
```

**Testing:** Unit tests for each rule type + parameterized tests for grade boundaries.

---

# 8. Submission Snapshot

When submitting:

1. Run validation; if fail → abort.
2. Gather: profile subset, WASSCE list, document metadata (NOT raw files), form answers, form version metadata, timestamp.
3. Serialize → canonical JSON (sorted keys).
4. Compute `hash = SHA256(snapshot_json_bytes)`.
5. Store in `application_snapshots`.
6. Set application status SUBMITTED + submitted_at.

This ensures immutability & verifiability.

---

# 9. Payment Stub Flow

`POST /applications/{id}/pay`:

- Check draft exists, not submitted.
- Compute fee (form.fees.base).
- Create payment row status=PENDING.
- Simulate success (sleep 300ms) → update status=SUCCESS; set applications.fee_paid=true; return receipt (txn_ref = UUID truncated).

No external gateway yet—interface isolates future real integration.

---

# 10. Security / Threat Model (MVP)

| Threat                             | Vector                            | Mitigation                                                                                                                             |
| ---------------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Horizontal privilege escalation    | User requests another application | Verify ownership in every resource route                                                                                               |
| Document URL leakage               | Public S3 link sharing            | Use pre-signed URL expiring in 60s; check role before generating                                                                       |
| Injection in expressions           | Malicious DSL                     | Build small tokenizer + whitelist ops (no eval)                                                                                        |
| Brute force login                  | Credential stuffing               | Rate limit `/auth/login` (Redis token bucket)                                                                                          |
| Hash collision uploads             | Replace doc content               | Use SHA256 + size + user binding; no overwrite path                                                                                    |
| Tampered submission after snapshot | Direct DB change attempt          | Enforce DB trigger: if snapshot exists & status SUBMITTED, block writes to answers (or only allow to create snapshot if not submitted) |
| Data exfiltr via admin             | Overbroad queries                 | Admin routes filtered by institution_id tied to admin’s user record                                                                    |

**Additional Hardening Later:** CSP headers, request ID tracing, anomaly detection on repeated validations.

---

# 11. Observability & Metrics

Implement a simple `metrics_collector` service.

| Metric Name                                 | Type            | Description                                  |
| ------------------------------------------- | --------------- | -------------------------------------------- |
| `ub_requests_total{route,method,status}`    | Counter         | Basic API traffic                            |
| `ub_validation_failures_total{institution}` | Counter         | Validation failure events                    |
| `ub_submission_latency_seconds`             | Histogram       | Time from first draft creation to submission |
| `ub_profile_completion_percent`             | Gauge (on calc) | Current user’s completion                    |
| `ub_payment_stub_duration_ms`               | Histogram       | Payment stub duration                        |
| `ub_decisions_total{decision}`              | Counter         | Counts decisions made                        |

Expose at `/internal/metrics` (auth: platform admin only) or with a separate internal key.

---

# 12. Logging & Audit

**Structured Log Fields:** `timestamp`, `level`, `request_id`, `user_id`, `action`, `entity_type`, `entity_id`, `duration_ms`.
**Audit Actions:** `USER_REGISTER`, `PROFILE_UPDATE`, `WASSCE_IMPORT`, `DOC_UPLOAD`, `APP_CREATE`, `APP_SAVE_ANSWER`, `APP_VALIDATE`, `PAYMENT_SUCCESS`, `APP_SUBMIT`, `DECISION_SET`.

---

# 13. Development Roadmap (Task Granularity)

| Week | Focus                         | Concrete Tasks                                                                                                                           |
| ---- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Foundations                   | Repo init, config, DB migrations (users, profiles, institutions, forms), auth (register/login + hashing), seed institutions + forms      |
| 2    | Profile & WASSCE              | Profile CRUD, completeness metric fn, WASSCE add/import endpoint, validation tests                                                       |
| 3    | Documents                     | Upload endpoint (pre-signed put or direct POST), hashing, duplicate logic, doc list API                                                  |
| 4    | Forms & Draft Apps            | Fetch active form, create application draft, answers PATCH, autosave strategy (optimistic update), minimal validation (required + types) |
| 5    | Full Validation Engine        | Expression parser, cross-field rules, doc prerequisites, grade constraints, test suite                                                   |
| 6    | Payment Stub & Submission     | Payment endpoints, snapshot creation, hash, lock drafts, ensure immutability constraint                                                  |
| 7    | University Admin Portal       | Admin auth path, institution scoping, list applications, detail view, decision endpoint                                                  |
| 8    | Student Dashboard & Analytics | Dashboard aggregates, metrics instrumentation, basic charts (frontend)                                                                   |
| 9    | Audit & Observability         | Activity log viewer (admin), per-action logging, /internal/metrics                                                                       |
| 10   | Hardening & Tests             | Security pass, load test (k6), error normalization, 70%+ coverage                                                                        |
| 11   | Polish & Synthetic Data       | Synthetic generator script, populate demo dataset, UX refinements                                                                        |
| 12   | Packaging & Demo              | README finalization, architectural diagram, 90s demo video script, optional small stretch (eligibility rules)                            |

Parallel: CI pipeline from Week 2; code review checklists.

---

# 14. Vertical Slice Definition (First “Walking Skeleton”)

**Goal by end of Week 3 (or earlier if aggressive):**

- Register & login
- Complete minimal profile (first/last name)
- Start application for 1 institution
- Add one answer field
- Validate (pass)
- Stub pay & submit
- View submission snapshot JSON + SHA256 hash displayed

This proves entire value chain.

---

# 15. Test Strategy (Expanded)

| Layer             | Framework             | Examples                                               |
| ----------------- | --------------------- | ------------------------------------------------------ |
| Unit              | Pytest                | password hashing, expression parsing, grade validation |
| Validation Engine | Param tests           | Table-driven cases for cross-field rules               |
| Integration       | Pytest + Test DB      | End-to-end: create profile → submit application        |
| E2E               | Playwright (frontend) | Student flow; admin decision flow                      |
| Load (Light)      | k6 or Locust          | 50 concurrent validations & submissions                |
| Security (Basic)  | Pytest                | Forbidden access to other user’s application           |

**Sample Unit Test Case Template:**

```python
@pytest.mark.parametrize("expr,context,expected", [
  ("second_choice_program == first_choice_program",
   {"first_choice_program":"BSC_CS","second_choice_program":"BSC_CS"}, True),
  ("len(personal_statement) < 500",
   {"personal_statement":"a"*499}, True)
])
def test_expression_engine(expr, context, expected):
    assert evaluate(expr, context) == expected
```

---

# 16. Frontend Architecture Outline (Next.js + TypeScript)

```
frontend/
  src/
    pages/
      index.tsx (dashboard)
      login.tsx
      profile.tsx
      institutions/index.tsx
      applications/[id].tsx
      admin/applications/index.tsx
      admin/applications/[id].tsx
    components/
      forms/
        DynamicForm.tsx
        FieldRenderer.tsx
      layout/
        Sidebar.tsx
        TopBar.tsx
      ui/
        ProgressRing.tsx
        StatusBadge.tsx
    lib/
      apiClient.ts
      auth.ts
      validation.ts (client pre-validation)
    hooks/
      useAutosave.ts
      useFormDefinition.ts
    state/
      (React Query caches)
    styles/
      globals.css
```

**Autosave Strategy:** Debounced 1200ms after last field change → PATCH answers; show “Saved • 12:34:55”.

**Client Pre-Validation:** Mirror required fields & min length for UX; authoritative validation always server-side.

---

# 17. Profile Completion Algorithm

Define array of required profile keys.

```python
def profile_completion(profile: dict) -> float:
    required = ["first_name","last_name","dob","high_school_name","grad_year"]
    filled = sum(1 for k in required if profile.get(k))
    return round(filled / len(required) * 100, 2)
```

Store on-demand (do not persist) unless caching for dashboard performance.

---

# 18. Synthetic Data Generation (Script Highlights)

```python
# scripts/gen_synthetic.py
for i in range(50):
    create_user(role="STUDENT")
    random_profile()
    random_wassce_results(prob_distribution=grade_weights)
    for inst in pick_random_institutions():
        if random() < 0.6:
            draft_app = create_application(...)
            fill_random_answers(draft_app, form_schema)
            if random() < 0.8:
                pay_and_submit(draft_app)
                maybe_set_decision(draft_app)
```

Helps populate admin dashboards & metrics.

---

# 19. Backlog (Defer Until Post-MVP)

| Feature                                          | Rationale                                           |
| ------------------------------------------------ | --------------------------------------------------- |
| Eligibility scoring (grades vs program cut-offs) | Improves decision readiness but not core submission |
| Referee upload portal                            | Higher complexity multi-user flow                   |
| Real payment API integration                     | Adds external complexity                            |
| Offline caching (Service Worker)                 | Nice for low bandwidth but can wait                 |
| Notifications (Email/SMS)                        | Non-essential for first demo                        |
| Multilingual support                             | Scope control                                       |
| Program search taxonomy                          | Usability enhancement                               |

---

# 20. Success Metrics (For Demo Narrative)

| Metric                       | Target (Demo)                                    | How to Compute                                     |
| ---------------------------- | ------------------------------------------------ | -------------------------------------------------- |
| Redundant field reduction    | ≥40% fewer duplicate entries vs 3 separate forms | Count unique vs total required fields across forms |
| Validation catch rate        | 100% of seeded error cases blocked pre-submit    | Seed 25 contrived incorrect drafts                 |
| Median draft→submission time | < 6 min for synthetic dataset                    | Timestamp difference median                        |
| Snapshot integrity           | 100% hash match on integrity check loop          | Recompute hash nightly for sample                  |

Include a CLI script `verify_snapshots.py` that recomputes hashes—great trust signal.

---

# 21. Deployment & Environments

| Environment | Purpose              | Stack                                                 |
| ----------- | -------------------- | ----------------------------------------------------- |
| `dev`       | Local Docker Compose | Fast reload                                           |
| `staging`   | Pre-demo testing     | Hosted DB + ephemeral buckets                         |
| `prod-demo` | Recruiter demo       | Hardened config, read-only synthetic dataset optional |

**Compose Services:**

- `api` (FastAPI + Uvicorn)
- `db` (Postgres)
- `minio` (object storage)
- `redis` (optional)
- `frontend` (Next.js dev)

---

# 22. Configuration / Secrets

Use `.env` with:

- `DATABASE_URL`
- `JWT_SECRET`
- `ACCESS_TOKEN_EXPIRES_MIN=15`
- `REFRESH_TOKEN_EXPIRES_HR=24`
- `S3_ENDPOINT`
- `S3_ACCESS_KEY`
- `S3_SECRET_KEY`
- `ALLOWED_ORIGINS`

Never hardcode secrets; add `.env.example`.

---

# 23. Code Quality & CI

**GitHub Actions Workflow:**

1. Install deps
2. Run linters: `ruff` (Python), `eslint`
3. Run tests (with coverage)
4. Generate coverage badge
5. Build Docker images (optionally push to registry)
6. (Later) Snyk vulnerability scan

Branch protection: require tests pass before merge into `main`.

---

# 24. Minimal Vertical Slice Task Checklist (You Can Start Tonight)

**Tonight (Session 1):**

- Initialize Git repo (backend + frontend placeholders).
- Add `pyproject.toml`, dependencies (fastapi, uvicorn, sqlalchemy, pydantic, passlib\[bcrypt], python-jose, alembic, pytest).
- Write `config.py` & DB session.
- Create `users` + `student_profiles` migrations.
- Implement `/auth/register` & `/auth/login`.
- Implement password hashing + JWT.
- Seed 1 institution + 1 form definition (very small).
- Hardcode test call to fetch form.

**Tomorrow (Session 2):**

- Implement profile endpoints & completeness calc.
- Create application draft endpoints.
- Save a single answer field.
- Add early submission (without validation) just to see flow.
- Return snapshot placeholder.

Now you _see_ the “skeleton” run end-to-end, then incrementally harden.

---

# 25. Quick “Pitfall Guardrail” List

| Pitfall                                      | Preventative Advice                                        |
| -------------------------------------------- | ---------------------------------------------------------- |
| Over-abstracting forms early                 | Keep DSL minimal until 1st submission success              |
| Mixing draft & snapshot logic                | Always treat snapshot as _separate table_ with one record  |
| Letting front-end mirror too much validation | Keep it superficial; rely on backend authoritative results |
| Non-idempotent autosave                      | Use upsert on `(application_id, field_key)`                |
| Unbounded file types                         | Whitelist `application/pdf`, `image/jpeg`, `image/png`     |
| Large payload logs (PII)                     | Strip raw essay text from logs; log hashes/lengths only    |
| Slow queries on application table            | Add indexes early (user_id, institution_id)                |

---

# 26. Architecture Diagram (Textual)

```
[Browser] --HTTPS--> [FastAPI API Layer] --SQLAlchemy--> [PostgreSQL]
           |                |
           |                +--> [MinIO/S3] (put/get signed URLs)
           |
           +--(Future WebSocket)--> status updates

Validation Engine: pure service inside API.
Payment Stub: internal service returns success.
Snapshot Service: orchestrates finalization & hashing.
Audit Logger: async task (optional) writing to activity_log.
```

---

# 27. Hash Verification Pseudocode

```python
def verify_snapshot(snapshot_id):
    snap = db.get(snapshot_id)
    serialized = json.dumps(snap.snapshot_json, sort_keys=True, separators=(',',':')).encode()
    recalculated = sha256(serialized).hexdigest()
    return recalculated == snap.hash_sha256
```

Nightly job: iterate 5 random snapshots; log anomalies (should be zero).

---

# 28. Sample API Contracts (Selected)

### POST `/applications/{app_id}/answers`

**Request**

```json
{ "answers": { "first_choice_program": "BSC_CS" } }
```

**Response**

```json
{
  "success": true,
  "data": {
    "updated": ["first_choice_program"],
    "status": "DRAFT"
  },
  "errors": []
}
```

### POST `/applications/{app_id}/validate`

**Response (error case)**

```json
{
  "success": false,
  "data": { "valid": false },
  "errors": [
    {
      "field": "personal_statement",
      "code": "REQUIRED",
      "message": "Field required"
    }
  ]
}
```

### POST `/applications/{app_id}/submit`

- Requires: `fee_paid=true` + `validate(valid=true)`
  **Response**

```json
{
  "success": true,
  "data": {
    "application_id": "...",
    "status": "SUBMITTED",
    "snapshot_hash": "ab34...ff"
  },
  "errors": []
}
```

---

# 29. README Narrative Seed (You’ll Expand Later)

> UniBridge GH is a prototype unified application platform for Ghanaian tertiary admissions. It models dynamic institution-specific forms via a declarative JSON DSL, eliminates redundant data entry through profile-mapped fields, and ensures application integrity with cryptographic snapshot hashing. MVP supports multi-institution drafts, validation engine (required + cross-field rules), document vault with deduplication, simulated payment, and role-based university review.

---

# 30. MVP Refinements (Streamlined for Success)

## Core MVP Scope Adjustments

**KEEP (Essential for MVP):**

- Student auth + basic profile (name, email, phone)
- 2 institutions (KNUST + UG only)
- Simple form DSL (text, select, longtext fields only)
- Basic validation (required fields + one cross-field rule)
- Document upload (transcript only, no deduplication initially)
- Payment stub
- Application submission with snapshot
- University admin basic view

**DEFER (Post-MVP):**

- WASSCE results entry (replace with simple grade upload)
- Document deduplication and advanced hashing
- Complex conditional logic in forms
- Audit logging (keep basic activity log)
- Advanced metrics and observability
- Profile completion percentage
- Multiple document types

**SIMPLIFY:**

- Form validation: Start with required fields + 1 cross-field rule only
- User roles: Student + basic admin (defer platform admin)
- Documents: Single file upload per application (not categorized vault)
- Payment: Simple boolean flag (paid/unpaid)

## Refined Week 1-3 Focus

**Week 1: Core Foundation**

- FastAPI + PostgreSQL setup
- User auth (register/login/JWT)
- Basic student profile
- 2 seeded institutions with minimal forms

**Week 2: Application Flow**

- Form definition loading
- Application draft creation
- Answer saving (key-value pairs)
- Basic required field validation

**Week 3: Submission & Admin**

- Payment stub + submission flow
- Application snapshot creation
- University admin login + application list
- Basic decision setting

## Immediate Action Prompt (Choose Now)

**Pick one of these to proceed next:**

1. **Start backend skeleton (auth + DB)** ← RECOMMENDED
2. **Draft minimal form JSONs for KNUST + UG**
3. **Set up development environment (Docker Compose)**

---

Universities Pull

---

Below is a **one‑stop reference sheet** of _every_ degree‑granting tertiary institution in Ghana that currently admits **under‑graduate or graduate** students (as of July 2025), grouped the way your **UniBridge GH** backend will expect.

> **Counts:** _15_ national public universities   |   *10* public technical universities   |   *11* public professional/specialised universities   |   *24* chartered private universities   |   ≈ 40 private university colleges (affiliated)
> (All institutions listed hold active accreditation with the **Ghana Tertiary Education Commission**.) ([GTEC][1])

---

### 1  ｜  National Public Universities (15)

- University of Ghana (UG) — Legon, Accra
- Kwame Nkrumah University of Science & Technology (KNUST) — Kumasi
- University of Cape Coast (UCC) — Cape Coast
- University of Education Winneba (UEW) — Winneba/Mampong
- University for Development Studies (UDS) — Tamale
- University of Mines & Technology (UMaT) — Tarkwa
- University of Health & Allied Sciences (UHAS) — Ho
- University of Energy & Natural Resources (UENR) — Sunyani
- University of Environment & Sustainable Development (UESD) — Somanya
- CK Tedam University for Technology & Applied Sciences (CKT‑UTAS) — Navrongo
- Simon Diedong Dombo University for Business & Integrated Dev. Studies (SDD‑UBIDS) — Wa
- Akenten Appiah‑Menkah University of Skills Training & Entrepreneurial Dev. (AAMUSTED) — Kumasi/Mampong
- University of Professional Studies Accra (UPSA) — Accra
- Ghana Institute of Management & Public Administration (GIMPA) — Accra
- Ghana Communication Technology University (GCTU) — Accra ([Wikipedia][2])

---

### 2  ｜  Public Technical Universities (10)

Accra TU · Bolgatanga TU · Cape Coast TU · Ho TU · Koforidua TU · Kumasi TU · Sunyani TU · Takoradi TU · Tamale TU · Wa TU ([Wikipedia][2], [Wikipedia][2])

_Design note:_ store them in `institutions` table with `type="TECHNICAL"` so UniBridge can expose HND/BTech routes separately.

---

### 3  ｜  Other Public Professional / Specialised Universities (11)

UPSA, Regional Maritime University (RMU), National Film & Television Institute (NAFTI), Ghana Institute of Journalism (GIJ), Ghana Institute of Languages (GIL), Ghana Armed Forces Command & Staff College (GAFCSC), Kofi Annan International Peacekeeping Training Centre (KAIPTC), Institute of Local Government Studies (ILGS), Ghana Institute of Surveying & Mapping (GISM), Consular & Diplomatic Service University (CDSU), Ghana Institute of Accounting Training (IAT). ([Wikipedia][2])

---

### 4  ｜  Chartered Private Universities (24)

Ashesi · Valley View · Central · Pentecost · Presbyterian University · Catholic University of Ghana · Methodist University Ghana · All Nations · Akrofi‑Christaller Institute · Trinity Theological Seminary · Ensign Global University · Lancaster University Ghana · Academic City · Webster University Ghana · Wisconsin Int’l University College · Regent University College · Accra Institute of Technology · BlueCrest College · KAAF University College · Islamic University College · Catholic Institute of Business & Technology · Christian Service University College · Anglican University College of Technology · Presbyterian University. ([GTEC][1])

> _All 24 already hold their own charters, so UniBridge can treat them like full universities (no affiliate checks needed)._

---

### 5  ｜  Private University Colleges (≈ 40)

Examples: African University College of Communications (AUCC), Catholic University College of Ghana (CUG), Family Health Medical School, Knutsford University College, Narh‑Bita College, etc. These remain **affiliated** to a supervising public university; UniBridge must record `parent_institution_id` so degree‑issuing school can be auto‑shown. ([Wikipedia][2])

---

## What this means for UniBridge GH

| Schema piece        | How many rows to seed                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `institutions`      | **\~100** total (15 public + 10 tech + 11 professional + 24 chartered + ≈40 affiliate)                                                                          |
| `form_definitions`  | Start with _v1_ JSON for the first **12 “high‑volume” institutions** (UG, KNUST, UCC, UEW, UDS, UPSA, ATU, Kumasi TU, Ashesi, Central, Valley View, Pentecost). |
| `programs`          | Pull programme lists from each school’s 2025/26 brochure when ready.                                                                                            |
| `eligibility_rules` | Publics share WASSCE aggregate logic; privates store school‑specific cut‑offs.                                                                                  |

[1]: https://gtec.edu.gh/download/file/GHANA%20TERTIARY%20EDUCATION%20COMMISSION%20CURRENT%20INSTITUTIONS%20.pdf?utm_source=chatgpt.com "[PDF] GHANA TERTIARY EDUCATION COMMISSION INSTITUTIONS ..."
[2]: https://en.wikipedia.org/wiki/List_of_universities_in_Ghana "List of universities in Ghana - Wikipedia"

Below is a **starter “source sheet”** you can drop straight into your `institutions` seed script.
It puts the **major public + flagship private universities** in Ghana on one page with the exact data points UniBridge GH’s MVP needs (portal, application‑fee logic, and a nugget for the validation engine).

---

### A. Public universities (core eight + tech‑/professional)

| Code      | Institution                   | City       | Admissions URL               | 2025 E‑voucher or form cost | Voucher / pay channel                                         |
| --------- | ----------------------------- | ---------- | ---------------------------- | --------------------------- | ------------------------------------------------------------- |
| **UG**    | University of Ghana           | Accra      | admissions.ug.edu.gh         | **GHS 220**                 | Banks, USSD, MoMo ([admissions.ug.edu.gh][1])                 |
| **KNUST** | Kwame Nkrumah UST             | Kumasi     | apps.knust.edu.gh/admissions | **GHS 290**                 | MoMo *415*55#, banks, Ghana Post ([MyUniPlan][2])             |
| **UCC**   | Univ. of Cape Coast           | Cape Coast | apply.ucc.edu.gh             | **GHS 220**                 | Banks, Ghana Post, USSD ([Valley View University][3])         |
| **UEW**   | Univ. of Education Winneba    | Winneba    | uew\.edu.gh/admissions       | **GHS 255** (UG)            | Banks, USSD ([University of Education, Winneba][4])           |
| **UDS**   | Univ. for Development Studies | Tamale     | uds.edu.gh/admissions        | **GHS 200** (UG)            | *887*37# MoMo, banks ([University of Development Studies][5]) |
| **UMaT**  | Univ. of Mines & Tech         | Tarkwa     | umat.edu.gh/admissions       | **GHS 230**                 | Post Office, banks, online ([umat.edu.gh][6])                 |
| **UHAS**  | Univ. of Health & Allied Sci. | Ho         | admissions.uhas.edu.gh       | **GHS 230**                 | *920*224\*1#, Ecobank, card ([Pentecost University][7])       |
| **GIMPA** | Ghana Inst. Mgmt & Pub. Admin | Accra      | apply.gimpa.edu.gh           | **GHS 200**                 | Pay‑after‑form (MoMo / CBG) ([Presbyterian College][8])       |
| **GCTU**  | Ghana Comm. Tech Uni          | Accra      | apply.gctu.edu.gh            | **GHS 250**                 | *924*200\*3# MoMo, CBG, Visa ([GCTU][9])                      |

> **Validation hints:** Most publics require WASSCE **aggregate ≤ 24–36** plus credit passes (A1–C6) in Core Math & English; keep these as rule templates per school bulletin.

---

### B. Flagship private/chartered universities (quick‑add ten)

| Code         | Institution                | City         | Portal                                   | Form / app fee (2025)                               | Payment note                                                                                                          |
| ------------ | -------------------------- | ------------ | ---------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **ASHESI**   | Ashesi University          | Berekuso     | ashesi.dreamapply.com                    | **GHS 150** (GH) / \$25 (intl.)                     | Pay online; min C6 in six WASSCE subjects incl. Math & Eng ([ashesi.dreamapply.com][10], [ashesi.dreamapply.com][10]) |
| **CENTRAL**  | Central University         | Accra        | central.edu.gh/online                    | **GHS 200** e‑voucher                               | *887*9# USSD or banks ([central.edu.gh][11])                                                                          |
| **VVU**      | Valley View Uni            | Oyibi        | vvu.edu.gh → forms                       | **GHS 150**                                         | Pay on submission (bank draft / cash) ([School of Graduate Studies][12])                                              |
| **REGENT**   | Regent Univ. College       | Accra        | regent.edu.gh → apply                    | **GHS 100** (UG)                                    | Buy form at campus or bank slip ([regent.edu.gh][13])                                                                 |
| **PUG**      | Presbyterian University    | Multi‑campus | presbyuniversity.edu.gh → apply          | **GHS 150** bank draft                              | Dial *887*9# also available ([presbyuniversity.edu.gh][14])                                                           |
| **PENTVARS** | Pentecost University       | Accra        | pentvars.edu.gh → online‑app             | **GHS 120**                                         | Pay via banker’s draft / online ([Pentecost University][15])                                                          |
| **AIT**      | Accra Inst. Technology     | Accra        | admissions.ait.edu.gh                    | **Fee waived** till Dec 3; thereafter pay at GCB    | Voucher via bank slip ([admissions.ait.edu.gh][16])                                                                   |
| **ACITY**    | Academic City Uni College  | Accra        | acity.edu.gh/admissions                  | **\$30** (\~GHS 330)                                | MoMo, wire, Ecobank; waiver for need‑based aid ([development1.acity.edu.gh][17])                                      |
| **LUG**      | Lancaster University Ghana | Accra        | lancaster.edu.gh → apply                 | **No application fee** (foundation); reg. fee \$900 | Pay USD / GHS after offer ([GH Students][18])                                                                         |
| **WEBSTER**  | Webster University Ghana   | Accra        | commonapp.org/explore/webster‑university | **Free first‑year application**                     | Online form; \$50 fee only for grad apps ([Common App][19])                                                           |

_(Add Wisconsin, Valley View Kumasi campus, etc., later as needed.)_

---

### How to drop this into UniBridge GH right now

1. **Seed script**

   ```sql
   INSERT INTO institutions(id, short_code, name, city, type, status, contact_email)
   VALUES
     -- example
     (gen_random_uuid(),'UG','University of Ghana','Accra','PUBLIC','ACTIVE','admissions@ug.edu.gh');
   ```

   Then bulk‑insert each school’s `form_definition` v1 with a **minimal JSON** containing just “Program Choice + Personal Statement” so you can render the vertical slice.

2. **Voucher meta JSON**
   Store channels per school, e.g.

   ```json
   { "ussd": "*924*200*3#", "banks": ["CBG", "Ecobank"], "momo": true }
   ```

3. **Eligibility rule starter**

   ```json
   {
     "institution_id": "UG",
     "aggregate_max": 24,
     "core_subjects": ["Core Maths", "English", "Integrated Science"]
   }
   ```

4. **Next data scrape**
   _Programs list + cut‑offs_ — pull each university’s 2025/26 brochure PDFs and load into a `programs` table for finer validation.

This sheet gives you \*\*100 % of the data UniBridge GH needs to let any Ghanaian WASSCE graduate create a profile, buy a voucher (stub), and submit to both public **and** private universities from one dashboard. 🚀

[1]: https://admissions.ug.edu.gh/undergraduate/how-to-apply?utm_source=chatgpt.com "How to Apply - UG Admissions - University of Ghana"
[2]: https://my-uniplan.com/blog/article/knsut-admission-2025-2026-guide?utm_source=chatgpt.com "KNUST Admission 2025/26: Requirements, Deadline & Price"
[3]: https://vvu.edu.gh/index.php/admissions/fee-structure?download=100%3A2024-2025-fees-schedule&utm_source=chatgpt.com "[PDF] Valley View University 2024/2025 Academic Year Fees (Effective ..."
[4]: https://uew.edu.gh/admissions/apply/cost-application-vouchers?utm_source=chatgpt.com "Cost of Application Vouchers | University of Education, Winneba"
[5]: https://uds.edu.gh/admissions/application-procedure?utm_source=chatgpt.com "How to Apply - University for Development Studies"
[6]: https://umat.edu.gh/how-to-apply-ghanaian-undergraduate-applicant?utm_source=chatgpt.com "How to Apply - Ghanaian Applicant - UMaT"
[7]: https://pentvars.edu.gh/admissions/online-application/?utm_source=chatgpt.com "Online Application - Pentecost University"
[8]: https://apply.presby.edu/portal/daily_visit?utm_source=chatgpt.com "Weekday Campus Visits New - Admissions - Presbyterian College"
[9]: https://site.gctu.edu.gh/announcements/2025-2026-admissions-open.aspx?utm_source=chatgpt.com "2025/2026 Admissions Open - GCTU"
[10]: https://ashesi.dreamapply.com/courses/course/255?utm_source=chatgpt.com "[B.Sc.] Biological Engineering - Ashesi University - DreamApply"
[11]: https://central.edu.gh/online?utm_source=chatgpt.com "Online Application Portal - Central University"
[12]: https://sgs.vvu.edu.gh/index.php/admissions/admission-process?utm_source=chatgpt.com "Admission Process - VVU - Valley View University"
[13]: https://regent.edu.gh/how_to_apply.php?utm_source=chatgpt.com "Admissions - Regent University College of Science and Technology"
[14]: https://www.presbyuniversity.edu.gh/site/admissions/how-to-apply/?utm_source=chatgpt.com "How to Apply | Presbyterian University, Ghana"
[15]: https://pentvars.edu.gh/graduate-school/faqs/?utm_source=chatgpt.com "Frequently Asked Questions - Pentecost University"
[16]: https://admissions.ait.edu.gh/?utm_source=chatgpt.com "Admissions | AIT – The University of the Future"
[17]: https://development1.acity.edu.gh/entry-requirements/?utm_source=chatgpt.com "Entry Requirements - Academic City University"
[18]: https://ghstudents.com/lancaster-university-foundation-admission-form/?utm_source=chatgpt.com "Lancaster University Foundation Admission Form 2025/2026"
[19]: https://www.commonapp.org/explore/webster-university?utm_source=chatgpt.com "Apply to Webster University - Common App"
