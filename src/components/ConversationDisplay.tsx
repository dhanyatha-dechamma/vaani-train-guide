
import { Card } from "@/components/ui/card";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

type Language = {
  code: string;
  name: string;
  nativeName: string;
};

type ConversationDisplayProps = {
  messages: Message[];
  language: Language;
};

const ConversationDisplay = ({ messages, language }: ConversationDisplayProps) => {
  if (messages.length === 0) {
    // Show welcome message in the selected language
    let welcomeMessage = "";
    switch (language.code) {
      case 'en-US':
        welcomeMessage = "Hello! I'm your train assistant. You can ask me about train schedules, station information, or general inquiries. Click the microphone to start speaking.";
        break;
      case 'hi-IN':
        welcomeMessage = "नमस्ते! मैं आपका ट्रेन सहायक हूं। आप मुझसे ट्रेन के कार्यक्रम, स्टेशन की जानकारी, या सामान्य प्रश्न पूछ सकते हैं। बोलना शुरू करने के लिए माइक्रोफोन पर क्लिक करें।";
        break;
      case 'kn-IN':
        welcomeMessage = "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ರೈಲು ಸಹಾಯಕ. ನೀವು ನನ್ನನ್ನು ರೈಲು ವೇಳಾಪಟ್ಟಿಗಳು, ನಿಲ್ದಾಣದ ಮಾಹಿತಿ, ಅಥವಾ ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳ ಬಗ್ಗೆ ಕೇಳಬಹುದು. ಮಾತನಾಡಲು ಪ್ರಾರಂಭಿಸಲು ಮೈಕ್ರೋಫೋನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.";
        break;
      case 'ml-IN':
        welcomeMessage = "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ ട്രെയിൻ അസിസ്റ്റന്റ് ആണ്. ട്രെയിൻ ഷെഡ്യൂളുകൾ, സ്റ്റേഷൻ വിവരങ്ങൾ, അല്ലെങ്കിൽ പൊതുവായ അന്വേഷണങ്ങൾ എന്നിവയെക്കുറിച്ച് നിങ്ങൾക്ക് എന്നോട് ചോദിക്കാം. സംസാരിക്കാൻ തുടങ്ങാൻ മൈക്രോഫോണിൽ ക്ലിക്ക് ചെയ്യുക.";
        break;
      default:
        welcomeMessage = "Hello! I'm your train assistant. You can ask me about train schedules, station information, or general inquiries. Click the microphone to start speaking.";
    }

    return (
      <Card className="p-4 bg-assistant-light text-assistant-primary mb-4">
        <p>{welcomeMessage}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`rounded-lg px-4 py-2 max-w-[80%] ${
              message.isUser 
                ? 'bg-assistant-primary text-white' 
                : 'bg-assistant-light text-assistant-primary'
            }`}
          >
            <p 
              dir={
                language.code === 'ml-IN' || language.code === 'hi-IN' 
                  ? 'rtl' 
                  : 'ltr'
              }
            >
              {message.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationDisplay;
