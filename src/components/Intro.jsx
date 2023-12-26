/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useProgress } from "@react-three/drei";
import GreetingsTitle from './GreetingsTitle.jsx';


export default function Intro({started, onStarted }){
    const { progress } = useProgress();

    return (
        <div className={`loadingScreen ${started ? "loadingScreen--started" : ""}`}>
            <div className="loadingScreen__board">
                <GreetingsTitle />
                <div className="loadingScreen__progress">
                <div
                    className="loadingScreen__progress__value"
                    style={{
                        width: `${progress}%`,
                    }}
                />
                <button
                    className={`loadingScreen__button ${(progress >= 100) ? "active" : ""}`}
                    disabled={progress < 100}
                    onClick={onStarted}
                >
                    Entra nel villaggio di natale
                </button>
                </div>
            </div>
        </div>
    )
}