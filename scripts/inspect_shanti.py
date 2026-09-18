import urllib.request
import json

def get_item_files(identifier):
    url = f"https://archive.org/metadata/{identifier}/files"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            return data.get('result', [])
    except Exception as e:
        print(f"Error getting files for {identifier}:", e)
        return []

print("VedicShantiMantra:")
for f in get_item_files("VedicShantiMantra"):
    if f.get('format') in ['VBR MP3', 'MP3', '64Kbps MP3', '128Kbps MP3']:
        print(f.get('name'), f.get('size'))

print("\nshri-suktam-mahalakshmi-gayatri-mantra:")
for f in get_item_files("shri-suktam-mahalakshmi-gayatri-mantra"):
    if f.get('format') in ['VBR MP3', 'MP3', '64Kbps MP3', '128Kbps MP3']:
        print(f.get('name'), f.get('size'))
