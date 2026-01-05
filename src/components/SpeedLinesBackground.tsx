import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SpeedLinesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Amber color
    const amberColor = new THREE.Color(0xf59e0b);
    const amberColorDim = new THREE.Color(0x92400e);

    // Speed lines - horizontal streaks
    const speedLinesGroup = new THREE.Group();
    const speedLinesMaterial = new THREE.LineBasicMaterial({ 
      color: amberColor, 
      transparent: true, 
      opacity: 0.3 
    });

    const speedLinesCount = 100;
    const speedLines: { mesh: THREE.Line; speed: number; originalX: number }[] = [];

    for (let i = 0; i < speedLinesCount; i++) {
      const geometry = new THREE.BufferGeometry();
      const length = Math.random() * 20 + 5;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 40 - 10;
      const x = (Math.random() - 0.5) * 100;

      const points = [
        new THREE.Vector3(x, y, z),
        new THREE.Vector3(x + length, y, z)
      ];
      geometry.setFromPoints(points);

      const lineMat = speedLinesMaterial.clone();
      lineMat.opacity = Math.random() * 0.3 + 0.1;
      
      const line = new THREE.Line(geometry, lineMat);
      speedLinesGroup.add(line);
      speedLines.push({ mesh: line, speed: Math.random() * 0.5 + 0.2, originalX: x });
    }

    scene.add(speedLinesGroup);

    // Wireframe mesh - floating geometric shape
    const wireframeGeometry = new THREE.IcosahedronGeometry(8, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: amberColor,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    wireframeMesh.position.set(15, 0, -20);
    scene.add(wireframeMesh);

    // Second wireframe - torus
    const torusGeometry = new THREE.TorusGeometry(6, 0.5, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: amberColor,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    torusMesh.position.set(-20, -10, -25);
    scene.add(torusMesh);

    // Particle system - floating amber dots
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 20;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      color: amberColor,
      size: 0.5,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Grid floor effect
    const gridHelper = new THREE.GridHelper(100, 50, amberColorDim, amberColorDim);
    gridHelper.position.y = -20;
    gridHelper.material.opacity = 0.1;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

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

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate wireframes based on mouse
      wireframeMesh.rotation.x += 0.002;
      wireframeMesh.rotation.y += 0.003;
      wireframeMesh.rotation.z = mouseX * 0.3;
      wireframeMesh.position.x = 15 + mouseX * 5;
      wireframeMesh.position.y = mouseY * 5;

      torusMesh.rotation.x += 0.001;
      torusMesh.rotation.y += 0.002;
      torusMesh.position.x = -20 - mouseX * 3;
      torusMesh.position.y = -10 + mouseY * 3;

      // Move speed lines
      speedLines.forEach((line) => {
        line.mesh.position.x += line.speed;
        if (line.mesh.position.x > 60) {
          line.mesh.position.x = -60;
        }
      });

      // Rotate particles slightly
      particles.rotation.y += 0.0003;
      particles.rotation.x = mouseY * 0.1;

      // Camera subtle movement
      camera.position.x = mouseX * 3;
      camera.position.y = mouseY * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    frameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
