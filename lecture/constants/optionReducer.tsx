interface MultieChange {
	type: string,
	value: object,
}

interface Change {
	type: string,
	value: object,
	name: string,
}

export const optionReducer = (state: object, action: Change | MultieChange): object => {
	switch (action.type) {
		case (action as Change).type:
			return {
				...state,
				[(action as Change).name]: action.value,
			}
		case (action as MultieChange).type:
			return {
				...state,
				...action.value,
			}
		default:
			return state;
	}
	// let isChange: string = (action as Change).name
	// if((action as Change).name) { // change 라는 소리

	// }

	// if(action.type === 'CHANGE') {
		
	// }

	// if(action.type === 'MULTIPLE_CHANGE') {

	// }


	// return state
  
}