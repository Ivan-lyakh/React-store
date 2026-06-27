import { useDispatch } from "react-redux";
import { setInfo } from "../sliceStore/info"
import { removeInfo } from "../sliceStore/info"

export const useInfo = () => {

  const dispatch = useDispatch()

  function showInfo(
    text: string,
    success: boolean
  ) {

    const id = Date.now();

    dispatch(setInfo({
      id,
      text,
      success
    }));

    setTimeout(() => {
      dispatch(removeInfo(id));
    }, 2000);
  }


  return { showInfo }
}