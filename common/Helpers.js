export const serializeQuery = query => {
    return Object.keys(query)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');
}
export const  addParamsToLocation = (params , path) => {
    return new Promise( resolve => {
      history.pushState(
          {},
          null,
          path +
          '?' +
          Object.keys(clearNullValues(params))
              .map(key => {
              return (
                  encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
              )
              })
              .join('&')
      )
      window.scrollTo({ top:0, behavior: 'smooth'});
      resolve(true)
    })
}
export const clearNullValues = arr => {
    const clone = {...arr}
    Object.keys(clone).forEach(key => {
      clone[key] === null || ''? delete clone[key] : ''
    })
    return clone
  }
export const removeFromArrayByVal = (item , array) => {
  let index = array.indexOf(item);
    if (index !== -1) {
        array.splice(index, 1);
    }

    return array
}

export const slugify = title => {
    return title
}