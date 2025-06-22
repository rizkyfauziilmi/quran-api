# Quran API Endpoints Documentation

This API provides **read-only** access to Quranic data: Surahs, Juzs, Ayahs, and Translations. All endpoints return JSON.

---

## Response Format

All responses follow this structure:
```json
{
  "status": "success",
  "message": "OK",
  "data": ... // the actual result (object, array, or null)
}
```
For errors:
```json
{
  "status": "error",
  "message": "Not Found",
  "code": 404
}
```

---

## Surahs

### List All Surahs
- **GET** `/
api/surahs`
- **Query:** `classification`, `juz`, `page`, `limit`
- **Returns:** Array of Surahs
**Example:**
```json
{
  "status": "success",
  "message": "OK",
  "data": [
    {
      "number": 1,
      "arabicName": "الفاتحة",
      "latinName": "Al-Fatihah",
      "surahMeaning": "The Opening",
      "ayahsCount": 7,
      "classification": "Meccan",
      "juzId": 1
    }
    // ...
  ]
}
```

### Get Surah by Number
- **GET** `/api/surahs/:number`
- **Returns:** Surah with Ayahs
**Example:**
```json
{
  "status": "success",
  "message": "OK",
  "data": {
    "number": 1,
    "arabicName": "الفاتحة",
    "latinName": "Al-Fatihah",
    "surahMeaning": "The Opening",
    "ayahsCount": 7,
    "classification": "Meccan",
    "juzId": 1,
    "ayahs": [
      {
        "id": 1,
        "number": 1,
        "arabicText": "...",
        "originalArabicText": "...",
        "transliteration": "Bismillahir Rahmanir Raheem"
      }
      // ...
    ]
  }
}
```

---

## Juzs

### List All Juzs
- **GET** `/api/juzs`
- **Returns:** Array of Juzs
**Example:**
```json
{
  "status": "success",
  "message": "OK",
  "data": [
    {
      "number": 1,
      "arabicName": "الجزء الأول",
      "latinName": "Al-Juz' al-Awwal"
    }
    // ...
  ]
}
```

### Get Juz by Number
- **GET** `/api/juzs/:number`
- **Returns:** Juz with Surahs
**Example:**
```json
{
  "status": "success",
  "message": "OK",
  "data": {
    "number": 1,
    "arabicName": "الجزء الأول",
    "latinName": "Al-Juz' al-Awwal",
    "surahs": [
      {
        "number": 1,
        "arabicName": "الفاتحة",
        "latinName": "Al-Fatihah"
      }
      // ...
    ]
  }
}
```

---

## Ayahs

### List Ayahs of a Surah
- **GET** `/api/surahs/:surahNumber/ayahs`
- **Query:** `page`, `limit`
- **Returns:** Array of Ayahs
**Example:**
```json
{
  "status": "success",
  "message": "OK",
  "data": [
    {
      "id": 1,
      "number": 1,
      "arabicText": "...",
      "originalArabicText": "...",
      "transliteration": "Bismillahir Rahmanir Raheem"
    }
    // ...
  ]
}
```

### Get Ayah by ID
- **GET** `/api/ayahs/:id`
- **Returns:** Ayah with Translations
**Example:**
```json
{
  "status": "success",
  "message": "OK",
  "data": {
    "id": 1,
    "number": 1,
    "arabicText": "...",
    "originalArabicText": "...",
    "transliteration": "...",
    "surahId": 1,
    "translations": [
      {
        "languageCode": "en",
        "translatedText": "In the name of Allah, the Most Gracious, the Most Merciful"
      }
      // ...
    ]
  }
}
```

---

## Translations

### List Translations for an Ayah
- **GET** `/api/ayahs/:ayahId/translations`
- **Query:** `languageCode`
- **Returns:** Array of Translations
**Example:**
```json
{
  "status": "success",
  "message": "OK",
  "data": [
    {
      "languageCode": "en",
      "translatedText": "In the name of Allah, the Most Gracious, the Most Merciful"
    }
    // ...
  ]
}
```

### Get Translation by Ayah and Language
- **GET** `/api/ayahs/:ayahId/translations/:languageCode`
- **Returns:** Translation
**Example:**
```json
{
  "status": "success",
  "message": "OK",
  "data": {
    "languageCode": "en",
    "translatedText": "In the name of Allah, the Most Gracious, the Most Merciful"
  }
}
```

---

## Search & Advanced

### Search Ayahs
- **GET** `/api/ayahs/search`
- **Query:** `q`, `languageCode`, `surah`, `juz`
- **Returns:** Array of Ayahs
**Example:**
```json
{
  "status": "success",
  "message": "OK",
  "data": [
    {
      "id": 1,
      "number": 1,
      "arabicText": "...",
      "originalArabicText": "...",
      "transliteration": "Bismillahir Rahmanir Raheem",
      "surahId": 1
    }
    // ...
  ]
}
```

### Get Random Ayah
- **GET** `/api/ayahs/random`
- **Query:** `languageCode`
- **Returns:** Random Ayah
**Example:**
```json
{
  "status": "success",
  "message": "OK",
  "data": {
    "id": 5,
    "number": 5,
    "arabicText": "...",
    "originalArabicText": "...",
    "transliteration": "...",
    "surahId": 1,
    "translations": [
      {
        "languageCode": "en",
        "translatedText": "Master of the Day of Judgment"
      }
    ]
  }
}
```

---

## Error Example

```json
{
  "status": "error",
  "message": "Invalid token",
  "code": 401
}
```
