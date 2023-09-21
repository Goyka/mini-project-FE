import { useState } from "react";
import * as St from "@/styles/styles";

export default function ValidInput(props) {
  const { value, handleChange, handleKeyUp, errorMessage } = props;
  const [isCheck, setIsCheck] = useState(true);

  const handleValidateKeyUp = () => {
    const isValidate = handleKeyUp(value);
    setIsCheck(isValidate);
  };

  return (
    <>
      <St.Input
        name="InputComp"
        onChange={(e) => handleChange(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onKeyUp={handleValidateKeyUp}
      />
      {!isCheck && <St.ErrorMessage>{errorMessage}</St.ErrorMessage>}
    </>
  );
}
