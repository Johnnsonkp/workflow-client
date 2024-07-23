const baseURL = import.meta.env.VITE_API_KEY

export const habitFormActions = ({
    create: (formData, userData) => {  
        return fetch(baseURL + "habits", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: userData.token
          },
          body: JSON.stringify({
            // (title: params[:title], description: params[:description], current_streak: 0, user_id: params[:user_id])
            title: formData.title,
            description: formData.description,
            current_streak: formData.current_streak,
            user_id: userData.user_id,
            complete: formData.complete
          }),
        })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          if (data.error) {
            console.log("Habit error", data.error)
          } else {
            console.log("Habit created", data)
            return data
          }
        });
    },
    get: (userData) => {
      return fetch(baseURL + "habits", {
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
        } else {
          return data
        }
      });
    },
    update: (formData, userData) => {
      console.log("Send update formData", formData)
      return fetch(baseURL + `habits/${formData.id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: userData.token
        },
        body: JSON.stringify(formData),
      }).then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log("habits updated", data)
          return data
        }
      });
    },
    delete: (userData, habitID) => {
        return fetch(baseURL + `habits/${habitID}`, {
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