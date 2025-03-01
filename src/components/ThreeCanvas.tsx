
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
    
    // Create geometry - use curved, organic shapes for more fluid animation
    // Using CurveModifier for more organic movement
    const curvePoints = [];
    for (let i = 0; i < 10; i++) {
      const t = i / 9;
      curvePoints.push(
        new THREE.Vector3(
          Math.sin(t * Math.PI * 2) * (1 + 0.2 * Math.cos(t * Math.PI * 7)),
          Math.cos(t * Math.PI * 2) * (1 + 0.2 * Math.cos(t * Math.PI * 7)),
          0.3 * Math.sin(t * Math.PI * 7)
        )
      );
    }
    
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    curve.closed = true;
    
    // Create a more organic, flowing geometry
    const geometry = new THREE.TubeGeometry(curve, 100, 0.1, 20, true);
    
    // Use the new color scheme
    const indigoMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x1E0F48, // deep indigo
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    
    const tealMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x008B94, // rich teal
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    
    const violetMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x9D4EDD, // soft violet glow
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    
    // Create meshes with the new fluid structure
    const indigoMesh = new THREE.Mesh(geometry, indigoMaterial);
    scene.add(indigoMesh);
    
    const tealMesh = new THREE.Mesh(geometry, tealMaterial);
    tealMesh.scale.set(1.2, 1.2, 1.2);
    tealMesh.rotation.set(0, Math.PI / 4, 0);
    scene.add(tealMesh);
    
    const violetMesh = new THREE.Mesh(geometry, violetMaterial);
    violetMesh.scale.set(1.4, 1.4, 1.4);
    violetMesh.rotation.set(0, Math.PI / 2, 0);
    scene.add(violetMesh);
    
    // Create pulsing light points along the curves
    const lightPointsCount = 20;
    const lightPoints = [];
    const pointGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const pointMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00C2FF, // electric blue
      transparent: true,
      opacity: 0.8,
    });
    
    for (let i = 0; i < lightPointsCount; i++) {
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      const t = i / lightPointsCount;
      const pos = curve.getPoint(t);
      point.position.copy(pos);
      scene.add(point);
      lightPoints.push({
        mesh: point,
        t: t,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    // Handle mouse movement - throttled for performance
    let lastTime = 0;
    const throttleMs = 50; // Throttle to 20 updates per second
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastTime < throttleMs) return;
      lastTime = currentTime;
      
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Slow down rotation when cursor is near
      const distanceToCenter = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      
      if (distanceToCenter < 0.5) {
        // Highlight points near the cursor with a glow
        lightPoints.forEach(point => {
          const pointScreenPosition = new THREE.Vector3();
          point.mesh.getWorldPosition(pointScreenPosition);
          pointScreenPosition.project(camera);
          
          const distance = Math.sqrt(
            Math.pow(pointScreenPosition.x - mouseX, 2) + 
            Math.pow(pointScreenPosition.y - mouseY, 2)
          );
          
          if (distance < 0.2) {
            // Increase size and brightness of nearby points
            point.mesh.scale.set(2, 2, 2);
            (point.mesh.material as THREE.MeshBasicMaterial).opacity = 1;
          } else {
            // Reset to normal
            point.mesh.scale.set(1, 1, 1);
            (point.mesh.material as THREE.MeshBasicMaterial).opacity = 0.8;
          }
        });
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
    
    // For better performance, we'll use a lower animation frame rate
    // and use requestAnimationFrame more efficiently
    let frameId: number;
    let time = 0;
    
    // Create cubic bezier for elastic easing
    const easeInOutCubic = (t: number): number => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.005;
      
      // Apply organic, fluid movement using elastic easing
      indigoMesh.rotation.x = 0.2 * Math.sin(time * 0.5);
      indigoMesh.rotation.y = 0.2 * Math.cos(time * 0.7);
      
      tealMesh.rotation.x = 0.2 * Math.sin(time * 0.3 + 1);
      tealMesh.rotation.y = 0.2 * Math.cos(time * 0.5 + 1);
      
      violetMesh.rotation.x = 0.2 * Math.sin(time * 0.2 + 2);
      violetMesh.rotation.y = 0.2 * Math.cos(time * 0.4 + 2);
      
      // Animate light points with pulsing
      lightPoints.forEach(point => {
        const pulse = 0.5 + 0.5 * Math.sin(time * 2 + point.pulsePhase);
        const smoothPulse = easeInOutCubic(pulse);
        
        // Move points along the curve with varying speeds
        point.t = (point.t + 0.001) % 1;
        const newPos = curve.getPoint(point.t);
        point.mesh.position.copy(newPos);
        
        // Pulse the opacity and scale
        (point.mesh.material as THREE.MeshBasicMaterial).opacity = 0.5 + 0.5 * smoothPulse;
        point.mesh.scale.set(
          0.7 + 0.3 * smoothPulse,
          0.7 + 0.3 * smoothPulse,
          0.7 + 0.3 * smoothPulse
        );
      });
      
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
      geometry.dispose();
      indigoMaterial.dispose();
      tealMaterial.dispose();
      violetMaterial.dispose();
      pointGeometry.dispose();
      pointMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={canvasRef} 
      className={`absolute inset-0 -z-5 ${className || ''}`}
      aria-hidden="true"
    />
  );
};

export default ThreeCanvas;
