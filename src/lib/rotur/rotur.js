/* rotur-sdk.js ─────────────────────────────────────────────────────────────
   Browser-safe Rotur SDK  •  No Scratch, no Node built-ins.                */

/* ───── tiny event system (2.5 KB after minify) ─────────────────────────── */
class MiniEmitter {
  #map = new Map();                    // { event → Set<listener> }

  on (ev, fn) { (this.#map.get(ev) || this.#map.set(ev,new Set()).get(ev))
                .add(fn); return () => this.off(ev, fn); }      // ⟼ un-sub fn
  off(ev, fn) { this.#map.get(ev)?.delete(fn); }
  emit(ev, data) { this.#map.get(ev)?.forEach(fn => fn(data)); }
}

/* ───── helpers ─────────────────────────────────────────────────────────── */
const rand = n => crypto.getRandomValues(new Uint32Array(n))
                        .reduce((a,x)=>a+x.toString(36), '').slice(0,n);
// ...existing code...
// Minimal synchronous MD5 implementation (public domain)
// Source: https://github.com/blueimp/JavaScript-MD5 (minified for brevity)
const MD5 = function (r) { function n(r, n) { var t, o, e, u, f; return e = 2147483648 & r, u = 2147483648 & n, f = (1073741823 & r) + (1073741823 & n), (t = 1073741824 & r) & (o = 1073741824 & n) ? 2147483648 ^ f ^ e ^ u : t | o ? 1073741824 & f ? 3221225472 ^ f ^ e ^ u : 1073741824 ^ f ^ e ^ u : f ^ e ^ u } function t(r, t, o, e, u, f, a) { return r = n(r, n(n(t & o | ~t & e, u), a)), n(r << f | r >>> 32 - f, t) } function o(r, t, o, e, u, f, a) { return r = n(r, n(n(t & e | o & ~e, u), a)), n(r << f | r >>> 32 - f, t) } function e(r, t, o, e, u, f, a) { return r = n(r, n(n(t ^ o ^ e, u), a)), n(r << f | r >>> 32 - f, t) } function u(r, t, o, e, u, f, a) { return r = n(r, n(n(o ^ (t | ~e), u), a)), n(r << f | r >>> 32 - f, t) } function f(r) { var n, t = "", o = ""; for (n = 0; 3 >= n; n++)t += (o = "0" + (o = r >>> 8 * n & 255).toString(16)).substr(o.length - 2, 2); return t } var a, i, C, c, g, h, d, v, S; for (r = function (r) { r = r.replace(/\r\n/g, "\n"); for (var n = "", t = 0; t < r.length; t++) { var o = r.charCodeAt(t); 128 > o ? n += String.fromCharCode(o) : (127 < o && 2048 > o ? n += String.fromCharCode(o >> 6 | 192) : (n += String.fromCharCode(o >> 12 | 224), n += String.fromCharCode(o >> 6 & 63 | 128)), n += String.fromCharCode(63 & o | 128)) } return n }(r), a = function (r) { for (var n, t = r.length, o = 16 * (((n = t + 8) - n % 64) / 64 + 1), e = Array(o - 1), u = 0, f = 0; f < t;)u = f % 4 * 8, e[n = (f - f % 4) / 4] |= r.charCodeAt(f) << u, f++; return e[n = (f - f % 4) / 4] |= 128 << f % 4 * 8, e[o - 2] = t << 3, e[o - 1] = t >>> 29, e }(r), h = 1732584193, d = 4023233417, v = 2562383102, S = 271733878, r = 0; r < a.length; r += 16)i = h, C = d, c = v, g = S, h = t(h, d, v, S, a[r + 0], 7, 3614090360), S = t(S, h, d, v, a[r + 1], 12, 3905402710), v = t(v, S, h, d, a[r + 2], 17, 606105819), d = t(d, v, S, h, a[r + 3], 22, 3250441966), h = t(h, d, v, S, a[r + 4], 7, 4118548399), S = t(S, h, d, v, a[r + 5], 12, 1200080426), v = t(v, S, h, d, a[r + 6], 17, 2821735955), d = t(d, v, S, h, a[r + 7], 22, 4249261313), h = t(h, d, v, S, a[r + 8], 7, 1770035416), S = t(S, h, d, v, a[r + 9], 12, 2336552879), v = t(v, S, h, d, a[r + 10], 17, 4294925233), d = t(d, v, S, h, a[r + 11], 22, 2304563134), h = t(h, d, v, S, a[r + 12], 7, 1804603682), S = t(S, h, d, v, a[r + 13], 12, 4254626195), v = t(v, S, h, d, a[r + 14], 17, 2792965006), h = o(h, d = t(d, v, S, h, a[r + 15], 22, 1236535329), v, S, a[r + 1], 5, 4129170786), S = o(S, h, d, v, a[r + 6], 9, 3225465664), v = o(v, S, h, d, a[r + 11], 14, 643717713), d = o(d, v, S, h, a[r + 0], 20, 3921069994), h = o(h, d, v, S, a[r + 5], 5, 3593408605), S = o(S, h, d, v, a[r + 10], 9, 38016083), v = o(v, S, h, d, a[r + 15], 14, 3634488961), d = o(d, v, S, h, a[r + 4], 20, 3889429448), h = o(h, d, v, S, a[r + 9], 5, 568446438), S = o(S, h, d, v, a[r + 14], 9, 3275163606), v = o(v, S, h, d, a[r + 3], 14, 4107603335), d = o(d, v, S, h, a[r + 8], 20, 1163531501), h = o(h, d, v, S, a[r + 13], 5, 2850285829), S = o(S, h, d, v, a[r + 2], 9, 4243563512), v = o(v, S, h, d, a[r + 7], 14, 1735328473), h = e(h, d = o(d, v, S, h, a[r + 12], 20, 2368359562), v, S, a[r + 5], 4, 4294588738), S = e(S, h, d, v, a[r + 8], 11, 2272392833), v = e(v, S, h, d, a[r + 11], 16, 1839030562), d = e(d, v, S, h, a[r + 14], 23, 4259657740), h = e(h, d, v, S, a[r + 1], 4, 2763975236), S = e(S, h, d, v, a[r + 4], 11, 1272893353), v = e(v, S, h, d, a[r + 7], 16, 4139469664), d = e(d, v, S, h, a[r + 10], 23, 3200236656), h = e(h, d, v, S, a[r + 13], 4, 681279174), S = e(S, h, d, v, a[r + 0], 11, 3936430074), v = e(v, S, h, d, a[r + 3], 16, 3572445317), d = e(d, v, S, h, a[r + 6], 23, 76029189), h = e(h, d, v, S, a[r + 9], 4, 3654602809), S = e(S, h, d, v, a[r + 12], 11, 3873151461), v = e(v, S, h, d, a[r + 15], 16, 530742520), h = u(h, d = e(d, v, S, h, a[r + 2], 23, 3299628645), v, S, a[r + 0], 6, 4096336452), S = u(S, h, d, v, a[r + 7], 10, 1126891415), v = u(v, S, h, d, a[r + 14], 15, 2878612391), d = u(d, v, S, h, a[r + 5], 21, 4237533241), h = u(h, d, v, S, a[r + 12], 6, 1700485571), S = u(S, h, d, v, a[r + 3], 10, 2399980690), v = u(v, S, h, d, a[r + 10], 15, 4293915773), d = u(d, v, S, h, a[r + 1], 21, 2240044497), h = u(h, d, v, S, a[r + 8], 6, 1873313359), S = u(S, h, d, v, a[r + 15], 10, 4264355552), v = u(v, S, h, d, a[r + 6], 15, 2734768916), d = u(d, v, S, h, a[r + 13], 21, 1309151649), h = u(h, d, v, S, a[r + 4], 6, 4149444226), S = u(S, h, d, v, a[r + 11], 10, 3174756917), v = u(v, S, h, d, a[r + 2], 15, 718787259), d = u(d, v, S, h, a[r + 9], 21, 3951481745), h = n(h, i), d = n(d, C), v = n(v, c), S = n(S, g); return (f(h) + f(d) + f(v) + f(S)).toLowerCase() };
// ...existing code...

/* ───── Rotur core ──────────────────────────────────────────────────────── */
export default class Rotur extends MiniEmitter {
  version = 6;               connected = false;   authenticated = false;
  user = {}; userToken = '';  friends = {list:[],requests:[]};

  /* internal */
  #ws=null; #server=''; #accounts=''; #designation='rtr'; #uname=rand(32);
  #client = {}; #storageId;  packets={}; raw=[]; synced={}; local={};

  constructor(opts={}) {
    super();
    if (opts.designation) this.#designation = opts.designation;

    /* discover endpoints */
    fetch('https://raw.githubusercontent.com/Mistium/Origin-OS/main/Resources/info.json')
      .then(r=>r.ok?r.json():Promise.reject())
      .then(j=>{ this.#accounts=j.name; this.#server=j.server; })
      .catch(()=>{ this.#accounts='sys.-origin'; this.#server='wss://rotur.mistium.com'; });

    /* async version check (non-blocking, fires "update" event) */
    fetch('https://raw.githubusercontent.com/RoturTW/main/main/Implementations/SCRATCH/version.txt')
      .then(r=>r.ok&&r.text()).then(t=>{
        if (this.version<+t) { this.emit('update', t.trim()); }
      }).catch(()=>{});
  }

  /* ── connection ── */
  async connect({system='rotur', version='v5'}={}) {
    if (this.#ws) this.disconnect();
    while (!this.#server) await new Promise(r=>setTimeout(r,80));

    this.#client={system,version};
    this.#ws = new WebSocket(this.#server);

    this.#ws.addEventListener('open',  ()=>this.#handshake());
    this.#ws.addEventListener('close', ()=>this.#closed());
    this.#ws.addEventListener('message',e=>this.#handle(JSON.parse(e.data)));

    this.connected = true;
  }
  disconnect(){ this.#ws?.close(); this.#ws=null; }

  /* ── auth ── */
  async login({user, pass, md5=false}) {
    if (!this.connected) throw Error('not connected');
    const hash = MD5(pass);
    const uenc = encodeURIComponent; 
    const url=`https://social.rotur.dev/get_user?username=${uenc(user)}&password=${uenc(hash)}`;

    const res = await fetch(url); if(!res.ok) throw Error('Auth fail '+res.status);
    const data = await res.json();

    this.userToken=data.key; this.user={...data};
    delete this.user.key; delete this.user.password;

    this.friends.list     = this.user['sys.friends']??[];
    this.friends.requests = this.user['sys.requests']??[];
    delete this.user['sys.friends']; delete this.user['sys.requests'];

    this.#uname=`${this.#designation}-${user}§${rand(10)}`;
    this.#send({cmd:'setid', val:this.#uname, listener:'set_username_cfg'});
    this.#send({cmd:'auth', val:this.userToken});

    this.authenticated=true; this.emit('authenticated', user);
    return data;
  }
  logout(){ if(!this.#ws)return;
    this.#send({cmd:'pmsg',val:{command:'logout',client:this.#client,id:':3'},id:this.#accounts});
    this.authenticated=false; this.userToken=''; this.user={}; this.disconnect();
  }

  /* ── messaging ── */
  sendMessage({to,payload='',from='port',target='port'}){
    if(!this.connected)throw Error('no ws');
    this.#send({cmd:'pmsg', val:{client:this.#client,payload,
          source:from,target, timestamp:Date.now()}, id:to});
  }

  /* ── storage example (one call) ── */
  async setProjectStorageId(id){
    this.#needAuth();
    if(this.#storageId) throw Error('id exists');
    const res = await this.#rpc('storage_getid', id);
    this.#storageId=id; this.local=JSON.parse(res); return id;
  }

  /* ————————————————————————————————— INTERNALS ———————————————————————————— */
  #send(o){ this.#ws?.send(JSON.stringify(o)); }
  #handshake(){ this.#send({cmd:'handshake',val:{language:'JS'},listener:'handshake_cfg'}); }
  #closed(){ this.connected=false; this.authenticated=false; this.emit('disconnect'); }
  #needAuth(){ if(!this.authenticated) throw Error('login first'); }

  #handle(p){
    if(p.listener==='handshake_cfg') return this.#send({cmd:'setid',val:this.#uname,listener:'set_username_cfg'});
    if(p.listener==='set_username_cfg')return this.#send({cmd:'link',val:['roturTW'],listener:'link_cfg'});
    if(p.listener==='link_cfg'&&!this.connected){ this.connected=true; this.emit('connect'); return; }

    if(p.cmd==='pmsg'){ this.raw.push(p); if(p.val?.target){
      (this.packets[p.val.target]??=[]).push(p); this.emit('message',p);} }

    if(p.cmd==='ulist'){
      if(p.mode==='add'){ this.emit('user-join',p.val.username);}
      if(p.mode==='remove'){ this.emit('user-leave',p.val.username);}
    }
  }

  #rpc(command, payload){
    return new Promise(res=>{
      const handler = e=>{
        const d=JSON.parse(e.data);
        if(d?.val?.source_command===command){
          this.#ws.removeEventListener('message',handler);
          res(d.val.payload);
        }
      };
      this.#ws.addEventListener('message',handler);
      this.#send({cmd:'pmsg',val:{command,client:this.#client,id:':3',payload},id:this.#accounts});
    });
  }
}