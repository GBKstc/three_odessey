import React from 'react';
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  AmbientLight,
  Mesh,
  Color,
  Fog,
  MeshLambertMaterial,
  SphereGeometry,
  TorusGeometry,
  Group,
  IcosahedronGeometry,
  MeshToonMaterial,
} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export default class Human extends React.Component {

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
    const renderer = new WebGLRenderer({canvas: canvas});
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 初始化场景
    const scene = new Scene();
    scene.background = new Color(0x1A1A1A);
    scene.fog = new Fog(0x1A1A1A, 1, 1000);

    // 初始化相机
    const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    // camera.position.z = 3;
    scene.add(camera);
    camera.position.set(20, 100, 450);

    //初始化控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    //添加光源
    const light = new AmbientLight(0xdeedff, 1.5);
    scene.add(light);

    // 逻辑开发
    const SphereMaterial = new MeshLambertMaterial({
      color: 0x03c03c,
      wireframe: true,
    });
    const SphereGeometry = new SphereGeometry(80, 32, 32);
    const planet = new Mesh(SphereGeometry, SphereMaterial);
    scene.add(planet);

    const TorusGeometry = new TorusGeometry(150, 8, 2, 120);
    const TorusMaterial = new MeshLambertMaterial({
      color: 0x40a9ff,
      wireframe: true
    });
    const ring = new Mesh(TorusGeometry, TorusMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.rotation.y = -0.1 * (Math.PI / 2);
    scene.add(ring);

    //创建星星
    const stars = new Group();
    for (let i = 0; i < 500; i++) {
      const geometry = new IcosahedronGeometry(Math.random() * 2, 0);
      const material = new MeshToonMaterial({ color: 0xeeeeee });
      const mesh = new Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 700;
      mesh.position.y = (Math.random() - 0.5) * 700;
      mesh.position.z = (Math.random() - 0.5) * 700;
      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.rotation.z = Math.random() * 2 * Math.PI;
      stars.add(mesh);
    }
    scene.add(stars);


    // 动画
    // const tick = () => {
    //   // 更新渲染器
    //   renderer.render(scene, camera);
    //   // 给网格模型添加一个转动动画
    //   mesh && (mesh.rotation.y += .02);
    //   mesh && (mesh.rotation.x += .02);
    //   // 页面重绘时调用自身
    //   window.requestAnimationFrame(tick);
    // }
    // tick();

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

  }

  render() {
    return (
      <div className='cube_page'>
        <canvas className='webgl'/>
      </div>
    )
  }
}