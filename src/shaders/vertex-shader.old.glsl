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
}