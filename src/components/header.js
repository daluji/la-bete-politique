import { Link } from "gatsby"
import React, { useState, useEffect } from "react"
import Logo from "../images/logos/projet/augora-logo.svg"
import LogoText from "../images/logos/projet/augora-texte.svg"

const mainPages = {
  home: {
    path: "/",
    title: "Députés",
  },
  carte: {
    path: "/map",
    title: "Carte de France",
  },
}

const secondaryPages = {
  // about: {
  //   path: "/about",
  //   title: "A propos de nous",
  // },
  faq: {
    path: "/faq",
    title: "FAQ",
  },
}

const Header = ({ siteTitle, location }) => {
  const [Size, setSize] = useState("normal")

  function isActivePage(path) {
    return `menu__item ${
      location.pathname === path || location.pathname === path + "/"
        ? "menu__item--current"
        : ""
    }`
  }

  function setLinks(pageGroup) {
    return Object.keys(pageGroup).map((page) => (
      <Link
        key={pageGroup[page].path}
        to={pageGroup[page].path}
        className={isActivePage(pageGroup[page].path)}
      >
        {pageGroup[page].title}
      </Link>
    ))
  }

  const handleScroll = (event) => {
    if (window.scrollY > 50) {
      setSize("small")
    } else {
      setSize("normal")
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

  return (
    <header id="header" className={`header ${Size}`}>
      {console.log(location)}
      <div className="header__wrapper wrapper">
        <Link to="/" className="header__home-btn">
          <div className={`header__logo-wrapper `}>
            <Logo className="logo" />
            <LogoText className="text" />
          </div>
        </Link>
        <div className="header__menu menu">
          {setLinks(mainPages)}
          <span className="menu__separator" />
          {setLinks(secondaryPages)}
        </div>
      </div>
    </header>
  )
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
