import { removeItemFromLocalStorage, setItemToLocalStorage } from "../utils/localstorage";
const baseURL = import.meta.env.VITE_API_KEY

export const userFormActions = ({
    signup: (formData) => {  
        // return fetch("http://localhost:3000" + "/signup", {
        return fetch(baseURL + "signup", {
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
      return fetch(baseURL + "login", {
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

    show: (formData) => {
      console.log("formData", formData)

      return fetch(baseURL + `users/${formData.user_id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
				  Authorization: formData.token
        }
      }).then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {

          console.log("show route", data)
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
