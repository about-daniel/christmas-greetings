/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, CameraControls, Fisheye, Environment } from '@react-three/drei'
import {Logo,Snow} from './Scene.jsx';


export default function Christmas({...props}){
    const canvasRef = useRef()
    const cameraRef = useRef()
    const ambientRef = useRef()
    return (
        <div className="webgl-wrapper">
            <Canvas ref={canvasRef} flat>
                <CameraControls ref={cameraRef} minPolarAngle={-1} maxPolarAngle={Math.PI / 1.6} />
                <Logo />
                <Snow />
                <ambientLight ref={ambientRef} />
                {/* <Environment files="/model/christmas-bg.exr" background /> */}
                <PerspectiveCamera makeDefault position={[0, 0, 50]} />
            </Canvas>
        </div>
    )
}