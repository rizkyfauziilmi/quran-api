## Quran API Endpoints Documentation

This API provides **read-only** access to Quranic data: Surahs, Juzs, Ayahs, and Translations. All endpoints return JSON.

---

## Response Format

All **successful** responses follow this structure:

```json
{
  "status": "success",
  "message": "OK",
  "data": /* object, array, or null */
}
```

All **error** responses follow this structure:

```json
{
  "status": "error",
  "code": 404,
  "message": "Not Found"
}
```

---

## Surahs

### List All Surahs

* **Endpoint**: `GET /api/surahs`
* **Query Parameters**:

  * `classification` (optional): "Meccan" or "Medinan"
  * `juz` (optional): Juz number (1–30)
  * `page` (optional): Page number (default: 1)
  * `limit` (optional): Items per page (default: 10)
* **Response**: Array of Surah objects

**Example**:

```json
{
  "status": "success",
  "message": "OK",
  "data": [
    {
      "number": 1,
      "arabicName": "الفاتحة",
      "latinName": "Al-Fatihah",
      "meaning": "The Opening",
      "ayahCount": 7,
      "classification": "Meccan",
      "juz": 1
    }
    // ... more surahs
  ]
}
```

### Get Surah by Number

* **Endpoint**: `GET /api/surahs/:number`
* **Query Parameters**:

  * `languageCode` (optional): Filter which translation to include for each Ayah (e.g., `en`, `id`). Omitting this will include all available translations.
* **Response**: Single Surah object with its Ayahs and nested Translations

**Example**:

```json
{
  "status": "success",
  "message": "OK",
  "data": {
    "number": 1,
    "arabicName": "الفاتحة",
    "latinName": "Al-Fatihah",
    "meaning": "The Opening",
    "ayahCount": 7,
    "classification": "Meccan",
    "juz": 1,
    "ayahs": [
      {
        "id": 1,
        "number": 1,
        "arabicText": "...",
        "transliteration": "Bismillahir Rahmanir Raheem",
        "translations": [
          { "languageCode": "en", "text": "In the name of Allah, the Most Gracious..." },
          { "languageCode": "id", "text": "Dengan nama Allah Yang Maha Pengasih..." }
        ]
      }
      // ... more ayahs
    ]
  }
}
```

---

## Juzs

### List All Juzs

* **Endpoint**: `GET /api/juzs`
* **Response**: Array of Juz objects

**Example**:

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
    // ... more juzs
  ]
}
```

### Get Juz by Number

* **Endpoint**: `GET /api/juzs/:number`
* **Response**: Single Juz object with its Surahs

**Example**:

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
      // ... more surahs
    ]
  }
}
```

---

## Ayahs

### List Ayahs of a Surah

* **Endpoint**: `GET /api/surahs/:surahNumber/ayahs`
* **Query Parameters**:

  * `page` (optional): Page number (default: 1)
  * `limit` (optional): Items per page (default: 10)
* **Response**: Array of Ayah objects

**Example**:

```json
{
  "status": "success",
  "message": "OK",
  "data": [
    {
      "id": 1,
      "number": 1,
      "arabicText": "...",
      "transliteration": "Bismillahir Rahmanir Raheem"
    }
    // ... more ayahs
  ]
}
```

### Get Ayah by ID

* **Endpoint**: `GET /api/ayahs/:id`
* **Response**: Single Ayah object with its Translations

**Example**:

```json
{
  "status": "success",
  "message": "OK",
  "data": {
    "id": 1,
    "number": 1,
    "arabicText": "...",
    "transliteration": "...",
    "surahNumber": 1,
    "translations": [
      {
        "languageCode": "en",
        "text": "In the name of Allah, the Most Gracious, the Most Merciful"
      }
      // ... more translations
    ]
  }
}
```

---

## Translations

### List Translations for an Ayah

* **Endpoint**: `GET /api/ayahs/:ayahId/translations`
* **Query Parameters**:

  * `languageCode` (optional): Filter by language (e.g., `en`)
* **Response**: Array of Translation objects

**Example**:

```json
{
  "status": "success",
  "message": "OK",
  "data": [
    {
      "languageCode": "en",
      "text": "In the name of Allah, the Most Gracious, the Most Merciful"
    }
    // ... more translations
  ]
}
```

### Get Translation by Ayah and Language

* **Endpoint**: `GET /api/ayahs/:ayahId/translations/:languageCode`
* **Response**: Single Translation object

**Example**:

```json
{
  "status": "success",
  "message": "OK",
  "data": {
    "languageCode": "en",
    "text": "In the name of Allah, the Most Gracious, the Most Merciful"
  }
}
```

---

## Search & Advanced

### Search Ayahs

* **Endpoint**: `GET /api/ayahs/search`
* **Query Parameters**:

  * `q`: Search term (text)
  * `languageCode` (optional)
  * `surah` (optional): Surah number
  * `juz` (optional): Juz number
* **Response**: Array of Ayah objects

**Example**:

```json
{
  "status": "success",
  "message": "OK",
  "data": [
    {
      "id": 1,
      "number": 1,
      "arabicText": "...",
      "transliteration": "Bismillahir Rahmanir Raheem",
      "surahNumber": 1
    }
    // ... more results
  ]
}
```

### Get Random Ayah

* **Endpoint**: `GET /api/ayahs/random`
* **Query Parameters**:

  * `languageCode` (optional)
* **Response**: Single random Ayah object with Translations

**Example**:

```json
{
  "status": "success",
  "message": "OK",
  "data": {
    "id": 5,
    "number": 5,
    "arabicText": "...",
    "transliteration": "...",
    "surahNumber": 1,
    "translations": [
      {
        "languageCode": "en",
        "text": "Master of the Day of Judgment"
      }
    ]
  }
}
```

---
