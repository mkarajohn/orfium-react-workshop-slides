import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';

function createCircleTexture(color: string, size: number) {
  const matCanvas = document.createElement('canvas') as HTMLCanvasElement;
  matCanvas.width = matCanvas.height = size;
  const matContext = matCanvas.getContext('2d') as CanvasRenderingContext2D;
  const texture = new THREE.Texture(matCanvas); // create texture object from canvas.
  const center = size / 2; // Draw a circle

  matContext.beginPath();
  matContext.arc(center, center, size / 2, 0, 2 * Math.PI, false);
  matContext.closePath();
  matContext.fillStyle = color;
  matContext.fill();

  // need to set needsUpdate
  texture.needsUpdate = true;

  // return a texture made from the canvas
  return texture;
}

function setRandomPointInSphere(radius: number): THREE.Vector3 {
  const vertex = new THREE.Vector3(
    THREE.MathUtils.randFloatSpread(radius * 2),
    THREE.MathUtils.randFloatSpread(radius * 2),
    THREE.MathUtils.randFloatSpread(radius * 2)
  );
  if (vertex.length() > radius) {
    return setRandomPointInSphere(radius);
  }

  return vertex;
}

function randomIntFromRange(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

function Particles() {
  const status = useRef('uninitialized');

  useEffect(function () {
    if (status.current !== 'uninitialized') {
      return;
    }

    const container = document.getElementById('particles') as HTMLElement;

    // In geometry, a frustum (plural: frusta or frustums)
    // is the portion of a solid (normally a cone or pyramid)
    // that lies between two parallel planes cutting it. - wikipedia.

    const FOV = 75; // FOV — Camera frustum vertical field of view.
    const HEIGHT = window.innerHeight;
    const WIDTH = window.innerWidth;
    const ASPECT_RATIO = WIDTH / HEIGHT; // aspect ratio — Camera frustum aspect ratio.
    const NEAR_PLANE = 1; // near plane — Camera frustum near plane.
    const FAR_PLANE = 3000; // far plane — Camera frustum far plane.
    const CAMERA_Z = FAR_PLANE / 3;
    const FOG_HEX = 0x000000;
    const FOG_DENSITY = 0.0007;
    const PARTICLE_COUNT = 10000;
    const SPHERE_RADIUS = CAMERA_Z * 1.4;

    // 'To actually be able to display anything with Three.js, we need three things:
    // A scene, a camera, and a renderer, so we can render the scene with the camera.'
    // - https://threejs.org/docs/#Manual/Introduction/Creating_a_scene
    let camera: THREE.PerspectiveCamera,
      scene: THREE.Scene,
      renderer: THREE.WebGLRenderer,
      stats: Stats;

    let pointsCloud: THREE.Points;
    let particlePositions: Float32Array;
    let particlesData: { positionVector: Vector3; velocityVector: Vector3 }[];

    let mouseX = 0,
      mouseY = 0;
    let windowHalfX = WIDTH / 2;
    let windowHalfY = HEIGHT / 2;

    let rotationRate = 0.002;

    status.current = 'initializing';
    initStats();
    init();
    status.current = 'initialized';
    setupDOM();
    animate();

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR_PLANE, FAR_PLANE); // https://threejs.org/docs/#Reference/Cameras/PerspectiveCamera
      renderer = new THREE.WebGLRenderer();

      new OrbitControls(camera, renderer.domElement);

      addParticles();
      scene.fog = new THREE.FogExp2(FOG_HEX, FOG_DENSITY);
      camera.position.z = CAMERA_Z / 2;
      renderer.setSize(WIDTH, HEIGHT); /*	Full screen	*/
      renderer.setPixelRatio(window.devicePixelRatio); /*	Probably 1; unless you're fancy.	*/
    }

    function addParticles() {
      const circleTexture = createCircleTexture(`rgba(255,255,255, 0.7`, 256);
      const particlesGeometry = new THREE.BufferGeometry();
      particlePositions = new Float32Array(PARTICLE_COUNT * 3);
      particlesData = [];
      const particleMaterials: THREE.PointsMaterialParameters = {
        transparent: true,
        depthWrite: true,
        map: circleTexture,
      };

      // Particle positions
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const positionVector = setRandomPointInSphere(SPHERE_RADIUS);

        particlesData.push({
          positionVector,
          velocityVector: new THREE.Vector3(
            -1 + Math.random() * 2,
            -1 + Math.random() * 2,
            -1 + Math.random() * 2
          ),
        });

        // dump to particlePositions array
        positionVector.toArray(particlePositions, i * 3);
      }

      particlesGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage)
      );

      pointsCloud = new THREE.Points(
        particlesGeometry,
        new THREE.PointsMaterial({
          ...particleMaterials,
          size: randomIntFromRange(4, 8),
        })
      );

      pointsCloud.position.x = 0;
      pointsCloud.position.y = 0;
      pointsCloud.position.z = 0;

      scene.add(pointsCloud);
    }

    function initStats() {
      stats = new Stats();
    }

    function setupDOM() {
      renderer.domElement.classList.add('transition-opacity');
      renderer.domElement.classList.add('fade-in-animation');
      container.appendChild(renderer.domElement);

      container.appendChild(stats.dom);

      // Event Listeners
      window.addEventListener('resize', onWindowResize, false);
      document.addEventListener('keyup', onKeyDown, false);
      // document.addEventListener('mousemove', __onDocumentMouseMove, false);
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
      stats.update();
    }

    function render() {
      pointsCloud.rotateOnAxis(new Vector3(0, 1, 0), rotationRate);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // get the particle
        const { positionVector, velocityVector } = particlesData[i];

        positionVector.add(velocityVector);

        if (positionVector.length() > SPHERE_RADIUS) {
          velocityVector.negate();
        }

        // dump to particlePositions array
        positionVector.toArray(pointsCloud.geometry.attributes.position.array, i * 3);
      }

      pointsCloud.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }

    function onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    let timeout: NodeJS.Timer;
    const originalRotationRate = rotationRate;

    function onKeyDown(e: KeyboardEvent) {
      clearTimeout(timeout);

      if (e.key === 'ArrowLeft') {
        rotationRate = toRadians(1);
      }

      if (e.key === 'ArrowRight') {
        rotationRate = -toRadians(1);
      }

      timeout = setTimeout(() => {
        rotationRate = rotationRate < 0 ? -originalRotationRate : originalRotationRate;
        // rotationRate = originalRotationRate;

        clearTimeout(timeout);
      }, 700);
    }

    function __onDocumentMouseMove(e: MouseEvent) {
      mouseX = e.clientX - windowHalfX;
      mouseY = e.clientY - windowHalfY;
    }
  }, []);

  return <div id="particles"></div>;
}

export default Particles;
