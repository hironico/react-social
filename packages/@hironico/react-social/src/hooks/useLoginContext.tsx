import { useContext } from "react"
import { LoginContext } from "../context/LoginContext"

const useLoginContext = () => {
    const context = useContext(LoginContext);
    return context;
}

export default useLoginContext;