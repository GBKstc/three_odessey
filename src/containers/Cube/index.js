import React from 'react';
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three';

// const THREE = window.THREE;

export default class Cube extends React.Component {

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

    // 初始化相机
    const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 3;
    scene.add(camera);

    // 逻辑开发
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({color: 0x03c03c});
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    // 动画
    const tick = () => {
      // 更新渲染器
      renderer.render(scene, camera);
      // 给网格模型添加一个转动动画
      mesh && (mesh.rotation.y += .02);
      mesh && (mesh.rotation.x += .02);
      // 页面重绘时调用自身
      window.requestAnimationFrame(tick);
    }
    tick();

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