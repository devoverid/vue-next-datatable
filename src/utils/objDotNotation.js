export const objFromDotNotation = (obj, notation) => {
  return notation.split(".").reduce((o, i) => o?.[i], obj);
}
