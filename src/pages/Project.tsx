import { useEffect, useState, type TouchEvent } from "react";
import ReactDOM from "react-dom";
import { BsArrowsFullscreen } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, useMatches, useNavigate, useParams } from "react-router-dom";
import { projects } from "..";
import Card from "../components/Card";
const Project = () => {
  let { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [slider, setSlider] = useState<number>(0);
  const [full, setFull] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const matches = useMatches();
  let a: boolean = true;
  let t: boolean = false;
  let right: boolean = true;
  let top: boolean = true;
  let x: number = 0;
  let h: number = 0;
  let v: number = 0;
  let y: number = 0;
  const checkOnScrollStart = () => {
    t = false;
  }
  const checkOnScroll = () => {
    t = true;
  }
  const checkOnTouch = () => {
    if (t == false)
      setShow(!show)
  }
  const slideToLeft = (): void => {
    if (window.innerWidth >= 992) {
      setSlider(prev => {
        if (prev == projects.length - 4)
          return 0;
        else
          return prev + 1;
      })
    }
    else {
      setSlider(prev => {
        if (prev == projects.length - 2)
          return 0;
        else
          return prev + 1;
      })
    }
  }
  const slideToRight = (): void => {
    if (window.innerWidth >= 992) {
      setSlider(prev => {
        if (prev == 0)
          return projects.length - 4;
        else
          return prev - 1;
      })
    }
    else {
      setSlider(prev => {
        if (prev == 0)
          return projects.length - 2;
        else
          return prev - 1;
      })
    }
  }
  function itIsTouch(event: TouchEvent): void {
    h = event.touches[0].clientX;
    v = event.touches[0].clientY;
    a = true;
  }
  function itIsMove(): void {
    a = false;
  }
  function checkTouchOrMove(event: TouchEvent): void {
    x = event.changedTouches[0].clientX;
    y = event.changedTouches[0].clientY;
    Math.abs(x - h) > Math.abs(y - v) ? top = false : top = true;
    x - h > 0 ? right = true : right = false;
    if (a == false && top == false && right == true)
      slideToRight();
    else if (a == false && top == false && right == false)
      slideToLeft();
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [matches[matches.length - 1].pathname])
  useEffect(() => {
    window.matchMedia("(orientation:portrait)").addEventListener("change", () => {
      setSlider(0);
    })
    return () => {
      window.matchMedia("(orientation:portrait)").removeEventListener("change", () => {
        setSlider(0);
      })
    }
  }, [])
  useEffect(() => {
    { id && id.split("").every((char) => char >= "0" && char <= "9") ? "" : navigate("/") }
  })
  return (
    <div className="">
      {
        projects.map((project) => {
          if (project.id == id)
            return (
              <div key={id} className=" min-h-screen pt-[120px] px-5 lg:px-[70px] flex flex-col-reverse lg:flex-row justify-between items-center mb-20 gap-9   ">
                <div className=" group w-full lg:max-w-[600px] min-h-[400px] relative ">
                  <img src={project.img} alt="" className=" h-full w-full  absolute top-0  z-10 object-cover  " />
                  <div onTouchStart={checkOnScrollStart} onTouchMove={checkOnScroll} onTouchEnd={checkOnTouch} className={` bg-[#00000080] w-full h-full absolute z-20 opacity-0 ${show && "opacity-100"} group-hover:opacity-100  duration-300 `}></div>
                  <Link onTouchEnd={() => setShow(false)} className={` group/link w-8 absolute top-1/2 -translate-y-1/2 left-1/3 -translate-x-1/3 z-30 opacity-0 scale-0 ${show && "  opacity-100 scale-100 "} group-hover:opacity-100 group-hover:scale-100   cursor-pointer delay-200 duration-300`} to={`/project/${id}`}>
                    <img className="group-hover/link:scale-110 duration-300" src="/portfolio/assets/imgs/icon2.png" alt="" />
                  </Link>
                  <BsArrowsFullscreen onTouchEnd={() => setShow(false)} onClick={() => setFull(!full)} className={`absolute top-1/2 -translate-y-1/2 right-1/3 -translate-x-1/3 z-30 opacity-0 scale-0  ${show && "opacity-100 scale-100"}  group-hover:opacity-100 group-hover:scale-100  cursor-pointer hover:scale-110 delay-200 duration-300 text-2xl text-white `} />
                </div>
                <div className="max-w-[570px]">
                  <div className="flex justify-between items-center gap-4  ">
                    <h1 className="text-mainText dark:text-dark-mainText font-semibold text-[28px]">{project.projectName}</h1>
                    <a title="Live Project" className="hover:scale-110 duration-300" href={project.liveLink} target="-blank" >
                      <img className="w-8" src="/portfolio/assets/imgs/Icon.png" alt="" />
                    </a>
                  </div>
                  <p className=" mb-6 mt-4 text-[18px] text-mainText dark:text-dark-mainText leading-[28px] ">{project.projectDescription}</p>
                  <h2 className="p-3 bg-[#e3eaf8] dark:bg-[#232d42] text-[#0C96E2] rounded-2xl flex justify-start items-center gap-2 font-normal duration-300"><span className="block font-medium text-[18px]  text-mainText dark:text-dark-mainText leading-[28px]">Languages & Framework and Libraries :</span> {project.projectTools}</h2>
                  <a title="GitHub Repositorie" className=" mx-auto lg:mx-0 mt-8 w-[160px] h-[50px] bg-[#0C96E2] text-white rounded-lg flex justify-center items-center hover:scale-105 duration-300 cursor-pointer  " target="-blank" href="https://github.com/Abd-AlRahman-Tanta">Github Repo</a>
                </div>
              </div>
            )
        })
      }
      <div className="w-full relative h-5 border-b-2 border-dashed border-dark-mainBackground my-10 dark:border-mainBackground">
        <div className={` w-8 h-8 flex justify-center items-center rounded-full bg-mainBackground dark:bg-dark-mainBackground border-1 border-dark-mainBackground dark:border-mainBackground absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 z-20 `}>
          <div className={` font-extrabold flex justify-center items-end text-mainText dark:text-dark-mainText w-5 h-5 rounded-full bg-mainBackground dark:bg-dark-mainBackground border-1 border-dark-mainBackground dark:border-mainBackground`}>
            .
          </div>
        </div>
      </div>
      <div className=" px-[20px] lg:px-[70px] mt-20  ">
        <div className="w-full flex flex-col lg:flex-row  justify-between items-center gap-10 ">
          <div className="">
            <p className=" font-medium text-[20px] leading-[150%] text-[#0C96E2]  ">Portfolio</p>
            <h1 className=" font-semibold text-[40px] text-mainText dark:text-dark-mainText ">The Best <span className="text-[#0C96E2]">Projects</span></h1>
          </div>
          <div className=" w-full lg:w-fit flex justify-between lg:justify-center items-center gap-3  ">
            <div onClick={slideToRight} className={`bg-white text-secondText cursor-pointer group/first w-9 h-9 rounded-full border-2 border-[#0C96E2] flex justify-center items-center text-[20px]   hover:bg-[#0C96E2] hover:text-white hover:scale-110 duration-300  `}>
              <IoIosArrowBack className=" " />
            </div>
            <div onClick={slideToLeft} className={` bg-white text-secondText cursor-pointer  w-9 h-9 rounded-full border-2 border-[#0C96E2] flex justify-center items-center text-[20px] hover:bg-[#0C96E2] hover:text-white hover:scale-110 duration-300 `}>
              <IoIosArrowForward className="" />
            </div>
          </div>
        </div>
        <div onTouchStart={itIsTouch} onTouchMove={itIsMove} onTouchEnd={checkTouchOrMove} className={` flex justify-start items-center lg:gap-10 mt-10  overflow-hidden `}>
          {
            [...projects].reverse().map((project) => {
              if (project.id == id)
                return;
              return (
                <div style={{ transform: `${`translateX(-${slider * 100}%)`}`, right: `${window.innerWidth >= 992 ? `${slider * 40}px` : `0`}` }} className={`shrink-0 relative w-full duration-500 lg:w-[calc((100%-80px)/3)]`} key={project.id}>
                  <Card img={project.img} projectName={project.projectName} projectTools={project.projectTools} liveLink={project.liveLink} id={project.id} />
                </div>
              )
            })
          }
        </div>
      </div>
      {
        full && ReactDOM.createPortal(
          <img onClick={() => setFull(false)} src={`${projects.find((project) => project.id == id)?.img}`} className="fixed h-screen w-screen rounded-t-0 bg-[#000000b0] top-0 left-0 object-contain z-50" alt="" />, document.body
        )
      }
    </div >
  )
}

export default Project


