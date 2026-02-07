import React from "react";
import { IconContext } from "react-icons/lib";

interface Props {
  value?: IconContext;
  children: React.ReactNode;
}

const IconContainer = ({ children, value }: Props) => {
  const defaultValue: IconContext = value
    ? value
    : {
        size: "1.5rem",
        color: "#333",
      };

  return (
    <IconContext.Provider value={defaultValue}>
      <div>{children}</div>
    </IconContext.Provider>
  );
};

export default IconContainer;
