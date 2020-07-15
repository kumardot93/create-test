import React, { Component } from 'react';
import styles from './css/Sidebar.module.css';
import btnStyles from './css/QuestionsBtns.module.css';
import Question from './Question.js';
import QuestionsBtns from './QuestionsBtns.js';

import { connect } from 'react-redux';
import { newQuestion } from './../../redux/actions/Test.js';

//Side bar or the container of the question buttons also the entry point for the qustion body
class Sidebar extends Component {
	state = {
		menuBtn: btnStyles.btnNavDef
	};
	render() {
		return (
			<React.Fragment>
				<div id={styles.sidebarMain} className="p-1 bg-secondary">
					<h1 className="display-4 bg-info text-light pl-2 mb-1 d-flex flex-row" id={styles.sideHead}>
						<button
							className="material-icons mr-0 pr-0"
							id={styles.menuBtn}
							onClick={(ev) => {
								if (this.state.menuBtn === 'd-flex ' + btnStyles.btnNavDef)
									setTimeout(() => this.setState({ menuBtn: btnStyles.btnNavDef }), 400);
								this.setState({
									menuBtn:
										this.state.menuBtn === btnStyles.btnNavDef
											? 'd-flex ' + this.state.menuBtn
											: this.state.menuBtn === 'd-flex ' + btnStyles.btnNavDef
												? btnStyles.btnNavRem + ' d-flex'
												: 'd-flex ' + btnStyles.btnNavDef
								});
							}}
						>
							menu
						</button>
						Questions
						<button //to add a new question
							className="material-icons p-0 btn btn-primary ml-auto"
							id={styles.addBtn}
							onClick={this.props.newQuestion}
						>
							add
						</button>
					</h1>
					{/* Container of all the qustion numbers as buttons to navigate */}

					<QuestionsBtns menuDisplay={this.state.menuBtn} />
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
