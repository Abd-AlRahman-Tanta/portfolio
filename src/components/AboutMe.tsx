import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Body } from "../App";

const AboutMe = () => {
  const offset = useContext(Body);
  const aboutMe = useRef<HTMLDivElement | null>(null);
  const [stretch, setStretch] = useState<boolean>(false);
  const skills: Array<{ label: string, percent: number }> = [{ label: "HTML5", percent: 95 }, { label: "CSS3", percent: 90 }, { label: "JAVASCRIPT", percent: 95 }, { label: "REACT", percent: 90 }];

  const checkOnAboutStretch = useCallback(() => {
    if (aboutMe.current) {
      if (aboutMe.current.getBoundingClientRect().top <= (60 * aboutMe.current.offsetTop) / 100)
        setStretch(true);
    }
  }, []);
  const checkMyAboutMeOffsetTop = (): void => {
    if (aboutMe.current != null) {
      offset?.setSectionScroll(prev => {
        if (aboutMe.current != null)
          return {
            ...prev,
            aboutMe: aboutMe.current.offsetTop
          }
        else
          return { ...prev }
      })
    }
  }
  useEffect(() => {
    checkMyAboutMeOffsetTop();
  }, [window.innerWidth])
  useEffect(() => {
    checkOnAboutStretch();
    window.addEventListener("scroll", checkOnAboutStretch);
    return () => {
      window.removeEventListener("scroll", checkOnAboutStretch);
    }
  }, [])
  useEffect(() => {
    if (stretch === true) {
      window.removeEventListener("scroll", checkOnAboutStretch);
    }
  }, [stretch]); // 🔁 فقط لما stretch يتغير





  return (
    <div ref={aboutMe}>
      <div className="w-full relative h-5 border-b-2 border-dashed border-dark-mainBackground mb-10 dark:border-mainBackground">
        <div className={` w-8 h-8 flex justify-center items-center rounded-full bg-mainBackground dark:bg-dark-mainBackground border-1 border-dark-mainBackground dark:border-mainBackground absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 z-20 `}>
          <div className={` font-extrabold flex justify-center items-end text-mainText dark:text-dark-mainText w-5 h-5 rounded-full bg-mainBackground dark:bg-dark-mainBackground border-1 border-dark-mainBackground dark:border-mainBackground`}>
            .
          </div>
        </div>
      </div>
      <div className={` flex justify-between flex-col-reverse items-center gap-10 lg:flex-row px-[20px] lg:px-[70px] opacity-0 -translate-x-10 ${stretch ? "opacity-100 translate-x-0" : ""} duration-[1s,2s] `}>
        <img className="lg:max-w-[510px] w-full" src={`${localStorage.getItem("mode") == "dark" ? "/portfolio/assets/imgs/aboutme-circes-dark.png" : "/portfolio/assets/imgs/aboutme-circles.png"}`} alt="" />
        <div>
          <div className="mb-[40px]">
            <h1 className="text-mainText dark:text-dark-mainText text-[40px] font-semibold mb-3  ">About Me</h1>
            <p className="text-mainText dark:text-dark-mainText">Get to know more about me, my background, and what drives me to create amazing digital experiences.</p>
          </div>
          <div>
            {
              skills.map((skill, index) => {
                return (
                  <div key={index} className="my-5">
                    <h2 className="text-mainText dark:text-dark-mainText font-semibold text-2xl">{skill.label}</h2>
                    <div className="h-[80px] w-full relative ">
                      <div className=" bg-[#EDECEC] absolute z-10 bottom-[6px] w-full h-[12px] rounded-lg "></div>
                      <div style={{ width: `${stretch ? skill.percent : 1}%` }} className={` bg-[#0C96E2]  absolute bottom-[6px] z-20 h-[12px] rounded-lg duration-700 delay-300 ease-linear `}>
                        <div className=" w-[24px] h-[24px] rounded-full bg-white border-1 border-[#0C96E2] absolute top-1/2 -translate-y-1/2 right-0 dark:shadow-[0_4px_7px_0_#ffffff33] shadow-[0_4px_7px_0_#00000033]"></div>
                        <div className="w-[40px] h-[32px]  rounded-sm bg-[#0C96E2] absolute right-[-8px] top-[-24px] -translate-y-full text-white flex justify-center items-center ">{skill.percent}%<span className="border-8 border-transparent border-t-[#0C96E2] absolute bottom-0 translate-y-full   "></span></div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
