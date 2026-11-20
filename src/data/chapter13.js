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
  id: "13",
  number: 13,
  title: "Shablonlar va Xatolarni ushlash",
  summary:
    "Bitta yozuvdan har xil tur uchun funksiya va klass yasash, xatoni throw bilan chiqarib catch da ushlash.",
  lessons: [
    {
      id: "13.1",
      navTitle: "template",
      title: "template: bitta yozuv, har bir tur uchun alohida nusxa",
      goal: [
        "Bu darsdan keyin siz `template <typename T>` ni kompilyatorga «shu turni chaqiruvdan ol» degan ko'rsatma deb ochasiz. `class T` ham xuddi shu ma'no, T klass bo'lishi shart emas. Funksiya shabloni argumentdan tur topadi. Klass shablonida `Quti<int>` deb yozasiz. Ikki xil tur ikki xil kod bo'lishini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Sexda bitta qolip bor: «ikki narsadan kattasini qaytar». Qolipning o'zi hali quti emas. Bugun ichiga butun son solinsa, sex butun son qutisini yig'adi. Ertaga kasr solinsa, boshqa quti yig'iladi. Qolip bitta, tayyor buyum har tur uchun alohida.",
          "`typename T` qolipdagi bo'sh o'rinning nomi. U xotiradagi o'zgaruvchi emas. Dastur ishga tushganda T degan quti yo'q. Kompilyator chaqiruvni ko'rib, T o'rniga `int` yoki `double` qo'yib, oddiy funksiya yasaydi.",
          "`template <class T>` dagi `class` so'zi «faqat klass keladi» demaydi. Bu eski yozuv, `typename` bilan bir xil. Ichiga `int` ham tushadi. 11-bobdagi `class Talaba` boshqa narsa: u tur ochadi. Bu yerdagi `class` faqat shablon parametrining kalit so'zi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "Shablon sarlavhasi e'londan oldin turadi. Tana chaqiruv turgan faylda ko'rinishi kerak. Faqat e'lon qoldirib, tanani boshqa `.cpp` ga yashirsangiz, bog'lovchi shu turdagi nusxani topolmasligi mumkin.",
        ],
        items: [
          {
            title: "Funksiya shabloni",
            paragraphs: [
              "`template <typename T>` keyingi funksiyani shablon qiladi. `T katta(T a, T b)` ikkala argument ham bitta T. `katta(3, 5)` da T `int`. `katta(3.5, 2.25)` da T `double`. Ikki chaqiruv ikki funksiya.",
              "`katta(3, 4.5)` yig'ilmaydi. Birinchi argument T ni `int` desa, ikkinchisi `double` deyapti. Kompilyator ikkisini bir T ga yig'maydi va jimgina aylantirmaydi. Ikkalasini `double` qilmoqchi bo'lsangiz, `katta<double>(3, 4.5)` yozing. 3 shunda `double` ga aylanadi.",
              "`typename` o'rniga `class` yozish mumkin. `template <class T>` ham `int` qabul qiladi. Teng sonlarda `b > a` yolg'on bo'lsa, birinchi argument qaytadi. 8 va 8 dan natija 8.",
            ],
            code: `template <typename T>
T katta(T a, T b) {
    if (a > b) {
        return a;
    }
    return b;
}`,
            codeLabel: "ikki argument bitta T",
            table: {
              caption: "Chaqiruv qaysi turni tanlaydi. Aralash tur o'zi tanlanmaydi.",
              headers: ["Chaqiruv", "T", "Natija"],
              rows: [
                ["katta(3, 5)", "int", "5"],
                ["katta(3.5, 2.25)", "double", "3.5"],
                ["katta(3, 4.5)", "tanlanmaydi", "yig'ilmaydi"],
                ["katta<double>(3, 4.5)", "double", "4.5"],
              ],
            },
          },
          {
            title: "Klass shabloni",
            paragraphs: [
              "`template <typename T> class Quti` har bir T uchun alohida klass. `Quti<int>` va `Quti<double>` ikki tur. Birining obyektini ikkinchisiga jimgina berolmaysiz.",
              "`Quti<int> son(18);` aniq yozuv. C++17 dan konstruktor argumentidan tur topilishi mumkin: `Quti son(18);` ko'pincha `int` deb oladi. Bu kitobda turini `Quti<int>` deb yozamiz, o'qiydigan odam T ni ko'radi.",
              "`Quti son;` yig'ilmaydi. Argument yo'q, tur ham yo'q, standart konstruktor ham yo'q. Maydon `T qiymat_`. `Quti<int>` ichida `int`, shu kitobda odatda 4 bayt. `Quti<double>` ichida `double`, odatda 8.",
            ],
            code: `template <typename T>
class Quti {
public:
    Quti(T qiymat) : qiymat_(qiymat) {}
    T ol() const { return qiymat_; }
private:
    T qiymat_;
};`,
            codeLabel: "Quti<int> va Quti<double> boshqa-boshqa",
          },
          {
            title: "Tana ko'rinishi kerak",
            paragraphs: [
              "Shablon oddiy funksiya emas. Kompilyator nusxani chaqiruvni ko'rgan joyda yasaydi. Tana o'sha paytda ko'rinmasa, `int` uchun funksiya tug'maydi.",
              "Klass metodi klass tashqarisida yozilsa, sarlavha yana kerak: `template <typename T>` va `Quti<T>::ol`. Ichkarida yozilgan qisqa metodlar shu misollarda yetarli.",
              "Taqqoslash `>` shu turda bo'lishi kerak. `int` va `double` da bor. `>` si yo'q tur bilan `katta` chaqirilsa, nusxa yig'ilmaydi. Shablon xatosi ko'pincha chaqiruv qatorida, qolip qatorida emas.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "int dan 5, double dan 3.5",
          intro: [
            "Bitta `katta`. Birinchi chaqiruv butun son, ikkinchisi kasr. Ekranda 5, keyin 3.5.",
          ],
          codeLabel: "katta.cpp",
          code: `#include <iostream>

template <typename T>
T katta(T a, T b) {
    if (a > b) {
        return a;
    }
    return b;
}

int main() {
    std::cout << katta(3, 5) << "{{n}}";
    std::cout << katta(3.5, 2.25) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `5
3.5`,
          analysis: [
            {
              lines: "3-9",
              text: "Qolip. Hali `int` funksiyasi ham, `double` funksiyasi ham yo'q. T xotira qutisi emas. 5 va 3.5 shu qatorlarda tug'ilmaydi.",
            },
            {
              lines: "12",
              text: "`katta(3, 5)` T ni `int` qiladi. 5 katta, `return b`. Ekranda 5. Bu oddiy `int` funksiyasining chaqiruvi. Kasr nusxasi bu qatorda yasalmaydi.",
            },
            {
              lines: "13",
              text: "`3.5` va `2.25` ikkalasi ham `double`, ikkalasi ham aniq kasr. T `double`. `3.5 > 2.25`, `return a`. Ekranda 3.5. Bu birinchi chaqiruvdagi funksiya emas.",
            },
            {
              lines: "14",
              text: "`katta(3, 4.5)` bo'lsa, T bir vaqtning o'zida `int` va `double` bo'la olmaydi, yig'ilmaydi. `katta<double>(3, 4.5)` esa 3 ni kasrga aylantirib 4.5 qaytaradi.",
            },
          ],
        },
        {
          title: "Quti<int> 18, Quti<double> 2.5",
          intro: [
            "Ikkita quti, ikki tur. `ol` o'z maydonining nusxasini qaytaradi. Ekranda 18, keyin 2.5.",
          ],
          codeLabel: "quti.cpp",
          code: `#include <iostream>

template <typename T>
class Quti {
public:
    Quti(T qiymat) : qiymat_(qiymat) {}
    T ol() const { return qiymat_; }
private:
    T qiymat_;
};

int main() {
    Quti<int> son(18);
    Quti<double> kasr(2.5);
    std::cout << son.ol() << "{{n}}";
    std::cout << kasr.ol() << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `18
2.5`,
          analysis: [
            {
              lines: "3-10",
              text: "Klass qolipi. `Quti` yolg'iz tur emas. `Quti<int>` va `Quti<double>` keyinroq, chaqiruvdan yasaladi. Maydon turi T.",
            },
            {
              lines: "13",
              text: "`son` ichida `int` 18. Konstruktor ro'yxatda yozadi, 11.4. `Quti<double>` bilan aralashmaydi.",
            },
            {
              lines: "14",
              text: "`kasr` boshqa tur. Ichida `double` 2.5. Bu son aniq. `son = kasr` yig'ilmaydi, turlari boshqa.",
            },
            {
              lines: "15-16",
              text: "`ol` `const`, maydonni yozmaydi, nusxa qaytaradi. Ekranda 18, keyin 2.5. `Quti<int>` odatda 4 bayt, `Quti<double>` odatda 8. Bu shu kitobdagi `int` va `double` o'lchami.",
            },
          ],
        },
        {
          title: "class T ham int oladi, tengda 8",
          intro: [
            "`class T` klass kutmaydi. Teng 8 va 8 dan birinchisi qaytadi. `katta<int>(4, 9)` turni qo'lda aytadi va 9 chiqaradi.",
          ],
          codeLabel: "classT.cpp",
          code: `#include <iostream>

template <class T>
T katta(T a, T b) {
    if (b > a) {
        return b;
    }
    return a;
}

int main() {
    std::cout << katta(8, 8) << "{{n}}";
    std::cout << katta<int>(4, 9) << "{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `8
9`,
          analysis: [
            {
              lines: "3-9",
              text: "`class T` bu yerda `typename T` bilan bir xil. T `int` bo'lishi mumkin. 11-bobdagi klass e'loni emas.",
            },
            {
              lines: "12",
              text: "Ikki argument ham 8, T `int`. `b > a` yolg'on. `return a`. Ekranda 8. Tenglikda ikkinchisini katta deb o'zgartirmaydi.",
            },
            {
              lines: "13",
              text: "`katta<int>` T ni qo'lda `int` qiladi. 4 va 9 allaqachon `int`. `9 > 4`, `return b`. Ekranda 9. Aralash turda shu qo'l yozuvi kerak, aks holda yig'ilmaydi.",
            },
            {
              lines: "14",
              text: "Ishlayotgan dasturda T degan o'zgaruvchi yo'q. Bor narsa `int` oladigan oddiy `katta`. Qolip manbada qoladi.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "Manbadagi `template` bayt kodda umumiy quti bo'lib yotmaydi. `katta(3, 5)` kompilyatorni `int katta(int, int)` yasashga undaydi. `katta(3.5, 2.25)` ikkinchi funksiya, `double` argumentli. Ikkalasi exe ichida alohida. Chaqirilmagan tur uchun nusxa yasalmaydi.",
          "Ish vaqtida T ning manzili yo'q. `a` va `b` oddiy parametrlar. `int` nusxasida ular 4 baytlik son. `return` shu sonning nusxasini qaytaradi, 7.4. Qolipning o'zi stekda joy egallamaydi.",
          "`Quti<int> son(18)` bitta obyekt, ichida `int` 18. `Quti<double> kasr(2.5)` boshqa joy, ichida 8 baytlik 2.5. Ikkisi bitta klassning ikki obyekti emas. Ikkita tur, 11.1 dagi kabi har obyekt o'z maydoniga ega.",
          "`katta<double>(3, 4.5)` chaqiruvida 3 dan vaqtinchalik `double` 3.0 yasaladi, keyin `double` funksiyaga kiradi. Asl `int` 3 o'zgaruvchisi yo'q, chunki 3 literal. Aralash `katta(3, 4.5)` esa nusxa yasashdan oldin to'xtaydi. Xotira ochilmaydi, dastur yig'ilmaydi.",
        ],
        diagram: `qolip katta(T, T)
  chaqiruv (3, 5)     -> int funksiya, natija 5
  chaqiruv (3.5, 2.25)-> double funksiya, natija 3.5
  T degan quti yo'q

Quti<int> son
  qiymat_ [18]     odatda 4 bayt

Quti<double> kasr
  qiymat_ [2.5]    odatda 8 bayt
  son = kasr yig'ilmaydi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Shablon xatosi T ni ish vaqtidagi tur deb o'ylash, ikki xil argumentni bitta T ga tiqish yoki klass shablonini tursiz ochish.",
        ],
        items: [
          {
            title: "Tanani yashirish",
            why: [
              "Chaqiruv nusxa yasashi uchun tanani ko'rishi kerak. Faqat e'lon qolsa, `int` uchun funksiya tug'maydi. `class T` esa xato emas: u `typename` bilan bir xil va `int` oladi.",
            ],
            wrong: `template <typename T>
T katta(T a, T b);

int main() {
    return katta(3, 5);
}`,
            right: `template <typename T>
T katta(T a, T b) {
    if (a > b) {
        return a;
    }
    return b;
}`,
          },
          {
            title: "int va double ni bitta T ga berish",
            why: [
              "`katta(3, 4.5)` da birinchi T `int`, ikkinchisi `double`. Kompilyator tanlay olmaydi va jimgina kasrga o'tkazmaydi. Ikkalasi kasr bo'lishi kerak bo'lsa, `katta<double>` yoki ikkala literal ham kasr.",
            ],
            wrong: `katta(3, 4.5);`,
            right: `katta<double>(3, 4.5);`,
          },
          {
            title: "Quti ni tursiz va argumentsiz ochish",
            why: [
              "`Quti son;` na T ni aytadi, na konstruktor argumenti beradi. Bizdagi qolipda standart konstruktor yo'q. `Quti<int> son(18)` turini ham, qiymatini ham beradi.",
            ],
            wrong: `Quti son;`,
            right: `Quti<int> son(18);`,
          },
        ],
      },
      quiz: [
        {
          id: "13.1-q1",
          question: "`template <class T>` va `katta(8, 8)` da T nima bo'la oladi?",
          options: [
            "faqat klass, int yig'ilmaydi",
            "faqat double",
            "int ham bo'ladi, class bu yerda typename bilan bir xil",
            "T ish vaqtida o'zgaruvchi",
          ],
          answer: 2,
          explanation:
            "Shablon parametridagi class so'zi klass turini talab qilmaydi. int qabul qilinadi. typename bilan ma'no bir xil.",
        },
        {
          id: "13.1-q2",
          question: "`T katta(T a, T b)` kattasini qaytaradi. `katta(3, 5)` necha?",
          options: ["3", "5", "3.5", "kod yig'ilmaydi"],
          answer: 1,
          explanation:
            "Ikki argument ham int, T int. 5 katta. Ekranda 5. Double nusxasi bu chaqiruvda yasalmaydi.",
        },
        {
          id: "13.1-q3",
          question: "Xuddi shu `katta(T, T)` uchun `katta(3, 4.5)` nima qiladi?",
          options: ["4.5", "3", "4", "kod yig'ilmaydi"],
          answer: 3,
          explanation:
            "T bir paytda int ham, double ham bo'la olmaydi. Jimgina aylantirish yo'q. katta<double>(3, 4.5) bo'lsa, 4.5 qaytadi.",
        },
      ],
    },
    {
      id: "13.2",
      navTitle: "try catch",
      title: "try, throw, catch: xatoni bo'lishdan oldin chiqarish",
      goal: [
        "Bu darsdan keyin siz bo'linuvchi 0 bo'lsa, bo'lishdan oldin `throw` qilasiz. `try` shu chaqiruvni o'rab turadi, `catch` mos turni ushlaydi va dastur `catch` dan keyin davom etadi. Butun sonni 0 ga bo'lishning o'zi ushlanadigan istisno emasligini bilasiz.",
      ],
      analogy: {
        title: "Hayotiy analogiya",
        paragraphs: [
          "Kassir 10 ni 2 ga bo'ladi, natija 5. Kimdir 0 ga bo'l deb qolsa, kassir bo'linmani boshmaydi. Qog'ozga «nol» deb yozib, nazoratchiga uzatadi. Bu `throw`. Nazoratchi `catch`. U qog'ozni o'qib, navbatni yopmaydi, keyingi mijozga o'tadi.",
          "`try` nazorat qilingan peshtaxta. Istisno shu yerdan chiqsa, peshtaxta ichidagi keyingi ish tashlanadi. 0 ga bo'lishdan keyin «yopilmaydi» yozilgan qator yozilmaydi. Ish `catch` tugagach, peshtaxtadan tashqaridagi «davom» da ketadi. Xato qatoriga qaytmaydi.",
          "Butun sonni 0 ga bo'lishni til istisno qilib bermaydi. Kassir o'zi to'xtashi kerak. To'xtamasdan bo'lsa, natija noma'lum. `try` yozilgani uchun 0 ga bo'lish xavfsiz bo'lib qolmaydi.",
        ],
      },
      rules: {
        title: "Texnik qoida va sintaksis",
        paragraphs: [
          "`throw` istisno obyektini chiqaradi va funksiyani tark etadi. `catch` turi mos kelsa, ushlaydi. Mos kelmasa va boshqa ushlovchi bo'lmasa, `std::terminate` chaqiriladi. Alohida oyna va'da qilinmaydi.",
        ],
        items: [
          {
            title: "Bo'lishdan oldin throw",
            paragraphs: [
              "`b == 0` bo'lsa, `throw std::invalid_argument(\"nol\")` bo'linmadan oldin chiqadi. `return a / b` yugurmaydi. Butun `/` nolga yetib bormaydi, shuning uchun bu yo'l noma'lum xatti-harakat emas.",
              "`#include <stdexcept>`. `invalid_argument` mantiqiy xato, `std::exception` dan kelib chiqadi. `what()` berilgan matnni qaytaradi. «nol» konsolda shu so'z.",
              "`try` ichida `bol(10, 2)` avval 5 chiqaradi. `bol(10, 0)` otadi. Shu `try` dagi keyingi qator yugurmaydi. Ushlovchi bitta. Keyin `try` dan tashqaridagi qator yuguradi. Istisno xato qatoriga qaytarmaydi.",
            ],
            code: `int bol(int a, int b) {
    if (b == 0) {
        throw std::invalid_argument("nol");
    }
    return a / b;
}`,
            codeLabel: "0 bo'lsa, / yozilmaydi",
            table: {
              caption: "Butun bo'lish va istisno. Ikkalasini aralashtirmang.",
              headers: ["Yozuv", "Nima bo'ladi"],
              rows: [
                ["bol(10, 2)", "5, istisno yo'q"],
                ["b == 0 bo'lsa throw", "catch ushlaydi, / yugurmaydi"],
                ["try ichida 10 / 0", "istisno emas, natija noma'lum"],
              ],
            },
          },
          {
            title: "Mos tur va tartib",
            paragraphs: [
              "`catch (const std::invalid_argument& x)` havola. Obyekt kesilmaydi. Qiymat bilan `catch (std::exception x)` asosiy qismning nusxasini oladi, haqiqiy tur yo'qolishi mumkin. Havola yozing.",
              "Birinchi mos `catch` yutadi. `invalid_argument` ham `exception`. Avval `catch (const std::exception&)` tursa, aniq ushlovchi yopiq qoladi va umumiy tana yuguradi. Aniq tur yuqorida tursin.",
              "`catch (...)` hamma narsani ushlaydi, obyekt bermaydi. Oxirida tursin. `throw` qilingan tur bilan `catch` turi mos kelmasa, bu ushlovchi hisoblanmaydi. `int` ushlovchi `invalid_argument` ni ushlamaydi.",
            ],
            code: `try {
    yoshYoz(-3);
} catch (const std::invalid_argument& x) {
    std::cout << x.what() << "{{n}}";
}`,
            codeLabel: "aniq tur, const havola",
          },
          {
            title: "Chiqish va lokal obyekt",
            paragraphs: [
              "`throw` funksiyadan oddiy `return` kabi chiqadi, lekin qiymat qaytarmaydi. Chaqiruvchiga qadar stekdagi lokal obyektlar teskari tartibda yopiladi. Destruktor `catch` tanasidan oldin yuguradi.",
              "`ish` ichidagi `Qalam` otishdan oldin tug'ilgan bo'lsa, yopilish yozuvi `what()` dan oldin chiqadi. `try` ichida `ish()` dan keyingi qator yugurmaydi. Istisno bo'lmasa ham lokal blok tugaganda yopiladi. Otish yagona sabab emas, 11.4.",
              "Hech kim ushlamasa, lokal yo'qotishdan keyin `std::terminate`. `catch` dan keyingi «davom» yozilmaydi. Destruktor ichidan yangi istisno otmang. Yig'ishtirish paytida ikkinchi otish ham `terminate`.",
            ],
          },
        ],
      },
      examples: [
        {
          title: "10 / 2 natijasi 5, 0 da nol",
          intro: [
            "`bol(10, 2)` bo'ladi. `bol(10, 0)` bo'linmasdan otadi. `yopilmaydi` chiqmaydi. Ushlovchidan keyin `davom` chiqadi.",
          ],
          codeLabel: "bolish.cpp",
          code: `#include <iostream>
#include <stdexcept>

int bol(int a, int b) {
    if (b == 0) {
        throw std::invalid_argument("nol");
    }
    return a / b;
}

int main() {
    try {
        std::cout << bol(10, 2) << "{{n}}";
        std::cout << bol(10, 0) << "{{n}}";
        std::cout << "yopilmaydi{{n}}";
    } catch (const std::invalid_argument& x) {
        std::cout << x.what() << "{{n}}";
    }
    std::cout << "davom{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `5
nol
davom`,
          analysis: [
            {
              lines: "4-9",
              text: "`b` 0 bo'lsa, 6-qator otadi va 8-qator yugurmaydi. `/` nolni ko'rmaydi. `b` nol bo'lmasa, butun bo'lish, 10 / 2 natijasi 5.",
            },
            {
              lines: "12-13",
              text: "`try` ichida birinchi chaqiruv 5 ni yozadi. Istisno yo'q, keyingi qatorga o'tiladi.",
            },
            {
              lines: "14-15",
              text: "`bol(10, 0)` otadi. 14-qatorning `cout` i yozilmaydi, chunki funksiya son qaytarmaydi. 15-qator umuman yugurmaydi. Boshqaruv 16-qatorga sakraydi, 14-qatorga qaytmaydi.",
            },
            {
              lines: "16-19",
              text: "`what()` matn `nol`. Ekranda nol. `catch` tugaydi. 19-qator `try` dan tashqarida, yuguradi. Ekranda davom. `10 / 0` ni `try` ichiga qo'yib, `throw` siz qoldirsangiz, bu ushlovchi ishlashi shart emas. Natija noma'lum.",
            },
          ],
        },
        {
          title: "18 yoziladi, -3 dan keyin 21 tushib qoladi",
          intro: [
            "Manfiy yosh `cout` dan oldin otadi. 18 chiqadi, keyin `manfiy`. 21 chiqmaydi. So'ng `davom`.",
          ],
          codeLabel: "yosh.cpp",
          code: `#include <iostream>
#include <stdexcept>

void yoshYoz(int yosh) {
    if (yosh < 0) {
        throw std::invalid_argument("manfiy");
    }
    std::cout << yosh << "{{n}}";
}

int main() {
    try {
        yoshYoz(18);
        yoshYoz(-3);
        yoshYoz(21);
    } catch (const std::invalid_argument& x) {
        std::cout << x.what() << "{{n}}";
    }
    std::cout << "davom{{n}}";
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `18
manfiy
davom`,
          analysis: [
            {
              lines: "4-9",
              text: "0 dan kichik bo'lsa, 8-qator yozilmaydi. 18 va 21 musbat, ular `cout` gacha yetadi. Istisno son qaytarmaydi, funksiya `void`.",
            },
            {
              lines: "13",
              text: "`yoshYoz(18)` shartni o'tadi. Ekranda 18. `try` davom etadi.",
            },
            {
              lines: "14-15",
              text: "`-3` 6-qatorda otadi. 14-qator tugamaydi. 15-qatordagi 21 chaqirilmaydi. `catch` xato joyidan keyin davom ettirmaydi.",
            },
            {
              lines: "16-19",
              text: "Ushlovchi `manfiy` ni yozadi. 19-qator yuguradi, ekranda davom. `try` bo'lmasa, ushlangan istisno `terminate` ga boradi va `davom` va'da qilinmaydi.",
            },
          ],
        },
        {
          title: "Qalam catch dan oldin yopiladi",
          intro: [
            "`ish` ichida qalam tug'iladi, keyin otish. Yopilish yozuvi `to'xta` dan oldin. `keyin` chiqmaydi.",
          ],
          codeLabel: "qalam.cpp",
          code: `#include <iostream>
#include <stdexcept>

class Qalam {
public:
    ~Qalam() {
        std::cout << "qalam yop{{n}}";
    }
};

void ish() {
    Qalam q;
    throw std::runtime_error("to'xta");
}

int main() {
    try {
        ish();
        std::cout << "keyin{{n}}";
    } catch (const std::runtime_error& x) {
        std::cout << x.what() << "{{n}}";
    }
    return 0;
}`,
          consoleTitle: "Konsol",
          console: `qalam yop
to'xta`,
          analysis: [
            {
              lines: "4-9",
              text: "Destruktor qalam yop deb yozadi. Istisno bo'lmasa ham obyekt blokdan chiqganda shu ishlaydi. Otish ham chiqish.",
            },
            {
              lines: "11-14",
              text: "`q` 12-qatorda tug'iladi. 13-qator `runtime_error` otadi. `what()` matni `to'xta`. `q` shu funksiya tark etilganda, `catch` tanasidan oldin yopiladi.",
            },
            {
              lines: "18-19",
              text: "`ish()` qaytmaydi. 19-qator yugurmaydi. `keyin` yo'q. Bu 13.2 dagi «yopilmaydi» bilan bir xil qoida.",
            },
            {
              lines: "20-21",
              text: "Avval destruktor, ekranda qalam yop. Keyin ushlovchi, ekranda to'xta. Istisno obyekti ushlovchi tugaguncha yashaydi. `x` shu obyektga havola. Ushlovchidan keyin `x` yo'q.",
            },
          ],
        },
      ],
      memory: {
        title: "Xotirada nima sodir bo'ladi?",
        paragraphs: [
          "`throw std::invalid_argument(\"nol\")` istisno obyektini yasaydi. Joy qayerdaligi til bo'yicha aniqlanmagan. U `bol` ning lokal parametrlari emas. `b` 0 ekanini tekshirish oddiy `int`. Otishdan keyin `bol` ning parametrlari yopiladi, `/` bajarilmaydi.",
          "Boshqaruv `catch` dagi havolaga sakraydi. `x` istisno obyektining o'zi emas, unga bog'langan nom. `what()` shu obyekt ichidagi matnni ko'rsatadi. Ushlovchi tugagach, istisno obyekti yo'qoladi. `what()` ko'rsatkichini saqlab, keyin o'qimang.",
          "`ish` dagi `Qalam q` stekda. Otish stekni `catch` gacha yig'ishtiradi. `q` ning destruktori shu yig'ishtirishda, ushlovchi tanasidan oldin chaqiriladi. `keyin` qatori yugurmagani uchun uning hech qanday yozuvi buferga tushmaydi.",
          "`try` ichidagi `10 / 0` istisno obyekti yasamaydi. Butun nolga bo'lish noma'lum. Hech qanday `catch` uni ushlashga majbur emas. Oldini olish `if` va `throw` da, bo'linish qatoriga yetkazmaslikda.",
        ],
        diagram: `bol(10, 2)
  return 5
  istisno obyekti yo'q

bol(10, 0)
  throw invalid_argument
  / yugurmaydi
  catch x -> "nol"
  keyin davom

ish()
  Qalam q tug'iladi
  throw
  ~Qalam   qalam yop
  catch    to'xta
  keyin yugurmaydi`,
      },
      mistakes: {
        title: "Ko'p uchraydigan xatolar",
        intro: [
          "Istisno xatosi 0 ga bo'lishni `catch` ushlaydi deb o'ylash, umumiy ushlovchini aniq turdan oldin qo'yish yoki otishdan keyin `try` ichi davom etadi deb o'qish.",
        ],
        items: [
          {
            title: "10 / 0 ni try ushlaydi deb yozish",
            why: [
              "Butun sonni nolga bo'lish istisno emas. Natija noma'lum. `catch` ishlashi shart emas. Nolni `if` ushlaydi va `throw` bo'linishdan oldin chiqadi.",
            ],
            wrong: `try {
    std::cout << (10 / 0) << "{{n}}";
} catch (const std::exception& x) {
    std::cout << "nol{{n}}";
}`,
            right: `if (b == 0) {
    throw std::invalid_argument("nol");
}
return a / b;`,
          },
          {
            title: "Umumiy catch ni aniq turdan oldin qo'yish",
            why: [
              "`invalid_argument` ham `exception`. Birinchi mos ushlovchi yutadi. Umumiy tur yuqorida tursa, aniq tana yopiq qoladi. Avval aniq tur, keyin asos.",
            ],
            wrong: `catch (const std::exception& x) {
    std::cout << "umumiy{{n}}";
} catch (const std::invalid_argument& x) {
    std::cout << "aniq{{n}}";
}`,
            right: `catch (const std::invalid_argument& x) {
    std::cout << "aniq{{n}}";
} catch (const std::exception& x) {
    std::cout << "umumiy{{n}}";
}`,
          },
          {
            title: "throw dan keyin try ichi davom etadi deb o'ylash",
            why: [
              "`yoshYoz(-3)` otsa, keyingi `yoshYoz(21)` chaqirilmaydi. Boshqaruv `catch` ga o'tadi, keyin `try` dan keyingi qatorga. Xato qatorining ostiga qaytmaydi.",
            ],
            wrong: `yoshYoz(-3);
std::cout << "davom{{n}}";`,
            right: `try {
    yoshYoz(-3);
} catch (const std::invalid_argument& x) {
    std::cout << x.what() << "{{n}}";
}
std::cout << "davom{{n}}";`,
          },
        ],
      },
      quiz: [
        {
          id: "13.2-q1",
          question: "`bol(10, 0)` `throw` qilsa, `try` ichidagi keyingi `cout << \"yopilmaydi\"` nima qiladi?",
          options: [
            "yopilmaydi chiqadi",
            "yugurmaydi",
            "0 chiqaradi",
            "5 chiqaradi",
          ],
          answer: 1,
          explanation:
            "throw try ichidagi qolgan qatorlarni tashlaydi. Boshqaruv catch ga o'tadi, throw qatoriga qaytmaydi. davom catch dan keyin yoziladi.",
        },
        {
          id: "13.2-q2",
          question: "`try` ichida `10 / 0` yozilsa va `throw` bo'lmasa, nima va'da qilinadi?",
          options: [
            "catch invalid_argument ushlaydi",
            "natija 0",
            "noma'lum, til istisno va'da qilmaydi",
            "ekranga doim nol yoziladi",
          ],
          answer: 2,
          explanation:
            "Butun nolga bo'lish istisno emas. try buni xavfsiz qilmaydi. Nolni if bilan ushlang va bo'lishdan oldin throw qiling.",
        },
        {
          id: "13.2-q3",
          question: "`throw std::invalid_argument` va birinchi ushlovchi `const std::exception&`. Qaysi tana yuguradi?",
          options: [
            "aniq invalid_argument tanasi",
            "umumiy exception tanasi",
            "ikkalasi ham",
            "kod yig'ilmaydi",
          ],
          answer: 1,
          explanation:
            "invalid_argument ham exception. Birinchi mos catch yutadi. Umumiy tur yuqorida tursa, aniq tana yopiq qoladi. Aniq turni oldin yozing.",
        },
      ],
    },
  ],
};

export const chapter13 = decode(rawChapter);
