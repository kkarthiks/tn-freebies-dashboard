import { useState } from "react";
import { BarChart, Bar, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, ReferenceLine, Cell } from "recharts";

const FX = 93;
function fmtCr(v,c){if(c==="usd"){const u=(v*1e7)/FX;if(u>=1e9)return"$"+(u/1e9).toPrecision(3)+"B";if(u>=1e6)return"$"+(u/1e6).toPrecision(3)+"M";return"$"+(u/1e3).toPrecision(3)+"K"}if(v>=1e5)return"₹"+(v/1e5).toFixed(1)+"L Cr";if(v>=1e3)return"₹"+(v/1e3).toFixed(0)+"K Cr";return"₹"+v+" Cr"}
function fmtLCr(v,c){if(c==="usd"){const u=(v*1e7)/FX;return u>=1e9?"$"+(u/1e9).toPrecision(3)+"B":"$"+(u/1e6).toPrecision(3)+"M"}return"₹"+(v/1e5).toFixed(1)+"L Cr"}
function fmtPC(v,c){if(c==="usd"){const u=v/FX;return u>=1e3?"$"+(u/1e3).toFixed(1)+"K":"$"+Math.round(u)}return"₹"+v.toLocaleString("en-IN")}
function fmtAxCr(v,c){if(c==="usd"){const u=(v*1e7)/FX;return u>=1e9?"$"+(u/1e9).toFixed(0)+"B":"$"+(u/1e6).toFixed(0)+"M"}return(v/1e3).toFixed(0)+"K"}
function fmtAxLC(v,c){if(c==="usd"){return"$"+((v*1e7/FX)/1e9).toFixed(0)+"B"}return(v/1e5).toFixed(1)+"L"}
function fmtAxPC(v,c){if(c==="usd")return"$"+((v/FX)/1e3).toFixed(0)+"K";return"₹"+(v/1e3).toFixed(0)+"K"}
function axCL(c){return c==="usd"?"USD":"₹ Crore"}
function axCLB(c){return c==="usd"?"USD":"₹ Lakh Cr"}
function axPCL(c){return c==="usd"?"USD / person":"₹ per person"}

const T={en:{
title:"Tamil Nadu: The Fiscal Cost of Election Freebies",
subtitle:"FY 2010–11 → FY 2030–31 | AIADMK & DMK Manifesto Analysis",
intro:"Estimated annual cost of election-linked welfare schemes (\u201Cfreebies\u201D) across three successive elected governments \u2014 ",
introTail:" — with 5-year projections based on 2026 manifesto promises. Data: CAG, PRS India, TN Finance Dept, NITI Aayog.",
a1L:"AIADMK-I (2011–16)",a2L:"AIADMK-II (2016–21)",d3L:"DMK (2021–26)",
sfL:"Freebies (FY26)",sfR:"of revenue receipts",stL:"Total Freebies FY12–26",stS:"15 years, 3 govts",
sdL:"Fiscal Deficit FY26",sdG:"of GSDP",sdbL:"Outstanding Debt",sdbS:"of GSDP (FY26)",
pL:"PROJECTION (FY27–31):",dmM:"DMK Manifesto",aiM:"AIADMK Manifesto",
dmD:"₹2K/mo KMUT + ₹8K coupons + laptops + breakfast",aiD:"₹2K/mo Kula Vilakku + fridges + bus (men) + 3 LPG",
dmDu:"$22/mo KMUT + $86 coupons + laptops + breakfast",aiDu:"$22/mo Kula Vilakku + fridges + bus (men) + 3 LPG",
tabs:["Freebies vs Revenue","Fiscal Deficit","Per Capita Impact","Debt Trajectory","Freebie Breakdown"],
c1T:"Election Freebies as % of State Revenue Receipts",c1S:"Bars = freebie spend | Line = % of revenue receipts | Color = ruling government",
c2T:s=>"Fiscal Deficit: Actual + Projected ("+(s==="dmk"?"DMK":"AIADMK")+" Manifesto)",c2S:"Red dashed = 3% FRBM limit | Bars = deficit | Line = % of GSDP",
c3T:"Per Capita Burden: Freebie Spend, Deficit & Debt",c3S:s=>"Pop: 7.1 Cr (2011) → est. 7.96 Cr (2031) | "+(s==="dmk"?"DMK":"AIADMK")+" projections after FY26",
c4T:"Outstanding Debt Trajectory & Debt-to-GSDP Ratio",c4S:"30% debt/GSDP = danger zone | Debt crossed ₹8L Cr in FY25",c4Su:"30% debt/GSDP = danger zone | Debt crossed $86B in FY25",
c5T:"Freebie Breakdown by Category: Avg Annual Spend per Govt",c5S:"Estimated avg annual spend per category across each government tenure",
tFP:"Freebies as % of Revenue",tFS:"Freebie Spend",tRR:"Revenue Receipts",tFD:"Fiscal Deficit",tAG:"As % of GSDP",tPr:"(projected)",
tFC:"Freebie/capita",tDC:"Deficit/capita",tBC:"Debt/capita",tDb:"Outstanding Debt",tDG:"Debt/GSDP",
aPR:"% of Revenue",aPG:"% of GSDP",aDG:"Debt/GSDP %",
lFS:"Freebie Spend",lPR:"% of Revenue",lDf:"Fiscal Deficit",lDb:"Debt",lDPC:"Debt/Capita",lDfPC:"Deficit/Capita",lFPC:"Freebie/Capita",lDG:"Debt/GSDP %",
ct1:"PDS / Food Subsidy",ct2:"Women Cash Transfers",ct3:"Free Bus Travel",ct4:"Laptops & Education",ct5:"Appliances (Mixie etc)",ct6:"Gold / Marriage Aid",ct7:"Pensions & Breakfast",ct8:"Pongal & Other Gifts",
lA1:"AIADMK-I (FY12–16)",lA2:"AIADMK-II (FY17–21)",lD3:"DMK (FY22–26)",lPj:"2026 Manifesto Avg",
iD:"If DMK Manifesto (FY31)",iA:"If AIADMK Manifesto (FY31)",pF:"Freebie spend",pDf:"Fiscal deficit",pDb:"Debt",pDPC:"Debt per capita",oR:"of rev",
kT:"KEY FINDINGS",
k1:c=>"Freebie spend has grown ~4.7× in 15 years — from "+c(12000)+" (FY11) to "+c(56000)+" (FY26).",
k2:"Freebies consume ~17% of revenue receipts (FY26). Composition shifted from one-time items (TVs, mixies) to recurring cash transfers.",
k3:c=>c==="usd"?"The shift to recurring commitments is critical: KMUT + bus subsidy = $1.9B+ of permanent annual obligations.":"The shift to recurring commitments is critical: KMUT + bus subsidy = ₹18,000+ Cr of permanent annual obligations.",
k4:"Both 2026 manifestos push fiscal deficit to 3.5–4.9% of GSDP, breaching the 3% FRBM ceiling.",
k5:c=>c==="usd"?"Per capita debt projected to nearly double from $1,183 (FY26) to $2,151–$2,366 (FY31).":"Per capita debt projected to nearly double from ₹1.1L (FY26) to ₹2.0–2.2L (FY31).",
mT:"METHODOLOGY & ASSUMPTIONS",mSL:"Sources:",mDL:"Definition:",mPL:"Projections:",mFL:"FX Rate:",
mS:"CAG State Finance Audit Reports (FY11–FY24), PRS India Budget Analyses (FY19–FY25), TN Finance Dept Budget documents (FY25–26), NITI Aayog Macro-Fiscal Landscape (Mar 2025), RBI State Finances, DMK & AIADMK 2026 election manifestos.",
mD:"Subsidies/welfare schemes linked to manifesto promises — PDS, transport, cash transfers, appliances, laptops, gold, Pongal gifts, breakfast, pensions. Excludes developmental welfare (ICDS, MGNREGA, housing).",
mP:"Revenue 10% CAGR, GSDP 11% CAGR, Population 0.5% p.a. One-time costs amortised 2 yrs. Recurring costs at full run-rate from Year 2. No offsetting cuts assumed.",
mF:"₹93 = $1 (approximate, applied uniformly for comparability).",
ft:"Analysis compiled April 2026 · Not investment or policy advice · Data estimated from public sources and manifesto commitments",
cur:"Currency",lng:"Language"},

ta:{
title:"தமிழ்நாடு: தேர்தல் இலவசங்களின் நிதிச் செலவு",
subtitle:"நிதியாண்டு 2010–11 → 2030–31 | அதிமுக & திமுக தேர்தல் அறிக்கை பகுப்பாய்வு",
intro:"மூன்று தொடர்ச்சியான அரசுகளின் தேர்தல் நலத்திட்ட இலவசங்களின் மதிப்பிடப்பட்ட ஆண்டு செலவு — ",
introTail:" — 2026 தேர்தல் அறிக்கை வாக்குறுதிகளின் அடிப்படையில் 5 ஆண்டு கணிப்புகளுடன். தரவு: CAG, PRS India, தமிழ்நாடு நிதித்துறை, NITI Aayog.",
a1L:"அதிமுக-I (2011–16)",a2L:"அதிமுக-II (2016–21)",d3L:"திமுக (2021–26)",
sfL:"இலவசங்கள் (நிதி26)",sfR:"வருவாயில்",stL:"மொத்த இலவசங்கள் நிதி12–26",stS:"15 ஆண்டுகள், 3 அரசுகள்",
sdL:"நிதிப் பற்றாக்குறை நிதி26",sdG:"GSDP-யில்",sdbL:"நிலுவைக் கடன்",sdbS:"GSDP-யில் (நிதி26)",
pL:"கணிப்பு (நிதி27–31):",dmM:"திமுக அறிக்கை",aiM:"அதிமுக அறிக்கை",
dmD:"₹2K/மாதம் KMUT + ₹8K கூப்பன் + மடிக்கணினி + காலை உணவு",aiD:"₹2K/மாதம் குல விளக்கு + குளிர்சாதனப்பெட்டி + பேருந்து (ஆண்) + 3 LPG",
dmDu:"$22/மாதம் KMUT + $86 கூப்பன் + மடிக்கணினி + காலை உணவு",aiDu:"$22/மாதம் குல விளக்கு + குளிர்சாதனப்பெட்டி + பேருந்து (ஆண்) + 3 LPG",
tabs:["இலவசம் vs வருவாய்","நிதிப் பற்றாக்குறை","தனிநபர் சுமை","கடன் போக்கு","இலவச விவரம்"],
c1T:"மாநில வருவாயில் தேர்தல் இலவசங்களின் %",c1S:"பட்டை = இலவச செலவு | கோடு = வருவாயில் % | நிறம் = ஆளும் அரசு",
c2T:s=>"நிதிப் பற்றாக்குறை: உண்மை + கணிப்பு ("+(s==="dmk"?"திமுக":"அதிமுக")+" அறிக்கை)",c2S:"சிவப்பு கோடு = 3% FRBM வரம்பு | பட்டை = பற்றாக்குறை | கோடு = GSDP %",
c3T:"தனிநபர் சுமை: இலவசம், பற்றாக்குறை & கடன்",c3S:s=>"மக்கள்தொகை: 7.1 கோடி (2011) → 7.96 கோடி (2031) | நிதி26-க்குப் பிறகு "+(s==="dmk"?"திமுக":"அதிமுக")+" கணிப்பு",
c4T:"நிலுவைக் கடன் போக்கு & கடன்/GSDP விகிதம்",c4S:"30% கடன்/GSDP = ஆபத்து மண்டலம் | நிதி25-ல் கடன் ₹8 லட்சம் கோடியைத் தாண்டியது",c4Su:"30% கடன்/GSDP = ஆபத்து மண்டலம் | நிதி25-ல் கடன் $86B-ஐத் தாண்டியது",
c5T:"வகை வாரியான இலவச விவரம்: அரசு வாரி சராசரி ஆண்டு செலவு",c5S:"ஒவ்வொரு அரசின் பதவிக்காலத்திலும் மதிப்பிடப்பட்ட சராசரி ஆண்டு செலவு",
tFP:"வருவாயில் இலவச %",tFS:"இலவச செலவு",tRR:"வருவாய் வரவு",tFD:"நிதிப் பற்றாக்குறை",tAG:"GSDP %",tPr:"(கணிப்பு)",
tFC:"இலவசம்/நபர்",tDC:"பற்றாக்குறை/நபர்",tBC:"கடன்/நபர்",tDb:"நிலுவைக் கடன்",tDG:"கடன்/GSDP",
aPR:"வருவாயில் %",aPG:"GSDP %",aDG:"கடன்/GSDP %",
lFS:"இலவச செலவு",lPR:"வருவாயில் %",lDf:"நிதிப் பற்றாக்குறை",lDb:"கடன்",lDPC:"கடன்/நபர்",lDfPC:"பற்றாக்குறை/நபர்",lFPC:"இலவசம்/நபர்",lDG:"கடன்/GSDP %",
ct1:"PDS / உணவு மானியம்",ct2:"பெண்களுக்கு ரொக்கம்",ct3:"இலவச பேருந்து",ct4:"மடிக்கணினி & கல்வி",ct5:"மின்சாதனங்கள் (மிக்சி)",ct6:"தங்கம் / திருமண உதவி",ct7:"ஓய்வூதியம் & காலை உணவு",ct8:"பொங்கல் & இதர பரிசுகள்",
lA1:"அதிமுக-I (நிதி12–16)",lA2:"அதிமுக-II (நிதி17–21)",lD3:"திமுக (நிதி22–26)",lPj:"2026 அறிக்கை சராசரி",
iD:"திமுக அறிக்கை செயல்படுத்தினால் (நிதி31)",iA:"அதிமுக அறிக்கை செயல்படுத்தினால் (நிதி31)",pF:"இலவச செலவு",pDf:"நிதிப் பற்றாக்குறை",pDb:"கடன்",pDPC:"தனிநபர் கடன்",oR:"வருவாயில்",
kT:"முக்கிய கண்டுபிடிப்புகள்",
k1:c=>"இலவச செலவு 15 ஆண்டுகளில் ~4.7 மடங்கு உயர்ந்தது — "+c(12000)+" (நிதி11) → "+c(56000)+" (நிதி26).",
k2:"இலவசங்கள் மொத்த வருவாயில் ~17% (நிதி26). ஒரு முறை பொருட்களிலிருந்து (TV, மிக்சி) தொடர் பணப்பரிமாற்றத்திற்கு மாறியுள்ளது.",
k3:c=>c==="usd"?"தொடர் கடமைகளுக்கு மாறியது முக்கியம்: KMUT + பேருந்து மானியம் = $1.9B+ நிரந்தர ஆண்டு கடமைகள்.":"தொடர் கடமைகளுக்கு மாறியது முக்கியம்: KMUT + பேருந்து மானியம் = ₹18,000+ கோடி நிரந்தர ஆண்டு கடமைகள்.",
k4:"இரு 2026 அறிக்கைகளும் நிதிப் பற்றாக்குறையை GSDP-யின் 3.5–4.9%-க்கு தள்ளி, 3% FRBM வரம்பை மீறும்.",
k5:c=>c==="usd"?"தனிநபர் கடன் $1,183 (நிதி26) → $2,151–$2,366 (நிதி31) கிட்டத்தட்ட இரட்டிப்பாகும்.":"தனிநபர் கடன் ₹1.1 லட்சத்திலிருந்து (நிதி26) ₹2.0–2.2 லட்சமாக (நிதி31) கிட்டத்தட்ட இரட்டிப்பாகும்.",
mT:"முறையியல் & அனுமானங்கள்",mSL:"ஆதாரங்கள்:",mDL:"வரையறை:",mPL:"கணிப்புகள்:",mFL:"மாற்று விகிதம்:",
mS:"CAG மாநில நிதி தணிக்கை அறிக்கைகள் (நிதி11–24), PRS India பட்ஜெட் (நிதி19–25), தமிழ்நாடு நிதித்துறை (நிதி25–26), NITI Aayog, RBI, திமுக & அதிமுக 2026 தேர்தல் அறிக்கைகள்.",
mD:"தேர்தல் அறிக்கை வாக்குறுதிகளுடன் இணைக்கப்பட்ட மானியங்கள்/நலத்திட்டங்கள் — PDS, போக்குவரத்து, பணப்பரிமாற்றம், மின்சாதனங்கள், மடிக்கணினி, தங்கம், பொங்கல், காலை உணவு, ஓய்வூதியம். வளர்ச்சி நலனை (ICDS, MGNREGA, வீட்டுவசதி) விலக்குகிறது.",
mP:"வருவாய் 10% CAGR, GSDP 11% CAGR, மக்கள்தொகை ஆண்டுக்கு 0.5%. ஒரு முறை செலவுகள் 2 ஆண்டுகளில். தொடர் செலவுகள் 2-ம் ஆண்டிலிருந்து முழு விகிதத்தில். ஈடு செய்யும் வெட்டுகள் அனுமானிக்கப்படவில்லை.",
mF:"₹93 = $1 (தோராயம், ஒப்பீட்டுக்காக).",
ft:"பகுப்பாய்வு ஏப்ரல் 2026 · முதலீடு/கொள்கை ஆலோசனை அல்ல · பொது ஆதாரங்களிலிருந்து மதிப்பீடு",
cur:"நாணயம்",lng:"மொழி"}};

const FD=[
{yr:"FY11",rR:70200,fD:15800,fS:12000,g:600000,d:100000,p:7.10,e:"pre"},
{yr:"FY12",rR:85220,fD:17275,fS:18500,g:640000,d:115000,p:7.13,e:"aiadmk1"},
{yr:"FY13",rR:98828,fD:16519,fS:22000,g:750000,d:128000,p:7.16,e:"aiadmk1"},
{yr:"FY14",rR:108000,fD:25000,fS:25000,g:850000,d:145000,p:7.19,e:"aiadmk1"},
{yr:"FY15",rR:121000,fD:28500,fS:27500,g:980000,d:165000,p:7.22,e:"aiadmk1"},
{yr:"FY16",rR:132000,fD:35000,fS:29000,g:1060000,d:190000,p:7.25,e:"aiadmk1"},
{yr:"FY17",rR:142000,fD:38500,fS:31000,g:1190000,d:215000,p:7.30,e:"aiadmk2"},
{yr:"FY18",rR:158000,fD:34000,fS:33000,g:1340000,d:240000,p:7.35,e:"aiadmk2"},
{yr:"FY19",rR:173000,fD:39000,fS:35000,g:1500000,d:270000,p:7.40,e:"aiadmk2"},
{yr:"FY20",rR:196000,fD:44176,fS:37000,g:1730000,d:310000,p:7.45,e:"aiadmk2"},
{yr:"FY21",rR:186000,fD:96890,fS:40000,g:1740000,d:420000,p:7.50,e:"aiadmk2"},
{yr:"FY22",rR:210000,fD:82000,fS:43000,g:2140000,d:510000,p:7.55,e:"dmk3"},
{yr:"FY23",rR:246000,fD:81886,fS:46000,g:2480000,d:600000,p:7.60,e:"dmk3"},
{yr:"FY24",rR:265000,fD:90430,fS:49000,g:2720000,d:690000,p:7.65,e:"dmk3"},
{yr:"FY25",rR:280000,fD:108690,fS:52000,g:3120000,d:780000,p:7.70,e:"dmk3"},
{yr:"FY26",rR:331569,fD:112000,fS:56000,g:3450000,d:850000,p:7.75,e:"dmk3"}];

const pD=[
{yr:"FY27",rR:360000,fD:145000,fS:88000,g:3830000,d:990000,p:7.80},
{yr:"FY28",rR:394000,fD:155000,fS:95000,g:4250000,d:1140000,p:7.84},
{yr:"FY29",rR:430000,fD:162000,fS:100000,g:4720000,d:1290000,p:7.88},
{yr:"FY30",rR:470000,fD:170000,fS:106000,g:5240000,d:1450000,p:7.92},
{yr:"FY31",rR:513000,fD:178000,fS:112000,g:5820000,d:1620000,p:7.96}];

const pA=[
{yr:"FY27",rR:360000,fD:160000,fS:98000,g:3830000,d:1010000,p:7.80},
{yr:"FY28",rR:394000,fD:172000,fS:106000,g:4250000,d:1180000,p:7.84},
{yr:"FY29",rR:430000,fD:182000,fS:112000,g:4720000,d:1350000,p:7.88},
{yr:"FY30",rR:470000,fD:192000,fS:118000,g:5240000,d:1530000,p:7.92},
{yr:"FY31",rR:513000,fD:204000,fS:125000,g:5820000,d:1720000,p:7.96}];

const EC={pre:"#6B7280",aiadmk1:"#1E40AF",aiadmk2:"#3B82F6",dmk3:"#DC2626"};
const TTS={background:"rgba(15,15,20,0.95)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"12px 16px",color:"#E5E7EB",fontSize:"13px",lineHeight:"1.6",backdropFilter:"blur(8px)"};

function Tog({label,optA,optB,value,onChange}){const isB=value==="b";return(
<div style={{display:"flex",alignItems:"center",gap:8}}>
<span style={{fontSize:11,color:"#6B7280",fontWeight:600,minWidth:50}}>{label}</span>
<div onClick={()=>onChange(isB?"a":"b")} style={{width:52,height:26,borderRadius:13,cursor:"pointer",position:"relative",background:isB?"#F59E0B":"rgba(255,255,255,0.12)",transition:"background 0.2s"}}>
<div style={{width:20,height:20,borderRadius:10,background:"#fff",position:"absolute",top:3,left:isB?29:3,transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.3)"}}/></div>
<span style={{fontSize:11,color:isB?"#F59E0B":"#9CA3AF",fontWeight:600,minWidth:30}}>{isB?optB:optA}</span></div>)}

function C1({data,t,cur}){const cd=data.map(d=>({yr:d.yr,pct:(d.fS/d.rR*100),fCr:d.fS,rCr:d.rR,e:d.e}));
return<div style={{width:"100%",height:380}}><ResponsiveContainer><ComposedChart data={cd} margin={{top:20,right:30,left:10,bottom:5}}>
<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)"/>
<XAxis dataKey="yr" tick={{fill:"#9CA3AF",fontSize:11}}/>
<YAxis yAxisId="left" tick={{fill:"#9CA3AF",fontSize:11}} tickFormatter={v=>v.toFixed(0)+"%"} domain={[0,35]} label={{value:t.aPR,angle:-90,position:"insideLeft",fill:"#9CA3AF",fontSize:11}}/>
<YAxis yAxisId="right" orientation="right" tick={{fill:"#9CA3AF",fontSize:11}} tickFormatter={v=>fmtAxCr(v,cur)} label={{value:axCL(cur),angle:90,position:"insideRight",fill:"#9CA3AF",fontSize:11}}/>
<Tooltip content={({active,payload})=>{if(!active||!payload?.length)return null;const d=payload[0].payload;
return<div style={TTS}><div style={{fontWeight:700,marginBottom:4}}>{d.yr}</div>
<div>{t.tFP}: <span style={{color:"#F59E0B",fontWeight:600}}>{d.pct.toFixed(1)}%</span></div>
<div>{t.tFS}: <span style={{color:"#EF4444"}}>{fmtCr(d.fCr,cur)}</span></div>
<div>{t.tRR}: <span style={{color:"#10B981"}}>{fmtCr(d.rCr,cur)}</span></div></div>}}/>
<Bar yAxisId="right" dataKey="fCr" name={t.lFS} radius={[3,3,0,0]} opacity={0.7}>
{cd.map((r,i)=><Cell key={i} fill={EC[r.e]||"#6B7280"}/>)}</Bar>
<Line yAxisId="left" type="monotone" dataKey="pct" stroke="#F59E0B" strokeWidth={3} dot={{r:4,fill:"#F59E0B"}} name={t.lPR}/>
<ReferenceLine yAxisId="left" y={15} stroke="#F59E0B" strokeDasharray="6 4" opacity={0.4}/>
</ComposedChart></ResponsiveContainer></div>}

function C2({data,prD,prA,sc,t,cur}){
const h=data.map(r=>({yr:r.yr,pct:(r.fD/r.g*100),cr:r.fD,e:r.e}));
const pr=(sc==="dmk"?prD:prA).map(r=>({yr:r.yr,pct:(r.fD/r.g*100),cr:r.fD,e:"proj"}));
const a=[...h,...pr];
return<div style={{width:"100%",height:380}}><ResponsiveContainer><ComposedChart data={a} margin={{top:20,right:30,left:10,bottom:5}}>
<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)"/>
<XAxis dataKey="yr" tick={{fill:"#9CA3AF",fontSize:11}}/>
<YAxis yAxisId="left" tick={{fill:"#9CA3AF",fontSize:11}} tickFormatter={v=>v.toFixed(1)+"%"} domain={[0,6]} label={{value:t.aPG,angle:-90,position:"insideLeft",fill:"#9CA3AF",fontSize:11}}/>
<YAxis yAxisId="right" orientation="right" tick={{fill:"#9CA3AF",fontSize:11}} tickFormatter={v=>fmtAxCr(v,cur)} label={{value:axCL(cur),angle:90,position:"insideRight",fill:"#9CA3AF",fontSize:11}}/>
<Tooltip content={({active,payload})=>{if(!active||!payload?.length)return null;const p=payload[0].payload;
return<div style={TTS}><div style={{fontWeight:700,marginBottom:4}}>{p.yr} {p.e==="proj"?t.tPr:""}</div>
<div>{t.tFD}: <span style={{color:"#EF4444",fontWeight:600}}>{fmtCr(p.cr,cur)}</span></div>
<div>{t.tAG}: <span style={{color:"#F59E0B",fontWeight:600}}>{p.pct.toFixed(2)}%</span></div></div>}}/>
<ReferenceLine yAxisId="left" y={3} stroke="#EF4444" strokeDasharray="6 4" opacity={0.6}/>
<Bar yAxisId="right" dataKey="cr" name={t.lDf} radius={[3,3,0,0]} opacity={0.65}>
{a.map((r,i)=><Cell key={i} fill={r.e==="proj"?(sc==="dmk"?"#DC2626":"#2563EB"):(EC[r.e]||"#6B7280")}/>)}</Bar>
<Line yAxisId="left" type="monotone" dataKey="pct" stroke="#F59E0B" strokeWidth={3} dot={{r:3,fill:"#F59E0B"}}/>
</ComposedChart></ResponsiveContainer></div>}

function C3({data,prD,prA,sc,t,cur}){
const pr=sc==="dmk"?prD:prA;
const a=[...data,...pr].map(r=>({yr:r.yr,fdPC:Math.round(r.fD/r.p),frPC:Math.round(r.fS/r.p),dtPC:Math.round(r.d/r.p),isP:!r.e}));
return<div style={{width:"100%",height:380}}><ResponsiveContainer><ComposedChart data={a} margin={{top:20,right:30,left:10,bottom:5}}>
<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)"/>
<XAxis dataKey="yr" tick={{fill:"#9CA3AF",fontSize:11}}/>
<YAxis tick={{fill:"#9CA3AF",fontSize:11}} tickFormatter={v=>fmtAxPC(v,cur)} label={{value:axPCL(cur),angle:-90,position:"insideLeft",fill:"#9CA3AF",fontSize:11}}/>
<Tooltip content={({active,payload})=>{if(!active||!payload?.length)return null;const p=payload[0].payload;
return<div style={TTS}><div style={{fontWeight:700,marginBottom:4}}>{p.yr} {p.isP?t.tPr:""}</div>
<div>{t.tFC}: <span style={{color:"#F59E0B",fontWeight:600}}>{fmtPC(p.frPC,cur)}</span></div>
<div>{t.tDC}: <span style={{color:"#EF4444",fontWeight:600}}>{fmtPC(p.fdPC,cur)}</span></div>
<div>{t.tBC}: <span style={{color:"#8B5CF6",fontWeight:600}}>{fmtPC(p.dtPC,cur)}</span></div></div>}}/>
<Area type="monotone" dataKey="dtPC" fill="#8B5CF6" fillOpacity={0.15} stroke="#8B5CF6" strokeWidth={2} name={t.lDPC}/>
<Line type="monotone" dataKey="fdPC" stroke="#EF4444" strokeWidth={2.5} dot={{r:3}} name={t.lDfPC}/>
<Line type="monotone" dataKey="frPC" stroke="#F59E0B" strokeWidth={2.5} dot={{r:3}} name={t.lFPC}/>
</ComposedChart></ResponsiveContainer></div>}

function C4({data,prD,prA,sc,t,cur}){
const pr=sc==="dmk"?prD:prA;
const a=[...data,...pr].map(r=>({yr:r.yr,pct:(r.d/r.g*100),cr:r.d,isP:!r.e}));
return<div style={{width:"100%",height:380}}><ResponsiveContainer><ComposedChart data={a} margin={{top:20,right:30,left:10,bottom:5}}>
<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)"/>
<XAxis dataKey="yr" tick={{fill:"#9CA3AF",fontSize:11}}/>
<YAxis yAxisId="left" tick={{fill:"#9CA3AF",fontSize:11}} tickFormatter={v=>v.toFixed(0)+"%"} domain={[10,35]} label={{value:t.aDG,angle:-90,position:"insideLeft",fill:"#9CA3AF",fontSize:11}}/>
<YAxis yAxisId="right" orientation="right" tick={{fill:"#9CA3AF",fontSize:11}} tickFormatter={v=>fmtAxLC(v,cur)} label={{value:axCLB(cur),angle:90,position:"insideRight",fill:"#9CA3AF",fontSize:11}}/>
<Tooltip content={({active,payload})=>{if(!active||!payload?.length)return null;const p=payload[0].payload;
return<div style={TTS}><div style={{fontWeight:700,marginBottom:4}}>{p.yr} {p.isP?t.tPr:""}</div>
<div>{t.tDb}: <span style={{color:"#8B5CF6",fontWeight:600}}>{fmtLCr(p.cr,cur)}</span></div>
<div>{t.tDG}: <span style={{color:"#EF4444",fontWeight:600}}>{p.pct.toFixed(1)}%</span></div></div>}}/>
<ReferenceLine yAxisId="left" y={30} stroke="#EF4444" strokeDasharray="6 4" opacity={0.5}/>
<Area yAxisId="right" type="monotone" dataKey="cr" fill="#8B5CF6" fillOpacity={0.2} stroke="#8B5CF6" strokeWidth={2} name={t.lDb}/>
<Line yAxisId="left" type="monotone" dataKey="pct" stroke="#EF4444" strokeWidth={3} dot={{r:3,fill:"#EF4444"}} name={t.lDG}/>
</ComposedChart></ResponsiveContainer></div>}

function C5({t,cur}){
const bd=[
{category:t.ct1,a1:8000,a2:9000,d3:11000,pj:13000},
{category:t.ct2,a1:0,a2:0,d3:15000,pj:24000},
{category:t.ct3,a1:1800,a2:2500,d3:3600,pj:7200},
{category:t.ct4,a1:3500,a2:2800,d3:3500,pj:5000},
{category:t.ct5,a1:4500,a2:2000,d3:1500,pj:8000},
{category:t.ct6,a1:2000,a2:2500,d3:2000,pj:3000},
{category:t.ct7,a1:1200,a2:2200,d3:4500,pj:7000},
{category:t.ct8,a1:800,a2:1200,d3:2400,pj:4000}];
return<div style={{width:"100%",height:420}}><ResponsiveContainer><BarChart data={bd} layout="vertical" margin={{top:10,right:30,left:90,bottom:5}}>
<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)"/>
<XAxis type="number" tick={{fill:"#9CA3AF",fontSize:11}} tickFormatter={v=>cur==="usd"?"$"+((v*1e7/FX)/1e6).toFixed(0)+"M":"₹"+(v/1e3).toFixed(0)+"K Cr"}/>
<YAxis type="category" dataKey="category" tick={{fill:"#D1D5DB",fontSize:10}} width={85}/>
<Tooltip content={({active,payload,label})=>{if(!active||!payload?.length)return null;
return<div style={TTS}><div style={{fontWeight:700,marginBottom:6}}>{label}</div>
{payload.map((p,i)=><div key={i}><span style={{color:p.color}}>{p.name}</span>: {fmtCr(p.value,cur)}</div>)}</div>}}/>
<Legend wrapperStyle={{fontSize:11,color:"#9CA3AF"}}/>
<Bar dataKey="a1" name={t.lA1} fill="#1E40AF" radius={[0,3,3,0]} barSize={10}/>
<Bar dataKey="a2" name={t.lA2} fill="#3B82F6" radius={[0,3,3,0]} barSize={10}/>
<Bar dataKey="d3" name={t.lD3} fill="#DC2626" radius={[0,3,3,0]} barSize={10}/>
<Bar dataKey="pj" name={t.lPj} fill="#F59E0B" radius={[0,3,3,0]} barSize={10}/>
</BarChart></ResponsiveContainer></div>}

function SC({label,value,sub,color="#F59E0B"}){return<div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"16px 20px",flex:"1 1 0",minWidth:160}}>
<div style={{fontSize:11,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{label}</div>
<div style={{fontSize:26,fontWeight:800,color,lineHeight:1.1}}>{value}</div>
{sub&&<div style={{fontSize:11,color:"#6B7280",marginTop:4}}>{sub}</div>}</div>}

export default function Dashboard(){
const[sc,setSc]=useState("dmk");
const[tab,setTab]=useState(0);
const[cur,setCur]=useState("inr");
const[lang,setLang]=useState("en");
const t=T[lang];const L=FD[FD.length-1];
const tF=FD.slice(1).reduce((s,d)=>s+d.fS,0);
const P=sc==="dmk"?pD[4]:pA[4];
const c=v=>fmtCr(v,cur);const lc=v=>fmtLCr(v,cur);const pc=v=>fmtPC(v,cur);
const sDesc=cur==="usd"?(sc==="dmk"?t.dmDu:t.aiDu):(sc==="dmk"?t.dmD:t.aiD);
const c4s=cur==="usd"?(t.c4Su||t.c4S):t.c4S;

return(<div style={{fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",background:"#0A0A0F",color:"#E5E7EB",minHeight:"100vh",padding:"32px 24px",maxWidth:960,margin:"0 auto"}}>

<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:16,marginBottom:8}}>
<div style={{display:"flex",alignItems:"center",gap:10,flex:1}}>
<div style={{width:4,height:40,background:"linear-gradient(180deg,#EF4444,#F59E0B)",borderRadius:2}}/>
<div><h1 style={{fontSize:28,fontWeight:900,margin:0,letterSpacing:"-0.02em",color:"#F9FAFB",lineHeight:1.1}}>{t.title}</h1>
<div style={{fontSize:13,color:"#6B7280",marginTop:4}}>{t.subtitle}</div></div></div>
<div style={{display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
<Tog label={t.cur} optA="INR" optB="USD" value={cur==="usd"?"b":"a"} onChange={v=>setCur(v==="b"?"usd":"inr")}/>
<Tog label={t.lng} optA="EN" optB="தமிழ்" value={lang==="ta"?"b":"a"} onChange={v=>setLang(v==="b"?"ta":"en")}/>
</div></div>

<p style={{fontSize:13,color:"#9CA3AF",lineHeight:1.7,margin:"12px 0 24px 0",maxWidth:820}}>
{t.intro}<span style={{color:"#3B82F6",fontWeight:600}}>{t.a1L}</span>, <span style={{color:"#60A5FA",fontWeight:600}}>{t.a2L}</span>, <span style={{color:"#EF4444",fontWeight:600}}>{t.d3L}</span>{t.introTail}</p>

<div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:28}}>
<SC label={t.sfL} value={c(L.fS)} sub={`${(L.fS/L.rR*100).toFixed(1)}% ${t.sfR}`} color="#F59E0B"/>
<SC label={t.stL} value={lc(tF)} sub={t.stS} color="#10B981"/>
<SC label={t.sdL} value={c(L.fD)} sub={`${(L.fD/L.g*100).toFixed(1)}% ${t.sdG}`} color="#EF4444"/>
<SC label={t.sdbL} value={lc(L.d)} sub={`${(L.d/L.g*100).toFixed(0)}% ${t.sdbS}`} color="#8B5CF6"/>
</div>

<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,padding:"12px 16px",background:"rgba(255,255,255,0.03)",borderRadius:10,border:"1px solid rgba(255,255,255,0.06)",flexWrap:"wrap"}}>
<span style={{fontSize:12,color:"#9CA3AF",fontWeight:600}}>{t.pL}</span>
<button onClick={()=>setSc("dmk")} style={{padding:"6px 16px",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:700,background:sc==="dmk"?"#DC2626":"transparent",color:sc==="dmk"?"#fff":"#9CA3AF",border:sc==="dmk"?"none":"1px solid rgba(255,255,255,0.15)"}}>{t.dmM}</button>
<button onClick={()=>setSc("aiadmk")} style={{padding:"6px 16px",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:700,background:sc==="aiadmk"?"#1E40AF":"transparent",color:sc==="aiadmk"?"#fff":"#9CA3AF",border:sc==="aiadmk"?"none":"1px solid rgba(255,255,255,0.15)"}}>{t.aiM}</button>
<span style={{fontSize:11,color:"#6B7280"}}>{sDesc}</span></div>

<div style={{display:"flex",gap:4,marginBottom:4,overflowX:"auto",paddingBottom:4}}>
{t.tabs.map((tb,i)=><button key={i} onClick={()=>setTab(i)} style={{padding:"10px 18px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:600,whiteSpace:"nowrap",background:tab===i?"rgba(245,158,11,0.15)":"transparent",color:tab===i?"#F59E0B":"#6B7280",border:tab===i?"1px solid rgba(245,158,11,0.3)":"1px solid transparent"}}>{tb}</button>)}</div>

<div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:"24px 16px 16px",marginBottom:24}}>
{tab===0&&<><h3 style={{fontSize:16,fontWeight:700,margin:"0 0 4px 8px",color:"#F9FAFB"}}>{t.c1T}</h3><p style={{fontSize:12,color:"#6B7280",margin:"0 0 12px 8px"}}>{t.c1S}</p><C1 data={FD} t={t} cur={cur}/></>}
{tab===1&&<><h3 style={{fontSize:16,fontWeight:700,margin:"0 0 4px 8px",color:"#F9FAFB"}}>{t.c2T(sc)}</h3><p style={{fontSize:12,color:"#6B7280",margin:"0 0 12px 8px"}}>{t.c2S}</p><C2 data={FD} prD={pD} prA={pA} sc={sc} t={t} cur={cur}/></>}
{tab===2&&<><h3 style={{fontSize:16,fontWeight:700,margin:"0 0 4px 8px",color:"#F9FAFB"}}>{t.c3T}</h3><p style={{fontSize:12,color:"#6B7280",margin:"0 0 12px 8px"}}>{t.c3S(sc)}</p><C3 data={FD} prD={pD} prA={pA} sc={sc} t={t} cur={cur}/></>}
{tab===3&&<><h3 style={{fontSize:16,fontWeight:700,margin:"0 0 4px 8px",color:"#F9FAFB"}}>{t.c4T}</h3><p style={{fontSize:12,color:"#6B7280",margin:"0 0 12px 8px"}}>{c4s}</p><C4 data={FD} prD={pD} prA={pA} sc={sc} t={t} cur={cur}/></>}
{tab===4&&<><h3 style={{fontSize:16,fontWeight:700,margin:"0 0 4px 8px",color:"#F9FAFB"}}>{t.c5T}</h3><p style={{fontSize:12,color:"#6B7280",margin:"0 0 12px 8px"}}>{t.c5S}</p><C5 t={t} cur={cur}/></>}
</div>

<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:28}}>
{[["dmk",pD[4],"#EF4444","rgba(220,38,38,0.06)","1px solid rgba(220,38,38,0.2)"],["aiadmk",pA[4],"#3B82F6","rgba(30,64,175,0.08)","1px solid rgba(59,130,246,0.25)"]].map(([k,p,col,bg,bd])=>
<div key={k} style={{background:bg,border:bd,borderRadius:12,padding:20}}>
<h4 style={{fontSize:13,fontWeight:800,color:col,margin:"0 0 10px 0",textTransform:"uppercase",letterSpacing:0.5}}>{k==="dmk"?t.iD:t.iA}</h4>
<div style={{fontSize:12,color:"#D1D5DB",lineHeight:1.8}}>
<div>{t.pF}: <strong style={{color:"#F59E0B"}}>{lc(p.fS)}</strong> ({(p.fS/p.rR*100).toFixed(0)}% {t.oR})</div>
<div>{t.pDf}: <strong style={{color:"#EF4444"}}>{lc(p.fD)}</strong> ({(p.fD/p.g*100).toFixed(1)}% GSDP)</div>
<div>{t.pDb}: <strong style={{color:"#8B5CF6"}}>{lc(p.d)}</strong> ({(p.d/p.g*100).toFixed(1)}% GSDP)</div>
<div>{t.pDPC}: <strong style={{color:"#8B5CF6"}}>{pc(Math.round(p.d/p.p))}</strong></div></div></div>)}</div>

<div style={{background:"rgba(245,158,11,0.05)",border:"1px solid rgba(245,158,11,0.15)",borderRadius:12,padding:20,marginBottom:24}}>
<h4 style={{fontSize:14,fontWeight:800,color:"#F59E0B",margin:"0 0 12px 0"}}>{t.kT}</h4>
<div style={{fontSize:12.5,color:"#D1D5DB",lineHeight:1.9}}>
<div><strong>1.</strong> {t.k1(c)}</div>
<div><strong>2.</strong> {t.k2}</div>
<div><strong>3.</strong> {t.k3(cur)}</div>
<div><strong style={{color:"#EF4444"}}>4.</strong> {t.k4}</div>
<div><strong style={{color:"#8B5CF6"}}>5.</strong> {t.k5(cur)}</div></div></div>

<div style={{background:"rgba(255,255,255,0.02)",borderRadius:12,padding:20,border:"1px solid rgba(255,255,255,0.05)",marginBottom:16}}>
<h4 style={{fontSize:13,fontWeight:700,color:"#9CA3AF",margin:"0 0 10px 0"}}>{t.mT}</h4>
<div style={{fontSize:11.5,color:"#6B7280",lineHeight:1.8}}>
<div><strong>{t.mSL}</strong> {t.mS}</div>
<div><strong>{t.mDL}</strong> {t.mD}</div>
<div><strong>{t.mPL}</strong> {t.mP}</div>
{cur==="usd"&&<div><strong>{t.mFL}</strong> {t.mF}</div>}</div></div>

<div style={{textAlign:"center",fontSize:10,color:"#4B5563",padding:"12px 0"}}>{t.ft}</div>
</div>)}
