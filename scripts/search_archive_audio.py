import urllib.request
import json
import os

def search_archive(query):
    url = f"https://archive.org/advancedsearch.php?q={urllib.parse.quote(query)}&fl[]=identifier,title,mediatype&output=json&rows=10"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            return data.get('response', {}).get('docs', [])
    except Exception as e:
        print("Error searching archive:", e)
        return []

print("Maha Mrityunjaya:")
docs = search_archive("Maha Mrityunjaya Mantra audio mp3")
for d in docs[:5]:
    print(d)

print("\nGayatri Mantra:")
docs2 = search_archive("Gayatri Mantra Anuradha Paudwal OR Suresh Wadkar audio mp3")
for d in docs2[:5]:
    print(d)

print("\nGanesh Mantra:")
docs3 = search_archive("Ganesh Atharvashirsha OR Vakratunda Mahakaya audio mp3")
for d in docs3[:5]:
    print(d)
