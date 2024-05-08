import { useEffect, useState } from "react"
import "./buttonUp.css"

const ButtonUp = () => {
  const [isVisible, setIsVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleScroll = () => {
    const windowHeight = window.innerHeight
    const scrollY = window.scrollY

    setIsVisible(scrollY > windowHeight / 2)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
  }, [])

  return (
    <button
      className={`buttonUp ${isVisible ? "visible" : ""}`}
      id="buttonUp"
      onClick={scrollToTop}
    >
      <i className="ri-arrow-up-line"></i>
    </button>
  )
}

export default ButtonUp
