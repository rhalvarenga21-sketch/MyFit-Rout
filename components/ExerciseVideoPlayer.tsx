import React from 'react';
import { Play, ExternalLink, VideoOff } from 'lucide-react';

interface ExerciseVideoPlayerProps {
    videoUrl?: string; // Can be a direct URL or YouTube ID
    exerciseName: string;
}

export const ExerciseVideoPlayer: React.FC<ExerciseVideoPlayerProps> = ({ videoUrl, exerciseName }) => {
    // If no visual, show search link
    if (!videoUrl) {
        const searchUrl = `https://www.youtube.com/results?search_query=how+to+do+${exerciseName.replace(/ /g, '+')}+exercise`;

        return (
            <div className="w-full aspect-video bg-slate-900 rounded-2xl flex flex-col items-center justify-center border border-slate-700 p-6 text-center">
                <VideoOff className="text-slate-500 mb-2" size={32} />
                <p className="text-sm text-slate-400 mb-3">Vídeo não disponível</p>
                <a
                    href={searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-wider hover:text-indigo-300"
                >
                    <ExternalLink size={14} /> Buscar no YouTube
                </a>
            </div>
        );
    }

    // Simple HTML5 video or Embed handling could go here
    // For now, we'll assume it's a placeholder image or direct MP4 link
    // In a real app, you'd use a robust player like 'react-player'

    return (
        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden relative group">
            <video
                src={videoUrl}
                poster={`https://source.unsplash.com/800x450/?gym,${exerciseName}`}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                controls
                playsInline
                loop
                muted
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center pl-1 shadow-xl group-hover:scale-110 transition-transform">
                    <Play fill="white" size={20} className="text-white" />
                </div>
            </div>
        </div>
    );
};
