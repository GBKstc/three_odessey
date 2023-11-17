import React from 'react';
// import "./libs/OBJLoader"
// import "./libs/MTLLoader"

const THREE = window.THREE;
export default class Stars extends React.Component {

  componentDidMount() {
    this.initThree()
  }

  initThree = () => {
    console.log(THREE.OBJLoader, "OBJLoader")
    console.log(THREE.MTLLoader, "MTLLoader")
  }

  render() {
    return (
      <div className='cube_page'>
        <canvas className='webgl'/>
      </div>
    )
  }
}