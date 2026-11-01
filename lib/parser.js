// KB 주간 시계열 파서 — 대시보드(index.html)와 같은 코드
// 브라우저와 Node(scripts/update.mjs) 양쪽에서 사용
const MET = {
  sale:{label:'매매', kind:'chg'},
  jeonse:{label:'전세', kind:'chg'},
  buyer:{label:'매수우위', kind:'lvl'}
};
const PROV=['서울','부산','대구','인천','광주','대전','울산','세종','경기','강원','충북','충남','전북','전남','경북','경남','제주도'];
const SUMM=['전국','수도권','6개광역시','5개광역시','기타지방','서울 강북','서울 강남'];
const LAYOUT=[[0, 0, 0, "양주"], [0, 0, 0, "서울 도봉구"], [0, 0, 0, "동두천"], [0, 0, 0, "고양"], [0, 0, 0, "서울"], [0, 0, 0, "서울 성북구"], [0, 0, 0, "서울 강북구"], [0, 0, 0, "서울 노원구"], [0, 0, 0, "의정부"], [0, 0, 0, "고양 일산서구"], [0, 0, 0, "파주"], [0, 0, 0, "서울 은평구"], [0, 0, 0, "서울 서대문구"], [0, 0, 0, "서울 종로구"], [0, 0, 0, "서울 동대문구"], [0, 0, 0, "서울 중랑구"], [0, 0, 0, "경기"], [0, 0, 0, "구리"], [0, 0, 0, "고양 일산동구"], [0, 0, 0, "고양 덕양구"], [0, 0, 0, "인천"], [0, 0, 0, "서울 마포구"], [0, 0, 0, "서울 중구"], [0, 0, 0, "서울 용산구"], [0, 0, 0, "서울 성동구"], [0, 0, 0, "서울 광진구"], [0, 0, 0, "남양주"], [0, 0, 0, "김포"], [0, 0, 0, "서울 강서구"], [0, 0, 0, "서울 양천구"], [0, 0, 0, "인천 서구"], [0, 0, 0, "인천 계양구"], [0, 0, 0, "서울 영등포구"], [0, 0, 0, "서울 동작구"], [0, 0, 0, "서울 서초구"], [0, 0, 0, "서울 강남구"], [0, 0, 0, "서울 송파구"], [0, 0, 0, "서울 강동구"], [0, 0, 0, "하남"], [0, 0, 0, "춘천"], [0, 0, 0, "강원"], [0, 0, 0, "인천 부평구"], [0, 0, 0, "부천"], [0, 0, 0, "서울 구로구"], [0, 0, 0, "인천 동구"], [0, 0, 0, "서울 금천구"], [0, 0, 0, "서울 관악구"], [0, 0, 0, "과천"], [0, 0, 0, "성남 분당구"], [0, 0, 0, "성남 수정구"], [0, 0, 0, "성남 중원구"], [0, 0, 0, "성남"], [0, 0, 0, "강릉"], [0, 0, 0, "인천 남동구"], [0, 0, 0, "광명"], [0, 0, 0, "인천 중구"], [0, 0, 0, "인천 미추홀구"], [0, 0, 0, "안양 만안구"], [0, 0, 0, "안양 동안구"], [0, 0, 0, "안양"], [0, 0, 0, "용인 수지구"], [0, 0, 0, "용인 처인구"], [0, 0, 0, "용인"], [0, 0, 0, "경기 광주"], [0, 0, 0, "안산 단원구"], [0, 0, 0, "시흥"], [0, 0, 0, "인천 연수구"], [0, 0, 0, "수원 장안구"], [0, 0, 0, "수원 팔달구"], [0, 0, 0, "의왕"], [0, 0, 0, "용인 기흥구"], [0, 0, 0, "안성"], [0, 0, 0, "이천"], [0, 0, 0, "충북"], [0, 0, 0, "안산"], [0, 0, 0, "안산 상록구"], [0, 0, 0, "군포"], [0, 0, 0, "수원 권선구"], [0, 0, 0, "수원 영통구"], [0, 0, 0, "수원"], [0, 0, 0, "오산"], [0, 0, 0, "충주"], [0, 0, 0, "제천"], [0, 0, 0, "원주"], [0, 0, 0, "충남"], [0, 0, 0, "화성"], [0, 0, 0, "평택"], [0, 0, 0, "청주 흥덕구"], [0, 0, 0, "청주 청원구"], [0, 0, 0, "청주"], [0, 0, 0, "울산 북구"], [0, 0, 0, "포항 북구"], [0, 0, 0, "천안"], [0, 0, 0, "천안 동남구"], [0, 0, 0, "천안 서북구"], [0, 0, 0, "대전"], [0, 0, 0, "청주 서원구"], [0, 0, 0, "청주 상당구"], [0, 0, 0, "안동"], [0, 0, 0, "울산 중구"], [0, 0, 0, "포항 남구"], [0, 0, 0, "포항"], [0, 0, 0, "당진"], [0, 0, 0, "아산"], [0, 0, 0, "세종"], [0, 0, 0, "대전 대덕구"], [0, 0, 0, "대전 동구"], [0, 0, 0, "김천"], [0, 0, 0, "양산"], [0, 0, 0, "울산 남구"], [0, 0, 0, "울산 동구"], [0, 0, 0, "울산"], [0, 0, 0, "서산"], [0, 0, 0, "공주"], [0, 0, 0, "대전 유성구"], [0, 0, 0, "대전 서구"], [0, 0, 0, "대전 중구"], [0, 0, 0, "구미"], [0, 0, 0, "부산 강서구"], [0, 0, 0, "부산 북구"], [0, 0, 0, "울산 울주군"], [0, 0, 0, "부산 기장군"], [0, 0, 0, "논산"], [0, 0, 0, "계룡"], [0, 0, 0, "익산"], [0, 0, 0, "군산"], [0, 0, 0, "경산"], [0, 0, 0, "부산 사상구"], [0, 0, 0, "부산 부산진구"], [0, 0, 0, "부산 금정구"], [0, 0, 0, "부산 해운대구"], [0, 0, 0, "전주"], [0, 0, 0, "전주 덕진구"], [0, 0, 0, "대구 북구"], [0, 0, 0, "대구"], [0, 0, 0, "경북"], [0, 0, 0, "김해"], [0, 0, 0, "부산 사하구"], [0, 0, 0, "부산 동구"], [0, 0, 0, "부산 동래구"], [0, 0, 0, "부산 수영구"], [0, 0, 0, "전주 완산구"], [0, 0, 0, "대구 서구"], [0, 0, 0, "대구 중구"], [0, 0, 0, "대구 동구"], [0, 0, 0, "경남"], [0, 0, 0, "통합창원 의창구"], [0, 0, 0, "부산 서구"], [0, 0, 0, "부산 중구"], [0, 0, 0, "부산 연제구"], [0, 0, 0, "부산"], [0, 0, 0, "광주"], [0, 0, 0, "대구 달성군"], [0, 0, 0, "대구 달서구"], [0, 0, 0, "대구 남구"], [0, 0, 0, "대구 수성구"], [0, 0, 0, "전북"], [0, 0, 0, "광주 광산구"], [0, 0, 0, "통합창원 성산구"], [0, 0, 0, "통합창원 진해구"], [0, 0, 0, "부산 영도구"], [0, 0, 0, "부산 남구"], [0, 0, 0, "광주 북구"], [0, 0, 0, "통합창원 마산회원구"], [0, 0, 0, "진주"], [0, 0, 0, "전남"], [0, 0, 0, "광주 서구"], [0, 0, 0, "순천"], [0, 0, 0, "광양"], [0, 0, 0, "통합창원 마산합포구"], [0, 0, 0, "광주 동구"], [0, 0, 0, "통합창원"], [0, 0, 0, "거제"], [0, 0, 0, "광주 남구"], [0, 0, 0, "통영"], [0, 0, 0, "목포"], [0, 0, 0, "여수"]];
const ymd=d=>{const x=new Date(d.getTime()+43200000);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')};
function norm(s){
  s=String(s).replace(/[\r\n]/g,'').replace(/\s+/g,' ').trim();
  s=s.replace(/특별자치(도|시)$/,'');
  if(s.startsWith('창원')) s='통합'+s;
  return s;
}
const METRO=new Set(['서울','부산','대구','인천','광주','대전','울산']);
const PROV_FULL={'서울특별시':'서울','부산광역시':'부산','대구광역시':'대구','인천광역시':'인천','광주광역시':'광주','대전광역시':'대전','울산광역시':'울산','세종특별자치시':'세종','세종시':'세종','경기도':'경기','강원도':'강원','강원특별자치도':'강원','강원특별자치도도':'강원','충청북도':'충북','충청남도':'충남','전라북도':'전북','전북특별자치도':'전북','전라남도':'전남','경상북도':'경북','경상남도':'경남','제주특별자치도':'제주도','제주도':'제주도','제주':'제주도'};
const AGG={'전국':'전국','수도권':'수도권','기타지방':'기타지방','지방':'기타지방','6개광역시':'6개광역시','6대광역시':'6개광역시','5개광역시':'5개광역시','5대광역시':'5개광역시'};
// KB 원본(서울특별시 → 강남구 처럼 위계로 적힌 이름)과 예전 형식(서울 강남구)을 같은 이름으로 맞춤
function keyHeader(hdr){
  const seen=new Set(); let P=null, C=null; const out=[];
  for(const h of hdr){
    if(h==null||String(h).trim()===''){out.push(null);continue}
    let n=String(h).replace(/[\r\n]/g,'').replace(/\(구\)/g,'').replace(/\s+/g,' ').trim();
    if(!n||n==='구분'||/^classification$/i.test(n)){out.push(null);continue}
    let k=null, g=null;
    if(AGG[n]){ k=AGG[n]; g='권역'; P=null; C=null; }
    else if(/^강북\d+개?구$/.test(n)||n==='서울 강북'){ k='서울 강북'; g='권역'; P='서울'; C=null; }
    else if(/^강남\d+개?구$/.test(n)||n==='서울 강남'){ k='서울 강남'; g='권역'; P='서울'; C=null; }
    else if(/^전남광주통합/.test(n)){ k='전남광주'; g='권역'; P='전남'; C=null; }
    else if(n.includes(' ')){
      k=norm(n); const base=k.split(' ')[0];
      g=PROV.includes(base)?base:(P||'기타');
    }
    else if(PROV_FULL[n] || (PROV.includes(n) && !(n==='광주'&&P==='경기'))){
      k=PROV_FULL[n]||n; P=k==='제주도'?'제주도':k; C=null; g=k;
    }
    else if(/(구|군)$/.test(n) && !/시$/.test(n)){
      k = METRO.has(P) ? P+' '+n : (C ? C+' '+n : n);
      g = P||'기타';
    }
    else {
      let c=n.replace(/(특례시|시)$/,'');
      if(c==='창원'||c==='통합창원') c='통합창원';
      if(c==='광주'&&P==='경기') c='경기 광주';
      k=norm(c); C=k; g=P||'기타';
    }
    if(seen.has(k)){ out.push(null); continue; }
    seen.add(k); out.push({k,g});
  }
  return out;
}
/* ---------- parse KB workbook ---------- */
function parseDateCell(cells, state){
  for(const c of cells){
    if(c instanceof Date && !isNaN(c)) return ymd(c);
    if(typeof c==='number'){
      if(c>20000&&c<80000){ const d=new Date(Math.round((c-25569)*86400000)); return d.toISOString().slice(0,10); }
      if(c>=1990&&c<=2100) state.year=c;
    }
    if(typeof c==='string'){
      const s=c.trim();
      let m=s.match(/^(\d{4}|\d{2})\s*[.\-\/년]\s*(\d{1,2})\s*[.\-\/월]\s*(\d{1,2})/);
      if(m){ let y=+m[1]; if(y<100) y+=2000; return y+'-'+String(+m[2]).padStart(2,'0')+'-'+String(+m[3]).padStart(2,'0'); }
      m=s.match(/^(\d{4})\s*년?$/); if(m){ state.year=+m[1]; continue; }
      m=s.match(/^(\d{1,2})\s*[.\/월]\s*(\d{1,2})\s*일?$/);
      if(m&&state.year) return state.year+'-'+String(+m[1]).padStart(2,'0')+'-'+String(+m[2]).padStart(2,'0');
    }
  }
  return null;
}
const KNOWN=new Set([...LAYOUT.map(l=>l[3]),...SUMM,...PROV]);
function findHeader(aoa){
  let best=-1,score=0;
  for(let r=0;r<Math.min(aoa.length,20);r++){
    const row=aoa[r]||[]; let s=0;
    for(const c of row){ if(typeof c==='string'){ const n=norm(c); if(KNOWN.has(n)) s+=2; else if(n==='구분') s+=5; } }
    if(s>score){score=s;best=r}
  }
  return score>=6?best:-1;
}
const toNum=x=>{ if(typeof x==='number') return isFinite(x)?x:null; if(typeof x==='string'){const t=x.replace(/,/g,'').trim(); if(t===''||t==='-') return null; const n=+t; return isFinite(n)?n:null;} return null; };
function parseChg(aoa){
  const h=findHeader(aoa); if(h<0) return null;
  const keys=keyHeader(aoa[h]);
  const first=keys.findIndex(k=>k); if(first<0) return null;
  const dates=[], v={}; keys.forEach(k=>{if(k) v[k.k]=[]});
  const st={};
  for(let r=h+1;r<aoa.length;r++){
    const row=aoa[r]||[];
    const d=parseDateCell(row.slice(0,first),st); if(!d) continue;
    let any=false; const vals=keys.map((k,i)=>{ if(!k) return null; const n=toNum(row[i]); if(n!=null) any=true; return n; });
    if(!any) continue;
    dates.push(d); keys.forEach((k,i)=>{ if(k) v[k.k].push(vals[i]==null?null:Math.round(vals[i]*1e4)/1e4); });
  }
  return {dates,v,regions:keys.filter(Boolean)};
}
function parseBuyer(aoa){
  const h=findHeader(aoa); if(h<0) return null;
  const raw=(aoa[h]||[]).slice();
  // forward-fill merged region headers
  let firstR=-1;
  for(let i=0;i<raw.length;i++){ if(typeof raw[i]==='string'&&KNOWN.has(norm(raw[i]))){firstR=i;break;} }
  if(firstR<0) return null;
  const filled=raw.map((c,i)=>i<firstR?null:c);
  for(let i=firstR+1;i<filled.length;i++){ if(filled[i]==null||String(filled[i]).trim()==='') filled[i]=filled[i-1]; }
  // sub header row
  let sub=-1;
  for(let r=h+1;r<Math.min(aoa.length,h+5);r++){ const row=aoa[r]||[]; if(row.some(c=>typeof c==='string'&&/매도|매수|우위/.test(c))){sub=r;break;} }
  const role=i=>{ if(sub<0) return 'idx'; const c=String((aoa[sub]||[])[i]||'').replace(/\s/g,''); if(/우위/.test(c)) return 'idx'; if(/매도/.test(c)) return 'sell'; if(/매수/.test(c)) return 'buy'; if(/비슷/.test(c)) return 'same'; return null; };
  // unique names in order with dedupe via keyHeader on the de-merged sequence
  const seq=[]; const colOf=[];
  for(let i=firstR;i<filled.length;i++){ if(filled[i]==null) continue; if(i===firstR||filled[i]!==filled[i-1]||(raw[i]!=null&&String(raw[i]).trim()!=='')){ seq.push(filled[i]); colOf.push([i]); } else colOf[colOf.length-1].push(i); }
  const keys=keyHeader(seq);
  const groups=[];
  keys.forEach((k,j)=>{ if(!k) return; const g={k:k.k,idx:null,buy:null,sell:null}; for(const i of colOf[j]){ const r=role(i); if(r&&g[r]==null) g[r]=i; } groups.push(g); });
  const dates=[], v={}; groups.forEach(g=>v[g.k]=[]);
  const st={};
  for(let r=(sub>=0?sub:h)+1;r<aoa.length;r++){
    const row=aoa[r]||[];
    const d=parseDateCell(row.slice(0,firstR),st); if(!d) continue;
    let any=false;
    const vals=groups.map(g=>{
      let x=g.idx!=null?toNum(row[g.idx]):null;
      if(x==null&&g.buy!=null&&g.sell!=null){ const b=toNum(row[g.buy]), s=toNum(row[g.sell]); if(b!=null&&s!=null) x=100+b-s; }
      if(x!=null) any=true; return x;
    });
    if(!any) continue;
    dates.push(d); groups.forEach((g,j)=>v[g.k].push(vals[j]==null?null:Math.round(vals[j]*100)/100));
  }
  return {dates,v,regions:keys.filter(Boolean)};
}
function parseWorkbook(wb){
  const found={}, notes=[];
  for(const name of wb.SheetNames){
    const ws=wb.Sheets[name];
    const aoa=XLSX.utils.sheet_to_json(ws,{header:1,raw:true,defval:null,blankrows:true});
    const head=(name+' '+aoa.slice(0,4).map(r=>(r||[]).filter(x=>typeof x==='string').join(' ')).join(' ')).replace(/\s+/g,'');
    if(/전용면적|면적별|규모별|지수변환/.test(head)) continue;
    let type=null;
    if(/매수우위|매수매도|매수·매도|매수.매도|매도자|매수자/.test(head)) type='buyer';
    else if(/매매/.test(head)&&/증감|변동률/.test(head)&&!/거래|수급/.test(head)) type='sale';
    else if(/전세/.test(head)&&/증감|변동률/.test(head)&&!/거래|수급/.test(head)) type='jeonse';
    if(!type||found[type]) continue;
    let res=null; try{ res=type==='buyer'?parseBuyer(aoa):parseChg(aoa); }catch(e){ notes.push(name+': 읽기 오류 '+e.message); }
    if(res&&res.dates.length){
      // sort by date & dedupe
      const ord=res.dates.map((d,i)=>[d,i]).sort((a,b)=>a[0]<b[0]?-1:a[0]>b[0]?1:0);
      const dates=[], v={}; for(const k in res.v) v[k]=[];
      let last=null; for(const [d,i] of ord){ if(d===last) continue; last=d; dates.push(d); for(const k in res.v) v[k].push(res.v[k][i]); }
      found[type]={dates,v,regions:res.regions,sheet:name};
    } else notes.push('“'+name+'” 시트를 '+MET[type].label+' 데이터로 인식했지만 날짜 행을 찾지 못했어요.');
  }
  // KB 주간 시계열은 5번째 시트가 매수우위(매수·매도 동향) — 이름으로 못 찾으면 5번째 시트를 시도
  if(!found.buyer && wb.SheetNames.length>=5){
    const name=wb.SheetNames[4];
    const used=Object.values(found).some(f=>f.sheet===name);
    if(!used){
      try{
        const aoa=XLSX.utils.sheet_to_json(wb.Sheets[name],{header:1,raw:true,defval:null,blankrows:true});
        const res=parseBuyer(aoa);
        if(res&&res.dates.length){
          const ord=res.dates.map((d,i)=>[d,i]).sort((a,b)=>a[0]<b[0]?-1:a[0]>b[0]?1:0);
          const dates=[], v={}; for(const k in res.v) v[k]=[];
          let last=null; for(const [d,i] of ord){ if(d===last) continue; last=d; dates.push(d); for(const k in res.v) v[k].push(res.v[k][i]); }
          found.buyer={dates,v,regions:res.regions,sheet:name};
        } else notes.push('5번째 시트 “'+name+'”에서 매수우위 값을 읽지 못했어요.');
      }catch(e){ notes.push('5번째 시트 “'+name+'” 읽기 오류: '+e.message); }
    }
  }
  return {found,notes};
}
function merge(base,found){
  const out={version:1, regions:base?base.regions.slice():[], metrics:{}};
  const have=new Set(out.regions.map(r=>r.k));
  for(const m in found) for(const r of found[m].regions) if(!have.has(r.k)){ out.regions.push(r); have.add(r.k); }
  for(const m of Object.keys(MET)){
    const a=base&&base.metrics[m], b=found[m];
    if(!a&&!b) continue;
    if(!b){ out.metrics[m]=a; continue; }
    const ds=[...new Set([...(a?a.dates:[]),...b.dates])].sort();
    const ia=a?new Map(a.dates.map((d,i)=>[d,i])):new Map(), ib=new Map(b.dates.map((d,i)=>[d,i]));
    const keys=new Set([...(a?Object.keys(a.v):[]),...Object.keys(b.v)]);
    const v={};
    for(const k of keys){
      const va=a&&a.v[k], vb=b.v[k];
      v[k]=ds.map(d=>{ const j=ib.get(d); if(vb&&j!=null&&vb[j]!=null) return vb[j]; const i=ia.get(d); return va&&i!=null?va[i]:null; });
    }
    out.metrics[m]={dates:ds,v};
  }
  return out;
}


globalThis.KB={parseWorkbook,merge,keyHeader,norm};
