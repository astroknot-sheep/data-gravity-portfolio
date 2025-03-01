
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
    
    // Create more organic, flowing geometry - using CurveGeometry for a more fluid look
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(-0.5, 1, 0),
      new THREE.Vector3(0.5, -1, 0),
      new THREE.Vector3(1, 0, 0)
    );
    
    const points = curve.getPoints(50);
    const tubeGeometry = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(-0.5, 1, 0),
        new THREE.Vector3(0.5, 0, 1),
        new THREE.Vector3(1, -0.5, -0.5),
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(-1, -1, -1)
      ]),
      80,  // tubular segments
      0.4,  // radius
      12,   // radial segments
      true  // closed
    );
    
    // Create materials with new color scheme (indigo to teal with electric blue accents)
    const primaryMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x1E0F48, // deep indigo
      wireframe: true
    });
    
    const secondaryMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x008B94, // rich teal
      wireframe: true
    });
    
    const accentMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00C2FF, // electric blue
      wireframe: true
    });
    
    // Create meshes
    const primaryMesh = new THREE.Mesh(tubeGeometry, primaryMaterial);
    scene.add(primaryMesh);
    
    const secondaryMesh = new THREE.Mesh(tubeGeometry, secondaryMaterial);
    secondaryMesh.scale.set(1.1, 1.1, 1.1);
    secondaryMesh.rotation.set(0, Math.PI / 3, 0);
    scene.add(secondaryMesh);
    
    const accentMesh = new THREE.Mesh(tubeGeometry, accentMaterial);
    accentMesh.scale.set(0.8, 0.8, 0.8);
    accentMesh.rotation.set(0, Math.PI / 2, 0);
    scene.add(accentMesh);
    
    // Ambient light with violet glow
    const ambientLight = new THREE.AmbientLight(0x9D4EDD, 0.4);
    scene.add(ambientLight);
    
    // Handle mouse movement - throttled for performance
    let lastTime = 0;
    const throttleMs = 50; // Throttle to 20 updates per second
    let isHovering = false;
    
    const handleMouseMove = (event: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastTime < throttleMs) return;
      lastTime = currentTime;
      
      // Calculate normalized coordinates
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Check if mouse is near the center to trigger hover effect
      const distanceFromCenter = Math.sqrt(x * x + y * y);
      isHovering = distanceFromCenter < 0.5;
      
      // Gently move meshes toward cursor
      primaryMesh.rotation.x += y * 0.01;
      primaryMesh.rotation.y += x * 0.01;
      
      secondaryMesh.rotation.x += y * 0.008;
      secondaryMesh.rotation.y += x * 0.008;
      
      accentMesh.rotation.x += y * 0.006;
      accentMesh.rotation.y += x * 0.006;
      
      // When hovering, subtle expansion toward cursor
      if (isHovering) {
        const expansionFactor = 0.02;
        primaryMesh.position.x += x * expansionFactor;
        primaryMesh.position.y += y * expansionFactor;
        secondaryMesh.position.x += x * expansionFactor * 0.8;
        secondaryMesh.position.y += y * expansionFactor * 0.8;
        accentMesh.position.x += x * expansionFactor * 0.6;
        accentMesh.position.y += y * expansionFactor * 0.6;
      }
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
    
    // Animation loop with elastic easing
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Implement organic, fluid rotation with eased rotation speed
      const normalRotationSpeed = isHovering ? 0.0005 : 0.002;
      const easedRotation = normalRotationSpeed * (Math.sin(Date.now() * 0.001) * 0.5 + 0.5);
      
      // Apply organic, flowing animation
      primaryMesh.rotation.x += easedRotation;
      primaryMesh.rotation.y += easedRotation;
      
      secondaryMesh.rotation.x += easedRotation * 0.8;
      secondaryMesh.rotation.y += easedRotation * 0.7;
      
      accentMesh.rotation.x += easedRotation * 0.6;
      accentMesh.rotation.y += easedRotation * 0.5;
      
      // Subtle breathing/pulsing effect
      const pulseFactor = Math.sin(Date.now() * 0.001) * 0.02 + 1;
      primaryMesh.scale.set(pulseFactor, pulseFactor, pulseFactor);
      secondaryMesh.scale.set(1.1 * pulseFactor, 1.1 * pulseFactor, 1.1 * pulseFactor);
      
      // Gradually return to center position when not hovering
      if (!isHovering) {
        primaryMesh.position.x *= 0.95;
        primaryMesh.position.y *= 0.95;
        secondaryMesh.position.x *= 0.95;
        secondaryMesh.position.y *= 0.95;
        accentMesh.position.x *= 0.95;
        accentMesh.position.y *= 0.95;
      }
      
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
      
      // Dispose resources
      tubeGeometry.dispose();
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
