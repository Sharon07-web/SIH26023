// Ingestion, Parsing, Extraction, and Audit Stream Activity
export const MOCK_ACTIVITIES = [
  {
    id: "act-101",
    timestamp: "10 mins ago",
    type: "EXTRACTION",
    title: "Borehole Stratigraphy Extracted",
    description: "Extracted 142 lithological borehole logs and coal seam horizons from CMPDI_Borehole_Block_IV.pdf (Confidence: 98.4%)",
    subsidiary: "CCL",
    mine: "Rajrappa OCP",
    badge: "Processed",
    badgeColor: "emerald"
  },
  {
    id: "act-102",
    timestamp: "24 mins ago",
    type: "RISK_ALERT",
    title: "Hydrogeological Anomaly Flagged",
    description: "Risk Screening Engine flagged +32% water table inflow surge in Moonidih Lower Barakar Sandstone aquifer.",
    subsidiary: "BCCL",
    mine: "Moonidih Colliery",
    badge: "High Risk",
    badgeColor: "rose"
  },
  {
    id: "act-103",
    timestamp: "1 hour ago",
    type: "VALIDATION",
    title: "Volumetric Discrepancy Detected",
    description: "Rule-based validator detected 14.8% divergence between monthly drone LiDAR void excavation and weighbridge records.",
    subsidiary: "ECL",
    mine: "Sonepur Bazari",
    badge: "Needs Review",
    badgeColor: "amber"
  },
  {
    id: "act-104",
    timestamp: "2 hours ago",
    type: "INDEXING",
    title: "Knowledge Base Vectorized",
    description: "Parsed, chunked, and indexed 114 pages of SECL_Geotech_Survey_Q4.pdf into pgvector semantic knowledge index.",
    subsidiary: "SECL",
    mine: "Gevra Megaproject",
    badge: "Indexed",
    badgeColor: "blue"
  },
  {
    id: "act-105",
    timestamp: "3 hours ago",
    type: "REVIEW",
    title: "Statutory Report Certified",
    description: "Chief Mining Geologist Dr. A. K. Banerjee reviewed and digitally certified CMPDI-RI-2025-GEO-048.",
    subsidiary: "BCCL",
    mine: "Moonidih Colliery",
    badge: "Certified",
    badgeColor: "emerald"
  },
  {
    id: "act-106",
    timestamp: "5 hours ago",
    type: "INGESTION",
    title: "Batch Document Ingestion",
    description: "Ingested 18 historical exploration files (1982-2005) from CMPDI Regional Institute-II digitization drive.",
    subsidiary: "NCL",
    mine: "Jayant OCP",
    badge: "Completed",
    badgeColor: "slate"
  }
];

export const MOCK_UPLOADED_FILES = [
  {
    id: "file-01",
    name: "CMPDI_RI2_Borehole_Lithology_Block4.pdf",
    type: "PDF (Scanned & OCR)",
    size: "18.4 MB",
    status: "Processed",
    uploadedOn: "2026-02-24 09:15",
    extractedRecords: 142,
    validationStatus: "Passed (100%)",
    category: "Geological Log"
  },
  {
    id: "file-02",
    name: "Jayant_Overburden_Stripping_Ledger_2025.xlsx",
    type: "XLSX (Spreadsheet)",
    size: "4.2 MB",
    status: "Processed",
    uploadedOn: "2026-02-23 16:40",
    extractedRecords: 864,
    validationStatus: "Passed (99.2%)",
    category: "Production Data"
  },
  {
    id: "file-03",
    name: "Gevra_NE_Slope_InSAR_Displacement_Data.csv",
    type: "CSV (Telemetry)",
    size: "1.8 MB",
    status: "Processed",
    uploadedOn: "2026-02-23 11:20",
    extractedRecords: 4200,
    validationStatus: "Passed with Warnings",
    category: "Geotechnical Radar"
  },
  {
    id: "file-04",
    name: "Moonidih_Shaft2_Hydrogeology_Report_Draft.docx",
    type: "DOCX (Technical Report)",
    size: "9.6 MB",
    status: "Needs Review",
    uploadedOn: "2026-02-22 14:05",
    extractedRecords: 38,
    validationStatus: "Needs Manual Review",
    category: "Statutory Filing"
  },
  {
    id: "file-05",
    name: "Jharia_Fire_Zone_Drone_Thermography.pdf",
    type: "PDF (Multispectral)",
    size: "34.1 MB",
    status: "Processing",
    uploadedOn: "2026-02-24 11:30",
    extractedRecords: 19,
    validationStatus: "In Progress (72%)",
    category: "Safety Survey"
  }
];
