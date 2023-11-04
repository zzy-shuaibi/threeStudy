<template>
  <div id="app" ref="app">
    <div class="home" ref="home"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { Scene } from "@/categroy/scene";
import gsap from "gsap";
import { Water } from "three/examples/jsm/objects/Water2";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import vertexShader from "@/shader/vertexShader.glsl";
import fragmentShader from "@/shader/fragmentShader.glsl";
import CANNON from "cannon";
import * as dat from "dat.gui";
const clock = new THREE.Clock();
export default {
  name: "App",

  data() {
    return {
      scene1: null,
      cube1: null,
      control1: null,
      raycaster: new THREE.Raycaster(),
      points: "",
      pointgeo: "",
      count: 10000,
      world: new CANNON.World(),
      dat: new dat.GUI(),
      oldtime: 0,
      pyobjs: [],
      creat: {},
      mixanim: null,
      ls: null,
    };
  },

  methods: {
    render() {
      this.control1.update();

      const time = clock.getElapsedTime();
      const steptime = time - this.oldtime;
      this.oldtime = time;
      this.world.step(1 / 60, steptime, 3);
      if (this.mixanim != null) this.mixanim.update(steptime);
      // this.pyobjs.forEach((item) => {
      //   item.three.position.copy(item.cammon.position);
      //   item.three.quaternion.copy(item.cammon.quaternion);
      //   item.cammon.applyForce(
      //     new CANNON.Vec3(Math.random() * 5, 0, Math.random() * 5),
      //     item.cammon.position
      //   );
      // });
      this.ls.uniforms.time.value = time;
      this.scene1.render();
      requestAnimationFrame(this.render);
    },

    //粒子动画
    pointsanim(colok) {
      for (let i = 0; i < this.count; i++) {
        let i3 = i * 3;
        let x = this.pointgeo.attributes.position.array[i3];
        this.pointgeo.attributes.position.array[i3 + 1] = Math.sin(colok + x);
      }
      this.pointgeo.attributes.position.needsUpdate = true;
    },
  },
  async mounted() {
    const home = this.$refs.home;
    this.world.gravity.set(0, -9.8, 0);
    this.clock = new THREE.Clock();

    this.scene1 = new Scene(home);
    this.control1 = this.scene1.controlCamers();
    // 光线
    {
      this.scene1.Lights();
      this.scene1.pointLight();
    }

    //参考系
    {
      // this.scene1.axes();
    }

    //鼠标点击
    {
      // this.scene1.mouseClick(
      //   (geo)=>{
      //   this.geoinfo=geo
      //   if(geo.object.gsapid){
      //     const igsap=this[geo.object.gsapid]
      //     igsap.isActive()?igsap.pause():igsap.resume()
      //   }
      //   }
      // )
    }

    //水
    {
      // const geometry = new THREE.PlaneGeometry(100, 100);
      // const water = new Water(geometry, {
      //   textureHeight: 512,
      //   textureWidth: 512,
      //   color: 0xbbbbff,
      //   flowDirection: new THREE.Vector2(1, 1),
      //   scale: 2,
      //   normalMap0: new THREE.TextureLoader().load(
      //     require("@/assets/Water_1_M_Normal.jpg")
      //   ),
      //   normalMap1: new THREE.TextureLoader().load(
      //     require("@/assets/Water_2_M_Normal.jpg")
      //   ),
      // });
      // water.rotation.x -= Math.PI / 2;
      // water.position.y = -2;
      // this.scene1.scenes.add(water);
    }

    //场景
    {
      // this.scene1.sceneBackground([
      //   require("@/assets/px.jpg"),
      //   require("@/assets/nx.jpg"),
      //   require("@/assets/py.jpg"),
      //   require("@/assets/ny.jpg"),
      //   require("@/assets/pz.jpg"),
      //   require("@/assets/nz.jpg"),
      // ]);
    }
    //粒子
    {
      // this.pointgeo = new THREE.BufferGeometry();
      // const texture = new THREE.TextureLoader().load(
      //   require("@/assets/snow.png")
      // );
      // const positions = new Float32Array(this.count * 3);
      // for (let i = 0; i < this.count * 3; i++) {
      //   positions[i] = (Math.random() - 0.5) * 5;
      // }
      // // position.position.set()
      // this.pointgeo.setAttribute(
      //   "position",
      //   new THREE.BufferAttribute(positions, 3)
      // );
      // const pointMaterial = new THREE.PointsMaterial();
      // pointMaterial.transparent = true;
      // pointMaterial.alphaMap = texture;
      // pointMaterial.size = 0.02;
      // pointMaterial.sizeAttenuation = true;
      // pointMaterial.depthWrite = false;
      // this.points = new THREE.Points(this.pointgeo, pointMaterial);
      // this.scene1.scenes.add(this.points);
      // this.pointsanim();
    }
    //cube
    {
      // const texture = new THREE.TextureLoader().load(
      //   require("@/assets/brick_diffuse.jpg")
      // );
      // const aotexture = new THREE.TextureLoader().load(
      //   require("@/assets/brick_bump.jpg")
      // );
      // const geo = new THREE.PlaneGeometry(1, 1, 1024, 1024);
      // const material = new THREE.MeshStandardMaterial();
      // //map最普通材质，设计物品的基础外形
      // material.map = texture;
      // //aoMap设置材质阴影
      // material.aoMap = aotexture;
      // material.aoMapIntensity = 2;
      // //displacementMap设置材质的突起和凹陷
      // material.displacementMap = aotexture;
      // material.displacementScale = 0.05;
      // this.cube1 = new THREE.Mesh(geo, material);
      // this.cube1.lights = true;
      // this.cube1.castShadow = true;
      // this.cube1.receiveShadow = true;
      // this.scene1.scenes.add(this.cube1);
    }
    //物理
    {
      // //生成带物理是方型物品
      // const pybox = (width, height, deep, position) => {
      //   //生成基础threejs物体
      //   const geometry = new THREE.BoxGeometry(width, height, deep, 32, 32);
      //   const material = new THREE.MeshBasicMaterial({
      //     color: 0xff0000,
      //   });
      //   const cube = new THREE.Mesh(geometry, material);
      //   cube.position.copy(position);
      //   //生成物理世界的物体
      //   const pybox = new CANNON.Box(
      //     new CANNON.Vec3(width * 0.5, height * 0.5, deep * 0.5)
      //   );
      //   const pybody = new CANNON.Body({
      //     mass: 1,
      //     // position: new CANNON.Vec3(0, 3, 0),
      //     shape: pybox,
      //   });
      //   pybody.position.copy(position);
      //   //物体发生碰撞后触发的函数，可以添加碰撞声音等
      //   pybody.addEventListener("collide", () => {
      //     console.log("collide");
      //   });
      //   this.scene1.scenes.add(cube);
      //   this.world.addBody(pybody);
      //   this.pyobjs.push({ three: cube, cammon: pybody });
      // };
      // //在datui中加入添加带物理的方型物品函数
      // this.creat.creatBox = () => {
      //   pybox(Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5, {
      //     x: Math.random() * 2,
      //     y: (Math.random() + 1) * 3,
      //     z: Math.random() * 2,
      //   });
      // };
      // this.dat.add(this.creat, "creatBox");
      // //生成一个初始的方型
      // pybox(1, 1, 1, { x: 0, y: 3, z: 0 });
      // //下方添加一个物理平面(无限大)
      // const planegeo = new THREE.PlaneGeometry(20, 20);
      // const planeMate = new THREE.MeshBasicMaterial({ color: 0xcccccc });
      // const plane = new THREE.Mesh(planegeo, planeMate);
      // plane.rotation.x = -Math.PI / 2;
      // this.scene1.scenes.add(plane);
      // const pyplane = new CANNON.Plane();
      // const pyplaneBody = new CANNON.Body({
      //   mass: 0,
      //   shape: pyplane,
      // });
      // pyplaneBody.quaternion.setFromAxisAngle(
      //   new CANNON.Vec3(-1, 0, 0),
      //   Math.PI / 2
      // );
      // this.world.addBody(pyplaneBody);
      // //设置材质，影响摩擦，弹力之类的
      // const defaultMate = new CANNON.Material("default");
      // const defaultConcatMate = new CANNON.ContactMaterial(
      //   defaultMate,
      //   defaultMate,
      //   { friction: 0.3, restitution: 0.5 }
      // );
      // this.world.addContactMaterial(defaultConcatMate);
      // this.world.allowSleep = true;
      // this.world.defaultContactMaterial = defaultConcatMate;
    }
    //导入模型
    {
      // const gltfLoader = new GLTFLoader();
      // const dracoLoader = new DRACOLoader();
      // dracoLoader.setDecoderPath("./draco/");
      // gltfLoader.setDRACOLoader(dracoLoader);
      // gltfLoader.load("./moudle/humberger.glb", (gltf) => {
      //   console.log(gltf);
      //   this.mixanim = new THREE.AnimationMixer(gltf.scene);
      //   const anim = this.mixanim.clipAction(gltf.animations[0]);
      //   anim.play();
      //   console.log(gltf);
      //   gltf.scene.scale.set(1, 1, 1);
      //   this.scene1.scenes.add(gltf.scene);
      // });
    }
    //着色器
    {
      const planegeo = new THREE.PlaneGeometry(10, 10, 128, 128);
      const chinatexture = new THREE.TextureLoader().load("./imgs/china.webp");
      //着色器
      const plaemeta = new THREE.RawShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
          uchina: { value: chinatexture },
          maxsin: { value: 0.4 },
          maxlang: { value: 1.0 },
          time: { value: 0 },
          color1: { value: new THREE.Color("#186691") },
          color2: { value: new THREE.Color("#9bd8ff") },
        },
        side: THREE.DoubleSide,
        transparent: true,
      });
      this.ls = plaemeta;
      this.dat
        .add(plaemeta.uniforms.maxsin, "value")
        .name("maxsin")
        .min(0.1)
        .max(2)
        .step(0.01);
      this.dat
        .add(plaemeta.uniforms.maxlang, "value")
        .name("maxlang")
        .min(0.1)
        .max(2)
        .step(0.01);
      // 给每一个坐标添加随机数
      const count = planegeo.attributes.position.count;
      const array = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        array[i] = Math.random();
      }
      planegeo.setAttribute("Arandom", new THREE.BufferAttribute(array, 1));
      //添加到场景中
      const plane = new THREE.Mesh(planegeo, plaemeta);
      plane.rotation.x = -Math.PI / 2;

      this.scene1.scenes.add(plane);
    }
    this.render();
  },
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
#app {
  position: relative;
  .geoPresnet {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
