import React from 'react'
import "../styles/Home.css"
import Logo from "../Images/transferir.png"
import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()
    const Home = () => {
        navigate("/ImageEditor")
    }

    return (
        <div className='Home'>
            <div>
                <img className='img' src={Logo} alt='logo_ual'></img>
                <button className="btn btn-success canvas-btn" onClick={Home}>
                    <span class="glyphicon glyphicon-circle-arrow-right"></span>
                    Image Editor
                </button>
            </div>
            <div className='container'>
                <h3> Aplicação de Processamento básico de Imagem</h3>
                <p>
                    Esta aplicação é o projeto final de curso, no âmbito do
                    Curso de Engenharia Informática da Universidade Autónoma de Lisboa.
                    <br></br>
                    Este trabalho tem como objetivo a construção de uma aplicação
                    Web de Processamento/Manipulação de imagem com reconhecimento de objetos com
                    algoritmo de Deep Learning.
                </p>
                <p>
                    Projeto Realizado por:
                    <br></br>
                    Diogo Morgado 30005522
                    <br></br>
                    Diogo Vieira 30005222
                    <br></br>
                    João Gil 30005106
                    <br></br>
                    Pedro Joaquim 30004870
                </p>

            </div>
        </div>
    )
}

export default Home