export function setSocket(ws) {
	//initilize the socket to soket state
	return {
		type: 'setSocket',
		payload: ws
	};
}

export function addToBuffer(index) {
	return {
		type: 'addToBuffer',
		payload: index
	};
}

export function connected() {
	//set is ready flag to 1
	return {
		type: 'connected',
		payload: null
	};
}

export function sending() {
	return {
		type: 'sendingData',
		payload: null
	};
}

export function saved() {
	//is ready flag to 1 and  update socket status and shift the buffer array
	return {
		type: 'savedData',
		payload: null
	};
}

export function disconnected() {
	return {
		type: 'disconnected',
		payload: null
	};
}

export function addToDataBuffer(data) {
	return {
		type: 'addToDataBuffer',
		payload: data
	};
}

export function dataBufferShift() {
	//is ready flag to 1 and  update socket status and shift the  data buffer
	return {
		type: 'dataBufferShift',
		payload: null
	};
}

export function socketError() {
	return {
		type: 'SocketError',
		payload: null
	};
}
