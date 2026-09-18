import urllib.request
import json

def search_archive(query):
    url = f"https://archive.org/advancedsearch.php?q={urllib.parse.quote(query)}&fl[]=identifier,title&output=json&rows=15"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            return data.get('response', {}).get('docs', [])
    except Exception as e:
        return []

docs = search_archive("Maha Mrityunjaya Mantra AND mediatype:audio")
print("=== Maha Mrityunjaya ===")
for d in docs[:8]:
    print(d.get('identifier'), "|", d.get('title'))

docs2 = search_archive("Gayatri Mantra AND mediatype:audio")
print("\n=== Gayatri Mantra ===")
for d in docs2[:8]:
    print(d.get('identifier'), "|", d.get('title'))

docs3 = search_archive("Shri Rudram Chamakam OR Rudra Prashna AND mediatype:audio")
print("\n=== Rudram Chamakam ===")
for d in docs3[:8]:
    print(d.get('identifier'), "|", d.get('title'))
