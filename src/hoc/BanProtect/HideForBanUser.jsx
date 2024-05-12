import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

export default function HideForBanUser({ children }) {

  const { userData } = useContext(AppContext);

  if (!userData?.isBanned) {
    return children;
  }
}
