import React from 'react'
import Canvas from "../Components/Canvas_Hooks"
import '../styles/Canvas.css'
import { useNavigate } from "react-router-dom"


function CanvasContainer() {

    const navigate = useNavigate()
    const Home = () => {
        navigate("/ImageEditor")
    }

    return (
        <div className='Canvas'>
            <div className='Main'>
                <div className='btn-group'>
                    <button className="btn btn-success canvas-btn" onClick={Home}>
                        <span class="glyphicon glyphicon-circle-arrow-right"></span>
                        Image Editor
                    </button>
                </div>
                <div className='canvas-container'>
                    <Canvas
                        width={1200}
                        height={450}
                    ></Canvas>
                </div>
            </div>


        </div >
    )
}

export default CanvasContainer