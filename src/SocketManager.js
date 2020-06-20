import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Message from './components/Message.js';

import store from './redux/Store.js';
import { connect } from 'react-redux';
import { updateTestData, imageUploaded, updateActive, updatePk } from './redux/actions/Test.js';
import {
	setSocket,
	connected,
	sending,
	saved,
	disconnected,
	dataBufferShift,
	socketError
} from './redux/actions/SocketState.js';

class SocketManager extends Component {
	constructor(props) {
		super(props);
		this.error = 0;
		this.ws = null;
		this.test_initilized = 0;
	}

	InitilizeBackend = () => {
		// initilizing backend for test
		let key = extractKey(); //getting pk of test
		key = parseInt(key);
		let raw_data = { type: 'initilization', payload: { key: key, test_initilized: this.test_initilized } }; //formatting according to backend
		this.ws.send(JSON.stringify(raw_data));
	};

	NewWebSocket = () => {
		let p = window.location.protocol;
		let scheme = 'wss://';
		if (p == 'http:') scheme = 'ws://'; // adjusting for ws and wss

		this.ws = new WebSocket(scheme + window.hostName + '/ws/material/testMaker/');

		//When the socket wil open tis method will will send the socket to redux ScketState and initilize the backend will the test
		this.ws.onopen = () => {
			this.props.setSocket(this.ws);
			this.InitilizeBackend(); //initilizing backend for the test
		};

		this.ws.onmessage = (ev) => {
			let msg = JSON.parse(ev.data); // received data as json string so parse
			switch (msg.type) {
				case 'connected':
					if (this.test_initilized === 0) this.props.updateTestData(msg.testData);
					this.props.socketConnected(); // setting is ready flag of socket state to 1
					this.test_initilized = 1;
					break;
				case 'saved': // saved question
					this.error = 0;
					if ((msg.code = 'SNQ')) {
						//if saved question was new question
						let socketState = store.getState().SocketState;
						let index = socketState.buffer[0]; //index of the last send question data
						store.dispatch(updatePk(index, msg.key)); // updating pk of new question after saving to backend
					}
					this.props.saved(); //shifting buffer and setting is ready flag to 1 for next data transfer
					break;
				case 'imageUploaded':
					this.error = 0;
					this.props.imageUploaded(msg.index, msg.image); // setting image in test.question after saved in backend
					this.props.dataBufferShift();
					break;
				case 'dataUploaded':
					this.error = 0;
					this.props.dataBufferShift(); //shifting the data buffer array and setting the is ready flag to 1
					break;
				case 'error':
					switch (msg.code) {
						case 'NI': // not initilized error thus initilize again
							this.props.disconnected();
							this.InitilizeBackend();
							break;
						default:
							this.props.disconnected();
							this.ws.close();
					}
					break;
				default:
					break;
			}
		};

		// if the socket closes thisfunction will to try to reconnect after 5 seconds
		this.ws.onclose = (ev) => {
			if (this.error === 0) {
				this.props.disconnected();
				setTimeout(this.NewWebSocket, 5000);
			}
		};

		//if there is any error in connection this function will try to reconnect after 15 seconds
		this.ws.onerror = (ev) => {
			console.log('error');
			this.error += 1;
			if (this.error < 5) {
				this.props.disconnected();
				setTimeout(this.NewWebSocket, 5000);
			} else {
				this.props.SocketError();
			}
		};
	};

	componentDidMount = () => {
		this.NewWebSocket(); //creating new websocket and setting the socket parameters on the component mounts
	};

	BufferManager = () => {
		if (this.props.isready === 0) return;
		let questions = store.getState().Test.questions;
		if (this.props.buffer.length !== 0) {
			let qstn = questions[this.props.buffer[0]];
			let data = {
				type: 'questionUpdate',
				payload: qstn
			};
			data = JSON.stringify(data);
			this.props.sendingData(); //setting the socket status to saving and is ready flag to 0
			this.ws.send(data);
			return;
		} else if (this.props.dataBuffer.length !== 0) {
			let data = this.props.dataBuffer[0];
			this.props.sendingData(); //setting the socket status to saving and is ready flag to 0
			this.ws.send(data);
		}
	};

	render() {
		this.BufferManager();
		return (
			<React.Fragment>
				<button
					className="float-right mr-4 mb-4 mt-1 btn btn-success"
					onClick={() => {
						this.props.updateActive(this.props.active); //To add data to buffer
					}}
				>
					save
				</button>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		active: state.Test.active,
		dataBuffer: state.SocketState.dataBuffer,
		buffer: state.SocketState.buffer,
		isready: state.SocketState.isready
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateTestData: (data) => dispatch(updateTestData(data)), //to store the test data received from backend
		setSocket: (ws) => dispatch(setSocket(ws)),
		socketConnected: () => dispatch(connected()),
		sendingData: () => dispatch(sending()),
		saved: () => dispatch(saved()),
		imageUploaded: (index, image) => dispatch(imageUploaded(index, image)),
		dataBufferShift: () => dispatch(dataBufferShift()),
		disconnected: () => dispatch(disconnected()),
		updateActive: (index) => dispatch(updateActive(index)),
		SocketError: () => dispatch(socketError())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SocketManager);

var extractKey = () => {
	//extracts the pk form the url
	let url = window.location.href;
	let size = url.length;
	let lastindexofSlash = url.lastIndexOf('/');
	if (lastindexofSlash === size - 1) {
		url = url.slice(0, -1);
		lastindexofSlash = url.lastIndexOf('/');
	}
	return url.substring(lastindexofSlash + 1);
};

export { extractKey };
