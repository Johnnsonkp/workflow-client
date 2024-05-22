const taskReducer = (state, action) => {
	switch (action.type) {
		case "CREATE_TASK": 
			return {
				...state,
				task: action.payload
			}
            break;
		default:
			return state;
	}
};

export default taskReducer;