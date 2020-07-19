import React from 'react';
import styles from './css/Question.module.css';

import { connect } from 'react-redux';
import { addToDataBuffer } from './../../redux/actions/SocketState.js';
import { imageUploaded } from './../../redux/actions/Test.js';

function Image(props) {
	return (
		<React.Fragment>
			<div class="custom-file mt-4 mb-4 ml-4" id={styles.imageUpload}>
				<input
					className="custom-file-input"
					id="customFile"
					type="file"
					accept="image/*"
					name="image"
					onChange={(event) => {
						let file = event.target.files[0];
						let reader = new FileReader();

						reader.onload = (event) => {
							//needs more optomised preprocessing for sending over sockets
							let res = event.target.result;
							var byteArray = new Uint8Array(res);
							let data = Array.from(byteArray);
							let dict = {
								//Format for sending data to backend
								type: 'imageUpload',
								payload: {
									key: props.question.pk,
									name: file.name,
									image: data,
									index: props.active
								}
							};
							dict = JSON.stringify(dict);
							props.addToDataBuffer(dict);
							props.putSpinner(props.active);
						};
						reader.readAsArrayBuffer(file); //Preprocessing image by converting it to array for sendingit bya socket
					}}
				/>
				<label class="custom-file-label" htmlFor="customFile">
					Choose file
				</label>
			</div>
			<div
				className={props.question.fields.image}
				role="status"
				style={{ display: props.question.fields.image === 'spinner-border' ? '' : 'none' }}
			/>
			<img
				className={[ 'm-2 ml-4 pl-4 w-50' ].join(' ')}
				alt="not found"
				style={{
					display:
						props.question.fields.image === '' || props.question.fields.image === 'spinner-border'
							? 'none'
							: 'inline-block'
				}}
				src={
					props.question.fields.image === '' || props.question.fields.image === 'spinner-border' ? (
						'#'
					) : (
						window.media_url + props.question.fields.image
					)
				}
			/>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		active: state.Test.active,
		question: state.Test.questions[state.Test.active]
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addToDataBuffer: (data) => dispatch(addToDataBuffer(data)),
		putSpinner: (index) => dispatch(imageUploaded(index, 'spinner-border'))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Image);
