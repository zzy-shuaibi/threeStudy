<template>
  <div id="app" ref="app">
    <div class="home" ref="home"></div>
    <!-- <GeoPresent
      class="geoPresnet"
      v-show="present"
      :info="geoinfo"
    ></GeoPresent> -->
  </div>
</template>

<script>
import * as THREE from "three";
import { Scene } from "@/categroy/scene";
import gsap from "gsap";
import GeoPresent from "@/components/geoPresent.vue";
import { Water } from "three/examples/jsm/objects/Water2";
const clock = new THREE.Clock();
export default {
  name: "App",

  data() {
    return {
      scene1: null,
      cube1: null,
      control1: null,
      circle1: null,
      circle2: null,
      control2: null,
      cube1Gsap: null,
      present: false,
      geoinfo: {
        distance: "11",
      },
      raycaster: new THREE.Raycaster(),
      mouse: new THREE.Vector2(),
      circles: [],
    };
  },
  components: {
    GeoPresent,
  },
  methods: {
    render() {
      this.control1.update();
      const elapsed = clock.getElapsedTime();
      this.circles.forEach((item) => {
        item.position.set(
          Math.sin(elapsed * item.speed) * item.radus,
          0,
          Math.cos(elapsed * item.speed) * item.radus
        );
      });
      this.scene1.render();
      requestAnimationFrame(this.render);
    },
    AnimationCube() {
      this.cube1Gsap = gsap
        .timeline({
          repeat: -1,
        })
        .to(this.cube1.position, { x: 5, duration: 3 })
        .to(this.cube1.position, { x: 0, duration: 3 })
        .to(this.cube1.position, { y: 5, duration: 3 })
        .to(this.cube1.position, { y: 0, duration: 3 })
        .to(this.cube1.position, { z: 5, duration: 3 })
        .to(this.cube1.position, { z: 0, duration: 3 });
      this.cube1.gsapid = "cube1Gsap";
    },
    //根据鼠标当前位置生成一个球
    pointctrcle() {
      //绑定事件

      // let tuxe = this.scene1.sceneBackground([
      //   require("@/assets/px.jpg"),
      //   require("@/assets/nx.jpg"),
      //   require("@/assets/py.jpg"),
      //   require("@/assets/ny.jpg"),
      //   require("@/assets/pz.jpg"),
      //   require("@/assets/nz.jpg"),
      // ]);

      this.circle4 = this.scene1.circle(0.5);

      this.raycaster.setFromCamera(this.mouse, this.scene1.camera);
      const intersects = this.raycaster.intersectObjects(
        this.scene1.scenes.children
      );
      if (intersects.length > 0) {
        this.circle4.position.set(
          intersects[0].point.x,
          0,
          intersects[0].point.z
        );
        this.circle4.speed = Math.random() * 2;
        this.circle4.radus = Math.sqrt(
          Math.pow(intersects[0].point.x, 2) +
            Math.pow(intersects[0].point.z, 2)
        );
        this.circle1.add(this.circle4);
        this.circles.push(this.circle4);
      }
    },
  },
  async mounted() {
    const home = this.$refs.home;
    home.addEventListener("click", () => {
      this.pointctrcle();
    });
    this.$refs.home.addEventListener(
      "mousemove",
      (e) => {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      },
      false
    );
    this.scene1 = new Scene(home);
    this.scene1.openShadow();
    this.control1 = this.scene1.controlCamers();
    this.scene1.Lights();
    this.scene1.pointLight();
    this.scene1.axes();
    const circleGeo = new THREE.SphereGeometry(1, 32, 32);
    const circleMate = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    this.circle1 = new THREE.Mesh(circleGeo, circleMate);
    this.circle1.receiveShadow = false;
    this.circle1.castShadow = false;
    this.circle1.lights = true;
    // const loader = new THREE.CubeTextureLoader();

    // const rnvmap = loader.load([
    //   require("@/assets/px.jpg"),
    //   require("@/assets/nx.jpg"),
    //   require("@/assets/py.jpg"),
    //   require("@/assets/ny.jpg"),
    //   require("@/assets/pz.jpg"),
    //   require("@/assets/nz.jpg"),
    // ]);

    // rnvmap.format = THREE.RGBFormat;
    // this.circle1 = this.scene1.circle(1);
    this.circle2 = this.scene1.circle(0.5);
    this.circle3 = this.scene1.circle(0.3);
    this.circle1.position.set(0, 0, 0);
    this.scene1.scenes.add(this.circle1);
    this.circle2.position.set(-2, -1, 0);
    this.circle1.add(this.circle2);
    this.circle2.speed = 1 / 2;
    this.circle2.radus = 5;
    this.circle3.speed = 2;
    this.circle3.radus = 2;
    this.circle2.add(this.circle3);
    this.circles.push(this.circle2, this.circle3);

    // this.scene1.mouseClick(
    //   (geo)=>{
    //   this.geoinfo=geo
    //   if(geo.object.gsapid){
    //     const igsap=this[geo.object.gsapid]
    //     igsap.isActive()?igsap.pause():igsap.resume()
    //   }
    //   }
    // )
    const geometry = new THREE.PlaneGeometry(100, 100);
    // const material = new THREE.MeshStandardMaterial({
    //   color: 0xccffff,
    //   side: THREE.DoubleSide,
    // });
    const water = new Water(geometry, {
      textureHeight: 512,
      textureWidth: 512,
      color: 0xbbbbff,
      flowDirection: new THREE.Vector2(1, 1),
      scale: 2,
      normalMap0: new THREE.TextureLoader().load(
        require("@/assets/Water_1_M_Normal.jpg")
      ),
      normalMap1: new THREE.TextureLoader().load(
        require("@/assets/Water_2_M_Normal.jpg")
      ),
    });
    water.rotation.x -= Math.PI / 2;
    water.position.y = -2;
    this.scene1.scenes.add(water);
    // const plane = new THREE.Mesh(geometry, material);
    // plane.receiveShadow = true;
    // plane.position.y = -3;
    // plane.rotation.x += Math.PI / 2;
    // this.scene1.scenes.add(plane);

    this.scene1.sceneBackground([
      require("@/assets/px.jpg"),
      require("@/assets/nx.jpg"),
      require("@/assets/py.jpg"),
      require("@/assets/ny.jpg"),
      require("@/assets/pz.jpg"),
      require("@/assets/nz.jpg"),
    ]);

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
