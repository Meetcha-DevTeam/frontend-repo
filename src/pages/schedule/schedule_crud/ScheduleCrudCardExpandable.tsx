import React, { useState } from "react";
import ScheduleDurationRow from "./ScheduleDurationRow";

const ScheduleCrudCardExpandable = () => {
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [time, setTime] = useState<string>();
  return (
    <div>
      <ScheduleDurationRow />
    </div>
  );
};

export default ScheduleCrudCardExpandable;
