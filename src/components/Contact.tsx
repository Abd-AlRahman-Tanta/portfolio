import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { FaPhoneAlt } from "react-icons/fa"
import { IoLocationSharp } from "react-icons/io5"
import { TfiEmail } from "react-icons/tfi"
import { Body } from "../App"

const Contact = () => {
  const offset = useContext(Body);
  const contact = useRef<HTMLDivElement | null>(null);
  const [stretch, setStretch] = useState<boolean>(false);
  const name = useRef<HTMLInputElement | null>(null);
  const email = useRef<HTMLInputElement | null>(null);
  const phone = useRef<HTMLInputElement | null>(null);
  const message = useRef<HTMLTextAreaElement | null>(null);
  let data = useRef<{ name: string, email: string, phone: string, message: string }>({ name: "", email: "", phone: "", message: "" })
  function sendEmail() {
    setTimeout(() => {
      if (data.current.email != "" && data.current.name != "" && data.current.phone != "" && data.current.message != "") {
        data.current = { name: "", email: "", phone: "", message: "" };
        if (name.current != null && email.current && phone.current && message.current) {
          name.current.value = "";
          email.current.value = "";
          phone.current.value = "";
          message.current.value = "";
        }
      }
    }, 500)
  }

  const checkOnContactStretch = useCallback((): void => {
    if (contact.current) {
      if (contact.current.getBoundingClientRect().top <= (20 * contact.current.offsetTop) / 100) {
        setStretch(true);
      }
    }
  }, [])
  const checkMyContactOffsetTop = (): void => {
    if (contact.current) {
      offset?.setSectionScroll(prev => {
        if (contact.current != null)
          return { ...prev, contact: contact.current?.offsetTop }
        else
          return { ...prev }
      })
    }
  }
  useEffect(() => {
    checkMyContactOffsetTop();
  }, [window.innerWidth])
  useEffect(() => {
    checkOnContactStretch();
    window.addEventListener("scroll", checkOnContactStretch);
    return () => {
      window.removeEventListener("scroll", checkOnContactStretch);
    }
  }, []);
  useEffect(() => {
    if (stretch == true)
      window.removeEventListener("scroll", checkOnContactStretch);
  }, [stretch])
  return (
    <div ref={contact} className={`mt-[120px] px-[20px] lg:px-[70px] ${stretch ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} transition-[opacity,translate] duration-[1s,2s] `}>
      <p className=" text-center lg:text-start font-medium text-[20px] leading-[150%] text-[#0C96E2]  ">Contact</p>
      <h1 className=" text-center lg:text-start font-semibold text-[40px] duration-300 text-mainText dark:text-dark-mainText  my-14 mt-2.5  ">
        Let’s Discuss Your <span className="text-[#0C96E2]">Project</span>
      </h1>
      <div className=" w-full min-h-[360px] flex flex-col lg:flex-row justify-between items-start gap-10 ">
        <div className={`w-full lg:max-w-[380px] ${stretch ? "opacity-100 translate-y-0 delay-300" : "opacity-0 -translate-y-10"} transition-[opacity,translate] duration-[1s,2s] `}>
          <div className=" flex flex-col sm:flex-row  justify-start items-center gap-4  ">
            <div className=" w-[60px] h-[60px] rounded-md bg-[#0C96E2] text-white text-[20px] flex justify-center items-center "><FaPhoneAlt /></div>
            <p className=" text-[14px]  text-secondText flex flex-col justify-start items-center sm:items-start gap-1.5  ">Call me <span className=" sm:text-[18px] font-medium text-mainText dark:text-dark-mainText duration-300  ">+963997548562</span></p>
          </div>
          <div className=" my-10 flex flex-col sm:flex-row  justify-start items-center gap-4  ">
            <div className=" w-[60px] h-[60px] rounded-md bg-[#0C96E2] text-white text-[20px] flex justify-center items-center "><TfiEmail /></div>
            <p className="text-[14px]  text-secondText flex flex-col justify-start items-center sm:items-start gap-1.5  ">Email me <span className="sm:text-[18px] font-medium text-mainText dark:text-dark-mainText duration-300  ">iamwhitebeard2@gmail.com</span></p>
          </div>
          <div className=" flex flex-col sm:flex-row  justify-start items-center gap-4  ">
            <div className=" w-[60px] h-[60px] rounded-md bg-[#0C96E2] text-white text-[20px] flex justify-center items-center "><IoLocationSharp /></div>
            <p className=" text-[14px]  text-secondText flex flex-col justify-start items-center sm:items-start gap-1.5  ">Address<span className=" sm:text-[18px] font-medium text-mainText dark:text-dark-mainText duration-300  ">Damascus,syria</span></p>
          </div>
        </div>
        <div className="w-full lg:max-w-[780px] min-h-[330px]">
          <p className=" text-mainText dark:text-dark-mainText font-semibold text-[18px] mb-5 duration-300 text-center ">Please, if you are in Syria, turn on the VPN so that I can receive your message!!!!</p>
          <form target="_blank" onSubmit={sendEmail} action="https://formsubmit.co/iamwhitebeard2@gmail.com" method="POST" className={` text-mainText dark:text-dark-mainText duration-300 lg:grow  w-full min-h-[330px] ${stretch ? " delay-700 opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} transition-[opacity,translate] duration-[1s,2s]  `}>
            <input type="hidden" name="_captcha" defaultValue="false" />
            <div className=" w-full flex flex-col lg:flex-row justify-center items-center gap-6  ">
              <input ref={name} defaultValue={data.current.name} onChange={(event) => { data.current = { ...data.current, name: event.target.value } }} required className=" dark:shadow-[0_4px_7px_0_#ffffff33] shadow-[0_4px_7px_0_#00000033] outline-0 placeholder:text-secondText w-full lg:w-1/2 rounded-md border-1 border-secondText h-[60px] pl-7  " type="text" name="Name" placeholder="Full Name" />
              <input ref={email} defaultValue={data.current.email} onChange={(event) => { data.current = { ...data.current, email: event.target.value } }} required placeholder="Your Email" className=" outline-0 placeholder:text-secondText w-full lg:w-1/2 rounded-md border-1 dark:shadow-[0_4px_7px_0_#ffffff33] shadow-[0_4px_7px_0_#00000033] border-secondText h-[60px] pl-7  " type="email" name="Email" />
            </div>
            <input ref={phone} defaultValue={data.current.phone} onChange={(event) => { data.current = { ...data.current, phone: event.target.value } }} className=" dark:shadow-[0_4px_7px_0_#ffffff33] shadow-[0_4px_7px_0_#00000033] outline-0 placeholder:text-secondText block my-7 w-full rounded-md border-1  border-secondText h-[60px] pl-7  " required placeholder="Phone Number" type="text" name="PhoneNumber" />
            <textarea ref={message} defaultValue={data.current.message} onChange={(event) => { data.current = { ...data.current, message: event.target.value } }} className=" resize-none dark:shadow-[0_4px_7px_0_#ffffff33] shadow-[0_4px_7px_0_#00000033] outline-0 pt-7 placeholder:text-secondText block w-full rounded-md border-1 border-secondText h-[180px] pl-7 mb-5  " required placeholder="Your Message" name="Message" id=""></textarea>
            <button className=" my-9  mx-auto w-[160px] h-[50px] bg-[#0C96E2] text-white rounded-lg flex justify-center items-center hover:scale-105 duration-300 cursor-pointer hover:bg-[#0C96E299] " type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact



