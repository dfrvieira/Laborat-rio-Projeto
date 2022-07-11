import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import '../styles/ImageEditor.css'
import { useNavigate } from "react-router-dom"
//import * as CropperImage from "../Components/CropperImage.js"
//import * as getCroppedImg from "../Components/crop/Crop.js"
import { saveAs } from 'file-saver'

/* ----------- ROTATE -----------*/

function rotateImg90() {
    document.getElementById("MainImage").style.transform = `rotate(90deg)`
}
function rotateImg180() {
    document.getElementById("MainImage").style.transform = `rotate(180deg)`
}
function rotateImg270() {
    document.getElementById("MainImage").style.transform = `rotate(270deg)`
}
function rotateValue() {
    var rotateInput = document.getElementById("rotate")
    var rotateVal = rotateInput.value

    console.log(rotateVal);

    if (rotateVal !== "") {
        document.getElementById("MainImage").style.transform = `rotate(${rotateVal}deg)`
    }
    else {
        document.getElementById("MainImage").style.transform = `rotate(0deg)`
    }

}
function resetImg() {
    document.getElementById("MainImage").style.transform = `rotate(0deg)`
}

/* ----------- FILTERS -----------*/

function changeFilters() {

    var brightnessRange = document.getElementById("brightness")
    var showBrightnessBox = document.getElementById("showBrightness")
    var brightnessVal = brightnessRange.value
    // brightnessRange.value = "100"

    var contrastRange = document.getElementById("contrast")
    var showContrastBox = document.getElementById("showContrast")
    var contrastVal = contrastRange.value

    var blurRange = document.getElementById("blur")
    var showBlurBox = document.getElementById("showBlur")
    var blurVal = blurRange.value

    var opacityRange = document.getElementById("opacity")
    var showOpacityBox = document.getElementById("showOpacity")
    var opacityVal = opacityRange.value

    var grayScaleRange = document.getElementById("grayscale")
    var showGrayScaleBox = document.getElementById("showGrayScale")
    var grayScaleVal = grayScaleRange.value

    var hueRange = document.getElementById("hue")
    var showHueBox = document.getElementById("showHue")
    var hueVal = hueRange.value

    var invertRange = document.getElementById("invert")
    var showInvertBox = document.getElementById("showInvert")
    var invertVal = invertRange.value

    var saturateRange = document.getElementById("saturate")
    var showSaturateBox = document.getElementById("showSaturate")
    var saturateVal = saturateRange.value

    var sepiaRange = document.getElementById("sepia")
    var showSepiaBox = document.getElementById("showSepia")
    var sepiaVal = sepiaRange.value

    //console.log("Brilho:" + brightnessVal);
    //console.log("Contraste:" + contrastVal);
    //console.log("Blur:" + blurVal);
    //console.log("Opacity:" + opacityVal);
    //console.log("GrayScale:" + grayScaleVal);
    //console.log("Hue Rotation:" + hueVal);
    //console.log("Invert:" + invertVal);
    //console.log("Saturate:" + saturateVal);
    //console.log("Sepia:" + sepiaVal);

    showBrightnessBox.innerHTML = "Brightness: " + brightnessVal + "%"
    showContrastBox.innerHTML = "Contrast: " + contrastVal + "%"
    showBlurBox.innerHTML = "Blur: " + blurVal + "px"
    showOpacityBox.innerHTML = "Opacity: " + opacityVal + "px"
    showGrayScaleBox.innerHTML = "GrayScale: " + grayScaleVal + "%"
    showHueBox.innerHTML = "Hue Rotation: " + hueVal + "deg"
    showInvertBox.innerHTML = "Invert: " + invertVal + "%"
    showSaturateBox.innerHTML = "Saturate: " + saturateVal + "%"
    showSepiaBox.innerHTML = "Sepia: " + sepiaVal + "%"


    document.getElementById("MainImage").style.filter =
        `
      brightness(${brightnessVal}%) 
      contrast(${contrastVal}%) 
      blur(${blurVal}px) 
      opacity(${opacityVal}%) 
      grayscale(${grayScaleVal}%)
      hue-rotate(${hueVal}deg)
      invert(${invertVal}%)
      saturate(${saturateVal}%)
      sepia(${sepiaVal}%)
    `
}

function resetFilters() {
    document.getElementById("MainImage").style.filter =
        `
      brightness(100%)
      contrast(100%) 
      blur(0px) opacity(100%)
      grayscale(0%)
      hue-rotate(0deg) 
      invert(0%)
      saturate(100%)
      sepia(0%)
    `
}

/* -------------------- HOME ---------------------*/

function ImageEditor() {

    /* -------------------- UPLOAD ---------------------*/

    const [images, setImages] = React.useState();
    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    /* -------------------- DOWNLOAD ---------------------*/

    const download = e => {
        console.log(e.target.href);
        fetch(e.target.href, {
            method: "GET",
            headers: {}
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "image.png"); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    /* -------------------- ROUTES ---------------------*/

    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate("/")
    }

    const navigateToObjectDetector = () => {
        navigate("/ObjectDetector")
    }

    const navigateToCrop = () => {
        navigate("/Crop")
    }

    const navigateToCanvas = () => {
        navigate("/Canvas")
    }

    /* -------------------- HTML ---------------------*/

    return (
        <div className="App">
            <div className="Main">

                <TransformWrapper
                    initialScale={1}
                >
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                        <>
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                                acceptType={["jpg"]}
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageRemoveAll,
                                    onImageUpdate,
                                }) => (
                                    <div className="upload__image-wrapper">
                                        <div className="btn-group">
                                            {/* HOME*/}
                                            <div className="dropdown d-inline">
                                                <button className="btn btn-success" onClick={navigateToHome}>
                                                    <span class="glyphicon glyphicon-home"></span>
                                                    Home
                                                </button>
                                            </div>

                                            {/* UPLOAD AND REMOVE IMAGES */}
                                            <div className="dropdown d-inline">
                                                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                                                    <span class="glyphicon glyphicon-cloud-upload"></span>
                                                    Upload
                                                    <span className="caret"></span>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <div className="btn-group">
                                                        <li className="divider"></li>
                                                        <li>
                                                            <button className="btn btn-primary sub-btn" onClick={onImageUpload}>
                                                                <span class="glyphicon glyphicon-cloud-upload"></span>
                                                                Choose an Image
                                                            </button>
                                                        </li>
                                                        <li className="divider"></li>
                                                        <li>
                                                            <a
                                                                download
                                                                onClick={e => download(e)}
                                                            ><button className="btn btn-primary sub-btn" onClick={download}>
                                                                    <span class="glyphicon glyphicon-cloud-download"></span>
                                                                    Download
                                                                    </button></a>
                                                        </li>
                                                        <li className="divider"></li>
                                                        <li>
                                                            <button className="btn btn-primary sub-btn" onClick={onImageRemoveAll}>
                                                                <span class="glyphicon glyphicon-trash"></span>
                                                                Remove Image
                                                            </button>
                                                            <li className="divider"></li>
                                                            {imageList.map((image, index) => (
                                                                <div key={index} >
                                                                    <div className="image-item__btn-wrapper">
                                                                        <button className="btn btn-primary sub-btn" onClick={() => onImageUpdate(index)}>
                                                                            <span class="glyphicon glyphicon-cloud-upload"></span>
                                                                            Update Image
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </li>
                                                        <li className="divider"></li>
                                                    </div>
                                                </ul>
                                            </div>

                                            {/* ZOOM */}
                                            <div className="dropdown d-inline">
                                                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                                                    <span class="glyphicon glyphicon-zoom-in"></span>
                                                    Zoom
                                                    <span className="caret"></span>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <div className="btn-group">
                                                        <li className="divider"></li>
                                                        <li>
                                                            <button className="btn btn-primary sub-btn" onClick={() => zoomIn()}>
                                                                <span class="glyphicon glyphicon-zoom-in"></span>
                                                                Zoom In
                                                            </button>
                                                        </li>
                                                        <li className="divider"></li>
                                                        <li>
                                                            <button className="btn btn-primary sub-btn" onClick={() => zoomOut()}>
                                                                <span class="glyphicon glyphicon-zoom-out"></span>
                                                                Zoom Out
                                                            </button>
                                                        </li>
                                                        <li className="divider"></li>
                                                        <li>
                                                            <button className="btn btn-primary sub-btn" onClick={() => resetTransform()}>
                                                                <span class="glyphicon glyphicon-refresh"></span>
                                                                Reset Zoom
                                                            </button>
                                                        </li>
                                                        <li className="divider"></li>
                                                    </div>
                                                </ul>
                                            </div>

                                            {/* ROTATE */}
                                            <div className="dropdown d-inline">
                                                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                                                    <span class="glyphicon glyphicon-repeat"></span>
                                                    Rotate
                                                    <span className="caret"></span>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <div className="btn-group">
                                                        <li className="divider"></li>
                                                        <li>
                                                            <button className="btn btn-primary sub-btn" onClick={() => rotateImg90()}>
                                                                <span class="glyphicon glyphicon-repeat"></span>
                                                                Rotate 90
                                                            </button>
                                                        </li>
                                                        <li className="divider"></li>
                                                        <li>
                                                            <button className="btn btn-primary sub-btn" onClick={() => rotateImg180()}>
                                                                <span class="glyphicon glyphicon-repeat"></span>
                                                                Rotate 180
                                                            </button>
                                                        </li>
                                                        <li className="divider"></li>
                                                        <li>
                                                            <button className="btn btn-primary sub-btn" onClick={() => rotateImg270()}>
                                                                <span class="glyphicon glyphicon-repeat"></span>
                                                                Rotate 270
                                                            </button>
                                                        </li>
                                                        <li className="divider"></li>
                                                        <li>
                                                            <div className="label-align">
                                                                <label style={{ paddingRight: "5px" }}> Value</label>
                                                                <input type="number" className="form-range" id="rotate" name="rotate"
                                                                    min="0" max="360"
                                                                    onInput={() => rotateValue()}></input>
                                                            </div>
                                                        </li>
                                                        <li className="divider"></li>
                                                        <li>
                                                            <button className="btn btn-primary sub-btn" onClick={() => resetImg()}>
                                                                <span class="glyphicon glyphicon-refresh"></span>
                                                                Reset
                                                            </button>
                                                        </li>
                                                        <li className="divider"></li>
                                                    </div>
                                                </ul>
                                            </div>

                                            {/* FILTERS */}
                                            <div className="dropdown d-inline">
                                                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                                                    <span class="glyphicon glyphicon-align-justify"></span>
                                                    Filters
                                                    <span className="caret"></span>
                                                </button>
                                                <ul className="dropdown-menu scrollable-menu" role="menu">

                                                    <div>
                                                        <li className="divider"></li>
                                                        <label>Brightness</label>
                                                        <input type="range" className="form-range" id="brightness" name="brightness"
                                                            min="0" max="200" /* value="50" */
                                                            onInput={() => changeFilters()}>
                                                        </input>
                                                        <div id="showBrightness"></div>
                                                        <li className="divider"></li>
                                                    </div>

                                                    <div>
                                                        <label>Contrast</label>
                                                        <input type="range" id="contrast" name="contrast"
                                                            min="0" max="200"
                                                            onInput={() => changeFilters()}>
                                                        </input>
                                                        <div id="showContrast"></div>
                                                        <li className="divider"></li>
                                                    </div>

                                                    <div>
                                                        <label>Blur</label>
                                                        <input type="range" id="blur" name="blur"
                                                            min="0" max="50"
                                                            onInput={() => changeFilters()}>
                                                        </input>
                                                        <div id="showBlur"></div>
                                                        <li className="divider"></li>
                                                    </div>

                                                    <div>
                                                        <label>Opacity</label>
                                                        <input type="range" id="opacity" name="opacity"
                                                            min="0" max="100"
                                                            onInput={() => changeFilters()}>
                                                        </input>
                                                        <div id="showOpacity"></div>
                                                        <li className="divider"></li>
                                                    </div>

                                                    <div>
                                                        <label>GrayScale</label>
                                                        <input type="range" id="grayscale" name="grayscale"
                                                            min="0" max="100"
                                                            onInput={() => changeFilters()}>
                                                        </input>
                                                        <div id="showGrayScale"></div>
                                                        <li className="divider"></li>
                                                    </div>

                                                    <div>
                                                        <label>Hue</label>
                                                        <input type="range" id="hue" name="hue"
                                                            min="0" max="360"
                                                            onInput={() => changeFilters()}>
                                                        </input>
                                                        <div id="showHue"></div>
                                                        <li className="divider"></li>
                                                    </div>

                                                    <div>
                                                        <label>Invert</label>
                                                        <input type="range" id="invert" name="invert"
                                                            min="0" max="100"
                                                            onInput={() => changeFilters()}>
                                                        </input>
                                                        <div id="showInvert"></div>
                                                        <li className="divider"></li>
                                                    </div>

                                                    <div>
                                                        <label>Saturate</label>
                                                        <input type="range" id="saturate" name="saturate"
                                                            min="0" max="300"
                                                            onInput={() => changeFilters()}>
                                                        </input>
                                                        <div id="showSaturate"></div>
                                                        <li className="divider"></li>
                                                    </div>

                                                    <div>
                                                        <label>Sepia</label>
                                                        <input type="range" id="sepia" name="sepia"
                                                            min="0" max="100"
                                                            onInput={() => changeFilters()}>
                                                        </input>
                                                        <div id="showSepia"></div>
                                                        <li className="divider"></li>
                                                    </div>

                                                    {/* Reset Filters */}
                                                    <div>
                                                        <li style={{ paddingLeft: "18px" }}>
                                                            <button id="resetFilters" className="btn btn-primary sub-btn" onClick={() => resetFilters()}>Reset Filters</button>
                                                        </li>
                                                        <li className="divider"></li>
                                                    </div>
                                                </ul>
                                            </div>

                                            {/* CANVAS */}
                                            <div className="dropdown d-inline">
                                                <button className="btn btn-success" onClick={navigateToCanvas}>
                                                    <span class="glyphicon glyphicon-circle-arrow-right"></span>
                                                    Canvas
                                                </button>
                                            </div>

                                            {/* CROP*/}
                                            <div className="dropdown d-inline">
                                                <button className="btn btn-success" onClick={navigateToCrop}>
                                                    <span class="glyphicon glyphicon-circle-arrow-right"></span>
                                                    Crop
                                                </button>
                                            </div>

                                            {/* OBJECT DETECTOR */}
                                            <div className="dropdown d-inline">
                                                <button className="btn btn-success" onClick={navigateToObjectDetector}>
                                                    <span class="glyphicon glyphicon-circle-arrow-right"></span>
                                                    Object Detection
                                                </button>
                                            </div>

                                        </div>
                                        <TransformComponent>
                                            <div>
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="image-item">
                                                        <img id="MainImage" src={image.data_url}
                                                            alt=""></img>
                                                    </div>
                                                ))}
                                            </div>
                                        </TransformComponent>

                                    </div>
                                )}
                            </ImageUploading>
                        </>
                    )}
                </TransformWrapper>
            </div >
        </div >
    )
}


export default ImageEditor