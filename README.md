# 📖 API Documentation – Qur'an API (NestJS)

---

## ✅ 1. **GET /surahs**

### Deskripsi:

Mengambil daftar seluruh surah dalam Al-Qur'an.

### Response:

```json
[
  {
    "number": 1,
    "name": "Al-Fatihah",
    "arabicName": "الفاتحة",
    "englishName": "The Opening",
    "surahMeaning": "Pembukaan",
    "ayahsCount": 7,
    "classification": "Meccan",
    "juzId": 1
  },
  {
    "number": 2,
    "name": "Al-Baqarah",
    "arabicName": "البقرة",
    "englishName": "The Cow",
    "surahMeaning": "Sapi Betina",
    "ayahsCount": 286,
    "classification": "Medinan",
    "juzId": 1
  }
]
```

### Error:

Tidak ada (selalu berhasil, kecuali error server `500`)

---

## ✅ 2. **GET /surahs/:number**

### Deskripsi:

Mengambil detail surah beserta ayat-ayatnya.

### Contoh: `GET /surahs/1`

### Response:

```json
{
  "number": 1,
  "name": "Al-Fatihah",
  "arabicName": "الفاتحة",
  "englishName": "The Opening",
  "surahMeaning": "Pembukaan",
  "ayahsCount": 7,
  "classification": "Meccan",
  "juzId": 1,
  "ayahs": [
    {
      "number": 1,
      "text": "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      "arabicText": "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ",
      "translations": [
        {
          "languageCode": "en",
          "translatedText": "In the name of Allah, the Entirely Merciful, the Especially Merciful."
        },
        {
          "languageCode": "id",
          "translatedText": "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang."
        }
      ]
    }
    // ... ayat lainnya
  ]
}
```

### Error:

* `404 Not Found`: Jika nomor surah tidak ditemukan

```json
{
  "statusCode": 404,
  "message": "Surah not found",
  "error": "Not Found"
}
```

---

## ✅ 3. **GET /surahs/:surahNumber/ayahs/:ayahNumber**

### Deskripsi:

Mengambil satu ayat dari surah tertentu.

### Contoh: `GET /surahs/2/ayahs/255`

### Response:

```json
{
  "surahNumber": 2,
  "ayahNumber": 255,
  "text": "Allah! There is no deity except Him, the Ever-Living, the Sustainer of [all] existence...",
  "arabicText": "اللَّهُ لَا إِلَـٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ...",
  "translations": [
    {
      "languageCode": "en",
      "translatedText": "Allah! There is no deity except Him, the Ever-Living, the Sustainer of [all] existence..."
    },
    {
      "languageCode": "id",
      "translatedText": "Allah, tidak ada Tuhan selain Dia, Yang Maha Hidup, Yang terus-menerus mengurus makhluk-Nya..."
    }
  ]
}
```

### Error:

* `404 Not Found`: Jika surah atau ayat tidak ditemukan

```json
{
  "statusCode": 404,
  "message": "Ayah not found",
  "error": "Not Found"
}
```

---

## ✅ 4. **GET /juzs**

### Deskripsi:

Mengambil daftar seluruh juz dalam Al-Qur'an.

### Response:

```json
[
  {
    "number": 1,
    "arabicName": "الجزء الأول",
    "englishName": "Juz 1"
  },
  {
    "number": 2,
    "arabicName": "الجزء الثاني",
    "englishName": "Juz 2"
  }
]
```

---

## ✅ 5. **GET /juzs/:number**

### Deskripsi:

Mengambil detail juz beserta daftar surah di dalamnya.

### Contoh: `GET /juzs/1`

### Response:

```json
{
  "number": 1,
  "arabicName": "الجزء الأول",
  "englishName": "Juz 1",
  "surahs": [
    {
      "number": 1,
      "name": "Al-Fatihah",
      "arabicName": "الفاتحة",
      "englishName": "The Opening",
      "surahMeaning": "Pembukaan",
      "ayahsCount": 7,
      "classification": "Meccan"
    },
    {
      "number": 2,
      "name": "Al-Baqarah",
      "arabicName": "البقرة",
      "englishName": "The Cow",
      "surahMeaning": "Sapi Betina",
      "ayahsCount": 286,
      "classification": "Medinan"
    }
  ]
}
```

### Error:

* `404 Not Found`: Jika nomor juz tidak ditemukan

```json
{
  "statusCode": 404,
  "message": "Juz not found",
  "error": "Not Found"
}
```

---

## ✅ 6. **GET /search?q=:query**

### Deskripsi:

Mencari ayat berdasarkan kata kunci dari terjemahan (Translation.translatedText).

### Contoh: `GET /search?q=sabar`

### Response:

```json
[
  {
    "surahNumber": 2,
    "surahName": "Al-Baqarah",
    "ayahNumber": 153,
    "text": "O you who have believed, seek help through patience and prayer...",
    "arabicText": "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ...",
    "translations": [
      {
        "languageCode": "en",
        "translatedText": "O you who have believed, seek help through patience and prayer..."
      },
      {
        "languageCode": "id",
        "translatedText": "Hai orang-orang yang beriman, jadikanlah sabar dan salat sebagai penolongmu..."
      }
    ]
  }
  // ... hasil lainnya
]
```

### Error:

* `400 Bad Request`: Jika parameter query kosong

```json
{
  "statusCode": 400,
  "message": "Query parameter 'q' is required",
  "error": "Bad Request"
}
```

---

## ✅ 7. **GET /tafsir/:surahNumber/:ayahNumber** *(opsional)*

### Deskripsi:

Mengambil tafsir ayat tertentu (jika tersedia).

### Contoh: `GET /tafsir/2/255`

### Response:

```json
{
  "surahNumber": 2,
  "ayahNumber": 255,
  "tafsir": "Ayat Kursi adalah ayat yang menjelaskan tentang keesaan dan kekuasaan Allah..."
}
```

### Error:

* `404 Not Found`: Jika tafsir tidak tersedia

```json
{
  "statusCode": 404,
  "message": "Tafsir not found for this ayah",
  "error": "Not Found"
}
```

---

## 🔐 8. **POST /bookmark** *(opsional, butuh login)*

### Deskripsi:

Menyimpan bookmark ayat untuk user.

### Request Body:

```json
{
  "surahNumber": 2,
  "ayahNumber": 255
}
```

### Response:

```json
{
  "message": "Bookmark saved successfully"
}
```

### Error:

* `401 Unauthorized`: Jika tidak ada token

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

* `400 Bad Request`: Data tidak valid

---

## 🔐 9. **GET /user/bookmarks** *(opsional, login required)*

### Deskripsi:

Mengambil daftar bookmark milik user.

### Response:

```json
[
  {
    "surahNumber": 2,
    "ayahNumber": 255,
    "text": "...",
    "arabicText": "...",
    "translations": [
      {
        "languageCode": "en",
        "translatedText": "..."
      }
    ],
    "timestamp": "2025-06-20T15:00:00Z"
  }
]
```

---

## 🔐 10. **POST /auth/login** *(opsional)*

### Request:

```json
{
  "email": "user@example.com",
  "password": "secret"
}
```

### Response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```

---

## 🔐 11. **POST /auth/register** *(opsional)*

### Request:

```json
{
  "email": "user@example.com",
  "password": "secret"
}
```

### Response:

```json
{
  "message": "User registered successfully"
}
```
