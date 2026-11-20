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
  id: "9",
  number: 9,
  title: "Ko'rsatkichlar va Xotirani Boshqarish",
  summary:
    "Manzil, ko'rsatkich, qiymatni ochish, bo'sh va eskirgan manzil, massiv arifmetikasi, stack, heap, new va delete.",
  lessons: [
    {
      id: "9.1",
      navTitle: "Manzil va &",
      title: "Xotira manzili, & operatori va 16-lik sanoq",
      goal: [
        "Bu darsdan keyin siz har bir obyektning xotirada manzili borligini tushuntirasiz. Unary `&` shu manzilni beradi. `int&` esa 7.5-darsdagi taxallus, `&` esa 4.7-dagi bitli VA emas. 16-lik yozuv `0x` bilan boshlanganini, `255` ning `0xff` ekanini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Ko'cha va uy raqami odamning o'zi emas. «18-uy» desangiz, bu joy. Ichidagi odam alohida. `yosh` degan quti ham xotirada bir joy egallaydi. Shu joyning raqami manzil. Qutining ichidagi 18 esa qiymat.",
          "Uy raqamini so'rash bilan odamni so'rash boshqa. `&yosh` «quti qayerda turibdi» degan savol. `yosh` ning o'zi «ichida nechchi yotibdi». Raqamni bilish odamni ko'chirmaydi.",
          "Katta uy raqamlarini odamlar o'nlikda ham yozadi, lekin xotira raqami odatda 16-likda ko'rinadi: `0x` dan keyin `0` dan `9` gacha va `a` dan `f` gacha. Bu boshqa sanoq, boshqa uy emas. `255` va `0xff` bitta son.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Manzil baytning joyi. Unary `&` nomlangan obyektning manzilini beradi. 16-likda o'n olti raqam bor. `std::hex` va `std::showbase` chiqarishni shu yozuvga o'tkazadi va yopishqoq.",
        ],
        items: [
          {
            title: "Uch xil &",
            paragraphs: [
              "E'londa `int& taxallus = yosh;` bu 7.5-dars. `&` shu yerda taxallus belgisi. `taxallus` yangi quti emas, `yosh` ning ikkinchi nomi. Manzil hisoblanmaydi.",
              "Ifodada bitta operand oldida `&yosh` manzil so'raydi. Bu address-of. Natija «shu quti qayerda». Qiymat 18 o'zgarmaydi.",
              "Ikki son o'rtasida `5 & 3` 4.7-darsdagi bitli VA. Natija 1. Operand soni belgining ma'nosini ajratadi: e'lon, bitta obyekt, yoki ikkita son.",
            ],
            code: `int yosh = 18;
int& taxallus = yosh;
int* p = &yosh;
int bit = 5 & 3;`,
            codeLabel: "taxallus, manzil, bitli VA",
            table: {
              caption: "Bir xil belgi, uch joyda uch ma'no.",
              headers: ["Yozuv", "Qayerda", "Ma'no"],
              rows: [
                ["int& taxallus = yosh;", "e'lon", "taxallus, yangi quti yo'q"],
                ["&yosh", "bitta obyekt oldida", "shu qutining manzili"],
                ["5 & 3", "ikkita son orasida", "bitli VA, natija 1"],
              ],
            },
          },
          {
            title: "16-lik va 0x",
            paragraphs: [
              "O'nlikda raqamlar 0 dan 9 gacha, har bir xona 10 marta katta. 16-likda raqamlar 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, a, b, c, d, e, f. `a` bu 10, `f` bu 15. Keyingi xona 16 marta katta.",
              "`0x` prefiks «bu 16-lik» deydi. `0x10` bu 1*16+0 = 16, o'nlik 10 emas. `0xff` bu 15*16+15 = 255. `0xa` bu 10.",
              "`std::hex` keyingi sonlarni 16-lik qiladi va yopishqoq, `std::dec` qaytaradi. `std::showbase` ham yopishqoq, `0x` ni qo'shadi. `showbase` siz `255` ekranda `ff` bo'ladi, `0xff` emas. Harflar sukut bo'yicha kichik.",
            ],
            code: `std::cout << std::showbase << std::hex << 255 << "{{n}}";
std::cout << std::dec << 255 << "{{n}}";`,
            codeLabel: "0xff, keyin yana 255",
          },
          {
            title: "Manzil raqami o'zgarmas matn emas",
            paragraphs: [
              "`&yosh` haqiqiy manzil. Uni `cout` ga bersangiz, odatda `0x` va 16-lik raqamlar chiqadi. Aniq raqam dastur har safar ochilganda boshqacha bo'lishi mumkin. Shu sabab bu darslarda manzilning o'zini ekranga qotirib qo'ymaymiz.",
              "Barqaror savol: ikki ifoda bitta joyni ko'rsatadimi. `p == &yosh` rost bo'lsa ekranda 1. Bu manzillar teng, raqamning o'zi yozilmasa ham.",
              "`&` faqat joyi bor obyektga qo'yiladi. `yosh` kabi nom bo'ladi. `(&18)` yig'ilmaydi, 18 vaqtinchalik son, uning barqaror qutisi yo'q.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "255 bu 0xff, 16 bu 0x10, 10 bu 0xa",
          intro: [
            "`showbase` va `hex` yopishqoq. Uchala son 16-likda chiqadi. Oxirida `dec` o'nlikka qaytaradi.",
          ],
          codeLabel: "onolti.cpp",
          code: `#include <iostream>

int main() {
    int son = 255;
    std::cout << std::showbase << std::hex << son << "{{n}}";
    std::cout << 16 << "{{n}}";
    std::cout << 10 << "{{n}}";
    std::cout << std::dec << 255 << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `0xff
0x10
0xa
255`,
          analysis: [
            {
              lines: "4-5",
              text: "`son` o'nlik 255. `showbase` prefiksni yoqadi, `hex` 16-likka o'tkazadi. 15*16+15 = 255, yozuvi `0xff`. Harflar kichik.",
            },
            {
              lines: "6",
              text: "`hex` yopishqoq, qayta yozilmasa ham 16 hali 16-lik. `0x10` bu 1*16+0 = 16. O'nlik o'n olti, `0x16` emas.",
            },
            {
              lines: "7",
              text: "10 hali ham 16-likda. `0xa` bu o'n. `a` raqami 10. Prefiks `showbase` dan, u ham yopishqoq.",
            },
            {
              lines: "8",
              text: "`std::dec` o'nlikka qaytaradi. 255 yana `255`. `dec` qo'yilmasa, keyingi sonlar ham 16-likda ketardi.",
            },
          ],
        },
        {
          title: "Ko'rsatkich va quti bitta manzilni ko'rsatadi",
          intro: [
            "`p` ning ichida `&yosh` yotadi. Tenglik 1. `yosh` 4 bayt, ko'rsatkichning o'zi bu kitobdagi 64 bitli Windowsda 8 bayt.",
          ],
          codeLabel: "manzil.cpp",
          code: `#include <iostream>

int main() {
    int yosh = 18;
    int* p = &yosh;
    std::cout << (p == &yosh) << "{{n}}";
    std::cout << sizeof(yosh) << "{{n}}";
    std::cout << sizeof(p) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
4
8`,
          analysis: [
            {
              lines: "4-5",
              text: "`yosh` bitta `int`, ichi 18. `&yosh` shu qutining manzili. `int* p` manzil saqlaydigan quti, unga shu manzil yoziladi. 18 ning o'zi `p` ga nusxalanmaydi.",
            },
            {
              lines: "6",
              text: "`p == &yosh` qavsda, chunki `<<` tenglikdan kuchliroq bog'lanadi. Rost, ekranda 1. Aniq `0x` raqamini chiqarmadik, u ishga tushirishda o'zgarishi mumkin.",
            },
            {
              lines: "7",
              text: "`sizeof(yosh)` bu qutining bayti. Shu kitobdagi Windowsda `int` 4.",
            },
            {
              lines: "8",
              text: "`sizeof(p)` ko'rsatkich qutisi. 64 bitli Windowsda manzil 8 bayt. 32 bitli dasturda bu 4 bo'lishi mumkin. 8 ni «har doim» demang, shu model deb ayting. Qiymat 18 bu songa kirmaydi.",
            },
          ],
        },
        {
          title: "Taxallus yangi manzil ochmaydi",
          intro: [
            "`int&` yangi quti emas. `taxallus = 21` `yosh` ni o'zgartiradi. `&taxallus` va `&yosh` bitta joy.",
          ],
          codeLabel: "taxallus.cpp",
          code: `#include <iostream>

int main() {
    int yosh = 18;
    int& taxallus = yosh;
    int* p = &yosh;
    taxallus = 21;
    std::cout << yosh << "{{n}}";
    std::cout << (p == &taxallus) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `21
1`,
          analysis: [
            {
              lines: "5",
              text: "Bu `&` e'londagi taxallus. `taxallus` uchun ikkinchi `int` ochilmaydi. U `yosh` ning o'zi.",
            },
            {
              lines: "6",
              text: "Bu `&` manzil so'raydi. `p` ga `yosh` ning joyi yoziladi. 5-qatordagi `&` bilan bu `&` bitta belgi, boshqa ish.",
            },
            {
              lines: "7-8",
              text: "`taxallus = 21` yozuvi `yosh` qutisiga 21 qo'yadi. Ekranda 21. Taxallus orqali yozish manzilni almashtirmaydi.",
            },
            {
              lines: "9",
              text: "`&taxallus` ham o'sha `int` ning manzili, chunki taxallus alohida joy emas. `p` shu joyni ushlab turibdi. Tenglik 1.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`int yosh = 18;` bitta quti ochadi. Ichida 18. Qutining boshi manzil A. A ning aniq raqami tizim tanlaydi, darsda harf bilan yozamiz. 4 baytli `int` da quti A dan A+3 gacha.",
          "`int* p = &yosh;` boshqa quti ochadi, manzili B. B ning ichida A yoziladi, 18 emas. `p` ning o'zi ham obyekt, uning manzili `&p`, ya'ni B. `sizeof(p)` shu ikkinchi qutining o'lchami, 64 bitli Windowsda 8 bayt. A va B yonma-yon turishi shart emas.",
          "`int& taxallus = yosh;` uchinchi quti ochmaydi. `taxallus` nomi ham A ni ko'rsatadi. `&taxallus` A. `taxallus = 21` A dagi baytlarni 21 qiladi.",
          "`5 & 3` xotiradan manzil olmaydi. Ikki sonning bitlari VA qilinadi, natija 1, u yangi vaqtinchalik son. Belgisi o'xshash, ishi boshqa.",
        ],
        diagram: `yosh qutisi, manzil A
  ichi: 18, keyin taxallus orqali 21
  sizeof: 4 bayt (shu kitobdagi int)

p qutisi, manzil B
  ichi: A
  sizeof: 8 bayt (64 bitli Windows)

taxallus alohida quti emas, nomi ham A
5 & 3 manzil emas, bitli hisob, natija 1`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Manzil xatosi `&` ning uch ma'nosini aralashtirish yoki 16-likni o'nlik deb o'qish. `hex` yopishqoq qolishi keyingi sonni ham buzadi.",
        ],
        items: [
          {
            title: "0x10 ni o'n deb o'qish",
            why: [
              "`0x` 16-lik deydi. `0x10` bu 16. O'nlik 10 ning 16-lik yozuvi `0xa`. Prefiksni ko'rmasdan oxirgi raqamni o'nlik sanamang.",
            ],
            wrong: `std::cout << "0x10 o'nlikda 10{{n}}";`,
            right: `std::cout << std::showbase << std::hex << 16 << "{{n}}";
std::cout << std::dec;`,
          },
          {
            title: "hex ni qaytarmaslik",
            why: [
              "`std::hex` bitta son uchun emas, oqimga yopishadi. Keyingi `10` ekranda `a` bo'ladi, o'n emas. Ish tugagach `std::dec` qo'ying. `showbase` ham yopishqoq.",
            ],
            wrong: `std::cout << std::hex << 255 << "{{n}}";
std::cout << 10 << "{{n}}";`,
            right: `std::cout << std::hex << 255 << "{{n}}";
std::cout << std::dec << 10 << "{{n}}";`,
          },
          {
            title: "int& ni manzil so'rovi deb o'qish",
            why: [
              "`int& taxallus = yosh;` yangi manzil saqlamaydi. Bu taxallus. Manzil olish `int* p = &yosh;`. E'londagi `&` bilan ifodadagi `&` ni bir xil ish demang.",
            ],
            wrong: `int& p = &yosh;`,
            right: `int* p = &yosh;`,
          },
        ],
      },
      quiz: [
        {
          id: "9.1-q1",
          question: "`std::showbase` va `std::hex` yoqiq bo'lsa, 255 qanday chiqadi?",
          options: ["255", "0xff", "0x255", "ff"],
          answer: 1,
          explanation:
            "255 = 15*16+15, 16-likda ff. showbase oldiga 0x qo'yadi. showbase bo'lmasa shunchaki ff chiqardi.",
        },
        {
          id: "9.1-q2",
          question: "`int yosh = 18;` dan keyin `&yosh` nima?",
          options: [
            "bitli VA, natija 18",
            "yosh qutisining manzili",
            "yangi taxallus",
            "18 ning nusxasini 16-lik qiladi",
          ],
          answer: 1,
          explanation:
            "Bitta obyekt oldidagi & manzil so'raydi. Qiymat 18 joyida qoladi. int& e'lon, 5 & 3 esa bitli VA.",
        },
        {
          id: "9.1-q3",
          question: "Shu kitobdagi 64 bitli Windowsda `int* p` ning `sizeof(p)` qiymati odatda necha?",
          options: [
            "har doim 4, int kabi",
            "8 bayt, manzil qutisi",
            "1 bayt",
            "p ichidagi songa teng",
          ],
          answer: 1,
          explanation:
            "Ko'rsatkich manzil saqlaydi. 64 bitli Windowsda manzil 8 bayt. 32 bitli dasturda 4 bo'lishi mumkin. Ichidagi int ning 4 bayti boshqa quti.",
        },
      ],
    },
    {
      id: "9.2",
      navTitle: "Ko'rsatkich",
      title: "Ko'rsatkich: manzilni o'zida saqlovchi o'zgaruvchi",
      goal: [
        "Bu darsdan keyin siz `int*` ni `int` manzilini saqlaydigan alohida quti deb tushuntirasiz. Unga `&obyekt` yoziladi. Ko'rsatkichni boshqa obyektga qayta qo'yish mumkin, taxallusni esa yo'q. Ko'rsatkichning o'z manzili bor, u ko'rsatayotgan qutining manzili emas.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Qog'ozga uy raqamini yozib cho'ntagingizga qo'ydingiz. Qog'oz odam emas, raqam. Odam o'z uyida. Qog'ozni boshqa raqamga almashtirsangiz, birinchi odam joyida qoladi, siz endi boshqa uyni yodda tutasiz. Ko'rsatkich shu qog'oz.",
          "Taxallus esa odamning ikkinchi ismi. Ismni almashtirib boshqa odamga yopishtira olmaysiz. 7.5-darsdagi `int&` shunday. `int*` qog'oz, qayta yoziladi.",
          "Qog'ozning o'zi ham bir joyda yotadi: cho'ntak. Cho'ntakning manzili uy manzili emas. `&p` cho'ntak, `p` ning ichi esa uy raqami.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`int* p` turi «`int` ga ko'rsatkich». `*` e'londa turining qismi. `p = &son` manzilni yozadi. `p` ni boshqa manzilga qo'yish mumkin. Qiymatni ochish keyingi dars, `*p`.",
        ],
        items: [
          {
            title: "Tur va boshlang'ich manzil",
            paragraphs: [
              "`int* p = &son;` `p` ni ochadi va darrov `son` ning manzilini yozadi. Yozilmagan lokal `int* q;` ichida tasodifiy manzil bo'lishi mumkin. Uni o'qish noma'lum. Ko'rsatkichni ochgan zahoti manzil qo'ying yoki keyingi darsdagi `nullptr`.",
              "`int*` faqat `int` manzilini kutadi. `double*` bu `double` manzili. `int* p = &kasr;` `kasr` `double` bo'lsa yig'ilmaydi. Tur mos kelmasa, manzilni majburan tiqmang.",
              "`int* p, q;` tuzoq. `p` ko'rsatkich, `q` oddiy `int`. Yulduz faqat o'z nomiga tegishli. Ikkalasi ham ko'rsatkich bo'lsin desangiz, `int* p;` va `int* q;` alohida yozing.",
            ],
            code: `int son = 4;
int* p = &son;
int* q = p;`,
            codeLabel: "manzil, keyin shu manzilning nusxasi",
          },
          {
            title: "Qayta qo'yish",
            paragraphs: [
              "`p = &b;` `p` dagi manzilni almashtiradi. `a` qutisi o'zgarmaydi. `p` endi `b` ni ko'rsatadi. Taxallusni bunday qayta bog'lab bo'lmaydi.",
              "`q = p;` manzilning nusxasini yozadi, `int` ning nusxasini emas. `q` va `p` bitta qutini ko'rsatadi. Bittasini keyin boshqa manzilga qo'ysangiz, ikkinchisi eski joyda qoladi. Ular bog'langan ip emas, raqamning nusxasi.",
              "Ko'rsatkichning o'zgarishi ko'rsatilayotgan sonni o'zgartirmaydi. Sonni o'zgartirish `*p` bilan, bu 9.3. Hozir faqat qog'ozdagi raqam almashadi.",
            ],
            code: `int* p = &a;
p = &b;`,
            codeLabel: "qog'ozga boshqa uy raqami",
          },
          {
            title: "Ko'rsatkich ham quti",
            paragraphs: [
              "`p == &son` rost: `p` ning ichi `son` ning manzili. `&p == &son` yolg'on: `&p` ko'rsatkich qutisining o'z manzili. `&p == p` ham yolg'on, ichidagi raqam bilan qutining joyi bitta emas.",
              "Uchta narsa: son qutisi, ko'rsatkich qutisi, ko'rsatkich ichidagi manzil. Ularni bir so'z bilan «p» deb yutib yubormang.",
              "Massiv nomi 8-bobda bosh manzil edi. `int* p = baho;` shu boshni `p` ga nusxalaydi. Massivning o'zi ko'rsatkich qutisi emas. Buni 9.5 da ochamiz.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Ko'rsatkich boshqa qutiga o'tadi, birinchisi qoladi",
          intro: [
            "`p` avval `a` ni ko'rsatadi, keyin `b` ni. `a` ning qiymati 5 bo'lib turadi. Qog'oz boshqa uyga qaraydi.",
          ],
          codeLabel: "qayta.cpp",
          code: `#include <iostream>

int main() {
    int a = 5;
    int b = 9;
    int* p = &a;
    std::cout << (p == &a) << "{{n}}";
    p = &b;
    std::cout << (p == &a) << "{{n}}";
    std::cout << (p == &b) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
0
1`,
          analysis: [
            {
              lines: "4-6",
              text: "`a` 5, `b` 9, ikki alohida quti. `p` ga `a` ning manzili yoziladi. `b` hali hech kimning qog'ozida yo'q.",
            },
            {
              lines: "7",
              text: "`p == &a` rost, 1. `p` ichidagi raqam `a` ning joyi.",
            },
            {
              lines: "8-10",
              text: "`p = &b` qog'ozni qayta yozadi. `a` joyida, ichi 5. `p == &a` endi 0. `p == &b` 1. Taxallusni bunday qayta bog'lab bo'lmaydi, ko'rsatkichni mumkin.",
            },
            {
              lines: "qiymat",
              text: "Bu dastur `*p` ishlatmaydi. 9 va 5 o'zgarmagan. O'zgargan narsa `p` dagi manzil.",
            },
          ],
        },
        {
          title: "Cho'ntak va uy bitta manzil emas",
          intro: [
            "`p` `son` ni ko'rsatadi. `&p` esa `p` qutisining o'zi. Uchta tenglik: rost, yolg'on, yolg'on.",
          ],
          codeLabel: "quti.cpp",
          code: `#include <iostream>

int main() {
    int son = 4;
    int* p = &son;
    std::cout << (p == &son) << "{{n}}";
    std::cout << (&p == &son) << "{{n}}";
    std::cout << (&p == p) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
0
0`,
          analysis: [
            {
              lines: "4-5",
              text: "`son` ning manzili A bo'lsin. `p` boshqa quti, manzili B, ichida A yotadi.",
            },
            {
              lines: "6",
              text: "`p == &son` ichidagi A bilan A. Rost, 1.",
            },
            {
              lines: "7",
              text: "`&p` bu B. `&son` bu A. B va A boshqa qutilar. 0.",
            },
            {
              lines: "8",
              text: "`&p == p` bu B == A. Ko'rsatkich qutisi o'z ichidagi manzil bilan bir joyda emas. 0. `p` ni «ham quti, ham shu qutining ichi» deb qo'shib yubormang.",
            },
          ],
        },
        {
          title: "Manzil nusxalanadi, int emas",
          intro: [
            "`q = p` uy raqamining nusxasi. Ikkalasi `son` ni ko'rsatadi. `son = 8` qutini o'zgartiradi, qog'ozlar o'sha joyda qoladi.",
          ],
          codeLabel: "nusxa.cpp",
          code: `#include <iostream>

int main() {
    int son = 4;
    int* p = &son;
    int* q = p;
    std::cout << (q == p) << "{{n}}";
    std::cout << (q == &son) << "{{n}}";
    son = 8;
    std::cout << son << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
1
8`,
          analysis: [
            {
              lines: "5-6",
              text: "`p` ga `son` manzili yoziladi. `q = p` shu manzilni `q` ga nusxalaydi. `son` ning 4 i ikkinchi marta ko'chirilmaydi.",
            },
            {
              lines: "7-8",
              text: "`q` va `p` teng, ikkalasi ham `&son`. Ekranda 1 va 1. Bittasini keyin `&boshqa` ga qo'ysangiz, ikkinchisi eski manzilda qoladi.",
            },
            {
              lines: "9-10",
              text: "`son = 8` qutining ichini almashtiradi. Ko'rsatkichlar hali ham shu qutini ko'rsatadi. Ekranda 8. Qiymatni ko'rsatkich orqali yozish 9.3.",
            },
            {
              lines: "e'lon",
              text: "`int* p, q;` yozilsa, `q` ko'rsatkich bo'lmaydi, oddiy `int` bo'ladi. Bu misolda ikkala qator alohida `int*`.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`int a = 5;` va `int b = 9;` ikki quti. Manzillar A va C bo'lsin. `int* p = &a;` uchinchi quti B, ichida A. `p = &b` B ning ichini C qiladi. A dagi 5 o'zgarmaydi.",
          "`int* q = p;` to'rtinchi quti ochiladi, ichiga B dagi raqam, ya'ni A, nusxalanadi. Endi ikki ko'rsatkich qutisi bor, ikkalasining ichida A. `son` bitta.",
          "`&p` B ni beradi. `p` ifodasi B ning ichini, ya'ni A ni beradi. `*p` esa A ning ichini beradi, bu keyingi dars. Hozirgi misollar A ni ochmaydi, faqat raqamlarni solishtiradi.",
          "Yozilmagan `int*` qutisida ham baytlar bor, lekin ular ishonchli manzil emas. O'sha baytlarni manzil deb ishlatish noma'lum. 9.4 shuni `nullptr` bilan yopadi.",
        ],
        diagram: `a [5] manzil A
b [9] manzil C

p manzil B
  avval ichi A
  p = &b dan keyin ichi C

q = p
  yangi quti, ichi ham A (nusxa)

&p bu B, p bu A yoki keyin C
B == A emas`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Ko'rsatkich xatosi uni sonning nusxasi deb o'ylash yoki e'londa yulduzni ikkinchi nomga o'tkazmaslik. Yozilmagan ko'rsatkichni manzil deb ishlatish keyingi darsdagi yovvoyi manzil.",
        ],
        items: [
          {
            title: "int* p, q deb ikkalasini ko'rsatkich sanash",
            why: [
              "Yulduz `p` ga yopishadi. `q` oddiy `int`. `q = &son` yig'ilmaydi, chunki `q` manzil saqlamaydi. Har bir ko'rsatkichga o'z yulduzini yozing.",
            ],
            wrong: `int* p = &son, q = &son;`,
            right: `int* p = &son;
int* q = &son;`,
          },
          {
            title: "Boshqa turning manzilini tiqish",
            why: [
              "`double` qutisining manzili `int*` emas. Kompilyator rad etadi. Majburan aylantirish baytni noto'g'ri o'qiydi. Ko'rsatkich turi qutining turiga mos bo'lsin.",
            ],
            wrong: `double kasr = 1.5;
int* p = &kasr;`,
            right: `double kasr = 1.5;
double* p = &kasr;`,
          },
          {
            title: "Ko'rsatkichni taxallusdek bir joyga mixlash",
            why: [
              "`int&` qayta bog'lanmaydi. `int*` bog'lanadi. `p = &b` xato emas, u qog'ozni yangilaydi. Eski quti o'chmaydi, shunchaki `p` endi uni ko'rsatmaydi.",
            ],
            wrong: `int& p = a;
p = &b;`,
            right: `int* p = &a;
p = &b;`,
          },
        ],
      },
      quiz: [
        {
          id: "9.2-q1",
          question: "`int* p = &a;` dan keyin `p = &b;` qilinsa, `p == &a` nima?",
          options: ["1", "0", "kod yig'ilmaydi", "p taxallus bo'lib qoladi"],
          answer: 1,
          explanation:
            "p dagi manzil b ga almashadi. a joyida qoladi, lekin p endi uni ko'rsatmaydi. Tenglik 0.",
        },
        {
          id: "9.2-q2",
          question: "`p` `son` ni ko'rsatayotganda `&p == &son` rostmi?",
          options: [
            "ha, har doim 1",
            "yo'q, p ning o'z qutisi boshqa joyda",
            "kod yig'ilmaydi",
            "bu *p bilan bir xil",
          ],
          answer: 1,
          explanation:
            "p ning ichi son ning manzili. &p esa p qutisining manzili. Cho'ntak va uy bitta joy emas.",
        },
        {
          id: "9.2-q3",
          question: "`int* q = p;` nima nusxalanadi?",
          options: [
            "int qiymatining nusxasi, manzil emas",
            "p dagi manzil",
            "p qutisining o'zi ko'chib ketadi",
            "ikkala int ham o'chadi",
          ],
          answer: 1,
          explanation:
            "Ko'rsatkichga ko'rsatkich tayinlash manzil raqamini nusxalaydi. Ikkalasi bitta qutini ko'rsatadi. int alohida turadi.",
        },
      ],
    },
    {
      id: "9.3",
      navTitle: "Qiymatni ochish",
      title: "Dereferencing: manzil orqali o'qish va yozish",
      goal: [
        "Bu darsdan keyin siz `*p` ni «p ichidagi manzildagi quti» deb o'qiysiz. Shu orqali qiymatni o'qisiz va yozasiz. E'londagi `*` bilan ifodadagi `*` ni ajratasiz. `*p++` ko'rsatkichni surishini, `(*p)++` esa qutidagi sonni oshirishini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Cho'ntakdagi qog'ozda uy raqami yozilgan. `*p` «shu raqamdagi uyga kir, ichidagi odam bilan gaplash». Qog'ozni o'qish uyga kirmaydi. Uyga kirish alohida qadam, yulduz shu qadam.",
          "Uyga kirib ismni almashtirsangiz, odam o'zgaradi. Qog'ozdagi raqam o'sha uyda qoladi. `*p = 21` ichkarini yozadi. `p = &boshqa` esa boshqa qog'oz yozadi, ichkariga kirmaydi.",
          "Ikki kishi bitta uy raqamini ushlasa, bittasi ichkaridagi sonni o'zgartirsa, ikkinchisi ham yangi sonni ko'radi. Uy bitta. Qog'oz ikkita bo'lishi mumkin.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Ifodadagi unary `*` ko'rsatkichni ochadi. Natija o'sha manzildagi obyekt. O'ng tomonda turishi ham, chap tomonda yozilishi ham mumkin. E'londagi `*` esa tur yozadi, ochmaydi.",
        ],
        items: [
          {
            title: "O'qish va yozish",
            paragraphs: [
              "`std::cout << *p` manzildagi `int` ni chiqaradi. `*p = 21` shu `int` ga 21 yozadi. `p` dagi manzil o'zgarmaydi. `yosh` o'zgaradi, chunki u o'sha quti.",
              "`*p = *p + 3` o'qiydi, 3 qo'shadi, qayta yozadi. `p` ning o'zi arifmetikaga kirmaydi. Hisob qutidagi sonda.",
              "Ochishdan oldin `p` haqiqiy obyektni ko'rsatishi kerak. Bo'sh yoki eskirgan manzilni ochish noma'lum. 9.4 shuni yopadi. Bu darsdagi misollarda `p` tirik `int` ga qaraydi.",
            ],
            code: `int yosh = 18;
int* p = &yosh;
*p = 21;`,
            codeLabel: "manzil orqali yozish",
          },
          {
            title: "Ikki yulduz, ikki joy",
            paragraphs: [
              "`int* p` e'lon. Yulduz «p ko'rsatkich» deydi. Bu qatorda quti ochilmaydi, faqat tur yoziladi. `p` hali hech narsani ochmaydi.",
              "Keyingi qatordagi `*p` ifoda. `p` allaqachon bor, yulduz uning ichidagi manzilga kiradi. E'lonni ifoda bilan almashtirib o'qimang.",
              "`int* p = &yosh;` bitta qatorda ikkalasi ham bor. Chapdagi `*` tur. O'ngdagi `&` manzil. Ochish yo'q, toki alohida `*p` yozilmaguncha.",
            ],
          },
          {
            title: "*p++ va (*p)++",
            paragraphs: [
              "Postfix `++` unary `*` dan qattiqroq bog'lanadi. `*p++` bu `*(p++)`. Avval eski `p` olinadi, `p` keyingi elementga suriladi, yulduz eski manzilni ochadi. Qutidagi son oshmaydi.",
              "`(*p)++` avval ochadi, keyin shu `int` ni 1 ga oshiradi. Ko'rsatkich joyida qoladi. Qavs bo'lmasa, bu ish chiqmaydi.",
              "Massivda `*p++` keyingi elementga o'tishning qisqa yozuvi. 9.5 da qadamni alohida `p = p + 1` qilib ham yozamiz. Qisqa yozuvni sonni oshirish bilan adashtirmang.",
            ],
            code: `std::cout << *p++ << "{{n}}";
(*p)++;`,
            codeLabel: "surish va sonni oshirish",
          },
        ],
      },
      examples: [
        {
          title: "*p yozsa, yosh ham o'zgaradi",
          intro: [
            "`p` `yosh` ni ko'rsatadi. Avval 18 o'qiladi. `*p = 21` qutini yangilaydi. Keyin `yosh` ham, `*p` ham 21.",
          ],
          codeLabel: "ochish.cpp",
          code: `#include <iostream>

int main() {
    int yosh = 18;
    int* p = &yosh;
    std::cout << *p << "{{n}}";
    *p = 21;
    std::cout << yosh << "{{n}}";
    std::cout << *p << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `18
21
21`,
          analysis: [
            {
              lines: "4-6",
              text: "`p` ning ichida `yosh` manzili. `*p` shu qutini ochadi. Ekranda 18. `p` ning o'zi 18 emas.",
            },
            {
              lines: "7",
              text: "`*p = 21` chap tomonda ochilgan quti. 21 shu `int` ga yoziladi. `p` dagi manzil o'zgarmaydi, hali ham `yosh`.",
            },
            {
              lines: "8-9",
              text: "`yosh` 21, `*p` ham 21. Ikki nom, bitta quti. Yangi ko'rsatkich ochilmagan.",
            },
            {
              lines: "farq",
              text: "`p = 21` yig'ilmaydi: 21 manzil emas, `int*`. Son yozish `*p = 21`. Manzil yozish `p = &boshqa`.",
            },
          ],
        },
        {
          title: "Ikki qog'oz, bitta hamyon",
          intro: [
            "`a` va `b` ikkalasi `hamyon` ni ko'rsatadi. `*a` ga 3 qo'shilsa, `*b` ham 13 ko'radi.",
          ],
          codeLabel: "ikkisi.cpp",
          code: `#include <iostream>

int main() {
    int hamyon = 10;
    int* a = &hamyon;
    int* b = &hamyon;
    *a = *a + 3;
    std::cout << *b << "{{n}}";
    std::cout << hamyon << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `13
13`,
          analysis: [
            {
              lines: "4-6",
              text: "Bitta `int`, ichi 10. Ikki ko'rsatkichga bitta manzil yoziladi. 9.2 dagi nusxa shu.",
            },
            {
              lines: "7",
              text: "`*a` o'qiydi, 10. 10+3=13. 13 o'sha qutiga yoziladi. `a` va `b` dagi manzillar o'zgarmaydi.",
            },
            {
              lines: "8-9",
              text: "`*b` ham o'sha quti, 13. `hamyon` ham 13. Uchta yo'l, bitta joy.",
            },
            {
              lines: "nusxa emas",
              text: "Agar `b` boshqa `int` ni ko'rsatganida, `*a` uni o'zgartirmagan bo'lardi. Bu yerda manzillar teng.",
            },
          ],
        },
        {
          title: "*p++ sonni emas, ko'rsatkichni suradi",
          intro: [
            "Qator 10, 20, 30. `*p++` eski joyning 10 ini chiqaradi va `p` ni keyingisiga qo'yadi. `qator[0]` 10 bo'lib qoladi.",
          ],
          codeLabel: "surish.cpp",
          code: `#include <iostream>

int main() {
    int qator[3] = {10, 20, 30};
    int* p = qator;
    std::cout << *p++ << "{{n}}";
    std::cout << *p << "{{n}}";
    std::cout << qator[0] << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `10
20
10`,
          analysis: [
            {
              lines: "4-5",
              text: "`qator` uchta `int`. `p = qator` birinchi elementning manzili, ya'ni `&qator[0]`. `p` hozir 10 turgan qutini ko'rsatadi.",
            },
            {
              lines: "6",
              text: "`*p++` bu `*(p++)`. Postfix eski manzilni beradi, keyin `p` ni bitta elementga suradi. Eski manzil ochiladi, ekranda 10. 10 soni 11 bo'lmaydi.",
            },
            {
              lines: "7",
              text: "`p` endi ikkinchi elementda. `*p` 20. Qator 10, 20, 30 bo'lib turadi.",
            },
            {
              lines: "8",
              text: "`qator[0]` hali 10. Agar `(*p)++` bo'lganida, surishdan oldin shu son 11 bo'lardi va `p` joyida qolardi. Qavs bo'lmasa, `++` ko'rsatkichga tegadi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`*p` protsessorga «p qutisidagi raqamni manzil deb ol, o'sha baytlarni `int` qilib o'qi» deydi. `p` 8 baytli manzil qutisi, `*p` esa 4 baytli `int`. Yulduz ikkinchi qutiga sakraydi.",
          "`*p = 21` shu 4 baytga 21 yozadi. `p` ning 8 bayti o'zgarmaydi. `yosh` nomi ham o'sha 4 baytni ko'rsatgani uchun keyingi o'qish 21.",
          "`*a = *a + 3` A manzilidagi 10 ni o'qiydi, 13 ni hisoblaydi, A ga qaytaradi. `b` qutisida ham A yotadi. `*b` yana A ni ochadi, 13 ni ko'radi. Ikkinchi `int` yo'q.",
          "`*(p++)` da avval `p` ichidagi manzil eslab qolinadi, `p` ga keyingi elementning manzili yoziladi. `int` qatorida keyingi element 4 bayt narida, lekin `++` element sanaydi, baytni emas. Eski manzil ochiladi. `qator[0]` ning baytlari tegilmaydi. `(*p)++` teskari: manzil qutisi tinch, `int` baytlari 1 ga o'sadi.",
        ],
        diagram: `yosh [18] manzil A
p ichi: A
*p  -> A dagi int
*p = 21  ->  A [21]

*p++ qatorda:
  p eski joyni beradi (10)
  p keyin keyingi int ga suriladi (20)
  10 joyida qoladi

(*p)++ bo'lsa:
  p joyida
  10 esa 11 bo'ladi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Ochish xatosi yulduzni unutish yoki `++` ni noto'g'ri narsaga yopishtirish. Kod yig'ilishi mumkin, o'zgaradigan joy esa boshqa bo'ladi.",
        ],
        items: [
          {
            title: "Sonni p ga yozish",
            why: [
              "`p = 21` manzil kutadi, 21 esa `int`. Yig'ilmaydi. Qutidagi sonni almashtirish `*p = 21`. `p` faqat manzil oladi.",
            ],
            wrong: `p = 21;`,
            right: `*p = 21;`,
          },
          {
            title: "*p++ ni sonni oshirish deb o'qish",
            why: [
              "`*p++` qutidagi sonni oshirmaydi. U ko'rsatkichni keyingi elementga suradi va eski elementni beradi. Sonni oshirish `(*p)++`.",
            ],
            wrong: `*p++;`,
            right: `(*p)++;`,
          },
          {
            title: "Yulduzsiz qo'shish",
            why: [
              "`p + 3` manzilga 3 element qo'shadi, 9.5 dagi qadam. Hamyondagi 10 ga 3 qo'shmaydi. Qiymat uchun `*p + 3`, keyin yozish `*p = *p + 3`.",
            ],
            wrong: `p = p + 3;`,
            right: `*p = *p + 3;`,
          },
        ],
      },
      quiz: [
        {
          id: "9.3-q1",
          question: "`p` `yosh` ni ko'rsatadi, `yosh` 18. `*p = 21` dan keyin `yosh` necha?",
          options: ["18", "21", "kod yig'ilmaydi", "p 21 bo'ladi, yosh 18 qoladi"],
          answer: 1,
          explanation:
            "*p yosh qutisining o'zi. Unga 21 yozilsa, yosh ham 21. p dagi manzil o'zgarmaydi.",
        },
        {
          id: "9.3-q2",
          question: "`hamyon` 10, `a` va `b` ikkalasi ham uni ko'rsatadi. `*a = *a + 3` dan keyin `*b` necha?",
          options: ["10", "13", "3", "noma'lum, ikki ko'rsatkich taqiqlangan"],
          answer: 1,
          explanation:
            "Ikki ko'rsatkich bitta quti. *a shu qutini 13 qiladi. *b ham o'sha qutini ochadi.",
        },
        {
          id: "9.3-q3",
          question: "`*p++` nimani o'zgartiradi?",
          options: [
            "qutidagi sonni 1 ga oshiradi",
            "ko'rsatkichni keyingi elementga suradi, eski qiymatni beradi",
            "kod yig'ilmaydi",
            "sonni ham, ko'rsatkichni ham oshiradi",
          ],
          answer: 1,
          explanation:
            "*p++ bu *(p++). ++ ko'rsatkichga tegadi. Sonni oshirish (*p)++. Qavs bo'lmasa, bog'lanish boshqa.",
        },
      ],
    },
    {
      id: "9.4",
      navTitle: "nullptr va xavf",
      title: "nullptr, yovvoyi va osilib qolgan ko'rsatkich",
      goal: [
        "Bu darsdan keyin siz `nullptr` ni «hech qanday obyekt yo'q» deb o'qiysiz. Ochishdan oldin tekshirasiz. Yozilmagan ko'rsatkich yovvoyi ekanini, umri tugagan obyektning manzili osilib qolganini ajratasiz. O'lik manzilni ochmaysiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "`nullptr` bo'sh qog'oz: «uy yo'q» deb yozilgan. Eshikni taqillatmaysiz. Avval qog'ozni ko'rasiz. Bo'sh bo'lsa, yo'lga chiqmaysiz.",
          "Yovvoyi qog'ozda esa hech narsa yozilmagan, lekin chiziqlar tasodifiy raqamga o'xshab ketadi. Siz uni uy deb yurasiz. U yerda boshqa odamning xonasi, yoki devor bo'lishi mumkin. Qog'ozni bo'sh qoldirmang.",
          "Osilib qolgan qog'oz avval to'g'ri edi. Uy buzib tashlangan, qog'ozda eski raqam qolgan. Eshik yo'q. Raqam kecha ishlagani bugun ham ishlaydi degani emas. Uy ketishi bilan qog'ozni bo'shating.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`nullptr` ko'rsatkich literali. Hech qanday obyektga tegishli emas. `*p` faqat `p` tirik obyektni ko'rsatganda yaroqli. Aks holda ochish noma'lum.",
        ],
        items: [
          {
            title: "Bo'sh manzil",
            paragraphs: [
              "`int* p = nullptr;` aniq bo'sh. `p == nullptr` rost. `nullptr` ni `0` soni bilan aralashtirmang: solishtirishda u bo'sh ko'rsatkich, `int` qutisi emas.",
              "Ochishdan oldin `if (p != nullptr)`. Shart yolg'on bo'lsa, `*p` yozilmaydi. Tekshiruvsiz `*nullptr` noma'lum. Dastur xabar yozishi shart emas, istisno uloqtirishi ham shart emas. 8.3 dagi chegaradan chiqish bilan bir xil sinf: standart natija va'da qilmaydi.",
              "`nullptr` ga `delete` qilish 9.6 da xavfsiz bo'sh ish. Ochish esa xavfsiz emas. Bo'sh degani «nol sonini o'qi» emas.",
            ],
            code: `int* p = nullptr;
if (p != nullptr) {
    std::cout << *p << "{{n}}";
}`,
            codeLabel: "avval tekshir, keyin och",
          },
          {
            title: "Yovvoyi ko'rsatkich",
            paragraphs: [
              "Lokal `int* p;` yozilgan, lekin manzil qo'yilmagan. Ichidagi baytlar ishonchli emas. Bu yovvoyi ko'rsatkich. Uni ochish ham, hatto manzil deb o'qish ham noma'lum.",
              "Darrov `= nullptr` yoki `= &son` yozing. «Eski kompilyator nol qo'yib qo'yadi» deb kutmang. Lokal uchun bunday qoida yo'q.",
              "Yovvoyi bilan osilib qolgan bir xil emas. Yovvoyi hech qachon to'g'ri bo'lmagan. Osilib qolgan avval to'g'ri edi, obyekt o'lgach eskirgan.",
            ],
            code: `int* p = nullptr;
int son = 7;
p = &son;`,
            codeLabel: "bo'shdan haqiqiy manzilga",
          },
          {
            title: "Osilib qolgan manzil",
            paragraphs: [
              "Obyektning umri tugasa, uning manzilini ushlab turgan ko'rsatkich osilib qoladi. `{}` blok tugashi lokalni o'ldiradi. Funksiya `return` qilsa, uning lokallari o'ladi.",
              "`return &ichki;` manzil raqamini qaytaradi, lekin `ichki` shu zahoti yo'qoladi. Chaqiruvchi qo'lidagi raqam o'lik joyni ko'rsatadi. `*p` noma'lum. Son kerak bo'lsa, `return ichki;` qiymatning nusxasini qaytaring.",
              "Obyekt o'lishidan oldin `p = nullptr` qo'ying, agar ko'rsatkich tashqarida yashasa. `nullptr` yozish o'lik qutini o'qimaydi, u `p` ning o'ziga bo'sh yozadi. O'lim bilan `nullptr` orasida `*p` bo'lmasin.",
            ],
            code: `int yasash() {
    int ichki = 5;
    return ichki;
}`,
            codeLabel: "manzil emas, qiymat qaytadi",
          },
        ],
      },
      examples: [
        {
          title: "Bo'sh ko'rsatkich ochilmaydi",
          intro: [
            "`p` avval `nullptr`. `*p` ishlamaydi, ekranda `bo'sh`. Keyin `son` ga bog'lanadi va 7 chiqadi.",
          ],
          codeLabel: "bosh.cpp",
          code: `#include <iostream>

int main() {
    int* p = nullptr;
    if (p != nullptr) {
        std::cout << *p << "{{n}}";
    } else {
        std::cout << "bo'sh{{n}}";
    }
    int son = 7;
    p = &son;
    if (p != nullptr) {
        std::cout << *p << "{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `bo'sh
7`,
          analysis: [
            {
              lines: "4-6",
              text: "`p` bo'sh. `p != nullptr` yolg'on. 6-qator, ya'ni `*p`, umuman yurmaydi. O'lik yoki bo'sh manzil ochilmagan.",
            },
            {
              lines: "7-8",
              text: "`else` matn yozadi. `bo'sh`. Bu tilning o'zi yozgan xato emas, bizning tekshiruvimiz.",
            },
            {
              lines: "10-13",
              text: "`son` 7, tirik. `p = &son` endi haqiqiy manzil. Ikkinchi `if` rost, `*p` 7 ni chiqaradi.",
            },
            {
              lines: "tekshiruvsiz",
              text: "`if` ni olib tashlab `*p` qilish, `p` hali `nullptr` bo'lsa, noma'lum. «Har doim yiqiladi» ham, «0 chiqaradi» ham qoida emas. Shunday dasturni ishga tushirmaymiz.",
            },
          ],
        },
        {
          title: "Funksiya sonning nusxasini qaytaradi",
          intro: [
            "`ichki` funksiya tugashi bilan o'ladi. Qaytgan narsa 5 ning nusxasi, manzil emas. `main` dagi `son` yangi quti.",
          ],
          codeLabel: "nusxa_qaytish.cpp",
          code: `#include <iostream>

int yasash() {
    int ichki = 5;
    return ichki;
}

int main() {
    int son = yasash();
    std::cout << son << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `5`,
          analysis: [
            {
              lines: "4-5",
              text: "`ichki` shu funksiyaning lokali. `return ichki` 5 ni nusxalab chaqiruvchiga beradi. Manzil qaytmaydi.",
            },
            {
              lines: "9",
              text: "`yasash` tugagan. `ichki` yo'q. `son` yangi quti, ichida nusxa 5. U `ichki` ning eski joyi emas.",
            },
            {
              lines: "10",
              text: "Ekranda 5. Bu tirik quti. Natija barqaror.",
            },
            {
              lines: "xato tur",
              text: "`int* yasash() { int ichki = 5; return &ichki; }` raqamni qaytaradi, quti esa o'ladi. Chaqiruvchidagi ko'rsatkich osilib qoladi. `*p` nima chiqarishi va'da qilinmagan. Son kerak bo'lsa, qiymat qaytaring.",
            },
          ],
        },
        {
          title: "Blok tugashidan oldin qog'oz bo'shatiladi",
          intro: [
            "`vaqt` ichki blokda. `*p` hali tirik paytda 4 ni o'qiydi. Keyin `p` `nullptr` bo'ladi. Blok yopilganda qo'lda o'lik manzil qolmaydi.",
          ],
          codeLabel: "blok.cpp",
          code: `#include <iostream>

int main() {
    int* p = nullptr;
    {
        int vaqt = 4;
        p = &vaqt;
        std::cout << *p << "{{n}}";
        p = nullptr;
    }
    std::cout << (p == nullptr) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `4
1`,
          analysis: [
            {
              lines: "4-7",
              text: "`p` tashqi, avval bo'sh. Ichki blok `vaqt` ni ochadi. `p = &vaqt` shu tirik qutining manzili. Hali yaroqli.",
            },
            {
              lines: "8",
              text: "`*p` 4. Obyekt tirik. Ochish shu paytda yaroqli.",
            },
            {
              lines: "9-11",
              text: "`p = nullptr` manzilni tashlaydi, `vaqt` ni o'chirmaydi. Keyin blok tugaydi, `vaqt` o'ladi. `p` allaqachon bo'sh, o'lik joyni ushlamaydi. Tekshiruv 1.",
            },
            {
              lines: "agar qolsa",
              text: "9-qator bo'lmasa, blokdan keyin `p` eski manzilni ushlab turardi. `vaqt` yo'q. `*p` noma'lum. `p = nullptr` ni o'limdan oldin qo'yish qo'lda o'lik raqam qoldirmaydi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`int* p = nullptr;` ko'rsatkich qutisi ochiladi, ichiga «obyekt yo'q» yoziladi. Bu tasodifiy bayt emas. `*p` shu holatda manzilga bormasligi kerak. Tekshiruv yolg'on bo'lsa, protsessor o'sha baytga yurmaydi, `else` ga o'tadi.",
          "Yozilmagan lokal ko'rsatkichda ham 8 bayt bor, lekin ular `nullptr` ham, tirik obyekt ham emas. O'sha raqamga sakrash noma'lum. Quti ochilishi bilan yo `nullptr`, yo `&son` yozing.",
          "`return ichki` stekdagi `ichki` qiymatini chaqiruvchining yangi qutisiga nusxalaydi, keyin `yasash` freymi yopiladi. `ichki` ning joyi bo'shaydi. Yangi `son` boshqa joyda, ichida 5. Hech kim eski joyni ushlamaydi.",
          "`return &ichki` esa raqamni nusxalaydi, freymni yopadi. Raqam qoladi, quti ketadi. Bu osilib qolgan ko'rsatkich. `p = nullptr` ko'rsatkich qutisining ichini bo'sh qiymatga almashtiradi. U o'lik `int` ni o'qimaydi. O'qish bo'lgan bo'lsa, u o'limdan keyingi birinchi `*p` da allaqachon noma'lum edi.",
        ],
        diagram: `p = nullptr
  ko'rsatkich qutisi bor
  ichi: obyekt yo'q
  *p yurmaydi

yovvoyi int* p;
  ichi ishonchsiz bayt
  ochish noma'lum

return ichki
  5 nusxalanadi
  freym yopiladi
  yangi son [5]

return &ichki
  raqam nusxalanadi
  quti o'ladi
  qo'ldagi raqam osilib qoladi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Xavfli ko'rsatkich yig'ilishi mumkin. Xato keyinroq, boshqa qatorda ko'rinishi ham mumkin. Ochishdan oldin umrni tekshiring.",
        ],
        items: [
          {
            title: "nullptr ni tekshirmasdan ochish",
            why: [
              "`*p` bo'sh manzilda noma'lum. Til sizga doim xabar yozmaydi. `if (p != nullptr)` ichida oching. Tashqarida ochmang.",
            ],
            wrong: `int* p = nullptr;
std::cout << *p << "{{n}}";`,
            right: `int* p = nullptr;
if (p != nullptr) {
    std::cout << *p << "{{n}}";
}`,
          },
          {
            title: "Lokalning manzilini qaytarish",
            why: [
              "Funksiya tugashi bilan lokal o'ladi. Qaytgan manzil osilib qoladi. Chaqiruvchi `*p` qilsa, noma'lum. Qiymatning nusxasini qaytaring.",
            ],
            wrong: `int* yasash() {
    int ichki = 5;
    return &ichki;
}`,
            right: `int yasash() {
    int ichki = 5;
    return ichki;
}`,
          },
          {
            title: "Blok tugagach eski manzilni ochish",
            why: [
              "`vaqt` blok bilan o'ladi. `p` hali eski raqamni ushlasa, `*p` noma'lum. Obyekt ketishidan oldin `p = nullptr`. Keyin ochish `if` dan o'tmaydi.",
            ],
            wrong: `int* p;
{
    int vaqt = 4;
    p = &vaqt;
}
std::cout << *p << "{{n}}";`,
            right: `int* p = nullptr;
{
    int vaqt = 4;
    p = &vaqt;
    std::cout << *p << "{{n}}";
    p = nullptr;
}`,
          },
        ],
      },
      quiz: [
        {
          id: "9.4-q1",
          question: "`int* p = nullptr;` va tekshiruvsiz `*p` bo'lsa, C++ nima qilishga majbur?",
          options: [
            "har doim 0 chiqaradi",
            "har doim istisno uloqtiradi",
            "hech narsa va'da qilmaydi, bu noma'lum",
            "kod yig'ilmaydi",
          ],
          answer: 2,
          explanation:
            "Bo'sh ko'rsatkichni ochish noma'lum. Yiqilish ham, jim natija ham kafolat emas. Avval p != nullptr.",
        },
        {
          id: "9.4-q2",
          question: "`int* yasash()` ichidagi lokalning `&ichki` sini qaytarsa, chaqiruvchidagi ko'rsatkich nima?",
          options: [
            "xavfsiz nusxa",
            "osilib qolgan manzil, obyekt o'lgan",
            "heap dagi yangi int",
            "avtomatik nullptr",
          ],
          answer: 1,
          explanation:
            "return manzil raqamini olib chiqadi, freym esa yopiladi. Quti yo'q. *p noma'lum. Son kerak bo'lsa, qiymatni qaytaring.",
        },
        {
          id: "9.4-q3",
          question: "Tashqi `p` ichki lokalni ko'rsatayotganda, blok tugashidan oldin `p = nullptr` nima uchun?",
          options: [
            "lokal int ni o'chirib, xotirani qaytaradi",
            "qo'lda o'lik manzil qolmasin, keyin ochilmasin",
            "p endi int qiymatini saqlaydi",
            "bu delete bilan bir xil",
          ],
          answer: 1,
          explanation:
            "nullptr ko'rsatkich qutisini bo'shatadi. Lokal baribir blok tugashi bilan o'ladi. Farqi: p o'sha o'lik joyni ushlamaydi. delete bu emas, 9.6.",
        },
      ],
    },
    {
      id: "9.5",
      navTitle: "Ko'rsatkich va massiv",
      title: "Ko'rsatkich va massiv: qadam element bilan",
      goal: [
        "Bu darsdan keyin siz massiv nomining birinchi element manziliga aylanashini tushuntirasiz. `a[i]` va `*(a + i)` bitta joy. `p + 1` bitta element nariga, odatda 4 bayt, lekin natija «1 element» ekanini bilasiz. Oxiridan bir qadam narini solishtirish mumkin, ochish mumkin emas.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "8.1 dagi pochta qutilari yonma-yon. Birinchisining uy raqami bor. «Ikki qadam naridagi quti» desangiz, oradagi qutilarni ham sanaysiz. Qadam quti sanaqli, santimetr emas. Ko'rsatkich arifmetikasi shu.",
          "`a[2]` «boshidan 2-qadam». `*(a + 2)` ham o'sha gap, boshqa yozuv. Quti bitta, ichidagi son bitta.",
          "Qatorning tugagan joyidan keyingi chiziqni «shu yerda to'xta» deb ko'rsatish mumkin. O'sha chiziqdagi yo'q qutini ochmang. Qo'l to'xtash belgisida tursin, ichkariga kirmasin.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Massiv ifodada birinchi elementning manziliga aylanadi. `int* p = a;` shu manzil. `p + i` `i` ta element naridagi manzil. `*(p + i)` o'sha element. `a[i]` ning ta'rifi ham shu.",
        ],
        items: [
          {
            title: "Nom va birinchi manzil",
            paragraphs: [
              "`int a[4]` haqiqiy to'rtta `int`. `sizeof(a)` butun bo'lak, shu kitobda 16 bayt. `int* p = a;` massivni nusxalamaydi. `p` ga birinchi elementning manzili tushadi. `sizeof(p)` ko'rsatkich, 64 bitli Windowsda 8.",
              "`&a[0]` va `a` bir xil manzil, turi `int*`. `&a` esa butun qatorning manzili, turi boshqa. Uni `int*` ga qo'yib bo'lmaydi. Birinchi element kerak bo'lsa, `a` yoki `&a[0]`.",
              "8.1 dagi `void yoz(int a[], int soni)` ichkarida `a` ko'rsatkich. `[]` sanog'i eslab qolinmaydi. Sanoq alohida argument bo'lib qoladi.",
            ],
            code: `int a[4] = {8, 9, 7, 10};
int* p = a;
std::cout << *(p + 2) << "{{n}}";`,
            codeLabel: "boshidan 2 qadam",
          },
          {
            title: "Qadam elementda",
            paragraphs: [
              "`p + 1` keyingi `int`. Bayt hisobida bu `sizeof(int)` qo'shiladi, shu kitobda 4. Ifodaning farqi esa bayt emas, element: `(p + 1) - p` natijasi 1.",
              "`p - a` ham element sanaqli, agar ikkalasi bitta qatorga qarasa. Natija `ptrdiff_t`, ekranda oddiy son. Boshqa massivlarning ko'rsatkichlarini ayirish noma'lum.",
              "`char*` da qadam 1 bayt, chunki `char` 1 bayt. `int*` da qadam bitta `int`. Tur qadamni belgilaydi. «Har +1 bu 1 bayt» deb yodlamang.",
            ],
            code: `p = p + 1;
std::cout << (p - a) << "{{n}}";`,
            codeLabel: "farq 1 element",
            table: {
              caption: "int qatori. p = a bo'lsa, p + i qayerda.",
              headers: ["Ifoda", "Element", "Qiymat", "Bayt qadami"],
              rows: [
                ["p + 0", "0", "8", "0"],
                ["p + 1", "1", "9", "sizeof(int), odatda 4"],
                ["p + 2", "2", "7", "2 * sizeof(int)"],
                ["p + 3", "3", "10", "3 * sizeof(int)"],
              ],
            },
          },
          {
            title: "Oxiridan bir qadam",
            paragraphs: [
              "`a + 4` to'rt elementlik qatorda oxiridan keyingi manzil. Uni hisoblash va `p != oxir` deb solishtirish yaroqli. `*oxir` yaroqli emas, u yerda element yo'q.",
              "`a + 5` esa bir qadamdan ham narida. Bu manzilni hisoblashning o'zi noma'lum. To'xtash belgisidan o'tmang.",
              "Sikl `for (int* p = a; p != a + 4; ++p)` har bir elementni ochadi va oxirida to'xtaydi. `*p` faqat `p != oxir` ichida. 8.3 dagi `i < n` shu yerda manzil tili bilan yozilgan.",
            ],
            code: `int* oxir = a + 4;
for (int* p = a; p != oxir; ++p) {
    std::cout << *p << "{{n}}";
}`,
            codeLabel: "oxir ochilmaydi",
          },
        ],
      },
      examples: [
        {
          title: "Massiv 16 bayt, ko'rsatkich 8, 2-qadam 7",
          intro: [
            "`sizeof` massivda butun bo'lakni, ko'rsatkichda manzil qutisini beradi. `*(p + 2)` bu `a[2]`, qiymat 7.",
          ],
          codeLabel: "qadam.cpp",
          code: `#include <iostream>

int main() {
    int a[4] = {8, 9, 7, 10};
    int* p = a;
    std::cout << sizeof(a) << "{{n}}";
    std::cout << sizeof(p) << "{{n}}";
    std::cout << *(p + 2) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `16
8
7`,
          analysis: [
            {
              lines: "4-5",
              text: "To'rtta `int`. `p = a` birinchi elementning manzili. To'rtta son ko'chmaydi. `p` bitta manzil qutisi.",
            },
            {
              lines: "6",
              text: "`sizeof(a)` haqiqiy massivda butun qator. 4 ta `int`, har biri 4 bayt, jami 16. Bu shu kitobdagi Windows o'lchami. Funksiya parametrida bu hisob ishlamas edi, 8.1.",
            },
            {
              lines: "7",
              text: "`sizeof(p)` 8, 64 bitli ko'rsatkich. 16 emas. Massiv nomi va ko'rsatkich qutisi bir xil o'lcham emas.",
            },
            {
              lines: "8",
              text: "`p + 2` ikki element narida. `*` shu qutini ochadi. `a[2]` ham 7. `8.1` dagi indeks shu qadamning qisqa yozuvi.",
            },
          ],
        },
        {
          title: "p + 1 bitta element, farq 1",
          intro: [
            "Boshida 8. Bir qadamdan keyin 9. `p - a` bayt emas, element soni: 1.",
          ],
          codeLabel: "farq.cpp",
          code: `#include <iostream>

int main() {
    int a[4] = {8, 9, 7, 10};
    int* p = a;
    std::cout << *p << "{{n}}";
    p = p + 1;
    std::cout << *p << "{{n}}";
    std::cout << (p - a) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `8
9
1`,
          analysis: [
            {
              lines: "5-6",
              text: "`p` birinchi elementda. `*p` 8. `a[0]` ham shu.",
            },
            {
              lines: "7-8",
              text: "`p = p + 1` keyingi `int`. Bayt hisobida odatda +4, lekin qadam 1 element. `*p` endi 9, ya'ni `a[1]`.",
            },
            {
              lines: "9",
              text: "`p - a` ikkalasi bitta qatorga qaraydi. Farq 1. Ekranda 1, 4 emas. 4 bayt ichkarida yuradi, ayirish natijasi elementda.",
            },
            {
              lines: "chegara",
              text: "`p + 3` oxirgi element, 10. `p + 4` to'xtash manzili, ochilmaydi. `a` boshqa massiv bo'lsa, undan ayirish noma'lum. Ayirishni bitta qator ichida qiling.",
            },
          ],
        },
        {
          title: "To'xtash manzili ochilmaydi, yig'indi 6",
          intro: [
            "`oxir = a + 3` uch elementdan keyingi chiziq. Sikl `p != oxir` bo'lganda ochadi. Yig'indi 1+2+3=6. Farq 3.",
          ],
          codeLabel: "toxtash.cpp",
          code: `#include <iostream>

int main() {
    int a[3] = {1, 2, 3};
    int* bosh = a;
    int* oxir = a + 3;
    int yigindi = 0;
    for (int* p = bosh; p != oxir; ++p) {
        yigindi += *p;
    }
    std::cout << yigindi << "{{n}}";
    std::cout << (oxir - bosh) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `6
3`,
          analysis: [
            {
              lines: "5-6",
              text: "`bosh` birinchi element. `oxir` uchinchi elementdan keyin. `a + 3` hisoblash yaroqli. `*oxir` yo'q, yozilmagan ham.",
            },
            {
              lines: "8-10",
              text: "`p` boshda 1 ni qo'shadi, keyin 2, keyin 3. `++p` elementma-element. `p` `oxir` ga teng bo'lganda shart yiqiladi, `*p` ishlamaydi. Yig'indi 6.",
            },
            {
              lines: "12",
              text: "`oxir - bosh` 3. Bu element soni, `sizeof` emas. Uchta `int` yurilgan, to'xtash qutisi ochilmagan.",
            },
            {
              lines: "ortiq",
              text: "`a + 4` bu massivda bir qadamdan ham tashqari. Manzilni hisoblash ham noma'lum. To'xtash aynan `bosh + soni`.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`int a[4] = {8, 9, 7, 10};` manzil A dan boshlanib, 8, 9, 7, 10 yonma-yon. Qadamlar A, A+4, A+8, A+12. Oxirgi bayt A+15. `a + 4` bu A+16, ajratilgan qatordan keyingi chiziq. `*(a + 2)` A+8 dagi 7.",
          "`int* p = a;` yangi quti, ichida A. `sizeof(a)` 16, chunki `a` hali massiv. `sizeof(p)` 8, chunki nusxa faqat manzil. 16 bayt ko'chmagan. 8.1 dagi funksiya ham shunday nusxa oladi.",
          "`p = p + 1` p ichidagi raqamga `sizeof(int)` qo'shadi. Ichki hisob baytda, saqlanadigan farq `p - a` esa necha marta qo'shilganini, ya'ni elementni aytadi. Ekrandagi 1 shu sanoq.",
          "`for` da `p` A, A+4, A+8 bo'lib ochiladi. A+12 ga yetganda `p == oxir`, tana kirmaydi. A+12 dagi bayt o'qilmaydi. `a + 4` bo'lgan to'rt elementlik qatorda A+20 ni hisoblash esa ruxsat etilgan chiziqdan tashqari, u ham noma'lum.",
        ],
        diagram: `a: [8] [9] [7] [10] | to'xtash
    A   A+4 A+8 A+12  A+16
    p+0 p+1 p+2 p+3   a+4

*(p+2) -> 7
p - a  -> element soni, bayt emas

sizeof(a) 16
sizeof(p) 8
p ichida faqat A`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Massiv xatosi qadamni bayt deb o'qish yoki to'xtash manzilini ochish. `sizeof` ni ko'rsatkichda massiv o'lchami deb kutish 8.1 dagi tuzoqning davomi.",
        ],
        items: [
          {
            title: "&a ni int* deb olish",
            why: [
              "`a` birinchi elementning manzili, `int*`. `&a` butun qatorning manzili, turi boshqa. `int* p = &a` yig'ilmaydi. Birinchi element uchun `p = a` yoki `p = &a[0]`.",
            ],
            wrong: `int* p = &a;`,
            right: `int* p = a;`,
          },
          {
            title: "p + 1 ni 1 bayt deb o'qish",
            why: [
              "`int*` da `+ 1` bitta `int` nariga. Odatda 4 bayt. `char*` bo'lsa 1 bayt. Farqni `cout` ga bersangiz, element chiqadi, bayt emas. `(p + 1) - p` natijasi 1.",
            ],
            wrong: `std::cout << "p + 1 bu 1 bayt{{n}}";`,
            right: `p = p + 1;
std::cout << (p - a) << "{{n}}";`,
          },
          {
            title: "To'xtash manzilini ochish",
            why: [
              "`a + n` yaroqli to'xtash chizig'i. `*(a + n)` esa yo'q quti, 8.3 dagi kabi noma'lum. Sikl `p != oxir` bo'lguncha ochsin, teng bo'lganda to'xtasin.",
            ],
            wrong: `std::cout << *(a + 4) << "{{n}}";`,
            right: `int* oxir = a + 4;
for (int* p = a; p != oxir; ++p) {
    std::cout << *p << "{{n}}";
}`,
          },
        ],
      },
      quiz: [
        {
          id: "9.5-q1",
          question: "`int a[4] = {8, 9, 7, 10};` bo'lsa, `*(a + 2)` necha?",
          options: ["8", "9", "7", "10"],
          answer: 2,
          explanation:
            "a+2 ikki element narida, indeks 2. Qiymat 7. a[2] ham shu quti.",
        },
        {
          id: "9.5-q2",
          question: "`int*` turidagi `p + 1` nimani bildiradi?",
          options: [
            "har doim 1 bayt nariga",
            "1 ta int nariga, odatda 4 bayt",
            "har doim 8 bayt, ko'rsatkich o'lchami",
            "oxirgi elementga sakrash",
          ],
          answer: 1,
          explanation:
            "Qadam element turi bo'yicha. int odatda 4 bayt. Ayirish natijasi esa bayt emas, element soni.",
        },
        {
          id: "9.5-q3",
          question: "`p = a + 1` bo'lsa, `p - a` necha?",
          options: ["4", "1", "8", "0"],
          answer: 1,
          explanation:
            "Farq elementda. Bir qadam, natija 1. 4 bayt ichki siljish, ekrandagi ayirish emas.",
        },
      ],
    },
    {
      id: "9.6",
      navTitle: "new va delete",
      title: "Stack, heap, new, delete va xotira oqishi",
      goal: [
        "Bu darsdan keyin siz stackdagi lokal o'zi yo'qolishini, heapdagi obyekt esa `delete` gacha yashashini ajratasiz. `new` va `new[]` ni `delete` va `delete[]` bilan juftlaysiz. Yagona manzilni yo'qotsangiz, blok qolishini, ikki marta `delete` noma'lum ekanini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Stack bu stol ustidagi varaq. Funksiya xonaga kiradi, varaqni qo'yadi, chiqishi bilan varaqni olib ketadi. Siz yirtishni unutmaysiz, chunki xona yopilishi varaqni ham yig'adi. Lokal `int` shunday.",
          "Heap bu omborxonadagi javon. `new` javon so'raydi, kalitni qo'lingizga beradi. Xonadan chiqsangiz ham javon turadi. Kalitni qaytarish `delete`. Kalitni yo'qotsangiz, javon band qoladi, boshqa hech kim uni topa olmaydi. Bu xotira oqishi.",
          "Qator javon `new[]` bilan olinadi va `delete[]` bilan qaytariladi. Bitta javonning kalitini butun qatorga ishlatish boshqa shartnoma. Noto'g'ri kalit omborni buzadi, natija noma'lum.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`new` heapdan obyekt oladi va manzilini qaytaradi. `delete` shu obyektni qaytaradi. `new[]` qator oladi, `delete[]` qatorni qaytaradi. Stackdagi lokalga `delete` yo'q.",
        ],
        items: [
          {
            title: "Stack va heap",
            paragraphs: [
              "Stack funksiya freymi. `int yosh = 18;` freym ochilganda joy oladi, freym yopilganda ketadi. 7.9 dagi chuqur chaqiruv ham shu stackni o'stiradi. Hajmini raqam qilib va'da qilmaymiz, u muhitga bog'liq.",
              "Heap `new` so'ragan joy. Funksiya tugasa ham qoladi, toki `delete` bo'lmaguncha. Shuning uchun `yasash` ichidagi `new int(5)` chaqiruvchiga manzil qilib qaytishi mumkin. `return &lokal` esa 9.4 dagi osilish, chunki lokal stackda.",
              "`new` joy topolmasa, `std::bad_alloc` uloqtiradi. Ushlanmasa, dastur tugaydi. Aniq oynani va'da qilmaymiz. Misolarda kichik `int` so'raladi.",
            ],
            code: `int* p = new int(18);
delete p;
p = nullptr;`,
            codeLabel: "oldik, qaytardik, bo'shatdik",
          },
          {
            title: "new, new[], delete, delete[]",
            paragraphs: [
              "`new int` yozilmagan `int`. O'qish noma'lum. `new int(18)` 18 qo'yadi. `new int()` nol qo'yadi. Qavsli bo'sh `()` bilan qavssiz `new int` ni aralashtirmang.",
              "`new int[4]{8, 9, 7, 10}` to'rtta qiymat. `new int[4]` esa to'rttasini ham yozmasdan qoldiradi, o'qish noma'lum. `new int[4]()` to'rttasini nol qiladi. Qatorni `delete[]` qaytaradi. `delete` bilan `delete[]` ni almashtirish noma'lum.",
              "Stack massivi `int a[4]` chegarasi doimiy bo'lishi kerak. `new int[n]` da `n` ish paytidagi son bo'lishi mumkin. Sanoqni o'zingiz eslab qolasiz, ko'rsatkich uni saqlamaydi.",
            ],
            code: `int* a = new int[4]{8, 9, 7, 10};
delete[] a;
a = nullptr;`,
            codeLabel: "qator juftligi delete[]",
          },
          {
            title: "Oqish, ikki marta delete, stackka delete",
            paragraphs: [
              "Oqish: heapdagi blokning oxirgi manzilini yo'qotish. `p = new int(2);` eski `p` dagi birinchi blokni hech kim qaytarmaydi. `p` endi ikkinchisini ko'rsatadi. Birinchi javon band qoladi.",
              "Jarayon tugasa, tizim odatda butun jarayonning xotirasini yig'adi. Bu oqishni to'g'ri qilmaydi. Uzoq turadigan dasturda yo'qolgan blok qolaveradi. Har `new` ga o'z `delete`.",
              "`delete p; delete p;` ikkinchisi noma'lum. `delete` dan keyin `p = nullptr`. `delete nullptr` bo'sh ish, xavfsiz. Stackdagi `int yosh;` uchun `delete &yosh` noma'lum, u `new` dan kelmagan. `delete` faqat `new` juftiga, `delete[]` faqat `new[]` juftiga.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Heapdagi int 18, keyin 21, keyin bo'sh",
          intro: [
            "`new int(18)` javon oladi. `*p` oddiy ochish. `delete` javonni qaytaradi. `nullptr` qo'lda eskirgan kalit qoldirmaydi.",
          ],
          codeLabel: "bitta.cpp",
          code: `#include <iostream>

int main() {
    int* p = new int(18);
    std::cout << *p << "{{n}}";
    *p = 21;
    std::cout << *p << "{{n}}";
    delete p;
    p = nullptr;
    std::cout << (p == nullptr) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `18
21
1`,
          analysis: [
            {
              lines: "4-5",
              text: "`new int(18)` heapdan `int` oladi, 18 yozadi, manzilni `p` ga beradi. `*p` 18. Bu stackdagi lokal emas, `main` tugaguncha o'zi yo'qolmaydi.",
            },
            {
              lines: "6-7",
              text: "`*p = 21` heapdagi qutini yozadi. `p` dagi manzil o'sha. Ekranda 21.",
            },
            {
              lines: "8-10",
              text: "`delete p` shu `new` ni qaytaradi. Keyin `p = nullptr`. Endi `*p` yo'q, tekshiruv 1. `delete` dan keyin, `nullptr` dan oldin `*p` qilish osilgan manzil, noma'lum.",
            },
            {
              lines: "qavs",
              text: "`new int` qavssiz bo'lsa, ichi yozilmagan. `*p` noma'lum bo'lardi. `new int(18)` yoki `new int()` aniq. `delete` dan keyin ikkinchi `delete p` ham noma'lum. `nullptr` ikkinchisini bo'sh ish qiladi.",
            },
          ],
        },
        {
          title: "To'rtta element, yig'indi 34, delete[]",
          intro: [
            "Qator `new[]` bilan olinadi. Indeks 8-bobdagi kabi. Qaytarish `delete[]`. Yig'indi 8+9+7+10=34.",
          ],
          codeLabel: "qator.cpp",
          code: `#include <iostream>

int main() {
    int* a = new int[4]{8, 9, 7, 10};
    int yigindi = 0;
    for (int i = 0; i < 4; ++i) {
        yigindi += a[i];
    }
    std::cout << yigindi << "{{n}}";
    delete[] a;
    a = nullptr;
    std::cout << (a == nullptr) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `34
1`,
          analysis: [
            {
              lines: "4",
              text: "`new int[4]{...}` to'rtta `int`, qiymatlari 8, 9, 7, 10. `a` birinchi elementning manzili. Sanoq 4 ni ko'rsatkich saqlamaydi, sikl o'zi biladi.",
            },
            {
              lines: "6-8",
              text: "`a[i]` bu `*(a + i)`. To'rt qo'shish: 8+9=17, +7=24, +10=34. `i < 4`, to'xtashdan oshmaydi.",
            },
            {
              lines: "10-12",
              text: "`delete[]` qator juftligi. `delete a` bo'lsa, noma'lum, ishga tushirmaymiz. Keyin `nullptr`. Tekshiruv 1.",
            },
            {
              lines: "stack",
              text: "`int lokal[4] = {8, 9, 7, 10};` ham 34 berardi, lekin `delete[]` siz. U freym bilan ketadi. Heap qatori `delete[]` siz qoladi.",
            },
          ],
        },
        {
          title: "Funksiya kalitni qaytaradi, main javonni beradi",
          intro: [
            "`yasash` heapda 5 ochadi va manzilni qaytaradi. Freym ketadi, javon qoladi. `main` 5 ni o'qiydi, keyin `delete`.",
          ],
          codeLabel: "egasi.cpp",
          code: `#include <iostream>

int* yasash() {
    int* p = new int(5);
    return p;
}

int main() {
    int* son = yasash();
    std::cout << *son << "{{n}}";
    delete son;
    son = nullptr;
    std::cout << (son == nullptr) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `5
1`,
          analysis: [
            {
              lines: "4-5",
              text: "`new int(5)` heap. `p` stackdagi ko'rsatkich, ichida heap manzili. `return p` manzil raqamini nusxalaydi. `p` qutisi freym bilan ketadi, heapdagi 5 ketmaydi.",
            },
            {
              lines: "9-10",
              text: "`son` shu raqamning yangi nusxasi. `*son` 5. `yasash` tugagan, lekin javon tirik. `return &lokal` bo'lsa, javon emas, o'lik stack bo'lardi.",
            },
            {
              lines: "11-13",
              text: "Egasi `main`. `delete son` javonni qaytaradi. `nullptr` kalitni bo'shatadi. Ekranda 1. `delete` unutilsa, `son` freym bilan ketadi va yagona kalit yo'qoladi. Bu oqish.",
            },
            {
              lines: "juft",
              text: "Bitta `new` ga bitta `delete`. Qator bo'lsa `delete[]`. Boshqa funksiya ham `delete` qilsa, ikki marta bo'ladi, noma'lum. Egasini bitta joy qiling.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`int yosh = 18;` stack freymida 4 bayt. `main` yopilganda freym yig'iladi, bayt ketadi. `delete` kerak emas va yaroqsiz.",
          "`int* p = new int(18);` ikki joy. `p` stackda, 8 bayt, ichida heap manzili H. H da 4 baytlik `int`, ichi 18. `delete p` H ni qaytaradi. `p` stackda qoladi, ichida hali H raqami turishi mumkin, lekin H endi sizniki emas. `p = nullptr` stackdagi 8 baytni bo'sh qiymat qiladi. Keyingi `*p` yo'q.",
          "`new int[4]` H dan boshlab to'rtta `int`, 16 bayt. `delete[]` to'rtini ham qaytaradi. `delete` bitta obyekt shartnomasi, qatorga mos emas. Noto'g'ri juftlikdan keyin dasturning qolgani ham va'da qilinmaydi.",
          "Oqishda H dagi baytlar band qoladi, stackdagi `p` esa boshqa manzilga yoziladi yoki freym bilan yo'qoladi. H ni ko'rsatuvchi oxirgi nusxa ketgan. Qaytarib bo'lmaydi. Jarayon oxirida tizim ko'pincha hammasini yig'adi, lekin u vaqtgacha blok band. Ikkinchi `delete` esa allaqachon qaytarilgan H ni yana qaytarishga urinadi, bu noma'lum.",
        ],
        diagram: `stack, main freymi
  p [ H ]
  freym yopilsa p ketadi

heap
  H [18]  yoki  [8][9][7][10]
  delete / delete[] gacha turadi

oqish:
  p endi boshqa joyni ko'rsatadi
  birinchi H ni hech kim ushlamaydi

delete dan keyin p = nullptr
  H qaytgan
  p ichi: obyekt yo'q`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Heap xatosi juftlikni buzish yoki kalitni yo'qotish. Ba'zisi yig'iladi. Natija noma'lum yoki blok qaytmaydi.",
        ],
        items: [
          {
            title: "new[] ni delete bilan qaytarish",
            why: [
              "Qator `new[]` bilan olingan. Jufti `delete[]`. Bitta `delete` noma'lum. Bitta `new int` ning jufti esa `delete`, `delete[]` emas.",
            ],
            wrong: `int* a = new int[4]{8, 9, 7, 10};
delete a;`,
            right: `int* a = new int[4]{8, 9, 7, 10};
delete[] a;
a = nullptr;`,
          },
          {
            title: "Yagona kalitni yangi new bilan bosib ketish",
            why: [
              "Ikkinchi `new` manzilni `p` ga yozadi. Birinchi blokning manzili qo'lda qolmaydi. `delete` endi ikkinchisini ko'radi. Birinchisi oqish. Eski manzilni avval `delete` qiling yoki ikki ko'rsatkich ushlab turing.",
            ],
            wrong: `int* p = new int(1);
p = new int(2);`,
            right: `int* p = new int(1);
delete p;
p = new int(2);
delete p;
p = nullptr;`,
          },
          {
            title: "Stack manzilini delete qilish",
            why: [
              "`yosh` freymdagi lokal. `delete &yosh` uni `new` deb o'qiydi. Bu noma'lum. `delete` faqat `new` qaytargan manzilga. Lokal o'zi freym bilan ketadi.",
            ],
            wrong: `int yosh = 18;
delete &yosh;`,
            right: `int* p = new int(18);
delete p;
p = nullptr;`,
          },
        ],
      },
      quiz: [
        {
          id: "9.6-q1",
          question: "`int* a = new int[4]{8, 9, 7, 10};` ni nima qaytaradi?",
          options: ["delete a", "delete[] a", "hech narsa, stack yig'adi", "faqat p = nullptr"],
          answer: 1,
          explanation:
            "new[] jufti delete[]. delete a noma'lum. nullptr o'zi javonni qaytarmaydi, u delete dan keyin qo'yiladi.",
        },
        {
          id: "9.6-q2",
          question: "`p = new int(1);` dan keyin `delete` siz `p = new int(2);` bo'lsa, birinchi int nima bo'ladi?",
          options: [
            "ikkinchi new uni ham o'chiradi",
            "manzili yo'qoladi, xotira oqishi",
            "kod yig'ilmaydi",
            "stack uni funksiya oxirida qaytaradi",
          ],
          answer: 1,
          explanation:
            "p endi ikkinchi blokni ko'rsatadi. Birinchi blokning kaliti yo'q. Heap o'zi freym bilan tozalanmaydi.",
        },
        {
          id: "9.6-q3",
          question: "Lokal `int` va `new int` qachon ketadi?",
          options: [
            "ikkalasi ham blok tugashi bilan",
            "lokal blok bilan, heap esa delete bilan",
            "ikkalasi ham faqat delete bilan",
            "ikkalasi ham hech qachon ketmaydi",
          ],
          answer: 1,
          explanation:
            "Stack freymi yopilganda lokal ketadi. Heap blok delete gacha turadi. new ni delete siz tashlab yuborish oqish.",
        },
      ],
    },
  ],
};

export const chapter9 = decode(rawChapter);
