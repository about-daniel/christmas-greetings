/* eslint-disable no-unused-vars */
import './App.css'
import Christmas from './components/Christmas.jsx';
import GreetingsTitle from './components/GreetingsTitle.jsx';
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";



function App() {
  const canvasRef = useRef();
  const sceneRef = useRef();
  const container = useRef();
  const button = useRef();

  useGSAP((context, contextSafe) => {
      const loader = gsap.timeline({delay:0.2});
      loader.to('.loader',{opacity:0,filter:'blur(20px)',duration:1.2,pointerEvents:'none',ease:'ease'})
            .to('.loader',{zIndex:-999999,width:0,height:0,visibility:'hidden',duration:0})

      gsap.from(container.current,{scale:4,duration:1,ease:'ease',delay:0.4})
      gsap.from('.text,.button',{scale:0,filter:'blur(50px)',ease:'ease',duration:1.4,delay:1.8})

      const onClick = contextSafe(() => {
        const transition = gsap.timeline({delay:0.1})
        transition.to(container.current,{scale:8,filter:'blur(13px)',ease:'ease',duration:1.5})
                  .to('.distortion',{opacity:1,filter:'blur(10px)',ease:'ease',duration:1.2},'-=1')
                  .to('.webgl-wrapper',{opacity:1,pointerEvents:'auto',filter:'blur(0px)',cursor:'grab',duration:1,ease:'ease'},'-=0.8')
                  .to('.to',{opacity:1,zIndex:999999,duration:0.5,ease:'ease'})
      });
      button.current.addEventListener("click", onClick);


      return () => { // <-- cleanup
        button.current.removeEventListener("click", onClick);
      };

  },{container})
  return (
    <>
    <div className="loader" />
    <div className="webgl-wrapper" ref={button}>
      <Canvas ref={canvasRef} shadows shadowMap linear flat>
        <Christmas />
      </Canvas>
    </div>
    <div className="content-wrapper" ref={container}>
      <div className="greetings">
        <GreetingsTitle />
        {/* <h2 className="text">DA STUDIO375</h2> */}
        <h3 className="button">Entra nel villaggio di Natale</h3>
      </div>
      {/* <div className="decoration"><img src={decoration} /></div> */}
      {/* <div className="santaclaus"><img src={santaclaus} /></div> */}
      {/* <div className="distortion" /> */}
    </div>
    <div className="to"><a href="https://studio375.it/" alt="Scopri i nostri progetti" title="Scopri i nostri progetti">Scopri i nostri progetti</a></div>
    <div className="noise" />
    </>
  )
}
export default App
