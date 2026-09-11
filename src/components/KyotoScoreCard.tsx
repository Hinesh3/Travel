import React from 'react';
import { KyotoMetrics } from '../types';

interface KyotoScoreCardProps {
  metrics: KyotoMetrics;
  onOpenScoreDetails?: () => void;
}

export const KyotoScoreCard: React.FC<KyotoScoreCardProps> = ({ metrics, onOpenScoreDetails }) => {
  return (
    <div className="mb-4">
      <div className="bg-[#f1f3ff] rounded-2xl p-4 shadow-sm border border-[#e2e6ec]/60">
        <div className="flex items-center justify-between mb-3 pb-1 border-b border-[#e2e6ec]/40">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#0f7c7c] text-white flex items-center justify-center font-heading text-[17px] font-bold shadow-sm shrink-0">
              {metrics.overallScore.toFixed(1)}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <div className="flex text-[#fd6a49]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-[12px] font-bold text-[#0a1a3a] ml-1">
                  Overall Kyoto Score
                </span>
              </div>
              <p className="text-[11px] text-[#68778d] mt-0.5">
                Based on {metrics.checkInCount.toLocaleString()} verified live check-ins
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full text-[#059669] text-[11px] font-bold shadow-xs border border-[#059669]/15">
            <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
            Live Feed
          </div>
        </div>

        {/* 3 Metrics Cards */}
        <div className="grid grid-cols-3 gap-2">
          <div
            onClick={onOpenScoreDetails}
            className="bg-white rounded-xl p-2.5 flex flex-col items-center justify-center text-center shadow-xs border border-[#e2e6ec]/50 hover:border-[#006161]/30 transition-all cursor-pointer"
          >
            <span className="font-heading text-[18px] font-bold text-[#006161]">
              {metrics.safetyScore}%
            </span>
            <span className="text-[11px] font-semibold text-[#68778d] leading-tight mt-0.5">
              Safety Score
            </span>
          </div>

          <div
            onClick={onOpenScoreDetails}
            className="bg-white rounded-xl p-2.5 flex flex-col items-center justify-center text-center shadow-xs border border-[#e2e6ec]/50 hover:border-[#006161]/30 transition-all cursor-pointer"
          >
            <span className="font-heading text-[18px] font-bold text-[#006161]">
              {metrics.englishFriendlyScore}%
            </span>
            <span className="text-[11px] font-semibold text-[#68778d] leading-tight mt-0.5">
              English Friendly
            </span>
          </div>

          <div
            onClick={onOpenScoreDetails}
            className="bg-white rounded-xl p-2.5 flex flex-col items-center justify-center text-center shadow-xs border border-[#e2e6ec]/50 hover:border-[#006161]/30 transition-all cursor-pointer"
          >
            <span className="font-heading text-[18px] font-bold text-[#006161]">
              {metrics.soloDiningEase || metrics.soloDiningScore}%
            </span>
            <span className="text-[11px] font-semibold text-[#68778d] leading-tight mt-0.5">
              Solo Dining Ease
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
