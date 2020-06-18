import store from './../Store.js';
import { addToBuffer, addToDataBuffer } from './SocketState.js'; //addToBuffer has a higher priority over addToDataBuffer

export function updateTestData(data) {
	let questions = data.questions.map((data) => {
		data['changed'] = 0;
		return data;
	});
	data['questions'] = Object.assign([], questions);
	data['active'] = -1;
	return {
		type: 'updateTestData',
		payload: data
	};
}

export function AddingToBuffer() {
	let test = store.getState().Test;
	if (test.active !== -1)
		if (test.questions[test.active].changed === 1) {
			store.dispatch(addToBuffer(test.active)); //Add to buffer adds index of the changes question and does the preprocessing just before sending
			return;
		}
	//Push the index of the last active question to the buffer of Socket State if there is any change
	if (test.active === -1 && test.changed === 1) {
		let dict = { type: 'testUpdate', payload: test.fields }; //organizing data as it is to be sent to the backend through socket
		dict = JSON.stringify(dict);
		store.dispatch(addToDataBuffer(dict)); //addToDataBuffer sends data to backend through socket as it is
	}
}

export function newQuestion() {
	AddingToBuffer();
	return {
		type: 'newQuestion'
	};
}

export function updatePk(index, pk) {
	//used by socket manager  when new question is saved to backend ans socket receives its pk
	return {
		type: 'updatePk',
		payload: { index, pk }
	};
}

export function updateActive(index) {
	AddingToBuffer();
	return {
		type: 'updateActive',
		payload: index
	};
}

export function updateActiveQuestionText(text) {
	return {
		type: 'updateActiveQuestionText',
		payload: text
	};
}

export function updateAnswer(ans) {
	return {
		type: 'updateActiveAnswer',
		payload: ans
	};
}

export function updateMarks(marks) {
	return {
		type: 'updateActiveMarks',
		payload: marks
	};
}

export function updateType(val) {
	return {
		type: 'updateActiveQuestionType',
		payload: val
	};
}

export function updateChoice(cindex, cdata) {
	return {
		type: 'updateActiveChoices',
		payload: { cindex, cdata }
	};
}

export function imageUploaded(index, image) {
	return {
		type: 'imageUploaded',
		payload: { index, image }
	};
}

export function updateTitle(data) {
	return {
		type: 'updateTestTitle',
		payload: data
	};
}

export function updateDescription(data) {
	return {
		type: 'updateTestDescription',
		payload: data
	};
}

export function updateTestAccess(data) {
	return {
		type: 'updateTestAccess',
		payload: data
	};
}
export function updateTestAccessKey(data) {
	return {
		type: 'updateTestAccessKey',
		payload: data
	};
}
export function updateTestDuration(data) {
	return {
		type: 'updateTestDuration',
		payload: data
	};
}
