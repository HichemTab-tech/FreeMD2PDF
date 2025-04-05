import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext.ts";

const useTheme = () => useContext(ThemeContext)

export default useTheme