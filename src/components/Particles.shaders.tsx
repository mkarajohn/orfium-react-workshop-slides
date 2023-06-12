import fShader from '@/shaders/fragment-shader.glsl';
import vShader from '@/shaders/vertex-shader.glsl';
import { useEffect, useRef } from 'react';
import { useRevealJSInstance } from 'react-revealjs-with-code-surfer';
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

const uniforms = {
  uTime: { value: 0 },
  uRadius: { value: 1500 },
};

const vShaderOld = `
uniform float uTime;
uniform int uRadius;

attribute vec3 velocity;

varying vec3 vPosition;

void main() {
  vPosition = position;
  vec3 vel = velocity * uTime;
  float size = 100.0;
  
  if (length(position) > float(uRadius)) {
    vel = vel * -1.0;
  }
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position + vel, 1.0);
  gl_PointSize = size * (1.0 / vPosition.z);
}`;

const fShaderOld = `
varying vec3 vPosition;

void main() {
  vec3 color = vec3(1.0);
  float circle = 1.0 - step(0.5, length(vPosition.x));
  
  gl_FragColor = vec4(color, 0.7) * circle;
}`;

const shaderMaterial = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: vShader,
  fragmentShader: fShader,
  transparent: true,
  depthWrite: false,
  wireframe: true,
});

function ParticlesShaders() {
  const status = useRef('uninitialized');

  const revealInstance = useRevealJSInstance();

  useEffect(
    function () {
      if (status.current !== 'uninitialized') {
        return;
      }

      if (revealInstance === null) {
        return;
      }

      const onRevealEvent = revealInstance.on;
      const revealGetSlideIndex = revealInstance.getIndices;

      let height = window.innerHeight;
      let width = window.innerWidth;
      let aspectRatio = width / height; // aspect ratio — Camera frustum aspect ratio.
      const container = document.getElementById('particles') as HTMLElement;

      // In geometry, a frustum (plural: frusta or frustums)
      // is the portion of a solid (normally a cone or pyramid)
      // that lies between two parallel planes cutting it. - wikipedia.

      const FOV = 75; // FOV — Camera frustum vertical field of view.
      const CAMERA_Z = 500;
      const NEAR_PLANE = 1; // near plane — Camera frustum near plane.
      const FAR_PLANE = 3000; // far plane — Camera frustum far plane.
      const FOG_HEX = 0x000000;
      const FOG_DENSITY = 0.0007;
      const PARTICLE_COUNT = 10000;
      const SPHERE_RADIUS = 1500;
      const POINTS_CLOUD_DEFAULT_ROTATION_RATE = 0.002;
      const X_AXIS = new Vector3(1, 0, 0);
      const Y_AXIS = new Vector3(0, 1, 0);

      let camera: THREE.PerspectiveCamera,
        scene: THREE.Scene,
        renderer: THREE.WebGLRenderer,
        stats: Stats;

      // "particles", and more specifically the "positionVector" is another way to
      // say "vertices". These vertices then get added to the particlesGeometry
      const particles: { positions: Float32Array; velocities: Float32Array } = {
        positions: new Float32Array(PARTICLE_COUNT * 3),
        velocities: new Float32Array(PARTICLE_COUNT * 3),
      };
      let pointsCloud: THREE.Points;
      let pointsCloudCurrentRotationRate = POINTS_CLOUD_DEFAULT_ROTATION_RATE;

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
        // scene.fog = new THREE.FogExp2(FOG_HEX, FOG_DENSITY);
        camera.position.z = CAMERA_Z;
        renderer.setSize(width, height); /*	Full screen	*/
        renderer.setPixelRatio(window.devicePixelRatio); /*	Probably 1; unless you're fancy.	*/

        container.appendChild(renderer.domElement);
      }

      function addParticles() {
        const particlesGeometry = new THREE.BufferGeometry();

        // Particle positions
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const positionVector = setRandomPointInSphere(SPHERE_RADIUS);
          const velocityVector = new THREE.Vector3(
            -1 + Math.random() * 2,
            -1 + Math.random() * 2,
            -1 + Math.random() * 2
          );

          // dump to particle positions array
          positionVector.toArray(particles.positions, i * 3);
          // dump to particle velocities array
          velocityVector.toArray(particles.velocities, i * 3);
        }

        particlesGeometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(particles.positions, 3).setUsage(THREE.DynamicDrawUsage)
        );

        particlesGeometry.setAttribute(
          'velocity',
          new THREE.Float32BufferAttribute(particles.velocities, 3).setUsage(THREE.DynamicDrawUsage)
        );

        pointsCloud = new THREE.Points(particlesGeometry, shaderMaterial);

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

        onRevealEvent('slidechanged', (e) => {
          const ev = e as Event & { currentSlide: HTMLElement; previousSlide: HTMLElement };
          const currentIndex = revealGetSlideIndex(ev.currentSlide);
          const previousIndex = revealGetSlideIndex(ev.previousSlide);

          if (currentIndex.h > previousIndex.h) {
            pointsCloudCurrentRotationRate = -toRadians(1);
          }
          if (currentIndex.h < previousIndex.h) {
            pointsCloudCurrentRotationRate = toRadians(1);
          }
        });

        onRevealEvent('slidetransitionend', () => {
          pointsCloudCurrentRotationRate =
            pointsCloudCurrentRotationRate > 0
              ? POINTS_CLOUD_DEFAULT_ROTATION_RATE
              : -POINTS_CLOUD_DEFAULT_ROTATION_RATE;
        });

        // Event Listeners
        window.addEventListener('resize', onWindowResize, false);
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
        pointsCloud.rotateOnAxis(
          Y_AXIS,
          toRadians(mouseDy * 0.01) || pointsCloudCurrentRotationRate
        );

        shaderMaterial.uniforms.uTime.value++;

        // const { positions, velocities } = particles;
        //
        // for (let i = 0; i < PARTICLE_COUNT; i += 3) {
        //   const particlePosition = new Vector3(positions[i], positions[i + 1], positions[i + 2]);
        //   const particleVelocity = new Vector3(velocities[i], velocities[i + 1], velocities[i + 2]);
        //
        //   // move it by its velocity vector
        //   particlePosition.add(particleVelocity);
        //
        //   // if new position places it outside the sphere negate its velocity
        //   if (particlePosition.length() > SPHERE_RADIUS) {
        //     particleVelocity.negate();
        //   }
        //
        //   // update the particles position array of the pointsCloud geometry
        //   particlePosition.toArray(particles.positions, i * 3);
        //   particleVelocity.toArray(particles.velocities, i * 3);
        //
        //   particlePosition.toArray(pointsCloud.geometry.attributes.position.array, i * 3);
        //   particleVelocity.toArray(pointsCloud.geometry.attributes.velocity.array, i * 3);
        // }
        // //
        // // mark the geometry vertex positions as needing to be updated during the next render
        // pointsCloud.geometry.attributes.position.needsUpdate = true;
        // pointsCloud.geometry.attributes.velocity.needsUpdate = true;

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
          pointsCloudRotationRate: pointsCloudCurrentRotationRate,
          particleCount: PARTICLE_COUNT,
          cameraDistance: CAMERA_Z,
        };

        const gui = new GUI();

        gui.add(controls, 'pointsCloudRotationRate').onChange(function (value: string) {
          pointsCloudCurrentRotationRate = Number(value);
        });
        gui.add(controls, 'cameraDistance').onChange(function (value: string) {
          camera.position.z = Number(value);
        });
        gui.add(controls, 'particleCount').onChange(function (value: string) {
          pointsCloud.geometry.setDrawRange(0, Number(value));
        });
      }
    },
    [revealInstance]
  );

  return <div id="particles"></div>;
}

export default ParticlesShaders;
