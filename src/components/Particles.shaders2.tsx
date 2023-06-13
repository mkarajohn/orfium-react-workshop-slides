import { useEffect } from 'react';
import { useRevealJSInstance } from 'react-revealjs-with-code-surfer';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

function ParticlesShaders() {
  const revealInstance = useRevealJSInstance();

  useEffect(
    function () {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x202020);
      const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
      camera.position.set(0, 0, 10);
      camera.lookAt(scene.position);
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      renderer.setSize(innerWidth, innerHeight);
      //renderer.setClearColor(0x404040);
      document.body.appendChild(renderer.domElement);
      window.addEventListener('resize', () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
      });

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      const light = new THREE.DirectionalLight(0xffffff, 0.8);
      light.position.setScalar(1);
      scene.add(light, new THREE.AmbientLight(0xff8888, 0.2));

      //scene.add(new THREE.GridHelper());

      const gu = {
        time: { value: 0 },
      };

      const amount = 10000;
      const inits = new Array(amount)
        .fill(undefined)
        .map(() => {
          const v = new THREE.Vector3().randomDirection();

          return [v.x, v.y, v.z, Math.random() * 2 - 1];
        })
        .flat();

      const g = new THREE.BufferGeometry().setFromPoints(
        new Array(amount).fill(undefined).map(() => {
          return new THREE.Vector3();
        })
      );
      g.setAttribute('inits', new THREE.Float32BufferAttribute(inits, 4));
      const u = {
        radius: { value: 5 },
        speed: { value: 0.25 },
      };
      const m = new THREE.PointsMaterial({
        color: 0xff8800,
        size: 0.1,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onBeforeCompile: (shader) => {
          shader.uniforms.time = gu.time;
          shader.uniforms.radius = u.radius;
          shader.uniforms.speed = u.speed;
          shader.vertexShader = `
      uniform float time;
      uniform float radius;
      uniform float speed;
      attribute vec4 inits;
      float euclideanModulo( float n, float m ) {
        return mod( mod( n, m ) + m , m);
      }
      float pingpong(float x, float l){
        return l - abs( euclideanModulo( x, l * 2. ) - l );
      }
      ${shader.vertexShader}
    `.replace(
            `#include <begin_vertex>`,
            `#include <begin_vertex>
        float t = time * speed;
        float startRadius = inits.w * radius;
        float currentDist = -radius + (startRadius + t + radius);
        float ppVal = pingpong(currentDist, radius * 2.);
        transformed = (-radius + ppVal) * inits.xyz;
      
      `
          );
          console.log(shader.vertexShader);
        },
      });
      const p = new THREE.Points(g, m);
      scene.add(p);

      const gui = new GUI();
      gui.add(u.radius, 'value', 2, 5).name('radius');
      gui.add(u.speed, 'value', 0.1, 1).name('speed');

      const clock = new THREE.Clock();

      renderer.setAnimationLoop(() => {
        gu.time.value = clock.getElapsedTime();
        controls.update();
        renderer.render(scene, camera);
      });
    },
    [revealInstance]
  );

  return <div id="particles"></div>;
}

export default ParticlesShaders;
