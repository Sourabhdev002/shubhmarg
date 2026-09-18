export interface GotraDetail {
  id: string;
  name: string;
  sanskritName: string;
  rishi: string;
  pravara: string;
  element: "Agni (Fire)" | "Vayu (Air)" | "Jal (Water)" | "Prithvi (Earth)" | "Akash (Ether)";
  varnaTradition: string;
  kuldevtaTradition: string;
  primarySacredRiver: string;
  sacredTree: string;
  beejMantra: string;
  lineageDescription: string;
}

export const VEDIC_GOTRAS: Record<string, GotraDetail> = {
  kashyap: {
    id: "kashyap",
    name: "Kashyap",
    sanskritName: "कश्यप",
    rishi: "Maharshi Kashyap (The Father of Devas, Adityas & Solar Lineage)",
    pravara: "Kashyap, Avatsara, Asita (Three-Rishi Pravara)",
    element: "Agni (Fire)",
    varnaTradition: "Solar (Surya Vamsha) & Saptarishi Origin",
    kuldevtaTradition: "Surya Narayana, Lord Shiva (Kashi Vishwanath), Goddess Annapurna",
    primarySacredRiver: "Holy Ganga (Varanasi Ghats)",
    sacredTree: "Sacred Peepal & Shami Tree",
    beejMantra: "ॐ कश्यपाय विद्महे प्रजापतये धीमहि तन्नो ऋषिः प्रचोदयात्॥",
    lineageDescription: "Kashyap Gotra traces directly to Prajapati Kashyap, descendant of Lord Brahma. Holders of this Gotra inherit high spiritual vitality, leadership aura, and strong solar protection.",
  },
  bharadwaj: {
    id: "bharadwaj",
    name: "Bharadwaj",
    sanskritName: "भारद्वाज",
    rishi: "Maharshi Bharadwaj (The Seer of Ayurveda, Rigveda Mandala 6 & Vimanika Shastra)",
    pravara: "Angirasa, Barhaspatya, Bharadwaja (Three-Rishi Pravara)",
    element: "Vayu (Air)",
    varnaTradition: "Angirasa Brihaspati Lineage of Supreme Wisdom",
    kuldevtaTradition: "Lord Brihaspati, Lord Rama (Ayodhya), Lord Shiva",
    primarySacredRiver: "Triveni Sangam (Prayagraj)",
    sacredTree: "Sacred Banyan (Vata Vriksha)",
    beejMantra: "ॐ भरद्वाजाय विद्महे वेदपारगाय धीमहि तन्नो ऋषिः प्रचोदयात्॥",
    lineageDescription: "Bharadwaj Gotra represents the peak of intellectual depth, research acumen, and healing mastery. Sages of this lineage are natural mentors, strategists, and philosophical guides.",
  },
  vashishta: {
    id: "vashishta",
    name: "Vashishta",
    sanskritName: "वशिष्ठ",
    rishi: "Brahmarshi Vashishta (Chief Preceptor of the Ikshvaku Dynasty & Guru of Lord Rama)",
    pravara: "Vashishta, Aindrapramada, Abharadvasu (Three-Rishi Pravara)",
    element: "Akash (Ether)",
    varnaTradition: "Brahmarshi Lineage of Unshakable Sattva",
    kuldevtaTradition: "Lord Rama, Lord Shiva (Rameshwaram), Kamadhenu Gayatri",
    primarySacredRiver: "Sarayu & Holy Ganga",
    sacredTree: "Sacred Parijata & Audumbara Tree",
    beejMantra: "ॐ वशिष्ठाय विद्महे ब्रह्मर्षये धीमहि तन्नो गुरुः प्रचोदयात्॥",
    lineageDescription: "Vashishta Gotra carries the highest spiritual composure (Shanti) and mastery over divine desires. Holders of this Gotra are blessed with serene intuition and ancestral invulnerability.",
  },
  sandilya: {
    id: "sandilya",
    name: "Sandilya",
    sanskritName: "शाण्डिल्य",
    rishi: "Maharshi Sandilya (Author of Sandilya Bhakti Sutras & Chandogya Upanishad Preceptor)",
    pravara: "Sandilya, Asita, Devala (Three-Rishi Pravara)",
    element: "Jal (Water)",
    varnaTradition: "Kashyap-Devala Bhakti & Vedantic Tradition",
    kuldevtaTradition: "Lord Krishna / Balaji (Tirupati), Goddess Mahalakshmi",
    primarySacredRiver: "Yamuna & Godavari",
    sacredTree: "Sacred Kadamba & Tulsi Vriksha",
    beejMantra: "ॐ शाण्डिल्याय विद्महे भक्तिनिष्ठाय धीमहि तन्नो ऋषिः प्रचोदयात्॥",
    lineageDescription: "Sandilya Gotra embodies the perfection of devotion (Bhakti Yoga) and emotional depth. Descendants excel in fine arts, harmonious partnerships, and unconditional devotion.",
  },
  garg: {
    id: "garg",
    name: "Garg (Garga)",
    sanskritName: "गर्ग",
    rishi: "Acharya Garga (Royal Astronomer of Yadavas, Author of Garga Samhita)",
    pravara: "Angirasa, Gargya, Sainya (Three-Rishi Pravara)",
    element: "Prithvi (Earth)",
    varnaTradition: "Astronomical & Mathematical Jyotish Masters",
    kuldevtaTradition: "Lord Krishna (Mathura/Vrindavan), Lord Narasimha",
    primarySacredRiver: "Yamuna River",
    sacredTree: "Sacred Bilva (Bel) Tree",
    beejMantra: "ॐ गर्गाचार्याय विद्महे ज्योतिर्विदे धीमहि तन्नो मुनिः प्रचोदयात्॥",
    lineageDescription: "Garg Gotra bestows analytical brilliance, deep astrological affinity, and practical business wealth creation under the auspicious protection of Lord Krishna.",
  },
  kaushik: {
    id: "kaushik",
    name: "Kaushik (Vishwamitra)",
    sanskritName: "कौशिक",
    rishi: "Brahmarshi Vishwamitra (The Discoverer of Gayatri Maha Mantra & King Turned Sage)",
    pravara: "Viswamitra, Aghamarshana, Kaushika (Three-Rishi Pravara)",
    element: "Agni (Fire)",
    varnaTradition: "Royal Warrior Ascetics (Rajarshi to Brahmarshi)",
    kuldevtaTradition: "Maha Gayatri Devi, Lord Hanuman, Lord Shiva",
    primarySacredRiver: "Kaveri & Saraswati",
    sacredTree: "Sacred Palash & Rudraksha Tree",
    beejMantra: "ॐ विश्वामित्राय विद्महे गायत्रीसेविने धीमहि तन्नो ऋषिः प्रचोदयात्॥",
    lineageDescription: "Kaushik Gotra carries the fierce, unstoppable willpower of Vishwamitra. Holders of this Gotra overcome insurmountable obstacles and create their own destinies.",
  },
  gautam: {
    id: "gautam",
    name: "Gautam",
    sanskritName: "गौतम",
    rishi: "Maharshi Gautama (Creator of Nyaya Sutras & Bringer of River Godavari)",
    pravara: "Angirasa, Ayasya, Gautama (Three-Rishi Pravara)",
    element: "Jal (Water)",
    varnaTradition: "Foundational Logicians & Bringers of Divine Waters",
    kuldevtaTradition: "Lord Tryambakeshwar Shiva, Goddess Godavari",
    primarySacredRiver: "Godavari (Nashik Trimbak)",
    sacredTree: "Sacred Ashoka & Neem Tree",
    beejMantra: "ॐ गौतमाय विद्महे न्यायशास्त्रात्मने धीमहि तन्नो मुनिः प्रचोदयात्॥",
    lineageDescription: "Gautam Gotra represents supreme logical discernment, legal acumen, and refreshing spiritual benevolence that nurtures everyone in its proximity.",
  },
  atri: {
    id: "atri",
    name: "Atri",
    sanskritName: "अत्रि",
    rishi: "Brahmarshi Atri & Mata Anusuya (Parents of Lord Dattatreya, Moon & Durvasa)",
    pravara: "Atreya, Archananasa, Syavasva (Three-Rishi Pravara)",
    element: "Akash (Ether)",
    varnaTradition: "Trimurti Incarnation Lineage (Dattatreya)",
    kuldevtaTradition: "Lord Dattatreya, Lord Chandra, Mata Anusuya",
    primarySacredRiver: "Narmada & Mandakini (Chitrakoot)",
    sacredTree: "Sacred Audumbara (Fig) Tree",
    beejMantra: "ॐ अत्रये विद्महे अनुसूयासमेताय धीमहि तन्नो ऋषिः प्रचोदयात्॥",
    lineageDescription: "Atri Gotra carries the miraculous unifying power of Brahma, Vishnu, and Shiva (Dattatreya). Descendants possess extraordinary resilience and spiritual transcendence.",
  },
};
