import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

export default function DisplayForAdmin({ children }) {

  const { userData } = useContext(AppContext);

  if (!userData?.isBanned) {
    return children;
  }
}
