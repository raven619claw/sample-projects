import dayWidget from "./dayWidget.js"
import { weekContainer, noBd } from "./selectors.js"
import {
  addRemoveClassOnElement,
  appendElementByClassName,
  weekDays,
  getWeekDay,
  getYear,
} from "./utils.js"

export default class weekWidget {
  constructor(data = {}, year) {
    this.render(data, year)
  }
  transformBdData(data) {
    //take the JSON input and parse it
    //this can be extended to memoize the data
    //and then only update part of week if year remains the same
    const self = this
    data.map(({ name, birthday }) => {
      if (!name && !birthday) {
        return
      }
      const index = self.getDayIndex(birthday)
      if (self.weekCalendar[index].birthdays) {
        self.weekCalendar[index].birthdays.push({ name, birthday })
      } else {
        self.weekCalendar[index].birthdays = [{ name, birthday }]
      }
    })
  }
  render(data, year) {
    //currently on each rerender
    //week data is recreated
    //this can be memoised and only update(add/remove) birthday for specific days using addRemoveBdtoWeek
    this.weekCalendar = weekDays()
    this.transformBdData(data)
    this.weekCalendar = this.weekCalendar.map((dayObject) => {
      //create new dayWidget
      const bdDayWidget = new dayWidget({ dayStr: dayObject.dayLabel })
      appendElementByClassName(weekContainer, bdDayWidget.getElement())
      addRemoveClassOnElement(noBd, bdDayWidget.getElement(), true)
      dayObject.bdDayWidget = bdDayWidget
      //map through the birthdays in data
      dayObject.birthdays.map(({ name, birthday }) => {
        if (year !== getYear(birthday)) {
          return
        }
        //for each matching year add birthday to the daywidget
        bdDayWidget.addBd({
          name,
          birthday,
        })
      })
      return bdDayWidget
    })
  }
  //use this to update same year extra data
  addRemoveBdtoWeek({ name, birthday, flag }) {
    const dayIndex = getDayIndex(birthday)
    if (flag) {
      this.weekCalendar[dayIndex].bdDayWidget.addBd({
        name,
        birthday,
      })
    } else {
      this.weekCalendar[dayIndex].bdDayWidget.removeBd({
        name,
        birthday,
      })
    }
  }
  //use this when year is changed
  //for passing entire new list to a daywidget
  //not used as of now
  updateDay(list, dayIndex) {
    this.weekCalendar[dayIndex].bdDayWidget.updateBdList(list)
  }
  //just to match index as Date object week starts on Sunday
  getDayIndex(birthday) {
    let dayIndex = getWeekDay(birthday) - 1
    if (dayIndex < 0) {
      dayIndex = this.weekCalendar.length - 1
    }
    return dayIndex
  }
}
