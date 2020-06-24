import {
  insertHtmlbyClassName,
  addRemoveClassOnElement,
  appendElementByClassName,
  getInitials,
  invertColor,
} from "./utils.js"
import {
  dayContainer,
  dayLabel,
  bdContainer,
  noBd,
  bdElement,
  hiddenName,
  rightDisplay,
} from "./selectors.js"
class dayWidget {
  constructor({ dayStr }) {
    //create the base template
    this.element = document.createElement("div")
    this.element.classList.add(dayContainer)
    this.element.innerHTML = `
      <div class="${dayLabel}">${dayStr}</div>
      <div class='${bdContainer}'></div>
    `
    this.bdElements = []
    //ignore the space taken by border
    this.elementWH = 180
  }
  getElement() {
    return this.element
  }
  addBd({ name, birthday }) {
    const element = document.createElement("div")
    let randomColor
    try {
      //find a random color
      randomColor = Math.floor(Math.random() * 16777215).toString(16)
      element.style.backgroundColor = "#" + randomColor
      element.style.color = invertColor(randomColor)
    } catch {
      //if random hex cannot be inverted then use default color
      element.style.backgroundColor = "#ccc"
      element.style.color = "#000"
    }
    element.classList.add(bdElement)
    element.style.height = this.elementWH + "px"
    element.style.width = this.elementWH + "px"
    element.innerHTML = `<div>${getInitials(
      name
    )}<div class=${hiddenName}>${name}</div></div>`
    this.bdElements.push({
      name,
      element,
      birthday: new Date(birthday),
    })
    //push birthdays to list and render
    this.reRender()
  }
  //use to rerender new list
  //not used as of now
  updateBdList(bdList) {
    this.bdElements = []
    bdList.map(({ name, birthday }) => {
      addBd({ name, birthday })
    })
    this.reRender()
  }
  reRender() {
    //just common logic applied to every render
    this.sortBd()
    this.updateHeightWidthOfCards()
    this.renderBdCards()
    if (this.bdElements.length) {
      addRemoveClassOnElement(noBd, this.getElement())
    } else {
      addRemoveClassOnElement(noBd, this.getElement(), true)
    }
  }
  removeBd({ name, birthday }) {
    this.bdElements.filter((bdElement) => {
      bdElement.name !== name && bdElement.birthday !== birthday
    })
    this.reRender()
  }
  //find the height widget of cards based on number of birthdays on a given day
  updateHeightWidthOfCards() {
    let ratio = Math.ceil(Math.sqrt(this.bdElements.length))
    if (ratio > 4) {
      ratio = 4
    }
    this.bdElements.map((bdElement) => {
      bdElement.element.style.height = this.elementWH / ratio + "px"
      bdElement.element.style.width = this.elementWH / ratio + "px"
    })
  }
  renderBdCards() {
    //append the html for day to the container
    let ratio = Math.ceil(Math.sqrt(this.bdElements.length))
    this.element.querySelector("." + bdContainer).innerHTML = ""
    this.bdElements.map((bdElement, index) => {
      if ((index + 1) % ratio === 0) {
        bdElement.element
          .querySelector("." + hiddenName)
          .classList.add(rightDisplay)
      } else {
        bdElement.element
          .querySelector("." + hiddenName)
          .classList.remove(rightDisplay)
      }
      this.element.querySelector("." + bdContainer).append(bdElement.element)
    })
  }
  sortBd() {
    //sort birthdays first on date then on name
    this.bdElements = this.bdElements.sort((a, b) => {
      if (a.birthday < b.birthday) {
        return -1
      } else if (a.birthday > b.birthday) {
        return 1
      }
      if (a.name < b.name) {
        return -1
      } else if (a.name > b.name) {
        return 1
      }
      return 0
    })
  }
}

export default dayWidget
