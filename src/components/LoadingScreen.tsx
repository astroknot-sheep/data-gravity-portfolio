
import React from 'react'

interface LoadingScreenProps {
  message?: string
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-foreground text-xl font-medium">{message}</p>
    </div>
  )
}

export default LoadingScreen
