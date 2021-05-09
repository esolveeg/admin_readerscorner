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
const trs = [
  'sell',
  'outcoming order return',
  'outcoming order',
  'sell return',
  'inventory',
  'define products',
  'first balance',
  'transactions',
]
// [0 : sell , 1 : buy return  ] , (+)[2 : buy , 3 : sell return ], (=)[4 : inventory , 5 : define , 6 : first balance] , (+ , -)[7 : transactions]]
export const getTrTitle = (type) => {
  return trs[type]
}
export const getTrType = (title) => {
  return trs.indexOf(title)
}

export const slugify = title => {
    return title
}