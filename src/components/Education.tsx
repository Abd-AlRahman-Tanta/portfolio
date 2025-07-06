import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { Body } from "../App";
const Education = () => {
  const offset = useContext(Body);
  const education = useRef<HTMLDivElement | null>(null);
  const [stretch, setStretch] = useState<boolean>(false);
  const [stretch2, setStretch2] = useState<boolean>(false);
  const tryMe = useRef<HTMLDivElement | null>(null);
  const checkMyEducationOffsetTop = (): void => {
    if (education.current != null) {
      offset?.setSectionScroll(prev => {
        if (education.current != null && education.current != undefined) {
          if (prev.education == education.current.offsetTop)
            return { ...prev }
          else
            return { ...prev, education: education.current.offsetTop }
        }
        else
          return { ...prev }
      })
    }
  }
  const checkOnEducationStretch = useCallback(() => {
    if (education.current) {
      if (education.current?.getBoundingClientRect().top <= (30 * education.current?.offsetTop) / 100)
        setStretch(true);
      if (tryMe.current && tryMe.current?.getBoundingClientRect().top <= (30 * (tryMe.current?.offsetTop + education.current.offsetTop)) / 100)
        setStretch2(true)
    }
  }, [])

  useEffect(() => {
    checkMyEducationOffsetTop();
    const check = new ResizeObserver(() => {
      checkMyEducationOffsetTop();
    });
    education.current && check.observe(education.current);
    return () => {
      check.disconnect()
    }
  }, [stretch, stretch2])

  useEffect(() => {
    checkOnEducationStretch();
    window.addEventListener("scroll", checkOnEducationStretch);
    return () => {
      window.removeEventListener("scroll", checkOnEducationStretch);
    }
  }, [])

  useEffect(() => {
    if (stretch2 == true)
      window.removeEventListener("scroll", checkOnEducationStretch);
  }, [stretch2])

  return (
    <div ref={education} className="mt-[80px] px-[20px] lg:px-[80px] relative z-10 overflow-hidden ">
      <img src="/portfolio/assets/imgs/image2.svg" className={`absolute right-0 top-0 hidden sm:block`} alt="" />
      <div className={` mb-32 lg:mb-20 lg:text-center ${stretch ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"} duration-[1s,2s]`}>
        <p className="text-[#0C96E2] font-medium text-[20px] mb-2">Education and Experience</p>
        <h1 className="text-mainText dark:text-dark-mainText font-semibold text-[40px]   ">Education & Experience</h1>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center min-h-[288px] gap-10 ">
        <div className="flex justify-center items-center lg:items-start gap-10">
          <img src={`${localStorage.getItem("mode") == "dark" ? "/portfolio/assets/imgs/frame2.png" : "/portfolio/assets/imgs/frame.png"}`} className={`${stretch ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} duration-[1s,2s] delay-200`} alt="" />
          <div>
            <div className={`mb-5 ${stretch ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} duration-[1s,2s] delay-300`}>
              <h2 className="text-mainText dark:text-dark-mainText font-medium text-2xl mb-2.5">Experince Designer</h2>
              <p className="text-secondText ">Translated Figma designs into pixel-perfect interfaces. Applied responsive design and maintained UI consistency using Tailwind.</p>
            </div>
            <div className={`${stretch ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} duration-[1s,2s] delay-[400ms]`}>
              <h2 className="text-mainText dark:text-dark-mainText font-medium text-2xl mb-2.5">Frontend Developer</h2>
              <p className="text-secondText ">Built responsive and performant UIs using React, Next.js, and Tailwind. Focused on reusable components, SSR, and clean state management.</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center lg:items-start gap-10">
          <img src={`${localStorage.getItem("mode") == "dark" ? "/portfolio/assets/imgs/frame2.png" : "/portfolio/assets/imgs/frame.png"}`} className={`${stretch ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} duration-[1s,2s] delay-[600ms]`} alt="" />
          <div>
            <div className={`mb-5 ${stretch ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} duration-[1s,2s] delay-[700ms]`}>
              <h2 className="text-mainText dark:text-dark-mainText font-medium text-2xl mb-2.5">Soft Skills</h2>
              <p className="text-secondText ">Strong problem-solving and debugging skills. Communicated effectively in Agile teams and collaborated closely with developers and designers.</p>
            </div>
            <div className={`${stretch ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} duration-[1s,2s] delay-[800ms]`}>
              <h2 className="text-mainText dark:text-dark-mainText font-medium text-2xl mb-2.5">Full-Stack Next.js Development</h2>
              <p className="text-secondText ">Built scalable full-stack apps with Next.js, API routes, and Supabase. Deployed to Vercel with focus on performance and clean architecture.</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`h-[50px] w-full relative my-14`}>
        <img src="/portfolio/assets/imgs/image1.svg" className={`absolute -left-5 lg:-left-[70px] -bottom-[100px] hidden sm:block`} alt="" />
        <button onClick={() => { window.scrollTo({ top: offset?.sectionScroll.home && offset?.sectionScroll.home - 140, behavior: "smooth" }) }} className={` top-0 absolute right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-0   w-[50px] h-[50px] bg-[#0C96E2] dark:shadow-[0_4px_7px_0_#ffffff33] shadow-[0_4px_7px_0_#00000033] flex justify-center items-center rounded-xl text-white text-xl hover:scale-105 transition-[scale,opacity,translate] duration-[0.2s,1s,2s] cursor-pointer ${stretch ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"} `}><FaArrowUp className="animate-bounce" /></button>
      </div>
      <div ref={tryMe} className={` mb-10 text-center lg:text-start min-h-[348px] w-full relative flex flex-col lg:flex-row justify-center items-center  gap-8 ${stretch2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} transition-[opacity,translate] duration-[1s,2s] `}>
        <img src="/portfolio/assets/imgs/pur.png" className={`absolute w-full h-full -z-10 rounded-[32px]`} alt="" />
        <div className={`w-full h-full bg-[#0C96E2] absolute rounded-[32px] -z-20 -rotate-2 `}></div>
        <div className="max-w-[580px] m-8">
          <h1 className=" text-dark-mainText font-semibold text-5xl mb-8">Try me out, risk free!</h1>
          <p className="text-[20px] leading-8 text-dark-mainText">If you’re not happy with the design after the first draft,I’ll refund your deposit, no questions asked</p>
        </div>
        <button onClick={() => { window.scrollTo({ top: offset?.sectionScroll && offset?.sectionScroll.contact - 112, behavior: "smooth" }) }} className={`  m-8 w-[155px] h-[50px] rounded-md bg-[#0C96E2] text-dark-mainText cursor-pointer hover:scale-105 duration-300 `}>
          Contact
        </button>
      </div>
    </div>
  )
}

export default Education
