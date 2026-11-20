const BS = String.fromCharCode(92);

function decode(value) {
  if (typeof value === "string") {
    return value.split("{{n}}").join(BS + "n");
  }
  if (Array.isArray(value)) return value.map(decode);
  if (value && typeof value === "object") {
    const out = {};
    for (const [key, item] of Object.entries(value)) out[key] = decode(item);
    return out;
  }
  return value;
}

const rawChapter = {
  id: "7",
  number: 7,
  title: "Funksiyalar",
  summary:
    "Kodni nomli bo'lakka yig'ish: qaytarish, e'lon, nusxa, havola, standart parametr, scope, qayta yuklash va rekursiya.",
  lessons: [
    {
      id: "7.1",
      navTitle: "Funksiya nima",
      title: "Funksiya nima va nima uchun kod bo'laklarga ajraladi",
      goal: [
        "Bu darsdan keyin siz funksiyani nomlangan ish deb tushuntirasiz. Bir xil qadamlarni nusxalash o'rniga shu nomni chaqirasiz. Chaqiruv argument beradi, ish tugagach boshqaruv keyingi qatorga qaytadi. `main` ham funksiya ekanini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Oshxona retseptini ko'ring. «Nonushta» deb yozilgan varaq bor. Ichida suv qo'yish, choy quyish, piyola olib chiqish. Har safar mehmon kelsa, bu qadamlarni devorga qayta yozmaysiz. «Nonushta» deysiz, varaqdagi ish bajariladi, keyin siz stolga qaytasiz. Funksiya shu varaq. Nom bor, ichida qadamlar bor, chaqiruv shu varaqni ochadi.",
          "Argument buyurtma. «Ikki piyola» desangiz, varaqning o'zi o'zgarmaydi, bu safargi son o'zgaradi. Parametr varaqdagi bo'sh joy: nechta piyola. Argument chaqiruvdagi 2. Bo'sh joyga 2 yoziladi, ish shu son bilan ketadi.",
          "Varaq tugagach oshpaz yo'qolib ketmaydi. U buyurtmani bergan odamning keyingi gapiga qaytadi. `salom();` dan keyingi qator shu qaytish. Funksiya dasturni tugatmaydi, toki u `main` bo'lib, `main` ning o'zi tugamasa.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Funksiyaning nomi, parametrlari va tanasi bor. Chaqiruv nom va qavs. Qavs bo'sh bo'lishi mumkin. Nuqta-vergul chaqiruvni yopadi. Tana `{}` ichida, u ham o'z blok qoidasiga bo'ysunadi.",
        ],
        items: [
          {
            title: "Nomlangan tana",
            paragraphs: [
              "Tana bir marta yoziladi. Chaqiruv uni ishga tushiradi. Ikki chaqiruv ikki marta ishlatadi, kod ikki marta nusxalanmaydi.",
              "`main` ham funksiya. Operatsion tizim dasturni shu yerdan boshlaydi. `main` ichidan boshqa funksiyalar chaqiriladi. Ular tugagach `main` o'z keyingi qatoridan davom etadi.",
            ],
            code: `void salom() {
    std::cout << "salom{{n}}";
}

salom();
salom();`,
            codeLabel: "bir tana, ikki chaqiruv",
          },
          {
            title: "Parametr va argument",
            paragraphs: [
              "Parametr ta'rifdagi nom. `void hisob(int narx, int dona)` da `narx` va `dona` parametr. Ular shu funksiyaning lokal qutisi.",
              "Argument chaqiruvdagi qiymat. `hisob(20, 3)` da 20 va 3 argument. Birinchi argument birinchi parametrga, ikkinchisi ikkinchisiga tushadi. Tartib muhim, nom emas.",
              "Bu darsda qiymat nusxa bo'lib tushadi. Nusxa chaqiruvchining qutisini o'zgartirmaydi. Buni 7.4 va 7.5 da ajratamiz.",
            ],
            code: `void hisob(int narx, int dona) {
    std::cout << dona << " ta, jami " << narx * dona << "{{n}}";
}

hisob(20, 3);`,
            codeLabel: "argument parametrga tushadi",
          },
          {
            title: "Nima uchun bo'laklash kerak",
            paragraphs: [
              "Bir xil o'n qator ikki joyda tursa, xatoni ikkala joyda tuzatasiz. Funksiyada bir marta tuzatasiz. Nom ishning ma'nosini aytadi: `hisob` ichidagi ko'paytirish nima uchun turganini chaqiruvning o'zi ko'rsatadi.",
              "Bo'lakni alohida o'qish mumkin. `main` buyurtmalar ro'yxati bo'lib qoladi. Retsept ichida qoladi. Hozircha hammasi bitta faylda. Katta dasturda e'lon va tana ajraladi, bu 7.3-dars.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Bir tana, ikki chaqiruv, keyin qaytish",
          intro: [
            "`salom` ikki marta chaqiriladi. Har safar tana ishlaydi va `main` dagi keyingi qatorga qaytadi.",
          ],
          codeLabel: "salom.cpp",
          code: `#include <iostream>

void salom() {
    std::cout << "salom{{n}}";
}

int main() {
    salom();
    salom();
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `salom
salom`,
          analysis: [
            {
              lines: "3-5",
              text: "Tana shu yerda yozilgan. Dastur bu qatorlardan boshlanmaydi. `main` chaqirmaguncha `salom` ishlamaydi.",
            },
            {
              lines: "8",
              text: "Birinchi chaqiruv. Boshqaruv 4-qatorga o'tadi, `salom` yoziladi, tana tugaydi. Boshqaruv 8-qatorning keyingisiga, ya'ni 9-qatorga qaytadi.",
            },
            {
              lines: "9",
              text: "Ikkinchi chaqiruv yangi ish. Yana 4-qator, yana bitta `salom`. Oldingi chaqiruvning qoldig'i yo'q, bu funksiyada saqlanadigan quti ham yo'q.",
            },
            {
              lines: "10",
              text: "`return 0` `main` ni tugatadi. Operatsion tizimga oddiy tugash belgisi ketadi. Ikki chaqiruvdan keyin dastur shu yerda to'xtaydi.",
            },
          ],
        },
        {
          title: "Argumentlar tartib bilan tushadi",
          intro: [
            "20 narx, 3 dona. Ikkinchi chaqiruvda 15 va 2. Ko'paytirish bir joyda, ikki buyurtma `main` da.",
          ],
          codeLabel: "hisob.cpp",
          code: `#include <iostream>

void hisob(int narx, int dona) {
    std::cout << dona << " ta, jami " << narx * dona << "{{n}}";
}

int main() {
    hisob(20, 3);
    hisob(15, 2);
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `3 ta, jami 60
2 ta, jami 30`,
          analysis: [
            {
              lines: "3",
              text: "`narx` birinchi parametr, `dona` ikkinchi. Chaqiruvdagi birinchi son `narx` ga, ikkinchisi `dona` ga yoziladi. Teskari o'qilmaydi.",
            },
            {
              lines: "8",
              text: "`hisob(20, 3)`. `narx` 20, `dona` 3. 3 marta 20 bu 60. Ekran: `3 ta, jami 60`. Tana tugaydi, parametr qutilari yo'qoladi.",
            },
            {
              lines: "9",
              text: "Yangi chaqiruv, yangi qutilar. `narx` 15, `dona` 2. Jami 30. Oldingi 20 bu chaqiruvda yo'q.",
            },
            {
              lines: "4",
              text: "Agar shu ko'paytirish `main` ichida ikki marta yozilgan bo'lsa, formulani ikki joyda tuzatish kerak edi. Hozir formula bitta.",
            },
          ],
        },
        {
          title: "Chaqiruvlar ketma-ket, har biri o'zicha tugaydi",
          intro: [
            "`bir`, keyin `ikki`, keyin yana `bir`. Ikkinchi `bir` birinchisidan qolgan narsani eslamaydi. Tartibni `main` belgilaydi.",
          ],
          codeLabel: "ketma_ket.cpp",
          code: `#include <iostream>

void bir() {
    std::cout << "bir{{n}}";
}

void ikki() {
    std::cout << "ikki{{n}}";
}

int main() {
    bir();
    ikki();
    bir();
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `bir
ikki
bir`,
          analysis: [
            {
              lines: "12",
              text: "`bir` chaqiriladi. 4-qator yozadi, funksiya qaytadi. `ikki` hali tegilmagan.",
            },
            {
              lines: "13",
              text: "Endi `ikki`. U `bir` ning ichida emas, `main` dagi keyingi qator. `ikki` yoziladi va qaytadi.",
            },
            {
              lines: "14",
              text: "`bir` yana chaqiriladi. Bu yangi chaqiruv. Yana bitta `bir`. Uchta qator shu tartibda.",
            },
            {
              lines: "tartib",
              text: "Agar 13 va 14 o'rni almashtirilsa, konsol ham almashadi. Funksiya o'zi navbat tanlamaydi. Navbatni chaqiruvchi yozadi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Chaqiruv stekka yangi freym qo'yadi. Freymda qaytish manzili bor: ish bitgach qaysi qatorga qaytish. `salom` ning birinchi chaqiruvida qaytish 9-qator. Tana ishlaydi, freym olinadi, `main` 9-qatordan davom etadi. Ikkinchi chaqiruv yangi freym, qaytish endi 10-qator.",
          "`hisob(20, 3)` freymiga 20 va 3 yoziladi. Ko'paytirish shu nusxalar ustida. `main` dagi sonlar, agar ular o'zgaruvchi bo'lsa, bu freymdagi qutilar emas. Tana tugagach freym bo'shaydi. Keyingi `hisob(15, 2)` boshqa 15 va 2 ni olib keladi.",
          "Funksiya tanasi xotirada bir nusxa. Ikki chaqiruv o'sha buyruqlarni ikki marta bajaradi, ikki marta joy egallamaydi. Joy egallaydigan narsa chaqiruv freymi, u vaqtinchalik.",
          "`main` ning o'zi ham freym. Operatsion tizim uni ochadi. `return 0` shu freymni yopadi va 0 ni tizimga beradi. Boshqa funksiya qaytishi dasturni yopmaydi, faqat o'z freymini oladi.",
        ],
        diagram: `main freymi
  salom() -> yangi freym, qaytish: keyingi qator
             "salom" buferga
             freym yopiladi
  salom() -> yana yangi freym
             "salom"
             freym yopiladi
  return 0

hisob(20, 3)
  narx [20] dona [3]   shu freymda
  60 yoziladi
  freym yo'qoladi
hisob(15, 2)
  yangi narx [15] dona [2]`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Funksiya xatosi ko'pincha chaqiruvni unutish yoki argument tartibini almashtirish. Kod yig'iladi, natija esa boshqa buyurtma bo'ladi.",
        ],
        items: [
          {
            title: "Tanani yozib, chaqirmaslik",
            why: [
              "Tana o'zi ishlamaydi. `salom` yozilgan, `main` ichida `salom();` yo'q. Konsol bo'sh, xato ham yo'q. Chaqiruv qatorini qo'ying.",
            ],
            wrong: `void salom() {
    std::cout << "salom{{n}}";
}

int main() {
    return 0;
}`,
            right: `void salom() {
    std::cout << "salom{{n}}";
}

int main() {
    salom();
    return 0;
}`,
          },
          {
            title: "Argument tartibini almashtirish",
            why: [
              "`hisob(3, 20)` da narx 3, dona 20. Jami 60 bo'lib qolishi mumkin, lekin matn `20 ta, jami 60` emas, `3 ta` kerak bo'lgan joyda `20 ta` chiqadi. Birinchi o'rin birinchi parametr.",
            ],
            wrong: `hisob(3, 20);`,
            right: `hisob(20, 3);`,
          },
          {
            title: "Bir xil blokni ikki joyga nusxalash",
            why: [
              "Ikki joyda bir xil ko'paytirish. Bittasini tuzatsangiz, ikkinchisi eskicha qoladi. Blokni funksiyaga yig'ing, `main` da ikki marta chaqiring.",
            ],
            wrong: `std::cout << 3 << " ta, jami " << 20 * 3 << "{{n}}";
std::cout << 2 << " ta, jami " << 15 * 2 << "{{n}}";`,
            right: `hisob(20, 3);
hisob(15, 2);`,
          },
        ],
      },
      quiz: [
        {
          id: "7.1-q1",
          question: "`salom` tanasi bir marta yozilgan va `main` da ikki marta chaqirilgan. Konsolda `salom` necha marta chiqadi?",
          options: ["0, tana o'zi ishlaydi", "1", "2", "yig'ilmaydi, ikki chaqiruv taqiqlangan"],
          answer: 2,
          explanation:
            "Har bir chaqiruv tanani bir marta ishlatadi. Ikki chaqiruv ikki qator. Tana baribir bitta nusxa.",
        },
        {
          id: "7.1-q2",
          question: "`hisob(20, 3)` da 20 qaysi parametrga tushadi? Imzo `hisob(int narx, int dona)`.",
          options: ["dona", "narx", "ikkala parametrga ham", "main dagi global son"],
          answer: 1,
          explanation:
            "Argumentlar chapdan o'ngga parametrlarga yopishadi. 20 birinchi, demak narx. 3 ikkinchi, demak dona.",
        },
        {
          id: "7.1-q3",
          question: "`bir();` tugagach boshqaruv qayerga qaytadi?",
          options: [
            "Dastur yopiladi",
            "Chaqiruvdan keyingi qatorga",
            "Faylning birinchi qatoriga",
            "bir tanasining boshiga, abadiy",
          ],
          answer: 1,
          explanation:
            "Chaqiruv freymi yopiladi va qaytish manzili chaqiruvchining keyingi qatori. main davom etadi. Dasturni main ning o'zi tugatadi.",
        },
      ],
    },
    {
      id: "7.2",
      navTitle: "void va return",
      title: "void va qiymat qaytaruvchi funksiyalar",
      goal: [
        "Bu darsdan keyin siz `void` ni ish qilib, qiymat qoldirmaydigan funksiya deb, `return` li funksiyani esa natija qaytaradigan funksiya deb ajratasiz. `return` shu zahoti funksiyadan chiqishini, qiymat qaytaradigan yo'lda `return` tushib qolsa bu noma'lum ekanini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Ikki xizmat bor. Bittasi qo'ng'iroq qiladi: eshikni taqillatadi, xabar aytadi, qo'liga hech narsa tutqazmaydi. Bu `void`. Ikkinchisi do'konga kiradi va sizga quti qaytaradi. Qutining ichida son. Siz o'sha qutini o'z javoningizga qo'yasiz. Bu `return`.",
          "`return` eshikni hozir yopadi. «Agar manfiy bo'lsa, musbatini qaytar va chiq» degan qoida keyingi xatni o'qimaydi. Chiqish shu qatorda. Qolgan qatorlar bu safar ishlamaydi.",
          "Quti va'da qilingan bo'lsa, har bir eshikdan quti bilan chiqish kerak. Bir yo'l `return` siz tugasa, chaqiruvchi bo'sh qo'lni kutadi. C++ buni 0 deb to'ldirmaydi. Bu noma'lum. Har bir yo'l o'z `return` ini ko'rsin.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Turi nomdan oldin yoziladi. `void` qiymat yo'q degani. `int` butun natija degani. `double`, `bool`, `char` ham qaytishi mumkin. Chaqiruv ifoda bo'ladi, agar qiymat qaytsa. `void` chaqiruvni son o'rniga qo'yib bo'lmaydi.",
        ],
        items: [
          {
            title: "void ish qiladi",
            paragraphs: [
              "`void` funksiya ekranga yozishi, boshqa funksiyani chaqirishi mumkin. Uni `int s = yoz(3);` qilib bo'lmaydi. Qaytadigan son yo'q.",
              "`return;` qiymatsiz chiqish. `void` ichida joiz. Qiymat yozib bo'lmaydi: `return 1;` `void` da yig'ilmaydi.",
            ],
            code: `void yoz(int n) {
    std::cout << n << "{{n}}";
}

void tekshir(int n) {
    if (n == 0) {
        std::cout << "nol{{n}}";
        return;
    }
    std::cout << "nol emas{{n}}";
}`,
            codeLabel: "qiymat qaytmaydi",
          },
          {
            title: "return natijani beradi va chiqadi",
            paragraphs: [
              "`return ifoda;` ifodani hisoblaydi, shu qiymatni chaqiruvchiga beradi va funksiyani yopadi. `return` dan keyingi qatorlar shu chaqiruvda ishlamaydi.",
              "Natija turiga mos bo'lishi kerak. `int` funksiya `int` qaytaradi. `return 3.9;` `int` da 3 ga qirqiladi, kasr yo'qoladi. Kasr kerak bo'lsa, turi `double` bo'lsin.",
              "Qiymat qaytaradigan funksiyaning har bir yo'li `return` ko'rishi kerak. Oxirigacha yetib, `return` siz tushib ketish noma'lum xatti-harakat. Kompilyator ogohlantirishi mumkin, 0 qo'yib bermaydi.",
            ],
            code: `int kvadrat(int n) {
    return n * n;
}

int musbat(int n) {
    if (n < 0) {
        return -n;
    }
    return n;
}`,
            codeLabel: "har bir yo'l qiymat beradi",
          },
          {
            title: "Natijani ishlatish",
            paragraphs: [
              "Qaytgan sonni o'zgaruvchiga yozish, `cout` ga berish yoki boshqa hisobga qo'yish mumkin. `kvadrat(4)` ifoda, qiymati 16.",
              "Agar qaytgan sonni hech kim olmasa, u tashlanadi. Hisob bo'lgan bo'ladi, saqlanmaydi. Natija kerak bo'lsa, uni yozing.",
              "Ekranga yozish va qiymat qaytarish boshqa ish. Yozuvni faqat ko'z ko'radi. Qaytgan sonni keyingi hisob ishlatadi. Qayta ishlatiladigan natijani `return` qiling, `cout` ni chaqiruvchiga qoldiring.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "void yozadi, int kvadrat qaytaradi",
          intro: [
            "`yoz(3)` faqat ekran. `kvadrat(4)` 16 ni qaytaradi, `main` uni `s` ga qo'yib, keyin yozadi.",
          ],
          codeLabel: "void_return.cpp",
          code: `#include <iostream>

void yoz(int n) {
    std::cout << n << "{{n}}";
}

int kvadrat(int n) {
    return n * n;
}

int main() {
    yoz(3);
    int s = kvadrat(4);
    std::cout << s << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `3
16`,
          analysis: [
            {
              lines: "12",
              text: "`yoz(3)` chaqiriladi. Parametr 3. 4-qator 3 ni yozadi. Qiymat qaytmaydi. `main` keyingi qatorga o'tadi.",
            },
            {
              lines: "13",
              text: "`kvadrat(4)`. Ichida `return 4 * 4`, ya'ni 16. Funksiya shu zahoti yopiladi. 16 `s` qutisiga yoziladi. `kvadrat` ning o'z parametr qutisi yo'qoladi.",
            },
            {
              lines: "14",
              text: "`s` 16. Ekranga 16. Bu yozuv `kvadrat` ichida emas, `main` da. Funksiya natijani berdi, chaqiruvchi uni ishlatdi.",
            },
            {
              lines: "8",
              text: "`return` dan keyin shu funksiyada qator yo'q. Bo'lsa ham ishlamasdi. Chiqish `return` ning o'zida.",
            },
          ],
        },
        {
          title: "Manfiy bo'lsa erta qaytish",
          intro: [
            "`musbat(-5)` birinchi `return` da chiqadi. `musbat(3)` ikkinchisiga yetadi. Ikki yo'l ham qiymat beradi.",
          ],
          codeLabel: "musbat.cpp",
          code: `#include <iostream>

int musbat(int n) {
    if (n < 0) {
        return -n;
    }
    return n;
}

int main() {
    std::cout << musbat(-5) << "{{n}}";
    std::cout << musbat(3) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `5
3`,
          analysis: [
            {
              lines: "11",
              text: "`n` −5. `−5 < 0` rost. `return -n` bu `return 5`. 7-qator bu chaqiruvda ishlamaydi. Konsolga 5 yoziladi.",
            },
            {
              lines: "12",
              text: "Yangi chaqiruv, `n` 3. `3 < 0` yolg'on. Birinchi `return` tashlanadi. 7-qator `return 3`. Ekranga 3.",
            },
            {
              lines: "4-7",
              text: "Ikki `return` ikki eshik. Qaysi biri ishlasa, funksiya shu yerda tugaydi. Chaqiruvchi bittasini oladi, ikkalasini emas.",
            },
          ],
        },
        {
          title: "void ichida return qolgan yozuvni tashlaydi",
          intro: [
            "0 bo'lsa `nol` deyiladi va chiqiladi. `nol emas` shu chaqiruvda yozilmaydi. 4 da ikkinchi yozuv ishlaydi.",
          ],
          codeLabel: "tekshir.cpp",
          code: `#include <iostream>

void tekshir(int n) {
    if (n == 0) {
        std::cout << "nol{{n}}";
        return;
    }
    std::cout << "nol emas{{n}}";
}

int main() {
    tekshir(0);
    tekshir(4);
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `nol
nol emas`,
          analysis: [
            {
              lines: "12",
              text: "`n` 0. Shart rost. `nol` yoziladi. 6-qatordagi `return` funksiyani yopadi. 8-qatorga yetilmaydi.",
            },
            {
              lines: "13",
              text: "`n` 4. `4 == 0` yolg'on. `return` ishlamaydi. 8-qator `nol emas` ni yozadi. Tana oxiri `void` funksiyani qaytaradi.",
            },
            {
              lines: "6",
              text: "Bu `return` qiymatsiz, chunki turi `void`. `return 0;` shu yerda yig'ilmaydi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`yoz` freymi parametrni oladi, `cout` buferga yozadi, freym yopiladi. Chaqiruvchiga son uzatilmaydi. `int s = yoz(3)` ni kompilyator yig'ishda rad etadi, ishga tushganda emas.",
          "`kvadrat` freymida `n` 4. Ko'paytirish 16 ni beradi. `return` shu 16 ni chaqiruvchining `s` qutisiga qo'yishni aytadi, keyin freymni bo'shatadi. 16 parametr qutisida qolmaydi, parametr yo'qoladi. Saqlangan joy `s`.",
          "`musbat(-5)` da birinchi `return` sakrash. 7-qatorning buyrug'i bu chaqiruvda ochilmaydi. Freym baribir yopiladi, qo'lda 5 bor. Ikkinchi chaqiruv yangi freym, `n` 3, pastki `return` ishlaydi.",
          "Agar `int` funksiya `return` siz tugasa, chaqiruvchi registrda qandaydir qoldiqni o'qishi mumkin. Standart buni noma'lum deydi. Kompilyator «qaytish yo'q» desa, o'sha yo'lga `return` qo'ying. Kutib, 0 chiqadi deb ishlatmang.",
        ],
        diagram: `yoz(3)
  freym: n [3]
  buferga "3"
  freym yopiladi, qaytgan son yo'q

kvadrat(4)
  freym: n [4]
  16 hisoblanadi
  s [16]
  freym yopiladi

musbat(-5)
  n [-5]
  return 5
  pastki return ishlamaydi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "`return` xatosi yo yig'ilmaydi, yo natija tashlanadi, yo bir yo'l qiymatsiz qoladi.",
        ],
        items: [
          {
            title: "void natijasini songa yozish",
            why: [
              "`yoz` son qaytarmaydi. `int s = yoz(3)` yig'ilmaydi. Yozuv kerak bo'lsa, chaqiring. Son kerak bo'lsa, `int` funksiya yozing.",
            ],
            wrong: `int s = yoz(3);`,
            right: `yoz(3);
int s = kvadrat(4);`,
          },
          {
            title: "return dan keyin ish kutish",
            why: [
              "`return -n` funksiyani yopadi. Uning tagidagi `cout` shu chaqiruvda ishlamaydi. Avval yozmoqchi bo'lsangiz, `cout` ni `return` dan oldin qo'ying.",
            ],
            wrong: `if (n < 0) {
    return -n;
    std::cout << "manfiy edi{{n}}";
}`,
            right: `if (n < 0) {
    std::cout << "manfiy edi{{n}}";
    return -n;
}`,
          },
          {
            title: "int yo'lni return siz tugatish",
            why: [
              "Musbat sonlar `return` ko'radi, manfiy yo'l ko'rmaydi. Manfiy chaqiruv noma'lum. Har bir tarmoq qiymat qaytarsin. `void` da bu shart yo'q.",
            ],
            wrong: `int musbat(int n) {
    if (n >= 0) {
        return n;
    }
}`,
            right: `int musbat(int n) {
    if (n < 0) {
        return -n;
    }
    return n;
}`,
          },
        ],
      },
      quiz: [
        {
          id: "7.2-q1",
          question: "`int kvadrat(int n) { return n * n; }` va `main` da `kvadrat(4)`. Natija necha?",
          options: ["4", "8", "16", "void, son yo'q"],
          answer: 2,
          explanation:
            "4 * 4 = 16. return shu 16 ni chaqiruvchiga beradi va funksiyani yopadi.",
        },
        {
          id: "7.2-q2",
          question: "`void yoz(int n)` ni `int s = yoz(3);` qilib bo'ladimi?",
          options: [
            "Ha, s 3 bo'ladi",
            "Ha, s 0 bo'ladi",
            "Yo'q, void son qaytarmaydi, yig'ilmaydi",
            "Ha, lekin faqat bir marta",
          ],
          answer: 2,
          explanation:
            "void chaqiruv qiymat bermaydi. Uni int ga yozib bo'lmaydi. Kompilyator rad etadi.",
        },
        {
          id: "7.2-q3",
          question: "`musbat` da `n < 0` bo'lsa `return -n` turibdi, tagida yana `return n` bor. `musbat(-5)` qaysi return ni oladi?",
          options: [
            "Ikkalasini, avval 5, keyin -5",
            "Faqat return -n, natija 5",
            "Faqat pastki return n, natija -5",
            "Hech biri, void bo'lib qoladi",
          ],
          answer: 1,
          explanation:
            "Birinchi rost shart return -n ni ishlatadi. -5 ning teskarisi 5. Funksiya shu yerda yopiladi, pastki return ishlamaydi.",
        },
      ],
    },
    {
      id: "7.3",
      navTitle: "Prototip va tana",
      title: "Funksiya prototipi va tanasi",
      goal: [
        "Bu darsdan keyin siz prototipni «nom va imzo, nuqta-vergul, tana yo'q» deb, ta'rifni esa tana bilan yozilgan funksiya deb ajratasiz. Chaqiruvdan oldin kompilyator imzoni ko'rgan bo'lishi kerakligini, tana bitta bo'lishini va parametr nomlari emas, turlari mos kelishini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Restoran menyusi va oshxona. Menyu: «sho'rva, ikki kaosa». Taomning o'zi oshxonada. Ofitsiant menyuni o'qib buyurtma oladi, qozonni ko'rmasdan. Prototip menyu. Ta'rif oshxona. Chaqiruv buyurtma.",
          "Menyu bo'lmasa, ofitsiant «bunday taom yo'q» deydi. Kompilyator ham chaqiruvni ko'rganda imzoni hali ko'rmagan bo'lsa, to'xtaydi. Menyu bor, oshxona esa bu taomni hech qachon pishirmasa, buyurtma qabul qilinadi, lekin taom kelmaydi. Bu linker ning «tana topilmadi» degani.",
          "Menyuda «ikki kaosa» deyilgan bo'lsa, oshxona ham ikki kaosa pishirishi kerak. Bittasini katta qoshiq qilib yuborsangiz, bu boshqa taom. Imzodagi turlar mos kelmasa, chaqiruv boshqa funksiyani qidiradi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Prototip, e'lon: turi, nomi, parametr turlari, nuqta-vergul. Tana yo'q. Ta'rif: o'sha imzo va `{}` tana. Ta'rif ham e'lon hisoblanadi. Tana `main` dan oldin turgan bo'lsa, alohida prototip shart emas.",
        ],
        items: [
          {
            title: "Chaqiruvdan oldin imzo ko'rinsin",
            paragraphs: [
              "Kompilyator faylni yuqoridan pastga o'qiydi. `qosh(2, 5)` qatoriga yetganda `qosh` ning imzosi yuqorida bo'lishi kerak. Prototip shuni beradi. Tana pastda turishi mumkin.",
              "Tana `main` dan oldin yozilsa, o'sha tana e'lon. Yana prototip yozish shart emas.",
            ],
            code: `int qosh(int a, int b);

int main() {
    return qosh(2, 5);
}

int qosh(int a, int b) {
    return a + b;
}`,
            codeLabel: "avval menyu, keyin oshxona",
          },
          {
            title: "Nom emas, tur mos keladi",
            paragraphs: [
              "Prototipda parametr nomi ixtiyoriy. `int kopaytir(int, int);` yetarli. Ta'rifda nom kerak, chunki tana shu nomni ishlatadi. `int x` va `int y` bo'lishi mumkin. Turlar va tartib prototip bilan bir xil bo'lsin.",
              "Tur boshqacha bo'lsa, bu o'sha funksiyaning tanasi emas. `int qosh(int, int)` e'lon qilinib, tana `int qosh(double, double)` bo'lsa, butun chaqiruvning tanasi yo'q. Linker topa olmaydi. `double` tana boshqa imzo.",
              "Qaytish turi ham imzoning qismi. E'lon `int`, tana `double` bo'lsa, bu ziddiyat. Yig'ilmaydi. Qaytish turini almashtirib, qayta yuklash ham bo'lmaydi. Bu 7.8-darsda.",
            ],
            code: `int kopaytir(int, int);

int kopaytir(int x, int y) {
    return x * y;
}`,
            codeLabel: "nomlar farq qilishi mumkin",
          },
          {
            title: "Tana bitta",
            paragraphs: [
              "Bir imzoning tanasi dasturda bir marta bo'ladi. Ikki marta `int qosh(int, int)` ta'rifi yig'ilmaydi yoki linker urishadi. Prototipni esa ko'rish joylarida qaytarish mumkin, odatda bitta bosh faylda.",
              "Hozirgi misollar bitta `.cpp`. Katta loyihada prototip `.h` da, tana bitta `.cpp` da turadi. Chaqiruvchi `.h` ni ko'radi, linker tana faylini ulaydi. 1.2-darsdagi linker shu yerda ishga tushadi.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Prototip main dan oldin, tana keyin",
          intro: [
            "`main` `qosh` ni chaqiradi. Tana hali pastda. Yuqoridagi e'lon kompilyatorga imzoni aytadi. Natija 7.",
          ],
          codeLabel: "prototip.cpp",
          code: `#include <iostream>

int qosh(int a, int b);

int main() {
    std::cout << qosh(2, 5) << "{{n}}";
    return 0;
}

int qosh(int a, int b) {
    return a + b;
}`,
          consoleTitle: "Konsol",
          console: `7`,
          analysis: [
            {
              lines: "3",
              text: "Prototip. Tana yo'q, nuqta-vergul bor. Kompilyator endi `qosh` ikkita `int` olishini va `int` qaytarishini biladi.",
            },
            {
              lines: "6",
              text: "Chaqiruv shu bilim bilan yig'iladi. 2 va 5 argument. Tana qayerda ekani bu qatorda ochilmaydi. Linker keyin 10-qatorni shu chaqiruvga ulaydi.",
            },
            {
              lines: "10-11",
              text: "Ta'rif. Imzo 3-qator bilan bir xil. `return 2 + 5` emas, parametrlar `a` 2, `b` 5, `return a + b` bu 7.",
            },
            {
              lines: "6, natija",
              text: "7 `cout` ga tushadi. Agar 3-qator bo'lmasa va tana `main` dan keyin qolsa, 6-qator yig'ilmaydi. Kompilyator `qosh` ni hali ko'rmagan bo'ladi.",
            },
          ],
        },
        {
          title: "Tana oldinda tursa, alohida prototip shart emas",
          intro: [
            "`ayir` ning to'liq ta'rifi `main` dan oldin. U ham e'lon. 9 − 4 = 5.",
          ],
          codeLabel: "tana_oldin.cpp",
          code: `#include <iostream>

int ayir(int a, int b) {
    return a - b;
}

int main() {
    std::cout << ayir(9, 4) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `5`,
          analysis: [
            {
              lines: "3-5",
              text: "Ta'rif faylning yuqorisida. Kompilyator `main` ga yetganda `ayir` ning imzosini va tanasini ko'rgan bo'ladi. Alohida `int ayir(int, int);` shart emas.",
            },
            {
              lines: "8",
              text: "`a` 9, `b` 4. `return 9 - 4`, ya'ni 5. Ekranga 5.",
            },
            {
              lines: "farq",
              text: "Kichik misolda tana oldinda qulay. Ko'p funksiya bir-birini chaqirsa, hammasini chaqiruvdan oldin yozish qiyin. Shunda prototip menyusi kerak bo'ladi.",
            },
          ],
        },
        {
          title: "Prototipda nom yo'q, tanada bor",
          intro: [
            "E'lon faqat turlarni aytadi. Ta'rif `x` va `y` ni tanlaydi. 3 marta 4 bu 12. Nomlar mos kelishi shart emas.",
          ],
          codeLabel: "nomsiz.cpp",
          code: `#include <iostream>

int kopaytir(int, int);

int main() {
    std::cout << kopaytir(3, 4) << "{{n}}";
    return 0;
}

int kopaytir(int x, int y) {
    return x * y;
}`,
          consoleTitle: "Konsol",
          console: `12`,
          analysis: [
            {
              lines: "3",
              text: "`int, int` va qaytish `int`. Parametr nomlari yozilmagan. Chaqiruv uchun shu yetadi.",
            },
            {
              lines: "6",
              text: "`kopaytir(3, 4)`. Kompilyator turlarga qaraydi. 3 birinchi `int`, 4 ikkinchi `int`.",
            },
            {
              lines: "10-11",
              text: "Ta'rifda nomlar `x` va `y`. Prototipda nom yo'qligi ziddiyat emas. `x` 3, `y` 4, natija 12. Agar ta'rif `double, double` bo'lsa, bu boshqa funksiya bo'lib, `int, int` tanasi topilmasdi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Prototip buyruq joylamaydi. U kompilyatorning jadvaliga imzo yozadi: nom, parametr turlari, qaytish turi. Chaqiruv shu jadvaldan «qanday chaqirish» ni oladi. Protsessor prototip qatorida to'xtamaydi, u yerda bajariladigan tana yo'q.",
          "Tana buyruqlar. Linker chaqiruvdagi nomni shu buyruqlarning manziliga ulaydi. `qosh(2, 5)` ishga tushganda freym ochiladi, 2 va 5 yoziladi, `return` 7 ni beradi. Prototip bu freymda yo'q.",
          "Imzo mos kelmasa, chaqiruv boshqa jadval qatoriga qaraydi. `int, int` chaqiruvi `double, double` tanasiga o'zi o'tmaydi. Manzil bo'sh qolsa, linker dasturni yig'ib bermaydi. Ishga tushgan jarayon bu xatoga yetmaydi.",
          "Ta'rif `main` dan oldin turgan bo'lsa, jadval va buyruqlar bir joyda. Alohida menyu shart emas. Ishlash vaqti o'zgarmaydi. Farq yig'ish tartibida.",
        ],
        diagram: `prototip: jadvalga imzo
  qosh(int, int) -> int
  buyruq yo'q

main:
  chaqiruv qosh(2, 5)
  linker tana manzilini qo'yadi

tana:
  a [2] b [5]
  return 7

tana oldinda:
  ta'rifning o'zi jadvalga ham yoziladi
  alohida prototip shart emas`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Prototip xatosi yig'ishda chiqadi. Chaqiruv erta yozilsa kompilyator, tana imzosi boshqa bo'lsa linker to'xtatadi.",
        ],
        items: [
          {
            title: "E'lonsiz, tanadan oldin chaqirish",
            why: [
              "`qosh` hali e'lon qilinmagan. Kompilyator `main` ni o'qiyotganda bu nomni bilmaydi. Prototipni chaqiruvdan oldin qo'ying yoki tanani `main` dan oldinga chiqaring.",
            ],
            wrong: `int main() {
    std::cout << qosh(2, 5) << "{{n}}";
    return 0;
}

int qosh(int a, int b) {
    return a + b;
}`,
            right: `int qosh(int a, int b);

int main() {
    std::cout << qosh(2, 5) << "{{n}}";
    return 0;
}

int qosh(int a, int b) {
    return a + b;
}`,
          },
          {
            title: "Tana turlarini prototipdan boshqacha yozish",
            why: [
              "E'lon `int, int`. Tana `double, double`. Bu `int` chaqiruvning tanasi emas. `qosh(2, 5)` uchun linker tana topa olmaydi. `double` tana boshqa imzo bo'lib yotadi.",
            ],
            wrong: `int qosh(int, int);

int qosh(double a, double b) {
    return a + b;
}`,
            right: `int qosh(int, int);

int qosh(int a, int b) {
    return a + b;
}`,
          },
          {
            title: "Prototip oxiridagi nuqta-vergulni tashlash",
            why: [
              "Nuqta-vergulsiz qator e'lon emas, yarim ta'rif. Kompilyator tana kutadi va keyingi `int main` ni tana deb o'qiy olmaydi. E'lon nuqta-vergul bilan yopiladi.",
            ],
            wrong: `int qosh(int a, int b)

int main() {
    return qosh(2, 5);
}`,
            right: `int qosh(int a, int b);

int main() {
    return qosh(2, 5);
}`,
          },
        ],
      },
      quiz: [
        {
          id: "7.3-q1",
          question: "Prototip qanday yoziladi?",
          options: [
            "Tana `{}` bilan, nuqta-vergul shart emas",
            "Imzo va nuqta-vergul, tana yo'q",
            "Faqat nom, turlar yozilmaydi",
            "main ichida, return bilan",
          ],
          answer: 1,
          explanation:
            "Prototip menyu: qaytish turi, nom, parametr turlari, nuqta-vergul. Figurali qavs tananing o'zi.",
        },
        {
          id: "7.3-q2",
          question: "`qosh` ning tanasi `main` dan keyin. `main` ichida chaqirish uchun nima kerak?",
          options: [
            "Hech narsa, linker o'zi topadi",
            "Chaqiruvdan oldin prototip yoki tana",
            "Parametr nomlari bir xil bo'lishi shart, prototip kerak emas",
            "return turi void bo'lishi shart",
          ],
          answer: 1,
          explanation:
            "Kompilyator yuqoridan pastga o'qiydi. Chaqiruvga yetganda imzo ko'ringan bo'lishi kerak. Prototip shuni qiladi. Tana oldinda tursa, u ham yetarli.",
        },
        {
          id: "7.3-q3",
          question: "Prototip `int kopaytir(int, int);`, tana `int kopaytir(int x, int y)`. Bu mosmi?",
          options: [
            "Yo'q, nomlar x va y prototipda yo'q",
            "Ha, turlar va tartib bir xil, nomlar ixtiyoriy",
            "Yo'q, tana main dan oldin turishi shart",
            "Ha, faqat qaytish turi e'tiborsiz",
          ],
          answer: 1,
          explanation:
            "Imzo turlarda. Prototipda nom yozmaslik mumkin. Ta'rifdagi x va y shu turlarga nom beradi. Qaytish turi ham int, ziddiyat yo'q.",
        },
      ],
    },
    {
      id: "7.4",
      navTitle: "Qiymat bo'yicha",
      title: "Qiymat bo'yicha uzatish",
      goal: [
        "Bu darsdan keyin siz qiymat bo'yicha uzatishni nusxa deb o'qiysiz. Funksiya ichida parametr o'zgarsa, chaqiruvchining qutisi o'zgarmaydi. Asl qiymatni yangilamoqchi bo'lsangiz, yangi sonni `return` qilib, chaqiruvchi o'zi yozishini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Do'stingizga fotosurat berasiz, albomning o'zini emas. U fotosuratga belgi qo'yishi mumkin. Albomdagi asl rasm o'sha belgiga ega bo'lmaydi. Qiymat bo'yicha uzatish shu fotosurat. Parametr nusxa. Asl quti chaqiruvchida qoladi.",
          "Ikki qog'ozni almashtirmoqchi bo'lib, nusxalarini almashtirsangiz, stol ustidagi asl qog'ozlar joyida turadi. `almashtir(a, b)` qiymat bo'yicha shunday. Ichkarida `x` va `y` almashadi, `a` va `b` sezmaydi.",
          "Asl albomni yangilashning bir yo'li: do'st yangi rasmini qaytaradi, siz albomga o'zingiz yopishtirasiz. `a = oshgan(a)`. Funksiya nusxadan yangi son yasaydi, chaqiruvchi o'sha sonni asl qutiga yozadi. Qutining o'ziga tegish 7.5-dagi havola.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Oddiy parametr, `&` siz, qiymat bo'yicha. Chaqiruvda argument hisoblanadi va natijaning nusxasi parametr qutisiga yoziladi. Bu quti funksiyaning lokal o'zgaruvchisi. Tana tugagach yo'qoladi.",
        ],
        items: [
          {
            title: "Nusxa alohida quti",
            paragraphs: [
              "`void oshir(int n)` va chaqiruv `oshir(a)`. `a` 5 bo'lsa, `n` ham 5 dan boshlanadi. `n++` faqat `n` ni 6 qiladi. `a` 5 bo'lib qoladi.",
              "Argument ifoda ham bo'lishi mumkin. `oshir(a + 1)` avval `a + 1` ni hisoblaydi, nusxani beradi. `a` ning o'zi baribir tegilmaydi.",
            ],
            code: `void oshir(int n) {
    n++;
}

int a = 5;
oshir(a);
// a hali 5`,
            codeLabel: "nusxa o'sadi, asl quti yo'q",
          },
          {
            title: "Almashtirish nusxada qoladi",
            paragraphs: [
              "`void almashtir(int x, int y)` ichida `x` va `y` joy almashsa, bu freymdagi ikki nusxa. Chaqiruvchining `a` va `b` si boshqa uyada.",
              "Shuning uchun qiymat bo'yicha almashtirish chaqiruvchida ko'rinmaydi. Ko'rinishi kerak bo'lsa, havola, keyingi dars. Yoki yangi juftlikni qaytarish, hozircha bitta `return` yetadi.",
            ],
          },
          {
            title: "Yangi qiymatni return qiling",
            paragraphs: [
              "Funksiya nusxani o'zgartirib, yangi sonni `return` qilsa, chaqiruvchi `a = oshgan(a)` deb asl qutini o'zi yangilaydi. Yozish chaqiruvchida.",
              "Nusxa arzon, toki `int` kabi kichik tur. Katta obyektni har chaqiruvda to'liq ko'chirish qimmat. O'sha paytda havola yoki `const` havola o'qiladi. Hozir `int` da nusxa aniq va xavfsiz.",
            ],
            code: `int oshgan(int n) {
    return n + 1;
}

a = oshgan(a);`,
            codeLabel: "qaytgan sonni chaqiruvchi yozadi",
          },
        ],
      },
      examples: [
        {
          title: "Ichkarida 6, tashqarida 5",
          intro: [
            "`a` 5. `oshir` nusxani bittaga oshirib, ichkaridagi sonni yozadi. `main` keyin asl `a` ni yozadi. Ular teng emas.",
          ],
          codeLabel: "nusxa.cpp",
          code: `#include <iostream>

void oshir(int n) {
    n++;
    std::cout << "ichida " << n << "{{n}}";
}

int main() {
    int a = 5;
    oshir(a);
    std::cout << "tashqarida " << a << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `ichida 6
tashqarida 5`,
          analysis: [
            {
              lines: "9-10",
              text: "`a` qutisida 5. `oshir(a)` shu 5 ning nusxasini parametrga beradi. `a` ning manzili funksiyaga ketmaydi.",
            },
            {
              lines: "4-5",
              text: "`n` 5 dan 6 ga o'sadi. Ekranga `ichida 6`. Bu `n`. Tana tugaydi, `n` yo'qoladi.",
            },
            {
              lines: "11",
              text: "`a` hali 5. `tashqarida 5`. Ichkaridagi `n++` bu qutiga yozmagan.",
            },
          ],
        },
        {
          title: "Almashtirish nusxada qoladi",
          intro: [
            "`a` 1, `b` 2. Funksiya `x` va `y` ni almashtiradi. Chaqiruvchi 1 va 2 ni yana ko'radi.",
          ],
          codeLabel: "nusxa_almashtir.cpp",
          code: `#include <iostream>

void almashtir(int x, int y) {
    int vaqt = x;
    x = y;
    y = vaqt;
}

int main() {
    int a = 1;
    int b = 2;
    almashtir(a, b);
    std::cout << a << " " << b << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1 2`,
          analysis: [
            {
              lines: "10-12",
              text: "`a` 1, `b` 2. Chaqiruv `x` ga 1, `y` ga 2 nusxa qo'yadi. `a` va `b` freymda qoladi.",
            },
            {
              lines: "4-6",
              text: "`vaqt` 1. `x` 2 bo'ladi, `y` 1 bo'ladi. Nusxalar almashdi. `a` va `b` ga yozuv yo'q.",
            },
            {
              lines: "13",
              text: "Freym yopilgach `x`, `y`, `vaqt` yo'q. `a` 1, `b` 2. Konsol `1 2`. Aslini almashtirish uchun 7.5-dagi havola kerak.",
            },
          ],
        },
        {
          title: "Qaytgan sonni asl qutiga yozish",
          intro: [
            "Funksiya yana nusxa oladi, lekin 6 ni qaytaradi. `main` shu 6 ni `a` ga o'zi yozadi. Endi `a` o'zgaradi, chunki yozuv chaqiruvchida.",
          ],
          codeLabel: "qaytarib_yozish.cpp",
          code: `#include <iostream>

int oshgan(int n) {
    return n + 1;
}

int main() {
    int a = 5;
    a = oshgan(a);
    std::cout << a << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `6`,
          analysis: [
            {
              lines: "8-9",
              text: "`a` 5. `oshgan(a)` nusxa 5 ni oladi, `return 6`. Bu 6 hali `a` emas. Tenglik chap tomoni `a = 6` ni bajaradi.",
            },
            {
              lines: "4",
              text: "`n + 1` parametr ustida. `n` 6 bo'lib qaytadi va yo'qoladi. Asl qutiga teggan narsa `return` emas, `main` dagi `=`.",
            },
            {
              lines: "10",
              text: "`a` endi 6. Konsol 6. Agar `a =` tashlab, faqat `oshgan(a);` yozilsa, 6 hisoblanib tashlanardi, `a` 5 qolardi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Chaqiruv freymi ochiladi va argumentning qiymati parametr uyasiga ko'chiriladi. `a` ning uyasi `main` freymida. `n` ning uyasi `oshir` freymida. Ikki manzil. `n++` ikkinchi manzilga yozadi. Birinchisi 5 bo'lib turadi.",
          "Freym yopilganda `n` ning joyi bo'shaydi. 6 saqlanmaydi, chunki uni hech kim tashqaridagi qutiga ko'chirmagan. `cout` faqat 6 ni buferga ulgurgan.",
          "`almashtir` freymida uchta quti: `x`, `y`, `vaqt`. Almashuv shu uchlik ichida. `main` dagi `a` va `b` manzillariga yozuv buyrug'i yo'q. Freym yo'qolgach almashuv ham yo'qoladi.",
          "`oshgan` 6 ni qaytaradi. Bu son registr orqali yoki chaqiruvchining vaqtinchalik joyiga beriladi, keyin `a =` uni `a` manziliga yozadi. Yozuv chaqiruvchining buyrug'i. Nusxa mexanizmi o'zi asl manzilni ochmaydi.",
        ],
        diagram: `main: a [5]
oshir freymi: n [5]
n++ -> n [6]
bufer: ichida 6
freym yopiladi
a hali [5]
bufer: tashqarida 5

almashtir:
x [1] y [2] -> x [2] y [1]
a [1] b [2] tegilmagan

a = oshgan(a)
nusxa 5, return 6
a [6]`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Qiymat bo'yicha xato «funksiya o'zgartirdi» deb o'ylash. Konsol ichkarida yangi, tashqarida esa eski sonni ko'rsatadi.",
        ],
        items: [
          {
            title: "Nusxa orqali aslni o'zgartiraman deb yozish",
            why: [
              "`n++` faqat parametrni o'stiradi. `a` 5 qoladi. Aslini o'zgartirish kerak bo'lsa, natijani qaytaring yoki 7.5-dagi `int&` ishlating.",
            ],
            wrong: `void oshir(int n) {
    n++;
}
int a = 5;
oshir(a);`,
            right: `int oshgan(int n) {
    return n + 1;
}
int a = 5;
a = oshgan(a);`,
          },
          {
            title: "Qaytgan sonni tashlab yuborish",
            why: [
              "`oshgan(a)` 6 ni hisoblaydi va hech kim olmaysa, tashlanadi. `a` o'zgarmaydi. Natijani qutiga yozing.",
            ],
            wrong: `oshgan(a);
std::cout << a << "{{n}}";`,
            right: `a = oshgan(a);
std::cout << a << "{{n}}";`,
          },
          {
            title: "Almashuvni qiymat bilan ko'raman deb kutish",
            why: [
              "Ichki `x` va `y` almashadi, `a` va `b` yo'q. Konsol `1 2`. Havolasiz bu funksiya chaqiruvchida hech narsa qilmaydi.",
            ],
            wrong: `void almashtir(int x, int y) {
    int vaqt = x;
    x = y;
    y = vaqt;
}`,
            right: `void almashtir(int& x, int& y) {
    int vaqt = x;
    x = y;
    y = vaqt;
}`,
          },
        ],
      },
      quiz: [
        {
          id: "7.4-q1",
          question: "`a` 5. `void oshir(int n) { n++; }` va `oshir(a)`. Keyin `a` necha?",
          options: ["6", "5", "0", "noma'lum, nusxa aslni buzadi"],
          answer: 1,
          explanation:
            "n bu a ning nusxasi. n++ nusxani 6 qiladi. a ning qutisi 5 bo'lib qoladi.",
        },
        {
          id: "7.4-q2",
          question: "`a` 1, `b` 2. `almashtir(int x, int y)` ichida x va y almashadi. `main` nima yozadi?",
          options: ["2 1", "1 2", "1 1", "yig'ilmaydi"],
          answer: 1,
          explanation:
            "Almashuv nusxalarda. a va b o'z manzilida. Konsol 1 2. Asl almashuv uchun havola kerak.",
        },
        {
          id: "7.4-q3",
          question: "`int oshgan(int n) { return n + 1; }`, `a` 5. `a = oshgan(a)` dan keyin `a` necha?",
          options: ["5", "6", "1", "oshgan void bo'lgani uchun yig'ilmaydi"],
          answer: 1,
          explanation:
            "Funksiya 6 ni qaytaradi. main shu 6 ni a ga yozadi. Yozish chaqiruvchida, shuning uchun a 6 bo'ladi.",
        },
      ],
    },
    {
      id: "7.5",
      navTitle: "Havola bo'yicha",
      title: "Havola bo'yicha uzatish",
      goal: [
        "Bu darsdan keyin siz `int&` ni asl qutining ikkinchi nomi deb o'qiysiz. Parametrga yozish chaqiruvchining o'zgaruvchisiga yozadi. Oddiy havolaga son literalini bera olmasligingizni, `const int&` esa o'qish uchun literalni ham qabul qilishini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Fotosurat emas, albomning o'zi stolga qo'yiladi. Ikkinchi odam o'sha albomga belgi qo'yadi. Belgini keyin siz ham ko'rasiz, chunki albom bitta. `int&` shu. Yangi quti yo'q, mavjud qutining yana bir nomi bor.",
          "Almashuv endi nusxa qog'ozda emas. Stol ustidagi ikki qog'ozning o'rnini almashtirasiz. Chaqiruvchi keyin qarasa, 1 va 2 joy almashgan. Havola shuni qiladi.",
          "Bo'sh qo'lga albom berib bo'lmaydi. `oshir(5)` da 5 ning uyasi yo'q, u vaqtinchalik son. Oddiy `int&` uyasi bor narsani kutadi. Faqat o'qimoqchi bo'lsangiz, `const` havola vaqtinchalik sonni ham ushlaydi va unga yozishni man qiladi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Parametr turidan keyin `&`. `void oshir(int& n)`. Chaqiruvda argument o'zgaruvchi bo'lishi kerak, oddiy havola uchun. Havola e'lon paytida biror qutiga bog'lanadi va boshqa qutiga o'tmaydi.",
        ],
        items: [
          {
            title: "Yozuv asl qutiga boradi",
            paragraphs: [
              "`n++` parametr orqali `a` ni o'stiradi, agar chaqiruv `oshir(a)` bo'lsa. Funksiya tugagach ham `a` yangi qiymatda turadi. Nusxa yo'qoladigan joy yo'q, chunki yozuv chaqiruvchining uyasiga tushgan.",
              "`return` shart emas, o'zgarish parametr orqali chiqadi. Bir nechta qutini bir chaqiruvda yangilash shu bilan qulay. Almashuv ikkita `int&` oladi.",
            ],
            code: `void oshir(int& n) {
    n++;
}

int a = 5;
oshir(a);
// a endi 6`,
            codeLabel: "ikkinchi nom",
          },
          {
            title: "Literal oddiy havolaga yopishmaydi",
            paragraphs: [
              "`oshir(5)` yig'ilmaydi. 5 vaqtinchalik. `int&` o'zgaruvchi qutini kutadi. Aks holda funksiya yo'qoladigan songa yozgan bo'lardi.",
              "`const int&` o'qish uchun. Unga o'zgaruvchini ham, 5 ni ham berish mumkin. Ichkarida `n = 1` yig'ilmaydi. `const` shartnoma: bu havola orqali yozilmaydi.",
              "Havola ko'rsatkich emas. Bu darslarda manzilni qo'lda ochmaymiz. Havola boshqa qutiga qayta bog'lanmaydi va bo'sh turmaydi.",
            ],
            code: `void yoz(const int& n) {
    std::cout << n << "{{n}}";
}

yoz(a);
yoz(8);`,
            codeLabel: "const havola o'qiydi",
          },
          {
            title: "Qachon nusxa, qachon havola",
            paragraphs: [
              "Funksiya argumentni o'zgartirmasligi kerak bo'lsa va tur kichik bo'lsa, qiymat yetarli. `int` nusxasi arzon va chaqiruvchi xavfsiz.",
              "Funksiya chaqiruvchining qutisini o'zgartirishi kerak bo'lsa, oddiy havola. Faqat o'qish, lekin nusxa qimmat bo'lsa, `const` havola. Hozirgi `int` misollarida `const int&` imkoniyatni ko'rsatadi, tezlik uchun shart emas.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Havola a ni 6 qiladi",
          intro: [
            "Imzoda `int&`. `n++` chaqiruvchining `a` siga yozadi. Funksiya son qaytarmaydi, `a` baribir o'zgaradi.",
          ],
          codeLabel: "havola.cpp",
          code: `#include <iostream>

void oshir(int& n) {
    n++;
}

int main() {
    int a = 5;
    oshir(a);
    std::cout << a << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `6`,
          analysis: [
            {
              lines: "3",
              text: "`int& n` yangi `int` emas. Chaqiruvdagi qutining nomi. Bu yerda u `a` ga bog'lanadi.",
            },
            {
              lines: "8-9",
              text: "`a` 5. `oshir(a)` havolani `a` ga ulaydi. 5 ning nusxasi ochilmaydi.",
            },
            {
              lines: "4",
              text: "`n++` o'sha uyani 6 qiladi. `a` ham 6, chunki uy bitta. Tana tugaydi, havola nomi yo'qoladi, quti `main` da qoladi.",
            },
            {
              lines: "10",
              text: "Ekranga 6. 7.4-dagi qiymat versiyasida shu joyda 5 chiqardi. Farq `&` da.",
            },
          ],
        },
        {
          title: "Ikki havola stol ustidagi sonlarni almashtiradi",
          intro: [
            "`a` 1, `b` 2. Ikkalasi ham havola. Ichki almashuv shu ikki qutining o'zida. Konsol `2 1`.",
          ],
          codeLabel: "havola_almashtir.cpp",
          code: `#include <iostream>

void almashtir(int& x, int& y) {
    int vaqt = x;
    x = y;
    y = vaqt;
}

int main() {
    int a = 1;
    int b = 2;
    almashtir(a, b);
    std::cout << a << " " << b << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `2 1`,
          analysis: [
            {
              lines: "10-12",
              text: "`a` 1, `b` 2. `x` bu `a` ning nomi, `y` bu `b` ning nomi. Yangi juftlik yo'q.",
            },
            {
              lines: "4-6",
              text: "`vaqt` oddiy lokal nusxa, 1. `x = y` aslida `a = b`, `a` 2 bo'ladi. `y = vaqt` aslida `b = 1`. `vaqt` freym bilan yo'qoladi, `a` va `b` qoladi.",
            },
            {
              lines: "13",
              text: "`2 1`. Qiymat bo'yicha xuddi shu tana `1 2` qoldirardi. `&` yozuvni chaqiruvchiga olib chiqdi.",
            },
          ],
        },
        {
          title: "const havola o'qiydi, 8 ni ham oladi",
          intro: [
            "`a` ham, yalang'och 8 ham `const int&` ga boradi. Funksiya yozmaydi, faqat chiqaradi.",
          ],
          codeLabel: "const_havola.cpp",
          code: `#include <iostream>

void yoz(const int& n) {
    std::cout << n << "{{n}}";
}

int main() {
    int a = 8;
    yoz(a);
    yoz(8);
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `8
8`,
          analysis: [
            {
              lines: "9",
              text: "`yoz(a)`. `n` `a` ning o'qish nomi. `a` 8, ekranga 8. `n = 1` desak, `const` yig'ilishni to'xtatardi.",
            },
            {
              lines: "10",
              text: "`yoz(8)`. 8 ning o'z qutisi yo'q. `const` havola shu chaqiruv davomida vaqtinchalik 8 ni ushlaydi. Yana 8 yoziladi. Oddiy `int&` bu qatorni yig'masdi.",
            },
            {
              lines: "11",
              text: "`a` hali 8. Hech kim unga yozmadi. `const` shartnoma shuni saqlaydi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`oshir` freymi ochiladi, lekin `n` uchun ikkinchi `int` ajratilmaydi. Havola chaqiruvchining `a` manziliga bog'lanadi. `n++` o'sha manzildan o'qiydi va 6 ni o'sha manzilga yozadi. Freym yopilganda bog'lanish yo'qoladi, `a` ning 6 si qoladi.",
          "`almashtir` da `vaqt` yangi lokal `int`. `x` va `y` esa `a` va `b` manzillari. `x = y` bitta uydan ikkinchisiga ko'chirish. Uchta alohida son emas, ikkita asl va bitta vaqtinchalik.",
          "`const int&` ham manzil, lekin kompilyator shu nom orqali yozuv buyrug'ini qo'ymaydi. `yoz(8)` da vaqtinchalik 8 chaqiruv tugaguncha tirik, havola unga qaraydi, `cout` o'qiydi, keyin vaqtinchalik ham, freym ham ketadi.",
          "`oshir(5)` da yoziladigan uy yo'q. Kompilyator buni yig'ishda rad etadi. Ish vaqtida «5 ning manzili» ni qidirishga hojat qolmaydi.",
        ],
        diagram: `main: a [5]  manzil bitta
oshir: n -> o'sha manzil
n++ -> a [6]
freym yopiladi, a [6] qoladi

almashtir:
x -> a, y -> b
vaqt [1]
a [2], b [1]

const yoz(8):
vaqtinchalik [8] chaqiruv davomida
n shuni o'qiydi
yozib bo'lmaydi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Havola xatosi ko'pincha yig'ilmaydi: literal, yoki `const` orqali yozish. Yig'ilsa, asl quti kutmaganingizda o'zgaradi.",
        ],
        items: [
          {
            title: "Oddiy havolaga 5 berish",
            why: [
              "`int&` o'zgaruvchi kutadi. 5 ning qutisi yo'q. `oshir(5)` yig'ilmaydi. O'zgartiriladigan argumentni avval o'zgaruvchiga qo'ying.",
            ],
            wrong: `void oshir(int& n) {
    n++;
}
oshir(5);`,
            right: `int a = 5;
oshir(a);`,
          },
          {
            title: "const havola orqali yozish",
            why: [
              "`const int&` o'qish shartnomasi. `n++` yig'ilmaydi. O'zgartirish kerak bo'lsa, `const` ni oling va argument o'zgaruvchi bo'lsin.",
            ],
            wrong: `void oshir(const int& n) {
    n++;
}`,
            right: `void oshir(int& n) {
    n++;
}`,
          },
          {
            title: "Havolani nusxa deb o'qish",
            why: [
              "`int&` da `n++` chaqiruvchining `a` sini o'zgartiradi. «Ichkarida qoladi» deb 5 kutmang. O'zgartirish niyat bo'lmasa, oddiy `int` yoki `const int&` yozing.",
            ],
            wrong: `void oshir(int& n) {
    n++;
}
int a = 5;
oshir(a);
// a 5 qoladi deb o'ylash`,
            right: `void qara(int n) {
    n++;
}
int a = 5;
qara(a);
// a 5 qoladi`,
          },
        ],
      },
      quiz: [
        {
          id: "7.5-q1",
          question: "`a` 5. `void oshir(int& n) { n++; }` va `oshir(a)`. Keyin `a` necha?",
          options: ["5", "6", "0", "yig'ilmaydi, & taqiqlangan"],
          answer: 1,
          explanation:
            "int& a ning ikkinchi nomi. n++ o'sha qutini 6 qiladi. Funksiya tugagach ham a 6.",
        },
        {
          id: "7.5-q2",
          question: "`void oshir(int& n)` bo'lsa, `oshir(5)` nima qiladi?",
          options: [
            "5 ni 6 qilib tashlaydi",
            "Yig'ilmaydi, oddiy havola vaqtinchalik sonni olmydi",
            "Nusxa olib 6 qaytaradi",
            "5 ni o'zgartirmay chaqiradi",
          ],
          answer: 1,
          explanation:
            "int& uyasi bor o'zgaruvchini kutadi. 5 literal, qutisi yo'q. Kompilyator rad etadi. const int& esa 5 ni o'qish uchun oladi.",
        },
        {
          id: "7.5-q3",
          question: "`a` 1, `b` 2. `almashtir(int& x, int& y)` ularni almashtiradi. Konsol?",
          options: ["1 2", "2 1", "1 1", "2 2"],
          answer: 1,
          explanation:
            "x va y asl qutilar. Almashuv a va b ning o'zida. Chaqiruvchida 2 1 qoladi.",
        },
      ],
    },
    {
      id: "7.6",
      navTitle: "Standart parametr",
      title: "Standart qiymatli parametrlar",
      goal: [
        "Bu darsdan keyin siz standart qiymatni «chaqiruvchi yozmasa, kompilyator shu sonni qo'yadi» deb o'qiysiz. Standartlar o'ng tomonda uzluksiz turishi, o'rtadagi argumentni tashlab o'tib bo'lmasligi va standartni e'lon bilan ta'rifda ikki marta yozilmasligi kerakligini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Choy buyurtmasi. «Oddiy choy» desangiz, ustaxona o'zi ikki qand soladi. «Beshta qand» desangiz, o'sha besh. Siz jim turgan joyga standart qiymat tushadi. Aytgan joyingizga sizning soningiz tushadi.",
          "Qandni aytmasdan, keyingi «issiq» degan bandni o'zgartirib bo'lmaydi. O'rtani bo'sh qoldirish menyuda yo'q. Argumentlar chapdan to'ldiriladi, tashlab ketiladiganlari o'ng chetda bo'ladi.",
          "Retsept varag'ida «qand: 2» bir marta yoziladi. Oshxonadagi ish varag'iga yana «qand: 2» deb yozsangiz, ikki buyruq urishadi. Standart qiymat e'londa turadi. Tana faqat parametr nomini oladi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Standart qiymat parametr ro'yxatida `=` bilan yoziladi. `void chiz(int yulduz = 3)`. Chaqiruv `chiz()` bo'lsa, kompilyator `chiz(3)` qilib o'qiydi. `chiz(5)` bersa, 5 ishlatiladi, standart tegilmaydi.",
        ],
        items: [
          {
            title: "O'ng tomondan to'ldiriladi",
            paragraphs: [
              "Standarti bor parametrdan keyin standartsiz parametr turmaydi. `void f(int a = 1, int b)` yig'ilmaydi. Standartlar ro'yxatning oxirida, uzluksiz.",
              "Bir nechta standart bo'lsa, chaqiruv o'ngdan tashlaydi. `joy(int x, int y = 1, int z = 2)` da `joy(10)` bu `x=10, y=1, z=2`. `joy(10, 4)` bu `y=4`, `z` hali 2. `joy(10, 4, 7)` uchtasini ham beradi.",
              "`joy(10, , 7)` yig'ilmaydi. O'rtani teshik qoldirib bo'lmaydi. `z` ni o'zgartirish uchun `y` ni ham yozasiz.",
            ],
            code: `int joy(int x, int y = 1, int z = 2) {
    return x + y + z;
}

joy(10);
joy(10, 4);
joy(10, 4, 7);`,
            codeLabel: "o'ng parametr jim turishi mumkin",
            table: {
              caption: "x majburiy. y va z standartli.",
              headers: ["Chaqiruv", "x", "y", "z", "Yig'indi"],
              rows: [
                ["joy(10)", "10", "1", "2", "13"],
                ["joy(10, 4)", "10", "4", "2", "16"],
                ["joy(10, 4, 7)", "10", "4", "7", "21"],
              ],
            },
          },
          {
            title: "Standart chaqiruv joyida qo'yiladi",
            paragraphs: [
              "Tana standartni bilishi shart emas. Kompilyator chaqiruvni to'ldirib, keyin oddiy chaqiruv qiladi. Funksiya ichida «bu standartmidi» degan belgi yo'q. Parametrda tayyor son yotadi.",
              "Standart ifoda har chaqiruvda hisoblanadi, ta'rif yozilgan paytda bir marta emas. Oddiy `3` da farq sezilmaydi. Ifoda o'zgaruvchini o'qisa, chaqiruv paytidagi qiymatni oladi.",
            ],
          },
          {
            title: "Bir marta yoziladi",
            paragraphs: [
              "Prototipda `int b = 10` tursa, ta'rifda `int b` yozing, yana `= 10` yozmang. Ikkinchi marta standart berish yig'ilmaydi.",
              "Chaqiruvchi prototipni ko'radi. Standart shu ko'ringan e'londa bo'lishi kerak. Tana faylining ichidagi standart, chaqiruvchi e'lonni ko'rmasa, chaqiruvga yordam bermaydi.",
            ],
            code: `int qosh(int a, int b = 10);

int qosh(int a, int b) {
    return a + b;
}`,
            codeLabel: "standart e'londa, tanada yo'q",
          },
        ],
      },
      examples: [
        {
          title: "Jim chaqiruv uch yulduz, 5 esa besh",
          intro: [
            "Standart 3. `chiz()` shu 3 ni oladi. `chiz(5)` o'z sonini beradi. Qolgan tana bir xil.",
          ],
          codeLabel: "chiz.cpp",
          code: `#include <iostream>

void chiz(int yulduz = 3) {
    for (int i = 0; i < yulduz; i++) {
        std::cout << "*";
    }
    std::cout << "{{n}}";
}

int main() {
    chiz();
    chiz(5);
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `***
*****`,
          analysis: [
            {
              lines: "11",
              text: "`chiz()` argument yozmagan. Kompilyator buni `chiz(3)` deb o'qiydi. `yulduz` 3. Sikl uch marta `*` yozadi, keyin qator.",
            },
            {
              lines: "12",
              text: "`chiz(5)`. Standart ishlatilmaydi. `yulduz` 5. Beshta yulduz va qator.",
            },
            {
              lines: "3-7",
              text: "Tana ikkala chaqiruvda ham bir xil. Farq faqat `yulduz` qutisidagi son. Funksiya «standart tushdimi» ni so'ramaydi.",
            },
          ],
        },
        {
          title: "O'ngdan qisqaradigan uchlik",
          intro: [
            "`x` har doim yoziladi. `y` va `z` jim turishi mumkin. Uch chaqiruv 13, 16 va 21.",
          ],
          codeLabel: "joy.cpp",
          code: `#include <iostream>

int joy(int x, int y = 1, int z = 2) {
    return x + y + z;
}

int main() {
    std::cout << joy(10) << "{{n}}";
    std::cout << joy(10, 4) << "{{n}}";
    std::cout << joy(10, 4, 7) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `13
16
21`,
          analysis: [
            {
              lines: "8",
              text: "`joy(10)`. `x` 10, `y` standart 1, `z` standart 2. 10+1+2 = 13.",
            },
            {
              lines: "9",
              text: "`joy(10, 4)`. Chapdan to'ldiriladi: `x` 10, `y` 4. O'ngdagi `z` jim, standart 2. 10+4+2 = 16.",
            },
            {
              lines: "10",
              text: "`joy(10, 4, 7)`. Uchalasi ham berilgan. 10+4+7 = 21. Standartlar tegilmaydi.",
            },
            {
              lines: "teshik",
              text: "`joy(10, , 7)` yig'ilmaydi. `z` ni 7 qilish uchun `y` ni ham yozish kerak. O'rtani bo'sh qoldirish yo'q.",
            },
          ],
        },
        {
          title: "Standart prototipda, tana uni qaytarmaydi",
          intro: [
            "E'lon `b = 10`. Ta'rif faqat `int b`. `qosh(2)` 12, `qosh(2, 3)` 5.",
          ],
          codeLabel: "standart_e'lon.cpp",
          code: `#include <iostream>

int qosh(int a, int b = 10);

int main() {
    std::cout << qosh(2) << "{{n}}";
    std::cout << qosh(2, 3) << "{{n}}";
    return 0;
}

int qosh(int a, int b) {
    return a + b;
}`,
          consoleTitle: "Konsol",
          console: `12
5`,
          analysis: [
            {
              lines: "3",
              text: "Standart shu e'londa. `main` shu imzoni ko'radi, shuning uchun `qosh(2)` ni to'ldira oladi.",
            },
            {
              lines: "6",
              text: "`qosh(2)` kompilyator uchun `qosh(2, 10)`. Tana `a` 2, `b` 10, natija 12.",
            },
            {
              lines: "7",
              text: "`qosh(2, 3)`. `b` 3, standart yo'q. 2+3 = 5.",
            },
            {
              lines: "11",
              text: "Ta'rifda `= 10` yo'q. Yana yozilsa, standart ikkinchi marta berilgan bo'lardi va bu fayl yig'ilmasdi. Tana parametrdagi tayyor sonni qo'shadi, standartni o'zi qo'ymaydi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Standart qiymat freymga alohida «jim» belgi qo'ymaydi. Kompilyator chaqiruvni to'ldiradi. `chiz()` uchun generatsiya qilingan chaqiruv `chiz(3)` bilan bir xil. Freymda `yulduz` 3. Qayerdan kelgani parametrda yozilmaydi.",
          "`joy(10, 4)` da freym `x` 10, `y` 4, `z` 2. 2 ni chaqiruvchi yozmagan, lekin freymga kompilyator qo'ygan. Qo'shish uchala qutini oddiy `int` deb o'qiydi.",
          "Standart ifoda chaqiruv joyida hisoblanadi. Oddiy literal bir marta kompilyatorning ichida turadi. Agar ifoda global o'zgaruvchini o'qisa, har chaqiruv o'sha paytdagi qiymatni oladi, ta'rif yozilgan kundagi emas.",
          "Prototipdagi standart kompilyator jadvalida, chaqiruvchi ko'radigan joyda. Tana fayli esa buyruq. Chaqiruvchi jadvalni ko'rmasa, `qosh(2)` ni to'ldira olmaydi. Tana ichida `b` allaqachon son.",
        ],
        diagram: `chiz()
  kompilyator: chiz(3)
  yulduz [3]
  *** 

chiz(5)
  yulduz [5]
  *****

joy(10)     -> x10 y1 z2 -> 13
joy(10, 4)  -> x10 y4 z2 -> 16
joy(10, 4, 7) -> 21

qosh(2) prototipdan: b = 10
tana a[2] b[10] -> 12`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Standart parametr xatosi yig'ilmaydi: o'rta teshik, chap tomonda standart, yoki standart ikki marta.",
        ],
        items: [
          {
            title: "Standartni chapga, majburiyni o'ngga qo'yish",
            why: [
              "`a` standartli, `b` esa yo'q. Chaqiruvchi bitta son bersa, u qaysi parametr ekani noaniq bo'lib qoladi. C++ buni yig'maydi. Standartlar o'ng chetda bo'lsin.",
            ],
            wrong: `void f(int a = 1, int b) {
    std::cout << a + b << "{{n}}";
}`,
            right: `void f(int a, int b = 1) {
    std::cout << a + b << "{{n}}";
}`,
          },
          {
            title: "O'rta argumentni tashlab ketish",
            why: [
              "`joy(10, , 7)` sintaksis emas. Chapdan uzluksiz yoziladi. `z` kerak bo'lsa, `y` ham yoziladi.",
            ],
            wrong: `joy(10, , 7);`,
            right: `joy(10, 1, 7);`,
          },
          {
            title: "Standartni e'lon va tanada ikki marta yozish",
            why: [
              "Prototip `b = 10` degach, ta'rif yana `b = 10` desa, standart ikkinchi marta beriladi. Bu yig'ilmaydi. Ta'rifda faqat tur va nom qolsin.",
            ],
            wrong: `int qosh(int a, int b = 10);

int qosh(int a, int b = 10) {
    return a + b;
}`,
            right: `int qosh(int a, int b = 10);

int qosh(int a, int b) {
    return a + b;
}`,
          },
        ],
      },
      quiz: [
        {
          id: "7.6-q1",
          question: "`void chiz(int yulduz = 3)` yulduzchasini `yulduz` marta yozadi. `chiz()` konsolga nechta `*` chiqaradi?",
          options: ["0", "1", "3", "yig'ilmaydi, argument shart"],
          answer: 2,
          explanation:
            "Argument yo'q. Kompilyator standart 3 ni qo'yadi. Uchta yulduz, keyin qator.",
        },
        {
          id: "7.6-q2",
          question: "`joy(int x, int y = 1, int z = 2)` yig'indini qaytaradi. `joy(10)` necha?",
          options: ["10", "11", "13", "12"],
          answer: 2,
          explanation:
            "x 10, y standart 1, z standart 2. 10 + 1 + 2 = 13.",
        },
        {
          id: "7.6-q3",
          question: "Qaysi imzo yig'iladi?",
          options: [
            "void f(int a = 1, int b)",
            "void f(int a, int b = 1)",
            "joy(10, , 7)",
            "Prototipda ham, tanada ham b = 10",
          ],
          answer: 1,
          explanation:
            "Standart o'ng tomonda bo'lishi kerak. Chapda standart, o'ngda majburiy parametr yig'ilmaydi. O'rta teshik va ikki marta standart ham xato.",
        },
      ],
    },
    {
      id: "7.7",
      navTitle: "Scope va static",
      title: "Scope: lokal, global va static o'zgaruvchilar",
      goal: [
        "Bu darsdan keyin siz lokal qutini blok yopilishi bilan yo'qoladigan, globalni butun dastur davomida turadigan, funksiya ichidagi `static` ni esa nomi lokal, qiymati chaqiruvlar orasida saqlanadigan quti deb ajratasiz. Ichki nom tashqi nomni yashirishini va `::` globalni ochishini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Xona ichidagi doska lokal. Eshik yopilsa, doska o'chiriladi. Keyingi dars yangi doska, yana noldan. Funksiyaning oddiy `int n = 0` si shunday. Har chaqiruv yangi xona.",
          "Koridordagi doska global. Hamma xona eshigi ochiq bo'lsa, shu doskani ko'radi. U dars tugasa ham osilib turadi. Lekin xona ichida ham «doska» deb yozilgan kichik taxta bo'lsa, xonadagilar koridorni emas, o'sha taxtani ko'radi. Bu yashirish. Koridorni ko'rsatmoqchi bo'lsangiz, «koridordagi doska» deysiz. C++ da bu `::n`.",
          "Xona yopilsa ham saqlanadigan, lekin faqat shu xonaning kaliti bilan ochiladigan quti bor. Har kirishda quti ochiladi, ichidagi hisob o'sadi, eshik yopilganda quti o'chirilmaydi. Keyingi kirishda o'sha hisob turadi. Funksiya ichidagi `static` shu quti. Koridorga qo'yilmagan, lekin xona bilan birga yo'qolmaydi ham.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Nom qayerda ko'rinishi uning scope i. Blok ichidagi nom blokda. Funksiya parametri ham shu funksiyaning lokali. Fayl boshidagi, funksiyadan tashqaridagi nom global, e'londan keyin shu faylda ko'rinadi.",
        ],
        items: [
          {
            title: "Lokal har chaqiruvda yangi",
            paragraphs: [
              "`void sana()` ichidagi `int n = 0` har chaqiruvda ochiladi, 0 bo'ladi, `n++` uni 1 qiladi, funksiya tugagach yo'qoladi. Ikkinchi chaqiruv yana 0 dan boshlaydi. Konsol 1, keyin yana 1.",
              "Boshlang'ich qiymatsiz lokal `int` ni o'qish noma'lum. Global `int` boshlang'ichsiz 0. `static` lokal ham birinchi marta 0, agar `=` yozilmasa. Lokalni 0 deb o'ylamang.",
            ],
            code: `void sana() {
    int n = 0;
    n++;
    std::cout << n << "{{n}}";
}`,
            codeLabel: "har safar 1",
          },
          {
            title: "static lokal eslab qoladi",
            paragraphs: [
              "`static int n = 0` funksiya ichida. Nom faqat shu funksiyada ko'rinadi. Joy esa dastur davomida turadi. Birinchi marta shu qatordan o'tilganda 0 yoziladi. Keyingi chaqiruvlar `= 0` ni qayta ishlatmaydi.",
              "Funksiya hech chaqirilmasa, bu `static` tayyorlanmaydi. Global esa `main` dan oldin tayyorlanadi. Ikkalasi ham dastur umrida yashaydi, boshlanish payti boshqa.",
              "Fayl boshidagi `static int g = 1` boshqa ma'no. U umrni cho'zmaydi, globalning umri allaqachon butun dastur. Bu `static` nomni shu faylda yashiradi, boshqa fayl ko'rmaydi. Hisoblagich darsi funksiya ichidagi `static`.",
            ],
            code: `void sana() {
    static int n = 0;
    n++;
    std::cout << n << "{{n}}";
}`,
            codeLabel: "1, keyin 2, keyin 3",
          },
          {
            title: "Global va yashirish",
            paragraphs: [
              "Global `int n = 10` funksiyalar uni ko'ra oladi, toki ichkarida yana `int n` ochilmasa. Ichki `n` tashqi `n` ni yashiradi. Ichkaridagi `n++` globalni o'zgartirmaydi.",
              "`::n` global `n`. Ikki nuqta scope resolution. Lokal bor joyda ham globalni o'qish va yozish mumkin. Lokal bo'lmasa, oddiy `n` globalning o'zi.",
              "Bir faylda globallar yuqoridan pastga tayyorlanadi. Bir nechta faylda tartibga tayanmang. Globalni kam tuting. Hisob funksiyaga tegishli bo'lsa, `static` lokal aniqroq, chunki nomi tor.",
            ],
            code: `int n = 10;

void korsat() {
    int n = 3;
    std::cout << n << "{{n}}";
    std::cout << ::n << "{{n}}";
}`,
            codeLabel: "ichki 3, global 10",
          },
        ],
      },
      examples: [
        {
          title: "Oddiy lokal ikkinchi chaqiruvda ham 1",
          intro: [
            "`n` har kirishda 0. `n++` uni 1 qiladi. Eshik yopiladi. Ikkinchi chaqiruv yangi 0.",
          ],
          codeLabel: "lokal.cpp",
          code: `#include <iostream>

void sana() {
    int n = 0;
    n++;
    std::cout << n << "{{n}}";
}

int main() {
    sana();
    sana();
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
1`,
          analysis: [
            {
              lines: "10",
              text: "Birinchi chaqiruv. 4-qator `n` ni 0 qiladi. 5-qator 1. 6-qator 1 ni yozadi. Freym yopiladi, bu `n` yo'qoladi.",
            },
            {
              lines: "11",
              text: "Ikkinchi chaqiruv yangi freym. Yana `n = 0`, yana `n++`, yana 1. Oldingi 1 saqlanmagan.",
            },
            {
              lines: "4",
              text: "`int n = 0` har o'tishda ishlaydi. `static` bo'lsa, bu qator ikkinchi safar boshlang'ich qiymatni qayta yozmasdi.",
            },
          ],
        },
        {
          title: "static lokal 1, 2, 3 deb ketadi",
          intro: [
            "Xuddi shu `n++`, lekin `static`. Uch chaqiruv uchta qator: 1, 2, 3. Nom hali ham faqat `sana` ichida.",
          ],
          codeLabel: "static_lokal.cpp",
          code: `#include <iostream>

void sana() {
    static int n = 0;
    n++;
    std::cout << n << "{{n}}";
}

int main() {
    sana();
    sana();
    sana();
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
2
3`,
          analysis: [
            {
              lines: "10",
              text: "Birinchi marta 4-qatordan o'tiladi. `n` 0 qilib tayyorlanadi. `n++` uni 1 qiladi. Ekranga 1. Funksiya tugaydi, `n` yo'qolmaydi.",
            },
            {
              lines: "11",
              text: "Ikkinchi chaqiruv. `static int n = 0` qayta ishlamaydi. Eski `n` 1. `n++` uni 2 qiladi. Ekranga 2.",
            },
            {
              lines: "12",
              text: "Uchinchi chaqiruv 3. Har chaqiruv yangi lokal ochganida hammasi 1 bo'lardi. `static` bitta qutini saqlaydi.",
            },
            {
              lines: "nom",
              text: "`main` ichida `n` yo'q. `std::cout << n` shu `main` da yig'ilmaydi. Saqlangan quti, tor nom.",
            },
          ],
        },
        {
          title: "Ichki n global n ni yashiradi",
          intro: [
            "Global 10. Funksiya ichida boshqa `n` 3. Oddiy `n` 3 ni yozadi. `::n` 10 ni. `main` da yana global 10.",
          ],
          codeLabel: "yashirish.cpp",
          code: `#include <iostream>

int n = 10;

void korsat() {
    int n = 3;
    std::cout << n << "{{n}}";
    std::cout << ::n << "{{n}}";
}

int main() {
    korsat();
    std::cout << n << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `3
10
10`,
          analysis: [
            {
              lines: "3",
              text: "Global `n` 10. `main` dan oldin tayyor. Butun dastur davomida shu quti bor.",
            },
            {
              lines: "6-7",
              text: "Ichki `int n = 3` yangi quti. Shu blokda yalang'och `n` shu 3. Global yashirin. Ekranga 3. Ichki `n++` bo'lsa ham global 10 qolardi.",
            },
            {
              lines: "8",
              text: "`::n` scope ni globalga ochadi. 10 yoziladi. Ikki nuqta ichki nomni chetlab o'tadi.",
            },
            {
              lines: "13",
              text: "`main` da lokal `n` yo'q. `n` global, 10. Funksiya uni o'zgartirmagan. Konsolning uchinchi qatori 10.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Oddiy lokal freymda. Chaqiruv ochadi, `n = 0` yozadi, `n++` shu uyani 1 qiladi, freym yopilganda uy bo'shaydi. Ikkinchi chaqiruv boshqa uy, yana 0. Eski 1 ni o'qish mumkin emas, manzil qaytarilgan.",
          "`static` lokal freymda emas. U dastur yashaguncha turadigan joyda, lekin nom jadvali faqat `sana` ichida shu nomni ko'rsatadi. Birinchi o'tish 0 yozadi. Keyingi o'tishlar o'sha manzilni o'qiydi va oshiradi. `main` ning nom jadvalida bu manzil yo'q.",
          "Global ham shunday uzoq joy, lekin nom faylda ochiq. `korsat` ichida yangi `n` ochilganda, shu blokning qidiruvi avval ichkini topadi va to'xtaydi. `::n` qidiruvni to'g'ridan global jadvalga qo'yadi. Ikki quti bir vaqtda mavjud: 3 va 10.",
          "Qiymatsiz lokalni o'qish noma'lum, chunki freymda axlat qolgan bo'lishi mumkin. Qiymatsiz global esa ish boshida 0 qilinadi. `static` lokal ham birinchi tayyorlanishida 0, agar boshlang'ich yozilmasa. Bu uchala qoidani bir-biriga ko'chirmang.",
        ],
        diagram: `lokal sana, ikki chaqiruv:
freym n [0] -> [1] -> yo'q
yangi freym n [0] -> [1] -> yo'q
konsol 1, 1

static sana:
birinchi: n [0] -> [1]
ikkinchi: n [2]
uchinchi: n [3]
nom faqat sana ichida

global n [10]
korsat ichki n [3]
yozuv: 3, keyin ::n -> 10
main: global hali 10`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Scope xatosi hisobni saqlayman deb lokal yozish, yoki ichki nom globalni o'zgartirdi deb o'ylash.",
        ],
        items: [
          {
            title: "Hisobni oddiy lokalda saqlash",
            why: [
              "Har chaqiruv `n` ni 0 qiladi. Ikki marta chaqirsangiz ham konsol 1 va 1. Chaqiruvlar orasida qolishi kerak bo'lsa, funksiya ichida `static`.",
            ],
            wrong: `void sana() {
    int n = 0;
    n++;
    std::cout << n << "{{n}}";
}`,
            right: `void sana() {
    static int n = 0;
    n++;
    std::cout << n << "{{n}}";
}`,
          },
          {
            title: "Ichki n globalni o'zgartiradi deb o'ylash",
            why: [
              "Ichki `int n` yangi quti. `n = 3` global 10 ni tegmaydi. Globalni o'zgartirish uchun ichki nom ochmang yoki `::n = 3` yozing.",
            ],
            wrong: `int n = 10;

void korsat() {
    int n = 3;
}`,
            right: `int n = 10;

void korsat() {
    ::n = 3;
}`,
          },
          {
            title: "Qiymatsiz lokalni 0 deb o'qish",
            why: [
              "Global bo'sh `int` 0 bo'ladi. Funksiya ichidagi bo'sh `int` 0 degan va'da emas. Uni o'qish noma'lum. Lokalga boshlang'ich bering.",
            ],
            wrong: `void f() {
    int x;
    std::cout << x << "{{n}}";
}`,
            right: `void f() {
    int x = 0;
    std::cout << x << "{{n}}";
}`,
          },
        ],
      },
      quiz: [
        {
          id: "7.7-q1",
          question: "`void sana()` ichida `int n = 0; n++;` va son yoziladi. Ikki marta chaqirilsa, konsol?",
          options: ["1 va 2", "1 va 1", "0 va 1", "2 va 2"],
          answer: 1,
          explanation:
            "Oddiy lokal har chaqiruvda yangi. Ikkalasida ham 0 dan 1 bo'ladi. Konsol 1, keyin 1.",
        },
        {
          id: "7.7-q2",
          question: "Xuddi shu hisob `static int n = 0` bo'lsa, uch chaqiruv nima yozadi?",
          options: ["1, 1, 1", "0, 1, 2", "1, 2, 3", "3, 3, 3"],
          answer: 2,
          explanation:
            "static lokal bir marta 0 bo'ladi va chaqiruvlar orasida qoladi. Har kirishda bittaga o'sadi: 1, 2, 3.",
        },
        {
          id: "7.7-q3",
          question: "Global `n` 10. Funksiya ichida `int n = 3`. `n` va `::n` nima yozadi?",
          options: [
            "10 va 10",
            "3 va 3",
            "3 va 10",
            "10 va 3",
          ],
          answer: 2,
          explanation:
            "Ichki n tashqarisini yashiradi, oddiy n bu 3. ::n global jadvalga boradi, u 10. main da lokal yo'q, shuning uchun main dagi n yana 10.",
        },
      ],
    },
    {
      id: "7.8",
      navTitle: "Qayta yuklash",
      title: "Funksiyalarni qayta yuklash",
      goal: [
        "Bu darsdan keyin siz qayta yuklashni bir nom, turli parametr ro'yxati deb tushuntirasiz. Kompilyator chaqiruvni yig'ish paytida tanlaydi. Qaytish turi yolg'iz yetarli emasligini, aniq moslik aylantirishdan ustunligini va ikki yo'l teng kuchli bo'lsa chaqiruv yig'ilmasligini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Bitta so'z, ikki turli ish. «Yig'» desangiz, kassir qo'ldagi narsaga qaraydi. Ikki butun kelsa, butun qo'shish. Ikki haqiqiy kelsa, haqiqiy qo'shish. So'z bitta, varaqlar ikkita. Qaysi varaq ekani chaqiruvdagi turlardan chiqadi.",
          "Kassir bu qarorni mijoz kelgan zahoti, retsept yozilayotganda qabul qiladi. Ish vaqtida varaqlar orasida qidiruv yo'q. Kompilyator chaqiruvni bitta aniq funksiyaga bog'laydi. Bu 7.9 dagi rekursiya emas va keyingi mavzulardagi virtual chaqiruv ham emas.",
          "Agar mijoz bitta butun va bitta haqiqiy qo'shib, ikkala varaq ham «bir oz o'giraman» desa, kassir tanlov qilmaydi. Buyurtma noaniq. Dastur yig'ilmaydi. Qaytish turini boshqacha yozish yangi varaq ochmaydi. «Yig'indini haqiqiy qilib ber» parametrlar bir xil bo'lsa, ikkinchi varaq emas, ziddiyat.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Bir xil nom, bitta scope, farqli parametr ro'yxati. Farq sonida, turida yoki tartibida bo'lishi mumkin. Qaytish turi ro'yxatga kirmaydi. Tanlov yig'ish paytida, eng yaxshi moslik bo'yicha.",
        ],
        items: [
          {
            title: "Parametrlar farq qiladi",
            paragraphs: [
              "`int yig(int, int)` va `double yig(double, double)` ikki funksiya. `yig(2, 3)` butunni oladi, chunki 2 va 3 `int`. `yig(1.5, 0.25)` haqiqiyni oladi.",
              "`void xabar(int)` va `void xabar(int, int)` ham qayta yuklash. Bittasi bitta son, ikkinchisi ikkita. Qaysi biri ekani argument sonidan ko'rinadi.",
            ],
            code: `int yig(int a, int b) {
    return a + b;
}

double yig(double a, double b) {
    return a + b;
}`,
            codeLabel: "bir nom, ikki imzo",
          },
          {
            title: "Aniq moslik ustun",
            paragraphs: [
              "`void tur(int)` va `void tur(double)` bor bo'lsa, `tur(4)` `int` ni oladi. 4 allaqachon `int`, aylantirish shart emas. `tur(4.5)` `double` ni oladi.",
              "Agar faqat `double` versiya bo'lsa, `tur(4)` ham unga borardi: `int` `double` ga aylanadi. Ikkala versiya birga turganida aniq `int` yutadi.",
              "`yig(2, 3.0)` ikkala variantda ham bitta argumentni aylantirishni so'raydi. Bittasi `int` ni `double` qiladi, ikkinchisi `double` ni `int` qiladi. Teng kuch. Chaqiruv noaniq, yig'ilmaydi. Ikkala sonni ham bir turga keltiring.",
            ],
            code: `void tur(int n);
void tur(double n);

tur(4);
tur(4.5);`,
            codeLabel: "aniq tur yutadi",
          },
          {
            title: "Qaytish turi yetarli emas",
            paragraphs: [
              "`int h(int)` va `double h(int)` bir xil parametr. Bu qayta yuklash emas. Kompilyator qaytish turiga qarab chaqiruvni ajratmaydi. Ikkinchi e'lon ziddiyat.",
              "Standart parametr ham chaqiruvni ikki imzoga o'xshatib qo'yishi mumkin. `void f(int)` va `void f(int, int = 0)` bo'lsa, `f(1)` ikkalasiga ham mos. Noaniq. Standart qo'shganingizda eski chaqiruvlar buzilmasin.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Butun yig'indi va haqiqiy yig'indi",
          intro: [
            "Bir nom. `yig(2, 3)` butun 5. `yig(1.5, 0.25)` haqiqiy 1.75. Tanlov argument turida.",
          ],
          codeLabel: "yig.cpp",
          code: `#include <iostream>

int yig(int a, int b) {
    return a + b;
}

double yig(double a, double b) {
    return a + b;
}

int main() {
    std::cout << yig(2, 3) << "{{n}}";
    std::cout << yig(1.5, 0.25) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `5
1.75`,
          analysis: [
            {
              lines: "12",
              text: "2 va 3 ikkalasi `int`. `int yig(int, int)` aniq mos. `double` versiya `int` ni aylantirardi, lekin aniq moslik bor. Natija 5.",
            },
            {
              lines: "13",
              text: "1.5 va 0.25 `double` literal. Aniq moslik `double yig`. 1.5 + 0.25 = 1.75. Ikkalasi ham ikkilikda aniq kasr, ekranda 1.75.",
            },
            {
              lines: "aralash",
              text: "`yig(2, 3.0)` yig'ilmaydi. Birinchi funksiya ikkinchi sonni `int` ga, ikkinchi funksiya birinchi sonni `double` ga aylantirmoqchi. Ikkalasi ham bir xil kuchda. `yig(2.0, 3.0)` yoki `yig(2, 3)` yozing.",
            },
          ],
        },
        {
          title: "Bitta son va ikkita son",
          intro: [
            "Nom bitta, argument soni farq qiladi. `xabar(7)` bir qator, `xabar(7, 8)` ikkinchi variant.",
          ],
          codeLabel: "xabar.cpp",
          code: `#include <iostream>

void xabar(int n) {
    std::cout << "son " << n << "{{n}}";
}

void xabar(int n, int m) {
    std::cout << "juft " << n << " " << m << "{{n}}";
}

int main() {
    xabar(7);
    xabar(7, 8);
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `son 7
juft 7 8`,
          analysis: [
            {
              lines: "12",
              text: "Bitta argument. Imzo `xabar(int)`. `son 7`. Ikki parametrli variant bu chaqiruvga mos emas, argument yetmaydi.",
            },
            {
              lines: "13",
              text: "Ikki argument. `xabar(int, int)`. `juft 7 8`. Bir parametrli variant ortiqcha argumentni olmaydi.",
            },
            {
              lines: "tanlov",
              text: "Bu qaror yig'ishda bitadi. Ishlayotgan dastur nomlarni qidirib o'tirmaydi. Har bir chaqiruv o'z manziliga bog'langan.",
            },
          ],
        },
        {
          title: "4 butun varianti, 4.5 haqiqiy variantni oladi",
          intro: [
            "Ikkala `tur` ham bor. 4 aniq `int`. 4.5 aniq `double`. Aylantirish shart emas.",
          ],
          codeLabel: "tur.cpp",
          code: `#include <iostream>

void tur(int n) {
    std::cout << "int " << n << "{{n}}";
}

void tur(double n) {
    std::cout << "double " << n << "{{n}}";
}

int main() {
    tur(4);
    tur(4.5);
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `int 4
double 4.5`,
          analysis: [
            {
              lines: "12",
              text: "`4` turi `int`. `tur(int)` aniq mos. `tur(double)` ham 4 ni olardi, lekin avval aylantirardi. Aniq moslik yutadi. `int 4`.",
            },
            {
              lines: "13",
              text: "`4.5` turi `double`. Aniq `tur(double)`. Ekran `double 4.5`.",
            },
            {
              lines: "faqat bitta bo'lsa",
              text: "`tur(int)` umuman bo'lmasa, `tur(4)` `double` ga aylanib ishlardi. Qayta yuklash shu aylantirishni aniq moslik bor joyda to'xtatadi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Kompilyator har bir chaqiruv uchun nomzodlarni yig'adi. Parametr soni mos kelmaganini tashlaydi. Qolganlarida argumentni parametr turiga qanday olib borishni solishtiradi. Aniq moslik aylantirishdan yaxshiroq. Yagona g'olib bo'lsa, chaqiruv shu funksiyaning manziliga yoziladi.",
          "Ish vaqtida `yig` degan umumiy qidiruv yo'q. `yig(2, 3)` buyrug'i to'g'ridan `int` tanasiga sakraydi. `yig(1.5, 0.25)` boshqa manzilga sakraydi. Ikki tana xotirada ikki alohida buyruq ketma-ketligi.",
          "Hech kim yutmasa, yig'ish to'xtaydi. `yig(2, 3.0)` da ikki nomzod ham bir argumentni aylantiradi, ikkinchisi aniq. Bu tenglik. Kompilyator o'zi birini tanlamaydi. Jadvalga manzil yozilmaydi.",
          "Qaytish turi nomzodlarni ajratmaydi. `int h(int)` va `double h(int)` bitta imzo deb urishadi. Chaqiruvchi qaytgan sonni qanday ishlatishi tanlovga kirmaydi. Tanlov argumentlarda.",
        ],
        diagram: `yig(2, 3)
  int, int aniq -> tana int
  natija 5

yig(1.5, 0.25)
  double, double aniq -> boshqa tana
  natija 1.75

tur(4) -> tur(int)
tur(4.5) -> tur(double)

yig(2, 3.0)
  ikki nomzod teng kuch
  manzil yozilmaydi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Qayta yuklash xatosi yig'ilmaydi. Dastur noto'g'ri son chiqarib ishlamaydi, kompilyator ikki yo'lni ajrata olmaydi.",
        ],
        items: [
          {
            title: "Faqat qaytish turini o'zgartirish",
            why: [
              "Parametrlar bir xil. Bu ikkinchi funksiya emas. Qaytish turi chaqiruvni ajratmaydi. Imzo parametrda farq qilsin.",
            ],
            wrong: `int h(int n) {
    return n;
}

double h(int n) {
    return n;
}`,
            right: `int h(int n) {
    return n;
}

double h(double n) {
    return n;
}`,
          },
          {
            title: "Aralash turlarni noaniq qoldirish",
            why: [
              "`yig(2, 3.0)` da `int` varianti 3.0 ni butunga, `double` varianti 2 ni kasrga aylantiradi. Ikkalasi ham bir xil daraja. Yig'ilmaydi. Ikkala argumentni bir turga yozing.",
            ],
            wrong: `yig(2, 3.0);`,
            right: `yig(2, 3);
yig(2.0, 3.0);`,
          },
          {
            title: "Standart parametr bilan ikkinchi imzoni urishtirish",
            why: [
              "`f(int)` va `f(int, int = 0)` ikkalasi ham `f(1)` ni qabul qiladi. Chaqiruv noaniq. Bitta imzoni qoldiring yoki standartni olib, chaqiruvda ikki sonni ochiq yozing.",
            ],
            wrong: `void f(int n);
void f(int n, int m = 0);
f(1);`,
            right: `void f(int n, int m = 0);
f(1);`,
          },
        ],
      },
      quiz: [
        {
          id: "7.8-q1",
          question: "`int yig(int, int)` va `double yig(double, double)` bor. `yig(2, 3)` qaysi tanani oladi va natija necha?",
          options: [
            "double, natija 5.0",
            "int, natija 5",
            "ikkalasi ham ishlaydi",
            "yig'ilmaydi",
          ],
          answer: 1,
          explanation:
            "2 va 3 int. Aniq moslik int yig. double versiya aylantirish talab qilardi. Natija 5.",
        },
        {
          id: "7.8-q2",
          question: "`tur(int)` va `tur(double)` bor. `tur(4)` nima yozadi?",
          options: ["double 4", "int 4", "4", "yig'ilmaydi, 4 ikkalasiga ham mos"],
          answer: 1,
          explanation:
            "4 ning turi int. Aniq moslik tur(int). double ga aylantirish yomonroq moslik, shuning uchun tanlanmaydi.",
        },
        {
          id: "7.8-q3",
          question: "`int h(int)` dan keyin `double h(int)` yozilsa nima bo'ladi?",
          options: [
            "Chaqiruv qaytish turiga qarab tanlanadi",
            "Yig'ilmaydi, qaytish turi qayta yuklash emas",
            "Har doim double ishlaydi",
            "Har doim int ishlaydi, double e'tiborsiz",
          ],
          answer: 1,
          explanation:
            "Parametr ro'yxati bir xil. Qayta yuklash parametrlar farq qilganda bo'ladi. Qaytish turining o'zi yangi imzo ochmaydi.",
        },
      ],
    },
    {
      id: "7.9",
      navTitle: "Rekursiya",
      title: "Rekursiya",
      goal: [
        "Bu darsdan keyin siz rekursiyani funksiyaning o'zini chaqirishi deb tushuntirasiz. Asosiy holat bo'lmasa stek chuqurlashib ketishini, faktorial va Fibonachchi qanday yig'ilishini, har bir chaqiruvning o'z `n` i borligini va `int` katta faktorialni sig'masligini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Qo'g'irchoq ichida qo'g'irchoq. Katta quti «4» deb yozilgan va ichidagi kichigiga qaraydi. U «3», u «2», eng kichigi «1» va ichi bo'sh, bu asos. Asos javobni beradi, tashqaridagilar o'z sonini shu javobga ko'paytirib qaytaradi. Faktorial shunday ochiladi va yig'iladi.",
          "Eng ichki qo'g'irchoq birinchi yopiladi. «Chiqish 1» tashqi «chiqish 3» dan oldin. Stek shu qutilar uyumi. Har bir qutida o'z `n` i va qaytish manzili bor. Tashqi quti ichkisi tugaguncha ochiq turadi.",
          "Asos bo'lmasa, quti ichiga yana quti, to'xtovsiz. Stol tagidagi uyum oshib, xona sig'maydi. Bu stack overflow. `while (true)` bitta xonada aylanadi, yangi xona ochmaydi. Rekursiya esa har chaqiruvda yangi xona qo'yadi. Sig'magach dastur odatda yiqiladi, sonni o'rab qaytarmaydi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Rekursiv funksiya o'z nomini chaqiradi. Asosiy holat chaqirmay qaytadi. Qolgan hollar masalani kichikroq argument bilan o'ziga beradi. Asosga yetilmasa, freymlar tugamaydi.",
        ],
        items: [
          {
            title: "Faktorial",
            paragraphs: [
              "`n <= 1` bo'lsa 1. Aks holda `n * faktorial(n - 1)`. `faktorial(4)` bu `4 * 3 * 2 * 1 = 24`. `faktorial(1)` asos, 1. `faktorial(0)` ham shu asosda 1, bu 0! ga mos.",
              "Manfiy son `n <= 1` ga tushadi va 1 qaytadi. Bu matematikasi to'g'ri faktorial emas, shunchaki bu asos manfiyni ushlab qoladi. Manfiy uchun alohida tekshiruv kerak bo'lsa, avval rad eting. `n == 0` degina asos qo'yib, manfiyni `n - 1` bilan yuborsangiz, 0 ga hech yetilmaysiz va stek o'sadi.",
              "`int` 32 bitda 12! sig'adi, 13! sig'maydi. 13! = 6227020800, `INT_MAX` esa 2147483647. Sig'magan `int` da ishorali toshish noma'lum. Kichik `n` bilan ishlang yoki kengroq tur kerak bo'lsa, keyinroq `long long` ni alohida o'lchang. Rekursiya to'g'ri bo'lsa ham tur sig'masa, natija noto'g'ri.",
            ],
            code: `int faktorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * faktorial(n - 1);
}`,
            codeLabel: "asos va kichikroq masala",
          },
          {
            title: "Fibonachchi",
            paragraphs: [
              "`fib(0)` 0, `fib(1)` 1. Undan keyin oldingi ikkisining yig'indisi. 0, 1, 1, 2, 3, 5, 8. `fib(6)` 8.",
              "Bu yozuv bir xil qiymatni qayta-qayta hisoblaydi. `fib(6)` ichida `fib(4)` ikki yo'ldan ham so'raladi. Chaqiruvlar soni tez o'sadi. Natija kichik bo'lsa ham ish ko'p. Katta `n` uchun sikl yoki eslab qoluvchi usul kerak. Hozir chuqurlikni ko'rish uchun kichik `n` yetadi.",
              "`fib` ham `int` da cheksiz emas. 47-Fibonachchi 32 bitli ishorali `int` dan oshadi. Misol `fib(6)` shu chegaradan uzoq.",
            ],
            code: `int fib(int n) {
    if (n <= 1) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}`,
            codeLabel: "ikki kichik chaqiruv",
          },
          {
            title: "Stek va uning to'lib ketishi",
            paragraphs: [
              "Har bir chaqiruv yangi freym: o'z `n` i, qaytish manzili. `qadam(3)` ochilganda ichida `qadam(2)`, uning ichida `qadam(1)`. Eng ichkisi birinchi qaytadi. Tashqi `n` ichki ish tugaguncha o'z freymida turadi. Ichki `n` tashqi `n` ni bosmaydi.",
              "Asos bo'lmasa yoki argument asosga yaqinlashmasa, freymlar qo'yilaveradi. Stek chegarali. Minglab chuqurlik sig'masligi mumkin. Dastur odatda stack overflow bilan yiqiladi. Aniq bayt soni tizimga bog'liq, unga tayanmang.",
              "`while` dagi cheksiz aylana bitta freymni qayta ishlatadi. Rekursiv cheksizlik esa stekni o'stiradi. Ikkalasi ham o'zi tugamaydi, sinishi boshqacha. Asosiy holatni avval yozing, argument o'sha holatga qarab kichrayishini tekshiring.",
            ],
            code: `void qadam(int n) {
    std::cout << "kirish " << n << "{{n}}";
    if (n > 1) {
        qadam(n - 1);
    }
    std::cout << "chiqish " << n << "{{n}}";
}`,
            codeLabel: "kirish chuqurlashadi, chiqish teskarisiga",
          },
        ],
      },
      examples: [
        {
          title: "faktorial(4) bu 24",
          intro: [
            "Asos `n <= 1` da 1. 4 tashqarida kutib turadi, 3 o'z ichida, toki 1 qaytguncha. Keyin ko'paytmalar yig'iladi.",
          ],
          codeLabel: "faktorial.cpp",
          code: `#include <iostream>

int faktorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * faktorial(n - 1);
}

int main() {
    std::cout << faktorial(4) << "{{n}}";
    std::cout << faktorial(1) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `24
1`,
          analysis: [
            {
              lines: "11",
              text: "`faktorial(4)`. `4 <= 1` yolg'on. `return 4 * faktorial(3)`. 4 ning freymi ochiq turadi, toki 3 qaytguncha.",
            },
            {
              lines: "7, chuqurlik",
              text: "`faktorial(3)` bu `3 * faktorial(2)`. U `2 * faktorial(1)`. `faktorial(1)` asos, 1 qaytadi va boshqa chaqirmaydi. Endi yig'ilish: 2*1=2, 3*2=6, 4*6=24.",
            },
            {
              lines: "12",
              text: "`faktorial(1)` to'g'ridan 5-qator, `return 1`. Ichki chaqiruv yo'q. Ekranga 1.",
            },
            {
              lines: "chegara",
              text: "24 `int` ga sig'adi. 13! sig'maydi, garchi rekursiya to'g'ri yozilgan bo'lsa ham. Katta `n` da avval turni, chuqur `n` da esa stekni ham o'ylang. Bu misol 4 va 1 bilan cheklangan.",
            },
          ],
        },
        {
          title: "fib(0), fib(1), fib(6)",
          intro: [
            "Asos 0 va 1 ni o'zini qaytaradi. 6 ikki tarmoqqa bo'linadi. Natija 8. Tarmoqlar bir xil kichik sonni qayta hisoblaydi.",
          ],
          codeLabel: "fib.cpp",
          code: `#include <iostream>

int fib(int n) {
    if (n <= 1) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}

int main() {
    std::cout << fib(0) << "{{n}}";
    std::cout << fib(1) << "{{n}}";
    std::cout << fib(6) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `0
1
8`,
          analysis: [
            {
              lines: "11-12",
              text: "`fib(0)` asos, 0. `fib(1)` asos, 1. `n - 1` ga tushmaydi. Manfiy tomonga ketmaydi.",
            },
            {
              lines: "13",
              text: "`fib(6) = fib(5) + fib(4)`. Ketma-ketlik 0, 1, 1, 2, 3, 5, 8. Oltinchi, noldan sanaganda, 8. Ekranga 8.",
            },
            {
              lines: "7",
              text: "`fib(4)` chap tarmoqda ham, o'ng tarmoqning ichida ham hisoblanadi. Natija to'g'ri, ish esa qayta. `fib(6)` kichik, shuning uchun tez. Katta indeksda shu yozuv og'irlashadi.",
            },
            {
              lines: "asos",
              text: "`n <= 1` ikkala asosni ham ushlaydi. Faqat `n == 0` qo'yilsa, `fib(1)` `fib(0) + fib(-1)` ga tushardi va manfiy tomonda stek o'sardi. Chegara ikkala kichik holatni ham yopsin.",
            },
          ],
        },
        {
          title: "Kirish chuqurlashadi, chiqish ichkaridan tashqariga",
          intro: [
            "`qadam(3)` o'zini 2 va 1 bilan chaqiradi. Eng ichki chiqish birinchi yoziladi. Tashqi `n` o'z freymida kutadi.",
          ],
          codeLabel: "qadam.cpp",
          code: `#include <iostream>

void qadam(int n) {
    std::cout << "kirish " << n << "{{n}}";
    if (n > 1) {
        qadam(n - 1);
    }
    std::cout << "chiqish " << n << "{{n}}";
}

int main() {
    qadam(3);
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `kirish 3
kirish 2
kirish 1
chiqish 1
chiqish 2
chiqish 3`,
          analysis: [
            {
              lines: "12",
              text: "`qadam(3)`. 4-qator `kirish 3`. `3 > 1`, shuning uchun `qadam(2)` chaqiriladi. 8-qator hali kutadi. `n` 3 freymda turadi.",
            },
            {
              lines: "6, ichki",
              text: "`qadam(2)` o'z `n` i bilan yangi freym. `kirish 2`, keyin `qadam(1)`. `qadam(1)` da `1 > 1` yolg'on, ichkariga kirmaydi. `chiqish 1` yoziladi va qaytadi.",
            },
            {
              lines: "8",
              text: "`qadam(2)` endi 8-qatorga yetadi. `chiqish 2`. So'ng `qadam(3)` ning kutayotgan 8-qatori: `chiqish 3`. Ichki avval tugaydi.",
            },
            {
              lines: "uchta n",
              text: "Eng chuqur paytda uchta freym: 3, 2 va 1. Ularning `n` lari bir-birini bosmaydi. 1 qaytgach uning freymi yo'qoladi, 2 va 3 hali tirik.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`faktorial(4)` freymi `n` 4 ni ushlab, `faktorial(3)` ni chaqiradi. Yangi freym `n` 3. Tagida 2, tagida 1. To'rt freym bir vaqtda ochiq. `n` 1 `return 1` qiladi va yo'qoladi. 2 ning freymi `2 * 1` ni qaytaradi. 3 freymi `3 * 2`. 4 freymi `4 * 6 = 24`. Har bir ko'paytirish o'z freymidagi `n` bilan.",
          "`fib(6)` bir freymdan ikki chaqiruv chiqaradi. Chap tarmoq to'liq yig'ilmaguncha o'ng tarmoq boshlanmaydi, chunki `+` chapni kutadi. Bir xil `fib(4)` ikki marta, ikki alohida freym zanjirida hisoblanadi. Eslab qolish yo'q, har chaqiruv o'z ishini qaytadan qiladi.",
          "`qadam` da `chiqish` qatori ichki chaqiruvdan keyin turadi. Ichki freymlar yopilmaguncha tashqi freymning ko'rsatkichi shu `cout` ga yetmaydi. Shuning uchun konsolda barcha `kirish` lar avval, `chiqish` lar esa ichkaridan tashqariga.",
          "Asos bo'lmasa, yangi freym qo'yilaveradi. Stekning joyi tugaydi. Bu `int` ning toshishi emas. Toshish son qutisida, stack overflow esa freymlar uyumida. Ikkalasi ham katta `n` da uchrashi mumkin. Kichik misol ikkalasidan ham uzoq. Chegarasiz rekursiyani ishga tushirmang, u o'zi to'xtamaydi.",
        ],
        diagram: `faktorial(4)
  n[4] kutadi
    n[3] kutadi
      n[2] kutadi
        n[1] return 1
      return 2
    return 6
  return 24

qadam(3) eng chuqur payt:
  freym n=3, kirish yozilgan, chiqish kutadi
    freym n=2, kutadi
      freym n=1, chiqish 1
  keyin chiqish 2, keyin chiqish 3

asos yo'q:
  freym, freym, freym...
  stek to'ladi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Rekursiya xatosi stekni to'ldiradi yoki `int` ga sig'maydigan sonni noma'lum qilib qo'yadi. Konsol oddiy javob bermaydi.",
        ],
        items: [
          {
            title: "Asosiy holatni yozmaslik",
            why: [
              "`n - 1` bilan o'zini chaqirish to'xtamasdan davom etadi. Har safar yangi freym. Stek to'lib, dastur yiqiladi. Avval asos, keyin kichikroq chaqiruv.",
            ],
            wrong: `int faktorial(int n) {
    return n * faktorial(n - 1);
}`,
            right: `int faktorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * faktorial(n - 1);
}`,
          },
          {
            title: "Argumentni asosdan uzoqlashtirish",
            why: [
              "`n + 1` asosga yaqinlashmaydi. `n` o'saveradi. `n <= 1` hech qachon kelmaydi. Kichraytirish asos tomonga bo'lsin.",
            ],
            wrong: `if (n <= 1) {
    return 1;
}
return n * faktorial(n + 1);`,
            right: `if (n <= 1) {
    return 1;
}
return n * faktorial(n - 1);`,
          },
          {
            title: "Katta faktorialni int deb kutish",
            why: [
              "13! 32 bitli ishorali `int` ga sig'maydi. Rekursiya to'g'ri bo'lsa ham toshish noma'lum. Misolni kichik `n` da qoldiring. Fibonachchida ham katta indeks `int` dan oshadi va chaqiruvlar soni tez ko'payadi.",
            ],
            wrong: `std::cout << faktorial(13) << "{{n}}";`,
            right: `std::cout << faktorial(4) << "{{n}}";`,
          },
        ],
      },
      quiz: [
        {
          id: "7.9-q1",
          question: "`faktorial` da `n <= 1` bo'lsa 1, aks holda `n * faktorial(n - 1)`. `faktorial(4)` necha?",
          options: ["4", "10", "24", "120"],
          answer: 2,
          explanation:
            "4 * 3 * 2 * 1 = 24. faktorial(1) 1 qaytaradi va zanjir shu yerdan yig'iladi.",
        },
        {
          id: "7.9-q2",
          question: "`fib(0)` 0, `fib(1)` 1, keyin oldingi ikkisining yig'indisi. `fib(6)` necha?",
          options: ["5", "6", "8", "13"],
          answer: 2,
          explanation:
            "Ketma-ketlik 0, 1, 1, 2, 3, 5, 8. fib(6) bu 8. fib(5) bo'lsa 5, fib(7) bo'lsa 13.",
        },
        {
          id: "7.9-q3",
          question: "Asosiy holatsiz `faktorial` o'zini `n - 1` bilan chaqiraversa nima bo'ladi?",
          options: [
            "0 qaytadi",
            "int manfiyga o'ralib, o'zi to'xtaydi",
            "Stek to'lguncha yangi freym qo'yiladi, dastur odatda yiqiladi",
            "while kabi bitta freymda aylanadi",
          ],
          answer: 2,
          explanation:
            "Har chaqiruv yangi freym. Asos yo'q, freymlar yig'ilmaydi. Stek chegarasi yetganda stack overflow. Bu bitta freymdagi cheksiz while emas.",
        },
      ],
    },
  ],
};

export const chapter7 = decode(rawChapter);
