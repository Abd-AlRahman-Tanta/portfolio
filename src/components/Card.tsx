import { memo, useState } from "react";
import ReactDOM from "react-dom";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";





const Card = ({ img, projectName, projectTools, liveLink, id }: { img: string, projectName: string, projectTools: string, liveLink: string, id: string }) => {
  const [full, setFull] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  let x: boolean = false;
  const checkOnScrollStart = () => {
    x = false;
  }
  const checkOnScroll = () => {
    x = true;
  }
  const checkOnTouch = () => {
    if (x == false)
      setShow(!show)
  }
  return (
    <div className={`dark:shadow-[0_4px_7px_0_#ffffff33] shadow-[0_4px_7px_0_#00000033] w-full min-h-[400px] rounded-lg border-1 bg-[#f7f7f7] dark:bg-dark-mainBackground border-secondText dark:border-[#0C96E2]  duration-300 mx-auto`}>
      <div className=" w-full h-[220px] rounded-t-lg mb-8 relative border-b-1 border-secondText dark:border-[#0C96E2]   group">
        <img className={`absolute w-full h-full z-10 object-cover rounded-t-lg`} src={img} alt="" />
        <div onTouchStart={checkOnScrollStart} onTouchMove={checkOnScroll} onTouchEnd={checkOnTouch} className={` bg-[#00000080] w-full h-full absolute z-20 opacity-0 ${show && "opacity-100"} group-hover:opacity-100  duration-300 `}></div>
        <Link onTouchEnd={() => setShow(false)} className={` group/link w-8 absolute top-1/2 -translate-y-1/2 left-1/3 -translate-x-1/3 z-30 opacity-0 scale-0 ${show && "  opacity-100 scale-100 "} group-hover:opacity-100 group-hover:scale-100   cursor-pointer delay-200 duration-300`} to={`/project/${id}`}>
          <img className="group-hover/link:scale-110 duration-300" src="/portfolio/assets/imgs/icon2.png" alt="" />
        </Link>
        <BsArrowsFullscreen onTouchEnd={() => setShow(false)} onClick={() => setFull(!full)} className={`absolute top-1/2 -translate-y-1/2 right-1/3 -translate-x-1/3 z-30 opacity-0 scale-0  ${show && "opacity-100 scale-100"}  group-hover:opacity-100 group-hover:scale-100  cursor-pointer hover:scale-110 delay-200 duration-300 text-2xl text-white `} />
      </div>
      <div className="flex justify-between items-center gap-2 mx-4">
        <Link to={`/project/${id}`} className=" font-semibold text-center  text-[22px] text-mainText dark:text-dark-mainText   duration-300  hover:underline ">{projectName}</Link>
        <Link to={`/project/${id}`} className=" flex justify-center items-center gap-2 text-[14px] font-normal text-[#0C96E2] bg-[#e3eaf8] dark:bg-[#232d42] p-2 rounded-2xl  hover:scale-110 duration-300"><FaLongArrowAltLeft /> Details</Link>
      </div>
      <div className="flex  justify-between gap-5 items-center mx-4 mt-7 mb-3">
        <p className=" duration-300 py-3 px-1.5 text-[15px] text-center bg-[#e3eaf8] dark:bg-[#232d42] text-[#0C96E2] rounded-2xl ">{projectTools}</p>
        <a style={{ flexDirection: `${window.innerWidth < 300 ? "column" : "row"}` }} title="Live Project" className={` hover:scale-110 rounded-2xl p-3 bg-[#e3eaf8] dark:bg-[#232d42] duration-300 flex  text-[14px] justify-center items-center text-[#0C96E2] gap-2.5 `} href={liveLink} target="-blank" >
          Live
          <img className="w-7" src="/portfolio/assets/imgs/Icon.png" alt="" />
        </a>
      </div>

      {full && ReactDOM.createPortal(
        <img onClick={() => setFull(false)} className="fixed h-screen w-screen rounded-t-0 bg-[#000000b0] top-0 left-0 object-contain z-50" src={img} alt="" />
        , document.body
      )}
    </div>
  )
}

export default memo(Card)




