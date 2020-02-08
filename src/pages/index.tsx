import React from "react"
import styled from "styled-components"
import Helmet from "react-helmet"
import { graphql } from "gatsby"

import Layout from "Components/layout"

import DeputiesList from "../Components/DeputiesList/DeputiesList"
import { DeputesQueryQuery } from "../types/graphql-types"

type DeputesQueryQueryProps = {
  data: DeputesQueryQuery
}

const IndexPage = ({ data }: DeputesQueryQueryProps) => {
  return (
    <Layout>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <title>Liste des députés</title>
      </Helmet>
      <header className="header">
        <h1>Liste des députés</h1>
      </header>
      <div>
        <DeputiesList
          data={data.faunadb}
          // groupes={data.faunadb.GroupesParlementaires}
        />
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query DeputesQuery {
    faunadb {
      Deputes(_size: 700) {
        data {
          SigleGroupePolitique
          LieuDeNaissance
          DebutDuMandat
          Nom
          NomCirconscription
          NomDeFamille
          NombreMandats
          NumeroCirconscription
          NumeroDepartement
          parti_ratt_financier
          PlaceEnHemicycle
          Prenom
          Profession
          Sexe
          Slug
          Twitter
          DateDeNaissance
          Adresses
          Collaborateurs
          Emails
          SitesWeb
        }
      }
      GroupesParlementaires
    }
  }
`
