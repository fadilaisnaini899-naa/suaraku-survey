# Suaraku Survey

Website survei dengan tema maroon-coksu. Murni HTML, CSS, dan JavaScript (tanpa build).

## Struktur
- `index.html` : halaman utama
- `css/style.css` : semua gaya dan token warna (maroon, coksu) di bagian `:root`
- `js/data.js` : utilitas, statistik (mean, korelasi, Cronbach's Alpha), model data, dan data contoh (survei e-wallet)
- `js/pages.js` : tampilan semua halaman
- `js/actions.js` : klik, form, dan logika isi survei

## Menjalankan di VS Code
1. Buka folder ini di VS Code.
2. Pasang ekstensi **Live Server**, klik kanan `index.html`, pilih **Open with Live Server**.
   (Bisa juga klik dua kali `index.html` untuk membukanya langsung di browser.)
3. Perlu internet untuk memuat font, Chart.js, dan pembuat QR dari CDN.

## Catatan
- Data tersimpan di `localStorage` browser, jadi belum dibagikan antar pengguna.
- Akun demo: `demo@suaraku.id` / `demo1234`.
- Untuk dipakai banyak orang, tambahkan backend (misalnya Supabase atau Firebase) dan ganti fungsi `save()` serta pembacaan `S` di `js/data.js`.
- Deploy: seret folder ini ke app.netlify.com/drop.
