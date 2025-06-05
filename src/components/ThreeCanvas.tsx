
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  className?: string;
}

const ThreeCanvas = ({ className }: ThreeCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isSolving, setIsSolving] = useState(false);

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
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);
    
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
    
    // Mouse movement tracking with performance optimization
    let lastMouseMoveTime = 0;
    const throttleMs = 30;
    
    // Rotation variables
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    const inertiaFactor = 0.05;
    
    const handleMouseMove = (event: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastMouseMoveTime < throttleMs) return;
      lastMouseMoveTime = currentTime;
      
      // Convert mouse position to normalized coordinates (-1 to 1)
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Set target rotation based on mouse position
      targetRotationX = y * 0.8;
      targetRotationY = x * 0.8;
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Auto-solve variables
    let isAutoSolving = false;
    let autoSolveStartTime = 0;
    let lastOperationTime = 0;
    const operationInterval = 500; // ms between each rotation
    const maxOperations = 10; // Maximum number of operations for a solve cycle
    const solveDuration = 5000; // Total solving time in ms
    
    // Cube solving animation variables
    let isAnimating = false;
    let animationStep = 0;
    const totalAnimationSteps = 20;
    let cubesToRotate: any[] = [];
    let rotationAxis = new THREE.Vector3(1, 0, 0);
    let rotationAngle = 0;
    
    // Auto-solve the cube (automatically scramble then solve)
    const autoSolveCycle = () => {
      if (isAnimating || isAutoSolving) return;
      
      isAutoSolving = true;
      autoSolveStartTime = Date.now();
      lastOperationTime = 0;
      
      // First scramble the cube
      scrambleCube();
      
      // Then solve it after a delay
      setTimeout(() => {
        solveCube();
        
        // End auto-solving cycle
        setTimeout(() => {
          isAutoSolving = false;
        }, solveDuration);
      }, operationInterval * maxOperations);
    };
    
    // Random cube scrambler
    const scrambleCube = () => {
      // Only scramble if not already animating
      if (isAnimating) return;
      
      setIsSolving(false);
      
      // Apply random rotations
      const scrambles = 5;
      let delay = 0;
      
      for (let i = 0; i < scrambles; i++) {
        setTimeout(() => {
          const face = Math.floor(Math.random() * 6);
          const clockwise = Math.random() > 0.5;
          rotateFace(face, clockwise);
        }, delay);
        delay += 500;
      }
    };
    
    // Rotate a face of the cube
    const rotateFace = (faceIndex: number, clockwise: boolean) => {
      if (isAnimating) return;
      
      // Define which cubes belong to each face
      const faces = [
        // x = 0 (Left face)
        miniCubes.filter(cube => cube.currentPosition.x === 0),
        // x = 2 (Right face)
        miniCubes.filter(cube => cube.currentPosition.x === 2),
        // y = 0 (Bottom face)
        miniCubes.filter(cube => cube.currentPosition.y === 0),
        // y = 2 (Top face)
        miniCubes.filter(cube => cube.currentPosition.y === 2),
        // z = 0 (Back face)
        miniCubes.filter(cube => cube.currentPosition.z === 0),
        // z = 2 (Front face)
        miniCubes.filter(cube => cube.currentPosition.z === 2),
      ];
      
      // Set rotation parameters
      cubesToRotate = faces[faceIndex];
      
      switch (faceIndex) {
        case 0: // Left face (x = 0)
        case 1: // Right face (x = 2)
          rotationAxis = new THREE.Vector3(1, 0, 0);
          break;
        case 2: // Bottom face (y = 0)
        case 3: // Top face (y = 2)
          rotationAxis = new THREE.Vector3(0, 1, 0);
          break;
        case 4: // Back face (z = 0)
        case 5: // Front face (z = 2)
          rotationAxis = new THREE.Vector3(0, 0, 1);
          break;
      }
      
      // Determine rotation direction (clockwise/counterclockwise)
      if ((faceIndex === 0 || faceIndex === 2 || faceIndex === 4) === clockwise) {
        rotationAngle = -Math.PI / 2;
      } else {
        rotationAngle = Math.PI / 2;
      }
      
      // Start animation
      isAnimating = true;
      animationStep = 0;
      
      // Create a pivot point at the center of the face
      const pivotGroup = new THREE.Group();
      scene.add(pivotGroup);
      
      // Move mini-cubes to the pivot group
      cubesToRotate.forEach(cube => {
        const worldPos = new THREE.Vector3();
        cube.mesh.getWorldPosition(worldPos);
        pivotGroup.attach(cube.mesh);
      });
      
      // Animate the rotation
      const rotateStep = () => {
        pivotGroup.rotateOnAxis(rotationAxis, rotationAngle / totalAnimationSteps);
        animationStep++;
        
        if (animationStep < totalAnimationSteps) {
          requestAnimationFrame(rotateStep);
        } else {
          // Move cubes back to the main group
          cubesToRotate.forEach(cube => {
            cubeGroup.attach(cube.mesh);
            
            // Update current positions
            const newPos = new THREE.Vector3();
            cube.mesh.getWorldPosition(newPos);
            cube.mesh.position.copy(newPos);
            
            // Round positions to avoid floating point errors
            cube.mesh.position.x = Math.round(cube.mesh.position.x * 2) / 2;
            cube.mesh.position.y = Math.round(cube.mesh.position.y * 2) / 2;
            cube.mesh.position.z = Math.round(cube.mesh.position.z * 2) / 2;
            
            // Update current position in the logical grid
            cube.currentPosition = {
              x: Math.round((cube.mesh.position.x / (cubeSize + gap)) + 1),
              y: Math.round((cube.mesh.position.y / (cubeSize + gap)) + 1),
              z: Math.round((cube.mesh.position.z / (cubeSize + gap)) + 1)
            };
          });
          
          // Remove pivot from scene
          scene.remove(pivotGroup);
          isAnimating = false;
        }
      };
      
      rotateStep();
    };
    
    // Solve the cube (simplified solution - just return to original positions)
    const solveCube = () => {
      if (isAnimating || isSolving) return;
      
      setIsSolving(true);
      
      // Simple animation to return cubes to original positions
      const duration = 1500; // ms
      const startTime = Date.now();
      
      const startPositions = miniCubes.map(cube => ({
        x: cube.mesh.position.x,
        y: cube.mesh.position.y,
        z: cube.mesh.position.z
      }));
      
      const solveAnimation = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOutCubic(progress);
        
        // Update positions
        miniCubes.forEach((cube, i) => {
          cube.mesh.position.x = startPositions[i].x + (cube.originalPosition.x - startPositions[i].x) * easedProgress;
          cube.mesh.position.y = startPositions[i].y + (cube.originalPosition.y - startPositions[i].y) * easedProgress;
          cube.mesh.position.z = startPositions[i].z + (cube.originalPosition.z - startPositions[i].z) * easedProgress;
          
          // Update logical positions
          if (progress === 1) {
            cube.currentPosition = {
              x: Math.round((cube.originalPosition.x / (cubeSize + gap)) + 1),
              y: Math.round((cube.originalPosition.y / (cubeSize + gap)) + 1),
              z: Math.round((cube.originalPosition.z / (cubeSize + gap)) + 1)
            };
          }
        });
        
        if (progress < 1) {
          requestAnimationFrame(solveAnimation);
        } else {
          setTimeout(() => {
            setIsSolving(false);
          }, 500);
        }
      };
      
      solveAnimation();
    };

    // Automatically start the auto-solve cycle
    const startInitialAnimation = () => {
      setTimeout(autoSolveCycle, 1000);
      
      // Set up interval for continuous animation
      const autoSolveInterval = setInterval(() => {
        if (!isAutoSolving && !isAnimating) {
          autoSolveCycle();
        }
      }, 15000); // Every 15 seconds attempt to start a new cycle
      
      return autoSolveInterval;
    };
    
    const autoSolveInterval = startInitialAnimation();
    
    // Animation loop
    let frameId: number;
    let lastFrameTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      frameId = requestAnimationFrame(animate);
      
      // Limit frame rate
      if (currentTime - lastFrameTime < frameInterval) return;
      lastFrameTime = currentTime;
      
      // Apply inertia for smooth rotation
      currentRotationX += (targetRotationX - currentRotationX) * inertiaFactor;
      currentRotationY += (targetRotationY - currentRotationY) * inertiaFactor;
      
      // Apply rotation to the entire cube group
      cubeGroup.rotation.x = currentRotationX;
      cubeGroup.rotation.y = currentRotationY;
      
      // Subtle constant rotation
      if (!isAnimating && !isSolving) {
        cubeGroup.rotation.y += 0.001;
      }
      
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
      
      clearInterval(autoSolveInterval);
      
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      
      // Dispose all resources
      renderer.dispose();
      miniCubes.forEach(cube => {
        cube.mesh.traverse((obj: any) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((mat: THREE.Material) => mat.dispose());
            } else {
              obj.material.dispose();
            }
          }
        });
      });
      
      scene.clear();
    };
  }, [isSolving]);

  return (
    <div 
      ref={canvasRef} 
      className={`absolute inset-0 -z-5 opacity-80 ${className || ''}`}
      aria-hidden="true"
    />
  );
};

export default ThreeCanvas;
