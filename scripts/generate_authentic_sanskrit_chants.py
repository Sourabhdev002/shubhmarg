import asyncio
import os
import aiohttp
import edge_tts

# Authentic Sanskrit Chants with traditional repetitions
AUTHENTIC_TRACKS = [
    {
        "file": "public/audio/mahamrityunjaya.mp3",
        "text": """
        ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।
        उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्॥
        
        ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।
        उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्॥
        
        ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।
        उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्॥
        
        ॐ नमः शिवाय। ॐ नमः शिवाय। हर हर महादेव।
        """,
        "voice": "hi-IN-MadhurNeural",
        "rate": "-12%",
        "pitch": "-3Hz"
    },
    {
        "file": "public/audio/gayatri-mantra.mp3",
        "text": """
        ॐ भूर्भुवः स्वः।
        तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि।
        धियो यो नः प्रचोदयात्॥
        
        ॐ भूर्भुवः स्वः।
        तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि।
        धियो यो नः प्रचोदयात्॥
        
        ॐ भूर्भुवः स्वः।
        तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि।
        धियो यो नः प्रचोदयात्॥
        
        ॐ शांतिः शांतिः शांतिः॥
        """,
        "voice": "hi-IN-MadhurNeural",
        "rate": "-12%",
        "pitch": "-3Hz"
    },
    {
        "file": "public/audio/ganesha-invocation.mp3",
        "text": """
        ॐ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
        निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        
        गजाननं भूतगणादिसेवितं कपित्थजम्बूफलचारुभक्षणम्।
        उमासुतं शोकविनाशकारकं नमामि विघ्नेश्वरपादपङ्कजम्॥
        
        ॐ गं गणपतये नमः। ॐ गं गणपतये नमः।
        शुभम् करोतु कल्याणम्।
        """,
        "voice": "hi-IN-MadhurNeural",
        "rate": "-10%",
        "pitch": "-3Hz"
    },
    {
        "file": "public/audio/shanti-path.mp3",
        "text": """
        ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः।
        पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः।
        वनस्पतयः शान्तिर्विश्वेदेवाः शान्तिर्ब्रह्म शान्तिः।
        सर्वं शान्तिः शान्तिरेव शान्तिः सा मा शान्तिरेधि॥
        
        ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।
        सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥
        
        ॐ शान्तिः शान्तिः शान्तिः॥
        """,
        "voice": "hi-IN-MadhurNeural",
        "rate": "-12%",
        "pitch": "-3Hz"
    },
    {
        "file": "public/audio/panditji-blessing-hindi.mp3",
        "text": """
        सदा सुखी रहो, आयुष्मान् भव। मैं पंडित जी बोल रहा हूँ। आपके जीवन पर भगवान श्री गणेश और काशी विश्वनाथ का पावन आशीर्वाद सदैव बना रहे। आपके सभी ग्रह शांत हों और जीवन में सुख, शांति और समृद्धि का वास हो। ॐ शांतिः।
        """,
        "voice": "hi-IN-MadhurNeural",
        "rate": "-12%",
        "pitch": "-4Hz"
    }
]

async def generate_track(t):
    connector = aiohttp.TCPConnector(use_dns_cache=False, resolver=aiohttp.ThreadedResolver())
    communicate = edge_tts.Communicate(t["text"], t["voice"], rate=t["rate"], pitch=t["pitch"], connector=connector)
    await communicate.save(t["file"])
    print(f"SUCCESS: Generated authentic chant for {t['file']}")

async def main():
    os.makedirs("public/audio", exist_ok=True)
    for t in AUTHENTIC_TRACKS:
        await generate_track(t)

if __name__ == "__main__":
    asyncio.run(main())
