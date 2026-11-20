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
  id: "11",
  number: 11,
  title: "Obyektga Yo'naltirilgan Dasturlash - OOP",
  summary:
    "Chizma va tayyor obyekt, kirish huquqi, yopiq maydon, konstruktor, this, vorislik va virtual chaqiruv.",
  lessons: [
    {
      id: "11.1",
      navTitle: "Klass va obyekt",
      title: "Klass chizma, obyekt shu chizmadan chiqqan buyum",
      goal: [
        "Bu darsdan keyin siz `class` ni yangi tur, ya'ni chizma deb, obyektni shu turdan xotirada ochilgan tayyor buyum deb ajratasiz. Maydon obyektga tegishli, metod esa shu obyekt ustida ishlaydigan funksiya. Ikki obyektning maydoni alohida bo'lishini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Chizma varaqda «talaba anketa» chizilgan: yosh qatori va salomlashish tartibi. Chizmaning o'zi hali odam emas. Sexdan chiqqan birinchi anketa `ali`, ikkinchisi `vali`. Ikkalasi bitta chizmadan, lekin ikki qog'oz.",
          "`ali` ning yoshiga 18 yozsangiz, `vali` ning qog'ozi o'zgarmaydi. Salomlashish tartibi chizmada bir marta yozilgan. Har bir anketa shu tartibni o'ziga qo'llaydi.",
          "10-bobdagi `struct` ham tur edi. `class` ham tur. Farq shuki, `class` ichi sukutda yopiq. Bu darsdagi misollar `public` deb ochilgan, shuning uchun `main` kira oladi. Yopiq xona 11.2 da.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`class` yangi tur ochadi. Obyekt shu turdan e'lon qilinganda tug'iladi. Nuqta maydonni yoki metodni tanlaydi. Turdan keyin nuqta-vergul shart, xuddi `struct` dagi kabi.",
        ],
        items: [
          {
            title: "Chizma va buyum",
            paragraphs: [
              "`class Talaba { ... };` faqat tur. Xotirada hali `yosh` yo'q. `Talaba ali;` bitta obyekt ochadi. `Talaba vali;` ikkinchi obyekt.",
              "`ali.yosh = 18` shu obyektning maydoniga yozadi. `ali.salom()` shu obyekt ustida metodni chaqiradi. `Talaba.yosh` yig'ilmaydi: chizmaning o'zida yosh qutisi yo'q.",
              "Metod oddiy funksiya, lekin qaysi obyekt chaqirganini biladi. 11.5 da bu `this` ko'rsatkichi. Hozircha chaqiruv `obyekt.metod()` ko'rinishida.",
            ],
            code: `class Talaba {
public:
    int yosh;
    void salom();
};

void Talaba::salom() {
    std::cout << "salom{{n}}";
}`,
            codeLabel: "e'lon klassda, tana tashqarida",
          },
          {
            title: "Maydon obyektniki, kod bitta",
            paragraphs: [
              "Har bir obyektda o'z `yosh` qutisi bor. `ali.yosh` va `vali.yosh` ikki joy. Birini yozish ikkinchisini yozmaydi.",
              "Metodning mashina kodi obyekt ichiga nusxalanmaydi. Ikki talaba ham bitta `salom` kodini chaqiradi. Qaysi anketaga yozish kerakligini chaqiruv aytadi.",
              "Bitta `int` li klassning `sizeof` i shu kitobdagi Windowsda odatda 4. Bu `int` ning o'lchami. Klass nomi `sizeof(Talaba)` da tur sifatida turadi, yangi `ali` ochilmaydi.",
            ],
            code: `Talaba ali;
Talaba vali;
ali.yosh = 18;
vali.yosh = 19;`,
            codeLabel: "ikki obyekt, ikki maydon",
          },
          {
            title: "Bo'sh klass ham joy oladi",
            paragraphs: [
              "Maydonsiz klassning obyekti 0 bayt bo'lmaydi. Ikki obyektning manzili farq qilishi kerak. Shu kitobdagi Windowsda bo'sh klass odatda 1 bayt. Til «kamida 1» deydi, aniq 1 ni qat'iy yozmaydi.",
              "Maydon qo'shsangiz, o'sha maydon obyekt ichida yotadi. `public` yozilmasa, `class` da maydon sukutda `private` va `main` dan ko'rinmaydi. `struct` da sukut `public`, 10.1.",
              "Lokal obyekt blok tugaganda o'ladi. Maydonlar ham shu bilan ketadi. 11.4 da shu o'limga destruktor yopishib turadi.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Chizmadan bitta anketa, yosh 18",
          intro: [
            "`Talaba` tur. `ali` obyekt. Yoshga 18 yoziladi, keyin `salom` shu obyektda chaqiriladi.",
          ],
          codeLabel: "salom.cpp",
          code: `#include <iostream>

class Talaba {
public:
    int yosh;
    void salom() {
        std::cout << "salom{{n}}";
    }
};

int main() {
    Talaba ali;
    ali.yosh = 18;
    std::cout << ali.yosh << "{{n}}";
    ali.salom();
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `18
salom`,
          analysis: [
            {
              lines: "3-9",
              text: "Tur ochiladi. `yosh` maydon, `salom` metod. 9-qatordagi nuqta-vergul turni yopadi. Hali obyekt yo'q, 18 ham yo'q.",
            },
            {
              lines: "12-13",
              text: "`ali` bitta `Talaba` obyekti. `ali.yosh = 18` shu obyektning maydoniga yozadi. `Talaba.yosh` deb yozib bo'lmaydi.",
            },
            {
              lines: "14",
              text: "`ali.yosh` o'sha qutini o'qiydi. Ekranda 18.",
            },
            {
              lines: "15",
              text: "`ali.salom()` 6-qatordagi metodni shu obyekt ustida chaqiradi. Ekranda salom. Metod `yosh` ni o'zgartirmaydi.",
            },
          ],
        },
        {
          title: "Ikki anketa, ikki yosh",
          intro: [
            "`ali` ga 18, `vali` ga 19. Birining maydoni ikkinchisiga tegmaydi.",
          ],
          codeLabel: "ikki.cpp",
          code: `#include <iostream>

class Talaba {
public:
    int yosh;
};

int main() {
    Talaba ali;
    Talaba vali;
    ali.yosh = 18;
    vali.yosh = 19;
    std::cout << ali.yosh << "{{n}}";
    std::cout << vali.yosh << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `18
19`,
          analysis: [
            {
              lines: "3-6",
              text: "Turda bitta `int` maydon bor. Bu hali ikkita odam emas. `public` bo'lmasa, keyingi `main` maydonga kira olmaydi.",
            },
            {
              lines: "9-10",
              text: "Ikki obyekt. Har birida o'z `yosh` qutisi. Hali ikkalasiga ham son yozilmagan. Yozmasdan o'qish noma'lum, xuddi lokal `int` kabi.",
            },
            {
              lines: "11-12",
              text: "18 faqat `ali` ga. 19 faqat `vali` ga. Chizma bitta, qutilar ikkita.",
            },
            {
              lines: "13-14",
              text: "Ekranda 18, keyin 19. `vali.yosh = 19` `ali` ni 19 qilmagan.",
            },
          ],
        },
        {
          title: "sizeof turdan, obyekt alohida",
          intro: [
            "`sizeof(Talaba)` chizmaning odatdagi o'lchami. Keyin `ali` ochiladi va yoshiga 18 yoziladi.",
          ],
          codeLabel: "olcham.cpp",
          code: `#include <iostream>

class Talaba {
public:
    int yosh;
};

int main() {
    std::cout << sizeof(Talaba) << "{{n}}";
    Talaba ali;
    ali.yosh = 18;
    std::cout << ali.yosh << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `4
18`,
          analysis: [
            {
              lines: "3-6",
              text: "Bitta `int`. Shu kitobda `int` 4 bayt. Virtual funksiya yo'q, yashirin ko'rsatkich ham yo'q. `sizeof` odatda 4.",
            },
            {
              lines: "9",
              text: "Tur nomi obyekt ochmaydi. Ekranda 4. Bu shu kitobdagi Windows odat. Boshqa muhitda `int` o'lchami boshqacha bo'lishi mumkin, lekin bu kursda u 4.",
            },
            {
              lines: "10-11",
              text: "Endi bitta obyekt bor. 18 shu obyektning maydoniga yoziladi. `sizeof` qatori yangi talaba ochmagan.",
            },
            {
              lines: "12",
              text: "Ekranda 18. Maydon yozilmagan bo'lsa, bu o'qish noma'lum bo'lardi. `sizeof` ichki axlatni o'qimaydi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`class Talaba` kompilyatorga tur beradi. U RAM da `ali` degan quti ochmaydi. `Talaba ali;` deganda stekda bitta obyekt joyi ajraladi. Bitta `int` bo'lsa, odatda 4 bayt, ichida hali yozilmagan qiymat.",
          "`ali.yosh = 18` o'sha 4 baytga 18 yozadi. `Talaba vali;` boshqa 4 bayt. `vali.yosh = 19` ikkinchi bo'lakka yozadi. Birinchi bo'lakdagi 18 qoladi.",
          "`salom` kodi obyektning 4 baytiga qo'shilmaydi. Chaqiruv `ali` ning manzilini metodga beradi. Shuning uchun ikkita obyekt ham bitta metod kodini ishlatadi, maydonlari esa aralashmaydi.",
          "Maydonsiz klassning obyekti 0 bayt emas. Manzillar teng bo'lib qolmasligi uchun odatda 1 bayt qo'yiladi. Maydon qo'shilsa, o'sha baytlar maydonniki. Blok tugaganda obyekt joyi ham tugaydi.",
        ],
        diagram: `class Talaba        tur, RAM da anketa yo'q

ali, manzil A
  yosh [18]   4 bayt

vali, manzil B
  yosh [19]   boshqa 4 bayt

salom kodi bitta
  ali.salom() A ni ko'radi
  vali.salom() B ni ko'radi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Klass xatosi chizmani obyekt deb chaqirish, nuqta-vergulni tashlab ketish yoki ikki obyekt bitta maydonni bo'lishadi deb o'ylash.",
        ],
        items: [
          {
            title: "Tur nomidan maydon o'qish",
            why: [
              "`Talaba` tur. Unda tayyor `yosh` qutisi yo'q. Avval obyekt ochiladi, keyin nuqta shu obyektning maydonini tanlaydi.",
            ],
            wrong: `Talaba.yosh = 18;`,
            right: `Talaba ali;
ali.yosh = 18;`,
          },
          {
            title: "Klassdan keyin nuqta-vergul yo'q",
            why: [
              "Tur e'loni nuqta-vergul bilan tugaydi. Tushib qolsa, keyingi `int main` turni davom ettirayotgandek o'qiladi va yig'ilish to'xtaydi.",
            ],
            wrong: `class Talaba {
public:
    int yosh;
}`,
            right: `class Talaba {
public:
    int yosh;
};`,
          },
          {
            title: "Ikki obyektni bitta quti deb o'ylash",
            why: [
              "`vali.yosh = 19` faqat `vali` ning maydoni. `ali.yosh` 18 da qoladi. Umumiy bo'ladigan narsa metod kodi, maydon emas.",
            ],
            wrong: `ali.yosh = 18;
vali.yosh = 19;
std::cout << ali.yosh << "{{n}}";`,
            right: `ali.yosh = 18;
vali.yosh = 19;
std::cout << ali.yosh << "{{n}}";
std::cout << vali.yosh << "{{n}}";`,
          },
        ],
      },
      quiz: [
        {
          id: "11.1-q1",
          question: "`Talaba ali;` qatorida chizma, ya'ni klass qaysi?",
          options: ["ali", "Talaba", "yosh", "main"],
          answer: 1,
          explanation:
            "Talaba tur, chizma. ali shu turdan ochilgan obyekt. yosh maydon, u obyekt ichida.",
        },
        {
          id: "11.1-q2",
          question: "`ali.yosh = 18;` keyin `vali.yosh = 19;`. `ali.yosh` necha?",
          options: ["18", "19", "0", "kod yig'ilmaydi"],
          answer: 0,
          explanation:
            "Ikki obyektning maydoni alohida. vali ga 19 yozish ali dagi 18 ni almashtirmaydi.",
        },
        {
          id: "11.1-q3",
          question: "Bitta `int` maydonli klassning `sizeof` i shu kitobdagi Windowsda odatda necha?",
          options: ["0", "1", "4", "8"],
          answer: 2,
          explanation:
            "Maydon bitta int, 4 bayt. Virtual funksiya yo'q. Bo'sh klass esa 0 emas, odatda 1. sizeof turdan so'raydi, yangi obyekt ochmaydi.",
        },
      ],
    },
    {
      id: "11.2",
      navTitle: "public private",
      title: "public, private va protected: kim ko'ra oladi",
      goal: [
        "Bu darsdan keyin siz `public`, `private` va `protected` ni kompilyator tekshiradigan eshik deb ochasiz. `class` sukutda yopiq, `struct` sukutda ochiq. `private` maydon obyekt ichida yotishini, lekin `main` dan nuqta bilan ko'rinmasligini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Do'konda peshtaxta `public`: xaridor pul qo'yadi va qolgan summani so'raydi. Kassa qutisi `private`: xaridor qutini ochib sanamaydi. Sotuvchi, ya'ni klassning o'z metodi, kassani ochadi.",
          "`protected` oraliq xona. Ko'chadagi odam kirmaydi. Shu do'konning filiali, bola klass, o'z xodimi orqali kira oladi. Filial ham kassani ko'chaga ochib qo'ymaydi.",
          "Qulf kodni ishlatish vaqtida emas, yig'ish vaqtida turadi. `private` son xotiradan o'chib ketmaydi. U yerda yotadi, tashqi kod uni nom bilan yoza olmaydi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Huquq so'zi o'zidan keyingi a'zolarga ta'sir qiladi, keyingi huquq so'zi kelguncha. `class` da birinchi a'zo sukutda `private`. `struct` da sukutda `public`.",
        ],
        items: [
          {
            title: "Uchta eshik",
            paragraphs: [
              "`public` ni obyekt bor joydan chaqirish mumkin: `h.qoy(100)`. `private` ni faqat shu klassning metodlari ko'radi. `main` dagi `h.pul` yig'ilmaydi.",
              "`protected` tashqaridan `private` ga o'xshaydi: `main` kira olmaydi. Farq vorislikda. `public` voris bo'lgan bola klass o'z metodida `protected` maydonni ko'radi. `private` maydonni bola ham nom bilan ko'rmaydi. Maydon baribir obyekt ichida yotadi.",
              "Huquq xotira joyini o'zgartirmaydi. `private int` ham obyektning bayti. `sizeof` uni ham hisoblaydi.",
            ],
            code: `class Hisob {
public:
    void qoy(int summa);
    int ol() const;
private:
    int pul;
};`,
            codeLabel: "ochiq metod, yopiq maydon",
            table: {
              caption: "public vorislikda kim ko'radi. Boshqa vorislik turi eshikni yanada yopadi.",
              headers: ["Ota a'zo", "Bola metodida", "main da"],
              rows: [
                ["public", "ko'rinadi", "ko'rinadi"],
                ["protected", "ko'rinadi", "ko'rinmaydi"],
                ["private", "nom bilan yo'q", "ko'rinmaydi"],
              ],
            },
          },
          {
            title: "class va struct sukuti",
            paragraphs: [
              "`struct Ochiq { int son; };` da `son` ochiq. `a.son = 7` yig'iladi. 10-bob shu sukut bilan yurgan.",
              "`class Yopiq { int son; };` da `son` yopiq. `b.son = 8` yig'ilmaydi. Metod orqali yozish uchun `public` bo'lim ochiladi.",
              "`public:` qayerda tursa, undan keyingi a'zolar ochiq. Undan oldingi `int son` yopiq bo'lib qoladi. Tartib xotira tartibi ham: maydonlar yozilgan tartibda yotadi, huquq so'zi ularni aralashtirmaydi.",
            ],
            code: `struct Ochiq {
    int son;
};

class Yopiq {
    int son;
public:
    void yoz(int qiymat);
};`,
            codeLabel: "struct ochiq, class yopiq",
          },
          {
            title: "protected bola uchun",
            paragraphs: [
              "`protected` maydonni bola klass `return sir;` deb o'qiy oladi. `main` dagi `b.sir` yig'ilmaydi. Bola ham ota `private` maydonning nomini yoza olmaydi.",
              "Bu darsda bola `: public Ota` bilan ochiladi. `class Bola : Ota` desangiz, `class` da vorislik sukutda `private` bo'ladi va tashqaridagi `b.yoz` ham yashirinadi. `public` so'zini qo'ying. To'liq vorislik 11.6 da.",
              "Huquqni aylanib o'tish uchun ko'rsatkich hiylasi o'ylab topmang. Kompilyator to'sib qo'ygan maydonni o'qish dastur shartnomasi emas. Kerakli amalni `public` metodga qo'ying.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Pul yopiq, qoy va ol ochiq",
          intro: [
            "`main` pulni to'g'ridan yozmaydi. `qoy(100)` yozadi, `ol()` o'qiydi. Ekranda 100.",
          ],
          codeLabel: "hisob.cpp",
          code: `#include <iostream>

class Hisob {
public:
    void qoy(int summa) {
        pul = summa;
    }
    int ol() const {
        return pul;
    }
private:
    int pul;
};

int main() {
    Hisob h;
    h.qoy(100);
    std::cout << h.ol() << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `100`,
          analysis: [
            {
              lines: "3-13",
              text: "`qoy` va `ol` ochiq. `pul` yopiq. Yopiq bo'lishi uni obyektdan o'chirmaydi. `qoy` ichidan `pul` ko'rinadi, chunki metod shu klassniki.",
            },
            {
              lines: "16-17",
              text: "`h` obyekt. `h.qoy(100)` yopiq maydonga 100 yozadi. `h.pul = 100` shu yerda yig'ilmaydi.",
            },
            {
              lines: "18",
              text: "`h.ol()` nusxa qilib 100 qaytaradi. Ekranda 100. `const` metod maydonni yozmasligini va'da qiladi, 11.3.",
            },
            {
              lines: "12",
              text: "`pul` ga `qoy` dan oldin qiymat yozilmagan. Yozmasdan `ol()` qilsak, o'qish noma'lum. `private` nol qo'yib bermaydi.",
            },
          ],
        },
        {
          title: "struct ochiq, class sukutda yopiq",
          intro: [
            "`Ochiq` da maydonni `main` yozadi. `Yopiq` da maydon metod orqali yoziladi. Ekranda 7, keyin 8.",
          ],
          codeLabel: "sukut.cpp",
          code: `#include <iostream>

struct Ochiq {
    int son;
};

class Yopiq {
    int son;
public:
    void yoz(int qiymat) {
        son = qiymat;
    }
    int oqi() const {
        return son;
    }
};

int main() {
    Ochiq a;
    a.son = 7;
    Yopiq b;
    b.yoz(8);
    std::cout << a.son << "{{n}}";
    std::cout << b.oqi() << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `7
8`,
          analysis: [
            {
              lines: "3-5",
              text: "`struct` ichi sukutda `public`. `son` ochiq. Alohida `public` yozilmagan.",
            },
            {
              lines: "7-16",
              text: "`class` ichi sukutda `private`. 8-qatordagi `son` yopiq, chunki `public` dan oldin turibdi. `yoz` va `oqi` ochiq.",
            },
            {
              lines: "19-22",
              text: "`a.son = 7` yig'iladi. `b.son = 8` yig'ilmaydi, shuning uchun `b.yoz(8)`. Ikkala obyekt ham o'z `son` ini ushlaydi.",
            },
            {
              lines: "23-24",
              text: "Ekranda 7, keyin 8. Yopiq maydon ham joy oladi. `oqi` shu joyni qaytaradi.",
            },
          ],
        },
        {
          title: "protected ni bola o'qiydi, main yo'q",
          intro: [
            "`sir` `protected`. `Bola::ol` uni ko'radi. `main` faqat ochiq `yoz` va `ol` ni chaqiradi. Ekranda 4.",
          ],
          codeLabel: "himoya.cpp",
          code: `#include <iostream>

class Ota {
protected:
    int sir;
public:
    void yoz(int qiymat) {
        sir = qiymat;
    }
};

class Bola : public Ota {
public:
    int ol() const {
        return sir;
    }
};

int main() {
    Bola b;
    b.yoz(4);
    std::cout << b.ol() << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `4`,
          analysis: [
            {
              lines: "3-10",
              text: "`sir` himoyalangan. `yoz` ochiq va ota metodida `sir` ko'rinadi. `main` dan `sir` ko'rinmaydi.",
            },
            {
              lines: "12-17",
              text: "`: public Ota` ochiq vorislik. `ol` bola metodi, shuning uchun `sir` ni o'qiy oladi. `sir` `private` bo'lsa, 15-qator yig'ilmaydi.",
            },
            {
              lines: "20-21",
              text: "`b.yoz(4)` ota metodini chaqiradi va `sir` ga 4 yozadi. `b.sir = 4` yig'ilmaydi.",
            },
            {
              lines: "22",
              text: "`b.ol()` himoyalangan maydonni qaytaradi. Ekranda 4. Bola maydonni ko'chaga ochiq qoldirmaydi, metod orqali beradi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`Hisob h;` obyekt ochiladi. `pul` shu obyektning 4 bayti. `private` bu baytni RAM dan yashirmaydi. U yozuvni `main` matnida `h.pul` deb yozishni taqiqlaydi.",
          "`h.qoy(100)` klass metodi. Metod ichida `pul` nomi o'sha 4 bayt. 100 shu yerga yoziladi. `h.ol()` baytni o'qiydi va 100 ni nusxa qilib qaytaradi.",
          "`protected int sir` ham bola obyektining ichida, ota qismida yotadi. `Bola::ol` shu baytni o'qish huquqiga ega. `main` dagi kod esa nom orqali yo'l olmaysiz. Huquq kompilyator jadvali, jarayon paytidagi parol emas.",
          "`struct` va `class` ning sukuti faqat shu jadvalni o'zgartiradi. Ikkalasida ham `int` odatda 4 bayt. Yopiq qilish `sizeof` ni kichraytirmaydi.",
        ],
        diagram: `Hisob h
  pul [100]     joyda bor
  main: h.pul   nom taqiqlangan
  h.qoy / h.ol  ochiq yo'l

Bola b
  ota qismi: sir [4]   protected
  Bola::ol shu baytni o'qiydi
  main: b.sir yig'ilmaydi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Huquq xatosi yopiq maydonni `main` dan yozish, `class` sukutini `struct` deb o'ylash yoki `protected` ni ko'cha eshigi deb ishlatish.",
        ],
        items: [
          {
            title: "private maydonni main dan yozish",
            why: [
              "`pul` yopiq. Obyektda joyi bor, lekin `h.pul` yig'ilmaydi. Yozish ochiq metod orqali.",
            ],
            wrong: `Hisob h;
h.pul = 100;`,
            right: `Hisob h;
h.qoy(100);`,
          },
          {
            title: "class ichini struct kabi ochiq deb o'ylash",
            why: [
              "`class` da `public` dan oldin turgan maydon yopiq. `struct` da xuddi shu yozuv ochiq bo'lardi. Sukut bir xil emas.",
            ],
            wrong: `class Yopiq {
    int son;
};
Yopiq b;
b.son = 8;`,
            right: `class Yopiq {
    int son;
public:
    void yoz(int qiymat) { son = qiymat; }
};
Yopiq b;
b.yoz(8);`,
          },
          {
            title: "protected ni main ga ochiq deb o'qish",
            why: [
              "`protected` bola metodiga ochiq, `main` ga emas. `b.sir` yig'ilmaydi. O'qish kerak bo'lsa, bola yoki ota `public` metod qaytaradi.",
            ],
            wrong: `Bola b;
b.yoz(4);
std::cout << b.sir << "{{n}}";`,
            right: `Bola b;
b.yoz(4);
std::cout << b.ol() << "{{n}}";`,
          },
        ],
      },
      quiz: [
        {
          id: "11.2-q1",
          question: "`pul` `private`. `main` ichida `h.pul` nima qiladi?",
          options: ["100 chiqaradi", "0 chiqaradi", "maydonni o'chiradi", "kod yig'ilmaydi"],
          answer: 3,
          explanation:
            "private nom main dan ko'rinmaydi. pul obyekt ichida yotadi. Yo'l ochiq metod: qoy va ol.",
        },
        {
          id: "11.2-q2",
          question: "Hech qanday huquq so'zi yozilmasa, maydon sukutda qayerda ochiq?",
          options: ["class da", "struct da", "ikkalasida ham", "hech qayerda"],
          answer: 1,
          explanation:
            "struct sukutda public. class sukutda private. 10-bobdagi struct maydoni shuning uchun main dan ko'ringan.",
        },
        {
          id: "11.2-q3",
          question: "`sir` `protected` va `Bola : public Ota`. `main` dagi `b.sir` nima qiladi?",
          options: ["4 ni o'qiydi", "0 ni o'qiydi", "kod yig'ilmaydi", "sir ni o'chiradi"],
          answer: 2,
          explanation:
            "protected tashqariga yopiq. Bola metodi sir ni ko'radi. main ko'rmaydi. public vorislik buni ko'chaga ochmaydi.",
        },
      ],
    },
    {
      id: "11.3",
      navTitle: "Getter va setter",
      title: "Inkapsulyatsiya: maydon yopiq, tekshiruv metodda",
      goal: [
        "Bu darsdan keyin siz inkapsulyatsiyani yopiq maydon va shu maydonni bitta yo'ldan o'tkazadigan metod deb tushunasiz. Setter yozishdan oldin tekshiradi. Getter o'qiydi va `const` bo'lsa, o'zgartirmaslikni va'da qiladi.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Anketa yoshi qalam bilan ochiq qoldirilsa, kimdir −3 yozib qo'yishi mumkin. Yaxshisi yosh katakchasi yopiq, qabul oynasi bor. Oyna manfiy sonni qaytarib beradi, 18 ni esa daftar ichiga yozadi.",
          "So'rash oynasi faqat o'qiydi. U daftardagi sonning nusxasini beradi. Siz nusxadagi qog'ozga 99 yozsangiz, daftar ichidagi 18 o'zgarmaydi.",
          "Ertaga daftar yoshni oy hisobida saqlashi mumkin. Oyna baribir yilni aytadi. Tashqi kod katakka emas, oynaga bog'langan. Shu yashirish inkapsulyatsiya.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Maydon `private`. Yozadigan metod setter, o'qiydigan metod getter. Tekshiruv bitta joyda turadi. Tashqi kod maydonni aylanib o'tolmaydi.",
        ],
        items: [
          {
            title: "Setter rad etishi mumkin",
            paragraphs: [
              "`yoshYoz` yangi sonni darrov maydonga qo'ymaydi. `yangi < 0` bo'lsa, `return` metoddan chiqadi. Eski qiymat qoladi.",
              "Rad etish nol yozmaydi. Maydon ilgari 18 bo'lsa, 18 qoladi. Hech qachon muvaffaqiyatli yozilmagan bo'lsa, maydon hali ham yozilmagan. Uni o'qish noma'lum. Boshlang'ich qiymat konstruktor ishi, 11.4.",
              "Setter `public`. Maydon `private`. Ikkalasi ham `public` bo'lsa, `ali.yosh_ = -3` tekshiruvni tashlab ketadi. Qulfning ma'nosi qolmaydi.",
            ],
            code: `void yoshYoz(int yangi) {
    if (yangi < 0) {
        return;
    }
    yosh_ = yangi;
}`,
            codeLabel: "manfiy son yozilmaydi",
          },
          {
            title: "Getter va const",
            paragraphs: [
              "`int yosh() const` maydonni o'qiydi va `int` nusxa qaytaradi. `const` shu metod obyektni yozmasligini bildiradi.",
              "`const Talaba nusxa` ustida faqat `const` metod ishlaydi. `yosh()` dan `const` olib tashlansa, `nusxa.yosh()` yig'ilmaydi. O'qish obyektni o'zgartirmasligi kerak.",
              "Qaytgan `int` maydonning o'zi emas. `int n = ali.yosh(); n = 99;` faqat `n` ni yozadi. `ali` ichidagi son tegilmaydi. Havola qaytarmasangiz, tashqi kod maydonni taxallus qila olmaydi.",
            ],
            code: `int yosh() const {
    return yosh_;
}`,
            codeLabel: "o'qiydi, yozmaydi",
          },
          {
            title: "Ichki ko'rinish yashirin",
            paragraphs: [
              "Tashqi kod `yosh()` ni chaqiradi. Maydon nomi `yosh_` bo'lishi, ichkarida boshqa birlik saqlanishi mumkin. Chaqiruv o'zgarmaydi, klass ichi o'zgaradi.",
              "Bu shartnoma. Getter har safar maydonni ko'rsatib berishi shart emas, lekin aytgan soni obyektning haqiqiy holatiga mos bo'lishi kerak. Setter yolg'on holatni ichkariga qo'ymasligi kerak.",
              "`const` bo'lmagan getter ham yig'iladi, lekin oddiy o'qishda uni qo'ymang. Keyin `const` obyekt va `const` havola ishlamay qoladi.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "Manfiy yosh rad etiladi, 18 qoladi",
          intro: [
            "Avval 18 yoziladi. Keyin −3 setterdan qaytadi. Ikkinchi o'qish ham 18.",
          ],
          codeLabel: "yosh.cpp",
          code: `#include <iostream>

class Talaba {
public:
    void yoshYoz(int yangi) {
        if (yangi < 0) {
            return;
        }
        yosh_ = yangi;
    }
    int yosh() const {
        return yosh_;
    }
private:
    int yosh_;
};

int main() {
    Talaba ali;
    ali.yoshYoz(18);
    std::cout << ali.yosh() << "{{n}}";
    ali.yoshYoz(-3);
    std::cout << ali.yosh() << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `18
18`,
          analysis: [
            {
              lines: "5-10",
              text: "Setter. 6-qator manfiyni ushlaydi, 7-qator metoddan chiqadi, 9-qator yugurmaydi. 0 va musbat son 9-qatorda yoziladi.",
            },
            {
              lines: "11-13",
              text: "Getter `const`. `yosh_` ni qaytaradi, yozmaydi. Maydon `private`, `main` uni to'g'ridan o'zgartira olmaydi.",
            },
            {
              lines: "20-21",
              text: "`yoshYoz(18)` tekshiruvdan o'tadi. Maydonda 18. Ekranda 18.",
            },
            {
              lines: "22-23",
              text: "`yoshYoz(-3)` 7-qatorda qaytadi. Maydon 18 da qoladi. Ekranda yana 18. Rad etish 0 yozmagan.",
            },
          ],
        },
        {
          title: "const obyekt faqat const metodni chaqiradi",
          intro: [
            "`nusxa` o'zgarmas obyekt. `yosh()` `const` bo'lgani uchun chaqiruv yig'iladi. Ekranda 18.",
          ],
          codeLabel: "const.cpp",
          code: `#include <iostream>

class Talaba {
public:
    void yoshYoz(int yangi) {
        yosh_ = yangi;
    }
    int yosh() const {
        return yosh_;
    }
private:
    int yosh_;
};

int main() {
    Talaba ali;
    ali.yoshYoz(18);
    const Talaba nusxa = ali;
    std::cout << nusxa.yosh() << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `18`,
          analysis: [
            {
              lines: "5-7",
              text: "`yoshYoz` `const` emas. U maydonni yozadi. `const` obyekt bunday metodni chaqira olmaydi.",
            },
            {
              lines: "8-10",
              text: "`const` getter yozmaslikni va'da qiladi. `const` obyekt shuni chaqira oladi.",
            },
            {
              lines: "16-18",
              text: "`ali` ga 18 yoziladi. `nusxa = ali` yangi obyekt, maydon nusxasi 18. `nusxa` ni keyin yozib bo'lmaydi.",
            },
            {
              lines: "19",
              text: "`nusxa.yosh()` yig'iladi va 18 chiqaradi. `yosh()` dan `const` ni olsak, shu qator yig'ilmaydi. `nusxa.yoshYoz(19)` ham yig'ilmaydi.",
            },
          ],
        },
        {
          title: "Getter nusxa beradi, maydon 18 qoladi",
          intro: [
            "`n` ga 99 yoziladi. `ali` ichidagi yosh 18 bo'lib turadi.",
          ],
          codeLabel: "nusxa.cpp",
          code: `#include <iostream>

class Talaba {
public:
    void yoshYoz(int yangi) {
        yosh_ = yangi;
    }
    int yosh() const {
        return yosh_;
    }
private:
    int yosh_;
};

int main() {
    Talaba ali;
    ali.yoshYoz(18);
    int n = ali.yosh();
    n = 99;
    std::cout << n << "{{n}}";
    std::cout << ali.yosh() << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `99
18`,
          analysis: [
            {
              lines: "8-10",
              text: "`return yosh_` `int` ni nusxalaydi. Qaytgan son maydonning taxallusi emas. Havola bo'lsa, tashqi kod ichkarini yozishi mumkin edi.",
            },
            {
              lines: "17-18",
              text: "Maydonda 18. `n` shu 18 ning nusxasi, alohida lokal `int`.",
            },
            {
              lines: "19-20",
              text: "`n = 99` faqat lokalni yozadi. Ekranda 99. `ali` ning baytiga tegilmagan.",
            },
            {
              lines: "21",
              text: "`ali.yosh()` yana maydonni o'qiydi. Ekranda 18. Getter orqali olgan sonni o'zgartirish setter emas.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`Talaba ali;` obyekt ochiladi. `yosh_` shu obyektning 4 bayti. `private` baytni o'chirmaydi. `yoshYoz(18)` tekshiruvdan o'tib, o'sha 4 baytga 18 yozadi.",
          "`yoshYoz(-3)` shart rost. `return` funksiyadan chiqadi, 7-bobdagi kabi. Yozish qatori yugurmaydi. 4 bayt ichida 18 qoladi. Hech qanday yangi nol paydo bo'lmaydi.",
          "`int n = ali.yosh();` yangi lokal 4 bayt ochadi va 18 ni ko'chiradi. `n = 99` lokalni yozadi. Obyekt bayti 18 da turadi. Getter `const` bo'lgani uchun metod ichida ham shu baytga yozish yig'ilmaydi.",
          "`const Talaba nusxa = ali;` ikkinchi obyekt. Uning `yosh_` baytiga 18 ko'chiriladi. `const` shu ikkinchi obyektni keyingi yozuvlardan saqlaydi. Birinchi `ali` o'zgarmas emas, uni setter bilan yozish mumkin.",
        ],
        diagram: `ali
  yosh_ [18]

yoshYoz(-3)
  return, baytga tegmaydi
  yosh_ [18]

int n = ali.yosh()
  n [18] alohida
  n = 99
  yosh_ hali [18]

nusxa, const
  yosh_ [18]  ikkinchi obyekt`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Inkapsulyatsiya xatosi maydonni ham ochiq qoldirish, getterdan `const` ni unutish yoki rad etilgan yozuv maydonni nol qiladi deb o'qish.",
        ],
        items: [
          {
            title: "Maydonni ham public qilish",
            why: [
              "Setter manfiyni rad etadi. Maydon `public` bo'lsa, `ali.yosh_ = -3` setterni chaqirmaydi. Tekshiruv aylanib o'tiladi. Maydon yopiq turishi kerak.",
            ],
            wrong: `class Talaba {
public:
    int yosh_;
    void yoshYoz(int yangi);
};`,
            right: `class Talaba {
public:
    void yoshYoz(int yangi);
    int yosh() const;
private:
    int yosh_;
};`,
          },
          {
            title: "O'qish metodini const qilmaslik",
            why: [
              "`const Talaba` faqat `const` metodni chaqiradi. Getter yozmasa ham, `const` yozilmagan bo'lsa, chaqiruv yig'ilmaydi.",
            ],
            wrong: `int yosh() {
    return yosh_;
}
const Talaba nusxa = ali;
nusxa.yosh();`,
            right: `int yosh() const {
    return yosh_;
}
const Talaba nusxa = ali;
nusxa.yosh();`,
          },
          {
            title: "Rad etishni nol yozildi deb o'qish",
            why: [
              "`return` maydonni o'zgartirmaydi. Eski 18 qoladi. Birinchi chaqiruvning o'zi manfiy bo'lsa, maydon yozilmagan holda qoladi va keyin o'qish noma'lum. Boshlang'ich sonni konstruktor qo'yadi.",
            ],
            wrong: `ali.yoshYoz(-3);
std::cout << ali.yosh() << "{{n}}";`,
            right: `ali.yoshYoz(18);
ali.yoshYoz(-3);
std::cout << ali.yosh() << "{{n}}";`,
          },
        ],
      },
      quiz: [
        {
          id: "11.3-q1",
          question: "`ali.yoshYoz(18);` keyin `ali.yoshYoz(-3);`. `ali.yosh()` necha?",
          options: ["-3", "18", "0", "kod yig'ilmaydi"],
          answer: 1,
          explanation:
            "Manfiy son setterdan return qiladi. yozish qatori yugurmaydi. Maydon 18 da qoladi. Rad etish 0 yozmaydi.",
        },
        {
          id: "11.3-q2",
          question: "`yosh()` da `const` yo'q. `const Talaba nusxa` ustida `nusxa.yosh()` nima qiladi?",
          options: ["18 chiqaradi", "0 chiqaradi", "kod yig'ilmaydi", "nusxani o'zgartiradi"],
          answer: 2,
          explanation:
            "const obyekt const bo'lmagan metodni chaqirmaydi. O'qish metodi const bo'lishi kerak. Aks holda qator yig'ilmaydi.",
        },
        {
          id: "11.3-q3",
          question: "`int n = ali.yosh();` va maydon 18. Keyin `n = 99`. `ali.yosh()` necha?",
          options: ["99", "18", "0", "kod yig'ilmaydi"],
          answer: 1,
          explanation:
            "Getter int nusxa qaytaradi. n alohida lokal. n = 99 maydonni yozmaydi. Obyekt ichida 18 qoladi.",
        },
      ],
    },
    {
      id: "11.4",
      navTitle: "Konstruktor",
      title: "Konstruktor obyektni tug'diradi, destruktor umrini yopadi",
      goal: [
        "Bu darsdan keyin siz standart konstruktor, parametrli konstruktor va nusxa konstruktorni ajratasiz. Destruktor `~ClassName`, u lokal obyekt blokdan chiqqanda teskari tartibda ishlaydi. `b = a` tayinlash nusxa konstruktor emas.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Yangi quti sexdan chiqayotganda ichiga yorliq yopishtiriladi. Yorliqsiz quti chiqmasin desangiz, ochilish tartibini o'zingiz yozasiz. Bu konstruktor. Quti omborga qaytganda yorliq yechiladi. Bu destruktor.",
          "Ikkita ochilish bor. Bo'sh buyurtma ichiga 0 qo'yadi. «100 qo'yib ber» degan buyurtma 100 qo'yadi. Ikkisi ham yangi quti ochadi, argumentlari boshqa.",
          "Tayyor qutidan ikkinchi quti ko'chirish ham yangi tug'ilish: nusxa konstruktor. Keyinroq ikkala quti ham bor bo'lib, birining ichini ikkinchisiga quyish esa tug'ilish emas, tayinlash. Ism o'xshash, voqea boshqa.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Konstruktor klass nomi bilan ataladi, qaytish turi yo'q. Destruktor nomi oldiga `~` qo'yiladi, argumenti ham, qaytish turi ham yo'q. Bittadan ortiq destruktor bo'lmaydi.",
        ],
        items: [
          {
            title: "Standart va parametrli",
            paragraphs: [
              "Argumentisiz chaqiriladigan konstruktor standart konstruktor. `Hisob() : pul_(0) {}` da `pul_` tug'ilishda 0 bo'ladi. `Hisob bosh;` shuni chaqiradi.",
              "`Hisob(int pul) : pul_(pul) {}` parametrli. `Hisob ali(100);` ichiga 100 qo'yadi. Ikkalasi qayta yuklash, 7.8. Imzo argumentlar bilan farq qiladi.",
              "Siz bironta konstruktor yozsangiz, kompilyatorning bo'sh standart konstrukturi o'zi qolmaydi. Faqat `Hisob(int)` bor bo'lsa, `Hisob bosh;` yig'ilmaydi. Standart kerak bo'lsa, uni ham yozing yoki `= default` deng.",
            ],
            code: `Hisob() : pul_(0) {}
Hisob(int pul) : pul_(pul) {}`,
            codeLabel: "ikki konstruktor",
            table: {
              caption: "Qaysi yozuv qaysi maxsus funksiya.",
              headers: ["Yozuv", "Nima"],
              rows: [
                ["Hisob bosh;", "standart konstruktor"],
                ["Hisob ali(100);", "parametrli konstruktor"],
                ["Hisob b = ali;", "nusxa konstruktor"],
                ["b = ali;", "nusxa tayinlash, konstruktor emas"],
              ],
            },
          },
          {
            title: "Boshlang'ich ro'yxat",
            paragraphs: [
              "Ikki nuqtali ro'yxat maydon tug'iladigan joy. `pul_(pul)` birinchi qiymat. Tana ichidagi `pul_ = pul` esa tug'ilgandan keyingi yozuv. `int` da ikkalasi ham ishlaydi. `const` maydon va havola faqat ro'yxatda qiymat oladi.",
              "Maydonlar ro'yxatdagi tartibda emas, klassda e'lon qilingan tartibda tug'iladi. Bir maydon boshqasiga tayanadigan bo'lsa, e'lon tartibini shu bog'lanishga mos yozing.",
              "`Hisob() {}` bo'sh tana `int` ni nol qilmaydi. Ro'yxatda `pul_(0)` yoki maydonda `int pul_ = 0` bo'lmasa, o'qish noma'lum. `private` ham, bo'sh konstruktor ham nol bermaydi.",
            ],
            code: `Quti(int son) : son_(son) {
    std::cout << "ochildi " << son_ << "{{n}}";
}`,
            codeLabel: "avval maydon, keyin tana",
          },
          {
            title: "Nusxa va destruktor",
            paragraphs: [
              "`Quti(const Quti& boshqa)` nusxa konstruktor. Yangi obyektni eskisidan ochadi. `Quti b = a;` va `Quti b(a);` shuni chaqiradi. Manba `const` havola. Qiymat bilan `Quti(Quti boshqa)` yig'ilmaydi: nusxani nusxa qilish uchun yana nusxa kerak bo'lib qoladi.",
              "`b = a` ikkala obyekt ham allaqachon bor bo'lsa, nusxa tayinlash. U boshqa funksiya, `operator=`. Bu dasturdagi «nusxa» yozuvi faqat konstruktor tanasida. Tayinlash uni chiqarmaydi.",
              "Destruktor lokal obyektning hayoti tugaganda o'zi chaqiriladi. `return` dan keyin ham, blok yopilganda, teskari tartibda: oxirgi ochilgan birinchi yopiladi. `~Quti()` ni qo'lda chaqirmang. Ichida `delete` bo'lsa, ikkinchi chaqiruv 9.6 dagi kabi ikki marta bo'shatish bo'lib qoladi.",
            ],
            code: `Quti(const Quti& boshqa) : son_(boshqa.son_) {}
~Quti() {}`,
            codeLabel: "nusxa va yopilish",
          },
        ],
      },
      examples: [
        {
          title: "Oxirgi ochilgan quti birinchi yopiladi",
          intro: [
            "`a` 1 bilan, `b` 2 bilan ochiladi. `main` tugaganda avval `b`, keyin `a` yopiladi.",
          ],
          codeLabel: "tartib.cpp",
          code: `#include <iostream>

class Quti {
public:
    Quti(int son) : son_(son) {
        std::cout << "ochildi " << son_ << "{{n}}";
    }
    ~Quti() {
        std::cout << "yopildi " << son_ << "{{n}}";
    }
private:
    int son_;
};

int main() {
    Quti a(1);
    Quti b(2);
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `ochildi 1
ochildi 2
yopildi 2
yopildi 1`,
          analysis: [
            {
              lines: "5-7",
              text: "Parametrli konstruktor. `son_` ro'yxatda tug'iladi, keyin tana ochildi deb yozadi. Qaytish turi yo'q. Standart konstruktor yo'q, chunki boshqa konstruktor yozilgan.",
            },
            {
              lines: "8-10",
              text: "Destruktor. Argumenti yo'q, `void` ham yo'q. `son_` ni `delete` qilmaydi: u ko'rsatkich emas, oddiy `int`.",
            },
            {
              lines: "16-17",
              text: "`a` tug'iladi, ekranda ochildi 1. Keyin `b`, ekranda ochildi 2. Ikki alohida obyekt.",
            },
            {
              lines: "18",
              text: "`main` dan chiqishda lokal obyektlar teskari tartibda yopiladi. Avval yopildi 2, keyin yopildi 1. Destruktorni qo'l bilan chaqirmadik.",
            },
          ],
        },
        {
          title: "Bo'sh hisob 0, parametrli hisob 100",
          intro: [
            "Ikkala konstruktor ham bor. `bosh` 0, `ali` 100. Ekranda 0, keyin 100.",
          ],
          codeLabel: "hisob.cpp",
          code: `#include <iostream>

class Hisob {
public:
    Hisob() : pul_(0) {}
    Hisob(int pul) : pul_(pul) {}
    int pul() const { return pul_; }
private:
    int pul_;
};

int main() {
    Hisob bosh;
    Hisob ali(100);
    std::cout << bosh.pul() << "{{n}}";
    std::cout << ali.pul() << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `0
100`,
          analysis: [
            {
              lines: "5",
              text: "Standart konstruktor. `Hisob bosh;` shuni chaqiradi. `pul_` darrov 0. Bo'sh tana yozilmagan qiymat qoldirmaydi, chunki ro'yxat 0 bergan.",
            },
            {
              lines: "6",
              text: "Parametrli konstruktor. `pul_` birinchi qiymatini argumentdan oladi. Bu qayta yuklash. Faqat shu qolsa, 13-qator yig'ilmaydi.",
            },
            {
              lines: "13-14",
              text: "`bosh` da 0. `ali` da 100. Ikki obyekt, ikki konstruktor. `Hisob ali = 100;` ham shu parametrli konstruktorga tushishi mumkin. `explicit` qo'ysangiz, bu yashirin aylantirish yig'ilmaydi.",
            },
            {
              lines: "15-16",
              text: "Ekranda 0, keyin 100. Getter `const`, maydonni o'qiyapti. Qiymat konstruktor qo'ygan, `main` yopiq maydonni yozmagan.",
            },
          ],
        },
        {
          title: "Quti b = a nusxa konstruktor",
          intro: [
            "`a` 5 bilan tug'iladi va «nusxa» yozmaydi. `b` `a` dan ko'chib tug'iladi, ekranda nusxa, keyin 5.",
          ],
          codeLabel: "nusxa.cpp",
          code: `#include <iostream>

class Quti {
public:
    Quti(int son) : son_(son) {}
    Quti(const Quti& boshqa) : son_(boshqa.son_) {
        std::cout << "nusxa{{n}}";
    }
    int son() const { return son_; }
private:
    int son_;
};

int main() {
    Quti a(5);
    Quti b = a;
    std::cout << b.son() << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `nusxa
5`,
          analysis: [
            {
              lines: "5",
              text: "`Quti a(5)` shu konstruktor. `son_` 5 bo'ladi. Nusxa matni yo'q, bu nusxa konstruktor emas.",
            },
            {
              lines: "6-8",
              text: "Nusxa konstruktor. Argument havola. Yangi obyektning `son_` i manbaning `son_` idan tug'iladi. Tana nusxa deb yozadi.",
            },
            {
              lines: "15-16",
              text: "`a` parametrli konstruktor bilan ochiladi. `Quti b = a` yangi obyektni nusxa konstruktor bilan ochadi. Ekranda nusxa. Bu `b = a` tayinlash emas, `b` hozir tug'ilyapti.",
            },
            {
              lines: "17",
              text: "`b.son()` 5. Nusxa alohida obyekt. Keyin `b` ning maydonini o'zgartirish `a` ni o'zgartirmaydi. Tayinlash `operator=` bo'lardi va bu dasturdagi nusxa matnini chiqarmaydi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`Quti a(1);` stekda obyekt joyi ochiladi. Ro'yxat `son_` baytiga 1 yozadi, keyin konstruktor tanasi ishlaydi. `Quti b(2);` keyingi joyga 2 yozadi. Ikki obyekt yonma-yon, lekin alohida.",
          "`main` blokidan chiqishda avval `b` ning destruktori, keyin `a` niki. Destruktor `int` ni `delete` qilmaydi. U faqat yopilish tanasini yurgizadi, joy esa blok bilan birga ketadi. 9-bobdagi `new` bunday emas: uyani `delete` bo'shatadi.",
          "`Quti b = a;` yangi joy ochadi va `a` dagi `son_` ni o'sha yerga ko'chiradi. Bu nusxa konstruktor. `a` va `b` ikki quti. Keyin `b = a` yozilsa, yangi joy ochilmaydi. Mavjud `b` ning maydoni ustidan yoziladi. Bu `operator=`.",
          "Klass faqat `int` saqlasa, kompilyator nusxasi shu sonni ko'chiradi va yetarli. Destruktor ichida `delete` turgan bo'lsa, kompilyator nusxasi ko'rsatkichni ko'chiradi va ikki obyekt bitta uyani bo'shatmoqchi bo'ladi. U holda nusxa konstruktor va nusxa tayinlashni o'zingiz yozasiz. Bu darsdagi `Quti` da bunday resurs yo'q.",
        ],
        diagram: `Quti a(1)     joy A  son_ [1]
Quti b(2)     joy B  son_ [2]

chiqish:
  ~Quti B  yopildi 2
  ~Quti A  yopildi 1

Quti b = a
  yangi joy, nusxa konstruktor
  son_ A dan B ga ko'chadi

b = a
  joy ochilmaydi
  tayinlash, nusxa konstruktor emas`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Konstruktor xatosi standartni o'chirib qo'yib, argumentisiz obyekt ochish, nusxani qiymat bilan e'lon qilish yoki destruktorga qaytish turi yozish.",
        ],
        items: [
          {
            title: "Faqat parametrli konstruktor qoldirish",
            why: [
              "Birorta konstruktor yozilsa, kompilyator standart konstruktorni o'zi qo'shmaydi. `Hisob bosh;` yig'ilmaydi. Argumentisiz obyekt kerak bo'lsa, `Hisob()` ni ham yozing.",
            ],
            wrong: `class Hisob {
public:
    Hisob(int pul) : pul_(pul) {}
private:
    int pul_;
};
Hisob bosh;`,
            right: `class Hisob {
public:
    Hisob() : pul_(0) {}
    Hisob(int pul) : pul_(pul) {}
private:
    int pul_;
};
Hisob bosh;`,
          },
          {
            title: "Nusxa konstruktorni qiymat bilan yozish",
            why: [
              "Birinchi argument `Quti` havolasi bo'lishi kerak. Qiymat bo'lsa, parametrning o'zi uchun yana nusxa kerak va bu yig'ilmaydi.",
            ],
            wrong: `Quti(Quti boshqa) : son_(boshqa.son_) {}`,
            right: `Quti(const Quti& boshqa) : son_(boshqa.son_) {}`,
          },
          {
            title: "Destruktorga void yoki argument yozish",
            why: [
              "Destruktorning qaytish turi yo'q va argumenti yo'q. `void ~Quti()` konstruktor emas, u umuman destruktor sifatida yig'ilmaydi. Bitta klass, bitta destruktor.",
            ],
            wrong: `void ~Quti() {
    std::cout << "yopildi{{n}}";
}`,
            right: `~Quti() {
    std::cout << "yopildi{{n}}";
}`,
          },
        ],
      },
      quiz: [
        {
          id: "11.4-q1",
          question: "`Quti a(1);` keyin `Quti b(2);`. `main` tugaganda oxirgi qator nima?",
          options: ["ochildi 1", "ochildi 2", "yopildi 2", "yopildi 1"],
          answer: 3,
          explanation:
            "Avval a, keyin b tug'iladi. Yopilish teskari. Oxirgi qator yopildi 1. Destruktor o'zi chaqiriladi.",
        },
        {
          id: "11.4-q2",
          question: "Klassda faqat `Hisob(int)` yozilgan. `Hisob bosh;` nima qiladi?",
          options: ["pul 0 bo'ladi", "pul noma'lum", "kod yig'ilmaydi", "pul 100 bo'ladi"],
          answer: 2,
          explanation:
            "O'z konstruktoringiz kompilyatorning standart konstruktorini siqib chiqaradi. Argumentisiz chaqiruv yig'ilmaydi. Hisob() ni ham yozing.",
        },
        {
          id: "11.4-q3",
          question: "`Quti a(5);` dan keyin `Quti b = a;` qaysi funksiya yangi obyektni ochadi?",
          options: ["nusxa tayinlash", "nusxa konstruktor", "destruktor", "standart konstruktor"],
          answer: 1,
          explanation:
            "b shu qatorda tug'iladi. Bu nusxa konstruktor. b = a ikkalasi ham bor bo'lganda tayinlash bo'lardi.",
        },
      ],
    },
    {
      id: "11.5",
      navTitle: "this",
      title: "this: metodni chaqirgan obyektning manzili",
      goal: [
        "Bu darsdan keyin siz `this` ni joriy obyektning ko'rsatkichi deb ishlatasiz. Parametr maydon nomini yashirsa, `this->` maydonni tanlaydi. `return *this` o'sha obyektning o'zini qaytaradi, nusxasini emas.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Ikkita anketa bitta «yoshni yoz» tartibini ishlatadi. Tartib «qaysi qog'oz?» deb so'rashi kerak. `this` qo'ldagi qog'ozning manzili. `ali.yoz(18)` deganda qo'lda `ali`, `vali.yoz(19)` deganda qo'lda `vali`.",
          "Tartibdagi «yosh» so'zi ham kiruvchi sonning nomi bo'lib qolsa, daftar katakchasi yashirinadi. «Shu qog'ozning yoshi» demasangiz, son o'ziga yoziladi, qog'oz tegilmaydi. `this->yosh` shu qog'ozni ko'rsatadi.",
          "`return *this` qog'ozning o'zini qaytaradi, ko'chirmasini emas. Keyingi qalam ham o'sha qog'ozga yozadi. Nusxa qaytsa, ikkinchi qalam nusxaga yozadi, asl anketa eski sonda qoladi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`this` metod ichida tayyor ko'rsatkich. Uni e'lon qilmaysiz va unga boshqa manzil yozolmaysiz. Oddiy metodda turi `Talaba*`. `const` metodda turi `const Talaba*`.",
        ],
        items: [
          {
            title: "Nuqta va strelka",
            paragraphs: [
              "`this->yosh` va `(*this).yosh` bitta maydon. 10.2 dagi qoida shu yerda ham: nuqta yulduzdan qattiqroq yopishadi. `*this.yosh` yig'ilmaydi, chunki `this` da `yosh` degan maydon yo'q, u ko'rsatkich.",
              "Maydon nomi yolg'iz yozilsa ham, kompilyator shu klassdan qidiradi. Parametr xuddi shu nomda bo'lsa, yolg'iz nom parametrni oladi. Maydonni `this->yosh` bilan ayting.",
              "`yosh = yosh` parametrni o'ziga yozadi. Maydon tegilmaydi. Keyin maydonni o'qish, u yozilmagan bo'lsa, noma'lum. Ekranga tasodifiy son chiqadi deb va'da bermang.",
            ],
            code: `void yoz(int yosh) {
    this->yosh = yosh;
}`,
            codeLabel: "parametr yashiradi, this ochadi",
          },
          {
            title: "Qaysi obyekt",
            paragraphs: [
              "`a.shu(&a)` ichida `this` `a` ning manzili. `this == p` rost, natija 1. `a.shu(&b)` da `this` hali ham `a`, `p` esa `b`. Natija 0.",
              "Manzilni `cout` ga xom holida bosmang. U har ishga tushirishda o'zgarishi mumkin, 9.1. Tenglikni 1 yoki 0 qilib yozing. `cout << (this == p)` da qavs kerak, chunki `<<` tenglikdan qattiqroq yopishadi.",
              "`this` obyekt emas, manzil. Obyektning o'zi `*this`. `sizeof(this)` ko'rsatkich o'lchami: shu kitobdagi 64-bitli Windowsda 8, 32-bitda 4. Bu obyektning `sizeof` i emas.",
            ],
            code: `int shu(const Nuqta* p) const {
    return this == p;
}`,
            codeLabel: "this chaqiruvdagi obyekt",
          },
          {
            title: "O'zini qaytarish",
            paragraphs: [
              "`Hisob& qosh` havola qaytaradi. `return *this;` shu obyekt. `h.qosh(10).qosh(5)` ikkinchi chaqiruv ham `h` ning ustida. 0 dan 10, 10 dan 15.",
              "Qaytish turi `Hisob` bo'lsa, qiymat bo'yicha nusxa ketadi. Birinchi `qosh` `h` ni 10 qiladi, keyin nusxa qaytaradi. Ikkinchi `qosh` nusxani 15 qiladi. `h` 10 da qoladi. Zanjir asl obyektni davom ettirishi kerak bo'lsa, havola qaytaring.",
              "`const` metodda `this` orqali maydon yozib bo'lmaydi. `static` metodda `this` umuman yo'q: u obyekt chaqirmaydi. Bu bobdagi metodlar `static` emas.",
            ],
            code: `Hisob& qosh(int summa) {
    pul_ = pul_ + summa;
    return *this;
}`,
            codeLabel: "havola, nusxa emas",
          },
        ],
      },
      examples: [
        {
          title: "this->yosh maydonni 18 qiladi",
          intro: [
            "Parametr ham, maydon ham `yosh`. `this->` maydonni tanlaydi. Ekranda 18.",
          ],
          codeLabel: "yoz.cpp",
          code: `#include <iostream>

class Talaba {
public:
    void yoz(int yosh) {
        this->yosh = yosh;
    }
    int ol() const {
        return yosh;
    }
private:
    int yosh;
};

int main() {
    Talaba ali;
    ali.yoz(18);
    std::cout << ali.ol() << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `18`,
          analysis: [
            {
              lines: "5-7",
              text: "Parametr `yosh` maydon `yosh` ni yashiradi. `this->yosh` obyekt maydoni, o'ng tomondagi `yosh` parametr. 18 maydonga yoziladi.",
            },
            {
              lines: "8-10",
              text: "`ol` da parametr yo'q. Yolg'iz `yosh` maydonni anglatadi. `const` metod yozmaydi. `this` bu yerda `const Talaba*`.",
            },
            {
              lines: "16-17",
              text: "`ali.yoz(18)` ichida `this` `ali` ning manzili. Maydon 18 bo'ladi. `this = &boshqa` deb yozib bo'lmaydi.",
            },
            {
              lines: "18",
              text: "Ekranda 18. `this->` siz `yosh = yosh` bo'lsa, maydon yozilmaydi. Keyin `ol()` noma'lum son o'qiydi. Aniq 0 chiqadi deb kutmang.",
            },
          ],
        },
        {
          title: "this a ga teng, b ga teng emas",
          intro: [
            "`a.shu(&a)` 1, `a.shu(&b)` 0. Manzilning o'zi ekranga chiqmaydi.",
          ],
          codeLabel: "shu.cpp",
          code: `#include <iostream>

class Nuqta {
public:
    int shu(const Nuqta* p) const {
        return this == p;
    }
};

int main() {
    Nuqta a;
    Nuqta b;
    std::cout << a.shu(&a) << "{{n}}";
    std::cout << a.shu(&b) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `1
0`,
          analysis: [
            {
              lines: "5-7",
              text: "`this` metodni chaqirgan obyekt. `p` argument. Tenglik 1 yoki 0 qaytaradi. `const` metodda `this` ham `const Nuqta*`.",
            },
            {
              lines: "11-12",
              text: "Ikki obyekt, ikki manzil. Bo'sh klass ham alohida manzil oladi, odatda 1 baytdan. Maydon yo'q, solishtirish maydon emas, obyektning o'zi.",
            },
            {
              lines: "13",
              text: "`a.shu(&a)` da `this` va `p` ikkalasi `a`. Ekranda 1. `cout` ichida shu tenglikni yozsangiz, qavs kerak.",
            },
            {
              lines: "14",
              text: "`a.shu(&b)` da `this` hali `a`, chunki chaqiruv `a` ustida. `p` esa `b`. Ekranda 0. `b.shu(&b)` bo'lsa, 1 bo'lardi.",
            },
          ],
        },
        {
          title: "Zanjir asl hisobni 15 qiladi",
          intro: [
            "`qosh` havola qaytaradi. 10 ham, 5 ham bitta `h` ga qo'shiladi. Ekranda 15.",
          ],
          codeLabel: "zanjir.cpp",
          code: `#include <iostream>

class Hisob {
public:
    Hisob& qosh(int summa) {
        pul_ = pul_ + summa;
        return *this;
    }
    int pul() const { return pul_; }
private:
    int pul_ = 0;
};

int main() {
    Hisob h;
    h.qosh(10).qosh(5);
    std::cout << h.pul() << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `15`,
          analysis: [
            {
              lines: "5-8",
              text: "`pul_` ga summa qo'shiladi. `return *this` obyektning o'zi, havola bilan. `this` manzil, `*this` obyekt. Nusxa emas.",
            },
            {
              lines: "11",
              text: "Maydon tug'ilishda 0. Standart konstruktor yozilmagan, lekin boshlang'ich qiymat bor. `h` ochilganda `pul_` 0.",
            },
            {
              lines: "16",
              text: "`h.qosh(10)` `pul_` ni 10 qiladi va `h` ni qaytaradi. Darrov `.qosh(5)` o'sha `h` ni 15 qiladi. Oradagi nuqta yangi hisob ochmaydi.",
            },
            {
              lines: "17",
              text: "Ekranda 15. Qaytish `Hisob` bo'lsa, qiymat bo'yicha, ikkinchi `qosh` nusxada qolardi va `h` 10 bo'lib turardi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`ali.yoz(18)` chaqirilganda `this` registrda yoki chaqiruv joyida `ali` ning manzilini ushlaydi. `this->yosh = yosh` o'sha manzildagi `int` ga 18 yozadi. `this` ning o'zi obyekt ichidagi maydon emas. U har chaqiruvda metodga beriladi.",
          "`a.shu(&b)` da `this` `a` ning manzili, argument `b` ning manzili. Tenglik solishtiradi, manzilni ko'chirmaydi. Natija `int` 0. Hech bir obyektning bayti yozilmaydi, metod `const`.",
          "`h.qosh(10)` `h` dagi `pul_` ni 0 dan 10 ga o'zgartiradi. `return *this` yangi `Hisob` ochmaydi. Qaytgan havola `h` ning o'ziga bog'langan. Ikkinchi `qosh(5)` o'sha baytni 15 qiladi.",
          "Qiymat qaytarilsa, vaqtincha ikkinchi obyekt ochiladi va `pul_` 10 ko'chiriladi. Ikkinchi qo'shish o'sha vaqtinchada 15 yozadi. `h` dagi bayt 10 da qoladi. Zanjir tugaganda vaqtinchalik obyekt o'ladi. Asl hisob o'zgarmagan bo'lib chiqadi.",
        ],
        diagram: `ali.yoz(18)
  this -> ali
  ali.yosh [18]

a.shu(&a)  this == &a  -> 1
a.shu(&b)  this == &b  -> 0

h.pul_ [0]
h.qosh(10)  [10]  return *this
.qosh(5)    [15]  yana h

qiymat qaytsa
  h [10]
  nusxa [15]  asl h tegilmaydi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "`this` xatosi maydon o'rniga parametrni yozish, ko'rsatkichga nuqta qo'yish yoki zanjirda nusxa qaytarish.",
        ],
        items: [
          {
            title: "yosh = yosh maydonni yozmaydi",
            why: [
              "Parametr maydonni yashiradi. Ikki tomonda ham parametr turadi. Maydon eski, yozilmagan bo'lsa, keyingi o'qish noma'lum. `this->yosh` chap tomonda maydonni qo'yadi.",
            ],
            wrong: `void yoz(int yosh) {
    yosh = yosh;
}`,
            right: `void yoz(int yosh) {
    this->yosh = yosh;
}`,
          },
          {
            title: "this.yosh deb nuqta qo'yish",
            why: [
              "`this` ko'rsatkich. Nuqta obyektga qo'yiladi. Ko'rsatkichga `->` yoki avval `(*this)` kerak. `*this.yosh` esa `(this.yosh)` deb o'qiladi va yig'ilmaydi.",
            ],
            wrong: `this.yosh = yosh;`,
            right: `this->yosh = yosh;`,
          },
          {
            title: "Zanjir uchun qiymat qaytarish",
            why: [
              "`Hisob qosh(...)` nusxa qaytaradi. `h.qosh(10).qosh(5)` ikkinchi qo'shishni nusxada qiladi. `h` 10 da qoladi. Asl obyekt kerak bo'lsa, `Hisob&` va `return *this`.",
            ],
            wrong: `Hisob qosh(int summa) {
    pul_ = pul_ + summa;
    return *this;
}`,
            right: `Hisob& qosh(int summa) {
    pul_ = pul_ + summa;
    return *this;
}`,
          },
        ],
      },
      quiz: [
        {
          id: "11.5-q1",
          question: "`void yoz(int yosh) { this->yosh = yosh; }` va `ali.yoz(18);`. `ali.ol()` necha?",
          options: ["0", "18", "noma'lum", "kod yig'ilmaydi"],
          answer: 1,
          explanation:
            "this->yosh maydon. O'ngdagi yosh parametr, 18. Maydonga 18 yoziladi. Yolg'iz yosh = yosh bo'lsa, maydon yozilmagan bo'lib qolardi.",
        },
        {
          id: "11.5-q2",
          question: "`a.shu(&b)` ichida `this == p` nima qaytaradi?",
          options: ["1", "0", "a ning manzili", "kod yig'ilmaydi"],
          answer: 1,
          explanation:
            "Chaqiruv a ustida, this a ni ko'rsatadi. p esa b. Ikki obyekt, natija 0. a.shu(&a) bo'lsa, 1.",
        },
        {
          id: "11.5-q3",
          question: "`pul_` 0 dan boshlanadi. `Hisob&` qaytadi. `h.qosh(10).qosh(5)` dan keyin `h.pul()` necha?",
          options: ["10", "15", "5", "0"],
          answer: 1,
          explanation:
            "return *this asl h ni qaytaradi. 10 ham, 5 ham bitta pul_ ga qo'shiladi. 0+10+5=15. Qiymat qaytsa, h 10 da qolardi.",
        },
      ],
    },
    {
      id: "11.6",
      navTitle: "Vorislik",
      title: "Vorislik: ota qismi ichida, bola ustiga qo'shiladi",
      goal: [
        "Bu darsdan keyin siz `class Bola : public Ota` ni tayyor ota turining ustiga yangi maydon va metod qo'shish deb ochasiz. Ota avval tug'iladi, bola avval yopiladi. Ota `private` maydoni bola kodidan yashirin, lekin obyekt ichida bor.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Oddiy telefon chizmasi bor: raqam yozish va o'qish. Smartfon shu chizmani tashlab yubormaydi, ustiga qo'shimcha xotira qo'shadi. Smartfon ham telefon. Bu «bo'lib hisoblanadi» bog'lanishi.",
          "Korpus ichida avval telefon platasi o'rnatiladi, keyin qo'shimcha xotira. Ochishda teskari: avval qo'shimcha yechiladi, keyin plata. Ota konstruktor birinchi, bola destruktor birinchi.",
          "Plataning ichki vinti `private`. Smartfon ustasi vintni nom bilan ushlamaydi, telefonning ochiq tugmasi orqali ishlatadi. Himoyalangan vintni, `protected`, smartfon sexi ko'radi, xaridor ko'rmaydi. 11.2 shu eshikni aytgan.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`class Bola : public Ota` ochiq vorislik. Bola ochiq a'zolarni o'ziniki kabi ko'rsatadi. Ota qismi obyekt ichida birinchi yotadi, bola maydonlari undan keyin.",
        ],
        items: [
          {
            title: "Nima o'tadi",
            paragraphs: [
              "`public` metod bolada ham ochiq: `b.yoz(10)` ota metodini chaqiradi. `protected` ni bola metodi ko'radi, `main` ko'rmaydi. `private` ni bola metodi nom bilan yoza olmaydi. Son baribir ota qismida yotadi, ochiq metod orqali boriladi.",
              "`class Bola : Ota` da `public` tushib qolsa, `class` vorisligi sukutda `private`. Ota ochiq metodlari tashqarida yashirinadi va `b.yoz` yig'ilmaydi. `struct` vorisligi esa sukutda `public`. Ochiq «bo'lib hisoblanadi» uchun `: public Ota` yozing.",
              "Bola o'z metodini qo'shadi. `qosh` ichida `yoz` va `ol` ko'rinadi, chunki ular ochiq. `son_` `private` bo'lsa, `son_ = son_ + qadam` bola ichida yig'ilmaydi.",
            ],
            code: `class Bola : public Ota {
public:
    void qosh(int qadam) {
        yoz(ol() + qadam);
    }
};`,
            codeLabel: "ochiq metod orqali",
          },
          {
            title: "Tug'ilish va yopilish tartibi",
            paragraphs: [
              "`Bola b;` avval ota konstruktorini, keyin bola konstruktorining tanasini yurgizadi. Ekranda avval ota, keyin bola.",
              "Yopilish teskari. Avval bola destruktori tanasi, keyin ota destruktori. Ota qismi bola yashayotganda ham joyida. Bola tanasi tugagach, ota qismi yopiladi.",
              "Ota faqat parametrli konstruktor bersa, bola ro'yxatda `Ota(son)` deb chaqirishi shart. Tana ichida kech. Ota qismi bola tanasidan oldin tug'ilgan bo'ladi. Standart ota konstruktori yo'q bo'lsa, chaqirmaslik yig'ilmaydi.",
            ],
            code: `Bola(int son, int qoshimcha)
    : Ota(son), qoshimcha_(qoshimcha) {}`,
            codeLabel: "ota ro'yxatda, tanadan oldin",
          },
          {
            title: "Kesish",
            paragraphs: [
              "`Ota a = b;` yangi ota obyekt ochadi va faqat ota qismini ko'chiradi. Bolaning `qoshimcha_` si `a` da yo'q. Bu kesish. `a` haqiqiy `Bola` emas.",
              "`Ota& a = b;` yangi obyekt ochmaydi. Havola o'sha bolani ota nomi bilan ko'radi. Qo'shimcha maydon joyida qoladi. Ota nomi orqali faqat ota a'zolari ko'rinadi.",
              "Bola ota metodi bilan bir xil nomdagi metod yozsa, bola nomi otanikini yashiradi. Otanikini `b.Ota::ol()` deb so'rash mumkin. Virtual chaqiruv boshqa mavzu, 11.7. Hozircha ko'rsatkichning yozilgan turi qaysi funksiya ekanini hal qiladi, toki `virtual` qo'yilmasa.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "10 ga 3 qo'shiladi, maydon yopiq",
          intro: [
            "`Bola` ota `yoz` va `ol` ni ishlatadi. `son_` ga to'g'ridan tegmaydi. Ekranda 13.",
          ],
          codeLabel: "qosh.cpp",
          code: `#include <iostream>

class Ota {
public:
    void yoz(int son) { son_ = son; }
    int ol() const { return son_; }
private:
    int son_;
};

class Bola : public Ota {
public:
    void qosh(int qadam) {
        yoz(ol() + qadam);
    }
};

int main() {
    Bola b;
    b.yoz(10);
    b.qosh(3);
    std::cout << b.ol() << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `13`,
          analysis: [
            {
              lines: "3-9",
              text: "Ota. `son_` yopiq. Ochiq yo'l `yoz` va `ol`. Bola bu nomni o'z ichida yoza olmaydi, metodlarini chaqira oladi.",
            },
            {
              lines: "11-16",
              text: "`public` vorislik. `qosh` ochiq metodlarni chaqiradi: o'qiydi, qadamni qo'shadi, yana yozadi. `son_ += qadam` shu klassda yig'ilmaydi.",
            },
            {
              lines: "19-21",
              text: "`b` ichida ota qismi bor. `yoz(10)` maydonni 10 qiladi. `qosh(3)` uni 13 qiladi. `main` ham `son_` ni ko'rmaydi.",
            },
            {
              lines: "22",
              text: "`b.ol()` ota metodini chaqiradi. Ekranda 13. Bola `ol` ni qayta yozmagan, yashirish yo'q.",
            },
          ],
        },
        {
          title: "Avval ota tug'iladi, avval bola yopiladi",
          intro: [
            "Bitta `Bola` obyekti. Konstruktorlar pastdan emas, otadan boshlanadi. Destruktorlar boladan boshlanadi.",
          ],
          codeLabel: "tartib.cpp",
          code: `#include <iostream>

class Ota {
public:
    Ota() { std::cout << "ota{{n}}"; }
    ~Ota() { std::cout << "ota yop{{n}}"; }
};

class Bola : public Ota {
public:
    Bola() { std::cout << "bola{{n}}"; }
    ~Bola() { std::cout << "bola yop{{n}}"; }
};

int main() {
    Bola b;
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `ota
bola
bola yop
ota yop`,
          analysis: [
            {
              lines: "5-6",
              text: "Ota konstruktori ota deb yozadi. Ota destruktori ota yop deb yozadi. Ikkalasi ham oddiy, `virtual` emas. Bu misol stekdagi obyekt, `delete` yo'q.",
            },
            {
              lines: "11-12",
              text: "Bola konstruktori bola deb yozadi. Bola destruktori bola yop deb yozadi. Ota qismini qo'lda chaqirish shart emas, kompilyator tartibni qo'yadi.",
            },
            {
              lines: "16",
              text: "`Bola b;` avval 5-qator, keyin 11-qator. Ekranda ota, keyin bola. Ota qismi bola tanasidan oldin tayyor.",
            },
            {
              lines: "17",
              text: "Chiqishda avval 12-qator, keyin 6-qator. Ekranda bola yop, keyin ota yop. Oxirgi qator ota yop. Obyekt bitta, ichida ikki qism.",
            },
          ],
        },
        {
          title: "Ota 10, qo'shimcha 4, jami 14",
          intro: [
            "Otaning standart konstrukturi yo'q. Bola ro'yxatda `Ota(10)` ni chaqiradi. Jami 14.",
          ],
          codeLabel: "jami.cpp",
          code: `#include <iostream>

class Ota {
public:
    Ota(int son) : son_(son) {}
    int ol() const { return son_; }
private:
    int son_;
};

class Bola : public Ota {
public:
    Bola(int son, int qoshimcha) : Ota(son), qoshimcha_(qoshimcha) {}
    int jami() const { return ol() + qoshimcha_; }
private:
    int qoshimcha_;
};

int main() {
    Bola b(10, 4);
    std::cout << b.jami() << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `14`,
          analysis: [
            {
              lines: "5-6",
              text: "Ota faqat `int` bilan tug'iladi. `son_`  ro'yxatda qiymat oladi. `Ota a;` yig'ilmaydi, standart konstruktor yo'q.",
            },
            {
              lines: "13",
              text: "`Ota(son)` ota qismini 10 bilan ochadi. `qoshimcha_` 4 bo'ladi. Bu bola tanasidan oldin. Ro'yxatda ota birinchi yozilishi o'qish uchun qulay. Tug'ilish tartibi baribir: avval ota, keyin bola maydonlari.",
            },
            {
              lines: "14",
              text: "`jami` ota `ol()` ni 10 qilib o'qiydi va 4 ni qo'shadi. `son_` ni to'g'ridan yozmaydi. Natija 14.",
            },
            {
              lines: "20-21",
              text: "`Bola b(10, 4)` bitta obyekt: ota qismi 10, bola maydoni 4. Ekranda 14. `Ota a = b;` bo'lsa, `a` da faqat 10 qoladi, 4 kesiladi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`Bola b;` bitta uzluksiz joy. Boshida ota qismi, `son_` odatda 4 bayt. Virtual yo'q, yashirin ko'rsatkich yo'q. Keyin bola maydoni bo'lsa, u ham shu joyda, ota qismidan keyin. `jami` misolida ikki `int`, odatda 8 bayt.",
          "Konstruktor chaqiruvida avval ota qismining `son_` i yoziladi, keyin bola maydoni, keyin bola tanasi. Destruktor teskari: bola tanasi, keyin bola maydonlarining o'limi, keyin ota destruktori. `int` ning alohida destruktori yo'q, shunchaki joy ketadi.",
          "`Ota a = b;` yangi joy ochadi va faqat ota qismini ko'chiradi. `qoshimcha_` yangi joyga tushmaydi. `a.ol()` 10. `a.jami()` yo'q, chunki `a` ning turi `Ota`. Asl `b` o'z joyida 10 va 4 bilan turadi.",
          "`private son_` bola obyektining bayti. Bola metodining matnida bu nom yo'q. `yoz` ota metodi bo'lgani uchun o'sha baytga kira oladi. Huquq nom jadvali. Bayt o'chirilmagan.",
        ],
        diagram: `Bola b, bitta joy
  ota: son_ [10]
  bola: qoshimcha_ [4]
  jami = 14

tug'ilish: Ota, keyin Bola
yopilish: Bola, keyin Ota

Ota a = b
  yangi joy, faqat son_ [10]
  qoshimcha_ kesilgan`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Vorislik xatosi `public` ni tashlab ketish, ota `private` ni bola ichida yozish yoki bola obyektini ota qiymatiga ko'chirib, qo'shimchani saqlanadi deb o'ylash.",
        ],
        items: [
          {
            title: "class vorisligida public ni unutish",
            why: [
              "`class Bola : Ota` sukutda yopiq vorislik. Ota `public` metodlari tashqarida `private` bo'lib qoladi. `b.yoz(10)` yig'ilmaydi. Ochiq bog'lanish uchun `: public Ota`.",
            ],
            wrong: `class Bola : Ota {
public:
    void qosh(int qadam);
};
Bola b;
b.yoz(10);`,
            right: `class Bola : public Ota {
public:
    void qosh(int qadam);
};
Bola b;
b.yoz(10);`,
          },
          {
            title: "Ota private maydonini bola yozadi",
            why: [
              "`son_` ota `private`. Bola metodi uni nom bilan ko'rmaydi. Ochiq `yoz` va `ol` bor. Yopiq maydon obyektda joy egallaydi, bola matniga ochilmaydi.",
            ],
            wrong: `void qosh(int qadam) {
    son_ = son_ + qadam;
}`,
            right: `void qosh(int qadam) {
    yoz(ol() + qadam);
}`,
          },
          {
            title: "Qiymat bilan kesish",
            why: [
              "`Ota a = b;` faqat ota qismini nusxalaydi. `qoshimcha_` yangi obyektga kirmaydi. Butun bola kerak bo'lsa, `Bola` tipida saqlang yoki `Ota&` bilan asl obyektni ko'ring.",
            ],
            wrong: `Bola b(10, 4);
Ota a = b;
std::cout << a.ol() << "{{n}}";`,
            right: `Bola b(10, 4);
Ota& a = b;
std::cout << b.jami() << "{{n}}";`,
          },
        ],
      },
      quiz: [
        {
          id: "11.6-q1",
          question: "`b.yoz(10);` keyin `b.qosh(3);`. `b.ol()` necha?",
          options: ["10", "3", "13", "kod yig'ilmaydi"],
          answer: 2,
          explanation:
            "yoz 10 qo'yadi. qosh ol() + 3 ni yana yozadi. 10+3=13. son_ private, lekin ochiq metodlar uni o'zgartiradi.",
        },
        {
          id: "11.6-q2",
          question: "`Bola b;` ekranga avval nima yozadi?",
          options: ["bola", "ota", "bola yop", "ota yop"],
          answer: 1,
          explanation:
            "Ota konstruktori birinchi. Keyin bola konstruktori. Yopilish teskari: bola yop, oxirida ota yop.",
        },
        {
          id: "11.6-q3",
          question: "`Bola b(10, 4);` va `jami` `ol() + qoshimcha_`. `b.jami()` necha?",
          options: ["10", "4", "14", "kod yig'ilmaydi"],
          answer: 2,
          explanation:
            "Ota(10) son_ ni 10 qiladi. qoshimcha_ 4. Jami 14. Ota qismi bola ichida joy olgan.",
        },
      ],
    },
    {
      id: "11.7",
      navTitle: "virtual",
      title: "Polimorfizm: virtual chaqiruv haqiqiy obyektga boradi",
      goal: [
        "Bu darsdan keyin siz `virtual` siz chaqiruv ko'rsatkichning yozilgan turiga, `virtual` chaqiruv esa haqiqiy obyektga qarashini ajratasiz. `override` mos kelmasa, kod yig'ilmaydi. Ota ko'rsatkichidan `delete` qilish uchun ota destruktori `virtual` bo'lishi shart.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Qo'lda «jonli» deb yozilgan kartochka bor. Kartochka mushukni ham, itni ham ushlashi mumkin. `virtual` siz «jonli gapir» desangiz, kartochkadagi umumiy ovoz o'qiydi. `virtual` bo'lsa, qo'ldagi haqiqiy hayvon o'z ovozini chiqaradi.",
          "`override` sexdagi tekshiruv. Bola «men otaning gapir tuginini almashtirdim» desa, tugma nomi, `const` va argumentlar mos kelishi kerak. Mos kelmasa, sex qutini chiqarmaydi. Siz tasodifan yangi tugma o'ylab topib, eskisisini almashtirdim deb yurmaysiz.",
          "Qutini ota kartochkasi orqali tashlasangiz, yopish tartibi ham haqiqiy qutiga qarab yurishi kerak. Ota destruktori `virtual` bo'lmasa, bu tashlashning natijasi noma'lum. Ba'zan faqat ota yozuvi ko'rinib qoladi. Buni va'da deb olmaymiz.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`virtual` ota metodga yoziladi. Bola xuddi shu imzo bilan yozsa va `override` qo'ysa, chaqiruv haqiqiy obyektnikini oladi. Ko'rsatkich yoki havola kerak. Qiymat kesadi, 11.6.",
        ],
        items: [
          {
            title: "virtual siz va virtual bilan",
            paragraphs: [
              "`Ota* p = &b;` da `p` ning yozilgan turi `Ota*`, haqiqiy obyekt `Bola`. `gapir` `virtual` bo'lmasa, `p->gapir()` ota matnini yurgizadi. `b.gapir()` bola matnini yurgizadi, chunki `b` ning turi `Bola`.",
              "`virtual void gapir() const` bo'lsa, `p->gapir()` bola matniga boradi. Bola funksiyasi ota funksiyasini almashtiradi. Imzo bir xil bo'lishi kerak: nomi, argumentlari va `const`.",
              "Qiymat bilan `void chaqir(Ota o)` obyektni kesadi. Parametr ichida haqiqiy tur `Ota`. `virtual` bo'lsa ham, `o.gapir()` ota matnini aytadi. Polimorfizm uchun `Ota*` yoki `Ota&` ishlating.",
            ],
            code: `Ota* p = &b;
p->gapir();`,
            codeLabel: "ko'rsatkich haqiqiy obyektni ushlaydi",
            table: {
              caption: "gapir virtual emas. p ning turi Ota*, b ning turi Bola.",
              headers: ["Chaqiruv", "Qaysi matn"],
              rows: [
                ["p->gapir(), virtual yo'q", "ota"],
                ["b.gapir()", "bola"],
                ["p->gapir(), virtual bor", "bola"],
                ["Ota o = b; o.gapir(), virtual bor", "ota, kesilgan"],
              ],
            },
          },
          {
            title: "override",
            paragraphs: [
              "`override` bola funksiyasi haqiqatan ota `virtual` ini almashtirayotganini tekshiradi. Imzo boshqa bo'lsa, masalan ota `const`, bola `const` siz, kod yig'ilmaydi.",
              "`override` o'zi funksiyani `virtual` qilmaydi. Ota tomonda `virtual` bo'lishi kerak. `virtual` ni faqat bolaga yozib, otada oddiy qoldirsangiz, `override` yig'ilmaydi. `override` siz esa bu yashirish bo'ladi va `p->gapir()` ota matnida qoladi.",
              "Bola funksiyasi `virtual` ni qayta yozmasa ham, ota `virtual` bo'lsa, u ham `virtual` hisoblanadi. `override` shuni o'qiladigan qiladi. Mos kelmasa, jim yashirish o'rniga xato beradi.",
            ],
            code: `virtual void gapir() const;
void gapir() const override;`,
            codeLabel: "ota virtual, bola override",
          },
          {
            title: "Virtual destruktor",
            paragraphs: [
              "`Ota* p = new Bola();` uyada haqiqiy tur `Bola`. `delete p;` da ota destruktori `virtual` bo'lsa, avval `~Bola`, keyin `~Ota` yuguradi. Keyin uy bo'shaydi. `~Bola() override` yozish mumkin.",
              "Ota destruktori `virtual` bo'lmasa, `delete p` noma'lum xatti-harakat. Til faqat ota destruktori yuguradi deb va'da bermaydi. Dasturni shunday yozmang va konsolda bir qator ko'rdim deb qoidani o'zgartirmang.",
              "`virtual void gapir() = 0;` sof virtual. Ota tana bermaydi, `Ota o;` yig'ilmaydi. Bola `gapir` ni bersa, bola obyektini ochish mumkin. Bu mavzuning qisqasi shu. Namunadagi klasslar sof emas, ularning tanasi bor.",
            ],
            code: `virtual ~Ota() {
    std::cout << "ota yop{{n}}";
}`,
            codeLabel: "ota ko'rsatkichidan delete uchun",
          },
        ],
      },
      examples: [
        {
          title: "virtual yo'q, ko'rsatkich ota matnini aytadi",
          intro: [
            "`p` bola obyektini ushlaydi, lekin `gapir` virtual emas. `p->gapir()` ota, `b.gapir()` bola.",
          ],
          codeLabel: "oddiy.cpp",
          code: `#include <iostream>

class Ota {
public:
    void gapir() const {
        std::cout << "ota{{n}}";
    }
};

class Bola : public Ota {
public:
    void gapir() const {
        std::cout << "bola{{n}}";
    }
};

int main() {
    Bola b;
    Ota* p = &b;
    p->gapir();
    b.gapir();
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `ota
bola`,
          analysis: [
            {
              lines: "5-7",
              text: "`gapir` oddiy metod. `virtual` yo'q. Ota ko'rsatkichi orqali chaqirilsa, ota tanasi yuguradi.",
            },
            {
              lines: "12-14",
              text: "Bola xuddi shu nomdagi metodni yozgan. Bu yashirish. `override` qo'yib bo'lmaydi, chunki ota tomonda `virtual` yo'q. O'sha qator yig'ilmaydi.",
            },
            {
              lines: "18-20",
              text: "`b` haqiqiy `Bola`. `p` shu obyektning manzili, turi `Ota*`. `p->gapir()` yozilgan turga qaraydi. Ekranda ota.",
            },
            {
              lines: "21",
              text: "`b` ning turi `Bola`. `b.gapir()` bola tanasini oladi. Ekranda bola. Obyekt bitta, chaqiruv yo'li ikki xil.",
            },
          ],
        },
        {
          title: "virtual va override, ko'rsatkich bola deydi",
          intro: [
            "Ota `gapir` virtual. Bola `override` qiladi. `p->gapir()` endi bola. Destruktor ham virtual, lekin bu misol `delete` qilmaydi.",
          ],
          codeLabel: "virtual.cpp",
          code: `#include <iostream>

class Ota {
public:
    virtual void gapir() const {
        std::cout << "ota{{n}}";
    }
    virtual ~Ota() = default;
};

class Bola : public Ota {
public:
    void gapir() const override {
        std::cout << "bola{{n}}";
    }
};

int main() {
    Bola b;
    Ota* p = &b;
    p->gapir();
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `bola`,
          analysis: [
            {
              lines: "5-8",
              text: "`gapir` virtual. `~Ota` ham virtual va `default`: o'z tanasi yo'q, lekin ota ko'rsatkichidan o'chirish xavfsiz bo'lishi uchun turadi. Bu misol uy ochmaydi.",
            },
            {
              lines: "13-15",
              text: "`override` imzo mosligini tekshiradi: `const`, argument yo'q, nomi `gapir`. Mos bo'lsa, bola tanasi ota tanasining o'rniga tushadi. `const` ni tushirsak, shu qator yig'ilmaydi.",
            },
            {
              lines: "19-20",
              text: "`b` bola obyekti. `p` uni ota ko'rsatkichi bilan ushlaydi. Kesish yo'q, chunki bu nusxa emas, manzil.",
            },
            {
              lines: "21",
              text: "`p->gapir()` haqiqiy turga boradi. Ekranda bola. Ota tanasidagi ota matni shu chaqiruvda yugurmaydi. `Ota o = b;` bo'lsa, kesish tufayli yana ota chiqadi.",
            },
          ],
        },
        {
          title: "delete avval bolani, keyin otani yopadi",
          intro: [
            "`new Bola` ni `Ota*` ushlaydi. Destruktor virtual. `delete` avval bola yop, keyin ota yop yozadi.",
          ],
          codeLabel: "ochir.cpp",
          code: `#include <iostream>

class Ota {
public:
    virtual ~Ota() {
        std::cout << "ota yop{{n}}";
    }
};

class Bola : public Ota {
public:
    ~Bola() override {
        std::cout << "bola yop{{n}}";
    }
};

int main() {
    Ota* p = new Bola();
    delete p;
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `bola yop
ota yop`,
          analysis: [
            {
              lines: "5-7",
              text: "Ota destruktori virtual. Tanasi ota yop deb yozadi. `virtual` bo'lmasa, 19-qator noma'lum bo'lardi. Konsolni taxmin qilib bo'lmaydi.",
            },
            {
              lines: "12-14",
              text: "`~Bola() override` haqiqiy obyekt yopilishini ushlaydi. Tana avval bola yop yozadi. Tana tugagach, kompilyator ota destruktorini chaqiradi.",
            },
            {
              lines: "18",
              text: "`new Bola()` uy ochadi. Avval ota qismi, keyin bola tug'iladi. Bu konstruktorda yozuv yo'q. `new` joy topolmasa, `std::bad_alloc` otadi. Alohida oyna va'da qilinmaydi.",
            },
            {
              lines: "19",
              text: "`delete p` virtual destruktor tufayli avval `~Bola`, keyin `~Ota`. Ekranda bola yop, keyin ota yop. Keyin uy bo'shaydi. `p` ni yana ishlatmaymiz.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`virtual` metodli obyektga odatda yashirin ko'rsatkich qo'shiladi. U funksiyalar jadvalini ko'rsatadi. Shu kitobdagi 64-bitli Windowsda bu ko'rsatkich odatda 8 bayt va obyekt boshida turadi. Aniq joy til qoidasi emas, shu muhitning odatidir. `sizeof` ni faqat o'z `int` larining yig'indisi deb hisoblamang.",
          "`Ota* p = &b;` yangi bola ochmaydi. `p` da `b` ning manzili yotadi. `virtual` chaqiruv shu manzildagi obyektning jadvaliga qaraydi va `Bola::gapir` ga boradi. `virtual` bo'lmasa, chaqiruv `p` ning yozilgan turi bo'yicha to'g'ridan `Ota::gapir` ga sakraydi, jadvalni ochmaydi.",
          "`Ota o = b;` yangi ota obyekti ochadi. Bolaning qo'shimchasi va bola jadvali ko'chirilmaydi. `o.gapir()` ota tanasida qoladi. Havola va ko'rsatkich esa asl joydagi jadvalni ko'radi.",
          "`delete p` virtual bo'lsa, jadvaldan `~Bola` ni topadi. `~Bola` tanasi yuguradi, keyin `~Ota`, keyin `delete` uyani qaytaradi. Virtual bo'lmasa, shu zanjir til bo'yicha kafolatlanmaydi. Ota konstruktori ichida virtual chaqiruv qilsangiz, bola qismi hali tug'ilmagan bo'ladi va chaqiruv ota tanasiga boradi. Bola `gapir` ini konstruktor ichida kutmang.",
        ],
        diagram: `Bola b
  yashirin jadval ko'rsatkichi
  ota maydonlari
  bola maydonlari

Ota* p = &b
  p [manzil b]

virtual p->gapir()  -> Bola::gapir
oddiy   p->gapir()  -> Ota::gapir

delete p, virtual destruktor
  ~Bola tana
  ~Ota tana
  uy bo'shaydi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Polimorfizm xatosi `virtual` siz ko'rsatkichdan bola matnini kutish, `override` imzosini buzish yoki virtual bo'lmagan ota orqali `delete` qilish.",
        ],
        items: [
          {
            title: "virtual siz bola ovozini kutish",
            why: [
              "`Ota* p = &b;` haqiqiy obyektni eslab qolmaydi, toki metod `virtual` bo'lmasa. `p->gapir()` ota matnini yozadi. Bola matni `b.gapir()` da chiqadi.",
            ],
            wrong: `void gapir() const {
    std::cout << "ota{{n}}";
}
Ota* p = &b;
p->gapir();`,
            right: `virtual void gapir() const {
    std::cout << "ota{{n}}";
}
Ota* p = &b;
p->gapir();`,
          },
          {
            title: "override imzosi otanikiga mos emas",
            why: [
              "Ota `const` bo'lsa, bola ham `const` bo'lishi kerak. Farq bo'lsa, bu almashtirish emas. `override` yig'ilishni to'xtatadi. `override` siz yozilsa, yangi metod yashiradi va `p->gapir()` otada qoladi.",
            ],
            wrong: `void gapir() override {
    std::cout << "bola{{n}}";
}`,
            right: `void gapir() const override {
    std::cout << "bola{{n}}";
}`,
          },
          {
            title: "virtual bo'lmagan ota orqali delete",
            why: [
              "`Ota* p = new Bola(); delete p;` faqat ota destruktori `virtual` bo'lsa, belgilangan tartibda yopiladi. `virtual` yo'q bo'lsa, natija noma'lum. Ba'zan bola tanasi tushib qolganga o'xshaydi. Buni dastur natijasi deb yozmang.",
            ],
            wrong: `~Ota() {
    std::cout << "ota yop{{n}}";
}
Ota* p = new Bola();
delete p;`,
            right: `virtual ~Ota() {
    std::cout << "ota yop{{n}}";
}
Ota* p = new Bola();
delete p;`,
          },
        ],
      },
      quiz: [
        {
          id: "11.7-q1",
          question: "`gapir` virtual emas. `Ota* p = &b;` va `b` bola. `p->gapir()` nima yozadi?",
          options: ["ota", "bola", "ota va bola", "kod yig'ilmaydi"],
          answer: 0,
          explanation:
            "virtual yo'q. Chaqiruv p ning yozilgan turi Ota bo'yicha ketadi. Ekranda ota. b.gapir() esa bola yozadi.",
        },
        {
          id: "11.7-q2",
          question: "Ota `virtual void gapir() const`, bola `void gapir() const override`. `p->gapir()` nima yozadi?",
          options: ["ota", "bola", "hech narsa", "kod yig'ilmaydi"],
          answer: 1,
          explanation:
            "Imzo mos, override o'rnini tasdiqlaydi. p bola obyektini ushlaydi. Virtual chaqiruv Bola::gapir ga boradi. Ekranda bola.",
        },
        {
          id: "11.7-q3",
          question: "`~Ota` virtual emas. `Ota* p = new Bola(); delete p;` nima qiladi?",
          options: [
            "faqat ota yop yozadi",
            "bola yop, keyin ota yop yozadi",
            "noma'lum, kafolat yo'q",
            "kod yig'ilmaydi",
          ],
          answer: 2,
          explanation:
            "Haqiqiy tur Bola, ko'rsatkich turi Ota, destruktor virtual emas. delete bunday holda noma'lum. Virtual ~Ota bo'lsa, avval ~Bola, keyin ~Ota.",
        },
      ],
    },
  ],
};

export const chapter11 = decode(rawChapter);
