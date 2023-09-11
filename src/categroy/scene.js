import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
export class Scene {
    constructor(el) {
        this.point = null
        this.Shadow = false
        this.el = el
        //创建一个渲染器
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.el.appendChild(this.renderer.domElement)
        //创建一个场景
        this.scenes = new THREE.Scene()
        //创建一个相机
        this.camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(1, 1, 1)
        this.scenes.add(this.camera)
    }
    //渲染
    render() {
        this.renderer.render(this.scenes, this.camera)
    }
    //渲染一个正方形
    cube(sizeArr, texture) {
        const cubeGeo = new THREE.BoxGeometry(sizeArr[0], sizeArr[1], sizeArr[2]);
        const cubeMate = new THREE.MeshLambertMaterial({ map: texture, lights: true })
        const cubeMesh = new THREE.Mesh(cubeGeo, cubeMate)
        this.scenes.add(cubeMesh)
        cubeMesh.castShadow = this.Shadow
        cubeMesh.receiveShadow = this.Shadow
        return cubeMesh
    }
    //渲染一个球形
    circle(radius, envmap) {
        const circleGeo = new THREE.SphereGeometry(radius, 32, 32);
        const circleMate = new THREE.MeshStandardMaterial({ color: '0xffffff', metalness: 0.7, roughness: 0.1, envMap: envmap })
        const circleMesh = new THREE.Mesh(circleGeo, circleMate)
        // this.scenes.add(circleMesh)
        circleMesh.lights = true
        circleMesh.castShadow = this.Shadow
        circleMesh.receiveShadow = this.Shadow
        return circleMesh
    }
    //创建辅助对象
    axes() {
        const axesHelper = new THREE.AxesHelper(5);
        this.scenes.add(axesHelper);
    }
    //创建相机滑轨
    controlCamers() {
        const controls = new OrbitControls(this.camera, this.renderer.domElement)
        controls.update()
        return controls
    }
    //第一人才控制器
    firstPersoncontrol() {
        const controls = new FlyControls(this.camera, this.renderer.domElement)
        controls.dragToLook = true
        controls.update(0.5)
        return controls
    }
    //图片材质
    imgTexture(src) {
        const texture = new THREE.TextureLoader().load(src)
        return texture
    }
    //光线（射线光）
    SpotLights() {
        const light = new THREE.SpotLight(0x404040, 10);
        light.position.set(10, 10, 10)
        light.castShadow = this.Shadow;
        this.scenes.add(light);
    }
    //光线(场景光)
    Lights() {
        const light = new THREE.AmbientLight(0x303030, 1);
        this.scenes.add(light);
    }
    pointLight() {
        const light = new THREE.PointLight(0x404040, 10, 0, 2);
        light.position.set(0, 0, 0)
        light.castShadow = this.Shadow;
        this.scenes.add(light);
    }
    //鼠标点击互动
    mouseClick(fn) {
        const rayCaster = new THREE.Raycaster()
        this.point = new THREE.Vector2()

        this.el.addEventListener('click', (e) => {
            e.preventDefault()
            //理解为three.js中坐标和window窗口的鼠标坐标是不一致的，此一步是将win转化为three.js
            this.point.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.point.y = -(e.clientY / window.innerHeight) * 2 + 1;
            //更新摄像机和鼠标位置
            rayCaster.setFromCamera(this.point, this.camera)
            //找到相交物品
            const intersects = rayCaster.intersectObjects(this.scenes.children);
            if (intersects.length > 0) {
                fn(intersects[0])
                return intersects[0]
            }
        }, false)
        return rayCaster
    }
    //打开阴影
    openShadow() {
        this.Shadow = true
        //开启阴影
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    //加载环境贴图
    sceneBackground(srcarr) {
        const loader = new THREE.CubeTextureLoader();
        this.scenes.background = loader.load(srcarr)
        this.scenes.environment = loader.load(srcarr)
        return loader.load(srcarr)
    }
    //文字
    font() {
        const font = './fonts/gentilis_regular.typeface.json'
        const textload = new FontLoader()
        textload.load(font, (font) => {
            const TextGeo = new TextGeometry(
                'hello threejs',
                {
                    font: font,
                    size: 0.8,
                    height: 0.5,
                    curveSegments: 1,
                }
            )
            TextGeo.center()
            const texttrue = new THREE.MeshBasicMaterial({ color: "#ff0000" })
            const mesh = new THREE.Mesh(TextGeo, texttrue)
            this.scenes.add(mesh)
        })
    }
}
