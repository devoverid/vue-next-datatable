export const objFromDotNotation = (obj, notation) => {
  if (!`${notation}`.includes('.')) return obj[notation]
  let value = undefined
  const dots = notation.split('.')
  for (let i = 0; i < dots.length; i++) {
    value = value === undefined ? obj[dots[i]] : value[dots[i]]
  }
  return value
}
