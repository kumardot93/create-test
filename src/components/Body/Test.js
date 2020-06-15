import React, { Component } from 'react';
import styles from './css/Question.module.css';

import { connect } from 'react-redux';
import {
	updateTitle,
	updateDescription,
	updateTestAccess,
	updateTestData,
	updateTestDuration,
	updateTestAccessKey
} from './../../redux/actions/Test.js';

class Test extends Component {
	render() {
		let marks = 0;
		this.props.questions.forEach((data) => {
			marks += data.fields.marks;
		});
		return (
			<div className="p-4">
				<label>Test Title:</label>
				<input
					type="text"
					className="form-control "
					value={this.props.test.fields.title}
					onChange={(event) => this.props.updateTitle(event.target.value)}
				/>
				<div class="custom-control custom-switch mt-2 d-flex flex-row align-items-center">
					<input
						type="checkbox"
						class="custom-control-input"
						id="switch"
						checked={this.props.test.fields.duration !== -1}
						onChange={(ev) =>
							this.props.test.fields.duration !== -1
								? this.props.newDuration(-1)
								: this.props.newDuration(10)}
					/>
					<label class="custom-control-label" for="switch">
						Duration(minutes):
					</label>
					<input
						type="number"
						className="form-control w-25 d-inline ml-2"
						value={this.props.test.fields.duration === -1 ? '' : this.props.test.fields.duration}
						onChange={(ev) =>
							this.props.newDuration(ev.target.value == '' ? -1 : parseInt(ev.target.value))}
					/>
				</div>
				<label className="mt-3">Description:</label>
				<textarea
					className="form-control mb-4"
					id={styles.desc}
					rows="15"
					value={this.props.test.fields.description}
					onChange={(event) => this.props.updateDescription(event.target.value)}
				/>
				<div class="custom-control custom-switch mt-2 d-flex flex-row align-items-center">
					<input
						type="checkbox"
						class="custom-control-input"
						id="switch2"
						checked={this.props.test.fields.access === 1}
						onClick={(ev) => this.props.newAccess((this.props.test.fields.access + 1) % 2)}
					/>
					<label class="custom-control-label" for="switch2">
						private
					</label>
				</div>
				<div style={{ display: this.props.test.fields.access === 1 ? 'block' : 'none' }}>
					<label styles={{ display: 'block' }}>Access Key:</label>
					<input
						type="text"
						className="form-control w-25 d-inline ml-2"
						value={this.props.test.fields.accessKey}
						onChange={(ev) => this.props.newAccessKey(ev.target.value)}
					/>
				</div>
				<div className="float-right">
					<label>No. of Questions: {this.props.questions.length}</label>
					<br />
					<label>Marks: {marks}</label>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		test: state.Test,
		questions: state.Test.questions
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateTitle: (data) => dispatch(updateTitle(data)),
		updateDescription: (data) => dispatch(updateDescription(data)),
		newDuration: (time) => dispatch(updateTestDuration(time)),
		newAccess: (acc) => dispatch(updateTestAccess(acc)),
		newAccessKey: (ak) => dispatch(updateTestAccessKey(ak))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
