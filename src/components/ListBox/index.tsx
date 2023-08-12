import { useState } from "react";

import Button from "../shared/Button";

type ListBoxProps = {
  children: React.ReactNode;
};

const ListBox = ({ children }: ListBoxProps) => {
  const [isOpen1, setIsOpen1] = useState(true);

  const handleOpen1 = () => {
    setIsOpen1((prevOpen) => !prevOpen);
  };

  return (
    <div className="box">
      <Button onClick={handleOpen1}>{isOpen1 ? "–" : "+"}</Button>
      {isOpen1 && children}
    </div>
  );
};

export default ListBox;
