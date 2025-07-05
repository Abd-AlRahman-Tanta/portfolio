import { useRef } from "react";
import AboutMe from "../components/AboutMe";
import Contact from "../components/Contact";
import Education from "../components/Education";
import Hero from "../components/Hero";
import MyProjects from "../components/MyProjects";




const Body = () => {

  let down = useRef<HTMLDivElement | null>(null);








  return (
    <div ref={down} className=" pt-[140px] dark:bg-dark-mainBackground bg-mainBackground duration-300">
      <Hero />
      <AboutMe />
      <Education />
      <MyProjects />
      <Contact />
    </div>
  )
}

export default Body
