uniform float uTime;
uniform float uRadius;

attribute vec3 velocity;

varying vec3 vPosition;

// Source: https://github.com/dmnsgn/glsl-rotate/blob/main/rotation-3d-y.glsl.js
mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}


void main() {
    float size = 3000.0;
    vec3 v = velocity * uTime;

    vec4 modelPosition = modelMatrix * vec4(position , 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

//     gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); // not working as intended
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); // working as intended
    gl_Position = projectedPosition; // working as intended


    gl_PointSize = size;
    // Size attenuation;
    gl_PointSize *= (1.0 / -viewPosition.z);
}
