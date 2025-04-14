
import React from 'react'
import { Loader } from 'lucide-react'

interface LoadingScreenProps {
  message?: string
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
      <Loader className="w-10 h-10 text-amber-500 animate-spin" />
      <p className="text-amber-300 text-xl font-medium mt-4">{message}</p>
      
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(0.8); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 1; }
          }
        `}
      </style>
    </div>
  )
}

export default LoadingScreen
