const stepFunction1 = (offset, length, median = 0) => {
  length = Math.floor(length)
  if (length <= 1) return [median]
  
  let x = []
  
  for(let i = 0; i < length; i++) {
      x.push(-offset + median + i * (2 * offset / (length - 1)))
  }

  return x
}

// Example: 
//  stepFunction2(-180, 180, 1) => [-180]
//  stepFunction2(-180, 180, 2) => [-180, 0]
//  stepFunction2(-180, 180, 3) => [-180, -60, 60]
//  used for angle
const stepFunction2 = (start = 0, finish = 0, count = 1) => {
  let s = Math.min(start, finish)
  let f = Math.max(start, finish)
  let step = (f - s) / count;
  let temp = []
  for(let x = 0; x < count; x++) {
    let calc = s + (step * x)
    temp.push(calc)
  }

  return temp
}

// Example: 
//  stepFunction3(-180, 180, 1) => [180]
//  stepFunction3(-180, 180, 2) => [-180, 180]
//  stepFunction3(-180, 180, 3) => [-180, 0, 180]
//  used for speed?
const stepFunction3 = (start = 0, finish = 0, count = 1) => {
  let temp = stepFunction2(start, finish, count - 1)
  temp.push(finish)

  return temp
} 

const radToDeg = (rad) => {
  return rad * 180 / Math.PI
}

const degToRad = (deg) => {
  return deg * Math.PI / 180
}

export {stepFunction1, stepFunction2, stepFunction3, radToDeg, degToRad}