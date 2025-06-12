// import {Suspense} from 'react'
// import {Canvas, useLoader} from "@react-three/fiber"
// import {OrbitControls} from "@react-three/drei"
// import {GLTFLoader,STLLoader} from "three-stdlib"
// import { MeshStandardMaterial } from 'three'
// import glb from "../../Assests/3D/9-mushroom.glb"
// import stl from "../../Assests/3D/gearLarge.STL"

// function GLBModel({url}){
//   const {scene} = useLoader(GLTFLoader,url)
//   return <primitive object={scene} />
// }

// // function STLModel({url}){
// //   const geometry = useLoader(STLLoader,url);
// //   const material = new MeshStandardMaterial({color:0xaaaaaa,flatShading:true})
// //   return <mesh geometry={geometry} material={material} />
// // }

// export function GLB(){
//   return(
//     <Canvas>
//       <Suspense fallback={null}>
//         <GLBModel url={glb}/>

//       </Suspense>
//       <OrbitControls/>
//     </Canvas>
//   )
// }

// // export function STL(){
// //   return (
// //     <Canvas>
// //       <Suspense fallback={null}>
// //         <ambientLight/>
// //         {console.log("working")}
// //         <pointLight position={[10,10,10]} />
// //         <STLModel url={stl} />

// //       </Suspense>
// //         <OrbitControls/>
// //     </Canvas>
// //   )
// // }


import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import path from "../../Assests/3D/maskskull.glb"

function Model({ url, color }) {
  const { scene } = useGLTF(url);

  scene.traverse((child) => {
    if (child.isMesh) {
      (child.material).color.set(color);
    }
  });

  return <primitive object={scene} scale={1} />;
}

export default function GLBViewer() {
  const [color, setColor] = useState("white"); 


  return (
    <div className="container">
      <div className="color-buttons">
        {["red", "blue", "green"].map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            style={ { backgroundColor: c, color: "white", padding: "10px", margin: "5px", border: "none", cursor: "pointer" }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene */}

      <Canvas camera={{ position: [0, 1, 3], fov: 100 }} style={{ height: "500px", width: "500px",border:"3px solid red" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Model url={path} color={color} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
