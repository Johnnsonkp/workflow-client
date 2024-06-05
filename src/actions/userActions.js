import { removeItemFromLocalStorage, setItemToLocalStorage } from "../utils/localstorage";

export const userFormActions = ({
    signup: (formData) => {  
        // return fetch("http://localhost:3000" + "/signup", {
        return fetch("workflow-rails-api.railway.internal" + "/signup", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(formData),
        })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            return data
          }
        });
    },
    login: (formData) => {
      // return fetch("http://localhost:3000" + "/login", {
      return fetch("workflow-rails-api.railway.internal" + "/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
				  Authorization: localStorage.token
        },
        body: JSON.stringify(formData),
      }) .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          return data
        }
      });
    },
})

export const storeUserData = (data, dispatch, action) => {
  const { jwt, user } = data;
  if(dispatch){
    dispatch({ type: action, payload: {
      token: jwt, 
      user_id: user.id, 
      username: user.username, 
      email: user.email
    }})
  }

  if(data){
    setItemToLocalStorage("AUTH", {
      token: jwt, 
      isUserLoggedIn: true, 
      user_id: user.id, 
      username: user.username, 
      email: user.email
    })
  }
}

export const userSignOut = (item) => {
    removeItemFromLocalStorage(item)
}
