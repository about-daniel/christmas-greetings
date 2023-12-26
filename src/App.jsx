/* eslint-disable no-unused-vars */
import './App.css'
import Christmas from './components/Christmas.jsx';
import GreetingsTitle from './components/GreetingsTitle.jsx';
import Intro from './components/Intro.jsx';
import { useRef,useState,Suspense,useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import move from "./assets/move.svg";

function App() {
  const canvasRef = useRef();
  const sceneRef = useRef();
  const container = useRef();
  const button = useRef();
  const [start, setStart] = useState(false);
  useEffect(()=>{
    if(start){
      const tl = gsap.timeline({delay:0.5})
      tl.to('.move',{opacity:1,y:0,duration:1,ease:'ease'})
        .to('.move',{x:-30,duration:0.6,ease:'ease'})
        .to('.move',{x:30,duration:0.6,ease:'ease'})
        .to('.move',{x:0,duration:0.6,ease:'ease'})
        .to('.to',{opacity:1,zIndex:9999,duration:0.5,ease:'ease'})
        .to('.move',{opacity:0,duration:0.7,ease:'ease',pointerEvents:'none',delay:0.3})
    }
  },[start])

  
  return (
    <>
    <div className={"webgl-wrapper"+(start ? ' active' : null)}>
      <Canvas linear flat>
        <Suspense fallback={null}>
          <Christmas />
        </Suspense>
      </Canvas>
    </div>
    <div className='move'><img src={move} width={36} /></div>
    <div className="to"><a href="https://studio375.it/" alt="Scopri i nostri progetti" title="Scopri i nostri progetti">Scopri i nostri progetti</a></div>
    <Intro started={start} onStarted={() => setStart(true)} />
    </>
  )
}
export default App
