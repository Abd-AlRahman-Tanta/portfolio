import { memo, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { FaBars } from "react-icons/fa"
import { GoSun } from "react-icons/go"
import { IoMdMoon } from "react-icons/io"
import { RxCross1 } from "react-icons/rx"
import { Link, useMatches, useNavigate } from "react-router-dom"
import type { Activation } from ".."
import { Body } from "../App"








const Nav = ({ setMode, show }: { setMode: Dispatch<SetStateAction<boolean>>, show: boolean }) => {
  const offset = useContext(Body);
  const navigate = useNavigate();
  const activePages = useMatches();

  const [menu, showMenu] = useState<boolean>(false);
  const [active, setActive] = useState<Activation>({ home: false, aboutMe: false, contact: false, projects: false, education: false });


  const handleActive = (): void => {
    let scroll = window.scrollY;
    if (offset?.sectionScroll.home && offset.sectionScroll.aboutMe && offset.sectionScroll.education) {
      if (scroll >= offset?.sectionScroll.home - 300 && scroll < offset?.sectionScroll.aboutMe - 300 && scroll < offset?.sectionScroll.education - 300)
        setActive(prev => {
          if (prev.home == true)
            return prev;
          else
            return { home: true, aboutMe: false, contact: false, projects: false, education: false }
        })
      else if (scroll >= offset?.sectionScroll.aboutMe - 300 && scroll > offset?.sectionScroll.home - 300 && scroll < offset?.sectionScroll.education - 300)
        setActive(prev => {
          if (prev.aboutMe == true)
            return prev;
          else
            return { home: false, aboutMe: true, contact: false, projects: false, education: false }
        })
      else if (scroll >= offset?.sectionScroll.education - 300 && scroll > offset.sectionScroll.aboutMe && scroll > offset.sectionScroll.home && scroll < offset.sectionScroll.projects - 300)
        setActive(prev => {
          if (prev.education == true)
            return prev;
          else
            return { home: false, aboutMe: false, contact: false, projects: false, education: true }
        })
      else if (scroll >= offset?.sectionScroll.projects - 300 && scroll > offset.sectionScroll.projects && scroll > offset.sectionScroll.education && scroll > offset.sectionScroll.aboutMe && scroll > offset.sectionScroll.home && scroll < offset.sectionScroll.contact - 300)
        setActive(prev => {
          if (prev.projects == true)
            return prev;
          else
            return { home: false, aboutMe: false, contact: false, projects: true, education: false }
        })
      else if (scroll >= offset.sectionScroll.contact - 300)
        setActive(prev => {
          if (prev.contact == true)
            return prev;
          else
            return { home: false, aboutMe: false, education: false, projects: false, contact: true }
        })
    }
  }


  const scrollTo = (section: string): void => {
    switch (section) {
      case "home": {
        if (activePages[activePages.length - 1].pathname != "/") {
          localStorage.setItem("section", "home");
          navigate("/");
        }
        window.scrollTo({ top: offset?.sectionScroll.home && offset?.sectionScroll.home - 140, behavior: "smooth" })
        break;
      }
      case "about": {
        if (activePages[activePages.length - 1].pathname != "/") {
          localStorage.setItem("section", "about");
          navigate("/");
        }
        window.scrollTo({ top: offset?.sectionScroll.aboutMe && offset?.sectionScroll.aboutMe - 112, behavior: "smooth" })
        break;
      }
      case "education": {
        if (activePages[activePages.length - 1].pathname != "/") {
          localStorage.setItem("section", "education");
          navigate("/");
        }
        window.scrollTo({ top: offset?.sectionScroll.education && offset?.sectionScroll.education - 112, behavior: "smooth" })
        break;
      }
      case "projects": {
        if (activePages[activePages.length - 1].pathname != "/") {
          localStorage.setItem("section", "projects");
          navigate("/");
        }
        window.scrollTo({ top: offset?.sectionScroll.projects && offset.sectionScroll.projects - 112, behavior: "smooth" })
        break;
      }
      case "contact": {
        if (activePages[activePages.length - 1].pathname != "/") {
          localStorage.setItem("section", "contact");
          navigate("/");
        }
        window.scrollTo({ top: offset?.sectionScroll.projects && offset.sectionScroll.contact - 112, behavior: "smooth" })
        break;
      }
    }
  }



  useEffect(() => {
    if (localStorage.getItem("section")) {
      switch (localStorage.getItem("section")) {
        case "home": {
          window.scrollTo({ top: offset?.sectionScroll.home && offset?.sectionScroll.home - 140, behavior: "smooth" })
          break;
        }
        case "about": {
          window.scrollTo({ top: offset?.sectionScroll.aboutMe && offset?.sectionScroll.aboutMe - 112, behavior: "smooth" })
          break;
        }
        case "education": {
          window.scrollTo({ top: offset?.sectionScroll.education && offset?.sectionScroll.education - 112, behavior: "smooth" })
          break;
        }
        case "projects": {
          window.scrollTo({ top: offset?.sectionScroll.projects && offset?.sectionScroll.projects - 112, behavior: "smooth" })
          break;
        }
        case "contact": {
          window.scrollTo({ top: offset?.sectionScroll.contact && offset?.sectionScroll.contact - 112, behavior: "smooth" })
          break;
        }
      }
      setTimeout(() => {
        localStorage.removeItem("section")
      }, 100)
    }
  }, [offset?.sectionScroll])





  useEffect(() => {
    if (offset?.sectionScroll.home != 0 && offset?.sectionScroll.aboutMe != 0 && offset?.sectionScroll.education != 0 && offset?.sectionScroll.projects != 0 && offset?.sectionScroll.contact != 0) {
      handleActive();
      window.addEventListener("scroll", handleActive);
    }
    return () => {
      window.removeEventListener("scroll", handleActive);
    };
  }, [offset?.sectionScroll])






  return (
    <>
      <div className=" blur-3xl backdrop-blur-md bg-mainBackground dark:bg-dark-mainBackground duration-300 fixed top-0 h-[112px]  w-full z-40"></div>
      <nav className={`opacity-0 -translate-y-full ${show && "opacity-100 translate-y-0"} transition-[background-color,color,translate,opacity] duration-[0.3s,0.3s,1s,2s] w-full h-[112px] fixed top-0 z-50 flex justify-between items-center px-[20px] lg:px-[70px]  text-mainText dark:text-dark-mainText ${menu ? "bg-mainBackground dark:bg-dark-mainBackground" : ""}`}>
        <Link className="font-semibold text-2xl" to="/">Portfolio</Link>
        <ul className={`hidden lg:flex justify-center items-center gap-7`}>
          <li className={`cursor-pointer font-semibold ${activePages[activePages.length - 1].pathname == "/" && active.home ? "text-[#0C96E2]" : ""} hover:text-[#0C96E2]`} onClick={() => { scrollTo("home") }}>Home</li>
          <li className={`cursor-pointer font-semibold ${activePages[activePages.length - 1].pathname == "/" && active.aboutMe ? "text-[#0C96E2]" : ""} hover:text-[#0C96E2]`} onClick={() => { scrollTo("about") }}>About</li>
          <li className={`cursor-pointer font-semibold ${activePages[activePages.length - 1].pathname == "/" && active.education ? "text-[#0C96E2]" : ""} hover:text-[#0C96E2]`} onClick={() => { scrollTo("education") }}>Education</li>
          <li onClick={() => { scrollTo("projects") }} className={`cursor-pointer font-semibold ${activePages[activePages.length - 1].pathname == "/" && active.projects ? "text-[#0C96E2]" : ""} ${activePages[activePages.length - 1].pathname !== `/` ? "text-red-500" : ""} hover:text-[#0C96E2]`}>Projects</li>
          <li onClick={() => { scrollTo("contact") }} className={`cursor-pointer font-semibold ${activePages[activePages.length - 1].pathname == "/" && active.contact ? "text-[#0C96E2]" : ""} hover:text-[#0C96E2]`}>Contact</li>
        </ul>
        <div className="hidden lg:block text-2xl cursor-pointer">
          <IoMdMoon className={`${localStorage.getItem("mode") == "dark" ? "hidden" : "block"}`} onClick={() => { setMode(prev => !prev); localStorage.setItem("mode", "dark") }} />
          <GoSun className={`${localStorage.getItem("mode") == "dark" ? "block" : "hidden"}`} onClick={() => { setMode(prev => !prev); localStorage.setItem("mode", "light") }} />
        </div>
        <div className="relative w-10 h-10 lg:hidden">
          <FaBars className={`text-2xl cursor-pointer text-mainText dark:text-dark-mainText duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${menu ? "scale-0" : "scale-100"}`} onClick={() => showMenu(!menu)} />
          <RxCross1 className={`text-2xl cursor-pointer text-mainText dark:text-dark-mainText  duration-300 absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 ${menu ? "scale-100" : "scale-0"}`} onClick={() => showMenu(!menu)} />
        </div>
      </nav>
      <div onClick={() => showMenu(!menu)} className={`text-mainText dark:text-dark-mainText menu bg-mainBackground dark:bg-dark-mainBackground fixed z-40 top-0 pt-[120px] w-full h-screen overflow-x-hidden ${menu ? "translate-x-0" : "-translate-x-full"} duration-500`}>
        <ul className="mb-6">
          <li className={`cursor-pointer ${activePages[activePages.length - 1].pathname == "/" && active.home ? "text-[#0C96E2]" : ""} m-5 p-2.5 text-center hover:bg-[#E9EFFC] dark:hover:bg-[#08142E] hover:text-[#0C96E2]`} onClick={() => { scrollTo("home") }}>Home</li>
          <li className={`cursor-pointer ${activePages[activePages.length - 1].pathname == "/" && active.aboutMe ? "text-[#0C96E2]" : ""} m-5 p-2.5 text-center hover:bg-[#E9EFFC] dark:hover:bg-[#08142E] hover:text-[#0C96E2]`} onClick={() => { scrollTo("about") }}>About</li>
          <li className={`cursor-pointer ${activePages[activePages.length - 1].pathname == "/" && active.education ? "text-[#0C96E2]" : ""} m-5 p-2.5 text-center hover:bg-[#E9EFFC] dark:hover:bg-[#08142E] hover:text-[#0C96E2]`} onClick={() => { scrollTo("education") }}>Education</li>
          <li onClick={() => scrollTo("projects")} className={`cursor-pointer ${activePages[activePages.length - 1].pathname == "/" && active.projects ? "text-[#0C96E2]" : ""} ${activePages[activePages.length - 1].pathname !== `/` ? "text-red-500" : ""} m-5 p-2.5 text-center hover:bg-[#E9EFFC] dark:hover:bg-[#08142E] hover:text-[#0C96E2]`}>Projects</li>
          <li onClick={() => { scrollTo("contact") }} className={`cursor-pointer ${activePages[activePages.length - 1].pathname == "/" && active.contact ? "text-[#0C96E2]" : ""} m-5 p-2.5 text-center hover:bg-[#E9EFFC] dark:hover:bg-[#08142E] hover:text-[#0C96E2]`}>Contact</li>
        </ul>
        <div className="text-2xl w-max mx-auto mb-5 cursor-pointer">
          <IoMdMoon className={`${localStorage.getItem("mode") == "dark" ? "hidden" : "block"}`} onClick={() => { setMode(prev => !prev); localStorage.setItem("mode", "dark") }} />
          <GoSun className={`${localStorage.getItem("mode") == "dark" ? "block" : "hidden"}`} onClick={() => { setMode(prev => !prev); localStorage.setItem("mode", "light") }} />
        </div>
      </div>
    </>
  )
}

export default memo(Nav)
