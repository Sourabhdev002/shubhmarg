import asyncio
import os
import aiohttp
import edge_tts

CONVERSATIONAL_TRACKS = [
    {
        "file": "public/audio/shanti-path.mp3",
        "text": "नमस्ते बेटा... खुश रहो, सदा आनंद में रहो। मैं पंडित जी बोल रहा हूँ। जीवन में जब भी मन थोड़ा अशांत हो या कोई उलझन हो, तो कभी घबराना मत। एक पल शांत होकर ईश्वर का ध्यान करो और अपने कर्म पर विश्वास रखो। भगवान श्री गणेश आपके जीवन के सभी विघ्न दूर करें और आपके परिवार में सुख-शांति बनी रहे। ॐ शांतिः... शांतिः... शांतिः।",
        "voice": "hi-IN-MadhurNeural",
        "rate": "-14%",
        "pitch": "-5Hz"
    },
    {
        "file": "public/audio/ganesha-invocation.mp3",
        "text": "प्रणाम बेटा... आयुष्मान् भव। भगवान श्री गणेश का स्मरण करते हुए अपने मन को बिल्कुल शांत और स्थिर रखो। जब मन में सच्चाई और कर्म में ईमानदारी होती है, तो हर संकट अपने आप कट जाता है। मेरी यही मंगलकामना है कि आपकी हर चिंता दूर हो और जीवन में निरंतर सफलता का मार्ग खुले। शुभम् करोतु कल्याणम्।",
        "voice": "hi-IN-MadhurNeural",
        "rate": "-14%",
        "pitch": "-5Hz"
    },
    {
        "file": "public/audio/mahamrityunjaya.mp3",
        "text": "सदा सुखी रहो... निरोगी रहो बेटा। अपने स्वास्थ्य और मानसिक शांति का पूरा ध्यान रखो। जब तुम्हारा मन शांत होगा, तो हर निर्णय सही साबित होगा। देवाधिदेव महादेव की असीम कृपा आप पर सदैव बनी रहे। पूरे विश्वास और सकारात्मक ऊर्जा के साथ अपने पथ पर आगे बढ़ो। हर हर महादेव।",
        "voice": "hi-IN-MadhurNeural",
        "rate": "-14%",
        "pitch": "-5Hz"
    }
]

async def generate_conversational(t):
    connector = aiohttp.TCPConnector(use_dns_cache=False, resolver=aiohttp.ThreadedResolver())
    communicate = edge_tts.Communicate(t["text"], t["voice"], rate=t["rate"], pitch=t["pitch"], connector=connector)
    await communicate.save(t["file"])
    print(f"SUCCESS: Generated conversational audio {t['file']}")

async def main():
    os.makedirs("public/audio", exist_ok=True)
    for t in CONVERSATIONAL_TRACKS:
        await generate_conversational(t)

if __name__ == "__main__":
    asyncio.run(main())
