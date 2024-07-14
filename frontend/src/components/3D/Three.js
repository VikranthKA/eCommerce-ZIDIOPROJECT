import {Suspense} from 'react'
import {Canvas, useLoader} from "@react-three/fiber"
import {OrbitControls} from "@react-three/drei"
import {GLTFLoader,STLLoader} from "three-stdlib"
import { MeshStandardMaterial } from 'three'
import glb from "../../Assests/3D/9-mushroom.glb"
import stl from "../../Assests/3D/gearLarge.STL"

function GLBModel({url}){
  const {scene} = useLoader(GLTFLoader,url)
  return <primitive object={scene} />
}

function STLModel({url}){
  const geometry = useLoader(STLLoader,url);
  const material = new MeshStandardMaterial({color:0xaaaaaa,flatShading:true})
  return <mesh geometry={geometry} material={material} />
}

export function GLB(){
  return(
    <Canvas>
      <Suspense fallback={null}>
        <GLBModel url={glb}/>

      </Suspense>
      <OrbitControls/>
    </Canvas>
  )
}

export function STL(){
  return (
    <Canvas>
      <Suspense fallback={null}>
        <ambientLight/>
        {console.log("working")}
        <pointLight position={[10,10,10]} />
        <STLModel url={stl} />

      </Suspense>
        <OrbitControls/>
    </Canvas>
  )
}

