import asyncio
import os
import aiohttp
import edge_tts

TRACKS = [
    {
        "file": "public/audio/shanti-path.mp3",
        "text": "ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥ आयुष्मान् भव। शुभम् करोतु कल्याणम्।",
        "voice": "hi-IN-MadhurNeural",
        "rate": "-7%",
        "pitch": "-3Hz"
    },
    {
        "file": "public/audio/ganesha-invocation.mp3",
        "text": "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥ भगवान श्री गणेश आपके सभी विघ्नों को दूर कर शुभता प्रदान करें।",
        "voice": "hi-IN-MadhurNeural",
        "rate": "-7%",
        "pitch": "-3Hz"
    },
    {
        "file": "public/audio/mahamrityunjaya.mp3",
        "text": "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥ भगवान शिव की कृपा से आप सदैव निरोगी और दीर्घायु रहें।",
        "voice": "hi-IN-MadhurNeural",
        "rate": "-7%",
        "pitch": "-3Hz"
    }
]

async def generate_single(t):
    connector = aiohttp.TCPConnector(use_dns_cache=False, resolver=aiohttp.ThreadedResolver())
    communicate = edge_tts.Communicate(t["text"], t["voice"], rate=t["rate"], pitch=t["pitch"], connector=connector)
    await communicate.save(t["file"])
    print(f"SUCCESS: Generated {t['file']}")

async def main():
    os.makedirs("public/audio", exist_ok=True)
    for t in TRACKS:
        await generate_single(t)

if __name__ == "__main__":
    asyncio.run(main())
