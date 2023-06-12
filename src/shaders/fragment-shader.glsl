varying vec3 vPosition;

void main() {
  vec3 color = vec3(1.0);
  vec2 xy = gl_PointCoord.xy - vec2(0.5);
  float ll = length(xy);
  gl_FragColor = vec4(color, step(ll, 0.5));
}
