// ─────────────────────────────────────────────────
// LINEAGE — Mock Data & Persona Definitions
// All data shapes match expected backend API responses.
// ─────────────────────────────────────────────────

export const USERS = {
  sponsor: {
    id: 'u-001',
    name: 'Research Sponsor',
    email: 'sponsor@lineage.dev',
    role: 'sponsor',
    organization: 'HealthTech India Foundation',
    avatar_color: '#192744',
  },
  expert: {
    id: 'u-002',
    name: 'Dr. Meera',
    email: 'expert@lineage.dev',
    role: 'expert',
    specialization: 'Computer Vision / Edge AI',
    avatar_color: '#0066ff',
  },
  studentA: {
    id: 'u-003',
    name: 'Aarav',
    email: 'student@lineage.dev',
    role: 'student',
    age: 19,
    skills: ['Python', 'Machine Learning', 'Computer Vision'],
    avatar_color: '#00c9a7',
  },
  studentB: {
    id: 'u-004',
    name: 'Riya',
    email: 'studentb@lineage.dev',
    role: 'student',
    skills: ['Python', 'Data Science'],
    avatar_color: '#d97706',
  },
  studentC: {
    id: 'u-005',
    name: 'Kabir',
    email: 'studentc@lineage.dev',
    role: 'student',
    skills: ['Edge AI', 'Model Optimization'],
    avatar_color: '#8b5cf6',
  },
  admin: {
    id: 'u-006',
    name: 'Neha Gupta',
    email: 'admin@lineage.dev',
    role: 'admin',
    avatar_color: '#b91c1c',
  },
};

export const PROJECT = {
  id: 'p-001',
  title: 'Low-cost detection of diabetic retinopathy from fundus images on edge devices',
  sponsor: USERS.sponsor,
  status: 'ACTIVE',
  budget: 100000,
  currency: '₹',
  category: 'Medical AI',
  domain: 'Healthcare / Computer Vision',
  integrity_status: 'VERIFIED',
  created_at: '2026-09-15T10:00:00Z',
  public_summary:
    'We are looking for a research team to explore an affordable edge-based approach for detecting diabetic retinopathy from retinal fundus images in rural healthcare settings.',
  confidential_brief:
    'Clinical dataset parameters: 15,000 raw anonymized fundus images provided by HealthTech India Foundation. Quantization targets: TensorFlow Lite on Raspberry Pi 4.',
  journey: [
    { key: 'posted', label: 'POSTED', status: 'done', date: '2026-09-15' },
    { key: 'matched', label: 'MATCHED', status: 'done', date: '2026-09-18' },
    { key: 'charter', label: 'CHARTER ACCEPTED', status: 'done', date: '2026-09-20' },
    { key: 'funded', label: 'FUNDED', status: 'done', date: '2026-09-20' },
    { key: 'working', label: 'WORKING', status: 'current', date: '2026-10-01' },
    { key: 'review', label: 'REVIEW', status: 'upcoming', date: null },
    { key: 'accepted', label: 'ACCEPTED', status: 'upcoming', date: null },
  ],
};

export const MILESTONES = [
  {
    id: 'm-001',
    order: 1,
    title: 'Dataset Preparation',
    description: 'Prepare, clean, and augment retinal fundus image dataset. Establish quality metrics.',
    deliverable: 'Cleaned dataset + preprocessing report',
    owner: USERS.studentA,
    skills: ['Python', 'Pandas', 'Computer Vision'],
    status: 'in_progress',
    progress: 80,
    review: 'pending',
    credit: '₹25,000',
    ai_generated: true,
  },
  {
    id: 'm-002',
    order: 2,
    title: 'Model Development',
    description: 'Develop and evaluate lightweight CNN classification model targeting >90% accuracy.',
    deliverable: 'Trained model + evaluation report',
    owner: USERS.studentA,
    skills: ['Python', 'Machine Learning', 'Model Evaluation'],
    status: 'upcoming',
    progress: 0,
    review: null,
    credit: '₹40,000',
    ai_generated: true,
  },
  {
    id: 'm-003',
    order: 3,
    title: 'Edge Deployment',
    description: 'Optimize model for edge devices using quantization. Deploy on Raspberry Pi 4.',
    deliverable: 'Edge deployment package + benchmark report',
    owner: USERS.studentC,
    skills: ['Edge AI', 'Model Optimization'],
    status: 'upcoming',
    progress: 0,
    review: null,
    credit: '₹35,000',
    ai_generated: true,
  },
];

export const CHARTER = {
  id: 'ch-001',
  version: '1.0',
  status: 'Published — Applications Open',
  sections: {
    scope:
      'Develop and deploy an edge-optimized deep learning model for diabetic retinopathy detection from fundus images. The system must achieve >90% accuracy while running on low-cost hardware (<₹5,000 per device).',
    milestones:
      '3 milestones defined via AI-assisted scoping and approved by sponsor. Each milestone has clear deliverables, acceptance criteria, and allocated budget.',
    ai_usage:
      'AI agents may be used for code generation, literature review, and experiment design. All AI usage must be declared. AI outputs must be reviewed by a human before submission. The Project AI Gateway controls data access.',
    confidentiality:
      'Project confidential brief is accessible only to accepted team members. Each member receives a watermarked variant. Leak tracing is enabled.',
    credit:
      'Credit is allocated based on accepted contributions that survive into final artifacts. Impact scores are assigned during review. Credit percentages are calculated from the ledger.',
    payment:
      'Budget is held in escrow. Released per milestone upon acceptance. Distribution follows credit allocation.',
    dispute:
      'Disputes can be raised by any team member. Resolution follows a structured process: claim → evidence → context → decision by admin.',
  },
  accepted_by: [
    { user: USERS.sponsor, date: '2026-09-20T08:00:00Z' },
    { user: USERS.expert, date: '2026-09-20T09:15:00Z' },
    { user: USERS.studentA, date: '2026-10-06T10:42:00Z' },
  ],
};

export const MATCHING = [
  {
    user: USERS.studentA,
    match_score: 92,
    fit: 'Excellent',
    skills_matched: ['Python', 'Machine Learning', 'Computer Vision'],
    reason: 'Strong alignment with Dataset Preparation and Model Development because the candidate has experience with image classification and Python.',
    coi_status: 'clear',
    coi_detail: 'No conflict detected ✓',
    experience: '2 years computer vision research, 4 OpenCV/PyTorch projects',
    availability: 'Full-time (25 hrs/week)',
  },
  {
    user: USERS.studentB,
    match_score: 86,
    fit: 'Strong',
    skills_matched: ['Python', 'Data Science'],
    reason: 'Strong Python and ML background, but limited edge deployment experience.',
    coi_status: 'clear',
    coi_detail: 'No conflict detected ✓',
    experience: '1.5 years data engineering, Pandas & data cleaning specialist',
    availability: 'Part-time (15 hrs/week)',
  },
  {
    user: USERS.studentC,
    match_score: 81,
    fit: 'Strong',
    skills_matched: ['Edge AI', 'Model Optimization'],
    reason: 'Edge AI specialization critical for Milestone 3 deployment.',
    coi_status: 'flagged',
    coi_detail: '⚠ Previous collaboration detected — joint lab project in 2025.',
    experience: '1 year embedded ML, Raspberry Pi & TensorRT deployment',
    availability: 'Part-time (12 hrs/week)',
  },
  {
    user: USERS.expert,
    match_score: 89,
    fit: 'Expert Oversight',
    skills_matched: ['Computer Vision', 'Edge AI'],
    reason: 'Relevant experience in computer vision and edge AI medical imaging.',
    coi_status: 'clear',
    coi_detail: 'No conflict detected ✓',
    experience: 'Associate Professor, 12 published papers in medical imaging',
    availability: 'Advisory (5 hrs/week)',
  },
];

export const CONTRIBUTIONS = [
  {
    id: 'C-104',
    contributor: USERS.studentA,
    artifact: 'Preprocessing Report',
    file_name: 'preprocessing_report.pdf',
    milestone: MILESTONES[0],
    submitted_at: '2026-10-06T10:42:00Z',
    ai_assisted: true,
    ai_receipt_id: 'AIR-0042',
    hash: '19AC4D7E8F0A1B2C3D4E5F6A7B8C9D0E1F2A3B4C',
    status: 'flagged',
    similarity_score: 78,
    similarity_detail: 'Potential overlap detected with existing published architecture. Human review required.',
    reviewed_by: USERS.expert,
  },
  {
    id: 'C-101',
    contributor: USERS.studentA,
    artifact: 'Data Augmentation Pipeline',
    file_name: 'augmentation.py',
    milestone: MILESTONES[0],
    submitted_at: '2026-09-25T14:30:00Z',
    ai_assisted: false,
    ai_receipt_id: null,
    hash: '8F2A9B1C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A',
    status: 'accepted',
    similarity_score: 12,
    reviewed_by: USERS.expert,
    impact_score: 8.5,
  },
];

export const LEDGER_ENTRIES = [
  {
    entry: 104,
    actor: USERS.studentA,
    action: 'Contribution Submitted',
    artifact: 'Preprocessing Report',
    timestamp: '10:44 AM',
    prev_hash: '8F2A9B1C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A',
    curr_hash: '19AC4D7E8F0A1B2C3D4E5F6A7B8C9D0E1F2A3B4C',
    status: 'VERIFIED',
  },
  {
    entry: 105,
    actor: USERS.expert,
    action: 'Contribution Reviewed',
    artifact: 'Preprocessing Report (Accepted)',
    timestamp: '11:12 AM',
    prev_hash: '19AC4D7E8F0A1B2C3D4E5F6A7B8C9D0E1F2A3B4C',
    curr_hash: '5B7E8F0A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E',
    status: 'VERIFIED',
  },
];

export const AI_AGENT = {
  name: 'Research Assistant',
  purpose: 'Analyze project documentation and assist with research tasks.',
  human_owner: USERS.studentA,
  project: PROJECT,
  access: 'Project documents only',
  sensitive_data: 'Redacted',
  status: 'AUTHORIZED',
  receipt_id: 'AIR-0042',
};

export const AI_TIMELINE_EVENTS = [
  { time: '10:42 AM', title: 'Aarav authorized AI action', detail: 'Requested analysis of dataset documentation' },
  { time: '10:43 AM', title: 'Sensitive information redacted', detail: '2 sponsor API credentials removed from context' },
  { time: '10:44 AM', title: 'AI agent processed project document', detail: 'Research Assistant generated summary' },
  { time: '10:44 AM', title: 'AI receipt generated', detail: 'Receipt AIR-0042 logged' },
];

export const WATERMARK_DATA = {
  document: 'Confidential Project Brief — DR Detection',
  recipients: [
    { user: USERS.expert, variant: 'Variant 01', markers: 7, status: 'intact' },
    { user: USERS.studentA, variant: 'Variant 04', markers: 7, status: 'suspected_leak' },
    { user: USERS.studentC, variant: 'Variant 06', markers: 7, status: 'intact' },
  ],
  suspected_leak: {
    matched_markers: 3,
    total_markers: 7,
    possible_source: 'Variant 04 — Aarav',
    confidence: 'Evidence only — requires human review',
    found_in: 'External forum post (reported 2026-10-03)',
  },
};

export const COI_CHECKS = [
  {
    reviewer: USERS.expert,
    subject: USERS.studentA,
    relationship: null,
    status: 'clear',
  },
  {
    reviewer: USERS.expert,
    subject: USERS.studentC,
    relationship: 'Previous collaboration — joint lab project in 2025',
    status: 'flagged',
    resolution: null,
  },
];

export const ESCROW = {
  project: PROJECT,
  total: 100000,
  funded: 100000,
  released: 25000,
  remaining: 75000,
  currency: '₹',
  status: 'funded',
  milestones: [
    {
      milestone: MILESTONES[0],
      amount: 25000,
      status: 'released',
      distribution: [
        { user: USERS.studentA, pct: 50, amount: 12500, reason: 'Accepted contribution C-104 — primary implementer' },
        { user: USERS.studentB, pct: 30, amount: 7500, reason: 'Accepted contribution — data cleaning' },
        { user: USERS.expert, pct: 20, amount: 5000, reason: 'Methodology review & peer evaluation' },
      ],
    },
    { milestone: MILESTONES[1], amount: 40000, status: 'funded', distribution: null },
    { milestone: MILESTONES[2], amount: 35000, status: 'funded', distribution: null },
  ],
};

export const REVIEW_QUEUE = [
  {
    id: 'rq-001',
    type: 'similarity',
    title: 'Similarity Flag',
    subtitle: 'Project: DR Detection · Aarav (78%)',
    contribution: CONTRIBUTIONS[0],
    severity: 'high',
    raised_at: '2026-10-06T10:44:00Z',
    status: 'Pending',
  },
  {
    id: 'rq-002',
    type: 'coi',
    title: 'COI Flag',
    subtitle: 'Expert: Dr. Meera ↔ Kabir · Joint lab project',
    data: COI_CHECKS[1],
    severity: 'medium',
    raised_at: '2026-09-19T08:00:00Z',
    status: 'Review Required',
  },
  {
    id: 'rq-003',
    type: 'ledger',
    title: 'Ledger Alert',
    subtitle: 'Entry #104 · Hash chain verification state',
    severity: 'high',
    raised_at: '2026-10-06T11:00:00Z',
    status: 'Verification Failed',
  },
  {
    id: 'rq-004',
    type: 'dispute',
    title: 'Charter Dispute',
    subtitle: 'Credit allocation dispute — Milestone 1',
    severity: 'low',
    raised_at: '2026-10-04T09:00:00Z',
    status: 'Pending',
  },
];

export const TRUST_OVERVIEW = {
  access_control: {
    status: 'verified',
    label: 'Access permissions enforced for all team members',
    last_event: 'Confidential brief access granted to 3 members — 2026-09-20',
  },
  watermarking: {
    status: 'alert',
    label: '1 suspected leak under investigation',
    last_event: '3 document markers matched to Variant 04 — 2026-10-03',
  },
  similarity: {
    status: 'review',
    label: '1 submission flagged for human review',
    last_event: 'Preprocessing Report — 78% similarity detected — 2026-10-06',
  },
  coi: {
    status: 'review',
    label: '1 potential conflict of interest flagged',
    last_event: 'Dr. Meera ↔ Kabir — joint lab project — 2026-09-19',
  },
  ledger: {
    status: 'verified',
    label: 'Hash chain intact — 2 entries verified',
    last_event: 'Last verification: 2026-10-06T11:12:00Z',
  },
};

export const PROVENANCE_STAGES = [
  {
    id: 'access',
    title: 'ACCESS',
    question: 'Who could see the information?',
    desc: 'Confidential brief locked to accepted members under watermarked variant tracing.',
  },
  {
    id: 'contribution',
    title: 'CONTRIBUTION',
    question: 'Who created the work?',
    desc: 'Every submitted artifact is attributed to a named human author with SHA-256 hash.',
  },
  {
    id: 'ai_action',
    title: 'AI ACTION',
    question: 'Which AI action was authorized?',
    desc: 'AI agents act under human owner receipts. Sensitive data is automatically redacted.',
  },
  {
    id: 'review',
    title: 'REVIEW',
    question: 'Who accepted the work?',
    desc: 'Automated similarity signals flag potential overlap for mandatory expert human review.',
  },
  {
    id: 'ledger',
    title: 'LEDGER',
    question: 'Can the history be verified?',
    desc: 'Cryptographic hash chain prevents silent history rewrites. Corrections create new records.',
  },
];

export const DASHBOARD_RECENT_ACTIVITY = [
  { time: '10:42 AM', event: 'Contribution submitted', detail: 'Preprocessing Report by Aarav' },
  { time: '10:44 AM', event: 'Integrity check completed', detail: 'Similarity score 78% — Human review required' },
  { time: '10:46 AM', event: 'AI action authorized', detail: 'Aarav authorized Research Assistant (AIR-0042)' },
  { time: '10:48 AM', event: 'Contribution accepted', detail: 'Dr. Meera approved Milestone 1 artifact' },
];

export const NON_MONETARY_CREDENTIAL = {
  id: 'LIN-2026-104',
  recipient: USERS.studentA,
  title: 'Research Contribution — Medical Image Preprocessing',
  project_title: 'Medical Image Research Pipeline',
  completed_milestone: 'Dataset Preparation',
  issued_by: 'LINEAGE',
  issued_at: '2026-10-06T11:00:00Z',
  hash: '19AC4D7E8F0A1B2C3D4E5F6A7B8C9D0E1F2A3B4C',
};
