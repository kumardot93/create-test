//ver0: resolved
import React, { Component } from 'react';
import CloseOverlay from '../CloseOverlay.js';
import styles from './css/OverlayForm.module.css';

/*Everything similar to OverlayForm.js 
submit button text changed to delete*/

class OverlayDeleteForm extends Component {
	submitHandler = (event) => {
		event.preventDefault();
		this.props.deleteQuestion();
		CloseOverlay(styles.overlaymain);
	};

	render() {
		return (
			<div className="container bg-light" id={styles.overlaymain}>
				<button id={styles.cross} onClick={(event) => CloseOverlay(styles.overlaymain)}>
					<i className="material-icons">cancel</i>
				</button>
				<h1 className="text-center display-4">Delete Question</h1>
				<label className="alert-danger form-control" style={{ width: '95%', height: 'auto' }}>
					Are you sure to delete question no {this.props.qno}
				</label>

				<button
					style={{ marginTop: '10px' }}
					className="btn btn-danger"
					id={styles.submit}
					onClick={this.submitHandler}
				>
					Delete
				</button>
			</div>
		);
	}
}

export default OverlayDeleteForm;
