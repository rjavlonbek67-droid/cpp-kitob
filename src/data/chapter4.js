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
  id: "4",
  number: 4,
  title: "Operatorlar",
  summary:
    "Hisoblash, qisqartirilgan yozuv, qadam, taqqoslash, mantiq, ustuvorlik va bitlar ustida ishlash.",
  lessons: [
    {
      id: "4.1",
      navTitle: "Arifmetik operatorlar",
      title: "Arifmetik operatorlar va butun son bo'linishi",
      goal: [
        "Bu darsdan keyin siz `+`, `-`, `*`, `/`, `%` ni to'g'ri o'qiysiz. Butun sonni butun songa bo'lganda kasr nima uchun tashlanishini, qoldiqning ishorasi qayerdan kelishini va nolga bo'lish nima uchun xavfli ekanini ayta olasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Nonni odamlar o'rtasida bo'lishni ko'z oldingizga keltiring. 5 ta non, 2 kishi. Har kimga 2 tadan tegadi, 1 tasi stolda qoladi. Butun sonlar shunday ishlaydi: `/` har kimga nechtadan, `%` stolda qolgan. Kasr non «yarim» deb yozilmaydi, tashlanadi.",
          "Agar nonni tortsa bo'lsa, bu `double`. 5.0 ni 2 ga bo'lsangiz, 2.5 chiqadi. Qoldiq operatori `%` esa nonni sanaydi, tortmaydi. Uni kasrga qo'llab bo'lmaydi.",
          "Manfiy non g'alati, lekin qarzda ishlaydi. C++ qoldiqni «bo'linuvchi qaysi tomonda turgan bo'lsa, qoldiq ham o'sha tomonda» qilib qo'yadi. −5 ni 2 ga bo'lsangiz, har kimga −2 dan, qoldiq −1. Bu polga qarab yaxlitlash emas. Nol tomonga qirqiladi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Arifmetik operatorlar ikkita qiymat oladi, bitta natija qaytaradi. Natijaning turi ishtirokchilarga qarab tanlanadi. Ikkalasi ham `int` bo'lsa, natija `int`. Bittasi `double` bo'lsa, hisob `double` da yuradi.",
        ],
        items: [
          {
            title: "Besh operator",
            paragraphs: [
              "`+` qo'shadi, `-` ayiradi, `*` ko'paytiradi. Ular kutilganidek ishlaydi, toki son turga sig'masa. Signed toshish noma'lum xatti-harakat, buni 2.4-darsda ko'rgan edik.",
              "`/` bo'ladi. Ikkala tomon ham butun bo'lsa, natija butun. Kasr qismi tashlanadi, nol tomonga. `5 / 2` bu 2, 2.5 emas. `1 / 2` bu 0.",
              "`%` qoldiq, faqat butun sonlar uchun. `5 % 2` bu 1. Qoida: `a == (a / b) * b + (a % b)`. Bo'linish qanday qirqilsa, qoldiq shunga mos tushadi.",
              "`*` , `/` va `%` `+` bilan `-` dan oldin hisoblanadi. `2 + 3 * 4` bu 14. Teng kuchlilar chapdan o'ngga: `20 / 4 / 2` bu `(20 / 4) / 2`, ya'ni 2, 10 emas. Qavs tartibni o'zgartiradi. To'liq jadval 4.6-darsda.",
            ],
            code: `5 + 2    // 7
5 - 2    // 3
5 * 2    // 10
5 / 2    // 2
5 % 2    // 1`,
            codeLabel: "musbat sonlar",
          },
          {
            title: "Butun bo'linish va qoldiqning ishorasi",
            paragraphs: [
              "C++11 dan beri butun bo'linish nol tomonga qirqiladi. `−5 / 2` bu −2, −3 emas. −2.5 ni pastga, −3 ga, tushirish «floor» deyiladi. C++ buni qilmaydi. U nolga yaqinroq butunni oladi.",
              "Qoldiq bo'linuvchining ishorasini oladi. `−5 % 2` bu −1, chunki `−5 == (−2) * 2 + (−1)`. `5 % −2` bu 1, chunki bo'linuvchi musbat. `−5 % −2` bu −1.",
              "Kasr kerak bo'lsa, tomonlardan bittasini `double` qiling: `5 / 2.0` yoki `static_cast<double>(5) / 2`. Ikkala tomon ham `int` bo'lib qolsa, avval 2 hisoblanadi, keyin kasrga aylantirish kech bo'ladi: `static_cast<double>(5 / 2)` bu 2.0.",
            ],
            table: {
              caption: "Nol tomonga qirqish. Qoldiq a = (a/b)*b + (a%b) dan tekshiriladi.",
              headers: ["Ifoda", "Natija", "Tekshiruv"],
              rows: [
                ["5 / 2", "2", "2*2+1 = 5"],
                ["-5 / 2", "-2", "(-2)*2+(-1) = -5"],
                ["5 / -2", "-2", "(-2)*(-2)+1 = 5"],
                ["-5 % 2", "-1", "bo'linuvchi manfiy"],
                ["5 % -2", "1", "bo'linuvchi musbat"],
              ],
            },
          },
          {
            title: "Nolga bo'lish",
            paragraphs: [
              "Butun sonni `0` ga `/` yoki `%` qilish noma'lum xatti-harakat. Dastur yiqilishi, jinoyat son chiqarishi yoki kompilyator butun tekshiruvni olib tashlashi mumkin. Bunga tayanmang.",
              "Kasrda `1.0 / 0.0` cheksizlik berishi mumkin, bu ham o'z alohida qoidasi. Hozir butun sonni nolga bo'lmang. Bo'luvchini avval tekshiring.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Besh operator, butun natija",
          intro: [
            "Hammasi `int`. Bo'linish kasr bermaydi. Qoldiq stolda qolgan non.",
          ],
          codeLabel: "arif.cpp",
          code: `#include <iostream>

int main() {
    int a = 5;
    int b = 2;
    std::cout << a + b << "{{n}}";
    std::cout << a - b << "{{n}}";
    std::cout << a * b << "{{n}}";
    std::cout << a / b << "{{n}}";
    std::cout << a % b << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `7
3
10
2
1`,
          analysis: [
            {
              lines: "4-5",
              text: "Ikki butun quti. 5 va 2. Operatorlar ularni o'qib, yangi vaqtinchalik natija yasaydi. `a` va `b` o'zgarmaydi.",
            },
            {
              lines: "6-8",
              text: "Qo'shish 7, ayirish 3, ko'paytirish 10. Bu uchala natija `int` va to'liq sig'adi.",
            },
            {
              lines: "9",
              text: "`5 / 2` butun bo'linish. 2.5 emas, 2. Kasr 0.5 tashlanadi, yaxlitlanmaydi. 2.9 bo'lsa ham butun bo'linishda tagiga tushardi, lekin bu yerda ikkala tomon ham `int`.",
            },
            {
              lines: "10",
              text: "`5 % 2` qoldiq 1. Tekshiruv: `(5 / 2) * 2 + (5 % 2) = 4 + 1 = 5`. Qoldiq bo'luvchidan kichik bo'ladi, manfiy bo'lmaganda.",
            },
          ],
        },
        {
          title: "Kasr faqat bir tomon double bo'lsa chiqadi",
          intro: [
            "Xuddi shu 5 va 2. Farq turda. Oxirgi qator kechikkan cast: avval butun 2, keyin 2.0.",
          ],
          codeLabel: "kasr.cpp",
          code: `#include <iostream>

int main() {
    int a = 5;
    int b = 2;
    std::cout << a / b << "{{n}}";
    std::cout << a / 2.0 << "{{n}}";
    std::cout << static_cast<double>(a) / b << "{{n}}";
    std::cout << static_cast<double>(a / b) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `2
2.5
2.5
2`,
          analysis: [
            {
              lines: "6",
              text: "Ikkala tomon `int`. Natija 2. Ekranda kasr yo'q.",
            },
            {
              lines: "7",
              text: "`2.0` `double` literal. `a` hisobdan oldin `double` ga ko'tariladi. `5.0 / 2.0` bu 2.5. Asl `a` qutisi hali ham `int` 5.",
            },
            {
              lines: "8",
              text: "`static_cast<double>(a)` avval 5.0 yasaydi, keyin `b` ni ko'tarib bo'ladi. Yana 2.5. Cast bo'linishdan oldin turibdi.",
            },
            {
              lines: "9",
              text: "Qavs ichida `a / b` avval 2 bo'ladi. Keyin shu 2 `double` ga aylanadi. Ekranda 2, ichida 2.0. Yo'qolgan 0.5 qaytmaydi. Cast ni bo'linishdan oldin qo'ying.",
            },
          ],
        },
        {
          title: "Manfiy son: nol tomonga, qoldiq bo'linuvchidan",
          intro: [
            "To'rtta ifoda bitta qoidani tasdiqlaydi. Natijani yodlash shart emas, tekshiruvni yodlang.",
          ],
          codeLabel: "manfiy.cpp",
          code: `#include <iostream>

int main() {
    std::cout << (-5 / 2) << "{{n}}";
    std::cout << (5 / -2) << "{{n}}";
    std::cout << (-5 % 2) << "{{n}}";
    std::cout << (5 % -2) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `-2
-2
-1
1`,
          analysis: [
            {
              lines: "4",
              text: "`−5 / 2`. Haqiqiy natija −2.5. Nol tomonga qirqilsa −2. Pastga yaxlitlansa −3 bo'lardi. C++ −2 beradi.",
            },
            {
              lines: "5",
              text: "`5 / −2` ham −2.5. Yana nol tomonga, −2. Bo'luvchining ishorasi qirqish tomonini o'zgartirmaydi.",
            },
            {
              lines: "6",
              text: "`−5 % 2`. `−5 == (−2) * 2 + (−1)`. Qoldiq −1. Bo'linuvchi manfiy, qoldiq ham manfiy.",
            },
            {
              lines: "7",
              text: "`5 % −2`. `5 == (−2) * (−2) + 1`. Qoldiq 1. Bo'luvchi manfiy bo'lsa ham, qoldiq bo'linuvchiga qaraydi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Protsessor `a` va `b` ning baytlarini registrga oladi. Qo'shish, ayirish, ko'paytirish shu registrlarda bit amali. Natija vaqtinchalik. Siz uni o'zgaruvchiga yozmasangiz, `a` va `b` ning uyasi tegilmaydi.",
          "Butun bo'linish kasr registrini to'ldirmaydi. Mashina bo'linmaning butun qismini va qoldiqni alohida berishi mumkin. `/` butunni oladi, `%` qoldiqni. Kasr hech qachon yozilmagan, shuning uchun keyin cast qilsangiz ham topilmaydi.",
          "`5 / 2.0` da `int` avval `double` naqshiga aylantiriladi, keyin kasr bo'linish bloki ishlaydi. Natija 8 baytlik `double`. Bu sekinroq emas degan gap emas, boshqa qurilma.",
          "Nolga bo'lishda protsessor xato signali berishi mumkin. Kompilyator «bunday bo'lmaydi» deb kodni qayta yozishi ham mumkin. Xotira barqaror natija saqlaydi deb kutmang.",
        ],
        diagram: `5 va 2 registrga ko'chiriladi
/   -> butun qism 2, kasr yozilmaydi
%   -> qoldiq 1
a va b qutilari o'zgarmaydi

-5 / 2:
haqiqiy -2.5
nol tomon: -2
qoldiq: -5 - (-2)*2 = -1`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Bu xatolar yig'iladi. Natija esa «biroz noto'g'ri»: 2 o'rniga 2.5 kutiladi, yoki dastur nolga bo'linib yiqiladi.",
        ],
        items: [
          {
            title: "Ikki int ni bo'lib, kasr kutish",
            why: [
              "`5 / 2` 2. Foiz, o'rtacha, pul hisobida shu tuzoq chiqadi. Bo'linishdan oldin kasr tur kerak.",
            ],
            wrong: `int yarim = 5 / 2;`,
            right: `double yarim = 5 / 2.0;`,
          },
          {
            title: "Cast ni kech qo'yish",
            why: [
              "`static_cast<double>(5 / 2)` avval 2 ni hisoblaydi. 2.0 chiqadi, 2.5 emas.",
            ],
            wrong: `double x = static_cast<double>(a / b);`,
            right: `double x = static_cast<double>(a) / b;`,
          },
          {
            title: "Qoldiqni kasrda ishlatish va nolga bo'lish",
            why: [
              "`%` faqat butun turlar uchun. `2.5 % 2` yig'ilmaydi. `a / 0` va `a % 0` esa yig'ilishi mumkin, lekin ishga tushganda noma'lum. Bo'luvchi 0 bo'lmasin.",
            ],
            wrong: `int q = a / b;`,
            right: `if (b != 0) {
    int q = a / b;
}`,
          },
        ],
      },
      quiz: [
        {
          id: "4.1-q1",
          question: "`int` da `7 / 2` va `7 % 2` nima?",
          options: ["3.5 va 0", "3 va 1", "4 va 1", "3 va 0.5"],
          answer: 1,
          explanation:
            "Butun bo'linish 3 qoldiradi, kasr tashlanadi. 7 = 3 * 2 + 1, shuning uchun qoldiq 1.",
        },
        {
          id: "4.1-q2",
          question: "`-5 / 2` C++ da nima?",
          options: ["-3, pastga yaxlitlanadi", "-2, nol tomonga qirqiladi", "-2.5", "2"],
          answer: 1,
          explanation:
            "Butun bo'linish nol tomonga qirqiladi. -2.5 dan nolga yaqini -2. -3 floor bo'lardi, C++ uni bermaydi.",
        },
        {
          id: "4.1-q3",
          question: "`static_cast<double>(5 / 2)` nima uchun 2.5 emas?",
          options: [
            "double bo'linishni bilmaydi",
            "Avval 5 / 2 butun 2 bo'ladi, keyin cast shu 2 ni oladi",
            "Cast faqat qo‘shishda ishlaydi",
            "5 va 2 juft bo'lgani uchun",
          ],
          answer: 1,
          explanation:
            "Qavs ichidagi bo'linish ikkala tomoni ham int. Natija 2. Cast yo'qolgan kasrni qaytara olmaydi. static_cast<double>(5) / 2 yozing.",
        },
      ],
    },
    {
      id: "4.2",
      navTitle: "Qisqartirilgan tayinlash",
      title: "Qisqartirilgan tayinlash operatorlari",
      goal: [
        "Bu darsdan keyin siz `+=`, `-=`, `*=`, `/=`, `%=` ni `a = a + b` ning qisqa shakli deb o'qiysiz. O'ngdan chapga yopishishini, natija qutiga qaytganida tur qanday qirqilishini va chap tomon bir marta hisoblanishini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Hamyondagi pulni ko'ring. «Hamyonga 3 qo'sh» desangiz, kassir summani o'qiydi, 3 ni qo'shadi, yangi summani o'sha hamyonga qaytaradi. Yangi hamyon ochilmaydi. `+=` shu.",
          "`a = a + b` ham xuddi shu gap, faqat hamyonning nomini ikki marta aytasiz. Oddiy o'zgaruvchida farq yo'q. Nom uzun yoki hisoblab topiladigan bo'lsa, ikki marta aytish ikki marta hisoblash bo'lishi mumkin. Qisqa shakl chap tomonni bir marta oladi.",
          "Zanjir o'ngdan yuradi. «Avval uning hamyoniga qo'sh, keyin menikiga shu yangi summani qo'sh.» `a += b += c` avval `b` ni yangilaydi, so'ng `a` ni.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Qisqartirilgan operator tayinlash oilasidan. U ham o'ngdan chapga yopishadi. Natija chapdagi qutiga yoziladi va shu qiymat ifodaning natijasi bo'ladi.",
        ],
        items: [
          {
            title: "Besh qisqa shakl",
            paragraphs: [
              "`a += b` bu `a = a + b`. `-=`, `*=`, `/=`, `%=` ham shu naqsh. `a` o'qiladi, amal bajariladi, natija `a` ga yoziladi.",
              "Chapda o'zgaruvchi turishi shart. `5 += a` yig'ilmaydi. O'ngda ifoda bo'lishi mumkin: `a += b * 2` avval `b * 2` ni hisoblaydi, chunki `*` tayinlashdan oldin.",
              "`/=` va `%=` butun qutida 4.1-darsdagi qirqishni qiladi. `a` 5, `a /= 2` bo'lsa, `a` 2 bo'ladi. Kasr saqlanmaydi, chunki quti `int`.",
            ],
            code: `a += b;   // a = a + b
a -= b;
a *= b;
a /= b;
a %= b;`,
            codeLabel: "naqsh",
          },
          {
            title: "O'ngdan chapga",
            paragraphs: [
              "`a += b += c` bu `a += (b += c)`. Avval `b = b + c`. Shu yangi `b` ifodaning qiymati. Keyin `a = a + yangi b`.",
              "O'qish qiyin. Ikki qatorga yozing. Qoidani bilish kerak, chunki boshqa odamning kodi shunday kelishi mumkin.",
            ],
          },
          {
            title: "Tur qirqilishi va bir marta hisoblash",
            paragraphs: [
              "`int n = 5; n += 2.9;` hisob `double` da 7.9 bo'ladi, qutiga yozilganda 7 qoladi. Qisqa shakl ham tayinlash. Quti o'z turidan kengroq natijani sig'dira olmaydi.",
              "`a = a + b` da `a` ikki marta yozilgan. Oddiy nomda bu ikki marta o'sha manzil. Keyinroq chap tomon funksiya chaqiruvi bo'lsa, qisqa shakl uni bir marta chaqiradi, uzun shakl ikki marta chaqirishi mumkin. Hozir oddiy nomda natija bir xil. Odatni hozir oling: o'zgartirilayotgan quti uchun `+=` yozing.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Bitta quti ketma-ket yangilanadi",
          intro: [
            "`hamyon` yangi quti ochilmaydi. Har satr ichidagi sonni almashtiradi.",
          ],
          codeLabel: "hamyon.cpp",
          code: `#include <iostream>

int main() {
    int hamyon = 10;
    hamyon += 3;
    std::cout << hamyon << "{{n}}";
    hamyon -= 4;
    std::cout << hamyon << "{{n}}";
    hamyon *= 2;
    std::cout << hamyon << "{{n}}";
    hamyon /= 4;
    std::cout << hamyon << "{{n}}";
    hamyon %= 3;
    std::cout << hamyon << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `13
9
18
4
1`,
          analysis: [
            {
              lines: "4-6",
              text: "Boshida 10. `+= 3` bu `hamyon = 10 + 3`. Ichiga 13 yoziladi. Birinchi qator 13.",
            },
            {
              lines: "7-8",
              text: "`-= 4` 13 dan 4 ni ayiradi. 9. Eski 13 yo'qoladi.",
            },
            {
              lines: "9-10",
              text: "`*= 2` 9 ni ikkilaydi. 18.",
            },
            {
              lines: "11-12",
              text: "`/= 4` butun bo'linish. 18 / 4 = 4, qoldiq tashlanadi. Quti `int`, 4.5 sig'maydi.",
            },
            {
              lines: "13-14",
              text: "`%= 3` qoldiq. 4 % 3 = 1. Oxirgi qator 1. Besh qadam, bitta quti.",
            },
          ],
        },
        {
          title: "Zanjir o'ngdan boshlanadi",
          intro: [
            "`a += b += c` ni chapdan o'qisangiz, adashasiz. Avval `b` yangilanadi.",
          ],
          codeLabel: "zanjir.cpp",
          code: `#include <iostream>

int main() {
    int a = 1;
    int b = 2;
    int c = 3;
    a += b += c;
    std::cout << a << "{{n}}";
    std::cout << b << "{{n}}";
    std::cout << c << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `6
5
3`,
          analysis: [
            {
              lines: "4-6",
              text: "Uchta alohida quti: 1, 2, 3.",
            },
            {
              lines: "7",
              text: "O'ngdagi `b += c` avval. `b = 2 + 3`, `b` 5 bo'ladi. Shu 5 ifodaning qiymati. Keyin `a += 5`, ya'ni `a = 1 + 5`. `a` 6.",
            },
            {
              lines: "8-10",
              text: "`a` 6, `b` 5, `c` 3. `c` hech qayerga yozilmagan, faqat o'qilgan. Agar chapdan `a` ni avval yangilaganingizda, `b` hali 2 bo'lardi va `a` boshqa son chiqardi. Kompilyator o'ngni birinchi qiladi.",
            },
          ],
        },
        {
          title: "Keng hisob qutiga qaytganida qirqiladi",
          intro: [
            "`n` `int`. O'ng tomon kasr. Yig'indi sig'maydi, kasr tashlanadi. Bu `+=` ning maxsus sehr emas, tayinlashning o'zi.",
          ],
          codeLabel: "qirqish.cpp",
          code: `#include <iostream>

int main() {
    int n = 5;
    n += 2.9;
    std::cout << n << "{{n}}";
    n /= 2;
    std::cout << n << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `7
3`,
          analysis: [
            {
              lines: "4-5",
              text: "`5 + 2.9` hisobi `double` da 7.9. Natija `int` qutiga yoziladi. 7.9 nol tomonga 7. 0.9 yo'qoladi. `n` 7.",
            },
            {
              lines: "6-7",
              text: "`n /= 2` bu `7 / 2`. Ikkalasi butun, natija 3. Yana kasr yo'q.",
            },
            {
              lines: "",
              label: "xulosa",
              text: "Qisqa operator yangi tur ochmaydi. Quti qanday bo'lsa, ichiga shunday sig'adigan qiymat yoziladi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`hamyon += 3` da protsessor `hamyon` manzilidan 10 ni o'qiydi, 3 ni qo'shadi, 13 ni o'sha manzilga qaytaradi. Yangi 4 bayt so'ralmaydi. Eski 10 ning ustiga yoziladi.",
          "`a += b += c` ikki yozuv. Avval `b` manzili yangilanadi. Keyin o'sha yangi qiymat `a` manziliga qo'shiladi. `c` faqat o'qiladi.",
          "`n += 2.9` da 5 kasr registriga ko'tariladi, 2.9 qo'shiladi, 7.9 chiqadi, keyin butun registrga qirqilib `n` manziliga 7 yoziladi. 7.9 hech qayerda saqlanmaydi.",
          "Oddiy `int` da `a = a + b` va `a += b` bir xil baytlarni tegizadi. Farq murakkab chap tomonda chiqadi: qisqa shakl manzilni bir marta hisoblaydi.",
        ],
        diagram: `hamyon manzili:  [10]
+= 3               o'qi, qo'sh, yoz
hamyon manzili:  [13]

n += 2.9
5 + 2.9 -> 7.9 (double)
int ga yozish -> 7
n manzili: [7]`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Qisqa operatorlar yig'iladi. Adashish tartibda va turda.",
        ],
        items: [
          {
            title: "Zanjirni chapdan o'qish",
            why: [
              "`a += b += c` avval `b` ni o'zgartiradi. Natija kutilganidan boshqa chiqadi, xato esa ko'rinmaydi.",
            ],
            wrong: `a += b += c;`,
            right: `b += c;
a += b;`,
          },
          {
            title: "/= ni kasr deb o'ylash",
            why: [
              "`int` qutida `/= 2` ham butun bo'linish. 5 dan 2 qoladi, 2.5 emas.",
            ],
            wrong: `int n = 5;
n /= 2;`,
            right: `double n = 5;
n /= 2;`,
          },
          {
            title: "Chapga son yozish",
            why: [
              "Tayinlashning chap tomoni quti bo'lishi kerak. `5 += 1` yig'ilmaydi.",
            ],
            wrong: `5 += 1;`,
            right: `n += 1;`,
          },
        ],
      },
      quiz: [
        {
          id: "4.2-q1",
          question: "`int a = 8; a %= 3;` dan keyin `a` nechchi?",
          options: ["2", "3", "5", "2.666"],
          answer: 0,
          explanation:
            "%= qoldiq yozadi. 8 = 2 * 3 + 2, qoldiq 2. Quti int, kasr chiqmaydi.",
        },
        {
          id: "4.2-q2",
          question: "`a = 1`, `b = 2`, `c = 3` bo'lsa, `a += b += c` dan keyin `b` nechchi?",
          options: ["2, b o'zgarmaydi", "5", "6", "3"],
          answer: 1,
          explanation:
            "Zanjir o'ngdan. Avval b += c, b = 5. Keyin a += 5, a = 6. c o'zgarmaydi.",
        },
        {
          id: "4.2-q3",
          question: "`int n = 5; n += 2.9;` natijasi nima?",
          options: ["7.9", "8", "7", "5"],
          answer: 2,
          explanation:
            "Hisob 7.9 bo'ladi, lekin n int. Tayinlashda kasr tashlanadi, n = 7. Yaxlitlab 8 qilinmaydi.",
        },
      ],
    },
    {
      id: "4.3",
      navTitle: "++ va --",
      title: "Inkrement va dekrement: prefix va postfix",
      goal: [
        "Bu darsdan keyin siz `++a` va `a++` ning qutini bir xil o'zgartirishini, lekin ifoda qiymati boshqa ekanini ajratasiz. Yolg'iz turgan qadamda farq yo'qligini, qiymat ishlatilganda eski va yangi son chiqishini misolda ko'rsatasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Navbatdagi raqamni ko'ring. Ikki xodim bor. Birinchisi avval taxtadagi raqamni bittaga oshiradi, keyin sizga yangi raqamni aytadi. Bu `++a`, prefix: avval qadam, keyin qiymat.",
          "Ikkinchi xodim sizga hozirgi raqamni aytadi, siz ketsangiz taxtani bittaga oshiradi. Bu `a++`, postfix: avval eski qiymat, keyin qadam. Siz eshitgan son bilan taxtada qolgan son boshqa.",
          "Hech kim so'ramasa, ikkala xodim ham taxtani bittaga oshiradi. Yolg'iz `++a;` va `a++;` dan keyin quti bir xil. Farq faqat «shu zahoti qanday son ishlatiladi» degan savolda. `--` xuddi shu, faqat birni ayiradi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`++` va `--` bitta o'zgaruvchiga yopishadi. Ular qutini o'zgartiradi. `5++` yig'ilmaydi, chunki 5 ning manzili yo'q.",
        ],
        items: [
          {
            title: "Prefix va postfix",
            paragraphs: [
              "`++a` avval `a` ni 1 ga oshiradi, ifoda yangi qiymatni beradi. `--a` avval 1 ga kamaytiradi, yangi qiymatni beradi.",
              "`a++` ifoda eski qiymatni beradi, keyin `a` ni oshiradi. `a--` eski qiymatni beradi, keyin kamaytiradi.",
              "Qadam alohida operator bo'lsa, eski qiymatni hech kim olmaydi. `++a;` va `a++;` dan keyin `a` bir xil. O'qish osonroq bo'lganini yozing. Ko'p C++ kodi prefix ni tanlaydi, chunki eski qiymat kerak bo'lmasa ortiqcha nusxa shart emas. `int` da bu farq sezilmaydi.",
            ],
            code: `++a;    // a birga o'sadi
a++;     // a yana birga o'sadi
--a;
a--;`,
            codeLabel: "yolg'iz qadam",
          },
          {
            title: "Qiymat ishlatilsa",
            paragraphs: [
              "`cout << a++` ekranga eski sonni yozadi, keyin `a` o'sadi. Keyingi qatorda `a` allaqachon yangi.",
              "`cout << ++a` avval o'sadi, ekranga yangi son tushadi.",
              "Bitta ifodada bitta o'zgaruvchini ikki marta o'zgartirmang: `a = a++`, `cout << a++ << a++`. Qoidalar yillar davomida o'zgargan, o'qish esa baribir buziladi. Ikki qatorga bo'ling.",
            ],
          },
          {
            title: "Tur",
            paragraphs: [
              "`++` `int`, `char` va ko'rsatgichlarda bor. `char` da `'A'++` emas, qutida: `char h = 'A'; ++h;` natija `'B'`, chunki kod 65 dan 66 ga o'tadi.",
              "`double` da ham `++` bir qo‘shadi, 1.5 dan 2.5. Bu kam ishlatiladi. Qadam odatda sanoq uchun.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Eski qiymat va yangi qiymat",
          intro: [
            "Ikkala quti ham 5 dan boshlanadi. Postfix ekranga 5 beradi. Prefix ekranga 6 beradi. Ikkalasi ham oxirida 6.",
          ],
          codeLabel: "qadam.cpp",
          code: `#include <iostream>

int main() {
    int a = 5;
    std::cout << a++ << "{{n}}";
    std::cout << a << "{{n}}";
    int b = 5;
    std::cout << ++b << "{{n}}";
    std::cout << b << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `5
6
6
6`,
          analysis: [
            {
              lines: "4-5",
              text: "`a` 5. `a++` ifodasi 5 ni beradi, `cout` 5 ni yozadi. Shu ifodadan keyin `a` 6 bo'ladi. Ekrandagi 5 eski nusxa.",
            },
            {
              lines: "6",
              text: "Endi qutining o'zi 6. Postfix o'z ishini qilgan.",
            },
            {
              lines: "7-8",
              text: "`b` 5. `++b` avval 6 qiladi, keyin 6 ni beradi. Ekranda 6. Quti ham 6.",
            },
            {
              lines: "9",
              text: "Ikkinchi marta ham 6. Prefix da ekran va quti bir xil sonni ko'rsatadi, chunki qadam oldin bo'lgan.",
            },
          ],
        },
        {
          title: "Yolg'iz turgan qadamda farq yo'q",
          intro: [
            "Hech kim eski qiymatni olmayapti. Ikkala usul ham qutini 1 ga oshiradi.",
          ],
          codeLabel: "yolgiz.cpp",
          code: `#include <iostream>

int main() {
    int a = 10;
    int b = 10;
    a++;
    ++b;
    std::cout << a << "{{n}}";
    std::cout << b << "{{n}}";
    a--;
    --b;
    std::cout << a << " " << b << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `11
11
10 10`,
          analysis: [
            {
              lines: "4-7",
              text: "Ikkalasi 10. `a++` va `++b` alohida operatorlar. Eski qiymat tashlanadi. Ikkalasi ham 11.",
            },
            {
              lines: "8-9",
              text: "Ikki qator ham 11. Shu holatda usulni tanlash o'qish masalasi, natija masalasi emas.",
            },
            {
              lines: "10-11",
              text: "`a--` va `--b` birni ayiradi. Yana yolg'iz turgani uchun ikkalasi ham 10. Oxirgi qator `10 10`.",
            },
          ],
        },
        {
          title: "char qadami keyingi kod",
          intro: [
            "`++` son qo'shadi. `char` da son bu belgi kodi. `'A'` dan keyin `'B'`.",
          ],
          codeLabel: "harf.cpp",
          code: `#include <iostream>

int main() {
    char harf = 'A';
    std::cout << harf << "{{n}}";
    ++harf;
    std::cout << harf << "{{n}}";
    std::cout << static_cast<int>(harf) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `A
B
66`,
          analysis: [
            {
              lines: "4-5",
              text: "`harf` baytida 65 yotadi. `cout` uni `A` qilib chizadi.",
            },
            {
              lines: "6-7",
              text: "`++harf` kodni 66 qiladi. 66 bu `'B'`. Alifbo sehr emas, qo'shni kod.",
            },
            {
              lines: "8",
              text: "Cast kodni son qilib ko'rsatadi: 66. Qadam 1 qo'shgan, 32 emas. Katta harfdan kichigiga o'tkazmaydi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`a++` da protsessor `a` manzilidagi sonni o'qiydi. Shu eski sonni vaqtinchalik joyga qo'yadi, chunki ifoda uni so'rayapti. Keyin manzildagi qiymatni 1 ga oshirib, o'sha yerga yozadi. `cout` vaqtinchalik eskisini oladi.",
          "`++a` da avval manzilga 1 qo'shiladi. Vaqtinchalik yangi son. Eski nusxa saqlanmaydi.",
          "Yolg'iz `a++` da vaqtinchalikni hech kim o'qimaydi. Yozuv baribir bo'ladi: manzildagi son 1 ga o'sadi. `int` uchun qo'shimcha joy arzimas. Katta obyektlarda postfix eski nusxani saqlagani seziladi. Hozir shuni eslab qoying.",
          "`a = a++` bitta manzilga ikki marta yozishga urinib ko'radi: qadam ham, tayinlash ham. Bu chalkash buyruq. Bitta ifodada bitta yozuv qiling.",
        ],
        diagram: `a manzili: [5]

a++   vaqtinchalik = 5
      manzil = 6
      ifoda 5 ni beradi

++a   manzil = 6
      ifoda 6 ni beradi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Qadam xatosi yig'iladi. Ekrandagi son kutilganidan bitta oldin yoki keyin chiqadi.",
        ],
        items: [
          {
            title: "Postfix ni yangi qiymat deb o'qish",
            why: [
              "`cout << a++` eski sonni yozadi. Yangi son keyingi qatorda.",
            ],
            wrong: `std::cout << a++;`,
            right: `++a;
std::cout << a;`,
          },
          {
            title: "Bitta ifodada ikki marta o'zgartirish",
            why: [
              "`a = a++` yoki `cout << a++ << a++` o'qilmaydi. Kompilyator ogohlantirishi mumkin. Ikki operator qiling.",
            ],
            wrong: `a = a++ + 1;`,
            right: `a = a + 1;`,
          },
          {
            title: "Songa qadam qo'yish",
            why: [
              "`++5` yig'ilmaydi. Qadam qutiga yozadi. Avval o'zgaruvchiga oling.",
            ],
            wrong: `std::cout << ++5;`,
            right: `int n = 5;
std::cout << ++n;`,
          },
        ],
      },
      quiz: [
        {
          id: "4.3-q1",
          question: "`int a = 5; std::cout << a++;` ekranga nima yozadi va `a` keyin nechchi?",
          options: ["5, keyin a = 5", "5, keyin a = 6", "6, keyin a = 6", "6, keyin a = 5"],
          answer: 1,
          explanation:
            "Postfix eski qiymatni beradi, shuning uchun ekranda 5. Qadam baribir bo'ladi, a keyin 6.",
        },
        {
          id: "4.3-q2",
          question: "Yolg'iz `++a;` va `a++;` dan keyin qiymat farq qiladimi?",
          options: [
            "Ha, postfix o'zgartirmaydi",
            "Yo'q, ikkalasi ham qutini 1 ga oshiradi",
            "Ha, prefix 2 qo'shadi",
            "Faqat char da farq qiladi",
          ],
          answer: 1,
          explanation:
            "Farq ifoda qiymatida. Hech kim qiymatni olmasa, ikkala yozuv ham qutini bir marta o'zgartiradi.",
        },
        {
          id: "4.3-q3",
          question: "`char h = 'A'; ++h;` dan keyin `h` nima?",
          options: ["'A'", "'B'", "'a'", "66 harfi emas, xato"],
          answer: 1,
          explanation:
            "++ kodga 1 qo'shadi. 65 dan 66, bu 'B'. Kichik harf 97, u 32 qadam narida.",
        },
      ],
    },
    {
      id: "4.4",
      navTitle: "Taqqoslash va =",
      title: "Taqqoslash operatorlari va = bilan == chalkashligi",
      goal: [
        "Bu darsdan keyin siz `==`, `!=`, `>`, `<`, `>=`, `<=` natijasi `bool` ekanini bilasiz. `if (a = 5)` nima uchun taqqoslash emasligini, `1 < x < 10` nima uchun matematika emasligini ko'rsatib bera olasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Tarozini ko'ring. Ikki tomonga tosh qo'yasiz. Tarozi «ha» yoki «yo'q» deydi, uchinchi tosh yasamaydi. `>` «chap og'irroqmi?», `==` «ikkala palla tengmi?». Javob `true` yoki `false`. Ekranga ular 1 va 0 bo'lib tushadi, toki `boolalpha` demaguningizcha.",
          "`=` boshqa asbob. U tarozi emas, qalam. Chap qutiga o'ngdagi sonni yozadi. `if` ichida qalam ishlatilsa, savol o'rniga yozuv bo'ladi. Yozilgan son nol bo'lmasa, `if` «ha» deb ichkariga kiradi. Siz taqqoslaganingiz yo'q, qutini buzgansiz.",
          "`1 < x < 10` matematikada «x 1 va 10 orasida» degani. C++ buni ikki marta tarozi qiladi, lekin siz o'ylagandek emas. Avval `1 < x`. Javob ha yoki yo'q, ya'ni 1 yoki 0. Keyin shu 1 yoki 0 ni 10 bilan solishtiradi. 0 ham, 1 ham 10 dan kichik. Shart deyarli har doim rost. Ikki tomonni `&&` bilan yozing.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Taqqoslash ikkita qiymatni oladi, `bool` qaytaradi. U qutini o'zgartirmaydi. `=` o'zgartiradi.",
        ],
        items: [
          {
            title: "Olti taqqoslash",
            paragraphs: [
              "`==` teng, `!=` teng emas, `<` kichik, `>` katta, `<=` kichik yoki teng, `>=` katta yoki teng.",
              "Natija `true` yoki `false`. `cout` ularni `1` va `0` qilib yozadi. `std::boolalpha` so'z qilib yozadi: `true`, `false`.",
              "`==` ni kasrda ehtiyot ishlating. `0.1 + 0.2 == 0.3` ko'pincha yolg'on. Buni 2.5-darsda ko'rganmiz. Butun sonlarda `==` aniq.",
            ],
            code: `a == b
a != b
a < b
a > b
a <= b
a >= b`,
            codeLabel: "oltisi",
          },
          {
            title: "= va ==",
            paragraphs: [
              "`a = 5` tayinlash. `a` 5 bo'ladi. Ifodaning qiymati ham 5. `if (a = 5)` avval 5 ni yozadi, keyin 5 ni shart qilib oladi. 5 nol emas, shart rost. Ichkariga har doim kiradi, `a` esa buzilgan.",
              "`a = 0` yozilsa, shart yolg'on, ichkariga kirmaydi. Yana taqqoslash emas. `a` nol bo'lib qoladi.",
              "`if (a == 5)` qutini o'qiyди, yozmaydi. Teng bo'lsa kiradi. Ko'p kompilyator `if (a = 5)` uchun ogohlantiradi: `suggest parentheses`. Ogohlantirishni o'chirmang.",
            ],
          },
          {
            title: "Zanjir matematikadagidek emas",
            paragraphs: [
              "`1 < x < 10` bu `(1 < x) < 10`. `1 < x` ning natijasi 0 yoki 1. Ikkalasi ham 10 dan kichik. `x` 100 bo'lsa ham shart rost chiqadi.",
              "Oraliq uchun ikkita taqqoslashni `&&` bilan ulang: `1 < x && x < 10`. `&&` keyingi darsda, lekin bu yozuvni hozir oling. Boshqasi yashirin xato.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Taqqoslash 1 yoki 0",
          intro: [
            "Qutilar o'zgarmaydi. Ekranda faqat savolning javobi.",
          ],
          codeLabel: "solishtir.cpp",
          code: `#include <iostream>

int main() {
    int a = 5;
    int b = 3;
    std::cout << (a > b) << "{{n}}";
    std::cout << (a < b) << "{{n}}";
    std::cout << (a == 5) << "{{n}}";
    std::cout << (a != b) << "{{n}}";
    std::cout << (a >= 5) << "{{n}}";
    std::cout << a << " " << b << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
0
1
1
1
5 3`,
          analysis: [
            {
              lines: "4-6",
              text: "`a` 5, `b` 3. `a > b` rost. `cout` `true` ni 1 qilib yozadi. Qavs shart, chunki `<<` va `<` aralashib ketmasin.",
            },
            {
              lines: "7",
              text: "`a < b` yolg'on. Ekran 0.",
            },
            {
              lines: "8-10",
              text: "`a == 5` rost, 1. `a != b` rost, 1. `a >= 5` tenglikni ham oladi, 1. `==` ikkita teng belgi. Bitta `=` bo'lsa, bu boshqa dastur bo'lardi.",
            },
            {
              lines: "11",
              text: "Oxirida `a` hali 5, `b` hali 3. Taqqoslash yozmagan.",
            },
          ],
        },
        {
          title: "if ichidagi = qutini buzadi",
          intro: [
            "Birinchi `if` taqqoslamaydi. U 5 ni yozadi va ichkariga kiradi. Ikkinchi `if` haqiqiy savol.",
          ],
          codeLabel: "tayin.cpp",
          code: `#include <iostream>

int main() {
    int a = 0;
    if (a = 5) {
        std::cout << "yozildi{{n}}";
    }
    std::cout << a << "{{n}}";
    if (a == 5) {
        std::cout << "teng{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `yozildi
5
teng`,
          analysis: [
            {
              lines: "4-6",
              text: "`a` 0. `a = 5` qutiga 5 yozadi. Ifodaning qiymati 5. `if` nolni yolg'on, qolganini rost deb oladi. 5 rost. `yozildi` chiqadi. Siz «a nolga tengmi?» deb so'ramagansiz.",
            },
            {
              lines: "8",
              text: "`a` endi 5. Eski 0 ketgan. Xato shu yerda yashirinadi: shart «ishladi», ma'lumot buzildi.",
            },
            {
              lines: "9-11",
              text: "`a == 5` o'qiydi. 5 teng 5, rost. `teng` chiqadi. `a` o'zgarmaydi. Taqqoslash ikki belgi.",
            },
          ],
        },
        {
          title: "1 < x < 10 deyarli har doim rost",
          intro: [
            "`x` 20, ya'ni 10 dan katta. Matematikada shart yolg'on bo'lishi kerak. C++ zanjiri rost chiqaradi.",
          ],
          codeLabel: "oraliq.cpp",
          code: `#include <iostream>

int main() {
    int x = 20;
    std::cout << (1 < x < 10) << "{{n}}";
    std::cout << (1 < x && x < 10) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
0`,
          analysis: [
            {
              lines: "4-5",
              text: "`1 < x` bu `1 < 20`, rost, qiymati 1. Keyin `1 < 10`. Bu ham rost. Ekran 1. `x` ning 20 ekani ikkinchi taqqoslashda yo'q. U yerda faqat 1 va 10 solishtirilgan.",
            },
            {
              lines: "6",
              text: "`1 < x` rost, `x < 10` yolg'on. `&&` ikkalasi rost bo'lsagina rost. Natija 0. Bu siz xohlagan savol: 20 oraliqda emas.",
            },
            {
              lines: "",
              label: "xulosa",
              text: "Oraliqni bitta zanjir qilmang. Ikki taqqoslash, o'rtada `&&`.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Taqqoslash protsessorda ikki registrni solishtiradi va bayroq qo'yadi: katta, kichik yoki teng. C++ shu bayroqdan `bool` yasaydi. `bool` odatda 1 bayt, ichida 0 yoki 1. Asl sonlar o'z manzilida qoladi.",
          "`a = 5` boshqa buyruq. 5 soni `a` manziliga yoziladi. Eski baytlar ustiga. `if` keyin shu yozilgan qiymatni nolga tekshiradi. Taqqoslash bayrog'i emas, nol tekshiruvi.",
          "`1 < x < 10` ikki alohida solishtirish. Birinchisining natijasi 0 yoki 1 bo'lgan vaqtinchalik. Ikkinchi solishtirish `x` ni ko'rmaydi. `x` 20 bo'lib turadi, lekin savolga kirmaydi.",
          "`==` va `=` bitta belgi bilan farq qiladi, mashina kodi esa butunlay boshqa. Biri o'qiydi, biri yozadi.",
        ],
        diagram: `a: [5]   b: [3]
a > b  -> bayroq "katta" -> bool 1
a va b manzillari o'zgarmaydi

a = 5  -> a manziliga 5 yoziladi
if shu 5 nol emasligini ko'radi

1 < 20 -> 1
1 < 10 -> 1
x bu ikkinchi qadamda yo'q`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Eng qimmat xato `=` ni `==` o'rniga qo'yish. Dastur yig'iladi va «ishlaydi», lekin qiymat o'zgaradi.",
        ],
        items: [
          {
            title: "if ichida bitta teng",
            why: [
              "`if (a = 5)` har doim kiradi va `a` ni 5 qiladi. Taqqoslash `==`.",
            ],
            wrong: `if (a = 5) { }`,
            right: `if (a == 5) { }`,
          },
          {
            title: "Matematik zanjir",
            why: [
              "`1 < x < 10` deyarli har doim 1. Ikkinchi solishtirish `x` ni emas, 0 yoki 1 ni ko'radi.",
            ],
            wrong: `if (1 < x < 10) { }`,
            right: `if (1 < x && x < 10) { }`,
          },
          {
            title: "Qavssiz taqqoslashni cout ga berish",
            why: [
              "`cout << a < b` yig'ilmaydi yoki boshqa ma'no beradi. Taqqoslashni qavsga oling.",
            ],
            wrong: `std::cout << a < b;`,
            right: `std::cout << (a < b);`,
          },
        ],
      },
      quiz: [
        {
          id: "4.4-q1",
          question: "`int a = 3; int b = 3;` bo'lsa, `a != b` ekranga nima yozadi?",
          options: ["1", "0", "3", "true so'zi, har doim"],
          answer: 1,
          explanation:
            "3 va 3 teng, shuning uchun != yolg'on. cout bool ni 0 qilib yozadi. true so'zi uchun boolalpha kerak.",
        },
        {
          id: "4.4-q2",
          question: "`int a = 0; if (a = 5)` ichkariga kiradimi va `a` nima bo'ladi?",
          options: [
            "Kirmaydi, a 0 qoladi",
            "Kiradi, a 5 bo'lib qoladi",
            "Kiradi, a 0 qoladi",
            "Kompilyator bu qatorni man etadi",
          ],
          answer: 1,
          explanation:
            "Bitta = tayinlash. a ga 5 yoziladi. if 5 ni rost deb ichkariga kiradi. Taqqoslash == bo'lishi kerak edi.",
        },
        {
          id: "4.4-q3",
          question: "`int x = 20; (1 < x < 10)` nima beradi?",
          options: [
            "0, chunki 20 oraliqda emas",
            "1, chunki avval 1 < 20 rost, keyin 1 < 10 ham rost",
            "20",
            "Xato, zanjir yig'ilmaydi",
          ],
          answer: 1,
          explanation:
            "(1 < x) natijasi 1. Keyin 1 < 10 rost. x ikkinchi solishtirishda qatnashmaydi. To'g'ri yozuv: 1 < x && x < 10, u 0 beradi.",
        },
      ],
    },
    {
      id: "4.5",
      navTitle: "Mantiqiy operatorlar",
      title: "Mantiqiy operatorlar va short-circuit",
      goal: [
        "Bu darsdan keyin siz `&&`, `||`, `!` ning rostlik jadvalini yozasiz. Chap tomon yetarli bo'lsa, o'ng tomon hisoblanmasligini, ya'ni short-circuit ni, xavfli bo'linishni himoya qilish uchun ishlata olasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Ikki qo'riqchini ko'ring. `&&` «ikkala eshik ham ochiq bo'lsin». Birinchi eshik yopiq bo'lsa, ikkinchi qo'riqchi uyquda qoladi. Baribir kira olmaysiz. Uni uyg'otishning hojati yo'q.",
          "`||` «bittasi ochiq bo'lsa bas». Birinchi eshik ochiq bo'lsa, ikkinchisiga qaramaysiz. Yo'l allaqachon bor. `!` esa javobni ag'daradi: ochiq bo'lsa yopiq deydi, yopiq bo'lsa ochiq.",
          "Uyquda qolish short-circuit. O'ng tomondagi ish bajarilmaydi: na qadam, na bo'linish, na xato. Bu dangasalik emas, himoya. Chapda `bo'luvchi != 0` yolg'on bo'lsa, o'ngdagi `10 / bo'luvchi` umuman yopilmaydi. Nolga bo'linish bo'lmaydi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Mantiqiy operatorlar `bool` bilan ishlaydi. Son bersangiz, nol yolg'on, qolgan hamma narsa rost. Natija yana `bool`.",
        ],
        items: [
          {
            title: "Uch operator va jadval",
            paragraphs: [
              "`!a` rostni yolg'on, yolg'onni rost qiladi. `!0` rost, `!5` yolg'on, chunki 5 avval rostga aylanadi.",
              "`a && b` ikkalasi ham rost bo'lsagina rost. Bittasi yolg'on bo'lsa, natija yolg'on.",
              "`a || b` bittasi rost bo'lsa, natija rost. Ikkalasi yolg'on bo'lsagina yolg'on.",
              "`!` eng oldin, keyin `&&`, keyin `||`. `true || false && false` bu `true || (false && false)`, natija rost. `&&` ni `||` dan mustahkam deb yodlang, xuddi `*` ning `+` dan mustahkamligi kabi.",
            ],
            table: {
              caption: "Rostlik jadvali. 1 rost, 0 yolg'on.",
              headers: ["a", "b", "!a", "a && b", "a || b"],
              rows: [
                ["0", "0", "1", "0", "0"],
                ["0", "1", "1", "0", "1"],
                ["1", "0", "0", "0", "1"],
                ["1", "1", "0", "1", "1"],
              ],
            },
          },
          {
            title: "Short-circuit",
            paragraphs: [
              "`&&` chapni ko'radi. Yolg'on bo'lsa, o'ngni hisoblamaydi. Natija allaqachon yolg'on.",
              "`||` chapni ko'radi. Rost bo'lsa, o'ngni hisoblamaydi. Natija allaqachon rost.",
              "Chap yolg'on emas (`&&`) yoki chap rost emas (`||`) bo'lsa, o'ng hisoblanadi. Qadam, funksiya, bo'linish o'ngda bo'lsa, ular ba'zan umuman ishlamaydi.",
              "`&` va `|` boshqa narsa. Ular bit operatori, 4.7-dars. Short-circuit qilmaydi. Mantiq uchun `&&` va `||` yozing.",
            ],
            code: `if (b != 0 && a / b > 2) { }
if (topildi || qidir()) { }`,
            codeLabel: "himoya",
          },
          {
            title: "Sonni shart o'rnida ishlatish",
            paragraphs: [
              "`if (n)` bu `if (n != 0)`. `if (!n)` bu `if (n == 0)`. Qisqa, lekin o'qilishi «n bor» degani. Yangi kodda `n != 0` ochiqroq. Qoidani biling, chunki ko'rasiz.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Jadvalni dastur chiqaradi",
          intro: [
            "To'rt juftlik. `!` faqat chapga qaraydi. `&&` va `||` jadvaldagidek.",
          ],
          codeLabel: "jadval.cpp",
          code: `#include <iostream>

int main() {
    bool a = false;
    bool b = true;
    std::cout << (!a) << "{{n}}";
    std::cout << (a && b) << "{{n}}";
    std::cout << (a || b) << "{{n}}";
    std::cout << (!b) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
0
1
0`,
          analysis: [
            {
              lines: "4-6",
              text: "`a` yolg'on, `b` rost. `!a` rost. Ekran 1. `boolalpha` yo'q, shuning uchun so'z emas, 1.",
            },
            {
              lines: "7",
              text: "`false && true` yolg'on. Bittasi yetishmaydi. Ekran 0.",
            },
            {
              lines: "8",
              text: "`false || true` rost. Bitta ochiq eshik yetadi. Ekran 1.",
            },
            {
              lines: "9",
              text: "`!b` rostning teskarisi, yolg'on. Ekran 0. Jadvalning ikkinchi qatori: a=0, b=1, !a=1, &&=0, ||=1. To'rtinchi chiqarish `!b`.",
            },
          ],
        },
        {
          title: "&& o'ngni uyg'otmaydi",
          intro: [
            "`x` faqat o'ng tomonda o'sishi kerak edi. Chap yolg'on bo'lgani uchun `++x` ishlamaydi.",
          ],
          codeLabel: "and.cpp",
          code: `#include <iostream>

int main() {
    int x = 0;
    bool chap = false;
    if (chap && ++x > 0) {
        std::cout << "kirdi{{n}}";
    }
    std::cout << x << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `0`,
          analysis: [
            {
              lines: "4-5",
              text: "`x` 0, `chap` yolg'on. `kirdi` chiqmasligi kerak, chunki `&&` rost emas.",
            },
            {
              lines: "6",
              text: "Chap `false`. `&&` o'ngni hisoblamaydi. `++x` yo'q. `x > 0` ham yo'q. Ichkariga kirmaydi.",
            },
            {
              lines: "9",
              text: "`x` hali 0. Agar short-circuit bo'lmaganida, `++x` uni 1 qilardi. Konsolda faqat 0. `kirdi` yo'q.",
            },
          ],
        },
        {
          title: "|| va nolga bo'linishdan saqlanish",
          intro: [
            "Birinchi shart rost bo'lsa, ikkinchi qadam yotadi. Keyin `bo'luvchi` nol bo'lsa, bo'linish umuman yozilmaydi.",
          ],
          codeLabel: "himoya.cpp",
          code: `#include <iostream>

int main() {
    int x = 0;
    bool chap = true;
    if (chap || ++x > 0) {
        std::cout << "ochiq{{n}}";
    }
    std::cout << x << "{{n}}";

    int a = 10;
    int b = 0;
    if (b != 0 && a / b > 2) {
        std::cout << "katta{{n}}";
    } else {
        std::cout << "xavfsiz{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `ochiq
0
xavfsiz`,
          analysis: [
            {
              lines: "5-8",
              text: "`chap` rost. `||` o'ngni olmaydi. `++x` ishlamaydi. Ichkariga kiradi, `ochiq` chiqadi. Keyingi qator `x` hali 0.",
            },
            {
              lines: "11-13",
              text: "`b` 0. `b != 0` yolg'on. `&&` o'ngdagi `a / b` ni hisoblamaydi. Nolga bo'linish bo'lmaydi. Agar `&&` o'rniga ikkala tomonni ham majburan hisoblasangiz, bu xavfli buyruq bo'lardi.",
            },
            {
              lines: "15-16",
              text: "Shart yolg'on, `else` ishlaydi. `xavfsiz`. `katta` yo'q, chunki bo'linish bo'lmadi va 0 dan katta degan savol berilmadi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`&&` va `||` protsessorda sakrashga aylanadi. Chap yolg'on bo'lsa, `&&` o'ngdagi buyruqlarni o'tkazib, natija 0 deb davom etadi. Chap rost bo'lsa, `||` o'ngni o'tkazib, natija 1 deb davom etadi.",
          "O'tkazib yuborilgan `++x` manzilga yozilmaydi. `x` eski baytida qoladi. Short-circuit «natija yolg'on, lekin qadam bo'ldi» degani emas. Qadam yo'q.",
          "`a / b` o'ngda tursa va chap yolg'on bo'lsa, bo'linish buyrug'i registrga tushmaydi. Nol bo'luvchi hech qachon bo'linish blokiga bormaydi. Himoya xotirada emas, buyruqlar tartibida.",
          "`!` bitta qiymatni ag'daradi. U short-circuit qilmaydi, chunki o'ng tomoni yo'q. `!a` `a` ni o'qiydi, qutini yozmaydi.",
        ],
        diagram: `chap false && ++x
  chap ni o'qi -> 0
  o'ngga sakra
  x manzili yozilmaydi

b == 0 && a / b
  b != 0 ? yo'q
  bo'linish buyrug'i ishlamaydi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Mantiq xatosi yig'iladi. O'ng tomondagi qadam ba'zan bo'ladi, ba'zan yo'q. Buni tasodif deb qo'ymang.",
        ],
        items: [
          {
            title: "& ni && o'rniga yozish",
            why: [
              "`&` bit operatori. Ikki tomonni ham hisoblaydi. `b != 0 & a / b` yozilsa, bo'linish baribir bo'lishi mumkin. Mantiq uchun `&&`.",
            ],
            wrong: `if (b != 0 & a / b > 2)`,
            right: `if (b != 0 && a / b > 2)`,
          },
          {
            title: "O'ngdagi qadamga tayanib ketish",
            why: [
              "`if (tayyor && ++sanoq)` da `sanoq` faqat `tayyor` rost bo'lsa o'sadi. Hisoblagichni shart ichiga yashirmang.",
            ],
            wrong: `if (tayyor && ++sanoq > 0) { }`,
            right: `if (tayyor) {
    ++sanoq;
}`,
          },
          {
            title: "|| va && tartibini aralashtirish",
            why: [
              "`a || b && c` bu `a || (b && c)`, `(a || b) && c` emas. Qavs qo'ying.",
            ],
            wrong: `if (a || b && c)`,
            right: `if ((a || b) && c)`,
          },
        ],
      },
      quiz: [
        {
          id: "4.5-q1",
          question: "`false && true` va `false || true` nima?",
          options: ["0 va 0", "1 va 1", "0 va 1", "1 va 0"],
          answer: 2,
          explanation:
            "&& ikkalasini ham so'raydi, bittasi yolg'on, natija 0. || bittasi rost bo'lsa bas, natija 1.",
        },
        {
          id: "4.5-q2",
          question: "`int x = 0; if (false && ++x) { }` dan keyin `x` nechchi?",
          options: ["1, chunki ++ yozilgan", "0, chunki o'ng hisoblanmaydi", "2", "xato, yig'ilmaydi"],
          answer: 1,
          explanation:
            "Chap yolg'on. && o'ngni short-circuit qiladi. ++x ishlamaydi, x 0 qoladi.",
        },
        {
          id: "4.5-q3",
          question: "`b` nol bo'lsa, `b != 0 && a / b > 2` nima uchun xavfsiz?",
          options: [
            "Chunki / nolni kechiradi",
            "Chunki chap yolg'on, bo'linish hisoblanmaydi",
            "Chunki && avval o'ngni hisoblaydi",
            "Chunki a ham nol bo'ladi",
          ],
          answer: 1,
          explanation:
            "b != 0 yolg'on. && o'ngdagi a / b ga bormaydi. Nolga bo'linish buyrug'i ishlamaydi.",
        },
      ],
    },
    {
      id: "4.6",
      navTitle: "Ustuvorlik",
      title: "Operatorlar ustuvorligi va qavslar",
      goal: [
        "Bu darsdan keyin siz ifoda qanday bo'laklarga bo'linishini jadvalsiz ham taxmin qila olasiz. `*` ning `+` dan, `&&` ning `||` dan oldin turishini, `<<` siljishining `+` dan keyin emas, oldin emasligini va qavs nima uchun arzonroq ekanini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Oshxonadagi tartibni ko'ring. Tuz solishdan oldin suv qaynashi kerak. Retseptda «suvni qaynat, tuz sol» yozilmagan bo'lsa ham, oshpaz ba'zi ishlarni oldin qiladi. Operatorlarning ustuvorligi shu yashirin tartib.",
          "`*` va `/` qaynash, `+` va `-` tuz solish. `2 + 3 * 4` avval ko'paytiriladi. Siz chapdan o'qib 20 kutmaysiz, 14 chiqadi. Qavs «avval mana buni qil» degan oshpazning qo'li. `(2 + 3) * 4` bu 20.",
          "Tartibni yoddan chiqarish uyat emas. O'qilmaydigan ifoda uyat. Qavs bepul. Ikki kishi turlicha o'qishi mumkin bo'lgan joyga qavs qo'ying, hatto jadval sizniki tomonda bo'lsa ham.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Ustuvorlik kompilyatorning ifodani qanday daraxt qilishi. Bu ish vaqtida emas, tarjimada hal bo'ladi. Quyidagi jadval shu bobdagi operatorlar. Yuqoridagi avval bajariladi.",
        ],
        items: [
          {
            title: "Shu bobdagi tartib",
            paragraphs: [
              "Bir xil qatordagilar odatda chapdan o'ngga. Tayinlash va qisqa tayinlash o'ngdan chapga. Buni 4.2-darsda `a += b += c` da ko'rdik.",
            ],
            table: {
              caption: "Yuqori qator avval. To'liq til jadvali uzunroq, bu bobga yetadigan qismi.",
              headers: ["Avval", "Operatorlar", "Yo'nalish"],
              rows: [
                ["1", "a++  a--", "chapdagi quti"],
                ["2", "++a  --a  !  ~  unary -", "o'ngga"],
                ["3", "*  /  %", "chapdan o'ngga"],
                ["4", "+  -", "chapdan o'ngga"],
                ["5", "<<  >>  (bit siljish)", "chapdan o'ngga"],
                ["6", "<  >  <=  >=", "chapdan o'ngga"],
                ["7", "==  !=", "chapdan o'ngga"],
                ["8", "&", "chapdan o'ngga"],
                ["9", "^", "chapdan o'ngga"],
                ["10", "|", "chapdan o'ngga"],
                ["11", "&&", "chapdan o'ngga"],
                ["12", "||", "chapdan o'ngga"],
                ["13", "=  +=  -=  *=  /=  %=", "o'ngdan chapga"],
              ],
            },
          },
          {
            title: "Ko'p uchraydigan to'qnashuvlar",
            paragraphs: [
              "`2 + 3 * 4` bu `2 + (3 * 4)` = 14. `(2 + 3) * 4` = 20.",
              "`20 / 4 / 2` chapdan: `(20 / 4) / 2` = 2. O'ngdan 10 bo'lardi, lekin emas.",
              "`a || b && c` bu `a || (b && c)`. `&&` yuqoriroq.",
              "Bit siljishi `+` dan keyin emas. `1 << 2 + 3` bu `1 << (2 + 3)` = `1 << 5` = 32. `(1 << 2) + 3` = 7. Siljishni 4.7-darsda ochamiz, tartibni hozir yodlang.",
              "`cout << a < b` taqqoslash emas. `<<` va `<` aralashadi. Qavs qo'ying.",
            ],
          },
          {
            title: "Qavs qachon",
            paragraphs: [
              "Jadvalni bilganingizda ham, boshqa odam bilmasligi mumkin. `a || b && c` o'rniga `a || (b && c)` yozing, agar shu ma'no kerak bo'lsa. Agar `(a || b) && c` kerak bo'lsa, qavs shart, aks holda ma'no boshqa.",
              "Qavs hisobni sekinlatmaydi. Kompilyator daraxtni baribir yasaydi. Qavs faqat daraxtning shaklini siz xohlaganga qo'yadi.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Ko'paytirish qo'shishdan oldin",
          intro: [
            "Bir xil sonlar, ikki xil daraxt. Qavs bo'lmasa, `*` yutadi.",
          ],
          codeLabel: "tartib.cpp",
          code: `#include <iostream>

int main() {
    std::cout << (2 + 3 * 4) << "{{n}}";
    std::cout << ((2 + 3) * 4) << "{{n}}";
    std::cout << (20 / 4 / 2) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `14
20
2`,
          analysis: [
            {
              lines: "4",
              text: "`3 * 4` avval, 12. Keyin `2 + 12` = 14. Chapdan `2 + 3` deb o'qish 5, uni 4 ga ko'paytirish 20 bo'lardi. Jadval boshqa deydi.",
            },
            {
              lines: "5",
              text: "Qavs `2 + 3` ni oldinga suradi. 5 * 4 = 20. Qavs yangi operator emas, tartib.",
            },
            {
              lines: "6",
              text: "`/` va `/` teng kuchli, chapdan o'ngga. `20 / 4` = 5, `5 / 2` butun 2. O'ngdan `4 / 2` = 2, `20 / 2` = 10 bo'lardi. Chap yutadi.",
            },
          ],
        },
        {
          title: "&& ning || dan oldin turishi",
          intro: [
            "Qavssiz ifoda `&&` ni ichkariga oladi. Ikkinchi qator qavs bilan boshqa daraxt.",
          ],
          codeLabel: "mantiq_tartib.cpp",
          code: `#include <iostream>

int main() {
    bool a = true;
    bool b = false;
    bool c = false;
    std::cout << (a || b && c) << "{{n}}";
    std::cout << ((a || b) && c) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
0`,
          analysis: [
            {
              lines: "4-7",
              text: "`b && c` avval: `false && false` yolg'on. Keyin `a || false`. `a` rost, natija rost. Ekran 1. Qavs yozilmagan bo'lsa ham daraxt shunday.",
            },
            {
              lines: "8",
              text: "`(a || b)` rost. Keyin `true && c`. `c` yolg'on, natija yolg'on. Ekran 0. Qavs daraxtni ag'dargan.",
            },
            {
              lines: "",
              label: "o'qish",
              text: "Ikki qatorni bir xil deb o'qish xato. Birinchi qatorda `c` faqat `b` bilan bog'langan. Ikkinchisida `c` butun yoki-ni yopadi.",
            },
          ],
        },
        {
          title: "Siljish va qo'shish",
          intro: [
            "`<<` bu yerda `cout` emas. Chapda son turibdi. `+` siljishdan oldin hisoblanadi. Bu 4.7-darsga ko'prik.",
          ],
          codeLabel: "siljish_tartib.cpp",
          code: `#include <iostream>

int main() {
    std::cout << (1 << 2 + 3) << "{{n}}";
    std::cout << ((1 << 2) + 3) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `32
7`,
          analysis: [
            {
              lines: "4",
              text: "`2 + 3` avval, 5. Keyin `1 << 5`, ya'ni 1 ni 5 marta chapga siljitish. 32. Agar chapdan siljitib keyin qo'shsangiz, boshqa son chiqardi.",
            },
            {
              lines: "5",
              text: "`1 << 2` avval, 4. Keyin `4 + 3` = 7. Qavs `+` ni siljishdan keyinga qo'ydi.",
            },
            {
              lines: "",
              label: "cout",
              text: "Tashqi `cout <<` oqim operatori, chunki chapda `cout` turibdi. Ichki `1 << 2` bit siljishi, chunki chapda son. Bir xil belgi, chapdagi tur ma'noni tanlaydi. Qavs ichki siljishni `cout` zanjiriga aralashtirmaydi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Ustuvorlik xotirada jadval bo'lib yotmaydi. Kompilyator ifodani daraxt qiladi va shu daraxt bo'yicha buyruqlar yozadi. `2 + 3 * 4` uchun avval ko'paytirish buyrug'i, keyin qo'shish buyrug'i chiqadi. Ishlayotgan dastur «jadvalni ko'rib» qaror qilmaydi.",
          "Qavs ham bayt qoldirmaydi. U faqat daraxtning shaklini o'zgartiradi. `(2 + 3) * 4` da avval qo'shish, keyin ko'paytirish buyrug'i yoziladi.",
          "Teng kuchli operatorlar chapdan o'ngga ketma-ket buyruq bo'ladi. `20 / 4 / 2` ikki bo'linish, ikkinchisi birinchisining natijasini oladi. Vaqtinchalik 5 registrda turadi, keyin 2 ga bo'linadi.",
          "`&&` va `||` daraxti short-circuit sakrashini ham qo'yadi. Ustuvorlik qaysi tomon chap ekanini tanlaydi. `a || b && c` da `b && c` bitta o'ng bo'lak. `a` rost bo'lsa, butun o'ng bo'lak sakrab o'tiladi.",
        ],
        diagram: `2 + 3 * 4
      +
     / \\
    2   *
       / \\
      3   4
avval * , keyin +

(2 + 3) * 4
      *
     / \\
    +   4
   / \\
  2   3
avval + , keyin *`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Ustuvorlik xatosi yig'iladi va «deyarli to'g'ri» son chiqaradi. 14 o'rniga 20 kutish shundan.",
        ],
        items: [
          {
            title: "Chapdan o'qib * ni kechiktirish",
            why: [
              "`2 + 3 * 4` 14. O'rtacha va formula yozganda qavs qo'ying, o'zingiz ham keyin o'qisangiz.",
            ],
            wrong: `int natija = 2 + 3 * 4;`,
            right: `int natija = 2 + (3 * 4);`,
          },
          {
            title: "|| ni && dan mustahkam deb o'ylash",
            why: [
              "`&&` yuqoriroq. Qavssiz `a || b && c` siz xohlagan `(a || b) && c` bo'lmasligi mumkin.",
            ],
            wrong: `if (a || b && c)`,
            right: `if ((a || b) && c)`,
          },
          {
            title: "Bo'linishni o'ngdan o'qish",
            why: [
              "`20 / 4 / 2` 2, 10 emas. Teng kuchlilar chapdan.",
            ],
            wrong: `int x = 20 / 4 / 2;`,
            right: `int x = 20 / (4 / 2);`,
          },
        ],
      },
      quiz: [
        {
          id: "4.6-q1",
          question: "`2 + 3 * 4` nima?",
          options: ["20", "14", "24", "9"],
          answer: 1,
          explanation:
            "Ko'paytirish oldin: 3 * 4 = 12, keyin 2 + 12 = 14. 20 chiqishi uchun (2 + 3) * 4 kerak.",
        },
        {
          id: "4.6-q2",
          question: "`true || false && false` nima?",
          options: [
            "Yolg'on, chapdan o'ngga",
            "Rost, chunki && avval, true || false rost",
            "Yig'ilmaydi",
            "0, chunki false ko'p",
          ],
          answer: 1,
          explanation:
            "&& yuqoriroq: false && false yolg'on. Keyin true || false rost. (true || false) && false esa yolg'on bo'lardi.",
        },
        {
          id: "4.6-q3",
          question: "`20 / 4 / 2` butun sonlarda nima?",
          options: ["10", "2", "2.5", "5"],
          answer: 1,
          explanation:
            "Bir xil kuch chapdan o'ngga. 20 / 4 = 5, 5 / 2 = 2. O'ngdan o'qilsa 10 bo'lardi.",
        },
      ],
    },
    {
      id: "4.7",
      navTitle: "Bitwise operatorlar",
      title: "Bitwise operatorlar va ikkilik sanoq",
      goal: [
        "Bu darsdan keyin siz `&`, `|`, `^`, `~`, `<<`, `>>` ni sonning bitlarida ishlaydigan operator deb tushuntirasiz. `cout` dagi `<<` bilan bit siljishini ajratasiz. 5 va 3 ustida natijani qo'lda tekshira olasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Sakkizta chiroq qatorini ko'ring. Har biri yoqilgan yoki o'chirilgan. Son shu chiroqlarning rasmi. 5 bu `0101`: o'rtadagi ikki chiroq o'chiq, qolgan ikkisi yoqilgan, to'rtta o'ringa sig'dirsak.",
          "`&` ikkala qatorda ham yoqilgan chiroqni yoqib qo'yadi. Bittasi o'chiq bo'lsa, natija o'chiq. `|` bittasi yoqilgan bo'lsa, natijani yoqadi. `^` faqat bittasi yoqilgan bo'lsa yoqadi, ikkalasi bir xil bo'lsa o'chiradi. `~` har birini ag'daradi.",
          "`<<` butun qatorni chapga suradi, o'ngdan o'chirilgan chiroq kiradi. `>>` o'ngga suradi. `cout <<` boshqa asbob: u chiroqni surmaydi, matnni ekranga qo'yadi. Chapda `cout` turganida ekran, chapda son turganida siljish. Qavs ularni aralashtirmaydi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Bit operatori qiymatning har bir bitiga alohida qaraydi. Yaxshi ko'rinish uchun `unsigned` ishlating. Signed manfiy sonda ishora biti bor, siljish va `~` kutilmagan son chiqaradi.",
        ],
        items: [
          {
            title: "To'rtta bit amali",
            paragraphs: [
              "5 ni to'rt bitda `0101`, 3 ni `0011` deb yozing. Natija ham shu ustunlar bo'yicha.",
              "`&` AND. Ikkalasi 1 bo'lsagina 1. `0101 & 0011 = 0001`, ya'ni 1.",
              "`|` OR. Bittasi 1 bo'lsa 1. `0101 | 0011 = 0111`, ya'ni 7.",
              "`^` XOR. Turlicha bo'lsa 1. `0101 ^ 0011 = 0110`, ya'ni 6. Bir xil bitlar 0.",
              "`~` NOT. Har bir bitni ag'daradi. `unsigned` 32 bit bo'lsa, `~5u` yuqori bitlarni ham yoqadi. Natija 4294967290. «5 ning teskarisi −5» emas.",
            ],
            table: {
              caption: "To'rt bit yetadi, qolgan yuqori bitlar 0.",
              headers: ["Amal", "5 = 0101", "3 = 0011", "Natija", "Son"],
              rows: [
                ["&", "0101", "0011", "0001", "1"],
                ["|", "0101", "0011", "0111", "7"],
                ["^", "0101", "0011", "0110", "6"],
              ],
            },
          },
          {
            title: "Siljish",
            paragraphs: [
              "`a << n` bitlarni chapga n qadam suradi. O'ngdan 0 kiradi. `unsigned` da bu 2 ga ko'paytirish, toki bit sig'ib ketmasa. `5u << 1` bu `1010`, ya'ni 10.",
              "`a >> n` o'ngga. `unsigned` da chapdan 0 kiradi. `20u >> 2` bu 5. Signed manfiy sonda chapdan nima kirishi amalga bog'liq bo'lishi mumkin. Siljishni `unsigned` da o'rganing.",
              "Qadam manfiy bo'lsa yoki tur kengligidan katta yoki teng bo'lsa, noma'lum xatti-harakat. `1u << 32` ni 32 bitli `unsigned` da yozmang. `int` 32 bit bo'lsa, qadam 0 dan 31 gacha.",
              "`+` siljishdan oldin. `1u << 2 + 3` bu `1u << 5` = 32. Qavsni 4.6-darsdagi misoldan eslang.",
            ],
            code: `5u << 1     // 10
20u >> 2    // 5
1u << 2 + 3 // 32`,
            codeLabel: "siljish",
          },
          {
            title: "cout dagi << boshqa operator",
            paragraphs: [
              "Belgilar bir xil, ma'no chapdagi turga qarab. `std::cout << 5` ekranga yozadi. `5 << 1` sonni siljitadi.",
              "`std::cout << 5 << 1` ikki marta ekran: `51`. Siljish emas. `std::cout << (5 << 1)` avval `5 << 1` = 10, keyin ekranga `10`.",
              "Qavsni tashlasangiz, `<<` larning hammasi `cout` zanjiriga yopishishi mumkin. Bit natijasini `cout` ga bersangiz, qavs qo'ying.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "5 va 3 ustida &, |, ^",
          intro: [
            "Natijani jadval bilan solishtiring. Dastur o'nlik chiqaradi, siz to'rt bitni qo'lda ko'rasiz.",
          ],
          codeLabel: "bit.cpp",
          code: `#include <iostream>

int main() {
    unsigned int a = 5;
    unsigned int b = 3;
    std::cout << (a & b) << "{{n}}";
    std::cout << (a | b) << "{{n}}";
    std::cout << (a ^ b) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
7
6`,
          analysis: [
            {
              lines: "4-5",
              text: "`a` 5, bitlari `...0101`. `b` 3, `...0011`. Yuqori bitlar 0. `unsigned` ishora bitini aralashtirmaydi.",
            },
            {
              lines: "6",
              text: "`&` faqat ikkalasi 1 bo'lgan eng kichik bitni qoldiradi. `0001` = 1. Qavs `cout` zanjirini bit amalidan ajratadi.",
            },
            {
              lines: "7",
              text: "`|` uchta bitni yoqadi: `0111` = 7.",
            },
            {
              lines: "8",
              text: "`^` o'rta ikki bit turlicha, ular 1. Chetlar bir xil, 0. `0110` = 6.",
            },
          ],
        },
        {
          title: "~ barcha bitni ag'daradi, siljish 2 ga ko'paytiradi",
          intro: [
            "`~` ni to'rt bitda `1010` deb o'ylash yetarli emas. `unsigned int` 32 bit. Yuqori bitlar ham ag'dariladi.",
          ],
          codeLabel: "silji.cpp",
          code: `#include <iostream>

int main() {
    unsigned int a = 5;
    std::cout << (~a) << "{{n}}";
    std::cout << (a << 1) << "{{n}}";
    std::cout << (20u >> 2) << "{{n}}";
    std::cout << (1u << 2 + 3) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol (32 bitli unsigned)",
          console: `4294967290
10
5
32`,
          analysis: [
            {
              lines: "5",
              text: "`~5u` har bir bitni ag'daradi. 32 bitda 5 bu oxiri `0101`, qolgani 0. Ag'darilsa oxiri `1010`, qolgani 1. Bu 4294967295 − 5 = 4294967290. «Minus 5» emas.",
            },
            {
              lines: "6",
              text: "`a << 1` bitlarni bir qadam chapga. `0101` dan `1010`, ya'ni 10. O'ngdan 0 kirgan. Sig'ib ketmagan, shuning uchun 5 * 2 ga teng.",
            },
            {
              lines: "7",
              text: "`20` bu `10100`. Ikki qadam o'ngga `101`, ya'ni 5. Chapdan 0 kirgan, chunki `unsigned`. 20 / 4 = 5.",
            },
            {
              lines: "8",
              text: "`2 + 3` avval. `1u << 5` = 32. Qavs bo'lmasa ham `+` oldin. `(1u << 2) + 3` bo'lsa 7 bo'lardi.",
            },
          ],
        },
        {
          title: "Ekran operatori va bit siljishi",
          intro: [
            "Bir xil `<<` belgisi. Qavs bo'lmasa, ikkalasi ham ekranga yozadi va sonlar yopishadi.",
          ],
          codeLabel: "chalkash.cpp",
          code: `#include <iostream>

int main() {
    std::cout << 5 << 1 << "{{n}}";
    std::cout << (5 << 1) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `51
10`,
          analysis: [
            {
              lines: "4",
              text: "Chapda `cout`. Birinchi `<<` ekran operatori, 5 ni yozadi. Ikkinchi `<<` ham ekran, 1 ni yozadi. Orada probel yo'q. `51`. Hech qanday bit surilmadi.",
            },
            {
              lines: "5",
              text: "Qavs ichida chapda 5, oqim emas. `5 << 1` siljish, natija 10. Tashqi `<<` shu 10 ni ekranga qo'yadi. Qator `10`.",
            },
            {
              lines: "",
              label: "qoida",
              text: "Bit natijasini chiqarayotganda amalni qavsga oling. Aks holda `<<` lar `cout` ga yopishadi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`unsigned int` 32 ta chiroq, 4 bayt. `&` protsessorda ikkita registrning mos bitlarini AND qiladi. Natija yangi registr. `a` va `b` manzillariga yozilmaydi, toki siz `&=` demaguningizcha.",
          "`~a` 32 ta bitning hammasini ag'daradi, faqat pastki to'rttasini emas. Shu uchun natija milliardlik son. To'rt bitlik niqob kerak bo'lsa, `& 0xFu` qo'yiladi. Hozir niqobsiz to'liq natijani ko'rdik.",
          "`<< 1` bitlarni bir o'rin siljitadi. Eng chapdagi bit sig'imdan chiqib ketishi mumkin. `unsigned` da u yo'qoladi, yangi o'ng bit 0 bo'ladi. Qadamingiz kenglikdan katta bo'lsa, bu yo'qotish emas, noma'lum buyruq.",
          "`cout << 5 << 1` da 5 va 1 son qutilari o'zgarmaydi. Belgilar `'5'` va `'1'` buferga yoziladi. `(5 << 1)` da avval 10 hisoblanadi, keyin belgilar `'1'` va `'0'` buferga tushadi. Birinchisida ikkita son yonma-yon, ikkinchisida bitta yangi son.",
        ],
        diagram: `5   ...00000101
3   ...00000011
&   ...00000001   = 1
|   ...00000111   = 7
^   ...00000110   = 6

5 << 1
...00001010       = 10

~5  32 bitning hammasi ag'dariladi
    111...11111010 = 4294967290`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Bit xatosi yig'iladi. `51` ni 10 deb o'qish, yoki `~5` ni −5 deb kutish shundan.",
        ],
        items: [
          {
            title: "Siljishni cout zanjiriga yutqazish",
            why: [
              "`cout << 5 << 1` bit amali emas. Natija `51`. Qavs ichida siljiting.",
            ],
            wrong: `std::cout << 5 << 1;`,
            right: `std::cout << (5 << 1);`,
          },
          {
            title: "~ ni minus deb o'ylash",
            why: [
              "`~5u` barcha bitlarni ag'daradi. 32 bitda bu 4294967290, −5 emas.",
            ],
            wrong: `unsigned int t = ~5u;`,
            right: `int t = -5;`,
          },
          {
            title: "Juda katta qadam bilan siljitish",
            why: [
              "`1u << 32` 32 bitli turda noma'lum. Qadam 0 dan kenglik-1 gacha bo'lsin. Manfiy qadam ham yozilmaydi.",
            ],
            wrong: `unsigned int x = 1u << 32;`,
            right: `unsigned int x = 1u << 31;`,
          },
        ],
      },
      quiz: [
        {
          id: "4.7-q1",
          question: "`5` bu `0101`, `3` bu `0011`. `5 & 3` nima?",
          options: ["7", "6", "1", "0"],
          answer: 2,
          explanation:
            "& faqat ikkala bit ham 1 bo'lgan joyni qoldiradi. Bu eng kichik bit: 0001 = 1. | bo'lsa 7, ^ bo'lsa 6.",
        },
        {
          id: "4.7-q2",
          question: "`unsigned` da `5 << 1` nima?",
          options: ["6", "4", "10", "51"],
          answer: 2,
          explanation:
            "Bitlar bir qadam chapga: 0101 dan 1010, ya'ni 10. 51 chiqishi cout << 5 << 1 yozilganda, siljish emas.",
        },
        {
          id: "4.7-q3",
          question: "`std::cout << (5 << 1)` ekranga nima yozadi?",
          options: ["51", "10", "6", "5 << 1 matni"],
          answer: 1,
          explanation:
            "Qavs ichidagi 5 << 1 bit siljishi, natija 10. Tashqi << shu 10 ni cout ga beradi. Qavssiz cout << 5 << 1 esa 51 yozadi.",
        },
      ],
    },
  ],
};

export const chapter4 = decode(rawChapter);
