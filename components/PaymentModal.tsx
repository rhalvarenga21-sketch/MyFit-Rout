import React, { useState } from 'react';
import { CreditCard, Lock, CheckCircle, X } from 'lucide-react';

interface PaymentModalProps {
    planName: string;
    price: string;
    onClose: () => void;
    onSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ planName, price, onClose, onSuccess }) => {
    const [processing, setProcessing] = useState(false);
    const [step, setStep] = useState(1); // 1: Form, 2: Success

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        // Simulate Stripe processing time
        setTimeout(() => {
            setProcessing(false);
            setStep(2);
        }, 2000);
    };

    if (step === 2) {
        return (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
                <div className="bg-slate-800 p-8 rounded-[40px] border border-green-500/50 text-center max-w-sm w-full shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 animate-bounce">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-2 text-white">Pagamento Confirmado!</h2>
                    <p className="text-white/60 text-sm mb-6">Bem-vindo ao MyFitRout PRO. Seu plano {planName} está ativo.</p>
                    <button onClick={onSuccess} className="w-full bg-green-600 hover:bg-green-500 text-white font-black uppercase p-4 rounded-2xl transition-all">
                        Começar Agora
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-6 animate-in fade-in duration-200">
            <div className="bg-slate-900 w-full max-w-md rounded-t-[40px] sm:rounded-[40px] border-t sm:border border-slate-700/50 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 bg-slate-800 border-b border-slate-700/50 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400">
                            <CreditCard size={20} />
                        </div>
                        <div>
                            <h3 className="font-black italic uppercase text-lg text-white">Checkout Seguro</h3>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-1"><Lock size={10} /> Criptografia 256-bit</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full text-slate-400 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Amount */}
                <div className="p-8 text-center bg-indigo-600/10 border-b border-indigo-500/10">
                    <p className="text-xs uppercase font-black text-indigo-300 tracking-widest mb-1">Total a Pagar</p>
                    <h1 className="text-4xl font-black italic text-white tracking-tighter">{price}</h1>
                    <p className="text-[10px] opacity-60 mt-2 uppercase">Plano {planName}</p>
                </div>

                {/* Form */}
                <form onSubmit={handlePay} className="p-6 space-y-4 overflow-y-auto">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Nome no Cartão</label>
                        <input required className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-white outline-none focus:border-indigo-500 transition-all font-bold placeholder:font-normal" placeholder="Seu Nome Completo" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Número do Cartão</label>
                        <div className="relative">
                            <input required className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-white outline-none focus:border-indigo-500 transition-all font-mono" placeholder="0000 0000 0000 0000" />
                            <div className="absolute right-4 top-4 flex gap-2 opacity-50">
                                <div className="w-8 h-5 bg-slate-600 rounded"></div>
                                <div className="w-8 h-5 bg-slate-600 rounded-l-md border-r-2 border-slate-900"></div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Validade</label>
                            <input required className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-white outline-none focus:border-indigo-500 transition-all font-mono text-center" placeholder="MM/AA" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">CVV</label>
                            <input required type="password" maxLength={3} className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-white outline-none focus:border-indigo-500 transition-all font-mono text-center" placeholder="123" />
                        </div>
                    </div>

                    <button disabled={processing} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed p-5 rounded-2xl font-black uppercase text-white shadow-xl flex items-center justify-center gap-2 mt-4 transition-all active:scale-95">
                        {processing ? (
                            <>Processing...</>
                        ) : (
                            <>Pagar {price}</>
                        )}
                    </button>
                    <p className="text-center text-[9px] text-slate-500 uppercase mt-4">Powered by Stripe (Test Mode)</p>
                </form>
            </div>
        </div>
    );
};
