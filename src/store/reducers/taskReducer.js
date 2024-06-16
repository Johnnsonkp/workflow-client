const taskReducer = (state, action) => {
	let newState;
	switch (action.type) {
		case "CREATE_TASK": 
			return {
				...state,
				latestTask: action.payload,
				// tasks: [...state.tasks, action.payload ]
			}
            break;

		case "CREATE_TASK_OBJ": 
			return {
				...state,
				tasks: [...state.tasks, action.payload ]
			}
		break;

		case "TASK_DELETED": 
			return {
				...state,
				deletedTask: action.payload
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
