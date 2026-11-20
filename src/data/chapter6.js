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
  id: "6",
  number: 6,
  title: "Sikllar",
  summary:
    "Bir ishni shart yolg'on bo'lguncha qaytarish: while, do-while, for, break, continue va ichma-ich sikl.",
  lessons: [
    {
      id: "6.1",
      navTitle: "Sikl va cheksiz sikl",
      title: "Sikl nima va cheksiz sikl xavfi",
      goal: [
        "Bu darsdan keyin siz siklni «shart yolg'on bo'lguncha takrorlanadigan ish» deb tushuntirasiz. Takror tugashi uchun shart ichidagi narsa o'zgarishi kerakligini, o'zgarmasa dastur o'zi to'xtamasligini va nuqta-vergul tanani sikldan uzib qo'yishini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Stadion aylanasini ko'ring. Murabbiy «uch marta yugur, keyin to'xta» deydi. Har bir aylanadan keyin hisoblagich bittaga o'sadi. Uchinchidan keyin shart yolg'on bo'ladi, siz maysada qolasiz. Sikl shu. Bir xil ish, lekin har safar dunyo biroz o'zgaradi va oxiri keladi.",
          "Agar hech kim hisoblamasa va «yana yugur» degan belgi doim yonib tursa, siz ertalabgacha yugurasiz. Bu cheksiz sikl. Dastur keyingi qatorga o'tmaydi. `tugadi` degan yozuv hech qachon chiqmaydi. Kompyuter xato deb qichqirmaydi, shunchaki shu aylanada qoladi.",
          "Yana bir tuzoq: murabbiy «yugur» degandan keyin darrov jim bo'lib qolsa, siz bo'sh joyni aylanib yurasiz, stadiondagi asl mashq esa maydon tashqarisida, siklga kirmagan holda yotadi. Nuqta-vergul shunday jimlik. Tana bo'sh, keyingi blok boshqa gap.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Sikl — shart va tana. Shart `if` dagi kabi `bool` ga aylanadi. Nol yolg'on, noldan boshqa son rost. Farq shunda: `if` tanani ko'pi bilan bir marta ochadi. Sikl shart yana rost bo'lsa, tanani qayta ochadi.",
          "To'liq `while` keyingi darsda. Bu yerda siklning shakli va uni nima cheksiz qilishi kerak. `for` va `do-while` ham shu xavfga ega, ularning o'z tartibi keyinroq.",
        ],
        items: [
          {
            title: "Tugaydigan aylana",
            paragraphs: [
              "Har bir takrorda shartni yolg'onga yaqinlashtiradigan o'zgarish bo'lishi kerak. Hisoblagich o'sadi, chegaraga yetadi, shart yiqiladi, sikldan keyingi qator ishlaydi.",
              "Shart takror boshida so'raladi. Oxirgi muvaffaqiyatsiz so'rov tana ishlamasdan chiqaradi. Shu sabab tana 3 marta ishlasa, shart undan bir marta ko'p so'ralgan bo'ladi.",
            ],
            code: `int i = 1;
while (i <= 3) {
    std::cout << i << "{{n}}";
    i++;
}
std::cout << "tugadi{{n}}";`,
            codeLabel: "uch aylana, keyin to'xtash",
          },
          {
            title: "Cheksiz sikl",
            paragraphs: [
              "Shart har safar rost qolsa, tana tugamaydi. Yangilanish yo'q, yangilanish teskari tomonga, yoki shart o'zgaruvchiga umuman qaramaydi. `while (true)` ham shunday, toki ichkarida chiqish bo'lmasa. Chiqish `break` bilan 6.5-darsda.",
              "Hisoblagichni cheksiz o'stirish yana bir yara. `int` chegaradan oshsa, ishorali toshish noma'lum xatti-harakat. «Manfiy bo'lib o'zi to'xtaydi» deb kutmang. Shartni chegaradan ancha oldin yolg'on qiling.",
              "Qotib qolgan dasturni tashqaridan to'xtatasiz. Konsolda odatda Ctrl+C. Oyna yopilsa ham jarayon tugaydi. Dastur o'zi keyingi qatorga qaytmaydi.",
            ],
            code: `int i = 1;
while (i <= 3) {
    std::cout << i << "{{n}}";
    // i++; yo'q. i har doim 1, shart har doim rost
}`,
            codeLabel: "yangilanish unutilgan",
          },
          {
            title: "Bo'sh tana ham aylanadi",
            paragraphs: [
              "`while (i <= 3);` dagi nuqta-vergul bo'sh operator. Aynan shu bo'sh joy tana. `i` o'zgarmasa, bo'sh joy cheksiz takrorlanadi. Pastidagi blok siklga kirmaydi, navbat unga yetmaydi.",
              "Bu 5.1-darsdagi `if` dan keyingi nuqta-vergulning sikldagi akasi. `if` da blok bir marta ortiqcha ishlagan edi. `while` da esa blokka umuman yetilmaydi.",
            ],
            code: `int i = 1;
while (i <= 3);   // tana shu yerda tugaydi
{
    i++;          // bu sikl tanasi emas
}`,
            codeLabel: "nuqta-vergul tanani uzadi",
          },
        ],
      },
      examples: [
        {
          title: "Uch aylana va keyingi qator",
          intro: [
            "Hisoblagich 1 dan 3 gacha o'sadi. To'rtinchi so'rovda shart yiqiladi. `tugadi` shu zahoti chiqadi. Sikl sog'lom bo'lsa, undan keyingi kod yashaydi.",
          ],
          codeLabel: "tugaydigan.cpp",
          code: `#include <iostream>

int main() {
    int i = 1;
    while (i <= 3) {
        std::cout << i << "{{n}}";
        i++;
    }
    std::cout << "tugadi{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
2
3
tugadi`,
          analysis: [
            {
              lines: "4-5",
              text: "`i` 1. Shart `1 <= 3` rost. Tana birinchi marta ochiladi. `if` bo'lsa ham shu yerda kirardi, farq keyingi so'rovlarda.",
            },
            {
              lines: "6-7",
              text: "Ekranga 1 yoziladi, keyin `i` 2 bo'ladi. Sikl boshiga qaytiladi. `2 <= 3` rost, 2 yoziladi, `i` 3. Yana rost, 3 yoziladi, `i` 4.",
            },
            {
              lines: "5, oxirgi so'rov",
              text: "`4 <= 3` yolg'on. Tana boshqa ochilmaydi. Shart 4 marta so'raldi, tana 3 marta ishladi. Oxirgi so'rov chiqish uchun.",
            },
            {
              lines: "9",
              text: "`tugadi` sikldan tashqarida. Unga yetish sikl to'xtaganini ko'rsatadi. `i` endi 4, lekin bu qator uni yozmaydi.",
            },
          ],
        },
        {
          title: "Yangilanish yo'q, 1 qayta-qayta chiqadi",
          intro: [
            "`i++` izohga olingan. Shart `i <= 3` ni so'raydi, `i` esa 1 bo'lib turadi. Bu dasturni ishga tushirsangiz, u o'zi to'xtamaydi. Pastdagi konsol faqat boshlanishi.",
          ],
          codeLabel: "cheksiz.cpp",
          code: `#include <iostream>

int main() {
    int i = 1;
    while (i <= 3) {
        std::cout << i << "{{n}}";
    }
    std::cout << "tugadi{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol boshlang'ichi, dastur tugamaydi",
          console: `1
1
1
...
tugadi chiqmaydi`,
          analysis: [
            {
              lines: "4-6",
              text: "Birinchi kirishda `i` 1, shart rost, ekranga 1 yoziladi. Tana tugaydi. `i` hali ham 1.",
            },
            {
              lines: "5, qaytish",
              text: "Shart yana `1 <= 3`. Yana rost. Yana 1. Hech qanday qadam shartni yolg'onga tormaydi. Aylana yopiq.",
            },
            {
              lines: "8-9",
              text: "`tugadi` va `return` faylda bor, lekin boshqaruv ularga yetmaydi. Jarayon shu `while` ichida turadi. To'xtatish tashqaridan: konsolda Ctrl+C yoki oynani yopish.",
            },
            {
              lines: "tuzatish",
              text: "Tana ichida `i++` bo'lsin. Uchinchidan keyin `i` 4 bo'ladi, shart yiqiladi, `tugadi` chiqadi. Birinchi misoldagi kabi.",
            },
          ],
        },
        {
          title: "Nuqta-vergul blokni sikldan chiqarib yuboradi",
          intro: [
            "Ko'z `while` va figurali qavsni birga o'qiydi. Nuqta-vergul ularning orasini uzgan. Hisoblagich blok ichida o'sadi, lekin blok aylanmaydi.",
          ],
          codeLabel: "bosh_tana.cpp",
          code: `#include <iostream>

int main() {
    int i = 1;
    while (i <= 3); {
        std::cout << i << "{{n}}";
        i++;
    }
    std::cout << "tugadi{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol boshlang'ichi, dastur tugamaydi",
          console: `(hech narsa yozilmaydi)
tugadi ham chiqmaydi`,
          analysis: [
            {
              lines: "5",
              text: "`i` 1. `1 <= 3` rost. Tana nuqta-verguldagi bo'sh operator. U hech narsa yozmaydi va `i` ni o'zgartirmaydi. Shart yana rost. Bo'sh operator yana. Cheksiz, lekin jim.",
            },
            {
              lines: "5-8",
              text: "`{` yangi, mustaqil blok. U `while` ning tanasi emas. Navbat unga yetmaydi, chunki `while` tugamaydi. `i++` ishlamaydi. 1 ham chiqmaydi.",
            },
            {
              lines: "9",
              text: "`tugadi` ham yetib kelmaydi. Konsol bo'sh qotadi. Bu «tana ishlamadi» degani emas. Tana ishlayapti, tana bo'sh.",
            },
            {
              lines: "qoida",
              text: "Shartdan keyin darhol `{` yoki kerakli operator kelsin. `while` qatorining oxiriga `;` qo'ymang.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`i` bitta quti. Sog'lom siklda tana har safar shu qutini o'qiydi, ekranga nusxa yozadi, keyin qutiga yangi son qo'yadi. So'ng protsessor shart buyrug'iga sakraydi. Rost bo'lsa, tana boshiga yana sakraydi. Yolg'on bo'lsa, sakrash sikldan keyingi buyruqqa.",
          "Yangilanish bo'lmasa, quti 1 bo'lib turadi. Shart buyrug'i har safar rost belgi beradi. Ko'rsatkich tana va shart o'rtasida aylanadi. `tugadi` ning manziliga hech kim bormaydi. Buferga 1, qator, 1, qator tushaveradi.",
          "Nuqta-vergul bo'sh buyruq. Shart rost ekan, protsessor shu bo'sh buyruqqa qaytadi. Blokdagi `cout` va `i++` xotirada yotadi, lekin bu o'tishda bajarilmaydi. Ekran jim, protsessor band. «Qotdi» degani ko'pincha shu.",
          "Ishorali `int` ni chegaradan oshirib yuboradigan aylana alohida. Toshish noma'lum. Kompilyator «bunday bo'lmaydi» deb kodni qayta yozishi ham mumkin. Cheksiz siklni o'rab o'tadigan son bilan tuzatmang. Shartni o'zingiz yolg'on qiling.",
        ],
        diagram: `sog'lom:
i [1] -> yoz 1 -> i [2]
i [2] -> yoz 2 -> i [3]
i [3] -> yoz 3 -> i [4]
4 <= 3 yolg'on -> "tugadi"

yangilanish yo'q:
i [1] -> yoz 1 -> i hali [1]
shart yana rost
"tugadi" manziliga yo'l yo'q

nuqta-vergul:
while (i <= 3) ;   <- bo'sh tana aylanadi
{ i++ }            <- yetilmaydi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Cheksiz sikl yig'iladi. Dastur ishga tushadi va keyingi qatorga o'tmaydi. Konsol to'lib ketishi yoki umuman jim qolishi mumkin.",
        ],
        items: [
          {
            title: "Hisoblagichni o'sishsiz qoldirish",
            why: [
              "`i` 1 bo'lib turadi, `i <= 3` har doim rost. `tugadi` chiqmaydi. Tana ichida chegaraga qarab qadam qo'ying.",
            ],
            wrong: `int i = 1;
while (i <= 3) {
    std::cout << i << "{{n}}";
}`,
            right: `int i = 1;
while (i <= 3) {
    std::cout << i << "{{n}}";
    i++;
}`,
          },
          {
            title: "Shartdan keyin nuqta-vergul",
            why: [
              "Bo'sh tana aylanadi, blok siklga kirmaydi. `i++` ishlamagani uchun shart ham yiqilmaydi. Ekran jim qotadi.",
            ],
            wrong: `while (i <= 3); {
    std::cout << i << "{{n}}";
    i++;
}`,
            right: `while (i <= 3) {
    std::cout << i << "{{n}}";
    i++;
}`,
          },
          {
            title: "Qadamni teskari tomonga qo'yish",
            why: [
              "`i` 1 dan boshlab o'ssa, `i > 0` yanada rost bo'la beradi. Pasayish kerak bo'lsa, boshlang'ich qiymat chegaradan yuqorida tursin va tana ichida kamaytiriladi. O'sishni chegaradan oshib, manfiyga o'ralishiga ishonmang. Ishorali toshish noma'lum.",
            ],
            wrong: `int i = 1;
while (i > 0) {
    std::cout << i << "{{n}}";
    i++;
}`,
            right: `int i = 3;
while (i > 0) {
    std::cout << i << "{{n}}";
    i--;
}`,
          },
        ],
      },
      quiz: [
        {
          id: "6.1-q1",
          question: "`i` 1. `while (i <= 3)` ichida son yoziladi va `i++` bor. Tana necha marta ishlaydi?",
          options: ["2", "3", "4", "cheksiz"],
          answer: 1,
          explanation:
            "i 1, 2, 3 da shart rost. 3 yozilgach i 4 bo'ladi, 4 <= 3 yolg'on. Tana 3 marta. Shart 4 marta so'raladi.",
        },
        {
          id: "6.1-q2",
          question: "`while (i <= 3);` dan keyin blokda `i++` turibdi. `i` boshida 1. Nima bo'ladi?",
          options: [
            "1, 2, 3 yoziladi",
            "Blok bir marta ishlaydi",
            "Bo'sh tana cheksiz aylanadi, blokga yetilmaydi",
            "Dastur yig'ilmaydi",
          ],
          answer: 2,
          explanation:
            "Nuqta-vergul bo'sh tana. i o'zgarmaydi, shart rost qoladi. Figurali qavs while ga kirmaydi, shu jumladan i++ ham.",
        },
        {
          id: "6.1-q3",
          question: "Sikl o'zi to'xtashi uchun nima kerak?",
          options: [
            "Tana ichida kamida bitta cout",
            "Shartni oxir-oqibat yolg'on qiladigan o'zgarish",
            "Har doim while (true)",
            "Nuqta-vergul shartdan keyin",
          ],
          answer: 1,
          explanation:
            "Takror shart rost ekan davom etadi. Hisoblagich yoki boshqa qiymat shartni yolg'onga olib kelishi kerak. Aks holda aylana yopiq qoladi.",
        },
      ],
    },
    {
      id: "6.2",
      navTitle: "while sikli",
      title: "while sikli",
      goal: [
        "Bu darsdan keyin siz `while` ni «avval eshik, keyin xona» deb o'qiysiz. Shart boshida yolg'on bo'lsa, tana nol marta ishlaydi. Rost bo'lsa, tana ishlaydi va shart qayta so'raladi. Yig'indi va sanoqni shu tartib bilan hisoblaysiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Kutubxona eshigi oldida qo'riqchi turibdi. U avval so'raydi: hali oladigan kitobing bormi? Yo'q desa, ichkariga kirmaysiz. Birinchi javob yo'q bo'lsa, xona nol marta ochiladi. `while` shunday. `do-while` emas, u keyingi darsda avval ichkariga kiritadi.",
          "Ha desa, bitta kitob olasiz va hisobni yangilaysiz. Eshikka qaytasiz. Qo'riqchi yana so'raydi. Oxirgi yo'q da siz yo'lakda qolasiz. Oxirgi yo'q ning o'zi ham so'rov. Shu sabab kitob sonidan bitta ko'p savol bo'ladi.",
          "Yig'indi ham shu eshik. Har kirishda cho'ntakka joriy sonni qo'shasiz, keyin sonni bittaga surasiz. Eshik yopilganda cho'ntakda tayyor summa yotadi. Qo'shishni eshikdan oldin, bir marta, nol qilib ochasiz. Aks holda eski axlat summaga qo'shiladi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`while (shart) tana`. Tana bitta operator yoki `{}` blok. Bir nechta ish bo'lsa, qavs qo'ying. 5.1-darsdagi chekinish tuzog'i bu yerda ham bor. Shartdan keyin nuqta-vergul qo'ymang, bu 6.1-darsdagi bo'sh tana.",
        ],
        items: [
          {
            title: "Avval shart, keyin tana",
            paragraphs: [
              "Tartib qat'iy. Shart hisoblanadi. Yolg'on bo'lsa, tana umuman ochilmaydi va sikldan keyingi qator keladi. Rost bo'lsa, tana to'liq ishlaydi, keyin shart yana.",
              "Shart boshida yolg'on bo'lishi mumkin. Bu xato emas. Nol marta takrorlash foydali. Masalan, qolgan ish 0 bo'lsa, ichkariga kirmaslik kerak.",
            ],
            code: `while (n > 0) {
    std::cout << n << "{{n}}";
    n--;
}`,
            codeLabel: "nol bo'lsa kirmaydi",
            table: {
              caption: "n 3 dan tushganda har bir so'rov.",
              headers: ["So'rov oldidan n", "n > 0", "Tana"],
              rows: [
                ["3", "rost", "3 yoziladi, n = 2"],
                ["2", "rost", "2 yoziladi, n = 1"],
                ["1", "rost", "1 yoziladi, n = 0"],
                ["0", "yolg'on", "ochilmaydi"],
              ],
            },
          },
          {
            title: "Sanoq va yig'indi",
            paragraphs: [
              "Sanoq uchun hisoblagichni sikldan oldin boshlang. Tana ichida ishni qiling, keyin qadam. Qadamni unutsangiz, 6.1-darsdagi cheksiz aylana.",
              "Yig'indini 0 dan boshlang. `yigindi += i` joriy sonni qo'shadi. `i++` alohida qadam. Qo'shish va qadamni aralashtirmang. `yigindi += i++` ishlashi mumkin, lekin o'qish qiyin. Hozir ikki qator qiling.",
              "`i <= 4` 1, 2, 3, 4 ni oladi. `i < 4` 4 ni tashqarida qoldiradi. Chegara tana ichidagi songa kiritiladimi, shartni shunga qarab yozing.",
            ],
          },
          {
            title: "Sikldan keyin hisoblagich qayerda",
            paragraphs: [
              "`while` dan oldin ochilgan `i` sikldan keyin ham tirik. Tugaganda u shartni yiqitgan qiymatda turadi. `i` 1 dan 4 gacha, shart `i <= 4` bo'lsa, chiqishda `i` 5.",
              "Shu 5 ni «oxirgi yozilgan son» deb o'qimang. Oxirgi yozilgan 4. 5 esa eshikni yopgan qiymat. Keyingi hisobda shuni adashtirmang.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "1 dan 5 gacha, keyin eshik yopiladi",
          intro: [
            "Besh marta yozuv, oltinchi so'rov yolg'on. `tayyor` sikldan keyin. Hisoblagich 6 da qoladi.",
          ],
          codeLabel: "while_sanoq.cpp",
          code: `#include <iostream>

int main() {
    int i = 1;
    while (i <= 5) {
        std::cout << i << "{{n}}";
        i++;
    }
    std::cout << "tayyor " << i << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
2
3
4
5
tayyor 6`,
          analysis: [
            {
              lines: "4-5",
              text: "`i` 1. `1 <= 5` rost. Birinchi tana. Eshik avval ochiladi, xona keyin.",
            },
            {
              lines: "6-7",
              text: "1 yoziladi, `i` 2. Xuddi shu juftlik 2, 3, 4, 5 uchun takrorlanadi. 5 yozilgach `i++` uni 6 qiladi.",
            },
            {
              lines: "5, chiqish",
              text: "`6 <= 5` yolg'on. Tana oltinchi marta ochilmaydi. Shart 6 marta so'raldi, tana 5 marta ishladi.",
            },
            {
              lines: "9",
              text: "`tayyor 6`. 6 oxirgi chiqqan son emas. Oxirgi chiqqan 5. 6 eshikni yopgan qiymat. `i` `while` dan oldin ochilgani uchun bu qatorda ko'rinadi.",
            },
          ],
        },
        {
          title: "1 dan 4 gacha yig'indi",
          intro: [
            "Cho'ntak 0 dan ochiladi. Har kirishda joriy `i` qo'shiladi, keyin `i` suriladi. 1+2+3+4 = 10.",
          ],
          codeLabel: "while_yigindi.cpp",
          code: `#include <iostream>

int main() {
    int i = 1;
    int yigindi = 0;
    while (i <= 4) {
        yigindi += i;
        i++;
    }
    std::cout << yigindi << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `10`,
          analysis: [
            {
              lines: "4-5",
              text: "`i` 1, `yigindi` 0. Nol bo'lmasa, ichidagi axlat summaga qo'shilardi. O'qish noma'lum bo'lib qolishi ham mumkin edi.",
            },
            {
              lines: "6-8",
              text: "`i` 1: yig'indi 0+1=1, `i` 2. `i` 2: 1+2=3, `i` 3. `i` 3: 3+3=6, `i` 4. `i` 4: 6+4=10, `i` 5.",
            },
            {
              lines: "6, chiqish",
              text: "`5 <= 4` yolg'on. 5 yig'indiga kirmaydi. Chegara `<=` bo'lgani uchun 4 kirgan.",
            },
            {
              lines: "10",
              text: "Ekranga 10. `i` 5 bo'lib qolgan, uni yozmadik. Yig'indi sikldan keyin ham tirik, chunki u ham oldin ochilgan.",
            },
          ],
        },
        {
          title: "Shart boshida yolg'on, tana nol marta",
          intro: [
            "`n` allaqachon 0. Eshik birinchi so'rovda yopiq. Ichkaridagi yozuv va `n--` ishlamaydi.",
          ],
          codeLabel: "while_nol.cpp",
          code: `#include <iostream>

int main() {
    int n = 0;
    while (n > 0) {
        std::cout << "ichkari{{n}}";
        n--;
    }
    std::cout << "tashqarida " << n << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `tashqarida 0`,
          analysis: [
            {
              lines: "4-5",
              text: "`n` 0. `0 > 0` yolg'on. `while` tanaga kirmaydi. Bu cheksiz emas va xato ham emas.",
            },
            {
              lines: "6-7",
              text: "Bu ikki qator bu safar bajarilmaydi. `ichkari` buferga tushmaydi. `n--` ham yo'q, chunki xonaga kirilmagan.",
            },
            {
              lines: "9",
              text: "Sikldan keyingi qator ishlaydi. `tashqarida 0`. `n` boshidagi 0. Birinchi yolg'on so'rov chiqish uchun yetarli.",
            },
            {
              lines: "farq",
              text: "Agar kamida bir marta kirish shart bo'lsa, bu `while` yetmaydi. Buni `do-while` qiladi, keyingi dars.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Protsessor avval shartni hisoblaydi. Yolg'on belgi bo'lsa, sakrash tanani tashlab, sikldan keyingi buyruqqa boradi. `n` 0 bo'lsa, `ichkari` dagi `cout` bu o'tishda umuman ochilmaydi. Quti o'zgarmaydi.",
          "Rost bo'lsa, tana buyruqlari ketma-ket ishlaydi. `yigindi += i` cho'ntak qutisini o'qiydi, `i` ni qo'shadi, yangi summani o'sha uyaga yozadi. Keyin `i++` hisoblagich uyani bittaga oshiradi. So'ng ko'rsatkich shart buyrug'iga qaytadi.",
          "1 dan 4 gacha to'rt marta qo'shish bo'ladi. Beshinchi shart `i` 5 bo'lganda yolg'on. 5 qutida turadi, lekin `+=` bu safar ishlamaydi. Shu sabab summa 10, hisoblagich 5.",
          "Ikki quti ham `while` dan oldin ochilgan. Sikl tugagach ular yo'qolmaydi. Blok ichida ochilgan nom esa har bir takror oxirida, o'sha blok yopilganda, umrini tugatadi. Keyingi takrorda qayta ochiladi.",
        ],
        diagram: `i [1] yigindi [0]
+1 -> yigindi [1], i [2]
+2 -> yigindi [3], i [3]
+3 -> yigindi [6], i [4]
+4 -> yigindi [10], i [5]
5 <= 4 yolg'on
cout: 10

n [0]
0 > 0 yolg'on
tana ochilmaydi
"tashqarida 0"`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "`while` xatosi cheksiz aylana, bitta qadam ortiqcha yoki nolga tayyorlanmagan yig'indi bo'ladi.",
        ],
        items: [
          {
            title: "Chegarani birga adashtirish",
            why: [
              "`i < 4` 1, 2, 3 ni oladi. 4 tashqarida qoladi. «4 gacha, 4 ham kirsin» bo'lsa, `i <= 4`. Oxirgi son shartga kiritilganmi, jadvalda tekshiring.",
            ],
            wrong: `int i = 1;
while (i < 4) {
    std::cout << i << "{{n}}";
    i++;
}`,
            right: `int i = 1;
while (i <= 4) {
    std::cout << i << "{{n}}";
    i++;
}`,
          },
          {
            title: "Yig'indini e'lon qilib, 0 qo'ymaslik",
            why: [
              "Boshlang'ich qiymatsiz `int` ni o'qish noma'lum. `+=` avval eski qiymatni o'qiydi. Yig'indini 0 dan oching.",
            ],
            wrong: `int yigindi;
while (i <= 4) {
    yigindi += i;
    i++;
}`,
            right: `int yigindi = 0;
while (i <= 4) {
    yigindi += i;
    i++;
}`,
          },
          {
            title: "Qadamni shart yopilgandan keyin kutish",
            why: [
              "`i` o'zgarmasa, `i <= 5` rost qoladi. Birinchi son cheksiz yoziladi. `i++` tana ichida, shart yana so'ralishidan oldin bo'lsin.",
            ],
            wrong: `while (i <= 5) {
    std::cout << i << "{{n}}";
}`,
            right: `while (i <= 5) {
    std::cout << i << "{{n}}";
    i++;
}`,
          },
        ],
      },
      quiz: [
        {
          id: "6.2-q1",
          question: "`n` 0. `while (n > 0)` tanasi nima qiladi?",
          options: [
            "Bir marta ishlaydi",
            "Nol marta, darhol sikldan keyingi qatorga o'tadi",
            "Cheksiz aylanadi",
            "n ni 1 qilib, keyin kiradi",
          ],
          answer: 1,
          explanation:
            "while avval shartni so'raydi. 0 > 0 yolg'on. Tana ochilmaydi. Bu xato emas, nol marta takror.",
        },
        {
          id: "6.2-q2",
          question: "`yigindi` 0, `i` 1. `while (i <= 4)` ichida `yigindi += i` va `i++`. Oxirida yig'indi necha?",
          options: ["4", "9", "10", "15"],
          answer: 2,
          explanation:
            "Qo'shiladigan sonlar 1, 2, 3, 4. 1+2+3+4 = 10. i 5 bo'lganda shart yiqiladi, 5 qo'shilmaydi.",
        },
        {
          id: "6.2-q3",
          question: "`i` 1 dan `while (i <= 5)` da o'sib chiqsa, sikldan keyin `i` necha bo'ladi?",
          options: ["5, oxirgi yozilgan son", "6, shartni yiqitgan qiymat", "0", "1"],
          answer: 1,
          explanation:
            "5 yozilgach i++ uni 6 qiladi. 6 <= 5 yolg'on, tana boshqa ochilmaydi. Oxirgi chiqqan son 5, qutidagi qiymat 6.",
        },
      ],
    },
    {
      id: "6.3",
      navTitle: "do-while",
      title: "do - while sikli",
      goal: [
        "Bu darsdan keyin siz `do-while` ni «avval tana, keyin shart» deb o'qiysiz. Shart boshida yolg'on bo'lsa ham tana kamida bir marta ishlaydi. Oxiridagi nuqta-vergul shartning o'zi emas, butun `do-while` ning yopilishi ekanini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Oshni tatib ko'rishni o'ylab ko'ring. Avval bir qoshiq olasiz, keyin so'raysiz: yana olamanmi? Birinchi qoshiq savoldan oldin. Idish bo'sh ko'rinsa ham, bu odat sizni kamida bir marta tatib qo'yadi. `do-while` shu. `while` esa avval qopqoqni ochib, bo'sh bo'lsa qoshiqni umuman olmaysiz.",
          "Menyu ham shunday. Kassir avval ro'yxatni bir marta o'qiydi, tanlovni oladi, keyin «yana buyurtma bormi» deydi. Ro'yxatni nol marta o'qish foydasiz. Kamida bir ko'rsatish kerak bo'lgan ish `do-while` ga tushadi.",
          "Qoshiqdan keyin savolni unutsangiz, siz to'xtamasdan yeyverasiz. Shart tana ichidagi o'zgarishga qarab yolg'on bo'lishi kerak. Va savol jumlasining oxirida nuqta qo'yiladi. C++ da bu `while (...);` dagi nuqta-vergul. Uni tashlasangiz, gap tugamaydi, dastur yig'ilmaydi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Yozuv: `do tana while (shart);`. Tana oldin. Shart tana tugagach. Nuqta-vergul `while` qavsidan keyin, majburiy. U yangi bo'sh sikl emas, shu konstruksiyaning oxiri.",
        ],
        items: [
          {
            title: "Kamida bir marta",
            paragraphs: [
              "Shart birinchi marta tana ishlagandan keyin so'raladi. Shart oldindan yolg'on bo'lsa ham, tana bir marta bajariladi. Keyin shart yolg'on chiqsa, to'xtaydi.",
              "Nol marta kerak bo'lsa, `while` yozing. Masalan, qolgan narsa 0 bo'lib, ichkaridagi ish narsa borligiga tayanadi. `do-while` uni bir marta ortiqcha qiladi.",
            ],
            code: `do {
    std::cout << "bir marta{{n}}";
} while (n > 0);`,
            codeLabel: "n 0 bo'lsa ham bir marta",
            table: {
              caption: "Bir xil boshlang'ich, ikki xil eshik. n va a 0, shart > 0.",
              headers: ["Sikl", "Birinchi ish", "Konsol"],
              rows: [
                ["while (a > 0)", "shart, yolg'on", "tana yo'q"],
                ["do ... while (b > 0)", "tana, keyin shart", "tana bir marta"],
              ],
            },
          },
          {
            title: "Nuqta-vergul qayerda turadi",
            paragraphs: [
              "`do` dan keyin nuqta-vergul qo'yilmaydi. Tana `do` dan keyin keladi. Nuqta-vergul `while (shart)` dan keyin.",
              "Shu nuqta-vergulni unutsangiz, dastur yig'ilmaydi. Keyingi qator yangi operator bo'lib qoladi, `do-while` esa yopilmaydi.",
              "`while` ning o'zidan keyin, `do` siz, qo'yilgan nuqta-vergul boshqa narsa. U 6.1-dagi bo'sh tana. `do-while` dagi nuqta-vergul esa kerakli yopilish. Ikkalasini aralashtirmang.",
            ],
            code: `do {
    std::cout << i << "{{n}}";
    i++;
} while (i <= 3);`,
            codeLabel: "oxirida nuqta-vergul bor",
          },
          {
            title: "Qachon do-while, qachon while",
            paragraphs: [
              "Ishni kamida bir marta ko'rish shart bo'lsa, `do-while`. Shart birinchi galdayoq yolg'on bo'lishi mumkin bo'lsa va tana shunda ishlamasligi kerak bo'lsa, `while`.",
              "Sanoqni ikkalasi ham qila oladi. Farq nol marta chegarasida. 1 dan 3 gacha ikkalasi ham 1, 2, 3 yozadi, toki boshlang'ich qiymat shartga allaqachon sig'sa. Boshlang'ich sig'masa, `while` jim, `do-while` bir marta gapiradi.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Shart yolg'on, tana baribir bir marta",
          intro: [
            "`n` 0, shart `n > 0`. `while` bo'lsa jim o'tardi. `do` avval yozadi, keyin so'raydi va to'xtaydi.",
          ],
          codeLabel: "do_bir.cpp",
          code: `#include <iostream>

int main() {
    int n = 0;
    do {
        std::cout << "bir marta{{n}}";
    } while (n > 0);
    std::cout << "tugadi{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `bir marta
tugadi`,
          analysis: [
            {
              lines: "4-6",
              text: "`n` 0. `do` shartni kutmaydi. Tana ochiladi, `bir marta` yoziladi. `n` o'zgarmaydi, hali 0.",
            },
            {
              lines: "7",
              text: "Endi shart. `0 > 0` yolg'on. Ikkinchi aylana yo'q. Nuqta-vergul shu `do-while` ni yopadi.",
            },
            {
              lines: "8",
              text: "`tugadi` chiqadi. Sikl to'xtagan. Cheksiz emas, chunki birinchi tekshiruvning o'zi yolg'on.",
            },
            {
              lines: "xulosa",
              text: "Tana 1 marta, shart 1 marta, shart yolg'on. `while` da shu boshlang'ich bilan tana 0 marta bo'lardi.",
            },
          ],
        },
        {
          title: "while jim, do bir marta gapiradi",
          intro: [
            "Ikkalasi ham `> 0` so'raydi. Ikkalasining ham boshidagi son 0. Farq faqat so'rovning joyida.",
          ],
          codeLabel: "while_va_do.cpp",
          code: `#include <iostream>

int main() {
    int a = 0;
    while (a > 0) {
        std::cout << "while{{n}}";
    }
    std::cout << "while tugadi{{n}}";

    int b = 0;
    do {
        std::cout << "do{{n}}";
    } while (b > 0);
    std::cout << "do tugadi{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `while tugadi
do
do tugadi`,
          analysis: [
            {
              lines: "4-7",
              text: "`a` 0. `while` avval `0 > 0` ni so'raydi. Yolg'on. 6-qator ishlamaydi. `while` so'zi chiqmaydi.",
            },
            {
              lines: "8",
              text: "`while tugadi` sikldan keyin. Birinchi sikl nol marta bo'lib tugagan.",
            },
            {
              lines: "11-13",
              text: "`b` 0. `do` avval 12-qatorni ishlatadi. `do` yoziladi. Keyin `0 > 0` yolg'on. Ikkinchi marta kirmaydi.",
            },
            {
              lines: "14",
              text: "`do tugadi`. Konsolda `while` qatori yo'q, `do` qatori bor. Xuddi shu ma'lumot, boshqa tartib.",
            },
          ],
        },
        {
          title: "1, 2, 3 va eshikni yopgan qiymat",
          intro: [
            "Bu yerda birinchi shart ham rost bo'lardi, shuning uchun `while` ham xuddi shu uch qatorni berardi. Oxiridagi nuqta-vergul va `i` ning 4 da qolishi ko'rinsin.",
          ],
          codeLabel: "do_sanoq.cpp",
          code: `#include <iostream>

int main() {
    int i = 1;
    do {
        std::cout << i << "{{n}}";
        i++;
    } while (i <= 3);
    std::cout << "i=" << i << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
2
3
i=4`,
          analysis: [
            {
              lines: "5-7",
              text: "Birinchi tana so'rovsiz. `i` 1 yoziladi, keyin 2 bo'ladi. Endi `2 <= 3` rost. Yana tana: 2 yoziladi, `i` 3. `3 <= 3` rost. 3 yoziladi, `i` 4.",
            },
            {
              lines: "8",
              text: "`4 <= 3` yolg'on. To'xtash. Nuqta-vergul shart qatorining oxirida. Uni olibsangiz, bu fayl yig'ilmaydi.",
            },
            {
              lines: "9",
              text: "`i=4`. Yana eshikni yopgan qiymat, oxirgi yozilgan son emas. Oxirgi yozilgan 3.",
            },
            {
              lines: "solishtirish",
              text: "`while (i <= 3)` ham 1, 2, 3 berardi, chunki boshlang'ich 1 shartga sig'adi. Farq `i` 4 dan boshlanganda chiqadi. `while` jim qoladi, `do` 4 ni bir marta yozib, keyin to'xtaydi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`do` protsessorni to'g'ridan tana boshiga qo'yadi. Shart buyrug'i tana oxirida. Birinchi o'tishda shart registri hali hisoblanmaydi. `n` 0 bo'lsa ham `bir marta` buferga tushadi, keyin `0 > 0` yolg'on belgi beradi va sakrash sikldan chiqadi.",
          "`while` da birinchi buyruq shart. `a` 0 bo'lsa, tana manziliga sakrash bo'lmaydi. Ikki dastur xuddi shu sonni ushlaydi, lekin birinchisi tanani ochmaydi, ikkinchisi ochadi. Farq xotiradagi tartibda, sonning o'zida emas.",
          "Sanoqda `i` qutisi tana ichida yangilanadi, shart esa yangilangandan keyin o'qiladi. 3 yozilgach `i` 4 bo'ladi, shart 4 ni ko'radi. 3 ni emas. Shu sabab oxirgi muvaffaqiyatli tana va chiqish qiymati bir xil son emas.",
          "Nuqta-vergul alohida buyruq emas, `do-while` sintaksisining oxiri. Kompilyator uni ko'rmasa, keyingi qatorni shu gapning davomi deb o'qiy olmaydi va yig'ishni to'xtatadi. Ishga tushgan jarayon bu xatoga yetmaydi.",
        ],
        diagram: `n [0]
do: "bir marta" buferga
keyin 0 > 0 yolg'on
"tugadi"

a [0] while
avval 0 > 0 yolg'on
"while" yozilmaydi

i [1] do
yoz 1, i [2], 2 <= 3 rost
yoz 2, i [3], 3 <= 3 rost
yoz 3, i [4], 4 <= 3 yolg'on`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "`do-while` xatosi yo yig'ilmaydi, yo bir marta ortiqcha ish qiladi. Cheksiz aylana esa shart hech qachon yiqilmasa chiqadi.",
        ],
        items: [
          {
            title: "Oxiridagi nuqta-vergulni tashlab ketish",
            why: [
              "`while (i <= 3)` dan keyin `;` bo'lmasa, `do-while` yopilmaydi. Bu mantiq xatosi emas, sintaksis xatosi. Dastur yig'ilmaydi.",
            ],
            wrong: `do {
    std::cout << i << "{{n}}";
    i++;
} while (i <= 3)`,
            right: `do {
    std::cout << i << "{{n}}";
    i++;
} while (i <= 3);`,
          },
          {
            title: "Nol marta kerak bo'lib, do yozish",
            why: [
              "`n` 0, ichkarida `n` ni bo'lish yoki undan narsa olish bo'lsa, bir marta ortiqcha kirish yomon. Birinchi so'rov yolg'on bo'lishi mumkin bo'lsa, `while` tanani yopiq saqlaydi.",
            ],
            wrong: `do {
    std::cout << "qoldi " << n << "{{n}}";
    n--;
} while (n > 0);`,
            right: `while (n > 0) {
    std::cout << "qoldi " << n << "{{n}}";
    n--;
}`,
          },
          {
            title: "do dan keyin darhol nuqta-vergul",
            why: [
              "`do;` bo'sh tanani bir marta, shart rost ekan yana-yana ishlatadi. Asosiy blok siklga kirmaydi. `do` dan keyin tana kelsin, nuqta-vergul esa faqat oxirgi `while` dan keyin.",
            ],
            wrong: `do;
while (i <= 3); {
    std::cout << i << "{{n}}";
    i++;
}`,
            right: `do {
    std::cout << i << "{{n}}";
    i++;
} while (i <= 3);`,
          },
        ],
      },
      quiz: [
        {
          id: "6.3-q1",
          question: "`n` 0. `do { yoz } while (n > 0);` tanasi necha marta ishlaydi?",
          options: ["0", "1", "2", "cheksiz"],
          answer: 1,
          explanation:
            "do avval tanani ishlatadi, keyin shartni so'raydi. 0 > 0 yolg'on, ikkinchi marta yo'q. Jami bir marta.",
        },
        {
          id: "6.3-q2",
          question: "`do { ... } while (i <= 3)` oxirida nuqta-vergul yo'q. Nima bo'ladi?",
          options: [
            "Oddiy while ga aylanadi",
            "Cheksiz aylanadi",
            "Dastur yig'ilmaydi",
            "Tana nol marta ishlaydi",
          ],
          answer: 2,
          explanation:
            "Nuqta-vergul do-while ning yopilishi. U bo'lmasa, konstruksiya tugamaydi. Bu yig'ish xatosi, ishga tushgan cheksiz sikl emas.",
        },
        {
          id: "6.3-q3",
          question: "`a` ham, `b` ham 0. `while (a > 0)` va `do ... while (b > 0)` qanday farq qiladi?",
          options: [
            "Ikkalasi ham jim",
            "while bir marta, do nol marta",
            "while nol marta, do bir marta",
            "Ikkalasi ham cheksiz",
          ],
          answer: 2,
          explanation:
            "while avval yolg'on shartni ko'radi va kirmaydi. do avval tanani bajaradi, keyin yolg'on shartni ko'rib to'xtaydi.",
        },
      ],
    },
    {
      id: "6.4",
      navTitle: "for sikli",
      title: "for sikli",
      goal: [
        "Bu darsdan keyin siz `for` ni uch bo'lakka ajratasiz. Boshlash bir marta, keyin shart, tana, qadam, yana shart. Qadam oxirgi tanadan keyin ham ishlashini, shart birinchi galdayoq yolg'on bo'lsa qadam ishlamasligini va `i < n` bilan `i <= n` ning farqini ayta olasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Avtobus varaqasini ko'ring. Tepada uch katak. Birinchisi: qaysi bekatdan chiqaman, bu bir marta yoziladi. Ikkinchisi: hali oxirgi bekatdan o'tib ketmadimmi. Uchinchisi: eshik yopilgach keyingi bekatga surilaman. Yo'lovchi ishi, ya'ni tana, ikkinchi va uchinchi katakning o'rtasida.",
          "Haydovchi varaqani har bekatda qayta yozmaydi. Boshlash bir marta. Har to'xtashda avval «yana borish kerakmi» deb qaraydi. Ha bo'lsa, yo'lovchilar tushadi-chiqadi. Keyin varaqadagi qadam: keyingi bekat. So'ng yana savol. Oxirgi bekatda ham qadam ishlaydi, keyingi savol esa yo'q deydi.",
          "Agar birinchi savolning o'zi «bu bekat marshrutda yo'q» bo'lsa, yo'lovchi chiqmaydi va qadam ham bosilmaydi. Lekin boshlang'ich bekat raqami varaqaga yozilgan bo'ladi. Boshlash shart yolg'on bo'lsa ham bo'lib ulguradi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`for (boshlash; shart; qadam) tana`. Boshlashdagi nuqta-vergul shartning oldida turadi. Qadamdan keyin nuqta-vergul yo'q, darhol yopilish qavsi.",
        ],
        items: [
          {
            title: "Bajarilish tartibi",
            paragraphs: [
              "Boshlash aynan bir marta, siklga kirishdan oldin. Keyin shart. Yolg'on bo'lsa, tana ham, qadam ham ishlamaydi. Rost bo'lsa, tana to'liq ishlaydi, keyin qadam, keyin yana shart.",
              "Oxirgi muvaffaqiyatli tanadan keyin qadam yana ishlaydi. Shart shu yangi qiymatda yiqiladi. `i <= 4` da tana 1, 2, 3, 4 ni ko'radi, qadam `i` ni 5 qiladi, shart to'xtaydi. 5 tana ichida emas.",
              "`for` dagi `i++` va `++i` butun hisoblagichda bir xil ish qiladi. Ifodaning qiymati tashlanadi, qoladi faqat oshirish. Murakkab qadamda farq chiqishi mumkin. Hisoblagichda ikkalasi ham yaroqli.",
            ],
            code: `for (int i = 1; i <= 4; i++) {
    std::cout << i << "{{n}}";
}`,
            codeLabel: "boshlash, shart, qadam",
            table: {
              caption: "i 1 dan 4 gacha, shart i <= 4. Tana 4, qadam 4, shart 5 marta.",
              headers: ["Qadam", "i", "Nima ishlaydi"],
              rows: [
                ["boshlash", "1", "bir marta"],
                ["shart rost", "1", "tana 1, keyin i = 2"],
                ["shart rost", "2", "tana 2, keyin i = 3"],
                ["shart rost", "3", "tana 3, keyin i = 4"],
                ["shart rost", "4", "tana 4, keyin i = 5"],
                ["shart yolg'on", "5", "tana yo'q, qadam yo'q"],
              ],
            },
          },
          {
            title: "Hisoblagichning umri",
            paragraphs: [
              "`for (int i = ...)` dagi `i` shu siklga tegishli. Shart va qadam uni ko'radi. Yopilish qavsidan keyin nom yo'qoladi. Tashqarida kerak bo'lsa, `i` ni `for` dan oldin e'lon qiling.",
              "Tashqaridagi bir xil nom bo'lsa, ichkaridagi `i` uni yashiradi. Sikl ichidagi o'zgarish tashqi qutiga yozilmaydi. Ikkita `i` ni aralashtirmang.",
            ],
          },
          {
            title: "Chegara va qadam kattaligi",
            paragraphs: [
              "`i = 0; i < 3; i++` sonlarni 0, 1, 2 qiladi. Uch marta. `i <= 3` bo'lsa 0, 1, 2, 3. To'rt marta. Bir qadamlik farq shu `=` da.",
              "`i += 2` juft qadam. 0, 2, 4, 6. Shart `i < 8` bo'lsa, 8 tana ichiga kirmaydi. Qadam har doim `++` emas.",
              "Tana ichida hisoblagichni yana o'zgartirsangiz, sarlavhadagi qadam ham ishlaydi. Ikki marta oshadi, sonlar sakrab ketadi. Odatda qadam faqat sarlavhada tursin.",
              "Uchala bo'lak ham bo'sh bo'lishi mumkin. `for (;;)` sharti doim rost, bu cheksiz sikl. Ichida `break` bo'lmasa, 6.1-darsdagi xavf.",
            ],
            code: `for (int i = 0; i < 8; i += 2) {
    std::cout << i << "{{n}}";
}`,
            codeLabel: "qadam 2",
          },
        ],
      },
      examples: [
        {
          title: "1 dan 4 gacha, qadam oxirida ham ishlaydi",
          intro: [
            "To'rtta yozuv. Beshinchi qadam `i` ni 5 qiladi, shart shunda yiqiladi. `tayyor` sikldan keyin. `i` ning o'zi bu qatorda ko'rinmaydi.",
          ],
          codeLabel: "for_tort.cpp",
          code: `#include <iostream>

int main() {
    for (int i = 1; i <= 4; i++) {
        std::cout << i << "{{n}}";
    }
    std::cout << "tayyor{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
2
3
4
tayyor`,
          analysis: [
            {
              lines: "4, boshlash",
              text: "`int i = 1` bir marta. Sikl tugaguncha qayta ishlamaydi. `i` shu `for` ning ichida tug'iladi.",
            },
            {
              lines: "4-5, aylana",
              text: "Shart `1 <= 4` rost, tana 1 ni yozadi, qadam `i` ni 2 qiladi. Xuddi shu tartib 2, 3, 4 uchun. Har safar tana oldin, qadam keyin.",
            },
            {
              lines: "4, chiqish",
              text: "4 yozilgach qadam `i` ni 5 qiladi. `5 <= 4` yolg'on. Bu so'rovda tana ham, yangi qadam ham yo'q. Qadam jami 4 marta ishlagan, shart 5 marta so'ralgan.",
            },
            {
              lines: "6",
              text: "`tayyor` chiqadi. `i` ni shu qatorda yozib bo'lmaydi. Uning qutisi `for` yopilishi bilan yo'qolgan. 5 ni ko'rmoqchi bo'lsangiz, `i` ni sikldan oldin oching.",
            },
          ],
        },
        {
          title: "Shart darrov yolg'on, qadam umuman yo'q",
          intro: [
            "Boshlash `boshlandi` ni 1 qiladi. Shart `false`. Tana yozilmaydi, `++` ham ishlamaydi. Qutida 1 qoladi.",
          ],
          codeLabel: "for_nol.cpp",
          code: `#include <iostream>

int main() {
    int boshlandi = 0;
    for (boshlandi = 1; false; boshlandi++) {
        std::cout << "tana{{n}}";
    }
    std::cout << boshlandi << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1`,
          analysis: [
            {
              lines: "4-5",
              text: "Tashqi `boshlandi` avval 0. `for` boshlashi uni 1 qiladi. Bu ish shartdan oldin va aynan bir marta.",
            },
            {
              lines: "5, shart",
              text: "`false` yolg'on. Tana ochilmaydi. `tana` chiqmaydi. Qadam `boshlandi++` ham tashlanadi. Birinchi yolg'on shart qadamni ham yopadi.",
            },
            {
              lines: "7",
              text: "Ekranga 1. Bu boshlashning izi. Qadam ishlaganida 2 bo'lardi. Bo'lmagan.",
            },
            {
              lines: "xulosa",
              text: "Tartib: boshlash, shart, va faqat shart rost bo'lsa tana, keyin qadam. Uchala bo'lak har safar birga ishlaydi, degan gap noto'g'ri.",
            },
          ],
        },
        {
          title: "i < 3 va i <= 3",
          intro: [
            "Ikkalasi ham 0 dan boshlanadi, qadam `++`. Farq shartning chegarasida. Birinchisi 3 tani, ikkinchisi 4 tani yozadi.",
          ],
          codeLabel: "for_chegara.cpp",
          code: `#include <iostream>

int main() {
    for (int i = 0; i < 3; i++) {
        std::cout << i;
        if (i < 2) {
            std::cout << " ";
        }
    }
    std::cout << "{{n}}";
    for (int i = 0; i <= 3; i++) {
        std::cout << i;
        if (i < 3) {
            std::cout << " ";
        }
    }
    std::cout << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `0 1 2
0 1 2 3`,
          analysis: [
            {
              lines: "4-9",
              text: "`i < 3` rost bo'lgan qiymatlar 0, 1, 2. `i` 3 bo'lganda shart yiqiladi, 3 yozilmaydi. Jami uch ta son. Probel faqat oxirgisidan oldin, qator oxiri alohida.",
            },
            {
              lines: "11-16",
              text: "`i <= 3` 0, 1, 2 va 3 ni oladi. `=` bitta qo'shimcha takror. To'rt ta son. Keyin `i` 4 bo'ladi va shart yiqiladi.",
            },
            {
              lines: "chegara",
              text: "«0 dan 3 gacha, 3 kirmaydi» bo'lsa `<`. «3 ham kirsin» bo'lsa `<=`. Bittasini odatdan yozmang, oxirgi son kerakmi, shuni ayting.",
            },
          ],
        },
        {
          title: "Qadam ikki, juft sonlar",
          intro: [
            "`i += 2` har tanadan keyin ikki qo'shadi. 8 chegaraga teng bo'lib qoladi va tana ichiga kirmaydi.",
          ],
          codeLabel: "for_qadam.cpp",
          code: `#include <iostream>

int main() {
    for (int i = 0; i < 8; i += 2) {
        std::cout << i << "{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `0
2
4
6`,
          analysis: [
            {
              lines: "4, boshlash",
              text: "`i` 0. Shart `0 < 8` rost. 0 yoziladi. Qadam 2 qo'shadi, `i` 2.",
            },
            {
              lines: "4-5",
              text: "2, keyin 4, keyin 6 yoziladi. 6 dan keyin qadam `i` ni 8 qiladi. `8 < 8` yolg'on. 8 chiqmaydi.",
            },
            {
              lines: "qadam",
              text: "`++` bo'lsa 0 dan 7 gacha sakkiz qator bo'lardi. `+= 2` shu oralig'idan juftdorlarini oladi. Qadam sarlavhada, tana ichida emas.",
            },
            {
              lines: "hisob",
              text: "Tana 4 marta. Qadam ham 4 marta: 0→2, 2→4, 4→6, 6→8. Beshinchi shart yolg'on, beshinchi qadam yo'q.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Boshlash bitta yozuv. `int i = 1` stekda quti ochadi va 1 qo'yadi. Bu buyruq sikl davomida boshqa chaqirilmaydi. Keyin shart registrda rost yoki yolg'on bo'ladi.",
          "Rost bo'lsa, tana ishlaydi, so'ng qadam buyrug'i. `i++` qutini o'qiydi, bittaga oshiradi, yangi sonni yozadi. Ifoda qiymati hech kimga berilmaydi. Shundan keyin ko'rsatkich shartga qaytadi, boshlashga emas.",
          "`false` bo'lsa, birinchi shartning o'zida chiqish sakrashi bor. Qadam buyrug'ining manziliga bu o'tishda yo'l yo'q. `boshlandi` 1 bo'lib qoladi, chunki boshlash ulgurgan, `++` ulgurmagan.",
          "`for` yopilishi `int i` qutisini bo'shatadi. Keyingi qator o'sha nomni ko'rmaydi. Kompilyator buni ishga tushishdan oldin rad etadi. Tashqarida ochilgan `boshlandi` esa o'sha uyada qoladi.",
        ],
        diagram: `boshlash: i [1]     bir marta
shart 1 <= 4 rost
tana "1"
qadam i [2]
shart rost, tana "2", qadam i [3]
shart rost, tana "3", qadam i [4]
shart rost, tana "4", qadam i [5]
shart 5 <= 4 yolg'on
i qutisi for bilan yo'qoladi

boshlandi: 0, keyin boshlash 1
shart false
tana yo'q, qadam yo'q
cout: 1`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "`for` xatosi bitta sonni tashlab ketadi, yoki tana va sarlavha hisoblagichni ikkalasi ham surib, qiymatlarni sakratadi.",
        ],
        items: [
          {
            title: "Tana ichida ham, sarlavhada ham oshirish",
            why: [
              "Tana `i++` qiladi, sarlavha yana `i++` qiladi. 1 dan 5 gacha yozmoqchi bo'lsangiz, chiqadi 1, 3, 5. Qadamni bitta joyda qoldiring.",
            ],
            wrong: `for (int i = 1; i <= 5; i++) {
    std::cout << i << "{{n}}";
    i++;
}`,
            right: `for (int i = 1; i <= 5; i++) {
    std::cout << i << "{{n}}";
}`,
          },
          {
            title: "for ichidagi i ni tashqarida ishlatish",
            why: [
              "`int i` sikl sarlavhasida ochilgan. Yopilgach nom yo'q. Dastur yig'ilmaydi. Keyin kerak bo'lsa, e'lonni `for` dan oldinga chiqaring.",
            ],
            wrong: `for (int i = 1; i <= 4; i++) {
    std::cout << i << "{{n}}";
}
std::cout << i << "{{n}}";`,
            right: `int i = 1;
for (i = 1; i <= 4; i++) {
    std::cout << i << "{{n}}";
}
std::cout << i << "{{n}}";`,
          },
          {
            title: "3 ham kirsin deb, uni shartdan tashqarida qoldirish",
            why: [
              "Maqsad 0, 1, 2, 3 bo'lsa, `i < 3` 3 ni yozmaydi. `i <= 3` yozadi. 0 dan boshlansa, `<` uchta son, `<=` to'rtta. Oxirgi son kerak bo'lsa, u shartga sig'sin.",
            ],
            wrong: `for (int i = 0; i < 3; i++) {
    std::cout << i << "{{n}}";
}`,
            right: `for (int i = 0; i <= 3; i++) {
    std::cout << i << "{{n}}";
}`,
          },
        ],
      },
      quiz: [
        {
          id: "6.4-q1",
          question: "`for` da tana bir marta ishlab bo'lgach, navbatda nima?",
          options: [
            "Boshlash qaytadan, keyin shart",
            "Qadam, keyin shart",
            "Shart, qadam ishlamaydi",
            "Sikl darrov tugaydi",
          ],
          answer: 1,
          explanation:
            "Tartib: boshlash bir marta, keyin shart, tana, qadam, yana shart. Tana tugagach qadam keladi. Boshlash qaytarilmaydi.",
        },
        {
          id: "6.4-q2",
          question: "`for (int i = 0; i < 3; i++)` qaysi sonlarni yozadi?",
          options: ["0 1 2 3", "1 2 3", "0 1 2", "0 1 2 3 4"],
          answer: 2,
          explanation:
            "i 0, 1, 2 da  i < 3 rost. i 3 bo'lganda shart yolg'on, 3 yozilmaydi. Uch ta son.",
        },
        {
          id: "6.4-q3",
          question: "`for (boshlandi = 1; false; boshlandi++)` dan keyin `boshlandi` necha? Tana ichida yozuv bor.",
          options: [
            "0, boshlash ishlamagan",
            "1, boshlash ishlagan, qadam yo'q",
            "2, qadam ham ishlagan",
            "tana ishlagan, qiymat noma'lum",
          ],
          answer: 1,
          explanation:
            "Boshlash shartdan oldin bir marta ishlaydi va 1 yozadi. false tana va qadamni ochmaydi. Qutida 1 qoladi.",
        },
      ],
    },
    {
      id: "6.5",
      navTitle: "break va continue",
      title: "break va continue operatorlari",
      goal: [
        "Bu darsdan keyin siz `break` ni siklni shu zahoti tark etish, `continue` ni esa shu takrorning qolgan tanasini tashlab keyingi aylana deb ajratasiz. `for` da `continue` qadamni ham ishlatishini, `while` da qadam tanada qolib ketsa cheksiz aylana bo'lishini va `switch` ichidagi `break` siklni yopmasligini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Stadionda o'n aylana reja qilingan. To'rtinchisida murabbiy «bas, maydondan chiq» deydi. Qolgan oltita aylana bo'lmaydi. Siz darvoza tashqarisidagi keyingi ishga o'tasiz. Bu `break`. Hisoblagichning navbatdagi qadami ham bu yerda bosilmaydi. Siz allaqachon maydonda emassiz.",
          "`continue` boshqa. Bir aylana ichida «shu mashqni tashla, lekin stadionda qol, keyingi aylanaga o't» deydi. Siz maydonni tark etmaysiz. `for` da keyingi aylanaga o'tishdan oldin varaqadagi qadam baribir bosiladi. Aks holda oyoq bir bekatda yopishib qolardi.",
          "`while` da qadam varaqada emas, tana oxiridagi qatorda bo'lishi mumkin. `continue` o'sha qatorni ham tashlab yuborsa, hisob o'smaydi va siz bir aylanada qotib qolasiz. `switch` ichidagi `break` esa butunlay boshqa eshik. U faqat tanlov xonasidan chiqaradi, stadiondan emas. Buni 5.6-darsdagi `break` bilan aralashtirmang.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`break` eng yaqin `switch` yoki siklni yopadi. `continue` eng yaqin siklning keyingi aylanasiga sakraydi. Ikkalasi ham o'z qatorida turadi va nuqta-vergul oladi. Siklsiz `continue` yig'ilmaydi.",
        ],
        items: [
          {
            title: "break sikldan chiqadi",
            paragraphs: [
              "`break` tana qolganini tashlaydi. `for` bo'lsa, qadam ham ishlamaydi. Boshqaruv sikldan keyingi qatorga tushadi. Tashqi sikl bo'lsa, u yopilmaydi. Faqat eng ichki. Ichma-ich holat 6.6-darsda.",
              "`while (true)` ichida `break` bo'lsa, bu cheksiz emas. Shart doim rost, chiqish `break` da. `break` ga yo'l bo'lmasa, 6.1-dagi xavf qaytadi.",
            ],
            code: `for (int i = 1; i <= 10; i++) {
    std::cout << i << "{{n}}";
    if (i == 4) {
        break;
    }
}`,
            codeLabel: "4 dan keyin maydondan chiqish",
          },
          {
            title: "continue keyingi aylanaga",
            paragraphs: [
              "`for` da `continue` qolgan tanani tashlaydi, lekin qadamni ishlatadi, keyin shartni so'raydi. Juft sonni tashlash shu bilan xavfsiz. `i++` sarlavhada bo'lsa, 2 da qotib qolmaydi.",
              "`while` va `do-while` da `continue` to'g'ridan shartga boradi. Qadam tana oxirida bo'lsa va `continue` undan oldin tursa, qadam tashlanadi. Shart o'sha sonda qolsa, cheksiz aylana. `continue` dan oldin yangilang, yoki `for` ishlating.",
              "`switch` ichidagi `continue`, agar `switch` sikl ichida bo'lsa, siklga tegishli. U `switch` ni «davom ettirmaydi». Siklning keyingi aylanasiga sakraydi.",
            ],
            code: `for (int i = 1; i <= 6; i++) {
    if (i % 2 == 0) {
        continue;
    }
    std::cout << i << "{{n}}";
}`,
            codeLabel: "juftni tashlash, qadam saqlanadi",
          },
          {
            title: "switch dagi break sikl emas",
            paragraphs: [
              "Sikl ichidagi `switch` da `break` faqat `switch` ni yopadi. Keyin sikl tanasining qolgani davom etadi, qadam ham ishlaydi. Barcha takrorlar o'z navbatida keladi.",
              "Siklning o'zini yopmoqchi bo'lsangiz, `break` `switch` dan tashqarida bo'lsin. Yoki `switch` ichida `continue` yozing, u siklga tegishli. Ikkalasining ma'nosi boshqa.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "4 yozilgach for yopiladi",
          intro: [
            "Reja 1 dan 10 gacha. `break` 4 chiqib bo'lgach keladi. 5 umuman yozilmaydi. Qadam ham 4 dan keyin ishlamaydi. `chiqdi` sikldan keyin.",
          ],
          codeLabel: "break_for.cpp",
          code: `#include <iostream>

int main() {
    for (int i = 1; i <= 10; i++) {
        std::cout << i << "{{n}}";
        if (i == 4) {
            break;
        }
    }
    std::cout << "chiqdi{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
2
3
4
chiqdi`,
          analysis: [
            {
              lines: "4-5",
              text: "Oddiy `for`. 1, 2, 3 yoziladi. Har biridan keyin `i == 4` yolg'on, `break` ishlamaydi, qadam `i` ni oshiradi.",
            },
            {
              lines: "5-7",
              text: "`i` 4. Avval 4 yoziladi, keyin shart rost, `break`. Tana qolgani yo'q. `i++` bu takrorda ishlamaydi. `i` 4 bo'lib maydonni tark etadi, lekin `i` ning o'zi `for` bilan yo'qoladi.",
            },
            {
              lines: "9",
              text: "`chiqdi` sikldan keyingi qator. 5 dan 10 gacha yozilmaydi. `break` shartni yolg'on qilgani yo'q, u sakrash bilan chiqqan.",
            },
          ],
        },
        {
          title: "Juft son tashlanadi, qadam yashaydi",
          intro: [
            "1 dan 6 gacha. Juft bo'lsa `continue`. Yozuv tashlanadi, lekin `i++` sarlavhada qolgani uchun hisob oldinga yuradi.",
          ],
          codeLabel: "continue_for.cpp",
          code: `#include <iostream>

int main() {
    for (int i = 1; i <= 6; i++) {
        if (i % 2 == 0) {
            continue;
        }
        std::cout << i << "{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
3
5`,
          analysis: [
            {
              lines: "4-7",
              text: "`i` 1. `1 % 2` bu 1, juft emas. `continue` ishlamaydi. 1 yoziladi. Qadam `i` ni 2 qiladi.",
            },
            {
              lines: "5-6",
              text: "`i` 2. Juft. `continue` 8-qatorni tashlaydi. 2 yozilmaydi. Sakrash qadamga boradi, shartga emas. `i` 3 bo'ladi. Xuddi shu 4 va 6 da.",
            },
            {
              lines: "8",
              text: "3 va 5 toq, yoziladi. 6 dan keyin qadam `i` ni 7 qiladi. `7 <= 6` yolg'on. Konsol 1, 3, 5.",
            },
            {
              lines: "xavf",
              text: "`continue` qadamni tashlaganida 2 da qotib qolardingiz. `for` qadamni `continue` dan keyin ham ishlatadi. `while` da bu kafolat tana oxiridagi `i++` ga tegishli emas.",
            },
          ],
        },
        {
          title: "while da continue dan oldin qadam",
          intro: [
            "3 ni yozmaymiz, lekin unda ham `i` o'sishi kerak. `continue` shartga qaytadi. Yangilanish undan oldin bo'lmasa, 3 da qolamiz.",
          ],
          codeLabel: "continue_while.cpp",
          code: `#include <iostream>

int main() {
    int i = 1;
    while (i <= 5) {
        if (i == 3) {
            i++;
            continue;
        }
        std::cout << i << "{{n}}";
        i++;
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
2
4
5`,
          analysis: [
            {
              lines: "4-5",
              text: "`i` 1. `1 <= 5` rost. `i == 3` yolg'on. 1 yoziladi, pastki `i++` uni 2 qiladi. Xuddi shu 2 uchun.",
            },
            {
              lines: "6-8",
              text: "`i` 3. Shart rost. Avval `i++`, endi 4. Keyin `continue`. Boshqaruv 10-qatorga emas, `while` shartiga boradi. 3 yozilmaydi.",
            },
            {
              lines: "5, keyin",
              text: "`4 <= 5` rost. 4 yoziladi, `i` 5. 5 yoziladi, `i` 6. `6 <= 5` yolg'on. Konsol 1, 2, 4, 5.",
            },
            {
              lines: "agar i++ bo'lmasa",
              text: "`continue` dan oldin `i++` yo'q bo'lsa, `i` 3 da qoladi. Shart yana rost, yana `continue`. Cheksiz, 3 yozilmaydi ham. `while` da yangilanishni sakrashdan oldin qo'ying.",
            },
          ],
        },
        {
          title: "switch ichidagi break for ni yopmaydi",
          intro: [
            "Uch takrorning hammasi ishlaydi. `case 2` dagi `break` faqat tanlovdan chiqadi. Sikl o'z qadamida davom etadi.",
          ],
          codeLabel: "break_switch.cpp",
          code: `#include <iostream>

int main() {
    for (int i = 1; i <= 3; i++) {
        switch (i) {
        case 2:
            std::cout << "ikki{{n}}";
            break;
        default:
            std::cout << i << "{{n}}";
            break;
        }
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
ikki
3`,
          analysis: [
            {
              lines: "4-11",
              text: "`i` 1. `default` 1 ni yozadi. `break` `switch` ni yopadi, `for` ni emas. Qadam `i` ni 2 qiladi.",
            },
            {
              lines: "6-8",
              text: "`i` 2. `ikki` yoziladi. Bu `break` ham faqat `switch` ga tegishli. Keyin `for` qadami `i` ni 3 qiladi. Sikl tugamagan.",
            },
            {
              lines: "9-11",
              text: "`i` 3. Yana `default`, 3 yoziladi, `switch` yopiladi. Qadam `i` ni 4 qiladi. `4 <= 3` yolg'on. Uchala takror ham bo'lgan.",
            },
            {
              lines: "farq",
              text: "Agar `case 2` da `break` o'rniga `continue` tursa, u `for` ga tegishli bo'lardi. 2 dagi yozuvdan keyingi tana tashlanardi, lekin qadam baribir ishlardi. Hozir `continue` yo'q, shuning uchun uch qator ham chiqadi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`break` oddiy sakrash. Ko'rsatkich sikl oxiridagi keyingi buyruqqa tushadi. `for` ning qadam buyrug'i bu yo'lda emas. `i` 4 da qoladi va `for` qutisi yopiladi. 5 dan 10 gacha `cout` lar bu o'tishda ochilmaydi.",
          "`continue` boshqa manzil. `for` da u qadamga sakraydi. Juft `i` da `cout` tashlanadi, `i++` esa ishlaydi. Shundan keyin shart. 2 da qotish yo'q, chunki qadam `continue` ning nishonida turibdi.",
          "`while` da `continue` nishoni shart buyrug'i. Tana oxiridagi `i++` nishondan keyinda qoladi, shuning uchun tashlanadi. 3 ni 4 qilish `continue` dan oldingi buyruq bo'lishi kerak. Aks holda quti 3 da aylanadi, buferga yangi qator tushmaydi.",
          "`switch` ichidagi `break` ning nishoni `switch` oxiri. `for` qadami undan keyin, o'z tartibida keladi. Bitta so'z, ikki xil eng yaqin konstruktsiya. Eng yaqin yopiladi, tashqarisidagi emas.",
        ],
        diagram: `for break, i 4 yozilgach:
sakrash -> "chiqdi"
qadam ishlamaydi
5..10 yo'q

for continue, i juft:
cout tashlanadi
qadam i++ ishlaydi
keyin shart

while continue, i == 3:
avval i [4]
keyin shartga sakrash
10-qator tashlanadi

switch break:
faqat switch oxiri
for qadami keyin keladi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "`break` erta chiqaradi, `continue` noto'g'ri joyda cheksiz aylana qiladi. `switch` dagi `break` esa siklni yopaman deb aldanadi.",
        ],
        items: [
          {
            title: "while da continue qadamni tashlab ketishi",
            why: [
              "`i` 2 bo'lganida `continue` shartga qaytadi. Pastki `i++` ishlamaydi. `i` 2 da qoladi, shart rost qoladi. Cheksiz, juft son yozilmaydi ham. Yangilang, keyin `continue` qiling. Yoki `for` ishlating.",
            ],
            wrong: `int i = 1;
while (i <= 5) {
    if (i % 2 == 0) {
        continue;
    }
    std::cout << i << "{{n}}";
    i++;
}`,
            right: `for (int i = 1; i <= 5; i++) {
    if (i % 2 == 0) {
        continue;
    }
    std::cout << i << "{{n}}";
}`,
          },
          {
            title: "switch break ini sikl break i deb o'qish",
            why: [
              "`case` dagi `break` faqat tanlovni yopadi. `for` qolgan sonlarni ham yuradi. Siklni to'xtatish `switch` dan tashqaridagi `break` da.",
            ],
            wrong: `for (int i = 1; i <= 3; i++) {
    switch (i) {
    case 2:
        std::cout << "ikki{{n}}";
        break;
    default:
        break;
    }
}`,
            right: `for (int i = 1; i <= 3; i++) {
    if (i == 2) {
        std::cout << "ikki{{n}}";
        break;
    }
}`,
          },
          {
            title: "break dan keyin shu tanada ish kutish",
            why: [
              "`break` dan keyingi qator shu takrorda ishlamaydi. 4 ni yozib, keyin chiqmoqchi bo'lsangiz, `cout` `break` dan oldin turadi. Keyin qo'yilgan yozuv o'lik.",
            ],
            wrong: `if (i == 4) {
    break;
    std::cout << i << "{{n}}";
}`,
            right: `std::cout << i << "{{n}}";
if (i == 4) {
    break;
}`,
          },
        ],
      },
      quiz: [
        {
          id: "6.5-q1",
          question:
            "`for` 1 dan 10 gacha yozadi, son chiqib bo'lgach `i == 4` bo'lsa `break`. Oxirgi chiqqan son va sikldan keyingi `chiqdi` bormi?",
          options: [
            "10, chiqdi yo'q",
            "4, keyin chiqdi",
            "3, keyin chiqdi",
            "4, chiqdi yo'q, chunki break dasturni yopadi",
          ],
          answer: 1,
          explanation:
            "1, 2, 3, 4 yoziladi. break shu zahoti for dan chiqadi, 5 ishlamaydi. chiqdi sikldan keyingi qator, u ishlaydi.",
        },
        {
          id: "6.5-q2",
          question: "`for (int i = 1; i <= 6; i++)` juft bo'lsa `continue`, aks holda `i` ni yozadi. Konsol?",
          options: ["1 2 3 4 5 6", "2 4 6", "1 3 5", "cheksiz, 2 da qotadi"],
          answer: 2,
          explanation:
            "continue qolgan tanani tashlaydi, lekin for qadami ishlaydi. Juftlar yozilmaydi, hisob o'sadi. Chiqadi 1, 3, 5.",
        },
        {
          id: "6.5-q3",
          question: "Sikl ichidagi `switch` ning `case` ida `break` nima qiladi?",
          options: [
            "Butun siklni yopadi",
            "Dasturni tugatadi",
            "Faqat switch ni yopadi, sikl davom etadi",
            "continue bilan bir xil, qadamni tashlaydi",
          ],
          answer: 2,
          explanation:
            "break eng yaqin switch yoki siklni yopadi. case ichidagi break uchun eng yaqin switch. for o'z qadamida qoladi.",
        },
      ],
    },
    {
      id: "6.6",
      navTitle: "Ichma-ich sikllar",
      title: "Ichma-ich sikllar",
      goal: [
        "Bu darsdan keyin siz ichki siklni tashqi siklning bir takrori ichida to'liq yuguradigan ish deb o'qiysiz. Qator va ustun, ko'paytirish jadvali va yulduzli shaklni shu tartibda chizasiz. Ichki `break` faqat ichki siklni yopishini, ichki hisoblagich har bir tashqi takrorda qaytadan boshlanishini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Sinf xonasini ko'ring. O'qituvchi avval birinchi parta qatoriga kiradi va shu qatordagi har bir partani ko'rib chiqadi. Qator tugamaguncha keyingi qatorga o'tmaydi. Keyin ikkinchi qator, yana har bir parta. Tashqi sikl qator, ichki sikl parta.",
          "Devor ham shunday. Har bir g'isht qatori uchun chapdan o'ngga barcha g'ishtlar qo'yiladi. Ikkinchi qator birinchisining ustiga, yana chapdan. Yulduzli uchburchakda pastki qator yuqoridan uzunroq. Ichki siklning chegarasi tashqi hisoblagichga qarab o'sadi.",
          "Agar bir partada «shu qatordan chiq» desangiz, siz keyingi qatorga o'tasiz, sinfxonani tark etmaysiz. Ichki `break` shu. Tashqi aylana o'zicha davom etadi. Butun xonani yopish tashqi sikldagi `break` bo'lardi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Ichki `for` tashqi `for` ning tanasida turadi. Tashqi tana bir marta boshlanganda ichki sikl o'z boshlashidan o'z oxirigacha yuguradi. Keyin tashqi qadam, keyin yana to'liq ichki sikl.",
        ],
        items: [
          {
            title: "Ichki sikl har safar qaytadan tug'iladi",
            paragraphs: [
              "Ichki `int j = 1` har bir tashqi takrorda qayta ishlaydi. `j` oldingi qatorning oxirida qolgan joyidan davom etmaydi. U yana 1 dan boshlaydi.",
              "Tashqi `i` ichki aylanalar davomida o'zgarmaydi, toki ichki tana uni ataylab o'zgartirmasa. Odatda o'zgartirmang. Qator raqami barqaror, ustun yuguradi.",
              "Jami ichki tana soni ko'pincha qatorlar soni marta ustunlar soni. 2 qator, 3 ustun, ichki tana 6 marta. Bu 2+3 emas.",
            ],
            code: `for (int qator = 1; qator <= 2; qator++) {
    for (int ustun = 1; ustun <= 3; ustun++) {
        std::cout << qator << "," << ustun << " ";
    }
    std::cout << "{{n}}";
}`,
            codeLabel: "qator tugagach keyingi qator",
          },
          {
            title: "Jadval va shakl",
            paragraphs: [
              "Ko'paytirish jadvalida tashqi son birinchi ko'paytuvchi, ichki son ikkinchisi. Ichki sikl birinchi qatordagi barcha ko'paytmalarni yozib bo'ladi, keyin tashqi son o'sadi.",
              "To'rtburchakda ichki chegarasi doimiy. 3 qator, har birida 4 yulduz. Uchburchakda ichki chegarasi tashqi hisoblagich. 1-qator 1 yulduz, 2-qator 2, 4-qator 4. Ichki shart `yulduz <= qator`.",
              "Qator oxiridagi `{{n}}` tashqi tanada, ichki sikldan keyin turadi. Uni ichkariga qo'ysangiz, har bir katak yangi qatorga tushadi. Jadval buziladi.",
            ],
            code: `for (int qator = 1; qator <= 4; qator++) {
    for (int yulduz = 1; yulduz <= qator; yulduz++) {
        std::cout << "*";
    }
    std::cout << "{{n}}";
}`,
            codeLabel: "ichki chegara tashqiga qarab o'sadi",
          },
          {
            title: "Ichki break tashqini yopmaydi",
            paragraphs: [
              "`break` eng yaqin siklni yopadi. Ichki `for` ichidagi `break` ustunlarni to'xtatadi, qatorlarni emas. Tashqi qadam ishlaydi, keyingi qator o'z ichki siklini yana 1 dan boshlaydi.",
              "Butun jadvalni to'xtatish uchun `break` tashqi tanada bo'lishi kerak. Ichki sikldan tashqariga bayroq olib chiqish ham mumkin, hozir ikki qatlamda qayerda turganingizni ayting.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Ikki qator, uch ustun",
          intro: [
            "Tashqi 1 va 2. Har birida ichki 1, 2, 3 to'liq yuguradi. Jami oltita juftlik. Yangi qator ichki sikldan keyin.",
          ],
          codeLabel: "qator_ustun.cpp",
          code: `#include <iostream>

int main() {
    for (int qator = 1; qator <= 2; qator++) {
        for (int ustun = 1; ustun <= 3; ustun++) {
            std::cout << qator << "," << ustun;
            if (ustun < 3) {
                std::cout << " ";
            }
        }
        std::cout << "{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1,1 1,2 1,3
2,1 2,2 2,3`,
          analysis: [
            {
              lines: "4-5",
              text: "`qator` 1. Ichki `for` boshlanadi, `ustun` 1. Bu boshlash tashqi har bir takrorda qaytadan ishlaydi.",
            },
            {
              lines: "6-8",
              text: "`1,1` yoziladi, probel, `1,2`, probel, `1,3`. Uchinchidan keyin probel yo'q. Ichki shart `ustun` 4 bo'lganda yiqiladi. Shu payt `qator` hali 1.",
            },
            {
              lines: "11",
              text: "Ichki sikl tugagan. Tashqi tana qatorni yopadi. `{{n}}` bitta qator tugatadi, har bir ustun emas.",
            },
            {
              lines: "4, ikkinchi",
              text: "Tashqi qadam `qator` ni 2 qiladi. Ichki `ustun` yana 1 dan ochiladi, oldingi 4 dan emas. `2,1 2,2 2,3`. Keyin `qator` 3, shart yiqiladi. Ichki tana 2 marta 3, jami 6.",
            },
          ],
        },
        {
          title: "1 dan 3 gacha ko'paytirish jadvali",
          intro: [
            "Har bir tashqi son uchun ichki 1, 2, 3 ga ko'paytma. Bir qatorda uchta natija. Bu ro'yxat emas, to'r.",
          ],
          codeLabel: "jadval.cpp",
          code: `#include <iostream>

int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            std::cout << i * j;
            if (j < 3) {
                std::cout << " ";
            }
        }
        std::cout << "{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1 2 3
2 4 6
3 6 9`,
          analysis: [
            {
              lines: "4-6",
              text: "`i` 1 qotib turadi, `j` 1, 2, 3 bo'ylab yuguradi. Ko'paytmalar 1, 2, 3. `i` ichki qadamda o'zgarmaydi.",
            },
            {
              lines: "11, keyin tashqi",
              text: "Qator yopiladi. `i` 2 bo'ladi. `j` yana 1 dan. 2, 4, 6. Keyin `i` 3: 3, 6, 9. `i` 4 bo'lganda tashqi shart yiqiladi.",
            },
            {
              lines: "hisob",
              text: "Ichki tana 9 marta. 3 qo'shish 3 emas, 3 marta 3. Har bir katak alohida takror.",
            },
            {
              lines: "qator oxiri",
              text: "`{{n}}` tashqi tanada. Ichkariga tushsa, har bir ko'paytma alohida qatorda chiqardi. Jadval yoyilmay qolardi.",
            },
          ],
        },
        {
          title: "Qator raqami yulduz sonini belgilaydi",
          intro: [
            "To'rt qator. Ichki chegara doimiy emas. `yulduz <= qator`. Birinchi qator bir yulduz, to'rtinchi to'rtta.",
          ],
          codeLabel: "uchburchak.cpp",
          code: `#include <iostream>

int main() {
    for (int qator = 1; qator <= 4; qator++) {
        for (int yulduz = 1; yulduz <= qator; yulduz++) {
            std::cout << "*";
        }
        std::cout << "{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `*
**
***
****`,
          analysis: [
            {
              lines: "4-6",
              text: "`qator` 1. Ichki shart `yulduz <= 1`. Yulduz 1 marta yoziladi. `yulduz` 2 bo'lganda ichki sikl to'xtaydi.",
            },
            {
              lines: "8, keyingi qatorlar",
              text: "Qator yangilanadi. `qator` 2. Ichki sikl qaytadan 1 dan, chegara endi 2. Ikki yulduz. Keyin 3 va 4. Har safar ichki boshlash qayta ishlaydi.",
            },
            {
              lines: "jami",
              text: "Yulduz yozishlari 1+2+3+4 = 10 marta. Tashqi tana 4 marta. Ichki chegarani o'zgartirmasangiz, to'rtburchak bo'lardi. Har qatorda bir xil son.",
            },
            {
              lines: "qator tugashi",
              text: "`{{n}}` ichki sikldan keyin. Yulduzlar bir qatorda yopishib turadi, keyin pastga tushadi. `{{n}}` ni ichki tanaga qo'ysangiz, har bir yulduz alohida qatorda chiqadi.",
            },
          ],
        },
        {
          title: "Ichki break keyingi qatorni saqlab qoladi",
          intro: [
            "Uch qator, ichkarida 1, 2, 3 reja qilingan. `j` 2 bo'lishi bilan ichki sikl yopiladi. Tashqi 2 va 3 baribir keladi.",
          ],
          codeLabel: "ichki_break.cpp",
          code: `#include <iostream>

int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            if (j == 2) {
                break;
            }
            std::cout << i << j << " ";
        }
        std::cout << "{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `11 
21 
31 
`,
          analysis: [
            {
              lines: "4-9",
              text: "`i` 1, `j` 1. `j == 2` yolg'on. `11 ` yoziladi. Ichki qadam `j` ni 2 qiladi.",
            },
            {
              lines: "6-7",
              text: "`j` 2. `break` eng yaqin siklni, ya'ni ichki `for` ni yopadi. `j` 3 bo'lmaydi. `12` yozilmaydi. Tashqi `i` bu `break` dan o'zgarmaydi.",
            },
            {
              lines: "11-4",
              text: "Tashqi tana qatorni yopadi va `i` ni 2 qiladi. Ichki sikl yana `j = 1` dan boshlanadi. Yana `21 `, yana `j == 2` da chiqish. Xuddi shu `i` 3 da. `31 `.",
            },
            {
              lines: "konsol",
              text: "Har bir qator oxirida probel bor, chunki yozuv `\" \"` bilan tugaydi va ikkinchi ustun chiqmaydi. Uch qator chiqadi. Tashqi sikl yopilmagan. Butun jadvalni to'xtatadigan `break` tashqi tanada bo'lishi kerak edi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Tashqi boshlash `qator` qutisini ochadi. Ichki boshlash esa har safar yangi `ustun` qutisini ochadi. Ichki sikl tugaganda `ustun` yo'qoladi. Keyingi tashqi takror uni boshqa 1 bilan qayta ochadi. Eski 4 dan davom yo'q.",
          "`qator` ichki aylanalar davomida o'sha uyada turadi. Ichki tana uni o'qiydi, odatda yozmaydi. Tashqi qadam faqat ichki sikl to'liq tugagach, qator oxiri yozilgach keladi. Shu sabab bir qatordagi uchta juftlik bitta qatorda, keyingi uchta pastki qatorda.",
          "Uchburchakda ichki shart tashqi qutini o'qiydi. `qator` 1 bo'lsa, ichki shart bir marta rost. `qator` 4 bo'lsa, to'rt marta. Chegara alohida o'zgarmas emas, u tashqi xotiraga qarab hisoblanadi.",
          "Ichki `break` ichki sikl oxiriga sakraydi. Tashqi qadamning manzili undan keyin turadi va ishlaydi. `i` 1 dan 2 ga o'tadi, yangi `j` 1 dan ochiladi. Tashqi quti `break` bilan yopilmaydi.",
        ],
        diagram: `qator [1]
  ustun 1, 2, 3  -> "1,1 1,2 1,3"
  ustun qutisi yopiladi
qator [2]
  ustun yana 1 dan
  "2,1 2,2 2,3"

uchburchak:
qator 1 -> *     (ichki 1 marta)
qator 2 -> **    (ichki 2 marta)
qator 3 -> ***
qator 4 -> ****
jami yulduz 10

ichki break, j == 2:
i [1] faqat j [1], keyin ichki yopiladi
i [2] yana j [1]
i [3] yana j [1]
tashqi yopilmagan`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Ichma-ich xato jadvalni ustun-ustun emas, katakma-katak pastga tushiradi, yoki ichki `break` butun rasmni to'xtatadi deb o'ylaydi.",
        ],
        items: [
          {
            title: "Qator tugashini ichki siklga qo'yish",
            why: [
              "Har bir yulduzdan keyin `{{n}}` bo'lsa, ular yonma-yon emas, ustma-ust chiqadi. Uchburchak buziladi. Qator oxiri tashqi tanada, ichki sikl yopilgandan keyin bo'lsin.",
            ],
            wrong: `for (int qator = 1; qator <= 4; qator++) {
    for (int yulduz = 1; yulduz <= qator; yulduz++) {
        std::cout << "*{{n}}";
    }
}`,
            right: `for (int qator = 1; qator <= 4; qator++) {
    for (int yulduz = 1; yulduz <= qator; yulduz++) {
        std::cout << "*";
    }
    std::cout << "{{n}}";
}`,
          },
          {
            title: "Ichki hisoblagich tashqarida qoladi deb o'ylash",
            why: [
              "Ikkinchi qator `ustun` 4 dan emas, yana 1 dan boshlanadi. `int ustun = 1` ichki sarlavhada, har tashqi takrorda qayta ishlaydi. Davom ettirmoqchi bo'lsangiz, bu boshqa masala. Jadval uchun qayta 1 kerak.",
            ],
            wrong: `int ustun = 1;
for (int qator = 1; qator <= 2; qator++) {
    while (ustun <= 3) {
        std::cout << ustun << "{{n}}";
        ustun++;
    }
}`,
            right: `for (int qator = 1; qator <= 2; qator++) {
    for (int ustun = 1; ustun <= 3; ustun++) {
        std::cout << qator << "," << ustun << "{{n}}";
    }
}`,
          },
          {
            title: "Ichki break butun rasmni to'xtatadi deb kutish",
            why: [
              "Ichki `break` faqat shu qatorning qolgan ustunlarini tashlaydi. Keyingi qator yana boshlanadi. Barcha qatorlarni yopish tashqi sikldagi `break`.",
            ],
            wrong: `for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (j == 2) {
            break;
        }
    }
}`,
            right: `for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (j == 2) {
            break;
        }
    }
    if (i == 2) {
        break;
    }
}`,
          },
        ],
      },
      quiz: [
        {
          id: "6.6-q1",
          question: "Tashqi sikl 2 marta, ichki sikl har safar 3 marta ishlasa, ichki tana jami necha marta?",
          options: ["5", "6", "2", "3"],
          answer: 1,
          explanation:
            "Har bir tashqi takror ichki siklni to'liq yuguradi. 2 marta 3 = 6. 2+3 emas.",
        },
        {
          id: "6.6-q2",
          question: "Uchburchakda ichki shart `yulduz <= qator`. `qator` 3 bo'lganda shu qatorda nechta yulduz?",
          options: ["1", "2", "3", "4"],
          answer: 2,
          explanation:
            "Ichki chegara tashqi hisoblagich. qator 3 bo'lsa, yulduz 1, 2, 3 da yoziladi. Uchta yulduz, keyin qator tugaydi.",
        },
        {
          id: "6.6-q3",
          question: "Ichki `for` da `j == 2` bo'lsa `break`. Tashqi sikl nima qiladi?",
          options: [
            "Butun dastur to'xtaydi",
            "Tashqi sikl ham shu zahoti yopiladi",
            "Keyingi tashqi takror keladi, ichki sikl yana boshidan",
            "j 2 da qoladi va tashqi qadam ishlamaydi",
          ],
          answer: 2,
          explanation:
            "break eng yaqin siklni yopadi. Ichki for tugaydi, tashqi qadam ishlaydi. Keyingi qatorda j yana 1 dan boshlanadi.",
        },
      ],
    },
  ],
};

export const chapter6 = decode(rawChapter);
