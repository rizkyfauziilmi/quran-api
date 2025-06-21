# 📖 API Documentation – Qur'an API (NestJS)

---

## ✅ 1. **GET /surahs**

### Deskripsi:

Mengambil daftar seluruh surah dalam Al-Qur'an.

### Response:

```json
[
  {
    "id": 1,
    "name": "Al-Fatihah",
    "translation": "Pembukaan",
    "revelation_place": "Mecca",
    "total_ayahs": 7
  },
  {
    "id": 2,
    "name": "Al-Baqarah",
    "translation": "Sapi Betina",
    "revelation_place": "Medina",
    "total_ayahs": 286
  }
]
```

### Error:

Tidak ada (selalu berhasil, kecuali error server `500`)

---

## ✅ 2. **GET /surahs/\:id**

### Deskripsi:

Mengambil detail surah beserta ayat-ayatnya.

### Contoh: `GET /surahs/1`

### Response:

```json
{
  "id": 1,
  "name": "Al-Fatihah",
  "translation": "Pembukaan",
  "revelation_place": "Mecca",
  "total_ayahs": 7,
  "ayahs": [
    {
      "number": 1,
      "arabic": "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ",
      "translation": "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang."
    },
    ...
  ]
}
```

### Error:

* `404 Not Found`: Jika ID surah tidak ditemukan

```json
{
  "statusCode": 404,
  "message": "Surah not found",
  "error": "Not Found"
}
```

---

## ✅ 3. **GET /surahs/\:id/ayahs/\:number**

### Deskripsi:

Mengambil satu ayat dari surah tertentu.

### Contoh: `GET /surahs/2/ayahs/255`

### Response:

```json
{
  "surah_id": 2,
  "number": 255,
  "arabic": "اللَّهُ لَا إِلَـٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ...",
  "translation": "Allah, tidak ada Tuhan selain Dia, Yang Maha Hidup, Yang terus-menerus mengurus makhluk-Nya..."
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

## ✅ 4. **GET /search?q=\:query**

### Deskripsi:

Mencari ayat berdasarkan kata kunci dari terjemahan.

### Contoh: `GET /search?q=sabar`

### Response:

```json
[
  {
    "surah_id": 2,
    "surah_name": "Al-Baqarah",
    "ayah_number": 153,
    "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ...",
    "translation": "Hai orang-orang yang beriman, jadikanlah sabar dan salat sebagai penolongmu..."
  },
  ...
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

## ✅ 5. **GET /tafsir/\:surah/\:ayah** *(opsional)*

### Deskripsi:

Mengambil tafsir ayat tertentu.

### Contoh: `GET /tafsir/2/255`

### Response:

```json
{
  "surah_id": 2,
  "ayah_number": 255,
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

## 🔐 6. **POST /bookmark** *(opsional, butuh login)*

### Deskripsi:

Menyimpan bookmark ayat untuk user.

### Request Body:

```json
{
  "surah_id": 2,
  "ayah_number": 255
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

## 🔐 7. **GET /user/bookmarks** *(opsional, login required)*

### Deskripsi:

Mengambil daftar bookmark milik user.

### Response:

```json
[
  {
    "surah_id": 2,
    "ayah_number": 255,
    "arabic": "...",
    "translation": "...",
    "timestamp": "2025-06-20T15:00:00Z"
  }
]
```

---

## 🔐 8. **POST /auth/login** *(opsional)*

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

## 🔐 9. **POST /auth/register** *(opsional)*

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

---

Jika kamu ingin saya bantu buatkan Swagger docs (`@nestjs/swagger`) atau generate Postman Collection dari endpoint ini, tinggal bilang saja ya!
