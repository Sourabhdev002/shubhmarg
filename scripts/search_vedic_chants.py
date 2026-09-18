import urllib.request
import json
import os

def search_archive(query):
    url = f"https://archive.org/advancedsearch.php?q={urllib.parse.quote(query)}&fl[]=identifier,title,mediatype&output=json&rows=15"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            return data.get('response', {}).get('docs', [])
    except Exception as e:
        print("Error searching archive:", e)
        return []

print("=== VEDIC JAPA & CHANTING (No Bhajan) ===")
queries = [
    'title:"Mahamrityunjaya Japa" OR title:"Mahamrityunjay Mantra 108" AND mediatype:audio',
    'title:"Gayatri Mantra 108" OR title:"Gayatri Japa" AND mediatype:audio',
    'title:"Vedic Chanting" OR title:"Rigveda Chants" AND mediatype:audio',
    'title:"Ganesh Atharvashirsha" OR title:"Ganapati Atharvashirsha" AND mediatype:audio'
]

for q in queries:
    print(f"\n--- Query: {q} ---")
    docs = search_archive(q)
    for d in docs[:5]:
        print(d.get('identifier'), "|", d.get('title'))
