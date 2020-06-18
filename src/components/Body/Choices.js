import React, { Component } from 'react';
import styles from './css/Question.module.css';

import { connect } from 'react-redux';
import { updateChoice } from './../../redux/actions/Test.js';
import { updateAnswer } from './../../redux/actions/Test.js';

class Choices extends Component {
	answerHandler = (ev, index) => {
		let ans = this.props.question.fields.answer;
		ans = ans.split('');
		ans = ans.map((data) => parseInt(data));
		if (this.props.question.fields.type === 'O') {
			ans = [ 0, 0, 0, 0 ];
			ans[index - 1] = 1;
		} else {
			ans[index - 1] = (ans[index - 1] + 1) % 2;
		}
		this.props.updateAnswer(ans.join(''));
	};

	render() {
		return (
			<React.Fragment>
				<div className={[ 'p-0 d-flex w-100', styles.choicesCont ].join(' ')}>
					<div className={[ 'p-0 d-flex w-100 align-items-baseline', styles.choicesCont ].join(' ')}>
						<div className="d-flex flex-row align-items-baseline ml-4">
							<input
								type="radio"
								onClick={(ev) => this.answerHandler(ev, 1)}
								checked={this.props.question.fields.answer[0] === '1'}
							/>
							<label className={[ 'ml-1', styles.choicesLabel ].join(' ')}>Choice 1:</label>
						</div>
						<input
							type="text"
							className={[ 'form-control m-4', styles.choices ].join(' ')}
							value={this.props.choices[0] !== undefined ? this.props.choices[0] : ''}
							onChange={(ev) => this.props.updateChoice(1, ev.target.value)}
						/>
					</div>
					<div className={[ 'p-0 d-flex w-100 align-items-baseline', styles.choicesCont ].join(' ')}>
						<div className="d-flex flex-row align-items-baseline ml-4">
							<input
								type="radio"
								onClick={(ev) => this.answerHandler(ev, 2)}
								checked={this.props.question.fields.answer[1] === '1'}
							/>
							<label className={[ 'ml-1', styles.choicesLabel ].join(' ')}>Choice 2:</label>
						</div>
						<input
							type="text"
							className={[ 'm-4 form-control', styles.choices ].join(' ')}
							value={this.props.choices[1] !== undefined ? this.props.choices[1] : ''}
							onChange={(ev) => this.props.updateChoice(2, ev.target.value)}
						/>
					</div>
				</div>
				<div className={[ 'p-0 d-flex w-100', styles.choicesCont ].join(' ')}>
					<div className={[ 'p-0 d-flex w-100 align-items-baseline', styles.choicesCont ].join(' ')}>
						<div className="d-flex flex-row align-items-baseline ml-4">
							<input
								type="radio"
								onClick={(ev) => this.answerHandler(ev, 3)}
								checked={this.props.question.fields.answer[2] === '1'}
							/>
							<label className={[ 'ml-1', styles.choicesLabel ].join(' ')}>Choice 3:</label>
						</div>
						<input
							type="text"
							className={[ 'form-control m-4', styles.choices ].join(' ')}
							value={this.props.choices[2] !== undefined ? this.props.choices[2] : ''}
							onChange={(ev) => this.props.updateChoice(3, ev.target.value)}
						/>
					</div>
					<div className={[ 'p-0 d-flex w-100 align-items-baseline', styles.choicesCont ].join(' ')}>
						<div className="d-flex flex-row align-items-baseline ml-4">
							<input
								type="radio"
								onClick={(ev) => this.answerHandler(ev, 4)}
								checked={this.props.question.fields.answer[3] === '1'}
							/>
							<label className={[ 'ml-1', styles.choicesLabel ].join(' ')}>Choice 4:</label>
						</div>
						<input
							type="text"
							className={[ 'form-control m-4', styles.choices ].join(' ')}
							value={this.props.choices[3] !== undefined ? this.props.choices[3] : ''}
							onChange={(ev) => this.props.updateChoice(4, ev.target.value)}
						/>
					</div>
				</div>
				<span className="text-muted ml-4">Sellect correct answer/answers.</span>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		active: state.Test.active,
		choices:
			state.Test.questions[state.Test.active].fields.jsonChoices !== ''
				? JSON.parse(state.Test.questions[state.Test.active].fields.jsonChoices)
				: [],
		question: state.Test.questions[state.Test.active]
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateChoice: (cindex, cdata) => dispatch(updateChoice(cindex, cdata)),
		updateAnswer: (ans) => dispatch(updateAnswer(ans))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Choices);
