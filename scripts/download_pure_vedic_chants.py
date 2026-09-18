import urllib.request
import os

TRACKS = [
    {
        "url": "https://archive.org/download/MantraVidya/Mahamrityunjay%20Mantra%20108%20times%20By%20Shankar%20Sahney.mp3",
        "dest": "public/audio/mahamrityunjaya.mp3",
        "name": "Mahamrityunjay Mantra 108 Japa Chant"
    },
    {
        "url": "https://archive.org/download/MantraVidya/Gayatri%20Mantra%20%28%20108%20peaceful%20chants%20%29%20%28NEW%29.mp3",
        "dest": "public/audio/gayatri-mantra.mp3",
        "name": "Gayatri Mantra 108 Peaceful Chants"
    },
    {
        "url": "https://archive.org/download/GanapatiAtharvashirsha/GanapatiAtharvashirsha.mp3",
        "dest": "public/audio/ganesha-invocation.mp3",
        "name": "Ganapati Atharvashirsha Vedic Chant"
    },
    {
        "url": "https://archive.org/download/VedicShantiMantra/VedicShantiMantra.mp3",
        "dest": "public/audio/shanti-path.mp3",
        "name": "Vedic Shanti Mantra Path"
    }
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for t in TRACKS:
    print(f"Downloading {t['name']}...")
    try:
        req = urllib.request.Request(t["url"], headers=headers)
        with urllib.request.urlopen(req, timeout=60) as resp:
            content = resp.read()
            with open(t["dest"], "wb") as f:
                f.write(content)
        size_mb = os.path.getsize(t["dest"]) / (1024 * 1024)
        print(f"SUCCESS: Saved {t['dest']} ({size_mb:.2f} MB)")
    except Exception as e:
        print(f"ERROR downloading {t['name']}: {e}")
