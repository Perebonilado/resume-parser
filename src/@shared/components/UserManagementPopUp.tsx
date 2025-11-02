import React, { forwardRef } from "react";
import Button from "../ui/Button";
import cn from "classnames";
import { useSession, signOut } from "next-auth/react";

interface Props {
  isOpen: boolean;
  position?: string;
}

const UserManagementPopUp = forwardRef<HTMLDivElement, Props>(
  ({ isOpen, position = "top-full right-0" }, ref) => {
    const baseStyles = cn(
      `w-[240px] p-4 shadow-md bg-white rounded-lg absolute ${position} z-[800]`,
      {
        ["block"]: isOpen,
        ["hidden"]: !isOpen,
      }
    );

    const { data } = useSession();

    return (
      <div className={baseStyles} ref={ref}>
        <div className={"pb-8"}>
          <p className="text-sm font-bold">{data?.user?.name}</p>

          <p className="text-xs text-gray-400">{data?.user?.email}</p>
        </div>

        {
          <div className="pt-[12px]">
            <Button
              title="Log out"
              variant="text"
              size="small"
              className="!text-black"
              onClick={() => {
                signOut();
              }}
            />
          </div>
        }
      </div>
    );
  }
);

export default UserManagementPopUp;
