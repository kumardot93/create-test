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
					className={[ 'btn btn-dark m-2', styles.btns ].join(' ')}
					key={index}
					onClick={() => this.props.updateActive(index)}
					//update active questin on change also push to buffer for sending to backend i there is any change se the corrosponding action in redux/action/Top.js
					disabled={index === this.props.active} //Disabled so that user cannotdo multiple cicks on same button
				>
					{index + 1}
				</button>
			);
		});
		return (
			<div id={styles.qBtnsCont}>
				<button
					className={[ 'btn btn-dark m-2 form-control w-25', styles.btns ].join(' ')}
					onClick={() => this.props.updateActive(-1)}
					//update active questin to test data also push to buffer for sending to backend i there is any change se the corrosponding action in redux/action/Top.js
					disabled={-1 === this.props.active}
				>
					Test
				</button>
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
