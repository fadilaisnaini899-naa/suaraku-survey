/* ===== Aksi & event ===== */
const ACT={};
const curS=()=>survey(R.id);
ACT.theme=()=>themeNext();
ACT.demofill=()=>startFill('demo01','live');
ACT.demologin=()=>{S.user=S.users[0];save();go('dashboard')};
ACT.social=a=>{const p=a.dataset.p;let u=S.users.find(x=>x.email==='user@'+p.toLowerCase()+'.com');if(!u){u={name:'Pengguna '+p,email:'user@'+p.toLowerCase()+'.com',pw:'',role:'editor',twofa:false,verified:true};S.users.push(u)}S.user=u;save();go('dashboard')};
ACT.logout=()=>{S.user=null;save();go('landing')};
ACT.newsurvey=()=>{if(!can())return toast('Peran Anda tidak boleh membuat survei');const s=newSurvey();S.surveys.unshift(s);log(`membuat survei baru`);save();go('builder',s.id)};
ACT.edit=a=>go('builder',a.dataset.id);
ACT.prev=a=>startFill(a.dataset.id,'preview');
ACT.openfill=a=>startFill(a.dataset.id,'live');
ACT.dup=a=>{const s=survey(a.dataset.id),c=JSON.parse(JSON.stringify(s));c.id=uid();c.title=s.title+' (salinan)';c.status='draft';c.created=Date.now();c.starts=0;c.respondents=[];S.surveys.unshift(c);log(`menduplikasi survei "${s.title}"`);save();render();toast('Survei diduplikasi sebagai draft')};
ACT.pubtog=a=>{const s=survey(a.dataset.id);if(!can())return toast('Peran Anda tidak boleh mengubah status survei');
 if(s.status==='published'){s.status='draft';toast('Survei ditarik dari publikasi')}else{if(!s.questions.length)return toast('Tambahkan minimal satu pertanyaan');s.status='published';toast('Survei dipublikasikan');log(`mempublikasikan survei "${s.title}"`)}save();render()};
ACT.arch=a=>{const s=survey(a.dataset.id);s.status=s.status==='archived'?'draft':'archived';save();render();toast(s.status==='archived'?'Survei diarsipkan':'Survei dipulihkan sebagai draft')};
ACT.del=a=>{const s=survey(a.dataset.id);ask(`Hapus survei "${s.title}" beserta ${S.responses.filter(r=>r.sid===s.id).length} responsnya? Tindakan ini tidak bisa dibatalkan.`,()=>{S.surveys=S.surveys.filter(x=>x.id!==s.id);S.responses=S.responses.filter(r=>r.sid!==s.id);log(`menghapus survei "${s.title}"`);save();render();toast('Survei dihapus')},'Hapus')};
ACT.flt=a=>{R.flt=a.dataset.v;render()};
ACT.addq=a=>{const s=curS(),q=newQ(a.dataset.t);s.questions.push(q);save();render();setTimeout(()=>{const el=$(`[data-qid="${q.id}"]`);el&&el.scrollIntoView({behavior:'smooth',block:'center'})},30)};
const qix=(s,id)=>s.questions.findIndex(q=>q.id===id);
ACT.qup=a=>{const s=curS(),i=qix(s,a.dataset.q);if(i>0){[s.questions[i-1],s.questions[i]]=[s.questions[i],s.questions[i-1]];save();render()}};
ACT.qdn=a=>{const s=curS(),i=qix(s,a.dataset.q);if(i<s.questions.length-1){[s.questions[i+1],s.questions[i]]=[s.questions[i],s.questions[i+1]];save();render()}};
ACT.qdup=a=>{const s=curS(),i=qix(s,a.dataset.q),c=JSON.parse(JSON.stringify(s.questions[i]));c.id='q'+uid();c.rules=[];s.questions.splice(i+1,0,c);save();render()};
ACT.qdel=a=>{const s=curS();if(s.questions.length<2)return toast('Survei butuh minimal satu pertanyaan');const id=a.dataset.q;ask('Hapus pertanyaan ini?',()=>{s.questions=s.questions.filter(q=>q.id!==id);s.questions.forEach(q=>{q.rules=q.rules.filter(r=>r.goto!==id);if(q.showIf&&q.showIf.q===id)q.showIf=null});save();render()},'Hapus')};
ACT.addrule=a=>{const s=curS(),q=s.questions[qix(s,a.dataset.q)];q.rules.push({op:'eq',val:q.type==='likert'?1:(q.options&&QT[q.type].o?q.options[0]:0),goto:'end'});save();render()};
ACT.rmrule=a=>{const s=curS(),q=s.questions[qix(s,a.dataset.q)];q.rules.splice(+a.dataset.ri,1);save();render()};
ACT.cp=a=>copy(a.dataset.v);
ACT.cpid=a=>{const t=$('#'+a.dataset.id);if(t)copy(t.value)};
ACT.cpmail=()=>copy($('#mailsub').value+'\n\n'+$('#mailbody').value);
function importCSV(txt){const s=curS();let n=0;txt.split(/\r?\n/).forEach(l=>{l=l.trim();if(!l)return;const c=l.split(/[,;\t]/).map(x=>x.trim().replace(/^"|"$/g,''));if(/^nama$/i.test(c[0])&&/email/i.test(c[1]||''))return;const email=c[1]||'';if(!email.includes('@'))return;if(s.respondents.some(r=>r.email.toLowerCase()===email.toLowerCase()))return;s.respondents.push({name:c[0],email,group:c[2]||''});n++});save();render();toast(n?`${n} responden diimpor`:'Tidak ada baris valid. Format: nama,email,kelompok')}
ACT.impcsv=()=>importCSV($('#csvin').value);
ACT.remind=()=>{const s=curS();const n=s.respondents.filter(r=>!S.responses.some(x=>x.sid===s.id&&x.email&&x.email.toLowerCase()===r.email.toLowerCase())).length;log(`mengirim pengingat (simulasi) ke ${n} responden`);toast(`Pengingat simulasi untuk ${n} responden yang belum mengisi`)};
ACT.rtab=a=>{R.tab=a.dataset.v;render()};
ACT.view=a=>{R.view[a.dataset.q]=R.view[a.dataset.q]==='pie'?'bar':'pie';render()};
ACT.png=a=>{const c=window.Chart&&Chart.getChart(a.dataset.c);if(!c)return;modal(`<h3>Grafik (PNG)</h3><img alt="Grafik" src="${c.toBase64Image('image/png',1)}" style="background:#fff;border-radius:10px"><p class="hint">Tekan lama atau klik kanan pada gambar untuk menyimpan.</p><button class="btn" data-act="closemodal">Tutup</button>`)};
ACT.exp=a=>{const s=curS(),rs=resp(s),k=a.dataset.k;let t='';
 if(k==='csv'||k==='dl')t=csvOf(s,rs);else if(k==='tsv')t=csvOf(s,rs,'\t');else if(k==='spss')t=spssOf(s,rs);
 else if(k==='json')t=JSON.stringify({survey:{id:s.id,title:s.title,questions:s.questions.map(q=>({id:q.id,type:q.type,text:q.text,options:q.options}))},responses:rs.map(r=>({id:r.id,start:r.start,end:r.end,device:r.device,answers:r.a}))},null,2);
 else{const x=v=>String(v).replace(/[<>&]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));t=`<?xml version="1.0" encoding="UTF-8"?>\n<survey id="${s.id}" title="${x(s.title)}">\n${rs.map(r=>`  <response id="${r.id}">\n${s.questions.map(q=>`    <answer q="${q.id}">${x(JSON.stringify(r.a[q.id]??''))}</answer>`).join('\n')}\n  </response>`).join('\n')}\n</survey>`}
 $('#exptxt').value=t;if(k==='dl'){dl(t,(s.title.replace(/\W+/g,'_'))+'.csv');toast('Jika berkas tidak terunduh, pakai tombol salin')}else copy(t,'Ekspor siap dan tersalin')};
ACT.stab=a=>{R.stab=a.dataset.v;render()};
ACT.brand=a=>{S.prefs.brand=a.dataset.v;save();applyPrefs();render()};
ACT.backup=()=>copy(JSON.stringify(S),'Cadangan tersalin. Simpan di tempat aman');
ACT.restore=()=>{try{const o=JSON.parse($('#bk').value);if(!o.surveys||!o.users)throw 0;S=o;save();applyPrefs();go('settings');toast('Data dipulihkan')}catch(e){toast('Format cadangan tidak valid')}};
ACT.reset=()=>ask('Semua survei dan respons Anda akan dihapus dan diganti data contoh. Lanjutkan?',()=>{S=seed();save();applyPrefs();go('landing');toast('Data direset')},'Reset');
ACT.genkey=()=>{S.apiKeys.push('sk_live_'+uid()+uid()+uid());save();render()};
ACT.rmkey=a=>{S.apiKeys=S.apiKeys.filter(k=>k!==a.dataset.v);save();render()};
ACT.pay=a=>modal(`<h3>Paket ${esc(a.dataset.v)} (simulasi)</h3><p class="muted">Pilih metode pembayaran. Tidak ada transaksi nyata di prototipe ini.</p><div class="stack" style="gap:.4rem">${['Transfer bank','E-wallet','Kartu kredit'].map((m,i)=>`<label class="opt"><input type="radio" name="pm" ${i?'':'checked'}>${m}</label>`).join('')}</div><div class="row"><span class="sp"></span><button class="btn" data-act="closemodal">Tutup</button><button class="btn pri" data-act="closemodal">Mulai percobaan 14 hari</button></div>`);
ACT.reload=()=>location.reload();
ACT.closemodal=()=>closeModal();
ACT.closeov=(a,e)=>{if(e.target===a)closeModal()};
ACT.askok=()=>{const f=askCb;closeModal();f&&f()};
/* isi survei */
ACT.leave=()=>go(S.user?'surveys':'landing');
ACT.closeprev=()=>go('builder',F.sid);
ACT.pw=a=>{F.w=a.dataset.v;render()};
ACT.restart=()=>startFill(F.sid,'preview');
ACT.star=a=>{F.answers[a.dataset.q]=+a.dataset.v;render()};
ACT.rk=a=>{const s=survey(F.sid),q=s.questions.find(x=>x.id===a.dataset.q),L=[...(F.answers[q.id]||q.options)],i=+a.dataset.i,j=i+ +a.dataset.d;[L[i],L[j]]=[L[j],L[i]];F.answers[q.id]=L;render()};
ACT.fnext=()=>{const s=survey(F.sid),O=ord(s),q=O[F.idx];if(q.type==='ranking'&&!F.answers[q.id])F.answers[q.id]=[...q.options];
 if(q.required&&!answered(q)){$('#qerr').textContent='Pertanyaan ini wajib dijawab.';return}
 F.hist.push(F.idx);const n=nextFrom(s,F.idx);if(n>=O.length)F.step='submit';else F.idx=n;render();window.scrollTo(0,0)};
ACT.fback=()=>{if(!F.hist.length)return;F.idx=F.hist.pop();F.step='q';render()};

document.addEventListener('click',e=>{
 const g=e.target.closest('[data-go]');
 if(g){e.preventDefault();if(g.dataset.m)R.auth=g.dataset.m;go(g.dataset.go,g.dataset.id||g.dataset.t,g.dataset.tab);
  if(g.dataset.sec)setTimeout(()=>{const el=document.getElementById(g.dataset.sec);el&&el.scrollIntoView({behavior:'smooth'})},30);return}
 const a=e.target.closest('[data-act]');if(a&&ACT[a.dataset.act]){e.preventDefault();ACT[a.dataset.act](a,e)}
});

/* builder: simpan ke model */
function bset(el){const s=curS();if(!s)return;const q=s.questions.find(x=>x.id===el.dataset.bq);if(!q)return;const k=el.dataset.bk;let v=el.type==='checkbox'?el.checked:el.value;
 if(k==='options'||k==='rows')v=v.split('\n').map(x=>x.trim()).filter(Boolean);
 if(k==='min'||k==='max')v=v===''?'':Number(v);
 if(el.dataset.ri!=null){const r=q.rules[+el.dataset.ri];if(r)r[k.slice(2)]=v}
 else if(k.startsWith('si_')){if(k==='si_q'){q.showIf=v?{q:v,op:q.showIf?.op||'eq',val:q.showIf?.val||''}:null}else if(q.showIf)q.showIf[k.slice(3)]=v}
 else q[k]=v;save()}
function sset(el){const s=curS();if(!s||!can())return;const k=el.dataset.ss;let v=el.type==='checkbox'?el.checked:el.value;if(k==='est')v=Math.max(1,+v||1);s[k]=v;save()}
document.addEventListener('input',e=>{const el=e.target,d=el.dataset;
 if(d.bq)bset(el);else if(d.ss)sset(el);
 else if(d.fin){F.answers[d.fin]=el.type==='number'?(el.value===''?undefined:Number(el.value)):el.value;const er=$('#qerr');if(er)er.textContent=''}
 else if(d.fr){F.answers[d.fr]=Number(el.value);const r=$('#rv_'+d.fr);if(r)r.textContent=el.value}
 else if(el.id==='sf'){R.sf=el.value;const p=el.selectionStart;render();const n=$('#sf');n.focus();n.setSelectionRange(p,p)}
 else if(d.pref&&el.type!=='checkbox'&&el.tagName!=='SELECT'){S.prefs[d.pref]=el.value;save();applyPrefs()}
 else if(d.pref2){S[d.pref2]=el.value;save()}
 else if(el.id==='hq'){const q=el.value.toLowerCase();$$('#faqs details').forEach(x=>x.hidden=!x.textContent.toLowerCase().includes(q))}
});
document.addEventListener('change',e=>{const el=e.target,d=el.dataset;
 if(d.bq){bset(el);if(d.rr||d.ri!=null)render()}
 else if(d.ss){sset(el);if(R.page==='builder'&&el.type==='checkbox')render()}
 else if(d.fi){const s=survey(F.sid),q=s.questions.find(x=>x.id===d.fi);
  if(el.type==='checkbox')F.answers[q.id]=$$(`input[data-fi="${q.id}"]:checked`).map(x=>x.value);else F.answers[q.id]=d.num?Number(el.value):el.value;
  $$('#qbox label').forEach(l=>{const i=l.querySelector('input');if(i)l.classList.toggle('on',i.checked)});$('#qerr').textContent='';
  if(q.type==='single'&&q.rules.length===0&&false)ACT.fnext()}
 else if(d.fs){F.answers[d.fs]=el.value||undefined;$('#qerr').textContent=''}
 else if(d.fg){const a=F.answers[d.fg]||{};a[d.row]=el.value;F.answers[d.fg]=a;$('#qerr').textContent=''}
 else if(d.ff){const f=el.files[0];F.answers[d.ff]=f?{name:f.name,size:f.size}:undefined;render()}
 else if(el.id==='fq'){R.fq=el.value;R.fv='';render()}
 else if(el.id==='fv'){R.fv=el.value;render()}
 else if(el.id==='excl'){R.excl=el.checked;render()}
 else if(['c1','c2','x1','x2'].includes(el.id)){R[el.id]=el.value;render()}
 else if(el.id==='grp'){R.grp=el.value;render()}
 else if(el.id==='tpl'){const T={akademik:['pend','metode','uji','desk','simp'],ringkas:['desk','simp'],eksekutif:['simp']}[el.value];R.rep={tpl:el.value,on:{}};T.forEach(k=>R.rep.on[k]=1);render()}
 else if(d.rep){R.rep.on[d.rep]=el.checked?1:0;render()}
 else if(d.inst){R.inst=$$('[data-inst]:checked').map(x=>x.dataset.inst);render()}
 else if(d.integ){S.integ[d.integ]=el.checked;save();toast(el.checked?d.integ+' diaktifkan (simulasi)':d.integ+' dinonaktifkan')}
 else if(d.task){const t=S.tasks.find(x=>x.id===d.task);t.done=el.checked;save();render()}
 else if(el.id==='role'){S.user.role=el.value;const t=S.team.find(x=>x.email===S.user.email);if(t)t.role=el.value;save();toast('Peran diubah menjadi '+ROLE[el.value]);render()}
 else if(d.act2==='twofa'){S.user.twofa=el.checked;save();toast(el.checked?'2FA diaktifkan':'2FA dimatikan')}
 else if(d.pref){S.prefs[d.pref]=el.type==='checkbox'?el.checked:el.value;save();applyPrefs();render()}
 else if(el.id==='csvfile'){const f=el.files[0];if(f){const r=new FileReader();r.onload=()=>importCSV(String(r.result));r.readAsText(f)}}
});
/* drag & drop pertanyaan */
let dragId=null;
document.addEventListener('dragstart',e=>{const h=e.target.closest('[data-drag]');if(!h)return;dragId=h.dataset.drag;try{e.dataTransfer.setData('text/plain',dragId);e.dataTransfer.effectAllowed='move';const c=h.closest('.qcard');c&&e.dataTransfer.setDragImage(c,20,20)}catch(x){}});
document.addEventListener('dragover',e=>{const c=e.target.closest('.qcard');if(c&&dragId){e.preventDefault();$$('.qcard.over').forEach(x=>x.classList.remove('over'));c.classList.add('over')}});
document.addEventListener('drop',e=>{const c=e.target.closest('.qcard');if(!c||!dragId)return;e.preventDefault();const s=curS(),from=qix(s,dragId),to=qix(s,c.dataset.qid);if(from>-1&&to>-1&&from!==to){const [q]=s.questions.splice(from,1);s.questions.splice(to,0,q);save()}dragId=null;render()});
document.addEventListener('dragend',()=>{dragId=null;$$('.qcard.over').forEach(x=>x.classList.remove('over'))});

/* form */
const FORM={};
const code6=()=>String(Math.floor(100000+Math.random()*900000));
FORM.login=f=>{const id=f.email.value.trim().toLowerCase(),u=S.users.find(x=>(x.email.toLowerCase()===id||x.email.split('@')[0].toLowerCase()===id)&&(x.pw===hash(f.pw.value)||x.pw===''));
 if(!u)return toast('Email atau kata sandi salah. Coba lagi atau pakai akun demo.');
 if(u.twofa){R.tmp={code:code6(),user:u};R.auth='twofa';return render()}S.user=u;save();go('dashboard')};
FORM.twofa=f=>{if(f.code.value!==R.tmp.code)return toast('Kode salah');S.user=R.tmp.user;save();go('dashboard')};
FORM.register=f=>{const email=f.email.value.trim();if(S.users.some(u=>u.email.toLowerCase()===email.toLowerCase()))return toast('Email sudah terdaftar. Silakan masuk.');
 R.tmp={email,code:code6(),user:{name:f.name.value.trim(),email,pw:hash(f.pw.value),role:'editor',twofa:false,verified:false}};R.auth='verify';render()};
FORM.verify=f=>{if(f.code.value!==R.tmp.code)return toast('Kode verifikasi salah');const u=R.tmp.user;u.verified=true;S.users.push(u);S.team.push({name:u.name,email:u.email,role:u.role,status:'aktif'});S.user=u;save();go('dashboard');toast('Akun terverifikasi. Selamat datang!')};
FORM.forgot=f=>{R.auth='login';render();toast('Tautan reset dikirim ke '+f.email.value+' (simulasi)')};
FORM.profile=f=>{const u=S.user;u.name=f.name.value.trim();u.email=f.email.value.trim();if(f.pw.value)u.pw=hash(f.pw.value);save();render();toast('Profil disimpan')};
FORM.invite=f=>{S.team.push({name:f.email.value.split('@')[0],email:f.email.value,role:f.role.value,status:'diundang'});log(`mengundang ${f.email.value}`);save();render();toast('Undangan dibuat (simulasi)')};
FORM.task=f=>{S.tasks.push({id:uid(),text:f.text.value,who:f.who.value,done:false});save();render()};
FORM.contact=f=>{const t={id:String(1000+S.tickets.length+1),msg:f.msg.value};S.tickets.unshift(t);save();render();toast('Tiket #'+t.id+' dibuat')};
FORM.sched=f=>{S.sched={email:f.email.value,freq:f.freq.value};save();render();toast('Jadwal laporan disimpan (simulasi)')};
FORM.gate=f=>{const s=survey(F.sid);if(f.code.value!==s.password)return toast('Kode akses salah');F.step='welcome';render()};
FORM.start=f=>{const s=survey(F.sid);if(!s.anon){F.name=f.name.value;F.email=f.email.value}F.consent=true;F.t0=Date.now();if(F.mode==='live'){s.starts=(s.starts||0)+1;save()}
 const i=firstIdx(s);F.hist=[];if(i>=s.questions.length)F.step='submit';else{F.idx=i;F.step='q'}render();window.scrollTo(0,0)};
FORM.submit=f=>{const s=survey(F.sid);if(f.website.value)return;if(Number(f.cap.value)!==F.cap[0]+F.cap[1]){toast('Jawaban hitungan salah');return}
 const vis=new Set(F.hist.map(i=>ord(s)[i].id)),a={};Object.keys(F.answers).forEach(k=>{if(vis.has(k)&&F.answers[k]!==undefined)a[k]=F.answers[k]});
 F.pts=Object.keys(a).length*10;
 if(F.mode==='live'){S.responses.push({id:'r'+uid(),sid:s.id,start:F.t0,end:Date.now(),device:devOf(),anon:s.anon,name:F.name,email:F.email,a});if(s.oneResp)S.done[s.id]=true;save()}
 F.step='done';render();window.scrollTo(0,0)};
document.addEventListener('submit',e=>{const f=e.target,n=f.dataset.form;if(n&&FORM[n]){e.preventDefault();FORM[n](f)}});

/* ===== Mulai ===== */
applyPrefs();
try{window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(S.prefs.theme==='system')render()})}catch(e){}
function boot(){const h=location.hash;if(h.startsWith('#isi-')&&survey(h.slice(5)))startFill(h.slice(5),'live');else render()}
window.addEventListener('hashchange',()=>{if(location.hash.startsWith('#isi-')){const id=location.hash.slice(5);if(survey(id)&&!(F&&R.page==='fill'&&F.sid===id))startFill(id,'live')}});
boot();
