import React, { useState } from 'react';

interface ItineraryDay {
  day: number;
  title: string;
  theme: string;
  stops: {
    time: string;
    place: string;
    tip: string;
    done: boolean;
  }[];
}

const INITIAL_ITINERARY: ItineraryDay[] = [
  {
    day: 1,
    title: 'Historic Eastern Kyoto',
    theme: 'Temples, Teahouses & Gion Night Walk',
    stops: [
      {
        time: '07:30 AM',
        place: 'Kiyomizu-dera Temple',
        tip: 'Arrive early to stand on the wooden terrace with unobstructed morning forest views.',
        done: true
      },
      {
        time: '11:00 AM',
        place: 'Sannenzaka & Ninenzaka',
        tip: 'Stroll traditional stone paved lanes; stop for matcha soft serve.',
        done: true
      },
      {
        time: '01:30 PM',
        place: 'Gion Karyo Kaiseki',
        tip: 'Pre-booked seasonal multi-course lunch; counter seating for solo travelers.',
        done: true
      },
      {
        time: '06:00 PM',
        place: 'Pontocho Alley & Gion Canal',
        tip: 'Look for subtle red paper lanterns; respect private geisha alleys.',
        done: false
      }
    ]
  },
  {
    day: 2,
    title: 'Torii Gates & Southern Kyoto',
    theme: 'Spiritual Mountain Hike & Sake Heritage',
    stops: [
      {
        time: '06:45 AM',
        place: 'Fushimi Inari Taisha photowalk',
        tip: 'Marcus Vance insight: Hike past the crowds to Yotsutsuji intersection!',
        done: false
      },
      {
        time: '12:00 PM',
        place: 'Fushimi Sake District',
        tip: 'Taste pure spring water brews along the willow-lined canal.',
        done: false
      },
      {
        time: '05:30 PM',
        place: 'Chao Chao Gyoza Sanjo',
        tip: 'Sophie Laurent tip: Half-and-half pork & ginger gyoza with cold draft beer.',
        done: false
      }
    ]
  },
  {
    day: 3,
    title: 'Arashiyama & Northern Golden Pavilion',
    theme: 'Bamboo Groves & Zen Gardens',
    stops: [
      {
        time: '08:00 AM',
        place: 'Arashiyama Bamboo Grove Walk',
        tip: 'Walk through before rickshaws and tour groups arrive at 9:30 AM.',
        done: false
      },
      {
        time: '11:30 AM',
        place: 'Tenryu-ji Temple Pond Garden',
        tip: 'World Heritage garden reflecting the surrounding mountains.',
        done: false
      },
      {
        time: '02:30 PM',
        place: 'Kinkaku-ji (Golden Pavilion)',
        tip: 'Golden leaves shimmer brightest under afternoon sunlight.',
        done: false
      },
      {
        time: '07:00 PM',
        place: 'Nishiki Market Backstreet Izakaya',
        tip: 'Aiko & David tip: Bring cash, find red lantern 2 doors down from knife shop.',
        done: false
      }
    ]
  }
];

export const ItineraryTab: React.FC = () => {
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(INITIAL_ITINERARY);
  const [activeDay, setActiveDay] = useState<number>(1);

  const toggleStop = (dayNum: number, stopIdx: number) => {
    setItinerary((prev) =>
      prev.map((d) => {
        if (d.day !== dayNum) return d;
        const newStops = [...d.stops];
        newStops[stopIdx] = { ...newStops[stopIdx], done: !newStops[stopIdx].done };
        return { ...d, stops: newStops };
      })
    );
  };

  const currentDay = itinerary.find((d) => d.day === activeDay) || itinerary[0];

  return (
    <div className="flex flex-col gap-4 pb-8 animate-in fade-in duration-200">
      {/* Header card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e6ec]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-[18px] font-bold text-[#0a1a3a]">
              Kyoto Explorer Itinerary
            </h2>
            <p className="text-[12px] text-[#68778d]">
              Curated 3-day route optimized with community check-in insights
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#006161]/10 text-[#006161] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">calendar_today</span>
          </div>
        </div>

        {/* Day Selector Pills */}
        <div className="flex gap-2 mt-4">
          {itinerary.map((d) => (
            <button
              key={d.day}
              type="button"
              onClick={() => setActiveDay(d.day)}
              className={`flex-1 py-2 rounded-xl text-[13px] font-bold transition-all ${
                activeDay === d.day
                  ? 'bg-[#006161] text-white shadow-xs'
                  : 'bg-[#f1f3ff] text-[#68778d] hover:bg-[#e9edff]'
              }`}
            >
              Day {d.day}
            </button>
          ))}
        </div>
      </div>

      {/* Day Overview */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e6ec]">
        <div className="mb-3">
          <span className="text-[11px] uppercase tracking-wider font-bold text-[#006161]">
            Day {currentDay.day} Focus
          </span>
          <h3 className="font-heading text-[16px] font-bold text-[#0a1a3a]">
            {currentDay.title}
          </h3>
          <p className="text-[12px] text-[#68778d]">{currentDay.theme}</p>
        </div>

        {/* Timeline stops */}
        <div className="space-y-3 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#e2e6ec]">
          {currentDay.stops.map((stop, idx) => (
            <div key={stop.place} className="relative flex items-start gap-3 pl-1">
              <button
                type="button"
                onClick={() => toggleStop(currentDay.day, idx)}
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all z-10 shrink-0 mt-0.5 ${
                  stop.done
                    ? 'bg-[#059669] text-white'
                    : 'bg-white border-2 border-[#bdc9c8] text-transparent hover:border-[#006161]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">check</span>
              </button>

              <div
                className={`flex-1 p-3 rounded-xl border transition-all ${
                  stop.done
                    ? 'bg-[#f1f3ff]/60 border-[#e2e6ec] opacity-75'
                    : 'bg-[#faf8ff] border-[#e2e6ec]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-[#006161]">{stop.time}</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded text-[#68778d] border border-[#e2e6ec]">
                    {stop.done ? 'Completed' : 'Planned'}
                  </span>
                </div>
                <h4
                  className={`text-[14px] font-bold text-[#0a1a3a] ${
                    stop.done ? 'line-through text-[#68778d]' : ''
                  }`}
                >
                  {stop.place}
                </h4>
                <p className="text-[12px] text-[#3e4948] mt-1 leading-snug">{stop.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
