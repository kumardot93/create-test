import React, { Component } from 'react';
import styles from './css/Question.module.css';
import Choices from './Choices.js';
import Image from './Image.js';
import Test from './Test.js';

import { connect } from 'react-redux';
import {
	updateActiveQuestionText,
	updateAnswer,
	updateMarks,
	updateType,
	updateTitle,
	updateDescription,
	updateTestData
} from './../../redux/actions/Test.js';

class Question extends Component {
	render() {
		return (
			<div id={styles.questionMain} className="p-1 ml-2 flex-grow-1 mr-1 bg-light pr-4">
				{this.props.question === undefined || this.props.active === -1 ? (
					// <div className="d-flex flex-row justify-content-center align-items-center h-100 w-100">
					// 	<h1 className="text-muted">No Question Selected</h1>
					// </div>
					<Test />
				) : (
					<React.Fragment>
						<div className="d-flex flex-row">
							<h1 className={[ 'ml-2 mt-4', styles.qno ].join(' ')}>
								<span className="mr-4 mt-0 pt-0">Q.{this.props.active + 1}</span>
							</h1>
							<textarea
								className={[ 'mt-4 form-control', styles.qtext ].join(' ')}
								value={this.props.question.fields.text}
								onChange={(ev) => this.props.updateActiveQuestionText(ev.target.value)}
								placeholder="Write your question text here"
								cols="80"
								rows="6"
							/>
						</div>

						<Image />
						<br />

						{this.props.question.fields.type === 'O' || this.props.question.fields.type === 'M' ? (
							<Choices />
						) : (
							''
						)}

						{this.props.question.fields.type == 'F' ? (
							<React.Fragment>
								<label className="ml-4 pl-4 mt-4">Answer:</label>
								<input
									className={[ 'ml-4 pl-4 form-control', styles.ansInp ].join(' ')}
									style={{ display: 'inline' }}
									type="text"
									name="answer"
									value={this.props.question.fields.answer}
									onChange={(ev) => this.props.updateAnswer(ev.target.value)}
								/>
							</React.Fragment>
						) : (
							''
						)}
						<div className={[ styles.rightpannel, 'p-2 mt-4 pr-4' ].join(' ')}>
							<label>Marks:</label>
							<input
								className={[ 'form-control ml-4', styles.marksinp ].join(' ')}
								value={this.props.question.fields.marks}
								type="number"
								onChange={(ev) => this.props.updateMarks(parseInt(ev.target.value))}
							/>
							<br />
							<label className="mt-4">Question Type:</label>
							<select
								className="form-control"
								value={this.props.question.fields.type}
								onChange={(ev) => this.props.updateType(ev.target.value)}
							>
								<option value="">---------</option>
								<option value="D">Descriptive</option>
								<option value="O">One_Option_Correct</option>
								<option value="M">Multu_Option_Correct</option>
								<option value="F">Fill</option>
							</select>
						</div>
					</React.Fragment>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ws: state.SocketState.socket,
		active: state.Test.active,
		question: state.Test.questions[state.Test.active],
		test: state.Test
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateActiveQuestionText: (text) => dispatch(updateActiveQuestionText(text)),
		updateAnswer: (ans) => dispatch(updateAnswer(ans)),
		updateMarks: (marks) => dispatch(updateMarks(marks)),
		updateType: (val) => dispatch(updateType(val))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
