import { useContext, useEffect, useRef } from "react";
import { FaArrowDown } from "react-icons/fa";
import { Body, Show } from "../App";
const Hero = () => {
  const offset = useContext(Body);
  const show = useContext(Show);
  const hero = useRef<HTMLDivElement | null>(null);
  const checkMyHeroOffsetTop = (): void => {
    if (hero.current) {
      offset?.setSectionScroll(prev => {
        if (hero.current != null)
          return {
            ...prev,
            home: hero.current.offsetTop
          }
        else
          return { ...prev }
      })
    }
  }



  useEffect(() => {
    checkMyHeroOffsetTop();
  }, [window.innerWidth])

  return (
    <div ref={hero} className={`opacity-0 -translate-x-full ${show && "opacity-100 translate-x-0"} w-full min-h-[calc(100vh-112px)] flex lg:justify-between items-center lg:flex-row-reverse flex-col-reverse gap-10 lg:gap-5 lg:px-[70px] px-[20px] mb-[80px] text-mainText dark:text-dark-mainText transition-[color,translate,opacity] duration-[0.3s,1s,2s] relative`}>
      <img className=" dark:shadow-[0_4px_7px_0_#ffffff33] shadow-[0_4px_7px_0_#00000033] h-[420px] object-cover rounded-2xl" src="/portfolio/assets/imgs/me.jpg" alt="" />
      <FaArrowDown className={`text-2xl text-[#0C96E2]  animate-bounce  lg:absolute lg:bottom-10 lg:left-1/2 lg:-translate-x-1/2 `} />
      <div className="lg:w-max w-full lg:text-start text-center relative ">
        <div className="absolute w-full h-full bg-[url(/assets/imgs/radial.png)] blur-3xl -z-10"></div>
        <h1 className="lg:w-max w-full text-[36px] lg:text-[40px] xl:text-[55px] leading-[120%] mb-5">HEY! <span className="font-bold">I’m <br /> <span className="bg-gradient-to-r from-[#60a5fa] to-[#38bdf8] bg-clip-text text-transparent ">Abd Al-Rahman</span>, <br />
          Frontend Developer</span>
        </h1>
        <p className="w-full text-heroDescription dark:text-dark-heroDescription lg:max-w-[370px] text-[18px] ">Agency-quality Webflow websites with the personal touch of a freelancer.</p>
        <button className="mx-auto lg:mx-0 w-[155px] h-[50px] rounded-sm text-mainText dark:text-dark-mainText bg-white dark:bg-[#0C96E299] font-medium text-[18px] flex justify-center items-center cursor-pointer hover:scale-105 duration-300 mt-14 border-1 border-[#0C96E299] dark:border-white "><a href="/portfolio/cv/Abd-Al-Rahman-Tanta.pdf" download={"Abd-Al-Rahman-Tanta.pdf"}>Download Cv</a></button>
      </div>

    </div>
  )
}

export default Hero
