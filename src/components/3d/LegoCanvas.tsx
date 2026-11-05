import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { soundEffects } from '../../utils/audio';

export type LightingPreset = 'neon' | 'studio' | 'golden' | 'monochrome';

interface LegoCanvasProps {
  exploded: boolean;
  lightingPreset: LightingPreset;
  interactiveMode?: boolean;
}

interface FloatingBrick {
  group: THREE.Group;
  initialPos: THREE.Vector3;
  explodedPos: THREE.Vector3;
  initialRot: THREE.Euler;
  rotationSpeed: THREE.Vector3;
  floatPhase: number;
  floatAmplitude: number;
  floatFreq: number;
  impulse: THREE.Vector3;
  impulseRot: THREE.Vector3;
}

export const LegoCanvas: React.FC<LegoCanvasProps> = ({
  exploded,
  lightingPreset,
  interactiveMode = true
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    exploded,
    lightingPreset,
    mouse: new THREE.Vector2(0, 0),
    targetCameraPos: new THREE.Vector3(0, 0, 16),
  });

  // Keep ref in sync
  useEffect(() => {
    stateRef.current.exploded = exploded;
  }, [exploded]);

  useEffect(() => {
    stateRef.current.lightingPreset = lightingPreset;
  }, [lightingPreset]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 2. Setup Renderer
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Scene & Camera
    const scene = new THREE.Scene();
    const fog = new THREE.FogExp2('#07090e', 0.035);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1, 16);
    camera.lookAt(0, 0, 0);

    // Studio Environment map via RoomEnvironment
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Graceful fallback
    }

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x07090e, 0.8);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffe600, 2.5);
    keyLight.position.set(8, 12, 10);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x0055bf, 1.8);
    fillLight.position.set(-10, -4, -6);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xff0055, 3.5, 30);
    rimLight.position.set(0, -6, 4);
    scene.add(rimLight);

    // Color palettes for LEGO plastic ABS
    const COLOR_PALETTE = {
      yellow: 0xffe600,
      red: 0xe3000b,
      blue: 0x0055bf,
      black: 0x141822,
      darkGrey: 0x2c3344,
      white: 0xf3f4f6,
      transCyan: 0x06b6d4,
      transAmber: 0xf59e0b,
    };

    // Shared Geometries to optimize draw calls
    const studGeometry = new THREE.CylinderGeometry(0.24, 0.24, 0.18, 16);
    studGeometry.translate(0, 0.09, 0);

    const reusableMaterials = new Map<number, THREE.MeshPhysicalMaterial>();
    const getBrickMaterial = (colorHex: number, isTranslucent = false) => {
      const key = colorHex + (isTranslucent ? 1000000 : 0);
      if (reusableMaterials.has(key)) return reusableMaterials.get(key)!;

      const mat = new THREE.MeshPhysicalMaterial({
        color: colorHex,
        roughness: isTranslucent ? 0.1 : 0.16,
        metalness: 0.04,
        clearcoat: 0.85,
        clearcoatRoughness: 0.12,
        transmission: isTranslucent && !isSoftwareGl ? 0.88 : 0,
        transparent: isTranslucent,
        opacity: isTranslucent ? 0.82 : 1.0,
        ior: 1.54,
      });
      reusableMaterials.set(key, mat);
      return mat;
    };

    // Function to build an authentic composite LEGO brick (Box + Studs)
    const createBrickGroup = (
      widthStuds: number,
      lengthStuds: number,
      heightUnits: number,
      colorHex: number,
      isTranslucent = false
    ): THREE.Group => {
      const group = new THREE.Group();
      const unitSize = 0.8;
      const height = heightUnits * (unitSize * 0.96);
      const width = widthStuds * unitSize;
      const length = lengthStuds * unitSize;

      // Main brick body
      const boxGeo = new THREE.BoxGeometry(width - 0.03, height - 0.03, length - 0.03);
      const mat = getBrickMaterial(colorHex, isTranslucent);
      const boxMesh = new THREE.Mesh(boxGeo, mat);
      boxMesh.castShadow = !isSoftwareGl;
      boxMesh.receiveShadow = !isSoftwareGl;
      group.add(boxMesh);

      // Studs on top
      const studMat = mat;
      const xStart = -((widthStuds - 1) * unitSize) / 2;
      const zStart = -((lengthStuds - 1) * unitSize) / 2;
      const studY = height / 2;

      for (let x = 0; x < widthStuds; x++) {
        for (let z = 0; z < lengthStuds; z++) {
          const stud = new THREE.Mesh(studGeometry, studMat);
          stud.position.set(xStart + x * unitSize, studY, zStart + z * unitSize);
          stud.castShadow = !isSoftwareGl;
          group.add(stud);
        }
      }

      group.userData = { isLegoBrick: true };
      return group;
    };

    // 5. Generate a collection of floating LEGO bricks and sculptural assemblies
    const floatingBricks: FloatingBrick[] = [];
    const rootAssembly = new THREE.Group();
    scene.add(rootAssembly);

    const brickConfigs = [
      // Centerpiece Sculptural Cluster
      { w: 2, l: 4, h: 1, c: COLOR_PALETTE.yellow, pos: [0, 0, 0], rot: [0.2, 0.4, 0] },
      { w: 2, l: 2, h: 1, c: COLOR_PALETTE.red, pos: [0.8, 0.8, -0.4], rot: [-0.1, 0.6, 0.2] },
      { w: 2, l: 4, h: 1, c: COLOR_PALETTE.blue, pos: [-1.2, -0.7, 0.5], rot: [0.3, -0.4, 0.1] },
      { w: 1, l: 4, h: 1, c: COLOR_PALETTE.black, pos: [1.4, -0.6, 0.3], rot: [0.1, 0.8, -0.2] },
      { w: 2, l: 2, h: 1, c: COLOR_PALETTE.transCyan, trans: true, pos: [-0.5, 1.2, 0.8], rot: [0.4, 0.1, -0.3] },
      { w: 2, l: 4, h: 1, c: COLOR_PALETTE.white, pos: [0.2, -1.4, -0.6], rot: [-0.3, 0.3, 0.4] },
      { w: 1, l: 2, h: 1, c: COLOR_PALETTE.transAmber, trans: true, pos: [1.8, 1.0, -1.0], rot: [0.5, -0.2, 0.6] },

      // Floating satellites (Left quadrant)
      { w: 2, l: 4, h: 1, c: COLOR_PALETTE.yellow, pos: [-5.5, 3.2, -2.5], rot: [0.6, 0.8, 0.2] },
      { w: 2, l: 2, h: 1, c: COLOR_PALETTE.red, pos: [-6.8, -1.5, 1.2], rot: [0.2, -0.5, 0.7] },
      { w: 1, l: 4, h: 1, c: COLOR_PALETTE.blue, pos: [-4.2, -3.8, -1.0], rot: [-0.4, 0.3, -0.5] },
      { w: 2, l: 2, h: 1, c: COLOR_PALETTE.transCyan, trans: true, pos: [-7.2, 1.8, -3.0], rot: [0.8, 0.2, 0.4] },
      { w: 2, l: 4, h: 1, c: COLOR_PALETTE.darkGrey, pos: [-3.8, 4.5, 0.5], rot: [-0.2, 0.9, -0.3] },

      // Floating satellites (Right quadrant)
      { w: 2, l: 4, h: 1, c: COLOR_PALETTE.red, pos: [6.2, 2.8, -1.8], rot: [-0.5, 0.6, 0.3] },
      { w: 2, l: 2, h: 1, c: COLOR_PALETTE.yellow, pos: [5.4, -2.4, 0.8], rot: [0.3, -0.7, -0.2] },
      { w: 2, l: 4, h: 1, c: COLOR_PALETTE.blue, pos: [7.5, -0.8, -2.2], rot: [0.7, 0.4, -0.6] },
      { w: 1, l: 4, h: 1, c: COLOR_PALETTE.white, pos: [4.6, 4.2, -1.2], rot: [-0.3, -0.5, 0.8] },
      { w: 2, l: 2, h: 1, c: COLOR_PALETTE.transAmber, trans: true, pos: [6.8, -4.0, 1.5], rot: [0.4, 0.8, -0.1] },

      // Depth layers (Deep background / Foreground framing)
      { w: 2, l: 4, h: 1, c: COLOR_PALETTE.black, pos: [-2.5, -5.2, -4.5], rot: [0.2, 0.1, 0.5] },
      { w: 2, l: 2, h: 1, c: COLOR_PALETTE.yellow, pos: [3.2, 5.8, -5.0], rot: [-0.4, 0.6, -0.2] },
      { w: 1, l: 2, h: 1, c: COLOR_PALETTE.transCyan, trans: true, pos: [0.0, -4.5, 2.5], rot: [0.5, -0.3, 0.4] },
      { w: 2, l: 2, h: 1, c: COLOR_PALETTE.red, pos: [-1.8, 4.8, 1.8], rot: [-0.2, 0.7, 0.1] },
    ];

    brickConfigs.forEach((cfg, index) => {
      const brick = createBrickGroup(cfg.w, cfg.l, cfg.h, cfg.c, cfg.trans);
      const initPos = new THREE.Vector3(...(cfg.pos as [number, number, number]));
      brick.position.copy(initPos);

      const initRot = new THREE.Euler(...(cfg.rot as [number, number, number]));
      brick.rotation.copy(initRot);

      // Vector outward from center for exploded view
      const explodeDir = initPos.clone().normalize();
      if (explodeDir.lengthSq() < 0.01) {
        explodeDir.set((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 1).normalize();
      }
      const explodedPos = initPos.clone().add(explodeDir.multiplyScalar(3.8 + Math.random() * 2.5));

      rootAssembly.add(brick);

      floatingBricks.push({
        group: brick,
        initialPos: initPos,
        explodedPos: explodedPos,
        initialRot: initRot,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.006
        ),
        floatPhase: index * 0.45,
        floatAmplitude: 0.15 + (index % 3) * 0.08,
        floatFreq: 0.8 + (index % 4) * 0.25,
        impulse: new THREE.Vector3(0, 0, 0),
        impulseRot: new THREE.Vector3(0, 0, 0),
      });
    });

    // 6. Raycasting for interactive click & hover impulses
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      stateRef.current.mouse.set(x, y);
      pointer.set(x, y);
    };

    const handleClick = (e: MouseEvent) => {
      if (!interactiveMode) return;
      const rect = container.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(rootAssembly.children, true);

      if (intersects.length > 0) {
        // Find which floating brick was hit
        let hitGroup: THREE.Object3D | null = intersects[0].object;
        while (hitGroup && hitGroup.parent && hitGroup.parent !== rootAssembly) {
          hitGroup = hitGroup.parent;
        }

        if (hitGroup) {
          const item = floatingBricks.find((b) => b.group === hitGroup);
          if (item) {
            // Apply physical kinetic recoil & spin
            const clickDir = intersects[0].point.clone().sub(camera.position).normalize();
            item.impulse.add(clickDir.multiplyScalar(1.2));
            item.impulseRot.set(
              (Math.random() - 0.5) * 0.35,
              (Math.random() - 0.5) * 0.4,
              (Math.random() - 0.5) * 0.35
            );
            soundEffects.playBrickSnap(1.0 + (Math.random() - 0.5) * 0.3);
          }
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('click', handleClick);

    // 7. Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let frameId = 0;
    let clock = new THREE.Clock();

    function updateLightingTheme(preset: LightingPreset) {
      if (preset === 'neon') {
        keyLight.color.setHex(0x06b6d4); // Cyan
        keyLight.intensity = 3.2;
        fillLight.color.setHex(0xe3000b); // Neon red
        fillLight.intensity = 2.4;
        rimLight.color.setHex(0xd946ef); // Purple/magenta
        rimLight.intensity = 4.0;
        ambientLight.intensity = 0.45;
        fog.color.setHex(0x07090e);
      } else if (preset === 'golden') {
        keyLight.color.setHex(0xf59e0b); // Golden amber
        keyLight.intensity = 3.8;
        fillLight.color.setHex(0x38bdf8); // Sky blue
        fillLight.intensity = 1.2;
        rimLight.color.setHex(0xffedd5); // Soft cream
        rimLight.intensity = 2.5;
        ambientLight.intensity = 0.5;
        fog.color.setHex(0x0d0d12);
      } else if (preset === 'monochrome') {
        keyLight.color.setHex(0xffffff);
        keyLight.intensity = 3.0;
        fillLight.color.setHex(0x94a3b8);
        fillLight.intensity = 1.5;
        rimLight.color.setHex(0xffffff);
        rimLight.intensity = 2.0;
        ambientLight.intensity = 0.35;
        fog.color.setHex(0x09090b);
      } else {
        // 'studio' Clean LEGO classic
        keyLight.color.setHex(0xffe600); // Lego yellow
        keyLight.intensity = 2.6;
        fillLight.color.setHex(0x0055bf); // Lego blue
        fillLight.intensity = 1.8;
        rimLight.color.setHex(0xe3000b); // Lego red
        rimLight.intensity = 3.2;
        ambientLight.intensity = 0.6;
        fog.color.setHex(0x07090e);
      }
    }

    const targetPos = new THREE.Vector3();

    const tick = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Update lights according to active preset
      updateLightingTheme(stateRef.current.lightingPreset);

      // Smooth camera parallax based on mouse
      const mouseX = stateRef.current.mouse.x;
      const mouseY = stateRef.current.mouse.y;
      camera.position.x = THREE.MathUtils.damp(camera.position.x, mouseX * 2.2, 2.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 1 - mouseY * 1.6, 2.5, delta);
      camera.lookAt(0, 0, 0);

      // Assembly slow orbital rotation
      rootAssembly.rotation.y += delta * 0.06;

      // Animate each floating brick
      const isExploded = stateRef.current.exploded;

      for (let i = 0; i < floatingBricks.length; i++) {
        const item = floatingBricks[i];

        // Base target position (exploded vs assembled)
        targetPos.copy(isExploded ? item.explodedPos : item.initialPos);

        // Add harmonic zero-gravity float
        const floatOffset = Math.sin(elapsed * item.floatFreq + item.floatPhase) * item.floatAmplitude;
        targetPos.y += floatOffset;
        targetPos.x += Math.cos(elapsed * item.floatFreq * 0.7 + item.floatPhase) * (item.floatAmplitude * 0.5);

        // Damped interpolation to target pos + decay impulses
        item.group.position.x = THREE.MathUtils.damp(item.group.position.x, targetPos.x + item.impulse.x, 3.5, delta);
        item.group.position.y = THREE.MathUtils.damp(item.group.position.y, targetPos.y + item.impulse.y, 3.5, delta);
        item.group.position.z = THREE.MathUtils.damp(item.group.position.z, targetPos.z + item.impulse.z, 3.5, delta);

        item.impulse.multiplyScalar(Math.exp(-4 * delta));

        // Rotations
        item.group.rotation.x += item.rotationSpeed.x + item.impulseRot.x;
        item.group.rotation.y += item.rotationSpeed.y + item.impulseRot.y;
        item.group.rotation.z += item.rotationSpeed.z + item.impulseRot.z;

        item.impulseRot.multiplyScalar(Math.exp(-3 * delta));
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    if (reduceMotion) {
      renderer.render(scene, camera);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js objects
      studGeometry.dispose();
      reusableMaterials.forEach((m) => m.dispose());
      scene.clear();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactiveMode]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden"
      style={{ touchAction: 'none' }}
      title="Haz clic en cualquier pieza LEGO 3D flotante para interactuar con su física"
    />
  );
};
