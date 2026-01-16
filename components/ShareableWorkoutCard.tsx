import React, { useRef } from 'react';
import { Trophy, Dumbbell, Calendar, Download } from 'lucide-react';
// import { toPng } from 'html-to-image'; // We would ideally use this library, but for now we will simulate the layout for them to screenshot

interface ShareableCardProps {
    username: string;
    workoutName: string;
    duration: number;
    weight: number;
    date: string;
}

export const ShareableWorkoutCard: React.FC<ShareableCardProps> = ({ username, workoutName, duration, weight, date }) => {
    return (
        <div className="flex flex-col items-center gap-4">
            {/* This is the capture area - designed to look like a premium social post */}
            <div
                id="share-card"
                className="w-[320px] h-[500px] bg-gradient-to-br from-indigo-900 to-black p-6 rounded-[30px] border-4 border-indigo-500/30 flex flex-col justify-between relative overflow-hidden shadow-2xl"
            >
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

                {/* Branding Header */}
                <div className="relative z-10 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-indigo-900 font-black text-xs">MF</span>
                        </div>
                        <span className="font-black italic text-white tracking-tighter">MyFitRout</span>
                    </div>
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{date}</span>
                </div>

                {/* Main Achievement */}
                <div className="relative z-10 text-center space-y-4 my-auto">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.4)]">
                        <Trophy size={48} className="text-white drop-shadow-md" />
                    </div>
                    <div>
                        <h3 className="text-white/60 text-xs font-black uppercase tracking-widest mb-1">TREINO CONCLUÍDO</h3>
                        <h1 className="text-white text-3xl font-black italic uppercase leading-none tracking-tight">{workoutName}</h1>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="relative z-10 grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
                        <p className="text-[9px] text-indigo-300 font-bold uppercase tracking-widest mb-1">Tempo</p>
                        <p className="text-xl font-black text-white">{duration} min</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
                        <p className="text-[9px] text-purple-300 font-bold uppercase tracking-widest mb-1">Volume Total</p>
                        <p className="text-xl font-black text-white">{weight} kg</p>
                    </div>
                </div>

                {/* Footer / Call to Action */}
                <div className="relative z-10 text-center">
                    <div className="inline-block bg-white text-indigo-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
                        {username} está evoluindo! 🚀
                    </div>
                    <p className="text-[9px] text-white/40">Baixe agora: my-fit-rout.app</p>
                </div>
            </div>

            <div className="text-center">
                <p className="text-xs text-slate-400 mb-2">Tire um print para compartilhar!</p>
                {/* In a real production app, we would enable this button to auto-download using html-to-image */}
                {/* <button className="flex items-center gap-2 bg-indigo-600 px-6 py-3 rounded-full font-bold text-xs uppercase hover:bg-indigo-500 transition-colors">
               <Download size={16} /> Salvar Imagem
           </button> */}
            </div>
        </div>
    );
};
