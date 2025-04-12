
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2, Languages } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import ConversationDisplay from "@/components/ConversationDisplay";
import { useToast } from "@/components/ui/use-toast";

// Mock function for speech recognition - in a real app, we'd integrate with Web Speech API or a similar service
const mockRecognizeSpeech = (lang: string) => {
  // Simulate different responses based on language
  const responses: Record<string, string[]> = {
    'en-US': [
      "When is the next train to Mumbai?",
      "I need information about the Rajdhani Express",
      "Are there any delays on the Bangalore route?"
    ],
    'hi-IN': [
      "मुंबई जाने वाली अगली ट्रेन कब है?",
      "राजधानी एक्सप्रेस के बारे में जानकारी चाहिए",
      "क्या बैंगलोर मार्ग पर कोई देरी है?"
    ],
    'kn-IN': [
      "ಮುಂಬೈಗೆ ಮುಂದಿನ ರೈಲು ಯಾವಾಗ?",
      "ರಾಜಧಾನಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಬಗ್ಗೆ ಮಾಹಿತಿ ಬೇಕು",
      "ಬೆಂಗಳೂರು ಮಾರ್ಗದಲ್ಲಿ ಯಾವುದೇ ವಿಳಂಬಗಳಿವೆಯೇ?"
    ],
    'ml-IN': [
      "മുംബൈയിലേക്കുള്ള അടുത്ത ട്രെയിൻ എപ്പോഴാണ്?",
      "രാജധാനി എക്സ്പ്രസിനെക്കുറിച്ചുള്ള വിവരങ്ങൾ എനിക്ക് ആവശ്യമാണ്",
      "ബാംഗ്ലൂർ റൂട്ടിൽ എന്തെങ്കിലും കാലതാമസമുണ്ടോ?"
    ]
  };

  return new Promise<string>((resolve) => {
    const randomIndex = Math.floor(Math.random() * responses[lang].length);
    setTimeout(() => {
      resolve(responses[lang][randomIndex]);
    }, 2000);
  });
};

// Mock function for assistant responses - in a real app, we'd integrate with a backend API
const mockAssistantResponse = (query: string, lang: string) => {
  // For demonstration, we'll return predefined responses based on language and query content
  const containsKeyword = (text: string, keywords: string[]) => 
    keywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()));
  
  let response = "";
  
  if (lang === 'en-US') {
    if (containsKeyword(query, ['next', 'train', 'mumbai'])) {
      response = "The next train to Mumbai is Duronto Express departing at 8:30 PM from platform 3.";
    } else if (containsKeyword(query, ['rajdhani'])) {
      response = "Rajdhani Express runs daily from New Delhi to Mumbai. It departs at 4:25 PM and arrives at 8:15 AM the next day.";
    } else if (containsKeyword(query, ['delay', 'bangalore'])) {
      response = "Currently, trains to Bangalore are running on time with no reported delays.";
    } else {
      response = "I'm sorry, I couldn't understand your query. Please try again.";
    }
  } else if (lang === 'hi-IN') {
    if (containsKeyword(query, ['मुंबई', 'ट्रेन', 'अगली'])) {
      response = "मुंबई के लिए अगली ट्रेन दुरंतो एक्सप्रेस है जो शाम 8:30 बजे प्लेटफॉर्म 3 से रवाना होगी।";
    } else if (containsKeyword(query, ['राजधानी'])) {
      response = "राजधानी एक्सप्रेस नई दिल्ली से मुंबई तक रोजाना चलती है। यह शाम 4:25 बजे रवाना होती है और अगले दिन सुबह 8:15 बजे पहुंचती है।";
    } else if (containsKeyword(query, ['देरी', 'बैंगलोर'])) {
      response = "वर्तमान में, बैंगलोर के लिए ट्रेनें समय पर चल रही हैं और कोई देरी की सूचना नहीं है।";
    } else {
      response = "मुझे आपका प्रश्न समझ नहीं आया। कृपया फिर से प्रयास करें।";
    }
  } else if (lang === 'kn-IN') {
    if (containsKeyword(query, ['ಮುಂಬೈ', 'ರೈಲು', 'ಮುಂದಿನ'])) {
      response = "ಮುಂಬೈಗೆ ಮುಂದಿನ ರೈಲು ದುರಂತೋ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಸಂಜೆ 8:30ಕ್ಕೆ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ 3 ರಿಂದ ಹೊರಡುತ್ತದೆ.";
    } else if (containsKeyword(query, ['ರಾಜಧಾನಿ'])) {
      response = "ರಾಜಧಾನಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ನವದೆಹಲಿಯಿಂದ ಮುಂಬೈಗೆ ಪ್ರತಿದಿನ ಓಡುತ್ತದೆ. ಇದು ಸಂಜೆ 4:25ಕ್ಕೆ ಹೊರಟು ಮರುದಿನ ಬೆಳಿಗ್ಗೆ 8:15ಕ್ಕೆ ತಲುಪುತ್ತದೆ.";
    } else if (containsKeyword(query, ['ವಿಳಂಬ', 'ಬೆಂಗಳೂರು'])) {
      response = "ಪ್ರಸ್ತುತ, ಬೆಂಗಳೂರಿಗೆ ರೈಲುಗಳು ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಓಡುತ್ತಿವೆ ಮತ್ತು ಯಾವುದೇ ವಿಳಂಬಗಳ ವರದಿ ಇಲ್ಲ.";
    } else {
      response = "ಕ್ಷಮಿಸಿ, ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ನಾನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.";
    }
  } else if (lang === 'ml-IN') {
    if (containsKeyword(query, ['മുംബൈ', 'ട്രെയിൻ', 'അടുത്ത'])) {
      response = "മുംബൈയിലേക്കുള്ള അടുത്ത ട്രെയിൻ ദുരന്തോ എക്സ്പ്രസ് ആണ്, വൈകുന്നേരം 8:30-ന് പ്ലാറ്റ്ഫോം 3-ൽ നിന്ന് പുറപ്പെടുന്നു.";
    } else if (containsKeyword(query, ['രാജധാനി'])) {
      response = "രാജധാനി എക്സ്പ്രസ് ന്യൂഡൽഹിയിൽ നിന്ന് മുംബൈയിലേക്ക് ദിവസവും സർവീസ് നടത്തുന്നു. ഇത് വൈകുന്നേരം 4:25-ന് പുറപ്പെട്ട് അടുത്ത ദിവസം രാവിലെ 8:15-ന് എത്തിച്ചേരുന്നു.";
    } else if (containsKeyword(query, ['കാലതാമസം', 'ബാംഗ്ലൂർ'])) {
      response = "നിലവിൽ, ബാംഗ്ലൂരിലേക്കുള്ള ട്രെയിനുകൾ സമയത്ത് തന്നെ സർവീസ് നടത്തുന്നു, യാതൊരു കാലതാമസവും റിപ്പോർട്ട് ചെയ്തിട്ടില്ല.";
    } else {
      response = "ക്ഷമിക്കണം, എനിക്ക് നിങ്ങളുടെ ചോദ്യം മനസിലാക്കാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.";
    }
  }
  
  return new Promise<string>(resolve => {
    setTimeout(() => {
      resolve(response);
    }, 1500);
  });
};

// Mock text-to-speech function - in a real app, we'd integrate with Web Speech API or similar
const mockSpeakText = (text: string, lang: string) => {
  console.log(`Speaking in ${lang}: ${text}`);
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

type Language = {
  code: string;
  name: string;
  nativeName: string;
};

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: 'en-US',
    name: 'English',
    nativeName: 'English'
  });
  const { toast } = useToast();

  const languages: Language[] = [
    { code: 'en-US', name: 'English', nativeName: 'English' },
    { code: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml-IN', name: 'Malayalam', nativeName: 'മലയാളം' }
  ];

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
    toast({
      title: "Language Changed",
      description: `Assistant will now respond in ${lang.name}`,
    });
  };

  const handleMicrophoneClick = async () => {
    if (isListening) {
      setIsListening(false);
      return;
    }
    
    setIsListening(true);
    toast({
      title: "Listening...",
      description: "Speak now in " + selectedLanguage.name,
    });
    
    try {
      // Replace with actual speech recognition in a real app
      const recognizedText = await mockRecognizeSpeech(selectedLanguage.code);
      
      // Add user message
      const userMessageId = Date.now().toString();
      setMessages(prev => [...prev, {
        id: userMessageId,
        text: recognizedText,
        isUser: true
      }]);
      
      // Process the query and get response
      setIsSpeaking(true);
      const response = await mockAssistantResponse(recognizedText, selectedLanguage.code);
      
      // Add assistant response
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false
      }]);
      
      // Speak the response
      await mockSpeakText(response, selectedLanguage.code);
      setIsSpeaking(false);
      
    } catch (error) {
      console.error("Error in voice processing:", error);
      toast({
        title: "Error",
        description: "There was an error processing your voice input",
        variant: "destructive",
      });
    } finally {
      setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-assistant-primary">
          Train Assistant
        </h2>
        <LanguageSelector 
          languages={languages}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </div>
      
      <Card className="flex-grow mb-4 overflow-hidden">
        <CardContent className="p-4 h-full overflow-y-auto">
          <ConversationDisplay messages={messages} language={selectedLanguage} />
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="lg"
          className={`rounded-full p-6 ${
            isListening 
              ? 'bg-assistant-error text-white animate-pulse-ring' 
              : isSpeaking 
                ? 'bg-assistant-accent text-white' 
                : 'bg-assistant-light text-assistant-primary'
          }`}
          onClick={handleMicrophoneClick}
        >
          {isListening ? (
            <MicOff className="h-8 w-8" />
          ) : isSpeaking ? (
            <Volume2 className="h-8 w-8" />
          ) : (
            <Mic className="h-8 w-8" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default VoiceAssistant;
