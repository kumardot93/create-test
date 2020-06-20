import React from 'react';
import styles from './css/SocketStatus.module.css';

import { connect } from 'react-redux';

//Displays the status of socket line conected, saving saved etc.
function SocketStatus(props) {
	let disp = 'default';
	//Renders msg according to the state of the socket
	switch (props.socketStatus) {
		case 'connecting':
		case 'saving':
		case 'reconnecting':
			disp = (
				<h6 className="text-muted mb-0 pb-0" id={styles.status}>
					{props.socketStatus}
					{/* Blinking dots */}
					<span id={styles.dot1}>.</span>
					<span id={styles.dot2}>.</span>
					<span id={styles.dot3}>.</span>
				</h6>
			);
			break;
		case 'saved':
			disp = (
				<h6 className="text-muted" id={styles.status}>
					All previous changes saved
				</h6>
			);
			break;
		case 'connected':
			disp = (
				<h6 className="text-muted" id={styles.status}>
					Connected
				</h6>
			);
			break;
		case 'error':
			disp = (
				<h6 className={[ 'text-muted', styles.socketError ].join(' ')} id={styles.status}>
					Error: Your changes won't be save try refreshing the page and report if error prsists
				</h6>
			);
			break;
		default:
			break;
	}
	disp = (
		<h6 className={[ 'text-muted', styles.socketError ].join(' ')} id={styles.status}>
			Error: Your changes won't be save try refreshing the page and report if error prsists
		</h6>
	);
	return <div className="ml-4 pb-0 mt-4">{disp}</div>;
}

const mapStateToProps = (state) => {
	return {
		socketStatus: state.SocketState.status
	};
};

export default connect(mapStateToProps)(SocketStatus);
