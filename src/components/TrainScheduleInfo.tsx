
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type ScheduleProps = {
  language: string;
};

const TrainScheduleInfo = ({ language }: ScheduleProps) => {
  // Example train data
  const trainData = {
    'en-US': [
      { id: 1, name: "Rajdhani Express", from: "New Delhi", to: "Mumbai", departure: "16:25", arrival: "08:15", platform: 5 },
      { id: 2, name: "Shatabdi Express", from: "Bangalore", to: "Chennai", departure: "06:00", arrival: "11:00", platform: 3 },
      { id: 3, name: "Duronto Express", from: "Howrah", to: "New Delhi", departure: "20:30", arrival: "07:40", platform: 9 }
    ],
    'hi-IN': [
      { id: 1, name: "राजधानी एक्सप्रेस", from: "नई दिल्ली", to: "मुंबई", departure: "16:25", arrival: "08:15", platform: 5 },
      { id: 2, name: "शताब्दी एक्सप्रेस", from: "बैंगलोर", to: "चेन्नई", departure: "06:00", arrival: "11:00", platform: 3 },
      { id: 3, name: "दुरंतो एक्सप्रेस", from: "हावड़ा", to: "नई दिल्ली", departure: "20:30", arrival: "07:40", platform: 9 }
    ],
    'kn-IN': [
      { id: 1, name: "ರಾಜಧಾನಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್", from: "ನವದೆಹಲಿ", to: "ಮುಂಬೈ", departure: "16:25", arrival: "08:15", platform: 5 },
      { id: 2, name: "ಶತಾಬ್ದಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್", from: "ಬೆಂಗಳೂರು", to: "ಚೆನ್ನೈ", departure: "06:00", arrival: "11:00", platform: 3 },
      { id: 3, name: "ದುರಂತೋ ಎಕ್ಸ್‌ಪ್ರೆಸ್", from: "ಹೌರಾ", to: "ನವದೆಹಲಿ", departure: "20:30", arrival: "07:40", platform: 9 }
    ],
    'ml-IN': [
      { id: 1, name: "രാജധാനി എക്സ്പ്രസ്", from: "ന്യൂഡൽഹി", to: "മുംബൈ", departure: "16:25", arrival: "08:15", platform: 5 },
      { id: 2, name: "ശതാബ്ദി എക്സ്പ്രസ്", from: "ബാംഗ്ലൂർ", to: "ചെന്നൈ", departure: "06:00", arrival: "11:00", platform: 3 },
      { id: 3, name: "ദുരന്തോ എക്സ്പ്രസ്", from: "ഹൗറ", to: "ന്യൂഡൽഹി", departure: "20:30", arrival: "07:40", platform: 9 }
    ]
  };

  // Headers based on language
  const headers = {
    'en-US': { title: 'Popular Trains', train: 'Train', from: 'From', to: 'To', departure: 'Departure', arrival: 'Arrival', platform: 'Platform' },
    'hi-IN': { title: 'लोकप्रिय ट्रेनें', train: 'ट्रेन', from: 'से', to: 'तक', departure: 'प्रस्थान', arrival: 'आगमन', platform: 'प्लेटफॉर्म' },
    'kn-IN': { title: 'ಜನಪ್ರಿಯ ರೈಲುಗಳು', train: 'ರೈಲು', from: 'ಇಂದ', to: 'ಗೆ', departure: 'ನಿಗ್ರಮನ', arrival: 'ಆಗಮನ', platform: 'ವೇದಿಕೆ' },
    'ml-IN': { title: 'ജനപ്രിയ ട്രെയിനുകൾ', train: 'ട്രെയിൻ', from: 'നിന്ന്', to: 'വരെ', departure: 'പുറപ്പെടൽ', arrival: 'എത്തിച്ചേരൽ', platform: 'പ്ലാറ്റ്ഫോം' }
  };

  const selectedLanguage = language in trainData ? language : 'en-US';
  const selectedHeaders = headers[selectedLanguage as keyof typeof headers];
  const trains = trainData[selectedLanguage as keyof typeof trainData];

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-assistant-primary">{selectedHeaders.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="pb-2">{selectedHeaders.train}</th>
                <th className="pb-2">{selectedHeaders.from}</th>
                <th className="pb-2">{selectedHeaders.to}</th>
                <th className="pb-2">{selectedHeaders.departure}</th>
                <th className="pb-2">{selectedHeaders.arrival}</th>
                <th className="pb-2">{selectedHeaders.platform}</th>
              </tr>
            </thead>
            <tbody>
              {trains.map((train) => (
                <tr key={train.id} className="border-t">
                  <td className="py-2 font-medium">{train.name}</td>
                  <td className="py-2">{train.from}</td>
                  <td className="py-2">{train.to}</td>
                  <td className="py-2">{train.departure}</td>
                  <td className="py-2">{train.arrival}</td>
                  <td className="py-2">{train.platform}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainScheduleInfo;
