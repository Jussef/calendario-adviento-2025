import React, { useState, useEffect } from 'react';
import { Gift, Sparkles } from 'lucide-react';

const CalendarioAdviento = () => {
  const [openedDays, setOpenedDays] = useState({});
  const [animatingDay, setAnimatingDay] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('calendario-adviento');
    if (saved) {
      setOpenedDays(JSON.parse(saved));
    }
  }, []);

  const regalos = {
    1: "🎁 ¡Te ganaste algo del Oxxo!",
    2: "💖 Frase de hoy: Eres la mujer más inteligente y hermosa que conozco",
    3: "🥤 ¡Te ganaste un yogurt!",
    4: "🛍️ ¡Vale por algo del tianguis!",
    5: "✨ Frase de hoy: Tu éxito profesional me enamora tanto como tu sonrisa",
    6: "🍫 ¡Te ganaste un chocolate!",
    7: "🎪 ¡Vale por unos tacos!",
    8: "💖 Frase de hoy: Cada día me siento más orgulloso de la mujer extraordinaria que eres",
    9: "🧃 ¡Te ganaste una bebida fría de Starbucks!",
    10: "🎨 ¡Vale por algo creativo del tianguis!",
    11: "🌟 Frase de hoy: Admiro tu fuerza, tu inteligencia y tu corazón dorado",
    12: "🍪 ¡Te ganaste unas galletas!",
    13: "🎁 ¡Sorpresa del Oxxo a tu elección!",
    14: "💝 Frase de hoy: Eres mi inspiración diaria, mi compañera perfecta",
    15: "🥗 ¡Te ganaste algo saludable!",
    16: "🧸 ¡Vale por un antojo del tianguis!",
    17: "🌈 Frase de hoy: Tu pasión por tu trabajo es una de las cosas que más amo de ti",
    18: "☕ ¡Te ganaste un café o té de Starbucks!",
    19: "🎪 ¡Vale por unas quesadillas de los parientes!",
    20: "⭐ Frase de hoy: Eres brillante en todo lo que haces, mi amor",
    21: "🍕 ¡Te ganaste una pizza dominos!",
    22: "🎁 ¡Doble premio del Oxxo!",
    23: "💎 Frase de hoy: Eres mi tesoro más preciado, mi mujer excepcional",
    24: "🎄 ¡GRAN PREMIO! Vale por lo que tú quieras",
    25: "🎅 ¡FELIZ NAVIDAD! Día especial con sorpresa"
  };

  const handleDayClick = (day) => {
    if (openedDays[day]) return;
    
    setAnimatingDay(day);
    setTimeout(() => {
      const newOpened = { ...openedDays, [day]: true };
      setOpenedDays(newOpened);
      localStorage.setItem('calendario-adviento', JSON.stringify(newOpened));
      setAnimatingDay(null);
    }, 600);
  };

  const resetCalendar = () => {
    setOpenedDays({});
    localStorage.removeItem('calendario-adviento');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-green-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Sparkles className="text-yellow-300" />
            Calendario de Adviento
            <Sparkles className="text-yellow-300" />
          </h1>
          <p className="text-white text-lg">¡Abre una casilla cada día para descubrir tu sorpresa!</p>
          <button 
            onClick={resetCalendar}
            className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm transition"
          >
            Reiniciar calendario
          </button>
        </div>

        <div className="grid grid-cols-5 gap-3 md:gap-4">
          {[...Array(25)].map((_, i) => {
            const day = i + 1;
            const isOpened = openedDays[day];
            const isAnimating = animatingDay === day;

            return (
              <div
                key={day}
                className="aspect-square relative"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div
                  onClick={() => handleDayClick(day)}
                  className={`
                    w-full h-full relative cursor-pointer
                    ${isOpened ? '' : 'hover:scale-105'}
                    transition-transform duration-200
                  `}
                >
                  {/* Fondo revelado */}
                  <div className={`
                    absolute inset-0 rounded-lg overflow-hidden
                    bg-gradient-to-br from-yellow-200 to-orange-300
                    flex items-center justify-center p-2
                    ${isOpened ? 'opacity-100' : 'opacity-0'}
                  `}>
                    <p className="text-center text-xs md:text-sm font-bold text-red-900 leading-tight">
                      {regalos[day]}
                    </p>
                  </div>

                  {/* Papel que se rasga */}
                  <div className={`
                    absolute inset-0 rounded-lg overflow-hidden
                    bg-gradient-to-br from-red-600 to-green-700
                    border-4 border-yellow-400
                    shadow-lg
                    flex flex-col items-center justify-center
                    transition-all duration-600
                    ${isAnimating ? 'animate-tear' : ''}
                    ${isOpened ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
                  `}>
                    <Gift className="text-white w-6 h-6 md:w-8 md:h-8 mb-1" />
                    <span className="text-2xl md:text-4xl font-bold text-white">
                      {day}
                    </span>
                    {day === 24 && (
                      <span className="text-xs text-yellow-300 font-bold mt-1">
                        ¡ESPECIAL!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes tear {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.1) rotate(5deg);
          }
          100% {
            transform: scale(0) rotate(15deg);
            opacity: 0;
          }
        }

        .animate-tear {
          animation: tear 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CalendarioAdviento;