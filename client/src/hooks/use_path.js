import { useSelector } from "react-redux"
import { Path } from "../store/path_slice"

const usePath = () => {
    return useSelector(Path)
}

export default usePath