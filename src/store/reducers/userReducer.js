const userReducer = (state, action) => {
	switch (action.type) {
		case "SIGNING_UP": 
			return {
				...state,
				user: action.payload
			}
		case "LOGGING_IN":
			return {
				...state,
				user: action.userInfo
			};

		case "SIGNUP_SUCCESS":
			return {
				...state,
				userAuthStatus: {loading: false, error: '', isUserLoggedIn: true},
				user: action.payload
			};
		case "LOGIN_SUCCESS":
			return {
				...state,
				userAuthStatus: {loading: false, error: '', isUserLoggedIn: true},
				user: action.payload
			};

		case "LOGGED_OUT":
			return {
				...state,
				userAuthStatus: {loading: true, error: '', isUserLoggedIn: false},
				user: null
			};

		case "REFRESH_DASHBOARD":
			const user = action.data.user || action.data;
			return { ...state, user };

		case "AUTH_ERROR":
			return {
				...state,
				userAuthStatus: {loading: true, error: 'Something went wrong!', isUserLoggedIn: false},
				user: null
			};

		default:
			return state;
	}
};

export default userReducer;