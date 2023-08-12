import { useState } from "react";

import Button from "../Button";

type BoxProps = {
  children: React.ReactNode;
};

const Box = ({ children }: BoxProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpen = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="box">
      <Button onClick={handleOpen}>{isOpen ? "–" : "+"}</Button>
      {isOpen && children}
    </div>
  );
};

export default Box;
