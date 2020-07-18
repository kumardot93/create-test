import React, { Component } from 'react';
import styles from './css/QuestionsBtns.module.css';

import { connect } from 'react-redux';
import { updateActive } from './../../redux/actions/Test.js';

class QuestionsBtns extends Component {
	render() {
		let questions = '';
		//mapping question buttons from all the available question in redux state
		questions = this.props.questions.map((data, index) => {
			return (
				<button
					className={[
						'btn m-2',
						styles.btns,
						index === this.props.active ? styles.active + ' btn-primary' : 'btn-dark'
					].join(' ')}
					key={index}
					onClick={() => this.props.updateActive(index)}
					//update active questin on change also push to buffer for sending to backend i there is any change se the corrosponding action in redux/action/Top.js
				>
					{index + 1}
				</button>
			);
		});
		return (
			<div id={styles.qBtnsCont} className="d-block m-1">
				<div className={[ 'align-items-stretch', this.props.menuDisplay, styles.bottomNav ].join(' ')}>
					<button
						className={[ 'btn m-1', -1 === this.props.active ? 'btn-primary' : 'btn-light' ].join(' ')}
						onClick={() => this.props.updateActive(-1)}
						//update active questin to test data also push to buffer for sending to backend i there is any change se the corrosponding action in redux/action/Top.js
					>
						Test Description
					</button>
					<button className={[ 'btn m-1', 'btn-light' ].join(' ')} disabled={true}>
						Request Feature
					</button>
					<button className={[ 'btn m-1 mt-auto', 'btn-warning' ].join(' ')} disabled={true}>
						Help Desk
					</button>
				</div>

				{questions}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		active: state.Test.active,
		questions: state.Test.questions
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateActive: (index) => dispatch(updateActive(index))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsBtns);
