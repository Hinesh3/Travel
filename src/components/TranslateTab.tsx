import React, { useState } from 'react';
import { JAPANESE_PHRASES } from '../data/initialData';

export const TranslateTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'dining' | 'payment' | 'navigation' | 'polite'>('all');
  const [customInput, setCustomInput] = useState('');
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPhrases =
    selectedCategory === 'all'
      ? JAPANESE_PHRASES
      : JAPANESE_PHRASES.filter((p) => p.category === selectedCategory);

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleQuickTranslate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    // Helpful Kyoto traveler dictionary lookup
    const query = customInput.trim().toLowerCase();
    let result = 'すみません、英語を話せますか？ (Sumimasen, eigo o hanasemasu ka? - Excuse me, do you speak English?)';

    if (query.includes('water') || query.includes('drink')) {
      result = 'お水をください (O-mizu o kudasai - Water please)';
    } else if (query.includes('toilet') || query.includes('bathroom') || query.includes('restroom')) {
      result = 'トイレはどこですか？ (Toire wa doko desu ka? - Where is the restroom?)';
    } else if (query.includes('receipt') || query.includes('bill')) {
      result = '領収書／レシートをください (Ryōshūsho o kudasai - Receipt please)';
    } else if (query.includes('vegetarian') || query.includes('vegan') || query.includes('meat')) {
      result = '肉や魚を食べられません (Niku ya sakana o taberaremasen - I cannot eat meat or fish)';
    } else if (query.includes('station') || query.includes('train')) {
      result = '京都駅はどこですか？ (Kyōto-eki wa doko desu ka? - Where is Kyoto Station?)';
    } else if (query.includes('bag') || query.includes('luggage')) {
      result = '荷物を預かってもらえますか？ (Nimotsu o azukatte moraemasu ka? - Can you store my luggage?)';
    } else {
      result = `「${customInput}」をお願いします (${customInput} o onegai shimasu - ${customInput}, please)`;
    }

    setTranslatedText(result);
  };

  return (
    <div className="flex flex-col gap-4 pb-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e6ec]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#006161] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">translate</span>
          </div>
          <div>
            <h2 className="font-heading text-[18px] font-bold text-[#0a1a3a]">
              Kyoto Travel Phrasebook
            </h2>
            <p className="text-[12px] text-[#68778d]">
              Essential phrases for dining, payments, and respectful temple visits
            </p>
          </div>
        </div>

        {/* Quick translator bar */}
        <form onSubmit={handleQuickTranslate} className="mt-4 flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Type e.g. 'water', 'bathroom', 'vegetarian'..."
            className="flex-1 bg-[#f1f3ff] px-3 py-2 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-[#006161]/40 border border-[#e2e6ec]"
          />
          <button
            type="submit"
            className="px-3.5 py-2 bg-[#006161] text-white font-bold text-[12px] rounded-xl hover:bg-[#0f7c7c] shrink-0"
          >
            Translate
          </button>
        </form>

        {translatedText && (
          <div className="mt-3 p-3 bg-[#006161]/10 rounded-xl border border-[#006161]/20 flex items-center justify-between">
            <div className="text-[13px] font-bold text-[#006161]">{translatedText}</div>
            <button
              type="button"
              onClick={() => handleSpeak(translatedText.split('(')[0])}
              className="p-1.5 rounded-full bg-white text-[#006161] hover:bg-[#f1f3ff]"
            >
              <span className="material-symbols-outlined text-[18px]">volume_up</span>
            </button>
          </div>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'All Phrases' },
          { id: 'dining', label: 'Dining & Cafes' },
          { id: 'payment', label: 'Cash & Bills' },
          { id: 'navigation', label: 'Directions' },
          { id: 'polite', label: 'Politeness' }
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-bold shrink-0 transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#006161] text-white shadow-xs'
                : 'bg-white text-[#68778d] border border-[#e2e6ec] hover:bg-[#f1f3ff]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Phrases list */}
      <div className="space-y-2.5">
        {filteredPhrases.map((phrase) => (
          <div
            key={phrase.id}
            className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#e2e6ec] hover:border-[#006161]/30 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#68778d]">
                  {phrase.english}
                </span>
                <div className="text-[16px] font-bold text-[#0a1a3a] mt-0.5">
                  {phrase.japanese}
                </div>
                <div className="text-[12px] text-[#006161] font-medium mt-0.5">
                  {phrase.romaji}
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  aria-label="Listen audio"
                  onClick={() => handleSpeak(phrase.japanese)}
                  className="w-8 h-8 rounded-full bg-[#f1f3ff] text-[#006161] flex items-center justify-center hover:bg-[#e9edff] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">volume_up</span>
                </button>
                <button
                  type="button"
                  aria-label="Copy phrase"
                  onClick={() => handleCopy(phrase.japanese, phrase.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    copiedId === phrase.id
                      ? 'bg-[#059669] text-white'
                      : 'bg-[#f1f3ff] text-[#68778d] hover:bg-[#e9edff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedId === phrase.id ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
