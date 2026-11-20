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
  id: "2",
  number: 2,
  title: "Ma'lumotlar, Xotira va O'zgaruvchilar",
  summary:
    "O'zgaruvchi qanday quti, butun va kasr sonlar qancha joy oladi, char va bool ichkarida nima, const bilan #define farqi, turlar qanday aylantiriladi.",
  lessons: [
    {
      id: "2.1",
      navTitle: "O'zgaruvchi va RAM",
      title: "O'zgaruvchi nima va RAM xotirada joy qanday ajratiladi",
      goal: [
        "Bu darsdan keyin siz o'zgaruvchini «sonning o'zi» emas, xotiradagi nomlangan quti deb tushuntira olasiz. E'lon, boshlang'ich qiymat va qayta yozishni ajratasiz. `sizeof` nima o'lchashini va qiymat nusxa bo'lib ko'chishini ko'rsatib bera olasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Pochta xonasidagi qutini ko'z oldingizga keltiring. Qutining eshigida yorliq bor: `yosh`. Ichida bitta qog'oz yotadi, masalan 18. Yorliq — nom. Qog'ozdagi yozuv — qiymat. Quti polkada aniq joyda turadi — bu manzil. Siz «yosh» desangiz, xodim yorliqni qidiradi, qutini ochadi va ichidagi sonni o'qiydi.",
          "Quti har qanday narsani sig'dirmaydi. «Bu quti faqat butun son uchun» deb yozilgan bo'lsa, ichiga matn tiqib bo'lmaydi. Shu cheklov — tur. `int` qutisi butun son uchun, odatda to'rtta bayt. `char` qutisi bitta bayt.",
          "Yangi quti qo'yish — e'lon. Ichiga birinchi marta son yozish — boshlang'ich qiymat. Keyin boshqa son yozib, eskisini o'chirish — tayinlash. Eski son alohida joyga ko'chib ketmaydi, shu qutining ichida yangilanadi. Boshqa qutiga `a = b` desangiz, xodim `b` dagi qog'ozni ko'chirib `a` ga yopishtiradi. Ikki quti bitta qog'ozga bog'lanib qolmaydi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "O'zgaruvchi — ism, tur va xotiradagi joy. Ism kompilyator uchun. Dastur ishga tushganda protsessor ismni bilmaydi, u manzil bilan ishlaydi. Ism manzilga aylantirib qo'yiladi.",
        ],
        items: [
          {
            title: "E'lon, boshlang'ich qiymat, tayinlash",
            paragraphs: [
              "`int yosh;` — e'lon. Kompilyator «`yosh` degan `int` kerak» deb belgilaydi. Funksiya ichidagi bunday quti avtomatik xotirada (odatda stekda) joy oladi. Ichidagi qiymat esa yozilmagan. Uni o'qish xato. Nima chiqishi oldindan aytilmaydi.",
              "`int yosh = 18;` — e'lon va boshlang'ich qiymat birga. Quti ochilishi bilan ichida 18 bor. Yangi kodda shunday yozing.",
              "`yosh = 19;` — tayinlash. Quti oldin ochilgan bo'lishi shart. 18 o'chadi, 19 yoziladi. Chap tomonda nom, o'ng tomonda yangi qiymat. `=` tenglik emas, «qo'y» degani.",
              "`int yosh{18};` — figurali qavs bilan boshlang'ich qiymat. Oddiy son uchun `=` bilan bir xil. Farq 2.9-darsda chiqadi: figurali qavs tur sig'maydigan sonni yashirin kesishga yo'l qo'ymaydi.",
            ],
            code: `int yosh = 18;   // e'lon + boshlang'ich qiymat
yosh = 19;        // tayinlash, eski 18 yo'qoladi`,
            codeLabel: "ikki qadam",
          },
          {
            title: "Joy qayerdan olinadi",
            paragraphs: [
              "`main` ichida yozilgan oddiy o'zgaruvchi funksiya ishga tushganda stek kadri ichida joy oladi. Kadr — shu chaqiruv uchun ajratilgan bir bo'lak. `int` odatda 4 bayt. Ikki `int` yonma-yon taxminan 8 bayt. Aniq manzilni operatsion tizim har safar boshqacha qilib berishi mumkin. Sizning ishingiz manzilni yodlash emas, nom orqali murojaat qilish.",
              "`sizeof(yosh)` bayt sonini aytadi. `sizeof(int)` turining o'zi uchun ham ishlaydi. Windowsda `int` odatda 4. Bu son standart tomonidan qat'iy 4 deb qotirilmagan, lekin shu kitobdagi misollar shu odatga tayanadi.",
              "`&yosh` qutining manzilini beradi. `cout` uni o'n oltilik ko'rinishda chiqaradi, masalan `0x61fe14`. Keyingi ishga tushirishda son boshqacha bo'lishi normal. O'zgaruvchining qiymati 18 bo'lib qoladi, manzil esa «qayerda turibdi» degan alohida ma'lumot.",
            ],
          },
          {
            title: "Nusxa ko'chadi, quti yopishmaydi",
            paragraphs: [
              "`a = b` dan keyin ikkala qutida ham bir xil son turadi. Keyin `b` ni o'zgartirsangiz, `a` o'zgarmaydi. Ular bir xil manzilni baham ko'rmaydi. Bog'lab qo'yadigan narsa (`&` bilan olingan havola) keyingi boblarda keladi. Hozircha har bir o'zgaruvchi o'z qutisi.",
              "Blok tugaganda, ya'ni `}` yopilganda, ichkaridagi mahalliy qutilar bo'shaydi. Nom endi ko'rinmaydi. Xotira boshqa chaqiruvga qaytariladi. Shuning uchun funksiya ichidagi `int` dastur yopilguncha emas, blok tugaguncha yashaydi.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Quti ochiladi, keyin ichidagi son almashtiriladi",
          intro: [
            "Bitta `yosh` ikki marta chiqadi. Quti yangisi ochilmaydi. Ichidagi qiymat yangilanadi.",
          ],
          codeLabel: "yosh.cpp",
          code: `#include <iostream>

int main() {
    int yosh = 18;
    std::cout << yosh << "{{n}}";
    yosh = 19;
    std::cout << yosh << "{{n}}";
    std::cout << sizeof(yosh) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `18
19
4`,
          analysis: [
            {
              lines: "4",
              text: "`int` tur. `yosh` nom. `18` boshlang'ich qiymat. Shu qatorda quti ochiladi va ichiga 18 yoziladi. Agar `= 18` ni tashlab, keyingi qatorda `yosh` ni o'qisangiz, qiymat noma'lum bo'lardi.",
            },
            {
              lines: "5",
              text: "`cout` qutidagi joriy sonni ekranga yozadi. Nom emas, 18 chiqadi. `{{n}}` yangi qator.",
            },
            {
              lines: "6",
              text: "Tayinlash. Chapda eski quti, o'ngda yangi qiymat. 18 ning ustiga 19 yoziladi. Ikkinchi `int yosh` yo'q, shuning uchun bu yangi quti emas.",
            },
            {
              lines: "7-8",
              text: "7-qator endi 19 ni chiqaradi. 8-qator `sizeof(yosh)` — qiymatni emas, quti hajmini. `int` uchun odatiy javob 4 bayt. 19 soni kichik bo'lsa ham quti 4 baytligicha qoladi. Katta-kichiklik joy hajmini o'zgartirmaydi.",
            },
          ],
        },
        {
          title: "a = b nusxa oladi, ikki qutini yopishtirmaydi",
          intro: [
            "Ko'pchilik `a = b` ni «endi a va b bitta narsa» deb o'qiydi. Dastur buning teskarisini ko'rsatadi.",
          ],
          codeLabel: "nusxa.cpp",
          code: `#include <iostream>

int main() {
    int a = 10;
    int b = 20;
    a = b;
    std::cout << a << " " << b << "{{n}}";
    b = 30;
    std::cout << a << " " << b << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `20 20
20 30`,
          analysis: [
            {
              lines: "4-5",
              text: "Ikki alohida quti. `a` da 10, `b` da 20. Ikkala `int` ham odatda 4 baytdan, jami 8 bayt. Ular yonma-yon turishi mumkin, lekin bu sizning qaroringiz emas.",
            },
            {
              lines: "6",
              text: "`a = b` o'ngni o'qiydi, chapga yozadi. `b` dagi 20 nusxa bo'lib `a` ga tushadi. `b` o'zida 20 bo'lib qoladi. 10 yo'qoladi, chunki `a` ning ichida boshqa joy yo'q.",
            },
            {
              lines: "7",
              text: "Ikkala quti ham 20. Konsol `20 20`. O'rtadagi bo'sh joy satrda yozilgan qo'yilma emas, probel belgisi. Biz ikkita son orasiga probel qo'ydik.",
            },
            {
              lines: "8-9",
              text: "`b = 30` faqat `b` qutisini o'zgartiradi. `a` hali ham 20. Ikkinchi qator `20 30`. Agar ular yopishgan bo'lsa, `a` ham 30 bo'lardi. Bo'lmadi.",
            },
          ],
        },
        {
          title: "Manzil qiymat emas",
          intro: [
            "`&` qutining joyini so'raydi. Chiqqan `0x...` soni sizda boshqacha bo'ladi. Hajm va qiymat o'zgarmaydi.",
          ],
          codeLabel: "manzil.cpp",
          code: `#include <iostream>

int main() {
    int yosh = 18;
    std::cout << yosh << "{{n}}";
    std::cout << sizeof(yosh) << "{{n}}";
    std::cout << &yosh << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol (manzil namuna)",
          console: `18
4
0x61fe14`,
          analysis: [
            {
              lines: "4",
              text: "Qiymat 18. Bu qutining ichidagi yozuv.",
            },
            {
              lines: "5-6",
              text: "5-qator ichidagi yozuvni chiqaradi. 6-qator quti necha bayt ekanini. 4 — to'rtta bayt, ya'ni 32 bit. 18 soni shu 32 bitning ichida, qolgan bitlar nol.",
            },
            {
              lines: "7",
              text: "`&yosh` manzil operatori. «Quti qayerda?» `cout` ko'rsatgichni o'n oltilikda chiqaradi. `0x61fe14` bitta ishga tushirishning namunasidir. Sizda `0x` dan keyingi raqamlar boshqa bo'ladi. Dasturning mantiqi manzilga bog'lanmaydi.",
            },
            {
              lines: "",
              label: "farq",
              text: "18 — nima yotibdi. 4 — quti qancha katta. `0x61fe14` — quti qaysi javonda. Uchta savol, uchta boshqa javob. Ularni bitta songa aralashtirmang.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`int yosh = 18;` ishga tushganda protsessor stekda 4 bayt ajratadi va o'sha baytlarga 18 ning ikkilik ko'rinishini yozadi. Kichik son ham to'liq 4 baytni egallaydi. Qolgan baytlar nol bo'ladi, bo'sh qolmaydi.",
          "Nom `yosh` faylda matn bo'lib turadi. `.exe` ichida odatda shu nom qolmaydi. Qoladigan narsa — «shu manzilga 18 yoz, keyin o'sha manzilni o'qi» degan mashina buyrug'i. Debug rejimida nom saqlanishi mumkin, bu dasturchi uchun. Protsessor baribir manzil bilan ishlaydi.",
          "`yosh = 19` yangi 4 bayt so'ramaydi. O'sha manzilning ustiga 19 yoziladi. Eski 18 tiklanmaydi. Xuddi qog'ozning ustiga boshqa son yozgandek.",
          "`a = b` da `b` ning 4 bayti o'qiladi va `a` ning 4 baytiga ko'chiriladi. Ikkita manzil, ikkita nusxa. Blok tugaganda stek kadri yig'iladi. O'sha baytlar boshqa o'zgaruvchiga berilishi mumkin. Eski son «yashirincha» bir oz turishi mumkin, lekin unga nom bilan kira olmaysiz. Tayanib bo'lmaydi.",
        ],
        diagram: `Stek kadri (main)
manzil      4 bayt              nom (faqat kodda)
0x61fe14    18 00 00 00         yosh
0x61fe18    14 00 00 00         a      (20 yozilgandan keyin)
0x61fe1c    1e 00 00 00         b

a = b  =>  b dagi baytlar a manziliga nusxalanadi
b = 30 =>  faqat b manzili yangilanadi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "O'zgaruvchi xatolarining ko'pi kompilyator jim o'tadigan xatolar: qiymat yozilmagan qutini o'qish, `=` ni tenglik deb o'qish, nusxani bog'lanish deb o'ylash.",
        ],
        items: [
          {
            title: "Yozilmagan qutini o'qish",
            why: [
              "`int yosh;` dan keyin darhol `cout << yosh` — noma'lum qiymat. Ba'zan 0 chiqadi, ba'zan kechagi axlat, ba'zan kompilyator ogohlantiradi. 0 chiqsa ham «demak bo'sh quti nol» deb yodlamang. Mahalliy o'zgaruvchini e'lon qilgan joyda qiymat bering.",
            ],
            wrong: `int yosh;
std::cout << yosh;`,
            right: `int yosh = 18;
std::cout << yosh;`,
          },
          {
            title: "Bir nomni ikki marta ochish",
            why: [
              "Bir blokda `int yosh = 18;` va yana `int yosh = 19;` kompilyator «qayta e'lon» deb to'xtaydi. Ikkinchi marta tur yozilmaydi. Faqat `yosh = 19;`.",
            ],
            wrong: `int yosh = 18;
int yosh = 19;`,
            right: `int yosh = 18;
yosh = 19;`,
          },
          {
            title: "Blokdan tashqaridagi nom",
            why: [
              "`{ }` ichida ochilgan o'zgaruvchi shu blokka tegishli. Yopilgandan keyin nom yo'q. Tashqarida ishlatilsa, `was not declared` chiqadi. Bu xotira sehrli yo'qolgani emas, nomning ko'rinish chegarasi.",
            ],
            wrong: `{
    int ichki = 2;
}
std::cout << ichki;`,
            right: `int ichki = 2;
std::cout << ichki;`,
          },
        ],
      },
      quiz: [
        {
          id: "2.1-q1",
          question: "`int yosh = 18;` dan keyin `yosh = 19;` nima qiladi?",
          options: [
            "Yangi yosh qutisi ochiladi, eskisi 18 bo'lib qoladi",
            "O'sha qutining ichiga 19 yoziladi, 18 yo'qoladi",
            "18 va 19 qo'shiladi, natija 37",
            "Xotira manzili 19 ga o'zgaradi",
          ],
          answer: 1,
          explanation:
            "Birinchi qator quti ochadi. Ikkinchisida tur yo'q, demak yangi quti emas. Tayinlash ichidagi qiymatni almashtiradi. Manzil o'sha yerda qoladi.",
        },
        {
          id: "2.1-q2",
          question: "`a = b` dan keyin `b` o'zgartirilsa, `a` nima bo'ladi?",
          options: [
            "a ham birga o'zgaradi, chunki ular bitta quti",
            "a o'zgarmaydi, chunki unga qiymatning nusxasi tushgan",
            "a o'chib ketadi",
            "Kompilyator buni man etadi",
          ],
          answer: 1,
          explanation:
            "`a = b` qiymatni ko'chiradi. Ikkala o'zgaruvchining manzili boshqa. Keyin `b` ni yozish `a` ning baytlariga tegmaydi.",
        },
        {
          id: "2.1-q3",
          question: "`sizeof(yosh)` nima qaytaradi, agar `yosh` ichida 19 bo'lsa?",
          options: [
            "19",
            "Qutining bayt hajmi, odatda 4",
            "Manzil, masalan 0x61fe14",
            "Har doim 19 ta bit",
          ],
          answer: 1,
          explanation:
            "`sizeof` qiymatni emas, tur egallagan joyni o'lchaydi. `int` Windowsda odatda 4 bayt. 19 ham, 180000 ham shu qutiga sig'sa, hajm 4 bo'lib qoladi.",
        },
      ],
    },
    {
      id: "2.2",
      navTitle: "Nom berish",
      title: "Nom berish qoidalari",
      goal: [
        "Bu darsdan keyin siz kompilyator qabul qiladigan nom bilan odam o'qiydigan nomni ajratasiz. `camelCase`, `snake_case` va `KATTA_HARF` qayerda ishlatilishini, kalit so'z nima uchun nom bo'la olmasligini aniq aytasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Sinfda ikkita o'quvchi ham «Ali» bo'lsa, o'qituvchi «qaysi Ali?» deydi. Kompilyator ham bir blokda bir xil nomni ikki marta ochishga yo'l qo'ymaydi. Ism aniq bo'lishi kerak.",
          "Ba'zi ismlar ro'yxatda band. «Direktor» degan lavozimni bolaga qo'yib bo'lmaydi, chunki bu so'z eshikdagi lavozim uchun. C++ da `int`, `return`, `class` shunday band so'zlar. Ular kalit so'z. O'zgaruvchiga `int` deb nom qo'ya olmaysiz, chunki `int` allaqachon «butun son turi» degani.",
          "Maktabda ismni lotin harfi bilan boshlash, raqamni ichkarida ishlatish mumkin: `ali2`. Lekin `2ali` bo'lmaydi, chunki eshikdagi yorliq raqamdan boshlangan qatorni son deb o'qishni boshlaydi. `ali-vali` ham bo'lmaydi: chiziqcha ayirish belgisi. Kompilyator uni ikkita nom va o'rtada minus deb o'qiydi.",
          "Usul — bu maktab formasi. Til ikkala formani ham qabul qiladi: `talabaYoshi` va `talaba_yoshi`. Formani butun loyihada bir xil tutish odam uchun. Kompilyator uchun ikkalasi ham oddiy harf.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Qoida ikki qatlam. Birinchisi tilniki: buzsangiz, kod yig'ilmaydi. Ikkinchisi odamniki: buzsangiz, kod ishlaydi, lekin o'qilmaydi.",
        ],
        items: [
          {
            title: "Til qabul qiladigan nom",
            paragraphs: [
              "Nom harf yoki `_` bilan boshlanadi. Keyin harf, raqam va `_` kelishi mumkin. Bo'sh joy, chiziqcha, nuqta, o'zbekcha apostrof sig'maydi. `yosh`, `yosh2`, `_yosh` til bo'yicha mumkin. `2yosh`, `yosh-chegara`, `yosh chegara` mumkin emas.",
              "Katta-kichik harf boshqa nom. `Yosh` va `yosh` ikkita quti. Ko'pincha bu adashish. Yangi boshlovchi bitta usulda qolsin.",
              "Nom cheksiz uzun bo'lishi mumkin, lekin o'qiladigan bo'lsin. `a` o'rniga `eni`, `b` o'rniga `boyi`. Tsikl hisoblagichi `i` qisqa turishi mumkin, chunki u bir necha qator yashaydi. Buni keyinroq ko'rasiz.",
            ],
          },
          {
            title: "camelCase, snake_case, KATTA_HARF",
            paragraphs: [
              "`camelCase`: birinchi so'z kichik, keyingilarining boshi katta. `talabaYoshi`, `maksimalBall`. Ko'p darslik va Java o'rganib kelganlar shunday yozadi.",
              "`snake_case`: so'zlar kichik, o'rtada `_`. `talaba_yoshi`, `maksimal_ball`. C++ loyihalarida, jumladan ko'p ochiq kodda, o'zgaruvchi va funksiya shunday yoziladi. Ikkalasi ham to'g'ri. Bitta faylda ikkalasini aralashtirmang.",
              "`KATTA_HARF`: `MAKS_TALABA`, `PI`. Odatda o'zgarmas qiymat uchun. `const` va eski `#define` shu ko'rinishda ko'zga tashlanadi. Oddiy o'zgaruvchini to'liq katta yozmang, o'quvchi uni o'zgarmas deb o'ylaydi.",
              "Tur yoki sinf nomi ko'pincha `PascalCase`: `Talaba`, `Nuqta`. Hozircha sinf yo'q. Usulni eshitib qo'ying, keyin chalkashmaysiz.",
            ],
            table: {
              caption: "Usul namunasi. Til hammasi uchun bir xil qoidani qo'llaydi.",
              headers: ["Usul", "Namuna", "Qayerda"],
              rows: [
                ["camelCase", "talabaYoshi", "o'zgaruvchi, ba'zi jamoalar"],
                ["snake_case", "talaba_yoshi", "o'zgaruvchi, C++ da juda keng"],
                ["KATTA_HARF", "MAKS_TALABA", "const, #define"],
                ["PascalCase", "Talaba", "tur va sinf, keyinroq"],
              ],
            },
          },
          {
            title: "Kalit so'z va band nomlar",
            paragraphs: [
              "Kalit so'z tilning o'z buyrug'i. Uni o'zgaruvchi qilib bo'lmaydi. Siz hozir ishlatadiganlar: `int`, `short`, `long`, `char`, `bool`, `float`, `double`, `void`, `return`, `const`, `if`, `else`, `for`, `while`, `true`, `false`, `sizeof`, `signed`, `unsigned`, `static_cast`. Ro'yxat bundan uzun. Shubha bo'lsa, nomni o'zgartiring.",
              "`static_cast` ham kalit so'zlar oilasidan. `cast` deb o'zgaruvchi ochish mumkin, `static_cast` deb bo'lmaydi.",
              "Ikki pastki chiziq `__yosh` yoki katta harf oldidan bitta pastki chiziq `_Yosh` band. Ularni kompilyator va kutubxona ichki nomlari uchun ushlab qo'ygan. Boshida `_` qo'yishni odat qilmang. `yosh_` til bo'yicha xavfsizroq, lekin keraksiz. Oddiy `yosh` yozing.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Uchta usul, uchala ham yig'iladi",
          intro: [
            "Kompilyator usulni tekshirmaydi. U faqat harf qoidasini tekshiradi. Quyidagi uch nom uchala turli quti.",
          ],
          codeLabel: "uslub.cpp",
          code: `#include <iostream>

int main() {
    int talabaYoshi = 18;
    int talaba_yoshi = 19;
    const int MAKS_YOSH = 30;
    std::cout << talabaYoshi << "{{n}}";
    std::cout << talaba_yoshi << "{{n}}";
    std::cout << MAKS_YOSH << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `18
19
30`,
          analysis: [
            {
              lines: "4",
              text: "`talabaYoshi` camelCase. `Y` katta, qolgani kichik. Bu bitta nom, ikkita so'z emas. Bo'sh joy yo'q.",
            },
            {
              lines: "5",
              text: "`talaba_yoshi` snake_case. `_` so'zlarni ajratadi. `talabaYoshi` bilan bir xil emas. Ikkalasi birga yashay oladi, lekin o'quvchini chalg'itadi. Haqiqiy loyihada bittasini tanlang.",
            },
            {
              lines: "6",
              text: "`const int MAKS_YOSH` o'zgarmas. Katta harf «buni qayta yozma» degan signal. `const` ni 2.8-darsda ochamiz. Hozir: nom usuli qiymatning ma'nosiga yarashadi.",
            },
            {
              lines: "7-9",
              text: "Har bir `cout` o'z qutisini o'qiydi. 18, 19 va 30 alohida. Nomdagi harf registri qiymatni o'zgartirmaydi, qaysi quti tanlanishini o'zgartiradi.",
            },
          ],
        },
        {
          title: "Katta-kichik harf boshqa quti",
          intro: [
            "`sum` va `Sum` yonma-yon tursa, dastur yig'iladi. Odam esa xato qatorni o'qiydi. Shu xavfni ko'z bilan ko'ring.",
          ],
          codeLabel: "registr.cpp",
          code: `#include <iostream>

int main() {
    int sum = 10;
    int Sum = 20;
    std::cout << sum << "{{n}}";
    std::cout << Sum << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `10
20`,
          analysis: [
            {
              lines: "4-5",
              text: "Ikkala nom ham qonuniy. Farq bitta harf: `s` va `S`. Kompilyator ularni boshqa-boshqa belgi ketma-ketligi deb saqlaydi.",
            },
            {
              lines: "6",
              text: "`sum` kichik. Qiymat 10. Agar siz «ikkala qator ham 20» deb o'ylasangiz, registr sizni aldagan.",
            },
            {
              lines: "7",
              text: "`Sum` katta S bilan. Qiymat 20. Konsol 10, keyin 20. Ishlaydi, lekin yaxshi nom emas. Bittasini `jami`, ikkinchisini `chegara` qiling. Ma'no harf registriga yashirinmasin.",
            },
          ],
        },
        {
          title: "Raqamdan boshlash va kalit so'z yig'ilmaydi",
          intro: [
            "Quyidagi fayl maxsus buzilgan. Konsol dastur natijasi emas, kompilyator xabari. Ikki xato ham nom qoidasidan.",
          ],
          codeLabel: "yomon_nom.cpp",
          code: `#include <iostream>

int main() {
    int 2talaba = 18;
    int return = 1;
    std::cout << 2talaba << "{{n}}";
    return 0;
}`,
          consoleTitle: "Kompilyator",
          console: `yomon_nom.cpp:4:9: error: expected unqualified-id before numeric constant
yomon_nom.cpp:5:9: error: expected unqualified-id before 'return'`,
          analysis: [
            {
              lines: "4",
              text: "`2talaba` raqamdan boshlanadi. Kompilyator `2` ni son deb o'qiy boshlaydi, keyin `talaba` kelib qoladi. `expected unqualified-id before numeric constant` — «bu yerda nom kutgandim, son chiqdi». Tuzatish: `talaba2` yoki `talabaSoni`.",
            },
            {
              lines: "5",
              text: "`return` kalit so'z. U «funksiyadan qiymat qaytar» degan buyruq. O'zgaruvchi nomi bo'la olmaydi. Xabar aynan `'return'` ni ko'rsatadi. `natija` yoki `kod` yozing.",
            },
            {
              lines: "6",
              text: "Bu qatorga navbat yetmasligi ham mumkin, chunki 4-qator allaqachon yiqilgan. Birinchi xatoni tuzating, qayta yig'ing. Keyingi xato shunda ochiladi.",
            },
            {
              lines: "7",
              text: "Oxiridagi `return 0` to'g'ri ishlatilgan kalit so'z. Nom emas, buyruq. Farq shu: kalit so'z o'z o'rnida turadi, o'zgaruvchi o'rniga chiqarib qo'yilmaydi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Nom xotirada alohida quti emas. `talabaYoshi` va `talaba_yoshi` ikki xil harf ketma-ketligi. Kompilyator har biriga boshqa manzil biriktiradi. Ishlayotgan `.exe` da bu harflar o'qilmaydi. O'qiladigan narsa — manzil va 4 baytlik qiymat.",
          "Kalit so'z umuman quti ochmaydi. Kompilyator `return` ni ko'rgan joyda «nom jadvaliga yoz» demaydi, «funksiyani tugat» degan buyruqni tekshiradi. Shuning uchun xato xotirada emas, tarjima paytida chiqadi. `.exe` tug'ilmaydi, RAM da quti paydo bo'lmaydi.",
          "`const int MAKS_YOSH` ham joy olishi mumkin, lekin kompilyator ba'zan sonni to'g'ridan-to'g'ri buyruq ichiga qo'yib, alohida qutini tashlab yuboradi. Natija o'zgarmaydi: dastur 30 ni ko'radi. Bu 2.8-darsdagi `const` ning kuchi. Hozir eslab qoling: nom — odam uchun yorliq, bayt — mashina uchun quti.",
        ],
        diagram: `Kod matni                 Kompilyator jadvali        RAM
talabaYoshi  = 18        nom -> manzil A           [18]
talaba_yoshi = 19        boshqa nom -> manzil B    [19]
return                   jadvalga kirmaydi         quti yo'q`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Nom xatosi odatda yig'ilishda to'xtaydi. Yomon nom esa yig'iladi va keyin sizni to'xtatadi.",
        ],
        items: [
          {
            title: "Bo'sh joy va chiziqcha",
            why: [
              "`talaba yoshi` ikkita token. `talaba-yoshi` ayirish: `talaba` minus `yoshi`. Ajratuvchi sifatida faqat `_` ishlaydi.",
            ],
            wrong: `int talaba-yoshi = 18;`,
            right: `int talaba_yoshi = 18;`,
          },
          {
            title: "Kalit so'zga yaqin nom",
            why: [
              "`int intSon` yig'iladi, chunki to'liq so'z `int` emas. `int int` yig'ilmaydi. `class`, `new`, `this` ham band. Inglizcha qisqa so'z ishlatayotgan bo'lsangiz, bir soniya to'xtang.",
            ],
            wrong: `int class = 1;`,
            right: `int sinfRaqami = 1;`,
          },
          {
            title: "Ma'nosiz bitta harf",
            why: [
              "`x`, `y`, `z` formula ichida tushunarli. `x = y * z` uch oydan keyin «bu narxmi, yoshmi?» deydi. Nom qiymatning vazifasini aytsin: `narx`, `soni`, `chegara`.",
            ],
            wrong: `int x = 45000;`,
            right: `int oylikNarx = 45000;`,
          },
        ],
      },
      quiz: [
        {
          id: "2.2-q1",
          question: "Qaysi nom til qoidasiga to'g'ri?",
          options: ["2-talaba", "talaba-yoshi", "talaba_yoshi", "return"],
          answer: 2,
          explanation:
            "`talaba_yoshi` harf bilan boshlanadi, ichida faqat harf va `_` bor. Raqamdan boshlanadigan nom, chiziqcha va `return` kalit so'zi yig'ilmaydi.",
        },
        {
          id: "2.2-q2",
          question: "`Sum` va `sum` bir xil o'zgaruvchimi?",
          options: [
            "Ha, kompilyator harfni kichraytirib o'qiydi",
            "Yo'q, katta-kichik harf boshqa nom",
            "Ha, agar ikkalasi ham int bo'lsa",
            "Yo'q, faqat snake_case da boshqa",
          ],
          answer: 1,
          explanation:
            "C++ registrni ajratadi. `Sum` va `sum` ikkita quti. Usul (camel yoki snake) bu qoidani o'zgartirmaydi.",
        },
        {
          id: "2.2-q3",
          question: "`MAKS_YOSH` ko'rinishi odatda nimani eslatadi?",
          options: [
            "Funksiya nomi",
            "O'zgarishi mumkin bo'lgan hisoblagich",
            "O'zgarmas qiymat, const yoki define",
            "Kalit so'z",
          ],
          answer: 2,
          explanation:
            "To'liq katta harf va `_` — o'zgarmaslar uchun odamlar qabul qilgan usul. Til majbur qilmaydi, lekin o'quvchi shuni kutadi. Oddiy o'zgaruvchini shunday yozmang.",
        },
      ],
    },
    {
      id: "2.3",
      navTitle: "Butun sonlar",
      title: "Butun sonlar: int, short, long, long long",
      goal: [
        "Bu darsdan keyin siz to'rtta butun turni hajmi va chegarasi bilan ajratasiz. Nega kundalik hisobda `int` yetishini, qachon `long long` kerakligini, nega `long` Windows va Linuxda bir xil bo'lmasligini ayta olasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Quti tanlayotgan odamni ko'ring. Tish pastasi uchun kichik quti, kitob uchun o'rtacha, palto uchun katta. Hammasi «quti», lekin paltoni kichigiga tiqsangiz, yopilmaydi. Butun son turlari ham shunday: `short` kichik quti, `int` kundalik quti, `long long` katta ombor.",
          "`long` aldamchi nom. «Uzun» degani har kompyuterda `int` dan uzun degani emas. Ba'zi uylarda o'rtacha javon bilan «uzun» javon bir xil kattalikda yasalgan. Windowsda `long` va `int` odatda ikkalasi ham 4 bayt. Linuxda `long` ko'pincha 8 bayt. Nomga emas, `sizeof` ga qarang.",
          "Quti kattalashsa, ichiga yoziladigan eng katta son ham o'sadi. Kichik songa katta quti olish mumkin, joy bekorga ketadi. Katta songa kichik quti olish mumkin emas: son sig'maydi, keyingi darsdagi toshish shu yerda boshlanadi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Standart aniq baytni qotirmaydi. U minimal kenglikni aytadi. Amaliyotda ish stoli uchun quyidagi jadvalni yodlang va `long` qatoridagi ogohlantirishni tushirib qoldirmang.",
        ],
        items: [
          {
            title: "To'rt tur, odatiy hajm va chegara",
            paragraphs: [
              "Chegara manfiy tomonda ham bor, chunki bu turlar sukut bo'yicha `signed`. Ishorani keyingi darsda ajratamiz. Hozir sonlarning sig'imini ko'ring.",
              "`short` kamida 16 bit. Ish stolida 2 bayt. Taxminan −32768 dan 32767 gacha. Hisoblagich 30 mingdan oshmasa, sig'adi. Yangi kodda ko'pincha baribir `int` yoziladi.",
              "`int` kamida 16 bit, amalda ish stolida 32 bit, 4 bayt. −2 147 483 648 dan 2 147 483 647 gacha. Kundalik tanlov shu. Yosh, baho, tsikl, oddiy hisob.",
              "`long` kamida 32 bit. Windows (LLP64) da 4 bayt, `int` bilan bir xil chegara. Linux (LP64) da odatda 8 bayt. «Katta son kerak, `long` yozaman» Windowsda ishlamaydi. Katta son uchun `long long` yozing.",
              "`long long` kamida 64 bit, amalda 8 bayt. Taxminan ±9.22 × 10^18. Aholi, millisekund, katta pul miqdorining so'mdagi butun ko'rinishi shu yerga sig'adi. Pulning o'zi uchun baribir kasrni keyinroq ehtiyot qiling.",
            ],
            table: {
              caption: "Ish stoli uchun odatiy o'lchov. Windows qatori sizning hozirgi muhitingiz.",
              headers: ["Tur", "Kamida", "Windows", "Chegara (32/64 bit odatiy)"],
              rows: [
                ["short", "16 bit", "2 bayt", "−32768 … 32767"],
                ["int", "16 bit", "4 bayt", "−2.1 mlrd … 2.1 mlrd"],
                ["long", "32 bit", "4 bayt", "Windowsda int bilan bir xil"],
                ["long long", "64 bit", "8 bayt", "taxminan ±9.22e18"],
              ],
            },
          },
          {
            title: "Literallar: qaysi son qaysi turda tug'iladi",
            paragraphs: [
              "Kod ichidagi `42` — `int`. `42L` — `long`. `42LL` — `long long`. Katta sonni qo'shimchasiz yozsangiz, `int` ga sig'masa kompilyator uni kengroq qilib olishi mumkin, lekin o'zingiz `LL` qo'yganingiz aniqroq.",
              "`auto` hozircha kerak emas. Turni chapda yozing: `long long millisekund = 0;`.",
              "Aniq kenglik shart bo'lsa, `<cstdint>` dagi `int32_t` va `int64_t` bor. Ular `int` va `long long` ning ish stolidagi odatiy hajmiga yaqin, lekin nomining o'zi baytni va'da qiladi. Bu bobda asosiy to'rtlikni o'rganamiz. `cstdint` ni eshitib qo'ying.",
            ],
            code: `int oddiy = 42;
long windowsdaHam4Bayt = 42L;
long long katta = 42LL;`,
            codeLabel: "qo'shimchalar",
          },
          {
            title: "Qaysi turini tanlash",
            paragraphs: [
              "Odatiy javob: `int`. Minglab, millionlab, ikki milliardgacha sig'adigan hisob shu.",
              "Ikki milliarddan oshishi mumkin bo'lsa: `long long`. Fayl hajmi, vaqtning millisekundi, katta ko'paytma.",
              "`short` ni joy tejaslik uchun yuzlab quti kerak bo'lganda o'ylang. Bitta yosh uchun `short` yozib, keyin cheklovga urilish hozircha foydasiz.",
              "`long` ni «katta int» deb yodlamang. Platformalar aralash loyihada `long` kutilmagan 4 yoki 8 bayt bo'ladi. Yangi kodda yo `int`, yo `long long`.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Hajm va chegara, Windows namunasida",
          intro: [
            "`<climits>` tayyor chegaralarni beradi: `SHRT_MAX`, `INT_MAX`, `LONG_MAX`, `LLONG_MAX` va ularning `MIN` juftlari. `sizeof` baytni aytadi. Linuxda `long` qatori 8 bayt bo'lib chiqishi mumkin. Qolganlari odatda shu yerda turadi.",
          ],
          codeLabel: "hajm.cpp",
          code: `#include <iostream>
#include <climits>

int main() {
    std::cout << sizeof(short) << " " << SHRT_MIN << " " << SHRT_MAX << "{{n}}";
    std::cout << sizeof(int) << " " << INT_MIN << " " << INT_MAX << "{{n}}";
    std::cout << sizeof(long) << " " << LONG_MIN << " " << LONG_MAX << "{{n}}";
    std::cout << sizeof(long long) << " " << LLONG_MIN << " " << LLONG_MAX << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol (Windows, odatiy)",
          console: `2 -32768 32767
4 -2147483648 2147483647
4 -2147483648 2147483647
8 -9223372036854775808 9223372036854775807`,
          analysis: [
            {
              lines: "2",
              text: "`<climits>` butun turlarning chegarasini e'lon qiladi. `INT_MAX` sehrli son emas, sizning `int` ingizning eng katta qiymati.",
            },
            {
              lines: "4",
              text: "`sizeof(short)` 2. `SHRT_MIN` −32768, `SHRT_MAX` 32767. Ikkala chegara ham 16 bitli ishorali songa to'g'ri keladi: 2^15 = 32768, manfiy tomonda shu sonning o'zi, musbat tomonda bittaga kam, chunki nol ham joy oladi.",
            },
            {
              lines: "5",
              text: "`int` 4 bayt, 32 bit. Eng katta musbat qiymat 2147483647. Buni «ikki milliard» deb eslab qolish yetadi. Undan kattasini `int` ga tiqmang.",
            },
            {
              lines: "6",
              text: "Windowsda `long` ham 4 bayt va chegarasi `int` bilan bir xil. Shu qatorni ko'rib «long kattaroq ekan» demang. Linuxda shu qator ko'pincha `8` va `long long` chegarasiga o'xshash son chiqaradi.",
            },
            {
              lines: "7",
              text: "`long long` 8 bayt. Chegara taxminan 9 kvintillion. Konsoldagi uzun son `LLONG_MIN` va `LLONG_MAX`. Manfiy chegara musbatdan bittaga katta ko'rinadi: −9223372036854775808 va 9223372036854775807. Sababi yana nol va ishora biti.",
            },
          ],
        },
        {
          title: "Ikki milliarddan oshgan hisob int ga sig'maydi",
          intro: [
            "Aholi yoki millisekundni `int` da yig'mang. Quyidagi ko'paytma `int` chegarasidan oshadi. Hisobni `long long` da boshlang.",
          ],
          codeLabel: "katta.cpp",
          code: `#include <iostream>

int main() {
    long long soniya = 24LL * 60 * 60;
    long long sutka_ms = soniya * 1000;
    std::cout << soniya << "{{n}}";
    std::cout << sutka_ms << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `86400
86400000`,
          analysis: [
            {
              lines: "4",
              text: "`24LL` literali `long long`. 60 va 60 `int`, lekin hisob `long long` tomonga kengayadi. Natija 86400, bir sutkadagi soniya. Bu son `int` ga ham sig'adi. Namunadagi `LL` odatni ko'rsatadi: katta hisobni kichik turda boshlamang.",
            },
            {
              lines: "5",
              text: "`soniya * 1000` ham `long long`. 86 400 000 millisekund. Hali `int` ga sig'adi. Bir yil millisekundi esa taxminan 31.5 milliard, `int` ning 2.1 milliardlik chegarasidan oshadi. Shuning uchun vaqtni `long long` da ushlash odat.",
            },
            {
              lines: "6-7",
              text: "Ikki qator: soniya, keyin millisekund. Hech narsa kesilmagan, chunki quti yetarli keng.",
            },
            {
              lines: "",
              label: "ogohlantirish",
              text: "Agar `24 * 60 * 60 * 1000` ni hammasi `int` bo'lgan ifoda ichida yozsangiz, oraliq natija `int` da toshishi mumkin, hatto oxirida `long long` ga qo'ysangiz ham. Keng turda boshlang yoki qo'shimchani birinchi songa qo'ying: `1000LL * 60 * 60 * 24`.",
            },
          ],
        },
        {
          title: "short kichik songa yetadi, katta songa emas",
          intro: [
            "`short` ga 30000 sig'adi. 40000 sig'maydi. Sig'maganda nima bo'lishi keyingi darsning mavzusi. Hozir chegara oldida to'xtaymiz.",
          ],
          codeLabel: "short.cpp",
          code: `#include <iostream>

int main() {
    short kichik = 30000;
    int oddiy = 30000;
    long long katta = 3000000000LL;
    std::cout << kichik << "{{n}}";
    std::cout << oddiy << "{{n}}";
    std::cout << katta << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `30000
30000
3000000000`,
          analysis: [
            {
              lines: "4",
              text: "`short kichik = 30000`. 32767 dan kichik, sig'adi. Quti 2 bayt. 30000 shu ikki baytga yoziladi.",
            },
            {
              lines: "5",
              text: "Xuddi shu 30000 `int` da ham turadi, lekin 4 bayt egallaydi. Qiymat bir xil, joy boshqa. `cout` ikkalasini ham 30000 qilib chiqaradi. Hajmni ko'rish uchun `sizeof` kerak, konsoldagi raqam hajmni aytmaydi.",
            },
            {
              lines: "6",
              text: "`3000000000LL` uch milliard. `int` chegarasidan katta, shuning uchun `LL` shart. `long long` 8 baytiga sig'adi. Agar `LL` ni tashlab, `int` ga bersangiz, literali yoki tayinlash bosqichida muammo chiqadi.",
            },
            {
              lines: "7-9",
              text: "Uch qator: 30000, 30000, 3000000000. Dastur to'g'ri, chunki har bir son o'z qutisiga sig'adi. Keyingi darsda sig'maganda nima bo'lishini ko'ramiz.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Tur — quti chizmasi. `short` uchun stekda 2 bayt, `int` va Windows `long` uchun 4, `long long` uchun 8 bayt band qilinadi. Son kichik bo'lsa ham bo'sh bayt qolmaydi: yuqori baytlar nol bo'ladi.",
          "32767 `short` ichida `FF 7F` ko'rinishida yotadi (xotira tartibi ko'pincha kichik bayt oldin, little-endian). Buni yodlash shart emas. Yodlanadigan qism: 16 ta bitning hammasi band bo'lsa, keyingi son uchun joy yo'q.",
          "`24LL * 60 * 60` hisobi keng registrda yuradi. Natija keyin `long long` qutisiga yoziladi. Agar hisob `int` registrida yursa, oraliq 4 baytdan oshganda natija buziladi, hatto keyin katta qutiga qo'ysangiz ham. Joy hisob tugagach emas, hisob boshlanishida tanlanadi.",
          "Literaldagi `LL` xotirada alohida yashamaydi. U kompilyatorga «shu sonni 64 bitlik deb o'qi» deydi. `.exe` ichida tayyor 8 baytlik son yotadi.",
        ],
        diagram: `short      [##]             2 bayt   30000 sig'adi
int        [####]           4 bayt   2.1 mlrd gacha
long Win   [####]           4 bayt   int bilan teng
long long  [########]       8 bayt   3 mlrd bemalol

Hisobni qaysi kenglikda boshlasangiz,
oraliq natija shu kenglikda turadi.`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Butun tur xatosi ko'pincha yig'iladi. Natija esa kutilgan sondan boshqa chiqadi. Chegarani nomdan emas, jadvaldan oling.",
        ],
        items: [
          {
            title: "long ni katta int deb ishlatish",
            why: [
              "Windowsda `long` 4 bayt. Ikki milliarddan katta son `long` da ham sig'maydi. Katta butun son uchun `long long`.",
            ],
            wrong: `long aholi = 3000000000L;`,
            right: `long long aholi = 3000000000LL;`,
          },
          {
            title: "Hisobni int da boshlab, keyin long long ga qo'yish",
            why: [
              "O'ng tomon avval hisoblanadi. Hammasi `int` bo'lsa, toshish hisob paytida bo'ladi. Chapdagi keng quti buzilgan natijani qabul qiladi.",
            ],
            wrong: `long long yilMs = 1000 * 60 * 60 * 24 * 365;`,
            right: `long long yilMs = 1000LL * 60 * 60 * 24 * 365;`,
          },
          {
            title: "sizeof ni qiymat deb o'qish",
            why: [
              "`sizeof(int)` 4 qaytarsa, bu `int` ning qiymati 4 degani emas. Bu quti 4 bayt degani. Qiymatni `cout << son` ko'rsatadi.",
            ],
          },
        ],
      },
      quiz: [
        {
          id: "2.3-q1",
          question: "Windowsda odatiy hajm qaysi qatorga to'g'ri?",
          options: [
            "short 4, int 4, long 8, long long 8",
            "short 2, int 4, long 4, long long 8",
            "hammasi 4 bayt",
            "short 1, int 2, long 4, long long 8",
          ],
          answer: 1,
          explanation:
            "Odatiy Windows: short 2, int 4, long 4, long long 8. Linuxda long ko'pincha 8. Shuning uchun katta sonni long ga ishonib qo'ymang.",
        },
        {
          id: "2.3-q2",
          question: "3 000 000 000 sonini qaysi turda saqlash to'g'ri?",
          options: ["short", "int", "Windows long", "long long"],
          answer: 3,
          explanation:
            "3 milliard int va Windows long chegarasidan (taxminan 2.1 milliard) katta. long long 8 baytiga sig'adi. Literalga LL qo'ying.",
        },
        {
          id: "2.3-q3",
          question: "`1000 * 60 * 60 * 24 * 365` ni long long ga tenglashtirish nima uchun xavfli?",
          options: [
            "long long 365 ni saqlay olmaydi",
            "Ko'paytma avval int da hisoblanib, toshishi mumkin",
            "float ga aylanadi",
            "Kompilyator bu yozuvni man etadi",
          ],
          answer: 1,
          explanation:
            "Qo'shimchasiz sonlar int. Ko'paytma int chegarasidan oshsa, natija hisob paytida buziladi. Chapdagi long long tayyor buzuq sonni oladi. Birinchi songa LL qo'ying.",
        },
      ],
    },
    {
      id: "2.4",
      navTitle: "signed, unsigned, overflow",
      title: "signed va unsigned farqi, Integer Overflow",
      goal: [
        "Bu darsdan keyin siz ishora bitini va musbat diapazonni ajratasiz. `unsigned` toshsa, son aylana bo'ylab 0 ga qaytishini bilasiz. `signed` toshsa, bu noma'lum xatti-harakat ekanini, kompilyator bunga tayanib dasturni buzishi mumkinligini aytasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Avtomobil spidometrini ko'z oldingizga keltiring. Oddiy spidometr faqat oldinga sanaydi: 0, 1, 2. Manfiy tezlik yo'q. Bu `unsigned`. Boshqa asbob esa qarz va haqni ham ko'rsatadi: −50 dan +50 gacha. Bu `signed`. Ikkala asbob ham bir xil g'ildirakdan foydalanishi mumkin, lekin shkalasi boshqa.",
          "G'ildirak oxirigacha borganida nima bo'ladi? `unsigned` spidometr halol aylanadi: 999 dan keyin 000. Qoida yozilgan, hayron qolmaysiz. `signed` asbobda esa qo'llanma «chegaradan oshmang» deydi va oshsa nima bo'lishini va'da qilmaydi. Ko'p ustaxonalarda strelka manfiy tomonga sakraydi. Ba'zi yangi ustaxonalar «bunday bo'lmaydi» deb butun hisobni tashlab yuboradi. Ikkinchi holat — signed overflow. Unga tayyanmang.",
          "Yana bir tuzoq: manfiy sonni musbat asbobga tiqsangiz, asbob uni juda katta musbat deb o'qiydi. −1 va `unsigned` yonma-yon turganda, −1 kichik emas, ulkan son bo'lib chiqadi. Solishtirish shu yerda aldaydi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`int` yozsangiz, u `signed int`. `signed` so'zini yozish shart emas. `unsigned` ni esa yozmasangiz, manfiy tomon ochiq qoladi.",
        ],
        items: [
          {
            title: "Ishora va diapazon",
            paragraphs: [
              "C++20 dan beri manfiy butun sonlar ikkilikning to'ldiruvchisi (two's complement) bilan yoziladi. Eng chapdagi bit ishora: 0 bo'lsa musbat, 1 bo'lsa manfiy. Qolgan bitlar qiymat. 8 bitli `signed` quti −128 dan 127 gacha. `unsigned` quti 0 dan 255 gacha. Joy bir xil, shkala boshqa.",
              "32 bitli `unsigned int`: 0 dan 4 294 967 295 gacha. Manfiy yo'q. `UINT_MAX` shu chegara. `signed int`: −2 147 483 648 dan 2 147 483 647 gacha.",
              "`unsigned short` 0…65535. `unsigned char` 0…255. `unsigned long long` esa 64 bitning hammasi qiymat, taxminan 0…1.84 × 10^19.",
              "Manfiy son kerak bo'lsa, `unsigned` yozmang. Yosh, sanoq, hajm manfiy bo'lmaydi deb `unsigned` tanlash jozibador, lekin −1 bilan solishtirish va ayirish tuzog'i bor. Yangi kodda odatiy tanlov hali ham `int`, katta musbat sanoq aniq kerak bo'lsa `unsigned`.",
            ],
            table: {
              caption: "Bir xil joy, ikki xil shkala. 8 bit misolida ko'z oldingizda turing.",
              headers: ["Tur", "Bit", "Eng kichik", "Eng katta"],
              rows: [
                ["signed char (odatda)", "8", "−128", "127"],
                ["unsigned char", "8", "0", "255"],
                ["int", "32", "−2147483648", "2147483647"],
                ["unsigned int", "32", "0", "4294967295"],
              ],
            },
          },
          {
            title: "Unsigned overflow — qoida bor",
            paragraphs: [
              "`unsigned` hisob modul bo'yicha aylanadi. 32 bitda modul 2^32. `UINT_MAX + 1` nolga teng. `0u - 1` esa `UINT_MAX`. Bu noma'lum xatti-harakat emas. Standart shunday deydi. Har safar bir xil natija.",
              "Kichik `unsigned char` ga 256 yozsangiz ham natija 0, chunki 256 modul 256. 257 modul 256 esa 1. Tayinlashdagi aylanish ham aniq.",
            ],
            code: `unsigned int x = 4294967295u;
x = x + 1;          // 0, har doim`,
            codeLabel: "aylanish",
          },
          {
            title: "Signed overflow — qoida yo'q",
            paragraphs: [
              "`INT_MAX + 1` signed overflow. Bu undefined behavior. Standart natijani va'da qilmaydi. Ko'p kompyuterda ikkilikning to'ldiruvchisi tufayli −2147483648 ko'rinadi. Bu «qoida» emas, kuzatuv.",
              "Kompilyator «signed hisob chegaradan oshmaydi» deb ishonish huquqiga ega. `-O2` da u shu ishonch bilan qatorni tashlab yuborishi yoki shartni o'zgartirishi mumkin. Shuning uchun «mening kompyuterimda manfiy chiqdi» deb dastur yozmang.",
              "Toshishni oldini olish: hisobdan oldin chegara bor-yo'qligini tekshiring, yoki sig'adigan keng turda (`long long`) hisoblang. Aylanish kerak bo'lsa, turni `unsigned` qiling va buni ataylab qilayotganingizni biling.",
            ],
          },
          {
            title: "signed va unsigned ni aralashtirish",
            paragraphs: [
              "Agar ifodada `int` va `unsigned int` uchrashsa, `int` odatda `unsigned int` ga aylanadi. −1 unsigned 32 bitda 4294967295 bo'ladi. Shundan keyin `−1 < 1u` yolg'on, chunki ulkan son 1 dan kichik emas.",
              "Ogohlantirishni o'chirmang: `comparison of integer expressions of different signedness`. U aynan shu tuzoqni aytadi.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "unsigned aylana: maksimumdan keyin 0",
          intro: [
            "Bu dasturning natijasi kafolatlangan. `unsigned` chegaradan oshsa, modul bo'yicha qaytadi.",
          ],
          codeLabel: "aylana.cpp",
          code: `#include <iostream>
#include <climits>

int main() {
    unsigned int x = UINT_MAX;
    std::cout << x << "{{n}}";
    x = x + 1;
    std::cout << x << "{{n}}";
    unsigned char bayt = 255;
    bayt = bayt + 1;
    std::cout << static_cast<int>(bayt) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `4294967295
0
0`,
          analysis: [
            {
              lines: "5-6",
              text: "`UINT_MAX` 32 bitli unsigned ning eng katta qiymati: 4294967295. Hammasi bitlar 1. `cout` uni o'nlikda shunday chiqaradi.",
            },
            {
              lines: "7-8",
              text: "`x + 1` modul 2^32. 4294967296 shu modulda 0. Ikkinchi qator `0`. Bu xato emas, unsigned qoidasi.",
            },
            {
              lines: "9-11",
              text: "`unsigned char` 0…255. 255 + 1 hisobda avval kengayadi, keyin yana `unsigned char` ga yoziladi va 256 modul 256 = 0 qoladi. `static_cast<int>` shunchaki 0 ni son sifatida ko'rsatish uchun. `char` ni to'g'ridan-to'g'ri chiqarsak, belgiga o'xshab ketishi mumkin edi. Natija yana 0.",
            },
          ],
        },
        {
          title: "signed chegarasi: ko'rinishi bor, kafolat yo'q",
          intro: [
            "Quyidagi dastur ko'p kompyuterda manfiy son chiqaradi. Buni yodlamang. Bu unsigned dagi kabi qoida emas. `-O2` boshqa natija yoki boshqa kod qilishi mumkin.",
          ],
          codeLabel: "toshish.cpp",
          code: `#include <iostream>
#include <climits>

int main() {
    int son = INT_MAX;
    std::cout << son << "{{n}}";
    son = son + 1;
    std::cout << son << "{{n}}";
    return 0;
}`,
          consoleTitle: "Ko'p mashinada, -O0",
          console: `2147483647
-2147483648`,
          analysis: [
            {
              lines: "5-6",
              text: "`INT_MAX` 2147483647. 32 bitli signed ning oxirgi musbat qiymati. Bit ko'rinishi `0111…1`.",
            },
            {
              lines: "7",
              text: "`son + 1` signed overflow. Standart bu qatorning ma'nosini bermaydi. Ikkilikning to'ldiruvchisida `0111…1 + 1 = 1000…0`, bu naqsh esa `INT_MIN`, ya'ni −2147483648. Ko'p protsessor shunday qiladi. Kompilyator bunga majbur emas.",
            },
            {
              lines: "8",
              text: "Agar konsolingizda −2147483648 chiqsa, «mening muhitim shunday ko'rsatdi» deng. «C++ shunday qiladi» demang. Haqiqiy dasturda hisobni `long long` ga o'tkazing yoki qo'shishdan oldin `son < INT_MAX` ekanini tekshiring.",
            },
          ],
        },
        {
          title: "−1 va unsigned solishtirish",
          intro: [
            "Bu dastur yig'iladi va barqaror natija beradi. Natija esa ko'z kutganidan teskari. Tuzoq shu.",
          ],
          codeLabel: "aralash.cpp",
          code: `#include <iostream>

int main() {
    int manfiy = -1;
    unsigned int musbat = 1;
    std::cout << (manfiy < musbat) << "{{n}}";
    std::cout << manfiy << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `0
-1`,
          analysis: [
            {
              lines: "4-5",
              text: "`manfiy` oddiy `int`, qiymati −1. `musbat` `unsigned int`, qiymati 1. Ikkala quti ham odatda 4 bayt, shkalasi boshqa.",
            },
            {
              lines: "6",
              text: "`manfiy < musbat` hisoblanayotganda `manfiy` unsigned ga aylanadi. −1 ning 32 bitli naqshi hammasi 1, ya'ni 4294967295. `4294967295 < 1` yolg'on. `cout` yolg'onni `0` qilib chiqaradi. `bool` ni 2.7-darsda ochamiz. Hozir 0 «yo'q» degani.",
            },
            {
              lines: "7",
              text: "`manfiy` ning o'zi o'zgarmagan. U hali −1. Aylanish faqat solishtirish ifodasining ichida, vaqtinchalik nusxada. Konsolning ikkinchi qatori shuni ko'rsatadi.",
            },
            {
              lines: "",
              label: "xulosa",
              text: "Manfiy `int` ni `unsigned` bilan `<` qilmang. Ikkalasini `int` yoki ikkalasini `long long` qiling. Ogohlantirish chiqsa, o'chirmang, turni tuzating.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "32 ta bit bir xil quti. `signed` da eng chap bit ishora. `unsigned` da o'sha bit ham qiymatning kattaligi: 2^31. Shuning uchun bir xil naqsh `1111…1` signed da −1, unsigned da 4294967295.",
          "`unsigned` ga 1 qo'shish bitlarni qo'shadi. Hammasi 1 bo'lgan qutiga 1 qo'shilsa, yodda 1 chiqib ketadi va quti ichida nol qoladi. Yod tashlanadi. Bu modul. Xotira qo'shni o'zgaruvchiga toshmaydi, quti o'z ichida aylanadi.",
          "`signed` da ham protsessor ko'pincha xuddi shu qo'shishni qiladi va ishora biti yonib, son manfiy ko'rinadi. Farq huquqiy: kompilyator bunday holat bo'lmaydi deb o'ylashi mumkin. U `son + 1 > son` ni har doim rost deb hisoblashi, tekshiruvingizni o'chirib tashlashi mumkin. Baytlar «oddiy» aylansa ham, dastur mantiqi optimizatsiyadan keyin boshqacha bo'lishi mumkin.",
          "Aralash solishtirish yangi quti ochmaydi. −1 vaqtinchalik unsigned nusxaga aylanadi, solishtirish shu nusxa bilan bo'ladi, asl `int` baytlari joyida qoladi.",
        ],
        diagram: `32 bit, hammasi 1:
signed   int  ->  -1
unsigned int  ->  4294967295

UINT_MAX + 1:
1111...1 + 1 = 1|0000...0
tashlanadi^   qoladi nol

INT_MAX + 1 (kuzatuv, kafolat emas):
0111...1 + 1 = 1000...0  ->  INT_MIN ko'rinishi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Overflow xatosi yig'ilishni to'xtatmasligi mumkin. Dastur ishlaydi, son esa boshqa.",
        ],
        items: [
          {
            title: "Signed toshishni unsigned kabi yodlash",
            why: [
              "«Har doim manfiyga aylanadi» faqat unsigned uchun emas, signed uchun umuman qoida emas. Unsigned da 0 ga qaytish qoida. Signed da natija til tomonidan berilmagan.",
            ],
            wrong: `int son = 2147483647;
son = son + 1;          // bunga tayanma`,
            right: `long long son = 2147483647LL;
son = son + 1;          // 2147483648, sig'adi`,
          },
          {
            title: "Manfiy sonni unsigned ga berish",
            why: [
              "`unsigned int x = -1;` yig'ilishi mumkin va `x` 4294967295 bo'ladi. Siz −1 saqlaganim deb o'ylaysiz. Keyingi ayirish «juda katta musbat» chiqaradi.",
            ],
            wrong: `unsigned int qarz = -1;`,
            right: `int qarz = -1;`,
          },
          {
            title: "Sanoqni unsigned qilib, pastga ayirish",
            why: [
              "`unsigned` 0 dan 1 ayirilsa, manfiy emas, `UINT_MAX` chiqadi. Tsikl `i >= 0` ni `unsigned` da yozsangiz, shart deyarli har doim rost, tsikl tugamaydi. Sanoq tushib boradigan bo'lsa, `int` ishlating.",
            ],
            wrong: `unsigned int i = 0;
i = i - 1;`,
            right: `int i = 0;
i = i - 1;   // -1, tushunarli`,
          },
        ],
      },
      quiz: [
        {
          id: "2.4-q1",
          question: "`unsigned int` chegaradan oshsa nima bo'ladi?",
          options: [
            "Har doim dastur yiqiladi",
            "Natija modul bo'yicha aylanadi, UINT_MAX + 1 nol bo'ladi",
            "Son float ga aylanadi",
            "Kompilyator buni har doim man etadi",
          ],
          answer: 1,
          explanation:
            "Unsigned overflow aniqlangan. 32 bitda hisob 2^32 modulida yuradi. Maksimumdan keyingi qadam 0.",
        },
        {
          id: "2.4-q2",
          question: "`INT_MAX + 1` qanday holat?",
          options: [
            "Har doim 0, chunki aylana qoidasi bor",
            "Har doim INT_MIN, standart shuni va'da qiladi",
            "Signed overflow: natija kafolatlanmagan",
            "Kompilyatsiya qilinmaydi, chunki int yozilgan",
          ],
          answer: 2,
          explanation:
            "Signed overflow undefined behavior. Ko'p mashinada INT_MIN ko'rinadi, lekin bu qoida emas. Hisobni keng turga o'tkazing.",
        },
        {
          id: "2.4-q3",
          question: "`int a = -1; unsigned int b = 1;` bo'lsa, `a < b` nimaga teng?",
          options: [
            "Rost, chunki −1 haqiqatan ham 1 dan kichik",
            "Yolg'on, chunki −1 unsigned ga ulkan son bo'lib aylanadi",
            "Kompilyator xato beradi va dastur yig'ilmaydi",
            "Natija har safar tasodifiy",
          ],
          answer: 1,
          explanation:
            "Aralash solishtirishda int unsigned ga aylanadi. −1 ning naqshi 4294967295 bo'ladi. U 1 dan katta, shart yolg'on, konsolda 0.",
        },
      ],
    },
    {
      id: "2.5",
      navTitle: "Kasr sonlar",
      title: "Kasr sonlar: float, double, long double",
      goal: [
        "Bu darsdan keyin siz `float`, `double` va `long double` ning joyi va aniqligini ajratasiz. 0.1 + 0.2 nima uchun 0.3 ga teng chiqmasligini, pulni kasr turda ushlamaslik kerakligini va `==` nima uchun xavfli ekanini tushuntira olasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Cheklangan katakli daftar. Butun son daftari 1, 2, 3 ni aniq yozadi. Kasr daftari esa «o'nlik kasrni ikkilik kataklarga sig'dir» deydi. 1/2 sig'adi, chunki 0.5 ikkilikda tutash. 1/10, ya'ni 0.1, tutash emas. Siz 0.1 deb yozasiz, daftar eng yaqin sig'adigan kasrni yozib qo'yadi. Ko'zga 0.1 o'xshaydi. Yig'indi paytida farq ochiladi.",
          "`float` — kichik daftar, taxminan 7 ta ishonchli raqam, 4 bayt. `double` — kundalik daftar, taxminan 15–16 raqam, 8 bayt. `long double` — ba'zi uylarda undan ham uzun daftar, ba'zi uylarda `double` bilan bir xil daftar, faqat nomi boshqa. Windowsda ko'pincha ikkinchisi.",
          "Ikki daftar yozuvini «aynan tengmi?» deb so'rash xavfli. Ular bir xil haqiqiy songa yaqin turishi mumkin, lekin oxirgi katakda bittaga farq qiladi. Tenglik o'rniga farq yetarlicha kichikmi, deb so'rang. Pulda esa umuman kasr daftar ishlatmang: so'm va tiyinni butun sonda ushlang.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Kasr turlar amalda IEEE 754 qoidasi bilan yuradi. Yodlash uchun uchta son: joy, ishonchli raqam, literal qo'shimchasi.",
        ],
        items: [
          {
            title: "Uch tur",
            paragraphs: [
              "`float` odatda 4 bayt, taxminan 7 ta o'nlik raqam. Eng katta tartib taxminan ±3.4 × 10^38. Literali `f` yoki `F` bilan: `3.14f`. Qo'shimchasiz `3.14` `double`.",
              "`double` odatda 8 bayt, taxminan 15–16 raqam, tartibi ±1.8 × 10^308. Kundalik kasr tanlovi shu. `float` ni joy siqilganda yoki grafik kabi maxsus joyda ishlating.",
              "`long double` standart faqat «`double` dan kaltaroq emas» deydi. Windowsda MinGW va MSVC odatda uni `double` qilib, 8 bayt qiladi. Linuxdagi gcc ko'pincha 80-bitli kengaytirilgan aniqlikni 16 baytlik joyga qo'yadi. `sizeof(long double)` ni o'z kompyuteringizda ko'ring. Katta aniqlik uchun `long double` ga ko'r-ko'rona ishonmang.",
              "Ilmiy yozuv: `1.5e2` bu 1.5 × 10^2 = 150. `1.5e-3` bu 0.0015. Tur hali ham qo'shimchaga qarab: `1.5e2f` float.",
            ],
            table: {
              caption: "Odatiy ish stoli. long double qatori platformaga qarab yuradi.",
              headers: ["Tur", "Joy", "Ishonchli raqam", "Literal"],
              rows: [
                ["float", "4 bayt", "taxminan 7", "1.5f"],
                ["double", "8 bayt", "taxminan 15–16", "1.5"],
                ["long double", "8 yoki 16", "double yoki undan aniq", "1.5L"],
              ],
            },
          },
          {
            title: "Nima uchun 0.1 aniq emas",
            paragraphs: [
              "Ikkilik kasr 1/2, 1/4, 1/8 kabi bo'laklarni aniq yozadi. 1/10 cheksiz davriy bo'lib ketadi, xuddi o'nlikda 1/3 = 0.3333… bo'lgani kabi. Daftar chekli. 0.1 o'rniga eng yaqin sig'adigan qiymat yoziladi. 0.2 ham shunday. Ikki yaqinlashuvning yig'indisi 0.3 ning yaqinlashuvidan bittaga farq qilishi mumkin.",
              "Shuning uchun `0.1 + 0.2 == 0.3` ko'pincha yolg'on. Hisob «buzilgan» emas. Daftar shu aniqlikda ishlayapti.",
              "Butun sonlarning katta qismi ham `float` da aniq emas. 2^24 = 16777216 gacha butun sonlar float da aniq. Undan keyin qadam 2, 4, 8 bo'lib ketadi. 123456789 float ga aynan sig'maydi.",
            ],
          },
          {
            title: "Tenglik va pul",
            paragraphs: [
              "Kasrni `==` bilan solishtirmang. Farqning absolyut qiymati kichik chegaradan pastmi, shuni so'rang. Chegara masalaga bog'liq. Pulda esa `double` ni umuman chetga suring: 150 so'm 50 tiyinni `15050` tiyinlik `int` yoki `long long` qiling.",
              "`cout` odatiy holda kasrni qisqa ko'rsatadi, farq yashirinadi. `std::fixed` va `std::setprecision` haqiqiy yozuvni ochadi. Buning uchun `<iomanip>` kerak.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "0.1 + 0.2 ko'rinishda 0.3, ichkarida emas",
          intro: [
            "Birinchi chiqarish odatiy, qisqa. Ikkinchisi 17 xona. Uchinchisi tenglik. Qisqa ko'rinish sizni aldashi mumkin.",
          ],
          codeLabel: "kasr.cpp",
          code: `#include <iostream>
#include <iomanip>

int main() {
    double yigindi = 0.1 + 0.2;
    std::cout << yigindi << "{{n}}";
    std::cout << std::fixed << std::setprecision(17);
    std::cout << yigindi << "{{n}}";
    std::cout << (yigindi == 0.3) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `0.3
0.30000000000000004
0`,
          analysis: [
            {
              lines: "5",
              text: "`0.1` va `0.2` `double` literallar. Ikkisi ham ikkilikda cheksiz kasr. Kompilyator eng yaqin `double` ni qo'yadi. Yig'indi ham shu yaqinlashuv.",
            },
            {
              lines: "6",
              text: "Odatiy `cout` 6 ta yaqin raqam atrofida yaxlitlab ko'rsatadi. Siz `0.3` ko'rasiz. Ichkaridagi farq yashiringan. «Ekranda 0.3 turibdi, demak teng» deb xulosa qilmang.",
            },
            {
              lines: "7-8",
              text: "`std::fixed` kasrni qo'zg'almas nuqta bilan chiqaradi. `setprecision(17)` nuqtadan keyin 17 xona so'raydi. `double` ning farqi shu yerda ko'rinadi: `0.30000000000000004`. Oxirgi 4 — yaqinlashuv qoldig'i.",
            },
            {
              lines: "9",
              text: "`==` bit-bayt yaqinlikni emas, aynan tenglikni so'raydi. Yig'indi va `0.3` literali boshqa `double`. Shart yolg'on, konsol `0`. Pul yoki geometriyada shunday tekshiruv qoldirmang.",
            },
          ],
        },
        {
          title: "float katta butun sonni ham tashlaydi",
          intro: [
            "`double` 123456789 ni aniq saqlaydi. `float` saqlay olmaydi. Ikkalasi ham «kasr turi», aniqlik esa boshqa.",
          ],
          codeLabel: "aniqlik.cpp",
          code: `#include <iostream>

int main() {
    float qisqa = 123456789.0f;
    double aniq = 123456789.0;
    std::cout << std::fixed;
    std::cout << qisqa << "{{n}}";
    std::cout << aniq << "{{n}}";
    std::cout << sizeof(float) << " " << sizeof(double) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `123456792.000000
123456789.000000
4 8`,
          analysis: [
            {
              lines: "4",
              text: "`123456789.0f` float. `f` bo'lmasa, son `double` bo'lib tug'ilardi va keyin float ga qisilardi. Natija baribir sig'maydi. Float mantissa 23 bit. 2^26 atrofida qadam 8 ga teng. 123456789 shu qadamga tushmaydi, eng yaqin sig'adigan son 123456792.",
            },
            {
              lines: "5",
              text: "`double` mantissa 52 bit. 2^53 gacha butun sonlar aniq. 123456789 bemalol sig'adi. Sakkiz bayt shu aniqroq daftar uchun.",
            },
            {
              lines: "6-8",
              text: "`fixed` nuqtani ko'rsatib turadi. Birinchi qator float ning haqiqiy qiymati, ikkinchisi double. Farq 3. Kichkina ko'rinadi, hisob takrorlansa o'sadi.",
            },
            {
              lines: "9",
              text: "`sizeof` 4 va 8. Aniqlik bepul emas, joyda turadi. Bitta kasr uchun 4 bayt tejash odatda arzimaydi. Odatiy tanlov `double`.",
            },
          ],
        },
        {
          title: "long double hajmi platformaga qarab",
          intro: [
            "Quyidagi konsol Windowsdagi odatiy MinGW/MSVC manzarasi. Linuxda oxirgi son 16 bo'lib chiqishi mumkin. Kod bir xil, daftar boshqa.",
          ],
          codeLabel: "uzunkasr.cpp",
          code: `#include <iostream>

int main() {
    float a = 1.5f;
    double b = 1.5;
    long double c = 1.5L;
    std::cout << sizeof(a) << "{{n}}";
    std::cout << sizeof(b) << "{{n}}";
    std::cout << sizeof(c) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol (Windows, odatiy)",
          console: `4
8
8`,
          analysis: [
            {
              lines: "4",
              text: "`1.5f` float. 1.5 = 3/2, ikkilikda aniq sig'adi. Bu yerda yaqinlashuv xatosi yo'q. `sizeof` 4.",
            },
            {
              lines: "5",
              text: "`1.5` qo'shimchasiz double. 8 bayt. Qiymat 1.5, joy ikki baravar. Aniqligi zaxira sifatida turadi.",
            },
            {
              lines: "6-9",
              text: "`1.5L` long double. Windowsda ko'pincha ichki format double bilan bir xil, `sizeof` ham 8. Nom `long` bo'lsa ham, quti uzaymagan. Linuxda 16 ko'rsangiz, hayron qolmang. Portativ kod aniqroq hisobni `long double` ga bog'lab qo'ymaydi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "IEEE 754 soni uch bo'lakka bo'linadi: ishora biti, tartib (exponent) va kasr (mantissa). `float` da 1 + 8 + 23 bit. `double` da 1 + 11 + 52. Tartib sonni katta-kichik qiladi, mantissa ishonchli raqamlarni ushlaydi. Shu sababli juda katta sonni saqlash mumkin, lekin qo'shni butun sonlar ma'lum chegaradan keyin farqlanmaydi.",
          "0.1 yozilganda kompilyator cheksiz 00110011… naqshini 52 bitga kesadi va eng yaqin juftlikka yaxlitlaydi. RAM da «0.1» matni yo'q. Bor narsa — shu 8 baytlik naqsh. `cout` naqshni yana o'nlik matnga aylantiradi va qisqa qilib ko'rsatadi. Ikki aylantirish orasida farq yashirinadi.",
          "`float` dan `double` ga o'tkazish yo'qolgan raqamni qaytarmaydi. Avval float ga qisilgan 123456792, double ga ko'chirilsa ham 123456792 bo'lib qoladi. Keng quti aniqroq hisobni keyingi amallar uchun beradi, eski yo'qotishni tuzatmaydi.",
          "`long double` 8 bayt bo'lsa, uning naqshi `double` bilan bir xil joylashuv. 16 bayt bo'lsa, mantissa uzunroq, lekin baribir chekli. Cheksiz 0.1 hech qaysisiga to'liq sig'maydi.",
        ],
        diagram: `float  4 bayt:  [ishora 1][tartib 8][mantissa 23]
double 8 bayt:  [ishora 1][tartib 11][mantissa 52]

0.1  ->  cheksiz ikkilik kasr  ->  52 bitga kesiladi
0.1 + 0.2  va  0.3  ->  ikki xil kesilgan naqsh
cout qisqa ko'rinishda ikkalasini ham 0.3 qilib yozishi mumkin`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Kasr xatosi kompilyator baqirmaydigan xato. Ekran ham ba'zan yordamlashadi: qisqa chiqarish farqni yashiradi.",
        ],
        items: [
          {
            title: "Kasrni == bilan tekshirish",
            why: [
              "`0.1 + 0.2 == 0.3` ko'pincha yolg'on. Shart ishlamaydi, `if` ichiga kirmaysiz, xato esa «mantiq»dek ko'rinadi. Tenglik o'rniga farqni chegaralang yoki butun sonda hisoblang.",
            ],
            wrong: `if (0.1 + 0.2 == 0.3) { }`,
            right: `double farq = (0.1 + 0.2) - 0.3;
if (farq < 0.0) farq = -farq;
if (farq < 0.0000001) { }`,
          },
          {
            title: "Pulni double da ushlash",
            why: [
              "150.10 so'm kabi qiymatlar 0.1 ga yaqin kasrlardan yig'iladi. Kunlik aylanma tiyinni yo'qotadi. Tiyinni `long long` da saqlang.",
            ],
            wrong: `double balans = 0.1 + 0.2;`,
            right: `long long tiyin = 10 + 20;`,
          },
          {
            title: "float qo‘shimchasini unutib, keyin aniqlik kutish",
            why: [
              "`float x = 123456789.0;` son avval double bo'lib, so'ng float ga qisiladi. Raqamlar shu payt yo'qoladi. Katta aniq butun son kasr turida emas, `long long` da tursin. Kasr kerak bo'lsa, odatiy holda `double`.",
            ],
          },
        ],
      },
      quiz: [
        {
          id: "2.5-q1",
          question: "Kundalik kasr hisob uchun odatiy tur qaysi?",
          options: ["float, chunki kichik", "double", "int", "char"],
          answer: 1,
          explanation:
            "double 8 bayt va taxminan 15–16 ishonchli raqam. float taxminan 7 raqamda to'xtaydi. Joy siqilmasa, double yozing.",
        },
        {
          id: "2.5-q2",
          question: "`0.1 + 0.2 == 0.3` nima uchun ko'pincha yolg'on?",
          options: [
            "double qo'shishni bilmaydi",
            "0.1 va 0.2 ikkilikda cheksiz kasr, kesilgan naqshlar teng emas",
            "== faqat int uchun ishlaydi",
            "cout natijani o'zgartirib yuboradi",
          ],
          answer: 1,
          explanation:
            "1/10 ikkilikda davriy kasr. float va double uni chekli bitga kesadi. Ikki kesilgan sonning yig'indisi 0.3 ning kesilganidan farq qilishi mumkin. Qisqa cout esa 0.3 deb ko'rsatib, farqni yashiradi.",
        },
        {
          id: "2.5-q3",
          question: "Windowsda `sizeof(long double)` ko'pincha nechchi?",
          options: [
            "Har doim 16, nomida long bor",
            "Ko'pincha 8, ya'ni double bilan bir xil",
            "Har doim 4",
            "1 bayt",
          ],
          answer: 1,
          explanation:
            "Standart long double ni double dan kaltaroq qilmaydi, lekin uzunroq qilishni ham majburlamaydi. Windowsda u odatda 8 bayt. Linuxda 16 bo'lishi mumkin. sizeof bilan tekshiring.",
        },
      ],
    },
    {
      id: "2.6",
      navTitle: "char va ASCII",
      title: "Belgilar (char) va ASCII jadvali",
      goal: [
        "Bu darsdan keyin siz `'A'` ni son ekanini, kodi 65 ekanini va `'A' + 1` nima uchun `'B'` bo'lishini ko'rsatib bera olasiz. `'A'` bilan `\"A\"` ni, belgili `char` ning −128…127 chegarasini va escape belgilarni ajratasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Kutubxonadagi shifrni eslang. Kitobning o'zida «A» harfi yozilgan, kartotekada esa shu harfga 65-raqam berilgan. Omborda kitob emas, raqam yotadi. O'quvchi kartotekani ochsa, 65 ni ko'radi. Kitob javonida esa «A» ko'rinadi. `char` — bitta javon, ichida raqam. `cout` shu raqamni harf qilib chizadi, agar siz undan harf so'rasangiz.",
          "Alifbo shunday tuzilganki, katta harflar yonma-yon raqamlangan. 65 dan keyin 66, ya'ni B. Bir qo'shsangiz, keyingi harf. Bu sehr emas, jadval shunday ketma-ket.",
          "Birtirnoq bitta belgi: `'A'`. Qo'shtirnoq esa matn, hatto ichida bitta harf bo'lsa ham: `\"A\"`. Bitta kitob va bitta kitobdan iborat quti. Keyinroq satr (`string`) quti haqida gaplashamiz. Hozir ularni aralashtirmang.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "ASCII — eski va hali ham tirik kelishuv. 0 dan 127 gacha belgiga son berilgan. C++ `char` ni 1 bayt qiladi. Shu bayt ishorali yoki ishorasiz bo'lishi mumkin, bu kompilyatorga bog'liq.",
        ],
        items: [
          {
            title: "char — 1 baytlik son",
            paragraphs: [
              "`sizeof(char)` har doim 1. Bu tilning qoidasi, platformaga qarab o'zgarmaydi. Shu 1 bayt ichidagi bitlar soni amalda 8.",
              "Oddiy `char` signed yoki unsigned bo'lishi ochiq qoldirilgan. x86 da gcc, MinGW va MSVC odatda signed qiladi: −128…127. `unsigned char` har doim 0…255. 200 kabi baytni `char` ga qo'yib, musbat deb o'qimang. Bayt kerak bo'lsa, `unsigned char`.",
              "Belgili harf va raqamlar 0…127 oralig'ida, ikkala `char` da ham xavfsiz. `'A'` 65, `'a'` 97, `'0'` 48.",
            ],
          },
          {
            title: "ASCII dan ishlatiladigan joylar",
            paragraphs: [
              "Hammasini yodlash shart emas. Ketma-ketlikni yodlang: `'0'`…`'9'` yonma-yon, `'A'`…`'Z'` yonma-yon, `'a'`…`'z'` yonma-yon. Katta va kichik orasi 32. `'a' - 'A'` 32. Shu farqni qo'shsangiz, harf kichrayadi. Bu faqat lotin harfi uchun. O'zbekcha o' yoki qo'shimcha belgilar ASCII da yo'q.",
            ],
            table: {
              caption: "Qo'lda tekshiriladigan kodlar. Oradagi harflar sonma-son ketadi.",
              headers: ["Belgi", "Kod", "Eslatma"],
              rows: [
                ["'A'", "65", "katta harf boshi"],
                ["'Z'", "90", "katta harf oxiri"],
                ["'a'", "97", "65 + 32"],
                ["'z'", "122", "kichik harf oxiri"],
                ["'0'", "48", "nol belgisi, son 0 emas"],
                ["' '", "32", "bo'sh joy"],
                ["yangı qator", "10", "{{n}} escape"],
              ],
            },
          },
          {
            title: "Birtirnoq, qo'shtirnoq, escape",
            paragraphs: [
              "`'A'` bitta belgi. C++ da bu literalning turi aslida `int`, qiymati 65. `sizeof('A')` `sizeof(int)` ga teng, odatda 4. `char harf = 'A';` desangiz, 65 bitta baytga qisiladi. `sizeof(harf)` 1. Literal va quti bir xil emas.",
              "`\"A\"` satr. Oxirida yashirin nol bayt bor. Bu `char` emas. `char` ga `\"A\"` ni bera olmaysiz.",
              "Escape: `{{n}}` yangi qator, `{{t}}` tab, `\\\\` teskari chiziqning o'zi, `\\'` birtirnoq, `\\\"` qo'shtirnoq, `\\0` nol bayt. Ular ikki belgi bo'lib yoziladi, xotirada bitta (yoki nol) bayt bo'ladi.",
            ],
            code: `char harf = 'A';
char qator = '{{n}}';
char tirnoq = '\\'';`,
            codeLabel: "escape",
          },
        ],
      },
      examples: [
        {
          title: "Harf, kodi va keyingi harf",
          intro: [
            "Bitta baytni goh harf, goh son qilib o'qiymiz. Qo'shish jadval bo'ylab bir qadam.",
          ],
          codeLabel: "harf.cpp",
          code: `#include <iostream>

int main() {
    char harf = 'A';
    std::cout << harf << "{{n}}";
    std::cout << static_cast<int>(harf) << "{{n}}";
    harf = harf + 1;
    std::cout << harf << "{{n}}";
    std::cout << static_cast<int>('a' - 'A') << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `A
65
B
32`,
          analysis: [
            {
              lines: "4",
              text: "`'A'` literali 65. U `char` qutiga yoziladi. Quti 1 bayt. Ichida `01000001`.",
            },
            {
              lines: "5",
              text: "`cout` `char` ni belgi qilib chizadi. Kod emas, `A` ko'rinadi.",
            },
            {
              lines: "6",
              text: "`static_cast<int>` shu baytni songa kengaytiradi va `cout` endi raqam chizadi. 65. Cast qilmasak, harf chiqardi. Cast qiymatni o'zgartirmaydi, talqinni o'zgartiradi.",
            },
            {
              lines: "7-8",
              text: "`harf + 1` hisobda `char` avval `int` ga ko'tariladi: 65 + 1 = 66. 66 yana `char` ga yoziladi. 66 — `'B'`. ASCII katta harflari ketma-ket bo'lgani uchun keyingi harf chiqadi. `'Z' + 1` esa `'['` bo'ladi, alifbo sehrli aylanmaydi.",
            },
            {
              lines: "9",
              text: "`'a' - 'A'` bu 97 − 65 = 32. Kichik va katta lotin harfi orasidagi o'rnatilgan farq. `static_cast<int>` ayirmani son qilib ko'rsatadi. 32 chiqadi.",
            },
          ],
        },
        {
          title: "Raqam belgisi va haqiqiy son",
          intro: [
            "`'7'` ekranda 7 ga o'xshaydi. Uning kodi 55. Son 7 ning kodi esa 7. Farq 48, ya'ni `'0'` ning kodi.",
          ],
          codeLabel: "raqam.cpp",
          code: `#include <iostream>

int main() {
    char belgi = '7';
    int son = belgi - '0';
    std::cout << belgi << "{{n}}";
    std::cout << static_cast<int>(belgi) << "{{n}}";
    std::cout << son << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `7
55
7`,
          analysis: [
            {
              lines: "4",
              text: "`'7'` belgi. Kod 48 + 7 = 55, chunki `'0'` 48-da turadi va raqamlar ketma-ket. Bu 55 soni qutida yotadi.",
            },
            {
              lines: "5",
              text: "`belgi - '0'` klassik o'girish: 55 − 48 = 7. Endi bu haqiqiy `int` 7. Faqat `'0'`…`'9'` uchun ishlaydi. `'A' - '0'` ham son chiqaradi, lekin u raqam emas.",
            },
            {
              lines: "6",
              text: "Birinchi chiqarish belgi. Ko'z 7 ni ko'radi. Bu hali kod 55.",
            },
            {
              lines: "7-8",
              text: "Ikkinchi qator kodning o'zi: 55. Uchinchi qator ayirma: 7. Uchta «yetti» emas. Biri rasm, biri kod, biri haqiqiy son.",
            },
          ],
        },
        {
          title: "Literal turi va quti turi bir xil emas",
          intro: [
            "`'A'` yozuvi `char` qutisidan kengroq turda tug'iladi. `sizeof` buni ochadi.",
          ],
          codeLabel: "literal.cpp",
          code: `#include <iostream>

int main() {
    char harf = 'A';
    std::cout << sizeof(harf) << "{{n}}";
    std::cout << sizeof('A') << "{{n}}";
    std::cout << sizeof(char) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol (int 4 bayt bo'lgan muhit)",
          console: `1
4
1`,
          analysis: [
            {
              lines: "4-5",
              text: "`harf` qutisi `char`. `sizeof` 1. Ichidagi 65 shu bitta baytga sig'gan.",
            },
            {
              lines: "6",
              text: "`sizeof('A')` qutini emas, literalning turini o'lchaydi. C++ da belgi literali `int`. `int` 4 bayt bo'lsa, javob 4. Bu «A to'rt bayt» degani emas. «Yozuv ifodada int» degani. C tilida ham belgi literali int, shu joyi o'xshash.",
            },
            {
              lines: "7",
              text: "`sizeof(char)` til bo'yicha 1. Har doim. `signed char` va `unsigned char` ham 1 bayt, farq faqat shkalada.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`char harf = 'A';` stekda 1 bayt ajratadi va ichiga 65 yozadi: `01000001`. Qo'shni `int` 4 bayt oladi. `char` «kichkina int» emas, alohida kenglik.",
          "Agar `char` signed bo'lsa, shu baytning chap biti ishora. 65 da u o'chiq, son musbat. 200 ni (`11001000`) signed `char` ga qo'yishga urinish manfiy talqinni beradi, chunki chap bit yoqilgan. Baytning o'zi 8 bit. O'qish shkalasi boshqa.",
          "`harf + 1` baytni joyida qo'shmaydi. `char` ifodada `int` ga ko'tariladi, 32 bitli 66 hisoblanadi, keyin pastki bayt yana `harf` ga yoziladi. Oraliq natija keng, oxirgi quti tor.",
          "`\"A\"` boshqa joyda: ikki bayt, `65` va undan keyin `0`. Nol chegara. `char` qutida chegara bayti yo'q, chunki kenglik oldindan 1. Satr va belgini xotirada aralashtirmang.",
        ],
        diagram: `char harf     [01000001]          1 bayt, 65, 'A'
'A' literali  int kengligida     ifoda paytida 4 bayt
"A" satri     [01000001][00000000]  'A' va yashirin 0

'A' + 1  ->  65 + 1 = 66  ->  pastki bayt 'B'`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Belgi xatolari ko'pincha tirnoq tanlashdan va `char` ni kichik hisoblagich qilishdan chiqadi.",
        ],
        items: [
          {
            title: "Qo'shtirnoqni char ga berish",
            why: [
              "`\"A\"` satr, `'A'` belgi. `char` satrni qabul qilmaydi. Kompilyator tur xatosini aytadi.",
            ],
            wrong: `char harf = "A";`,
            right: `char harf = 'A';`,
          },
          {
            title: "char ni 200 gacha hisoblagich qilish",
            why: [
              "Signed `char` 127 da to'xtaydi. 128 dan keyin manfiy bo'lib ketishi mumkin. Bayt sanoq uchun `unsigned char`, oddiy sanoq uchun `int`.",
            ],
            wrong: `char son = 200;`,
            right: `unsigned char son = 200;`,
          },
          {
            title: "Raqam belgisini son deb ishlatish",
            why: [
              "`'7' + '7'` bu 55 + 55, ya'ni 110. Yetti qo'sh yetti emas. Haqiqiy songa o'tkazish uchun `'0'` ni ayiring.",
            ],
            wrong: `int yigindi = '7' + '7';`,
            right: `int yigindi = ('7' - '0') + ('7' - '0');`,
          },
        ],
      },
      quiz: [
        {
          id: "2.6-q1",
          question: "`char harf = 'A';` qutisida asosan nima yotadi?",
          options: ["A harfining rasmi", "65 sonining bayti", "\"A\" satri va nol", "32"],
          answer: 1,
          explanation:
            "char son saqlaydi. 'A' ning kodi 65. cout shu sonni harf qilib chizadi. Rasmning o'zi xotirada yo'q.",
        },
        {
          id: "2.6-q2",
          question: "`'A' + 1` ni char ga qaytarsak, qaysi belgi chiqadi?",
          options: ["'A'", "'B'", "'a'", "'1'"],
          answer: 1,
          explanation:
            "Katta harflar ASCII da ketma-ket: 65, 66, 67. 65 + 1 = 66, bu 'B'. 'a' esa 97, u 32 qadam narida.",
        },
        {
          id: "2.6-q3",
          question: "`sizeof('A')` odatda nima uchun `sizeof(char)` dan katta?",
          options: [
            "Chunki A harfi ikki bayt",
            "Chunki C++ da belgi literali int turida",
            "Chunki sizeof har doim 4 qaytaradi",
            "Chunki 'A' satr",
          ],
          answer: 1,
          explanation:
            "char qutisi 1 bayt. 'A' literali esa ifoda ichida int. int 4 bayt bo'lgan muhitda sizeof('A') 4. Qutiga qo'yilganda qiymat 1 baytga sig'adi.",
        },
      ],
    },
  ],
};

export const chapter2 = decode(rawChapter);
