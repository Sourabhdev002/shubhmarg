import asyncio
import os
import aiohttp
import edge_tts

SSML_TRACKS = [
    {
        "file": "public/audio/shanti-path.mp3",
        "ssml": """<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="hi-IN">
  <voice name="hi-IN-MadhurNeural">
    <prosody rate="-12%" pitch="-4Hz">
      ॐ सर्वे भवन्तु सुखिनः <break time="650ms"/>
      सर्वे सन्तु निरामयाः। <break time="750ms"/>
      सर्वे भद्राणि पश्यन्तु <break time="650ms"/>
      मा कश्चिद्दुःखभाग्भवेत्॥ <break time="1200ms"/>
      आयुष्मान् भव! <break time="600ms"/>
      भगवान का पावन आशीर्वाद आपके जीवन में सुख, शांति और समृद्धि का संचार करे। <break time="700ms"/>
      ॐ शान्तिः <break time="400ms"/> शान्तिः <break time="400ms"/> शान्तिः॥
    </prosody>
  </voice>
</speak>"""
    },
    {
        "file": "public/audio/ganesha-invocation.mp3",
        "ssml": """<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="hi-IN">
  <voice name="hi-IN-MadhurNeural">
    <prosody rate="-12%" pitch="-4Hz">
      वक्रतुण्ड महाकाय <break time="600ms"/>
      सूर्यकोटि समप्रभ। <break time="750ms"/>
      निर्विघ्नं कुरु मे देव <break time="600ms"/>
      सर्वकार्येषु सर्वदा॥ <break time="1200ms"/>
      शुभम् करोतु कल्याणम्। <break time="600ms"/>
      भगवान श्री गणेश आपके सभी विघ्नों को दूर कर, हर कार्य में सफलता और मंगल प्रदान करें।
    </prosody>
  </voice>
</speak>"""
    },
    {
        "file": "public/audio/mahamrityunjaya.mp3",
        "ssml": """<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="hi-IN">
  <voice name="hi-IN-MadhurNeural">
    <prosody rate="-12%" pitch="-4Hz">
      ॐ त्र्यम्बकं यजामहे <break time="600ms"/>
      सुगन्धिं पुष्टिवर्धनम्। <break time="750ms"/>
      उर्वारुकमिव बन्धनान् <break time="600ms"/>
      मृत्योर्मुक्षीय माऽमृतात्॥ <break time="1200ms"/>
      महादेव का आशीर्वाद आप पर सदैव बना रहे। <break time="600ms"/>
      आपका स्वास्थ्य उत्तम रहे और दीर्घायु की प्राप्ति हो। <break time="600ms"/>
      हर हर महादेव॥
    </prosody>
  </voice>
</speak>"""
    }
]

async def generate_ssml(t):
    connector = aiohttp.TCPConnector(use_dns_cache=False, resolver=aiohttp.ThreadedResolver())
    # Create Communicate with SSML
    communicate = edge_tts.Communicate(t["ssml"], "hi-IN-MadhurNeural", connector=connector)
    await communicate.save(t["file"])
    print(f"SUCCESS: Generated human SSML audio: {t['file']}")

async def main():
    os.makedirs("public/audio", exist_ok=True)
    for t in SSML_TRACKS:
        await generate_ssml(t)

if __name__ == "__main__":
    asyncio.run(main())
