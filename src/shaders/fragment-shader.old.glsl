varying vec3 vPosition;

void main() {
  vec3 color = vec3(1.0);
  float circle = 1.0 - step(0.5, length(vPosition.x));

  gl_FragColor = vec4(color, 0.7) * circle;
}