//import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import { Header } from "./header/header";
import { Container } from "./container/container";
import { Main } from "./main/main";
import { Greeting } from "./greeting/greeting";
import { Footer } from "./footer/footer";
import { appHistory } from "./app-history";

const container = new Container().render();
document.body.appendChild(container);
const header = new Header();
container.appendChild(header.render());
const main = new Main().render();
container.appendChild(main);
const footer = new Footer();
container.appendChild(footer.render());

function renderRoute(location) {
    if(location.pathname==="/"){
        main.innerHTML = "";
        const greeting = new Greeting();
        main.appendChild(greeting.render());
    }
    if(location.hash==="#list"){
        main.innerHTML = "";
    }  
}

appHistory.listen((listener) => {
    console.log(listener.location);
    renderRoute(listener.location);
});

renderRoute(appHistory.location);
