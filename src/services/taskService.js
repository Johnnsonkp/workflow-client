export const getTask = async (url) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    const json = await response.json()
    if (response.ok) {
        return json
    }
} 

export const updateTask = async (url) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      }
    })
    const json = await response.json()
    if (response.ok) {
        return json
    }
} 