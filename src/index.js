import "./style.css";
import { Header } from "./header/header";

const wrapper = document.createElement("div");
wrapper.className = "container d-flex flex-column shadow-sm bg-white";
document.body.appendChild(wrapper);
const header = new Header();
wrapper.body.appendChild(header.render());


