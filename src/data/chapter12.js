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
  id: "12",
  number: 12,
  title: "Fayllar bilan ishlash",
  summary:
    "Matnni diskka yozish, dastur yopilgandan keyin ham saqlash, qator va so'z bo'yicha qayta o'qish.",
  lessons: [
    {
      id: "12.1",
      navTitle: "ofstream",
      title: "ofstream: faylga yozish va dasturni yopgandan keyin ham saqlash",
      goal: [
        "Bu darsdan keyin siz `std::ofstream` bilan fayl ochasiz, matn yozasiz va yopasiz. Oddiy ochish eski matnni bo'shatishini, `std::ios::app` oxiriga qo'shishini bilasiz. Yozuv buferdan diskka `close` yoki obyekt umri tugaganda tushishini, `return` shu umrni yopishini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Daftar yangi varaq. `ofstream` qalamni ochadi. Oddiy ochish varaqni tozalab, boshidan yozadi. Kecha yozilgan gap shu zahoti ketadi, hali yangi gap yozmasangiz ham varaq bo'sh.",
          "`std::ios::app` yangi varaq emas. Qalamni oxirgi qatorning tagiga qo'yasiz. Eski gap turadi, yangisi ostiga tushadi.",
          "Qalamdagi siyoh darrov qog'ozga singmasligi mumkin. `close` yoki qalamni qo'yib yuborish (obyekt o'lishi) siyohni qog'ozga bosadi. Dastur odatiy `return` bilan tugasa, lokal qalam o'zi qo'yiladi. Qog'oz diskda qoladi, dastur xotirasi ketadi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`#include <fstream>`. `std::ofstream` chiqish fayli. `<<` konsoldagi kabi ishlaydi, faqat manzil ekran emas, fayl. Fayl yo'li qo'shtirnoq ichida matn. Bu bobda nisbiy nom ishlatamiz: `sonlar.txt`.",
        ],
        items: [
          {
            title: "Ochish, yozish, yopish",
            paragraphs: [
              "`std::ofstream fayl(\"sonlar.txt\");` faylni ochadi. Papka bor bo'lsa va ruxsat bo'lsa, fayl yo'q bo'lsa yaratiladi. Papkaning o'zi yo'q bo'lsa, ochish muvaffaqiyatsiz. Dastur papka yaratmaydi.",
              "Ochish darrov eski mazmunni o'chiradi. Bu sukutdagi `out | trunc`. Hech narsa yozmasdan `close` qilsangiz ham, muvaffaqiyatli ochilgan eski fayl bo'sh qoladi. Qo'shish kerak bo'lsa, ikkinchi argument `std::ios::app`.",
              "`if (!fayl)` ochish muvaffaqiyatsiz. `failbit` qo'yilgan. Yozishni davom ettirmang. Muvaffaqiyatli oqimda `fayl << \"Ali\" << 18;` ishlaydi. `close()` buferni chiqaradi va faylni yopadi. Ikkinchi `close` yangi saqlash emas. Oqim allaqachon yopiq bo'lsa, `close` muvaffaqiyatsiz holat qo'yishi mumkin.",
            ],
            code: `std::ofstream fayl("sonlar.txt");
if (!fayl) {
    return 1;
}
fayl << "Ali{{n}}";
fayl.close();`,
            codeLabel: "ochish, tekshiruv, yozish, yopish",
            table: {
              caption: "ofstream ochish rejimi. Ikkinchi argument berilmasa, out va trunc birga turadi.",
              headers: ["Rejim", "Mavjud fayl", "Yo'q fayl"],
              rows: [
                ["sukut, trunc", "mazmun o'chadi", "yaratiladi"],
                ["std::ios::app", "oxiriga qo'shiladi", "yaratiladi"],
              ],
            },
          },
          {
            title: "Matn, xom son emas",
            paragraphs: [
              "`fayl << 18` faylga 4 baytlik `int` yozmaydi. U belgilar `1` va `8` yozadi. Keyingi `\"\\n\"` qator tugatadi. O'qiyotgan odam ham, keyingi `>>` ham shu belgilarni ko'radi.",
              "Windows matn rejimida dasturdagi `\\n` diskda ko'pincha qaytish va qator (`\\r\\n`) bo'lib yoziladi. O'qishda kutubxona uni yana bitta qator tugashi deb qaytaradi. Baytni qo'lda sanab, fayl hajmi 4 edi demang. Bu bob matn rejimi.",
              "`\\n` fayl buferini majburan bo'shatishni va'da qilmaydi. `std::endl` qator qo'yadi va buferni chiqaradi. Oddiy yozuvda `\\n` yetarli, saqlashni `close` yoki obyektning o'limi qiladi.",
            ],
            code: `fayl << "Ali{{n}}";
fayl << 18 << "{{n}}";`,
            codeLabel: "ikkala yozuv ham matn",
          },
          {
            title: "Qachon diskda qoladi",
            paragraphs: [
              "`ofstream` obyektining o'zi fayl mazmuni emas. Ichida bufer va tizim tutqichi bor. `<<` avval buferga yig'ishi mumkin. `close` yoki destruktor buferni tizimga beradi va tutqichni yopadi.",
              "Lokal obyekt blok tugaganda o'ladi. `return` dan oldin `main` ning lokallari ham o'ladi. Shuning uchun odatiy tugashda ochiq qolgan `ofstream` yopiladi va muvaffaqiyatli yozuv saqlanadi. Ichki blok erta tugasa, fayl dastur hali ishlayotganda ham allaqachon yopilgan bo'ladi.",
              "`std::exit` lokal obyektlarni o'ldirmaydi. Yopilmagan bufer diskka tushmasligi mumkin. Saqlash uchun `exit` ga tayanmang. `return` yoki aniq `close` ishlating. Yo'l nisbiy bo'lsa, u manba fayl turgan papka emas, dasturning joriy papkasi. Muhit boshqa papkadan ishga tushirsa, `sonlar.txt` kutilmagan joyda paydo bo'ladi.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Ali va 18 yoziladi, ekranda yozildi",
          intro: [
            "Fayl ochiladi, ikki qator matn yoziladi, `close` saqlaydi. Dastur ekranga faqat `yozildi` chiqaradi. Fayl ichida `Ali`, keyin `18` turadi.",
          ],
          codeLabel: "yozish.cpp",
          code: `#include <fstream>
#include <iostream>

int main() {
    std::ofstream fayl("sonlar.txt");
    if (!fayl) {
        std::cout << "ochilmadi{{n}}";
        return 1;
    }
    fayl << "Ali{{n}}";
    fayl << 18 << "{{n}}";
    fayl.close();
    std::cout << "yozildi{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `yozildi`,
          analysis: [
            {
              lines: "5-9",
              text: "Joriy papkada `sonlar.txt` ochiladi. Eski mazmun shu zahoti o'chadi. Ochilmasa, ekranda ochilmadi va dastur 1 bilan to'xtaydi. Yozish qatorlari yugurmaydi.",
            },
            {
              lines: "10-11",
              text: "Birinchi yozuv belgilar A, l, i va qator tugashi. Ikkinchisi belgilar 1 va 8, yana qator tugashi. 18 xom 4 bayt emas. `\\n` buferni majburan bo'shatmaydi.",
            },
            {
              lines: "12",
              text: "`close` buferni chiqaradi va faylni yopadi. Shu paytda diskdagi matn `Ali`, keyingi qatorda `18`. Dastur hali 13-qatorda.",
            },
            {
              lines: "13-14",
              text: "Ekranda yozildi. Fayl konsol emas. Uni ko'rish uchun keyin `ifstream` kerak, 12.2. `return` lokalni yo'q qiladi. Fayl allaqachon yopilgan.",
            },
          ],
        },
        {
          title: "trunc birni yozadi, app ikki ni qo'shadi",
          intro: [
            "Birinchi ochish `bir` ni yozadi va blok tugashi bilan yopiladi. Ikkinchi ochish `app`, `ikki` ni oxiriga qo'yadi. O'qish ikkala qatorni ham chiqaradi.",
          ],
          codeLabel: "qoshish.cpp",
          code: `#include <fstream>
#include <iostream>
#include <string>

int main() {
    {
        std::ofstream fayl("qatorlar.txt");
        if (!fayl) {
            std::cout << "ochilmadi{{n}}";
            return 1;
        }
        fayl << "bir{{n}}";
    }
    {
        std::ofstream fayl("qatorlar.txt", std::ios::app);
        if (!fayl) {
            std::cout << "ochilmadi{{n}}";
            return 1;
        }
        fayl << "ikki{{n}}";
    }
    std::ifstream kirish("qatorlar.txt");
    std::string qator;
    while (std::getline(kirish, qator)) {
        std::cout << qator << "{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `bir
ikki`,
          analysis: [
            {
              lines: "6-13",
              text: "Sukutdagi ochish faylni bo'shatadi va `bir` yozadi. 13-qatorda obyekt o'ladi, destruktor yopadi. `bir` shu yerdayoq diskda. `close` qo'lda yozilmagan.",
            },
            {
              lines: "14-21",
              text: "`std::ios::app` eski `bir` ni o'chirmaydi. `ikki` oxiriga yoziladi. Blok tugashi yana destruktor bilan yopadi. `app` bo'lmasa, ikkinchi ochish `bir` ni yo'qotardi va faylda faqat `ikki` qolardi.",
            },
            {
              lines: "22-26",
              text: "`ifstream` yozuv yopilgandan keyin o'sha faylni o'qiydi. `getline` qator tugashini satrga qo'ymaydi. `cout` uni qayta qo'yadi. Ekranda bir, keyin ikki.",
            },
            {
              lines: "27",
              text: "Odatiy `return`. Ikki yozuv obyekti allaqachon o'lgan. O'qish obyekti ham shu `return` da yopiladi. Fayl papkada qoladi, dastur xotirasi ketadi.",
            },
          ],
        },
        {
          title: "Blok tugashi faylni dasturdan oldin yopadi",
          intro: [
            "Ichki blok bitadi, keyin ekranga `fayl yopildi` chiqadi. O'shanda matn allaqachon diskda. Keyingi o'qish `saqlangan` ni topadi.",
          ],
          codeLabel: "saqlash.cpp",
          code: `#include <fstream>
#include <iostream>
#include <string>

int main() {
    {
        std::ofstream fayl("xotira.txt");
        fayl << "saqlangan{{n}}";
    }
    std::cout << "fayl yopildi{{n}}";
    std::ifstream kirish("xotira.txt");
    std::string qator;
    std::getline(kirish, qator);
    std::cout << qator << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `fayl yopildi
saqlangan`,
          analysis: [
            {
              lines: "6-9",
              text: "Yozuv obyekti faqat ichki blokda yashaydi. 8-qator buferga `saqlangan` va qator tugashini qo'yadi. 9-qator obyektni o'ldiradi. Destruktor yopadi va buferni chiqaradi.",
            },
            {
              lines: "10",
              text: "Ekranda fayl yopildi. Dastur hali tugamagan. Fayl shunga qaramay allaqachon yopilgan, chunki qalam obyekti yo'q.",
            },
            {
              lines: "11-14",
              text: "Yangi o'qish obyekti diskdagi matnni oladi. `getline` `saqlangan` ni qaytaradi, qator tugashisiz. Ekranda saqlangan. Bu dastur xotirasidagi vaqtinchalik satr emas, yopilgan fayldan kelgan o'qish.",
            },
            {
              lines: "15",
              text: "`return` o'qish obyektini ham yopadi. `xotira.txt` papkada qoladi. Agar yozuv `std::exit` bilan blokni tashlab ketsa, lokal destruktor yugurmaydi va bufer tushmasligi mumkin. Odatiy `return` bunday qilmaydi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`std::ofstream fayl(\"sonlar.txt\")` stekda oqim obyektini ochadi. Uning ichida bufer va operatsion tizim tutqichi bor. Faylning to'liq matni shu obyektning ichiga sig'maydi. Matn diskdagi faylda, dastur yopilganda ham shu papkada qoladi.",
          "`fayl << \"Ali\"` belgilarni avval buferga qo'yishi mumkin. Hali `close` bo'lmasa, diskdagi fayl bir zum bo'sh yoki yarim ko'rinishi mumkin. `close` yoki destruktor buferni tutqich orqali chiqaradi, keyin tutqichni yopadi. Obyektning o'zi keyin stekdan ketadi. Diskdagi baytlar ketmaydi.",
          "`fayl << 18` buferga `'1'` va `'8'` qo'yadi. `int` ning 4 bayti faylga ko'chirilmaydi. Windows matn rejimida qator tugashi diskda ikki belgi bo'lib ketishi mumkin. O'qish kutubxonasi dasturga yana bitta qator deb beradi.",
          "Ikkinchi `ofstream` xuddi shu nomni `app` siz ochsa, tizim fayl uzunligini 0 qiladi. Eski baytlar shu ochishda tashlanadi. `app` uzunlikni tegmasdan yozuvni oxiriga qo'yadi. Nisbiy nom joriy papkaga yopishadi. Manba kodi turgan papka boshqa bo'lishi mumkin.",
        ],
        diagram: `ofstream fayl
  bufer:  A l i  qator
  tutqich -> sonlar.txt

close yoki destruktor
  bufer diskka tushadi
  tutqich yopiladi
  obyekt ketadi

diskda qoladi
  Ali
  18

app yo'q ikkinchi ochish
  uzunlik 0, eski matn ketadi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Yozish xatosi eski faylni tasodifan bo'shatish, `\\n` ni saqlash deb o'ylash yoki yo'lni manba papkasida qidirish.",
        ],
        items: [
          {
            title: "Qo'shish o'rniga trunc ochish",
            why: [
              "Ikkinchi oddiy `ofstream` ochilishi bilan eski qatorlar o'chadi. Hech narsa yozmasangiz ham fayl bo'sh. Oxiriga qo'shish uchun `std::ios::app`.",
            ],
            wrong: `std::ofstream fayl("qatorlar.txt");
fayl << "ikki{{n}}";`,
            right: `std::ofstream fayl("qatorlar.txt", std::ios::app);
fayl << "ikki{{n}}";`,
          },
          {
            title: "Yangi qatorni saqlash deb bilish",
            why: [
              "`<< \"\\n\"` buferga qator tugashini qo'yadi. Diskka tushish `close`, `endl` yoki obyekt o'limida. Yozuvdan darrov dasturni sindirish buferni tashlab ketishi mumkin. Odatiy `return` lokallarni yopadi.",
            ],
            wrong: `fayl << "Ali{{n}}";`,
            right: `fayl << "Ali{{n}}";
fayl.close();`,
          },
          {
            title: "Faylni .cpp yonida deb qidirish",
            why: [
              "`\"sonlar.txt\"` joriy papka. Muhit dastlabki kod papkasidan boshqa joyda ishga tushirsa, fayl o'sha joriy papkada yaratiladi. Ochilmasa, papka yo'q yoki ruxsat yo'q. Alohida oyna va'da qilinmaydi. `if (!fayl)` ni o'qing.",
            ],
            wrong: `std::ofstream fayl("sonlar.txt");
fayl << "Ali{{n}}";`,
            right: `std::ofstream fayl("sonlar.txt");
if (!fayl) {
    std::cout << "ochilmadi{{n}}";
    return 1;
}
fayl << "Ali{{n}}";`,
          },
        ],
      },
      quiz: [
        {
          id: "12.1-q1",
          question: "Mavjud `sonlar.txt` oddiy `std::ofstream` bilan ochilsa, eski matn nima bo'ladi?",
          options: [
            "oxiriga qo'shiladi",
            "ochishda o'chadi, yangi yozuv boshidan",
            "fayl bor bo'lsa, ochish muvaffaqiyatsiz",
            "faqat o'qiladi, yozuv tushmaydi",
          ],
          answer: 1,
          explanation:
            "Sukutdagi rejim trunc. Muvaffaqiyatli ochish uzunlikni 0 qiladi. Qo'shish uchun std::ios::app kerak.",
        },
        {
          id: "12.1-q2",
          question: "`fayl << 18` faylga nima yozadi?",
          options: [
            "4 baytlik int",
            "belgilar 1 va 8",
            "sonni o'chiradi",
            "kod yig'ilmaydi",
          ],
          answer: 1,
          explanation:
            "ofstream << matn yozadi. 18 ikki belgi. Xom xotira nusxasi emas. Qator uchun alohida yangi qator kerak.",
        },
        {
          id: "12.1-q3",
          question: "Ichki blokdagi `ofstream` blok tugashi bilan yo'qoldi. Dastur hali `cout` qilyapti. Yozuv qayerda?",
          options: [
            "faqat dastur butunlay tugaganda saqlanadi",
            "blok tugaganda destruktor yopgan, diskda bor",
            "endl bo'lmagani uchun yo'qoladi",
            "close qo'lda yozilmasa, hech qachon saqlanmaydi",
          ],
          answer: 1,
          explanation:
            "Lokal ofstream blok oxirida o'ladi. Destruktor buferni chiqarib, faylni yopadi. return ham lokallarni yopadi. std::exit ularni yopmaydi.",
        },
      ],
    },
    {
      id: "12.2",
      navTitle: "ifstream",
      title: "ifstream: qator, so'z va ochilmagan fayl",
      goal: [
        "Bu darsdan keyin siz `std::ifstream` ni ochishdan keyin darrov tekshirasiz. `std::getline` bitta qatorni, qator tugashisiz, satrga oladi. `>>` bo'sh joygacha bo'lgan so'z yoki sonni oladi. Fayl yo'q bo'lsa, oqim yig'ilishda emas, ochishda muvaffaqiyatsiz bo'lishini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Yozilgan daftar javonda. `ifstream` daftarni o'qish uchun ochadi. Javonda daftar yo'q bo'lsa, sahifa o'qimaysiz. Avval «ochildimi?» deb qaraysiz. Ochilmagan daftardan birinchi qatorni kutmaysiz.",
          "`getline` ko'zngni qator oxirigacha yurgizadi va qatorning o'zini daftardan ko'chiradi. Qator tugashi yangi qog'ozga yozilmaydi. Keyingi chaqiruv keyingi qatordan boshlaydi. Bo'sh qator ham qator: ko'chirma bo'sh matn, xato emas.",
          "`>>` qator emas, bo'sh joygacha bo'lgan bo'lak. Probeldagi ikki so'z ikki marta o'qiladi. Yangi qator ham bo'sh joy. «10 20» va keyingi qatordagi «30» uchta son. Qator cheti bu rejimda devor emas.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`std::ifstream kirish(\"ismlar.txt\");` o'qish uchun ochadi. Fayl yo'q bo'lsa, yaratilmaydi. `if (!kirish)` ni yozuvdan oldin, birinchi o'qishdan oldin qo'ying. `#include <fstream>` va satr uchun `#include <string>`.",
        ],
        items: [
          {
            title: "Ochish tekshiruvi",
            paragraphs: [
              "`if (!kirish)` `failbit` borligini aytadi. Yangi ochilgan oqimda bu ochish muvaffaqiyatsiz degani. `is_open()` ham shu paytda yopiq. Sabab yo'l noto'g'ri, joriy papka boshqa, fayl emas papka, yoki ruxsat yo'q bo'lishi mumkin. Kutubxona alohida oyna ochmaydi.",
              "Tekshiruvni o'qishdan keyin qilmang. O'qish ham `failbit` qo'yadi, fayl tugaganda. U paytdagi `!kirish` «fayl ochilmagan» emas, «yana o'qib bo'lmadi». Ochish savolini ochish qatorining yonida bering.",
              "`yoq.txt` joriy papkada yo'q bo'lsa, konsol `ochilmadi`. Tasodifan shu nomli fayl turgan bo'lsa, ochiladi. Namuna shu fayl yo'q deb hisoblangan holat.",
            ],
            code: `std::ifstream kirish("yoq.txt");
if (!kirish) {
    std::cout << "ochilmadi{{n}}";
    return 1;
}`,
            codeLabel: "o'qishdan oldin tekshiruv",
            table: {
              caption: "Yangi oqim, hali o'qish yo'q. Ikki tekshiruv shu paytda bir xil javob beradi.",
              headers: ["Holat", "!kirish", "is_open()"],
              rows: [
                ["fayl ochildi", "yolg'on", "rost"],
                ["fayl topilmadi", "rost", "yolg'on"],
              ],
            },
          },
          {
            title: "getline qatorni oladi",
            paragraphs: [
              "`std::getline(kirish, qator)` keyingi qator tugashigacha o'qiydi. `qator` ichida `\\n` qolmaydi. `\"Ali\"` ning uzunligi 3. Sikl `while (std::getline(kirish, qator))`. Chaqiruv muvaffaqiyatli bo'lsa, tana yuguradi.",
              "Fayl tugaganda keyingi `getline` muvaffaqiyatsiz va sikl to'xtaydi. Oxirgi muvaffaqiyatli qator allaqachon chiqarilgan. Ortiqcha bo'sh aylanish yo'q. Fayl oxirida qator tugashi bo'lmasa ham, oxirgi bo'lak o'qilgan bo'lsa, shu chaqiruv muvaffaqiyatli.",
              "O'rtadagi bo'sh qator haqiqiy bo'sh satr. Sikl to'xtamaydi. `while (!kirish.eof())` esa yomon: tugash bayrog'i muvaffaqiyatsiz o'qishdan keyin qo'yiladi, tana bitta ortiqcha marta kiradi. Tayyor satrni ishlatmang, avval chaqiruv o'zi rost bo'lsin.",
            ],
            code: `std::string qator;
while (std::getline(kirish, qator)) {
    std::cout << qator << "{{n}}";
}`,
            codeLabel: "qator tugashi satrga kirmaydi",
          },
          {
            title: ">> so'z va son",
            paragraphs: [
              "`kirish >> son` oldingi bo'sh joylarni tashlab, bitta butun son o'qiydi. Probel ham, qator tugashi ham bo'sh joy. `\"10 20\\n30\\n\"` uchta muvaffaqiyatli o'qish: 10, 20, 30. Sikl `while (kirish >> son)`.",
              "`std::string soz; kirish >> soz` bitta so'z. `Ali Vali` ikki so'z. Qator bo'linishi kerak bo'lsa, `>>` ishlatmang, `getline` ishlating.",
              "`>>` qator tugashini oqimda qoldiradi. Darrov keyingi `getline` shu qolgan tugashni bo'sh qator deb o'qiydi. Uzunlik 0. 8.6 dagi `cin` qoidasi faylda ham shu. Sonni `>>` bilan, qolgan qatorni `getline` bilan olmoqchi bo'lsangiz, oradagi bo'sh o'qishni biling yoki ikkala usulni aralashtirmang.",
            ],
            code: `int son;
while (kirish >> son) {
    std::cout << son << "{{n}}";
}`,
            codeLabel: "bo'sh joy so'z chegarasi",
          },
        ],
      },
      examples: [
        {
          title: "Ikki qator, Ali keyin Vali",
          intro: [
            "Dastur avval faylga ikki qator yozib yopadi, keyin `getline` bilan o'qiydi. Ekranda Ali, keyin Vali. Satr ichida qator tugashi yo'q.",
          ],
          codeLabel: "qator.cpp",
          code: `#include <fstream>
#include <iostream>
#include <string>

int main() {
    {
        std::ofstream chiqish("ismlar.txt");
        chiqish << "Ali{{n}}";
        chiqish << "Vali{{n}}";
    }
    std::ifstream kirish("ismlar.txt");
    if (!kirish) {
        std::cout << "ochilmadi{{n}}";
        return 1;
    }
    std::string qator;
    while (std::getline(kirish, qator)) {
        std::cout << qator << "{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `Ali
Vali`,
          analysis: [
            {
              lines: "6-10",
              text: "Yozuv blokda tugaydi, destruktor faylni yopadi. Diskda ikki qator: Ali va Vali. Bu tayyorgarlik. O'qish 11-qatordan.",
            },
            {
              lines: "11-15",
              text: "`ifstream` o'sha faylni ochadi. Ochilmasa, ochilmadi va `return 1`. Muvaffaqiyatli yo'lda bu tana yugurmaydi. Tekshiruv birinchi `getline` dan oldin.",
            },
            {
              lines: "16-19",
              text: "Birinchi `getline` `Ali` ni oladi, uzunligi 3, `\\n` yo'q. Ikkinchisi `Vali`. Uchinchi chaqiruv fayl tugaganini ko'radi va sikl to'xtaydi. Ekranga `cout` qator tugashini qayta qo'yadi.",
            },
            {
              lines: "20",
              text: "`return` o'qish obyektini yopadi. `ismlar.txt` o'chmaydi. `while (!kirish.eof())` bo'lsa, tugashdan keyin yana bitta tana kirishi mumkin. Bu sikl chaqiruvning o'zi bilan to'xtaydi.",
            },
          ],
        },
        {
          title: "10, 20 va 30 uchta son",
          intro: [
            "Faylda `10 20`, keyingi qatorda `30`. `>>` probelni ham, qator tugashini ham chegara deb o'tkazib yuboradi. Ekranda uchta son, har biri o'z qatorida.",
          ],
          codeLabel: "soz.cpp",
          code: `#include <fstream>
#include <iostream>

int main() {
    {
        std::ofstream chiqish("sonlar.txt");
        chiqish << "10 20{{n}}";
        chiqish << "30{{n}}";
    }
    std::ifstream kirish("sonlar.txt");
    int son;
    while (kirish >> son) {
        std::cout << son << "{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `10
20
30`,
          analysis: [
            {
              lines: "5-9",
              text: "Matn yoziladi: belgilar 1, 0, probel, 2, 0, qator, 3, 0, qator. Bu xom sonlar massivi emas. Blok tugashi yozuvni yopadi.",
            },
            {
              lines: "10-11",
              text: "O'qish ochiladi. `son` hali o'qilmagan. Sikl sharti birinchi `>>` ni o'zi qiladi. Muvaffaqiyatsiz bo'lsa, tana kirmaydi va yozilmagan `son` chiqmaydi.",
            },
            {
              lines: "12-14",
              text: "Birinchi o'qish 10, probel to'xtatadi. Ikkinchisi 20, qator tugashi to'xtatadi. Uchinchisi 30. To'rtinchisi fayl tugashi, sikl chiqadi. Ekranda 10, 20, 30.",
            },
            {
              lines: "15",
              text: "`return` o'qishni yopadi. `getline` ishlatilsa, birinchi chaqiruv butun `10 20` satrini bitta qator qilib olardi, 10 va 20 ikki son bo'lib ajralmasdi.",
            },
          ],
        },
        {
          title: "yoq.txt yo'q, ekranda ochilmadi",
          intro: [
            "Joriy papkada `yoq.txt` yo'q. O'qish ochilmaydi. Dastur birinchi o'qishga kirmaydi va `ochilmadi` yozadi.",
          ],
          codeLabel: "yoq.cpp",
          code: `#include <fstream>
#include <iostream>

int main() {
    std::ifstream kirish("yoq.txt");
    if (!kirish) {
        std::cout << "ochilmadi{{n}}";
        return 1;
    }
    std::cout << "ochildi{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `ochilmadi`,
          analysis: [
            {
              lines: "5",
              text: "`ifstream` faylni yaratmaydi. Joriy papkada `yoq.txt` bo'lmasa, ochish muvaffaqiyatsiz va `failbit` qo'yiladi. Bu yig'ilish xatosi emas.",
            },
            {
              lines: "6-8",
              text: "`!kirish` rost. Ekranda ochilmadi. `return 1` oddiy chiqish. Hech qanday qator o'qilmaydi, chunki o'qish qatori shu yerdan keyin.",
            },
            {
              lines: "10",
              text: "Bu qator shu holatda yugurmaydi. Agar joriy papkada tasodifan `yoq.txt` bo'lsa, ochildi chiqadi. Namuna konsoli fayl yo'q deb olingan.",
            },
            {
              lines: "11",
              text: "Muvaffaqiyatli ochilganda shu `return` o'qish obyektini yopadi. Ochilmagan oqimda yopish yangi fayl yaratmaydi. `ofstream` esa yo'q faylni yaratardi. Ikki sinf bir xil emas.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`ifstream` ham stekdagi oqim. Muvaffaqiyatli ochilsa, tutqich diskdagi faylni ko'rsatadi. Fayl baytlari obyekt ichiga ko'chirilmaydi. O'qish so'ralgan bo'lakni bufer orqali olib, sizning `string` yoki `int` ingizga qo'yadi.",
          "`getline` diskdagi qatorni `std::string` ga nusxalaydi va qator tugashini tashlaydi. `Ali` uchun satr uzunligi 3. Windows diskda `\\r\\n` turgan bo'lsa, matn rejimi o'qishda qator tugashini bitta chegara deb beradi. Satr ichida `\\r` qolmaydi, odatiy matn faylida.",
          "`>>` son uchun belgilarni yig'ib, `int` qiymat yasaydi. `10` ikki belgidan 10 soniga aylanadi. Probel va qator tugashi chegarada qoladi, keyingi `>>` ularni tashlab o'tadi. `getline` esa qolgan qator tugashini bo'sh satr qilib oladi, agar `>>` dan darrov keyin kelsa.",
          "Ochish muvaffaqiyatsiz bo'lsa, tutqich yo'q, `failbit` bor. Hech qanday qator xotiraga kelmaydi. Fayl tugaganda esa tutqich bor edi, keyingi o'qish `eofbit` va `failbit` qo'yadi. Bayroq «ochilmagan» degani emas. Obyekt `return` da ketadi, diskdagi fayl qoladi.",
        ],
        diagram: `disk: ismlar.txt
  Ali / qator / Vali / qator

getline
  string qator [A l i]   uzunlik 3
  keyin [V a l i]

>>  "10 20" va keyin "30"
  int son = 10
  int son = 20
  int son = 30

yoq.txt yo'q
  tutqich yo'q
  failbit
  string ga hech narsa kelmaydi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "O'qish xatosi ochilmagan fayldan qator kutish, `eof` bilan sikl yozish yoki `>>` dan keyin `getline` bo'sh qator olishini ko'rmaslik.",
        ],
        items: [
          {
            title: "Ochishni tekshirmasdan o'qish",
            why: [
              "Fayl yo'q bo'lsa, `getline` muvaffaqiyatsiz. Satrga yangi qator kelmaydi. Jim o'tib ketish «bo'sh fayl» ga o'xshab ketadi. Ochish yonida `if (!kirish)` qo'ying.",
            ],
            wrong: `std::ifstream kirish("yoq.txt");
std::string qator;
std::getline(kirish, qator);
std::cout << qator << "{{n}}";`,
            right: `std::ifstream kirish("yoq.txt");
if (!kirish) {
    std::cout << "ochilmadi{{n}}";
    return 1;
}`,
          },
          {
            title: "while (!eof) bilan oldin o'qimaslik",
            why: [
              "`eof` muvaffaqiyatsiz o'qishdan keyin rost bo'ladi. Shartni oldin tekshirsangiz, tana oxirgi yomon o'qish bilan ham kiradi. `while (getline(...))` yoki `while (kirish >> son)` chaqiruv muvaffaqiyatini o'zi sinaydi.",
            ],
            wrong: `while (!kirish.eof()) {
    std::getline(kirish, qator);
    std::cout << qator << "{{n}}";
}`,
            right: `while (std::getline(kirish, qator)) {
    std::cout << qator << "{{n}}";
}`,
          },
          {
            title: ">> dan keyin getline bo'sh qator",
            why: [
              "Fayl `10`, keyin qator tugashi, keyin `Ali`. `>>` sonni oladi va qator tugashini qoldiradi. Darrov `getline` shu tugashni bo'sh satr deb o'qiydi, uzunligi 0. `Ali` keyingi `getline` da. Aralashmasangiz, bu bo'sh qator chiqmaydi.",
            ],
            wrong: `int son;
kirish >> son;
std::string qator;
std::getline(kirish, qator);`,
            right: `std::string qator;
while (std::getline(kirish, qator)) {
    std::cout << qator << "{{n}}";
}`,
          },
        ],
      },
      quiz: [
        {
          id: "12.2-q1",
          question: "Faylda `Ali` va qator tugashi bor. `std::getline` satrga nima qo'yadi?",
          options: ["Ali va qator tugashi", "Ali", "bo'sh satr", "kod yig'ilmaydi"],
          answer: 1,
          explanation:
            "getline qator tugashini satrga kiritmaydi. Ali ning uzunligi 3. Ekranga chiqarayotgan yangi qator cout niki.",
        },
        {
          id: "12.2-q2",
          question: "Fayl matni `10 20`, keyin qator, keyin `30`. `while (kirish >> son)` oxirgi muvaffaqiyatli son necha?",
          options: ["10", "20", "30", "ochilmadi"],
          answer: 2,
          explanation:
            ">> probelni ham, qator tugashini ham bo'sh joy deb o'tkazadi. Uchta son: 10, 20, 30. Keyingi o'qish to'xtatadi.",
        },
        {
          id: "12.2-q3",
          question: "`yoq.txt` joriy papkada yo'q. Ochishdan keyin, o'qishdan oldin `if (!kirish)` nima?",
          options: [
            "yolg'on, fayl bo'sh ochiladi",
            "rost, ochish muvaffaqiyatsiz",
            "rost, chunki eof",
            "kod yig'ilmaydi",
          ],
          answer: 1,
          explanation:
            "ifstream yo'q faylni yaratmaydi. failbit qo'yiladi, !kirish rost. eof bu yerda sabab emas. ofstream esa faylni yaratishga urinar edi.",
        },
      ],
    },
  ],
};

export const chapter12 = decode(rawChapter);
