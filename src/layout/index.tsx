import MobileAppNav from "@/@shared/components/MobileAppNav";
import MobileSidebar from "@/@shared/components/MobileSidebar";
import React, { FC, PropsWithChildren, useState } from "react";
import cn from "classnames";
import Button from "@/@shared/ui/Button";
import ChevronLeft from "@/icons/ChevronLeft";
import { useRouter } from "next/router";
import TopNav from "@/@shared/components/TopNav";
import Sidebar from "@/@shared/components/Sidebar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [isSideNav, setIsSideNav] = useState(false);

  const router = useRouter();

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Mobile Nav - stays at top */}
      <div className="sticky top-0 z-50 md:hidden">
        <MobileAppNav
          isSideNav={isSideNav}
          handleClick={() => setIsSideNav(!isSideNav)}
        />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isSideNav={isSideNav}
        handleCloseSidebar={() => setIsSideNav(false)}
      />

      {/* Main content area */}
      <section className="flex flex-1 w-full md:max-h-screen md:overflow-hidden">
        {/* Desktop Sidebar + TopNav */}
        <div className="max-md:hidden">
          <TopNav />
          <Sidebar />
        </div>

        <main className="flex-1 w-full md:overflow-y-auto">
          {/* Desktop-only header actions */}
          <div className="max-md:hidden flex items-center justify-between border-b border-b-gray-300 py-2">
            {
              <Button
                title="Back"
                variant="text"
                starticon={<ChevronLeft />}
                className="!gap-1"
                size="small"
                onClick={() => {
                  router.back();
                }}
              />
            }
          </div>

          {/* Page content */}
          <div
            className={"p-4"}
          >
            {children}
          </div>
        </main>
      </section>
    </div>
  );
};

export default Layout;
