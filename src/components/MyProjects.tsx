import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "..";
import { Body } from "../App";
import Card from "./Card";

const MyProjects = () => {
  const offset = useContext(Body);
  const myProjects = useRef<HTMLDivElement | null>(null);
  const [stretch, setStretch] = useState<boolean>(false);
  let count = 0;
  const checkOnMyProjectsStretch = useCallback(() => {
    if (myProjects.current && myProjects.current?.getBoundingClientRect().top <= (20 * myProjects.current?.offsetTop) / 100)
      setStretch(true);
  }, [])
  const checkMyProjectsOffsetTop = (): void => {
    if (myProjects.current) {
      offset?.setSectionScroll(prev => {
        if (myProjects.current?.offsetTop)
          return { ...prev, projects: myProjects.current?.offsetTop }
        else
          return { ...prev }
      })
    }
  }
  useEffect(() => {
    checkMyProjectsOffsetTop();
  }, [window.innerWidth]);

  useEffect(() => {
    checkOnMyProjectsStretch();
    window.addEventListener("scroll", checkOnMyProjectsStretch);
    return () => {
      window.removeEventListener("scroll", checkOnMyProjectsStretch);
    }
  })
  useEffect(() => {
    if (stretch)
      window.removeEventListener("scroll", checkOnMyProjectsStretch)
  }, [stretch])
  return (
    <div ref={myProjects} className={` ${stretch ? "opacity-100 -translate-y-0" : "opacity-0 -translate-y-10"} px-[20px] lg:px-[70px] pt-[80px] transition-[color,background-color,opacity,translate] duration-[0.3s,0.3s,1s,2s]`}>
      <div className="flex flex-col lg:flex-row gap-10 justify-between items-center ">
        <div className="text-center lg:text-start">
          <p className=" font-medium text-[20px] text-[#0C96E2] mb-2 leading-[150%] ">Portfolio</p>
          <h1 className="text-[40px] font-semibold text-mainText dark:text-dark-mainText duration-300  ">My Creative Works<br /> Latest <span className="text-[#0C96E2]">Projects</span></h1>
        </div>
        <a className=" w-[160px] h-[50px] bg-[#0C96E2] text-white rounded-lg flex justify-center items-center hover:scale-105 duration-300 cursor-pointer  " target="-blank" href="https://github.com/Abd-AlRahman-Tanta">View Github</a>
      </div>
      <div className={` ${stretch ? "opacity-100 -translate-y-0" : "opacity-0 -translate-y-10"} delay-200 mt-[80px] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]  lg:grid-cols-[1fr_1fr_1fr] transition-[color,background-color,opacity,translate] duration-[0.3s,0.3s,1s,2s] gap-5`}>
        {
          [...projects].reverse().map((project) => {
            if (count >= 6)
              return;
            else {
              count++;
              return (
                <Card key={project.id} projectName={project.projectName} projectTools={project.projectTools} img={project.img} id={project.id} liveLink={project.liveLink} />
              )
            }
          })
        }
      </div>
      <Link to="/projects" className=" my-9  mx-auto w-[160px] h-[50px] bg-[#0C96E2] text-white rounded-lg flex justify-center items-center hover:scale-105 duration-300 cursor-pointer hover:bg-[#0C96E299] ">View All Projects</Link>
    </div>
  )
}

export default MyProjects
