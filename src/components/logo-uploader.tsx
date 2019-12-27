import React, { useState, useEffect, useRef } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import 'react-circular-progressbar/dist/styles.css';
import PlaceholderLogo from './logo-placeholder.png';

const UploaderWrapper = styled.div`
	width: 375px;
	height: 667px;
	background-color: white;
	display: flex;
	flex-direction: column;

	.uploader-header {
		padding: 10px;
		border-bottom: 1px solid #ccc;
		h3 {
			margin-bottom: 0;
			color: #192533;
		}
		p {
			color: #6b85a3;
			font-size: 12px;
		}
	}
	.uploader-body {
		margin: 10px;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		&.dragging {
			background-color: #f5f9ff;
			border: 1px dashed #4991e5;
		}
		#fileInput {
			visibility: hidden;
		}
		p {
			color: #324963;
		}
		span {
			color: #6b85a3;
		}
		a {
			text-decoration: none;
			color: #4991e5;
		}
		.logo-holder {
			position: relative;
	    border-radius: 100px;
	    display: flex;
	    margin-bottom: 10px;
      background: white;
	    .CircularProgressbar  {
	    	position: absolute;
	    }
			.logo-preview {
				margin: 20px;
				width: 50px;
				height: 50px;
			}
		}
	}
`
const Uploader = ({
	uploadStart,
	uploadFinish
}: {
	uploadStart?: () => void,
	uploadFinish?: (file?: File) => void
}) => {
	const [logo, setLogo] = useState(null)
	const [status, setStatus] = useState(0)
	const [dragging, setDragging] = useState(false)
	const [percentage, setPercentage] = useState(0)
	const fileRef = useRef(null)
	const statusMessages = [
		'Drag & drop here',
		'Uploading',
		'Drag & drop here to replace'
	]

	useEffect(() => {
	 window.addEventListener("dragover",function(e){
      e = e || event;
      e.preventDefault();
    },false);
    window.addEventListener("drop",function(e){
      e = e || event;
      e.preventDefault();
    },false);
	}, [])

	const uploadFile = (file: File) => {
		setStatus(1)
		setPercentage(0)
		if (uploadStart) {
			uploadStart()
		}
		new Promise((resolve, reject) => {
			const reader = new FileReader();
	    reader.readAsDataURL(file);
	    reader.onload = () => resolve(reader.result);
	    reader.onerror = error => reject(error);
	    setPercentage(50)
	  }).then((file:any) => {
	  	setTimeout(() => {
		  	setLogo(file)
		  	setStatus(2)
		  	setPercentage(100)
		  	if (uploadFinish) {
			  	uploadFinish(file)
		  	}
	  	}, 200)
	  })
	}

	const handleFileChange = (ev: any) => {
		uploadFile(ev.target.files[0])
	}

	const handleFileDrag = (ev: any) => {
		const dt = ev.dataTransfer
	  if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('Files'))) {
	    setDragging(true)
	  }
	}

	const handleDragLeave = () => {
		setDragging(false)
	}

	const handleDropFile = (ev: any) => {
		ev.nativeEvent.preventDefault()
		ev.nativeEvent.stopPropagation()
		const dt = ev.dataTransfer;
		if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('Files'))) {
			setDragging(false)
			let target = ev.dataTransfer || ev.target;
	    let file = target && target.files && target.files[0];
	    uploadFile(file)
	  }
	}

	const clickToUpload = (ev: any) => {
		ev.preventDefault()
		if (fileRef && fileRef.current) {
			fileRef.current.click()
		}
	}

	return (
		<UploaderWrapper>
			<div className="uploader-header">
				<h3>Company Logo</h3>
				<p>Logo should be squre, 100px size and in png,jpeg file format</p>
			</div>
			<div className={`uploader-body ${dragging?'dragging':''}`}
				onDragOver={handleFileDrag}
				onDragLeave={handleDragLeave}
				onDrop={handleDropFile}
			>
				{dragging}
				<div className="logo-holder">
					<CircularProgressbar
						strokeWidth={1}
						value={percentage}
						text=""
						styles={{
							path: {
								stroke: '#4991e5'
							},
							trail: {
								stroke: '#d1e3f8'
							}
						}}
					/>
					<img className="logo-preview" src={logo || PlaceholderLogo}/>
				</div>
				<p>{statusMessages[status]}</p>
				<span>- or -</span>
				<a href="#" onClick={clickToUpload} >Select file to upload</a>
				<input id="fileInput" type="file" ref={fileRef} onChange={handleFileChange} />
			</div>
		</UploaderWrapper>
	)
}

export default Uploader