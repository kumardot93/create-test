const Test = (state = { active: -1, questions: [], fields: {}, changed: 0 }, action) => {
	state = { ...state };
	switch (action.type) {
		case 'updateTestData':
			state = { ...action.payload };
			break;
		case 'newQuestion':
			state.questions = [
				...state.questions,
				{
					pk: null,
					fields: {
						parent_test: state.pk,
						text: '',
						type: '',
						image: '',
						marks: 0,
						answer: '',
						jsonChoices: ''
					}
				}
			];
			if (state.active !== -1) {
				state.questions[state.active].changed = 0;
			} else if (state.active === -1) {
				state.changed = 0;
			}
			state.active = state.questions.length - 1;
			break;
		case 'updateActive':
			if (state.active !== -1) {
				state.questions[state.active].changed = 0;
			} else if (state.active === -1) {
				state.changed = 0;
			}
			state.active = action.payload;
			break;
		case 'updateTestTitle':
			state.fields.title = action.payload;
			state.changed = 1;
			break;
		case 'updateTestDescription':
			state.fields.description = action.payload;
			state.changed = 1;
			break;
		case 'updateTestAccess':
			state.fields.access = action.payload;
			state.changed = 1;
			break;
		case 'updateTestAccessKey':
			state.fields.accessKey = action.payload;
			state.changed = 1;
			break;
		case 'updateTestDuration':
			state.fields.duration = action.payload;
			state.changed = 1;
			break;
		case 'updateActiveQuestionText':
			state.questions[state.active].fields.text = action.payload;
			state.questions[state.active].changed = 1;
			state.questions[state.active] = { ...state.questions[state.active] };
			break;
		case 'updateActiveAnswer':
			state.questions[state.active].fields.answer = action.payload;
			state.questions[state.active].changed = 1;
			state.questions[state.active] = { ...state.questions[state.active] };
			break;
		case 'updateActiveMarks':
			state.questions[state.active].fields.marks = action.payload;
			state.questions[state.active].changed = 1;
			state.questions[state.active] = { ...state.questions[state.active] };
			break;
		case 'updateActiveQuestionType':
			state.questions[state.active].fields.type = action.payload;
			state.questions[state.active].changed = 1;
			if (action.payload == 'O' || action.payload == 'M') {
				state.questions[state.active].fields.answer = '0000';
			} else {
				state.questions[state.active].fields.answer = '';
			}
			state.questions[state.active] = { ...state.questions[state.active] };
			break;
		case 'updateActiveChoices':
			let c = state.questions[state.active].fields.jsonChoices;
			c = c === '' ? [] : JSON.parse(c);
			c[action.payload.cindex - 1] = action.payload.cdata;
			state.questions[state.active].fields.jsonChoices = JSON.stringify(c);
			state.questions[state.active].changed = 1;
			state.questions[state.active] = { ...state.questions[state.active] };
			break;
		case 'imageUploaded':
			state.questions[action.payload.index].fields.image = action.payload.image;
			state.questions[action.payload.index] = { ...state.questions[action.payload.index] };
			break;
		default:
			break;
	}
	return state;
};

export default Test;
