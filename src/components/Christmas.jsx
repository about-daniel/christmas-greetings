/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { useThree } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Fisheye, Environment,useEnvironment } from '@react-three/drei'
import {Logo,Snow} from './Scene.jsx';

export default function Christmas({...props}){
    const cameraRef = useRef()
    const directionalRef = useRef() 
    const renderCamera = useRef();

    const envMap = useEnvironment({ files: '/model/christmas-village.hdr' })

    
    return (
        <>
            <Fisheye zoom={0} segments={64}>
                <Logo />
                <Snow />
                <directionalLight 
                    ref={directionalRef}
                    intensity={3}
                    position={[12, 18, 17]}
                 />
                <Environment map={envMap} background />
                <PerspectiveCamera ref={renderCamera} makeDefault position={[0, 0, 50]} fov={80} rotation={[1, 0, 0]} />
                <OrbitControls ref={cameraRef} enableDamping={false} enablePan={false} enableZoom={false}  minPolarAngle={-1}  maxPolarAngle={Math.PI / 1.6} target={[1, 0, 0]} />
            </Fisheye>
        </>
    )
}