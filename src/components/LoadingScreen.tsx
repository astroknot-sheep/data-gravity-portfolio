
import React from 'react'

interface LoadingScreenProps {
  message?: string
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center z-50">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-r-amber-300/60 rounded-full animate-[spin_2s_linear_infinite]"></div>
      </div>
      <p className="text-amber-300 text-xl font-medium mt-6 font-intro">{message}</p>
      <div className="mt-4 flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div 
            key={i} 
            className="w-3 h-3 rounded-full bg-amber-400/70"
            style={{ animation: `pulse 1.5s infinite ${i * 0.2}s` }}
          ></div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default LoadingScreen
