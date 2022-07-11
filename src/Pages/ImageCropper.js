import React from "react";
import Cropper from "react-easy-crop";
import ReactSlider from "react-slider";
import { useNavigate } from "react-router-dom"

import { generateDownload } from "../Components/Crop";
import "../styles/Crop.css";

export function CropperImage() {
	const inputRef = React.useRef();

	const triggerFileSelectPopup = () => inputRef.current.click();

	const [image, setImage] = React.useState(null);
	const [croppedArea, setCroppedArea] = React.useState(null);
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);

	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

	const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result);
			});
		}
	};

	const onDownload = () => {
		generateDownload(image, croppedArea);
	};

	const navigate = useNavigate()
	const Home = () => {
		navigate("/ImageEditor")
	}

	return (
		<div className='CropperImage'>
			<div className='container-buttons'>
				<input
					type='file'
					accept='image/*'
					ref={inputRef}
					onChange={onSelectFile}
					style={{ display: "none" }}
				/>

				<button className="btn btn-success" onClick={Home}>
					<span class="glyphicon glyphicon-circle-arrow-right"></span>
					Image Editor
				</button>

				<button className="btn btn-primary" onClick={triggerFileSelectPopup}>
					<span class="glyphicon glyphicon-cloud-upload"></span>
					Choose an Image
				</button>

				<button className="btn btn-primary" onClick={onDownload}>
					<span class="glyphicon glyphicon-cloud-download"></span>
					Download Cropped Image
				</button>
			</div>

			<div className='container-cropper'>
				{image ? (
					<>
						<div className='cropper'>
							<Cropper
								id="cropper"
								image={image}
								crop={crop}
								zoom={zoom}
								aspect={1}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
							/>
						</div>

						<div className='slider'>
							<ReactSlider
								min={1}
								max={3}
								step={0.1}
								value={zoom}
								onChange={(e, zoom) => setZoom(zoom)}
							/>
						</div>
					</>
				) : null}
			</div>
		</div >
	);
}

export default CropperImage