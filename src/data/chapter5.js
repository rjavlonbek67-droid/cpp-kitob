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
  id: "5",
  number: 5,
  title: "Shart operatorlari",
  summary:
    "if, else, zanjir, ichma-ich shart, ternar tanlov va switch: dastur qachon qaysi yo'ldan yuradi.",
  lessons: [
    {
      id: "5.1",
      navTitle: "Oddiy if va blok",
      title: "Oddiy if operatori va {} bloklari",
      goal: [
        "Bu darsdan keyin siz `if` ni eshik deb o'qiysiz. Shart rost bo'lsa keyingi operator yoki `{}` bloki ishlaydi, yolg'on bo'lsa tashlab ketiladi. Bloksiz faqat bitta operator tegishli ekanini, nuqta-vergul if ni erta yopishini va blok ichidagi o'zgaruvchi eshikdan chiqib ketmasligini ayta olasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Darvoza oldidagi qo'riqchini ko'ring. U bitta savol beradi: harorat 30 dan yuqorimi? Ha desa, ichkaridagi bitta ishni qilasiz, masalan derazani ochasiz. Yo'q desa, o'sha ishni qilmaysiz va yo'lak bo'ylab ketaverasiz. `if` shu qo'riqchi. U ishni o'zi qilmaydi, faqat keyingi qadamga ruxsat beradi yoki bermaydi.",
          "Bitta topshiriq bo'lsa, qo'riqchi «shu gapni ayt» deydi. Ikki-uch ish bo'lsa, ularni xonaga yig'asiz. `{}` shu xona. Eshik ochilsa, xonadagi hammasi bo'ladi. Eshik yopiq bo'lsa, xonaga kirmaysiz.",
          "Xona ichida yozilgan qog'oz tashqarida ko'rinmaydi. Blokda e'lon qilingan o'zgaruvchi ham shunday: figurali qavs yopilishi bilan uning qutisi yo'qoladi. Tashqaridagi quti esa o'z joyida turadi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`if` bitta shart va bitta operator oladi. Operatorning o'zi yana blok bo'lishi mumkin. Shart qavs ichida yoziladi. Qavs shart. `if harorat > 30` yig'ilmaydi.",
        ],
        items: [
          {
            title: "Ikki yozuv",
            paragraphs: [
              "Shart rost bo'lsa, keyingi bitta operator ishlaydi. Yolg'on bo'lsa, o'sha operator tashlanadi va dastur undan keyingi qatordan davom etadi.",
              "Bir nechta ishni birga bog'lash uchun `{}` qo'yasiz. Blok ham bitta operator hisoblanadi. Ichidagi har bir qator shu shartga tegishli.",
              "Joy tashlash va chekinish faqat odam uchun. Kompilyator chekinishni o'qimaydi. Tegishlilikni qavs va blok belgilaydi.",
            ],
            code: `if (harorat > 30)
    std::cout << "issiq{{n}}";

if (harorat > 30) {
    std::cout << "issiq{{n}}";
    std::cout << "suv iching{{n}}";
}`,
            codeLabel: "bitta operator va blok",
          },
          {
            title: "Shart qanday rost bo'ladi",
            paragraphs: [
              "Shart `bool` ga aylantiriladi. `true` va noldan farqli butun son rost. `false` va `0` yolg'on. `if (qoldiq)` deganda `qoldiq != 0` deb o'qiladi. Manfiy son ham noldan farq qiladi, shuning uchun rost.",
              "`>` , `<` , `==` kabi taqqoslash 1 yoki 0 beradi. 4.4-darsdagi qoida shu yerda ishlaydi. `if (a = 5)` taqqoslash emas: avval 5 yoziladi, keyin shart sifatida 5, ya'ni rost, tekshiriladi.",
            ],
            table: {
              caption: "Butun son va bool shart sifatida.",
              headers: ["Shart", "Natija"],
              rows: [
                ["0", "yolg'on, blokga kirmaydi"],
                ["1, -3, 31", "rost, blokga kiradi"],
                ["false", "yolg'on"],
                ["true", "rost"],
                ["harorat > 30, harorat 31", "rost"],
              ],
            },
          },
          {
            title: "Nuqta-vergul if ni yopadi",
            paragraphs: [
              "`if (pul > 0);` dan keyingi nuqta-vergul bo'sh operator. Shart shu bo'sh joyni boshqaradi. Keyingi blok allaqachon if dan tashqarida, u har doim ishlaydi.",
              "Shartning o'zidan keyin nuqta-vergul qo'ymang. Nuqta-vergul blok ichidagi chaqiruvlarning oxirida turadi.",
            ],
            code: `if (pul > 0); {          // if shu yerda tugagan
    std::cout << "xarid{{n}}";  // bu if ga kirmaydi
}`,
            codeLabel: "erta yopilgan if",
          },
          {
            title: "Blokning o'z xotirasi",
            paragraphs: [
              "Blok ichida e'lon qilingan o'zgaruvchi shu blokning oxirigacha yashaydi. Yopilish qavsidan keyin uning nomi ko'rinmaydi. Kompilyator xato beradi.",
              "Shart yolg'on bo'lsa, blok ichiga kirmaydi, ichkaridagi e'lon ham bajarilmaydi. Tashqarida kerak bo'ladigan qiymatni if dan oldin e'lon qiling.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Shart rost, blok va undan keyingi qator",
          intro: [
            "Harorat 31. Eshik ochiladi, xona ichidagi yozuv chiqadi. Xonadan keyingi qator shartga qaramaydi.",
          ],
          codeLabel: "if_rost.cpp",
          code: `#include <iostream>

int main() {
    int harorat = 31;
    if (harorat > 30) {
        std::cout << "issiq{{n}}";
    }
    std::cout << "tekshiruv tugadi{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `issiq
tekshiruv tugadi`,
          analysis: [
            {
              lines: "4",
              text: "`harorat` qutisiga 31 yoziladi. Hali hech qanday shart yo'q.",
            },
            {
              lines: "5",
              text: "`31 > 30` taqqoslanadi. Natija rost. `if` keyingi operatorga, ya'ni 6–7-qatorlardagi blokka ruxsat beradi.",
            },
            {
              lines: "6",
              text: "Blok ichi ishlaydi. Ekranga `issiq` va qator tugashi yoziladi. `harorat` o'zgarmaydi.",
            },
            {
              lines: "8",
              text: "Bu qator if dan keyin turibdi. Shart yolg'on bo'lganida ham ishlagan bo'lardi. Shu sabab ikkinchi qator har doim chiqadi.",
            },
          ],
        },
        {
          title: "Qavssiz if faqat bitta qatorni ushlaydi",
          intro: [
            "Ball 40, o'tish 60. Chekinish ikkinchi `cout` ni if ga qo'shib qo'ygandek ko'rinadi. Kompilyator chekinishni sanamaydi.",
          ],
          codeLabel: "if_bitta.cpp",
          code: `#include <iostream>

int main() {
    int ball = 40;
    if (ball >= 60)
        std::cout << "o'tdi{{n}}";
    std::cout << "hisobot tayyor{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `hisobot tayyor`,
          analysis: [
            {
              lines: "4-5",
              text: "`ball` 40. `40 >= 60` yolg'on. `if` faqat o'zidan keyingi bitta operatorni tashlaydi.",
            },
            {
              lines: "6",
              text: "Shu qator if ning tanasi. Shart yolg'on, `o'tdi` yozilmaydi.",
            },
            {
              lines: "7",
              text: "Yangi operator. U if ga kirmaydi, chekinish bo'lsa ham. Har doim ishlaydi. Konsolda faqat `hisobot tayyor`.",
            },
            {
              lines: "natija",
              text: "Ikkinchi yozuvni ham shartga bog'lamoqchi bo'lsangiz, 6 va 7-qatorlarni bitta `{}` ichiga oling.",
            },
          ],
        },
        {
          title: "Nuqta-vergul bloki if dan uzib qo'yadi",
          intro: [
            "Pul 0. Ko'z `if` va figurali qavsni birga o'qiydi. Nuqta-vergul ularning orasini uzgan.",
          ],
          codeLabel: "if_nuqta.cpp",
          code: `#include <iostream>

int main() {
    int pul = 0;
    if (pul > 0); {
        std::cout << "xarid{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `xarid`,
          analysis: [
            {
              lines: "4",
              text: "`pul` 0. Xarid qilishga yetmaydi, deb kutamiz.",
            },
            {
              lines: "5",
              text: "`0 > 0` yolg'on. `if` ning tanasi nuqta-verguldagi bo'sh operator. U tashlanadi. Shu zahoti if tugaydi. O'sha qatordagi `{` yangi, mustaqil blok.",
            },
            {
              lines: "6",
              text: "Mustaqil blok shartsiz ishlaydi. `xarid` chiqadi. Pul 0 bo'lsa ham.",
            },
            {
              lines: "qoida",
              text: "Shartning yopilish qavsidan keyin darhol `{` yoki kerakli operator kelsin. O'sha joyga `;` qo'ymang.",
            },
          ],
        },
        {
          title: "Noldan farqli son rost, ichki quti tashqariga chiqmaydi",
          intro: [
            "`if (qoldiq)` taqqoslash yozilmagan. Butun sonning o'zi shart. Ichkarida tug'ilgan `xabar` eshik yopilishi bilan yo'qoladi.",
          ],
          codeLabel: "if_blok.cpp",
          code: `#include <iostream>

int main() {
    int qoldiq = 5;
    if (qoldiq) {
        int xabar = 1;
        std::cout << xabar << "{{n}}";
    }
    std::cout << qoldiq << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
5`,
          analysis: [
            {
              lines: "4-5",
              text: "`qoldiq` 5. `if (5)` bu `if (5 != 0)`. Rost. Blokka kiriladi. 0 bo'lsa, 6 va 7-qatorlar umuman bajarilmasdi.",
            },
            {
              lines: "6",
              text: "`xabar` shu blokning qutisi. Qiymati 1. U 8-qatordagi yopilish qavsidan tashqarida yo'q.",
            },
            {
              lines: "7",
              text: "Ekranga 1 yoziladi. Bu `xabar`, `qoldiq` emas.",
            },
            {
              lines: "9",
              text: "`qoldiq` if dan oldin ochilgan, shuning uchun hali tirik. 5 chiqadi. `xabar` ni shu qatorda yozsak, dastur yig'ilmaydi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Protsessor shartni hisoblaydi va natijani bitta belgi sifatida registrda ushlaydi: nol yoki nol emas. Keyin shartli sakrash keladi. Rost bo'lsa, keyingi buyruqlar qatori davom etadi. Yolg'on bo'lsa, ko'rsatkich blokdan keyingi buyruqqa sakraydi. Tashlangan qatorlar xotiraga yozilmaydi, ular bu safar bajarilmaydi.",
          "`harorat` o'z uyasida 31 bo'lib turadi. Taqqoslash undan nusxa o'qiydi. `if` ning o'zi qutini o'zgartirmaydi. `if (a = 5)` alohida: bu yerda avval yozish buyrug'i bor, 5 qutiga tushadi, keyin shu 5 shart bo'ladi.",
          "Blok ichidagi `int xabar` stekda joy oladi, lekin faqat blok bajarilayotganda. Yopilish qavsi shu joyni bo'shatadi. Tashqaridagi kod o'sha manzilni `xabar` nomi bilan ko'ra olmaydi. Kompilyator buni ishga tushishdan oldin rad etadi.",
          "Nuqta-vergul alohida bo'sh buyruq. U bir bayt ham yozmaydi. Shart yolg'on bo'lsa, protsessor o'sha bo'sh joyni tashlab, darhol keyingi blokning birinchi buyrug'iga keladi. Shu uchun `xarid` yoziladi.",
        ],
        diagram: `harorat [31]
shart: 31 > 30 -> rost
   blok: "issiq" buferga
   xabar tugaydi
keyingi buyruq har doim: "tekshiruv tugadi"

ball [40]
40 >= 60 -> yolg'on
   "o'tdi" tashlanadi
"hisobot tayyor" if dan tashqarida

pul [0]
if (pul > 0)  ;   <- if shu yerda tugaydi
{ "xarid" }       <- alohida blok, har doim`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "if ning xatosi ko'pincha yig'iladi. Dastur ishlaydi, lekin yozuv chiqmaydi yoki aksincha, shart yolg'on bo'lsa ham chiqadi.",
        ],
        items: [
          {
            title: "Ikkinchi qatorni chekinish bilan qo'shib qo'yish",
            why: [
              "Qavssiz `if` faqat keyingi bitta operatorni oladi. Pastki qator chekingan bo'lsa ham, ball 40 bo'lganda `tabrik` baribir chiqadi.",
            ],
            wrong: `if (ball >= 60)
    std::cout << "o'tdi{{n}}";
    std::cout << "tabrik{{n}}";`,
            right: `if (ball >= 60) {
    std::cout << "o'tdi{{n}}";
    std::cout << "tabrik{{n}}";
}`,
          },
          {
            title: "Shartdan keyin nuqta-vergul",
            why: [
              "`if (pul > 0);` bo'sh tanani boshqaradi. Keyingi blok har doim bajariladi. Pul 0 bo'lsa ham `xarid` chiqadi.",
            ],
            wrong: `if (pul > 0); {
    std::cout << "xarid{{n}}";
}`,
            right: `if (pul > 0) {
    std::cout << "xarid{{n}}";
}`,
          },
          {
            title: "Tenglashtirishni taqqoslash o'rniga yozish",
            why: [
              "`a = 5` qiymat yozadi va ifoda sifatida 5 qoldiradi. 5 rost. Eshik har doim ochiladi, `a` esa 5 bo'lib qoladi. Tenglik uchun `==`. Buni 4.4-darsda ko'rgan edik, if ichida eng qimmat turadi.",
            ],
            wrong: `if (a = 5) {
    std::cout << "kirdi{{n}}";
}`,
            right: `if (a == 5) {
    std::cout << "kirdi{{n}}";
}`,
          },
        ],
      },
      quiz: [
        {
          id: "5.1-q1",
          question:
            "`harorat` 20. `if (harorat > 30)` bloki `issiq` deb yozadi, undan keyin alohida qator `tugadi` deb yozadi. Konsolda nima chiqadi?",
          options: ["issiq", "tugadi", "issiq va tugadi", "hech narsa"],
          answer: 1,
          explanation:
            "20 > 30 yolg'on, blok tashlanadi. if dan keyingi qator shartga kirmaydi, u ishlaydi. Natija tugadi.",
        },
        {
          id: "5.1-q2",
          question:
            "`pul` 0. `if (pul > 0);` dan keyin blok ichida `xarid` yozilgan. Ekranda nima bo'ladi?",
          options: ["hech narsa", "xarid", "dastur yig'ilmaydi", "0"],
          answer: 1,
          explanation:
            "Nuqta-vergul if ning bo'sh tanasi. Figurali qavs yangi blok va u shartsiz ishlaydi. xarid chiqadi.",
        },
        {
          id: "5.1-q3",
          question: "Blok ichida e'lon qilingan `xabar` ni blok yopilgandan keyin ishlata olasizmi?",
          options: [
            "Ha, u nol bo'lib saqlanadi",
            "Yo'q, qavs yopilishi bilan nom ko'rinmaydi",
            "Ha, u global bo'lib qoladi",
            "Faqat shart yolg'on bo'lsa ko'rinadi",
          ],
          answer: 1,
          explanation:
            "Blok o'z qutisini ochadi va yopilishda bo'shatadi. Keyingi qator xabar ni ko'rmaydi, dastur yig'ilmaydi. Tashqarida kerak bo'lsa, o'zgaruvchini if dan oldin e'lon qiling.",
        },
      ],
    },
    {
      id: "5.2",
      navTitle: "if va else",
      title: "if - else konstruksiyasi",
      goal: [
        "Bu darsdan keyin siz `if - else` ni ikkita eshik deb ko'rasiz. Shart rost bo'lsa faqat birinchi tarmoq, yolg'on bo'lsa faqat ikkinchisi ishlaydi. Ikkalasi birga yurmaydi. `else` shartsiz yozilishini, u eng yaqin bo'sh `if` ga yopishishini va tarmoqdan keyin kerak bo'ladigan o'zgaruvchini oldindan ochish kerakligini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Yo'l ayrisida bitta belgi bor: juft tomonga yoki toq tomonga. Haydovchi ikkala ko'chaga bir vaqtda kirolmaydi. `if` birinchi ko'cha, `else` qolgan hammasi. Belgini o'qidingiz, bittasini tanladingiz, ikkinchisiga oyoq bosmadingiz.",
          "`else` ning o'z savoli yo'q. U «birinchi eshik yopiq bo'lsa, men» deydi. Yosh 18 dan kichikmi, deb qayta so'ramaydi. Birinchi shart yolg'on bo'lishining o'zi unga ruxsat.",
          "Ayrishdan keyin yo'llar yana qo'shiladi. `if` va `else` tugagach yozilgan qator ikkala holatda ham ishlaydi. U tanlovning ichida emas, undan keyin.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`else` faqat `if` ning jufti. Yolg'iz `else` yig'ilmaydi. `else` dan keyin yana shart qavsi qo'yilmaydi. Yangi shart kerak bo'lsa, bu allaqachon `else if`, u keyingi dars.",
        ],
        items: [
          {
            title: "Aynan bitta tarmoq",
            paragraphs: [
              "Shart hisoblanadi. Rost bo'lsa, `if` tanasi ishlaydi va `else` butunlay tashlanadi. Yolg'on bo'lsa, `if` tanasi tashlanadi va `else` tanasi ishlaydi.",
              "Tanalar bitta operator yoki `{}` blok. Ikki qatorli tarmoqda qavsni qo'ying. 5.1-darsdagi chekinish tuzog'i bu yerda ham bor.",
            ],
            code: `if (n % 2 == 0) {
    std::cout << "juft{{n}}";
} else {
    std::cout << "toq{{n}}";
}`,
            codeLabel: "ikkita tarmoq",
          },
          {
            title: "else eng yaqin if ga yopishadi",
            paragraphs: [
              "Ichma-ich `if` yozib, qavs qo'ymasa, `else` o'zidan oldingi eng yaqin, hali juftsiz `if` ga tegishli bo'ladi. Tashqi `if` ga emas.",
              "Chekinish buni o'zgartirmaydi. Qaysi `else` qaysi `if` ga tegishli ekanini `{}` bilan yozing. Aks holda tashqi shart yolg'on bo'lganda ichki `else` ham tashlanadi. Odam esa tashqi rad etish deb o'qiydi.",
            ],
            code: `if (a > 0)
    if (b > 0)
        std::cout << "ikkala{{n}}";
    else
        std::cout << "ichki else{{n}}";`,
            codeLabel: "else ichki if ga tegishli",
          },
          {
            title: "Kerakli qutini oldindan oching",
            paragraphs: [
              "Tarmoq ichida e'lon qilingan o'zgaruvchi ikkinchi tarmoqda va if dan keyin ko'rinmaydi. Natijani keyin ishlatsangiz, uni `if` dan oldin e'lon qiling va ikkala tarmoqda ham qiymat bering.",
              "Faqat bitta tarmoq qiymat bersa, ikkinchi holatda quti bo'sh qoladi. Bo'sh `int` ni o'qish noma'lum xatti-harakat. Boshlang'ich qiymat qo'ying yoki `else` da ham yozing.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Juft va toq, faqat bitta so'z",
          intro: [
            "`n` 7. Qoldiq 1, juftlik sharti yolg'on. Ikkinchi eshik ochiladi, birinchisi jim.",
          ],
          codeLabel: "if_else.cpp",
          code: `#include <iostream>

int main() {
    int n = 7;
    if (n % 2 == 0) {
        std::cout << "juft{{n}}";
    } else {
        std::cout << "toq{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `toq`,
          analysis: [
            {
              lines: "4",
              text: "`n` qutisida 7. Shart hali tegmagan.",
            },
            {
              lines: "5",
              text: "`7 % 2` bu 1, butun qoldiq. `1 == 0` yolg'on. 6-qator tashlanadi.",
            },
            {
              lines: "7-8",
              text: "`else` shu yolg'onlik uchun turibdi. `toq` yoziladi. `juft` yozilmaydi. Ikkalasi birga chiqishi mumkin emas.",
            },
            {
              lines: "10",
              text: "Tanlov tugagan. `n` hali 7. Hech bir tarmoq uni o'zgartirmadi.",
            },
          ],
        },
        {
          title: "Ayrishdan keyin umumiy qator",
          intro: [
            "Yosh 17. Bolalar tarmog'i ishlaydi. Undan keyingi hisobot ikkala yosh uchun ham yoziladi, chunki u juftlikdan tashqarida.",
          ],
          codeLabel: "if_else_keyin.cpp",
          code: `#include <iostream>

int main() {
    int yosh = 17;
    if (yosh >= 18) {
        std::cout << "kattalar{{n}}";
    } else {
        std::cout << "bolalar{{n}}";
    }
    std::cout << "yosh " << yosh << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `bolalar
yosh 17`,
          analysis: [
            {
              lines: "4-5",
              text: "`yosh` 17. `17 >= 18` yolg'on. Kattalar bloki ochilmaydi.",
            },
            {
              lines: "7-8",
              text: "`else` ishlaydi. Ekranga `bolalar` yoziladi.",
            },
            {
              lines: "10",
              text: "Bu qator if-else dan keyin. Yosh 17 bo'lsa ham, 18 bo'lsa ham shu yerga kelinadi. `yosh` qutisi tarmoqlardan tashqarida ochilgan, ikkalasi ham uni ko'ra olardi, bu qator ham ko'radi.",
            },
            {
              lines: "farq",
              text: "`bolalar` yozuvini 10-qatorga chiqarib qo'ysangiz, u tanlov bo'lib qolmaydi. Umumiy ishni juftlikdan keyin, maxsus ishni tarmoq ichida qoldiring.",
            },
          ],
        },
        {
          title: "Qavssiz else ichki if ga yopishadi",
          intro: [
            "`a` musbat, `b` nol. Chekinish `else` ni tashqi shartga qo'ygandek ko'rsatadi. Til uni ichki `if` ga beradi.",
          ],
          codeLabel: "else_yaqin.cpp",
          code: `#include <iostream>

int main() {
    int a = 5;
    int b = 0;
    if (a > 0)
        if (b > 0)
            std::cout << "ikkala{{n}}";
        else
            std::cout << "ichki else{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `ichki else`,
          analysis: [
            {
              lines: "4-5",
              text: "`a` 5, `b` 0. Ikki alohida quti.",
            },
            {
              lines: "6-7",
              text: "Tashqi shart `5 > 0` rost. Uning tanasi butun ichki `if`. Ichki shart `0 > 0` yolg'on, shuning uchun `ikkala` yozilmaydi.",
            },
            {
              lines: "9-10",
              text: "`else` eng yaqin juftsiz `if` ga, ya'ni `b > 0` ga tegishli. Ichki shart yolg'on, `ichki else` chiqadi. Bu «a musbat emas» degani emas.",
            },
            {
              lines: "a yolg'on bo'lsa",
              text: "`a` 0 yoki manfiy bo'lsa, tashqi `if` ichki juftlikni butunlay tashlaydi. `else` ham chiqmaydi. Konsol bo'sh qoladi. Tashqi rad etishni alohida ko'rmoqchi bo'lsangiz, tashqi tanani `{}` qiling va `else` ni shu qavsdan keyin yozing.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Shart registrda nol yoki nol-emas bo'ladi. Rost bo'lsa, protsessor `if` tanasining buyruqlarini bajarib, `else` tanasining oxiriga sakraydi. Yolg'on bo'lsa, darhol `else` boshiga sakraydi va `if` tanasini ochmaydi. Ikki tana ketma-ket xotirada yotadi, lekin bir o'tishda faqat bittasining buyruqlari ishlaydi.",
          "`n` 7 bo'lib turadi. `7 % 2` vaqtinchalik 1. Uni `0` bilan solishtirish yana vaqtinchalik yolg'on belgi beradi. Shu belgi sakrashni tanlaydi. `juft` satri buferga tushmaydi.",
          "Qavssiz juftlikda kompilyator `else` ni ichki `if` ga ulaydi. Bu ishga tushishdagi tasodif emas, yig'ish paytidagi daraxt. `a` manfiy bo'lsa, ichki solishtirishning o'zi bajarilmaydi: tashqi sakrash ikkala ichki tanani ham o'tkazib yuboradi.",
          "Tarmoq ichida ochilgan quti stekda shu tana tugaguncha turadi. Ikkinchi tana va undan keyingi kod boshqa joy. Ular o'sha nomni ko'rmaydi. if dan oldin ochilgan `yosh` esa ikkala tana va keyingi `cout` uchun bitta uyada turadi.",
        ],
        diagram: `n [7]
7 % 2 == 0 -> yolg'on
   "juft"  tashlanadi
   "toq"   buferga
bitta o'tish, bitta tarmoq

a [5] rost -> ichki if ga kiradi
b [0] yolg'on -> else ichki if niki
"ichki else"

a manfiy bo'lsa:
tashqi sakrash
ichki shart hisoblanmaydi
else ham yozilmaydi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "else xatosi noto'g'ri tarmoqni ochadi. Dastur yiqilmasligi mumkin, yozuv esa boshqa holatga tegishli bo'lib chiqadi.",
        ],
        items: [
          {
            title: "else ni tashqi if ga deb o'qish",
            why: [
              "Qavssiz yozuvda `else` ichki `if` ga yopishadi. `a` manfiy, `b` musbat bo'lsa ham `else` ishlamaydi. Tashqi rad etish uchun tashqi blokni yoping.",
            ],
            wrong: `if (a > 0)
    if (b > 0)
        std::cout << "ikkala{{n}}";
    else
        std::cout << "a musbat emas{{n}}";`,
            right: `if (a > 0) {
    if (b > 0) {
        std::cout << "ikkala{{n}}";
    }
} else {
    std::cout << "a musbat emas{{n}}";
}`,
          },
          {
            title: "Faqat bir tarmoqda qiymat berib, keyin o'qish",
            why: [
              "`javob` e'lon qilingan, lekin shart yolg'on bo'lsa unga hech narsa yozilmaydi. Keyin o'qish noma'lum. Ikkalasida yozing yoki oldindan qiymat qo'ying.",
            ],
            wrong: `int javob;
if (n > 0) {
    javob = 1;
}
std::cout << javob << "{{n}}";`,
            right: `int javob = 0;
if (n > 0) {
    javob = 1;
} else {
    javob = -1;
}
std::cout << javob << "{{n}}";`,
          },
          {
            title: "else ga shart yopishtirish",
            why: [
              "`else (n < 0)` yig'ilmaydi. `else` shartsiz. Yangi shart kerak bo'lsa, `else if (n < 0)` yozing. Bu keyingi darsdagi zanjir.",
            ],
            wrong: `if (n > 0) {
    std::cout << "musbat{{n}}";
} else (n < 0) {
    std::cout << "manfiy{{n}}";
}`,
            right: `if (n > 0) {
    std::cout << "musbat{{n}}";
} else if (n < 0) {
    std::cout << "manfiy{{n}}";
}`,
          },
        ],
      },
      quiz: [
        {
          id: "5.2-q1",
          question: "`n` 8. `if (n % 2 == 0)` tarmog'i `juft`, `else` tarmog'i `toq` deb yozadi. Konsol?",
          options: ["toq", "juft", "juft va toq", "hech narsa"],
          answer: 1,
          explanation:
            "8 % 2 bu 0, shart rost. faqat if tanasi ishlaydi. else tashlanadi. Natija juft.",
        },
        {
          id: "5.2-q2",
          question:
            "`a` −1, `b` 9. Qavssiz `if (a > 0)` ichida `if (b > 0)`, uning `else` si `else` deb yozadi. Nima chiqadi?",
          options: ["ikkala", "else", "hech narsa", "ikkala va else"],
          answer: 2,
          explanation:
            "else ichki if ga tegishli, lekin tashqi shart −1 > 0 yolg'on. Ichki juftlik butunlay tashlanadi. Hech narsa yozilmaydi.",
        },
        {
          id: "5.2-q3",
          question: "Shart rost bo'lsa, if - else ning qaysi tanasi ishlaydi?",
          options: [
            "faqat if tanasi",
            "faqat else tanasi",
            "avval if, keyin else",
            "ikkala tana, tartibsiz",
          ],
          answer: 0,
          explanation:
            "Rost shart if tanasini bajaradi va else ni sakrab o'tadi. Bir o'tishda ikkala tana ham ishlamaydi.",
        },
      ],
    },
    {
      id: "5.3",
      navTitle: "else if zanjiri",
      title: "if - else if - else zanjiri",
      goal: [
        "Bu darsdan keyin siz zanjirni yuqoridan pastga o'qiysiz. Birinchi rost shart g'olib, uning tanasi ishlaydi, qolgan shartlar tekshirilmaydi. Tartib nima uchun bahoni o'ldirishini, oxirgi `else` nima qolganini yig'ishini va alohida `if` lar nima uchun bir nechta tarmoqni birga ochishini ajratasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Nazorat varaqasi tekshiruvchisi qoidalarni yuqoridan o'qiydi. 90 va undan yuqorimi? Ha bo'lsa, A qo'yadi va qolgan qog'ozga qaramaydi. Yo'q bo'lsa, keyingi qatorga tushadi: 80 va undan yuqorimi? Birinchi ha degan joyda qalam to'xtaydi.",
          "Agar tekshiruvchi avval «60 dan oshsa, oddiy» deb yozsa, 95 ball ham shu qatorda to'xtaydi. Pastki qatordagi «90 dan oshsa, a'lo» hech qachon navbat olmadi. Qoida noto'g'ri emas, tartib noto'g'ri.",
          "Alohida ikkita varaqa boshqa ish. Bittasi «o'tdimi», ikkinchisi «a'lomi» deb so'rasa, 95 ikkalasiga ham ha deydi. Zanjir bitta daraja tanlaydi. Alohida `if` lar esa har bir savolni qaytadan beradi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`else if` alohida kalit so'z emas. Bu `else`, uning tanasi esa yangi `if`. Yozuv tekis ko'rinadi, daraxt esa ichma-ich. Shu tufayli birinchi rost tarmoqdan keyin qolganlari `else` ichida qolib, tashlanadi.",
        ],
        items: [
          {
            title: "Birinchi rost yutadi",
            paragraphs: [
              "Shartlar tepadan pastga tekshiriladi. Birinchisi rost bo'lsa, tanasi ishlaydi va zanjirning qolgani sakrab o'tiladi. Yolg'on bo'lsa, keyingi `else if` ga o'tiladi.",
              "Oxirgi `else` shartsiz. Unga yetib kelish uchun yuqoridagi hammasi yolg'on bo'lishi kerak. Uni qo'ymasangiz va hech bir shart to'g'ri kelmasa, zanjir hech narsa qilmaydi.",
              "Qat'iyroq oraliqni yumshoqrog'idan oldin yozing. `>= 90` dan keyin `>= 60`. Aksincha qo'ysangiz, 95 ham birinchi eshikda qoladi.",
            ],
            code: `if (ball >= 90) {
    std::cout << "A{{n}}";
} else if (ball >= 80) {
    std::cout << "B{{n}}";
} else if (ball >= 60) {
    std::cout << "C{{n}}";
} else {
    std::cout << "qayta{{n}}";
}`,
            codeLabel: "qat'iy shart tepada",
            table: {
              caption: "Tartib to'g'ri bo'lsa, ball qaysi eshikda to'xtaydi.",
              headers: ["ball", "Birinchi rost shart", "Yozuv"],
              rows: [
                ["95", ">= 90", "A"],
                ["85", ">= 80", "B"],
                ["70", ">= 60", "C"],
                ["50", "hech biri", "qayta"],
              ],
            },
          },
          {
            title: "Alohida if boshqa savol",
            paragraphs: [
              "Ikki mustaqil `if` bir-birining `else` i emas. Birinchisi rost bo'lsa ham ikkinchisi tekshiriladi. 95 ball `>= 60` va `>= 90` ning ikkalasiga ham tegadi. Ikki qator chiqadi.",
              "Bitta daraja kerak bo'lsa, zanjir yozing. Bir nechta belgi birga qo'yilishi mumkin bo'lsa, alohida `if` yozing. Ularni aralashtirmang.",
            ],
            code: `if (ball >= 60) {
    std::cout << "o'tdi{{n}}";
}
if (ball >= 90) {
    std::cout << "a'lo{{n}}";
}`,
            codeLabel: "ikkala shart ham ko'riladi",
          },
          {
            title: "Oraliqlar ustma-ust tushmasin",
            paragraphs: [
              "Zanjir birinchi rostni oladi, shuning uchun ustma-ust shartning pastkisi o'lik kod bo'lishi mumkin. `ball >= 60` dan keyingi `else if (ball >= 90)` hech qachon 90 dan katta ballni ko'rmaydi. Kompilyator buni majburan xato demaydi.",
              "Teng chegara bitta eshikka tegishli bo'lsin. `>= 90` va keyin `>= 80` da 90 birinchi eshikda. Ikkinchi eshik 80 dan 89 gacha, deb o'qing.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "95 ball birinchi eshikda to'xtaydi",
          intro: [
            "Tartib qat'iydan yumshoqqa. 95 uchun pastki shartlar hisoblanmaydi.",
          ],
          codeLabel: "zanjir_a.cpp",
          code: `#include <iostream>

int main() {
    int ball = 95;
    if (ball >= 90) {
        std::cout << "A{{n}}";
    } else if (ball >= 80) {
        std::cout << "B{{n}}";
    } else if (ball >= 60) {
        std::cout << "C{{n}}";
    } else {
        std::cout << "qayta{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `A`,
          analysis: [
            {
              lines: "4-5",
              text: "`ball` 95. `95 >= 90` rost. 6-qator ishlaydi.",
            },
            {
              lines: "6",
              text: "`A` yoziladi. Shu tarmoq zanjirning g'olibi.",
            },
            {
              lines: "7-13",
              text: "Bular birinchi `if` ning `else` tomoni. Birinchi shart rost bo'lgani uchun bu butun tomon sakrab o'tiladi. `>= 80` va `>= 60` solishtirilmaydi. `ball` 95 bo'lib qoladi.",
            },
          ],
        },
        {
          title: "85 ikkinchi eshikkacha tushadi",
          intro: [
            "Birinchi shart yolg'on, ikkinchisi rost. Undan pastini dastur ko'rmaydi.",
          ],
          codeLabel: "zanjir_b.cpp",
          code: `#include <iostream>

int main() {
    int ball = 85;
    if (ball >= 90) {
        std::cout << "A{{n}}";
    } else if (ball >= 80) {
        std::cout << "B{{n}}";
    } else if (ball >= 60) {
        std::cout << "C{{n}}";
    } else {
        std::cout << "qayta{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `B`,
          analysis: [
            {
              lines: "5",
              text: "`85 >= 90` yolg'on. A tarmog'i ochilmaydi.",
            },
            {
              lines: "7-8",
              text: "Navbat `else if` ga keladi. `85 >= 80` rost. `B` yoziladi.",
            },
            {
              lines: "9-13",
              text: "`C` va `qayta` shu ikkinchi if ning else tomoni. Ikkinchi shart rost, ular tashlanadi. 85 `>= 60` ekanini dastur bu safar so'ramaydi.",
            },
          ],
        },
        {
          title: "Yumshoq shart tepada bo'lsa, a'lo o'lik",
          intro: [
            "95 ball. Birinchi eshik `>= 60`. U ochiladi va `>= 90` ga umr bermaydi.",
          ],
          codeLabel: "zanjir_tartib.cpp",
          code: `#include <iostream>

int main() {
    int ball = 95;
    if (ball >= 60) {
        std::cout << "oddiy{{n}}";
    } else if (ball >= 90) {
        std::cout << "a'lo{{n}}";
    } else {
        std::cout << "qayta{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `oddiy`,
          analysis: [
            {
              lines: "4-5",
              text: "`95 >= 60` rost. Zanjir shu yerda g'olib topadi.",
            },
            {
              lines: "6",
              text: "`oddiy` yoziladi. 95 a'lo ball bo'lsa ham, yozuv pastki nom.",
            },
            {
              lines: "7-8",
              text: "`else if (ball >= 90)` birinchi shartning else ichida. Birinchi shart rost bo'lgani uchun bu solishtirish bajarilmaydi. 90 dan katta har qanday ball ham shu dasturda `oddiy` deb chiqadi.",
            },
            {
              lines: "tuzatish",
              text: "`>= 90` ni birinchi qatorga qo'ying. 60 dan kichiklar oxirgi `else` da qoladi.",
            },
          ],
        },
        {
          title: "Ikki alohida if ikkala yozuvni ham chiqaradi",
          intro: [
            "Bu zanjir emas. 95 ikkala savolga ham ha. Ikki belgi birga kerak bo'lsa, shu yozuv to'g'ri. Bitta baho kerak bo'lsa, emas.",
          ],
          codeLabel: "ikki_if.cpp",
          code: `#include <iostream>

int main() {
    int ball = 95;
    if (ball >= 60) {
        std::cout << "o'tdi{{n}}";
    }
    if (ball >= 90) {
        std::cout << "a'lo{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `o'tdi
a'lo`,
          analysis: [
            {
              lines: "5-6",
              text: "`95 >= 60` rost. `o'tdi` yoziladi. Bu if shu yerda tugaydi. `else` yo'q.",
            },
            {
              lines: "8-9",
              text: "Ikkinchi `if` birinchisidan mustaqil. `95 >= 90` yana rost. `a'lo` ham yoziladi.",
            },
            {
              lines: "farq",
              text: "Zanjirda ikkinchi shart faqat birinchisi yolg'on bo'lsa navbat olardi. Bu yerda birinchisi rost bo'lsa ham ikkinchisi so'raladi. 50 ballda ikkalasi ham jim, chunki 50 ikkala chegaradan ham pastda.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Zanjir xotirada ichma-ich sakrash. Birinchi shart rost bo'lsa, protsessor uning tanasini bajarib, butun qolgan daraxtning oxiriga sakraydi. Keyingi solishtirish buyrug'i bu o'tishda ishlamaydi. `ball` qutisi o'qiladi, lekin pastki shartlar uni ikkinchi marta so'ramaydi.",
          "85 da birinchi solishtirish yolg'on belgi beradi. Sakkash ikkinchi shartga boradi. `85 >= 80` rost. `B` buferga tushadi va qolgan tanalar o'tkaziladi. `>= 60` ning buyrug'i faylda bor, bu safar registrga chiqmaydi.",
          "Noto'g'ri tartibda birinchi solishtirish `95 >= 60` ni rost deb belgilaydi. `>= 90` solishtiruvi shu `else` ning ichida qolgani uchun unga yo'l yo'q. Bu o'lik tarmoq. Xotira buzilmaydi, mantiq buziladi.",
          "Ikki alohida `if` ikkita mustaqil sakrash. Birinchisi rost bo'lib tanasini bajargach, boshqaruv ikkinchi shartning boshiga keladi. Ikkinchi solishtirish yana `ball` ni o'qiydi. Ikkalasi rost bo'lsa, ikkita yozuv buferga ketma-ket tushadi.",
        ],
        diagram: `ball [95], tartib to'g'ri
>= 90 rost -> "A"
qolgan solishtirishlar sakrab o'tiladi

ball [85]
>= 90 yolg'on
>= 80 rost -> "B"
>= 60 hisoblanmaydi

ball [95], yumshoq shart tepada
>= 60 rost -> "oddiy"
>= 90 ga yo'l yo'q

ikki alohida if, ball [95]
birinchi sakrash: "o'tdi"
ikkinchi sakrash: "a'lo"`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Zanjir xatosi ko'pincha «dastur ishlayapti» ko'rinishida. 95 ball oddiy bo'lib chiqadi yoki ikkita baho birga yoziladi.",
        ],
        items: [
          {
            title: "Keng shartni tor shartning ustiga qo'yish",
            why: [
              "95 `>= 60` ga tegadi va zanjir to'xtaydi. `a'lo` tarmog'i o'lik. Avval yuqori chegarani yozing.",
            ],
            wrong: `if (ball >= 60) {
    std::cout << "oddiy{{n}}";
} else if (ball >= 90) {
    std::cout << "a'lo{{n}}";
}`,
            right: `if (ball >= 90) {
    std::cout << "a'lo{{n}}";
} else if (ball >= 60) {
    std::cout << "oddiy{{n}}";
}`,
          },
          {
            title: "Bitta daraja kerak bo'lib, else ni unutish",
            why: [
              "Ikkinchi `if` mustaqil. 95 da ikkala yozuv chiqadi. Baholar bir-birini inkor qilsa, ularni `else if` bilan ulang.",
            ],
            wrong: `if (ball >= 90) {
    std::cout << "A{{n}}";
}
if (ball >= 80) {
    std::cout << "B{{n}}";
}`,
            right: `if (ball >= 90) {
    std::cout << "A{{n}}";
} else if (ball >= 80) {
    std::cout << "B{{n}}";
}`,
          },
          {
            title: "Oxirgi else ni qolgan hamma narsa deb unutish",
            why: [
              "Oxirgi `else` yuqoridagi shartlar yolg'on bo'lsa ishlaydi. Unga «aniq 50» deb ma'no yuklamang. 0 ham, 59 ham, manfiy ball ham shu yerga tushadi. Qolgan oralig'ingiz shuni xohlasin.",
            ],
            wrong: `if (ball >= 60) {
    std::cout << "o'tdi{{n}}";
} else {
    std::cout << "aynan 50{{n}}";
}`,
            right: `if (ball >= 60) {
    std::cout << "o'tdi{{n}}";
} else {
    std::cout << "60 dan past{{n}}";
}`,
          },
        ],
      },
      quiz: [
        {
          id: "5.3-q1",
          question:
            "`ball` 95. Avval `if (ball >= 60)` ichida `oddiy`, keyin `else if (ball >= 90)` ichida `a'lo`. Nima chiqadi?",
          options: ["a'lo", "oddiy", "qayta", "oddiy va a'lo"],
          answer: 1,
          explanation:
            "95 >= 60 rost, zanjir shu yerda to'xtaydi. else if ga yetilmaydi. oddiy yoziladi. a'lo tarmog'i o'lik.",
        },
        {
          id: "5.3-q2",
          question:
            "`ball` 85. Zanjir: `>= 90` bo'lsa A, `else if >= 80` bo'lsa B, `else if >= 60` bo'lsa C, oxirida `qayta`. Natija?",
          options: ["A", "B", "C", "qayta"],
          answer: 1,
          explanation:
            "85 >= 90 yolg'on. 85 >= 80 rost. B yoziladi, pastki shartlar tekshirilmaydi.",
        },
        {
          id: "5.3-q3",
          question:
            "`ball` 95. Ikki alohida if: biri `>= 60` bo'lsa `o'tdi`, ikkinchisi `>= 90` bo'lsa `a'lo`. Konsol?",
          options: ["faqat o'tdi", "faqat a'lo", "o'tdi va a'lo", "hech narsa"],
          answer: 2,
          explanation:
            "else yo'q, ikkala if mustaqil. 95 ikkala shartni ham rost qiladi. Ikki qator chiqadi.",
        },
      ],
    },
    {
      id: "5.4",
      navTitle: "Ichma-ich if",
      title: "Ichma-ich (nested) if shartlari",
      goal: [
        "Bu darsdan keyin siz ichki `if` ni tashqi eshik ochilgandan keyin beriladigan ikkinchi savol deb o'qiysiz. Tashqi shart yolg'on bo'lsa, ichki shart hisoblanmaydi. Ichki `else` va tashqi `else` turli rad etish ekanini, qachon `&&` yetishini va qachon ichma-ich yozish kerakligini ajratasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Konsert eshigi ikki qo'riqchili. Birinchisi yoshni so'raydi. 18 dan kichik bo'lsa, ikkinchi qo'riqchigacha bormaysiz. Chipta cho'ntagingizda bo'lsa ham, gap unga yetmaydi. Sizga «yosh yetarli emas» deyiladi.",
          "Yosh yetarli bo'lsa, ikkinchi qo'riqchi chiptani ko'radi. Chipta bor, kirasiz. Chipta yo'q, «chipta oling» deyiladi. Bu boshqa rad etish. Birinchi qo'riqchining «yosh yetarli emas» i emas.",
          "Ba'zan ikkala shart birga rost bo'lsagina bitta xabar kerak, rad etishning sababi esa muhim emas. Unda ikki qo'riqchini bitta savolga jamlash mumkin: yosh ham, chipta ham. Bu `&&`. Sabablar har xil xabar talab qilsa, qo'riqchilarni alohida qoldiring.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Ichki `if` tashqi `if` ning tanasida turadi. Tashqi shart yolg'on bo'lsa, tana bajarilmaydi, ichki solishtirish ham bajarilmaydi. Bu 4.5-darsdagi `&&` ning qisqa tutashuviga o'xshaydi, lekin tarmoqlar ko'proq.",
        ],
        items: [
          {
            title: "Tashqi rost bo'lsagina ichki so'raladi",
            paragraphs: [
              "Avval tashqi shart. Rost bo'lsa, blokka kiriladi va ichki `if` o'z shartini hisoblaydi. Yolg'on bo'lsa, boshqaruv tashqi `else` ga yoki tashqi juftlikdan keyingi qatorga sakraydi.",
              "Ichki `else` faqat shu holatni aytadi: tashqi rost edi, ichki yolg'on. Tashqi `else` esa tashqi yolg'on. Nomlari o'xshash, ma'nolari boshqa.",
            ],
            code: `if (yosh >= 18) {
    if (chipta == 1) {
        std::cout << "kiring{{n}}";
    } else {
        std::cout << "chipta oling{{n}}";
    }
} else {
    std::cout << "yosh yetarli emas{{n}}";
}`,
            codeLabel: "ikki xil rad etish",
          },
          {
            title: "Har bir else o'z if iga",
            paragraphs: [
              "Qavs qo'yilgan yozuvda juftlik aniq. Ichki `else` ichki `if` dan keyin, tashqi blok yopilmasidan turadi. Tashqi `else` tashqi blok yopilgandan keyin turadi.",
              "Qavsni olsangiz, 5.2-darsdagi qoida qaytadi: `else` eng yaqin `if` ga yopishadi. Ichki va tashqi rad etish bitta bo'lib qoladi. Ichma-ich shartni qavssiz yozmang.",
            ],
          },
          {
            title: "&& qachon yetadi",
            paragraphs: [
              "Muvaffaqiyat bitta xabar, rad etish ham bitta umumiy xabar bo'lsa, `yosh >= 18 && chipta == 1` yetadi. Ikki sababni ajratib bo'lmaydi, chunki `&&` yolg'on bo'lsa qaysi tomon aybdorligi ifoda natijasida qolmaydi.",
              "«Chipta yo'q» va «yosh yetarli emas» alohida chiqishi kerak bo'lsa, ichma-ich `if` kerak. `&&` bu xabarlarni birlashtirib yuboradi.",
              "Ichkariga uch-to'rt qavat tushmang. Har qavatning o'z `else` i bo'lmasa va hammasi birga rost bo'lishi kerak bo'lsa, shartlarni `&&` bilan yozing. O'qish osonlashadi.",
            ],
            code: `if (yosh >= 18 && chipta == 1) {
    std::cout << "kiring{{n}}";
} else {
    std::cout << "kirmang{{n}}";
}`,
            codeLabel: "sabab ajratilmaydi",
          },
        ],
      },
      examples: [
        {
          title: "Yosh ham, chipta ham joyida",
          intro: [
            "20 yosh, chipta 1. Tashqi eshik ochiladi, ichki savol ham rost. Kirish yozuvi shu ikkalasining ichida.",
          ],
          codeLabel: "ichki_kirish.cpp",
          code: `#include <iostream>

int main() {
    int yosh = 20;
    int chipta = 1;
    if (yosh >= 18) {
        if (chipta == 1) {
            std::cout << "kiring{{n}}";
        } else {
            std::cout << "chipta oling{{n}}";
        }
    } else {
        std::cout << "yosh yetarli emas{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `kiring`,
          analysis: [
            {
              lines: "4-6",
              text: "`yosh` 20, `chipta` 1. `20 >= 18` rost. Tashqi blok ochiladi. Tashqi `else`, 13-qator, endi bu o'tishda ishlamaydi.",
            },
            {
              lines: "7-8",
              text: "Ichki shart navbat oladi. `1 == 1` rost. `kiring` yoziladi.",
            },
            {
              lines: "9-10",
              text: "Ichki `else` ichki shart yolg'on bo'lsa edi. Hozir rost, `chipta oling` tashlanadi.",
            },
            {
              lines: "14",
              text: "Tashqi juftlik tugaydi. Boshqa yozuv yo'q. Konsolda bitta so'z.",
            },
          ],
        },
        {
          title: "Katta, lekin chiptasiz",
          intro: [
            "Yosh 20, chipta 0. Birinchi qo'riqchi o'tkazadi. Ikkinchisi rad etadi. Bu yosh haqidagi xabar emas.",
          ],
          codeLabel: "ichki_chipta.cpp",
          code: `#include <iostream>

int main() {
    int yosh = 20;
    int chipta = 0;
    if (yosh >= 18) {
        if (chipta == 1) {
            std::cout << "kiring{{n}}";
        } else {
            std::cout << "chipta oling{{n}}";
        }
    } else {
        std::cout << "yosh yetarli emas{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `chipta oling`,
          analysis: [
            {
              lines: "6",
              text: "`20 >= 18` rost. Yosh xabari, 13-qator, tashlanadi. Odami katta.",
            },
            {
              lines: "7",
              text: "`chipta` 0. `0 == 1` yolg'on. `kiring` yozilmaydi.",
            },
            {
              lines: "9-10",
              text: "Ichki `else` ochiladi. `chipta oling`. Tashqi shart rost bo'lmaganida bu qatorga yo'l bo'lmasdi.",
            },
            {
              lines: "ma'no",
              text: "Ikki `else` ikki sabab. Ularni bitta `kirmang` qilib qo'ysangiz, mehmon nima qilishini bilmaydi.",
            },
          ],
        },
        {
          title: "Yosh yetmasa, chipta so'ralmaydi",
          intro: [
            "16 yosh, chipta 1. Chipta cho'ntakda. Ikkinchi qo'riqchi baribir ishga tushmaydi.",
          ],
          codeLabel: "ichki_yosh.cpp",
          code: `#include <iostream>

int main() {
    int yosh = 16;
    int chipta = 1;
    if (yosh >= 18) {
        if (chipta == 1) {
            std::cout << "kiring{{n}}";
        } else {
            std::cout << "chipta oling{{n}}";
        }
    } else {
        std::cout << "yosh yetarli emas{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `yosh yetarli emas`,
          analysis: [
            {
              lines: "4-6",
              text: "`yosh` 16. `16 >= 18` yolg'on. Tashqi blok, 7–11-qatorlar, ochilmaydi.",
            },
            {
              lines: "7",
              text: "`chipta == 1` hisoblanmaydi. `chipta` qutisida 1 yotadi, lekin bu solishtirish buyrug'i ishlamaydi. `&&` dagi kabi, chap tomon yolg'on bo'lsa o'ng tomon shart emas.",
            },
            {
              lines: "12-13",
              text: "Tashqi `else` ishlaydi. `yosh yetarli emas`. `kiring` ham, `chipta oling` ham chiqmaydi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Tashqi shart birinchi sakrash. Yolg'on bo'lsa, ko'rsatkich ichki blokdagi barcha buyruqlarni, shu jumladan `chipta` ni o'qiydigan solishtirishni, tashlab tashqi `else` ga tushadi. `chipta` uyasi o'zgarmaydi. U bu safar o'qilmaydi ham.",
          "Tashqi shart rost bo'lsa, protsessor ichki blokka kiradi va ikkinchi solishtirishni bajaradi. Ichki rost bo'lsa, `kiring` buferga tushadi va ichki `else` ham, tashqi `else` ham o'tkaziladi. Ikki marta rad etish yozilmaydi.",
          "`yosh` va `chipta` ikkita alohida quti. Ichki `if` birinchisini qayta yozmaydi. U faqat ikkinchisini o'qiydi. Tashqi `else` esa ikkinchi qutiga umuman tegmaydi.",
          "`&&` yozuvda ikkala solishtirish bitta ifoda. Chap tomon yolg'on bo'lsa, o'ng tomon hisoblanmaydi, natija yolg'on. Protsessor bitta `else` tanasiga sakraydi. Qaysi tomon yolg'onligi alohida tarmoq bo'lib saqlanmaydi. Shu farq xotirada ham ko'rinadi: ichma-ichda ikkita sakrash nishoni, `&&` da bitta.",
        ],
        diagram: `yosh [20], chipta [1]
tashqi rost -> ichkariga
ichki rost -> "kiring"

yosh [20], chipta [0]
tashqi rost -> ichkariga
ichki yolg'on -> "chipta oling"
tashqi else tashlanadi

yosh [16], chipta [1]
tashqi yolg'on
ichki solishtirish ishlamaydi
"yosh yetarli emas"`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Ichma-ich xato noto'g'ri sababni aytadi. Mehmon katta, dastur esa yoshni ayblaydi. Yoki aksincha, ikki sabab bitta jim o'riniga qorishib ketadi.",
        ],
        items: [
          {
            title: "Ichki else ni qavssiz tashqariga yopishtirish",
            why: [
              "Qavs bo'lmasa, yagona `else` ichki `if` ga tegishli bo'lib qolishi yoki tashqi bilan chalkashishi mumkin. Ikki sababni ikki juftlik qiling.",
            ],
            wrong: `if (yosh >= 18)
    if (chipta == 1)
        std::cout << "kiring{{n}}";
else
    std::cout << "yosh yetarli emas{{n}}";`,
            right: `if (yosh >= 18) {
    if (chipta == 1) {
        std::cout << "kiring{{n}}";
    } else {
        std::cout << "chipta oling{{n}}";
    }
} else {
    std::cout << "yosh yetarli emas{{n}}";
}`,
          },
          {
            title: "Turli xabarlarni && ichida yo'qotish",
            why: [
              "16 yoshda ham, chiptasiz 20 yoshda ham bitta `kirmang` chiqadi. Sabab kerak bo'lsa, bu yozuv yetmaydi. `&&` faqat umumiy rad etishga yaroqli.",
            ],
            wrong: `if (yosh >= 18 && chipta == 1) {
    std::cout << "kiring{{n}}";
} else {
    std::cout << "kirmang{{n}}";
}`,
            right: `if (yosh >= 18) {
    if (chipta == 1) {
        std::cout << "kiring{{n}}";
    } else {
        std::cout << "chipta oling{{n}}";
    }
} else {
    std::cout << "yosh yetarli emas{{n}}";
}`,
          },
          {
            title: "Juftlikdan keyingi qatorni ichki tanaga qo'shib o'qish",
            why: [
              "Oxirgi `cout` ikkala `if` yopilgandan keyin turibdi. Yosh 16 bo'lsa ham, chipta 0 bo'lsa ham `har doim kiradi` yoziladi. Kirish xabari faqat ikkala shart rost bo'lgan blokda tursin.",
            ],
            wrong: `if (yosh >= 18) {
    if (chipta == 1) {
        std::cout << "kiring{{n}}";
    }
}
std::cout << "har doim kiradi{{n}}";`,
            right: `if (yosh >= 18) {
    if (chipta == 1) {
        std::cout << "kiring{{n}}";
    }
}`,
          },
        ],
      },
      quiz: [
        {
          id: "5.4-q1",
          question:
            "`yosh` 20, `chipta` 0. Tashqi `if (yosh >= 18)`, ichida `if (chipta == 1)` bo'lsa `kiring`, ichki `else` da `chipta oling`, tashqi `else` da `yosh yetarli emas`. Nima chiqadi?",
          options: ["kiring", "chipta oling", "yosh yetarli emas", "kiring va chipta oling"],
          answer: 1,
          explanation:
            "20 >= 18 rost, tashqi else tashlanadi. 0 == 1 yolg'on, ichki else ishlaydi. chipta oling.",
        },
        {
          id: "5.4-q2",
          question:
            "`yosh` 16, `chipta` 1. Xuddi shu ikki qavatli if. Ichki shart tekshiriladimi va nima yoziladi?",
          options: [
            "Tekshiriladi, kiring",
            "Tekshiriladi, chipta oling",
            "Tekshirilmaydi, yosh yetarli emas",
            "Ikki xabar birga chiqadi",
          ],
          answer: 2,
          explanation:
            "16 >= 18 yolg'on. Tashqi blok ochilmaydi, chipta == 1 hisoblanmaydi. Tashqi else: yosh yetarli emas.",
        },
        {
          id: "5.4-q3",
          question: "`&&` ichma-ich if o'rniga qachon yetarli?",
          options: [
            "Har bir rad etishning alohida xabari bo'lsa",
            "Bitta muvaffaqiyat va bitta umumiy rad etish bo'lsa",
            "Tashqi shart yolg'on bo'lsa ham ichki tarmoq kerak bo'lsa",
            "Oraliqni switch bilan yozib bo'lmaganda",
          ],
          answer: 1,
          explanation:
            "&& ikkala shart rost bo'lsagina true beradi va sababni ajratmaydi. Umumiy «kirmang» yetarli bo'lsa, u o'qishga yengilroq. Turli sabablarga turli matn kerak bo'lsa, ichma-ich if qoladi.",
        },
      ],
    },
    {
      id: "5.5",
      navTitle: "Ternar operator",
      title: "Ternar operator (? :)",
      goal: [
        "Bu darsdan keyin siz `? :` ni ifoda ichidagi kichik tanlov deb o'qiysiz. U qiymat beradi, blok ochmaydi. Faqat tanlangan tarmoq hisoblanishini, ikki tarmoqning turi mos kelishini, operator o'ngga bog'lanishini va `<<` dan zaif ekanini, shuning uchun `cout` da qavs kerakligini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Ikkita stolda ikkita konvert yotadi. Qog'ozdagi savol: son juftmi? Ha bo'lsa, chap konvertni olasiz, unda «juft» yozilgan. Yo'q bo'lsa, o'ng konvertni olasiz. Ikkalasini ochib o'qimaysiz. Bittasini qo'lga olib, javobning o'rniga qo'yasiz.",
          "`if - else` xona ochadi: ichida bir nechta ish, yozuv, hisob bo'lishi mumkin. Ternar konvert. U bitta qiymat qaytaradi va shu qiymat kattaroq gapning ichiga tushadi. Masalan, ekranga yozishning o'zi tanlov emas, tanlov uning ichidagi matn.",
          "Konvertga xona sig'maydi. Ikkinchi qator, e'lon, `{}` blok ternarning tarmog'iga kirmaydi. Ish ko'paysa, konvertni qo'yib, yo'l ayrisiga, ya'ni `if - else` ga qayting.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Yozuv: `shart ? rost_ifoda : yolg'on_ifoda`. Uch qism bor. Shart, rost bo'lganda olinadigan ifoda, yolg'on bo'lganda olinadigan ifoda. Ikkalasidan bittasini tashlab bo'lmaydi. `:` ham shart.",
        ],
        items: [
          {
            title: "Qiymat, operator emas",
            paragraphs: [
              "Natija ifoda. Uni o'zgaruvchiga yozish, `cout` ga berish yoki boshqa hisobga qo'yish mumkin. `{}` blok, ikkinchi operator, `if` ning o'zi tarmoq bo'la olmaydi.",
              "`std::cout << (n % 2 == 0 ? \"juft\" : \"toq\")` da tanlov matnni tanlaydi. Yozishning o'zi tanlovdan tashqarida, bitta marta.",
              "Tarmoqlar umumiy turga ega bo'lishi kerak. Ikkala tomonda `int` bo'lsa, natija `int`. Biri `int`, biri matn bo'lsa, yig'ilmaydi. Ikkala matn literal bir xil turda.",
            ],
            code: `int belgi = n % 2 == 0 ? 1 : 0;
std::cout << (n % 2 == 0 ? "juft" : "toq") << "{{n}}";`,
            codeLabel: "tanlov qiymat beradi",
          },
          {
            title: "Faqat tanlangan tomon hisoblanadi",
            paragraphs: [
              "Shart rost bo'lsa, o'rta ifoda hisoblanadi, `:` dan keyingisi tegilmaydi. Yolg'on bo'lsa, faqat o'ng tomon hisoblanadi. 4.5-darsdagi short-circuit ga o'xshash, lekin bu `&&` emas. Ishlatilmagan tomondagi `++` ham yurmaydi.",
              "Shu sabab tarmoq ichiga yashirin ish yashirmang. O'qigan odam ikkala `++` ham bo'ldi deb o'ylaydi. Ta'sir kerak bo'lsa, `if - else` ochiqroq.",
            ],
            code: `int belgi = n >= 0 ? ++x : ++y;`,
            codeLabel: "bittasi ishlaydi",
          },
          {
            title: "O'ngga bog'lanadi, << dan zaif",
            paragraphs: [
              "Ketma-ket ternar o'ng tomonga yig'iladi. `a ? b : c ? d : e` bu `a ? b : (c ? d : e)`. Chapga emas. Ichma-ich `else if` shu tartibda o'qiladi, lekin qator tezda o'qilmaydigan bo'ladi. Ikkitadan ortiq tanlovda 5.3-darsdagi zanjirni yozing.",
              "`<<` ternardan kuchli. `std::cout << a > b ? a : b` ni kompilyator `(std::cout << a) > b ? a : b` deb o'qiydi va yig'maydi. Butun tanlovni qavsga oling.",
              "Tayinlash ternardan zaif. `int katta = a > b ? a : b` qavssiz ham to'g'ri: avval tanlov, keyin yozish. Qavs bu yerda o'qish uchun, majbur emas.",
            ],
            code: `int katta = a > b ? a : b;
std::cout << (a > b ? a : b) << "{{n}}";
std::cout << (ball >= 90 ? "A" : ball >= 60 ? "o'tdi" : "qayta");`,
            codeLabel: "ustuvorlik",
          },
        ],
      },
      examples: [
        {
          title: "Juft yoki toq, bitta matn",
          intro: [
            "`n` 4. Tanlov so'zni tanlaydi, `cout` shu so'zni bir marta yozadi. Qavs `<<` dan himoya.",
          ],
          codeLabel: "ternar_juft.cpp",
          code: `#include <iostream>

int main() {
    int n = 4;
    std::cout << (n % 2 == 0 ? "juft" : "toq") << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `juft`,
          analysis: [
            {
              lines: "4",
              text: "`n` 4. Hali tanlov yo'q.",
            },
            {
              lines: "5",
              text: "Qavs ichida `4 % 2` bu 0, `0 == 0` rost. O'rta tarmoq olinadi: `juft`. O'ng tarmoq `toq` hisobga kirmaydi, yozilmaydi ham.",
            },
            {
              lines: "5, yozuv",
              text: "`cout` tayyor matnni oladi. Ekranda `juft`. Qavs bo'lmaganida `<<` shartning bo'lagini yutardi va qator yig'ilmasdi.",
            },
            {
              lines: "n",
              text: "`n` o'zgarmaydi. Ternar yangi vaqtinchalik matn tanlaydi, qutiga yozmaydi. Natijani saqlamoqchi bo'lsangiz, alohida o'zgaruvchiga tayinlang.",
            },
          ],
        },
        {
          title: "Manfiy sonda faqat o'ngdagi ++ ishlaydi",
          intro: [
            "`n` −3. Shart yolg'on. `x` ga tegilmaydi, `y` bittaga o'sadi. Tanlangan qiymat `belgi` ga yoziladi.",
          ],
          codeLabel: "ternar_bir_tomon.cpp",
          code: `#include <iostream>

int main() {
    int x = 0;
    int y = 0;
    int n = -3;
    int belgi = n >= 0 ? ++x : ++y;
    std::cout << belgi << " " << x << " " << y << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1 0 1`,
          analysis: [
            {
              lines: "4-6",
              text: "`x` 0, `y` 0, `n` −3. Uchala quti tayyor.",
            },
            {
              lines: "7, shart",
              text: "`-3 >= 0` yolg'on. O'rta ifoda `++x` bajarilmaydi. `x` 0 bo'lib qoladi.",
            },
            {
              lines: "7, o'ng",
              text: "`++y` ishlaydi. `y` avval 1 bo'ladi, ifoda ham 1 qaytaradi. Shu 1 `belgi` ga yoziladi. `x++` bo'lganida qaytgan qiymat eski son bo'lardi. Bu yerda old qo'shimcha yangi sonni beradi.",
            },
            {
              lines: "8",
              text: "`belgi` 1, `x` 0, `y` 1. Konsol `1 0 1`. Ikki tarmoq birga ishlaganida `x` ham 1 bo'lardi. Bo'lmagan.",
            },
          ],
        },
        {
          title: "Kattasini tanlash va o'ngga yig'ilgan zanjir",
          intro: [
            "Birinchi dastur 3 va 8 ning kattasini qavssiz tayinlaydi. Ikkinchisi 85 ballni o'ngga yig'ilgan ternar bilan o'qiydi. Zanjir ishlaydi, lekin `else if` dan og'irroq o'qiladi.",
          ],
          codeLabel: "ternar_ustuvor.cpp",
          code: `#include <iostream>

int main() {
    int a = 3;
    int b = 8;
    int katta = a > b ? a : b;
    std::cout << katta << "{{n}}";

    int ball = 85;
    std::cout << (ball >= 90 ? "A" : ball >= 60 ? "o'tdi" : "qayta") << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `8
o'tdi`,
          analysis: [
            {
              lines: "4-6",
              text: "`a` 3, `b` 8. `3 > 8` yolg'on. O'ng tarmoq `b`, ya'ni 8. Tayinlash ternardan zaif, shuning uchun avval 8 tanlanadi, keyin `katta` ga yoziladi. Qo'shimcha qavs shart emas.",
            },
            {
              lines: "7",
              text: "`katta` 8. Ekranga 8. `a` va `b` o'z joyida.",
            },
            {
              lines: "10",
              text: "Ichki tuzilish `ball >= 90 ? \"A\" : (ball >= 60 ? \"o'tdi\" : \"qayta\")`. O'ngga bog'langan. Tashqi qavs `cout` uchun.",
            },
            {
              lines: "10, hisob",
              text: "`85 >= 90` yolg'on, chap matn `A` olinmaydi. Ichki shart `85 >= 60` rost, `o'tdi` chiqadi. `qayta` hisoblanmaydi. Shu qarorni 5.3-darsdagi zanjir aniqroq ko'rsatadi. Ternarni ikki tomonli kichik tanlovda qoldiring.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Ternar ham sakrash, lekin u tana ochmaydi. Shart registrda rost yoki yolg'on bo'ladi. Rost bo'lsa, protsessor o'rta ifodaning buyrug'iga boradi va natijani vaqtinchalikga qo'yadi. Yolg'on bo'lsa, o'ng ifodaga boradi. Ikkinchi tomonning buyrug'i bu o'tishda yo'q.",
          "`++x` bajarilmasa, `x` ning uyasiga 1 qo'shilmaydi. Bu optimizatsiya tasodifi emas. Tanlanmagan tarmoq hisoblanmaydi. `x` 0 bo'lib turadi, `y` 1 bo'ladi, `belgi` shu 1 ning nusxasini oladi.",
          "`cout` qatori uch qism. Avval qavs ichidagi tanlov matnni tanlaydi. Keyin `<<` shu matnning belgilarini buferga yozadi. Qavs bo'lmasa, birinchi `<<` o'zidan keyingi ifodani yutadi, solishtirish esa oqim bilan sonni tenglashtirmoqchi bo'ladi. Bunday operator yo'q, yig'ish to'xtaydi. Xotirada bu dastur ishga tushmaydi.",
          "Ketma-ket ternar o'ngdagi juftlikni avval ichki tanlov qilib qo'yadi. 85 da tashqi shart yolg'on, ichki juftlikka kiriladi, u rost, `o'tdi` vaqtinchalik matn bo'ladi. Chapdagi `A` buferga tushmaydi.",
        ],
        diagram: `n [4]
4 % 2 == 0 rost
tanlov: "juft"
"toq" hisoblanmaydi
cout shu matnni yozadi

x [0] y [0] n [-3]
-3 >= 0 yolg'on
++x tashlanadi, x qoladi 0
++y -> y [1], qiymat 1
belgi [1]

a [3] b [8]
3 > 8 yolg'on
katta [8]

ball [85]
>= 90 yolg'on
ichki: >= 60 rost -> "o'tdi"`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Ternar xatosi ko'pincha yig'ilmaydi. Yig'ilsa ham, ikkala `++` ni birga kutish noto'g'ri son beradi.",
        ],
        items: [
          {
            title: "cout ichida qavssiz ternar",
            why: [
              "`<<` `?` dan kuchli. Qavssiz qator `(std::cout << a) > b ? a : b` bo'lib o'qiladi. Oqimni son bilan `>` qilib bo'lmaydi. Dastur yig'ilmaydi.",
            ],
            wrong: `std::cout << a > b ? a : b << "{{n}}";`,
            right: `std::cout << (a > b ? a : b) << "{{n}}";`,
          },
          {
            title: "Tarmoqqa blok sig'dirish",
            why: [
              "`{}` ifoda emas. Ternar ikkita ifoda kutadi. Bir nechta ish, e'lon yoki `return` sizga `if - else` kerak. Ternarni qiymat tanlashda qoldiring.",
            ],
            wrong: `n % 2 == 0 ? {
    std::cout << "juft{{n}}";
} : {
    std::cout << "toq{{n}}";
};`,
            right: `if (n % 2 == 0) {
    std::cout << "juft{{n}}";
} else {
    std::cout << "toq{{n}}";
}`,
          },
          {
            title: "Ikki tomonning turini aralashtirish",
            why: [
              "Chapda son, o'ngda matn. Umumiy tur yo'q, qator yig'ilmaydi. Ikkalasini ham son yoki ikkalasini ham matn qiling.",
            ],
            wrong: `std::cout << (n % 2 == 0 ? 1 : "toq") << "{{n}}";`,
            right: `std::cout << (n % 2 == 0 ? "juft" : "toq") << "{{n}}";`,
          },
        ],
      },
      quiz: [
        {
          id: "5.5-q1",
          question: "`n` 4. `std::cout << (n % 2 == 0 ? \"juft\" : \"toq\")` nima yozadi?",
          options: ["toq", "juft", "4", "juft va toq"],
          answer: 1,
          explanation:
            "4 % 2 == 0 rost. O'rta tarmoq olinadi. toq hisoblanmaydi. Ekranda juft.",
        },
        {
          id: "5.5-q2",
          question:
            "`x` va `y` 0, `n` −3. `int belgi = n >= 0 ? ++x : ++y`. Shundan keyin `x` va `y` necha?",
          options: ["x = 1, y = 1", "x = 0, y = 1", "x = 1, y = 0", "x = 0, y = 0"],
          answer: 1,
          explanation:
            "−3 >= 0 yolg'on. ++x ishlamaydi, x 0 qoladi. ++y ishlaydi, y 1 bo'ladi. belgi ham 1.",
        },
        {
          id: "5.5-q3",
          question: "`std::cout << a > b ? a : b` nima qiladi?",
          options: [
            "Katta sonni chiqaradi",
            "Kichik sonni chiqaradi",
            "Yig'ilmaydi, << tanlovdan oldin yutadi, qavs kerak",
            "Har doim a ni chiqaradi",
          ],
          answer: 2,
          explanation:
            "<< ternardan kuchli. Qator (std::cout << a) > b ? a : b bo'lib o'qiladi. Oqim va sonni > bilan solishtirib bo'lmaydi. To'g'ri yozuv: std::cout << (a > b ? a : b).",
        },
      ],
    },
    {
      id: "5.6",
      navTitle: "switch, break, default",
      title: "switch - case, break va default",
      goal: [
        "Bu darsdan keyin siz `switch` ni bitta butun qiymatning tenglik jadvali deb o'qiysiz. `case` yorlig'i, `break` ning sakrashni to'xtatishi, `break` yo'qolsa pastga tushish, `default` ning qolgan holatlari va qachon zanjirli `if` kerakligini ajratasiz. Oraliq, kasr va matn bu jadvalga tushmasligini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Lift tugmalarini ko'ring. Siz 3 ni bosdingiz. Lift 3-qavatga boradi, 1 va 2 da to'xtab chiqish eshigini ochmaydi. `switch` shu lift. Qiymat bir marta o'qiladi, mos `case` yorlig'iga sakraladi.",
          "`break` «shu qavatda tushaman, pastga ketaverma» deydi. Uni unutsangiz, eshik ochiladi va lift keyingi qavatda ham eshikni ochadi. 1-qavatning ishi tugab, 2-qavatning ishi ham bajariladi. Bu xato emas, qoida. Yorliq to'siq emas.",
          "`default` jadvalda yo'q tugma. 1, 2, 3 dan boshqa son kelsa, shu qavat. Lift oraliqni tushunmaydi: «60 dan 100 gacha» bitta tugma emas. Bunday savol yo'l ayrisi, ya'ni `if - else if`. Aniq qavatlar, aniq harflar bo'lsa, tugmalar o'rnida `switch` o'qilishi yengil.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`switch (ifoda)` ifodani bir marta hisoblaydi. Natija butun tur yoki sanoq bo'lishi kerak: `int`, `char`, `bool`, `enum`. `double` va matn yig'ilmaydi. Keyin shu qiymat `case` dagi konstantaga tengligi bo'yicha sakraydi.",
        ],
        items: [
          {
            title: "case, break, default",
            paragraphs: [
              "`case` dan keyin o'zgarmas ifoda keladi: `1`, `'b'`, `3 + 4`. O'zgaruvchi yozib bo'lmaydi. Bir xil yorliq ikki marta yig'ilmaydi.",
              "Mos yorliq topilsa, boshqaruv o'sha qatorga tushadi va pastga qarab ketaveradi. Keyingi `case` to'xtatmaydi. `break` `switch` dan chiqaradi.",
              "`default` hech bir `case` mos kelmasa ishlaydi. Odatda oxirida turadi. Oxirida bo'lsa, `break` majbur emas, lekin qo'yib qo'yish keyin qo'shilgan yorliqqa tushib ketishdan saqlaydi. `default` bo'lmasa va hech narsa mos kelmasa, `switch` hech narsa qilmaydi.",
            ],
            code: `switch (kun) {
case 1:
    std::cout << "dushanba{{n}}";
    break;
case 3:
    std::cout << "chorshanba{{n}}";
    break;
default:
    std::cout << "boshqa kun{{n}}";
    break;
}`,
            codeLabel: "tenglik jadvali",
          },
          {
            title: "Pastga tushish",
            paragraphs: [
              "`break` yo'q bo'lsa, tanlangan qavatdagi ish tugaydi va keyingi yorliqning isi ham bajariladi. Bu fall-through. Kompilyator ko'pincha ogohlantiradi. Tasodifiy qoldirmang.",
              "Qasddan tushirish ham bor. `case 'a':` ning ostida operator yo'q, darhol `case 'A':` turadi. Ikkala harf bitta tanaga tushadi. Bo'sh yorliqlarni shunday jamlash tushunarli. O'rtada yozuv bor bo'lib, `break` unutilsa, bu allaqachon xato.",
            ],
            code: `case 'a':
case 'A':
    std::cout << "a harfi{{n}}";
    break;`,
            codeLabel: "ikkita yorliq, bitta tana",
          },
          {
            title: "Qachon switch, qachon if",
            paragraphs: [
              "Bitta butun yoki bitta harf, aniq tengliklar: 1, 2, 3 yoki `'a'`, `'b'`. Bu `switch`. Yorliqlar tartibi moslikni o'zgartirmaydi, chunki bu zanjir emas, sakrash. Tartib faqat `break` siz pastga tushishda muhim.",
              "Oraliq, `>=`, ikkita o'zgaruvchining birga tekshiruvi, kasr, matn: bu `if - else if`. `case ball >= 90` yozib bo'lmaydi. `case` tenglik konstantasi, shart emas.",
              "Ikki tomonli kichik qiymat, `juft` yoki `toq`: ternar yetishi mumkin. Bir nechta operatorli tarmoq: `if`. `switch` ichida ham tarmoq uzun bo'lishi mumkin, lekin u baribir bitta qiymatning tengligiga tayanadi.",
            ],
            table: {
              caption: "Tanlovni qaysi asbob ko'taradi.",
              headers: ["Savol", "Asbob"],
              rows: [
                ["kun 1, 2 yoki 3 ga teng", "switch"],
                ["ball 90 dan yuqori, oraliq", "if else if"],
                ["yosh va chipta birga", "ichma-ich if yoki &&"],
                ["kasr son yoki matn", "if"],
                ["bitta ifoda, ikki qiymat", "ternar"],
              ],
            },
          },
          {
            title: "Ichkarida ochilgan o'zgaruvchi",
            paragraphs: [
              "`case` ichida `int x = 1` yozib, keyingi `case` o'sha blokda qolsa, dastur yig'ilmaydi. Boshqa yorliqqa sakrash e'lonni tashlab o'tishi mumkin. Tana o'z `{}` ini olsin, `break` shu qavs ichida tursin.",
              "`switch` dagi `break` faqat shu `switch` dan chiqadi. Sikl keyingi boblarda. Hozir uni switch ni yopuvchi sakrash deb o'qing.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "3-qavat, qolgan eshiklar ochilmaydi",
          intro: [
            "`kun` 3. Har bir tanada `break` bor. Mos yorliqdan keyin lift to'xtaydi.",
          ],
          codeLabel: "switch_kun.cpp",
          code: `#include <iostream>

int main() {
    int kun = 3;
    switch (kun) {
    case 1:
        std::cout << "dushanba{{n}}";
        break;
    case 2:
        std::cout << "seshanba{{n}}";
        break;
    case 3:
        std::cout << "chorshanba{{n}}";
        break;
    default:
        std::cout << "boshqa kun{{n}}";
        break;
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `chorshanba`,
          analysis: [
            {
              lines: "4-5",
              text: "`kun` 3. `switch` shu 3 ni bir marta o'qiydi. Zanjirdagidek yuqoridan `case 1` ni rostmi deb yurmaydi. To'g'ridan mos yorliqqa sakraydi.",
            },
            {
              lines: "6-11",
              text: "`case 1` va `case 2` bu o'tishda bajarilmaydi. Ularning `cout` i buferga tushmaydi.",
            },
            {
              lines: "12-14",
              text: "Sakrash 12-qatorga tushadi. `chorshanba` yoziladi. `break` switch ni yopadi. 15-qatordagi `default` ga o'tilmaydi.",
            },
            {
              lines: "15-17",
              text: "`default` 3 uchun emas. `kun` 9 bo'lsa, shu tana ishlardi. Hozir jim.",
            },
          ],
        },
        {
          title: "break yo'q, 1-qavat 2-qavatga tushib ketadi",
          intro: [
            "`kun` 1. Birinchi tanada `break` unutilgan. Yorliq to'siq emas, ish pastga oqadi.",
          ],
          codeLabel: "switch_tushish.cpp",
          code: `#include <iostream>

int main() {
    int kun = 1;
    switch (kun) {
    case 1:
        std::cout << "dushanba{{n}}";
    case 2:
        std::cout << "seshanba{{n}}";
        break;
    default:
        std::cout << "boshqa{{n}}";
        break;
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `dushanba
seshanba`,
          analysis: [
            {
              lines: "4-6",
              text: "`kun` 1. Kirish `case 1` ga sakraydi. `case 2` rad etilmaydi, u endi shart emas, oddiy yorliq.",
            },
            {
              lines: "7",
              text: "`dushanba` yoziladi. Keyin `break` yo'q. Boshqaruv 8-qatorga tushadi.",
            },
            {
              lines: "8-10",
              text: "`case 2` yangi tekshiruv emas. Uning tanasi ham bajariladi. `seshanba` yoziladi. 10-qatordagi `break` endi switch dan chiqaradi.",
            },
            {
              lines: "11-13",
              text: "`default` ga yetilmaydi. `break` uni saqlab qoldi. Konsolda ikki qator. Bitta kun kerak bo'lsa, 7-qatordan keyin `break` qo'ying.",
            },
          ],
        },
        {
          title: "Ikki harf, bitta tana",
          intro: [
            "`belgi` kichik `b`. Bo'sh `case 'b'` pastki `case 'B'` tanasiga tushadi. Bu qasddan jamlash.",
          ],
          codeLabel: "switch_harf.cpp",
          code: `#include <iostream>

int main() {
    char belgi = 'b';
    switch (belgi) {
    case 'a':
    case 'A':
        std::cout << "a harfi{{n}}";
        break;
    case 'b':
    case 'B':
        std::cout << "b harfi{{n}}";
        break;
    default:
        std::cout << "boshqa{{n}}";
        break;
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `b harfi`,
          analysis: [
            {
              lines: "4-5",
              text: "`belgi` harf `b`. `char` butun kod sifatida switch ga kiradi. 2.6-darsdagi kod, lekin bu yerda yorliqning o'zi ham harf konstantasi.",
            },
            {
              lines: "6-9",
              text: "`a` va `A` mos emas. Ularning tanasi bajarilmaydi.",
            },
            {
              lines: "10-13",
              text: "`case 'b'` da operator yo'q. Boshqaruv pastga, `case 'B'` tanasiga tushadi. `b harfi` yoziladi. `break` default ni yopadi. Katta `B` kelganda ham shu tana, xuddi shu `break` ishlardi.",
            },
            {
              lines: "14-16",
              text: "`default` boshqa harf uchun. `b` unga kirmaydi.",
            },
          ],
        },
        {
          title: "Qiymatni ichkarida o'zgartirish ikkinchi case ni ochmaydi",
          intro: [
            "`kun` 1. Tana ichida uni 2 qilamiz. `case 2` baribir ishlamaydi. Jadval kirishdagi son bilan bir marta tanlangan.",
          ],
          codeLabel: "switch_bir_marta.cpp",
          code: `#include <iostream>

int main() {
    int kun = 1;
    switch (kun) {
    case 1:
        kun = 2;
        std::cout << "bir{{n}}";
        break;
    case 2:
        std::cout << "ikki{{n}}";
        break;
    }
    std::cout << kun << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `bir
2`,
          analysis: [
            {
              lines: "4-5",
              text: "Kirishda `kun` 1. `switch` moslikni shu payt hisoblaydi va `case 1` ga sakraydi.",
            },
            {
              lines: "7-8",
              text: "`kun` qutisiga 2 yoziladi. Keyin `bir` chiqadi. Quti o'zgardi, lekin switch qaytadan jadval qaramaydi.",
            },
            {
              lines: "9-12",
              text: "`break` chiqaradi. `case 2` tashlanadi. `ikki` yo'q. Yangi qiymat yangi sakrash emas.",
            },
            {
              lines: "14",
              text: "Switch tugagan. `kun` endi 2, shuning uchun pastki `cout` 2 yozadi. Konsol ikki qator: `bir`, keyin `2`.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`switch` ifodani hisoblab, natijani registrda ushlaydi. Keyin sakrash jadvali mos yorliqning manzilini beradi. `kun` 3 bo'lsa, ko'rsatkich `case 3` dagi birinchi buyruqqa tushadi. `case 1` buyruqlari bu o'tishda o'qilmaydi. Bu `if` zanjiridagi ketma-ket solishtirish emas.",
          "`break` switch oxiridagi manzilga sakrash. U bo'lmasa, keyingi yorliq oddiy belgi, protsessor pastki `cout` ni ham bajaradi. `dushanba` va `seshanba` bir buferga ketma-ket tushadi. Xotira buzilmaydi, ikkinchi yozuv ortiqcha bo'ladi.",
          "Tana ichida `kun = 2` bitta uyani almashtiradi. Jadval esa kirishdagi 1 ni allaqachon ishlatgan. Ikkinchi solishtirish buyrug'i yo'q. `case 2` ga o'zi qaytadan kirmaydi. Switch dan keyingi `cout` yangilangan 2 ni o'qiydi.",
          "`case` ichida e'lon qilingan o'zgaruvchi switch blokining oxirigacha yashashi mumkin. Boshqa yorliqqa sakrash shu e'lonni tashlab o'tadi. Kompilyator buni yig'ishda rad etadi. Ichki `{}` qutining umrini o'sha tana bilan tugatadi, keyingi `case` o'sha joyni ko'rmaydi.",
        ],
        diagram: `kun [3]
jadval bir marta: 3
sakrash -> case 3
"chorshanba"
break -> switch oxiri

kun [1], break yo'q
sakrash -> case 1
"dushanba"
case 2 to'siq emas
"seshanba"
break

kun [1]
case 1: kun [2], "bir", break
case 2 ishlamaydi
keyin cout: 2`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "switch xatosi ikkinchi qavatni ham ochadi, yoki umuman yig'ilmaydi. Oraliqni yorliqqa tiqish ikkinchi tur.",
        ],
        items: [
          {
            title: "break ni unutish",
            why: [
              "`kun` 1 bo'lsa, `dushanba` dan keyin `seshanba` ham yoziladi. Keyingi yorliq to'xtatmaydi. Har bir tana oxirida `break`, toki pastga tushishni qasddan xohlamaguningizcha.",
            ],
            wrong: `case 1:
    std::cout << "dushanba{{n}}";
case 2:
    std::cout << "seshanba{{n}}";
    break;`,
            right: `case 1:
    std::cout << "dushanba{{n}}";
    break;
case 2:
    std::cout << "seshanba{{n}}";
    break;`,
          },
          {
            title: "Oraliqni case deb yozish",
            why: [
              "`case` tenglik konstantasi. `ball >= 90` shart, yorliq emas. Baholar oralig'i `if - else if` da turadi. Aniq kun raqami `switch` da turadi.",
            ],
            wrong: `switch (ball) {
case ball >= 90:
    std::cout << "A{{n}}";
    break;
}`,
            right: `if (ball >= 90) {
    std::cout << "A{{n}}";
} else if (ball >= 60) {
    std::cout << "o'tdi{{n}}";
} else {
    std::cout << "qayta{{n}}";
}`,
          },
          {
            title: "case ichida e'lonni qavssiz ochish",
            why: [
              "Keyingi `case` shu o'zgaruvchining e'lonini tashlab sakrashi mumkin. C++ buni yig'maydi. Tana uchun ichki blok oching va `break` ni ichkarida qoldiring.",
            ],
            wrong: `switch (kun) {
case 1:
    int x = 1;
    std::cout << x << "{{n}}";
    break;
case 2:
    break;
}`,
            right: `switch (kun) {
case 1: {
    int x = 1;
    std::cout << x << "{{n}}";
    break;
}
case 2:
    break;
}`,
          },
        ],
      },
      quiz: [
        {
          id: "5.6-q1",
          question:
            "`kun` 3. `case 1`, `case 2`, `case 3` ning har birida yozuv va `break` bor, oxirida `default`. Nima chiqadi?",
          options: ["dushanba", "seshanba", "chorshanba", "uchala kun"],
          answer: 2,
          explanation:
            "switch 3 ga sakraydi. case 3 yozadi va break chiqib ketadi. Qolgan yorliqlar bu o'tishda ishlamaydi.",
        },
        {
          id: "5.6-q2",
          question:
            "`kun` 1. `case 1` da `dushanba` yoziladi va `break` yo'q. `case 2` da `seshanba` yoziladi va `break` bor. Konsol?",
          options: [
            "faqat dushanba",
            "dushanba va seshanba",
            "faqat seshanba",
            "boshqa",
          ],
          answer: 1,
          explanation:
            "case yorlig'i to'siq emas. break bo'lmagani uchun ish case 2 ga tushadi. Ikkala yozuv chiqadi, default ga yetilmaydi.",
        },
        {
          id: "5.6-q3",
          question: "Ball 0 dan 100 gacha, chegaralar 90, 80, 60. Qaysi asbob to'g'ri?",
          options: [
            "switch va case ball >= 90",
            "if else if, chunki bu oraliq",
            "faqat ternar, else if yig'ilmaydi",
            "bitta if, qolgan ballarni default o'qiydi",
          ],
          answer: 1,
          explanation:
            "switch aniq tenglikni tanlaydi. Oraliq va >= shart. Ularni if else if zanjiri ko'radi. case ga shart yozib bo'lmaydi.",
        },
      ],
    },
  ],
};

export const chapter5 = decode(rawChapter);
