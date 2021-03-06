import React from "react"
import MapAugora from "components/maps/MapAugora"
import { buildURLFromFeature, createFeatureCollection, getFeature, getLayerPaint } from "components/maps/maps-utils"
import Block from "components/deputy/_block/_Block"
import Link from "next/link"
import mapStore from "stores/mapStore"

export default function MapDistrict(props: Bloc.Map) {
  const { NomCirconscription, NumeroCirconscription, NumeroDepartement } = props.deputy
  const feature = getFeature({
    code_circ: NumeroCirconscription,
    code_dpt: NumeroDepartement,
  })
  const { viewport, setViewport } = mapStore()

  return (
    <Block
      title="Circonscription"
      type="map"
      color={props.color}
      size={props.size}
      circ={{
        region: NomCirconscription,
        circNb: NumeroCirconscription,
      }}
    >
      <div className="map__container">
        <MapAugora
          deputies={[props.deputy]}
          overlay={false}
          forceCenter={true}
          viewport={viewport}
          setViewport={setViewport}
          mapView={{
            geoJSON: createFeatureCollection([feature]),
            feature: feature,
            paint: getLayerPaint(props.deputy.GroupeParlementaire.Couleur),
          }}
        />
        <Link href={buildURLFromFeature(feature)}>
          <div className="map__redirect"></div>
        </Link>
      </div>
    </Block>
  )
}
