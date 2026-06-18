import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, Plus, Trash2, Heart, RotateCcw } from 'lucide-react';
import { PHO_GALLERY_DATA } from '../data/birthdayData';
import { PhotoItem } from '../types';

function getPhotoSticker(id: string) {
  if (id.startsWith('custom_')) {
    return { text: '💝 Custom Memory', bg: 'bg-rose-100/90 text-rose-800 border-rose-200/60 rotate-2' };
  }
  switch(id) {
    case '1': return { text: '☕ Cafe Date', bg: 'bg-[#faf3eb]/95 text-[#735135] border-[#dfcfbd] -rotate-6' };
    case '2': return { text: '✨ Sparkles', bg: 'bg-violet-100/95 text-violet-800 border-violet-200/60 rotate-2' };
    case '3': return { text: '🌷 Flower Nursery', bg: 'bg-emerald-100/95 text-emerald-800 border-emerald-200/60 -rotate-3' };
    case '4': return { text: '🌅 Sunset Coast', bg: 'bg-orange-100/95 text-orange-900 border-orange-250/60 rotate-6' };
    case '5': return { text: '📚 Cozy Desk', bg: 'bg-blue-100/95 text-blue-800 border-blue-200/60 -rotate-2' };
    case '6': return { text: '⭐ Starry Night', bg: 'bg-amber-100/95 text-amber-900 border-amber-205/60 rotate-3' };
    default: return { text: '💖 Together', bg: 'bg-pink-100/95 text-pink-850 border-pink-200/60 -rotate-3' };
  }
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isAddingPhoto, setIsAddingPhoto] = useState<boolean>(false);

  // Form states for creating a custom polaroid snapshot
  const [newUrl, setNewUrl] = useState<string>('');
  const [newCaption, setNewCaption] = useState<string>('');
  const [newLocation, setNewLocation] = useState<string>('');
  const newCategory = 'memories';
  const [newDate, setNewDate] = useState<string>('');

  useEffect(() => {
    // Load photos from localStorage or fall back to default preloaded unsplash photos
    const cached = localStorage.getItem('krupa_bday_photos');
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as PhotoItem[];
        // Migrate legacy remote URLs for default slots to local paths
        const migrated = parsed.map(p => {
          const matched = PHO_GALLERY_DATA.find(origin => origin.id === p.id);
          if (matched) {
            return { ...p, url: matched.url };
          }
          return p;
        });
        setPhotos(migrated);
      } catch (err) {
        setPhotos(PHO_GALLERY_DATA);
      }
    } else {
      setPhotos(PHO_GALLERY_DATA);
    }
  }, []);

  const savePhotos = (updated: PhotoItem[]) => {
    setPhotos(updated);
    localStorage.setItem('krupa_bday_photos', JSON.stringify(updated));
  };

  const handleResetPhotos = () => {
    localStorage.removeItem('krupa_bday_photos');
    setPhotos(PHO_GALLERY_DATA);
  };

  const handleCreatePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaption) return;

    // Default stock photos if URL is blank
    const placeholderUrls = [
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80', // flowers
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80', // celebration
      'https://images.unsplash.com/photo-1545601445-4d6a1a457473?w=800&auto=format&fit=crop&q=80'  // coffee cozy
    ];
    const finalUrl = newUrl.trim() || placeholderUrls[Math.floor(Math.random() * placeholderUrls.length)];

    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const newItem: PhotoItem = {
      id: `custom_${Date.now()}`,
      url: finalUrl,
      caption: newCaption,
      date: dateStr,
      category: newCategory
    };

    const updated = [newItem, ...photos];
    savePhotos(updated);
    
    // Reset Form
    setNewUrl('');
    setNewCaption('');
    setNewLocation('');
    setNewDate('');
    setIsAddingPhoto(false);
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent modal trigger
    const updated = photos.filter(p => p.id !== id);
    savePhotos(updated);
    if (selectedPhoto && selectedPhoto.id === id) {
      setSelectedPhoto(null);
    }
  };

  const filteredPhotos = photos;

  return (
    <section id="photo-gallery-section" className="py-6 px-4 sm:px-6 bg-transparent">
      <div className="mx-auto max-w-6xl">

        {/* Interactive Add Polaroid Form */}
        <AnimatePresence>
          {isAddingPhoto && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-10 overflow-hidden"
            >
              <form onSubmit={handleCreatePhoto} className="p-6 bg-white/35 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl flex flex-col md:flex-row gap-6 max-w-4xl mx-auto text-rose-950">
                <div className="flex-1 space-y-4">
                  <h4 className="font-sans font-bold text-rose-900 text-base flex items-center gap-1">
                    <Camera className="h-4 w-4 text-rose-500" /> Create Custom Polaroid Snap
                  </h4>
                  <div>
                    <label className="block text-[11px] font-bold text-rose-900/60 uppercase tracking-wider mb-1">Photo Image Link (URL)</label>
                    <input
                      type="url"
                      placeholder="Paste image link, or leave blank for a surprise"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      className="w-full rounded-xl border border-white/40 bg-white/50 px-3.5 py-2 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-rose-900/60 uppercase tracking-wider mb-1">Memory Love Note</label>
                    <textarea
                      rows={2}
                      placeholder="Write a sweet sentence of what happened in this memory..."
                      value={newCaption}
                      onChange={(e) => setNewCaption(e.target.value)}
                      required
                      className="w-full rounded-xl border border-white/40 bg-white/50 px-3.5 py-2 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-bold py-2.5 shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Sparkles className="h-3.5 w-3.5" /> Pin Polaroid to Table
                  </button>
                </div>

                <div className="w-full md:w-64 border border-white/40 rounded-2xl bg-white/20 p-4 flex flex-col items-center justify-center text-center">
                  <div className="relative w-44 h-48 bg-white/60 p-3 shadow-md rotate-2 border border-white/50 rounded-xl flex flex-col">
                    <div className="flex-1 bg-white/40 rounded-lg overflow-hidden flex items-center justify-center">
                      {newUrl.trim() ? (
                        <img 
                          src={newUrl.trim()} 
                          alt="preview" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <Camera className="h-8 w-8 text-rose-400 animate-pulse" />
                      )}
                    </div>
                    <div className="h-8 pt-2 overflow-hidden">
                      <p className="font-sans text-[9px] text-rose-800 italic truncate text-center">
                        {newCaption.trim() || 'Your custom handwritten note...'}
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] text-rose-950/60 mt-3 max-w-xs">
                    Live interactive preview of your custom polaroid element. Feel free to use high resolutions unsplash links!
                  </p>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Clothesline Table */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-16 bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl shadow-sm">
            <Camera className="h-10 w-10 text-rose-400 mx-auto mb-3" />
            <p className="font-sans text-sm text-rose-950/70 font-medium">No polaroids pinned to this display yet.</p>
            <button 
              onClick={() => setIsAddingPhoto(true)} 
              className="mt-3 text-xs text-rose-600 font-semibold underline cursor-pointer"
            >
              Post one right now!
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          >
            <AnimatePresence>
              {filteredPhotos.map((photo, index) => {
                return (
                  <motion.div
                    key={photo.id}
                    layoutId={`polaroid_${photo.id}`}
                    initial={{ opacity: 0, y: 30, scale: 0.98, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1.03, rotate: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.05, 
                      rotate: index % 2 === 0 ? -1 : 1,
                      shadow: "0px 30px 60px rgba(115, 85, 95, 0.22)",
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ 
                      duration: 0.65, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: (index % 3) * 0.08 // smooth row stagger effect
                    }}
                    onClick={() => setSelectedPhoto(photo)}
                    className="bg-gradient-to-br from-white via-rose-50/50 to-[#fdfbf6] p-5 pb-8 shadow-[0px_20px_45px_rgba(115,85,95,0.12)] border border-rose-100/60 rounded-2xl cursor-pointer group max-w-[290px] w-full flex flex-col relative overflow-visible transition-shadow duration-300"
                  >
                    {/* Clear/Delete snapshot indicator for custom elements - always legible */}
                    {photo.id.startsWith('custom_') && (
                      <button
                        onClick={(e) => handleDeletePhoto(photo.id, e)}
                        className="absolute top-3 right-3 z-30 bg-rose-900/80 hover:bg-rose-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete custom snapshot"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
 
                    {/* Realistic Mini Wooden Clothespeg (clip) on Clothesline */}
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 w-3.5 h-10 bg-gradient-to-b from-[#eadecb] via-[#cfba9c] to-[#af987a] rounded-sm shadow-[0_3px_5px_rgba(0,0,0,0.22)] flex flex-col justify-between items-center py-1.5 border border-[#bfa482]/45 select-none">
                      {/* Metal spring detail */}
                      <div className="w-[18px] h-[3px] bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 rounded-sm absolute top-[13px] shadow-[0_0.5px_1px_rgba(0,0,0,0.15)]" />
                      {/* Wood grain split marks */}
                      <div className="w-[1px] h-3 bg-stone-700/15 absolute top-1" />
                      <div className="w-[1px] h-3 bg-stone-700/15 absolute bottom-1" />
                    </div>
 
                    {/* Photo Container with Elegant Artistic Frame */}
                    <div className="w-full h-52 bg-rose-50/50 rounded-xl overflow-hidden relative border border-rose-100/40 shadow-xs">
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover transition-all duration-500 scale-102 group-hover:scale-106 shadow-inner ${
                          ['2.jpg', '3.jpg', '6.jpg'].some(img => photo.url.includes(img)) ? 'object-top' : ''
                        }`}
                      />
                      
                      {/* Interactive light reflection sweep */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-transparent pointer-events-none overflow-hidden">
                        <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-25 transition-transform duration-1000 ease-out group-hover:translate-x-[400%]" />
                      </div>
 
                      {/* Photo corner mounting brackets */}
                      <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-rose-100/60 border-r border-b border-rose-200/50 rounded-br-[3px]" />
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-100/60 border-l border-b border-rose-200/50 rounded-bl-[3px]" />
                    </div>
 
                    {/* Polaroid Handwritten Text - Elegant, clean, minimalist centered */}
                    <div className="pt-5 pb-1 flex-1 flex flex-col justify-center items-center text-center bg-transparent">
                      <div className="w-full relative px-1">
                        <p className="font-satisfy text-[18px] text-rose-600 leading-relaxed font-semibold transition-colors duration-300 line-clamp-3 px-1 drop-shadow-[0_0.2px_0.2px_rgba(0,0,0,0.01)]">
                          &ldquo;{photo.caption}&rdquo;
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      {/* Enlarged Polaroid Card Focal Modal */}
      <AnimatePresence>
        {selectedPhoto && (() => {
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPhoto(null)}
                className="absolute inset-0 bg-[#1e1316]/55 backdrop-blur-md"
              />

              <motion.div
                layoutId={`polaroid_${selectedPhoto.id}`}
                className="relative bg-gradient-to-br from-white via-rose-50/50 to-[#fdfbf6] max-w-sm w-full p-6 pb-8 shadow-[0_25px_60px_rgba(40,20,30,0.3)] rounded-2xl border border-rose-100/60 z-10 flex flex-col justify-between"
              >
                {/* Majestic pushpin sticker on top of focal polaroid */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center select-none">
                  <div className="w-4 h-4 bg-gradient-to-br from-[#ffd043] via-[#eab308] to-[#9a3412] rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.35)] relative">
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/75 rounded-full" />
                  </div>
                  <div className="w-0.5 h-3 bg-zinc-400 shadow-[0.5px_1px_1px_rgba(0,0,0,0.2)] -mt-[1px]" />
                </div>

                {/* Big High-res image display with fine-art border frame */}
                <div className="w-full bg-[#111] rounded-xl overflow-hidden shadow-2xl border border-rose-100/40 relative mt-3">
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.caption}
                    referrerPolicy="no-referrer"
                    className={`w-full max-h-[340px] md:max-h-[380px] object-cover ${
                      ['2.jpg', '3.jpg', '6.jpg'].some(img => selectedPhoto.url.includes(img)) ? 'object-top' : ''
                    }`}
                  />
                </div>

                {/* Bottom text board inside focal polaroid */}
                <div className="pt-6 text-center px-2">
                  <p className="font-satisfy text-xl md:text-2xl text-rose-600 leading-relaxed drop-shadow-xs font-semibold">
                    &ldquo;{selectedPhoto.caption}&rdquo;
                  </p>

                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-sans font-bold text-xs py-2.5 px-8 transition-all duration-200 cursor-pointer shadow-md shadow-rose-500/20"
                    >
                      Close
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

    </section>
  );
}
