import urllib.request
import json
import os

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

def search_more(query):
    url = f"https://archive.org/advancedsearch.php?q={urllib.parse.quote(query)}&fl[]=identifier,title,mediatype&output=json&rows=10"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            return data.get('response', {}).get('docs', [])
    except Exception as e:
        return []

print("=== ShivMahaMrityunjayaMantra2 Files ===")
files = get_item_files("ShivMahaMrityunjayaMantra2")
for f in files:
    if f.get('format') in ['VBR MP3', 'MP3', '64Kbps MP3', '128Kbps MP3']:
        print(f.get('name'), f.get('size'))

print("\n=== VakratundaMahakaya Files ===")
files2 = get_item_files("VakratundaMahakaya")
for f in files2:
    if f.get('format') in ['VBR MP3', 'MP3', '64Kbps MP3', '128Kbps MP3']:
        print(f.get('name'), f.get('size'))

print("\n=== Gayatri Mantra Search ===")
docs = search_more('title:"Gayatri Mantra" AND mediatype:audio')
for d in docs[:5]:
    print(d)

print("\n=== Shanti Path / Shanti Mantra Search ===")
docs2 = search_more('title:"Shanti Mantra" OR title:"Peace Mantra" AND mediatype:audio')
for d in docs2[:5]:
    print(d)
