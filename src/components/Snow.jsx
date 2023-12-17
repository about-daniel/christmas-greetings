/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import * as THREE from 'three'


export default function Snow({...props}){
    const refContainer = useRef(null);
    useEffect(() => {
        // === THREE.JS CODE START ===
        let scene, 
    camera, 
    renderer, 
    particles;

    const particleNum = 10000;
    const maxRange = 1000;
    const minRange = maxRange / 2;
    const textureSize = 64.0;

    var mouseX = 0;
    var mouseY = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    function onDocumentMouseMove( event ) {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    }
    
    function onDocumentTouchStart( event ) {
    
        if ( event.touches.length == 1 ) {
    
            event.preventDefault();
    
            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            // mouseY = event.touches[ 0 ].pageY - windowHalfY;
        }
    }
    
    function onDocumentTouchMove( event ) {
    
        if ( event.touches.length == 1 ) {
    
            event.preventDefault();
    
            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            // mouseY = event.touches[ 0 ].pageY - windowHalfY;
        }
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

    const getTexture = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const diameter = textureSize;
        canvas.width = diameter;
        canvas.height = diameter;
        const canvasRadius = diameter / 2;

        /* gradation circle
        ------------------------ */
        drawRadialGradation(ctx, canvasRadius, canvas.width, canvas.height);
        
        /* snow crystal
        ------------------------ */
        // drawSnowCrystal(ctx, canvasRadius);

        const texture = new THREE.Texture(canvas);
        //texture.minFilter = THREE.NearestFilter;
        texture.type = THREE.FloatType;
        texture.needsUpdate = true;
        return texture;
    }



    const render = (timeStamp) => {


        const posArr = particles.geometry.attributes.position.array;
        const velArr = particles.geometry.velocities;


        let index = 0;
        for (let i = 0; i < posArr.length; i += 3) {
            const v = new THREE.Vector3(
                posArr[i],
                posArr[i + 1],
                posArr[i + 2]
            ).multiplyScalar(2)
            
            const velocity = velArr[index];

            const x = index * 3;
            const y = index * 3 + 1;
            const z = index * 3 + 2;
            
            const velX = Math.sin(timeStamp * 0.001 * velocity.x) * 0.1;
            const velZ = Math.cos(timeStamp * 0.0015 * velocity.z) * 0.1;
            
            posArr[i] += velX;
            posArr[i + 1] += velocity.y;
            posArr[i + 2] += velZ;

            if (posArr[i + 1] < -minRange ) {
                posArr[i + 1] = minRange;
            }

            index++
        }
        particles.geometry.attributes.position.needsUpdate = true;


        camera.position.x += ( mouseX - camera.position.x ) * 0.05;
        camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
        camera.lookAt(scene.position); 
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    const onResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }


    const init = () => {

        /* scene
        -------------------------------------------------------------*/
        scene = new THREE.Scene();

        /* camera
        -------------------------------------------------------------*/
        let cameraY = (window.innerWidth >= 601) ? -100 : -40;
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.set(0, cameraY, 400);
        camera.lookAt(scene.position);

        /* renderer
        -------------------------------------------------------------*/
        renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        //renderer.setClearAlpha(0);

    
        /* Snow Particles
        -------------------------------------------------------------*/
        const points = []
        for (let i = 0; i < particleNum; i++) {
            const x = Math.floor(Math.random() * maxRange - minRange);
            const y = Math.floor(Math.random() * maxRange - minRange);
            const z = Math.floor(Math.random() * maxRange - minRange);
            const particle = new THREE.Vector3(x, y, z);
            points.push(particle);
        }
        const pointGeometry = new THREE.BufferGeometry().setFromPoints(points);

        
        const pointMaterial = new THREE.PointsMaterial({
            size: 8,
            color: 0xffffff,
            vertexColors: false,
            map: getTexture(),
            // blending: THREE.AdditiveBlending,
            transparent: true,
            // opacity: 0.8,
            fog: true,
            depthWrite: false
        });

        const velocities = [];
        for (let i = 0; i < particleNum; i++) {
            const x = Math.floor(Math.random() * 6 - 3) * 0.1;
            const y = Math.floor(Math.random() * 10 + 3) * - 0.05;
            const z = Math.floor(Math.random() * 6 - 3) * 0.1;
            const particle = new THREE.Vector3(x, y, z);
            velocities.push(particle);
        }

        particles = new THREE.Points(pointGeometry, pointMaterial);
        particles.geometry.velocities = velocities;
        scene.add(particles);

        /* events
        -------------------------------------------------------------*/
        window.addEventListener('resize', onResize);
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );

        /* rendering start
        -------------------------------------------------------------*/
        refContainer.current.appendChild(renderer.domElement);
        requestAnimationFrame(render);
    }
    setTimeout(() => {
        init();
    }, 1000);
        
    }, []);
    return (
        <div className="webgl-wrapper" ref={refContainer}>
        </div>
    )
}