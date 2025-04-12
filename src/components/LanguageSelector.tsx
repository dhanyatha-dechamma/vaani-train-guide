
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

type Language = {
  code: string;
  name: string;
  nativeName: string;
};

type LanguageSelectorProps = {
  languages: Language[];
  selectedLanguage: Language;
  onLanguageChange: (lang: Language) => void;
};

const LanguageSelector = ({ 
  languages, 
  selectedLanguage, 
  onLanguageChange 
}: LanguageSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Languages className="h-4 w-4" />
          <span>{selectedLanguage.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            className={selectedLanguage.code === lang.code ? "bg-assistant-light" : ""}
            onClick={() => onLanguageChange(lang)}
          >
            <div className="flex flex-col">
              <span>{lang.nativeName}</span>
              {lang.name !== lang.nativeName && (
                <span className="text-xs text-gray-500">{lang.name}</span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
