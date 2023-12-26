/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { PerspectiveCamera, OrbitControls, Fisheye, Environment, } from '@react-three/drei'
export default function Loader(){
    return (
        <>
            <mesh>
                <planeGeometry attach="geometry" args={[2000, 2000, 50]} />
                <meshBasicMaterial color={"#1d0b75"}  transparent opacity={0}/>
            </mesh>
            <ambientLight intensity={1} />
        </>
    )
}