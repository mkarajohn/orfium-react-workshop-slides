// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useRef } from 'react';

function Particles(props) {
  const status = useRef('uninitialized');

  useEffect(function () {
    if (status.current !== 'uninitialized') {
      return;
    }

    status.current = 'initializing';

    // 'To actually be able to display anything with Three.js, we need three things:
    // A scene, a camera, and a renderer so we can render the scene with the camera.'
    // - https://threejs.org/docs/#Manual/Introduction/Creating_a_scene
    let camera, scene, renderer;

    let mouseX = 0,
      mouseY = 0,
      windowHalfX,
      windowHalfY,
      materials,
      parameters;

    let stats;

    init();
    status.current = 'initialized';
    animate();

    function init() {
      const container = document.getElementById('particles');
      const HEIGHT = window.innerHeight;
      const WIDTH = window.innerWidth;
      windowHalfX = WIDTH / 2;
      windowHalfY = HEIGHT / 2;

      materials = [];

      const fieldOfView = 75;
      const aspectRatio = WIDTH / HEIGHT;
      const nearPlane = 1;
      const farPlane = 3000;

      // fieldOfView — Camera frustum vertical field of view.
      // aspectRatio — Camera frustum aspect ratio.
      // nearPlane — Camera frustum near plane.
      // farPlane — Camera frustum far plane.

      // - https://threejs.org/docs/#Reference/Cameras/PerspectiveCamera

      // In geometry, a frustum (plural: frusta or frustums)
      // is the portion of a solid (normally a cone or pyramid)
      // that lies between two parallel planes cutting it. - wikipedia.

      const cameraZ = farPlane / 3; /*	So, 1000? Yes! move on!	*/
      const fogHex = 0x000000; /* As black as your heart.	*/
      const fogDensity = 0.0007; /* So not terribly dense?	*/

      camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
      camera.position.z = cameraZ;

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(fogHex, fogDensity);

      const geometry = new THREE.Geometry();

      const particleCount = 5000;

      // Particle motion

      for (let i = 0; i < particleCount; i++) {
        const vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2000 - 1000;
        vertex.y = Math.random() * 2000 - 1000;
        vertex.z = Math.random() * 2000 - 1000;

        geometry.vertices.push(vertex);
      }

      parameters = [
        [[1, 1, 0.5], 5],
        [[0.95, 1, 0.5], 4],
        [[0.9, 1, 0.5], 3],
        [[0.85, 1, 0.5], 2],
        [[0.8, 1, 0.5], 1],
      ];
      const parameterCount = parameters.length;

      for (let i = 0; i < parameterCount; i++) {
        const color = parameters[i][0];
        const size = parameters[i][1];

        materials[i] = new THREE.PointCloudMaterial({
          size: size,
          map: createCircleTexture('#fff', 256),
          transparent: true,
          depthWrite: true,
        });

        const particles = new THREE.PointCloud(geometry, materials[i]);

        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 6;

        scene.add(particles);
      }

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio); /*	Probably 1; unless you're fancy.	*/
      renderer.setSize(WIDTH, HEIGHT); /*	Full screen	*/

      renderer.domElement.classList.add('transition-opacity');
      renderer.domElement.classList.add('fade-in-animation');

      container.appendChild(renderer.domElement);

      // I don't know about you, but I like to know how bad my
      // code is wrecking the performance of a user's machine.
      // Let's see some damn stats!

      stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.top = '0px';
      stats.domElement.style.right = '0px';
      container.appendChild(stats.domElement);

      // Event Listeners

      window.addEventListener('resize', onWindowResize, false);
      document.addEventListener('keydown', onKeyDown, false);
      // document.addEventListener('mousemove', onDocumentMouseMove, false);
      // document.addEventListener('touchstart', onDocumentTouchStart, false);
      // document.addEventListener('touchmove', onDocumentTouchMove, false);
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
      stats.update();
    }

    function render() {
      const time = Date.now() * 0.00005;

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;

      camera.lookAt(scene.position);

      for (let i = 0; i < scene.children.length; i++) {
        const object = scene.children[i];

        if (object instanceof THREE.PointCloud) {
          object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
        }
      }

      for (let i = 0; i < materials.length; i++) {
        const color = parameters[i][0];

        // const h = ((360 * (color[0] + time)) % 360) / 360;
        // materials[i].color.setHSL(h, color[1], color[2]);
      }

      renderer.render(scene, camera);
    }

    function createCircleTexture(color, size) {
      const matCanvas = document.createElement('canvas');
      matCanvas.width = matCanvas.height = size;
      const matContext = matCanvas.getContext('2d');
      // create texture object from canvas.
      const texture = new THREE.Texture(matCanvas);
      // Draw a circle
      const center = size / 2;
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

    function onDocumentMouseMove(e) {
      mouseX = e.clientX - windowHalfX;
      mouseY = e.clientY - windowHalfY;
    }

    function onKeyDown(e: KeyboardEvent) {
      function randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

      if (e.key === 'ArrowRight') {
        mouseX = randomIntFromInterval(500, 800);
        // mouseX = camera.position.x * randomIntFromInterval(500, 700);
      }
      if (e.key === 'ArrowLeft') {
        mouseX = -randomIntFromInterval(500, 800);
        // mouseX = camera.position.x * randomIntFromInterval(500, 700) * -1;
      }
    }

    function onDocumentTouchStart(e) {
      if (e.touches.length === 1) {
        e.preventDefault();
        mouseX = e.touches[0].pageX - windowHalfX;
        mouseY = e.touches[0].pageY - windowHalfY;
      }
    }

    function onDocumentTouchMove(e) {
      if (e.touches.length === 1) {
        e.preventDefault();
        mouseX = e.touches[0].pageX - windowHalfX;
        mouseY = e.touches[0].pageY - windowHalfY;
      }
    }

    function onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    return function () {
      // window.removeEventListener('resize', onWindowResize, false);
      // document.removeEventListener('mousemove', onDocumentMouseMove, false);
      // document.removeEventListener('touchstart', onDocumentTouchStart, false);
      // document.removeEventListener('touchmove', onDocumentTouchMove, false);
    };
  }, []);

  return <div id="particles"></div>;
}

export default Particles;
