/* ===== Util ===== */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Math.random().toString(36).slice(2,8);
const DAY=864e5;
const fdt=t=>t?new Date(t).toLocaleString('id-ID',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}):'-';
const fd=t=>new Date(t).toLocaleDateString('id-ID',{day:'numeric',month:'short'});
const fdur=ms=>{const s=Math.round(ms/1000);return s<60?s+' dtk':Math.floor(s/60)+' mnt '+(s%60)+' dtk'};
const fx=(n,d=2)=>Number.isFinite(n)?n.toLocaleString('id-ID',{minimumFractionDigits:d,maximumFractionDigits:d}):'-';
const pct=(a,b)=>b?Math.round(a/b*1000)/10:0;
const IC={
 home:'M3 11l9-8 9 8M5 10v10h14V10',list:'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',plus:'M12 5v14M5 12h14',chart:'M4 20V10M10 20V4M16 20v-7M22 20H2',
 gear:'M12 15a3 3 0 100-6 3 3 0 000 6zM19 12a7 7 0 00-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 00-2-1.2L14.2 3h-4l-.4 2.6a7 7 0 00-2 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 005 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9c.6.5 1.3.9 2 1.2l.4 2.6h4l.4-2.6c.7-.3 1.4-.7 2-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z',
 user:'M20 21a8 8 0 10-16 0M12 11a4 4 0 100-8 4 4 0 000 8z',users:'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8',
 help:'M12 22a10 10 0 100-20 10 10 0 000 20zM9.1 9a3 3 0 015.8 1c0 2-3 3-3 3M12 17h.01',mail:'M4 4h16v16H4zM4 6l8 7 8-7',eye:'M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zM12 15a3 3 0 100-6 3 3 0 000 6z',
 copy:'M9 9h11v11H9zM5 15H4V4h11v1',trash:'M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14',edit:'M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z',up:'M12 19V5M5 12l7-7 7 7',down:'M12 5v14M19 12l-7 7-7-7',
 grip:'M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01',check:'M20 6L9 17l-5-5',moon:'M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z',share:'M4 12v8h16v-8M16 6l-4-4-4 4M12 2v13',
 shield:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',bolt:'M13 2L3 14h9l-1 8 10-12h-9z',lock:'M5 11h14v10H5zM8 11V7a4 4 0 118 0v4',arch:'M3 4h18v4H3zM5 8v12h14V8M10 12h4',dup:'M8 8h12v12H8zM4 16V4h12',logout:'M9 21H5V3h4M16 17l5-5-5-5M21 12H9',
 file:'M14 2H6v20h12V8zM14 2v6h6',x:'M18 6L6 18M6 6l12 12',star:'M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z',book:'M4 19.5A2.5 2.5 0 016.5 17H20V2H6.5A2.5 2.5 0 004 4.5zM4 19.5V22h16'
};
const ic=n=>`<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="${IC[n]||''}"/></svg>`;
function dl(txt,name){ // unduh jika diizinkan; selalu aman
  try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'text/plain'}));a.download=name;document.body.appendChild(a);a.click();a.remove()}catch(e){}
}
function copy(txt,msg){
  const ok=()=>toast(msg||'Tersalin ke papan klip');
  const fb=()=>{const t=document.createElement('textarea');t.value=txt;t.style.cssText='position:fixed;opacity:0';document.body.appendChild(t);t.select();try{document.execCommand('copy')?ok():toast('Pilih teks lalu salin manual')}catch(e){toast('Pilih teks lalu salin manual')}t.remove()};
  try{navigator.clipboard.writeText(txt).then(ok,fb)}catch(e){fb()}
}
let toastT;function toast(m){let t=$('.toast');if(t)t.remove();t=document.createElement('div');t.className='toast';t.setAttribute('role','status');t.textContent=m;document.body.appendChild(t);clearTimeout(toastT);toastT=setTimeout(()=>t.remove(),2600)}
function modal(html){$('#layer').innerHTML=`<div class="ov" data-act="closeov"><div class="modal" role="dialog" aria-modal="true">${html}</div></div>`}
function closeModal(){$('#layer').innerHTML=''}
let askCb=null;function ask(msg,cb,label='Ya, lanjutkan'){askCb=cb;modal(`<h3>Konfirmasi</h3><p>${esc(msg)}</p><div class="row"><span class="sp"></span><button class="btn" data-act="closemodal">Batal</button><button class="btn pri" data-act="askok">${esc(label)}</button></div>`)}

/* ===== Statistik ===== */
const sum=a=>a.reduce((x,y)=>x+y,0), mean=a=>a.length?sum(a)/a.length:NaN;
const median=a=>{if(!a.length)return NaN;const s=[...a].sort((x,y)=>x-y),m=s.length>>1;return s.length%2?s[m]:(s[m-1]+s[m])/2};
const modes=a=>{const c={};a.forEach(x=>c[x]=(c[x]||0)+1);const mx=Math.max(0,...Object.values(c));return Object.keys(c).filter(k=>c[k]===mx).map(Number)};
const vari=a=>{if(a.length<2)return NaN;const m=mean(a);return sum(a.map(x=>(x-m)**2))/(a.length-1)};
const sd=a=>Math.sqrt(vari(a));
function pearson(x,y){const n=x.length;if(n<3)return NaN;const mx=mean(x),my=mean(y);let sxy=0,sxx=0,syy=0;for(let i=0;i<n;i++){sxy+=(x[i]-mx)*(y[i]-my);sxx+=(x[i]-mx)**2;syy+=(y[i]-my)**2}return sxx&&syy?sxy/Math.sqrt(sxx*syy):NaN}
function tcrit(df){const z=1.95996;return z+(z**3+z)/(4*df)+(5*z**5+16*z**3+3*z)/(96*df**2)+(3*z**7+19*z**5+17*z**3-15*z)/(384*df**3)}
function rtabel(n){const df=n-2;if(df<1)return NaN;const t=tcrit(Math.max(df,3));return t/Math.sqrt(df+t*t)}
function alpha(M){const k=M[0]?.length||0;if(k<2||M.length<3)return NaN;const cols=[...Array(k)].map((_,j)=>M.map(r=>r[j]));const tot=M.map(sum);return k/(k-1)*(1-sum(cols.map(vari))/vari(tot))}
const corrLabel=r=>{const a=Math.abs(r);return (a<.2?'sangat lemah':a<.4?'lemah':a<.6?'sedang':a<.8?'kuat':'sangat kuat')+(r<0?' (negatif)':' (positif)')};
const alphaLabel=a=>a>=.9?'sangat tinggi':a>=.8?'tinggi':a>=.7?'dapat diterima':a>=.6?'cukup (batas minimum)':'rendah';
const sig=(()=>{const lex={p:['bagus','baik','puas','nyaman','ramah','cepat','mudah','lengkap','bersih','senang','membantu','mantap','suka','terbaik','sangat membantu'],n:['lambat','kurang','buruk','sulit','mahal','kotor','bising','rusak','lama','jelek','kecewa','panas','sempit','berisik','antre']};
 return t=>{t=String(t).toLowerCase();let s=0;lex.p.forEach(w=>{if(t.includes(w))s++});lex.n.forEach(w=>{if(t.includes(w))s--});return s>0?'positif':s<0?'negatif':'netral'}})();
const STOP=new Set('yang dan di ke dari untuk dengan ini itu saya kami kita pada ada tidak agar lebih sudah akan bisa juga atau karena oleh sangat masih para sebagai dalam lagi harus belum perlu'.split(' '));
function words(texts){const c={};texts.forEach(t=>String(t).toLowerCase().replace(/[^a-z\s]/g,' ').split(/\s+/).forEach(w=>{if(w.length>2&&!STOP.has(w))c[w]=(c[w]||0)+1}));return Object.entries(c).sort((a,b)=>b[1]-a[1]).slice(0,28)}

/* ===== Model ===== */
const QT={single:{n:'Pilihan ganda',o:1},multi:{n:'Kotak centang',o:1},dropdown:{n:'Dropdown',o:1},likert:{n:'Skala Likert',o:1,num:1},rating:{n:'Rating bintang',num:1},slider:{n:'Slider',num:1},text:{n:'Jawaban terbuka'},number:{n:'Angka',num:1},date:{n:'Tanggal/waktu'},file:{n:'Unggah file/gambar'},grid:{n:'Matriks (grid)',o:1,g:1},ranking:{n:'Urutkan (ranking)',o:1},nps:{n:'Net Promoter Score',num:1}};
const LIK=['Sangat tidak setuju','Tidak setuju','Netral','Setuju','Sangat setuju'];
const CHOICE=['single','dropdown','multi'];
function newQ(type){const q={id:'q'+uid(),type,text:'Tulis pertanyaan di sini',required:true,rules:[],showIf:null};
 if(['single','multi','dropdown'].includes(type))q.options=['Opsi 1','Opsi 2','Opsi 3'];
 if(type==='likert'){q.options=[...LIK];q.text='Pernyataan yang diukur'}
 if(type==='grid'){q.options=['Buruk','Cukup','Baik'];q.rows=['Baris 1','Baris 2']}
 if(type==='ranking')q.options=['Item A','Item B','Item C'];
 if(type==='slider'){q.min=0;q.max=100}
 if(type==='nps')q.text='Seberapa besar kemungkinan Anda merekomendasikan layanan ini kepada orang lain?';
 if(type==='date')q.dt='date';
 return q}
function newSurvey(){return {id:uid(),owner:'me',title:'Survei tanpa judul',desc:'',est:2,welcome:'Terima kasih sudah bersedia mengisi survei ini.',thanks:'Jawaban Anda sudah kami terima. Terima kasih!',progress:true,deadline:'',oneResp:false,anon:true,randomize:false,password:'',consent:'Saya bersedia berpartisipasi dan mengizinkan jawaban saya dipakai untuk keperluan penelitian ini.',status:'draft',created:Date.now(),starts:0,questions:[newQ('single')],respondents:[]}}

function mulberry(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function seed(){
 const rnd=mulberry(7),gauss=()=>{let u=0;for(let i=0;i<6;i++)u+=rnd();return(u-3)/.7071};
 const mk=(id,type,text,extra)=>Object.assign({id,type,text,required:true,rules:[],showIf:null},extra||{});
 const LK=['Sangat tidak setuju','Tidak setuju','Netral / Ragu-ragu','Setuju','Sangat setuju'];
 const QTX=["Saya mudah memahami cara menggunakan e-Wallet", "Saya merasa e-wallet mudah digunakan untuk melakukan pembayaran", "Saya dapat mempelajari penggunaan e-wallet dengan cepat", "E-wallet membuat transaksi menjadi lebih praktis", "Saya merasa data pribadi saya terlindungi saat menggunakan e-wallet", "Saya merasa transaksi menggunakan e-wallet aman", "Fitur PIN atau verifikasi membuat saya merasa lebih aman", "Saya percaya e-wallet mampu menjaga keamanan transaksi saya", "Saya tertarik menggunakan e-wallet untuk bertransaksi lagi", "Saya ingin terus menggunakan e-wallet di masa mendatang", "Saya lebih memilih menggunakan e-wallet ketika tersedia sebagai metode pembayaran", "Saya bersedia merekomendasikan penggunaan e-wallet kepada orang lain"];
 const Q=QTX.map((t,i)=>mk('q'+(i+1),'likert',t,{options:[...LK]}));
 Q.push(mk('q13','text','Kritik dan Saran',{required:false}));
 const RAW=[[1789668870901, [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], "Bagus 🤯"], [1789668877008, [5, 5, 5, 5, 3, 3, 4, 4, 5, 5, 4, 5], "-"], [1789669021194, [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], "Bagus"], [1789669193802, [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], ""], [1789669571112, [5, 5, 5, 5, 4, 4, 4, 3, 4, 4, 4, 4], ""], [1789669656696, [4, 5, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4], "Tidak ada"], [1789669793364, [4, 5, 4, 4, 4, 5, 5, 4, 3, 4, 2, 4], "permasalahannya munculnya biaya admin untuk top-up, biaya transfer antar-bank/antar-aplikasi, serta biaya pencairan dana yang perlahan mengikis saldo pengguna.\nsaran saya informasikan rincian biaya admin secara jujur dan jelas di awal transaksi, bukan menyembunyikannya di akhir proses pembayaran."], [1789669823511, [5, 4, 4, 5, 5, 5, 5, 5, 5, 5, 4, 5], ""], [1789669863419, [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], ""], [1789669978872, [5, 5, 5, 5, 3, 4, 5, 3, 5, 5, 5, 5], "None"], [1789670619003, [5, 5, 5, 5, 4, 5, 5, 4, 4, 4, 5, 5], "moga bisa lebih aman lagi"], [1789670710805, [4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4], "-"], [1789671028779, [5, 5, 5, 5, 3, 4, 5, 4, 4, 4, 4, 2], ""], [1789671555235, [3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2], ""], [1789671753268, [3, 3, 4, 4, 3, 4, 4, 4, 4, 4, 4, 4], ""], [1789671854283, [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], ""], [1789673181262, [5, 5, 5, 5, 4, 4, 5, 4, 5, 5, 5, 5], "QRIS JAYA JAYA JAYA wkwk"], [1789673813400, [4, 4, 4, 1, 1, 1, 1, 1, 4, 3, 1, 3], "E walet tidak selalu benar atau aman untuk keamanan data, Dana salah satu contoh Aplikasi E wallet yang Keamanan nya 40% bagi saya. Jadi Kritik Saya E wallet belum tentu Aman dan Praktis Disebabkan Aplikasi yang kadang Error Atau Sering Terjadi peringatan Kesalahan Teknis."], [1789675694358, [5, 5, 5, 5, 2, 3, 5, 3, 5, 5, 5, 5], "Mungkin lebih ke target nya bisa di berikan ke para orang tua juga  karena masyarakat ya Jd data nya bisa variatif. Trs untuk pilihan nya kalau bisa tertulis setiap pilihan nya setuju, tidak setuju , kurang setuju,  Netral. Jd mudah untuk di pahami . Oke itu aja kritik dari aku. Selamat berkembang teman2"], [1789679058545, [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], "ngok"], [1789681177522, [5, 5, 3, 5, 3, 3, 3, 3, 5, 4, 3, 5], ""], [1789685669339, [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], "So good so nicee veryy good"], [1789687745591, [3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3], "Dengan adanya e-wallet semua transaksi menjadi lebih ngampang namun kembali ke pribadi harus bijak mengatakan nya"], [1789688755510, [5, 4, 5, 4, 3, 4, 3, 4, 1, 2, 3, 3], "Saya jarang menggunakan e wallet karena saya sering memiliki uang cash, menggunakannya ketika saya sedang co shopee"], [1789704575136, [5, 5, 5, 5, 4, 4, 5, 4, 5, 5, 5, 5], ""], [1789712414009, [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], "Tidak ada"], [1789884923063, [5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 5], ""], [1790877133857, [5, 5, 5, 5, 4, 4, 4, 4, 3, 4, 5, 3], ""], [1790877155698, [5, 5, 5, 5, 4, 4, 5, 4, 4, 5, 4, 5], "Penggunaannya lebih praktis, mudah juga dipahami. Untuk kekurangannya terkadang sering juga terjadi bug gagal bertransaksi, tapi saya puas menggunakannya."], [1790878672867, [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], "Menurut saya e-wallet dapat mempermudah transaksi, karna simple dan mudah di gunakan oleh banyak orang"]];
 const R=RAW.map((x,i)=>{const end=x[0],d=(140+((i*37)%90))*1000,a={};x[1].forEach((v,k)=>a['q'+(k+1)]=v);if(x[2]&&x[2]!=='-')a.q13=x[2];
  return {id:'r'+uid(),sid:'demo01',start:end-d,end,device:'Tidak tercatat',anon:true,name:'',email:'',a}});
 const now=Date.now();
 const S1={id:'demo01',owner:'me',title:'Tingkat Kepuasan Masyarakat Terhadap Kemudahan Serta Keamanan dalam Penggunaan E-Wallet',desc:'Survei ini ditujukan kepada pengguna e-wallet untuk mengetahui pengaruh kemudahan penggunaan dan keamanan terhadap minat menggunakan e-wallet dalam transaksi sehari-hari. Jawaban dipakai untuk keperluan akademik, jadi isilah sesuai pengalaman dan pendapat Anda.',est:3,welcome:'Pilih jawaban yang paling sesuai dengan pendapat Anda pada skala 1 sampai 5: 1 = Sangat Tidak Setuju, 2 = Tidak Setuju, 3 = Netral/Ragu-ragu, 4 = Setuju, 5 = Sangat Setuju.',thanks:'Terima kasih sudah mengisi survei ini. Jawaban Anda sangat membantu penelitian kami.',progress:true,deadline:'',oneResp:false,anon:false,randomize:false,password:'',consent:'Saya bersedia berpartisipasi dan mengizinkan jawaban saya dipakai untuk keperluan akademik.',status:'published',created:now-14*DAY,starts:RAW.length,questions:Q,respondents:[]};
 const q2=[newQ('single'),newQ('likert'),newQ('text')];
 q2[0].id='a1';q2[0].text='Di mana Anda biasanya belajar daring?';q2[0].options=['Di rumah','Di kampus','Di kafe','Lainnya'];
 q2[1].id='a2';q2[1].text='Saya lebih fokus saat belajar daring dibanding tatap muka.';
 q2[2].id='a3';q2[2].text='Anda menjawab "{{q1}}". Apa alasannya?';q2[2].required=false;
 const S2=Object.assign(newSurvey(),{id:'draft01',title:'Preferensi Belajar Daring',desc:'Contoh survei draft dengan piping jawaban.',questions:q2});
 const S3=Object.assign(newSurvey(),{id:'arsip01',title:'Evaluasi Orientasi Mahasiswa Baru 2025',status:'archived',desc:'Survei lama yang sudah diarsipkan.',created:now-300*DAY,questions:[Object.assign(newQ('nps'),{id:'n1'})]});
 return {users:[{name:'Fadila Isnaini',email:'demo@suaraku.id',pw:hash('demo1234'),role:'admin',twofa:false,verified:true}],user:null,
  surveys:[S1,S2,S3],responses:R,team:[{name:'Fadila Isnaini',email:'demo@suaraku.id',role:'admin',status:'aktif'},{name:'Rina Ayu',email:'rina@kampus.ac.id',role:'editor',status:'aktif'},{name:'Bagas Pratama',email:'bagas@kampus.ac.id',role:'viewer',status:'diundang'}],
  tasks:[{id:'t1',text:'Tinjau butir pertanyaan 4–8 sebelum disebar',who:'rina@kampus.ac.id',done:false},{id:'t2',text:'Susun ringkasan untuk rapat evaluasi',who:'demo@suaraku.id',done:false}],
  log:[{t:now-2*36e5,who:'Rina Ayu',msg:'mengedit survei "Kepuasan Layanan Perpustakaan Kampus"'},{t:now-DAY,who:'Fadila Isnaini',msg:'mempublikasikan survei "Kepuasan Layanan Perpustakaan Kampus"'}],
  tickets:[],done:{},apiKeys:[],integ:{},sched:null,
  prefs:{theme:'system',big:false,hc:false,brand:'maroon',font:'Plus Jakarta Sans',css:'',logo:'Suaraku'}}}
function hash(s){let h=5381;for(const c of s)h=(h*33^c.charCodeAt(0))>>>0;return h.toString(36)}

const KEY='suaraku-v2';let S;
try{const r=localStorage.getItem(KEY);if(r)S=JSON.parse(r)}catch(e){}
if(!S||!S.surveys)S=seed();
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function log(msg){S.log.unshift({t:Date.now(),who:S.user?S.user.name:'Sistem',msg});S.log=S.log.slice(0,80);save()}
const can=()=>S.user&&['admin','editor'].includes(S.user.role);
const survey=id=>S.surveys.find(s=>s.id===id);
const ROLE={admin:'Admin',editor:'Editor/Kreator',viewer:'Viewer/Analis'};
const numQ=s=>s.questions.filter(q=>QT[q.type].num);
const isClosed=s=>s.deadline&&Date.now()>new Date(s.deadline).getTime()+DAY;
const link=s=>location.href.split('#')[0]+'#isi-'+s.id;

/* respons terfilter */
function flagOf(s,r){const f=[];const dur=r.end-r.start;if(dur<s.questions.length*1500)f.push('terlalu cepat');
 const lk=s.questions.filter(q=>q.type==='likert').map(q=>r.a[q.id]).filter(v=>v!=null);if(lk.length>=4&&new Set(lk).size===1)f.push('jawaban seragam');return f}
function resp(s,raw){let r=S.responses.filter(x=>x.sid===s.id);if(raw)return r;
 if(R.excl)r=r.filter(x=>!flagOf(s,x).length);
 if(R.fq&&R.fv){const q=s.questions.find(q=>q.id===R.fq);if(q)r=r.filter(x=>{const a=x.a[q.id];return Array.isArray(a)?a.includes(R.fv):String(a)===R.fv})}return r}
const vals=(rs,q)=>rs.map(r=>r.a[q.id]).filter(v=>v!=null&&v!==''&&!Array.isArray(v)&&typeof v!=='object').map(Number).filter(Number.isFinite);
function scaleMax(q){return q.type==='likert'?q.options.length:q.type==='rating'?5:q.type==='nps'?10:q.max}

/* ===== Palet grafik (maroon ke coksu) ===== */
function lerp(c1,c2,t){const p=c=>[1,3,5].map(i=>parseInt(c.slice(i,i+2),16));const a=p(c1),b=p(c2);return '#'+a.map((x,i)=>Math.round(x+(b[i]-x)*t).toString(16).padStart(2,'0')).join('')}
const pal=n=>[...Array(n)].map((_,i)=>lerp('#5A1424','#D5B197',n<2?0:i/(n-1)));
let CH=[];function killCharts(){CH.forEach(c=>{try{c.destroy()}catch(e){}});CH=[]}
const cssv=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
function mk(id,cfg){const el=document.getElementById(id);if(!el||!window.Chart)return;
 Chart.defaults.color=cssv('--muted');Chart.defaults.borderColor=cssv('--line');Chart.defaults.font.family=cssv('--font-body');
 cfg.options=Object.assign({responsive:true,maintainAspectRatio:false,animation:false},cfg.options||{});CH.push(new Chart(el,cfg))}

/* ===== Alur isi survei ===== */
let F=null;
function startFill(sid,mode){const s=survey(sid);if(!s){go('404');return}
 F={sid,mode,step:'gate',idx:0,hist:[],answers:{},order:s.questions.map((_,i)=>i),w:'100%',consent:false,name:'',email:'',t0:0,cap:[2+Math.floor(Math.random()*7),2+Math.floor(Math.random()*7)],pts:0};
 if(s.randomize)for(let i=F.order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[F.order[i],F.order[j]]=[F.order[j],F.order[i]]}
 if(!s.password||mode==='preview')F.step='welcome';
 go('fill',sid)}
const ord=s=>F.order.map(i=>s.questions[i]);
function test(op,a,v){if(a==null||a==='')return false;const arr=Array.isArray(a)?a:[a];
 if(op==='eq')return arr.some(x=>String(x)===String(v));if(op==='ne')return !arr.some(x=>String(x)===String(v));
 const n=Number(arr[0]);if(op==='ge')return n>=Number(v);if(op==='le')return n<=Number(v);return false}
const shown=(q)=>!q.showIf||!q.showIf.q||test(q.showIf.op,F.answers[q.showIf.q],q.showIf.val);
function pipe(s,t){return String(t).replace(/\{\{q(\d+)\}\}/g,(m,n)=>{const q=s.questions[n-1];if(!q)return m;const a=F.answers[q.id];return a==null?'…':Array.isArray(a)?a.join(', '):typeof a==='object'?'…':a})}
function nextFrom(s,i){const O=ord(s),q=O[i];let t=null;
 for(const r of q.rules||[])if(test(r.op,F.answers[q.id],r.val)){t=r.goto;break}
 if(t==='end')return O.length;let n=t?O.findIndex(x=>x.id===t):i+1;if(n<=i)n=i+1;while(n<O.length&&!shown(O[n]))n++;return n}
function firstIdx(s){const O=ord(s);let i=0;while(i<O.length&&!shown(O[i]))i++;return i}
function answered(q){const a=F.answers[q.id];if(q.type==='ranking'||q.type==='grid')return q.type==='ranking'?!!a:a&&q.rows.every(r=>a[r]!=null);return a!=null&&a!==''&&!(Array.isArray(a)&&!a.length)}
