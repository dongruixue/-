import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  Sparkles, 
  Sliders, 
  RotateCcw, 
  Check, 
  X,
  Play
} from 'lucide-react';
import { speechService } from '../utils/speech';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [pitch, setPitch] = useState<number>(speechService.getPitch());
  const [rate, setRate] = useState<number>(speechService.getRate());
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [isPlayingTest, setIsPlayingTest] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setPitch(speechService.getPitch());
      setRate(speechService.getRate());
      const voices = speechService.getAvailableVoices();
      setAvailableVoices(voices);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const testPhrases = [
    "Hello! Although tired, she still finished the report.",
    "Walking around the lake, the children saw many lovely ducks!",
    "The boy who won the contest is my best friend."
  ];

  const handleTestSpeech = (textToTest?: string) => {
    if (isPlayingTest) {
      speechService.stop();
      setIsPlayingTest(false);
      return;
    }

    const phrase = textToTest || testPhrases[0];
    setIsPlayingTest(true);
    speechService.speak(
      phrase,
      rate,
      () => setIsPlayingTest(true),
      () => setIsPlayingTest(false),
      () => setIsPlayingTest(false),
      pitch
    );
  };

  const handlePitchChange = (val: number) => {
    setPitch(val);
    speechService.setPitch(val);
  };

  const handleRateChange = (val: number) => {
    setRate(val);
    speechService.setRate(val);
  };

  const handleSelectVoice = (uri: string) => {
    setSelectedVoiceURI(uri);
    speechService.setVoiceURI(uri);
  };

  const handleResetToGirlPreset = () => {
    const defaultPitch = 1.35;
    const defaultRate = 0.88;
    setPitch(defaultPitch);
    setRate(defaultRate);
    setSelectedVoiceURI('');
    speechService.setPitch(defaultPitch);
    speechService.setRate(defaultRate);
    speechService.setVoiceURI('');
    handleTestSpeech("Sweet and clear girl voice restored!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full border border-amber-200/80 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Volume2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base font-heading">
                语音音质与萝莉/小女孩音色设置
              </h3>
              <p className="text-xs text-amber-100">
                专为小学英语定制的甜美清澈发音
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              speechService.stop();
              onClose();
            }}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sliders & Controls */}
        <div className="p-6 space-y-5 text-xs sm:text-sm text-slate-800">
          {/* Preset Badge */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold">默认推荐：甜美小女孩音色</span>
                <p className="text-[11px] text-amber-700">高音调(1.35x) + 舒缓童音语速(0.88x)</p>
              </div>
            </div>
            <button
              onClick={handleResetToGirlPreset}
              className="px-2.5 py-1 text-xs font-semibold bg-white text-amber-700 border border-amber-300 hover:bg-amber-100/50 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              一键设为小女孩音
            </button>
          </div>

          {/* Pitch Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">
                音调 (Pitch) — 当前：{pitch.toFixed(2)}x
              </span>
              <span className="text-slate-500 text-[11px]">
                {pitch >= 1.25 ? '👧 甜美清脆小女孩' : pitch >= 1.05 ? '👩 温和少女音' : '自然成人音'}
              </span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.7"
              step="0.05"
              value={pitch}
              onChange={(e) => handlePitchChange(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>低沉稳重 (0.8x)</span>
              <span>自然标准 (1.0x)</span>
              <span>清脆小女孩 (1.35x-1.5x)</span>
            </div>
          </div>

          {/* Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">
                语速 (Speed) — 当前：{rate.toFixed(2)}x
              </span>
              <span className="text-slate-500 text-[11px]">
                {rate <= 0.85 ? '🐢 慢速辨析' : rate <= 0.95 ? '⭐ 适宜跟读' : '快速流利'}
              </span>
            </div>
            <input
              type="range"
              min="0.7"
              max="1.1"
              step="0.02"
              value={rate}
              onChange={(e) => handleRateChange(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>慢速磨耳朵 (0.7x)</span>
              <span>小学生清晰语速 (0.88x)</span>
              <span>正常日常语速 (1.0x)</span>
            </div>
          </div>

          {/* Voice Model Selection */}
          {availableVoices.length > 0 && (
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-800 text-xs">
                设备底层发音人选择 (优先推荐女性/童音引擎)：
              </label>
              <select
                value={selectedVoiceURI}
                onChange={(e) => handleSelectVoice(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:bg-white focus:border-amber-500"
              >
                <option value="">✨ 系统自动智能匹配最优甜美女声 / Natural Female</option>
                {availableVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Test Speech Button */}
          <div className="pt-2">
            <button
              onClick={() => handleTestSpeech()}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                isPlayingTest
                  ? 'bg-rose-500 hover:bg-rose-600 text-white'
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              {isPlayingTest ? (
                <>停止试听</>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  试听当前小女孩发音效果
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={() => {
              speechService.stop();
              onClose();
            }}
            className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            完成设置
          </button>
        </div>
      </div>
    </div>
  );
};
