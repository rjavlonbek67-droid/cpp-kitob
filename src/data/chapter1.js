const BS = String.fromCharCode(92);

function decode(value) {
  if (typeof value === "string") {
    return value.split("{{n}}").join(BS + "n").split("{{t}}").join(BS + "t");
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
  id: "1",
  number: 1,
  title: "Kompyuter va C++ poydevori",
  summary:
    "Kompyuter ichidagi 0 va 1 dan tortib, birinchi dastur, izoh va xato turlarigacha.",
  lessons: [
    {
      id: "1.1",
      navTitle: "Dasturlash va 0/1",
      title: "Dasturlash nima? Kompyuter 0 va 1 larni qanday tushunadi",
      goal: [
        "Bu darsdan keyin siz dasturlashni «kompyuterga sehrli so'z aytish» emas, aniq buyruq yozish ekanini tushuntira olasiz. Tranzistor, bit va bayt nima, harf xotirada qanday yotadi, nega `'A'` va `65` ichkarida bir xil naqsh bo'lishi mumkin — shularni qo'lda hisoblab ko'rsata olasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Oshxonani ko'z oldingizga keltiring. Devorda sakkizta yorug'lik kaliti bor. Har bir kalit faqat ikki holatni biladi: pastga tushgan yoki ko'tarilgan. Pastga — tok o'tmaydi. Ko'tarilgan — tok o'tadi. Kompyuter ham shunday ishlaydi, faqat kalitlar milliardlab va ular soch tolasidan ham kichik.",
          "Oshpaz retseptni o'qib, o'zi qaror qo'shishi mumkin: tuz ozgina kamday, olovni biroz pasaytiraman. Kompyuter oshpaz emas. U retseptdan chiqmaydi. Siz «taxminan shunday qil» deb yozolmaysiz. Har bir qadam aniq bo'lishi kerak: qaysi sonni ol, qaysi songa qo'sh, natijani qayerga yoz, ekranga nimani chiqar.",
          "Dasturlash — ana shu ko'r-ko'rona bajaruvchi uchun retsept yozish. Retsept odam tiliga yaqin bo'lsa, uni C++ deb ataymiz. Kompyuterning o'zi esa retseptni o'qimaydi. U faqat kalitlarning ochiq-yopiq holatini, ya'ni 0 va 1 ni bajaradi. O'rtadagi tarjimon — kompilyator. Uni keyingi darsda ochamiz. Hozir savol boshqacha: 0 va 1 ning o'zi nima?",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Bu darsda yangi sintaksis yodlashdan ko'ra, kompyuter ma'lumotni qanday ushlab turishini yodlang. Keyingi barcha dasturlar shu poydevorga tayanadi. Quyidagi dasturlarda `main` va `#include` ko'rinadi. Ularning har bir belgisini 1.4-darsda boltacha yechamiz. Hozir kod — bitni ko'z bilan ko'rish uchun oyna.",
        ],
        items: [
          {
            title: "Dastur — aniq buyruqlar ketma-ketligi",
            paragraphs: [
              "Dastur matn fayl. Ichida buyruqlar bor: qiymatni saqla, hisobla, ekranga yoz, shu shart to'g'ri bo'lsa boshqa yo'lga o't. Kompyuter «aqlli» emas. U juda tez va juda itoatkor. Noto'g'ri buyruqni ham, to'g'risini ham bir xil jidduyat bilan bajaradi.",
              "C++ — kompilyatsiya qilinadigan til. Siz yozgan matn avval mashina kodiga aylantiriladi, keyin ishga tushadi. Python kabi tillarda ko'pincha interpretator qatorni o'qib, darhol bajaradi. Ikkalasi ham dasturlash. Farq shundaki, C++ da xato ko'pincha ishga tushishdan oldin ushlanadi, ishlayotgan dastur esa protsessorga yaqin turadi. Shuning uchun o'yinlar, brauzerlar, operatsion tizim bo'laklari C++ da yoziladi.",
            ],
          },
          {
            title: "Tranzistor — bitning jismoniy kaliti",
            paragraphs: [
              "Protsessor ichidagi tranzistor (zamonaviy chiplarda bu MOSFET) raqamli sxemada kalit sifatida ishlatiladi. Yopiq holatda tok deyarli o'tmaydi, buni **0** deb olamiz. Ochiq holatda tok o'tadi, buni **1** deb olamiz. Aniq voltni yodlash shart emas: past kuchlanish 0, yuqori kuchlanish 1. Turli chiplarda «yuqori» turlicha, ko'pincha 1 voltdan ham kichik.",
              "Bir tranzistor bir bitni ushlab turadi. Zamonaviy protsessorda milliardlab tranzistor bor. Ular bir-biriga mantiqiy sxema bo'lib ulangan: qo'shish, solishtirish, xotiradan o'qish. Siz C++ da `a + b` deb yozsangiz, pastda shu sxemalar ishlaydi. Siz tranzistor chizmaysiz. Lekin «kompyuter so'zni tushunadi» degan tasavvur shu yerda sinadi: u so'zni emas, kalitlar holatini bajaradi.",
            ],
          },
          {
            title: "Bit va bayt",
            paragraphs: [
              "**Bit** — binary digit, ikkilik raqam. Qiymati faqat 0 yoki 1. Bitta bit 2 xil holat. Ikki bit 4 xil: 00, 01, 10, 11. Har yangi bit kombinatsiyani ikki baravar oshiradi.",
              "**Bayt** — 8 bit. `2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = 256`. Bir bayt 0 dan 255 gacha, jami 256 xil qiymat sig'diradi. Xotiradagi eng kichik manzil odatda bit emas, bayt. «Shu uyda 8 ta kalit bor, uyning raqami manzil» deb o'ylang.",
              "Kattaroq o'lchovni hozir chuqur yodlash shart emas, lekin eshitib qo'ying: xotirada 1 KB odatda 1024 bayt, chunki 1024 = 2 ning 10-darajasi. Do'konda diskni 1000 ga yaqin hisoblab yozishlari mumkin. Bizning darsda yetarli qoida bitta: **1 bayt = 8 bit**.",
            ],
          },
          {
            title: "O'nlik sonni 8 bitga qo'lda yoyish",
            paragraphs: [
              "Sakkizta bitning og'irligi o'ngdan chapga 1, 2, 4, 8, 16, 32, 64, 128. Istalgan sonni shu toshlar bilan yig'asiz. Har bir toshni bir marta ishlatasiz yoki umuman ishlatmaysiz. Ishlatilgan joy 1, qolgani 0.",
              "`65` ni yoyamiz. 128 sig'maydi, o'sha bit 0. 64 sig'adi, bit 1, qoldiq 1. 32, 16, 8, 4, 2 sig'maydi. 1 sig'adi. Natija: `01000001`. Bu `'A'` harfining odatiy kodi.",
            ],
            table: {
              caption: "'A' (65) bitlarga yoyilganda. 64 + 1 = 65.",
              headers: ["Og'irlik", "128", "64", "32", "16", "8", "4", "2", "1"],
              rows: [["Bit", "0", "1", "0", "0", "0", "0", "0", "1"]],
            },
          },
          {
            title: "Harf ham, son ham ichkarida bayt",
            paragraphs: [
              "Kompyuterda alohida «harf moddasi» yo'q. `'A'` — bu kelishuv. ASCII jadvalida katta A ga 65 soni berilgan. Xotirada 65 yotadi, ya'ni bitlar `01000001`. Ekranga chiqarayotganda tur ahamiyatli: `char` bo'lsa harf shakli, `int` bo'lsa raqamlar ko'rinadi. Bitlar o'zgarmaydi, talqin o'zgaradi.",
              "Kichik `a` boshqa son: 97. Belgi `'0'` (nolning rasmi) son 0 emas, u 48. Son 0 ning bitlari bo'sh, belgi noldagi bitlar esa `00110000`. Ekranda ikkalasi ham 0 ga o'xshaydi. Xotirada ular boshqa narsa. Bu adashish keyin `cin` va satrlar bilan qayta chiqadi, shuning uchun hozir ajrating.",
            ],
            table: {
              caption: "Yodlash shart bo'lmagan, lekin qo'l bilan tekshirib ko'riladigan kodlar.",
              headers: ["Yozilishi", "Nima", "O'nlik", "8 bit"],
              rows: [
                ["'A'", "katta harf", "65", "01000001"],
                ["'B'", "katta harf", "66", "01000010"],
                ["'a'", "kichik harf", "97", "01100001"],
                ["'0'", "nol belgisi", "48", "00110000"],
                ["' '", "bo'sh joy", "32", "00100000"],
              ],
            },
          },
        ],
      },
      examples: [
        {
          title: "65 va 'A' ekranda boshqacha, ichkarida qarindosh",
          intro: [
            "Birinchi dastur ikki narsani chiqaradi: avval 65 sonini, keyin `'A'` belgisini. Hozircha faylni kompilyatsiya qilmasangiz ham bo'ladi. Kodni o'qing va konsolni solishtiring. Muhitni 1.3-darsda sozlaymiz.",
          ],
          codeLabel: "harf.cpp",
          code: `#include <iostream>

int main() {
    std::cout << 65 << "{{n}}";
    std::cout << 'A' << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `65
A`,
          analysis: [
            {
              lines: "1",
              text: "`#include <iostream>` kompilyatorga `std::cout` nima ekanini aytadi. Bu qatorni 1.5-darsda to'liq ochamiz. Hozir: ekranga yozish vositasi shu kutubxonada.",
            },
            {
              lines: "3",
              text: "`int main()` dastur ishga tushganda bajariladigan kirish funksiyasi. `int` — u butun son qaytaradi. Figurali qavs ichidagi buyruqlar tartib bilan bajariladi.",
            },
            {
              lines: "4",
              label: "65",
              text: "`std::cout << 65` sonni ekranga yozadi. 65 bu yerda `int` ga o'xshash son. Uning o'nlik yozuvi 65, ikkilik yozuvi `01000001` (sakkiz bitga sig'dirilsa). `<<` «shu qiymatni chiqish oqimiga qo'y» degani. Oxiridagi `{{n}}` yangi qator so'raydi. Nuqta-vergul operatorni tugatadi.",
            },
            {
              lines: "5",
              label: "'A'",
              text: "`'A'` bitta belgi. Qo'shtirnoq emas, birtirnoq. ASCII bo'yicha uning kodi 65. `cout` turini ko'rib, sonni emas, harf shaklini chizadi. Shuning uchun konsolda `A` chiqadi, `65` emas. Ikkinchi `{{n}}` kursoru keyingi qatorga tushiradi.",
            },
            {
              lines: "6",
              text: "`return 0` funksiyani tugatadi va operatsion tizimga «muvaffaqiyatli tugadi» deb aytadi. 0 — odatdagi muvaffaqiyat kodi.",
            },
            {
              lines: "",
              label: "konsol",
              text: "Ikki qator: `65`, keyin `A`. Hech qanday qo'shimcha matn yo'q, chunki biz faqat shu ikki qiymatni yozdik. Vergul, izoh, tushuntirish konsolga o'zi chiqmaydi.",
            },
          ],
        },
        {
          title: "8 bit nega 256 xil qiymat sig'diradi",
          intro: [
            "Jadvalni yodlash o'rniga, dasturning o'zi 2 ni sakkiz marta ko'paytirsin. Tsikl yo'q, shuning uchun hisob ko'z oldingizda turadi.",
          ],
          codeLabel: "bayt.cpp",
          code: `#include <iostream>

int main() {
    int kombinatsiya = 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2;
    std::cout << "8 bit sig'diradi: " << kombinatsiya << "{{n}}";
    std::cout << "Eng katta qiymat: " << (kombinatsiya - 1) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `8 bit sig'diradi: 256
Eng katta qiymat: 255`,
          analysis: [
            {
              lines: "4",
              text: "`int` butun son saqlaydigan o'zgaruvchi. Nomi `kombinatsiya`. O'ng tomonda 2 sakkiz marta ko'payadi: 2, 4, 8, 16, 32, 64, 128, 256. Bu 2 ning 8-darajasi. Har bir ko'paytirish yangi bit qo'shilgandek.",
            },
            {
              lines: "5",
              text: "`cout` ga ketma-ket ikki narsa berilgan: avval satr, keyin son. Satr qo'shtirnoqda. Ichidagi so'zlar ekranga o'zi chiqadi. Son esa raqam bo'lib chiqadi. O'rtada bo'sh joy bor, u satrning o'zida yozilgan.",
            },
            {
              lines: "6",
              text: "`kombinatsiya - 1` qavsda, shuning uchun avval 256 − 1 hisoblanadi. 255 chiqadi. Nega 256 emas? Chunki 0 ham qiymat. 0 dan 255 gacha sanasangiz, 256 ta son chiqadi, eng kattasi 255. Sakkizta kalitning hammasi 1 bo'lsa: `11111111` = 255.",
            },
            {
              lines: "",
              label: "konsol",
              text: "Birinchi qator sig'imni, ikkinchisi shu sig'imdagi eng katta butun qiymatni ko'rsatadi. Dastur «256 xil narsa, lekin ulardan biri 0 bo'lgani uchun yuqori chegara 255» degan gapni son bilan tasdiqlaydi.",
            },
          ],
        },
        {
          title: "Son 0 va belgi '0' ekranda bir xil, xotirada emas",
          intro: [
            "Konsolning dastlabki ikki qatori sizni aldashga tayyor. Ikkalasi ham 0 ga o'xshaydi. Uchinchi qator niqobni yechadi.",
          ],
          codeLabel: "nol.cpp",
          code: `#include <iostream>

int main() {
    int son = 0;
    char belgi = '0';
    int kod = belgi;

    std::cout << son << "{{n}}";
    std::cout << belgi << "{{n}}";
    std::cout << kod << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `0
0
48`,
          analysis: [
            {
              lines: "4",
              text: "`son` — butun son, qiymati 0. Oddiy Windows kompyuterida `int` odatda 4 bayt, ya'ni 32 bit. Hammasi nol: o'ttiz ikkita 0. Bu «hech narsa yo'q» degan son.",
            },
            {
              lines: "5",
              text: "`belgi` — `char`, odatda 1 bayt. Unga son emas, belgi `'0'` berilgan. Birtirnoq muhim. Bu belgining kodi 48, bitlari `00110000`. Ya'ni xotirada nol emas, qirq sakkiz yotadi.",
            },
            {
              lines: "6",
              text: "`int kod = belgi` belgini songa kengaytiradi. 48 soni `kod` ga ko'chadi. Bu yerda `static_cast` yo'q, oddiy tayinlash yetadi. `char` dagi qiymat `int` ga sig'adi.",
            },
            {
              lines: "8-10",
              text: "8-qator `int` ni raqam qilib chiqaradi: `0`. 9-qator `char` ni belgi qilib chiqaradi: ko'rinishi ham `0`. 10-qator esa o'sha belgining kodini chiqaradi: `48`. Agar 9-qatorni ko'rib «bu ham son 0» desangiz, 10-qator e'tiroz bildiradi.",
            },
            {
              lines: "",
              label: "konsol",
              text: "Uch qator: `0`, `0`, `48`. Dastur xato ishlamayapti. Ekran ikkita turli qiymatni o'xshash qilib chizyapti. Farqni ko'rish uchun turga qarang: `int` 0 va `char` `'0'`.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "RAM — ish stoli. Har bir baytning manzili bor, xuddi uy raqamidek. Protsessor «0000FF00 manzildagi baytni o'qi» deydi. U yerdan sakkizta tranzistor holati keladi. Masalan `01000001`.",
          "Bu sakkiz bit o'zi nima ekanini aytmaydi. Dastur shu manzilni `char` deb o'qisa, jadvaldan 65 ni topib, ekranga `A` chizadi. `unsigned char` yoki `int` deb o'qisa, 65 sonini ko'rsatadi. Xuddi shu kalitlar, boshqa talqin.",
          "Manba fayl `harf.cpp` diskda matn sifatida yotadi. Har bir harfning o'zi ham bayt: fayldagi `A` harfi ham 65. Dastur ishga tushganda esa operatsion tizim buyruqlarni va sonlarni RAM ga ko'chiradi. Tranzistorlar fayl ichida emas, chipda. Fayl — chizma, RAM — shu chizma bo'yicha hozir yoqilgan kalitlar.",
          "`char` odatda 1 bayt. `int` siz ishlatadigan Windowsda odatda 4 bayt. «odatda» so'zi qasddan: standart har bir kompyuterda `int` 4 bayt bo'ladi deb qat'iy va'da bermaydi. Bit va bayt nisbati esa amaliyotda qotgan: 1 bayt = 8 bit.",
        ],
        diagram: `Manzil      Bayt (8 tranzistor)     Talqin
0000FF00    0 1 0 0 0 0 0 1        char  -> 'A'
0000FF00    0 1 0 0 0 0 0 1        son   -> 65

Og'irlik: 128 64 32 16 8 4 2 1
Yig'indi:       64             + 1 = 65`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Bu darsdagi xatolar kompilyator baqirmaydigan xatolar. Ular boshdagi tasavvurda yashaydi va keyin kodda qaytalanadi.",
        ],
        items: [
          {
            title: "Kompyuter o'zbekcha yoki inglizcha o'qiydi, deb o'ylash",
            why: [
              "Ekrandagi harf — oxirgi bosqich. Protsessor `if`, `return`, `Salom` so'zlarini bilmaydi. U oldindan tarjima qilingan mashina buyrug'ini bajaradi. Tarjima buzilsa, dastur tushunmaganini sizga inson tilida aytmaydi, kompilyator inglizcha xato beradi yoki dastur shunchaki noto'g'ri son chiqaradi.",
            ],
          },
          {
            title: "Bit va baytni almashtirish",
            why: [
              "«Fayl 8 bit» desangiz, u 1 bayt, ya'ni bitta belgi sig'adigan joy. «8 bayt» desangiz, 64 bit. Nomdagi bitta harf sig'imni 8 marta o'zgartiradi. 1 bayt = 8 bit. 0 dan 255 gacha — bitta baytning musbat diapazoni.",
            ],
          },
          {
            title: "0 soni va '0' belgisini teng ko'rish",
            why: [
              "Ekranda ikkalasi 0. Xotirada son 0 ning bitlari bo'sh, belgi `'0'` ning kodi 48. Birtirnoqni tushirib qoldirsangiz, butun boshqa qiymat saqlaysiz. Yuqoridagi uchinchi dastur shu tuzoqni maxsus ochib beradi.",
            ],
            wrong: `char belgi = 0;      // son nol, kod 0, ekranda ko'rinmas belgi
char belgi = '0';    // nolning rasmi, kod 48`,
            wrongLabel: "Ikki xil nol",
          },
          {
            title: "0 va 1 ni bo'yoq yoki odam yozgan raqam deb o'ylash",
            why: [
              "Chip ustida 0 va 1 yozilmagan. Bor narsa — kuchlanish. 0 va 1 bizning yorlig'imiz. Sakkizta kuchlanishni yonma-yon qo'yib, 256 xil yorliq yopishtirish mumkin. Dasturlash shu yorliqlar ustida ishlaydi, lekin temir pastida kalit bo'lib qoladi.",
            ],
          },
        ],
      },
      quiz: [
        {
          id: "1.1-q1",
          question: "Bitta bayt nechta bitdan iborat va nechta xil qiymat sig'diradi?",
          options: [
            "4 bit, 16 xil qiymat",
            "8 bit, 256 xil qiymat (0 dan 255 gacha)",
            "8 bit, 8 xil qiymat",
            "1024 bit, 256 xil qiymat",
          ],
          answer: 1,
          explanation:
            "1 bayt = 8 bit. Har bir bit 2 holat, sakkiztasi 2^8 = 256 holat. 0 ham hisobga kiradi, shuning uchun eng katta qiymat 255, qiymatlar soni esa 256.",
        },
        {
          id: "1.1-q2",
          question: "Katakcha `'A'` xotirada odatda qaysi o'nlik kod bilan yotadi?",
          options: ["1", "48", "65", "97"],
          answer: 2,
          explanation:
            "Katta A ning ASCII kodi 65, bitlari 01000001. 97 — kichik `a`. 48 — belgi `'0'`. 1 — shunchaki son bir, harf emas.",
        },
        {
          id: "1.1-q3",
          question: "`01000001` ikkilik yozuvi qaysi o'nlik songa teng?",
          options: ["2", "64", "65", "255"],
          answer: 2,
          explanation:
            "O'rinlar: 128 64 32 16 8 4 2 1. Faqat 64 va 1 yoqilgan. 64 + 1 = 65. Bu `'A'` ning kodi. 255 bo'lishi uchun sakkizta bitning hammasi 1 bo'lishi kerak edi.",
        },
      ],
    },
    {
      id: "1.2",
      navTitle: "Kompilyator va linker",
      title: "Kompilyator va linker nima?",
      goal: [
        "Bu darsdan keyin siz `.cpp` faylning `.exe` gacha bo'lgan yo'lini to'rtta bekat bilan aytib bera olasiz: preprocessor, kompilyator, obyekt fayl, linker. Qaysi xato qaysi bekatda chiqishini ham ajratasiz. `expected ';'` kompilyatorniki. `undefined reference` linkerniki.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Matbaani ko'z oldingizga keltiring. Siz maqola yozasiz — bu `.cpp`, odam o'qiydigan matn. Muharrir (preprocessor) ichidagi «bu yerga standart kirish qismini qo'y» degan belgilarni haqiqiy matn bilan almashtiradi va qirra izohlarni olib tashlaydi. Hali bu kitob emas, hali ham matn.",
          "Tarjimon (kompilyator) shu matnni bosmaxona mashinasi tushunadigan qoliplarga aylantiradi. Qolip — `.obj` yoki `.o` fayl. Ichida mashina kodi bor, lekin u yakka o'zi spektakl emas: «ekranga yoz» deganda qayerga sakrash kerakligi hali yozilmagan bo'lishi mumkin.",
          "Muqovachi (linker) sizning qoliplingizni, `iostream` ichidagi tayyor `cout` kodini va boshqa `.obj` larni bitta kitobga tikadi. Sahifa raqamlarini, ya'ni xotira manzillarini, shu paytda yozadi. Qo'lingizga chiqadigan narsa Windowsda `.exe`. Ikki marta bosib ishga tushiradigan fayl shu. `.cpp` ni ikki marta bossangiz, u ishlamaydi, chunki u hali retsept, tayyor taom emas.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`g++` buyrug'i to'rt bosqichni odatda yashirib, bitta qadam qilib beradi. Bosqichlarni ko'rish uchun kalitlar bor. Xato xabarini o'qish uchun esa bosqich nomini bilish kifoya.",
        ],
        items: [
          {
            title: "To'liq zanjir",
            paragraphs: [
              "1. **Manba** — `hello.cpp`. Siz yozgan matn. Bu yerda o'zbekcha izoh ham, `cout` ham bor.",
              "2. **Preprocessor** — `#` bilan boshlangan buyruqlarni bajaradi. `#include <iostream>` shu joyga sarlavha matnini qo'yadi. Izohlar tarjima bosqichida bo'sh joyga aylanadi, preprocessor ularni kod deb ko'rmaydi. Chiqish hali C++ matni. `g++ -E hello.cpp` shu matnni ekranga to'kadi. Minglab qator chiqsa, qo'rqmang: `iostream` ichki fayllarni ham tortadi.",
              "3. **Kompilyator** — shu tarjima birligini mashina kodiga aylantiradi. Natija **obyekt fayl**: `hello.o` yoki `hello.obj`. Unda sizning `main` ingizning kodi bor. `cout` ning tanasi yo'q, faqat «shunday nomli narsa kerak» degan yozuv bor. To'xtash uchun: `g++ -c hello.cpp`.",
              "4. **Linker** — obyekt fayllar va kutubxonalarni birlashtiradi. `cout` nomini `libstdc++` ichidagi haqiqiy kodga bog'laydi. Manzillarni yozadi. Windowsda `.exe` chiqaradi. Agar nom topilmasa, `.exe` tug'ilmaydi.",
              "Oddiy chaqiruv shu to'rttasini yashirin bajaradi: `g++ hello.cpp -o hello.exe`. `-o` dan keyin **chiqish** faylining nomi turadi.",
            ],
          },
          {
            title: "Qaysi xato qaysi eshikdan chiqadi",
            paragraphs: [
              "Nuqta-vergul tushib qolsa, qavs yopilmasa, noma'lum so'z yozilsa — bu **kompilyator** xatosi. Linker ishga tushmaydi, yangi `.exe` yozilmaydi.",
              "`undefined reference to ...` va oxirida `ld returned 1 exit status` — bu **linker** xatosi. Grammatika to'g'ri edi, `.o` fayl tug'ildi, lekin chaqirilgan funksiyaning tanasi hech qayerda topilmadi. `ld` — linkerning o'zi.",
              "Dastur yig'ilib, ishga tushib, noto'g'ri son chiqarsa — bu kompilyatorning ishi emas. Mantiqiy xato. Uni 1.7-darsda ajratamiz. Hozir yodlang: kompilyator va linker dastur **ishga tushishidan oldin** ishlaydi.",
            ],
          },
          {
            title: "Buyruqlar",
            paragraphs: [
              "Quyidagilarni papka ichida, `hello.cpp` yotgan joyda yozasiz. PowerShellda `.\\hello.exe` boshidagi nuqta-slash shu papkadagi fayl degani.",
            ],
            code: `g++ -E hello.cpp > hello.i
g++ -c hello.cpp
g++ hello.o -o hello.exe
g++ hello.cpp -o hello.exe
.\\hello.exe`,
            codeLabel: "terminal",
          },
        ],
      },
      examples: [
        {
          title: "Bitta fayl: yashirin zanjir va tayyor exe",
          intro: [
            "`g++ hello.cpp -o hello.exe` to'rt bosqichni o'zi bajaradi. Siz faqat oxirgi faylni ko'rasiz. Bu yomon emas, lekin xato chiqsa qaysi bosqich baqirganini bilish kerak.",
          ],
          codeLabel: "hello.cpp",
          code: `#include <iostream>

int main() {
    std::cout << "Hello, World!{{n}}";
    return 0;
}`,
          commands: `g++ hello.cpp -o hello.exe
.\\hello.exe`,
          consoleTitle: "Konsol",
          console: `Hello, World!`,
          analysis: [
            {
              lines: "1",
              text: "Preprocessor `#include` ni ko'radi va `iostream` mazmunini shu qator o'rniga qo'yadi. Siz `.i` faylni ochsangiz, `cout` e'lonini va minglab boshqa e'lonlarni ko'rasiz. Ularni o'qish shart emas.",
            },
            {
              lines: "3-6",
              text: "Kompilyator `main` ni mashina buyruqlariga aylantiradi. `return 0` «chiqish kodi 0» ga aylanadi. `std::cout` chaqiruvi obyekt faylda hali to'liq manzilsiz turadi: «linker, `cout` ni o'zing top».",
            },
            {
              lines: "",
              label: "linker",
              text: "Linker `libstdc++` dan `cout` va unga bog'liq bo'laklarni olib, `hello.exe` ichiga bog'laydi. Windows shu `.exe` ni yuklaydi. `.cpp` ni yuklamaydi.",
            },
            {
              lines: "",
              label: "konsol",
              text: "`Hello, World!` va yangi qator. Agar kompilyatsiya xato bersa, bu qator chiqmaydi, chunki yangi `.exe` yozilmaydi.",
            },
          ],
        },
        {
          title: "Bosqichlarni ajratib ko'rish: -c, keyin alohida bog'lash",
          intro: [
            "Shu darsning eng foydali mashqi — `g++` ni to'xtatib, o'rtadagi faylni ko'rish. `.o` fayl paydo bo'ladi, lekin uni ikki marta bosib ishga tushirmaysiz.",
          ],
          codeLabel: "hello.cpp",
          code: `#include <iostream>

int main() {
    std::cout << "Bosqichma-bosqich{{n}}";
    return 0;
}`,
          commands: `g++ -c hello.cpp
g++ hello.o -o hello.exe
.\\hello.exe`,
          consoleTitle: "Konsol",
          console: `Bosqichma-bosqich`,
          analysis: [
            {
              lines: "",
              label: "g++ -c",
              text: "`-c` «compile only» degani. Preprocessor va kompilyator ishlaydi, linker ishlamaydi. Papkada `hello.o` paydo bo'ladi. `hello.exe` hali yo'q. `.o` ni Notepad da ochsangiz, tushunarsiz belgi ko'rasiz: bu matn emas, mashina kodi va nomlar jadvali.",
            },
            {
              lines: "",
              label: "g++ hello.o",
              text: "Ikkinchi buyruqda manba `.cpp` yo'q, tayyor `.o` bor. Linker shuni olib `.exe` yasaydi. Agar `cout` kutubxonasi topilmasa, xato shu ikkinchi buyruqda chiqadi, birinchisida emas.",
            },
            {
              lines: "4",
              text: "Satr `{{n}}` bilan tugaydi. Dastur ishga tushganda shu baytlar konsolga yoziladi. Kompilyator satrni harfma-harf «chizmaydi», u satr baytlarini faylning o'qiladigan bo'limiga qo'yadi va `cout` ga o'sha manzilni beradi.",
            },
            {
              lines: "",
              label: "konsol",
              text: "`Bosqichma-bosqich`. Demak, ikki buyruq ham o'tdi: avval obyekt, keyin ijro fayli. Bitta `g++ hello.cpp -o hello.exe` xuddi shu ishni yashirin qiladi.",
            },
          ],
        },
        {
          title: "Linker xatosi: e'lon bor, tana yo'q",
          intro: [
            "`qosh` funksiyasi `main.cpp` da e'lon qilingan, lekin tanasi boshqa faylda. Agar ikkinchi faylni buyruqqa qo'shmassangiz, grammatika to'g'ri bo'lsa ham `.exe` chiqmaydi.",
          ],
          files: [
            {
              name: "main.cpp",
              code: `#include <iostream>

int qosh(int a, int b);

int main() {
    std::cout << qosh(2, 3) << "{{n}}";
    return 0;
}`,
            },
            {
              name: "qosh.cpp",
              code: `int qosh(int a, int b) {
    return a + b;
}`,
            },
          ],
          commands: `g++ main.cpp -o qosh.exe
g++ main.cpp qosh.cpp -o qosh.exe
.\\qosh.exe`,
          consoleTitle: "Terminal, keyin konsol",
          console: `undefined reference to \`qosh(int, int)'
collect2.exe: error: ld returned 1 exit status

5`,
          analysis: [
            {
              lines: "3",
              label: "main.cpp",
              text: "`int qosh(int a, int b);` — e'lon. Nuqta-vergul bor, tana yo'q. Kompilyatorga «bunday funksiya bo'ladi, hozir chaqirsam bo'ladi, tanasini linker topadi» degani. Bu shartnoma.",
            },
            {
              lines: "6",
              label: "main.cpp",
              text: "`qosh(2, 3)` chaqiruv. Kompilyator `main.cpp` ni yolg'iz `.o` ga aylantira oladi, chunki imzo ma'lum. U 2 va 3 ni uzatadigan mashina kodini yozadi, lekin `qosh` ning manzili bo'sh qoladi.",
            },
            {
              lines: "1-3",
              label: "qosh.cpp",
              text: "Bu yerda tana bor: `return a + b`. Ikkinchi kompilyatsiya shu tana uchun alohida `.o` yasaydi. Linker ikkala `.o` ni ko'rsa, bo'sh manzilga shu tanani yozadi.",
            },
            {
              lines: "",
              label: "birinchi buyruq",
              text: "`g++ main.cpp -o qosh.exe` faqat bitta faylni beradi. Kompilyator jim o'tishi mumkin, linker esa `qosh` ni topa olmay `undefined reference` deydi. `ld returned 1` — linker yutqazdi. `5` chiqmaydi, `.exe` yangilanmaydi.",
            },
            {
              lines: "",
              label: "ikkinchi buyruq",
              text: "`g++ main.cpp qosh.cpp -o qosh.exe` ikkala manbani ham oladi. Har biri kompilyatsiya qilinadi, keyin bog'lanadi. `2 + 3` hisoblanadi. Konsolning oxirgi qatori `5`.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Hali `.exe` yo'q paytda RAM da sizning dasturingiz yo'q. Bor narsa — diskdagi matn. Kompilyator o'zining ish xotirasida matnni tahlil qiladi va diskka `.o` yozadi. `.o` ichida bo'limlar bor: mashina buyruqlari (`.text` ga o'xshash), o'qiladigan sonlar va «shu nomning manzilini keyin to'ldir» degan yozuvlar.",
          "Linker shu yozuvlarni yurib chiqadi. `qosh` uchun bo'sh katak topilsa va boshqa `.o` da `qosh` ning tanasi bo'lsa, bo'sh katakga nisbiy manzil yoziladi. `cout` uchun bo'sh katakni standart kutubxona yopadi. Hammasi to'ldirilsa, bitta `.exe` yoziladi.",
          "Siz `.exe` ni ishga tushirganingizda Windows uni diskdan o'qib, protsess xotirasiga yuklaydi. Shu paytgacha «dastur xotirada» degan gap erta. Kompilyatsiya — diskdagi matnni diskdagi mashina fayliga aylantirish. Ishga tushirish — alohida qadam.",
          "Agar linker yiqilsa, eski `.exe` diskda qolgan bo'lishi mumkin. Yangi buyruqlar unga kirmagan. Keyingi safar ishga tushirsangiz, kecha yozilgan dastur yuguradi. Shuning uchun «ishladi» demasdan oldin terminalda xato yo'qligini ko'ring.",
        ],
        diagram: `hello.cpp  --preprocessor-->  katta matn
katta matn --kompilyator-->  hello.o
   hello.o ichida:
     main buyruqlari
     "cout manzili hali yo'q" yozuvi
hello.o + libstdc++  --linker-->  hello.exe
   endi cout manzili yozilgan
hello.exe  --ishga tushirish-->  RAM dagi protsess`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Zanjirni aralashtirish yangi boshlovchining eng qimmat xatosi: matn faylni dastur deb ishga tushirish, linker xatosini sintaksis deb o'qish, `-o` ni teskari qo'yish.",
        ],
        items: [
          {
            title: ".cpp ni ikki marta bosib ishga tushirish",
            why: [
              "`.cpp` — matn. Windows uni o'zi bajarmaydi. Bajargan narsa `.exe`. Dev-C++ dagi yashil tugma avval `g++` ni chaqiradi, keyin tug'ilgan `.exe` ni ishga tushiradi. Tugma sehr emas, yashirin buyruq.",
            ],
          },
          {
            title: "undefined reference ni nuqta-vergul xatosi deb o'qish",
            why: [
              "Agar xabarda `undefined reference` va `ld returned 1` bo'lsa, qavslaringiz to'g'ri. Yetishmayotgan narsa — funksiya tanasi yoki kutubxona. `cout` da bunday xato ko'pincha `g++` o'rniga `gcc` ishlatilganda chiqadi. C++ faylni `g++` bilan yig'ing. `gcc` C kutubxonasini biladi, C++ ning `libstdc++` ini o'zi qo'shmaydi.",
            ],
            wrong: `gcc main.cpp -o qosh.exe`,
            wrongLabel: "C++ uchun xato buyruq",
            right: `g++ main.cpp qosh.cpp -o qosh.exe`,
            rightLabel: "To'g'ri buyruq",
          },
          {
            title: "-o dan keyin manba fayl nomini yozish",
            why: [
              "`-o` chiqish faylini bildiradi. `g++ -o hello.cpp hello.cpp` yoki `g++ hello.cpp -o hello.cpp` manba ustiga mashina kodini yozib, `.cpp` ni buzishi mumkin. Chiqish nomi boshqa bo'lsin: `hello.exe`. Manba esa kirish tomonda, `-o` siz tursin.",
            ],
            wrong: `g++ hello.cpp -o hello.cpp`,
            right: `g++ hello.cpp -o hello.exe`,
          },
          {
            title: "Kompilyatsiya yiqilganda eski exe ga ishonish",
            why: [
              "Buyruq xato bilan tugasa, linker yangi fayl yozmaydi. Papkadagi kechagi `hello.exe` esa o'chmagan. Siz uni ishga tushirasiz va «o'zgartirishim ko'rinmayapti» deysiz. Avval terminaldagi qizil xatoni o'qing. Muvaffaqiyatli yig'ilishdan keyin ishga tushiring.",
            ],
          },
        ],
      },
      quiz: [
        {
          id: "1.2-q1",
          question: "`.cpp` dan `.exe` gacha to'g'ri tartib qaysi?",
          options: [
            "linker → preprocessor → kompilyator → .exe",
            "preprocessor → kompilyator → linker → .exe",
            "kompilyator → preprocessor → .exe → linker",
            ".exe → kompilyator → .cpp",
          ],
          answer: 1,
          explanation:
            "Avval preprocessor `#include` larni yoyadi, keyin kompilyator obyekt kod yozadi, oxirida linker kutubxona va obyektlarni bitta `.exe` ga bog'laydi. Teskari yo'l yo'q: `.exe` ni tahrirlab `.cpp` olinmaydi.",
        },
        {
          id: "1.2-q2",
          question: "Terminalda `undefined reference to qosh(int, int)` va `ld returned 1` chiqdi. Bu qaysi bosqich?",
          options: [
            "Preprocessor, chunki #include tushib qolgan",
            "Kompilyator, chunki nuqta-vergul yo'q",
            "Linker, chunki funksiya tanasi topilmadi",
            "Runtime, chunki 2 + 3 noto'g'ri hisoblandi",
          ],
          answer: 2,
          explanation:
            "`ld` — linker. `undefined reference` nomning tanasi hech qaysi obyekt faylda yo'q degani. Grammatika o'tgan, dastur esa hali ishga tushmagan. `qosh.cpp` ni ham `g++` ga bering.",
        },
        {
          id: "1.2-q3",
          question: "Windowsda ikki marta bosib ishga tushiriladigan fayl qaysi?",
          options: ["hello.cpp", "hello.o", "hello.i", "hello.exe"],
          answer: 3,
          explanation:
            "`.cpp` manba matn, `.i` preprocessordan keyingi matn, `.o` hali bog'lanmagan mashina kodi. Foydalanuvchi ishga tushiradigan fayl `.exe`.",
        },
      ],
    },
    {
      id: "1.3",
      navTitle: "Muhitni sozlash",
      title: "Muhitni sozlash",
      goal: [
        "Bu darsdan keyin siz IDE, muharrir va kompilyatorni aralashtirmaysiz. Dev-C++ nima uchun yangi boshlovchiga qulay, VS Code nima uchun alohida `g++` so'raydi, va `g++ --version` javob bermasa nimani tuzatish kerak — shularni o'z kompyuteringizda tekshira olasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Yana oshxona, lekin endi retsept emas, jihoz haqida. Stol — muharrir: matn yozadigan joy. Pech — kompilyator `g++`: xom retseptni pishgan taomga, ya'ni `.exe` ga aylantiradi. Idish-tovoq javoni — kutubxonalar. Butun xona, tortmalar yorlig'i va pech tugmasi bilan — IDE.",
          "Dev-C++ kichik oshxona: ichiga pech o'rnatilgan holda keladi. O'rnatdingiz, fayl ochdingiz, F11 bosdingiz. VS Code esa yaxshi stol. Stolning o'zi non pishirmaydi. Pechni, ya'ni MinGW `g++` ni, alohida o'rnatib, uning `bin` papkasini PATH ga qo'yishingiz kerak. Stolni o'rnatib, «nega non chiqmadi» deyish — pech yo'qligini unutish.",
          "Terminal — pechning tugmasi oldidagi yozuv. `g++ hello.cpp -o hello.exe` deb yozsangiz, qaysi retsept qaysi pechga tushganini o'zingiz ko'rasiz. IDE tugmasi shu yozuvni yashirin yuboradi. Ikkalasi ham to'g'ri. Tugma ishlamasa, yozuvni o'qiy olish sizni qutqaradi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Muhit uchun bitta tekshiruv bor: yangi terminalda `g++ --version` versiya yozsa, kompilyator ko'rinadi. `is not recognized` yoki `topilmadi` desa, IDE qancha chiroyli bo'lmasin, C++ hali yo'q.",
        ],
        items: [
          {
            title: "IDE nima, muharrir nima",
            paragraphs: [
              "IDE — Integrated Development Environment, yig'ma muhit. Ichida odatda muharrir, fayl daraxti, kompilyatsiya tugmasi, xato qatori va ba'zan o'z kompilyatori bo'ladi. Dev-C++ shu sinfdan.",
              "VS Code avvalambor muharrir. Kengaytma qo'shsangiz, xatolarni tagiga chizadi, lekin kengaytma `g++` ning o'rnini bosmaydi. Microsoftning C/C++ kengaytmasi (`ms-vscode.cpptools`) xato chizish va `g++` ni topishga yordam beradi. Nonni esa baribir `g++` pishiradi.",
              "Muharrirda yozilgan fayl diskka `.cpp` bo'lib tushishi shart. Nomsiz yoki `.txt` bo'lib qolsa, `g++` uni C++ deb olmaydi. Saqlash oynasida nomi `hello.cpp` bo'lsin.",
            ],
          },
          {
            title: "Dev-C++ da birinchi yurish",
            paragraphs: [
              "Dev-C++ (MinGW bilan keladigan yig'ma) Windowsda shu sabab qulay: `g++` ni alohida qidirish shart emas. Yo'l oddiy.",
              "1. Dev-C++ ni o'rnating. O'rnatishda MinGW / kompilyator belgilanganini qoldiring.",
              "2. File → New → Source File. Bo'sh oq varaq ochiladi.",
              "3. 1.4-darsdagi `Hello, World!` dasturini yozing. Hozircha shablonni ko'chirib qo'ysangiz ham bo'ladi, tahlilni keyingi darsda qilasiz.",
              "4. File → Save As. Papka oching, masalan `C:\\\\Users\\\\user\\\\Desktop\\\\cpp`. Fayl nomi aynan `hello.cpp`. Kengaytma `.cpp` bo'lishi shart.",
              "5. Execute → Compile & Run, yoki F11. Pastda kompilyatsiya muvaffaqiyatli degan yozuv chiqishi kerak. Keyin qora konsol oynasi ochiladi.",
              "6. `.exe` odatda `.cpp` ning yonida paydo bo'ladi. Konsol bir zumda yopilib qolsa, dastur tugagan, xato degani emas. Terminaldan `.\\hello.exe` qilsangiz, oyna yopilmay turadi.",
            ],
          },
          {
            title: "VS Code va alohida g++",
            paragraphs: [
              "1. VS Code ni o'rnating. Bu muharrir.",
              "2. `g++` ni o'rnating. Ishonchli yo'llardan biri MSYS2, keyin uning terminalida `ucrt64` muhiti va `mingw-w64` g++ paketi. Boshqa yo'l — tayyor MinGW-w64 (WinLibs kabi) arxivini ochib, `bin` papkasini olish. Aniq o'rnatuvchi nomi yillar o'tishi bilan o'zgaradi. O'zgarmaydigan qism: `g++.exe` diskda turishi va terminal uni topishi kerak.",
              "3. `bin` papkasini foydalanuvchi PATH o'zgaruvchisiga qo'shing. Masalan `C:\\\\msys64\\\\ucrt64\\\\bin`. Windowsni yangi terminal ochishga majbur qiling: eski oyna eski PATH ni eslab qoladi.",
              "4. Yangi PowerShell: `g++ --version`. `g++.exe (MinGW-W64)` va versiya chiqsa, pech ulangan.",
              "5. VS Code da C/C++ kengaytmasini o'rnating. Papkani oching. `hello.cpp` yozing. Terminalni shu papkada oching (Terminal → New Terminal).",
              "6. `g++ hello.cpp -o hello.exe`, keyin `.\\hello.exe`.",
              "Code Runner kabi tugma ham `g++` ni chaqirishi mumkin, lekin yashirin buyruqni ko'rmasangiz, xato chiqqanda adashasiz. Shu kitobda asosiy yo'l — terminaldagi `g++`.",
            ],
          },
          {
            title: "Ishlaydigan minimal buyruq",
            paragraphs: [
              "Fayl `hello.cpp`, papka to'g'ri, kompilyator PATH da. Shunda ikki qator yetadi.",
            ],
            code: `g++ --version
g++ hello.cpp -o hello.exe
.\\hello.exe`,
            codeLabel: "PowerShell",
          },
        ],
      },
      examples: [
        {
          title: "Versiyadan tortib ishga tushirishgacha",
          intro: [
            "Bu sessiyani o'z kompyuteringizda takrorlang. Birinchi buyruq pechni tekshiradi, ikkinchisi non yopadi, uchinchisi tatib ko'radi.",
          ],
          codeLabel: "hello.cpp",
          code: `#include <iostream>

int main() {
    std::cout << "Muhit tayyor{{n}}";
    return 0;
}`,
          commands: `g++ --version
g++ hello.cpp -o hello.exe
.\\hello.exe`,
          consoleTitle: "Terminal va konsol",
          console: `g++.exe (MinGW-W64) 13.2.0
Muhit tayyor`,
          analysis: [
            {
              lines: "",
              label: "g++ --version",
              text: "Agar bu qator versiya yozsa, `g++.exe` PATH orqali topilgan. Raqam 13.2.0 bo'lishi shart emas. 11, 14, 15 ham bo'ladi. Muhimi — buyruq topildi va bu C++ kompilyatori.",
            },
            {
              lines: "1-6",
              text: "Manba qisqa. `#include`, `main`, bitta `cout`, `return 0`. `g++ hello.cpp -o hello.exe` preprocessor, kompilyator va linkerni yashirin yuguradi. Muvaffaqiyatda terminal jim turishi mumkin: xato yo'q bo'lsa, `g++` ko'p gapirmaydi. Jimlik — yaxshi xabar.",
            },
            {
              lines: "",
              label: ".\\hello.exe",
              text: "Nuqta joriy papka. Slash dan keyin fayl nomi. PowerShell ba'zan joriy papkadagi dasturni nom bilan emas, shu ko'rinish bilan ishga tushirishni xohlaydi. Konsolda `Muhit tayyor` chiqadi.",
            },
            {
              lines: "",
              label: "versiya qatori",
              text: "Namunadagi `13.2.0` misol. Sizda boshqa son bo'lsa, dars buzilmaydi. `gcc` versiyasi chiqib, `g++` topilmasa, C++ pechi hali ulanmagan bo'lishi mumkin. Aynan `g++` ni tekshiring.",
            },
          ],
        },
        {
          title: "gcc bilan C++ faylni yig'ish",
          intro: [
            "Kompilyator o'rnatilgan, fayl to'g'ri, lekin buyruq `gcc`. Ko'pchilik shu yerda «C++ buzuq» deb o'ylaydi. Buzuq narsa buyruq tanlovi.",
          ],
          codeLabel: "hello.cpp",
          code: `#include <iostream>

int main() {
    std::cout << "Muhit tayyor{{n}}";
    return 0;
}`,
          commands: `gcc hello.cpp -o hello.exe`,
          consoleTitle: "Linker xabari",
          console: `undefined reference to \`std::cout'
undefined reference to \`std::basic_ostream<char>::operator<<(char const*)'
collect2.exe: error: ld returned 1 exit status`,
          analysis: [
            {
              lines: "1",
              text: "Fayl kengaytmasi `.cpp`, shuning uchun kompilyator uni C++ deb tahlil qilishi mumkin. `#include` va `cout` grammatikasi o'tadi. Xato keyinroq chiqadi.",
            },
            {
              lines: "4",
              text: "`std::cout` chaqiruvi obyekt kodda «shu nom kerak» bo'lib qoladi. `g++` linkerni chaqirganda `libstdc++` ni o'zi qo'shadi. `gcc` qo'shmaydi. Natija — `undefined reference`.",
            },
            {
              lines: "",
              label: "ld returned 1",
              text: "Bu 1.2-darsdagi linker bekati. Sintaksisni tuzatib o'tirmang. Buyruqni `g++ hello.cpp -o hello.exe` qiling. Xuddi shu fayl yig'iladi.",
            },
            {
              lines: "",
              label: "xabar uzunligi",
              text: "Haqiqiy xabar bundan uzunroq bo'lishi mumkin: `cout` ning ichki nomlari ham sanab ketiladi. Birinchi `undefined reference` va oxirgi `ld returned 1` yetadi. O'rtasini qo'rqib o'qish shart emas.",
            },
          ],
        },
        {
          title: "Noto'g'ri papka yoki noto'g'ri kengaytma",
          intro: [
            "Kompilyator faylni topa olmasa, C++ qoidasiga bormaydi ham. Bu eng tez-tez uchraydigan «muhit xatosi».",
          ],
          codeLabel: "hello.cpp",
          code: `#include <iostream>

int main() {
    std::cout << "Muhit tayyor{{n}}";
    return 0;
}`,
          commands: `g++ hello.cpp -o hello.exe`,
          consoleTitle: "Agar fayl shu papkada bo'lmasa",
          console: `g++: error: hello.cpp: No such file or directory
g++: fatal error: no input files
compilation terminated`,
          analysis: [
            {
              lines: "",
              label: "No such file",
              text: "`hello.cpp` joriy papkada yo'q. `dir` (PowerShell da `Get-ChildItem` yoki `ls`) bilan ro'yxatni ko'ring. Fayl `Hujjatlar` da, terminal `Desktop` da bo'lishi mumkin. `cd` bilan fayl turgan papkaga kiring, buyruqni qaytaring.",
            },
            {
              lines: "",
              label: "no input files",
              text: "`g++` ga kirish fayli berilmadi, chunki u aytgan nomni topmadi. Bu sintaksis xatosi emas. Figurali qavsni tuzatish foyda bermaydi.",
            },
            {
              lines: "",
              label: ".txt tuzog'i",
              text: "Notepad ba'zan `hello.cpp.txt` saqlaydi. Explorer kengaytmani yashirgan bo'lsa, siz `.cpp` deb o'ylaysiz. `g++` esa `.txt` ni C++ demaydi. Saqlash oynasida turini «All files» qiling va to'liq nomni `hello.cpp` deb yozing.",
            },
            {
              lines: "4",
              text: "Fayl topilgandan keyin shu qator kompilyatsiya qilinadi. Topilmaguncha 4-qatorga navbat kelmaydi. Avval yo'l, keyin kod.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "IDE ochiq turganida RAM da uning o'z protsessi yashaydi: oynalar, ochiq faylning nusxasi, kursor. Bu sizning C++ dasturingiz emas. Siz Ctrl+S bosmaguningizcha, oxirgi tahrir faqat muharrir xotirasida bo'lishi mumkin. `g++` diskdagi faylni o'qiydi, ekrandagi saqlanmagan qatorni emas.",
          "`g++.exe` ishga tushganda alohida protsess bo'ladi. U `hello.cpp` ni diskdan o'qiydi, vaqtinchalik xotirada tahlil qiladi, `hello.exe` ni diskka yozadi va o'zi tugaydi. Kompilyator xotirada qolmaydi. Qoladigan narsa — diskdagi `.exe`.",
          "`.\\hello.exe` yangi protsess ochadi. Windows `.exe` ni RAM ga yuklaydi, `main` dan boshlaydi, `cout` baytlarini konsol oynasiga uzatadi. Dastur `return 0` qilganda protsess yopiladi, uning RAM i qaytarib olinadi. `.exe` fayl diskda turadi, keyingi safar yana yuklanadi.",
          "PATH — dasturlar ro'yxati emas, papkalar ro'yxati. Siz `g++` deb yozsangiz, Windows shu papkalarda `g++.exe` ni qidiradi. Papka ro'yxatda bo'lmasa, fayl diskda bo'lsa ham «topilmadi» deydi. Faylni ko'chirish emas, papkani PATH ga qo'shish kerak. Qo'shgandan keyin yangi terminal oching.",
        ],
        diagram: `RAM:  VS Code protsessi  |  matn muharrir xotirasida
Ctrl+S
DISK: hello.cpp
g++.exe ishga tushadi (alohida protsess) va tugaydi
DISK: hello.exe
.\\hello.exe
RAM:  yangi protsess, main, cout buferi, keyin protsess yopiladi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Muhit xatosi kod xatosiga o'xshab ketadi. Farq: xabar fayl qatorini emas, buyruqni yoki yo'lni ko'rsatadi.",
        ],
        items: [
          {
            title: "VS Code o'rnatib, g++ ni o'rnatmaslik",
            why: [
              "Muharrir ochiladi, fayl saqlanadi, lekin terminal `g++` ni tanimaydi: `The term 'g++' is not recognized`. Bu C++ xatosi emas. MinGW `bin` papkasini o'rnating va PATH ga qo'shing. Tekshiruv bitta: yangi terminalda `g++ --version`.",
            ],
          },
          {
            title: "Eski terminal eski PATH ni ko'rsatadi",
            why: [
              "PATH o'zgargandan keyin ochiq turgan PowerShell yangilanmaydi. Oynani yoping, yangisini oching. VS Code ni ham bir marta yopib ochish foydali, chunki u terminalni o'zidan ishga tushiradi.",
            ],
          },
          {
            title: "Antivirus exe ni o'chirib yuboradi",
            why: [
              "Ba'zi antivirus yangi `.exe` ni shubhali deb karantinga oladi. `g++` jim yig'ib beradi, ishga tushirishda esa fayl yo'q. Papkani tekshiring. `hello.exe` paydo bo'lib darhol yo'qolsa, antivirus jurnaliga qarang va o'quv papkangizga istisno qo'shing. Boshqa odamning notanish `.exe` ini emas, o'zingiz hozir yig'gan dasturingizni ayting.",
            ],
          },
          {
            title: "Noto'g'ri papkada turib buyruq berish",
            why: [
              "`No such file or directory` kodni emas, joriy papkani tuzating. Terminalda `pwd` yoki PowerShell da `Get-Location` joriy joyni aytadi. `hello.cpp` shu ro'yxatda ko'rinishi kerak.",
            ],
            wrong: `g++ hello.cpp -o hello.exe`,
            wrongLabel: "Fayl boshqa papkada bo'lsa shu xato",
            right: `cd C:\\Users\\user\\Desktop\\cpp
g++ hello.cpp -o hello.exe
.\\hello.exe`,
            rightLabel: "Avval papkaga kiring",
          },
        ],
      },
      quiz: [
        {
          id: "1.3-q1",
          question: "VS Code o'rnatilgan. `g++` o'rnatilmagan. `hello.cpp` ni ishga tushirish mumkinmi?",
          options: [
            "Ha, VS Code o'zi C++ ni bajaradi",
            "Ha, faylni ikki marta bosish kifoya",
            "Yo'q, matnni .exe ga aylantiradigan g++ kerak",
            "Ha, agar fayl .txt bo'lsa",
          ],
          answer: 2,
          explanation:
            "VS Code muharrir. U `.cpp` ni saqlaydi. Mashina kodiga `g++` aylantiradi. Faylning o'zi, ayniqsa `.txt`, bajarilmaydi.",
        },
        {
          id: "1.3-q2",
          question: "Qaysi buyruq `hello.cpp` ni Windowsda yig'ib, `hello.exe` qiladi?",
          options: [
            "python hello.cpp",
            "gcc hello.cpp -o hello.exe",
            "g++ hello.cpp -o hello.exe",
            "g++ -o hello.cpp",
          ],
          answer: 2,
          explanation:
            "`g++` C++ linkerni to'g'ri chaqiradi, `-o hello.exe` chiqish nomini beradi. `gcc` `cout` ni bog'lamay qolishi mumkin. `-o hello.cpp` esa chiqish nomini manba bilan adashtiradi.",
        },
        {
          id: "1.3-q3",
          question: "`g++` yozsangiz `is not recognized` chiqyapti. Bu nimani anglatadi?",
          options: [
            "hello.cpp da nuqta-vergul qolib ketgan",
            "Kompilyator topilmayapti yoki PATH da yo'q",
            "Dastur 0 ga bo'lib yuborgan",
            "Linker cout ni topmadi",
          ],
          answer: 1,
          explanation:
            "Xabar `g++` so'zining o'ziga tegishli, `hello.cpp` qatoriga emas. Windows buyruqni topa olmadi. O'rnatish va PATH, keyin yangi terminal. Sintaksisga hali navbat kelmagan.",
        },
      ],
    },
    /*__MORE_LESSONS__*/
  ],
};

export const chapter1 = decode(rawChapter);
