import React from 'react';
import * as THREE from 'three';
// import {OBJLoader, MTLLoader} from 'three-obj-mtl-loader'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";
import boat from './models/boat.obj';
import meshObj from './models/mesh.obj';
import meshMtl from './models/mesh.mtl';

export default class ObjTest extends React.Component {

  componentDidMount() {
    this.initThree()
  }

  initThree = () => {
    // 定义渲染尺寸
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    // 初始化渲染器
    const canvas = document.querySelector('canvas.webgl');
    const renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 初始化场景
    const scene = new THREE.Scene();

    // 初始化相机
    var frustumSize = 96, meshes = [];
    let aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(-frustumSize * aspect, frustumSize * aspect, frustumSize, -frustumSize, 1, 1000);
    camera.position.set(0, 0, 600);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    //辅助网格
    let gridHelper = new THREE.GridHelper(12000, 20, 0x888888, 0x444444);
    gridHelper.position.y = 0;
    gridHelper.name = "Grid";
    scene.add(gridHelper);

    //光源一定要添加，负责模型没有光 肯定是黑色
    const directionalLight = new THREE.DirectionalLight('#ffffff', 2)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.far = 15
    directionalLight.shadow.mapSize.set(1024, 1024)
    directionalLight.shadow.normalBias = 0.05
    directionalLight.position.set(.25, 0, -.2)
    scene.add(directionalLight)

    // 环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // 页面缩放事件监听
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      // 更新渲染
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      // 更新相机
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
    });

    //添加渲染器
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.zoomSpeed = 2.0;
    controls.rotateSpeed = 2.0;

    // 逻辑开发
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({color: 0x03c03c});
    // const mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);

    const loader = new OBJLoader();
    const MTLLoaderLoader = new MTLLoader();
    MTLLoaderLoader.load(meshMtl, function (materials) {
      console.log(materials);
      loader.setMaterials(materials);
      loader.load(meshObj, function (object) {
        console.log(object, "./models/mesh.obj")
        scene.add(object);
        renderer.render(scene, camera);//加载成功后继续渲染，否则为一片黑色
      }, function (xhr) {
        // console.log(xhr);
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      }, function (error) {
        console.log(error, 'An error happened');
      });
    }, function (xhr) {
      // console.log(xhr);
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, function (error) {
      console.log(error, 'An error happened');
    })

    // loader.load(meshObj, function (object) {
    //   console.log(object, "./models/mesh.obj")
    //   scene.add(object);
    //   renderer.render(scene, camera);//加载成功后继续渲染，否则为一片黑色
    // }, function (xhr) {
    //   // console.log(xhr);
    //   console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    // }, function (error) {
    //   console.log(error, 'An error happened');
    // });

    // loader.load(mesh, function (object) {
    //   console.log(object, "./models/mesh.obj")
    //   scene.add(object);
    //   renderer.render(scene, camera);//加载成功后继续渲染，否则为一片黑色
    // }, function (xhr) {
    //   console.log(xhr);
    //   console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    // }, function (error) {
    //   console.log(error, 'An error happened');
    // });

    // const ambientLight = new THREE.AmbientLight(0x404040);
    // scene.add(ambientLight);
    //
    // const directionalLight = new THREE.DirectionalLight(0xffffff);
    // directionalLight.position.set(1, 1, 1).normalize();
    // scene.add(directionalLight);


    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }

  render() {
    return (
      <div className='cube_page'>
        <canvas className='webgl'/>
      </div>
    )
  }
}