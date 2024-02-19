import { useContext } from "react";
import AppContext from "../provider/appContext";

function useTemp(temp, toFixed = 0) {
  const {
    app: { unit },
  } = useContext(AppContext);

const celciusTOfarenheit = ((temp*9)/5+32).toFixed(toFixed);
  unit.toLowerCase()==="f" ? return celciusTOfarenheit: ;

  return parseFloat(temp).toFixed(toFixed);
}

export default useTemp;
