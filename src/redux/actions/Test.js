import store from './../Store.js';
import { addToBuffer, addToDataBuffer } from './SocketState.js';

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

export function newQuestion() {
	return {
		type: 'newQuestion'
	};
}

export function AddingToBuffer() {
	let test = store.getState().Test;
	if (test.active !== -1)
		if (test.questions[test.active].changed === 1) {
			store.dispatch(addToBuffer(test.active));
			return;
		}
	//Push the index of the last active question to the buffer of Socket State if there is any change
	if (test.active === -1 && test.changed === 1) {
		let dict = { type: 'testUpdate', payload: { title: test.fields.title, description: test.fields.description } };
		dict = JSON.stringify(dict);
		store.dispatch(addToDataBuffer(dict));
	}
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
	console.log(val);
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
