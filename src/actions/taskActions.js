import { getItemFromLocalStorage, removeItemFromLocalStorage, setItemToLocalStorage } from "../utils/localstorage";

const token = getItemFromLocalStorage('token')
const baseURL = import.meta.env.VITE_API_KEY

export const taskFormActions = ({
    create: (formData, userData) => {  
        // return fetch("http://localhost:3000" + "/tasks", {

        console.log("userData", userData)
        return fetch(baseURL + "tasks", {
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
            number: formData.number || null,
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
          } else {
            console.log("task created", data)
            return data
          }
        });
    },
    get: (userData) => {
      // return fetch("http://localhost:3000" + "/tasks", {
      return fetch(baseURL + "tasks", {
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
          console.log("task error", data.error)
          // alert(data.error);
        } else {
          return data
        }
      });
    },

    update: (formData, userData, taskID) => {
      console.log("update formData", formData)
      
      return fetch(baseURL + `/tasks/${taskID}`, {
      // return fetch("workflow-rails-api-production.up.railway.app" + `/tasks/${taskID}`, {
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
          number: formData.number,
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
          console.log("task updated", data)
          return data
        }
      });
    },

    delete: (userData, taskID) => {
        // return fetch("http://localhost:3000" + `/tasks/${taskID}`, {
        return fetch(baseURL + `tasks/${taskID}`, {
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
      if(data && dispatch){
        dispatch({ type: action, payload: {
          id: data.id,
          title: data.title,
          description: data.description,
          number: data.number,
          status: data.status,
          order: data.order,
          start_date: data.start_date,
          time_to_start: data.time_to_start,
          time_to_finish: data.time_to_finish,
          // user_id: data.user_id
        }})

        dispatch({type: "STATE_REFRESH", payload: true})
      }
}

export const storeTaskObj = (data, dispatch, action) => {
  if(dispatch){
    return dispatch({ type: action, payload: data})
  }
}