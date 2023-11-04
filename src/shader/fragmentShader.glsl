precision mediump float;
varying float vrandom;
varying vec2 vuv;
varying float ydep;

uniform sampler2D uchina;
uniform vec3 color1;
uniform vec3 color2;

void main() {
  
  // float single= mod(vuv.x * 10.0, 2.0);
  // single = step(0.8,single);
  vec3 tarcolor=mix(color1,color2,ydep);
  gl_FragColor = vec4(tarcolor, 1.0);
  // gl_FragColor = vec4(vec3(vuv.x, vuv.y, 0.93), 1.0);
  



  // vec4 textcolor = texture2D(uchina,vuv);
  // gl_FragColor = textcolor;
}