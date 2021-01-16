import React, { useEffect, useState } from "react"
import Block from "../_block/_Block"
import moment from "moment"
import IconMandat from "images/ui-kit/icon-mandat.svg"

interface IMandate {
  dateBegin: string
  isInMandate: boolean
  numberMandates: number
  othersMandates: Deputy.AutresMandats[]
  oldMandates: Deputy.AnciensMandats[]
  color: string
  size?: string
  wip?: boolean
}
interface IDate {
  day: string
  month: string
  year: number
  yearsPassed: number
  monthsPassed: number
  daysPassed: number
}

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
  const daysPassed = Math.floor(moment.duration(timePassed).asDays())

  return {
    day: dateDay,
    month: dateMonth,
    year: dateYear,
    yearsPassed: yearsPassed,
    monthsPassed: monthsPassed,
    daysPassed: daysPassed,
  }
}

/**
 * Return deputy's mandate in a Block component
 * @param {*} props
 */
export default function Mandate(props: IMandate) {
  const [Date, setDate] = useState<IDate>({
    day: "01",
    month: "janvier",
    year: 2020,
    yearsPassed: 0,
    monthsPassed: 0,
    daysPassed: 0,
  })

  useEffect(() => {
    setDate(getDates(props.dateBegin))
  }, [props.dateBegin])

  let numberComplement = ""
  props.numberMandates < 2 ? (numberComplement = "er") : (numberComplement = "ème")
  return (
    <Block title="Mandats" type="mandate" color={props.color} size={props.size} wip={props.wip ? props.wip : false}>
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
      <div className="mandate__dates">
        <div className="mandate__since">
          {Date.yearsPassed > 0 ? (
            <p>
              <span style={{ color: props.color }}>{Date.yearsPassed}</span> <strong>Ans</strong>
            </p>
          ) : null}
          {Date.monthsPassed > 0 ? (
            <p>
              <span style={{ color: props.color }}>{Date.monthsPassed}</span> <strong>Mois</strong>
            </p>
          ) : null}
          {Date.monthsPassed === 0 && Date.yearsPassed === 0 ? (
            <p>
              <span style={{ color: props.color }}>{Date.daysPassed}</span>{" "}
              <strong>{Date.daysPassed < 2 ? "Jour" : "Jours"}</strong>
            </p>
          ) : null}
          <p></p>
          <p>
            <strong>d'activité</strong>
          </p>
        </div>
        <div className="mandate__begin">
          <p>Depuis le</p>
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