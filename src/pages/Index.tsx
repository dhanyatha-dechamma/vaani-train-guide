
import { useState } from "react";
import VoiceAssistant from "@/components/VoiceAssistant";
import TrainScheduleInfo from "@/components/TrainScheduleInfo";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Train, HelpCircle, MapPin } from "lucide-react";

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');

  // Update language in all components when it changes
  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-assistant-primary text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Train className="h-6 w-6" />
            <h1 className="text-xl font-bold">Train Voice Assistant</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="schedule" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="schedule" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Schedules</span>
                </TabsTrigger>
                <TabsTrigger value="stations" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Stations</span>
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>FAQs</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="schedule">
                <TrainScheduleInfo language={selectedLanguage} />
              </TabsContent>
              
              <TabsContent value="stations">
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <p className="text-gray-500">
                    Station information will be available soon.
                    Ask the voice assistant for details about specific stations.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="faq">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-bold text-lg mb-4 text-assistant-primary">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div className="border-b pb-2">
                      <h4 className="font-medium">How do I check train schedules?</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Simply ask the voice assistant about a specific train or route by clicking on the microphone button.
                      </p>
                    </div>
                    <div className="border-b pb-2">
                      <h4 className="font-medium">Can I get information in multiple languages?</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Yes, our assistant supports English, Hindi, Kannada, and Malayalam. Select your preferred language from the dropdown.
                      </p>
                    </div>
                    <div className="border-b pb-2">
                      <h4 className="font-medium">How accurate is the train information?</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Our system provides real-time information about train schedules, platforms, and delays.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-4 h-[500px] flex flex-col">
            <VoiceAssistant />
          </div>
        </div>
      </main>
      
      <footer className="bg-assistant-primary text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© 2025 Train Voice Assistant - Multilingual Support for Train Services</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
