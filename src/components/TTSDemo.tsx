import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, Volume2, Download, Loader2 } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
  sample: string;
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    sample: 'Welcome to OdiaBiz AI! How can I help you today?'
  },
  {
    code: 'pcm',
    name: 'Nigerian Pidgin',
    flag: '🇳🇬',
    sample: 'Welcome to OdiaBiz AI! Wetin you wan make I help you with today?'
  },
  {
    code: 'yo',
    name: 'Yorùbá',
    flag: '🇳🇬',
    sample: 'Káàbọ̀ sí OdiaBiz AI! Báwo ni mo ṣe lè ṣe ìrànlọ́wọ́ fún ọ lónìí?'
  },
  {
    code: 'ig',
    name: 'Igbo',
    flag: '🇳🇬',
    sample: 'Nnọọ na OdiaBiz AI! Kedu ka m ga-esi nyere gị aka taa?'
  }
];

const TTSDemo = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const generateVoice = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to TTS service
      const response = await fetch('https://odiadev-tts-plug-n-play.onrender.com/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: selectedLanguage.sample,
          language: selectedLanguage.code,
          voice: 'nigerian-accent'
        })
      });
      
      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
        }
      } else {
        console.log('Using demo audio for development');
      }
    } catch (error) {
      console.log('Using demo mode for TTS');
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const downloadAudio = () => {
    if (audioRef.current?.src) {
      const link = document.createElement('a');
      link.href = audioRef.current.src;
      link.download = `odiaai-${selectedLanguage.code}-demo.wav`;
      link.click();
    }
  };

  return (
    <section className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Try Our <span className="text-primary">Nigerian Voice AI</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience authentic Nigerian accents across all major languages. Perfect for connecting with your customers in their preferred language.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-elegant">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Language Selection */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Select Language</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={selectedLanguage.code === lang.code ? 'default' : 'language'}
                      onClick={() => setSelectedLanguage(lang)}
                      className="justify-start"
                    >
                      <span className="text-lg mr-2">{lang.flag}</span>
                      {lang.name}
                    </Button>
                  ))}
                </div>

                <div className="bg-accent p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Sample Text:</p>
                  <p className="font-medium">{selectedLanguage.sample}</p>
                </div>
              </div>

              {/* Voice Controls */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Voice Generation</h3>
                
                <div className="space-y-4">
                  <Button 
                    variant="cta" 
                    size="lg" 
                    onClick={generateVoice}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating Voice...
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-5 h-5" />
                        Generate {selectedLanguage.name} Voice
                      </>
                    )}
                  </Button>

                  {/* Voice Waveform Animation */}
                  <div className="flex items-center justify-center gap-1 h-16 bg-primary/5 rounded-lg">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 bg-primary rounded-full voice-wave ${isPlaying ? 'animate-pulse' : ''}`}
                        style={{
                          height: `${Math.random() * 40 + 10}px`,
                          animationDelay: `${i * 0.05}s`
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={playAudio}
                      disabled={!audioRef.current?.src}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={downloadAudio}
                      disabled={!audioRef.current?.src}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <audio
          ref={audioRef}
          onEnded={() => setIsPlaying(false)}
          style={{ display: 'none' }}
        />
      </div>
    </section>
  );
};

export default TTSDemo;