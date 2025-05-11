import dynamic from "next/dynamic";
const DesktopNavbar = dynamic(() => import("./DesktopNavbar").then((mod) => mod.DesktopNavbar));
const MobileNavbar = dynamic(() => import("./MobileNavbar").then((mod) => mod.MobileNavbar));

export const Header = () => {
  return (
    <>
      <div className="sticky top-0 z-40">
        <DesktopNavbar onLoginOpen={null!} onSearchOpen={null!} onWalletOpen={null!} walletBalance={1000} />
      </div>

      <MobileNavbar onLoginOpen={null!} onWalletOpen={null!} walletBalance={1000} />

      <div className="fixed bottom-0 z-60 w-full">{/* <BottomBar onSearchOpen={searchOpenWithEvent} /> */}</div>
    </>
  );
};
