/* eslint-disable no-unused-vars */
import './App.css'
import Christmas from './components/Christmas.jsx';
import Ball from './components/Ball.jsx';
import decoration from './assets/decoration.png';
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


function App() {

  const container = useRef();

  useGSAP((context, contextSafe) => {
    const startTl = gsap.timeline({delay:0.33});
    startTl.to('.overlay',{scale:0,duration:0.8,ease:'ease'})
           .from('.decoration.top',{y:-300,skewY:6,duration:0.7,ease:'back'},'-=0.78')
           .from('.decoration.bottom',{y:300,skewY:6,duration:0.7,ease:'back'},'-=0.78');
  }, {scope: container});
  
  return (
    <>
      <section className='container' ref={container}>
        <div className='overlay' />
        <div className='wrapper'>
          <div className='decoration top'><img src={decoration} /></div>
          <Christmas />
          <div className='decoration bottom'><img src={decoration} /></div>
          <div className='end'>
            <h1>Buone feste</h1>
          </div>
        </div>
      </section>
    </>
  )
}
export default App
