import Image from "next/image";

function MainBanner() {
  return (
    <div className="flex flex-row mt-[6vh]">
      <div className="w-1/2 felx flex-col">
        <div className="text-xl  pt-[10vh] font-sans	font-normal pl-[3vw] pr-[3vw] mb-[3vh]">
          Experience the future of shopping with -{" "}
          <span className="font-semibold 	">FlipStore&apos;s</span>, advanced
          recommendation engine. Embrace fashion that&apos;s as unique as you
          are, and elevate your wardrobe to new heights.
        </div>
        <a href="/home" className="ml-[3vw]">
          <button className="btn relative overflow-hidden transition-transform duration-500 ease-in-out transform z-10 font-semibold text-xl text-uppercase bg-transparent border border-[#312E81] rounded-md py-3 px-7 hover:text-[#000] hover:border-[#312E81] hover:scale-105 active:filter brightness-70 active:scale-98">
            Exolore Now
          </button>
        </a>
        <div className="text-8xl items-end tracking-wider font-bold font-sans text-[#312E81] drop-shadow-xl shadow-black pl-[3vw] mt-[10vh]">
          FlipStore
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center ml-[7vw]  mr-[5vw] rounded-2xl">
        <div className=" pb-5 ">
          <Image
            src="/flipimage4.png"
            alt="Vercel Logo"
            width={500}
            height={100}
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
