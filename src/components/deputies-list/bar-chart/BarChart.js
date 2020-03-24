import React from "react"
import { ResponsiveBar } from "@nivo/bar"
import { getColorLuminosity, getTextColorContrast } from "utils/style/color"

const generateTooltip = tooltip => {
  return (
    <div className="tooltip" style={{ whiteSpace: "pre" }}>
      <span
        style={{
          display: "inline-block",
          width: "12px",
          height: "12px",
          background: `${tooltip.data.color}`,
          marginRight: "7px",
        }}
      ></span>
      <span>
        {tooltip.data.label} - {tooltip.data.value}
      </span>
    </div>
  )
}

export default function BarChart(props) {
  return (
    <ResponsiveBar
      data={props.data}
      indexBy="id"
      margin={{ top: 50, right: 50, bottom: 20, left: 50 }}
      padding={0.1}
      colors={groupe => {
        return groupe.data.color
      }}
      borderRadius={5}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={groupe =>
        getColorLuminosity(groupe.color) < 50
          ? getTextColorContrast("light")
          : getTextColorContrast("dark")
      }
      tooltip={tooltip => generateTooltip(tooltip)}
    />
  )
}