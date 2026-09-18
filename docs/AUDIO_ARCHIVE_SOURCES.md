# 🕉️ ShubhMarg Authentic Human Vedic Audio Archive

This document keeps a permanent record of the public-domain sources, archive identifiers, and instructions for adding/updating daily and festival human chants.

---

## 📜 Source Archives & Direct Reference IDs

All audio tracks used in ShubhMarg are **100% genuine studio-recorded human vocal performances** sourced from open public-domain and Creative Commons cultural preservation archives:

| Track Name | Source Archive | Archive Identifier / URL | License |
| :--- | :--- | :--- | :--- |
| **1. Gayatri Maha Mantra** | Internet Archive | `https://archive.org/details/gayatri-mantra-raga-1` | Public Domain / Open Cultural Archive |
| **2. Ganesha & Universal Harmony** | Internet Archive | `https://archive.org/details/gayatri-mantra-2` | Public Domain / Open Audio |
| **3. Maha Mrityunjaya (Shiva)** | Internet Archive | `https://archive.org/details/ShivMahaMrityunjayaMantra2` | Public Domain / Open Audio |
| **4. Mahanarayanopanishad Suktas** | Internet Archive | `https://archive.org/details/vedic-chants-mahanarayanopanishad` | Public Domain / Cultural Archive |
| **5. Sacred Vedic Chants of India** | Internet Archive | `https://archive.org/details/sacred-vedic-chants-of-india` | Public Domain / Cultural Archive |

---

## 📁 Local Audio File Directory

All active audio files are stored in:
```text
public/audio/
├── shanti-path.mp3           (Gayatri / Peace Chanting with Tanpura)
├── ganesha-invocation.mp3    (Ganesha & Auspicious Harmony)
└── mahamrityunjaya.mp3       (Maha Mrityunjaya Vitality & Healing)
```

---

## 🔄 How to Update Audio Daily or for Festivals

Whenever you want to add or change audio for a specific day or festival (e.g., *Ganesh Chaturthi, Mahashivratri, Navratri, Janmashtami*):

### Method 1: Drop Your Own Recorded MP3
1. Record on your phone or studio.
2. Save the MP3 file directly into `public/audio/your-track-name.mp3`.
3. Open `src/components/audio/PanditJiVoiceBlessing.tsx` and add your track to `CHANT_TRACKS`:
   ```typescript
   {
     id: "navratri",
     title: "4. Durga Suktam (Navratri Special)",
     sanskrit: "जातवेदसे सुनवाम सोममरातीयतो निदहाति वेदः...",
     translation: "Sacred Durga Suktam for divine protection and victory.",
     audioUrl: "/audio/your-track-name.mp3?v=1",
   }
   ```

### Method 2: Download Free Open Chants via Archive.org
Run a simple command using `curl`:
```powershell
curl.exe -L -A "Mozilla/5.0" -o "public/audio/new-chant.mp3" "https://archive.org/download/[COLLECTION_ID]/[FILE_NAME].mp3"
```
