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
  id: "8",
  number: 8,
  title: "Massivlar va Matnlar",
  summary:
    "Bir qatordagi qutilar, indeks, chegaradan chiqish, jadval, C uslubidagi satr va std::string.",
  lessons: [
    {
      id: "8.1",
      navTitle: "Massiv va indeks",
      title: "Bir o'lchamli massiv: e'lon, ketma-ket joy va 0 dan indeks",
      goal: [
        "Bu darsdan keyin siz bir turdagi qiymatlarni bitta nom ostida, xotirada yonma-yon qator qilib e'lon qilasiz. Indeks birinchi katakdan necha qadam ekanini, nima uchun 0 dan boshlanishini va oxirgi joyning n - 1 ekanini tushuntirasiz. Sanoq funksiyaga o'zi bilan ketmasligini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Pochta qutilari bir devorda qator turadi. Qatorning nomi bor, masalan «baho». Har bir qutining o'z raqami bor. Raqam qutining ichidagi baho emas. Ichida 10 yotishi mumkin, quti esa qatorning boshidan hisoblanadi.",
          "Birinchi quti boshidan nol qadam. Siz joyida turibsiz, yon tomonga yurmagansiz. Shuning uchun uning indeksi 0. Keyingisi bir qadam, indeksi 1. To'rtta quti bo'lsa, qadamlar 0, 1, 2, 3. To'rtinchi qadam degan narsa yo'q: u qatorning tashqarisidagi devor.",
          "Qutilar orasida bo'sh joy qoldirilmaydi. 0 dan keyin darrov 1, keyin 2. Xotirada ham shunday: bir int tugasa, keyingi int shu zahoti boshlanadi. Qidirishda «nom + necha qadam» yetadi. Alohida manzil ro'yxati shart emas.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Massiv bir xil turdagi elementlarning ketma-ket qatori. Sanoq qavs ichida, doimiy ifoda. Indeks ham qavs ichida, 0 dan. Oxirgi yaroqli indeks sanoq minus 1.",
        ],
        items: [
          {
            title: "E'lon va boshlang'ich qiymat",
            paragraphs: [
              "`int baho[4];` to'rtta `int` ochadi. Lokal bo'lsa, ichi yozilmagan. O'qish noma'lum. Avval yozing, keyin o'qing.",
              "`int baho[4] = {8, 9, 7, 10};` to'rtta qiymatni tartib bilan qo'yadi. `int baho[] = {8, 9, 7, 10};` sanog'ini ro'yxatdan chiqaradi, yana 4. `int son[5] = {4, 7};` qolgan uchta katakni nol qiladi. `int son[5] = {};` hammasini nol qiladi.",
              "Ro'yxat sig'masa, kod yig'ilmaydi. `int a[2] = {1, 2, 3};` ortiqcha boshlang'ich qiymat. Massivni boshqa massivga `a = b` deb nusxalab bo'lmaydi. Elementma-element yoziladi.",
            ],
            code: `int baho[4] = {8, 9, 7, 10};
int son[5] = {4, 7};
int nol[5] = {};`,
            codeLabel: "to'liq, qisman, nol",
          },
          {
            title: "Indeks nima uchun 0 dan",
            paragraphs: [
              "Indeks qiymat emas. U birinchi elementdan necha element narida ekaningiz. `baho[0]` boshidagi quti, ichida 8. `baho[3]` uch qadam naridagi quti, ichida 10. To'rtta elementda to'rtinchi indeks yo'q.",
              "Agar indeks 1 dan boshlansa, birinchi quti «1 qadam» bo'lib qolardi, holbuki u boshning o'zida. 0 shu farqni yo'qotadi: manzil = bosh + indeks * bitta elementning o'lchami. Birinchi element uchun qo'shiladigan masofa 0.",
              "Oxirgi indeks `soni - 1`. Sanoq 4 bo'lsa, yaroqli indekslar 0, 1, 2, 3. `baho[4]` qatorning tashqarisi. Bu 8.3-darsdagi xato.",
            ],
            code: `int baho[4] = {8, 9, 7, 10};
baho[0] = 8;
baho[3] = 10;`,
            codeLabel: "0 va oxirgi joy",
            table: {
              caption: "To'rtta baho. Indeks qadam, qiymat qutining ichi.",
              headers: ["Indeks", "Qadam", "Qiymat"],
              rows: [
                ["0", "boshning o'zi", "8"],
                ["1", "1 ta int narida", "9"],
                ["2", "2 ta int narida", "7"],
                ["3", "3 ta int narida, oxirgi", "10"],
              ],
            },
          },
          {
            title: "Sanoq funksiyaga o'zi bilan ketmaydi",
            paragraphs: [
              "`main` ichida `sizeof(baho) / sizeof(baho[0])` element sonini beradi. Ikkala tomon ham element o'lchamiga ko'paygan, bo'linma sanoq. Bayt soni muhitga bog'liq bo'lishi mumkin, bo'linma esa shu massivning elementi.",
              "Funksiya parametri `int a[4]` yoki `int a[]` massivning nusxasi emas. Ichkariga qatorning boshi ketadi, `[4]` esa eslab qolinmaydi. Funksiya nechta element borligini shu imzodan bilmaydi. Sanoqni alohida argument qiling: `void yoz(int a[], int soni)`.",
              "Sikl `i` ni 0 dan `soni` gacha, `i < soni` bilan yuradi. `i <= soni` bitta ortiqcha qadam. Tana ichida `a[i]` shu qadamdagi quti.",
            ],
            code: `void yoz(int a[], int soni) {
    for (int i = 0; i < soni; ++i) {
        std::cout << a[i] << "{{n}}";
    }
}`,
            codeLabel: "sanoq alohida argument",
          },
        ],
      },
      examples: [
        {
          title: "To'rtta baho, indeks 0 dan 3 gacha",
          intro: [
            "Har bir qatorda avval indeks, keyin shu katakdagi baho. Sanoq 4, oxirgi indeks 3.",
          ],
          codeLabel: "baho.cpp",
          code: `#include <iostream>

int main() {
    int baho[4] = {8, 9, 7, 10};
    for (int i = 0; i < 4; ++i) {
        std::cout << i << ": " << baho[i] << "{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `0: 8
1: 9
2: 7
3: 10`,
          analysis: [
            {
              lines: "4",
              text: "To'rtta `int` yonma-yon ochiladi. 0-katak 8, 1-katak 9, 2-katak 7, 3-katak 10. 8 qiymat, 0 esa uning o'rni.",
            },
            {
              lines: "5",
              text: "`i` 0, 1, 2, 3 bo'ladi. Shart `i < 4`. `i` 4 bo'lganda tana ochilmaydi. To'rt marta, to'rtta element.",
            },
            {
              lines: "6",
              text: "`baho[i]` shu qadamdagi qutini o'qiydi. Birinchi aylanish `baho[0]`, ya'ni 8. Ekranda `0: 8`. Keyin `1: 9`, `2: 7`, `3: 10`.",
            },
            {
              lines: "8",
              text: "`return 0` `main` ni tugatadi. Massiv lokal, funksiya yopilganda qator ham yo'qoladi.",
            },
          ],
        },
        {
          title: "Qisman ro'yxat qolganini nol qiladi",
          intro: [
            "Beshta katak, ikkita qiymat. Yozilmagan uchta joy 0. Bu tasodifiy qoldiq emas, qisman boshlang'ich qiymatning qoidasi.",
          ],
          codeLabel: "qisman.cpp",
          code: `#include <iostream>

int main() {
    int son[5] = {4, 7};
    for (int i = 0; i < 5; ++i) {
        std::cout << son[i];
        if (i < 4) {
            std::cout << " ";
        }
    }
    std::cout << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `4 7 0 0 0`,
          analysis: [
            {
              lines: "4",
              text: "`son[0]` 4, `son[1]` 7. `son[2]`, `son[3]`, `son[4]` ro'yxatda yo'q, shuning uchun 0. Sanoq baribir 5.",
            },
            {
              lines: "5-10",
              text: "Besh marta chiqarish. Orada probel, oxirgi sondan keyin emas. `i < 4` shu uchun. Qator `4 7 0 0 0`.",
            },
            {
              lines: "11",
              text: "Yangi qator sikldan keyin. Har bir sonning yonida `{{n}}` bo'lsa, ular ustma-ust tushardi. Bu yerda bitta qator.",
            },
            {
              lines: "qoid",
              text: "`int son[5];` deb yozib, qiymat bermasangiz, lokal qutilar nol bo'lib qolmaydi. O'qish noma'lum. Nol kerak bo'lsa, `= {4, 7}` yoki `= {}` yozing.",
            },
          ],
        },
        {
          title: "Funksiya sanoqni alohida oladi",
          intro: [
            "`yoz` massivning boshini va 4 ni oladi. U o'zi nechta ekanini imzodan bilmaydi. Konsol to'rtta baho.",
          ],
          codeLabel: "uzatish.cpp",
          code: `#include <iostream>

void yoz(int a[], int soni) {
    for (int i = 0; i < soni; ++i) {
        std::cout << a[i];
        if (i < soni - 1) {
            std::cout << " ";
        }
    }
    std::cout << "{{n}}";
}

int main() {
    int baho[4] = {8, 9, 7, 10};
    yoz(baho, 4);
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `8 9 7 10`,
          analysis: [
            {
              lines: "3",
              text: "`int a[]` qatorning nusxasi emas. Parametrdagi qavs bo'sh. `[4]` yozilsa ham, funksiya shu to'rtni eslab qolmaydi. Sanoq ikkinchi parametr `soni`.",
            },
            {
              lines: "4-10",
              text: "`i` 0 dan `soni` gacha. `soni` 4 bo'lsa, indekslar 0, 1, 2, 3. Probel oxirgi elementdan oldin. 10-qator bitta yangi qator qo'yadi.",
            },
            {
              lines: "14-15",
              text: "`baho` ning o'zi emas, boshi uzatiladi. `4` ni chaqiruvchi yozadi. Funksiya shu 4 tagacha o'qiydi. `yoz(baho, 5)` desangiz, beshinchi qadam chegaradan tashqari, 8.3-dars.",
            },
            {
              lines: "16",
              text: "`main` qaytadi. `baho` shu funksiyaning lokali. `yoz` ichidagi `i` ham o'sha chaqiruv tugashi bilan yo'qoladi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`int baho[4] = {8, 9, 7, 10};` bitta uzilmagan bo'lak. Birinchi `int` manzili A bo'lsa, keyingisi A ga bitta `int` ning baytini qo'shgan joy. Shu kitobdagi Windowsda `int` 4 bayt, shuning uchun qadamlar A, A+4, A+8, A+12. Butun qator 16 bayt. A ning aniq soni dastur har gal ochilganda boshqacha bo'lishi mumkin, shuning uchun harf bilan yozamiz.",
          "Indeks shu qadamlarning soni. `baho[0]` masofa 0, ya'ni A ning o'zi. `baho[3]` uch qadam, A+12, oxirgi quti. `baho[4]` A+16 bo'lardi, bu qatorga ajratilgan joydan keyin. U yerga o'tish 8.3-darsda.",
          "`sizeof(baho)` shu to'liq bo'lakning bayti, `main` ichida, massiv haqiqiy massiv bo'lib turgan joyda. `sizeof(baho[0])` bitta element. Bo'linmasi 4. `int` 8 baytli muhitda bo'lak 32 bayt bo'lishi mumkin, bo'linma baribir 4, chunki ikkala tomon ham o'sadi. Sanoqni bayt sonidan yodlamang.",
          "`yoz(baho, 4)` chaqiruvida funksiya freymiga butun 16 bayt nusxalanmaydi. Freymga bosh manzil va `soni` ning o'z qiymati, 4, tushadi. `a[i]` shu manzildan `i` qadam. `main` dagi qutilar o'sha joyda qoladi. Funksiya ularni o'zgartirsa, `main` ham o'sha o'zgarishni ko'radi. Bu 7.4 dagi oddiy `int` nusxasidan boshqa.",
          "Lokal massiv `main` yopilganda bo'shaydi. Global massivga boshlang'ich qiymat yozilmasa, nol bilan ochiladi. Lokalda bunday kafolat yo'q.",
        ],
        diagram: `baho: 4 ta int, uzilmagan
indeks:   0      1      2      3
qiymat:  [8]    [9]    [7]    [10]
manzil:   A     A+4    A+8    A+12

qadam = indeks * sizeof(int)
Windowsda sizeof(int) odatda 4, qator 16 bayt
baho[4] bu A+16, ajratilgan joydan tashqari

yoz(baho, 4)
  freym: bosh manzil A, soni 4
  16 bayt nusxalanmaydi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Massiv xatosi ko'pincha indeksni qiymat bilan adashtirish yoki oxirgi joyni sanoq deb o'qish. Kod yig'ilishi mumkin, quti esa boshqa.",
        ],
        items: [
          {
            title: "Oxirgi elementni a[n] deb o'qish",
            why: [
              "Sanoq 4. Oxirgi indeks 3. `baho[4]` to'rt qadam, qator tugagan joy. Yaroqli oxirgi quti `baho[3]` yoki `baho[soni - 1]`.",
            ],
            wrong: `int baho[4] = {8, 9, 7, 10};
std::cout << baho[4] << "{{n}}";`,
            right: `int baho[4] = {8, 9, 7, 10};
std::cout << baho[3] << "{{n}}";`,
          },
          {
            title: "Lokal massivni yozmasdan o'qish",
            why: [
              "`int baho[4];` qutilarni ochadi, ichini yozmaydi. `baho[0]` ni darrov chiqarish noma'lum. Nol kerak bo'lsa, `= {}` yoki aniq ro'yxat. Globaldagi nol qoidasini lokalga ko'chirmang.",
            ],
            wrong: `int baho[4];
std::cout << baho[0] << "{{n}}";`,
            right: `int baho[4] = {8, 9, 7, 10};
std::cout << baho[0] << "{{n}}";`,
          },
          {
            title: "Funksiya ichida sizeof dan sanoq kutish",
            why: [
              "Parametr `int a[4]` bo'lsa ham, funksiya to'rtta `int` ning nusxasini ushlamaydi. `sizeof(a) / sizeof(a[0])` shu yerda element sonini bermaydi. Sanoqni chaqiruvchi `soni` qilib yuboradi. Noto'g'ri sanoq keyin chegaradan chiqib ketadi.",
            ],
            wrong: `void yoz(int a[4]) {
    int soni = sizeof(a) / sizeof(a[0]);
}`,
            right: `void yoz(int a[], int soni) {
    for (int i = 0; i < soni; ++i) {
        std::cout << a[i] << "{{n}}";
    }
}`,
          },
        ],
      },
      quiz: [
        {
          id: "8.1-q1",
          question: "`int baho[4]` da oxirgi yaroqli indeks qaysi?",
          options: ["4", "3", "5", "1"],
          answer: 1,
          explanation:
            "Sanoq 4 ta quti. Qadamlar 0, 1, 2, 3. Oxirgisi 3, ya'ni 4 - 1. baho[4] qatorning tashqarisi.",
        },
        {
          id: "8.1-q2",
          question: "Birinchi elementning indeksi nima uchun 0?",
          options: [
            "U qator boshidan 0 qadam narida",
            "Ichidagi qiymat ham 0 bo'lishi shart",
            "Oxirgi element shunday belgilanadi",
            "sizeof har doim 0 qaytaradi",
          ],
          answer: 0,
          explanation:
            "Indeks masofa. Birinchi quti boshning o'zida, qo'shimcha qadam yo'q. Ichidagi son 8 bo'lishi mumkin, o'rni baribir 0.",
        },
        {
          id: "8.1-q3",
          question: "`int son[5] = {4, 7};` dan keyin `son[3]` necha?",
          options: ["7", "4", "0", "kod yig'ilmaydi"],
          answer: 2,
          explanation:
            "Ro'yxatdagi 4 va 7 birinchi ikki katak. Qolgan uchta, jumladan indeks 3, nol qilinadi. Bu yozilmagan lokal massiv emas.",
        },
      ],
    },
    {
      id: "8.2",
      navTitle: "Yig'indi va teskari",
      title: "Massiv ustida amal: eng katta, eng kichik, yig'indi, teskari tartib",
      goal: [
        "Bu darsdan keyin siz qatorni bir marta aylanib, eng katta va eng kichik elementni birinchi qutidan boshlab topasiz. Yig'indini 0 dan yig'asiz. Qatorni joyida, ikki chetdan, yarmi marta almashtirib teskarisiga o'girasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Raqam yozilgan kartochkalar qator turadi. Eng baland bahoni topish uchun birinchisini hozircha g'olib deb ushlaysiz. Keyingi kartochka undan katta bo'lsa, g'olibni almashtirasiz. Noldan boshlamaysiz: qo'ldagi kartochkalar hammasi manfiy bo'lishi mumkin, nol esa qatorda yo'q.",
          "Yig'indi bo'sh quti, avval 0. Har bir kartochkani shu qutiga qo'shasiz. Quti yozilmagan bo'lsa, ichida nima yotgani noma'lum, qo'shish ham noma'lum.",
          "Teskari tartib: chap va o'ng chetdagi kartochkani almashtirasiz, keyin bir qadam ichkariga. O'rtada bitta qolsa, uni qo'zg'atmaysiz. Butun qatorni yana bir marta yursangiz, kartochkalar o'z joyiga qaytadi. Ikki marta teskari qilish bekor.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Qatorni `for` aylantiradi. Eng katta va eng kichik `a[0]` dan boshlanadi. Yig'indi 0 dan. Teskari almashtirish `i` va `n - 1 - i` o'rtasida, `i < n / 2` marta.",
        ],
        items: [
          {
            title: "Eng katta va eng kichik",
            paragraphs: [
              "`katta` va `kichik` dastlab `a[0]`. Sikl `i = 1` dan, chunki 0 allaqachon qo'lda. `a[i] > katta` bo'lsa, `katta` yangilanadi. `a[i] < kichik` bo'lsa, `kichik` yangilanadi.",
              "0 dan boshlash manfiy qatorda yolg'on g'olib beradi. `{-5, -1, -8}` ichida eng katta −1. 0 bu qatorda yo'q. Birinchi element har doim qatordagi haqiqiy son.",
              "Kamida bitta element kerak. Bo'sh qatordan `a[0]` o'qilmaydi. Bu darslardagi massivlarning sanog'i 1 dan katta.",
            ],
            code: `int katta = a[0];
int kichik = a[0];
for (int i = 1; i < soni; ++i) {
    if (a[i] > katta) katta = a[i];
    if (a[i] < kichik) kichik = a[i];
}`,
            codeLabel: "birinchi elementdan",
          },
          {
            title: "Yig'indi",
            paragraphs: [
              "`int yigindi = 0;` keyin `yigindi += a[i];` har bir elementni qo'shadi. Tartib yig'indi natijasini o'zgartirmaydi. 3, 1, 4, 2 yig'indisi 10.",
              "`yigindi` yozilmasa, birinchi `+=` noma'lum son ustida. 0 ni «o'zi nol bo'lib qoladi» deb qoldirmang. Lokal `int` nol emas.",
              "Ishoralı `int` ga sig'maydigan yig'indi noma'lum. Bu misollar kichik. Katta qatorda yig'indini sig'adigan turda tuting yoki qo'shishdan oldin chegarani o'ylang.",
            ],
            code: `int yigindi = 0;
for (int i = 0; i < soni; ++i) {
    yigindi += a[i];
}`,
            codeLabel: "noldan yig'ish",
          },
          {
            title: "Joyida teskari",
            paragraphs: [
              "Chap indeks `i`, o'ng indeks `n - 1 - i`. `i` 0 bo'lsa, o'ng oxirgi element. Vaqtinchalik qutiga chapni oling, chapga o'ngni yozing, o'ngga vaqtinchalikni qo'ying.",
              "Sikl `i < n / 2`. Butun sonli bo'linish yarmi pastga. 5 / 2 bu 2. O'rtadagi element, indeks 2, o'z joyida qoladi. Juft sonda ham juftliklar to'liq almashadi, o'rta qolmaydi.",
              "`i < n` qilib yursangiz, har juftlik ikki marta almashadi. Qator boshidagi tartibga qaytadi. Teskari ko'rinadi, keyin yo'qoladi.",
            ],
            code: `for (int i = 0; i < n / 2; ++i) {
    int vaqt = a[i];
    a[i] = a[n - 1 - i];
    a[n - 1 - i] = vaqt;
}`,
            codeLabel: "yarmi marta almashtirish",
          },
        ],
      },
      examples: [
        {
          title: "Manfiy qatorda eng katta −1, eng kichik −8",
          intro: [
            "Qator −5, −1, −8, −3. G'olib 0 dan emas, birinchi elementdan. Eng katta −1, eng kichik −8.",
          ],
          codeLabel: "chegara.cpp",
          code: `#include <iostream>

int main() {
    int a[4] = {-5, -1, -8, -3};
    int katta = a[0];
    int kichik = a[0];
    for (int i = 1; i < 4; ++i) {
        if (a[i] > katta) {
            katta = a[i];
        }
        if (a[i] < kichik) {
            kichik = a[i];
        }
    }
    std::cout << katta << "{{n}}";
    std::cout << kichik << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `-1
-8`,
          analysis: [
            {
              lines: "4-6",
              text: "`a[0]` −5. `katta` ham, `kichik` ham −5. Hali boshqa kartochka ko'rilmagan. 0 bu o'zgaruvchilarda yo'q.",
            },
            {
              lines: "7-10",
              text: "Sikl `i` 1, 2, 3. 8-qator katta ekanini so'raydi. `i` 1: −1 > −5, `katta` −1 bo'ladi. `i` 2 va `i` 3 da −8 ham, −3 ham −1 dan katta emas.",
            },
            {
              lines: "11-13",
              text: "Shu aylanishning ikkinchi tekshiruvi. `i` 1: −1 < −5 emas. `i` 2: −8 < −5, `kichik` −8. `i` 3: −3 < −8 emas. Yakun: `katta` −1, `kichik` −8.",
            },
            {
              lines: "15-16",
              text: "Avval −1, keyin −8. Agar `katta` 0 dan boshlanganida, hech bir manfiy son 0 dan katta emas, ekranda 0 chiqardi. 0 qatorda yo'q.",
            },
          ],
        },
        {
          title: "To'rtta sonning yig'indisi 10",
          intro: [
            "3, 1, 4, 2. Yig'indi 0 dan boshlanadi. Har bir qadamda bitta son qo'shiladi.",
          ],
          codeLabel: "yigindi.cpp",
          code: `#include <iostream>

int main() {
    int a[4] = {3, 1, 4, 2};
    int yigindi = 0;
    for (int i = 0; i < 4; ++i) {
        yigindi += a[i];
    }
    std::cout << yigindi << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `10`,
          analysis: [
            {
              lines: "5",
              text: "`yigindi` aniq 0. Bo'sh jami. Lokal `int` ni yozmasdan qoldirish shu yerda xato bo'lardi.",
            },
            {
              lines: "6-8",
              text: "`i` 0: 0+3=3. `i` 1: 3+1=4. `i` 2: 4+4=8. `i` 3: 8+2=10. `i` 4 da shart yiqiladi. To'rtta qo'shish, to'rtta element.",
            },
            {
              lines: "9",
              text: "Ekranda 10. Elementlarning o'zi o'zgarmagan. Yig'indi alohida quti.",
            },
            {
              lines: "sig'im",
              text: "10 `int` ga sig'adi. Yig'indi `INT_MAX` dan oshsa, ishorali toshish noma'lum. Kichik misolni katta qatorga ko'r-ko'rona ko'chirmang.",
            },
          ],
        },
        {
          title: "Besh element joyida teskariga o'giriladi",
          intro: [
            "1 2 3 4 5. Ikki almashtirish. O'rtadagi 3 qoladi. Natija 5 4 3 2 1.",
          ],
          codeLabel: "teskari.cpp",
          code: `#include <iostream>

int main() {
    const int n = 5;
    int a[n] = {1, 2, 3, 4, 5};
    for (int i = 0; i < n / 2; ++i) {
        int vaqt = a[i];
        a[i] = a[n - 1 - i];
        a[n - 1 - i] = vaqt;
    }
    for (int i = 0; i < n; ++i) {
        std::cout << a[i];
        if (i < n - 1) {
            std::cout << " ";
        }
    }
    std::cout << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `5 4 3 2 1`,
          analysis: [
            {
              lines: "4-5",
              text: "`n` doimiy 5, massiv chegarasi shu bilan yoziladi. Elementlar 1, 2, 3, 4, 5. Indekslar 0 dan 4 gacha.",
            },
            {
              lines: "6-10",
              text: "`n / 2` butun bo'linish, 2. `i` faqat 0 va 1. `i` 0: 0 va 4 almashadi, qator 5, 2, 3, 4, 1. `i` 1: 1 va 3 almashadi, qator 5, 4, 3, 2, 1. Indeks 2 tegilmaydi.",
            },
            {
              lines: "8",
              text: "`n - 1 - i` o'ng juft. `i` 0 da 4, `i` 1 da 3. `vaqt` bo'lmasa, chapdagi son ikkinchi yozuvdan oldin yo'qoladi.",
            },
            {
              lines: "11-17",
              text: "Ikkinchi sikl tayyor qatorni chiqaradi. Probel oxirgisidan oldin. Ekran `5 4 3 2 1`. Agar birinchi sikl `i < n` bo'lsa, juftliklar yana almashib, 1 2 3 4 5 qaytardi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`katta` va `kichik` massivdan tashqari, o'z qutilari. Ularga elementning nusxasi yoziladi. `katta = a[i]` qatordagi qutini ko'chirmaydi, sonni nusxalaydi. Qator −5, −1, −8, −3 bo'lib turadi. O'zgaradigan joy `katta` va `kichik`.",
          "`yigindi` ham alohida `int`. Har `+=` shu bitta qutini yangilaydi. To'rtta element qo'shilganda qatorda to'rtta quti, yig'indida bitta. Elementlar yig'indiga qo'shilib «tugab» ketmaydi.",
          "Teskari aylanishda uchinchi quti `vaqt` ochiladi, chapdagi sonni ushlaydi, keyin ikki joy yoziladi, `vaqt` sikl tanasi tugashi bilan yo'qoladi. Keyingi `i` yangi `vaqt`. Qatorning o'zi shu joyda qoladi, yangi massiv ochilmaydi. Besh `int` avval ham, keyin ham besh `int`.",
          "`i < n` bo'lgan xato variantda ham joy yetadi, chunki indekslar 0 dan 4 gacha yaroqli. Xato chegaradan chiqish emas, ikki marta almashtirish. Natija eskisiga qaytadi. `i <= n` bo'lsa, oxirgi qadam allaqachon tashqari, bu 8.3.",
        ],
        diagram: `a:  [-5] [-1] [-8] [-3]
katta: [-5], keyin [-1]
kichik: [-5], keyin [-8]
qator o'zgarmaydi

yig'indi qutisi: 0 -> 3 -> 4 -> 8 -> 10

teskari, bitta massiv:
[1][2][3][4][5]
i=0  chetlar almashadi
[5][2][3][4][1]
i=1
[5][4][3][2][1]
o'rta [3] turadi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Amal xatosi ko'pincha boshlang'ich qiymatda. Kod yig'iladi. Manfiy qatorda eng katta 0 chiqadi yoki teskari o'girish o'zini bekor qiladi.",
        ],
        items: [
          {
            title: "Eng kattani 0 dan boshlash",
            why: [
              "`{-5, -1, -8}` da hech kim 0 dan katta emas. `katta` 0 da qoladi. 0 qator elementi emas. Birinchi elementdan boshlang.",
            ],
            wrong: `int katta = 0;
for (int i = 0; i < 3; ++i) {
    if (a[i] > katta) katta = a[i];
}`,
            right: `int katta = a[0];
for (int i = 1; i < 3; ++i) {
    if (a[i] > katta) katta = a[i];
}`,
          },
          {
            title: "Yig'indini yozmasdan qoldirish",
            why: [
              "Lokal `yigindi` nol emas. `+=` noma'lum qiymatga qo'shiladi. Natijani «ba'zan 10 chiqdi» deb qabul qilmang. Avval 0.",
            ],
            wrong: `int yigindi;
for (int i = 0; i < 4; ++i) {
    yigindi += a[i];
}`,
            right: `int yigindi = 0;
for (int i = 0; i < 4; ++i) {
    yigindi += a[i];
}`,
          },
          {
            title: "Teskari siklni butun uzunlikka cho'zish",
            why: [
              "`i < n` har juftlikni ikki marta almashtiradi. `{1, 2, 3}` avval 3, 2, 1 bo'ladi, oxirida yana 1, 2, 3. Yarmi yetadi: `i < n / 2`.",
            ],
            wrong: `for (int i = 0; i < n; ++i) {
    int vaqt = a[i];
    a[i] = a[n - 1 - i];
    a[n - 1 - i] = vaqt;
}`,
            right: `for (int i = 0; i < n / 2; ++i) {
    int vaqt = a[i];
    a[i] = a[n - 1 - i];
    a[n - 1 - i] = vaqt;
}`,
          },
        ],
      },
      quiz: [
        {
          id: "8.2-q1",
          question: "`int a[3] = {-5, -1, -8};` va `katta` dastlab `a[0]`. Sikl qolganini solishtiradi. `katta` nimaga teng bo'ladi?",
          options: ["0", "-1", "-5", "-8"],
          answer: 1,
          explanation:
            "Boshlanish −5. −1 undan katta, −8 emas. Eng katta −1. 0 qatorda yo'q, u g'olib bo'lmaydi.",
        },
        {
          id: "8.2-q2",
          question: "`{1, 2, 3}` ni `i < n` bilan, ya'ni uch marta, ikki chetdan almashtirsangiz qator nima bo'ladi?",
          options: [
            "3 2 1 bo'lib qoladi",
            "1 2 3 ga qaytadi",
            "kod yig'ilmaydi",
            "faqat o'rtasi almashadi",
          ],
          answer: 1,
          explanation:
            "Birinchi almashuv 3 2 1 qiladi. O'rta o'zi bilan almashadi. Uchinchi almashuv chetlarni yana ag'daradi, 1 2 3 qaytadi. To'xtash yarmida.",
        },
        {
          id: "8.2-q3",
          question: "`{3, 1, 4, 2}` yig'indisi, `yigindi` 0 dan boshlangan bo'lsa, necha?",
          options: ["4", "9", "10", "24"],
          answer: 2,
          explanation:
            "3+1=4, 4+4=8, 8+2=10. To'rtta qo'shish. 24 ko'paytma bo'lardi, bu yig'indi.",
        },
      ],
    },
    {
      id: "8.3",
      navTitle: "Chegaradan chiqish",
      title: "Massiv chegarasidan chiqish: eng xavfli xato",
      goal: [
        "Bu darsdan keyin siz yaroqli indekslar 0 dan n - 1 gacha ekanini tekshirasiz. C++ xom massivda bu chegarani o'zi ushlamaydi. Tashqaridagi o'qish va yozish noma'lum ekanini, dastur ba'zan jim ishlab, ba'zan keyinroq yiqilishini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Devorda uchta pochta qutisi bor, raqamlari 0, 1, 2. Siz 3-qutini ochmoqchisiz. U yerda quti yo'q. Qo'shni xonaning javoni, yoki bo'sh g'isht, yoki umuman boshqa odamning xati turishi mumkin. Bino sizga «3-quti yo'q» deb yozib bermaydi. Qo'l yetgan narsani ushlaysiz.",
          "Ba'zan qo'shnining xati o'qiladigandek bo'ladi va siz «ishladi» deysiz. Ertaga javon boshqa joyga suriladi, qo'l devorga uriladi. Kecha chiqqan natija bugun ham chiqadi degani emas. Qoida bino ichida yo'q, qoida sizda: qadam 0, 1 yoki 2.",
          "Himoya eshik oldidagi ro'yxat. Qadamni aytsangiz, ro'yxatdan qidirasiz. Yo'q bo'lsa, qutini ochmaysiz, «bunday quti yo'q» deysiz. C++ bu ro'yxatni o'zi osib qo'ymaydi. Ro'yxatni `if` bilan siz yozasiz.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Sanoq `n` bo'lsa, yaroqli indeks `0 <= i && i < n`. `a[n]` tashqarida. `a[-1]` ham tashqarida. Xom massiv bu tekshiruvni bajarmaydi. Tashqariga o'tish noma'lum xatti-harakat.",
        ],
        items: [
          {
            title: "Oxirgi qadam n - 1",
            paragraphs: [
              "`int a[4]` indekslari 0, 1, 2, 3. Sanoq 4, oxirgi indeks 3. `i < 4` to'g'ri. `i <= 4` besh marta kiradi: 0, 1, 2, 3 va 4. To'rtinchi qadamda quti yo'q.",
              "`i <= n - 1` va `i < n` bir xil, `n` 4 bo'lsa `i <= 3`. Adashish `i <= n` da. Sanoqni shartning o'ng tomoniga qo'yib, `<=` ni ham qo'yib yuborish bitta ortiq.",
              "Sikl tanasi oxirgi gal `i` teng `n - 1` bo'lganda kirishi kerak. `i` teng `n` bo'lganda shart yiqiladi, tana ochilmaydi.",
            ],
            code: `const int n = 4;
for (int i = 0; i < n; ++i) {
    std::cout << a[i] << "{{n}}";
}`,
            codeLabel: "i < n",
            table: {
              caption: "int a[4] uchun i <= 4. Oxirgi qator allaqachon tashqari.",
              headers: ["i", "i < 4", "i <= 4", "a[i]"],
              rows: [
                ["0", "rost", "rost", "joyida"],
                ["1", "rost", "rost", "joyida"],
                ["2", "rost", "rost", "joyida"],
                ["3", "rost", "rost", "oxirgi joy"],
                ["4", "yolg'on", "rost", "tashqari, noma'lum"],
              ],
            },
          },
          {
            title: "Til xato yozmaydi",
            paragraphs: [
              "`a[4]` yozuvi yig'iladi, agar 4 o'zgaruvchi bo'lsa. Kompilyator har bir chaqiruvda indeksi oldindan bilmasligi mumkin. U «ishlatishdan oldin tekshir» degan kodni qo'shmaydi.",
              "Standart bunday o'qish va yozishga ma'no bermaydi. Dastur to'xtashi shart emas. Xato xabari chiqishi shart emas. Istisno uloqtirilishi shart emas. Qo'shni o'zgaruvchi o'zgarishi ham, jim «tasodifiy» son chiqishi ham, keyinroq butunlay boshqa qatorda yiqilish ham shu noma'lumlikning ichida.",
              "«Mening kompyuterimda 0 chiqdi» kuzatuv. Qoida emas. Boshqa kompilyator, boshqa bayroq, boshqa kuni boshqa natija berishi mumkin. Chegarani buzgan dasturni tuzatilgan deb bo'lmaydi.",
            ],
          },
          {
            title: "Tekshiruvni o'zingiz yozasiz",
            paragraphs: [
              "`if (i >= 0 && i < n)` rost bo'lsa, `a[i]` yaroqli. Aks holda qutini ochmang. `&&` chapni avval ko'radi. Salbiy `i` da o'ng tomon kerak bo'lmasa ham, qutiga kirmaysiz, chunki tana ochilmaydi.",
              "Tekshiruv massivni sekinlashtiradigan sehr emas. U oddiy solishtirish. Xom `a[i]` ichida yashirin nusxasi yo'q. `std::vector` va `.at` bu kitobning keyingi qismi. Hozir chegarani `for` ning o'zi ushlasin: `i` 0 dan, `i < n`.",
              "Funksiyaga noto'g'ri `soni` yuborish ham shu xato. Massiv 4 ta, siz 5 desangiz, funksiya beshinchi qadamni qo'yadi. Sanoq haqiqiy element soni bo'lsin.",
            ],
            code: `if (i >= 0 && i < n) {
    std::cout << a[i] << "{{n}}";
} else {
    std::cout << "chegaradan tashqari{{n}}";
}`,
            codeLabel: "avval tekshir, keyin o'qi",
          },
        ],
      },
      examples: [
        {
          title: "To'rtta element, to'rt qadam, hammasi joyida",
          intro: [
            "`i < 4` indekslar 0, 1, 2, 3. Har bir `a[i]` ajratilgan quti. Konsol `5 6 7 8`.",
          ],
          codeLabel: "joyida.cpp",
          code: `#include <iostream>

int main() {
    int a[4] = {5, 6, 7, 8};
    for (int i = 0; i < 4; ++i) {
        std::cout << a[i];
        if (i < 3) {
            std::cout << " ";
        }
    }
    std::cout << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `5 6 7 8`,
          analysis: [
            {
              lines: "4",
              text: "To'rtta quti: 5, 6, 7, 8. Ularning indeksi 0, 1, 2, 3. Boshqa quti ajratilmagan.",
            },
            {
              lines: "5",
              text: "`i` 0, 1, 2, 3. `i` 4 bo'lganda `i < 4` yolg'on, tana yo'q. Oxirgi o'qilgan `a[3]`, qiymat 8.",
            },
            {
              lines: "6-9",
              text: "To'rtta son bitta qatorda. Probel uchtadan keyin qo'yilmaydi. Natija `5 6 7 8`.",
            },
            {
              lines: "shart",
              text: "`i <= 4` bo'lsa, tana besh marta ochilardi. Beshinchi gal `a[4]`. U qatorga kirmaydi. Bu dasturning konsoli yo'q, chunki u dasturni ishga tushirmaymiz. Natija va'da qilinmagan.",
            },
          ],
        },
        {
          title: "Indeks 3, sanoq 3: quti ochilmaydi",
          intro: [
            "Uchta element, so'ralgan indeks 3. Tekshiruv yiqiladi. `a[3]` umuman yozilmaydi. Ekranda xabar, tasodifiy son emas.",
          ],
          codeLabel: "tekshir.cpp",
          code: `#include <iostream>

int main() {
    int a[3] = {1, 2, 3};
    int i = 3;
    if (i >= 0 && i < 3) {
        std::cout << a[i] << "{{n}}";
    } else {
        std::cout << "indeks " << i << " chegaradan tashqari{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `indeks 3 chegaradan tashqari`,
          analysis: [
            {
              lines: "4-5",
              text: "Qutilar 0, 1, 2. `i` 3. 3 yaroqli indeks emas. `a` hali tegilmagan.",
            },
            {
              lines: "6",
              text: "`i >= 0` rost, `i < 3` yolg'on. `&&` butun shartni yolg'on qiladi. 7-qator, ya'ni `a[i]`, ishlamaydi.",
            },
            {
              lines: "8-9",
              text: "`else` xabar yozadi. `i` ning o'zi 3, uni chiqarish yaroqli, chunki `i` oddiy `int`. Xato `a[3]` da bo'lardi. Ekran: `indeks 3 chegaradan tashqari`.",
            },
            {
              lines: "yo'q tekshiruv",
              text: "`if` ni olib tashlab `a[3]` desangiz, kod yig'ilishi mumkin. Standart natijani aytmaydi. Shu misolni «3-quti nimani chiqaradi» deb ishga tushirmang.",
            },
          ],
        },
        {
          title: "To'g'ri sikl 4 marta kiradi, oxirgi indeks 3",
          intro: [
            "Bu dastur qutini chegaradan o'qimaydi. U faqat `i < n` necha marta rost bo'lishini sanaydi. Sanoq 4, oxirgi indeks 3.",
          ],
          codeLabel: "sanoq.cpp",
          code: `#include <iostream>

int main() {
    const int n = 4;
    int qadam = 0;
    for (int i = 0; i < n; ++i) {
        ++qadam;
    }
    std::cout << "tana " << qadam << "{{n}}";
    std::cout << "oxirgi indeks " << (n - 1) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `tana 4
oxirgi indeks 3`,
          analysis: [
            {
              lines: "4-5",
              text: "`n` 4. `qadam` 0. Massiv bu misolda ochilmaydi, chunki maqsad qadam soni. Qadamni qator bilan adashtirmaslik uchun quti yo'q.",
            },
            {
              lines: "6-8",
              text: "`i` 0, 1, 2, 3. To'rt marta `++qadam`. `i` 4 da shart yolg'on. Tana 4 marta.",
            },
            {
              lines: "9-10",
              text: "Ekran `tana 4`, keyin `oxirgi indeks 3`. Oxirgi yozilishi mumkin bo'lgan indeks `n - 1`. Tana soni esa `n`.",
            },
            {
              lines: "solishtir",
              text: "`i <= n` bo'lsa, `i` 0, 1, 2, 3, 4: besh marta. Massiv bo'lsa, beshinchi gal `a[4]`. Shartni `i < n` qiling, oxirgi joyni `n` deb atamang.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`int a[3] = {1, 2, 3};` uchta `int`, odatda 12 bayt. Bosh manzil A, keyin A+4, A+8. Ajratilgan oxirgi bayt A+11. A+12 bu blokdan keyingi manzil. `a[3]` aynan shu hisob: uch qadam. U blokka kirmaydi.",
          "A+12 da nima turishi kafolatlanmagan. Qo'shni lokal, rostlash uchun qo'yilgan bo'sh bayt, yoki boshqa obyekt bo'lishi mumkin. Kompilyator «dasturchi bu yerga kirmaydi» deb hisoblashi ham mumkin. Shuning uchun `a[3] = 99` qilib qo'yib, yonidagi o'zgaruvchi 99 bo'ldi deb o'rgatib bo'lmaydi. Ba'zan shunday ko'rinadi. Bu xotira tartibining va'dasi emas.",
          "Tekshiruvli misolda `a[3]` hisoblanmaydi. `i` 3 oddiy quti, massiv emas. `if` yolg'on, tana tashlab ketiladi. Qator 1, 2, 3 bo'lib turadi. Xabar `cout` buferiga yoziladi. Chegara buzilmagan dasturning natijasi shu.",
          "`i <= n` bilan haqiqiy `a[i]` yozilgan dasturda protsessor baribir manzilni hisoblab, o'sha baytga qo'l urishi mumkin. Standart bu urinishdan keyingi dasturni ham, oldingi qatorlarni ham bog'lamaydi. Xato keyinroq, boshqa funksiyada ko'rinishi mumkin. Sababni o'sha keyingi qatordan qidirmang, indekslanayotgan joyni qidiring.",
        ],
        diagram: `int a[3]
indeks:  0     1     2     | 3 yaroqsiz
qiymat: [1]   [2]   [3]   | ajratilmagan
manzil:  A    A+4   A+8   | A+12

A+12 qo'l urish mumkin bo'lgan joy emas
u yerda nima borligi va'da qilinmaydi

if (i >= 0 && i < 3) yolg'on bo'lsa
a[i] hisoblanmaydi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Chegara xatosi yig'ilish xatosi bo'lmasligi mumkin. Dastur jim ishlaydi yoki boshqa joyda yiqiladi. Shartni va oxirgi indeksni avval sanang.",
        ],
        items: [
          {
            title: "i <= n qo'yib, bitta ortiqcha qadam",
            why: [
              "`n` 4 bo'lsa, `i <= 4` indeks 4 ni ham oladi. Oxirgi yaroqli 3. Shart `i < n` yoki `i <= n - 1`.",
            ],
            wrong: `for (int i = 0; i <= n; ++i) {
    std::cout << a[i] << "{{n}}";
}`,
            right: `for (int i = 0; i < n; ++i) {
    std::cout << a[i] << "{{n}}";
}`,
          },
          {
            title: "Tildan xabar yoki istisno kutish",
            why: [
              "Xom `a[i]` chegarani tekshirmaydi. Noto'g'ri indeks istisno uloqtirmaydi va doim yiqilmaydi. «Ishga tushdi» tekshiruv emas. Indeksni `if` yoki sikl sharti ushlasin.",
            ],
            wrong: `std::cout << a[n] << "{{n}}";`,
            right: `if (i >= 0 && i < n) {
    std::cout << a[i] << "{{n}}";
}`,
          },
          {
            title: "Manfiy indeksni orqaga qadam deb o'qish",
            why: [
              "`a[-1]` oxirgi element emas. Oxirgi `a[n - 1]`. Manfiy indeks ham chegaradan tashqari, u ham noma'lum. Teskari yurish kerak bo'lsa, indeksni `n - 1` dan 0 tomonga tushiring va 0 da to'xtang.",
            ],
            wrong: `std::cout << a[-1] << "{{n}}";`,
            right: `std::cout << a[n - 1] << "{{n}}";`,
          },
        ],
      },
      quiz: [
        {
          id: "8.3-q1",
          question: "`int a[5]` da qaysi murojaat chegaradan tashqari?",
          options: ["a[0]", "a[4]", "a[5]", "a[1]"],
          answer: 2,
          explanation:
            "Besh quti, indekslar 0 dan 4 gacha. a[4] oxirgi joy. a[5] oltinchi qadam, qator tugagan.",
        },
        {
          id: "8.3-q2",
          question: "Xom massivda `a[n]` yozilsa, C++ nima qilishga majbur?",
          options: [
            "Har doim xato matni yozadi",
            "Har doim 0 qaytaradi",
            "Hech narsa va'da qilmaydi, bu noma'lum",
            "Har doim istisno uloqtiradi",
          ],
          answer: 2,
          explanation:
            "Chegara tekshiruvi yo'q. Yiqilish ham, jim natija ham kafolat emas. Bunday dasturning chiqishiga tayanilmaydi.",
        },
        {
          id: "8.3-q3",
          question: "`int a[4]` va `for (int i = 0; i <= 4; ++i)` tana ichida `a[i]` bor. Tana haqida qaysi gap to'g'ri?",
          options: [
            "4 marta kiradi, hammasi joyida",
            "5 marta kiradi, oxirgi gal chegaradan tashqari",
            "3 marta kiradi",
            "kod yig'ilmaydi",
          ],
          answer: 1,
          explanation:
            "i qiymatlari 0, 1, 2, 3, 4. Beshinchi gal a[4]. To'rt qutilik massivda bu indeks yo'q. Shart i < 4 bo'lishi kerak.",
        },
      ],
    },
    {
      id: "8.4",
      navTitle: "Ikki o'lcham",
      title: "Ikki o'lchamli massiv: qator va ustun",
      goal: [
        "Bu darsdan keyin siz `int m[qator][ustun]` ni jadval deb ochasiz. Birinchi indeks qator, ikkinchisi ustun, ikkalasi ham 0 dan. Xotirada qatorlar yonma-yon yotishini, ichki sikl ustunni yurishini va vergul bilan `m[i, j]` yozib bo'lmasligini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Sinf daftaridagi jadval. Ikki qator, uch ustun. «Ikkinchi qator, uchinchi ustun» desangiz, avval qatorni topasiz, keyin shu qatorning ichida ustunni. Birinchi qator 0, birinchi ustun ham 0. Ikkinchi qatorning indeksi 1, uchinchi ustuninki 2.",
          "Daftar yopilib, qog'oz bitta lenta bo'lib yoyilsa, avval birinchi qatorning uchta katagi, darrov keyin ikkinchi qatorning uchta katagi. Ustunlar alohida lenta emas. Birinchi ustunning ikki katagi lenta bo'ylab yonma-yon emas, orada qatorning qolgani bor.",
          "`m[1, 2]` da vergul ikki koordinata emas. Bu boshqa belgi, pastroqda ko'ramiz. Jadval katagining yozuvi ikki juft qavs: `m[1][2]`.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`int m[2][3]` ikki qator, har qatorda uchta `int`. Jami 6 ta element. Qator indeksi 0 va 1. Ustun indeksi 0, 1 va 2. `m[qator][ustun]` bitta katak.",
        ],
        items: [
          {
            title: "E'lon va katak",
            paragraphs: [
              "Ichki jingalak qator. `{{1, 2, 3}, {4, 5, 6}}` birinchi qator 1 2 3, ikkinchisi 4 5 6. Tekis ro'yxat `{1, 2, 3, 4, 5, 6}` ham xotiradagi tartib bilan to'ldiradi. Qator-qator yozuv o'qishga yengil.",
              "`m[0][0]` bu 1. `m[0][2]` bu 3, birinchi qatorning oxiri. `m[1][0]` bu 4. `m[1][2]` bu 6. Birinchi indeks qator, ikkinchisi ustun.",
              "Qatorni ustun bilan almashtirib `m[2][1]` desangiz, qator indeksi 2. Qatorlar esa faqat 0 va 1. Bu chegaradan chiqish, 8.3 bilan bir xil noma'lumlik.",
            ],
            code: `int m[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};
std::cout << m[1][2] << "{{n}}";`,
            codeLabel: "qator 1, ustun 2",
            table: {
              caption: "m[2][3]. Katakdagi son qiymat, burchakdagi yozuv indeks.",
              headers: ["", "ustun 0", "ustun 1", "ustun 2"],
              rows: [
                ["qator 0", "m[0][0] = 1", "m[0][1] = 2", "m[0][2] = 3"],
                ["qator 1", "m[1][0] = 4", "m[1][1] = 5", "m[1][2] = 6"],
              ],
            },
          },
          {
            title: "Xotirada qator-qator",
            paragraphs: [
              "Olti `int` bitta lenta: 1, 2, 3, 4, 5, 6. Birinchi qatorning oxiridan keyin darrov ikkinchi qator. Bu qator-ustuvor joylashuv.",
              "`m[1][2]` lentada qayerda: birinchi qator 3 ta elementni oladi, keyin shu qatorda 2 qadam. Tartib raqami 1 * 3 + 2 = 5, noldan sanaganda oltinchi joy, qiymat 6. Formula: `qator * ustunSoni + ustun`.",
              "Bitta ustun lentada yonma-yon emas. `m[0][0]` va `m[1][0]` orasida 2 va 3 yotadi. Ustun bo'ylab yurish qator uzunligi qadar sakraydi.",
            ],
          },
          {
            title: "Ikki sikl va vergul tuzog'i",
            paragraphs: [
              "Tashqi sikl qator, ichki sikl ustun. Yangi qator belgisi ichki sikldan keyin, tashqi tanada. Ichkariga qo'ysangiz, har bir son alohida qatorga tushadi.",
              "`m[1, 2]` ikki qavsli indeks emas. Vergul ifodani chapdan o'ngga hisoblab, chapini tashlaydi, natija o'ng tomon. `m[1, 2]` bu `m[2]`. Ikki qatorli jadvalda qator 2 yo'q. To'g'ri yozuv `m[1][2]`.",
              "Qator yig'indisi har yangi qatorda 0 dan ochilsin. Tashqarida ochib, ichkarida nol qilmasangiz, ikkinchi qator birinchining ustiga qo'shiladi.",
            ],
            code: `for (int qator = 0; qator < 2; ++qator) {
    for (int ustun = 0; ustun < 3; ++ustun) {
        std::cout << m[qator][ustun] << " ";
    }
    std::cout << "{{n}}";
}`,
            codeLabel: "tashqi qator, ichki ustun",
          },
        ],
      },
      examples: [
        {
          title: "Ikki qator, uch ustun, har qator alohida",
          intro: [
            "Jadval 1 2 3 va 4 5 6. Ichki sikl ustunni probel bilan yozadi. Tashqi sikl qatorni yopadi.",
          ],
          codeLabel: "jadval.cpp",
          code: `#include <iostream>

int main() {
    int m[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };
    for (int qator = 0; qator < 2; ++qator) {
        for (int ustun = 0; ustun < 3; ++ustun) {
            std::cout << m[qator][ustun];
            if (ustun < 2) {
                std::cout << " ";
            }
        }
        std::cout << "{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1 2 3
4 5 6`,
          analysis: [
            {
              lines: "4-7",
              text: "Birinchi jingalak qator 0: 1, 2, 3. Ikkinchisi qator 1: 4, 5, 6. `m[0][2]` 3, `m[1][0]` 4.",
            },
            {
              lines: "8-9",
              text: "`qator` 0, keyin 1. Har birida `ustun` 0, 1, 2. Ichki sikl har safar 0 dan boshlanadi. Jami 2 * 3 = 6 ta katak.",
            },
            {
              lines: "10-13",
              text: "Son yoziladi, keyin probel, oxirgi ustundan tashqari. Birinchi ichki aylanish `1 2 3`. Ikkinchisi `4 5 6`.",
            },
            {
              lines: "15",
              text: "`{{n}}` tashqi tanada, ichki sikl bitgach. Har bir jadval qatori ekranda ham alohida qator. Ichkariga qo'yilsa, sonlar ustma-ust tushardi.",
            },
          ],
        },
        {
          title: "Bitta katak 6, jami yig'indi 21",
          intro: [
            "`m[1][2]` ikkinchi qatorning uchinchi soni, 6. Olti katagining yig'indisi 21.",
          ],
          codeLabel: "katak.cpp",
          code: `#include <iostream>

int main() {
    int m[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };
    std::cout << m[1][2] << "{{n}}";
    int yigindi = 0;
    for (int qator = 0; qator < 2; ++qator) {
        for (int ustun = 0; ustun < 3; ++ustun) {
            yigindi += m[qator][ustun];
        }
    }
    std::cout << yigindi << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `6
21`,
          analysis: [
            {
              lines: "8",
              text: "`m[1][2]`: qator 1, ustun 2. Qiymat 6. Bu `m[2][1]` emas. `m[2]` bo'lgan qator yo'q.",
            },
            {
              lines: "9-14",
              text: "`yigindi` 0. Olti qo'shish: 1+2+3=6, keyin 4, 5, 6. 6+4=10, 10+5=15, 15+6=21. Ichki sikl ustun, tashqi qator.",
            },
            {
              lines: "15",
              text: "Ekranda 6, keyin 21. 21 olti elementning yig'indisi. Qatorlar alohida 6 va 15, ularning yig'indisi ham 21.",
            },
            {
              lines: "formula",
              text: "Lentadagi o'rin: 1 * 3 + 2 = 5. Noldan boshlab 5-qadam oltinchi son, 6. Qator uzunligi 3 formuladagi ko'paytuvchi.",
            },
          ],
        },
        {
          title: "Har qatorning yig'indisi alohida nol",
          intro: [
            "Birinchi qator 1+2+3=6. Ikkinchi 4+5+6=15. Yig'indi har qatorda qayta ochiladi.",
          ],
          codeLabel: "qator_yigindi.cpp",
          code: `#include <iostream>

int main() {
    int m[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };
    for (int qator = 0; qator < 2; ++qator) {
        int qatorYigindi = 0;
        for (int ustun = 0; ustun < 3; ++ustun) {
            qatorYigindi += m[qator][ustun];
        }
        std::cout << qatorYigindi << "{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `6
15`,
          analysis: [
            {
              lines: "8-9",
              text: "Tashqi sikl har kirishda yangi `qatorYigindi` ochadi va 0 qiladi. Ikkinchi qator birinchining 6 siga qo'shilmaydi.",
            },
            {
              lines: "10-12",
              text: "Qator 0: 1, keyin 3, keyin 6. Ichki sikl tugaydi. Qator 1 da quti qayta 0: 4, 9, 15.",
            },
            {
              lines: "13",
              text: "Har qator bitgach bitta son. Ekran `6`, keyin `15`. Yangi qator shu `cout` da.",
            },
            {
              lines: "quti",
              text: "`qatorYigindi` tashqi sikldan oldin ochilib, ichkarida nol qilinmasa, ikkinchi chiqish 21 bo'lardi. O'zgaruvchini qator boshida 0 qiling.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`int m[2][3]` oltita `int`, bitta bo'lak. Windowsdagi 4 baytli `int` da bu 24 bayt. Tartib: `m[0][0]`, `m[0][1]`, `m[0][2]`, `m[1][0]`, `m[1][1]`, `m[1][2]`. Qiymatlar 1, 2, 3, 4, 5, 6. Manzillar A, A+4, A+8, A+12, A+16, A+20.",
          "`m[0]` birinchi qator, uchta `int` lik qatorning o'zi. Uning boshi A. `m[1]` ikkinchi qator, boshi A+12. `m[1][2]` shu boshdan yana 8 bayt, A+20, qiymat 6.",
          "Tashqi sikl `qator` ni ushlaydi. Ichki sikl har safar yangi `ustun` ochadi, 0 dan. Ichki tugagach `ustun` yo'qoladi, `qator` o'sha freymda qoladi, keyin `{{n}}` yoziladi va `qator` o'sadi. `qatorYigindi` tashqi tanada ochilgan bo'lsa, har qatorda yangi quti, eskisi ichki ish bitishi bilan emas, tashqi tana aylanishi bitishi bilan yo'qoladi.",
          "`m[1, 2]` lentada «qator 1 ustun 2» ni hisoblamaydi. Vergul 1 ni tashlab, 2 ni qoldiradi. `m[2]` ikki qatorli jadvalning tashqarisi. Bu yozuv yig'ilishi mumkin, ma'nosi esa boshqa va chegarasi buzuq.",
        ],
        diagram: `m[2][3], bitta lenta
m[0][0] m[0][1] m[0][2] m[1][0] m[1][1] m[1][2]
  1        2        3        4        5        6
  A       A+4      A+8     A+12     A+16     A+20

m[1][2] = A + (1 * 3 + 2) * 4 bayt = A+20
m[1, 2] bu m[2], qator indeksi 2, lenta tashqarisi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Jadval xatosi indeks tartibida yoki sikl joyida. Ba'zisi yig'ilmaydi, ba'zisi boshqa katakni yoki chegarani bosadi.",
        ],
        items: [
          {
            title: "Vergul bilan m[i, j] yozish",
            why: [
              "`m[1, 2]` bu `m[2]`. Chapdagi 1 hisoblanib tashlanadi. Ikki o'lchamli jadvalda bu bitta indeks, ustiga qator 2 mavjud emas. Katak `m[1][2]`.",
            ],
            wrong: `std::cout << m[1, 2] << "{{n}}";`,
            right: `std::cout << m[1][2] << "{{n}}";`,
          },
          {
            title: "Qator va ustunni almashtirish",
            why: [
              "Sikl `ustun` ni 0, 1, 2 qilib, `m[ustun][qator]` desa, `ustun` 2 bo'lganda qator indeksi 2. Jadvalda qator 0 va 1 bor. `m[2][...]` chegaradan tashqari. Birinchi qavs qator, sikl ham shunga mos.",
            ],
            wrong: `std::cout << m[ustun][qator];`,
            right: `std::cout << m[qator][ustun];`,
          },
          {
            title: "Qator yig'indisini nolga qaytarmaslik",
            why: [
              "Quti tashqarida ochilib, ichkarida nol qilinmasa, ikkinchi qator 6 ning ustiga 15 qo'shadi va 21 chiqadi. Har qator o'z 0 sidan boshlansin.",
            ],
            wrong: `int qatorYigindi = 0;
for (int qator = 0; qator < 2; ++qator) {
    for (int ustun = 0; ustun < 3; ++ustun) {
        qatorYigindi += m[qator][ustun];
    }
}`,
            right: `for (int qator = 0; qator < 2; ++qator) {
    int qatorYigindi = 0;
    for (int ustun = 0; ustun < 3; ++ustun) {
        qatorYigindi += m[qator][ustun];
    }
}`,
          },
        ],
      },
      quiz: [
        {
          id: "8.4-q1",
          question: "`int m[2][3]` necha qator va necha ustun?",
          options: [
            "2 qator, 3 ustun",
            "3 qator, 2 ustun",
            "6 qator, indeks 1 dan",
            "2 ta element",
          ],
          answer: 0,
          explanation:
            "Birinchi qavs qator soni, ikkinchisi har qatordagi ustun. Jami 6 ta int. Qator indeksi 0..1, ustun indeksi 0..2.",
        },
        {
          id: "8.4-q2",
          question: "`m` qatorlari `{1, 2, 3}` va `{4, 5, 6}`. `m[1][2]` necha?",
          options: ["2", "3", "6", "4"],
          answer: 2,
          explanation:
            "Qator 1 ikkinchi qator: 4, 5, 6. Ustun 2 shu qatorning oxirgi soni, 6. m[0][2] esa 3 bo'lardi.",
        },
        {
          id: "8.4-q3",
          question: "`m[1, 2]` qanday o'qiladi?",
          options: [
            "qator 1, ustun 2",
            "vergul chapni tashlaydi, natija m[2]",
            "1 va 2 yig'indisi, m[3]",
            "ustunlar bo'yicha lenta",
          ],
          answer: 1,
          explanation:
            "Vergul ikki koordinata yozmaydi. Chapdagi 1 tashlanadi, qoladi m[2]. Katak uchun ikki juft qavs: m[1][2].",
        },
      ],
    },
    {
      id: "8.5",
      navTitle: "char[] va string",
      title: "C uslubidagi satr va std::string",
      goal: [
        "Bu darsdan keyin siz `char` qatoridagi satrni oxiridagi `\\0` bilan tushuntirasiz. `\"Ali\"` ning nechta katak egallashini, `'0'` bilan `\\0` ni aralashtirmaslikni va `std::string` uzunlikni o'zi saqlashini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Eski xat lentasi harflar qatori. Oxirida «shu yerda to'xta» degan bo'sh belgi bor. O'qiydigan odam shu belgigacha o'qiydi. Belgi qo'yilmasa, u keyingi xatning ichiga kirib ketadi va qachon to'xtashini bilmaydi. Bu `\\0`, null-terminator.",
          "`std::string` zamonaviy konvert. Qopqoqda «ichida 3 ta harf» deb yozilgan. O'quvchi oxirgi bo'sh belgini qidirib yurmaydi, qopqoqdagi sonni ko'radi. Harf qo'shilsa, konvert o'zi cho'ziladi va sonni yangilaydi. Eski lentada joy oldindan kesilgan, sig'masa harf tashqariga toshadi.",
          "`'0'` qog'ozdagi raqam belgisi, «nol» deb o'qiladigan belgi. `\\0` esa bo'sh to'xtash buyrug'i, ko'rinadigan nol emas. Ikkisi bir xil kvadratga o'xshamaydi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "C uslubidagi satr `char` massivi, oxirida qiymati 0 bo'lgan belgi. `std::string` uchun `#include <string>`. Uzunlik `length()` da, siz `\\0` qo'ymaysiz.",
        ],
        items: [
          {
            title: "Literal va \\0",
            paragraphs: [
              "`\"Ali\"` to'rtta belgi: `A`, `l`, `i` va oxiridagi `\\0`. `char ism[] = \"Ali\";` shu to'rttasiga joy ochadi. `sizeof(ism)` 4, chunki `char` 1 bayt.",
              "`char ism[4] = \"Ali\";` sig'adi. `char ism[3] = \"Ali\";` C++ da yig'ilmaydi: to'xtash belgisi uchun ham joy kerak, u tashlab yuborilmaydi. `char ism[3] = {'A', 'l', 'i'};` yig'iladi, lekin to'xtash yo'q. Buni `cout` ga bersangiz, o'qish qator tashqarisiga ketadi, bu noma'lum.",
              "`\\0` ning son kodi 0. `'0'` ning kodi 48, 2.6-darsdagi ASCII. `'0'` ni satr oxiriga qo'yish to'xtatmaydi. Ekranda nol belgisi chiqishi mumkin, lenta esa davom etadi.",
            ],
            code: `char ism[] = "Ali";
char harf[] = {'A', 'l', 'i', '\\0'};`,
            codeLabel: "to'rtta katak, oxiri to'xtash",
          },
          {
            title: "cout qayerda to'xtaydi",
            paragraphs: [
              "`std::cout << ism` `char` qatori berilsa, `\\0` gacha yozadi. `\\0` ning o'zi ekranga chiqmaydi. To'xtash bo'lmasa, chegara yo'q, 8.3 dagi kabi noma'lum.",
              "`std::string` ni `cout` uzunligi bo'yicha yozadi. Ichida nuqta yoki bo'sh joy bo'lishi mumkin. Siz oxiriga `\\0` qo'ymaysiz va qo'yganingizni ham matnning uzunligi deb hisoblamaysiz.",
              "Massiv nomi qayta tayinlanmaydi. `eski = \"Bobur\"` yig'ilmaydi. `std::string` da `ism = \"Bobur\"` ishlaydi, uzunlik 5 bo'ladi. Eski qatorda joy yetarli bo'lsa ham, oddiy `=` nusxa qilmaydi.",
            ],
            code: `char eski[] = "Ali";
std::string ism = "Ali";
ism = "Bobur";`,
            codeLabel: "string qayta yoziladi",
          },
          {
            title: "Uzunlik qayerda turadi",
            paragraphs: [
              "`ism.length()` harflar soni. `\"Ali\"` uchun 3. To'xtash belgisi bu songa kirmaydi, chunki siz uni qo'ymagansiz. `size()` shu sinf uchun `length()` bilan bir xil ma'no.",
              "`sizeof(eski)` `char` massivida katak soni, to'xtash bilan 4. Bu harf soni emas. `sizeof` ni satr uzunligi deb o'qimang.",
              "`sizeof(ism)` esa `std::string` obyektining o'zi, matn emas. Raqam kutubxonaga bog'liq, yodlanmaydi. Matn uchun `length()`.",
            ],
            table: {
              caption: "\"Ali\" ikki xil idishda.",
              headers: ["", "char eski[]", "std::string ism"],
              rows: [
                ["E'lon", "char eski[] = \"Ali\";", "std::string ism = \"Ali\";"],
                ["Harf soni", "3 ta, lekin sizeof 4", "length() 3"],
                ["Oxiridagi \\0", "katakda yotadi", "siz qo'ymaysiz"],
                ["Qayta yozish", "eski = \"Bobur\" yig'ilmaydi", "ism = \"Bobur\" bo'ladi"],
              ],
            },
          },
        ],
      },
      examples: [
        {
          title: "\"Ali\" ekranda 3 harf, katakda 4 joy",
          intro: [
            "`cout` to'xtashgacha yozadi, shuning uchun `Ali`. `sizeof` to'xtashni ham sanaydi, 4.",
          ],
          codeLabel: "ali.cpp",
          code: `#include <iostream>

int main() {
    char ism[] = "Ali";
    std::cout << ism << "{{n}}";
    std::cout << sizeof(ism) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `Ali
4`,
          analysis: [
            {
              lines: "4",
              text: "`\"Ali\"` to'rt bayt: `A`, `l`, `i`, `\\0`. `ism` shu to'rtta `char`. Sanoq yozilmagan, ro'yxatdan chiqadi.",
            },
            {
              lines: "5",
              text: "`cout` birinchi baytdan o'qiydi va 0 qiymatli baytda to'xtaydi. `\\0` yozilmaydi. Ekranda `Ali`.",
            },
            {
              lines: "6",
              text: "`sizeof(ism)` 4. `char` 1 bayt, to'rtta katak. Bu `length` emas. Harf 3 ta, to'xtash to'rtinchi.",
            },
            {
              lines: "joy",
              text: "`char ism[3] = \"Ali\"` yig'ilmaydi. Uchinchi katak `i` bo'lib, `\\0` ga joy qolmaydi. C++ to'xtashni tashlab yubormaydi.",
            },
          ],
        },
        {
          title: "'0' kodi 48, \\0 kodi 0",
          intro: [
            "Ikki belgi. Biri ko'rinadigan nol. Ikkinchisining kodi 0, u satrni to'xtatadi. `static_cast<int>` kodni son qilib chiqaradi, belgi o'rniga.",
          ],
          codeLabel: "nol.cpp",
          code: `#include <iostream>

int main() {
    char belgi = '0';
    char tugat = '\\0';
    std::cout << belgi << "{{n}}";
    std::cout << static_cast<int>(belgi) << "{{n}}";
    std::cout << static_cast<int>(tugat) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `0
48
0`,
          analysis: [
            {
              lines: "4-5",
              text: "`'0'` bitta belgi, ASCII 48. `'\\0'` bitta belgi, qiymati 0. Ikkalasi ham `char`, ma'nosi boshqa.",
            },
            {
              lines: "6",
              text: "`cout` `char` ni belgi qilib yozadi. Ekranda `0`. Bu son 48 emas, belgining rasmi.",
            },
            {
              lines: "7-8",
              text: "`static_cast<int>` shu baytning son kodini so'raydi. `'0'` uchun 48. `\\0` uchun 0. 2.6-darsdagi jadval bilan bir xil.",
            },
            {
              lines: "satr",
              text: "`char qator[2] = {'0', '\\0'};` ni `cout` `0` deb yozadi va to'xtaydi. Oxiriga `'0'` qo'yib `\\0` ni unutsangiz, to'xtash bo'lmaydi.",
            },
          ],
        },
        {
          title: "std::string uzunlikni o'zi biladi va qayta yoziladi",
          intro: [
            "`Ali` ning `length()` i 3. Yonidagi `char` qatori `sizeof` da 4. Keyin `string` `Bobur` bo'ladi, uzunlik 5.",
          ],
          codeLabel: "string_uzunlik.cpp",
          code: `#include <iostream>
#include <string>

int main() {
    std::string ism = "Ali";
    char eski[] = "Ali";
    std::cout << ism << "{{n}}";
    std::cout << ism.length() << "{{n}}";
    std::cout << sizeof(eski) << "{{n}}";
    ism = "Bobur";
    std::cout << ism << "{{n}}";
    std::cout << ism.length() << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `Ali
3
4
Bobur
5`,
          analysis: [
            {
              lines: "2",
              text: "`std::string` `<string>` da. `<iostream>` o'zi bu turni ochmaydi.",
            },
            {
              lines: "5-9",
              text: "`ism` matni `Ali`, `length()` 3. To'xtash belgisini siz qo'ymagansiz, u songa kirmaydi. `eski` esa 4 bayt. Uchinchi chiqish 4.",
            },
            {
              lines: "10-12",
              text: "`ism = \"Bobur\"` yangi matn. Uzunlik 5. Ekran `Bobur`, keyin `5`. `eski = \"Bobur\"` yig'ilmaydi, massiv qayta tayinlanmaydi.",
            },
            {
              lines: "sizeof ism",
              text: "`sizeof(ism)` ni uzunlik o'rniga chiqarmang. U obyektning o'lchami, 3 emas. Raqam kutubxonaga bog'liq. Harf soni `length()`.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`char ism[] = \"Ali\";` to'rtta yonma-yon bayt. Qiymatlar 65, 108, 105, 0. Oxirgi 0 bu `\\0`. `cout` baytni o'qiydi, 0 ni ko'rguncha belgiga aylantiradi, 0 ning o'zini buferga qo'ymaydi. Beshinchi bayt bu massivniki emas. To'xtash bo'lmasa, o'qish shu beshinchiga o'tadi, 8.3 dagi kabi noma'lum.",
          "`std::string ism = \"Ali\";` obyekt ichida harflar sonini saqlaydi, 3. Harflar qisqa bo'lsa, ko'p kutubxona ularni obyektning o'zida ushlaydi, uzun bo'lsa, alohida bo'lak so'raydi. Qayerda turishi sizning `length()` natijangizni o'zgartirmaydi. `sizeof(ism)` shu obyekt qutisining o'lchami, 3 ham, 4 ham emas.",
          "`ism = \"Bobur\"` sonni 5 qiladi va besh harfni yozadi. Eski uch harf qolmaydi. `char` massivida bunday tayinlash yo'q. Qo'lda nusxalasangiz, manzildagi joy yangi satr va uning `\\0` iga yetishi kerak. Yetmasa, yozuv massivdan tashqariga chiqadi. `std::string` joy yetishini o'zi hal qiladi.",
          "`'0'` bayti 48. `'\\0'` bayti 0. `cout` 48 ni `0` glifi qiladi. 0 qiymatli baytni `char` qatorining oxiri deb o'qiydi. Son 0 va belgi `'0'` bitta quti emas.",
        ],
        diagram: `char ism[] = "Ali"
bayt:  'A'   'l'   'i'   \\0
kod:    65   108   105    0
sizeof = 4, ekranga 3 harf

std::string ism = "Ali"
length 3
sizeof(ism) obyekt o'lchami, length emas

'0'  -> kod 48, glif 0
\\0  -> kod 0, to'xtash, glif emas`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Satr xatosi to'xtash belgisini unutish yoki uni raqam belgisi bilan almashtirish. `string` da esa `sizeof` ni uzunlik deb o'qish.",
        ],
        items: [
          {
            title: "Literalni sig'maydigan char qatorga tiqish",
            why: [
              "`\"Ali\"` to'rt bayt, oxiri `\\0`. Uchta katak yetmaydi. C++ buni yig'ishda rad etadi. Katakni to'xtash bilan birga sanang yoki sanog'ini yozmasdan `[]` qoldiring.",
            ],
            wrong: `char ism[3] = "Ali";`,
            right: `char ism[] = "Ali";`,
          },
          {
            title: "To'xtashsiz qatorni cout ga berish",
            why: [
              "`{'A', 'l', 'i'}` uchta harf, qiymati 0 bo'lgan bayt yo'q. `cout` to'xtashni qator tashqarisidan qidiradi. Bu noma'lum. Oxiriga `'\\0'` qo'ying yoki `std::string` ishlating.",
            ],
            wrong: `char ism[3] = {'A', 'l', 'i'};
std::cout << ism << "{{n}}";`,
            right: `char ism[] = {'A', 'l', 'i', '\\0'};
std::cout << ism << "{{n}}";`,
          },
          {
            title: "std::string uzunligini sizeof deb o'lchash",
            why: [
              "`sizeof(ism)` obyekt qutisi. `\"Ali\"` uchun 3 chiqishi shart emas. Harf soni `length()`. `char` massivida ham `sizeof` to'xtashni qo'shib sanaydi, harf sonidan bitta katta.",
            ],
            wrong: `std::string ism = "Ali";
std::cout << sizeof(ism) << "{{n}}";`,
            right: `std::string ism = "Ali";
std::cout << ism.length() << "{{n}}";`,
          },
        ],
      },
      quiz: [
        {
          id: "8.5-q1",
          question: "`char ism[] = \"Ali\";` dan keyin `sizeof(ism)` necha?",
          options: ["3", "4", "2", "5"],
          answer: 1,
          explanation:
            "A, l, i va oxiridagi \\0. To'rtta char, har biri 1 bayt. Ekranga uch harf chiqadi, katak to'rtta.",
        },
        {
          id: "8.5-q2",
          question: "`std::string ism = \"Ali\";` da `ism.length()` necha?",
          options: ["4", "3", "sizeof(ism) bilan bir xil", "0"],
          answer: 1,
          explanation:
            "length() harf sanaydi, 3. To'xtash belgisini siz qo'ymagansiz. sizeof(ism) obyekt o'lchami, u boshqa savol.",
        },
        {
          id: "8.5-q3",
          question: "`'0'` va `\\0` haqida qaysi gap to'g'ri?",
          options: [
            "Ikkalasining kodi ham 0",
            "'0' ko'rinadigan nol, kodi 48; \\0 kodi 0 va satrni to'xtatadi",
            "Ikkalasi ham cout ni to'xtatadi",
            "\\0 ning kodi 48",
          ],
          answer: 1,
          explanation:
            "ASCII da '0' 48. \\0 bayt qiymati 0. cout char qatorida 0 ni ko'rsa to'xtaydi. '0' esa oddiy belgi.",
        },
      ],
    },
    {
      id: "8.6",
      navTitle: "string metodlari",
      title: "std::string metodlari va getline dan oldingi qoldiq",
      goal: [
        "Bu darsdan keyin siz `length`, `substr`, `find` va `append` ni ishlatasiz. `find` topa olmasa `npos` qaytishini bilasiz. `cin >>` dan keyin buferda qolgan yangi qatorni `ignore` tashlamasa, `getline` bo'sh satr o'qib olishini tushuntirasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Konvertdagi xatning uzunligi qopqoqda. `substr` xatning o'rtasidan bir parcha qirqib olish: «1-harfdan boshlab 3 ta». Qirqish asl xatni buzmaydi, qo'lingizga yangi parcha tushadi. `append` xatning oxiriga yana jumla yopishtirish, asal xat cho'ziladi.",
          "`find` so'z qidirish. Topilsa, birinchi harfning o'rni, 0 dan. Topilmasa, «yo'q» degan maxsus belgi. Bu belgi −1 emas va uni ekranga son qilib chiqarsangiz, uzun musbat son ko'rinadi. Solishtiring, chop etmang.",
          "`getline` butun qatorni, probeli bilan, Entergacha oladi. Enterning o'zi idishga kirmaydi, buferdan olib tashlanadi. Oldin `>>` son o'qigan bo'lsa, o'sha Enter buferda yotib qolgan bo'lishi mumkin. `getline` uni bo'sh qator deb yutib yuboradi va siz ism yozishga ulgurmaysiz. `ignore` shu qolgan Enter ni supurib tashlaydi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`std::string` metodlari nuqta bilan chaqiriladi. `#include <string>` kerak. `ignore` va `>>` uchun `<iostream>`, katta chegarali `ignore` uchun `<limits>`.",
        ],
        items: [
          {
            title: "length va substr",
            paragraphs: [
              "`s.length()` harf soni, `size_t` turida. `\"Alish\"` da 5. Oxirgi harfning indeksi `length() - 1`, ya'ni 4. `size()` shu yerda bir xil ish.",
              "`s.substr(1, 3)` indeks 1 dan boshlab 3 ta belgi. `Alish` da `l`, `i`, `s`, ya'ni `lis`. Asl `s` o'zgarmaydi. Natija yangi `string`.",
              "`s.substr(3)` indeks 3 dan oxirigacha, `sh`. Boshlanish uzunlikdan katta bo'lsa, `substr` `std::out_of_range` uloqtiradi. Ushlanmasa, dastur tugaydi. Aniq oynadagi matnni va'da qilmaymiz. Indeksni avval `length()` bilan solishtiring. So'ralgan belgi soni oxiridan oshsa, bu xato emas, qolgani qaytadi.",
            ],
            code: `std::string s = "Alish";
std::cout << s.length() << "{{n}}";
std::cout << s.substr(1, 3) << "{{n}}";
std::cout << s.substr(3) << "{{n}}";`,
            codeLabel: "5, lis, sh",
          },
          {
            title: "find, npos va append",
            paragraphs: [
              "`s.find(\"to\")` birinchi mos kelishning bosh indeksini qaytaradi. `kitob` da `to` indeks 2 da: `k` 0, `i` 1, `t` 2. Topilmasa, natija `std::string::npos`.",
              "`npos` «yo'q» belgisi. U `size_t` ning eng katta qiymati, ya'ni barcha bitlari 1. 64 bitli `size_t` da bu 18446744073709551615. Raqamni yodlamang va −1 deb chop etmang. Solishtiring: `if (joy == std::string::npos)`.",
              "`s.append(\"lar\")` oxiriga qo'shadi, `s` o'zi o'zgaradi. `s += \"lar\"` ham shunday. `s + \"lar\"` yangi vaqtinchalik satr, `s` ni tegmaydi, natijani biror joyga qo'ymasangiz, u yo'qoladi. `s = s + \"lar\"` esa yangisini qayta yozadi, bu ham ishlaydi.",
            ],
            code: `if (s.find("z") == std::string::npos) {
    std::cout << "yo'q{{n}}";
}
s.append("lar");`,
            codeLabel: "topilmasa npos",
          },
          {
            title: "getline va qolgan yangi qator",
            paragraphs: [
              "`std::getline(std::cin, ism)` keyingi yangi qatorgacha o'qiydi. Yangi qatorni `ism` ga qo'ymaydi, buferdan olib tashlaydi. Probel matnning ichida qoladi. `>>` esa probelda to'xtaydi, `Ali Valiyev` dan faqat `Ali` ni oladi.",
              "`std::cin >> yosh` sonni oladi, qatordagi Enter ni qoldiradi. Darrov `getline` shu Enter ni bo'sh satr deb o'qiydi. `ism.length()` 0. Ism so'ralmaydi, chunki qator allaqachon «tugagan».",
              "`std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '{{n}}');` qolgan belgilarni, yangi qatorni ham, tashlaydi. Keyingi `getline` navbatdagi haqiqiy qatorni kutadi. `ignore` ni har bir `getline` oldiga qo'ymang. Birinchi o'qish `getline` bo'lsa, `ignore` foydalanuvchining o'sha qatorini yeb qo'yadi. U `>>` dan keyingi ko'prik.",
            ],
            code: `std::cin >> yosh;
std::cin.ignore(
    std::numeric_limits<std::streamsize>::max(), '{{n}}');
std::getline(std::cin, ism);`,
            codeLabel: ">> dan keyin ignore, keyin getline",
          },
        ],
      },
      examples: [
        {
          title: "Alish: uzunlik 5, o'rtadan lis, oxiri sh",
          intro: [
            "`substr` yangi parcha qaytaradi. `s` ning o'zi `Alish` bo'lib qoladi. Oxirgi harf indeksi 4.",
          ],
          codeLabel: "substr.cpp",
          code: `#include <iostream>
#include <string>

int main() {
    std::string s = "Alish";
    std::cout << s.length() << "{{n}}";
    std::cout << s.substr(1, 3) << "{{n}}";
    std::cout << s.substr(3) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `5
lis
sh`,
          analysis: [
            {
              lines: "5-6",
              text: "`Alish` besh belgi, indekslar 0 `A`, 1 `l`, 2 `i`, 3 `s`, 4 `h`. `length()` 5.",
            },
            {
              lines: "7",
              text: "`substr(1, 3)` indeks 1 dan uchta: `l`, `i`, `s`. Ekran `lis`. `s` o'zgarmaydi, parcha yangi satr.",
            },
            {
              lines: "8",
              text: "`substr(3)` ikkinchi argument yo'q, oxirigacha. Indeks 3 va 4: `sh`. Agar 3+10 so'ralganda ham oxiri `sh` bo'lardi, oshib ketgan son xato emas.",
            },
            {
              lines: "chegara",
              text: "`s.substr(6)` bosh indeks 5 dan katta. Bu `out_of_range`. Misol uni chaqirmaydi. Oxirgi harf `s[4]`, `s[5]` emas.",
            },
          ],
        },
        {
          title: "find indeks 2, topilmasa yo'q, append kitoblar",
          intro: [
            "`kitob` ichida `to` indeks 2 da. `z` yo'q, konsolga ulkan son emas, `yo'q` yoziladi. Oxiriga `lar` qo'shiladi.",
          ],
          codeLabel: "find.cpp",
          code: `#include <iostream>
#include <string>

int main() {
    std::string s = "kitob";
    std::size_t joy = s.find("to");
    if (joy == std::string::npos) {
        std::cout << "yo'q{{n}}";
    } else {
        std::cout << joy << "{{n}}";
    }
    if (s.find("z") == std::string::npos) {
        std::cout << "yo'q{{n}}";
    }
    s.append("lar");
    std::cout << s << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `2
yo'q
kitoblar`,
          analysis: [
            {
              lines: "6-10",
              text: "`k` 0, `i` 1, `t` 2, `o` 3, `b` 4. `to` 2-indeksdan boshlanadi. `joy` 2, `npos` emas. Ekranda `2`.",
            },
            {
              lines: "12-14",
              text: "`z` yo'q. `find` `npos` qaytaradi. Shart rost, `yo'q`. `npos` ni `cout` ga bersangiz, 64 bitli `size_t` da 18446744073709551615 ko'rinadi. Solishtirish shuni yashiradi.",
            },
            {
              lines: "15-16",
              text: "`append(\"lar\")` `s` ning oxiriga uch harf qo'shadi. `s` endi `kitoblar`. `s + \"lar\"` yozilganida `s` `kitob` bo'lib qolardi.",
            },
            {
              lines: "birinchi",
              text: "`find` birinchi mos kelish. `kitobkitob` ichida `kit` indeks 0. Ikkinchi `kit` ni bu chaqiruv qaytarmaydi.",
            },
          ],
        },
        {
          title: "Son, keyin ignore, keyin to'liq ism",
          intro: [
            "Kiritish ikki qator. `18` son. `ignore` shu qatordagi qolgan Enter ni tashlaydi. `getline` `Ali Valiyev` ni probeli bilan oladi. Uzunlik 11.",
          ],
          codeLabel: "ism.cpp",
          code: `#include <iostream>
#include <string>
#include <limits>

int main() {
    int yosh;
    std::string ism;
    std::cin >> yosh;
    std::cin.ignore(
        std::numeric_limits<std::streamsize>::max(), '{{n}}');
    std::getline(std::cin, ism);
    std::cout << yosh << " " << ism << "{{n}}";
    std::cout << ism.length() << "{{n}}";
    return 0;
}`,
          consoleTitle: "Seans",
          console: `18
Ali Valiyev
18 Ali Valiyev
11`,
          analysis: [
            {
              lines: "8",
              text: "Foydalanuvchi `18` yozib Enter bosadi. `>>` son 18 ni `yosh` ga qo'yadi. Enter bayti buferda qoladi. `18` ekrandagi birinchi qator sizning kiritishingiz.",
            },
            {
              lines: "9-10",
              text: "`ignore` yangi qatorgacha, uni ham o'chirib, belgilarni tashlaydi. `max()` «qator qancha uzun bo'lsa ham» degan chegara. Qolgan faqat Enter bo'lsa, shuni oladi. `<limits>` shu `max` uchun.",
            },
            {
              lines: "11",
              text: "`getline` endi navbatdagi qatorni kutadi. `Ali Valiyev` probel bilan `ism` ga tushadi. Enter idishga kirmaydi. `>>` bo'lsa, faqat `Ali` olinardi.",
            },
            {
              lines: "12-13",
              text: "Dastur `18 Ali Valiyev` deb yozadi. `A l i` 3, probel 1, `V a l i y e v` 7, jami 11. `ignore` bo'lmasa, `getline` eski Enter ni bo'sh satr qilib olardi va uzunlik 0 chiqardi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`s.substr(1, 3)` yangi `string` obyekt ochadi, uchta belgi nusxasini qo'yadi, uzunlikni 3 qiladi. Asl `s` ning besh belgisi o'z joyida. Vaqtinchalik parcha `cout` ga berilgach, shu ifoda tugashi bilan yo'qolishi mumkin. Asl qoladi.",
          "`find` qatorni boshidan solishtiradi. Mos kelsa, bosh indeksni `size_t` qilib qaytaradi. Mos kelmasa, `npos`, ya'ni `size_t` ning maksimal qiymati. Bu manfiy son emas. Manfiy `size_t` da yo'q. 64 bitda chop etilsa, o'n to'qqiz xonali musbat son chiqadi. Shart uni `npos` bilan solishtiradi va konsolga `yo'q` yozadi.",
          "`append(\"lar\")` uzunlikni 5 dan 8 ga oshiradi: `kitob` 5 harf, `lar` 3 harf, `kitoblar` 8 harf. Joy yetmasa, `string` yangi bo'lak so'raydi va eskisini ko'chiradi. Siz `\\0` qo'ymaysiz. `s + \"lar\"` boshqa vaqtinchalik ochadi, `s` ning uzunligini tegmaydi. Vaqtinchalikni hech kim ushlamasa, u tashlanadi.",
          "Stdin buferi: `18`, keyin yangi qator, keyin `Ali Valiyev`, keyin yangi qator. `>>` `18` ni oladi, ko'rsatkich yangi qatorda qoladi. `ignore` shu baytni tashlaydi, ko'rsatkich `A` da. `getline` `A` dan keyingi yangi qatorgacha o'qiydi, yangi qatorni saqlamaydi. `ism` da 11 belgi, ichida bitta probel. `ignore` siz `getline` birinchi yangi qatorni darrov ko'radi, `ism` bo'sh, uzunlik 0, `Ali Valiyev` buferda qoladi.",
        ],
        diagram: `Alish
indeks 0 1 2 3 4
       A l i s h
substr(1, 3) -> yangi "lis"
asl qoladi

kitob: find("to") = 2
find("z") = npos, solishtir, chop etma

bufer:  18  | yangi qator | Ali Valiyev | yangi qator
>> yosh oladi, ko'rsatkich yangi qatorda
ignore shu yangi qatorni tashlaydi
getline "Ali Valiyev" ni oladi, uzunlik 11`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Metod xatosi natijani tashlab yuborish, `npos` ni son deb chiqarish yoki `>>` dan keyin `getline` ni to'g'ridan chaqirish.",
        ],
        items: [
          {
            title: "s + qo'shimcha ni saqlamaslik",
            why: [
              "`s + \"lar\"` yangi satr qaytaradi. `s` o'zgarmaydi. Natija o'zgaruvchiga yozilmasa, yo'qoladi. O'zgartirmoqchi bo'lsangiz, `append`, `+=` yoki `s = s + \"lar\"`.",
            ],
            wrong: `std::string s = "kitob";
s + "lar";
std::cout << s << "{{n}}";`,
            right: `std::string s = "kitob";
s.append("lar");
std::cout << s << "{{n}}";`,
          },
          {
            title: "Topilmagan find ni npos siz chop etish",
            why: [
              "`find` topilmasa, `npos` qaytaradi. Uni `cout` 64 bitli tizimda 18446744073709551615 qilib yozadi. Bu −1 emas va «yo'q» degani ham ekranda ko'rinmaydi. Avval `std::string::npos` bilan solishtiring.",
            ],
            wrong: `std::cout << s.find("z") << "{{n}}";`,
            right: `if (s.find("z") == std::string::npos) {
    std::cout << "yo'q{{n}}";
}`,
          },
          {
            title: ">> dan keyin ignore siz getline",
            why: [
              "`>>` Enter ni qoldiradi. `getline` shuni bo'sh satr deb o'qiydi. `ism.length()` 0, ism so'ralmaydi. `ignore` shu qolgan qatorni tashlaydi. Lekin birinchi o'qishning o'zi `getline` bo'lsa, oldidan `ignore` qo'ymang, u foydalanuvchi qatorini yeydi.",
            ],
            wrong: `std::cin >> yosh;
std::getline(std::cin, ism);`,
            right: `std::cin >> yosh;
std::cin.ignore(
    std::numeric_limits<std::streamsize>::max(), '{{n}}');
std::getline(std::cin, ism);`,
          },
        ],
      },
      quiz: [
        {
          id: "8.6-q1",
          question: "`std::string s = \"Alish\";` bo'lsa, `s.substr(1, 3)` nima qaytaradi?",
          options: ["Ali", "lis", "ish", "l"],
          answer: 1,
          explanation:
            "Indeks 1 bu l. Undan keyin 3 ta belgi: l, i, s. Asl s Alish bo'lib qoladi.",
        },
        {
          id: "8.6-q2",
          question: "`s.find(\"z\")` hech narsa topmasa, natijani nima bilan solishtirish kerak?",
          options: [
            "0 bilan",
            "std::string::npos bilan",
            "natijani cout ga berish yetarli",
            "s.length() bilan, doim teng",
          ],
          answer: 1,
          explanation:
            "Topilmasa find npos qaytaradi. Chop etilsa, ulkan musbat son chiqadi. Yo'qligini npos bilan solishtirish aytadi.",
        },
        {
          id: "8.6-q3",
          question: "`cin >> yosh` dan keyin `ignore` siz `getline` chaqirilsa va foydalanuvchi `18` deb Enter bosgan bo'lsa, `ism` nima bo'ladi?",
          options: [
            "18 satrga aylanadi",
            "bo'sh satr, uzunligi 0",
            "keyingi so'z o'qiladi",
            "dastur yig'ilmaydi",
          ],
          answer: 1,
          explanation:
            ">> sonni oladi, Enter buferda qoladi. getline shu yangi qatorni bo'sh satr deb o'qiydi. Ism kutmaydi. Oldin ignore kerak.",
        },
      ],
    },
  ],
};

export const chapter8 = decode(rawChapter);
