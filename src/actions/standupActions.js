const baseURL = import.meta.env.VITE_API_KEY

export const standupFormActions = ({
    create: (formData, userData) => {  
        return fetch(baseURL + "standups", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: userData.token
          },
          body: JSON.stringify({
            date: formData.date,
            user_id: userData.user_id,
            standup_tasks:[
                {title: formData.standup_tasks[0].title, complete: formData.standup_tasks[0].complete},
                {title: formData.standup_tasks[1].title, complete: formData.standup_tasks[1].complete},
                {title: formData.standup_tasks[2].title, complete: formData.standup_tasks[2].complete},
            ],
          }),
        })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          if (data.error) {
            console.log("standup error", data.error)
          } else {
            console.log("standup created", data)
            return data
          }
        });
    },
    get: (userData) => {
      return fetch(baseURL + "standups", {
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
    getAll: (userData) => {
      return fetch(baseURL + "standups/all", {
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

    update: (formData, userData) => {
      console.log("update formData", formData)
      
      return fetch(baseURL + `standups/${formData.id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: userData.token
        },
        body: JSON.stringify({
          date: formData.date,
          id: formData.id,
          user_id: userData.user_id,
          standup_tasks:[
              {id_1: formData.standup_tasks[0].id, title: formData.standup_tasks[0].title, complete: formData.standup_tasks[0].complete},
              {id_2: formData.standup_tasks[1].id, title: formData.standup_tasks[1].title, complete: formData.standup_tasks[1].complete},
              {id_3: formData.standup_tasks[2].id, title: formData.standup_tasks[2].title, complete: formData.standup_tasks[2].complete},
          ],
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