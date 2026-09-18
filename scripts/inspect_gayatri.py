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

print("Gayatri_Mantra:")
for f in get_item_files("Gayatri_Mantra"):
    if f.get('format') in ['VBR MP3', 'MP3', '64Kbps MP3', '128Kbps MP3']:
        print(f.get('name'), f.get('size'))

print("\nGayatriMantra_201801:")
for f in get_item_files("GayatriMantra_201801"):
    if f.get('format') in ['VBR MP3', 'MP3', '64Kbps MP3', '128Kbps MP3']:
        print(f.get('name'), f.get('size'))

print("\nVedic Shanti Mantra search:")
url = "https://archive.org/advancedsearch.php?q=Vedic+Shanti+Mantra+OR+Om+Dyau+Shanti&fl[]=identifier,title&output=json&rows=10"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=10) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    for d in data.get('response', {}).get('docs', []):
        print(d)
