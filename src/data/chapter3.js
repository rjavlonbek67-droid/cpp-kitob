const BS = String.fromCharCode(92);
const TAB = String.fromCharCode(9);

function decode(value) {
  if (typeof value === "string") {
    return value
      .split("{{n}}")
      .join(BS + "n")
      .split("{{t}}")
      .join(BS + "t")
      .split("{{a}}")
      .join(BS + "a")
      .split("{{bs}}")
      .join(BS)
      .split("{{tab}}")
      .join(TAB);
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
  id: "3",
  number: 3,
  title: "Kiritish va Chiqarish oqimlari",
  summary:
    "Ekranga yozish, qator va bufer, maxsus belgilar, klaviaturadan o'qish va ustunlarni tekis chiqarish.",
  lessons: [
    {
      id: "3.1",
      navTitle: "cout, qator va endl",
      title: "std::cout va << operatori, \\n hamda std::endl farqi",
      goal: [
        "Bu darsdan keyin siz `std::cout` ni ekranning o'zi emas, chiqish oqimi ekanini aytasiz. `<<` zanjiri qanday o'qilishini, `{{n}}` bilan `std::endl` ning farqi faqat yangi qator emas, buferni bo'shatish ekanini misol bilan ajratasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Idoradagi pochta qutisini ko'z oldingizga keltiring. Siz xat yozasiz va uni qutiga tashlaysiz. Quti to'lsa yoki siz «hozir olib keting» desangiz, xat pochta mashinasiga chiqadi. Ekran — manzil. `cout` — shu quti. `<<` — «shu qog'ozni qutiga sol».",
          "Quti darrov ko'chaga chiqmaydi. Ichida bufer bor: yig'ib turadigan joy. `{{n}}` qog'ozga «yangi qatordan yoz» degan bitta belgi qo'yadi va qog'ozni qutiga tashlaydi. `std::endl` ham shu belgini qo'yadi, keyin qo'ng'iroq qiladi: qutidagi hammasini hozir olib ket. Bu qo'ng'iroq — `flush`.",
          "Kichik dastur tugaganda quti baribir bo'shatiladi, xat yo'qolmaydi. Shuning uchun `{{n}}` va `endl` ko'pincha ekranda bir xil ko'rinadi. Farq dastur hali tugamagan paytda, faylga yozayotganda yoki dastur yiqilganda chiqadi. `endl` ni har qatorga qo'yish — har bir xat uchun alohida mashina chaqirish. Ishlaydi, lekin sekin.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`std::cout` — `iostream` dagi tayyor obyekt. U standart chiqishga, odatda terminalga, bog'langan. Siz uni yaratmaysiz. `#include <iostream>` bo'lmasa, kompilyator bu nomni bilmaydi.",
        ],
        items: [
          {
            title: "<< zanjiri",
            paragraphs: [
              "`<<` chiqarish operatori. Chapda oqim, o'ngda yuboriladigan qiymat. U oqimning o'zini qaytaradi, shuning uchun zanjir tuziladi. O'qilishi chapdan o'ngga.",
              "`std::cout << \"Yosh: \" << yosh << {{n}};` uch qadam: avval matn, keyin son, keyin yangi qator. Son o'zi matn emas. `cout` uni raqam belgilariga aylantirib yuboradi. `18` ikki belgi: `'1'` va `'8'`.",
              "`+` qo'shish `<<` dan oldin hisoblanadi. `cout << 3 + 4` ekranga `7` yozadi. `cout << 3 << 4` esa `34` yozadi: ikkita alohida son, orasida bo'sh joy yo'q. Bo'sh joy kerak bo'lsa, o'zingiz `\" \"` yuboring.",
              "`cout << 3 < 4` yig'ilmaydi. `<` taqqoslash `<<` bilan aralashib, ifoda `(cout << 3) < 4` bo'lib o'qiladi. Taqqoslashni qavsga oling: `cout << (3 < 4)`.",
            ],
            code: `std::cout << "Yosh: " << yosh << "{{n}}";
std::cout << 3 + 4 << "{{n}}";
std::cout << 3 << 4 << "{{n}}";`,
            codeLabel: "zanjir",
          },
          {
            title: "{{n}} — yangi qator belgisi",
            paragraphs: [
              "`{{n}}` satr ichidagi escape. Kompilyator uni bitta baytga, kod 10 ga, aylantiradi. Bu bayt «qator tugadi» degani. Kursor keyingi qatorning boshiga tushadi.",
              "U flush qilmaydi. Standart shunday. Terminalda esa ko'pincha darhol ko'rasiz, chunki terminal qator bo'yicha buferni bo'shatadi va dastur tugaganda qolgan bufer ham chiqadi. Faylga yo'naltirilsa, `{{n}}` faylga darhol tushmasligi mumkin.",
              "`{{n}}` ni qo'shtirnoq ichiga yozing: `\"Salom{{n}}\"`. Qatorni kodda sindirish bilan aralashtirmang. Kodning yangi qatori faqat sizning manba faylingizni chiroyli qiladi. Ekrandagi yangi qatorni `{{n}}` yoki `endl` yaratadi.",
            ],
          },
          {
            title: "std::endl — yangi qator va flush",
            paragraphs: [
              "`std::endl` manipulator. U ikki ish qiladi: `{{n}}` yozadi, keyin `flush()` chaqiradi. `flush` buferdagi baytlarni operatsion tizimga hozir beradi.",
              "`std::flush` yangi qatorsiz bo'shatadi. Savol matnini qator oxirida qoldirib, darhol ko'rsatish uchun: `std::cout << \"Ism: \" << std::flush;`.",
              "Qachon `endl`: foydalanuvchi xabarni navbatdagi qadamdan oldin ko'rishi shart, yoki dastur shu yerda yiqilishi mumkin va oxirgi qator yo'qolmasin. Qachon `{{n}}`: oddiy hisobot, minglab qator, fayl. Takroriy flush sekin.",
              "`cin` dan oldin `cout` o'zi ham flush bo'ladi. `cout` `cin` ga bog'langan (`tie`). Son so'rab, keyin `cin >> son` qilsangiz, savol matni o'qishdan oldin chiqadi. Buni 3.3-darsda ishlatamiz.",
            ],
            code: `std::cout << "Tayyor" << std::endl;
std::cout << "Ism: " << std::flush;`,
            codeLabel: "flush",
          },
        ],
      },
      examples: [
        {
          title: "Zanjir va yangi qator",
          intro: [
            "Bitta `cout` bir nechta narsani yuboradi. Ekrandagi qatorlar `{{n}}` dan chiqadi, kodning chiroyli yozilishidan emas.",
          ],
          codeLabel: "salom.cpp",
          code: `#include <iostream>

int main() {
    int yosh = 18;
    std::cout << "Yosh: " << yosh << "{{n}}";
    std::cout << 3 + 4 << "{{n}}";
    std::cout << 3 << 4 << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `Yosh: 18
7
34`,
          analysis: [
            {
              lines: "4",
              text: "`yosh` qutisida son 18 yotadi, hali matn emas. 4 baytlik butun son.",
            },
            {
              lines: "5",
              text: "Zanjir chapdan o'ngga. Avval `Yosh: ` matni buferga tushadi, probel ham shu matnning ichida. Keyin `yosh` raqamga aylantiriladi: belgilar `1` va `8`. Oxirida `{{n}}`, ya'ni bayt 10. Konsolning birinchi qatori `Yosh: 18`.",
            },
            {
              lines: "6",
              text: "`3 + 4` avval hisoblanadi, chunki `+` ustunroq. `cout` ga 7 yetib keladi. Ekranda `7`, yonida `3` yoki `4` yo'q.",
            },
            {
              lines: "7",
              text: "Bu yerda `+` yo'q. Ikki marta `<<`. Avval 3, darhol keyin 4. Orada bo'sh joy yuborilmagan, shuning uchun `34`. Yangi o'zgaruvchi ham ochilmaydi. Bu qo'shish emas, yonma-yon yozish.",
            },
          ],
        },
        {
          title: "{{n}} qatorni sindiradi, kodning yangi qatori emas",
          intro: [
            "Uchta `cout` uchta yangi qator degani emas. Yangi qator faqat siz yuborgan `{{n}}` da paydo bo'ladi.",
          ],
          codeLabel: "qator.cpp",
          code: `#include <iostream>

int main() {
    std::cout << "Salom";
    std::cout << " dunyo";
    std::cout << "{{n}}";
    std::cout << "Salom{{n}}";
    std::cout << "dunyo{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `Salom dunyo
Salom
dunyo`,
          analysis: [
            {
              lines: "4-6",
              text: "4-qator `Salom` ni buferga qo'yadi, yangi qator yo'q. 5-qator o'sha qatorga ` dunyo` ni yopishtiradi. Boshidagi probel satrning ichida. 6-qator faqat `{{n}}` yuboradi. Shu payt birinchi ekran qatori tugaydi: `Salom dunyo`.",
            },
            {
              lines: "7",
              text: "`Salom{{n}}` matn va qator tugatish bitta satrda. Kursor pastga tushadi. Kod bu yerda yangi qatorga o'tgani uchun emas, `{{n}}` bayti uchun.",
            },
            {
              lines: "8",
              text: "`dunyo{{n}}` ikkinchi mustaqil qator. Dastur `return` da tugaydi. Buferda qolgan narsa bo'lsa, oqim yopilayotganda flush qilinadi. Shu kichik dasturning ekrani to'liq ko'rinadi.",
            },
            {
              lines: "",
              label: "xulosa",
              text: "Manba fayldagi chiroyli joylashuv o'quvchi uchun. Foydalanuvchi ko'radigan joylashuvni `{{n}}`, probel va `<<` hal qiladi.",
            },
          ],
        },
        {
          title: "endl ham qator tashlaydi, qo'shimcha ishi flush",
          intro: [
            "Tugab ketadigan kichik dasturda `endl` va `{{n}}` bir xil ko'rinadi. Farqni koddan o'qing: ikkinchi qatorda flush bor, birinchisida yo'q. Ko'rinish bir xil bo'lishi farq yo'q degani emas.",
          ],
          codeLabel: "endl.cpp",
          code: `#include <iostream>

int main() {
    std::cout << "Birinchi" << "{{n}}";
    std::cout << "Ikkinchi" << std::endl;
    std::cout << "Uchinchi prompt: " << std::flush;
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `Birinchi
Ikkinchi
Uchinchi prompt: `,
          analysis: [
            {
              lines: "4",
              text: "`{{n}}` faqat yangi qator baytini buferga qo'yadi. Terminalda bu qator odatda darhol ko'rinadi. Faylga yo'naltirilsa, bayt biroz turishi mumkin.",
            },
            {
              lines: "5",
              text: "`std::endl` ham yangi qator yozadi, keyin `flush()` chaqiradi. Buferdagi `Ikkinchi` va qator bayti operatsion tizimga hozir beriladi. Ekranda yana oddiy qator. Qo'shimcha belgi chiqmaydi. Flush ko'rinadigan belgi emas, buyruq.",
            },
            {
              lines: "6",
              text: "`std::flush` yangi qator qo'ymaydi. `Uchinchi prompt: ` shu qatorning oxirida qoladi. Kursordan keyin probel bor, u satrda yozilgan. Dastur shu yerda tugasa ham, flush xabarni yo'qotmaydi. `cin` dan oldin savolni shunday qoldirish qulay.",
            },
            {
              lines: "",
              label: "qachon farq ochiladi",
              text: "Agar `flush` siz `while` ichida million marta `endl` yozsangiz, har safar tizim chaqiruvi bo'ladi. `{{n}}` esa buferni to'ldirib, kamroq marta yozadi. Agar `{{n}}` dan keyin dastur yiqilsa, oxirgi qatorlar buferda qolib, faylga tushmasligi mumkin. `endl` shu oxirgi qatorni ulguradi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`\"Yosh: \"` satri dastur yuklanganda o'qiladigan bo'limda yotadi. Har bir harf bayt, oxirida yashirin 0. `cout` shu baytlarni o'zining buferiga ko'chiradi. Bufer — oqim obyektidagi vaqtinchalik xotira, odatda minglab bayt.",
          "`yosh` ning 18 qiymati buferga son sifatida tushmaydi. `cout` 18 ni o'nlik belgilarga ajratadi va `0x31`, `0x38` (`'1'`, `'8'`) baytlarini buferga qo'yadi. Asl `int` qutisi o'zgarmaydi.",
          "`{{n}}` buferga bitta bayt qo'yadi: 10. Ikki belgi `\\` va `n` xotirada qolmaydi. Ularni kompilyator satrni yig'ayotganda aylantirib qo'ygan. `endl` shu baytni qo'yib, keyin buferni standart chiqishning fayl tutqichiga (odatda 1-raqam, stdout) yozishni so'raydi.",
          "Dastur `return 0` qilganda `cout` vayron bo'ladi va qolgan buferni flush qiladi. Shuning uchun flush ni unutgan kichik dastur ham oxirida matnni ko'rsatadi. Yiqilish yoki `abort` ba'zan bu vayron qilishni o'tkazib yuboradi. O'shanda flush qilinmagan `{{n}}` yo'qolishi mumkin.",
        ],
        diagram: `int yosh = 18          RAM: 12 00 00 00
"Yosh: "               o'qiladigan bo'lim: Y o s h : [probel] 0

cout buferi:  'Y' 'o' 's' 'h' ':' ' ' '1' '8'  10
                                                      ^ {{n}}
endl  ->  buferni stdout ga yoz, buferni bo'shat
dastur tugashi  ->  qolgan bufer ham yoziladi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Chiqarish xatolarining ko'pi yig'iladi, lekin «ishladi» degan dasturning qatori yopishib qoladi yoki savol ko'rinmaydi.",
        ],
        items: [
          {
            title: "Sonlarni bo'sh joysiz yopishtirish",
            why: [
              "`<<` orasiga probel qo'ymaydi. Siz qo'ymasangiz, `18` va `19` `1819` bo'lib chiqadi.",
            ],
            wrong: `std::cout << yosh << ball;`,
            right: `std::cout << yosh << " " << ball << "{{n}}";`,
          },
          {
            title: "Taqqoslashni zanjirga qavssiz qo'yish",
            why: [
              "`cout << 3 < 4` taqqoslash emas. Kompilyator oqimni son bilan solishtira olmaydi va xato beradi.",
            ],
            wrong: `std::cout << 3 < 4;`,
            right: `std::cout << (3 < 4) << "{{n}}";`,
          },
          {
            title: "Har qatorga endl qo'yish",
            why: [
              "Natija to'g'ri chiqadi, dastur sekinlashadi. Oddiy qator uchun `{{n}}` yetadi. `endl` ni «chiroyliroq yangi qator» deb yodlamang. U flush.",
            ],
            wrong: `std::cout << i << std::endl;`,
            right: `std::cout << i << "{{n}}";`,
          },
        ],
      },
      quiz: [
        {
          id: "3.1-q1",
          question: "`std::cout << 3 << 4` ekranga nima yozadi?",
          options: ["7", "34", "3 + 4", "12"],
          answer: 1,
          explanation:
            "Ikki marta << ikkita alohida son yuboradi. Qo'shish yo'q, orada probel ham yo'q. Natija 34. 7 chiqishi uchun 3 + 4 bo'lishi kerak.",
        },
        {
          id: "3.1-q2",
          question: "`std::endl` ning `{{n}}` dan ortiqcha ishi nima?",
          options: [
            "Ikki marta yangi qator tashlaydi",
            "Buferni darhol bo'shatadi (flush)",
            "Matnni qizil qiladi",
            "cin dan son o'qiydi",
          ],
          answer: 1,
          explanation:
            "endl avval yangi qator belgisini yozadi, keyin flush() chaqiradi. Ko'rinadigan qo'shimcha belgi yo'q. Farq bufer qachon tizimga berilishida.",
        },
        {
          id: "3.1-q3",
          question: "Kichik dastur tugaganda faqat `{{n}}` ishlatilgan matn nima uchun baribir ko'rinadi?",
          options: [
            "Chunki {{n}} har doim flush qiladi",
            "Chunki oqim yopilayotganda qolgan bufer flush qilinadi",
            "Chunki cout bufer ishlatmaydi",
            "Chunki endl yashirin qo'shiladi",
          ],
          answer: 1,
          explanation:
            "{{n}} standart bo'yicha flush emas. Lekin dastur tinch tugasa, cout vayron bo'lishidan oldin buferni bo'shatadi. Yiqilishda bu kafolat yo'qolishi mumkin.",
        },
      ],
    },
    {
      id: "3.2",
      navTitle: "Escape belgilar",
      title: "Escape ketma-ketliklar",
      goal: [
        "Bu darsdan keyin siz `{{t}}`, `{{bs}}`, `{{bs}}\"` va `{{a}}` ni manbadagi ikki belgi emas, kompilyator qo'yadigan bitta bayt deb tushuntirasiz. Tab ustunini, qo'shtirnoqni va teskari chiziqni satr ichida qanday yozishni, `{{a}}` nima uchun ekranda ko'rinmasligini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Telegrammadagi qisqa kodni eslang. «STOP» alohida so'z emas, «gap tugadi» degan signal. Xatdagi teskari chiziq ham signal bayrog'i: keyingi harfni harf deb o'qima, buyruq deb o'qi. `n` yangi qator, `t` tab, `a` signal, teskari chiziqning o'zi esa «bayroqni bayroq sifatida yoz».",
          "Bayroq xat yetib borganda qolmaydi. Qabul qiluvchi tayyor xatni ko'radi: qator sindirilgan, qo'shtirnoq turibdi, teskari chiziq bitta. Ikki belgili kod yo'lda bitta buyruqqa aylanadi. Buni `cout` emas, kompilyator qiladi. `cout` tayyor baytni olib ketadi.",
          "`{{a}}` — qo'ng'iroq. Xatning o'zida yangi harf yo'q. Idora qo'ng'iroqni chalishi mumkin, ovozsiz qilib qo'ygan bo'lsa, indamaydi. Matn baribir chiqadi. Qo'ng'iroq chiqmagani dastur xato degani emas.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Escape faqat belgili literal ichida ishlaydi: qo'shtirnoqdagi satr yoki birtirnoqdagi `char`. Oddiy kodning o'rtasida `{{n}}` yozib bo'lmaydi.",
        ],
        items: [
          {
            title: "Shu darsdagi to'rtta kod va qo'shnilari",
            paragraphs: [
              "`{{t}}` — tab, ASCII 9. Kursor keyingi tab to'xtamigacha sakraydi. Odatiy terminalda to'xtamlar 8, 16, 24-ustunlarda. Bu C++ qoidasi emas, terminal sozlamasi. `{{t}}` sakkizta probel yozmaydi. Bitta belgi yozadi. Oldingi matn 3 harf bo'lsa, tab 8-ustunga olib boradi. 4 harf bo'lsa, yana 8-ustunga. Probel soni har safar bir xil emas.",
              "`{{bs}}` manbada ikki marta yoziladi: `{{bs}}{{bs}}`. Chiqishda bitta teskari chiziq. Windows yo'li `C:{{bs}}kitob{{bs}}hello.cpp` kodda `C:{{bs}}{{bs}}kitob{{bs}}{{bs}}hello.cpp` bo'ladi. Bitta teskari chiziq yozsangiz, keyingi harf escape bo'lib ketadi.",
              "`{{bs}}\"` satr ichidagi qo'shtirnoq. Qo'shtirnoq o'zi satrni tugatadi. Oldiga teskari chiziq qo'yilsa, u tugatuvchi emas, matnning bir belgisi. Ekranda `\"` ko'rinmaydi, oddiy `\"` qoladi.",
              "`{{a}}` — BEL, ASCII 7. Ko'rinadigan belgi emas. Terminal qisqa ovoz berishi, sarlavhani yiltillatishi yoki e'tiborsiz qoldirishi mumkin. Zamonaviy Windows Terminal ko'pincha jim. Dastur baribir baytni yuboradi.",
              "Qo'shnilar: `{{n}}` qator (3.1-dars), `\\'` birtirnoq, `\\0` nol bayt. Noma'lum kod, masalan `\\q`, zamonaviy kompilyatorda xato. Ixtiro qilmang.",
            ],
            table: {
              caption: "Manbada ikki belgi, xotirada bittasi.",
              headers: ["Manbada", "Bayt", "Ekranda"],
              rows: [
                ["{{t}}", "9", "keyingi tab ustuniga sakrash"],
                ["{{bs}}{{bs}}", "92", "bitta \\"],
                ["{{bs}}\"", "34", "qo'shtirnoq"],
                ["{{a}}", "7", "ko'rinmaydi, signal bo'lishi mumkin"],
                ["{{n}}", "10", "yangi qator"],
              ],
            },
          },
          {
            title: "Tab ustuni qanday hisoblanadi",
            paragraphs: [
              "Ustun 1 dan emas, 0 dan hisoblang. `Ism` uch harf, kursor 3-o'rinda. Keyingi to'xtam 8. Tab shu joygacha bo'sh joy qoldiradi. `Vali` to'rt harf, kursor 4-da, to'xtam yana 8. Ikkala so'z ham 8-ustundan davom etadi. Shuning uchun ustunlar tekislanadi.",
              "Agar so'z 8 harfdan uzun bo'lsa, tab keyingi to'xtamga, 16 ga, sakraydi. Ustun buziladi. Aniq kenglik kerak bo'lsa, 3.4-darsdagi `setw` ishlating. `{{t}}` qisqa ro'yxat uchun qulay, jadval uchun zaif.",
            ],
          },
          {
            title: "Satr va belgi",
            paragraphs: [
              "Satrda qo'shtirnoqni `{{bs}}\"` qilib yozasiz. `char` da birtirnoqni `\\'` qilib yozasiz: `char belgi = '\\'';`. Teskari chiziqning o'zi `char` da ham ikki marta: `char chiziq = '{{bs}}{{bs}}';`.",
              "Escape `cout` ga yetib kelmaydi. Agar siz buferni ko'ra olsangiz, `{{n}}` o'rniga bitta 10-bayt turadi. Debugda manba kodini emas, baytni ko'rasiz.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Tab bilan ikkita ustun",
          intro: [
            "Uch qator ham bir xil `{{t}}` yuboradi. Bo'sh joy har qatorda boshqacha ko'rinishi mumkin, chunki tab «shu joygacha sakra» deydi, «7 ta probel qo'y» demaydi.",
          ],
          codeLabel: "jadval.cpp",
          code: `#include <iostream>

int main() {
    std::cout << "Ism{{t}}Yosh{{n}}";
    std::cout << "Ali{{t}}18{{n}}";
    std::cout << "Vali{{t}}20{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol (tab kengligi 8 bo'lsa)",
          console: "Ism{{tab}}Yosh\nAli{{tab}}18\nVali{{tab}}20",
          analysis: [
            {
              lines: "4",
              text: "`Ism` 3 belgi. `{{t}}` bitta bayt, kod 9. Odatiy terminal kursoru 8-ustunga qo'yadi, keyin `Yosh` yoziladi. `{{n}}` qatorni tugatadi. Manbada `\\` va `t` ikki belgi, chiqishda bitta tab.",
            },
            {
              lines: "5",
              text: "`Ali` ham 3 belgi. Xuddi shu hisob, `18` ham 8-ustundan boshlanadi. `Ism` va `Ali` tagma-tag tushadi.",
            },
            {
              lines: "6",
              text: "`Vali` 4 belgi. Tab yana 8-ustunga yetkazadi. So'z uzunroq bo'lsa ham, to'xtam o'sha joyda. Agar ism 9 harf bo'lsa, tab 16-ustunga sakrardi va `Yosh` ustuni surilardi.",
            },
            {
              lines: "",
              label: "konsol",
              text: "Ko'rinadigan bo'shliq sakkizta yozilgan probel emas. O'rtada bitta tab belgisi bor. Boshqa muharrir tabni 4 ustunga qo'ysa, bo'shliq qisqaradi, dastur o'zgarmaydi.",
            },
          ],
        },
        {
          title: "Teskari chiziq va qo'shtirnoq",
          intro: [
            "Ekranda bitta `\\` va oddiy qo'shtirnoq ko'rinishi uchun manbada ularni qochirasiz. Aks holda satr erta tugaydi yoki keyingi harf buyruqqa aylanadi.",
          ],
          codeLabel: "qochish.cpp",
          code: `#include <iostream>

int main() {
    std::cout << "Fayl: C:{{bs}}{{bs}}kitob{{bs}}{{bs}}hello.cpp{{n}}";
    std::cout << "U dedi: {{bs}}"Salom{{bs}}"{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `Fayl: C:\\kitob\\hello.cpp
U dedi: "Salom"`,
          analysis: [
            {
              lines: "4",
              text: "Manbadagi har bir `{{bs}}{{bs}}` jufti bitta teskari chiziq baytiga aylanadi. `C:` dan keyin shu bayt, keyin `kitob`, yana bitta, keyin `hello.cpp`. Ekranda `C:\\kitob\\hello.cpp`. Agar juft yozmasdan `C:{{bs}}kitob` qilsangiz, `{{bs}}k` noma'lum escape bo'lib, kompilyator xato beradi.",
            },
            {
              lines: "5",
              text: "Satr `\"` bilan ochiladi. `{{bs}}\"` ichki qo'shtirnoq, satrni yopmaydi. `Salom` dan keyingi `{{bs}}\"` yana ichki qo'shtirnoq. Eng oxiridagi yalang `\"` satrni tugatadi. Ekranda `U dedi: \"Salom\"`. Teskari chiziqlar ko'rinmaydi.",
            },
            {
              lines: "",
              label: "xotira",
              text: "Ikkinchi satrning ichida qo'shtirnoq baytlari (kod 34) bor, teskari chiziq bayti yo'q. Teskari chiziq faqat manbada yo'l ko'rsatgan.",
            },
          ],
        },
        {
          title: "\\a signal beradi, harf chizmaydi",
          intro: [
            "Dastur ikki qator matn chiqaradi. `{{a}}` uchun alohida belgi joy egallamaydi. Ovoz chiqishi, chiqmasligi mumkin. Matn o'zgarmaydi.",
          ],
          codeLabel: "signal.cpp",
          code: `#include <iostream>

int main() {
    std::cout << "Diqqat{{a}}{{n}}";
    std::cout << "Matn chiqdi.{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `Diqqat
Matn chiqdi.`,
          analysis: [
            {
              lines: "4",
              text: "`Diqqat` oltita oddiy harf. `{{a}}` ASCII 7, ko'rinmas. `{{n}}` qatorni tugatadi. Ekranda faqat `Diqqat`. Terminal BEL baytini ko'rsa, qisqa signal yoki sarlavha yiltirashi mumkin. Windows Terminal ko'pincha jim turadi. Bu xato emas.",
            },
            {
              lines: "5",
              text: "Ikkinchi qator oddiy matn. Signal uni buzmaydi, qo'shimcha belgi qoldirmaydi.",
            },
            {
              lines: "",
              label: "tekshirish",
              text: "Agar ovoz eshitilmasa, `{{a}}` ni o'chirib dasturni qayta yig'mang. Avval terminal sozlamasini biling. Ko'rinadigan natija o'zgarmasligi kerak.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Kompilyator satr literalini o'qiganda teskari chiziqni ko'radi va keyingi harf bilan birga bitta bayt yozadi. `.exe` ichidagi satrda `{{t}}` yo'q. Bor narsa — bayt 9. `cout` bu baytni buferga ko'chiradi. Terminal bayt 9 ni ko'rib, kursorni keyingi to'xtamga suradi.",
          "`C:{{bs}}{{bs}}kitob` manbada 12 ga yaqin belgi. Chiqish satrida `C:` , bitta 92-kod (`\\`), `kitob`. Juft teskari chiziq xotirada yarmiga tushadi.",
          "`{{a}}` ham xuddi shu yo'l: manbada ikki belgi, binaryda bayt 7, buferda bayt 7, terminalda esa glyuk yo'q. Ovoz qurilmasi shu baytga reaksiya qiladi yoki qilmaydi. `cout` dinamik chalinmaydi.",
          "Noma'lum escape yig'ilishda to'xtaydi. Bunday satr `.exe` ga kirmaydi, buferga ham tushmaydi.",
        ],
        diagram: `Manba:   "Ism\\tYosh\\n"
Baytlar:  I s m  9  Y o s h  10  0

Manba:   "C:\\\\kitob"
Baytlar:  C :  92  k i t o b  0

Manba:   "Diqqat\\a"
Baytlar:  D i q q a t  7  0`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Escape xatosi odatda kompilyatorda ochiladi. Tab xatosi esa yig'iladi va ustun surilib ketadi.",
        ],
        items: [
          {
            title: "Windows yo'lida bitta teskari chiziq",
            why: [
              "`\"C:\\kitob\"` da `\\k` escape bo'lib qoladi. Kompilyator unknown escape sequence deydi. Har bir teskari chiziq uchun ikkitasini yozing.",
            ],
            wrong: `std::cout << "C:\\kitob\\hello.cpp";`,
            right: `std::cout << "C:{{bs}}{{bs}}kitob{{bs}}{{bs}}hello.cpp";`,
          },
          {
            title: "Qo'shtirnoqni qochirmaslik",
            why: [
              "Satr erta yopiladi, qolgan so'z kod bo'lib qoladi va sintaksis buziladi.",
            ],
            wrong: `std::cout << "U dedi: "Salom"";`,
            right: `std::cout << "U dedi: {{bs}}"Salom{{bs}}"";`,
          },
          {
            title: "Tabni sakkizta probel deb hisoblash",
            why: [
              "`{{t}}` bitta belgi. Qancha bo'sh joy chiqishi oldingi so'zning uzunligiga va terminaldagi tab kengligiga bog'liq. Qat'iy jadval uchun keyingi darsdagi `setw` kerak.",
            ],
          },
        ],
      },
      quiz: [
        {
          id: "3.2-q1",
          question: "Manbadagi `{{bs}}{{bs}}` ekranga nima bo'lib chiqadi?",
          options: [
            "Ikki teskari chiziq",
            "Bitta teskari chiziq",
            "Yangi qator",
            "Hech narsa, chunki bu izoh",
          ],
          answer: 1,
          explanation:
            "Birinchi teskari chiziq escape bayrog'i, ikkinchisi «bayroqning o'zini yoz» degani. Xotirada bitta bayt, kod 92. Ekranda bitta \\.",
        },
        {
          id: "3.2-q2",
          question: "`{{t}}` aniq nima qiladi?",
          options: [
            "Har doim sakkizta probel yozadi",
            "Bitta tab belgisi yuboradi, terminal kursoru keyingi to'xtamga sakraydi",
            "Satrni o'chiradi",
            "Yangi qator tashlaydi",
          ],
          answer: 1,
          explanation:
            "Tab ASCII 9. Probellar terminal chizadi. To'xtam odatda 8 ustun, lekin bu C++ qoidasi emas. setw aniqroq.",
        },
        {
          id: "3.2-q3",
          question: "`{{a}}` chiqarilganda ekranda nima ko'rinadi?",
          options: [
            "a harfi",
            "\\a yozuvi",
            "Ko'rinadigan belgi yo'q, signal bo'lishi mumkin",
            "Dastur to'xtaydi",
          ],
          answer: 2,
          explanation:
            "BEL bayti (7) glyuf emas. Terminal signal berishi yoki jim qolishi mumkin. Atrofidagi matn o'z joyida chiqadi.",
        },
      ],
    },
    {
      id: "3.3",
      navTitle: "cin va >>",
      title: "std::cin va >> operatori, bir nechta qiymat o'qish",
      goal: [
        "Bu darsdan keyin siz `cin >> a >> b` ni «ikkita qator o'qi» emas, «ikkita token o'qi» deb tushunasiz. Bo'sh joy, tab va yangi qator ajratuvchi ekanini, ortiqcha belgi buferda qolishini va son o'rniga so'z yozilsa oqim xato holatiga o'tishini ko'ra olasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Kassa oynasidagi navbat. Siz bir nechta qog'ozni bitta varaqqa yozib berishingiz mumkin: `18 175`. Kassir bo'sh joydan ajratib, birinchisini yosh qutisiga, ikkinchisini bo'y qutisiga qo'yadi. Qog'ozlarni alohida qatorga yozsangiz ham, kassir uchun farq yo'q. Yangi qator ham bo'sh joy oilasidan.",
          "`>>` «keyingi bo'lakni ol, oldidagi bo'sh joylarni tashlab ket» deydi. Bo'lak — token. Son uchun token raqamlardan iborat. Birinchi yot begona harfda to'xtaydi. O'sha harf navbatda qoladi, keyingi mijozga tegadi.",
          "Agar yosh o'rniga `salom` bersangiz, kassir qutini yopadi va «xato» kartasini qo'yadi. Keyingi `>>` ham ishlamaydi, karta turibdi. Kartani olish `clear`, yomon qog'ozni navbatdan yulib tashlash `ignore`. Ikkalasisiz qayta o'qish yana yiqiladi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`std::cin` standart kirish oqimi. Klaviatura yoki fayldan yo'naltirilgan stdin. `>>` ajratib o'qish operatori. U ham oqimni qaytaradi, shuning uchun zanjir bo'ladi.",
        ],
        items: [
          {
            title: "Bitta va bir nechta qiymat",
            paragraphs: [
              "`std::cin >> yosh;` bitta tokenni `yosh` ga yozadi. `std::cin >> a >> b >> c;` uchta token. Foydalanuvchi ularni bir qatorda `4 5 6`, yoki har birini alohida qatorda yozishi mumkin. `>>` uchun yangi qator, probel va tab bir xil: bo'sh joy.",
              "Oldindagi bo'sh joy tashlanadi. `   18` ham 18 bo'ladi. Tokendan keyingi bo'sh joy tokenning ichiga kirmaydi.",
              "Tur tokenni talqin qiladi. `int` butun son kutadi. `double` kasr ham kutadi: `1.75`. `char` bitta belgi oladi, lekin oldidagi bo'sh joyni tashlaydi. `18 A` dan `char` `A` ni oladi, probelni emas.",
              "So'z ichidagi probel tokenni bo'ladi. `Ali Valiyev` dan birinchi `>>` faqat `Ali` ni oladi. Familiya navbatda qoladi. To'liq qatorni bo'sh joyi bilan o'qish boshqa vosita, uni keyinroq ko'ramiz. Hozir `>>` bo'laklaydi.",
            ],
            code: `int a, b, c;
std::cin >> a >> b >> c;
int yosh;
double boy;
std::cin >> yosh >> boy;`,
            codeLabel: "zanjir",
          },
          {
            title: "Buferda nima qoladi",
            paragraphs: [
              "Siz Enter bosmaguningizcha terminal odatda qatorni dasturga bermaydi. Enterdan keyin butun qator, oxiridagi yangi qator bilan, stdin buferiga tushadi. `>>` shu buferdan token oladi. Olmagan qoldiq buferda turadi.",
              "`42x` dan `int` o'qilsa, `42` olinadi, `x` qoladi. Keyingi `char` o'qish `x` ni oladi. Siz ikkinchi son kutgan bo'lsangiz, `x` son emas, o'qish yiqiladi.",
              "`>>` dan keyin qolgan yangi qator ham qoldiq. Keyingi `>>` uni bo'sh joy sifatida tashlab ketadi, shuning uchun sonlar orasida muammo ko'rinmaydi. To'liq qator o'qiydigan vosita esa shu qolgan yangi qatorni bo'sh qator deb o'qib olishi mumkin. Hozir shuni eslab qoling.",
            ],
          },
          {
            title: "O'qish yiqilsa",
            paragraphs: [
              "Token turga to'g'ri kelmasa, `cin` xato holatiga tushadi (`failbit`). Zamonaviy C++ da muvaffaqiyatsiz son o'qish qutiga 0 yozadi. Eski kompilyatorlar qutini o'zgartirmay qo'yishi mumkin edi. Yangi kodda 0 ni «foydalanuvchi nol yozdi» deb qabul qilmang. Avval oqim sog'lommi, tekshiring.",
              "`if (!std::cin)` yiqilganini aytadi. Shu holatda keyingi `>>` ham darrov yiqiladi, hatto keyingi yozuv to'g'ri bo'lsa ham. Tiklash ikki qadam: `std::cin.clear();` xato bayrog'ini o'chiradi, `std::cin.ignore(1000, '{{n}}');` qolgan yomon qatordan mingtagacha belgini tashlaydi. `clear` yolg'iz o'zi yomon belgilarni olib tashlamaydi.",
            ],
            code: `if (!std::cin) {
    std::cin.clear();
    std::cin.ignore(1000, '{{n}}');
}`,
            codeLabel: "tiklash",
          },
        ],
      },
      examples: [
        {
          title: "Ikki turdagi qiymat, bitta qator",
          intro: [
            "Birinchi qatorni foydalanuvchi yozadi. Terminal uni ko'rsatadi. Dastur `Kiritildi` deb yozmaydi. Keyingi qatorlar `cout` niki.",
          ],
          codeLabel: "anketa.cpp",
          code: `#include <iostream>

int main() {
    int yosh;
    double boy;
    std::cout << "Yosh va bo'y: " << std::flush;
    std::cin >> yosh >> boy;
    std::cout << "Yosh: " << yosh << "{{n}}";
    std::cout << "Bo'y: " << boy << "{{n}}";
    return 0;
}`,
          consoleTitle: "Seans",
          console: `Yosh va bo'y: 18 1.75
Yosh: 18
Bo'y: 1.75`,
          analysis: [
            {
              lines: "4-5",
              text: "`yosh` va `boy` ochiladi, hali ichida ishonchli son yo'q. Ularni o'qishdan oldin chiqarmang.",
            },
            {
              lines: "6",
              text: "Savol yangi qatorsiz qoladi. `flush` matnni `cin` dan oldin ko'rsatadi. `cin` ga bog'langan `cout` ham o'qishdan oldin flush qiladi, lekin flush ni ko'z bilan ko'rib turish zarar qilmaydi.",
            },
            {
              lines: "7",
              text: "`>>` avval bo'sh joyni tashlaydi, `18` ni butun songa aylantiradi, `yosh` ga yozadi. Keyin yana bo'sh joyni tashlab, `1.75` ni `double` qiladi. Nuqta kasr ajratuvchi. Enter qatorni dasturga beradi. Ikkala son bitta qatorda turishi mumkin.",
            },
            {
              lines: "8-9",
              text: "`cout` endi qutidagi tayyor sonlarni belgi qilib chiqaradi. `18` va `1.75`. Bu yerda o'qish tugagan. Foydalanuvchi yozgan qator bilan dastur yozgan qatorni aralashtirmang.",
            },
          ],
        },
        {
          title: "Uchta son, qatorlar bo'linishi muhim emas",
          intro: [
            "Birinchi seansda sonlar alohida qatorda. Ikkinchi dastur emas, xuddi shu dasturga boshqa kiritish. Natija bir xil, chunki yangi qator ham bo'sh joy.",
          ],
          codeLabel: "yigindi.cpp",
          code: `#include <iostream>

int main() {
    int a, b, c;
    std::cin >> a >> b >> c;
    std::cout << a << " + " << b << " + " << c
              << " = " << (a + b + c) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Seans (alohida qatorlar)",
          console: `4
5
6
4 + 5 + 6 = 15`,
          analysis: [
            {
              lines: "4",
              text: "Uchta `int` bitta qatorda e'lon qilinadi. Uchala ham hozircha yozilmagan. Vergul yangi tur ochmaydi, hammasi `int`.",
            },
            {
              lines: "5",
              text: "Birinchi `>>` `4` ni oladi. Buferda yangi qator qoladi. Ikkinchi `>>` shu yangi qatorni bo'sh joy deb tashlaydi va `5` ni oladi. Uchinchi `6` ni oladi. Foydalanuvchi `4 5 6` ni bitta qatorda yozsa ham, xuddi shu uchta token tushadi.",
            },
            {
              lines: "6-7",
              text: "`a + b + c` qavsda, avval 15 hisoblanadi. Zanjir sonlarni va `\" + \"` matnini yonma-yon yozadi. Kodning 6-qatori sindirilgani ekranni sindirmaydi. Ekrandagi yagona yangi qator oxiridagi `{{n}}`.",
            },
            {
              lines: "",
              label: "konsol",
              text: "`4`, `5`, `6` siz yozgan qatorlar. Oxirgi qator dastur hisoblab yozgan javob. Yig'indi 15.",
            },
          ],
        },
        {
          title: "Qoldiq buferda qoladi, yomon token oqimni yopadi",
          intro: [
            "Birinchi dastur `42x` dan son va qolgan harfni oladi. Ikkinchi parcha so'z bersangiz, son o'qish yiqiladi va oqim yopiladi.",
          ],
          files: [
            {
              name: "qoldiq.cpp",
              code: `#include <iostream>

int main() {
    int son;
    char harf;
    std::cin >> son >> harf;
    std::cout << son << "{{n}}";
    std::cout << harf << "{{n}}";
    return 0;
}`,
            },
            {
              name: "xato.cpp",
              code: `#include <iostream>

int main() {
    int son = -1;
    std::cin >> son;
    if (!std::cin) {
        std::cout << "Bu son emas{{n}}";
    } else {
        std::cout << son << "{{n}}";
    }
    return 0;
}`,
            },
          ],
          consoleTitle: "Ikkita seans",
          console: `42x
42
x

salom
Bu son emas`,
          analysis: [
            {
              lines: "6",
              label: "qoldiq.cpp",
              text: "`42x` bitta qator. `int` uchun `>>` raqamlarni oladi va `x` da to'xtaydi. `x` sonning belgisi emas, shuning uchun token tugadi. `son` 42. `x` buferda qoladi. Keyingi `>>` `char` uchun bo'sh joy tashlamaydi, chunki `x` bo'sh joy emas, va `harf` ga `x` yoziladi.",
            },
            {
              lines: "7-8",
              label: "qoldiq.cpp",
              text: "Konsol `42`, keyin `x`. Dastur `x` ni o'zi to'qimagan. Sizning qatoringizning qoldig'i.",
            },
            {
              lines: "5-7",
              label: "xato.cpp",
              text: "`salom` ni `int` qilib bo'lmaydi. Birinchi harfdayoq yiqilish. `failbit` yonadi. Zamonaviy C++ `son` ga 0 yozadi. Biz 0 ni chiqarmaymiz. `!std::cin` rost, ekranda `Bu son emas`.",
            },
            {
              lines: "",
              label: "keyingi o'qish",
              text: "Shu joyda yana `cin >> son` qilsangiz, u ham yiqiladi. `salom` buferda yotibdi, bayroq ham yoniq. `clear` bayroqni o'chiradi. `ignore` yomon qatorni tashlaydi. Ikkalasi kerak.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Siz `18` deb yozsangiz, terminal buferga ikki belgi qo'yadi: kod 49 va 56, ya'ni `'1'` va `'8'`, keyin Enter bayti 10. Bu hali `int` emas. `>>` shu belgilarni o'qiydi, 1×10+8 hisoblaydi va `yosh` qutisiga 18 ni 4 baytlik son qilib yozadi. Belgilar buferdan olinadi.",
          "`1.75` uchun `>>` nuqtani ko'radi va kasr qismini yig'adi, natijani `double` ning 8 baytiga, IEEE naqshiga yozadi. Ekranga qaytganida `cout` naqshni yana belgilarga aylantiradi. Aylanishlar teng emas: kirgan belgilar va chiqqan belgilar bir xil ko'rinishi mumkin, ichkarida esa son turadi.",
          "O'qilmagan `x` stdin buferida, sizning `char` qutingizda emas, toki keyingi `>>` uni olmaguncha. Oqimning `failbit` bayrog'i `cin` obyektining ichida, alohida qutida emas. Bayroq yoniq ekan, `>>` buferga qo'l tekkizmaydi.",
          "`ignore` belgilarni o'qiydi va tashlaydi. Ular hech qanday `int` ga yozilmaydi. `clear` faqat bayroqni o'chiradi, baytlarni surmaydi.",
        ],
        diagram: `Klaviatura qatori:  '1' '8' ' ' '1' '.' '7' '5'  10
>> int     yosh qutisi:  18
>> double  boy qutisi:   1.75 ning 8 bayti
qolgan bufer:  bo'sh

"42x"  ->  int 42 oladi, 'x' buferda qoladi
"salom" -> failbit yonadi, son qutisiga 0 yozilishi mumkin`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "`cin` xatosi ko'pincha yig'iladi. Dastur keyingi sonni «ko'rmaydi» yoki 0 chiqaradi.",
        ],
        items: [
          {
            title: "Yiqilgan oqimni clear qilmasdan qayta o'qish",
            why: [
              "`clear` siz yangi `>>` darrov qaytadi. `clear` dan keyin ham `salom` buferda qolsa, yana yiqiladi. Ikkala qadam kerak.",
            ],
            wrong: `std::cin.clear();
std::cin >> son;`,
            right: `std::cin.clear();
std::cin.ignore(1000, '{{n}}');
std::cin >> son;`,
          },
          {
            title: "Bo'sh joyni token ichida deb o'ylash",
            why: [
              "`Ali Valiyev` ikkita token. Birinchi `>>` faqat `Ali`. Ism va familiyani bitta `>>` bilan ololmaysiz.",
            ],
            wrong: `std::cin >> ism;   // "Ali Valiyev" dan faqat Ali`,
            right: `std::cin >> ism >> familiya;`,
          },
          {
            title: "O'qilmagan qutini ishlatish",
            why: [
              "`cin` yiqilsa, siz chiqarayotgan son foydalanuvchiniki bo'lmasligi mumkin. Avval `if (std::cin)` tekshiring, keyin hisoblang.",
            ],
            wrong: `std::cin >> son;
std::cout << son * 2;`,
            right: `if (std::cin >> son) {
    std::cout << son * 2 << "{{n}}";
}`,
          },
        ],
      },
      quiz: [
        {
          id: "3.3-q1",
          question: "Foydalanuvchi `4 5 6` ni bitta qatorda yozsa, `cin >> a >> b >> c` nima qiladi?",
          options: [
            "Faqat 4 ni o'qiydi, qolganini tashlaydi",
            "Uchta tokenni a, b va c ga yozadi",
            "4, 5 va 6 ni qo'shib bitta songa aylantiradi",
            "Xato beradi, chunki yangi qator yo'q",
          ],
          answer: 1,
          explanation:
            ">> bo'sh joy bilan ajratilgan tokenlarni oladi. Yangi qator shart emas, probel ham ajratuvchi. a=4, b=5, c=6.",
        },
        {
          id: "3.3-q2",
          question: "`int` ga `42x` berilsa, nima bo'ladi?",
          options: [
            "son 42 bo'ladi, x buferda qoladi",
            "son 42x bo'lib saqlanadi",
            "dastur kompilyatsiya bo'lmaydi",
            "x ham songa qo'shiladi",
          ],
          answer: 0,
          explanation:
            "Raqamlar tokenni tuzadi, birinchi yot belgi to'xtatadi va buferda qoladi. Keyingi >> shu x dan boshlaydi.",
        },
        {
          id: "3.3-q3",
          question: "Son o'rniga `salom` yozilgach, keyingi `>>` nima uchun ham yiqiladi?",
          options: [
            "Chunki cin o'chib ketadi",
            "Chunki failbit yoniq turadi va qolgan yozuv buferda qoladi",
            "Chunki salom 0 ga teng",
            "Chunki cout band",
          ],
          answer: 1,
          explanation:
            "Xato bayrog'i o'zi tozalanmaydi. clear() bayroqni o'chiradi, ignore esa yomon belgilarni tashlaydi. Bittasi yetmaydi.",
        },
      ],
    },
    {
      id: "3.4",
      navTitle: "setw va precision",
      title: "<iomanip> bilan chiroyli chiqarish",
      goal: [
        "Bu darsdan keyin siz `setw` ning faqat keyingi chiqarishga ishlashini, `setprecision` va `fixed` ning oqimda qolib ketishini ajratasiz. Aniqligingiz kasrdan keyingi xona emas, jami ishonchli raqam ekanini `fixed` siz ko'rsatib bera olasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Anketadagi kataklarni ko'ring. Ism uchun 10 katta katak, yosh uchun 6 ta. `setw` keyingi yozuvga «shu qadar katak egalla» deydi. Yozuv qisqa bo'lsa, bo'sh kataklar to'ldiriladi. Yozuv uzun bo'lsa, katak yirtiladi: matn to'liq chiqadi, kesilmaydi.",
          "Bu buyruq bir marta ishlaydi. Keyingi so'z yangi anketa olmaguncha o'z uzunligicha yoziladi. `setfill` esa qalam turi: bo'sh joyni probel bilan emas, nol bilan bo'yaver. Qalam qo'lingizda qoladi. Katak esa har safar qaytadan chiziladi.",
          "`setprecision` «nechta ishonchli raqam» deydi. `fixed` qo'yilsa, o'sha son boshqa ma'no oladi: nuqtadan keyin nechta raqam. Anketa qoidasi o'zgarguncha yangi qoida kuchda qoladi. `setw` dan farqi shu. Bitta `setprecision` keyingi barcha kasrlarga tegadi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`setw`, `setprecision` va `setfill` uchun `#include <iomanip>`. `fixed`, `left`, `right` `iostream` orqali ham keladi, lekin manipulyatorlarni birga ishlatganda `iomanip` ni yozib qo'ying. Sarlavha bo'lmasa, `setw` e'lon qilinmagan degan xato chiqadi.",
        ],
        items: [
          {
            title: "setw — faqat keyingi chiqarish",
            paragraphs: [
              "`std::setw(10)` keyingi `<<` ga minimal kenglik beradi. Undan keyingi `<<` yana kengliksiz. Har bir ustun uchun `setw` ni qayta yozing.",
              "Sukut bo'yicha o'ngga tekislanadi: bo'sh joy chapda. `std::left` chapga tekislaydi va shu bayroq oqimda qoladi. `std::right` qaytaradi.",
              "Matn `setw` dan uzun bo'lsa, kesilmaydi. 12 harfli ism `setw(10)` ichida ham 12 harf chiqadi. Ustun suriladi.",
              "`std::setfill('0')` to'ldirish belgisini o'zgartiradi va qoladi. `setw` bo'lmasa, to'ldirish ko'rinmaydi, chunki qo'shimcha katak yo'q. `setfill(' ')` probelga qaytaradi.",
            ],
            code: `std::cout << std::setw(10) << "Ali" << std::setw(6) << 18 << "{{n}}";
std::cout << std::setfill('0') << std::setw(4) << 7 << "{{n}}";`,
            codeLabel: "kenglik",
          },
          {
            title: "setprecision va fixed",
            paragraphs: [
              "Odatiy aniqlik 6. `fixed` yo'q paytda bu jami ishonchli raqam. `3.1415926535` shu rejimda `3.14159` ko'rinadi. `setprecision(3)` uni `3.14` qiladi: uchta ishonchli raqam, nuqtadan keyingi uchta emas.",
              "Juda katta yoki juda kichik son shu rejimda ilmiy ko'rinishga o'tadi. `1000000` aniqlik 2 da `1e+06` bo'ladi. Bu xato emas. Ikkita ishonchli raqam shunday yoziladi.",
              "`std::fixed` dan keyin aniqlik nuqtadan keyingi xonalar. `setprecision(3)` endi `3.142` (yaxlitlanadi). `1000000` esa `1000000.000` emas, aniqlik 2 bo'lsa `1000000.00`.",
              "Ikkalasi ham yopishqoq. Keyingi `double` lar shu qoidada chiqadi, toki `setprecision` ni o'zgartirsangiz yoki `std::defaultfloat` bilan odatiy ko'rinishga qaytarsangiz. `int` ga aniqlik ta'sir qilmaydi. U butun yoziladi.",
            ],
            code: `std::cout << std::setprecision(3) << pi << "{{n}}";
std::cout << std::fixed << pi << "{{n}}";
std::cout << std::defaultfloat;`,
            codeLabel: "aniqlik",
          },
          {
            title: "Qaysi biri qoladi",
            paragraphs: [
              "Bir marta: `setw`. Har chiqarishdan oldin qayta yoziladi, ishlatilgach kenglik 0 ga tushadi.",
              "Qoladi: `setprecision`, `fixed` yoki `defaultfloat`, `left` yoki `right`, `setfill`. Jadval tugagach, keyingi oddiy son kutilmaganda `0007` yoki `1e+06` bo'lib chiqmasin. Jadvaldan keyin `setfill(' ')` va kerak bo'lsa `defaultfloat` qaytaring.",
            ],
            table: {
              caption: "Yopishqoqlik — shu darsning asosiy farqi.",
              headers: ["Vosita", "Nimaga tegadi", "Qoladimi"],
              rows: [
                ["setw(n)", "keyingi bitta <<", "yo'q"],
                ["setprecision(n)", "keyingi kasrlar", "ha"],
                ["fixed", "aniqlikning ma'nosi", "ha"],
                ["setfill(c)", "to'ldirish belgisi", "ha"],
                ["left / right", "tekislash", "ha"],
              ],
            },
          },
        ],
      },
      examples: [
        {
          title: "setw bilan ustun, har safar qayta",
          intro: [
            "Kenglik 10 va 6. O'ngga tekislanadi. `Muhammad` 8 harf, 10 katakka sig'adi. Agar ism 10 dan uzun bo'lsa, u kesilmaydi.",
          ],
          codeLabel: "ustun.cpp",
          code: `#include <iostream>
#include <iomanip>

int main() {
    std::cout << std::setw(10) << "Ism" << std::setw(6) << "Yosh" << "{{n}}";
    std::cout << std::setw(10) << "Ali" << std::setw(6) << 18 << "{{n}}";
    std::cout << std::setw(10) << "Muhammad" << std::setw(6) << 7 << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `       Ism  Yosh
       Ali    18
  Muhammad     7`,
          analysis: [
            {
              lines: "2",
              text: "`<iomanip>` `setw` e'lonini beradi. `iostream` yolg'iz o'zi bu nomni ochmasligi mumkin. Sarlavhasiz `setw` was not declared.",
            },
            {
              lines: "5",
              text: "Birinchi `setw(10)` faqat `\"Ism\"` ga. `Ism` 3 harf, o'ngda, chapda 7 probel. Keyingi `setw(6)` alohida, faqat `\"Yosh\"` ga. `Yosh` 4 harf, chapda 2 probel. `{{n}}` kenglik olmaydi, u belgi.",
            },
            {
              lines: "6",
              text: "`setw` qolmagan. Yana yozamiz. `Ali` uchun 7 probel + `Ali`. `18` uchun 4 probel + `18`. Raqamlar ham o'ngga yopishadi.",
            },
            {
              lines: "7",
              text: "`Muhammad` 8 harf: M-u-h-a-m-m-a-d. 10 − 8 = 2 probel. `7` uchun 5 probel. Ustunlar tagma-tag. Agar `setw` ni ikkinchi qatorga qo'ymaganingizda, `Ali` chapdan, kengliksiz yozilardi.",
            },
          ],
        },
        {
          title: "Aniqlik avval ishonchli raqam, fixed dan keyin kasr xonasi",
          intro: [
            "Bitta `pi` to'rt marta chiqadi. Son xotirada o'zgarmaydi. O'zgaradigan narsa oqimning yozish qoidasi.",
          ],
          codeLabel: "pi.cpp",
          code: `#include <iostream>
#include <iomanip>

int main() {
    double pi = 3.1415926535;
    std::cout << pi << "{{n}}";
    std::cout << std::setprecision(3) << pi << "{{n}}";
    std::cout << std::fixed << pi << "{{n}}";
    std::cout << std::setprecision(8) << pi << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `3.14159
3.14
3.142
3.14159265`,
          analysis: [
            {
              lines: "5-6",
              text: "`pi` double. Birinchi chiqarish odatiy aniqlik 6, `fixed` yo'q. Olti ishonchli raqam: `3.14159`. Oxiridagi raqamlar yashirin, yo'qolgan emas.",
            },
            {
              lines: "7",
              text: "`setprecision(3)` yopishqoq. Hali `fixed` yo'q, demak uchta ishonchli raqam: `3.14`. Nuqtadan keyin ikkita raqam. «Uch xona» emas.",
            },
            {
              lines: "8",
              text: "`fixed` aniqlikning ma'nosini o'zgartiradi. 3 endi nuqtadan keyingi uchta xona. `3.141592...` uchinchi xonada 1, keyingisi 5, shuning uchun yaxlitlanib `3.142`. `fixed` ham qoladi.",
            },
            {
              lines: "9",
              text: "`setprecision(8)` oldingi 3 ni almashtiradi. `fixed` hali yoniq. Sakkiz xona: `3.14159265`. Keyingi raqam 3 bo'lgani uchun oxirgi 5 yaxlitlanmaydi. `pi` qutisi butun dastur davomida bir xil naqsh.",
            },
          ],
        },
        {
          title: "Kenglik qolmaydi, nol va ilmiy ko'rinish qoladi",
          intro: [
            "Bu dastur ikkita tuzoqni birga ko'rsatadi: `setprecision(2)` katta sonni `1e+06` qiladi, `setfill` esa `setw` tugagach ham qalamni qo'yib yubormaydi.",
          ],
          codeLabel: "qoldiq_uslub.cpp",
          code: `#include <iostream>
#include <iomanip>

int main() {
    double katta = 1000000.0;
    std::cout << std::setprecision(2) << katta << "{{n}}";
    std::cout << std::fixed << katta << "{{n}}";
    std::cout << std::setfill('0') << std::setw(4) << 7;
    std::cout << 8 << "{{n}}";
    std::cout << std::setw(4) << 9 << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1e+06
1000000.00
00078
0009`,
          analysis: [
            {
              lines: "6",
              text: "`fixed` yo'q, aniqlik 2. `1000000` ning ishonchli ikki raqami `1.0 × 10^6`. Zamonaviy kutubxona buni `1e+06` qilib yozadi. Son o'zgarmagan. Yozuv o'zgargan. Pul yoki hisobotda bu kutilmagan ko'rinish.",
            },
            {
              lines: "7",
              text: "`fixed` yoniq, aniqlik hali 2. Endi nuqtadan keyin ikki xona: `1000000.00`. Katta son ilmiy ko'rinishdan chiqadi. `fixed` keyingi kasrlarda ham qoladi.",
            },
            {
              lines: "8-9",
              text: "`setfill('0')` qoladi. `setw(4)` faqat `7` ga, natija `0007`. 9-qator darhol `8` ni kengliksiz yozadi va `{{n}}` qo'yadi. Qator `00078` bo'lib chiqadi: to'ldirilgan 7 va yonidagi 8. `setw` ikkinchi songa o'tmagan.",
            },
            {
              lines: "10",
              text: "Yangi `setw(4)` bor, `setfill('0')` hali o'chmagan. `0009`. Nol qalam `setw` tugashi bilan ketmaydi. Jadval bitgach `std::setfill(' ')` yozing.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`cout` obyektining ichida kichik sozlama maydonlari bor. `setw` kenglik maydoniga 10 yozadi. Navbatdagi `<<` shu maydonni o'qiydi, yetishmayotgan kataklar uchun to'ldirish belgisidan baytlar yaratadi, matnni buferga qo'yadi va kenglikni 0 ga qaytaradi. Sonning o'zi xotirada to'ldirilmaydi. Probel buferga chiqarish paytida qo'shiladi.",
          "`setprecision` boshqa maydonga yoziladi va keyingi `<<` uni nolga tushirmaydi. `fixed` esa format bayroqlaridagi bit. Bit yoniq turadi. Keyingi `double` shu bitni ko'rib, ishonchli raqam o'rniga kasr xonasini sanaydi.",
          "`3.1415926535` ning `double` naqshi to'rtta chiqarishda ham bir xil. Har safar `cout` naqshdan yangi belgilar yasaydi va ortig'ini yaxlitlaydi. Yaxlitlash faqat chiqayotgan matnda. Qutidagi kasr kesilmaydi.",
          "`setfill` ham bayroq emas, bitta `char` maydon. `'0'` yozilgach, har bir yangi `setw` shu belgini ko'chiradi. `setw` bo'lmasa, maydon turadi, lekin qo'shimcha bayt yaratilmaydi.",
        ],
        diagram: `cout ichidagi sozlama:
kenglik      10   ->  bitta << dan keyin 0
aniqlik       3   ->  qoladi
fixed       yoniq ->  qoladi
to'ldirish  '0'   ->  qoladi

double pi  [8 baytlik naqsh]  o'zgarmaydi
buferga    '3' '.' '1' '4' '2'   faqat shu chiqarish uchun yasaladi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Jadval yig'iladi, lekin ikkinchi qator suriladi yoki katta son `1e+06` bo'lib chiqadi.",
        ],
        items: [
          {
            title: "setw ni qatorga bir marta qo'yish",
            why: [
              "U faqat keyingi qiymatga tegadi. Ikkinchi ustun o'z holicha yoziladi va jadval buziladi.",
            ],
            wrong: `std::cout << std::setw(10) << ism << yosh << "{{n}}";`,
            right: `std::cout << std::setw(10) << ism << std::setw(6) << yosh << "{{n}}";`,
          },
          {
            title: "setprecision(2) ni ikki kasr xonasi deb o'qish",
            why: [
              "`fixed` siz bu ikki ishonchli raqam. Katta son ilmiy ko'rinishga o'tadi. Kasr xonasi kerak bo'lsa, avval `std::fixed`.",
            ],
            wrong: `std::cout << std::setprecision(2) << 1000000.0;`,
            right: `std::cout << std::fixed << std::setprecision(2) << 1000000.0;`,
          },
          {
            title: "Uzun matn kesiladi deb o'ylash",
            why: [
              "`setw` minimal kenglik. 15 harf `setw(10)` da ham 15 harf chiqadi. Kesish uchun bu vosita emas.",
            ],
          },
        ],
      },
      quiz: [
        {
          id: "3.4-q1",
          question: "`cout << setw(5) << 12 << 34` qanday ko'rinadi?",
          options: [
            "12 va 34 ikkalasi ham kengligi 5",
            "12 kengligi 5, 34 darhol yoniga yopishadi",
            "Faqat 34 kengligi 5",
            "Ikkalasi kesilib 1 va 3 bo'ladi",
          ],
          answer: 1,
          explanation:
            "setw faqat keyingi chiqarishga. 12 uchun uchta probel va 12, jami kenglik 5. 34 ga yangi setw yo'q, shuning uchun u darhol yoziladi.",
        },
        {
          id: "3.4-q2",
          question: "`fixed` yo'q. `setprecision(3)` va `pi` nima ko'rinishda chiqadi?",
          options: [
            "3.142, chunki nuqtadan keyin 3 xona",
            "3.14, chunki 3 ta ishonchli raqam",
            "3.1415926535 to'liq",
            "3",
          ],
          answer: 1,
          explanation:
            "fixed siz aniqlik ishonchli raqamlarni sanaydi. 3.14159... dan uchta raqam 3.14. 3.142 bo'lishi uchun avval fixed kerak.",
        },
        {
          id: "3.4-q3",
          question: "Jadvaldan keyin ham son `0009` bo'lib chiqayapti. Qaysi sozlama qolgan?",
          options: ["setw", "setfill('0')", "{{n}}", "cin"],
          answer: 1,
          explanation:
            "setw ishlatilgach o'chadi. setfill qoladi. Yangi setw shu nolni yana ishlatadi. setfill(' ') bilan probelga qaytaring.",
        },
      ],
    },
  ],
};

export const chapter3 = decode(rawChapter);
