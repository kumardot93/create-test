import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './css/Question.module.css';
import Choices from './Choices.js';
import Image from './Image.js';
import Test from './Test.js';
import OverlayDeleteQuestion from './OverlayDeleteQuestion.js';

import { connect } from 'react-redux';
import {
	updateActiveQuestionText,
	updateAnswer,
	updateMarks,
	updateType,
	deleteQuestion
} from './../../redux/actions/Test.js';

class Question extends Component {
	deleteQuestion = () => {
		this.props.deleteQuestion(this.props.active, this.props.question.pk);
	};

	RequestQuestionDelete = (event) => {
		let el = document.getElementById('overlay');
		el.style.display = 'block';
		ReactDOM.render(<OverlayDeleteQuestion qno={this.props.active + 1} deleteQuestion={this.deleteQuestion} />, el);
	};

	render() {
		return (
			<div id={styles.questionMain} className="p-1 ml-2 flex-fill mr-1 bg-light pr-4">
				{this.props.question === undefined || this.props.active === -1 ? (
					<Test />
				) : (
					<React.Fragment>
						<div className="d-flex flex-row">
							<h1 className={[ 'ml-2 mt-4 mr-2', styles.qno ].join(' ')}>Q.{this.props.active + 1}</h1>
							<textarea
								className="mt-4 form-control"
								value={this.props.question.fields.text}
								onChange={(ev) => this.props.updateActiveQuestionText(ev.target.value)}
								placeholder="Write your question text here"
								cols="80"
								rows="6"
							/>
						</div>

						<Image />
						<br />

						{[ 'O', 'M', 'ON', 'MP', 'MN', 'MNP' ].includes(this.props.question.fields.type) ? (
							<Choices /> //Fout choices and handling updating answer of the question
						) : this.props.question.fields.type === 'F' ? (
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
						) : this.props.question.fields.type === 'D' && this.props.test.fields.revealAnswers ? (
							<div className="d-flex flex-row align-items-top mt-4">
								<label className="pl-4 mr-4">Answer:</label>
								<textarea
									className="p-2 form-control"
									rows={4}
									placeholder="Write your answer here..."
									value={this.props.question.fields.answer}
									onChange={(ev) => this.props.updateAnswer(ev.target.value)}
								/>
							</div>
						) : (
							''
						)}
						<div className={[ styles.rightpannel, 'p-2 mt-4 pr-4' ].join(' ')}>
							<label>Marks:</label>
							<input
								className={[ 'form-control ml-4', styles.marksinp ].join(' ')}
								value={this.props.question.fields.marks}
								type="number"
								min="0"
								onChange={(ev) =>
									this.props.updateMarks(parseInt(ev.target.value === '' ? 0 : ev.target.value))}
							/>
							<br />
							<label className="mt-4">Question Type:</label>
							<select
								className="form-control"
								value={this.props.question.fields.type}
								onChange={(ev) => this.props.updateType(ev.target.value)}
							>
								<option value="D">Descriptive</option>
								<option value="F">Fill</option>
								<option value="O">One Option Correct</option>
								<option value="ON">One Option Correct(Negative Marking)</option>
								<option value="M">Multiple Option Correct</option>
								<option value="MP">Multile Option Correct(Partially correct)</option>
								<option value="MN">Multiple Option Correct(Negative Marking)</option>
								<option value="MPN">
									Multiple Option Correct(Patrially correct and Neative marking)
								</option>
							</select>
							<button
								className="btn btn-danger mt-4 float-right material-icons"
								onClick={this.RequestQuestionDelete}
							>
								delete
							</button>
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
		updateType: (val) => dispatch(updateType(val)),
		deleteQuestion: (index, pk) => dispatch(deleteQuestion(index, pk))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
