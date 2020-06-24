import initWeek from "./weekWidget.js"
import {
  weekContainer,
  error,
  showError,
  yearInput,
  jsonInput,
  updateCta,
} from "./selectors.js"
import { addRemoveClassOnElement } from "./utils.js"

const listener = ({ myStorage, weekData }) => {
  try {
    const year = parseInt(document.querySelector(yearInput).value || 0)
    if (year < 1 || year > 9999) {
      throw new Error()
    }
    let data = document.querySelector(jsonInput).value
    data = data.replace(/'/g, '"')
    data = JSON.parse(data)
    myStorage.setItem("json-input", JSON.stringify({ bdData: data, year }))
    document.querySelector("." + weekContainer).innerHTML = ""
    //on click event
    //rerender the week calendar with new data
    weekData.render(data, year)
    addRemoveClassOnElement(showError, document.querySelector(error))
  } catch (err) {
    addRemoveClassOnElement(showError, document.querySelector(error), true)
  }
}
const initWorkArea = () => {
  const myStorage = window.localStorage
  const storageData = myStorage.getItem("json-input")
  const JSONdata = JSON.parse(storageData || '{"bdData":[],"year":""}')
  //check localstorage
  //if data exists use that for initial
  //if not then use empty base object
  const weekData = new initWeek(JSONdata.bdData, JSONdata.year || 0)
  document.querySelector(jsonInput).value = JSON.stringify(JSONdata.bdData)
  document.querySelector(yearInput).value = JSONdata.year
  document.querySelector(updateCta).addEventListener("click", () => {
    listener({ myStorage, weekData })
  })
}
initWorkArea()
