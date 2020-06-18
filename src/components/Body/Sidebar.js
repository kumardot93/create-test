import React, { Component } from 'react';
import styles from './css/Sidebar.module.css';
import Question from './Question.js';
import QuestionsBtns from './QuestionsBtns.js';

import { connect } from 'react-redux';
import { newQuestion } from './../../redux/actions/Test.js';

//Side bar or the container of the question buttons also the entry point for the qustion body
class Sidebar extends Component {
	render() {
		return (
			<React.Fragment>
				<div id={styles.sidebarMain} className="p-1 bg-secondary">
					<h1 className="display-4 bg-info text-light pl-2" id={styles.sideHead}>
						Questions
						<button //to add a new question
							className="material-icons p-0 btn btn-primary"
							id={styles.addBtn}
							onClick={this.props.newQuestion}
						>
							add
						</button>
					</h1>
					{/* Container of all the qustion numbers as buttons to navigate */}

					<QuestionsBtns />
				</div>
				{/* Container of the Question body */}
				<Question />
			</React.Fragment>
		);
	}
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
	return {
		newQuestion: (event) => dispatch(newQuestion()) //Adds a new question to the reduxt state
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
