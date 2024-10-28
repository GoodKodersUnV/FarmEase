import React, { useState, useEffect } from 'react';
import { Pause, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynth, setSpeechSynth] = useState(null);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    // Initialize speech synthesis
    setSpeechSynth(window.speechSynthesis);
    return () => {
      // Cleanup
      if (speechSynth) {
        speechSynth.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (text) {
      // Create new utterance when text changes
      const newUtterance = new SpeechSynthesisUtterance(text);
      newUtterance.onend = () => setIsPlaying(false);
      setUtterance(newUtterance);
    }
  }, [text]);

  const toggleSpeech = () => {
    if (!text || !speechSynth) return;

    if (isPlaying) {
      speechSynth.pause();
      setIsPlaying(false);
    } else {
      if (speechSynth.paused) {
        speechSynth.resume();
      } else {
        speechSynth.cancel();
        utterance && speechSynth.speak(utterance);
      }
      setIsPlaying(true);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Text to Speech</span>
          <Button
            onClick={toggleSpeech}
            disabled={!text}
            variant="outline"
            className="w-12 h-12 p-2 rounded-full"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Enter text to convert to speech..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px] text-lg p-4"
        />
        <div className="mt-4 text-sm text-gray-500">
          {text ? `Characters: ${text.length}` : 'Enter some text to begin'}
        </div>
      </CardContent>
    </Card>
  );
};

export default TextToSpeech;