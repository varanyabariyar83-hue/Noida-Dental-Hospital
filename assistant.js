/* Noida Dental Hospital: voice assistant (English + Hindi).
   Runs entirely in the browser: a built-in knowledge base + the browser's speech features. No data leaves the page. */
(function () {
  'use strict';
  var PHONE = '+91 78348 38485', TEL = '+917834838485', WA = '917834838485';
  var KB = [
    { id: 'hello', k: ['hello', 'hi ', 'hey', 'namaste', 'नमस्ते', 'नमस्कार', 'help', 'मदद'],
      en: 'Hello! I am the virtual assistant of Noida Dental Hospital in Greater Noida. Ask me about treatments, CGHS, NABH accreditation, our facilities, the address, or how to book. Tap a topic below or just ask.',
      hi: 'नमस्ते! मैं ग्रेटर नोएडा के नोएडा डेंटल हॉस्पिटल का वर्चुअल असिस्टेंट हूँ। आप इलाज, CGHS, NABH मान्यता, हमारी सुविधाओं, पते या अपॉइंटमेंट के बारे में पूछ सकते हैं। नीचे दिए विषय चुनें या सीधे पूछें।' },
    { id: 'about', k: ['about', 'hospital', 'who are you', 'tell me about', 'अस्पताल', 'हॉस्पिटल', 'आपके बारे', 'परिचय', 'about us'], link: '/about-us/',
      en: 'Noida Dental Hospital is a dental hospital in Greater Noida for the whole family. We offer check-ups, root canals, implants, braces and aligners, wisdom tooth removal, whitening, crowns, gum care and children\'s dentistry. We are a CGHS empanelled and NABH accredited hospital, and our tagline is Healthy Smiles, Brighter Tomorrows.',
      hi: 'नोएडा डेंटल हॉस्पिटल ग्रेटर नोएडा में पूरे परिवार के लिए दंत चिकित्सालय है। यहाँ चेक-अप, रूट कैनाल, इम्प्लांट, ब्रेसेस और अलाइनर, अक्ल दाढ़ निकालना, दाँत सफेद करना, क्राउन, मसूड़ों की देखभाल और बच्चों के दाँतों का इलाज होता है। हम CGHS पैनल में शामिल और NABH मान्यता प्राप्त अस्पताल हैं। हमारा मंत्र है: स्वस्थ मुस्कान, उज्ज्वल कल।' },
    { id: 'doctor', k: ['doctor', 'dr ', 'ankur', 'saxena', 'dentist name', 'डॉक्टर', 'अंकुर', 'सक्सेना', 'डेंटिस्ट कौन'], link: '/dr-ankur-saxena/',
      en: 'Our dentist is Dr. Ankur Saxena, MDS, an orthodontist and implantologist. He has 16+ years of experience. He believes in listening first, examining carefully, explaining your options in plain language and treating gently. You can read more on the Our Dentist page.',
      hi: 'हमारे डेंटिस्ट डॉक्टर अंकुर सक्सेना हैं, जो MDS हैं और ऑर्थोडॉन्टिस्ट तथा इम्प्लांटोलॉजिस्ट हैं। उन्हें 16 साल से अधिक का अनुभव है। वे पहले आपकी बात सुनते हैं, ध्यान से जाँच करते हैं, विकल्प आसान भाषा में समझाते हैं और नरमी से इलाज करते हैं।' },
    { id: 'facilities', k: ['facility', 'facilities', 'chairs', 'chair', 'sq ft', 'square', 'infrastructure', 'equipment', 'sedation', 'सुविधा', 'सुविधाएं', 'कुर्सी', 'चेयर', 'वर्ग फीट', 'उपकरण'], link: '/facilities-in-greater-noida/',
      en: 'We are a 4-chair, 2,000 square foot dental facility in Greater Noida. The rooms are bright and clean, each chair has its own light, tray and suction, and we have a conscious sedation unit for anxious patients, used only when the dentist advises it. See photos on the Facilities page.',
      hi: 'हमारा अस्पताल ग्रेटर नोएडा में 4 कुर्सियों और 2,000 वर्ग फीट में बना है। कमरे साफ और रोशन हैं, हर कुर्सी पर अपनी लाइट, ट्रे और सक्शन है, और घबराने वाले मरीज़ों के लिए कॉन्शियस सेडेशन यूनिट भी है, जिसे डेंटिस्ट की सलाह पर ही इस्तेमाल किया जाता है। फ़ोटो सुविधाएँ पेज पर देखें।' },
    { id: 'address', k: ['address', 'where', 'location', 'directions', 'map', 'how to reach', 'sunrise', 'alpha', 'floor', 'near me', 'पता', 'कहाँ', 'कहां', 'लोकेशन', 'रास्ता', 'नक्शा', 'पास में', 'मंज़िल', 'मंजिल'], link: '/contact-us/', action: 'directions',
      en: 'We are at the 6th Floor, Sunrise Tower, Alpha-I Commercial Belt, Block E, Alpha I, Greater Noida, Uttar Pradesh 201310. Tap Get Directions to open navigation. Patients also come to us from Greater Noida West, Noida Extension and Noida.',
      hi: 'हमारा पता है: छठी मंज़िल, सनराइज़ टावर, अल्फ़ा-वन कमर्शियल बेल्ट, ब्लॉक ई, अल्फ़ा वन, ग्रेटर नोएडा, उत्तर प्रदेश, 201310। रास्ता जानने के लिए गेट डायरेक्शन्स दबाएँ। ग्रेटर नोएडा वेस्ट, नोएडा एक्सटेंशन और नोएडा से भी मरीज़ हमारे पास आते हैं।' },
    { id: 'book', k: ['book', 'appointment', 'contact', 'call', 'phone', 'number', 'whatsapp', 'timing', 'timings', 'time', 'open', 'hours', 'अपॉइंटमेंट', 'बुक', 'संपर्क', 'फोन', 'फ़ोन', 'नंबर', 'समय', 'टाइमिंग', 'कब खुल'], link: '/contact-us/', action: 'contact',
      en: 'To book an appointment, call or WhatsApp us on plus nine one, seven eight three four eight, three eight four eight five. Please confirm clinic timings when you call, and tell us your reason for the visit. CGHS cardholders can also tell us their category so we can say what to bring.',
      hi: 'अपॉइंटमेंट के लिए हमें +91 78348 38485 पर कॉल या व्हाट्सऐप करें। कॉल करते समय क्लिनिक का समय पूछ लें और बताएँ कि आप किस कारण से आना चाहते हैं। CGHS कार्डधारक अपनी श्रेणी भी बता दें, ताकि हम बता सकें कि क्या साथ लाना है।' },
    { id: 'services', k: ['services', 'treatments', 'treatment', 'what do you do', 'offer', 'सेवाएं', 'सेवाएँ', 'इलाज', 'उपचार', 'ट्रीटमेंट', 'क्या क्या'], link: '/dental-services/',
      en: 'We offer root canal treatment, dental implants, braces and clear aligners, wisdom tooth extraction, toothache and emergency care, children\'s dentistry, teeth whitening, painless dentistry, crowns and bridges, and scaling and gum treatment. Ask me about any of them.',
      hi: 'हम रूट कैनाल, डेंटल इम्प्लांट, ब्रेसेस और क्लियर अलाइनर, अक्ल दाढ़ निकालना, दाँत दर्द और इमरजेंसी, बच्चों का इलाज, दाँत सफेद करना, बिना दर्द के इलाज, क्राउन और ब्रिज, तथा सफाई और मसूड़ों का इलाज करते हैं। किसी के बारे में भी पूछ सकते हैं।' },
    { id: 'rct', k: ['root canal', 'rct', 'nerve', 'infection', 'रूट कैनाल', 'रूटकैनाल', 'नस', 'संक्रमण'], link: '/root-canal-treatment-in-greater-noida/',
      en: 'A root canal removes infected tissue from inside a tooth so you can keep the tooth. It is done under local anaesthesia, so it should not hurt. The steps are an X-ray, opening and cleaning the canals, shaping and disinfecting, filling and sealing, and finally a crown or filling. It usually relieves pain rather than causing it.',
      hi: 'रूट कैनाल में दाँत के अंदर का संक्रमित हिस्सा साफ किया जाता है ताकि आपका दाँत बचा रहे। यह लोकल एनेस्थीसिया में होता है, इसलिए दर्द नहीं होना चाहिए। इसमें एक्स-रे, नलियों की सफाई, आकार देना और कीटाणुरहित करना, भरना और सील करना, और अंत में क्राउन या फिलिंग लगाई जाती है। यह आमतौर पर दर्द से राहत देता है।' },
    { id: 'implant', k: ['implant', 'missing tooth', 'missing teeth', 'tooth replacement', 'इम्प्लांट', 'इंप्लांट', 'टूटा दाँत', 'दाँत लगवाना', 'दांत लगवाना', 'गायब दाँत'], link: '/dental-implants-in-greater-noida/',
      en: 'A dental implant replaces a missing tooth with a titanium post placed in the jawbone, topped with a connector and a ceramic crown. It looks and works like a natural tooth. The dentist checks your gums and bone first, then explains the timeline and cost before you decide.',
      hi: 'डेंटल इम्प्लांट में खोए हुए दाँत की जगह जबड़े की हड्डी में टाइटेनियम का पोस्ट लगाया जाता है, जिस पर कनेक्टर और सिरेमिक क्राउन लगता है। यह असली दाँत जैसा दिखता और काम करता है। डेंटिस्ट पहले आपके मसूड़े और हड्डी की जाँच करते हैं, फिर समय और खर्च बताते हैं।' },
    { id: 'wisdom', k: ['wisdom', 'impacted', 'extraction', 'remove tooth', 'अक्ल', 'अकल', 'दाढ़', 'दाढ', 'निकालना', 'एक्सट्रैक्शन'], link: '/wisdom-tooth-extraction-in-greater-noida/',
      en: 'Wisdom teeth are removed when they are painful, infected, decayed or stuck under the gum. A simple one is taken out under local anaesthesia. An impacted tooth may need a small surgical procedure, where the gum is opened, the tooth is removed in sections and the area is stitched. You will get aftercare instructions.',
      hi: 'अक्ल दाढ़ तब निकाली जाती है जब वह दर्द दे, संक्रमित हो, सड़ गई हो या मसूड़े के नीचे फँसी हो। सामान्य दाढ़ लोकल एनेस्थीसिया में निकल जाती है। फँसी हुई दाढ़ के लिए छोटी सर्जरी हो सकती है, जिसमें मसूड़ा खोलकर दाढ़ टुकड़ों में निकाली जाती है और टाँके लगाए जाते हैं। बाद की देखभाल की जानकारी दी जाती है।' },
    { id: 'pain', k: ['toothache', 'tooth pain', 'pain', 'emergency', 'swelling', 'bleeding', 'broken', 'दर्द', 'दांत दर्द', 'दाँत दर्द', 'सूजन', 'खून', 'इमरजेंसी', 'टूट'], link: '/toothache-treatment-in-greater-noida/', action: 'call',
      en: 'Tooth pain is a sign that something needs attention. Please do not wait: call us on plus nine one, seven eight three four eight, three eight four eight five. Swelling of the face, fever, a knocked-out or broken tooth, or bleeding that will not stop should be seen quickly. I cannot diagnose over voice, but the dentist can examine you.',
      hi: 'दाँत में दर्द का मतलब है कि ध्यान देने की ज़रूरत है। कृपया इंतज़ार न करें, हमें +91 78348 38485 पर कॉल करें। चेहरे पर सूजन, बुखार, दाँत टूटना या गिर जाना, या न रुकने वाला खून जल्दी दिखाना चाहिए। मैं बोलकर जाँच नहीं कर सकता, लेकिन डेंटिस्ट आपकी जाँच कर सकते हैं।' },
    { id: 'kids', k: ['kid', 'kids', 'child', 'children', 'baby', 'pediatric', 'paediatric', 'बच्चे', 'बच्चों', 'बच्चा', 'बालक', 'शिशु'], link: '/pediatric-dentistry-in-greater-noida/',
      en: 'We look after children with patience. Visits include check-ups, cleaning, fluoride, sealants and fillings for milk teeth. Children should have a first dental visit by their first birthday. We explain each step in simple words so that the visit feels normal, not scary.',
      hi: 'हम बच्चों का इलाज धैर्य से करते हैं। इसमें चेक-अप, सफाई, फ्लोराइड, सीलेंट और दूध के दाँतों की फिलिंग शामिल है। बच्चे को पहले जन्मदिन तक पहली बार डेंटिस्ट को दिखा देना चाहिए। हम हर कदम आसान शब्दों में समझाते हैं ताकि डेंटिस्ट के पास जाना डरावना न लगे।' },
    { id: 'braces', k: ['braces', 'aligner', 'aligners', 'clear aligner', 'invisible', 'straight', 'crooked', 'orthodont', 'ब्रेसेस', 'ब्रेसिज़', 'अलाइनर', 'टेढ़े', 'टेढे', 'सीधे दाँत', 'आर्थोडोंटिक', 'ऑर्थोडॉन्टिक'], link: '/braces-and-aligners-in-greater-noida/',
      en: 'Braces and clear aligners straighten teeth and correct the bite. Braces use brackets and wires fixed to the teeth. Clear aligners are removable, almost invisible trays changed every one to two weeks. The process is a consultation with X-rays and scans, treatment, regular check-ups, and a retainer at the end. The cost depends on the type and the complexity of your case, and we give a written estimate.',
      hi: 'ब्रेसेस और क्लियर अलाइनर दाँतों को सीधा करते और बाइट ठीक करते हैं। ब्रेसेस में दाँतों पर ब्रैकेट और तार लगते हैं। क्लियर अलाइनर हटाई जा सकने वाली, लगभग अदृश्य ट्रे होती हैं, जो हर एक से दो हफ्ते में बदली जाती हैं। प्रक्रिया में पहले परामर्श, एक्स-रे और स्कैन, फिर इलाज, नियमित चेक-अप और अंत में रिटेनर शामिल है। खर्च आपके केस पर निर्भर करता है और हम लिखित अनुमान देते हैं।' },
    { id: 'whitening', k: ['whiten', 'whitening', 'bleach', 'yellow', 'stain', 'bright', 'सफेद', 'सफ़ेद', 'पीले', 'चमक', 'व्हाइटनिंग', 'दाग'], link: '/teeth-whitening-in-greater-noida/',
      en: 'Professional teeth whitening is done under supervision to lighten stains from tea, coffee and ageing. Your dentist checks your teeth and gums first, and may suggest a cleaning before whitening. It is a cosmetic treatment, so it is usually not covered by CGHS.',
      hi: 'प्रोफेशनल टीथ व्हाइटनिंग निगरानी में की जाती है, जिससे चाय, कॉफी और उम्र के दाग हल्के होते हैं। डेंटिस्ट पहले दाँत और मसूड़े जाँचते हैं और ज़रूरत हो तो पहले सफाई की सलाह देते हैं। यह कॉस्मेटिक इलाज है, इसलिए आमतौर पर CGHS में शामिल नहीं होता।' },
    { id: 'painless', k: ['painless', 'fear', 'afraid', 'anxiety', 'nervous', 'scared', 'anaesthesia', 'anesthesia', 'बिना दर्द', 'डर', 'घबराहट', 'दर्दरहित', 'बेहोश', 'सुन्न'], link: '/painless-dentistry-in-greater-noida/',
      en: 'We focus on comfortable, painless dentistry. We explain every step, numb the area well, work at your pace and stop whenever you ask. For very nervous patients we also have a conscious sedation unit, used only when the dentist advises it.',
      hi: 'हम आरामदायक और बिना दर्द वाले इलाज पर ध्यान देते हैं। हर कदम समझाते हैं, जगह को अच्छी तरह सुन्न करते हैं, आपकी गति से काम करते हैं और जब आप कहें तब रुक जाते हैं। बहुत घबराने वाले मरीज़ों के लिए कॉन्शियस सेडेशन यूनिट भी है, जिसे डेंटिस्ट की सलाह पर ही इस्तेमाल किया जाता है।' },
    { id: 'crown', k: ['crown', 'bridge', 'cap', 'denture', 'dentures', 'क्राउन', 'ब्रिज', 'कैप', 'डेन्चर', 'नकली दाँत', 'नकली दांत'], link: '/dental-crowns-and-bridges-in-greater-noida/',
      en: 'A crown is a custom-made cap that covers a damaged or weak tooth and restores its shape and strength. A bridge replaces one or more missing teeth using the neighbouring teeth, or implants, for support. We also help with dentures. The steps are examination, preparation, fitting and a final check of your bite.',
      hi: 'क्राउन एक विशेष रूप से बनी कैप है जो कमज़ोर या टूटे दाँत को ढककर उसका आकार और मज़बूती लौटाती है। ब्रिज एक या अधिक खोए दाँतों की जगह लेता है और पास के दाँतों या इम्प्लांट के सहारे टिकता है। हम डेन्चर में भी मदद करते हैं। प्रक्रिया में जाँच, तैयारी, फिटिंग और अंत में बाइट की जाँच होती है।' },
    { id: 'gums', k: ['scaling', 'cleaning', 'gum', 'gums', 'tartar', 'plaque', 'bad breath', 'polish', 'सफाई', 'मसूड़', 'मसूढ़', 'पायरिया', 'बदबू', 'टार्टर', 'स्केलिंग'], link: '/scaling-and-gum-treatment-in-greater-noida/',
      en: 'Scaling removes plaque and tartar from the teeth, and polishing smooths the surface. It helps with bleeding gums, bad breath and gum disease. A check-up and cleaning every six months to a year keeps gums healthy.',
      hi: 'स्केलिंग से दाँतों पर जमी प्लाक और टार्टर हटाई जाती है और पॉलिशिंग से सतह चिकनी होती है। यह मसूड़ों से खून आने, मुँह की बदबू और मसूड़ों की बीमारी में मदद करती है। हर छह महीने से एक साल में चेक-अप और सफाई कराने से मसूड़े स्वस्थ रहते हैं।' },
    { id: 'cost', k: ['cost', 'price', 'charges', 'fees', 'fee', 'how much', 'rate', 'rates', 'expensive', 'affordable', 'खर्च', 'कीमत', 'फीस', 'शुल्क', 'चार्ज', 'कितना', 'रेट', 'सस्ता'], link: '/dental-treatment-charges-in-greater-noida/',
      en: 'The cost depends on your treatment, which tooth, how complex the case is, and the materials. We examine you first, explain the options and give a clear written estimate before starting, so there are no surprises. Please call or WhatsApp to book a consultation.',
      hi: 'खर्च आपके इलाज, किस दाँत का है, केस कितना जटिल है और सामग्री पर निर्भर करता है। हम पहले आपकी जाँच करते हैं, विकल्प समझाते हैं और शुरू करने से पहले साफ लिखित अनुमान देते हैं, ताकि कोई हैरानी न हो। परामर्श के लिए कॉल या व्हाट्सऐप करें।' },
    { id: 'cghs', k: ['cghs', 'central government', 'govt', 'government', 'pensioner', 'card', 'empanel', 'empanelled', 'cashless', 'eligible', 'eligibility', 'सीजीएचएस', 'सी जी एच एस', 'सरकारी', 'पेंशनर', 'पेंशन', 'कार्ड', 'पैनल', 'कैशलेस', 'पात्र'], link: '/cghs-dental-hospital-in-greater-noida/',
      en: 'We are a CGHS empanelled dental hospital. CGHS, the Central Government Health Scheme, is for central government employees, pensioners, certain other groups such as members of Parliament and judges, and their eligible family members. Cardholders can be treated cashless at empanelled hospitals at CGHS rates. Please bring your CGHS card, a photo ID, and a referral or permission letter if your category needs one. Which procedures are payable is decided by CGHS, so we tell you before treatment.',
      hi: 'हम CGHS पैनल में शामिल डेंटल हॉस्पिटल हैं। CGHS यानी केंद्रीय सरकारी स्वास्थ्य योजना केंद्र सरकार के कर्मचारियों, पेंशनरों, कुछ अन्य वर्गों जैसे सांसद और न्यायाधीश, और उनके पात्र परिवारजनों के लिए है। कार्डधारक पैनल अस्पतालों में CGHS दरों पर कैशलेस इलाज करा सकते हैं। कृपया CGHS कार्ड, फोटो पहचान पत्र, और ज़रूरत हो तो रेफरल या अनुमति पत्र साथ लाएँ। कौन सा इलाज योजना में आता है, यह CGHS तय करता है, इसलिए हम इलाज से पहले बता देते हैं।' },
    { id: 'cghsage', k: ['below 60', 'above 70', '60 to 70', 'senior', 'old age', 'age', 'referral', 'wellness', '60', '70', 'बुज़ुर्ग', 'बुजुर्ग', 'उम्र', 'आयु', 'रेफरल', 'वेलनेस', 'साठ', 'सत्तर', 'सीनियर'], link: '/cghs-dental-hospital-in-greater-noida/#below-60',
      en: 'Under CGHS, the process depends on age and category. Below 60, usually serving employees and their families: you normally need a referral from the CGHS wellness centre, and serving employees need a permission letter from their department. Between 60 and 70, mostly pensioners: you need a valid card and a wellness centre referral, and treatment is cashless without an advance deposit. Above 70: you can consult specialists at empanelled hospitals directly in the O P D without a referral, with your valid card. Emergencies need no prior permission. Rules change, so please confirm with CGHS or call us.',
      hi: 'CGHS में प्रक्रिया उम्र और श्रेणी पर निर्भर करती है। 60 से कम उम्र में, आमतौर पर कार्यरत कर्मचारी और उनके परिवार: सामान्यतः CGHS वेलनेस सेंटर से रेफरल चाहिए, और कार्यरत कर्मचारियों को अपने विभाग से अनुमति पत्र चाहिए। 60 से 70 के बीच, ज़्यादातर पेंशनर: वैध कार्ड और वेलनेस सेंटर का रेफरल चाहिए, और इलाज बिना एडवांस जमा के कैशलेस होता है। 70 से ऊपर: वैध कार्ड के साथ आप पैनल अस्पताल में विशेषज्ञ से सीधे OPD में बिना रेफरल परामर्श ले सकते हैं। इमरजेंसी में पहले से अनुमति नहीं चाहिए। नियम बदलते रहते हैं, इसलिए CGHS से पुष्टि कर लें या हमें कॉल करें।' },
    { id: 'nabh', k: ['nabh', 'accredit', 'accreditation', 'accredited', 'quality', 'safety', 'certificate', 'एनएबीएच', 'एन ए बी एच', 'मान्यता', 'प्रमाणपत्र', 'गुणवत्ता', 'सुरक्षा', 'सर्टिफिकेट'], link: '/nabh-accredited-dental-hospital-in-greater-noida/',
      en: 'NABH stands for the National Accreditation Board for Hospitals and Healthcare Providers, a board of the Quality Council of India. NABH accreditation is an independent check that a hospital follows recognised standards for patient safety, infection control, consent, records and staff training. It is more than a licence, and it is granted for a fixed period. You can ask us for our certificate and verify it in the NABH directory.',
      hi: 'NABH का मतलब है नेशनल एक्रेडिटेशन बोर्ड फॉर हॉस्पिटल्स एंड हेल्थकेयर प्रोवाइडर्स, जो क्वालिटी काउंसिल ऑफ इंडिया का एक बोर्ड है। NABH मान्यता एक स्वतंत्र जाँच है कि अस्पताल मरीज़ की सुरक्षा, संक्रमण नियंत्रण, सहमति, रिकॉर्ड और स्टाफ प्रशिक्षण के मानकों का पालन करता है। यह लाइसेंस से बढ़कर है और एक निश्चित अवधि के लिए मिलती है। आप हमसे हमारा प्रमाणपत्र माँग सकते हैं और NABH की डायरेक्टरी में जाँच सकते हैं।' },
    { id: 'areas', k: ['noida extension', 'greater noida west', 'gaur city', 'noida', 'areas', 'नोएडा एक्सटेंशन', 'ग्रेटर नोएडा वेस्ट', 'गौर सिटी', 'इलाके'], link: '/contact-us/', action: 'directions',
      en: 'We welcome patients from Greater Noida, Greater Noida West, Noida Extension and Noida. Our hospital is on the 6th floor of Sunrise Tower in the Alpha-I Commercial Belt. Call before you travel, and we will confirm the doctor\'s time and what to bring.',
      hi: 'हम ग्रेटर नोएडा, ग्रेटर नोएडा वेस्ट, नोएडा एक्सटेंशन और नोएडा के मरीज़ों का स्वागत करते हैं। हमारा अस्पताल अल्फ़ा-वन कमर्शियल बेल्ट में सनराइज़ टावर की छठी मंज़िल पर है। आने से पहले कॉल करें, हम डॉक्टर का समय और साथ लाने वाली चीज़ें बता देंगे।' },
    { id: 'thanks', k: ['thank', 'thanks', 'bye', 'ok thanks', 'धन्यवाद', 'शुक्रिया', 'थैंक', 'अलविदा'],
      en: 'You are welcome! If you would like to book, call or WhatsApp us on plus nine one, seven eight three four eight, three eight four eight five. Have a healthy day!',
      hi: 'आपका स्वागत है! अपॉइंटमेंट के लिए हमें +91 78348 38485 पर कॉल या व्हाट्सऐप करें। आपका दिन स्वस्थ रहे!' }
  ];
  var FALLBACK = {
    en: 'I am not sure about that one. I can help with our treatments, CGHS, NABH, facilities, address and appointments. For anything else, please call or WhatsApp us on plus nine one, seven eight three four eight, three eight four eight five.',
    hi: 'इस बारे में मुझे पक्का पता नहीं। मैं हमारे इलाज, CGHS, NABH, सुविधाओं, पते और अपॉइंटमेंट के बारे में बता सकता हूँ। बाकी किसी भी बात के लिए +91 78348 38485 पर कॉल या व्हाट्सऐप करें।' };
  var CHIPS = [
    ['services', 'Our services', 'हमारी सेवाएँ'], ['rct', 'Root canal', 'रूट कैनाल'], ['implant', 'Dental implants', 'डेंटल इम्प्लांट'],
    ['braces', 'Braces & aligners', 'ब्रेसेस और अलाइनर'], ['cghs', 'CGHS', 'CGHS'], ['cghsage', 'CGHS by age', 'उम्र के अनुसार CGHS'],
    ['nabh', 'What is NABH?', 'NABH क्या है?'], ['facilities', 'Facilities', 'सुविधाएँ'], ['address', 'Address', 'पता'],
    ['book', 'Book appointment', 'अपॉइंटमेंट'], ['cost', 'Cost', 'खर्च'], ['kids', 'Kids dentist', 'बच्चों का डेंटिस्ट'],
    ['wisdom', 'Wisdom tooth', 'अक्ल दाढ़'], ['whitening', 'Whitening', 'दाँत सफेद करना'], ['pain', 'Toothache', 'दाँत दर्द'], ['doctor', 'Our dentist', 'हमारे डॉक्टर']
  ];
  var UI = {
    en: { title: 'Dental Assistant', sub: 'Ask in English or Hindi', ph: 'Type or tap the mic…', listen: 'Listen', send: 'Send', mic: 'Speak', micOn: 'Listening…', open: 'Open page', call: 'Call Now', wa: 'WhatsApp', dir: 'Get Directions',
      note: 'This assistant gives general information from our website. It cannot diagnose. For treatment advice, please see the dentist.', nohi: 'Hindi voice is not available on this device. Showing text only.', nomic: 'Voice input is not supported in this browser. Please type.', stop: 'Stop', sound: 'Voice on', soundOff: 'Voice off', close: 'Close', fab: 'Ask our AI assistant' },
    hi: { title: 'डेंटल असिस्टेंट', sub: 'हिंदी या अंग्रेज़ी में पूछें', ph: 'लिखें या माइक दबाएँ…', listen: 'सुनें', send: 'भेजें', mic: 'बोलें', micOn: 'सुन रहा हूँ…', open: 'पेज खोलें', call: 'कॉल करें', wa: 'व्हाट्सऐप', dir: 'रास्ता देखें',
      note: 'यह असिस्टेंट हमारी वेबसाइट से सामान्य जानकारी देता है। यह जाँच नहीं कर सकता। इलाज की सलाह के लिए डेंटिस्ट से मिलें।', nohi: 'इस डिवाइस पर हिंदी आवाज़ उपलब्ध नहीं है। केवल टेक्स्ट दिखाया जा रहा है।', nomic: 'इस ब्राउज़र में आवाज़ से इनपुट उपलब्ध नहीं है। कृपया टाइप करें।', stop: 'रोकें', sound: 'आवाज़ चालू', soundOff: 'आवाज़ बंद', close: 'बंद करें', fab: 'हमारे AI असिस्टेंट से पूछें' }
  };

  var lang = 'en', voiceOn = true, speaking = false, queue = [], voices = [], recog = null, listening = false, opened = false, greeted = false;
  var $ = function (id) { return document.getElementById(id); };
  var fab = $('ai-fab'), panel = $('ai-panel');
  if (!fab || !panel) return;
  var msgs = $('ai-msgs'), input = $('ai-input'), chips = $('ai-chips');

  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function t(key) { return UI[lang][key]; }

  /* ---------- speech ---------- */
  var synth = window.speechSynthesis;
  function loadVoices() { if (synth) voices = synth.getVoices() || []; }
  if (synth) { loadVoices(); if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices; }
  function pickVoice(l) {
    var want = l === 'hi' ? 'hi' : 'en', best = null;
    voices.forEach(function (v) {
      var vl = (v.lang || '').toLowerCase().replace('_', '-');
      if (vl.indexOf(want) !== 0) return;
      var score = (want === 'en' && vl === 'en-in' ? 3 : 1) + (/google|microsoft|natural|neural/i.test(v.name) ? 1 : 0);
      if (!best || score > best.s) best = { v: v, s: score };
    });
    return best ? best.v : null;
  }
  function speakable(text, l) {
    var s = text.replace(/\+91 78348 38485/g, l === 'hi' ? '7 8 3 4 8, 3 8 4 8 5' : '7 8 3 4 8, 3 8 4 8 5');
    if (l === 'hi') {
      s = s.replace(/CGHS/g, 'सी जी एच एस').replace(/NABH/g, 'एन ए बी एच').replace(/MDS/g, 'एम डी एस').replace(/OPD/g, 'ओ पी डी').replace(/RCT/g, 'आर सी टी');
    } else {
      s = s.replace(/CGHS/g, 'C G H S').replace(/NABH/g, 'N A B H').replace(/MDS/g, 'M D S').replace(/OPD/g, 'O P D').replace(/RCT/g, 'R C T').replace(/Dr\./g, 'Doctor');
    }
    return s;
  }
  function setSpeaking(on) {
    speaking = on;
    panel.classList.toggle('speaking', on);
    fab.classList.toggle('speaking', on);
    var b = $('ai-stop'); if (b) b.hidden = !on;
  }
  function stopSpeaking() { queue = []; if (synth) synth.cancel(); setSpeaking(false); }
  function speak(text, l) {
    if (!synth || !voiceOn) return;
    var v = pickVoice(l);
    if (l === 'hi' && !v) { note(UI.hi.nohi === undefined ? '' : (lang === 'hi' ? UI.hi.nohi : UI.en.nohi)); return; }
    stopSpeaking();
    var parts = speakable(text, l).match(/[^.!?।]+[.!?।]?/g) || [text];
    parts.forEach(function (p) { p = p.trim(); if (p) queue.push(p); });
    next(l, v);
  }
  function next(l, v) {
    if (!queue.length) { setSpeaking(false); return; }
    var u = new SpeechSynthesisUtterance(queue.shift());
    u.lang = l === 'hi' ? 'hi-IN' : 'en-IN'; if (v) u.voice = v; u.rate = 0.97; u.pitch = 1.02;
    u.onstart = function () { setSpeaking(true); };
    u.onend = function () { if (queue.length) next(l, v); else setSpeaking(false); };
    u.onerror = function () { setSpeaking(false); };
    synth.speak(u);
  }

  /* ---------- chat ---------- */
  function addMsg(kind, html, extra) {
    var d = document.createElement('div'); d.className = 'ai-msg ' + kind; d.innerHTML = html + (extra || '');
    msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight; return d;
  }
  function note(text) { var d = document.createElement('div'); d.className = 'ai-note'; d.textContent = text; msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight; }
  function actions(topic) {
    var a = '';
    if (topic.link) a += '<a class="ai-act" href="' + topic.link + '">' + t('open') + '</a>';
    if (topic.action === 'directions') a += '<a class="ai-act" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=28.4726069,77.5150841&destination_place_id=ChIJtz5K3qjrDDkRKiwsZiHbObo">' + t('dir') + '</a>';
    if (topic.action === 'contact' || topic.action === 'call' || topic.id === 'cghs' || topic.id === 'book') a += '<a class="ai-act call" href="tel:' + TEL + '">' + t('call') + '</a><a class="ai-act wa" target="_blank" rel="noopener" href="https://wa.me/' + WA + '">' + t('wa') + '</a>';
    return a ? '<div class="ai-acts">' + a + '</div>' : '';
  }
  function norm(s) { return ' ' + s.toLowerCase().replace(/[?!.,;:()"']/g, ' ').replace(/\s+/g, ' ') + ' '; }
  function find(q) {
    var n = norm(q), best = null, bs = 0;
    KB.forEach(function (tp) {
      var sc = 0;
      tp.k.forEach(function (w) {
        var wl = w.toLowerCase();
        if (n.indexOf(wl) !== -1) sc += Math.max(1, wl.length / 4);
      });
      if (tp.id === 'cghsage' && n.indexOf('cghs') === -1 && n.indexOf('सीजीएचएस') === -1 && n.indexOf('सरकारी') === -1 && n.indexOf('pensioner') === -1 && n.indexOf('पेंशन') === -1) sc = sc * 0.3;
      if (/(60|70|age|उम्र|senior|बुज़ुर्ग|बुजुर्ग|referral|रेफरल)/.test(n) && tp.id === 'cghsage' && /(cghs|सीजीएचएस|सरकारी|card|कार्ड)/.test(n)) sc += 3;
      if (sc > bs) { bs = sc; best = tp; }
    });
    return bs > 0 ? best : null;
  }
  function answer(q, forced) {
    var topic = forced ? KB.filter(function (x) { return x.id === forced; })[0] : find(q);
    if (/[ऀ-ॿ]/.test(q) && lang !== 'hi') setLang('hi', true);
    var text = topic ? topic[lang] : FALLBACK[lang];
    var d = addMsg('bot', '<p>' + esc(text) + '</p>', (topic ? actions(topic) : '<div class="ai-acts"><a class="ai-act call" href="tel:' + TEL + '">' + t('call') + '</a><a class="ai-act wa" target="_blank" rel="noopener" href="https://wa.me/' + WA + '">' + t('wa') + '</a></div>') + '<button type="button" class="ai-listen" aria-label="' + t('listen') + '">&#128266; ' + t('listen') + '</button>');
    d.querySelector('.ai-listen').addEventListener('click', function () { speak(text, lang); });
    speak(text, lang);
  }
  function ask(q, forced) {
    q = (q || '').trim(); if (!q && !forced) return;
    addMsg('user', esc(forced ? (lang === 'hi' ? chipLabel(forced, 2) : chipLabel(forced, 1)) : q));
    setTimeout(function () { answer(q, forced); }, 150);
  }
  function chipLabel(id, idx) { for (var i = 0; i < CHIPS.length; i++) if (CHIPS[i][0] === id) return CHIPS[i][idx]; return id; }
  function renderChips() {
    chips.innerHTML = '';
    CHIPS.forEach(function (c) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'ai-chip'; b.textContent = lang === 'hi' ? c[2] : c[1];
      b.addEventListener('click', function () { ask('', c[0]); }); chips.appendChild(b);
    });
  }
  function setLang(l, silent) {
    lang = l;
    $('ai-en').setAttribute('aria-pressed', l === 'en'); $('ai-hi').setAttribute('aria-pressed', l === 'hi');
    $('ai-en').classList.toggle('on', l === 'en'); $('ai-hi').classList.toggle('on', l === 'hi');
    $('ai-title').textContent = t('title'); $('ai-sub').textContent = t('sub'); input.placeholder = t('ph');
    $('ai-send').textContent = t('send'); $('ai-stop').textContent = '■ ' + t('stop'); $('ai-disclaimer').textContent = t('note');
    fab.setAttribute('aria-label', t('fab')); $('ai-close').setAttribute('aria-label', t('close'));
    $('ai-voice').textContent = voiceOn ? '🔊 ' + t('sound') : '🔇 ' + t('soundOff');
    if (recog) recog.lang = l === 'hi' ? 'hi-IN' : 'en-IN';
    renderChips(); if (!silent) stopSpeaking();
  }

  /* ---------- voice input ---------- */
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var micBtn = $('ai-mic');
  if (!SR) { micBtn.hidden = true; }
  else {
    recog = new SR(); recog.interimResults = false; recog.maxAlternatives = 1; recog.lang = 'en-IN';
    recog.onresult = function (e) { var txt = e.results[0][0].transcript; input.value = ''; ask(txt); };
    recog.onend = function () { listening = false; micBtn.classList.remove('on'); micBtn.setAttribute('aria-label', t('mic')); };
    recog.onerror = function () { listening = false; micBtn.classList.remove('on'); };
    micBtn.addEventListener('click', function () {
      if (listening) { recog.stop(); return; }
      stopSpeaking();
      try { recog.lang = lang === 'hi' ? 'hi-IN' : 'en-IN'; recog.start(); listening = true; micBtn.classList.add('on'); micBtn.setAttribute('aria-label', t('micOn')); }
      catch (e) { note(t('nomic')); }
    });
  }

  /* ---------- open / close ---------- */
  function openPanel() {
    panel.hidden = false; fab.classList.add('hide'); opened = true; document.documentElement.classList.add('ai-open');
    if (!greeted) { greeted = true; addMsg('bot', '<p>' + esc(KB[0][lang]) + '</p>'); }
    setTimeout(function () { input.focus({ preventScroll: true }); }, 50);
  }
  function closePanel() { panel.hidden = true; fab.classList.remove('hide'); stopSpeaking(); document.documentElement.classList.remove('ai-open'); fab.focus({ preventScroll: true }); }
  fab.addEventListener('click', function () {
    openPanel();
    // greet aloud on first open (the tap counts as the user gesture speech needs)
    if (!fab.dataset.said) { fab.dataset.said = '1'; speak(KB[0][lang], lang); }
  });
  $('ai-close').addEventListener('click', closePanel);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) closePanel(); });
  $('ai-en').addEventListener('click', function () { setLang('en'); });
  $('ai-hi').addEventListener('click', function () { setLang('hi'); });
  $('ai-stop').addEventListener('click', stopSpeaking);
  $('ai-voice').addEventListener('click', function () { voiceOn = !voiceOn; if (!voiceOn) stopSpeaking(); $('ai-voice').textContent = voiceOn ? '🔊 ' + t('sound') : '🔇 ' + t('soundOff'); });
  $('ai-form').addEventListener('submit', function (e) { e.preventDefault(); var v = input.value; input.value = ''; ask(v); });
  if (!synth) { $('ai-voice').hidden = true; }
  setLang('en', true);
})();
