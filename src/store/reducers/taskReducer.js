const taskReducer = (state, action) => {
	switch (action.type) {
		case "CREATE_TASK": 
			return {
				...state,
				task: action.payload
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