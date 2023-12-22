/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF,OrbitControls } from '@react-three/drei'
import { useMemo } from "react";
import { useControls } from 'leva'
import gsap from "gsap";



export function Logo() {
//     const options = useMemo(() => {
//         return {
//             x: { value: 0, min: -1000, max: 1000, step: 1 },
//             y: { value: -185, min: -1000, max: 1000, step: 1 },
//             z: { value: -227, min: -1000, max: 1000, step: 1 },
//             rotationX: { value: 1.8, min: -360.0, max: 360.0, step: 0.1 },
//             rotationY: { value: 0.0, min: -360, max: 360, step: 0.1 },
//             rotationZ: { value: 0.0, min: -360, max: 360, step: 0.1 },
//             visible: true,
//       }
//   }, [])
//   const handler = useControls('Logo', options)
  const ref = useRef()

  const {scene} = useGLTF('/model/logo 375.glb')
  scene.children.forEach((mesh, i) => {
    mesh.castShadow = true;
    mesh.children.forEach((m)=>{
        m.castShadow = true;
    })
  })
  
  scene.castShadow = true;  useFrame((state,delta)=>{ref.current.rotation.y += delta})
  return <primitive ref={ref} object={scene} scale={[2.4,2.4,2.4]} position={[3,0,0]} rotation={[0,0,0]} />
}



export function Snow() {
    const ref = useRef()

    const particleNum = 10000;
    const maxRange = 1000;
    const minRange = maxRange / 2;

    let positions = useMemo(() => {
        let positions = [];
        for (let i = 0; i < particleNum; i++) {
            const x = Math.floor(Math.random() * maxRange - minRange);
            const y = Math.floor(Math.random() * maxRange - minRange);
            const z = Math.floor(Math.random() * maxRange - minRange);
            positions.push(x,y,z);
            
        }
        return new Float32Array(positions);
    }, [particleNum, maxRange, minRange]);

    let velocities = useMemo(() => {
        let velocities = [];
        for (let i = 0; i < particleNum; i++) {
            const x = Math.floor(Math.random() * 6 - 3) * 0.1;
            const y = Math.floor(Math.random() * 10 + 3) * - 0.05;
            const z = Math.floor(Math.random() * 6 - 3) * 0.1;
            velocities.push(x,y,z);
        }
        return new Float32Array(velocities);
    }, [particleNum]);

    useFrame((state, delta) => {
        const positionsArray = ref.current.geometry.attributes.position.array
        let index = 0;
        for (let i = 0; i < positionsArray.length; i += 3) {            
            const velX = Math.sin(delta * 0.001 * velocities[i]) * 0.1;
            const velZ = Math.cos(1 * 0.0015 * velocities[i+2]) * 0.1;
            
            positionsArray[i] += velX;
            positionsArray[i + 1] += velocities[i+1];
            //positionsArray[i + 2] += velZ;

            if (positionsArray[i + 1] < -minRange ) {
                positionsArray[i + 1] = minRange;
            }
            index++
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
    })

    return (
        <points ref={ref}>
            <bufferGeometry attach="geometry">
                <bufferAttribute attach="attributes-position" array={positions} count={positions.length/3} itemSize={3}/>
            </bufferGeometry>
            <pointsMaterial
                size={8}
                color={0xffffff}
                vertexColors={false}
                map={getTexture()}
                transparent={true}
                fog={true}
                depthWrite={false}
            />
        </points>
    )
}

const getTexture = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const diameter = 64.0;
    canvas.width = diameter;
    canvas.height = diameter;
    const canvasRadius = diameter / 2;

    // gradation circle for snow
    drawRadialGradation(ctx, canvasRadius, canvas.width, canvas.height);

    const texture = new THREE.Texture(canvas);
    texture.type = THREE.FloatType;
    texture.needsUpdate = true;
    return texture;
}

const drawRadialGradation = (ctx, canvasRadius, canvasW, canvasH) => {
    ctx.save();
    const gradient = ctx.createRadialGradient(canvasRadius,canvasRadius,0,canvasRadius,canvasRadius,canvasRadius);
    gradient.addColorStop(0, 'rgba(255,255,255,1.0)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvasW,canvasH);
    ctx.restore();
}
