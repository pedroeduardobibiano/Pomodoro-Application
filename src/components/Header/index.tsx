import { HeaderContainer } from "./styles";
import IgniteICon from "../../assets/Logo.svg";
import {Timer, Scroll} from 'phosphor-react'
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
      <img src={IgniteICon} alt="" />
      <nav>
        <NavLink to="/history" title="timer"><Timer size={24}/></NavLink>
        <NavLink to="/" title="Hitórico"><Scroll size={24}/></NavLink>
      </nav>
    </HeaderContainer>
  );
}
