import { useEffect, useRef, type FC } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import type { StayTier } from './FellowtownLogo';

interface BreathingFacadeCanvasProps {
  scrubberTier: StayTier;
  scrubberProgress: number; // 0 (nightly), 1 (weekly), 2 (monthly)
  onFacadeClick?: () => void;
}

const TIER_COLORS = {
  nightly: '#8C3B1A',   // Terracotta
  weekly: '#DCA358',    // Ochre
  monthly: '#6C8793',   // Slate
  terracotta: '#8C3B1A',
  ochre: '#DCA358',
  slate: '#6C8793',
  pine: '#4E6E58',      // Pine
  unlit: '#C8C2B3',     // Muted daytime interior
  limestone: '#F6F3EC',
  limestoneDark: '#E8E3D7',
  charcoal: '#1E2426',
  morningLight: '#FFFDF9',
  afternoonLight: '#F7D6B5',
};

export const BreathingFacadeCanvas: FC<BreathingFacadeCanvasProps> = ({
  scrubberTier,
  scrubberProgress,
  onFacadeClick,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0.25, y: 0.45 });
  const lightRef = useRef<THREE.DirectionalLight | null>(null);
  const bayMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(TIER_COLORS.limestone);

    // 2. Orthographic Camera for modernist architectural elevation
    const isMobile = width < 768;
    const aspect = width / height;
    const frustumSize = isMobile ? 12 : 14;
    
    // Ensure horizontal width accommodates at least 4-5 bays on narrow phones
    const horizontalExtent = Math.max(frustumSize * aspect, isMobile ? 11.5 : 13);
    const verticalExtent = horizontalExtent / aspect;

    const camera = new THREE.OrthographicCamera(
      -horizontalExtent / 2,
      horizontalExtent / 2,
      verticalExtent / 2,
      -verticalExtent / 2,
      0.1,
      100
    );
    camera.position.set(0, 0.4, 20);
    camera.lookAt(0, 0.4, 0);

    // 3. Renderer with PCFSoftShadowMap & Mobile-Optimized Pixel Ratio
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // 4. Lighting: Ambient + Dynamic Sun-Dial Directional Light
    const ambientLight = new THREE.AmbientLight(0x7c766b, 0.75);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(TIER_COLORS.morningLight, 1.45);
    dirLight.position.set(6, 9, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 35;
    dirLight.shadow.bias = -0.0004;

    const d = 10;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    scene.add(dirLight);
    lightRef.current = dirLight;

    // Subtle fill bounce light from ground (warm plaster bounce)
    const bounceLight = new THREE.DirectionalLight(0xd9cdbe, 0.35);
    bounceLight.position.set(-6, -4, 4);
    scene.add(bounceLight);

    // 5. Materials
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: TIER_COLORS.limestone,
      roughness: 0.92,
      metalness: 0.04,
    });

    const louverMaterial = new THREE.MeshStandardMaterial({
      color: TIER_COLORS.limestoneDark,
      roughness: 0.88,
      metalness: 0.05,
    });

    const frameMaterial = new THREE.MeshStandardMaterial({
      color: TIER_COLORS.charcoal,
      roughness: 0.8,
      metalness: 0.2,
    });

    const foundationMaterial = new THREE.MeshStandardMaterial({
      color: TIER_COLORS.charcoal,
      roughness: 0.85,
      metalness: 0.1,
    });

    // 6. Architectural Geometry: 5 Stories x 5 Bays Modernist Facade
    const facadeGroup = new THREE.Group();
    scene.add(facadeGroup);

    const cols = 5;
    const rows = 5;
    const bayWidth = 2.15;
    const storyHeight = 1.95;
    const bayDepth = 1.1;

    const totalWidth = cols * bayWidth;
    const totalHeight = rows * storyHeight;
    const startX = -totalWidth / 2 + bayWidth / 2;
    const startY = -totalHeight / 2 + storyHeight / 2 + 0.4;

    bayMaterialsRef.current = [];

    // Construct each bay (Extruded balconies, deep recesses, windows, louvers)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * bayWidth;
        const y = startY + r * storyHeight;

        // A. Recessed Balcony Aperture (Floor slab & ceiling slab)
        const slabGeo = new THREE.BoxGeometry(bayWidth - 0.12, 0.12, bayDepth);
        const slabMesh = new THREE.Mesh(slabGeo, wallMaterial);
        slabMesh.position.set(x, y - storyHeight / 2 + 0.06, -bayDepth / 2 + 0.2);
        slabMesh.castShadow = true;
        slabMesh.receiveShadow = true;
        facadeGroup.add(slabMesh);

        // Ceiling
        const ceilingMesh = new THREE.Mesh(slabGeo, wallMaterial);
        ceilingMesh.position.set(x, y + storyHeight / 2 - 0.06, -bayDepth / 2 + 0.2);
        ceilingMesh.castShadow = true;
        ceilingMesh.receiveShadow = true;
        facadeGroup.add(ceilingMesh);

        // B. Vertical Side Piers
        const pierGeo = new THREE.BoxGeometry(0.12, storyHeight, bayDepth);
        const leftPier = new THREE.Mesh(pierGeo, wallMaterial);
        leftPier.position.set(x - bayWidth / 2 + 0.06, y, -bayDepth / 2 + 0.2);
        leftPier.castShadow = true;
        leftPier.receiveShadow = true;
        facadeGroup.add(leftPier);

        const rightPier = new THREE.Mesh(pierGeo, wallMaterial);
        rightPier.position.set(x + bayWidth / 2 - 0.06, y, -bayDepth / 2 + 0.2);
        rightPier.castShadow = true;
        rightPier.receiveShadow = true;
        facadeGroup.add(rightPier);

        // C. Back Wall (Setback in deep shadow)
        const backWallGeo = new THREE.BoxGeometry(bayWidth - 0.2, storyHeight - 0.2, 0.1);
        const backWallMesh = new THREE.Mesh(backWallGeo, wallMaterial);
        backWallMesh.position.set(x, y, -bayDepth + 0.25);
        backWallMesh.receiveShadow = true;
        facadeGroup.add(backWallMesh);

        // D. Dark Minimalist Window Frame
        const frameW = bayWidth * 0.72;
        const frameH = storyHeight * 0.68;
        const frameGeo = new THREE.BoxGeometry(frameW, frameH, 0.06);
        const frameMesh = new THREE.Mesh(frameGeo, frameMaterial);
        frameMesh.position.set(x, y, -bayDepth + 0.32);
        frameMesh.castShadow = true;
        frameMesh.receiveShadow = true;
        facadeGroup.add(frameMesh);

        // E. Emissive Interior Plane (The Living Window Light)
        const innerGeo = new THREE.PlaneGeometry(frameW - 0.14, frameH - 0.14);
        const innerMat = new THREE.MeshStandardMaterial({
          color: TIER_COLORS.unlit,
          emissive: new THREE.Color(TIER_COLORS.unlit),
          emissiveIntensity: 0.18,
          roughness: 0.4,
        });
        bayMaterialsRef.current.push(innerMat);

        const innerMesh = new THREE.Mesh(innerGeo, innerMat);
        innerMesh.position.set(x, y, -bayDepth + 0.36);
        facadeGroup.add(innerMesh);

        // F. Cantilevered Brise-Soleil Vertical & Horizontal Louvers
        // Varied rhythm across bays: alternating solar fins for dramatic shadows
        if ((r + c) % 2 === 0) {
          // Horizontal sun shade fin
          const louverGeo = new THREE.BoxGeometry(bayWidth - 0.2, 0.06, 0.45);
          const louverMesh = new THREE.Mesh(louverGeo, louverMaterial);
          louverMesh.position.set(x, y + 0.45, 0.15);
          louverMesh.castShadow = true;
          louverMesh.receiveShadow = true;
          facadeGroup.add(louverMesh);
        } else {
          // Vertical solar deflector blade
          const deflectorGeo = new THREE.BoxGeometry(0.06, storyHeight - 0.3, 0.55);
          const deflectorMesh = new THREE.Mesh(deflectorGeo, louverMaterial);
          deflectorMesh.position.set(x + (c % 2 === 0 ? 0.35 : -0.35), y, 0.18);
          deflectorMesh.castShadow = true;
          deflectorMesh.receiveShadow = true;
          facadeGroup.add(deflectorMesh);
        }
      }
    }

    // 7. Base Solid Foundation Bar (Honoring the Living Elevation design)
    const foundGeo = new THREE.BoxGeometry(totalWidth + 0.6, 0.7, bayDepth * 1.3);
    const foundationMesh = new THREE.Mesh(foundGeo, foundationMaterial);
    foundationMesh.position.set(0, startY - storyHeight / 2 - 0.35, -0.1);
    foundationMesh.castShadow = true;
    foundationMesh.receiveShadow = true;
    facadeGroup.add(foundationMesh);

    // 8. Rooftop Modernist Pergola Beams (BV Doshi inspired shadow casting)
    const roofBeamCount = 7;
    for (let b = 0; b < roofBeamCount; b++) {
      const bx = -totalWidth / 2 + (b * totalWidth) / (roofBeamCount - 1);
      const beamGeo = new THREE.BoxGeometry(0.12, 0.35, bayDepth * 1.4);
      const beamMesh = new THREE.Mesh(beamGeo, wallMaterial);
      beamMesh.position.set(bx, startY + (rows - 0.5) * storyHeight + 0.2, -0.1);
      beamMesh.castShadow = true;
      beamMesh.receiveShadow = true;
      facadeGroup.add(beamMesh);
    }

    // Shadow catcher backdrop ground
    const groundGeo = new THREE.PlaneGeometry(35, 35);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.15 });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.position.set(0, startY - storyHeight / 2 - 0.7, 0);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 9. Mousemove & Touch Interaction for Sun-Dial Shadow Mapping
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x: normX, y: normY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const normX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mouseRef.current = { x: Math.max(-1, Math.min(1, normX)), y: Math.max(-1, Math.min(1, normY)) };
      }
    };

    // Touch-Linked Sunlight: Track vertical scroll progress on touch devices
    let scrollSunOffset = 0;
    const handleScroll = () => {
      if (window.innerWidth < 1024) {
        const scrollFrac = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight || 800)));
        scrollSunOffset = (scrollFrac - 0.5) * 4.0;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 10. Animation Loop
    let animId: number;
    let targetX = 6;
    let targetY = 9;
    let targetZ = 8;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Sun-dial directional light dynamically tracked to cursor/touch + scroll + scrubber
      const scrubberSunOffset = (scrubberProgress - 1) * 3.5;
      const desiredX = 6 + mouseRef.current.x * 4.5 + scrollSunOffset + scrubberSunOffset;
      const desiredY = 8.5 + mouseRef.current.y * 3.0;
      const desiredZ = 7.5 + mouseRef.current.x * 2.0;

      targetX += (desiredX - targetX) * 0.05;
      targetY += (desiredY - targetY) * 0.05;
      targetZ += (desiredZ - targetZ) * 0.05;

      if (lightRef.current) {
        lightRef.current.position.set(targetX, targetY, targetZ);
      }

      // Subtle tactile 3D facade tilt
      facadeGroup.rotation.y += (mouseRef.current.x * 0.06 - facadeGroup.rotation.y) * 0.05;
      facadeGroup.rotation.x += (-mouseRef.current.y * 0.04 - facadeGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Responsive Resize handling
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      const newAspect = newW / newH;
      const mobile = newW < 768;

      const fSize = mobile ? 12 : 14;
      const hExtent = Math.max(fSize * newAspect, mobile ? 11.5 : 13);
      const vExtent = hExtent / newAspect;

      camera.left = -hExtent / 2;
      camera.right = hExtent / 2;
      camera.top = vExtent / 2;
      camera.bottom = -vExtent / 2;
      camera.updateProjectionMatrix();

      rendererRef.current.setSize(newW, newH);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Bay Emissive Illumination and Sun Light Color on Scrubber Change
  useEffect(() => {
    if (bayMaterialsRef.current.length === 0) return;

    // Shift Light Color Temperature: Morning (crisp) to Afternoon (warm golden)
    if (lightRef.current) {
      const morningCol = new THREE.Color(TIER_COLORS.morningLight);
      const afternoonCol = new THREE.Color(TIER_COLORS.afternoonLight);
      const lerpedColor = morningCol.clone().lerp(afternoonCol, scrubberProgress / 2);

      gsap.to(lightRef.current.color, {
        r: lerpedColor.r,
        g: lerpedColor.g,
        b: lerpedColor.b,
        duration: 0.7,
        ease: 'power2.out',
      });

      // Shift light intensity
      const targetIntensity = 1.45 + (scrubberProgress * 0.15);
      gsap.to(lightRef.current, {
        intensity: targetIntensity,
        duration: 0.7,
      });
    }

    // 25 Bay illumination logic according to user specification:
    // - Nightly: Terracotta (#8C3B1A) lit modules (short stays scattered like night suites)
    // - Weekly: Ochre (#DCA358) middle stories
    // - Monthly / Corporate: Slate (#6C8793) & Pine (#4E6E58) upper executive blocks
    bayMaterialsRef.current.forEach((mat, index) => {
      const r = Math.floor(index / 5); // 0 (bottom) to 4 (top)
      const c = index % 5;

      let targetHex = TIER_COLORS.unlit;
      let targetIntensity = 0.12;

      if (scrubberTier === 'nightly') {
        // Scattered transient glowing bays in terracotta
        const nightlyLit = [1, 3, 6, 8, 11, 14, 16, 18, 21, 23];
        if (nightlyLit.includes(index)) {
          targetHex = TIER_COLORS.terracotta;
          targetIntensity = 0.95;
        } else {
          targetHex = TIER_COLORS.unlit;
          targetIntensity = 0.15;
        }
      } else if (scrubberTier === 'weekly') {
        // Middle rows (1, 2, 3) smoothly fill with Ochre
        if (r >= 1 && r <= 3) {
          targetHex = TIER_COLORS.ochre;
          targetIntensity = 0.9;
        } else if (r === 0) {
          targetHex = TIER_COLORS.terracotta;
          targetIntensity = 0.6;
        } else {
          targetHex = TIER_COLORS.unlit;
          targetIntensity = 0.18;
        }
      } else if (scrubberTier === 'monthly') {
        // Top executive penthouse rows (3 & 4) morph to Slate and Pine
        if (r === 4) {
          targetHex = c < 3 ? TIER_COLORS.monthly : TIER_COLORS.pine;
          targetIntensity = 1.0;
        } else if (r === 3) {
          targetHex = TIER_COLORS.monthly;
          targetIntensity = 0.85;
        } else if (r === 2 || r === 1) {
          targetHex = TIER_COLORS.ochre;
          targetIntensity = 0.55;
        } else {
          targetHex = TIER_COLORS.terracotta;
          targetIntensity = 0.5;
        }
      }

      const targetColor = new THREE.Color(targetHex);

      gsap.to(mat.emissive, {
        r: targetColor.r,
        g: targetColor.g,
        b: targetColor.b,
        duration: 0.65,
        delay: (c * 0.03) + (r * 0.02),
        ease: 'power2.out',
      });

      gsap.to(mat, {
        emissiveIntensity: targetIntensity,
        duration: 0.65,
        delay: (c * 0.03) + (r * 0.02),
        ease: 'power2.out',
      });
    });
  }, [scrubberTier, scrubberProgress]);

  return (
    <div
      ref={containerRef}
      onClick={onFacadeClick}
      className="relative w-full h-full cursor-crosshair overflow-hidden select-none bg-[#F6F3EC]"
      title="Move cursor to cast sun-cast shadows across the facade"
    />
  );
};
