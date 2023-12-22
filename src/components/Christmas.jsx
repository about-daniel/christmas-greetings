/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useSpring } from "react-spring";
import { Canvas,useThree,useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Fisheye, Environment, useFBO,useHelper } from '@react-three/drei'
import {Logo,Snow} from './Scene.jsx';
import { DirectionalLightHelper } from "three";



export default function Christmas({...props}){
    const viewport = useThree((state) => state.viewport);
    const cameraRef = useRef()
    const ambientRef = useRef() 
    const directionalRef = useRef() 
    const renderMaterial = useRef();
    const renderedScene = useRef();
    const renderCamera = useRef();
    const material = useRef();
    useHelper(directionalRef, DirectionalLightHelper, 5);


    
    return (
        <>
            <Fisheye zoom={0} segments={64}>
                <Logo />
                <Snow />
                <ambientLight ref={ambientRef} intensity={0}/>
                <directionalLight 
                    ref={directionalRef}
                    intensity={3}
                    position={[12, 18, 17]}
                    castShadow
                    shadow-radius={20}
                    shadow-mapSize-shadowMapWidth={7000}
                    shadow-mapSize-shadowMapHeight={7000}
                    shadow-camera-left={-200}
                    shadow-camera-right={200}
                    shadow-camera-top={-200}
                    shadow-camera-bottom={200}
                 />
                <Environment files="/model/christmas-village.hdr" background receiveShadow />
                <mesh rotation-x={-Math.PI / 2} position={[0,-300,0]} receiveShadow>
                    <circleGeometry args={[600]} />
                    <meshPhongMaterial transparent color="#fff" opacity={0.1} />
                </mesh>
                <PerspectiveCamera ref={renderCamera} makeDefault position={[0, 0, 50]} fov={80} rotation={[1, 0, 0]} />
                <OrbitControls ref={cameraRef} enableDamping={false} enablePan={false} enableZoom={false}  minPolarAngle={-1}  maxPolarAngle={Math.PI / 1.6} target={[8, 0, 0]} />
            </Fisheye>
        </>
    )
}