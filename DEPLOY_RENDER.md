# Renderda ochish

Bu kitob GitHubdagi `foniykio-commits/cpp-kitob` reposidan Render Static Site sifatida ochiladi. Sayt `dist` papkasini beradi. Darslar hash manzilda turadi (`/#1.1`), shuning uchun qo'shimcha rewrite shart emas.

## Sozlash

1. [Render](https://dashboard.render.com/) ga kiring va **New** → **Static Site** ni tanlang.
2. GitHub hisobini ulang va `foniykio-commits/cpp-kitob` reposini tanlang.
3. Maydonlarni shunday to'ldiring:

| Maydon | Qiymat |
| --- | --- |
| Name | `cpp-kitob` |
| Branch | `main` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |

4. **Create Static Site** ni bosing. Birinchi yig'ilish tugagach, Render `https://...onrender.com` manzilini beradi.

## Keyin nima bo'ladi

`main` ga yangi commit tushsa, Render o'sha commitni o'zi yig'adi va saytni yangilaydi. `node_modules` va `dist` GitHubga kirmaydi: ular `.gitignore` da. Render har safar o'zi `npm install` qiladi va `dist` ni yig'adi.

Sayt HTTPS da turadi. Telefonda bir marta ochilgach, xizmat ishchisi darslarni keshlaydi va keyingi ochilish internetsiz ham ishlaydi. Bosh ekranga yorliq qo'shish yo'li kitobning yuqorisidagi «Telefonga o'rnatish» bo'limida yozilgan.
