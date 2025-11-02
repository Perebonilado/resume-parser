"use client"

import useClickOutside from "@/hooks/useClickOutside";
import React, { ElementRef, FC, useState } from "react";
import Avatar from "./Avatar";
import UserManagementPopUp from "./UserManagementPopUp";


export default function UserManagementBox() {
  const [isPopUp, setIsPopUp] = useState(false);

  const popUpContainer = useClickOutside<ElementRef<"div">>(() => {
    setIsPopUp(false);
  });

  return (
    <div
      className="flex items-center justify-end relative"
      ref={popUpContainer}
    >
      <Avatar
        fallBack="U"
        imageUrl="https://avatar.iran.liara.run/public/49"
        size="md"
        alt="user image"
        slateBg={false}
        onClick={() => {
          setIsPopUp(!isPopUp);
        }}
      />
      <UserManagementPopUp isOpen={isPopUp} />
    </div>
  );
}
