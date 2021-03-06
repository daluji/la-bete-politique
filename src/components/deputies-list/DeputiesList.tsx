import React, { useState } from "react"
import { getNbDeputiesGroup } from "./deputies-list-utils"
import useDeputiesFilters from "hooks/deputies-filters/useDeputiesFilters"
import Filters from "./filters/Filters"
import Deputy from "./deputy/Deputy"
import Frame from "components/frames/Frame"
import PieChart from "./pie-chart/PieChart"
import BarChart from "./bar-chart/BarChart"
import { LazyLoadComponent } from "react-lazy-load-image-component"

export default function DeputiesList() {
  const { state } = useDeputiesFilters()

  const [HasPieChart, setHasPieChart] = useState(true)

  const groupesData = state.GroupesList.map((groupe) => {
    const nbDeputeGroup = getNbDeputiesGroup(state.FilteredList, groupe.Sigle)
    return {
      id: groupe.Sigle,
      label: groupe.NomComplet,
      value: nbDeputeGroup,
      color: groupe.Couleur,
    }
  }).filter((groupe) => groupe.value !== 0)

  /**
   * Reliquat de la complex bar chart
   */
  // let ages = []
  // for (let i = state.AgeDomain[0]; i <= state.AgeDomain[1]; i++) {
  //   ages.push(i)
  // }

  // const groupesByAge = ages.map((age) => {
  //   const valueOfDeputesByAge = state.DeputiesList.filter((depute) => {
  //     return depute.Age === age
  //   })
  //   const groupeValueByAge = () =>
  //     Object.keys(state.GroupeValue).reduce((acc, groupe) => {
  //       return Object.assign(acc, {
  //         [groupe]: valueOfDeputesByAge.filter(
  //           (depute) => depute.GroupeParlementaire.Sigle === groupe
  //         ).length,
  //       })
  //     }, {})
  //   const groupeColorByAge = () =>
  //     Object.keys(state.GroupeValue).reduce((acc, groupe) => {
  //       return Object.assign(acc, {
  //         [groupe + "Color"]: state.GroupesList.filter(
  //           (groupeFiltered) => groupeFiltered.Sigle === groupe
  //         )[0].Couleur,
  //       })
  //     }, {})
  //   return Object.assign(
  //     {},
  //     {
  //       age: age.toString(),
  //       ...groupeValueByAge(),
  //       ...groupeColorByAge(),
  //     }
  //   )
  // })

  return (
    <>
      <section className="filters">
        <Filters />
        <Frame className="frame-chart" title="Répartition">
          {state.FilteredList.length > 0 ? (
            <div className="filters__charts">
              <button className="charts__switch" onClick={() => setHasPieChart(!HasPieChart)} title="Changer le graphique">
                <svg viewBox="0 0 232 247" className="icon-switch">
                  <g className="icon-switch__graph-bar" transform="matrix(1.45231,0,0,1.45231,-104.801,17.4629)">
                    <path d="M231.7,5.146C231.7,2.306 229.394,0 226.554,0L216.261,0C213.421,0 211.115,2.306 211.115,5.146L211.115,62.797C211.115,65.637 213.421,67.943 216.261,67.943L226.554,67.943C229.394,67.943 231.7,65.637 231.7,62.797L231.7,5.146Z" />
                    <g transform="matrix(1,0,0,0.8,-27.1773,13.5886)">
                      <path d="M231.7,6.433C231.7,2.882 229.394,0 226.554,0L216.261,0C213.421,0 211.115,2.882 211.115,6.433L211.115,61.51C211.115,65.061 213.421,67.943 216.261,67.943L226.554,67.943C229.394,67.943 231.7,65.061 231.7,61.51L231.7,6.433Z" />
                    </g>
                    <g transform="matrix(1,0,0,0.5,-54.3545,33.9716)">
                      <path d="M231.7,10.293C231.7,4.612 229.394,0 226.554,0L216.261,0C213.421,0 211.115,4.612 211.115,10.293L211.115,57.651C211.115,63.331 213.421,67.943 216.261,67.943L226.554,67.943C229.394,67.943 231.7,63.331 231.7,57.651L231.7,10.293Z" />
                    </g>
                  </g>
                  <g className="icon-switch__graph-hemicycle" transform="matrix(1.25637,0,0,1.25637,-42.9509,90.7808)">
                    <path d="M38.123,109.909C37.017,109.909 35.962,109.449 35.209,108.639C34.456,107.83 34.073,106.743 34.153,105.641C36.347,79.687 58.128,59.27 84.64,59.27C111.151,59.27 132.932,79.687 135.101,105.642C135.181,106.738 134.801,107.818 134.053,108.623C133.304,109.428 132.255,109.885 131.156,109.885C125.475,109.909 115.351,109.909 110.126,109.909C108.256,109.909 106.639,108.607 106.238,106.781C104.836,100.669 100.026,87.748 84.64,87.748C73.57,87.748 64.386,95.881 62.741,106.493C62.461,108.428 60.802,109.863 58.847,109.863C53.541,109.909 43.695,109.909 38.123,109.909Z" />
                  </g>
                  <g className="icon-switch__arrow" transform="matrix(0.792126,0,0,0.792126,8.79252,26.9387)">
                    <path d="M91.068,31.945C92.887,31.649 94.744,32.167 96.148,33.361C97.551,34.554 98.36,36.304 98.36,38.147C98.38,42 98.38,46.705 98.38,50.271C98.38,53.262 96.278,55.841 93.349,56.444C84.848,58.18 76.787,62.403 70.374,69.072C62.432,77.332 57.977,88.346 57.943,99.805L67.897,89.453C72.264,84.935 79.568,84.792 84.109,89.135L85.08,90.069C89.598,94.436 89.742,101.74 85.399,106.28L56.483,136.354C52.116,140.872 44.812,141.015 40.271,136.671L6.049,103.766C1.531,99.399 1.387,92.095 5.73,87.555L6.664,86.584C11.03,82.066 18.334,81.923 22.875,86.267L33.474,96.458C34.291,79.836 41.11,64.062 52.658,52.08L52.664,52.074C63.306,41.006 76.876,34.281 91.068,31.945Z" />
                  </g>
                  <g
                    className="icon-switch__arrow"
                    transform="matrix(-0.718435,-8.79829e-17,8.79829e-17,-0.718435,222.884,243.996)"
                  >
                    <path d="M90.224,32.089C92.241,31.733 94.312,32.287 95.882,33.603C97.451,34.919 98.358,36.863 98.358,38.911C98.38,42.418 98.38,46.494 98.38,49.749C98.379,53.017 96.102,55.843 92.909,56.538C84.57,58.327 76.676,62.518 70.374,69.072C62.432,77.332 57.977,88.346 57.943,99.805L67.897,89.453C72.264,84.935 79.568,84.792 84.109,89.135L85.08,90.069C89.598,94.436 89.742,101.74 85.399,106.28L56.483,136.354C52.116,140.872 44.812,141.015 40.271,136.671L6.049,103.766C1.531,99.399 1.387,92.095 5.73,87.555L6.664,86.584C11.03,82.066 18.334,81.923 22.875,86.267L33.474,96.458C34.291,79.836 41.11,64.062 52.658,52.08L52.664,52.074C63.095,41.225 76.338,34.55 90.224,32.089Z" />
                  </g>
                </svg>
              </button>
              {HasPieChart ? (
                <div className="piechart chart">
                  <PieChart data={groupesData} filteredDeputies={state.FilteredList.length} groupesDetails={state.GroupesList} />
                </div>
              ) : (
                <div className="barchart chart">
                  <BarChart data={groupesData} filteredDeputies={state.FilteredList.length} groupesDetails={state.GroupesList} />
                </div>
              )}
            </div>
          ) : null}
        </Frame>
      </section>

      <section className="deputies__list">
        {state.FilteredList.length > 0 ? (
          state.FilteredList.map((depute) => {
            return (
              <LazyLoadComponent key={depute.Slug}>
                <Deputy depute={depute} />
              </LazyLoadComponent>
            )
          })
        ) : (
          <div className="deputies__no-result">Aucun résultat ne correspond à votre recherche</div>
        )}
      </section>
    </>
  )
}
