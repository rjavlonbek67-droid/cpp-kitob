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
  id: "14",
  number: 14,
  title: "STL - Standard Template Library",
  summary:
    "vector, pair, tuple, stack, queue, set, map va algorithm bilan tayyor konteyner va amallar.",
  lessons: [
    {
      id: "14.1",
      navTitle: "vector",
      title: "std::vector: o'lchami o'sadigan yonma-yon massiv",
      goal: [
        "Bu darsdan keyin siz `std::vector` ni heapdagi yonma-yon massivning egasi deb ochasiz. `push_back` oxiriga qo'shadi, `size` element soni, `capacity` ajratilgan uyalar. `at` chegarani tekshiradi va `std::out_of_range` otadi. `operator[]` tekshirmaydi. `erase` o'chiradi va keyingi elementlarni suradi.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Javon uzun taxta. Kitoblar yonma-yon turadi, birinchi kitob 0-o'rin. `size` javondagi kitoblar soni. `capacity` taxtadagi bo'sh uyalar bilan birga sig'im. Uya bo'sh bo'lsa ham, u kitob emas.",
          "Taxta to'lib, yangi kitob kelsa, sex uzunroq taxta olib, kitoblarni ko'chiradi. Eski taxtaning manzillari o'ladi. Qo'lda yozib qo'yilgan «uchinchi kitob shu mixda» eslayotgan qog'oz endi ishonchsiz. `reserve` oldindan uzun taxta so'raydi, ko'chirish kamayadi.",
          "Kitobni o'rtadan olsangiz, o'ngdagilar chapga suriladi. Raqamlar yangilanadi. Javon o'zi taxtani qaytaradi. Siz `delete` bilan mixni sug'urmaysiz. Javon yiqilganda taxta ham qaytadi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`#include <vector>`. Elementlar bitta uzluksiz blokda, 8-bobdagi massiv kabi `&v[0] + i` bu `i`-element. Blok heapda. Lokal `vector` obyekti chaqiruv stekidagi kichik dasta: odatda bosh, oxir va sig'im ko'rsatkichlari. Standart dastaning aniq baytini va'da qilmaydi.",
        ],
        items: [
          {
            title: "push_back, size, capacity",
            paragraphs: [
              "`push_back` oxiriga nusxa qo'shadi va `size` ni bittaga oshiradi. `size()` elementlar soni. `capacity()` shu blokda sig'adigan uyalar. `capacity() >= size()` doim rost.",
              "`reserve(4)` sig'imni kamida 4 qiladi, `size` ni o'zgartirmaydi. Element tug'maydi. `size` 0 bo'lsa, `v[0]` hali noma'lum. Sig'im yetarli bo'lsa, `push_back` qayta joy ajratmaydi va eski ko'rsatkichlar tirik qoladi.",
              "Yangi `size` eski `capacity` dan oshsa, yangi blok ajratiladi, elementlar ko'chiriladi, eski blok o'chadi. Shu paytdagi barcha iterator, ko'rsatkich va havola bekor. O'sish necha barobar ekani kutubxonaga bog'liq. Aniq `capacity` raqamini konsolga yozmaymiz.",
            ],
            code: `std::vector<int> sonlar;
sonlar.reserve(4);
sonlar.push_back(10);
sonlar.push_back(20);`,
            codeLabel: "sig'im oldindan, keyin ikkita element",
            table: {
              caption: "size va capacity boshqa savol.",
              headers: ["Harakat", "size", "capacity"],
              rows: [
                ["bo'sh vector", "0", "aniq raqam yo'q"],
                ["reserve(4)", "0", "kamida 4"],
                ["ikki push_back", "2", "kamida 4, qayta ajratish yo'q"],
                ["clear()", "0", "o'zgarmaydi, kamida 4 qoladi"],
              ],
            },
          },
          {
            title: "at va operator[]",
            paragraphs: [
              "Indeks 0 dan boshlanadi. `size` 3 bo'lsa, tirik indekslar 0, 1 va 2. `sonlar[0]` tekshiruvsiz o'qiydi. Chegaradan tashqari `[]` noma'lum, 8-bobdagi massiv kabi. Istisno va'da qilinmaydi.",
              "`sonlar.at(2)` chegarani tekshiradi. Indeks `size` dan kichik bo'lsa, shu elementni qaytaradi. Teng yoki katta bo'lsa, `std::out_of_range` otadi. `#include <stdexcept>` bilan `catch (const std::out_of_range&)` ushlaydi. `what()` matni kutubxonaga qarab o'zgaradi, shu sabab konsolda o'z so'zimizni yozamiz.",
              "`front()` birinchi, `back()` oxirgi. `size` 0 bo'lsa, ikkalasi ham noma'lum. `pop_back` oxirgi elementni yo'qotadi, `size` bittaga kamayadi, `capacity` o'sha joyda qoladi. Bo'sh vectordan `pop_back` noma'lum.",
            ],
            code: `std::cout << sonlar[0];
std::cout << sonlar.at(2);
sonlar.pop_back();`,
            codeLabel: "tekshiruvsiz, tekshiruvli, oxirgisini olish",
          },
          {
            title: "erase va egasi",
            paragraphs: [
              "`erase(it)` shu elementni yo'qotadi, o'ngdagilarni chapga suradi, `size` kamayadi. Qaytgan iterator surilgan keyingi elementni ko'rsatadi, oxiri bo'lsa `end()`. O'chirilgan joy va undan o'ngdagi iteratorlar bekor. Chapdagilar tirik.",
              "Sikl ichida `erase(it)` dan keyin `++it` noma'lum, chunki `it` bekor. Keyingisi kerak bo'lsa, `it = sonlar.erase(it)`. O'chmagan tarmoqda `++it`.",
              "Buferning egasi vector. Destruktor elementlarni yo'qotadi va blokni qaytaradi. `delete &sonlar[0]` sizning `new` ingiz emas. `clear()` C++11 dan beri `size` ni 0 qiladi, `capacity` ni tegmaydi. Elementlar yo'qoladi, sig'im qoladi.",
            ],
            code: `sonlar.erase(sonlar.begin() + 1);
it = sonlar.erase(it);`,
            codeLabel: "o'chirish yangi iterator qaytaradi",
          },
        ],
      },
      examples: [
        {
          title: "uch push_back, size 3, yonma-yon",
          intro: [
            "Bo'sh vectorga 10, 20, 30. `size` 3. Birinchi element 10, `at(2)` 30. Birinchi va ikkinchi xotirada yonma-yon.",
          ],
          codeLabel: "vector.cpp",
          code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> sonlar;
    sonlar.push_back(10);
    sonlar.push_back(20);
    sonlar.push_back(30);
    std::cout << sonlar.size() << "{{n}}";
    std::cout << sonlar[0] << "{{n}}";
    std::cout << sonlar.at(2) << "{{n}}";
    std::cout << (&sonlar[0] + 1 == &sonlar[1]) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `3
10
30
1`,
          analysis: [
            {
              lines: "5",
              text: "Bo'sh vector. `size` 0. Element bloki hali yo'q yoki bo'sh. `capacity` ning aniq raqami bu qatorda kutubxonaga bog'liq, ekranga yozilmaydi.",
            },
            {
              lines: "6-8",
              text: "Uchta `push_back`. Oxirida elementlar 10, 20, 30 va `size` 3. Oradagi qayta ajratish bo'lsa ham, tugash holati shu uchta son. Ular bitta uzluksiz blokda.",
            },
            {
              lines: "9-11",
              text: "`size()` 3. `[0]` tekshiruvsiz 10. `at(2)` tekshiradi, 2 < 3, natija 30. `at(3)` bo'lsa, `out_of_range` otardi. `[3]` bo'lsa, noma'lum.",
            },
            {
              lines: "12-13",
              text: "`&sonlar[0] + 1` ikkinchi `int` ning manzili. U `&sonlar[1]` bilan teng, ekranda 1. `<<` taqqoslashdan kuchliroq bog'lanadi, qavslar shart. `return` vectorni yopadi, buferni o'zi qaytaradi.",
            },
          ],
        },
        {
          title: "reserve saqlaydi, clear size ni 0 qiladi",
          intro: [
            "`reserve(4)` sig'imni kamida 4 qiladi. Ikki `push_back` qayta joy ajratmaydi, birinchi elementning ko'rsatkichi 10 ni ko'rsatib turadi. `clear` dan keyin `size` 0, sig'im kamida 4 qoladi.",
          ],
          codeLabel: "reserve.cpp",
          code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> sonlar;
    sonlar.reserve(4);
    sonlar.push_back(10);
    int* bosh = &sonlar[0];
    sonlar.push_back(20);
    std::cout << sonlar.size() << "{{n}}";
    std::cout << (sonlar.capacity() >= 4) << "{{n}}";
    std::cout << *bosh << "{{n}}";
    sonlar.clear();
    std::cout << sonlar.size() << "{{n}}";
    std::cout << (sonlar.capacity() >= 4) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `2
1
10
0
1`,
          analysis: [
            {
              lines: "5-6",
              text: "`reserve(4)` `size` ni 0 da qoldiradi. `capacity` kamida 4. Oldin sig'im kattaroq bo'lsa, o'sha katta qiymat qoladi. Ikkalasida ham `capacity() >= 4` rost. Hali `sonlar[0]` yo'q.",
            },
            {
              lines: "7-9",
              text: "Birinchi `push_back` 10 ni yozadi, `size` 1. `bosh` shu `int` ni ko'rsatadi. Ikkinchi `push_back` 20 ni qo'shadi. Yangi `size` 2, sig'im kamida 4, qayta ajratish yo'q. `bosh` tirik.",
            },
            {
              lines: "10-12",
              text: "Ekranda `size` 2, keyin 1 (`capacity >= 4`), keyin 10. Taqqoslashni qavs ichiga olamiz, aks holda `<<` avval ishlaydi.",
            },
            {
              lines: "13-16",
              text: "`clear()` elementlarni yo'qotadi. `size` 0. C++11 dan beri `capacity` o'zgarmaydi, ekrandagi ikkinchi 1 shu. `bosh` endi bekor, `clear` dan keyin `*bosh` yo'q. `return` bo'sh vectorni yopadi.",
            },
          ],
        },
        {
          title: "erase 20 ni olib tashlaydi, at(3) chegaraga uriladi",
          intro: [
            "`{10, 20, 30, 40}` dan ikkinchi element o'chadi. Qolgani 10, 30, 40. `at(3)` `size` 3 da otadi. `yopilmaydi` yozilmaydi.",
          ],
          codeLabel: "erase.cpp",
          code: `#include <iostream>
#include <stdexcept>
#include <vector>

int main() {
    std::vector<int> sonlar{10, 20, 30, 40};
    sonlar.erase(sonlar.begin() + 1);
    std::cout << sonlar.size() << "{{n}}";
    std::cout << sonlar[0] << "{{n}}";
    std::cout << sonlar[1] << "{{n}}";
    std::cout << sonlar[2] << "{{n}}";
    try {
        std::cout << sonlar.at(3) << "{{n}}";
        std::cout << "yopilmaydi{{n}}";
    } catch (const std::out_of_range&) {
        std::cout << "chegara{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `3
10
30
40
chegara`,
          analysis: [
            {
              lines: "6",
              text: "To'rt element, indekslar 0..3. `size` 4. `capacity` kamida 4, aniq raqam kerak emas. Ro'yxat `initializer_list`, 8-bobdagi qavsli massiv emas.",
            },
            {
              lines: "7",
              text: "`begin() + 1` qiymati 20 bo'lgan element. `erase` uni yo'qotadi, 30 va 40 ni chapga suradi. `size` 3. Qaytgan iterator 30 ni ko'rsatadi. O'chirilgan joydan o'ngga iteratorlar bekor. Biz keyin yangi `[]` bilan o'qiymiz.",
            },
            {
              lines: "8-11",
              text: "Ekranda 3, keyin 10, 30, 40. Eski indeks 1 endi 30. Eski 20 yo'q. `[2]` 40. `[3]` bo'sh indeks.",
            },
            {
              lines: "12-18",
              text: "`at(3)` `size` 3 da `std::out_of_range` otadi. 14-qator yugurmaydi, 13-bobdagi `throw` qoidasi. `catch` `chegara` yozadi. `what()` ni chiqarmaymiz, matn kutubxonaga qarab boshqa. `[]` bilan 3 noma'lum bo'lardi, `catch` va'da qilinmaydi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Lokal `sonlar` chaqiruv stekida kichik dasta. Elementlarning o'zi o'sha dastada emas. `push_back` ularni heapdagi uzluksiz `int` blokiga yozadi. Shu kitobdagi modelda har `int` 4 bayt. 10, 20, 30 ketma-ket 12 bayt. Blokning aniq manzili har ishga tushirishda boshqa bo'lishi mumkin.",
          "`reserve(4)` kamida 4 ta `int` lik blok so'raydi. `size` 2 bo'lsa, ikkita uyada son bor, qolgan uyalarda element yo'q. Ularni o'qish noma'lum. `capacity` 4 dan katta bo'lishi mumkin. Konsolda faqat `capacity() >= 4` ni yozamiz.",
          "Qayta ajratish yangi blok oladi, har bir `int` ni ko'chiradi, eskisini qaytaradi. Eski `int*` endi o'sha blokni ko'rsatmaydi. `*bosh` ni shundan keyin o'qish noma'lum. `reserve` yetarli bo'lsa, ikkinchi `push_back` ko'chirmaydi va `*bosh` 10 qoladi.",
          "`erase` blokni almashtirmasligi mumkin: 30 va 40 o'z blokida chapga ko'chadi, oxirgi ortiqcha element yo'qoladi. `clear` ham blokni qaytarishi shart emas. Vector yo'qolganda destruktor qolgan elementlarni yo'qotadi va blokni qaytaradi. Alohida `delete` yo'q.",
        ],
        diagram: `chaqiruv steki                 heap bloki
sonlar: bosh, oxir, sig'im --> [10][20][30][  ]
                               size 3
                               capacity kamida 4
                               bo'sh uya element emas

erase begin()+1
[10][30][40]
size 3
at(3) out_of_range

clear
size 0
capacity o'sha
bosh ko'rsatkich bekor`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Vector xatosi `[]` ni `at` deb o'qish, buferni o'zingiz `delete` qilish yoki `erase` bekor qilgan iteratorni oshirish.",
        ],
        items: [
          {
            title: "Chegaradagi [] ni catch ushlaydi deb yozish",
            why: [
              "`size` 3 bo'lsa, indeks 3 chegaradan tashqari. `sonlar[3]` noma'lum. `catch` ishlashi shart emas. Tekshiruv `at` da. `at` `std::out_of_range` otadi, 13-bobdagi `try` shu yerga tushadi.",
            ],
            wrong: `std::cout << sonlar[3];`,
            right: `std::cout << sonlar.at(2);`,
          },
          {
            title: "Vector buferini delete qilish",
            why: [
              "`push_back` blokni vector nomidan oladi. `delete &sonlar[0]` siz ajratmagan blokni qaytarishga urinadi. Vector yo'qolganda o'sha blokni yana qaytaradi. Blokni vectorning o'zi beradi.",
            ],
            wrong: `sonlar.push_back(10);
delete &sonlar[0];`,
            right: `sonlar.push_back(10);
sonlar.clear();`,
          },
          {
            title: "erase dan keyin ++it",
            why: [
              "`erase(it)` shu iteratorni bekor qiladi. Keyingi `++it` noma'lum. `erase` keyingi tirik iteratorni qaytaradi. O'chirish tarmog'ida shu qiymatni oling, boshqa tarmoqda `++it` yozing.",
            ],
            wrong: `for (std::vector<int>::iterator it = sonlar.begin();
     it != sonlar.end(); ++it) {
    if (*it == 20) {
        sonlar.erase(it);
    }
}`,
            right: `for (std::vector<int>::iterator it = sonlar.begin();
     it != sonlar.end(); ) {
    if (*it == 20) {
        it = sonlar.erase(it);
    } else {
        ++it;
    }
}`,
          },
        ],
      },
      quiz: [
        {
          id: "14.1-q1",
          question: "Bo'sh `vector` ga `push_back` uch marta. `size()` necha?",
          options: ["0", "3", "capacity aniq 3", "4"],
          answer: 1,
          explanation:
            "Har push_back size ni bittaga oshiradi. Uch qo'shishdan keyin size 3. capacity kamida 3, aniq raqam kutubxonaga bog'liq.",
        },
        {
          id: "14.1-q2",
          question: "`{10, 20, 30, 40}` da `erase(begin() + 1)` dan keyin `[1]` necha?",
          options: ["20", "10", "30", "40"],
          answer: 2,
          explanation:
            "Indeks 1 dagi 20 o'chadi. 30 va 40 chapga suriladi. Yangi indeks 1 qiymati 30. size 3.",
        },
        {
          id: "14.1-q3",
          question: "`size` 3. `at(3)` nima qiladi?",
          options: [
            "0 qaytaradi",
            "oxirgi elementni qaytaradi",
            "std::out_of_range otadi",
            "kod yig'ilmaydi",
          ],
          answer: 2,
          explanation:
            "Tirik indekslar 0, 1 va 2. at chegarani tekshiradi va std::out_of_range otadi. operator[] shu joyda noma'lum, istisno va'da qilmaydi.",
        },
      ],
    },
    {
      id: "14.2",
      navTitle: "pair tuple",
      title: "std::pair va std::tuple: bir nechta qiymat bitta obyektda",
      goal: [
        "Bu darsdan keyin siz ikkita qiymatni `std::pair` da `first` va `second` bilan saqlaysiz. Undan ko'pini `std::tuple` da `std::get<0>` kabi yig'ish vaqtidagi indeks bilan olasiz. Taqqoslash chapdan o'ngga, birinchi farqda to'xtaydi.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Anketada ikkita katag: yosh va baho. Kataklarning nomi bor, `first` va `second`. Qog'oz bitta. Yoshni ko'chirsangiz, baho o'z katagida qoladi. Ikkalasini boshqa anketaga bersangiz, ikkala katak nusxalanadi.",
          "Tuple nomsiz javonlar qatori. Birinchi javon 0, ikkinchisi 1, uchinchisi 2. Javon raqami qog'ozga yig'ish paytida yoziladi. «Bugun nechanchi javon?» deb ish vaqtida so'rab bo'lmaydi. Raqam manbada ko'rinadi.",
          "Ikki anketani solishtirish chap katakdan boshlanadi. Yosh teng bo'lsa, bahoga qaraladi. Yosh farq qilsa, baho o'qilmaydi. 2 yosh 0 bahodan katta, 1 yosh 100 bahodan. Chap katak hal qiladi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`pair` uchun `#include <utility>`. `tuple` uchun `#include <tuple>`. Ikkalasi ham qiymat turlari. Lokal obyekt chaqiruv stekida. `int` va `double` a'zolar obyektning ichida, alohida heap tuguni emas.",
        ],
        items: [
          {
            title: "pair: first va second",
            paragraphs: [
              "`std::pair<int, double> baho{18, 4.5};` ikkita ochiq a'zo. `baho.first` 18, `baho.second` 4.5. 4.5 ikkilikda aniq kasr. Tayinlash `baho.second = 6` faqat shu a'zoni yozadi.",
              "`std::make_pair(4, 9)` `std::pair<int, int>` qaytaradi. Turlar argumentdan chiqadi, 13-bobdagi shablon. Nusxa `juft` ga tushadi.",
              "`std::get<0>(juft)` bu `first`, `std::get<1>` bu `second`. `get<2>` juftlikda yo'q, kod yig'ilmaydi. Indeks yig'ish vaqtidagi sobit.",
            ],
            code: `std::pair<int, double> baho{18, 4.5};
std::cout << baho.first;
std::cout << baho.second;`,
            codeLabel: "ikkita nomli a'zo",
          },
          {
            title: "tuple va get",
            paragraphs: [
              "`std::tuple<int, int, int> sana{2026, 11, 21};` uchta `int`. Nom yo'q. `std::get<0>(sana)` 2026, `get<1>` 11, `get<2>` 21. `get<3>` yig'ilmaydi. Tirik indekslar 0, 1, 2.",
              "`int i = 0; std::get<i>(sana)` yig'ilmaydi. `i` ish vaqtidagi o'zgaruvchi. `get` qaysi a'zoni olishini yig'ish paytida bilishi kerak. Massivdagi `a[i]` boshqa, u yerda indeks ish vaqtida yuradi.",
              "`std::make_tuple(7, 8)` `tuple<int, int>`. `std::tie(yil, oy) = sana` mavjud o'zgaruvchilarga yozadi. `tie` yangi tuple saqlamaydi, chap tomondagi nomlarni bog'laydi.",
            ],
            code: `std::tuple<int, int, int> sana{2026, 11, 21};
std::cout << std::get<0>(sana);
std::cout << std::get<2>(sana);`,
            codeLabel: "indeks yig'ish paytida",
            table: {
              caption: "pair va tuple qayerda ajraladi.",
              headers: ["Yozuv", "Nima"],
              rows: [
                ["baho.first", "pair ning birinchi a'zosi"],
                ["std::get<1>(juft)", "pair ning second a'zosi"],
                ["std::get<2>(sana)", "tuple ning uchinchi a'zosi, 21"],
                ["std::get<3>(sana)", "yig'ilmaydi"],
                ["std::get<i>(sana)", "i o'zgaruvchi bo'lsa, yig'ilmaydi"],
              ],
            },
          },
          {
            title: "Taqqoslash chapdan",
            paragraphs: [
              "`a > b` juftlikda leksikografik. Avval `first`. Teng bo'lsa, `second`. `{1, 9}` va `{1, 5}` da birinchilar teng, 9 > 5, natija rost. Ekranda 1.",
              "`{2, 0}` va `{1, 100}` da birinchi farq 2 > 1. Ikkinchi a'zo o'qilmaydi. Natija rost. «Ikkala a'zo ham katta bo'lsin» degan qoida yo'q.",
              "`<<` taqqoslashdan kuchli. `std::cout << (a > b)` qavsli. Qavssiz yozuv yig'ilishi ham, ma'nosi boshqa bo'lib ketishi ham mumkin. Tuple ham shu tartibda solishtiriladi: `get<0>`, keyin `get<1>`.",
            ],
            code: `std::pair<int, int> a{1, 9};
std::pair<int, int> b{1, 5};
std::cout << (a > b);`,
            codeLabel: "birinchi teng, ikkinchi hal qiladi",
          },
        ],
      },
      examples: [
        {
          title: "18 va 4.5, keyin 9 > 5",
          intro: [
            "Juftlikda yosh 18, baho 4.5. Ikkinchi taqqoslashda birinchi a'zolar 1, ikkinchilar 9 va 5. Ekranda 1.",
          ],
          codeLabel: "pair.cpp",
          code: `#include <iostream>
#include <utility>

int main() {
    std::pair<int, double> baho{18, 4.5};
    std::cout << baho.first << "{{n}}";
    std::cout << baho.second << "{{n}}";
    std::pair<int, int> a{1, 9};
    std::pair<int, int> b{1, 5};
    std::cout << (a > b) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `18
4.5
1`,
          analysis: [
            {
              lines: "5",
              text: "`pair<int, double>` bitta obyekt. `first` ichida 18, `second` ichida 4.5. 4.5 aniq kasr. A'zolar alohida `new` emas.",
            },
            {
              lines: "6-7",
              text: "`first` 18, `second` 4.5. Nuqta a'zoni tanlaydi, 10-bobdagi `struct` kabi. Juftlikda a'zolar ochiq.",
            },
            {
              lines: "8-10",
              text: "`a.first` va `b.first` ikkalasi 1. Tenglikda `second` qaraladi: 9 > 5. `(a > b)` 1. Qavs `<<` dan himoya. `{2, 0} > {1, 100}` ham 1 bo'lardi, chunki 2 > 1.",
            },
            {
              lines: "11",
              text: "`return` uchala juftlikni ham chaqiruv stekidan olib ketadi. Heapga qaytariladigan blok yo'q, a'zolar obyektning ichida edi.",
            },
          ],
        },
        {
          title: "sana: 2026, 11, 21",
          intro: [
            "Uchta `int` tuple. `get<0>`, `get<1>`, `get<2>`. Ekranda yil, oy, kun.",
          ],
          codeLabel: "tuple.cpp",
          code: `#include <iostream>
#include <tuple>

int main() {
    std::tuple<int, int, int> sana{2026, 11, 21};
    std::cout << std::get<0>(sana) << "{{n}}";
    std::cout << std::get<1>(sana) << "{{n}}";
    std::cout << std::get<2>(sana) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `2026
11
21`,
          analysis: [
            {
              lines: "5",
              text: "Tuple uchta `int` ni bitta obyektga yig'adi. Nom yo'q. `first` degan a'zo yo'q, shu yozuv yig'ilmaydi.",
            },
            {
              lines: "6",
              text: "`get<0>` birinchi `int`, 2026. Indeks 0, massiv kabi. Bu yig'ish vaqtidagi raqam.",
            },
            {
              lines: "7-8",
              text: "`get<1>` 11, `get<2>` 21. `get<3>` yig'ilmaydi. `int i = 2; get<i>` ham yig'ilmaydi, `i` sobit emas.",
            },
            {
              lines: "9",
              text: "Obyekt lokal. Uchta `int` uning ichida. `return` ularni birga olib ketadi.",
            },
          ],
        },
        {
          title: "make_pair 4 va 9, second 6 bo'ladi",
          intro: [
            "`make_pair` `pair<int, int>` yasaydi. `first` 4, `get<1>` 9. Keyin `second` 6 ga yoziladi.",
          ],
          codeLabel: "make_pair.cpp",
          code: `#include <iostream>
#include <utility>

int main() {
    std::pair<int, int> juft = std::make_pair(4, 9);
    std::cout << juft.first << "{{n}}";
    std::cout << std::get<1>(juft) << "{{n}}";
    juft.second = 6;
    std::cout << juft.second << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `4
9
6`,
          analysis: [
            {
              lines: "5",
              text: "`make_pair(4, 9)` ikkala literal ham `int`. Natija `pair<int, int>`. Qiymatlar `juft` ga nusxalanadi. Vaqtinchalik juftlik shu qatordan keyin ketadi.",
            },
            {
              lines: "6-7",
              text: "`first` 4. `get<1>` shu juftlikda `second`, qiymat 9. `get` pair uchun `<utility>` da. `get<2>(juft)` yig'ilmaydi.",
            },
            {
              lines: "8-9",
              text: "`second = 6` faqat ikkinchi `int` ni yozadi. `first` 4 qoladi. Ekranda 6. Bu yangi juftlik emas, o'sha obyektning a'zosi.",
            },
            {
              lines: "10",
              text: "`juft` chaqiruv stekida. Ikkita `int` yonma-yon, odatda 8 bayt. Aniq `sizeof` ni standart qotirib qo'ymagan, konsolda yo'q.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`pair<int, double> baho` bitta obyekt. `first` uning boshidagi `int`, 4 bayt, qiymat 18. `double` 8 baytlik chegaraga tushishi uchun orada odatda 4 bayt bo'sh joy turadi. `second` 4.5 shu `double` da. Odatdagi o'lcham 16 bayt. Bu shu kitobdagi 64-bit Windows joylashuvi. Standart bo'sh joyning baytini qotirib qo'ymagan.",
          "`pair<int, int>` da ikkala a'zo 4 baytdan, odatda 8 bayt, orada bo'sh joy yo'q. `tuple<int, int, int>` odatda 12 bayt, uchta `int` ketma-ket. Ular heap tuguni emas. Obyekt qayerda turgan bo'lsa, a'zolar ham o'sha yerda.",
          "`make_pair` vaqtinchalik juftlik yasaydi, keyin `juft` ga nusxa tushadi. Nusxadan keyin vaqtinchalik yo'qoladi. `juft.second = 6` o'sha ikkinchi 4 baytni yozadi. `first` ning 4 bayti tegilmaydi.",
          "Taqqoslash xotirani o'zgartirmaydi. `{1, 9}` va `{1, 5}` da avval birinchi 4 baytlar teng ekani ko'riladi, keyin ikkinchi 4 baytlar. 9 > 5. Natija `bool`, `cout` uni 1 qilib yozadi.",
        ],
        diagram: `pair<int, double> baho
[ 18 ][....][ 4.5        ]
 int 4   pad   double 8
 odatda 16 bayt, bitta obyekt

pair<int, int> a     pair<int, int> b
[ 1 ][ 9 ]            [ 1 ][ 5 ]
birinchi teng, ikkinchi 9 > 5

tuple sana
[ 2026 ][ 11 ][ 21 ]
get<0>    get<1>  get<2>
get<3> yig'ilmaydi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Tuple xatosi unga `first` yozish, `get` ga ish vaqtidagi indeks berish yoki taqqoslashda ikkala a'zo ham katta bo'lishini kutish.",
        ],
        items: [
          {
            title: "Tuple da first yozish",
            why: [
              "`first` va `second` faqat `pair` da. `tuple` a'zosining nomi yo'q. Raqam `std::get<0>` kabi yoziladi. Uch elementli tuple da oxirgi raqam 2.",
            ],
            wrong: `std::cout << sana.first;`,
            right: `std::cout << std::get<0>(sana);`,
          },
          {
            title: "get ga o'zgaruvchi indeks",
            why: [
              "`get` qaysi a'zo ekanini yig'ish paytida biladi. `int i = 1` ish vaqtida o'zgaradi. `get<i>` yig'ilmaydi. `get<1>` yig'iladi.",
            ],
            wrong: `int i = 1;
std::cout << std::get<i>(sana);`,
            right: `std::cout << std::get<1>(sana);`,
          },
          {
            title: "Ikkala a'zo ham katta bo'lsin deb o'qish",
            why: [
              "Taqqoslash birinchi farqda to'xtaydi. `{2, 0} > {1, 100}` rost, chunki 2 > 1. Ikkinchi a'zo qaralmaydi. Teng birinchi a'zoda esa ikkinchisi hal qiladi: `{1, 9} > {1, 5}`.",
            ],
            wrong: `std::pair<int, int> a{2, 0};
std::pair<int, int> b{1, 100};
std::cout << (a.first > b.first && a.second > b.second);`,
            right: `std::pair<int, int> a{2, 0};
std::pair<int, int> b{1, 100};
std::cout << (a > b);`,
          },
        ],
      },
      quiz: [
        {
          id: "14.2-q1",
          question: "`pair<int, double> baho{18, 4.5}` da `first` necha?",
          options: ["18", "4.5", "0", "kod yig'ilmaydi"],
          answer: 0,
          explanation:
            "first birinchi a'zo, bu yerda int 18. second 4.5. Juftlik bitta obyekt, a'zolar uning ichida.",
        },
        {
          id: "14.2-q2",
          question: "`pair<int, int> a{1, 9}` va `b{1, 5}`. `(a > b)` ekranga necha yozadi?",
          options: ["0", "1", "9", "kod yig'ilmaydi"],
          answer: 1,
          explanation:
            "Birinchi a'zolar teng, 1 va 1. Keyin second qaraladi, 9 > 5. Natija rost, cout 1 yozadi.",
        },
        {
          id: "14.2-q3",
          question: "`tuple<int, int, int>` da `std::get<3>` nima qiladi?",
          options: ["0 qaytaradi", "21 qaytaradi", "kod yig'ilmaydi", "istisno otadi"],
          answer: 2,
          explanation:
            "Uch a'zoning indekslari 0, 1 va 2. get<3> yig'ilish paytida rad etiladi. Ish vaqtida istisno ham yo'q, dastur yig'ilmaydi.",
        },
      ],
    },
    {
      id: "14.3",
      navTitle: "stack queue",
      title: "std::stack va std::queue: oxirgi kirgan va birinchi kirgan",
      goal: [
        "Bu darsdan keyin siz `std::stack` ni LIFO deb ishlatasiz: `push` ustiga qo'yadi, `top` ustini ko'radi, `pop` ustini oladi. `std::queue` FIFO: `push` oxiriga qo'shadi, `front` boshini ko'radi, `pop` boshini oladi. `pop` ikkalasida ham `void`. Bo'sh konteynerdan `top` yoki `front` noma'lum.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Idish yuvishdagi likopchalar stek. Oxirgi qo'yilgan likopcha birinchi olinadi. Tagiga tushib qolganini o'rtani buzmasdan tortib bo'lmaydi. Ustini ko'rish likopchani olmaydi. Olish esa ustini yo'qotadi va yangi ust ochiladi.",
          "Navbat do'kon oldida. Birinchi kelgan birinchi kiradi. Yangi odam oxiriga turadi. `front` navbatning boshidagi odam, `back` hozir oxirida turgan. Birinchini o'tkazsangiz, ikkinchi birinchi bo'lib qoladi. Oxiridagi odam joyida turadi.",
          "Ikkala idish ham o'zi hisob-kitob qiladi. «Bo'sh idishning ustini ko'r» degan buyruqning javobi yo'q. Avval `empty` so'raladi. Olingan likopchani qo'lga `pop` bermaydi. Avval ko'rasiz, keyin olasiz.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`#include <stack>` va `#include <queue>`. Ikkalasi ham adapter: o'zlari massiv emas, ichidagi konteynerga buyruq beradi. Standart ichki konteyner `std::deque`. `stack` da `back`, `push_back`, `pop_back` yetadi. `queue` ga yana `pop_front` kerak, shuning uchun odatiy ichki tur `deque`.",
        ],
        items: [
          {
            title: "stack: LIFO",
            paragraphs: [
              "`push(x)` ustiga qo'yadi. `top()` ustidagi qiymatning havolasini qaytaradi, elementni olmaydi. `pop()` ustini yo'qotadi va hech narsa qaytarmaydi. `size()` soni, `empty()` bo'shligi.",
              "10, keyin 20, keyin 30 qo'yilsa, `top` 30. Bir `pop` dan keyin `top` 20, `size` 2. 10 tagida yotadi.",
              "`int x = quti.pop()` yig'ilmaydi. `pop` turi `void`. Qiymat kerak bo'lsa, avval `int x = quti.top()`, keyin `quti.pop()`.",
            ],
            code: `std::stack<int> quti;
quti.push(10);
quti.push(30);
std::cout << quti.top();
quti.pop();`,
            codeLabel: "ustiga qo'yish, ko'rish, olish",
            table: {
              caption: "stack va queue boshqa uchini ochadi.",
              headers: ["Amal", "stack", "queue"],
              rows: [
                ["qo'shish", "push, ustiga", "push, oxiriga"],
                ["ko'rish", "top, usti", "front bosh, back oxir"],
                ["olish", "pop, usti ketadi", "pop, bosh ketadi"],
                ["pop qaytarishi", "void", "void"],
                ["iterator", "yo'q, begin yig'ilmaydi", "yo'q, begin yig'ilmaydi"],
              ],
            },
          },
          {
            title: "queue: FIFO",
            paragraphs: [
              "`push` oxiriga qo'yadi. `front` birinchi kirganni ko'rsatadi. `back` oxirgi kirganni. `pop` birinchini yo'qotadi, oxirini emas.",
              "10, 20, 30 kelsa, `front` 10, `back` 30. `pop` dan keyin `front` 20, `back` hali 30, `size` 2.",
              "`navbat[0]` yig'ilmaydi. Navbatda indeks yo'q. Yurish uchun `begin` ham yo'q. Kerak bo'lgan qiymat `front` yoki `back`.",
            ],
            code: `std::queue<int> navbat;
navbat.push(10);
navbat.push(30);
std::cout << navbat.front();
navbat.pop();`,
            codeLabel: "birinchi kirgan birinchi chiqadi",
          },
          {
            title: "Bo'sh idish",
            paragraphs: [
              "`empty()` rost bo'lsa, `top`, `front` va `back` noma'lum. `pop` ham noma'lum. Istisno va'da qilinmaydi. `catch` yozilgani bu chaqiruvni xavfsiz qilmaydi.",
              "Tekshiruv chaqiruvdan oldin: `if (!quti.empty())`. Ichida `top`, keyin `pop`. Oxirida `empty()` rost bo'lsa, idish bo'sh.",
              "Bu `std::stack` 9-bobdagi chaqiruv steki emas. Chaqiruv steki lokal o'zgaruvchilar joyi. `std::stack` konteyner. Uning o'zi lokal bo'lsa, dasta chaqiruv stekida, elementlar ichki `deque` bloklarida, odatda heapda.",
            ],
            code: `if (!quti.empty()) {
    std::cout << quti.top();
    quti.pop();
}`,
            codeLabel: "bo'sh bo'lsa top chaqirilmaydi",
          },
        ],
      },
      examples: [
        {
          title: "stek usti 30, pop dan keyin 20",
          intro: [
            "10, 20, 30 ketma-ket qo'yiladi. Ust 30. Bitta `pop` dan keyin ust 20, `size` 2.",
          ],
          codeLabel: "stack.cpp",
          code: `#include <iostream>
#include <stack>

int main() {
    std::stack<int> quti;
    quti.push(10);
    quti.push(20);
    quti.push(30);
    std::cout << quti.top() << "{{n}}";
    quti.pop();
    std::cout << quti.top() << "{{n}}";
    std::cout << quti.size() << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `30
20
2`,
          analysis: [
            {
              lines: "5",
              text: "Bo'sh `stack<int>`. Ichki konteyner `deque`. `size` 0. `top` hali chaqirilmaydi.",
            },
            {
              lines: "6-8",
              text: "`push` ustiga qo'yadi. Tartib pastdan: 10, ustida 20, ustida 30. `size` 3.",
            },
            {
              lines: "9-10",
              text: "`top` 30 ni ko'rsatadi, element joyida qoladi. `pop` 30 ni yo'qotadi va `void`. 30 ekranga `pop` dan chiqmaydi, oldingi `top` yozgan.",
            },
            {
              lines: "11-13",
              text: "Yangi ust 20. `size` 2. 10 hali tagida. `return` stekni yopadi, qolgan 20 va 10 ichki konteyner bilan ketadi.",
            },
          ],
        },
        {
          title: "navbat boshi 10, pop dan keyin 20",
          intro: [
            "10, 20, 30 navbatga kiradi. `front` 10, `back` 30. `pop` birinchini oladi. Yangi `front` 20, `size` 2.",
          ],
          codeLabel: "queue.cpp",
          code: `#include <iostream>
#include <queue>

int main() {
    std::queue<int> navbat;
    navbat.push(10);
    navbat.push(20);
    navbat.push(30);
    std::cout << navbat.front() << "{{n}}";
    std::cout << navbat.back() << "{{n}}";
    navbat.pop();
    std::cout << navbat.front() << "{{n}}";
    std::cout << navbat.size() << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `10
30
20
2`,
          analysis: [
            {
              lines: "5-8",
              text: "Bo'sh navbatga 10, keyin 20, keyin 30. Bosh 10, oxir 30. `push` har doim oxiriga.",
            },
            {
              lines: "9-10",
              text: "`front` 10, `back` 30. Ikkalasi ham ko'radi, hech kimni olmaydi. `size` hali 3.",
            },
            {
              lines: "11-13",
              text: "`pop` boshdagi 10 ni yo'qotadi. Yangi bosh 20. Oxir hali 30. `size` 2. `pop` 10 ni qaytarmaydi.",
            },
            {
              lines: "14",
              text: "`return` navbatni yopadi. 20 va 30 ichki `deque` bilan ketadi. `front` ni bo'sh navbatda chaqirmadik.",
            },
          ],
        },
        {
          title: "8 olinadi, idish bo'sh deyiladi",
          intro: [
            "Bitta element. `empty` yolg'on, `top` 8, `pop` idishni bo'shatadi. Keyin `empty` rost, ekranda `bosh`.",
          ],
          codeLabel: "bosh.cpp",
          code: `#include <iostream>
#include <stack>

int main() {
    std::stack<int> quti;
    quti.push(8);
    if (!quti.empty()) {
        std::cout << quti.top() << "{{n}}";
        quti.pop();
    }
    if (quti.empty()) {
        std::cout << "bosh{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `8
bosh`,
          analysis: [
            {
              lines: "5-6",
              text: "Bo'sh stekka 8 qo'yiladi. `size` 1. `empty` yolg'on.",
            },
            {
              lines: "7-9",
              text: "Tekshiruv rost. `top` 8 ni yozadi. `pop` 8 ni yo'qotadi. `int x = quti.pop()` bo'lsa, `void` dan `int` ga o'tkazib bo'lmaydi, yig'ilmaydi.",
            },
            {
              lines: "11-13",
              text: "`empty` endi rost. Ekranda `bosh`. `top` bu tarmoqda yo'q. Bo'sh stekda `top` noma'lum, `catch` uni ushlashga majbur emas.",
            },
            {
              lines: "14",
              text: "Idish bo'sh holda yopiladi. `quti.front()` yig'ilmaydi, stekda `front` yo'q. `front` navbatniki.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Lokal `quti` chaqiruv stekidagi adapter. Ichida `std::deque<int>`. 30 raqami nomli lokal emas. `push(30)` shu `int` ni deque blokiga nusxalaydi. Bloklar heapda, bitta uzluksiz vector massivi emas. `top` shu oxirgi `int` ga havola.",
          "`pop` oxirgi `int` ni yo'qotadi. Qiymatni registrga qaytarmaydi, turi `void`. 30 ekranga tushishi uchun `pop` dan oldin `top` o'qilgan bo'lishi kerak. `pop` dan keyin eski havola bekor.",
          "Navbatda `push` oxirgi blok tomonga yozadi, `pop` bosh tomondan o'chiradi. 10 ketgach, bosh 20 ga siljiydi. O'rtadagi elementlarni vector dagi kabi surish shart emas. `deque` shu uchun odatiy ichki tur. `std::queue<int, std::vector<int>>` yig'ilmaydi, vectorda `pop_front` yo'q.",
          "Bo'sh adapterda `top` yoki `front` mavjud bo'lmagan `int` ga havola izlaydi. Natija noma'lum. Tekshiruv `empty` bilan shu havoladan oldin turadi. Adapter yo'qolganda ichki deque o'z bloklarini qaytaradi.",
        ],
        diagram: `std::stack  (ichida deque)
push 10, 20, 30
tag [10][20][30] ust
top -> 30
pop: 30 ketadi, top -> 20

std::queue
bosh [10][20][30] oxir
front 10, back 30
pop: 10 ketadi, front 20, back 30

bo'sh stack
top chaqiruvi noma'lum
empty avval`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Adapter xatosi `pop` dan qiymat kutish, navbatda oxirgini o'chirish yoki bo'sh idishning ustini o'qish.",
        ],
        items: [
          {
            title: "pop ni qiymat deb olish",
            why: [
              "`pop` `void`. U ustidagi elementni yo'qotadi, qo'lga bermaydi. Qiymat `top` da. Avval nusxa oling, keyin `pop`.",
            ],
            wrong: `int x = quti.pop();`,
            right: `int x = quti.top();
quti.pop();`,
          },
          {
            title: "Navbat pop ini oxir deb o'qish",
            why: [
              "`queue::pop` boshni yo'qotadi. `back` joyida qoladi. 10, 20, 30 dan keyin `pop` qolgan boshni 20 qiladi. Oxir 30.",
            ],
            wrong: `navbat.pop();
std::cout << navbat.back();`,
            right: `navbat.pop();
std::cout << navbat.front();`,
          },
          {
            title: "Bo'sh stekda top",
            why: [
              "`top` element bo'lsa, ustiga havola beradi. `size` 0 bo'lsa, havola noma'lum. Istisno otilishi shart emas. `empty` yolg'on bo'lsa, `top` chaqiriladi.",
            ],
            wrong: `std::cout << quti.top();`,
            right: `if (!quti.empty()) {
    std::cout << quti.top();
}`,
          },
        ],
      },
      quiz: [
        {
          id: "14.3-q1",
          question: "`stack` ga 10, 20, 30 `push`. `top` necha?",
          options: ["10", "20", "30", "0"],
          answer: 2,
          explanation:
            "Stack LIFO. Oxirgi push ustda turadi. top 30 ni ko'rsatadi va elementni olmaydi.",
        },
        {
          id: "14.3-q2",
          question: "`queue` ga 10, 20, 30. Bir `pop` dan keyin `front` necha?",
          options: ["10", "30", "20", "0"],
          answer: 2,
          explanation:
            "pop birinchi kirgan 10 ni olib tashlaydi. Yangi front 20. back 30 joyida qoladi.",
        },
        {
          id: "14.3-q3",
          question: "`int x = quti.pop();` nima qiladi?",
          options: [
            "ustidagi sonni x ga yozadi",
            "kod yig'ilmaydi, pop void",
            "x ga 0 yozadi",
            "istisno otadi",
          ],
          answer: 1,
          explanation:
            "pop hech narsa qaytarmaydi. Qiymat top da. Avval int x = quti.top(), keyin quti.pop().",
        },
      ],
    },
    {
      id: "14.4",
      navTitle: "set map",
      title: "std::set va std::map: tartibli takrorsiz kalit",
      goal: [
        "Bu darsdan keyin siz `std::set` ni takrorlanmaydigan, `<` bo'yicha tartiblangan to'plam deb ishlatasiz. `std::map` kalitdan qiymatga lug'at. `insert` takrorni rad etadi. `find` topilmasa `end` qaytaradi. `map` dagi `[]` yo'q kalitni 0 bilan yozib qo'yadi. `at` yo'q kalitda `out_of_range` otadi va yozmaydi.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Sinf jurnalidagi id raqamlari. 30, keyin 10, keyin 20 yozilsa ham, jurnal ularni 10, 20, 30 qilib qo'yadi. 10 ikkinchi marta kelsa, yangi qator ochilmaydi. Qidiruv «bor» yoki «yo'q», o'rtada 0 degan baho yo'q.",
          "Lug'at kalit so'zdan ma'noga. Kalit bitta. 20-kalitga avval 2, keyin 5 yozilsa, qator bitta, ma'no 5. Varaqlar kalit bo'yicha terilgan. Qo'shilgan vaqt varaq tartibini belgilamaydi.",
          "Yo'q kalitni `[]` bilan o'qish lug'atga bo'sh ma'no yozib qo'yadi. `int` da bo'sh ma'no 0. Siz faqat qidirmoqchi edingiz, jurnal yangi qator oldi. `at` yo'q desin, qator ochmasin. `find` ham yozmaydi, «yo'q» ni `end` bilan aytadi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`#include <set>` va `#include <map>`. Tartib `std::less`, ya'ni `<`. Tenglik `!(a < b) && !(b < a)`. `int` da bu oddiy tenglik. `unordered_set` boshqa tur, hash, bu darsda yo'q. `set` va `map` yonma-yon massiv emas.",
        ],
        items: [
          {
            title: "set: takror yo'q, tartib bor",
            paragraphs: [
              "`insert(30)`, `insert(10)`, `insert(20)` dan keyin yurish 10, 20, 30. Qo'shilgan vaqt emas, `<` tartibi. `size` 3.",
              "Yana `insert(10)` yangi element qo'shmaydi. Qaytish `pair<iterator, bool>`. `second` yolg'on, ekranda 0. `size` 3 qoladi. Iterator mavjud 10 ni ko'rsatadi.",
              "`*it` o'qiladi, yozilmaydi. `set` elementi o'zgarmas, tartib buzilmasin. `begin() + 1` yig'ilmaydi. Iterator ikki yo'nalishli: `++it` va `--it`. `operator[]` yo'q.",
            ],
            code: `std::set<int> sonlar;
sonlar.insert(30);
sonlar.insert(10);
std::pair<std::set<int>::iterator, bool> natija = sonlar.insert(10);`,
            codeLabel: "ikkinchi 10 qo'shilmaydi",
            table: {
              caption: "Qidiruv uch xil javob beradi.",
              headers: ["Chaqiruv", "Topilsa", "Topilmasa"],
              rows: [
                ["set::find", "iterator, *it qiymat", "end, yozmaydi"],
                ["map::find", "iterator, first va second", "end, yozmaydi"],
                ["map::at", "qiymatning havolasi", "out_of_range, yozmaydi"],
                ["map::operator[]", "qiymatning havolasi", "int uchun 0 yozadi, size oshadi"],
              ],
            },
          },
          {
            title: "map: kalit va qiymat",
            paragraphs: [
              "`std::map<int, int> baho; baho[20] = 2;` kalit 20, qiymat 2. `baho[10] = 1` ikkinchi qator. `baho[20] = 5` yangi qator emas, 20 ning qiymati 5 bo'ladi. `size` 2.",
              "Yurish kalit bo'yicha. Avval 10 va 1, keyin 20 va 5. `it->first` kalit, `it->second` qiymat. Kalit `const`, `it->first = 3` yig'ilmaydi.",
              "`find(1)` topsa, iterator `end` ga teng emas. `it->second` 10. Topilmasa, `end`. Istisno yo'q.",
            ],
            code: `std::map<int, int> baho;
baho[20] = 2;
baho[20] = 5;
std::cout << baho.size();`,
            codeLabel: "bir kalit, yangilangan qiymat",
          },
          {
            title: "[] yozadi, at otadi",
            paragraphs: [
              "`baho[2]` kalit 2 yo'q bo'lsa, `int` ni qiymat bilan boshlaydi. `int` uchun bu 0. Qator qo'shiladi, `size` oshadi. So'ng shu 0 qaytadi. O'qiyapman degan chaqiruv yozuv.",
              "`baho.at(9)` yo'q kalitda `std::out_of_range` otadi. Yangi qator ochilmaydi. `#include <stdexcept>`. `what()` matni aniq va'da emas. `catch` o'z so'zini yozadi. `try` ichidagi keyingi qator yugurmaydi.",
              "`erase(10)` kalit bo'lsa, bitta element yo'qoladi va 1 qaytaradi. Bo'lmasa, 0. Boshqa iteratorlar tirik qoladi. Vector dagi kabi butun o'ng tomon bekor bo'lmaydi. O'chirilgan tugunning iteratorigina bekor.",
            ],
            code: `std::cout << baho[2];
std::cout << baho.at(9);`,
            codeLabel: "yo'q kalit: [] yozadi, at otadi",
          },
        ],
      },
      examples: [
        {
          title: "30, 10, 20 va takror 10",
          intro: [
            "Uch xil son kiritiladi, 10 ikkinchi marta rad etiladi. `size` 3, `second` 0. Yurish 10, 20, 30.",
          ],
          codeLabel: "set.cpp",
          code: `#include <iostream>
#include <set>
#include <utility>

int main() {
    std::set<int> sonlar;
    sonlar.insert(30);
    sonlar.insert(10);
    sonlar.insert(20);
    std::pair<std::set<int>::iterator, bool> natija = sonlar.insert(10);
    std::cout << sonlar.size() << "{{n}}";
    std::cout << natija.second << "{{n}}";
    for (std::set<int>::iterator it = sonlar.begin(); it != sonlar.end(); ++it) {
        std::cout << *it << "{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `3
0
10
20
30`,
          analysis: [
            {
              lines: "6-9",
              text: "Bo'sh to'plamga 30, 10, 20. Uchala yangi. Ichki tartib darhol 10, 20, 30. Qo'shilgan vaqt saqlanmaydi.",
            },
            {
              lines: "10-12",
              text: "Ikkinchi 10 qo'shilmaydi. `natija` juftlik, 14.2. `second` yolg'on, ekranda 0. `size` 3. `first` mavjud 10 ning iteratori.",
            },
            {
              lines: "13-15",
              text: "`begin` dan `end` gacha `++it`. Ekranda 10, keyin 20, keyin 30. `*it` o'qiladi. `begin() + 1` set da yig'ilmaydi.",
            },
            {
              lines: "16",
              text: "`return` to'plamni yopadi. Har element o'z tugunida edi, destruktor tugunlarni qaytaradi.",
            },
          ],
        },
        {
          title: "kalit 20 yangilanadi, yurish 10 dan",
          intro: [
            "Avval kalit 20, keyin 10. 20 ga yana 5 yoziladi. `size` 2. Yurish kalit tartibida: 10 va 1, keyin 20 va 5.",
          ],
          codeLabel: "map.cpp",
          code: `#include <iostream>
#include <map>

int main() {
    std::map<int, int> baho;
    baho[20] = 2;
    baho[10] = 1;
    baho[20] = 5;
    std::cout << baho.size() << "{{n}}";
    for (std::map<int, int>::iterator it = baho.begin(); it != baho.end(); ++it) {
        std::cout << it->first << "{{n}}";
        std::cout << it->second << "{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `2
10
1
20
5`,
          analysis: [
            {
              lines: "5-7",
              text: "Bo'sh lug'at. `baho[20] = 2` kalit 20 ni ochadi, qiymat 2. `baho[10] = 1` ikkinchi kalit. `size` 2.",
            },
            {
              lines: "8-9",
              text: "`baho[20] = 5` mavjud kalitni yangilaydi. Yangi tugun yo'q. `size` 2 qoladi, ekranda 2.",
            },
            {
              lines: "10-13",
              text: "Yurish `<` bo'yicha. Avval kalit 10, qiymat 1. Keyin kalit 20, qiymat 5. Qo'shilgan vaqt 20 ni oldinga qo'ymaydi. `it->first` o'zgarmas.",
            },
            {
              lines: "14",
              text: "`return` ikkala tugunni ham qaytaradi. Qiymatlar tugun ichida, alohida `vector` da emas.",
            },
          ],
        },
        {
          title: "find 10 ni ko'radi, [2] nol yozadi, at(9) otadi",
          intro: [
            "Kalit 1 ning qiymati 10. `find` uni yozadi. `baho[2]` yo'q kalitni 0 bilan qo'shadi, `size` 2. `at(9)` otadi, `yopilmaydi` chiqmaydi.",
          ],
          codeLabel: "topish.cpp",
          code: `#include <iostream>
#include <map>
#include <stdexcept>

int main() {
    std::map<int, int> baho;
    baho[1] = 10;
    std::map<int, int>::iterator it = baho.find(1);
    if (it != baho.end()) {
        std::cout << it->second << "{{n}}";
    }
    std::cout << baho[2] << "{{n}}";
    std::cout << baho.size() << "{{n}}";
    try {
        std::cout << baho.at(9) << "{{n}}";
        std::cout << "yopilmaydi{{n}}";
    } catch (const std::out_of_range&) {
        std::cout << "yoq{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `10
0
2
yoq`,
          analysis: [
            {
              lines: "6-8",
              text: "Kalit 1, qiymat 10. `find(1)` shu tugunni ko'rsatadi. `end` ga teng emas.",
            },
            {
              lines: "9-11",
              text: "`it->second` 10. Strelka 10-bobdagi kabi. `find` yangi kalit yozmaydi. Topilmasa, tarmoq yurmasdi va istisno ham bo'lmasdi.",
            },
            {
              lines: "12-13",
              text: "`baho[2]` kalit 2 yo'q. `int` qiymat 0 bilan tugun ochiladi, ekranda 0. `size` 2. Bu o'qish emas, qo'shish.",
            },
            {
              lines: "14-20",
              text: "`at(9)` yo'q kalitda `out_of_range` otadi. 16-qator yugurmaydi. `yoq` yoziladi. Yangi 9-kalit yo'q, `size` 2 qoladi. `what()` chaqirilmaydi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Lokal `set` va `map` chaqiruv stekidagi kichik dasta. Elementlar heapdagi alohida tugunlarda. Har tugunda qiymat va daraxt bog'lari. 10 va 20 xotirada yonma-yon turishi shart emas. Yurish bog'lar bo'ylab kalit tartibida ketadi. `&` orqali `begin() + 1` yo'q.",
          "Ikkinchi `insert(10)` yangi tugun ajratmaydi. Mavjud tugun topiladi, `bool` yolg'on qaytadi. `size` o'sha uch tugun. Birinchi `insert(10)` yangi tugun olgan edi.",
          "`map` tugunida kalit va qiymat birga. `baho[20] = 5` yangi tugun ochmaydi, mavjud qiymatning 4 baytini 5 qiladi. `baho[2]` yangi tugun oladi, kalit 2, qiymat 0. `size` shu tugunni hisobga oladi.",
          "`at(9)` tugun izlaydi, topolmasa istisno obyektini tashlaydi va lug'atni yozmaydi. `find` ham yozmaydi. `end` iterator «tugun yo'q» degan javob. Uni `*` qilish noma'lum. Obyekt yo'qolganda har tugun qaytariladi.",
        ],
        diagram: `set tugunlari, yurish tartibi
      (20)
   (10)   (30)
yurish: 10, 20, 30
xotirada yonma-yon emas
ikkinchi insert(10): yangi tugun yo'q

map
kalit 10 -> 1
kalit 20 -> 5
baho[2]: yangi tugun, qiymat 0
at(9): tugun yo'q, out_of_range`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Tartibli konteyner xatosi takrorni saqlash, yo'q kalitni `[]` bilan o'qish yoki `set` ni indeks bilan ochish.",
        ],
        items: [
          {
            title: "Takroriy insert size ni oshiradi deb o'ylash",
            why: [
              "`set` bir xil qiymatni bir marta saqlaydi. Ikkinchi `insert(10)` `false` qaytaradi. `size` o'shmaydi. Yurishda 10 bir marta chiqadi.",
            ],
            wrong: `sonlar.insert(10);
sonlar.insert(10);
std::cout << sonlar.size();`,
            right: `std::pair<std::set<int>::iterator, bool> natija = sonlar.insert(10);
std::cout << natija.second;`,
          },
          {
            title: "Yo'q kalitni [] bilan o'qish",
            why: [
              "`baho[2]` kalit yo'q bo'lsa, `int` qiymatni 0 qilib yozadi va `size` oshadi. Faqat qidirish `find` yoki `at`. `at` topilmasa otadi va yozmaydi.",
            ],
            wrong: `std::cout << baho[2];`,
            right: `std::map<int, int>::iterator it = baho.find(2);
if (it == baho.end()) {
    std::cout << "yoq{{n}}";
}`,
          },
          {
            title: "set ni indeks bilan ochish",
            why: [
              "`set` da `operator[]` yo'q. `sonlar[0]` yig'ilmaydi. Birinchi element `*sonlar.begin()`, bo'sh bo'lmasa. `begin() + 1` ham yig'ilmaydi. Keyingisi `++it`.",
            ],
            wrong: `std::cout << sonlar[0];`,
            right: `std::cout << *sonlar.begin();`,
          },
        ],
      },
      quiz: [
        {
          id: "14.4-q1",
          question: "`set` ga 30, 10, 20 va yana 10. `size` necha?",
          options: ["4", "3", "2", "1"],
          answer: 1,
          explanation:
            "10 ikki marta kiritilsa ham bitta element. size 3. insert ning bool i ikkinchi safar yolg'on.",
        },
        {
          id: "14.4-q2",
          question: "Shu set ni `begin` dan yursangiz, tartib qaysi?",
          options: [
            "30, keyin 10, keyin 20",
            "10, keyin 20, keyin 30",
            "20, keyin 10, keyin 30",
            "standart tartib va'da qilmaydi",
          ],
          answer: 1,
          explanation:
            "set std::less bilan tartiblaydi. int da bu o'sish tartibi: 10, 20, 30. Qo'shilgan vaqt tartib emas.",
        },
        {
          id: "14.4-q3",
          question: "`map<int, int>` da kalit 2 yo'q. `baho[2]` nima qiladi?",
          options: [
            "out_of_range otadi",
            "0 yozadi va size oshadi",
            "0 qaytaradi, size o'zgarmaydi",
            "kod yig'ilmaydi",
          ],
          answer: 1,
          explanation:
            "operator[] yo'q kalitni qo'shadi. int qiymat 0 bilan boshlanadi. size bittaga oshadi. at(2) esa otadi va yozmaydi.",
        },
      ],
    },
    {
      id: "14.5",
      navTitle: "algorithm",
      title: "<algorithm>: sort, reverse, min, max va find",
      goal: [
        "Bu darsdan keyin siz `<algorithm>` dagi amallarni konteynerning egasi emas, iterator oralig'ida yuruvchi funksiya deb chaqirasiz. `sort` o'sish tartibida joylashtiradi. `reverse` teskari qiladi. `min_element` va `max_element` birinchi eng kichik va eng kattaning iteratorini qaytaradi. `find` birinchi mosni yoki `end` ni qaytaradi.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Kutubxonachi javonning egasi emas. Siz unga «shu tokchadan shu tokchagacha» deysiz. `sort` kitoblarni o'sha tokchada qayta teradi, yangi javon olib kelmaydi. Bo'sh tokcha qolsa, u yerga tegmaydi.",
          "`reverse` kitoblarni o'rta atrofida almashtiradi. Eng chapdagi eng o'ngga ketadi. Bu tartiblash emas. 30, 10, 20 teskari bo'lsa, 20, 10, 30. O'sish tartibi boshqa ish.",
          "`find` chapdan yurib, birinchi mos kitobda to'xtaydi. Oxirigacha mos kelmasa, «yo'q» degan belgi `end`. Kitobni polga tashlamaydi va istisno varaqasi yozmaydi. `min_element` eng yupqa kitobning birinchisini ko'rsatadi. Ikkita bir xil yupqa bo'lsa, chapdagisi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`#include <algorithm>`. Oraliq `[first, last)`. `last` kirmaydi. `sort(begin, end)` butun vector. Amallar 13-bobdagi funksiya shablonlari. `vector` iteratorida `int` uchun nusxa yasaladi. Algoritm vector yasamaydi va `capacity` ni o'zgartirmaydi.",
        ],
        items: [
          {
            title: "sort va reverse",
            paragraphs: [
              "`std::sort(sonlar.begin(), sonlar.end())` elementlarni o'sish tartibida joylashtiradi. `operator<` kerak. `int` da bor. `{30, 10, 20}` dan keyin 10, 20, 30. `sort` `void`. Natijani yangi vector qilib qaytarmaydi, shu buferni yozadi.",
              "Teng elementlarning o'zaro tartibi saqlanishi shart emas. `stable_sort` boshqa funksiya. Misollardagi `sort` argumentlari har xil son, tartib to'liq aniq.",
              "`std::reverse` birinchi va oxirini, keyin ichkarini almashtiradi. `{30, 10, 20, 10}` dan `{10, 20, 10, 30}`. `reverse` ham `void`. `set` ni `sort` qilib bo'lmaydi: iteratori tasodifiy kirish bermaydi, `begin() + n` yo'q, va to'plam allaqachon tartibli.",
            ],
            code: `std::sort(sonlar.begin(), sonlar.end());
std::reverse(sonlar.begin(), sonlar.end());`,
            codeLabel: "joyida tartib, joyida teskari",
            table: {
              caption: "Besh amal nima qaytaradi.",
              headers: ["Amali", "Vazifasi", "Qaytishi"],
              rows: [
                ["sort", "o'sish tartibi, joyida", "void"],
                ["reverse", "teskari, joyida", "void"],
                ["min_element", "birinchi eng kichik", "iterator"],
                ["max_element", "birinchi eng katta", "iterator"],
                ["find", "birinchi mos yoki end", "iterator"],
              ],
            },
          },
          {
            title: "min_element va max_element",
            paragraphs: [
              "Ikkalasi ham iterator qaytaradi, sonning o'zi emas. Qiymat `*kichik`. `<<` iteratorni yozmaydi, yig'ilmaydi.",
              "`{30, 10, 20, 10}` da ikkita 10 bor. `min_element` chapdan birinchi eng kichikni oladi. Qiymat 10. `max_element` birinchi eng katta, 30. Elementlar joyida qoladi, `reverse` hali eski tartibni ko'radi.",
              "Bo'sh oraliqda qaytish `last`. `*last` noma'lum. `begin() == end()` bo'lsa, ochmang. Avval oraliq bo'sh emasligini biling.",
            ],
            code: `std::vector<int>::iterator kichik =
    std::min_element(sonlar.begin(), sonlar.end());
std::cout << *kichik;`,
            codeLabel: "iteratorni ochib o'qish",
          },
          {
            title: "find",
            paragraphs: [
              "`std::find(begin, end, 20)` chapdan birinchi 20 ni qidiradi. Topilsa, shu iterator. `*bor` 20. Vector o'zgarmaydi.",
              "99 yo'q bo'lsa, natija `end`. `yoq == sonlar.end()` rost. Istisno yo'q. `*yoq` noma'lum. Avval `end` bilan solishtiring.",
              "`set::find` o'z a'zosi, logarifmga yaqin qadam. `std::find` esa qadam-baqadam, eng yomonida har element. Tartibli `set` da `std::find` ni emas, `sonlar.find` ni ishlating. Bu darsdagi `find` vector ustida.",
            ],
            code: `std::vector<int>::iterator bor =
    std::find(sonlar.begin(), sonlar.end(), 20);
if (bor == sonlar.end()) {
    std::cout << "yoq";
}`,
            codeLabel: "topilmasa end",
          },
        ],
      },
      examples: [
        {
          title: "30, 10, 20 tartibda 10, 20, 30",
          intro: [
            "`sort` butun vectorni joyida yozadi. Ekranda 10, keyin 20, keyin 30.",
          ],
          codeLabel: "sort.cpp",
          code: `#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> sonlar{30, 10, 20};
    std::sort(sonlar.begin(), sonlar.end());
    std::cout << sonlar[0] << "{{n}}";
    std::cout << sonlar[1] << "{{n}}";
    std::cout << sonlar[2] << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `10
20
30`,
          analysis: [
            {
              lines: "6",
              text: "Uch element: 30, 10, 20. `size` 3. `capacity` kamida 3. Sonlar har xil, tartib bitta javobga ega.",
            },
            {
              lines: "7",
              text: "`sort` `[begin, end)` ni yozadi. `end` kirmaydi, u oxirgi elementdan keyin. Natija 10, 20, 30. `sort` `void`. Yangi vector qaytmaydi. Qayta ajratish yo'q.",
            },
            {
              lines: "8-10",
              text: "`[0]` 10, `[1]` 20, `[2]` 30. Eski 30 endi oxirida emas, boshida ham emas. Iteratorlar shu uyalarni ko'rsatib turadi, uyalarning ichi almashgan.",
            },
            {
              lines: "11",
              text: "`return` vectorni yopadi. Algoritm alohida buferning egasi emas edi. Blokni vector qaytaradi.",
            },
          ],
        },
        {
          title: "eng kichik 10, eng katta 30, teskari bosh 10",
          intro: [
            "`{30, 10, 20, 10}` da `min_element` 10, `max_element` 30. Keyin `reverse`. Yangi bosh 10, oxirgi uyada 30.",
          ],
          codeLabel: "min_max.cpp",
          code: `#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> sonlar{30, 10, 20, 10};
    std::vector<int>::iterator kichik = std::min_element(sonlar.begin(), sonlar.end());
    std::vector<int>::iterator katta = std::max_element(sonlar.begin(), sonlar.end());
    std::cout << *kichik << "{{n}}";
    std::cout << *katta << "{{n}}";
    std::reverse(sonlar.begin(), sonlar.end());
    std::cout << sonlar[0] << "{{n}}";
    std::cout << sonlar[3] << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `10
30
10
30`,
          analysis: [
            {
              lines: "6-8",
              text: "To'rt element. Ikkita 10 bor. `min_element` chapdagi birinchi eng kichikni ko'rsatadi, qiymat 10. `max_element` birinchi eng katta, 30. Oraliq yozilmaydi.",
            },
            {
              lines: "9-10",
              text: "`*kichik` 10, `*katta` 30. Iteratorni o'zi `cout` ga tushmaydi. Bo'sh oraliqda `*` noma'lum bo'lardi. Bu yerda `size` 4.",
            },
            {
              lines: "11",
              text: "`reverse` eski tartibni ag'daradi: 10, 20, 10, 30. `sort` emas. Chapdagi 30 o'ng uchga ketadi. `void`.",
            },
            {
              lines: "12-14",
              text: "`[0]` 10, `[3]` 30. `kichik` o'sha uyani ko'rsatib turadi, ichidagi son almashgan. Qiymatni `reverse` dan oldin o'qidik. `return` vectorni yopadi.",
            },
          ],
        },
        {
          title: "20 topiladi, 99 end",
          intro: [
            "`find` 20 ni ko'radi. 99 yo'q, iterator `end`, ekranda `yoq`. Vector tartibi o'zgarmaydi.",
          ],
          codeLabel: "find.cpp",
          code: `#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> sonlar{30, 10, 20};
    std::vector<int>::iterator bor = std::find(sonlar.begin(), sonlar.end(), 20);
    if (bor != sonlar.end()) {
        std::cout << *bor << "{{n}}";
    }
    std::vector<int>::iterator yoq = std::find(sonlar.begin(), sonlar.end(), 99);
    if (yoq == sonlar.end()) {
        std::cout << "yoq{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `20
yoq`,
          analysis: [
            {
              lines: "6-7",
              text: "Vector 30, 10, 20. `find` boshidan yuradi. 30 mos emas, 10 mos emas, 20 mos. Shu iterator qaytadi. Birinchi mos.",
            },
            {
              lines: "8-10",
              text: "`bor` `end` emas. `*bor` 20. Element joyida qoladi. `sort` chaqirilmagan.",
            },
            {
              lines: "11-14",
              text: "99 yo'q. `find` `end` qaytaradi. Istisno yo'q. `*yoq` yozilmaydi. Tenglik rost, ekranda `yoq`.",
            },
            {
              lines: "15",
              text: "`return` vectorni yopadi. `find` vaqtinchalik bufer olmagan. U faqat iteratorlarni oldinga surgan.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`sort` vectorning heap blokidagi `int` larni almashtiradi. 30, 10, 20 dan keyin blokda 10, 20, 30. Yangi blok so'ralmaydi. `capacity` o'sha. `begin` iteratori birinchi uyani ko'rsatib turadi, uyaning ichi endi 10. Qaysi tartiblash algoritmi ishlatilishi standartda qotirilmagan. Taqqoslashlar sonining aniq formulasi konsolda yo'q.",
          "`min_element` blokni yozmaydi. U iteratorni oldinga surib, hozirgi eng kichikni eslab boradi. Ikkita 10 da birinchisida to'xtaydi, keyingi 10 teng, `<` rost emas, birinchisi qoladi. `max_element` 30 da to'xtaydi. Ikkala iterator ham blokdagi uyalarni ko'rsatadi.",
          "`reverse` juftlarni almashtiradi. To'rt elementda birinchi va to'rtinchi, keyin ikkinchi va uchinchi. Blok o'sha. `find` faqat o'qiydi. 20 topilganda yurish to'xtaydi. 99 da `end` gacha boradi va `end` qaytaradi. `end` uya emas, oxirgi elementdan keyingi belgi. Uni ochish noma'lum.",
          "Bo'sh vector da `begin() == end()`. `min_element` shu `end` ni qaytaradi. `*` unda noma'lum. `sort` bo'sh oraliqda hech narsa yozmaydi. `set` iteratorini `sort` ga bersangiz, yig'ilmaydi. Tasodifiy kirish yo'q, elementlar ham o'zgarmas.",
        ],
        diagram: `vector bloki, sort dan oldin
[30][10][20]
sort joyida
[10][20][30]
yangi heap bloki yo'q

min_element [30][10][20][10]
birinchi 10 ni ko'rsatadi
max_element birinchi 30 ni

reverse
[10][20][10][30]

find 99 -> end
*end noma'lum`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Algoritm xatosi `sort` dan yangi vector kutish, `find` dan istisno kutish yoki bo'sh oraliqning iteratorini ochish.",
        ],
        items: [
          {
            title: "sort yangi vector qaytaradi deb olish",
            why: [
              "`sort` `void`. U berilgan oraliqni joyida yozadi. Natijani o'qish o'sha vector dan. `auto s = std::sort(...)` yig'ilmaydi. Bu kitobda `auto` siz, xato ochiq: `void` ni `vector` ga bo'lmaydi.",
            ],
            wrong: `std::vector<int> tartib = std::sort(sonlar.begin(), sonlar.end());`,
            right: `std::sort(sonlar.begin(), sonlar.end());
std::cout << sonlar[0];`,
          },
          {
            title: "find topilmasa istisno otadi deb yozish",
            why: [
              "`std::find` topilmasa `end` qaytaradi. `catch` yurishi shart emas. `end` ni ochish noma'lum. Avval `== sonlar.end()` tekshiriladi.",
            ],
            wrong: `std::vector<int>::iterator yoq =
    std::find(sonlar.begin(), sonlar.end(), 99);
std::cout << *yoq;`,
            right: `std::vector<int>::iterator yoq =
    std::find(sonlar.begin(), sonlar.end(), 99);
if (yoq == sonlar.end()) {
    std::cout << "yoq{{n}}";
}`,
          },
          {
            title: "Bo'sh oraliqda min_element ni ochish",
            why: [
              "Bo'sh oraliqda `min_element` `last` ni qaytaradi. `last` element emas. `*` noma'lum. Avval `begin() != end()`. `max_element` ham shu.",
            ],
            wrong: `std::vector<int> bosh;
std::cout << *std::min_element(bosh.begin(), bosh.end());`,
            right: `if (sonlar.begin() != sonlar.end()) {
    std::cout << *std::min_element(sonlar.begin(), sonlar.end());
}`,
          },
        ],
      },
      quiz: [
        {
          id: "14.5-q1",
          question: "`{30, 10, 20}` ni `sort` qilgach, `[0]` necha?",
          options: ["30", "10", "20", "sort void, vector o'zgarmaydi"],
          answer: 1,
          explanation:
            "sort joyida o'sish tartibini yozadi. 10, 20, 30. Birinchi element 10. sort void, yangi vector qaytarmaydi.",
        },
        {
          id: "14.5-q2",
          question: "`find` 99 ni topolmasa, nima qaytaradi?",
          options: [
            "0",
            "out_of_range",
            "end iterator",
            "99",
          ],
          answer: 2,
          explanation:
            "find istisno otmaydi. Mos element bo'lmasa, end qaytaradi. end ni ochish noma'lum. Avval end bilan solishtiriladi.",
        },
        {
          id: "14.5-q3",
          question: "`{30, 10, 20, 10}` da `*min_element` necha?",
          options: ["30", "20", "10", "ikkita 10 ni qo'shib 20"],
          answer: 2,
          explanation:
            "min_element birinchi eng kichik elementning iteratorini qaytaradi. Ikkita 10 bor, qiymat 10. Ochish shu 10 ni beradi.",
        },
      ],
    },
  ],
};

export const chapter14 = decode(rawChapter);
