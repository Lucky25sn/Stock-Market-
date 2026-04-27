/* ── Chart defaults (light palette) ─────────────────────── */
Chart.defaults.color         = '#78716c';
Chart.defaults.borderColor   = '#e8e4de';
Chart.defaults.font.family   = "'Plus Jakarta Sans', sans-serif";
Chart.defaults.font.size     = 11;

const P = ['#1d4ed8','#6d28d9','#047857','#b45309','#e11d48'];
const toRgba = (hex, a) => {
  const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
};

const gridLine = { color:'#f0ede8' };
const tickStyle = { color:'#a89e91', font:{ size:10 } };
const scaleY = (opts={}) => ({ grid:gridLine, ticks:tickStyle, ...opts });
const scaleX = (opts={}) => ({ grid:{display:false}, ticks:tickStyle, ...opts });
const tooltipStyle = {
  backgroundColor:'#ffffff', titleColor:'#1c1917', bodyColor:'#78716c',
  borderColor:'#e8e4de', borderWidth:1.5, padding:10, cornerRadius:8,
  titleFont:{ weight:700, size:12 }, bodyFont:{ size:11 }
};
const legendStyle = { labels:{ color:'#78716c', font:{ size:10.5 }, boxWidth:10, padding:14 } };

/* ── REAL DATA from Python pipeline ─────────────────────── */
const D = {
  models:{
    "Logistic Regression":{accuracy:.4971,roc_auc:.4688,cv_mean:.4877,cv_std:.0459,confusion:[[29,50],[37,57]],fpr:[0,.0127,.0506,.0506,.0633,.0633,.0759,.0759,.1013,.1013,.1139,.1139,.1392,.1392,.1646,.1646,.2025,.2025,.2152,.2152,.2405,.2405,.2911,.2911,.3038,.3038,.3165,.3165,.3418,.3418,.3544,.3544,.3671,.3671,.3797,.3797,.3924,.3924,.4051,.4051,.4177,.4177,.443,.443,.4557,.4557,.481,.481,.519,.519],tpr:[0,0,0,.0106,.0106,.0319,.0319,.0532,.0532,.0745,.0745,.0957,.0957,.1277,.1277,.1489,.1489,.1596,.1596,.1915,.1915,.234,.234,.2447,.2447,.2553,.2553,.266,.266,.2979,.2979,.3298,.3298,.3511,.3511,.383,.383,.3936,.3936,.4149,.4149,.4255,.4255,.4468,.4468,.4894,.4894,.5,.5,.5213]},
    "Random Forest":{accuracy:.5202,roc_auc:.511,cv_mean:.4938,cv_std:.06,confusion:[[46,33],[50,44]],fpr:[0,0,.038,.038,.0506,.0506,.0633,.0633,.1013,.1013,.1139,.1139,.1266,.1266,.1646,.1646,.1772,.1772,.1899,.1899,.2405,.2405,.2785,.2785,.2911,.2911,.3038,.3038,.3165,.3165,.3544,.3544,.3671,.3671,.3797,.3797,.3924,.3924,.4304,.4304,.481,.481,.4937,.4937,.5063,.5063,.519,.519,.557,.557],tpr:[0,.0106,.0106,.0213,.0213,.0319,.0319,.0426,.0426,.0532,.0532,.0851,.0851,.1064,.1064,.1596,.1596,.2128,.2128,.2553,.2553,.266,.266,.2766,.2766,.3085,.3085,.3298,.3298,.383,.383,.4043,.4043,.4255,.4255,.4468,.4468,.4681,.4681,.4894,.4894,.5,.5,.5106,.5106,.5532,.5532,.5745,.5745,.6064]},
    "Gradient Boosting":{accuracy:.526,roc_auc:.5097,cv_mean:.5086,cv_std:.0403,confusion:[[17,62],[20,74]],fpr:[0,0,.0127,.0127,.0253,.0253,.038,.038,.0633,.0633,.0759,.0759,.0886,.0886,.1013,.1013,.1266,.1266,.1392,.1392,.1519,.1519,.1899,.1899,.2025,.2025,.2278,.2278,.2405,.2405,.2658,.2658,.3165,.3165,.3291,.3291,.3418,.3418,.3544,.3544,.4051,.4051,.4304,.4304,.4684,.4684,.5316,.5316,.5443,.5443],tpr:[0,.0106,.0106,.0213,.0213,.0532,.0532,.0851,.0851,.0957,.0957,.1489,.1489,.1596,.1596,.1702,.1702,.1809,.1809,.2234,.2234,.234,.234,.2447,.2447,.2553,.2553,.2766,.2766,.3085,.3085,.3191,.3191,.3298,.3298,.3404,.3404,.3723,.3723,.4043,.4043,.4255,.4255,.4362,.4362,.4574,.4574,.4787,.4787,.5]},
    "SVM":{accuracy:.4798,roc_auc:.4732,cv_mean:.4963,cv_std:.0487,confusion:[[15,64],[26,68]],fpr:[0,0,.0127,.0127,.0253,.0253,.038,.038,.0506,.0506,.0633,.0633,.0759,.0759,.1013,.1013,.1139,.1139,.1266,.1266,.1392,.1392,.1772,.1772,.1899,.1899,.2025,.2025,.2278,.2278,.2405,.2405,.2532,.2532,.2658,.2658,.3038,.3038,.3797,.3797,.3924,.3924,.4304,.4304,.443,.443,.4557,.4557,.481,.481],tpr:[0,.0106,.0106,.0319,.0319,.0426,.0426,.0532,.0532,.0638,.0638,.0745,.0745,.0851,.0851,.1383,.1383,.1596,.1596,.1702,.1702,.1809,.1809,.2128,.2128,.2447,.2447,.266,.266,.2766,.2766,.2979,.2979,.3191,.3191,.3298,.3298,.3404,.3404,.3617,.3617,.3936,.3936,.4149,.4149,.4574,.4574,.4787,.4787,.4894]}
  },
  backtest:{
    "Logistic Regression":{final_return:.0794,sharpe:.7516,max_dd:-.0998,win_rate:.5373,n_trades:67,cum_strat:[1.1692,1.1989,1.196,1.1991,1.1957,1.1964,1.1734,1.1437,1.1437,1.1268,1.1268,1.1268,1.1268,1.1268,1.1268,1.1268,1.1268,1.1268,1.1268,1.1268,1.1268,1.1268,1.1268,1.1268,1.1268,1.1268,1.1268,1.1268,1.1268,1.1268,1.1268,1.1328,1.1353,1.1343,1.1194,1.1141,1.081,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794,1.0794],cum_bh:[1.3833,1.4184,1.415,1.4187,1.4147,1.4155,1.3883,1.3531,1.393,1.3723,1.3484,1.2976,1.2831,1.2533,1.2913,1.3153,1.2995,1.3537,1.3783,1.3706,1.3107,1.3663,1.333,1.2945,1.3189,1.3785,1.4137,1.4286,1.4444,1.4672,1.4878,1.4958,1.4991,1.4978,1.4781,1.4711,1.4274,1.4253,1.4005,1.3734,1.3783,1.4137,1.4377,1.398,1.3737,1.3976,1.3735,1.3684,1.3824,1.359,1.3619,1.33,1.3161,1.3241,1.2871,1.2977,1.2976,1.311,1.3167,1.3498]},
    "Random Forest":{final_return:-.0397,sharpe:-.3709,max_dd:-.1019,win_rate:.5714,n_trades:42,cum_strat:[.9624,.9624,.9601,.9626,.9599,.9604,.942,.942,.942,.942,.942,.942,.942,.942,.942,.942,.942,.942,.942,.942,.942,.942,.942,.942,.942,.942,.942,.942,.942,.942,.9552,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603,.9603],cum_bh:[1.3833,1.4184,1.415,1.4187,1.4147,1.4155,1.3883,1.3531,1.393,1.3723,1.3484,1.2976,1.2831,1.2533,1.2913,1.3153,1.2995,1.3537,1.3783,1.3706,1.3107,1.3663,1.333,1.2945,1.3189,1.3785,1.4137,1.4286,1.4444,1.4672,1.4878,1.4958,1.4991,1.4978,1.4781,1.4711,1.4274,1.4253,1.4005,1.3734,1.3783,1.4137,1.4377,1.398,1.3737,1.3976,1.3735,1.3684,1.3824,1.359,1.3619,1.33,1.3161,1.3241,1.2871,1.2977,1.2976,1.311,1.3167,1.3498]},
    "Gradient Boosting":{final_return:.2267,sharpe:1.3769,max_dd:-.089,win_rate:.5583,n_trades:120,cum_strat:[1.238,1.238,1.2351,1.2382,1.2382,1.239,1.2151,1.2151,1.2151,1.2151,1.194,1.194,1.1807,1.1532,1.1882,1.1882,1.1739,1.2229,1.2229,1.2161,1.1629,1.1629,1.1346,1.1346,1.1346,1.1858,1.2161,1.2289,1.2425,1.2621,1.2799,1.2867,1.2895,1.2895,1.2725,1.2665,1.2289,1.2289,1.2076,1.2076,1.2118,1.243,1.243,1.243,1.2214,1.2214,1.2003,1.2003,1.2003,1.2003,1.203,1.1748,1.1748,1.1748,1.1748,1.1845,1.1844,1.1966,1.1966,1.2267],cum_bh:[1.3833,1.4184,1.415,1.4187,1.4147,1.4155,1.3883,1.3531,1.393,1.3723,1.3484,1.2976,1.2831,1.2533,1.2913,1.3153,1.2995,1.3537,1.3783,1.3706,1.3107,1.3663,1.333,1.2945,1.3189,1.3785,1.4137,1.4286,1.4444,1.4672,1.4878,1.4958,1.4991,1.4978,1.4781,1.4711,1.4274,1.4253,1.4005,1.3734,1.3783,1.4137,1.4377,1.398,1.3737,1.3976,1.3735,1.3684,1.3824,1.359,1.3619,1.33,1.3161,1.3241,1.2871,1.2977,1.2976,1.311,1.3167,1.3498]},
    "SVM":{final_return:-.0043,sharpe:-.2298,max_dd:-.0179,win_rate:.6667,n_trades:3,cum_strat:[.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957,.9957],cum_bh:[1.3833,1.4184,1.415,1.4187,1.4147,1.4155,1.3883,1.3531,1.393,1.3723,1.3484,1.2976,1.2831,1.2533,1.2913,1.3153,1.2995,1.3537,1.3783,1.3706,1.3107,1.3663,1.333,1.2945,1.3189,1.3785,1.4137,1.4286,1.4444,1.4672,1.4878,1.4958,1.4991,1.4978,1.4781,1.4711,1.4274,1.4253,1.4005,1.3734,1.3783,1.4137,1.4377,1.398,1.3737,1.3976,1.3735,1.3684,1.3824,1.359,1.3619,1.33,1.3161,1.3241,1.2871,1.2977,1.2976,1.311,1.3167,1.3498]}
  },
  features:{"Volume_Ratio":.06188,"Returns_5d":.06149,"High_Low_Range":.05417,"Volatility_20d":.048,"SMA_50":.04616,"MACD_Hist":.04597,"OBV":.04495,"RSI":.04349,"BB_Pct":.04184,"Gap":.04073,"EMA_50":.04054,"Returns_20d":.03954},
  price:[368.95,366.75,364.56,362.56,376.48,379.2,382.26,389.53,391.32,389.62,388.36,387.98,387.84,393.07,393.55,398.9,398.44,399.12,385.14,391.66,394.23,401.49,381.21,395.93,395.06,403.14,395.78,400.29,392.89,388.62,402.36,401.11,402.8,409.28,413.07,414.32,417.17,435.75,435.43,437.14,445.62,454.71,464.67,470.18,460.75,474.64,465.08,467.76,461.59,461.2,464.08,466.91,470.61,484.62,488.74,486.75,495.41,506.29,495.37,500.88,507.39,504.83,517.64,516.4,517.73,516.27,516.57,506.63,493.81,508.35,500.8,492.09,473.53,468.25,457.37,471.23,480.02,474.25,494.02,502.98,500.2,478.34,498.63,486.45,472.4,481.32,503.08,515.93,521.35,527.12,535.44,542.96,545.88,547.07,546.62,539.41,536.86,520.9,520.13,511.11,501.21,502.99,515.9,524.66,510.19,501.33,510.05,501.26,499.38,504.5,495.93,497.03,485.38,480.3,483.21,469.7,473.58,473.55,478.43,480.5],
  sma20:[370.22,368.46,367.59,366.21,366.12,366.29,366.98,368.45,369.63,370.87,371.92,372.97,373.85,374.96,376.5,377.99,379.61,381.76,383.34,384.76,386.03,387.76,388.6,390.27,391.19,392.39,393.07,393.61,393.68,393.63,394.33,394.99,395.74,396.55,397.53,398.3,399.23,401.07,403.58,405.85,408.42,411.08,415.26,418.97,422.25,425.83,429.29,432.67,436.1,439.73,442.82,446.11,449.5,453.26,457.05,460.67,464.58,468.11,471.1,474.29,477.38,479.89,482.54,484.85,487.7,489.78,492.35,494.3,495.91,498.26,500.1,501.36,501.51,500.69,499.12,498.34,497.57,495.97,495.9,496.01,495.65,494.32,493.37,491.88,489.61,487.86,487.19,487.65,489.03,489.97,491.7,494.24,497.86,501.8,506.26,509.67,512.52,514.85,516.15,516.56,516.61,517.84,518.71,520.62,522.51,523.51,523.86,523.12,522.02,520.89,518.92,516.62,513.6,510.26,507.09,503.6,500.44,498.07,495.98,494.45],
  rsi:[50.33,55.06,47.3,48.08,56.55,58.31,58.19,61.67,69.67,64.96,66.82,78.18,81.76,80.09,77.74,83.84,87.01,91.12,59.72,62.89,62.51,62.51,42.38,53.98,54.24,58.75,54.23,53.88,49.67,44.81,51.75,50.88,58.78,58.77,59.26,56.7,72.97,74.24,74.74,72.6,82.64,83.62,92.99,98.14,86.3,89.51,80.86,80.11,74.39,73.77,73.77,68.79,70.39,74.08,72.88,68.38,67.91,69.79,68.68,65.56,76.03,72.84,81.93,81.14,80.81,78.8,77.92,64.07,52.92,60.86,52.74,42.62,39.48,34.25,26.83,35.91,33.67,32.4,41.42,45.44,44.48,41.17,51.44,43.38,41.73,46.87,58.44,63.05,68.05,66.52,66.43,70.16,66.88,65.12,66.17,73.7,67.2,64.99,73.49,64.65,48.96,41.79,46.85,48.62,36.77,28.48,32.53,29.2,28.83,34.06,32.28,38.14,34.42,35.68,41.05,35.18,29.51,22.97,31.31,36.68],
  macd:[-3.797,-3.447,-3.308,-3.321,-2.182,-1.049,.095,1.57,2.851,3.687,4.199,4.522,4.711,5.224,5.604,6.265,6.675,6.974,6.014,5.713,5.617,6.058,4.716,4.785,4.715,5.252,5.025,5.15,4.598,3.773,4.18,4.351,4.571,5.207,5.949,6.562,7.195,9.091,10.447,11.527,12.918,14.586,16.521,18.289,18.713,19.94,19.911,19.876,19.13,18.296,17.663,17.193,16.923,17.637,18.324,18.494,19.108,20.239,20.023,20.065],
  macd_sig:[-2.831,-2.954,-3.025,-3.084,-2.904,-2.533,-2.007,-1.292,-.463,.367,1.133,1.811,2.391,2.958,3.487,4.043,4.569,5.05,5.243,5.337,5.393,5.526,5.364,5.248,5.142,5.164,5.136,5.139,5.031,4.779,4.659,4.598,4.592,4.715,4.962,5.282,5.665,6.35,7.17,8.041,9.017,10.13,11.409,12.785,13.97,15.164,16.114,16.866,17.319,17.514,17.544,17.474,17.364,17.418,17.599,17.778,18.044,18.483,18.791,19.046]
};

const MN = Object.keys(D.models);

/* ── TAB SWITCH ─────────────────────────────────────────── */
function showTab(id, btn){
  ['price','rsi','macd'].forEach(t=>{
    const el=document.getElementById('tp-'+t);
    if(el) el.style.display = t===id ? '' : 'none';
  });
  document.querySelectorAll('.tab').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
}

/* ── KPIs ────────────────────────────────────────────────── */
function kpis(){
  const m=D.models, b=D.backtest;
  const bAcc=MN.reduce((a,c)=>m[c].accuracy>m[a].accuracy?c:a);
  const bAuc=MN.reduce((a,c)=>m[c].roc_auc>m[a].roc_auc?c:a);
  const bSh =MN.reduce((a,c)=>b[c].sharpe>b[a].sharpe?c:a);
  const bRet=MN.reduce((a,c)=>b[c].final_return>b[a].final_return?c:a);
  document.getElementById('kv-acc').textContent=(m[bAcc].accuracy*100).toFixed(1)+'%';
  document.getElementById('kn-acc').textContent=bAcc;
  document.getElementById('kv-auc').textContent=m[bAuc].roc_auc.toFixed(3);
  document.getElementById('kn-auc').textContent=bAuc;
  document.getElementById('kv-sh').textContent=b[bSh].sharpe.toFixed(2);
  document.getElementById('kn-sh').textContent=bSh;
  const r=b[bRet].final_return;
  document.getElementById('kv-ret').textContent=(r>=0?'+':'')+(r*100).toFixed(1)+'%';
  document.getElementById('kn-ret').textContent=bRet;
}

/* ── SIGNALS ─────────────────────────────────────────────── */
function signals(){
  const lc=D.price.at(-1), pc=D.price.at(-2);
  const chg=(lc-pc)/pc*100;
  const lr=D.rsi.at(-1);
  const lm=D.macd.at(-1), ls=D.macd_sig.at(-1);
  const smaGap=((lc/D.sma20.at(-1))-1)*100;
  const cc=chg>=0?'sbull':'sbear';
  const rc=lr>70?'sbear':lr<30?'sbull':'sneut';
  const rl=lr>70?'Overbought':lr<30?'Oversold':'Neutral';
  const mc=lm>ls?'sbull':'sbear';
  const ml=lm>ls?'Bullish':'Bearish';
  document.getElementById('sigStrip').innerHTML=`
    <div class="sig-card ${cc}">
      <div class="sig-name">Last Close</div>
      <div class="sig-val">$${lc.toFixed(0)}</div>
      <div class="sig-lbl">${chg>=0?'▲':'▼'} ${Math.abs(chg).toFixed(2)}% today</div>
    </div>
    <div class="sig-card ${rc}">
      <div class="sig-name">RSI (14)</div>
      <div class="sig-val">${lr.toFixed(1)}</div>
      <div class="sig-lbl">${rl}</div>
    </div>
    <div class="sig-card ${mc}">
      <div class="sig-name">MACD</div>
      <div class="sig-val">${lm.toFixed(2)}</div>
      <div class="sig-lbl">${ml} crossover</div>
    </div>
    <div class="sig-card sneut">
      <div class="sig-name">SMA20 Gap</div>
      <div class="sig-val">${smaGap>=0?'+':''}${smaGap.toFixed(1)}%</div>
      <div class="sig-lbl">Price vs SMA20</div>
    </div>`;
}

/* ── CHARTS ──────────────────────────────────────────────── */
function mkLine(id, datasets, opts={}){
  return new Chart(document.getElementById(id),{
    type:'line',
    data:{ labels:datasets[0].data.map((_,i)=>i), datasets },
    options:{
      responsive:true, maintainAspectRatio:true,
      interaction:{mode:'index',intersect:false},
      plugins:{ legend:{...legendStyle}, tooltip:{...tooltipStyle} },
      scales:{ x:scaleX({display:false}), y:scaleY() },
      ...opts
    }
  });
}

function drawPrice(){
  mkLine('priceC',[
    { label:'Close', data:D.price, borderColor:'#1d4ed8', borderWidth:2, pointRadius:0, tension:.3,
      fill:'origin', backgroundColor:toRgba('#1d4ed8',.06) },
    { label:'SMA 20', data:D.sma20, borderColor:'#b45309', borderWidth:1.5, borderDash:[5,3], pointRadius:0, tension:.3, fill:false }
  ]);
}

function drawRSI(){
  const lbl=D.rsi.map((_,i)=>i);
  new Chart(document.getElementById('rsiC'),{
    type:'line',
    data:{ labels:lbl, datasets:[
      { label:'RSI', data:D.rsi, borderColor:'#6d28d9', borderWidth:2, pointRadius:0, tension:.3, fill:false },
      { label:'OB 70', data:lbl.map(()=>70), borderColor:'#e11d48', borderWidth:1, borderDash:[4,3], pointRadius:0 },
      { label:'OS 30', data:lbl.map(()=>30), borderColor:'#047857', borderWidth:1, borderDash:[4,3], pointRadius:0 }
    ]},
    options:{ responsive:true, maintainAspectRatio:true,
      plugins:{ legend:{...legendStyle}, tooltip:{...tooltipStyle} },
      scales:{ x:scaleX({display:false}), y:scaleY({min:0,max:100}) } }
  });
}

function drawRSImini(){
  const lbl=D.rsi.map((_,i)=>i);
  new Chart(document.getElementById('rsiMini'),{
    type:'line',
    data:{ labels:lbl, datasets:[
      { label:'RSI', data:D.rsi, borderColor:'#047857', borderWidth:1.5, pointRadius:0, tension:.3,
        fill:{target:{value:50}, above:toRgba('#047857',.10), below:toRgba('#e11d48',.10)},
        backgroundColor:toRgba('#047857',.06) }
    ]},
    options:{ responsive:true, maintainAspectRatio:true,
      plugins:{ legend:{display:false} },
      scales:{ x:scaleX({display:false}), y:scaleY({min:0,max:100}) } }
  });
}

function drawMACD(){
  const lbl=D.macd.map((_,i)=>i);
  const hist=D.macd.map((v,i)=>v-D.macd_sig[i]);
  new Chart(document.getElementById('macdC'),{
    type:'bar',
    data:{ labels:lbl, datasets:[
      { type:'line', label:'MACD',   data:D.macd,     borderColor:'#1d4ed8', borderWidth:2, pointRadius:0, tension:.3, yAxisID:'y' },
      { type:'line', label:'Signal', data:D.macd_sig, borderColor:'#b45309', borderWidth:1.5, pointRadius:0, tension:.3, yAxisID:'y' },
      { label:'Hist', data:hist,
        backgroundColor:hist.map(v=>v>=0?toRgba('#047857',.35):toRgba('#e11d48',.35)),
        borderColor:    hist.map(v=>v>=0?'#047857':'#e11d48'),
        borderWidth:1, yAxisID:'y', borderRadius:3 }
    ]},
    options:{ responsive:true, maintainAspectRatio:true,
      plugins:{ legend:{...legendStyle}, tooltip:{...tooltipStyle} },
      scales:{ x:scaleX({display:false}), y:scaleY() } }
  });
}

function drawPerf(){
  const sh=MN.map(n=>n.split(' ').map(w=>w[0]).join(''));
  new Chart(document.getElementById('perfC'),{
    type:'bar',
    data:{ labels:sh, datasets:[
      { label:'Accuracy', data:MN.map(n=>D.models[n].accuracy),
        backgroundColor:P.map(c=>toRgba(c,.18)), borderColor:P, borderWidth:2, borderRadius:6 },
      { label:'ROC-AUC', data:MN.map(n=>D.models[n].roc_auc),
        backgroundColor:P.map(c=>toRgba(c,.45)), borderColor:P, borderWidth:2, borderRadius:6 }
    ]},
    options:{ responsive:true, maintainAspectRatio:true,
      plugins:{ legend:{...legendStyle}, tooltip:{...tooltipStyle} },
      scales:{ x:scaleX(), y:scaleY({min:.4,max:.65}) } }
  });
}

function drawROC(){
  const ds=MN.map((n,i)=>({
    label:`${n.split(' ')[0]} (${D.models[n].roc_auc.toFixed(3)})`,
    data:D.models[n].fpr.map((f,j)=>({x:f,y:D.models[n].tpr[j]})),
    borderColor:P[i], borderWidth:2, pointRadius:0, tension:.2, fill:false
  }));
  ds.push({label:'Random',data:[{x:0,y:0},{x:1,y:1}],borderColor:'#cec8be',borderWidth:1,borderDash:[4,3],pointRadius:0});
  new Chart(document.getElementById('rocC'),{
    type:'line', data:{datasets:ds},
    options:{ responsive:true, maintainAspectRatio:true,
      plugins:{ legend:{ labels:{...legendStyle.labels,font:{size:9.5}} }, tooltip:{...tooltipStyle} },
      scales:{
        x:{type:'linear',min:0,max:1, title:{display:true,text:'FPR',color:'#a89e91',font:{size:9}}, ...scaleX()},
        y:{type:'linear',min:0,max:1, title:{display:true,text:'TPR',color:'#a89e91',font:{size:9}}, ...scaleY()}
      } }
  });
}

function drawCV(){
  const sh=MN.map(n=>n.split(' ').map(w=>w[0]).join(''));
  new Chart(document.getElementById('cvC'),{
    type:'bar',
    data:{ labels:sh, datasets:[{
      label:'CV Accuracy',
      data:MN.map(n=>D.models[n].cv_mean),
      backgroundColor:P.slice(0,4).map(c=>toRgba(c,.2)),
      borderColor:P.slice(0,4), borderWidth:2, borderRadius:6
    }]},
    options:{ responsive:true, maintainAspectRatio:true,
      plugins:{ legend:{display:false}, tooltip:{...tooltipStyle} },
      scales:{ x:scaleX(), y:scaleY({min:.4,max:.65}) } }
  });
}

/* ── MODEL TABLE ─────────────────────────────────────────── */
function modelTable(){
  const t=document.getElementById('mtbl');
  t.innerHTML=`<thead><tr>
    <th>Model</th><th>Accuracy</th><th>ROC-AUC</th><th>CV Mean ± σ</th><th>Accuracy Bar</th>
  </tr></thead>`;
  const tb=document.createElement('tbody');
  const best=MN.reduce((a,c)=>D.models[c].accuracy>D.models[a].accuracy?c:a);
  MN.forEach((n,i)=>{
    const m=D.models[n]; const isB=n===best;
    tb.innerHTML+=`<tr>
      <td>
        <span class="mdot" style="background:${P[i]}"></span>${n}
        ${isB?`<span class="badge" style="background:var(--cobalt-lt);color:var(--cobalt);border-color:var(--cobalt-mid)">Best</span>`:''}
      </td>
      <td style="font-weight:700;color:${P[i]}">${(m.accuracy*100).toFixed(1)}%</td>
      <td style="font-weight:600">${m.roc_auc.toFixed(4)}</td>
      <td style="color:var(--ink-2)">${(m.cv_mean*100).toFixed(1)}% <span style="color:var(--ink-3);font-weight:400">±${(m.cv_std*100).toFixed(1)}%</span></td>
      <td style="min-width:110px">
        <div class="mbar-bg"><div class="mbar-fg" style="width:${(m.accuracy*200).toFixed(0)}%;background:${P[i]}"></div></div>
      </td>
    </tr>`;
  });
  t.appendChild(tb);
}

/* ── BACKTEST CHART ──────────────────────────────────────── */
function drawBT(){
  const lbl=D.backtest[MN[0]].cum_strat.map((_,i)=>i);
  const ds=MN.map((n,i)=>({
    label:n.split(' ')[0], data:D.backtest[n].cum_strat,
    borderColor:P[i], borderWidth:2, pointRadius:0, tension:.3, fill:false
  }));
  ds.push({label:'Buy & Hold',data:D.backtest[MN[0]].cum_bh,borderColor:'#cec8be',borderWidth:2,borderDash:[5,4],pointRadius:0,tension:.3,fill:false});
  new Chart(document.getElementById('btC'),{
    type:'line', data:{labels:lbl,datasets:ds},
    options:{ responsive:true, maintainAspectRatio:true,
      interaction:{mode:'index',intersect:false},
      plugins:{ legend:{...legendStyle}, tooltip:{...tooltipStyle} },
      scales:{ x:scaleX({display:false}), y:scaleY() } }
  });
}

/* ── BACKTEST CARDS ──────────────────────────────────────── */
function btCards(){
  const el=document.getElementById('btCards');
  MN.forEach((n,i)=>{
    const b=D.backtest[n];
    const rc=b.final_return>=0?'pos':'neg';
    const sc=b.sharpe>=0?'pos':'neg';
    el.innerHTML+=`<div class="bt-card">
      <div class="bt-model" style="color:${P[i]}">${n}</div>
      <div class="bt-row"><span class="bt-k">Return</span><span class="bt-v ${rc}">${b.final_return>=0?'+':''}${(b.final_return*100).toFixed(1)}%</span></div>
      <div class="bt-row"><span class="bt-k">Sharpe</span><span class="bt-v ${sc}">${b.sharpe.toFixed(2)}</span></div>
      <div class="bt-row"><span class="bt-k">Max DD</span><span class="bt-v neg">${(b.max_dd*100).toFixed(1)}%</span></div>
      <div class="bt-row"><span class="bt-k">Win Rate</span><span class="bt-v muted">${(b.win_rate*100).toFixed(1)}%</span></div>
      <div class="bt-row"><span class="bt-k">Trades</span><span class="bt-v muted">${b.n_trades}</span></div>
    </div>`;
  });
}

/* ── FEATURE LIST ────────────────────────────────────────── */
function featList(){
  const el=document.getElementById('featList');
  const mx=Math.max(...Object.values(D.features));
  Object.entries(D.features).forEach(([k,v])=>{
    el.innerHTML+=`<div class="feat-row">
      <div class="feat-name">${k}</div>
      <div class="feat-track"><div class="feat-fill" style="width:${(v/mx*100).toFixed(0)}%"></div></div>
      <div class="feat-pct">${(v*100).toFixed(2)}%</div>
    </div>`;
  });
}

/* ── PREDICTION DISTRIBUTION ─────────────────────────────── */
function drawPred(){
  const labels=['TN','FP','FN','TP'];
  const ds=MN.map((n,i)=>{
    const cm=D.models[n].confusion;
    return{label:n.split(' ')[0],data:[cm[0][0],cm[0][1],cm[1][0],cm[1][1]],
      backgroundColor:toRgba(P[i],.25),borderColor:P[i],borderWidth:2,borderRadius:6};
  });
  new Chart(document.getElementById('predC'),{
    type:'bar', data:{labels,datasets:ds},
    options:{ responsive:true, maintainAspectRatio:true,
      plugins:{ legend:{...legendStyle}, tooltip:{...tooltipStyle} },
      scales:{ x:scaleX(), y:scaleY({min:0}) } }
  });
}

/* ── CONFUSION MATRICES ──────────────────────────────────── */
function confMats(){
  const grid=document.getElementById('cmGrid');
  MN.forEach((n,mi)=>{
    const cm=D.models[n].confusion;
    const div=document.createElement('div');
    div.className='card';
    div.innerHTML=`<div class="card-title"><div class="cdot" style="background:${P[mi]}"></div>${n}</div><canvas id="cm${mi}" style="max-height:175px"></canvas>`;
    grid.appendChild(div);
    setTimeout(()=>{
      new Chart(document.getElementById('cm'+mi),{
        type:'bar',
        data:{ labels:['TN','FP','FN','TP'],
          datasets:[{data:[cm[0][0],cm[0][1],cm[1][0],cm[1][1]],
            backgroundColor:[toRgba('#047857',.18),toRgba('#e11d48',.18),toRgba('#e11d48',.18),toRgba('#1d4ed8',.18)],
            borderColor:['#047857','#e11d48','#e11d48','#1d4ed8'],
            borderWidth:2, borderRadius:6}]},
        options:{ indexAxis:'y', responsive:true, maintainAspectRatio:true,
          plugins:{ legend:{display:false}, tooltip:{...tooltipStyle} },
          scales:{
            x:scaleX({grid:gridLine}),
            y:scaleY({grid:{display:false}})
          } }
      });
    },80);
  });
}

/* ── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded',()=>{
  kpis(); signals();
  drawPrice(); drawRSI(); drawRSImini(); drawMACD();
  drawPerf(); drawROC(); drawCV();
  modelTable(); drawBT(); btCards();
  featList(); drawPred(); confMats();
});
