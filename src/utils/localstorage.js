export const setItemToLocalStorage = (name, item) => {
    console.log("set locastorag", name, item)
    window.localStorage.setItem( 
        name, 
        JSON.stringify(item) 
    );
}

export const getItemFromLocalStorage = (name) => {
   return JSON.parse(window.localStorage.getItem(name))
}

export const removeItemFromLocalStorage = (name) => {
    return window.localStorage.removeItem(name);
}