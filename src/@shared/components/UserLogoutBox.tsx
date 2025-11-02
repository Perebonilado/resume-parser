import React, { ElementRef, FC, useState } from "react";
import LogoutIconAlt from "@/icons/LogoutIconAlt";
import { useSelector } from "react-redux";
import { RootState } from "@/config/redux-config";
import cn from "classnames";
import useClickOutside from "@/hooks/useClickOutside";
import { signOut, useSession } from "next-auth/react";
import Avatar from "./Avatar";
import UserManagementPopUp from "./UserManagementPopUp";

const UserLogoutBox: FC = () => {
  const { navOpen: isOpen } = useSelector(
    (state: RootState) => state.navigationSliceReducer
  );
  const [isPopUp, setIsPopUp] = useState(false);

  const popUpContainer = useClickOutside<ElementRef<"div">>(() => {
    setIsPopUp(false);
  });

  const { data } = useSession();

  return (
    <div
      className={cn("py-10 w-full mt-auto flex items-center gap-2", {
        ["flex-col gap-4"]: !isOpen,
      })}
    >
      <div className="relative" ref={popUpContainer}>
        <Avatar
          fallBack="U"
          imageUrl="https://avatar.iran.liara.run/public/49"
          size={"sm"}
          alt="user image"
          slateBg={false}
          onClick={() => {
            setIsPopUp(!isPopUp);
          }}
          username={data?.user?.name ? data?.user?.name.split(" ")[0] : "User"}
          showUsername={isOpen}
        />
        <UserManagementPopUp
          isOpen={isPopUp}
          position="bottom-full left-full"
        />
      </div>

      <button
        className="ml-auto"
        onClick={() => {
          signOut();
        }}
      >
        <LogoutIconAlt />
      </button>
    </div>
  );
};

export default UserLogoutBox;
