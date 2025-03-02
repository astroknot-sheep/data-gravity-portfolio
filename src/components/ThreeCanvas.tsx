
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  className?: string;
}

const ThreeCanvas = ({ className }: ThreeCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create scene with better depth
    const scene = new THREE.Scene();
    
    // Create camera with improved FOV for immersive experience
    const camera = new THREE.PerspectiveCamera(
      75, // Wider FOV for more immersive effect
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 4;
    
    // High-quality renderer with improved settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);
    
    // Create a group to hold all objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    
    // Create custom organic shapes
    // First shape: Flowing wave-like structure
    const wavePoints = [];
    const waveRadius = 1.5;
    for (let i = 0; i <= 50; i++) {
      const angle = (i / 50) * Math.PI * 2;
      const x = waveRadius * Math.cos(angle);
      const y = waveRadius * Math.sin(angle);
      // Add wave effect
      const z = Math.sin(angle * 4) * 0.2;
      wavePoints.push(new THREE.Vector3(x, y, z));
    }
    
    // Create a smooth curve from the points
    const waveCurve = new THREE.CatmullRomCurve3(wavePoints);
    waveCurve.closed = true;
    
    // Create a tube geometry along the curve
    const waveGeometry = new THREE.TubeGeometry(waveCurve, 100, 0.08, 16, true);
    
    // Create materials with elegant gold/amber gradient
    const waveMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xd4a257,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    
    // Create meshes
    const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
    mainGroup.add(waveMesh);
    
    // Second shape: Angular flowing form
    const flowGeometry = new THREE.TorusKnotGeometry(1.2, 0.2, 128, 32, 2, 3);
    const flowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffd28a,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const flowMesh = new THREE.Mesh(flowGeometry, flowMaterial);
    flowMesh.rotation.x = Math.PI / 6;
    mainGroup.add(flowMesh);
    
    // Third shape: Outer angular structure
    const outerGeometry = new THREE.TorusKnotGeometry(1.7, 0.05, 150, 16, 3, 7);
    const outerMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x8c6931,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const outerMesh = new THREE.Mesh(outerGeometry, outerMaterial);
    outerMesh.rotation.x = Math.PI / 3;
    mainGroup.add(outerMesh);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Improve mouse movement performance with throttling
    let lastMouseMoveTime = 0;
    const throttleMs = 60; // Balance smoothness and performance
    
    // Mouse movement variables for inertia
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    const inertiaFactor = 0.03; // Smooth follow factor
    
    const handleMouseMove = (event: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastMouseMoveTime < throttleMs) return;
      lastMouseMoveTime = currentTime;
      
      // Convert mouse position to normalized coordinates (-1 to 1)
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Set target rotation based on mouse position
      targetRotationX = y * 0.3; // Reduced factor for subtler effect
      targetRotationY = x * 0.3;
    };
    
    // Use passive event listener for performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // More efficient resize handler with debouncing
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      
      resizeTimeout = window.setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 150);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Optimize animation loop with request animation frame timing
    let frameId: number;
    let lastFrameTime = 0;
    const targetFPS = 60; // Target 60 FPS for smooth animation
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      frameId = requestAnimationFrame(animate);
      
      // Limit frame rate for consistent performance
      if (currentTime - lastFrameTime < frameInterval) return;
      lastFrameTime = currentTime;
      
      // Apply inertia for smooth rotation
      currentRotationX += (targetRotationX - currentRotationX) * inertiaFactor;
      currentRotationY += (targetRotationY - currentRotationY) * inertiaFactor;
      
      // Apply rotation to the main group
      mainGroup.rotation.x = currentRotationX;
      mainGroup.rotation.y = currentRotationY;
      
      // Continuous subtle rotation for constant motion
      waveMesh.rotation.z += 0.001;
      flowMesh.rotation.z += 0.0007;
      outerMesh.rotation.z -= 0.0005;
      
      // Slight pulsing effect for more organic feel
      const pulseFactor = Math.sin(currentTime * 0.0005) * 0.03 + 1;
      mainGroup.scale.set(pulseFactor, pulseFactor, pulseFactor);
      
      renderer.render(scene, camera);
    };
    
    frameId = requestAnimationFrame(animate);
    
    // Comprehensive cleanup
    return () => {
      if (canvasRef.current && renderer.domElement) {
        if (canvasRef.current.contains(renderer.domElement)) {
          canvasRef.current.removeChild(renderer.domElement);
        }
      }
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      
      // Dispose all THREE.js resources to prevent memory leaks
      waveGeometry.dispose();
      flowGeometry.dispose();
      outerGeometry.dispose();
      waveMaterial.dispose();
      flowMaterial.dispose();
      outerMaterial.dispose();
      renderer.dispose();
      
      // Clear references and scene
      scene.clear();
      mainGroup.clear();
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
