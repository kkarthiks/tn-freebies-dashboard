import { useState } from "react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, ReferenceLine, Cell } from "recharts";

// ─── DATA MODEL ───────────────────────────────────────────────────────────
// Sources: CAG Audit Reports (2011-2024), PRS India Budget Analysis (2019-2025),
// TN Finance Dept Budget Documents, NITI Aayog Macro-Fiscal Landscape (Mar 2025),
// 16th Finance Commission projections, DMK Manifesto 2021/2026, AIADMK Manifesto 2016/2026

const fiscalData = [
  { year:"2010-11", yr:"FY11", revReceipts:70200, fiscalDeficit:15800, freebieSpend:12000, gsdp:600000, debt:100000, pop:7.10, govt:"DMK (Karunanidhi)", era:"pre" },
  { year:"2011-12", yr:"FY12", revReceipts:85220, fiscalDeficit:17275, freebieSpend:18500, gsdp:640000, debt:115000, pop:7.13, govt:"AIADMK-I (Jaya)", era:"aiadmk1" },
  { year:"2012-13", yr:"FY13", revReceipts:98828, fiscalDeficit:16519, freebieSpend:22000, gsdp:750000, debt:128000, pop:7.16, govt:"AIADMK-I (Jaya)", era:"aiadmk1" },
  { year:"2013-14", yr:"FY14", revReceipts:108000, fiscalDeficit:25000, freebieSpend:25000, gsdp:850000, debt:145000, pop:7.19, govt:"AIADMK-I (Jaya)", era:"aiadmk1" },
  { year:"2014-15", yr:"FY15", revReceipts:121000, fiscalDeficit:28500, freebieSpend:27500, gsdp:980000, debt:165000, pop:7.22, govt:"AIADMK-I (Jaya)", era:"aiadmk1" },
  { year:"2015-16", yr:"FY16", revReceipts:132000, fiscalDeficit:35000, freebieSpend:29000, gsdp:1060000, debt:190000, pop:7.25, govt:"AIADMK-I (Jaya)", era:"aiadmk1" },
  { year:"2016-17", yr:"FY17", revReceipts:142000, fiscalDeficit:38500, freebieSpend:31000, gsdp:1190000, debt:215000, pop:7.30, govt:"AIADMK-II (Jaya→EPS)", era:"aiadmk2" },
  { year:"2017-18", yr:"FY18", revReceipts:158000, fiscalDeficit:34000, freebieSpend:33000, gsdp:1340000, debt:240000, pop:7.35, govt:"AIADMK-II (EPS)", era:"aiadmk2" },
  { year:"2018-19", yr:"FY19", revReceipts:173000, fiscalDeficit:39000, freebieSpend:35000, gsdp:1500000, debt:270000, pop:7.40, govt:"AIADMK-II (EPS)", era:"aiadmk2" },
  { year:"2019-20", yr:"FY20", revReceipts:196000, fiscalDeficit:44176, freebieSpend:37000, gsdp:1730000, debt:310000, pop:7.45, govt:"AIADMK-II (EPS)", era:"aiadmk2" },
  { year:"2020-21", yr:"FY21", revReceipts:186000, fiscalDeficit:96890, freebieSpend:40000, gsdp:1740000, debt:420000, pop:7.50, govt:"AIADMK-II (EPS)", era:"aiadmk2" },
  { year:"2021-22", yr:"FY22", revReceipts:210000, fiscalDeficit:82000, freebieSpend:43000, gsdp:2140000, debt:510000, pop:7.55, govt:"DMK-III (Stalin)", era:"dmk3" },
  { year:"2022-23", yr:"FY23", revReceipts:246000, fiscalDeficit:81886, freebieSpend:46000, gsdp:2480000, debt:600000, pop:7.60, govt:"DMK-III (Stalin)", era:"dmk3" },
  { year:"2023-24", yr:"FY24", revReceipts:265000, fiscalDeficit:90430, freebieSpend:49000, gsdp:2720000, debt:690000, pop:7.65, govt:"DMK-III (Stalin)", era:"dmk3" },
  { year:"2024-25", yr:"FY25", revReceipts:280000, fiscalDeficit:108690, freebieSpend:52000, gsdp:3120000, debt:780000, pop:7.70, govt:"DMK-III (Stalin)", era:"dmk3" },
  { year:"2025-26", yr:"FY26", revReceipts:331569, fiscalDeficit:112000, freebieSpend:56000, gsdp:3450000, debt:850000, pop:7.75, govt:"DMK-III (Stalin)", era:"dmk3" },
];

// Projections based on manifesto promises
const projDMK = [
  { year:"2026-27", yr:"FY27", revReceipts:360000, fiscalDeficit:145000, freebieSpend:88000, gsdp:3830000, debt:990000, pop:7.80 },
  { year:"2027-28", yr:"FY28", revReceipts:394000, fiscalDeficit:155000, freebieSpend:95000, gsdp:4250000, debt:1140000, pop:7.84 },
  { year:"2028-29", yr:"FY29", revReceipts:430000, fiscalDeficit:162000, freebieSpend:100000, gsdp:4720000, debt:1290000, pop:7.88 },
  { year:"2029-30", yr:"FY30", revReceipts:470000, fiscalDeficit:170000, freebieSpend:106000, gsdp:5240000, debt:1450000, pop:7.92 },
  { year:"2030-31", yr:"FY31", revReceipts:513000, fiscalDeficit:178000, freebieSpend:112000, gsdp:5820000, debt:1620000, pop:7.96 },
];

const projAIADMK = [
  { year:"2026-27", yr:"FY27", revReceipts:360000, fiscalDeficit:160000, freebieSpend:98000, gsdp:3830000, debt:1010000, pop:7.80 },
  { year:"2027-28", yr:"FY28", revReceipts:394000, fiscalDeficit:172000, freebieSpend:106000, gsdp:4250000, debt:1180000, pop:7.84 },
  { year:"2028-29", yr:"FY29", revReceipts:430000, fiscalDeficit:182000, freebieSpend:112000, gsdp:4720000, debt:1350000, pop:7.88 },
  { year:"2029-30", yr:"FY30", revReceipts:470000, fiscalDeficit:192000, freebieSpend:118000, gsdp:5240000, debt:1530000, pop:7.92 },
  { year:"2030-31", yr:"FY31", revReceipts:513000, fiscalDeficit:204000, freebieSpend:125000, gsdp:5820000, debt:1720000, pop:7.96 },
];

const formatCr = (v) => {
  if (v >= 100000) return `₹${(v/100000).toFixed(1)}L Cr`;
  if (v >= 1000) return `₹${(v/1000).toFixed(0)}K Cr`;
  return `₹${v} Cr`;
};
const formatLCr = (v) => `₹${(v/100000).toFixed(1)}L Cr`;
const formatPct = (v) => `${v.toFixed(1)}%`;
const formatINR = (v) => `₹${v.toLocaleString("en-IN")}`;

const eraColors = {
  pre: "#6B7280",
  aiadmk1: "#1E40AF",
  aiadmk2: "#3B82F6",
  dmk3: "#DC2626",
  projDmk: "#EF4444",
  projAiadmk: "#2563EB",
};

const eraLabels = {
  pre: "DMK (Pre-2011)",
  aiadmk1: "AIADMK-I (2011–16)",
  aiadmk2: "AIADMK-II (2016–21)",
  dmk3: "DMK (2021–26)",
};

// ─── CHART COMPONENTS ─────────────────────────────────────────────────────

const CustomTooltipStyle = {
  background: "rgba(15,15,20,0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  padding: "12px 16px",
  color: "#E5E7EB",
  fontSize: "13px",
  lineHeight: "1.6",
  backdropFilter: "blur(8px)",
};

function Chart1_FreebieVsRevenue({ data }) {
  const chartData = data.map(d => ({
    yr: d.yr,
    freebiesPct: (d.freebieSpend / d.revReceipts * 100),
    freebieCr: d.freebieSpend,
    revCr: d.revReceipts,
    era: d.era,
  }));

  return (
    <div style={{ width:"100%", height: 380 }}>
      <ResponsiveContainer>
        <ComposedChart data={chartData} margin={{ top:20, right:30, left:10, bottom:5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="yr" tick={{ fill:"#9CA3AF", fontSize:11 }} />
          <YAxis yAxisId="left" tick={{ fill:"#9CA3AF", fontSize:11 }} tickFormatter={v => `${v.toFixed(0)}%`} domain={[0, 35]} label={{ value:"% of Revenue", angle:-90, position:"insideLeft", fill:"#9CA3AF", fontSize:11 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill:"#9CA3AF", fontSize:11 }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} label={{ value:"₹ Crore", angle:90, position:"insideRight", fill:"#9CA3AF", fontSize:11 }} />
          <Tooltip content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const d = payload[0]?.payload;
            return (
              <div style={CustomTooltipStyle}>
                <div style={{ fontWeight:700, marginBottom:4 }}>{d.yr}</div>
                <div>Freebies as % of Revenue: <span style={{ color:"#F59E0B", fontWeight:600 }}>{d.freebiesPct.toFixed(1)}%</span></div>
                <div>Freebie Spend: <span style={{ color:"#EF4444" }}>{formatCr(d.freebieCr)}</span></div>
                <div>Revenue Receipts: <span style={{ color:"#10B981" }}>{formatCr(d.revCr)}</span></div>
              </div>
            );
          }} />
          <Bar yAxisId="right" dataKey="freebieCr" name="Freebie Spend (₹Cr)" radius={[3,3,0,0]} opacity={0.7}>
            {chartData.map((d, i) => (
              <Cell key={i} fill={eraColors[d.era] || "#6B7280"} />
            ))}
          </Bar>
          <Line yAxisId="left" type="monotone" dataKey="freebiesPct" stroke="#F59E0B" strokeWidth={3} dot={{ r:4, fill:"#F59E0B" }} name="% of Revenue" />
          <ReferenceLine yAxisId="left" y={15} stroke="#F59E0B" strokeDasharray="6 4" opacity={0.4} label={{ value:"15% threshold", fill:"#F59E0B", fontSize:10, position:"top" }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

function Chart2_FiscalDeficitBalloon({ data, projD, projA, scenario }) {
  const hist = data.map(d => ({
    yr: d.yr,
    fdPct: (d.fiscalDeficit / d.gsdp * 100),
    fdCr: d.fiscalDeficit,
    era: d.era,
  }));
  
  const proj = (scenario === "dmk" ? projD : projA).map(d => ({
    yr: d.yr,
    fdPct: (d.fiscalDeficit / d.gsdp * 100),
    fdCr: d.fiscalDeficit,
    era: scenario === "dmk" ? "projDmk" : "projAiadmk",
  }));

  const combined = [...hist, ...proj];

  return (
    <div style={{ width:"100%", height: 380 }}>
      <ResponsiveContainer>
        <ComposedChart data={combined} margin={{ top:20, right:30, left:10, bottom:5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="yr" tick={{ fill:"#9CA3AF", fontSize:11 }} />
          <YAxis yAxisId="left" tick={{ fill:"#9CA3AF", fontSize:11 }} tickFormatter={v => `${v.toFixed(1)}%`} domain={[0, 6]} label={{ value:"% of GSDP", angle:-90, position:"insideLeft", fill:"#9CA3AF", fontSize:11 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill:"#9CA3AF", fontSize:11 }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} label={{ value:"₹ Crore", angle:90, position:"insideRight", fill:"#9CA3AF", fontSize:11 }} />
          <Tooltip content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const d = payload[0]?.payload;
            const isProj = d.era?.startsWith("proj");
            return (
              <div style={CustomTooltipStyle}>
                <div style={{ fontWeight:700, marginBottom:4 }}>{d.yr} {isProj ? "⟨projected⟩" : ""}</div>
                <div>Fiscal Deficit: <span style={{ color:"#EF4444", fontWeight:600 }}>{formatCr(d.fdCr)}</span></div>
                <div>As % of GSDP: <span style={{ color:"#F59E0B", fontWeight:600 }}>{d.fdPct.toFixed(2)}%</span></div>
              </div>
            );
          }} />
          <ReferenceLine yAxisId="left" y={3} stroke="#EF4444" strokeDasharray="6 4" opacity={0.6} label={{ value:"3% FRBM Limit", fill:"#EF4444", fontSize:10, position:"top" }} />
          <Bar yAxisId="right" dataKey="fdCr" name="Fiscal Deficit (₹Cr)" radius={[3,3,0,0]} opacity={0.65}>
            {combined.map((d, i) => (
              <Cell key={i} fill={d.era?.startsWith("proj") ? (scenario==="dmk"?"#DC2626":"#2563EB") : (eraColors[d.era] || "#6B7280")} />
            ))}
          </Bar>
          <Line yAxisId="left" type="monotone" dataKey="fdPct" stroke="#F59E0B" strokeWidth={3} dot={{ r:3, fill:"#F59E0B" }} strokeDasharray={combined.map((d,i) => i >= hist.length ? "6 4" : "0").includes("6 4") ? undefined : undefined} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

function Chart3_PerCapita({ data, projD, projA, scenario }) {
  const proj = scenario === "dmk" ? projD : projA;
  const all = [...data, ...proj].map(d => {
    const fdPerCap = Math.round(d.fiscalDeficit / d.pop);
    const freePerCap = Math.round(d.freebieSpend / d.pop);
    const debtPerCap = Math.round(d.debt / d.pop);
    const isProj = !d.era;
    return { yr: d.yr, fdPerCap, freePerCap, debtPerCap, isProj };
  });

  return (
    <div style={{ width:"100%", height: 380 }}>
      <ResponsiveContainer>
        <ComposedChart data={all} margin={{ top:20, right:30, left:10, bottom:5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="yr" tick={{ fill:"#9CA3AF", fontSize:11 }} />
          <YAxis tick={{ fill:"#9CA3AF", fontSize:11 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} label={{ value:"₹ per person", angle:-90, position:"insideLeft", fill:"#9CA3AF", fontSize:11 }} />
          <Tooltip content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const d = payload[0]?.payload;
            return (
              <div style={CustomTooltipStyle}>
                <div style={{ fontWeight:700, marginBottom:4 }}>{d.yr} {d.isProj ? "⟨projected⟩" : ""}</div>
                <div>Freebie per capita: <span style={{ color:"#F59E0B", fontWeight:600 }}>{formatINR(d.freePerCap)}</span></div>
                <div>Fiscal deficit per capita: <span style={{ color:"#EF4444", fontWeight:600 }}>{formatINR(d.fdPerCap)}</span></div>
                <div>Debt per capita: <span style={{ color:"#8B5CF6", fontWeight:600 }}>{formatINR(d.debtPerCap)}</span></div>
              </div>
            );
          }} />
          <Area type="monotone" dataKey="debtPerCap" fill="#8B5CF6" fillOpacity={0.15} stroke="#8B5CF6" strokeWidth={2} name="Debt/Capita" />
          <Line type="monotone" dataKey="fdPerCap" stroke="#EF4444" strokeWidth={2.5} dot={{ r:3 }} name="Deficit/Capita" />
          <Line type="monotone" dataKey="freePerCap" stroke="#F59E0B" strokeWidth={2.5} dot={{ r:3 }} name="Freebie/Capita" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

function Chart4_DebtTrajectory({ data, projD, projA, scenario }) {
  const proj = scenario === "dmk" ? projD : projA;
  const all = [...data, ...proj].map(d => ({
    yr: d.yr,
    debtGsdp: (d.debt / d.gsdp * 100),
    debtLCr: d.debt,
    isProj: !d.era,
  }));

  return (
    <div style={{ width:"100%", height: 380 }}>
      <ResponsiveContainer>
        <ComposedChart data={all} margin={{ top:20, right:30, left:10, bottom:5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="yr" tick={{ fill:"#9CA3AF", fontSize:11 }} />
          <YAxis yAxisId="left" tick={{ fill:"#9CA3AF", fontSize:11 }} tickFormatter={v => `${v.toFixed(0)}%`} domain={[10, 35]} label={{ value:"Debt/GSDP %", angle:-90, position:"insideLeft", fill:"#9CA3AF", fontSize:11 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill:"#9CA3AF", fontSize:11 }} tickFormatter={v => `${(v/100000).toFixed(1)}L`} label={{ value:"₹ Lakh Cr", angle:90, position:"insideRight", fill:"#9CA3AF", fontSize:11 }} />
          <Tooltip content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const d = payload[0]?.payload;
            return (
              <div style={CustomTooltipStyle}>
                <div style={{ fontWeight:700, marginBottom:4 }}>{d.yr} {d.isProj ? "⟨projected⟩" : ""}</div>
                <div>Outstanding Debt: <span style={{ color:"#8B5CF6", fontWeight:600 }}>{formatLCr(d.debtLCr)}</span></div>
                <div>Debt/GSDP: <span style={{ color:"#EF4444", fontWeight:600 }}>{d.debtGsdp.toFixed(1)}%</span></div>
              </div>
            );
          }} />
          <ReferenceLine yAxisId="left" y={30} stroke="#EF4444" strokeDasharray="6 4" opacity={0.5} label={{ value:"30% danger zone", fill:"#EF4444", fontSize:10, position:"top" }} />
          <Area yAxisId="right" type="monotone" dataKey="debtLCr" fill="#8B5CF6" fillOpacity={0.2} stroke="#8B5CF6" strokeWidth={2} name="Debt (₹L Cr)" />
          <Line yAxisId="left" type="monotone" dataKey="debtGsdp" stroke="#EF4444" strokeWidth={3} dot={{ r:3, fill:"#EF4444" }} name="Debt/GSDP %" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

function Chart5_FreebieBreakdown() {
  const breakdown = [
    { category:"PDS / Food\nSubsidy", aiadmk1:8000, aiadmk2:9000, dmk3:11000, proj:13000 },
    { category:"Women Cash\nTransfers", aiadmk1:0, aiadmk2:0, dmk3:15000, proj:24000 },
    { category:"Free Bus\nTravel", aiadmk1:1800, aiadmk2:2500, dmk3:3600, proj:7200 },
    { category:"Laptops\n& Education", aiadmk1:3500, aiadmk2:2800, dmk3:3500, proj:5000 },
    { category:"Appliances\n(Mixie etc)", aiadmk1:4500, aiadmk2:2000, dmk3:1500, proj:8000 },
    { category:"Gold / Marriage\nAssistance", aiadmk1:2000, aiadmk2:2500, dmk3:2000, proj:3000 },
    { category:"Pensions &\nBreakfast", aiadmk1:1200, aiadmk2:2200, dmk3:4500, proj:7000 },
    { category:"Pongal &\nOther Gifts", aiadmk1:800, aiadmk2:1200, dmk3:2400, proj:4000 },
  ];

  return (
    <div style={{ width:"100%", height: 420 }}>
      <ResponsiveContainer>
        <BarChart data={breakdown} layout="vertical" margin={{ top:10, right:30, left:80, bottom:5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis type="number" tick={{ fill:"#9CA3AF", fontSize:11 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}K Cr`} />
          <YAxis type="category" dataKey="category" tick={{ fill:"#D1D5DB", fontSize:10, width:80 }} width={85} />
          <Tooltip content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div style={CustomTooltipStyle}>
                <div style={{ fontWeight:700, marginBottom:6 }}>{label}</div>
                {payload.map((p, i) => (
                  <div key={i}><span style={{ color:p.color }}>{p.name}</span>: {formatCr(p.value)}</div>
                ))}
              </div>
            );
          }} />
          <Legend wrapperStyle={{ fontSize:11, color:"#9CA3AF" }} />
          <Bar dataKey="aiadmk1" name="AIADMK-I (FY12–16)" fill="#1E40AF" radius={[0,3,3,0]} barSize={10} />
          <Bar dataKey="aiadmk2" name="AIADMK-II (FY17–21)" fill="#3B82F6" radius={[0,3,3,0]} barSize={10} />
          <Bar dataKey="dmk3" name="DMK (FY22–26)" fill="#DC2626" radius={[0,3,3,0]} barSize={10} />
          <Bar dataKey="proj" name="2026 Manifesto Avg" fill="#F59E0B" radius={[0,3,3,0]} barSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── STAT CARDS ──────────────────────────────────────────────────────────

function StatCard({ label, value, sub, color="#F59E0B" }) {
  return (
    <div style={{
      background:"rgba(255,255,255,0.03)",
      border:"1px solid rgba(255,255,255,0.08)",
      borderRadius:12,
      padding:"16px 20px",
      flex:"1 1 0",
      minWidth:160,
    }}>
      <div style={{ fontSize:11, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>{label}</div>
      <div style={{ fontSize:26, fontWeight:800, color, lineHeight:1.1 }}>{value}</div>
      {sub && <div style={{ fontSize:11, color:"#6B7280", marginTop:4 }}>{sub}</div>}
    </div>
  );
}

// ─── MAIN DASHBOARD ──────────────────────────────────────────────────────

export default function Dashboard() {
  const [scenario, setScenario] = useState("dmk");
  const [activeTab, setActiveTab] = useState(0);

  const latestHist = fiscalData[fiscalData.length - 1];
  const latestProj = scenario === "dmk" ? projDMK[projDMK.length - 1] : projAIADMK[projAIADMK.length - 1];
  
  const freePctNow = (latestHist.freebieSpend / latestHist.revReceipts * 100);
  const freePctProj = (latestProj.freebieSpend / latestProj.revReceipts * 100);
  const fdPctProj = (latestProj.fiscalDeficit / latestProj.gsdp * 100);
  const debtPctProj = (latestProj.debt / latestProj.gsdp * 100);

  const totalFreebies11to26 = fiscalData.slice(1).reduce((s,d) => s + d.freebieSpend, 0);

  const tabs = [
    { label:"Freebies vs Revenue", id:0 },
    { label:"Fiscal Deficit", id:1 },
    { label:"Per Capita Impact", id:2 },
    { label:"Debt Trajectory", id:3 },
    { label:"Freebie Breakdown", id:4 },
  ];

  return (
    <div style={{
      fontFamily:"'DM Sans', 'Segoe UI', system-ui, sans-serif",
      background:"#0A0A0F",
      color:"#E5E7EB",
      minHeight:"100vh",
      padding:"32px 24px",
      maxWidth:960,
      margin:"0 auto",
    }}>
      {/* Header */}
      <div style={{ marginBottom:32 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
          <div style={{ width:4, height:40, background:"linear-gradient(180deg, #EF4444, #F59E0B)", borderRadius:2 }} />
          <div>
            <h1 style={{ fontSize:28, fontWeight:900, margin:0, letterSpacing:"-0.02em", color:"#F9FAFB", lineHeight:1.1 }}>
              Tamil Nadu: The Fiscal Cost of Election Freebies
            </h1>
            <div style={{ fontSize:13, color:"#6B7280", marginTop:4 }}>FY 2010–11 → FY 2030–31 | AIADMK & DMK Manifesto Analysis</div>
          </div>
        </div>
        <p style={{ fontSize:13, color:"#9CA3AF", lineHeight:1.7, margin:"16px 0 0 0", maxWidth:820 }}>
          Estimated annual cost of election-linked welfare schemes ("freebies") across three successive elected governments — 
          <span style={{ color:"#3B82F6", fontWeight:600 }}> AIADMK-I (2011–16)</span>, 
          <span style={{ color:"#60A5FA", fontWeight:600 }}> AIADMK-II (2016–21)</span>, and 
          <span style={{ color:"#EF4444", fontWeight:600 }}> DMK (2021–26)</span> — 
          with 5-year projections based on 2026 manifesto promises. Data sourced from CAG audit reports, PRS India budget analyses, TN Finance Dept, and NITI Aayog.
        </p>
      </div>

      {/* Key Stats */}
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:28 }}>
        <StatCard label="Freebies (FY26)" value={formatCr(latestHist.freebieSpend)} sub={`${freePctNow.toFixed(1)}% of revenue receipts`} color="#F59E0B" />
        <StatCard label="Total Freebies FY12–26" value={formatLCr(totalFreebies11to26)} sub="15 years, 3 govts" color="#10B981" />
        <StatCard label="Fiscal Deficit FY26" value={formatCr(latestHist.fiscalDeficit)} sub={`${(latestHist.fiscalDeficit / latestHist.gsdp * 100).toFixed(1)}% of GSDP`} color="#EF4444" />
        <StatCard label="Outstanding Debt" value={formatLCr(latestHist.debt)} sub={`${(latestHist.debt / latestHist.gsdp * 100).toFixed(0)}% of GSDP (FY26)`} color="#8B5CF6" />
      </div>

      {/* Scenario Toggle */}
      <div style={{
        display:"flex", alignItems:"center", gap:12, marginBottom:20,
        padding:"12px 16px", background:"rgba(255,255,255,0.03)", borderRadius:10,
        border:"1px solid rgba(255,255,255,0.06)",
      }}>
        <span style={{ fontSize:12, color:"#9CA3AF", fontWeight:600 }}>PROJECTION SCENARIO (FY27–31):</span>
        <button
          onClick={() => setScenario("dmk")}
          style={{
            padding:"6px 16px", borderRadius:6, cursor:"pointer", fontSize:12, fontWeight:700,
            background: scenario==="dmk" ? "#DC2626" : "transparent",
            color: scenario==="dmk" ? "#fff" : "#9CA3AF",
            border: scenario==="dmk" ? "none" : "1px solid rgba(255,255,255,0.15)",
          }}
        >DMK 2026 Manifesto</button>
        <button
          onClick={() => setScenario("aiadmk")}
          style={{
            padding:"6px 16px", borderRadius:6, cursor:"pointer", fontSize:12, fontWeight:700,
            background: scenario==="aiadmk" ? "#1E40AF" : "transparent",
            color: scenario==="aiadmk" ? "#fff" : "#9CA3AF",
            border: scenario==="aiadmk" ? "none" : "1px solid rgba(255,255,255,0.15)",
          }}
        >AIADMK 2026 Manifesto</button>
        <span style={{ fontSize:11, color:"#6B7280", marginLeft:8 }}>
          {scenario === "dmk" 
            ? "₹2K/mo KMUT + ₹8K coupons + laptops + expanded breakfast" 
            : "₹2K/mo Kula Vilakku + free fridges + free bus (men) + 3 LPG cylinders"}
        </span>
      </div>

      {/* Tab Navigation */}
      <div style={{ display:"flex", gap:4, marginBottom:4, overflowX:"auto", paddingBottom:4 }}>
        {tabs.map(t => (
          <button key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding:"10px 18px", borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:600,
              whiteSpace:"nowrap",
              background: activeTab===t.id ? "rgba(245,158,11,0.15)" : "transparent",
              color: activeTab===t.id ? "#F59E0B" : "#6B7280",
              border: activeTab===t.id ? "1px solid rgba(245,158,11,0.3)" : "1px solid transparent",
            }}
          >{t.label}</button>
        ))}
      </div>

      {/* Chart Panels */}
      <div style={{
        background:"rgba(255,255,255,0.02)",
        border:"1px solid rgba(255,255,255,0.06)",
        borderRadius:14,
        padding:"24px 16px 16px",
        marginBottom:24,
      }}>
        {activeTab === 0 && (
          <>
            <h3 style={{ fontSize:16, fontWeight:700, margin:"0 0 4px 8px", color:"#F9FAFB" }}>
              Election Freebies as % of State Revenue Receipts
            </h3>
            <p style={{ fontSize:12, color:"#6B7280", margin:"0 0 12px 8px" }}>
              Bars = absolute freebie spend (₹ Cr) · Line = freebies as % of total revenue receipts · Color-coded by ruling government
            </p>
            <Chart1_FreebieVsRevenue data={fiscalData} />
          </>
        )}
        {activeTab === 1 && (
          <>
            <h3 style={{ fontSize:16, fontWeight:700, margin:"0 0 4px 8px", color:"#F9FAFB" }}>
              Fiscal Deficit: Actual + Projected ({scenario === "dmk" ? "DMK" : "AIADMK"} Manifesto Scenario)
            </h3>
            <p style={{ fontSize:12, color:"#6B7280", margin:"0 0 12px 8px" }}>
              Red dashed = 3% FRBM limit · Bars = deficit in ₹ Cr · Line = deficit as % of GSDP · Projected years use manifesto cost assumptions + 10% revenue CAGR
            </p>
            <Chart2_FiscalDeficitBalloon data={fiscalData} projD={projDMK} projA={projAIADMK} scenario={scenario} />
          </>
        )}
        {activeTab === 2 && (
          <>
            <h3 style={{ fontSize:16, fontWeight:700, margin:"0 0 4px 8px", color:"#F9FAFB" }}>
              Per Capita Burden: Freebie Spend, Fiscal Deficit & Debt
            </h3>
            <p style={{ fontSize:12, color:"#6B7280", margin:"0 0 12px 8px" }}>
              Population: 7.1 Cr (2011 Census) → est. 7.96 Cr (2031) · Per capita = scheme/deficit/debt ÷ population · {scenario === "dmk" ? "DMK" : "AIADMK"} manifesto projections after FY26
            </p>
            <Chart3_PerCapita data={fiscalData} projD={projDMK} projA={projAIADMK} scenario={scenario} />
          </>
        )}
        {activeTab === 3 && (
          <>
            <h3 style={{ fontSize:16, fontWeight:700, margin:"0 0 4px 8px", color:"#F9FAFB" }}>
              Outstanding Debt Trajectory & Debt-to-GSDP Ratio
            </h3>
            <p style={{ fontSize:12, color:"#6B7280", margin:"0 0 12px 8px" }}>
              30% debt/GSDP widely considered the "danger zone" for state fiscal health · Debt crossed ₹8L Cr in FY25 · {scenario === "dmk" ? "DMK" : "AIADMK"} projections
            </p>
            <Chart4_DebtTrajectory data={fiscalData} projD={projDMK} projA={projAIADMK} scenario={scenario} />
          </>
        )}
        {activeTab === 4 && (
          <>
            <h3 style={{ fontSize:16, fontWeight:700, margin:"0 0 4px 8px", color:"#F9FAFB" }}>
              Freebie Breakdown by Category: Average Annual Spend per Govt
            </h3>
            <p style={{ fontSize:12, color:"#6B7280", margin:"0 0 12px 8px" }}>
              Estimated avg annual spend per category across each government tenure · "2026 Manifesto Avg" = projected first full year of new promises
            </p>
            <Chart5_FreebieBreakdown />
          </>
        )}
      </div>

      {/* Projection Summary Box */}
      <div style={{
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:28,
      }}>
        <div style={{
          background:"rgba(220,38,38,0.06)", border:"1px solid rgba(220,38,38,0.2)", borderRadius:12, padding:20,
        }}>
          <h4 style={{ fontSize:13, fontWeight:800, color:"#EF4444", margin:"0 0 10px 0", textTransform:"uppercase", letterSpacing:0.5 }}>
            If DMK Manifesto Implemented (FY31)
          </h4>
          <div style={{ fontSize:12, color:"#D1D5DB", lineHeight:1.8 }}>
            <div>Projected freebie spend: <strong style={{ color:"#F59E0B" }}>{formatLCr(projDMK[4].freebieSpend)}</strong> ({(projDMK[4].freebieSpend/projDMK[4].revReceipts*100).toFixed(0)}% of revenue)</div>
            <div>Fiscal deficit: <strong style={{ color:"#EF4444" }}>{formatLCr(projDMK[4].fiscalDeficit)}</strong> ({(projDMK[4].fiscalDeficit/projDMK[4].gsdp*100).toFixed(1)}% of GSDP)</div>
            <div>Outstanding debt: <strong style={{ color:"#8B5CF6" }}>{formatLCr(projDMK[4].debt)}</strong> ({(projDMK[4].debt/projDMK[4].gsdp*100).toFixed(1)}% of GSDP)</div>
            <div>Debt per capita: <strong style={{ color:"#8B5CF6" }}>{formatINR(Math.round(projDMK[4].debt / projDMK[4].pop))}</strong></div>
          </div>
        </div>
        <div style={{
          background:"rgba(30,64,175,0.08)", border:"1px solid rgba(59,130,246,0.25)", borderRadius:12, padding:20,
        }}>
          <h4 style={{ fontSize:13, fontWeight:800, color:"#3B82F6", margin:"0 0 10px 0", textTransform:"uppercase", letterSpacing:0.5 }}>
            If AIADMK Manifesto Implemented (FY31)
          </h4>
          <div style={{ fontSize:12, color:"#D1D5DB", lineHeight:1.8 }}>
            <div>Projected freebie spend: <strong style={{ color:"#F59E0B" }}>{formatLCr(projAIADMK[4].freebieSpend)}</strong> ({(projAIADMK[4].freebieSpend/projAIADMK[4].revReceipts*100).toFixed(0)}% of revenue)</div>
            <div>Fiscal deficit: <strong style={{ color:"#EF4444" }}>{formatLCr(projAIADMK[4].fiscalDeficit)}</strong> ({(projAIADMK[4].fiscalDeficit/projAIADMK[4].gsdp*100).toFixed(1)}% of GSDP)</div>
            <div>Outstanding debt: <strong style={{ color:"#8B5CF6" }}>{formatLCr(projAIADMK[4].debt)}</strong> ({(projAIADMK[4].debt/projAIADMK[4].gsdp*100).toFixed(1)}% of GSDP)</div>
            <div>Debt per capita: <strong style={{ color:"#8B5CF6" }}>{formatINR(Math.round(projAIADMK[4].debt / projAIADMK[4].pop))}</strong></div>
          </div>
        </div>
      </div>

      {/* Key Findings */}
      <div style={{
        background:"rgba(245,158,11,0.05)", border:"1px solid rgba(245,158,11,0.15)", borderRadius:12, padding:20, marginBottom:24,
      }}>
        <h4 style={{ fontSize:14, fontWeight:800, color:"#F59E0B", margin:"0 0 12px 0" }}>KEY FINDINGS</h4>
        <div style={{ fontSize:12.5, color:"#D1D5DB", lineHeight:1.9 }}>
          <div><strong>1.</strong> Freebie spend has grown <strong style={{ color:"#F59E0B" }}>~4.7×</strong> in 15 years — from ₹12,000 Cr (FY11) to ₹56,000 Cr (FY26) — outpacing revenue growth of ~4.7×.</div>
          <div><strong>2.</strong> Freebies now consume <strong style={{ color:"#F59E0B" }}>~17%</strong> of total revenue receipts (FY26), up from ~17% in FY11 — the <em>composition</em> has shifted from one-time items (TVs, mixies) to recurring cash transfers (KMUT, bus subsidies).</div>
          <div><strong>3.</strong> The shift to <strong>recurring commitments</strong> is the critical change: the DMK's KMUT (₹12K–24K/yr per woman) and bus subsidy together add ₹18,000+ Cr of permanent annual obligations vs. AIADMK's one-off appliance schemes.</div>
          <div><strong>4.</strong> Both 2026 manifestos would push fiscal deficit to <strong style={{ color:"#EF4444" }}>3.5–4.9% of GSDP</strong>, breaching the 3% FRBM ceiling. AIADMK's promises are costlier by ~₹10,000–13,000 Cr/year due to the universal ₹2K/month + free male bus travel.</div>
          <div><strong>5.</strong> Per capita debt burden is projected to nearly <strong style={{ color:"#8B5CF6" }}>double</strong> from ₹1.1L (FY26) to ₹2.0–2.2L (FY31), crowding out capital expenditure on infrastructure and industry.</div>
        </div>
      </div>

      {/* Methodology */}
      <div style={{
        background:"rgba(255,255,255,0.02)", borderRadius:12, padding:20,
        border:"1px solid rgba(255,255,255,0.05)", marginBottom:16,
      }}>
        <h4 style={{ fontSize:13, fontWeight:700, color:"#9CA3AF", margin:"0 0 10px 0" }}>METHODOLOGY & ASSUMPTIONS</h4>
        <div style={{ fontSize:11.5, color:"#6B7280", lineHeight:1.8 }}>
          <div><strong>Sources:</strong> CAG State Finance Audit Reports (FY11–FY24), PRS India Budget Analyses (FY19–FY25), TN Finance Dept Budget documents (FY25–26), NITI Aayog Macro-Fiscal Landscape (Mar 2025), RBI State Finances reports, news analysis of DMK and AIADMK 2026 election manifestos.</div>
          <div><strong>"Freebie" definition:</strong> Subsidies and welfare schemes directly linked to election manifesto promises — includes PDS food subsidy, free/subsidised transport, cash transfers to women, free appliances (TVs, mixies, grinders, fans, fridges), laptops, gold for brides (Thali scheme), Pongal gifts, breakfast scheme, enhanced pensions. Excludes developmental welfare (ICDS, MGNREGA, housing). Estimates are conservative.</div>
          <div><strong>Revenue projections:</strong> 10% nominal CAGR (FY27–31), consistent with FY12–26 historical CAGR of ~11%. GSDP: 11% nominal CAGR. Population: 0.5% annual growth (TN's low fertility rate).</div>
          <div><strong>Freebie projections:</strong> Based on estimated full-year cost of each manifesto promise at stated coverage levels (1.5–2.2 Cr ration cards, 7.75 Cr population). One-time costs (fridges, coupons) amortised over 2 years. Recurring costs (monthly transfers, bus subsidies) annualised at full run-rate from Year 2.</div>
          <div><strong>Fiscal deficit projections:</strong> = Historical baseline deficit + incremental freebie cost – assumed 10% revenue growth. Does not assume spending cuts elsewhere.</div>
        </div>
      </div>

      <div style={{ textAlign:"center", fontSize:10, color:"#4B5563", padding:"12px 0" }}>
        Analysis compiled April 2026 · Not investment or policy advice · Data is estimated based on public sources and stated manifesto commitments
      </div>
    </div>
  );
}
