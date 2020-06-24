export const insertHtmlbyClassName = (className, htmlString) => {
  if (className[0] !== ".") {
    className = "." + className
  }
  let element = document.querySelectorAll(className)[0]
  element.innerHTML = htmlString
}

export const addRemoveClassOnElement = (className, element, flag) => {
  if (flag) {
    element.classList.add(className)
  } else {
    element.classList.remove(className)
  }
}
export const appendElementByClassName = (className, element) => {
  if (className[0] !== ".") {
    className = "." + className
  }
  let container = document.querySelectorAll(className)[0]
  container.append(element)
}
export const getInitials = (string) => {
  const splitLen = string.split(" ").length
  const firstName = string.split(" ")[0]
  const lastName = string.split(" ")[splitLen - 1]
  let initial = firstName[0]
  if (lastName) {
    initial += lastName[0]
  }
  return initial
}

export const invertColor = (hex) => {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1)
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.")
  }
  // invert color components
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16)
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b)
}

function padZero(str, len) {
  len = len || 2
  var zeros = new Array(len).join("0")
  return (zeros + str).slice(-len)
}

//just a base object
export const weekDays = () => [
  { dayLabel: "MON", birthdays: [] },
  { dayLabel: "TUE", birthdays: [] },
  { dayLabel: "WED", birthdays: [] },
  { dayLabel: "THR", birthdays: [] },
  { dayLabel: "FRI", birthdays: [] },
  { dayLabel: "SAT", birthdays: [] },
  { dayLabel: "SUN", birthdays: [] },
]

export const getWeekDay = (date) => new Date(date).getDay()

export const getYear = (date) => new Date(date).getFullYear()
