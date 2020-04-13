import React, { useEffect, useState } from "react"
import Block from "../_block/_Block"
import moment from "moment-with-locales-es6"
import IconMandat from "images/ui-kit/iconmandat.svg"

const getDates = (date) => {
  moment.locale("fr")
  const now = moment()
  const formatedDate = moment(date)
  const dateDay = formatedDate.day("").format("DD")
  const dateMonth = formatedDate.month("").format("MMMM")
  const dateYear = formatedDate.year()
  const timePassed = -formatedDate.diff(now)
  const yearsPassed = Math.floor(moment.duration(timePassed).asYears())
  const monthsPassed = Math.floor(moment.duration(timePassed).asMonths() % 12)

  return {
    day: dateDay,
    month: dateMonth,
    year: dateYear,
    yearsPassed: yearsPassed,
    monthsPassed: monthsPassed,
  }
}

/**
 * Return deputy's mandate in a Block component
 * @param {*} props
 */
export default function Mandate(props) {
  const [Date, setDate] = useState({
    day: "01",
    month: "janvier",
    year: "2020",
    yearsPassed: "1",
    monthsPassed: "1",
  })
  useEffect(() => {
    setDate(getDates(props.dateBegin))
  }, [props.dateBegin])

  let numberComplement = ""
  props.numberMandates < 2
    ? (numberComplement = "er")
    : (numberComplement = "eme")
  return (
    <Block
      title="Mandats"
      type="mandate"
      color={props.color}
      size={props.size}
      wip={props.wip ? props.wip : false}
    >
      <div className="icon-wrapper">
        <IconMandat />
      </div>
      <div className="mandate__number" style={{ color: props.color }}>
        <div className="number__holder">
          {props.numberMandates}
          <sup>{numberComplement}</sup>
        </div>
        <div className="number__title">mandat</div>
      </div>
      <div className="mandate__sep block__separator">{/* Empty */}</div>
      <div className="mandate__dates">
        <div className="mandate__since">
          <p>
            <span style={{ color: props.color }}>{Date.yearsPassed}</span> Ans
          </p>
          <p>
            <span style={{ color: props.color }}>{Date.monthsPassed}</span> Mois
          </p>
          <p>d'activité</p>
        </div>
        <div className="mandate__begin">
          <h3>Depuis le</h3>
          <p className="begin__day-month">
            <span style={{ color: props.color }}>{Date.day}</span> {Date.month}
          </p>
          <p className="begin__year" style={{ color: props.color }}>
            {Date.year}
          </p>
        </div>
      </div>
    </Block>
  )
}
