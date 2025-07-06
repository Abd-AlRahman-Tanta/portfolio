import { createContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";
import { TfiEmail } from "react-icons/tfi";
import { Outlet, useMatches } from "react-router-dom";
import type { SectionScroll } from ".";
import Nav from "./components/Nav";
export const Body = createContext<{ setSectionScroll: Dispatch<SetStateAction<SectionScroll>>, sectionScroll: SectionScroll } | null>(null);
export const Show = createContext<boolean>(false);
const App = () => {
  const matches = useMatches();
  const [mode, setMode] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false)
  const [sectionScroll, setSectionScroll] = useState<SectionScroll>({ home: 0, education: 0, aboutMe: 0, projects: 0, contact: 0 });
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    const img = new Image();
    img.src = "/portfolio/assets/imgs/me.jpg";
    img.onload = () => {
      setLoaded(true);
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [matches[matches.length - 1].pathname])

  useEffect(() => {
    if (loaded == true)
      setTimeout(() => setShow(true), 200)
  }, [loaded])
  if (loaded == false)
    return (
      <div className={` ${localStorage.getItem("mode") == "dark" ? "dark" : ""} bg-mainBackground dark:bg-dark-mainBackground text-3xl font-medium w-full h-screen mx-auto flex flex-col justify-center items-center gap-2.5 text-heroDescription dark:text-dark-heroDescription `}>
        <p>Loading.....</p>
        <p className="mt-2.5 mb-16">Please Wait....</p>
        <div className=" rounded-full w-[150px] h-[150px] bg-mainBackground dark:bg-dark-mainBackground border-2 border-y-[#0C96E2] border-x-transparent animate-spin "></div>
        <div className="hidden">{mode}</div>
      </div>
    )
  else if (loaded == true)
    return (
      <Body.Provider value={{ setSectionScroll, sectionScroll }}>
        <Show.Provider value={show}>
          <div className={`font-type min-h-screen ${localStorage.getItem("mode") == "dark" ? "dark" : ""} dark:bg-dark-mainBackground bg-mainBackground  duration-300`}>
            <Nav setMode={setMode} show={show} />
            <Outlet />
            <footer className=" text-center w-[calc(100%-40px)] lg:w-[calc(100%-140px)] mt-[80px] py-[40px] mx-auto text-mainText dark:text-dark-mainText border-t-1 border-[#BEC0BF] flex flex-col lg:flex-row justify-between items-center gap-4 ">
              <p>@ 2024. All Rights Reserved</p>
              <p>Develpoment by Abd Al-Rahman Tanta</p>
              <div className="flex justify-center items-center gap-3">
                <a target="_blank" href="https://t.me/Abd7296" className=" dark:shadow-[0_4px_7px_0_#ffffff33] shadow-[0_4px_7px_0_#00000033] w-[40px] h-[40px] rounded-full bg-[#0C96E2] text-white text-[20px] flex justify-center items-center ">
                  <FaTelegram />
                </a>
                <a target="_blank" href="https://wa.me/qr/IXFRN4SYOQO5H1" className=" dark:shadow-[0_4px_7px_0_#ffffff33] shadow-[0_4px_7px_0_#00000033] w-[40px] h-[40px] rounded-full bg-[#0C96E2] text-white text-[20px] flex justify-center items-center ">
                  <FaWhatsapp />
                </a>
                <a target="_blank" href="#" className=" dark:shadow-[0_4px_7px_0_#ffffff33] shadow-[0_4px_7px_0_#00000033] w-[40px] h-[40px] rounded-full bg-[#0C96E2] text-white text-[20px] flex justify-center items-center ">
                  <GrLinkedin />
                </a>
                <a target="_blank" href="mailto:iamwhitebeard2@gmail.com" className=" dark:shadow-[0_4px_7px_0_#ffffff33] shadow-[0_4px_7px_0_#00000033] w-[40px] h-[40px] rounded-full bg-[#0C96E2] text-white text-[20px] flex justify-center items-center "><TfiEmail /></a>
              </div>
            </footer>
          </div>
        </Show.Provider>
      </Body.Provider>
    )
}

export default App






























































