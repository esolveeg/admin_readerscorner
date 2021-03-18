export const serializeQuery = query => {
    return Object.keys(query)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');
}
  
export const removeFromArrayByVal = (item , array) => {
  let index = array.indexOf(item);
    if (index !== -1) {
        array.splice(index, 1);
    }

    return array
}