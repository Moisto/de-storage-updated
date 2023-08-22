import { Button }from "@components/ui/shared/";

// import { useWeb3 } from "@components/providers";


export default function Navbar() {

  // const {connect} = useWeb3()


  return (
    <>
      <div
        style={{ background: "rgba(160, 150, 150, 0.54)" }}
        className="flex justify-between items-center py-4 px-4 md:px-16   w-full h-auto m-auto   backdrop-blur-sm font-roboto"
      >
        <p className="md:text-2xl text-white font-normal">
          <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>De</span>Storage
        </p>

        {/* <Button className="px-4 py-2" >
          Connect wallet
        </Button> */}
        <button
          onClick={()=> console.log("hello")}
          className={`py-4 px-8 bg-circleRed rounded-tl-[30px] rounded-br-[30px] text-white text-sm font-normal font-poppins hover:bg-circleRedHover`}
        >
          Connect wallet
        </button>
      </div>
    </>
  );
}
