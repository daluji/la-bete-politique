import React, { useState, useEffect } from "react"
import Head from "next/head"
import { colors } from "utils/variables"

import Header from "./header"
import Footer from "./footer"
import PageTitle from "./titles/PageTitle"
import Popin from "./popin/Popin"
import Sidebar from "components/sidebar/Sidebar"
import useDeputiesFilters from "hooks/deputies-filters/useDeputiesFilters"
import { NextRouter } from "next/router"
import { getPageTypeFromRoute, PageType } from "./seo/seo-utils"

interface ILayout {
  children: React.ReactElement
  title?: string
  location: NextRouter
}

const allColors = colors.map((color) => {
  return "--" + color.name + "-color :" + color.hex + ";\n"
})

/**
 * Renvoie le container des pages, comprenant le header, popin, etc
 * @param {RouteProps} location Objet du react router contenant les infos de route
 * @param {string} [title] Titre de la page
 */
const Layout = ({ children, location, title }: ILayout) => {
  const {
    state: { IsInitialState },
    handleReset,
  } = useDeputiesFilters()
  const [scrolled, setScrolled] = useState(false)
  const [hasSidebar, setHasSidebar] = useState(true)
  const [isPopinVisible, setisPopinVisible] = useState(false)

  const pageColor: Group.HSLDetail = children.props.depute ? children.props.depute.GroupeParlementaire.CouleurDetail.HSL : null

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      handleScroll()
    })
    return () => {
      window.removeEventListener("scroll", handleScroll, true)
    }
  }, [])

  useEffect(() => {
    const pageType = getPageTypeFromRoute(location.route)
    if (pageType === PageType.Accueil || pageType === PageType.Map) {
      setisPopinVisible(true)
    } else setisPopinVisible(false)

    setHasSidebar(false)
  }, [location.route])

  // Check if page has SEO informations
  return (
    <div className={`page-body ${title ? "with-title" : "no-title"}${scrolled ? " scrolled" : ""}`}>
      <Head>
        <style>{`:root {\n${allColors.join("")}}`}</style>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="header__container">
        <Header siteTitle={"Augora"} location={location} color={pageColor} onBurgerClick={() => setHasSidebar(!hasSidebar)} />
        <PageTitle color={pageColor} title={title ? title : null} />
        <Popin displayed={isPopinVisible && !IsInitialState}>
          <p>Certains filtres sont actifs</p>
          <button className="popin__reset" onClick={() => handleReset()} title="Réinitialiser les filtres">
            Réinitialiser les filtres
          </button>
        </Popin>
      </div>
      <Sidebar className={hasSidebar && "visible"} close={() => setHasSidebar(false)} />
      <main className="layout">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
