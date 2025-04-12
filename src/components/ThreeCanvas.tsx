import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useIsMobile } from "@/hooks/use-mobile";

interface ThreeCanvasProps {
  className?: string;
}

const ThreeCanvas = ({ className }: ThreeCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera with good depth perception for cube
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;
    
    // Renderer with performance optimizations
    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile,
      alpha: true,
    });
    
    rendererRef.current = renderer;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create a container for the renderer's canvas element
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.appendChild(renderer.domElement);
    canvasRef.current.appendChild(container);
    
    // Main group to hold the Rubik's cube
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);
    
    // Cube parameters
    const cubeSize = 1;
    const gap = 0.05;
    const totalSize = 3 * cubeSize + 2 * gap; // 3 cubes + 2 gaps
    
    // Materials for the skeletal cube - fully transparent with just edges
    const edgeMaterial = new THREE.LineBasicMaterial({ 
      color: 0xd4a257,
      transparent: true,
      opacity: 0.8
    });
    
    // Mini-cube geometries and meshes
    const miniCubes = [];
    const positions = [-1, 0, 1]; // Relative positions
    
    // Create the skeletal Rubik's cube structure
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          // Skip center cube and center face cubes (only keep corner and edge cubes for skeletal look)
          if ((x === 1 && y === 1) || 
              (x === 1 && y === 1 && z !== 1) || 
              (x === 1 && z === 1 && y !== 1) || 
              (y === 1 && z === 1 && x !== 1)) {
            continue;
          }
          
          // Create edges/frame for each mini-cube
          const miniCube = new THREE.Group();
          
          // Position relative to center
          const xPos = positions[x] * (cubeSize + gap);
          const yPos = positions[y] * (cubeSize + gap);
          const zPos = positions[z] * (cubeSize + gap);
          miniCube.position.set(xPos, yPos, zPos);
          
          // For skeletal look, we'll just create the edges of each mini-cube
          const edgeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
          const edges = new THREE.EdgesGeometry(edgeGeometry);
          const line = new THREE.LineSegments(edges, edgeMaterial);
          
          miniCube.add(line);
          cubeGroup.add(miniCube);
          miniCubes.push({
            mesh: miniCube,
            originalPosition: { x: xPos, y: yPos, z: zPos },
            currentPosition: { x, y, z }
          });
        }
      }
    }
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    // Add directional light for subtle shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Animation loop
    let frameId: number;
    
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Simple constant rotation
      cubeGroup.rotation.y += 0.005;
      cubeGroup.rotation.x += 0.002;
      
      renderer.render(scene, camera);
    };
    
    frameId = requestAnimationFrame(animate);
    
    // Comprehensive cleanup
    return () => {
      if (canvasRef.current && renderer.domElement) {
        if (container && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        if (canvasRef.current.contains(container)) {
          canvasRef.current.removeChild(container);
        }
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      
      // Dispose all resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      
      scene.clear();
    };
  }, [isMobile]);

  return (
    <div 
      ref={canvasRef} 
      className={`absolute inset-0 -z-5 opacity-80 ${className || ''}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}
    />
  );
};

export default ThreeCanvas;
