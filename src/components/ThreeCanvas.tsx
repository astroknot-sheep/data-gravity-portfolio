
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
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Create renderer with transparency and antialias
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);
    
    // Create geometry - use smaller segment counts for better performance
    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 64, 8);
    
    // Create materials with amber tones
    const primaryMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xd4a257, // amber color
      wireframe: true
    });
    
    const secondaryMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x8c6931, // amber dark
      wireframe: true
    });
    
    const accentMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffd28a, // amber light
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
    
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Throttle mouse movement for better performance
    let lastMouseMoveTime = 0;
    const throttleMs = 50; // Only update every 50ms (20fps for mouse interaction)
    
    const handleMouseMove = (event: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastMouseMoveTime < throttleMs) return;
      lastMouseMoveTime = currentTime;
      
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Reduced rotation speed for smoother movement
      primaryTorus.rotation.x += y * 0.01;
      primaryTorus.rotation.y += x * 0.01;
      
      secondaryTorus.rotation.x += y * 0.008;
      secondaryTorus.rotation.y += x * 0.008;
      
      accentTorus.rotation.x += y * 0.006;
      accentTorus.rotation.y += x * 0.006;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Debounced resize handler for performance
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      
      resizeTimeout = window.setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop with slower rotation for smoother animation
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Much slower rotation speeds for smoother animation
      primaryTorus.rotation.x += 0.002;
      primaryTorus.rotation.y += 0.002;
      
      secondaryTorus.rotation.x += 0.001;
      secondaryTorus.rotation.y += 0.001;
      
      accentTorus.rotation.x += 0.0005;
      accentTorus.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (canvasRef.current?.contains(renderer.domElement)) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      
      // Dispose resources to prevent memory leaks
      geometry.dispose();
      primaryMaterial.dispose();
      secondaryMaterial.dispose();
      accentMaterial.dispose();
      renderer.dispose();
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
