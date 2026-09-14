// Evidence-grounded AI Query & RAG Knowledge Retrieval Records
export const MOCK_AI_QUERIES = [
  {
    id: "q-01",
    query: "What changes are visible in Moonidih deep seam water table and sandstone permeability between 2022 and 2026?",
    category: "Hydrogeological Anomaly",
    timestamp: "Today at 10:14 AM",
    answer: "Based on verified statutory hydrogeological filings for Moonidih Deep Shaft Colliery (BCCL), hydrostatic pressure and sandstone aquifer ingress have shown noticeable intensification between FY 2022 and FY 2026:\n\n1. Inflow Rate: Total water inflow into the Seam XVI bottom sump rose from an average of 690 m³/hr in March 2022 to 920 m³/hr in February 2026 (+33.3% cumulative surge).\n2. Permeability Coefficient: Core test records from infill borehole BH-MND-48 demonstrate an effective permeability increase from 1.15 x 10^-5 m/s to 1.40 x 10^-5 m/s in the overlying basal Barakar sandstone member, primarily attributed to joint opening induced by longwall extraction in adjacent Panel L-3.\n3. Water Table Piezometric Head: Surface piezometers P-03 and P-07 recorded a localized head drawdown of 14.2 meters, indicating sustained drainage into the underground voids.",
    keyFindings: [
      "Inflow surge of +33.3% (690 m³/hr in 2022 → 920 m³/hr in 2026).",
      "Permeability expansion from 1.15 × 10⁻⁵ to 1.40 × 10⁻⁵ m/s.",
      "14.2m localized piezometric drawdown around shaft perimeter."
    ],
    confidenceScore: "98.4%",
    evidenceStatus: "Fully Grounded (3 Verified Citations)",
    sources: [
      {
        documentName: "CMPDI-RI-2025-GEO-048",
        documentTitle: "Detailed Geological & Geotechnical Report for Deep Seam Expansion",
        page: "Page 42",
        section: "Section 4.3 — Hydrogeological Strata Discharge",
        snippet: "Measured inflow at 550m level increased from 690 m³/hr to 920 m³/hr following intersection of joint set J-3. Permeability coefficient k = 1.4 x 10^-5 m/s."
      },
      {
        documentName: "BCCL_MND_Hydro_Annual_2022.pdf",
        documentTitle: "Moonidih Annual Piezometric Baseline Survey (2022)",
        page: "Page 16",
        section: "Table 2.1 — Piezometer Historical Head Readings",
        snippet: "Baseline hydraulic head at P-03 logged at +118.4m MSL; steady sump discharge logged at 690 m³/hr."
      },
      {
        documentName: "CMPDI_RI2_Core_Permeability_Logs.pdf",
        documentTitle: "Laboratory Rock Mechanics & Permeability Core Test Series",
        page: "Page 88",
        section: "Annexure B — Core Hydrology Results",
        snippet: "Specimen BH-MND-48-CS6: High secondary fracture permeability with clear sandstone-shale interface dilation."
      }
    ]
  },
  {
    id: "q-02",
    query: "Summarize geotechnical highwall slope stability warnings across Gevra and Dipka opencast mines.",
    category: "Geotechnical Slope Stability",
    timestamp: "Yesterday at 03:45 PM",
    answer: "Cross-mine geotechnical surveillance for Korba Coalfield opencast operations (SECL) indicates elevated caution along specific dump sectors:\n\n1. Gevra Megaproject: Radar interferometry and prism surveys show continuous horizontal displacement of 4.2 mm/week on Overburden Dump #4 (NE crest). The calculated Factor of Safety (FoS) has declined from 1.35 to 1.21 along cross-section CS-14 following basal contact moisture saturation.\n2. Dipka OCP: Lilagar river perimeter flood bund settlement has reached 12 mm over a 6-month observation window. While the current Factor of Safety (1.45) satisfies DGMS statutory norms, Western desiltation basin silt accumulation requires immediate dredging to prevent flood cresting.",
    keyFindings: [
      "Gevra Dump #4 FoS declined to 1.21 (threshold is 1.30); horizontal displacement at 4.2 mm/week.",
      "Dipka river embankment FoS remains acceptable at 1.45 but silt dredging is overdue."
    ],
    confidenceScore: "95.6%",
    evidenceStatus: "Fully Grounded (2 Verified Citations)",
    sources: [
      {
        documentName: "SECL-GEVRA-2024-Q4",
        documentTitle: "Geotechnical Slope Stability & Overburden Failure Risk Evaluation",
        page: "Page 78",
        section: "Section 6.2 — Displacement Vector Profiling",
        snippet: "Factor of Safety (FoS) dropped from baseline 1.35 to 1.21 along section CS-14. Basal soft shale horizon shows slickenside slicking."
      },
      {
        documentName: "SECL_DPK_Embankment_Audit_2025.pdf",
        documentTitle: "Lilagar Embankment Geotechnical Survey (Dipka)",
        page: "Page 22",
        section: "Section 3.4 — River Bund Stability Analysis",
        snippet: "Piezometer P-09 reflects steady seepage gradient within permissible factor of safety (1.45)."
      }
    ]
  },
  {
    id: "q-03",
    query: "Are there unmapped fault displacements or missing borehole records in Rajrappa expansion sector?",
    category: "Exploration Integrity",
    timestamp: "Feb 21, 2026",
    answer: "Yes. An audit of CMPDI Central Coalfields exploration records indicates an active data gap along Fault F-2 in the southern expansion sector of Rajrappa OCP:\n\n1. A 1.4-kilometer corridor between boreholes BH-104 and BH-112 exhibits average drill spacing greater than 420 meters, which violates CMPDI's mandatory 200-meter grid standard for complex faulted terrain.\n2. Inferred vertical displacement across Fault F-2 ranges between 6 meters and 18 meters with undetermined roof shale competence.\n3. The statutory reserve re-estimation has flagged these reserves under 'Indicated' rather than 'Measured' category until confirmatory drilling is executed.",
    keyFindings: [
      "1.4 km corridor lacks standard 200m borehole density.",
      "Fault F-2 displacement varies by up to 12m without core verification.",
      "Reserves downgraded to 'Indicated' until 6 confirmatory boreholes are drilled."
    ],
    confidenceScore: "93.1%",
    evidenceStatus: "Verified with Geological Caveat",
    sources: [
      {
        documentName: "CCL-RAJ-2025-STAT",
        documentTitle: "Annual Coal Reserve Re-estimation & Stripping Ratio Review",
        page: "Page 51",
        section: "Figure 4.1 — Borehole Spacing Grid",
        snippet: "Interpolation between BH-104 and BH-112 shows unverified seam offset ranging from 6m to 18m with indeterminate roof shale thickness."
      }
    ]
  }
];

export const MOCK_HISTORICAL_COMPARISON = {
  mineName: "Rajrappa Open Cast Project",
  subsidiary: "CCL (Central Coalfields Limited)",
  comparisonYears: [2022, 2026],
  metrics: [
    {
      metric: "Annual Coal Production",
      unit: "MTPA",
      y2022: 2.8,
      y2026: 3.2,
      delta: "+14.3%",
      status: "positive",
      analysis: "Increased throughput achieved via continuous surface miner deployment in Seam Kargali."
    },
    {
      metric: "Composite Stripping Ratio",
      unit: "OB m³ / Coal Tonne",
      y2022: "1:3.9",
      y2026: "1:4.8",
      delta: "+23.1% (Unfavorable)",
      status: "negative",
      analysis: "Deepening pit geometry and 12° steepening dip in South Block required additional bench cutting."
    },
    {
      metric: "Average Seam Thickness (Kargali)",
      unit: "meters",
      y2022: 12.4,
      y2026: 11.2,
      delta: "-9.7%",
      status: "warning",
      analysis: "Seam splitting into Upper and Lower bands separated by 1.8m sandstone parting."
    },
    {
      metric: "Water Inflow Pumping Rate",
      unit: "m³/hr",
      y2022: 240,
      y2026: 310,
      delta: "+29.2%",
      status: "warning",
      analysis: "Pit floor intersected sub-artesian fault zone near Damodar river terrace."
    },
    {
      metric: "Factor of Safety (Highwall)",
      unit: "FoS",
      y2022: 1.52,
      y2026: 1.38,
      delta: "-9.2%",
      status: "neutral",
      analysis: "Remains above DGMS statutory limit (1.30) but warrants radar monitoring during monsoon."
    },
    {
      metric: "Total Borehole Records Indexed",
      unit: "Boreholes",
      y2022: 48,
      y2026: 84,
      delta: "+75.0%",
      status: "positive",
      analysis: "Digitization and infill drilling added 36 newly validated drill logs into CMPDI repository."
    }
  ]
};
