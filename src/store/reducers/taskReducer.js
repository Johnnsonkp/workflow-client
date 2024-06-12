const taskReducer = (state, action) => {
	let newState;
	switch (action.type) {
		case "CREATE_TASK": 
			return {
				...state,
				latestTask: action.payload
			}
            break;
		case "ALL_TASK": 
			return {
				...state,
				tasks: action.payload
			}
            break;
		default:
			return state;
	}
};

export default taskReducer;