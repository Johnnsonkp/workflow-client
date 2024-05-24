import { getItemFromLocalStorage, removeItemFromLocalStorage, setItemToLocalStorage } from "../utils/localstorage";

const token = getItemFromLocalStorage('token')

export const taskFormActions = ({
    create: (formData, userData) => {  
        return fetch("http://localhost:3000" + "/tasks", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: userData.token
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            status: formData.status,
            order: formData.order,
            start_date: formData.start_date,
            time_to_start: formData.time_to_start,
            time_to_finish: formData.time_to_finish,
            user_id: userData.user_id
          }),
        })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          if (data.error) {
            console.log("task error", data.error)
            alert(data.error);
          } else {
            console.log("task created", data)
            return data
          }
        });
    },
    get: (userData) => {
      return fetch("http://localhost:3000" + "/tasks", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: userData.token
        }
      }).then((response) => {
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

    update: (formData, userData, taskID) => {
      return fetch("http://localhost:3000" + `/tasks/${taskID}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: userData.token
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          status: formData.status,
          order: formData.order,
          start_date: formData.start_date,
          time_to_start: formData.time_to_start,
          time_to_finish: formData.time_to_finish,
          user_id: userData.user_id
        }),
      }).then((response) => {
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

    delete: (userData, taskID) => {
        return fetch("http://localhost:3000" + `/tasks/${taskID}`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: userData.token
          }
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
})

export const storeTask = (data, dispatch, action) => {
    if(dispatch){
      dispatch({ type: action, payload: {
        title: data.title,
        description: data.description,
        status: data.status,
        order: data.order,
        start_date: data.start_date,
        time_to_start: data.time_to_start,
        time_to_finish: data.time_to_finish,
        user_id: data.user_id
      }})
    }
  
    // if(data){
    //   setItemToLocalStorage("AUTH", {
    //     token: jwt, 
    //     isUserLoggedIn: true, 
    //     user_id: user.id, 
    //     username: user.username, 
    //     email: user.email
    //   })
    // }
}