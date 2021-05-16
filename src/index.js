//import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import { Header } from "./header/header";

const wrapper = document.createElement("div");
wrapper.className = "container d-flex flex-column shadow-sm bg-white";
const header = new Header();
wrapper.appendChild(header.render());

document.body.appendChild(wrapper);
