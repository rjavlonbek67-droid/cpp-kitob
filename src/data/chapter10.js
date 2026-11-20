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
  id: "10",
  number: 10,
  title: "Tuzilmalar va Sanab o'tiladigan turlar",
  summary:
    "Har xil maydonlarni bitta qutiga yig'ish, shu qutilar qatori, strelka va nomlangan holatlar.",
  lessons: [
    {
      id: "10.1",
      navTitle: "struct",
      title: "struct: har xil ma'lumotni bitta qutiga yig'ish",
      goal: [
        "Bu darsdan keyin siz `struct` ni bir nechta turdagi maydonni bitta nom ostida yig'adigan quti deb ochasiz. Nuqta bilan maydonni o'qiysiz va yozasiz. Nusxa maydonma-maydon ketishini, boshlang'ich qiymat tartibi e'lon tartibi ekanini va maydonlar orasida tekislash bo'shlig'i qolishi mumkinligini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Anketa varaqi bitta. Ichida yosh ham bor, baho ham bor. Yoshni alohida cho'ntakka, bahoni boshqa cho'ntakka solib yurmaymiz. Varaqning nomi `ali`. Ichidagi qatorlar maydon: `yosh`, `baho`.",
          "Varaqni nusxalasangiz, ikkinchi varaqqa yosh ham, baho ham ko'chadi. Keyin ikkinchi varaqning bahosini o'zgartirsangiz, birinchisi o'zgarmaydi. Bu massivdagi kabi bitta nom ostidagi qator emas, bu bir odamning hujjati.",
          "Qatorlar varaqda yozilgan tartibda turadi. Avval yosh, keyin baho desangiz, `{18, 5}` ham shu tartib. 5 ni yosh deb o'qimaysiz, chunki u ikkinchi qator.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`struct` yangi tur ochadi. Maydonlar e'lon tartibida yotadi. Obyekt nuqta bilan maydonga kiradi. Yopilish qavsidan keyin nuqta-vergul shart.",
        ],
        items: [
          {
            title: "Tur va obyekt",
            paragraphs: [
              "`struct Talaba { int yosh; int baho; };` tur. `Talaba` ning o'zi hali xotirada odam emas. `Talaba ali{18, 5};` obyekt: birinchi maydon 18, ikkinchisi 5.",
              "Nuqta maydon tanlaydi. `ali.yosh` shu obyektning yoshi. `ali.baho = 4` faqat bahoni yozadi, yosh tegilmaydi. Maydon nomi tashqarida yolg'iz `yosh` emas.",
              "Qavsdan keyin nuqta-vergul yo'qolsa, tur yopilmagan hisoblanadi va keyingi qator yig'ilmaydi. `struct` ham, `enum` ham shu nuqta-vergulni kutadi.",
            ],
            code: `struct Talaba {
    int yosh;
    int baho;
};

Talaba ali{18, 5};`,
            codeLabel: "tur, keyin obyekt",
          },
          {
            title: "Nusxa va tayinlash",
            paragraphs: [
              "`Talaba vali = ali;` maydonlarni nusxalaydi. `vali` yangi obyekt. Keyin `vali.baho = 4` faqat nusxadagi bahoni o'zgartiradi. `ali.baho` 5 da qoladi.",
              "Massivni `a = b` qilib bo'lmaydi, 8.1. `struct` ni tayinlash mumkin: `ali = vali;` har bir maydonni yozadi. Ichida oddiy `int` bo'lsa, nusxa shu sonlarning nusxasi.",
              "Lokal `Talaba ali;` maydonlarga qiymat yozmasdan ochiladi. `ali.yosh` ni darrov o'qish noma'lum. `Talaba ali{}` maydonlarni nol qiladi. `Talaba ali{18, 5}` aniq qiymat qo'yadi.",
            ],
            code: `Talaba ali{18, 5};
Talaba vali = ali;
vali.baho = 4;`,
            codeLabel: "nusxa alohida quti",
          },
          {
            title: "Tartib va tekislash",
            paragraphs: [
              "Jingalak ichidagi sonlar maydon tartibida tushadi. `{18, 5}` da 18 `yosh`, 5 `baho`. `{5, 18}` teskari ma'no, lekin kod yig'iladi. Nom emas, o'rin qaraydi.",
              "Maydonlar e'lon tartibida yonma-yon yotadi. `int` odatda 4 baytlik chegaraga tekislanadi. `char` dan keyin `int` kelsa, orada bo'sh bayt qolishi mumkin. Til har bir kompilyatorning bayt sonini qat'iy yozmaydi. Shu kitobdagi Windowsda `char` va undan keyingi `int` bor tuzilma odatda 8 bayt: 1 bayt belgi, 3 bayt bo'sh, 4 bayt `int`.",
              "Ikki `int` li `Talaba` da orada bo'sh joy kerak emas. Odatda 8 bayt: 4 + 4. `sizeof` ni maydonlar yig'indisi deb ko'r-ko'rona qo'shmang.",
            ],
            table: {
              caption: "Shu kitobdagi odatiy Windows joylashuvi. Standart boshqa tekislashga ham yo'l qo'yadi.",
              headers: ["Tur", "Maydonlar", "Odatdagi sizeof"],
              rows: [
                ["Talaba", "int, int", "8"],
                ["Aralash", "char, keyin int", "8, 5 emas"],
              ],
            },
          },
        ],
      },
      examples: [
        {
          title: "Bitta anketada yosh va baho",
          intro: [
            "`ali` ning yoshi 18, bahosi 5. Nuqta qaysi maydon ekanini aytadi.",
          ],
          codeLabel: "anketa.cpp",
          code: `#include <iostream>

struct Talaba {
    int yosh;
    int baho;
};

int main() {
    Talaba ali{18, 5};
    std::cout << ali.yosh << "{{n}}";
    std::cout << ali.baho << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `18
5`,
          analysis: [
            {
              lines: "3-6",
              text: "Tur ochiladi. Birinchi maydon `yosh`, ikkinchisi `baho`, ikkalasi `int`. 6-qatordagi nuqta-vergul turni yopadi. Hali obyekt yo'q.",
            },
            {
              lines: "9",
              text: "`ali` bitta `Talaba`. 18 birinchi maydonga, 5 ikkinchisiga. Tartib e'lon tartibi. `{5, 18}` bo'lsa, yosh 5, baho 18 bo'lardi.",
            },
            {
              lines: "10",
              text: "`ali.yosh` shu obyektning birinchi maydoni. Ekranda 18. `yosh` yolg'iz tursa, qaysi anketa ekani yo'q.",
            },
            {
              lines: "11",
              text: "`ali.baho` ikkinchi maydon, 5. Yoshga tegilmagan. Ikki `cout`, ikki qator.",
            },
          ],
        },
        {
          title: "Nusxadagi baho aslini o'zgartirmaydi",
          intro: [
            "`vali` `ali` dan ko'chiriladi. Keyin faqat `vali.baho` 4 bo'ladi. `ali.baho` 5 qoladi.",
          ],
          codeLabel: "nusxa.cpp",
          code: `#include <iostream>

struct Talaba {
    int yosh;
    int baho;
};

int main() {
    Talaba ali{18, 5};
    Talaba vali = ali;
    vali.baho = 4;
    std::cout << ali.baho << "{{n}}";
    std::cout << vali.baho << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `5
4`,
          analysis: [
            {
              lines: "9-10",
              text: "`ali` da 18 va 5. `vali = ali` yangi obyekt ochadi va ikkala maydonni nusxalaydi. Hozircha ikkalasida ham baho 5.",
            },
            {
              lines: "11",
              text: "`vali.baho = 4` faqat nusxadagi ikkinchi maydon. `ali` ning baytlari yozilmaydi. Yoshlar ham 18 da qoladi.",
            },
            {
              lines: "12-13",
              text: "Avval `ali.baho`, 5. Keyin `vali.baho`, 4. Ikki anketa, ikki baho.",
            },
            {
              lines: "massiv",
              text: "`int a[2] = b;` kabi massiv tayinlash yig'ilmaydi. `Talaba` oddiy maydonlardan iborat bo'lsa, `ali = vali` yig'iladi va maydonlarni yozadi.",
            },
          ],
        },
        {
          title: "Ikki int 8 bayt, char va int ham odatda 8",
          intro: [
            "Maydonlarni qo'shib 1+4=5 demang. `int` o'z chegarasiga suriladi. Shu kitobdagi Windowsda ikkala `sizeof` ham 8.",
          ],
          codeLabel: "olcham.cpp",
          code: `#include <iostream>

struct Juft {
    int a;
    int b;
};

struct Aralash {
    char belgi;
    int son;
};

int main() {
    std::cout << sizeof(Juft) << "{{n}}";
    std::cout << sizeof(Aralash) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `8
8`,
          analysis: [
            {
              lines: "3-6",
              text: "`Juft` ikkita `int`. Odatda 4+4, orada bo'sh joy yo'q. `sizeof` 8.",
            },
            {
              lines: "8-11",
              text: "`belgi` 1 bayt. Keyingi `int` 4 ga bo'linadigan joydan boshlanadi. 1-dan 3-gacha bo'sh qoladi, `son` 4-baytdan. Jami 8, 5 emas.",
            },
            {
              lines: "14-15",
              text: "Ekranda 8, keyin 8. Bu shu kitobdagi Windows joylashuvi. Til boshqa muhitda boshqa bo'shliqqa ruxsat beradi. Raqamni qoida deb yodlamang, `sizeof` ni o'sha muhitda so'rang.",
            },
            {
              lines: "o'qish",
              text: "`Aralash quti;` deb ochib, `quti.son` ni yozmasdan o'qish noma'lum. `sizeof` qutining o'lchami, ichidagi axlatni o'qimaydi. Qiymat kerak bo'lsa, `{..., ...}` yoki `{}` yozing.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`Talaba ali{18, 5};` bitta uzilmagan bo'lak. Avval `yosh` ning 4 bayti, ichida 18. Darrov keyin `baho` ning 4 bayti, ichida 5. Bosh manzil A bo'lsa, yosh A da, baho A+4 da. Butun anketa 8 bayt.",
          "`Talaba vali = ali;` boshqa bo'lak, manzil B. A dagi 8 bayt B ga nusxalanadi. Keyin `vali.baho = 4` faqat B+4 dagi 4 baytni yozadi. A+4 dagi 5 tegilmaydi.",
          "`Aralash` da `char` A da. A+1, A+2, A+3 tekislash uchun bo'sh, ularda maydon yo'q. `son` A+4 da. `sizeof` 8, chunki keyingi shunday quti ham 4 chegaradan tushishi kerak. Bo'sh baytlar sizning qiymatingiz emas, ularni maydon deb o'qimang.",
          "Lokal `Talaba ali;` ham joy oladi, lekin ichidagi baytlar yozilmagan. `ali.yosh` ni o'qish noma'lum. `Talaba ali{}` har bir maydonni nol qiladi, bo'sh tekislash baytlari ham nol bo'ladi.",
        ],
        diagram: `Talaba ali, manzil A
  yosh [18]  A
  baho [5]   A+4
  sizeof odatda 8

vali = ali, manzil B
  nusxa: 18 va 5
  vali.baho = 4 faqat B+4

Aralash
  belgi  A
  bo'sh  A+1 A+2 A+3
  son    A+4
  sizeof odatda 8, 5 emas`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Tuzilma xatosi nuqta-vergulni unutish, maydon tartibini almashtirish yoki yozilmagan lokalni o'qish. Kod ba'zan yig'iladi, ma'no esa boshqa anketa bo'ladi.",
        ],
        items: [
          {
            title: "Turdan keyin nuqta-vergul qo'ymaslik",
            why: [
              "`struct` e'loni nuqta-vergul bilan tugaydi. Qo'yilmasa, keyingi `int main` turni davom ettirayotgandek o'qiladi va yig'ilish to'xtaydi.",
            ],
            wrong: `struct Talaba {
    int yosh;
    int baho;
}`,
            right: `struct Talaba {
    int yosh;
    int baho;
};`,
          },
          {
            title: "Qiymat tartibini maydon nomi deb o'ylash",
            why: [
              "`{5, 18}` birinchi maydonga 5 yozadi. Birinchi maydon `yosh` bo'lsa, yosh 5 bo'ladi. Kod yig'iladi. Anketa boshqa odamnikiga o'xshaydi. E'lon tartibini va jingalak tartibini bir xil tuting.",
            ],
            wrong: `Talaba ali{5, 18};`,
            right: `Talaba ali{18, 5};`,
          },
          {
            title: "Yozilmagan lokal maydonni o'qish",
            why: [
              "`Talaba ali;` joy ochadi, 18 qo'ymaydi. `ali.yosh` noma'lum. Nol kerak bo'lsa `{}`. Aniq son kerak bo'lsa `{18, 5}`.",
            ],
            wrong: `Talaba ali;
std::cout << ali.yosh << "{{n}}";`,
            right: `Talaba ali{18, 5};
std::cout << ali.yosh << "{{n}}";`,
          },
        ],
      },
      quiz: [
        {
          id: "10.1-q1",
          question: "`struct Talaba { int yosh; int baho; };` va `Talaba ali{18, 5};`. `ali.baho` necha?",
          options: ["18", "5", "0", "kod yig'ilmaydi"],
          answer: 1,
          explanation:
            "Jingalak tartibi e'lon tartibi. 18 yosh, 5 baho. ali.baho ikkinchi maydon.",
        },
        {
          id: "10.1-q2",
          question: "`Talaba vali = ali;` va `ali.baho` 5. Keyin `vali.baho = 4`. `ali.baho` necha?",
          options: ["4", "5", "0", "ikkalasi ham 4 bo'ladi"],
          answer: 1,
          explanation:
            "Nusxa yangi obyekt. vali.baho faqat nusxani yozadi. ali.baho 5 da qoladi.",
        },
        {
          id: "10.1-q3",
          question: "`char` dan keyin `int` turgan tuzilma odatda necha bayt, 5 emas?",
          options: [
            "char ham 4 bayt bo'lgani uchun",
            "int chegarasiga tekislash uchun orada bo'sh bayt qoladi, jami 8",
            "har doim aynan 5, sizeof yolg'on",
            "bunday tur yig'ilmaydi",
          ],
          answer: 1,
          explanation:
            "char 1 bayt. int odatda 4 ga tekislanadi, orada 3 bayt bo'sh. 1+3+4=8. Bu shu kitobdagi Windows odat. Maydon yig'indisi 5 bo'lib ko'rinadi.",
        },
      ],
    },
    {
      id: "10.2",
      navTitle: "Massiv va strelka",
      title: "Struktura massivi va ko'rsatkich, -> operatori",
      goal: [
        "Bu darsdan keyin siz `Talaba` lardan qator yasaysiz va `guruh[i].baho` deb maydonga kirasiz. Ko'rsatkichda nuqta emas, `->` ishlatasiz. `p->baho` bilan `(*p).baho` bitta maydon ekanini, `p + 1` keyingi anketa ekanini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Guruh jildi. Ichida anketa varaqalari qator. Birinchi varaq indeks 0. `guruh[1]` ikkinchi odamning butun varag'i. Undan keyin nuqta: o'sha varaqning baho qatori.",
          "Ko'rsatkich varaqning ustiga qo'yilgan barmoq. Barmoq varaqning o'zi emas, qaysi varaq ekanini ko'rsatadi. `->` «barmoq turgan varaqni och, ichidagi qatorni ol». Nuqta esa qo'lingizdagi varaqning o'zida.",
          "Barmoqni bitta o'ngga sursangiz, keyingi to'liq anketa keladi, keyingi bitta `int` emas. Anketa 8 bayt bo'lsa ham, qadam «1 ta Talaba». 9.5 dagi element qadami shu yerda ham ishlaydi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Massiv elementi obyekt. Unga nuqta. Ko'rsatkich manzil. Unga strelka. Strelka `(*p).maydon` ning qisqa yozuvi.",
        ],
        items: [
          {
            title: "Qator va nuqta",
            paragraphs: [
              "`Talaba guruh[2]{{18, 5}, {19, 4}};` ikkita anketa. `guruh[0]` birinchisi, yoshi 18, bahosi 5. `guruh[1].baho` ikkinchi anketa, maydon baho, qiymat 4.",
              "Avval qavs, keyin nuqta. `guruh[1]` obyektni tanlaydi. `.baho` shu obyektning maydoni. `guruh.baho` yig'ilmaydi: qatorning o'zida `baho` maydoni yo'q, maydon elementda.",
              "Indeks 0 dan, oxirgisi `2 - 1`. `guruh[2]` chegaradan tashqari, 8.3. Ichidagi maydon ham uni yaroqli qilmaydi.",
            ],
            code: `Talaba guruh[2]{{18, 5}, {19, 4}};
std::cout << guruh[1].baho << "{{n}}";`,
            codeLabel: "element, keyin maydon",
          },
          {
            title: "Strelka",
            paragraphs: [
              "`Talaba* p = &ali;` `p` anketaning manzili. `p->yosh` shu anketaning yoshi. `(*p).yosh` ham o'sha maydon. Qavs shart, chunki nuqta yulduzdan qattiqroq yopishadi.",
              "`*p.yosh` bu `*(p.yosh)` deb o'qiladi. `p` ko'rsatkich bo'lsa, unda `.yosh` maydoni yo'q, kod yig'ilmaydi. Yulduz tashqarida qolishi uchun `(*p).yosh` yoki `p->yosh`.",
              "`p->baho = 3` manzildagi anketani yozadi. `ali.baho` ham 3 bo'ladi, agar `p` `ali` ni ko'rsatayotgan bo'lsa. Bu 9.3 dagi `*p = 21` ning maydonli turi. `p` dagi manzil o'zgarmaydi.",
            ],
            code: `Talaba* p = &ali;
std::cout << p->baho << "{{n}}";
p->baho = 3;`,
            codeLabel: "strelka maydonni ochadi",
          },
          {
            title: "Qator bo'ylab qadam",
            paragraphs: [
              "`Talaba* p = guruh;` birinchi elementning manzili. Massiv nomi shu yerga aylanadi, 9.5. `p->yosh` bu `guruh[0].yosh`.",
              "`p = p + 1` keyingi `Talaba`. Bayt hisobida odatda `sizeof(Talaba)` qo'shiladi, ikki `int` da 8. Ayirish `p - guruh` esa elementda, natija 1. Bitta `int` ga emas, butun anketaga qadam.",
              "`p` `nullptr` bo'lsa, `p->yosh` noma'lum. Tekshiruvsiz strelka qo'ymang. Oxiridan bir qadam narini hisoblash mumkin, `->` bilan ochish mumkin emas.",
            ],
            code: `Talaba* p = guruh;
p = p + 1;
std::cout << p->yosh << "{{n}}";`,
            codeLabel: "keyingi anketa",
          },
        ],
      },
      examples: [
        {
          title: "Ikki anketa, ikkinchisining bahosi 4",
          intro: [
            "Qator 0 da 18 va 5. Qator 1 da 19 va 4. `guruh[0].yosh` 18, `guruh[1].baho` 4.",
          ],
          codeLabel: "guruh.cpp",
          code: `#include <iostream>

struct Talaba {
    int yosh;
    int baho;
};

int main() {
    Talaba guruh[2]{{18, 5}, {19, 4}};
    std::cout << guruh[0].yosh << "{{n}}";
    std::cout << guruh[1].baho << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `18
4`,
          analysis: [
            {
              lines: "9",
              text: "Ikki `Talaba`. Birinchi jingalak indeks 0: yosh 18, baho 5. Ikkinchi indeks 1: yosh 19, baho 4. Ichki tartib ham maydon tartibi.",
            },
            {
              lines: "10",
              text: "`guruh[0]` birinchi obyekt. `.yosh` uning birinchi maydoni. Ekranda 18. `guruh[0].baho` bo'lsa 5 chiqardi.",
            },
            {
              lines: "11",
              text: "`guruh[1].baho` ikkinchi odamning bahosi, 4. Yoshi 19, bu qatorda so'ralmagan.",
            },
            {
              lines: "chegara",
              text: "`guruh[2]` yo'q. Maydon yozish chegarani tuzatmaydi. Yaroqli indekslar 0 va 1.",
            },
          ],
        },
        {
          title: "Strelka yozsa, anketa ham o'zgaradi",
          intro: [
            "`p` `ali` ni ko'rsatadi. `(*p).yosh` 18, `p->baho` 5. Keyin `p->baho = 3`, `ali.baho` ham 3.",
          ],
          codeLabel: "strelka.cpp",
          code: `#include <iostream>

struct Talaba {
    int yosh;
    int baho;
};

int main() {
    Talaba ali{18, 5};
    Talaba* p = &ali;
    std::cout << (*p).yosh << "{{n}}";
    std::cout << p->baho << "{{n}}";
    p->baho = 3;
    std::cout << ali.baho << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `18
5
3`,
          analysis: [
            {
              lines: "9-10",
              text: "`ali` obyekt. `p` uning manzili. `p` ning ichida 18 yoki 5 yo'q, joy raqami bor.",
            },
            {
              lines: "11",
              text: "`(*p)` avval obyektni ochadi, keyin `.yosh`. Qavs yulduzni nuqtadan oldin ishlatadi. Ekranda 18.",
            },
            {
              lines: "12-14",
              text: "`p->baho` ham shu baho, 5. `p->baho = 3` manzildagi maydonni yozadi. `ali.baho` endi 3. Manzil o'sha `ali` da qoladi.",
            },
            {
              lines: "xato yozuv",
              text: "`*p.baho` qavssiz `*(p.baho)` bo'ladi. Ko'rsatkichda `.baho` yo'q, yig'ilmaydi. Strelka shu qavsni yashiradi.",
            },
          ],
        },
        {
          title: "p + 1 keyingi talaba, farq 1",
          intro: [
            "`p` avval 18 yoshli anketada. Bir qadamdan keyin 19. `p - guruh` bitta element, bayt emas.",
          ],
          codeLabel: "qadam.cpp",
          code: `#include <iostream>

struct Talaba {
    int yosh;
    int baho;
};

int main() {
    Talaba guruh[2]{{18, 5}, {19, 4}};
    Talaba* p = guruh;
    std::cout << p->yosh << "{{n}}";
    p = p + 1;
    std::cout << p->yosh << "{{n}}";
    std::cout << (p - guruh) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `18
19
1`,
          analysis: [
            {
              lines: "10-11",
              text: "`p = guruh` birinchi elementning manzili, `&guruh[0]`. `p->yosh` 18. Butun massiv `p` ga nusxalanmaydi.",
            },
            {
              lines: "12-13",
              text: "`p + 1` keyingi `Talaba`. Odatda 8 bayt nariga, lekin qadam 1 anketa. `p->yosh` endi 19, ya'ni `guruh[1].yosh`.",
            },
            {
              lines: "14",
              text: "`p - guruh` qavs ichida, chunki `<<` ayirishdan kuchliroq. Natija 1 element. 8 bayt ichki siljish, ekrandagi farq emas.",
            },
            {
              lines: "to'xtash",
              text: "`guruh + 2` ikki elementdan keyingi chiziq. Uni `->` bilan ochmang. `p` shu chiziqqa teng bo'lsa, anketa yo'q.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`guruh` ikkita 8 baytlik anketa, yonma-yon. Indeks 0 manzil A: yosh 18, baho 5. Indeks 1 manzil A+8: yosh 19, baho 4. `guruh[1].baho` A+8 dan keyin 4 bayt, ya'ni A+12 dagi 4.",
          "`Talaba* p = &ali;` ko'rsatkich qutisi, ichida `ali` ning boshi. `p->baho` shu boshdan `baho` siljishini qo'shadi, odatda +4, va o'sha `int` ni ochadi. `p->baho = 3` o'sha 4 baytni 3 qiladi. `ali` nomi ham o'sha blokni ko'rsatadi.",
          "`p = p + 1` ichidagi manzilga `sizeof(Talaba)` qo'shadi. Ikki `int` li anketa odatda 8. `p - guruh` necha marta shu qadam qo'yilganini aytadi, baytni emas. Ekrandagi 1 shu sanoq.",
          "`*p.baho` kompilyator nuqtani avval ko'radi. `p` da maydon qidiradi, topolmaydi, yig'ilmaydi. Xotira ochilmaydi. `(*p).baho` avval manzilga kiradi, keyin maydonni tanlaydi.",
        ],
        diagram: `guruh
  [0] A    yosh 18 | baho 5
  [1] A+8  yosh 19 | baho 4

p ichida A
p + 1 ichida A+8
p - guruh = 1 element

p->baho  =  A dan 4 bayt naridagi int
(*p).baho ham o'sha
*p.baho yig'ilmaydi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Strelka xatosi nuqtani ko'rsatkichga qo'yish yoki qatorning o'zidan maydon so'rash. Qadamni bitta `int` deb o'qish ham ikkinchi odamning yoshini baho qilib oladi.",
        ],
        items: [
          {
            title: "Ko'rsatkichga nuqta qo'yish",
            why: [
              "`p.baho` yig'ilmaydi. `p` obyekt emas, manzil. Maydon uchun `p->baho` yoki `(*p).baho`. Obyektning o'zida, `ali.baho`, nuqta to'g'ri.",
            ],
            wrong: `std::cout << p.baho << "{{n}}";`,
            right: `std::cout << p->baho << "{{n}}";`,
          },
          {
            title: "Qavssiz *p.baho yozish",
            why: [
              "Nuqta yulduzdan oldin bog'lanadi. `*p.baho` bu `*(p.baho)`. Ko'rsatkichda maydon yo'q. Obyektni avval oching: `(*p).baho`. Strelka shuni qisqartiradi.",
            ],
            wrong: `std::cout << *p.baho << "{{n}}";`,
            right: `std::cout << (*p).baho << "{{n}}";`,
          },
          {
            title: "Massiv nomidan to'g'ri maydon so'rash",
            why: [
              "`guruh.baho` qator turida yo'q. Avval element: `guruh[i].baho`. `i` 0 yoki 1. `guruh[2]` yo'q.",
            ],
            wrong: `std::cout << guruh.baho << "{{n}}";`,
            right: `std::cout << guruh[1].baho << "{{n}}";`,
          },
        ],
      },
      quiz: [
        {
          id: "10.2-q1",
          question: "`guruh[0]` da yosh 18 va baho 5, `guruh[1]` da yosh 19 va baho 4. `guruh[1].yosh` necha?",
          options: ["18", "5", "19", "4"],
          answer: 2,
          explanation:
            "Indeks 1 ikkinchi anketa. Uning birinchi maydoni yosh, 19. 4 shu anketa bahosi, guruh[1].baho.",
        },
        {
          id: "10.2-q2",
          question: "`p` `ali` ni ko'rsatadi, `ali.baho` 5. `p->baho = 3` dan keyin `ali.baho` necha?",
          options: ["5", "3", "kod yig'ilmaydi", "faqat p o'zgaradi, ali 5 qoladi"],
          answer: 1,
          explanation:
            "Strelka p ichidagi manzildagi maydonni yozadi. Bu ali ning bahosi. Ikkalasi bitta quti.",
        },
        {
          id: "10.2-q3",
          question: "`*p.baho` qanday o'qiladi, `p` ko'rsatkich bo'lsa?",
          options: [
            "(*p).baho bilan bir xil",
            "*(p.baho), ko'rsatkichda maydon yo'q, yig'ilmaydi",
            "keyingi Talaba",
            "p ni 1 bayt suradi",
          ],
          answer: 1,
          explanation:
            "Nuqta unary yulduzdan qattiqroq. Avval p.baho qidiriladi. To'g'ri ochish (*p).baho yoki p->baho.",
        },
      ],
    },
    {
      id: "10.3",
      navTitle: "enum",
      title: "enum va enum class: nomlangan holat",
      goal: [
        "Bu darsdan keyin siz sehrli son o'rniga nomlangan holat yozasiz. Eski `enum` sonni o'zi chiqarishini va nomlarni tashqariga oqizishini bilasiz. `enum class` nomni `Holat::` bilan ushlashini, `int` ga o'zi aylanmasligini va ekranga nom chiqishi uchun o'zingiz yozishingiz kerakligini tushunasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Eshikda yozuv: «yangi», «jarayonda», «tayyor». Ichkarida ombor 0, 1, 2 deb sanashi mumkin. Siz eshikdagi so'z bilan ishlaysiz. 2 nimani anglatishini har safar eslab yurmaymiz.",
          "Eski `enum` yorliqni koridorga ham osib qo'yadi. `yashil` degan so'z butun xonada yolg'iz yuradi. Boshqa ro'yxat ham `yashil` desa, ikki yorliq urishadi. `enum class` yorliqni xona ichida ushlaydi: `Rang::qizil` va `Chiroq::qizil` ikki xil eshik.",
          "Ekranga 1 chiqsa, o'quvchi «yashil» deb o'qimaydi. Konsol sonni ko'rsatadi, nomni emas. Nom kerak bo'lsa, `if` yoki `switch` bilan so'zni o'zingiz yozasiz.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`enum` va `enum class` butun qiymatli nomlar ro'yxati. Birinchisi sukut bo'yicha 0, keyingisi 1 ga oshadi. `= son` dan keyin navbat shu sondan davom etadi. Nuqta-vergul turdan keyin shart.",
        ],
        items: [
          {
            title: "Eski enum",
            paragraphs: [
              "`enum Rang { qizil, yashil, kok };` da `qizil` 0, `yashil` 1, `kok` 2. `Rang r = yashil;` yoziladi. `std::cout << r` sonni chiqaradi, `yashil` so'zini emas. Ekranda 1.",
              "Nomlar tashqi sohaga oqadi. Shu joyda ikkinchi `enum` ham `qizil` desa, yig'ilmaydi. `Rang::qizil` ham yoziladi, lekin yolg'iz `qizil` ham ko'rinadi.",
              "Eski `enum` `int` ga o'zi aylanadi. `int n = r;` yig'iladi. Teskari yo'l, `Rang r = 1;`, o'zi yig'ilmaydi. Sonni qaytarish uchun `static_cast` kerak. Ikki xil eski ro'yxat son bo'lib solishtirilishi mumkin, bu adashish.",
            ],
            code: `enum Rang { qizil, yashil, kok };
Rang r = yashil;
std::cout << r << "{{n}}";`,
            codeLabel: "ekranda 1, so'z emas",
            table: {
              caption: "Sukutdagi sanoq 0 dan. Qiymat bersangiz, keyingisi undan davom etadi.",
              headers: ["Nom", "enum Rang", "Kun, dushanba = 1"],
              rows: [
                ["birinchi", "qizil = 0", "dushanba = 1"],
                ["ikkinchi", "yashil = 1", "seshanba = 2"],
                ["uchinchi", "kok = 2", "chorshanba = 3"],
              ],
            },
          },
          {
            title: "enum class",
            paragraphs: [
              "`enum class Holat { yangi, jarayonda, tayyor };` nomlar ichkarida. `Holat h = Holat::tayyor;` to'g'ri. Yolg'iz `tayyor` yig'ilmaydi. Boshqa `enum class` ham `tayyor` desa, ular `Holat::tayyor` va `Boshqa::tayyor` bo'lib ajraladi.",
              "`int` ga o'zi aylanmaydi. `int n = h;` yig'ilmaydi. `h == 2` ham yig'ilmaydi. Solishtirish `h == Holat::tayyor`. Son kerak bo'lsa, `static_cast<int>(h)`. `tayyor` sukutda 2, chunki `yangi` 0, `jarayonda` 1.",
              "`std::cout << h` yig'ilmaydi. Oqim `enum class` ni son ham, so'z ham qilib bilmaydi. So'z kerak bo'lsa, `switch` yoki `if` yozing. `case` yorlig'i ham `Holat::tayyor`, yalang `2` emas.",
            ],
            code: `enum class Holat { yangi, jarayonda, tayyor };
Holat h = Holat::tayyor;
if (h == Holat::tayyor) {
    std::cout << "tayyor{{n}}";
}`,
            codeLabel: "nom soha ichida",
          },
          {
            title: "Boshlang'ich son va switch",
            paragraphs: [
              "`enum class Kun { dushanba = 1, seshanba, chorshanba };` da `dushanba` 1, `seshanba` 2, `chorshanba` 3. Keyingi nom oldingisidan 1 katta, toki yangi `=` kelmasa.",
              "`switch (k)` da har bir `case` o'z `break` ini olsin, 5.6. `break` yo'q bo'lsa, keyingi yorliq ham yuradi. `enum class` da `case 2:` emas, `case Kun::seshanba:`.",
              "Ikkalasidan kundalik tanlov `enum class`. Eski `enum` ni boshqa odamning kodi ishlatayotgan bo'lsa, uning son oqishini biling. Yangi kodda nomni soha ichida ushlang.",
            ],
            code: `switch (k) {
case Kun::seshanba:
    std::cout << "seshanba{{n}}";
    break;
}`,
            codeLabel: "so'zni o'zingiz yozasiz",
          },
        ],
      },
      examples: [
        {
          title: "yashil ekranda 1, so'z emas",
          intro: [
            "`qizil` 0, `yashil` 1, `kok` 2. `cout` qiymatni son qilib yozadi. `yashil` degan matn chiqmaydi.",
          ],
          codeLabel: "rang.cpp",
          code: `#include <iostream>

enum Rang { qizil, yashil, kok };

int main() {
    Rang r = yashil;
    std::cout << r << "{{n}}";
    std::cout << kok << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
2`,
          analysis: [
            {
              lines: "3",
              text: "`qizil` 0, `yashil` 1, `kok` 2. Hech kim `= 1` yozmagan, sanoq 0 dan o'zi ketadi. Nuqta-vergul turni yopadi.",
            },
            {
              lines: "6-7",
              text: "`r` ning qiymati `yashil`, ya'ni 1. `cout` so'zni emas, shu sonni yozadi. Ekranda `1`. «yashil» chiqishini kutmang.",
            },
            {
              lines: "8",
              text: "`kok` 2. Nom tashqarida ham ko'rinadi, shuning uchun `Rang::` siz yozildi. Ekranda 2.",
            },
            {
              lines: "oqish",
              text: "Shu faylda `enum Chiroq { qizil, ochiq };` yig'ilmaydi. `qizil` allaqachon bor. `enum class` ikkala `qizil` ni ham ushlab qoladi.",
            },
          ],
        },
        {
          title: "enum class sonni o'zi bermaydi, so'zni if beradi",
          intro: [
            "`Holat::tayyor` sukutda 2. `static_cast<int>` shu 2 ni chiqaradi. Tenglik nom bilan, keyin ekranga `tayyor` matni yoziladi.",
          ],
          codeLabel: "holat.cpp",
          code: `#include <iostream>

enum class Holat { yangi, jarayonda, tayyor };

int main() {
    Holat h = Holat::tayyor;
    std::cout << static_cast<int>(h) << "{{n}}";
    if (h == Holat::tayyor) {
        std::cout << "tayyor{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `2
tayyor`,
          analysis: [
            {
              lines: "3",
              text: "`yangi` 0, `jarayonda` 1, `tayyor` 2. Nomlar `Holat::` ichida. Yolg'iz `tayyor` bu qatordan tashqarida ko'rinmaydi.",
            },
            {
              lines: "6-7",
              text: "`h` ga `Holat::tayyor` yoziladi. `cout << h` yig'ilmaydi. `static_cast<int>` 2 ni son qiladi. Ekranda 2, hali so'z yo'q.",
            },
            {
              lines: "8-10",
              text: "`h == 2` yig'ilmaydi. `h == Holat::tayyor` rost. `if` tanasi `tayyor` matnini o'zi yozadi. Nom konsolga o'zi tushmagan.",
            },
            {
              lines: "int",
              text: "`int n = h;` ham yig'ilmaydi. Eski `enum` da bu o'zi ketardi. `enum class` sonni qasddan so'raganingizda beradi.",
            },
          ],
        },
        {
          title: "dushanba 1, seshanba 2, switch so'z yozadi",
          intro: [
            "Birinchi nom 1 dan boshlanadi. `seshanba` 2. `switch` shu holatga `seshanba` matnini yozadi va `break` bilan chiqadi.",
          ],
          codeLabel: "kun.cpp",
          code: `#include <iostream>

enum class Kun { dushanba = 1, seshanba, chorshanba };

int main() {
    Kun k = Kun::seshanba;
    std::cout << static_cast<int>(k) << "{{n}}";
    switch (k) {
    case Kun::dushanba:
        std::cout << "dushanba{{n}}";
        break;
    case Kun::seshanba:
        std::cout << "seshanba{{n}}";
        break;
    case Kun::chorshanba:
        std::cout << "chorshanba{{n}}";
        break;
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `2
seshanba`,
          analysis: [
            {
              lines: "3",
              text: "`dushanba` aniq 1. `seshanba` keyingi son, 2. `chorshanba` 3. 0 bu ro'yxatda yo'q.",
            },
            {
              lines: "6-7",
              text: "`k` `Kun::seshanba`. Son qiyofasi 2. Ekranning birinchi qatori shu. So'z hali yozilmagan.",
            },
            {
              lines: "8-14",
              text: "`switch` `k` ni `Kun::seshanba` yorlig'iga tushiradi. 13-qator `seshanba` matnini yozadi. 14-qator `break` keyingi `case` ga o'tkazmaydi. `dushanba` matni chiqmaydi.",
            },
            {
              lines: "case",
              text: "`case 2:` `enum class` da yig'ilmaydi. Yorliq `Kun::seshanba` bo'lishi kerak. `break` unutilsa, 5.6 dagi kabi keyingi matn ham yozilardi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`Rang r = yashil;` qutiga 1 yoziladi. Ichida `yashil` degan harflar yo'q. `cout` shu butun qiymatni belgi qiladi, shuning uchun ekranda `1`. Nom faqat dastur matnida, kompilyator uni son bilan almashtirgan.",
          "`enum class Holat` ham qutida son saqlaydi. `Holat::tayyor` 2. Farqi shuki, tur `int` emas. `cout` va `== 2` uchun o'zi aylantirish yo'q. `static_cast<int>(h)` yangi `int` ochadi, ichida 2. `h` ning o'zi `Holat` bo'lib qoladi.",
          "`Kun::seshanba` qutida 2, chunki `dushanba` 1 qilib belgilangan va keyingi nom 1 qo'shadi. `switch` shu 2 ni `case Kun::seshanba` bilan solishtiradi, mos kelganda o'sha tanaga kiradi. `break` tanadan chiqaradi, keyingi `case` baytlariga emas.",
          "Eski `enum` ning `qizil` nomi tashqi sohada ham 0 degan qiymatga bog'langan. Ikkinchi ro'yxat yana `qizil` desa, bitta nom ikki sonni anglatmoqchi bo'ladi, yig'ilmaydi. `enum class` har bir nomni o'z turi ichida saqlaydi, tashqi sohada yolg'iz `qizil` qutisi yo'q.",
        ],
        diagram: `enum Rang
  qizil 0, yashil 1, kok 2
  r qutisi: [1]
  cout sonni yozadi, so'zni emas

enum class Holat
  yangi 0, jarayonda 1, tayyor 2
  h qutisi: [2], turi Holat
  int ga o'zi aylanmaydi

enum class Kun
  dushanba 1, seshanba 2, chorshanba 3
  switch mos case ga kiradi, break chiqaradi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Holat xatosi sonni so'z deb o'qish yoki `enum class` ni eski `enum` dek yozish. Ko'pi yig'ilmaydi. Eski `enum` yig'ilsa ham, ekranda nom o'rniga son chiqadi.",
        ],
        items: [
          {
            title: "cout dan nom kutish",
            why: [
              "`std::cout << r` eski `enum` da son yozadi. `yashil` emas, `1`. `enum class` da bu qator umuman yig'ilmaydi. So'z kerak bo'lsa, `if` yoki `switch` ichida matn yozing.",
            ],
            wrong: `enum class Holat { yangi, tayyor };
Holat h = Holat::tayyor;
std::cout << h << "{{n}}";`,
            right: `enum class Holat { yangi, tayyor };
Holat h = Holat::tayyor;
if (h == Holat::tayyor) {
    std::cout << "tayyor{{n}}";
}`,
          },
          {
            title: "enum class ni son bilan solishtirish",
            why: [
              "`h == 2` yig'ilmaydi. 2 `Holat` emas. `h == Holat::tayyor` yozing. Sonni qasddan ko'rmoqchi bo'lsangiz, `static_cast<int>(h)`.",
            ],
            wrong: `if (h == 2) {
    std::cout << "tayyor{{n}}";
}`,
            right: `if (h == Holat::tayyor) {
    std::cout << "tayyor{{n}}";
}`,
          },
          {
            title: "Ikki eski enum da bitta nom",
            why: [
              "Eski `enum` nomni tashqariga chiqaradi. Ikkinchi ro'yxatdagi `qizil` birinchisi bilan urishadi. `enum class` da `Rang::qizil` va `Chiroq::qizil` ajralib turadi.",
            ],
            wrong: `enum Rang { qizil, yashil };
enum Chiroq { qizil, ochiq };`,
            right: `enum class Rang { qizil, yashil };
enum class Chiroq { qizil, ochiq };`,
          },
        ],
      },
      quiz: [
        {
          id: "10.3-q1",
          question: "`enum Rang { qizil, yashil, kok };` va `std::cout << yashil`. Ekranda nima?",
          options: ["yashil", "1", "0", "yashil va 1"],
          answer: 1,
          explanation:
            "Birinchi nom 0, yashil 1. cout sonni yozadi. yashil so'zi dastur matnida, konsolda emas.",
        },
        {
          id: "10.3-q2",
          question: "`enum class Holat { yangi, jarayonda, tayyor };`. `static_cast<int>(Holat::tayyor)` necha?",
          options: ["0", "1", "2", "tayyor"],
          answer: 2,
          explanation:
            "yangi 0, jarayonda 1, tayyor 2. cast shu sonni beradi. cout ning o'zi Holat ni yozmaydi.",
        },
        {
          id: "10.3-q3",
          question: "`Holat h = Holat::tayyor;` bo'lsa, `h == 2` nima qiladi?",
          options: [
            "rost, chunki tayyor 2",
            "yolg'on",
            "kod yig'ilmaydi",
            "ekranga tayyor yozadi",
          ],
          answer: 2,
          explanation:
            "enum class int ga o'zi aylanmaydi. 2 ni Holat bilan solishtirib bo'lmaydi. To'g'ri yozuv h == Holat::tayyor.",
        },
      ],
    },
  ],
};

export const chapter10 = decode(rawChapter);
