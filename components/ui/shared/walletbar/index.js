




export default function WalletBar() {
  return (
    <>
      {/* WalletBar */}

      <div className="h-auto m-auto my-[45px] md:my-5 w-[80%] md:w-[30vw] bg-white p-7  border border-black shadow-lg shadow-slate-500 rounded-[20px] rounded-bl-none">
        <div className="flex flex-col gap-3 items-center">
          <p className="font-normal text-sm  font">
            Hello, 0xa8B6RF6FD099D8899889EC35...
          </p>
          <p className="text-[1rem]">
            Currently on <span className="font-bold">Ethereum Network</span>
          </p>
        </div>
      </div>

      {/* WalletBar */}
    </>
  );
}
