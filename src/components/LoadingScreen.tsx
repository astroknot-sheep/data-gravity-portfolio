
import React from 'react'
import { Loader } from 'lucide-react'

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-orange-900 flex flex-col items-center justify-center z-50">
      <Loader className="w-10 h-10 text-orange-500 animate-spin" aria-hidden="true" />
      <p className="text-orange-300 text-base font-medium mt-4" aria-live="polite">{message}</p>
    </div>
  )
}

export default LoadingScreen
