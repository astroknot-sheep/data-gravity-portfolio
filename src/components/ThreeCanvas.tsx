
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  className?: string;
}

const ThreeCanvas = ({ className }: ThreeCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera with optimized FOV
    const camera = new THREE.PerspectiveCamera(
      65, // Reduced FOV for better performance
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Create renderer with optimized settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: window.devicePixelRatio < 2, // Only use antialiasing on lower DPI screens
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);
    
    // Create simplified geometry
    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 48, 8);
    
    // Create materials with amber tones
    const primaryMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xd4a257,
      wireframe: true
    });
    
    const secondaryMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x8c6931,
      wireframe: true
    });
    
    const accentMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffd28a,
      wireframe: true
    });
    
    // Create meshes
    const primaryTorus = new THREE.Mesh(geometry, primaryMaterial);
    scene.add(primaryTorus);
    
    const secondaryTorus = new THREE.Mesh(geometry, secondaryMaterial);
    secondaryTorus.scale.set(1.1, 1.1, 1.1);
    secondaryTorus.rotation.set(0, Math.PI / 4, 0);
    scene.add(secondaryTorus);
    
    const accentTorus = new THREE.Mesh(geometry, accentMaterial);
    accentTorus.scale.set(1.2, 1.2, 1.2);
    accentTorus.rotation.set(0, Math.PI / 2, 0);
    scene.add(accentTorus);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Improve mouse movement performance
    let lastMouseMoveTime = 0;
    const throttleMs = 80; // Further reduce update frequency
    
    const handleMouseMove = (event: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastMouseMoveTime < throttleMs) return;
      lastMouseMoveTime = currentTime;
      
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Even smoother rotation with reduced multipliers
      primaryTorus.rotation.x += y * 0.005;
      primaryTorus.rotation.y += x * 0.005;
      
      secondaryTorus.rotation.x += y * 0.004;
      secondaryTorus.rotation.y += x * 0.004;
      
      accentTorus.rotation.x += y * 0.003;
      accentTorus.rotation.y += x * 0.003;
    };
    
    // Use passive event listener for touch events
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // More efficient resize handler
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      
      resizeTimeout = window.setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 150); // Longer debounce for resize
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Optimize animation loop
    let frameId: number;
    let lastFrameTime = 0;
    const targetFPS = 30; // Cap to 30 FPS for performance
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      frameId = requestAnimationFrame(animate);
      
      // Skip frames to maintain target FPS
      if (currentTime - lastFrameTime < frameInterval) return;
      lastFrameTime = currentTime;
      
      // Ultra-slow rotation for smoother animation
      primaryTorus.rotation.x += 0.001;
      primaryTorus.rotation.y += 0.001;
      
      secondaryTorus.rotation.x += 0.0005;
      secondaryTorus.rotation.y += 0.0005;
      
      accentTorus.rotation.x += 0.00025;
      accentTorus.rotation.y += 0.00025;
      
      renderer.render(scene, camera);
    };
    
    frameId = requestAnimationFrame(animate);
    
    // Comprehensive cleanup
    return () => {
      if (canvasRef.current) {
        if (canvasRef.current.contains(renderer.domElement)) {
          canvasRef.current.removeChild(renderer.domElement);
        }
      }
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      
      // Dispose all THREE.js resources
      geometry.dispose();
      primaryMaterial.dispose();
      secondaryMaterial.dispose();
      accentMaterial.dispose();
      renderer.dispose();
      
      // Clear references
      scene.clear();
    };
  }, []);

  return (
    <div 
      ref={canvasRef} 
      className={`absolute inset-0 -z-5 opacity-40 ${className || ''}`}
      aria-hidden="true"
    />
  );
};

export default ThreeCanvas;
