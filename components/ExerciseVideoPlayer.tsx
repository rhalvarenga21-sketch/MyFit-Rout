import React from 'react';
import { Play, ExternalLink, VideoOff } from 'lucide-react';

interface ExerciseVideoPlayerProps {
    videoUrl?: string; // Can be a direct URL or YouTube ID
    exerciseName: string;
}

export const ExerciseVideoPlayer: React.FC<ExerciseVideoPlayerProps> = ({ videoUrl, exerciseName }) => {
    // If no visual, show "Coming Soon" placeholder instead of search link
    if (!videoUrl) {
        return (
            <div className="w-full aspect-video bg-slate-900 rounded-2xl flex flex-col items-center justify-center border border-slate-700 p-6 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
                <div className="bg-slate-800 p-4 rounded-full mb-3 shadow-lg group-hover:scale-110 transition-transform">
                    <VideoOff className="text-slate-500" size={24} />
                </div>
                <h3 className="text-sm font-black text-slate-300 uppercase tracking-wide mb-1">Demonstração em Breve</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Atualizando Biblioteca</p>
                <div className="mt-4 flex gap-1">
                    <span className="w-1 h-1 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-1 h-1 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1 h-1 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
            </div>
        );
    }

    // Helper to extract YouTube ID
    const getYoutubeId = (url: string) => {
        // Direct ID (11 chars)
        if (url.length === 11 && !url.includes('/') && !url.includes('.')) return url;

        // Formats: 
        // youtube.com/shorts/ID
        // youtube.com/watch?v=ID
        // youtu.be/ID
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const youtubeId = getYoutubeId(videoUrl);

    if (youtubeId) {
        return (
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden relative shadow-xl border border-slate-700">
                <iframe
                    width="100%"
                    height="100%"
                    // Autoplay enabled, Muted (required for autoplay), Controls hidden for cleaner look
                    src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&showinfo=0`}
                    title={exerciseName}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full pointer-events-none" // pointer-events-none prevents clicking to YouTube
                ></iframe>
            </div>
        );
    }

    return (
        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden relative group border border-slate-700">
            <video
                src={videoUrl}
                poster={`https://source.unsplash.com/800x450/?gym,workout`}
                className="w-full h-full object-cover"
                autoPlay
                controls={false} // Hide native controls for cleaner look
                playsInline
                loop
                muted
            >
                Seu navegador não suporta a tag de vídeo.
            </video>
        </div>
    );
};
