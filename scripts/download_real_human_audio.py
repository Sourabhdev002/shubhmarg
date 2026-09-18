import urllib.request
import os

TRACKS = [
    {
        "url": "https://archive.org/download/ShivMahaMrityunjayaMantra2/Shiv%20Mahamrityunjaya%20Mantra-1.mp3",
        "dest": "public/audio/mahamrityunjaya.mp3",
        "name": "Maha Mrityunjaya Mantra (Real Human Chanting)"
    },
    {
        "url": "https://archive.org/download/GayatriMantra_201801/gayatri1.mp3",
        "dest": "public/audio/gayatri-mantra.mp3",
        "name": "Gayatri Mantra (Real Human Chanting)"
    },
    {
        "url": "https://archive.org/download/VakratundaMahakaya/30VakratundaMahakayaprarthana.mp3",
        "dest": "public/audio/ganesha-invocation.mp3",
        "name": "Sri Ganesha Invocation (Real Human Chanting)"
    },
    {
        "url": "https://archive.org/download/VedicShantiMantra/VedicShantiMantra.mp3",
        "dest": "public/audio/shanti-path.mp3",
        "name": "Vedic Shanti Mantra (Real Human Chanting)"
    }
]

os.makedirs("public/audio", exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for t in TRACKS:
    print(f"Downloading {t['name']} from {t['url']}...")
    try:
        req = urllib.request.Request(t["url"], headers=headers)
        with urllib.request.urlopen(req, timeout=30) as resp:
            content = resp.read()
            with open(t["dest"], "wb") as f:
                f.write(content)
        size_mb = os.path.getsize(t["dest"]) / (1024 * 1024)
        print(f"SUCCESS: Saved {t['dest']} ({size_mb:.2f} MB)")
    except Exception as e:
        print(f"ERROR downloading {t['name']}: {e}")
