import { BaseLayout } from "@components/ui/layout";
import { Hero } from "@components/ui/homepage";
import {  Button, Button2, Navbar, WalletBar } from "@components/ui/shared";
import Link from "next/link";

import { ButtonWrapper, NavWrapper } from "@components/ui/wrappers";

// import Image from "next/image";


export default function Home() {
  return (
    <>
      <div
        className={`bg-gradient-radial from-grey to-grey2 relative h-[auto]  md:h-auto overflow-hidden  `}
      >
        <NavWrapper />

        <Navbar />
        <WalletBar />
        <Hero />
        <ButtonWrapper />
        
      </div>
    </>
  );
}

Home.Layout = BaseLayout
