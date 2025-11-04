"use client";

import { FC, useEffect } from "react";
import cn from "classnames";
import Button from "../ui/Button";
import AllDocumentsIcon from "@/icons/AllDocumentsIcon";
import LogoutIconAlt from "@/icons/LogoutIconAlt";
import { signOut } from "next-auth/react";
import UploadIcon from "@/icons/UploadIcon";
import { useActiveNavLink } from "@/hooks/useActiveNavLink";
import CollapsibleButton from "./CollapsibleButton";

interface Props {
  isSideNav: boolean;
  handleCloseSidebar: () => void;
}

const MobileSidebar: FC<Props> = ({ isSideNav, handleCloseSidebar }) => {
  const sideNavClasses = cn(
    `fixed transition-all duration-[.3s] z-50 w-[95vw] h-[calc(100vh-100px)] top-[90px] bg-[#2F004F] left-[2.5vw] flex flex-col md:hidden`,
    {
      "-translate-x-[calc(100%+2.5vw)]": !isSideNav,
    }
  );

  const [activeNavLink] = useActiveNavLink();

  useEffect(() => {
    window.addEventListener("resize", handleSidebarOnWindowResize);

    return () => {
      window.removeEventListener("resize", handleSidebarOnWindowResize);
    };
  }, []);

  const handleSidebarOnWindowResize = () => {
    handleCloseSidebar();
  };

  return (
    <div className={sideNavClasses}>
      <div style={{ flex: 3 }} className="flex flex-col gap-6 pt-10 px-4">
        {
          <>
            <CollapsibleButton
              showTextByDefault={true}
              icon={
                <UploadIcon
                  fill={activeNavLink === "/" ? "#2F004F" : "#FFFFFF"}
                />
              }
              isActive={activeNavLink === "/"}
              title="Upload Resume"
              link="/"
            />
            <CollapsibleButton
              showTextByDefault={true}
              icon={
                <AllDocumentsIcon
                  fill={activeNavLink === "/documents" ? "#2F004F" : "#FFFFFF"}
                />
              }
              isActive={activeNavLink === "/documents"}
              title="All Resumes"
              link="/resumes"
            />

            <CollapsibleButton
              showTextByDefault={true}
              icon={
                <AllDocumentsIcon
                  fill={
                    activeNavLink === "/resume-history" ? "#2F004F" : "#FFFFFF"
                  }
                />
              }
              isActive={activeNavLink === "/resume-history"}
              title="Resumes History"
              link="/resume-history"
            />
          </>
        }
      </div>

      <div style={{ flex: 1 }} className="flex items-center px-4 ">
        <Button
          title="Logout"
          variant="text"
          endicon={<LogoutIconAlt />}
          className="!text-white"
          onClick={() => {
            signOut();
          }}
        />
      </div>
    </div>
  );
};

export default MobileSidebar;
