import React from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  caption?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  caption
}) => {
  if (!isOpen || !imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
          <img
            src={imageUrl}
            alt={caption || 'Enlarged review photo'}
            className="w-full max-h-[75vh] object-contain mx-auto"
            referrerPolicy="no-referrer"
          />
        </div>

        {caption && (
          <div className="mt-3 text-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white text-[13px] font-medium max-w-sm">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
};
