// kb/ 폴더에 올라온 KB 주간 시계열 엑셀을 읽어 data/data.json에 합칩니다.
// GitHub Actions가 자동으로 실행해요. 직접 돌릴 때: XLSX_DIR=<xlsx 설치 폴더> node scripts/update.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const req = createRequire(process.env.XLSX_DIR ? path.join(process.env.XLSX_DIR, 'noop.js') : import.meta.url);
const XLSX = req('xlsx');

const ctx = { XLSX, console, Date, Math, JSON };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'lib/parser.js'), 'utf8'), ctx);
const { parseWorkbook, merge } = ctx.KB;

const kbDir = path.join(root, 'kb');
const files = fs.readdirSync(kbDir).filter(f => /\.xls[xm]?$/i.test(f)).sort();
if (!files.length) { console.log('kb 폴더에 새 엑셀이 없어요.'); process.exit(0); }

const dataPath = path.join(root, 'data/data.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const before = new Set(data.regions.map(r => r.k));
const log = { at: new Date().toISOString(), files: [], notes: [], fresh: [], failed: [] };

for (const f of files) {
  const full = path.join(kbDir, f);
  try {
    const wb = XLSX.read(fs.readFileSync(full), { type: 'buffer', cellDates: true });
    const { found, notes } = parseWorkbook(wb);
    const ms = Object.keys(found);
    if (!ms.length) { log.failed.push(f); log.notes.push(`${f}: 매매·전세·매수우위 시트를 찾지 못했어요 (시트: ${wb.SheetNames.join(', ')})`); continue; }
    data = merge(data, found);
    log.files.push(f);
    for (const m of ms) { const d = found[m].dates; log.notes.push(`${f}: ${({sale:'매매',jeonse:'전세',buyer:'매수우위'})[m]} ${d[0]} ~ ${d[d.length - 1]} (${Object.keys(found[m].v).length}개 지역)`); }
    notes.forEach(n => log.notes.push(`${f}: ${n}`));
    fs.unlinkSync(full);
  } catch (e) {
    log.failed.push(f); log.notes.push(`${f}: 읽기 오류 ${e.message}`);
  }
}
log.fresh = data.regions.map(r => r.k).filter(k => !before.has(k));
if (log.files.length) {
  data.updatedAt = log.at;
  fs.writeFileSync(dataPath, JSON.stringify(data));
}
fs.writeFileSync(path.join(root, 'data/log.json'), JSON.stringify(log, null, 1));
console.log(JSON.stringify(log, null, 1));
if (log.failed.length && !log.files.length) process.exit(1);
