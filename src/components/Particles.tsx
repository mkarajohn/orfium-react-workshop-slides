import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
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

    let height = window.innerHeight;
    let width = window.innerWidth;
    let aspectRatio = width / height; // aspect ratio — Camera frustum aspect ratio.
    const container = document.getElementById('particles') as HTMLElement;

    // In geometry, a frustum (plural: frusta or frustums)
    // is the portion of a solid (normally a cone or pyramid)
    // that lies between two parallel planes cutting it. - wikipedia.

    const FOV = 75; // FOV — Camera frustum vertical field of view.
    const NEAR_PLANE = 1; // near plane — Camera frustum near plane.
    const FAR_PLANE = 3000; // far plane — Camera frustum far plane.
    const CAMERA_Z = FAR_PLANE / 6;
    const FOG_HEX = 0x000000;
    const FOG_DENSITY = 0.0007;
    const PARTICLE_COUNT = 10000;
    const SPHERE_RADIUS = CAMERA_Z * 2.4;
    const X_AXIS = new Vector3(1, 0, 0);
    const Y_AXIS = new Vector3(0, 1, 0);
    const Z_AXIS = new Vector3(0, 0, 1);

    let camera: THREE.PerspectiveCamera,
      scene: THREE.Scene,
      renderer: THREE.WebGLRenderer,
      stats: Stats;

    // "particles", and more specifically the "positionVector" is another way to
    // say "vertices". These vertices then get added to the particlesGeometry
    const particles: { positionVector: Vector3; velocityVector: Vector3 }[] = [];
    let pointsCloud: THREE.Points;
    let pointsCloudRotationRate = 0.002;

    let mouseDx = 0,
      mouseDy = 0;

    status.current = 'initializing';
    init();
    initStats();
    initGUI();
    status.current = 'initialized';
    setupDOM();
    animate();

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(FOV, aspectRatio, NEAR_PLANE, FAR_PLANE);
      renderer = new THREE.WebGLRenderer();

      addParticles();
      scene.fog = new THREE.FogExp2(FOG_HEX, FOG_DENSITY);
      camera.position.z = CAMERA_Z;
      renderer.setSize(width, height); /*	Full screen	*/
      renderer.setPixelRatio(window.devicePixelRatio); /*	Probably 1; unless you're fancy.	*/

      container.appendChild(renderer.domElement);
    }

    function addParticles() {
      const circleTexture = createCircleTexture(`rgba(255,255,255, 0.7`, 256);
      const particlesGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
      const particleMaterials: THREE.PointsMaterialParameters = {
        transparent: true,
        depthWrite: true,
        map: circleTexture,
      };

      // Particle positions
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const positionVector = setRandomPointInSphere(SPHERE_RADIUS);

        particles.push({
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
      const params = new URLSearchParams(window.location.search);
      if (!params.has('stats')) {
        return;
      }

      stats = new Stats();
      container.appendChild(stats.dom);
    }

    function setupDOM() {
      renderer.domElement.classList.add('transition-opacity');
      renderer.domElement.classList.add('fade-in-animation');

      // Event Listeners
      window.addEventListener('resize', onWindowResize, false);
      document.addEventListener('keyup', onKeyDown, false);
      // document.addEventListener('mousemove', __onDocumentMouseMove, false);
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
      if (stats) {
        stats.update();
      }
    }

    function render() {
      pointsCloud.rotateOnAxis(X_AXIS, toRadians(mouseDx * 0.01) || 0);
      pointsCloud.rotateOnAxis(Y_AXIS, toRadians(mouseDy * 0.01) || pointsCloudRotationRate);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // get the particle
        const { positionVector, velocityVector } = particles[i];

        // move it by its velocity vector
        positionVector.add(velocityVector);

        // if new position places it outside the sphere negate its velocity
        if (positionVector.length() > SPHERE_RADIUS) {
          velocityVector.negate();
        }

        // update the particles position array of the pointsCloud geometry
        positionVector.toArray(pointsCloud.geometry.attributes.position.array, i * 3);
      }

      pointsCloud.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }

    function onWindowResize() {
      height = window.innerHeight;
      width = window.innerWidth;
      aspectRatio = width / height;

      camera.aspect = aspectRatio;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    let timeout: NodeJS.Timer;
    const originalRotationRate = pointsCloudRotationRate;

    function onKeyDown(e: KeyboardEvent) {
      clearTimeout(timeout);
      mouseDx = 0;
      mouseDy = 0;

      if (e.key === 'ArrowLeft') {
        pointsCloudRotationRate = toRadians(1);
      }

      if (e.key === 'ArrowRight') {
        pointsCloudRotationRate = -toRadians(1);
      }

      timeout = setTimeout(() => {
        pointsCloudRotationRate =
          pointsCloudRotationRate < 0 ? -originalRotationRate : originalRotationRate;
        // pointsCloudRotationRate = originalRotationRate;

        clearTimeout(timeout);
      }, 700);
    }

    let prevMouseX = 0;
    let prevMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    function __onDocumentMouseMove(e: MouseEvent) {
      prevMouseX = currentMouseX;
      currentMouseX = e.clientX;
      prevMouseY = currentMouseY;
      currentMouseY = e.clientY;

      mouseDx = prevMouseX - currentMouseX;
      mouseDy = prevMouseY - currentMouseY;
    }

    function initGUI() {
      const params = new URLSearchParams(window.location.search);
      if (!params.has('controls')) {
        return;
      }

      new OrbitControls(camera, renderer.domElement);

      const controls = {
        pointsCloudRotationRate: pointsCloudRotationRate,
        particleCount: PARTICLE_COUNT,
        cameraDistance: CAMERA_Z,
      };

      const gui = new GUI();

      gui.add(controls, 'pointsCloudRotationRate').onChange(function (value: string) {
        pointsCloudRotationRate = Number(value);
      });
      gui.add(controls, 'cameraDistance').onChange(function (value: string) {
        camera.position.z = Number(value);
      });
      gui.add(controls, 'particleCount').onChange(function (value: string) {
        pointsCloud.geometry.setDrawRange(0, Number(value));
      });
    }
  }, []);

  return <div id="particles"></div>;
}

export default Particles;
