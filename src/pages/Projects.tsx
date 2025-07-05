import { useEffect, useState } from "react";
import { projects, tools } from "..";

import { useMatches } from "react-router-dom";
import Card from "../components/Card";
const Projects = () => {
  const [tool, setTool] = useState<string>("All");
  const matches = useMatches();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [matches[matches.length - 1]])
  return (
    <div className="px-[20px] lg:px-[70px] pt-[120px]">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mt-5 mb-16">
        <label className="p-2.5 rounded-md border-2 border-[#0C96E2] font-medium lg:text-[20px] bg-mainBackground dark:bg-dark-mainBackground text-mainText dark:text-dark-mainText  " htmlFor="filter">Filter</label>
        <select onChange={(event) => setTool(event.target.value)} className="lg:max-w-[600px] grow cursor-pointer outline-0 p-2.5 rounded-md border-2 border-[#0C96E2] font-medium lg:text-[20px] bg-mainBackground dark:bg-dark-mainBackground text-mainText dark:text-dark-mainText  " name="" id="filter">
          <option defaultValue="All">All</option>
          {
            tools.map((tool) => {
              return (
                <option defaultValue={`${tool}`}>{tool}</option>
              )
            })
          }
        </select>
      </div>
      <div className="mt-30 w-full grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-3  ">
        {
          [...projects].filter((project) => {
            if (tool == "All")
              return true
            else if (project.projectTools === tool)
              return true;
          }).map(project => {
            return (
              <Card img={project.img} id={project.id} projectName={project.projectName} projectTools={project.projectTools} liveLink={project.liveLink} key={project.id} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Projects
