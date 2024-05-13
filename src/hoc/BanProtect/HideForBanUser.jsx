import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

export default function HideForBanUser({ children }) {

  const {user, userData } = useContext(AppContext);

  if (!userData?.isBanned && user !== null) {
    return children;
  }
}
