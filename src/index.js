//import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import { Header } from "./header/header";
import { Container } from "./container/container";
import { Main } from "./main/main";
import { Greeting } from "./greeting/greeting";
import { Footer } from "./footer/footer";
import { appHistory } from "./app-history";
import moviesJSON from "./movies.json"
import { MovieCard } from "./movie/card";
import { MoviePage } from "./movie/page";

const container = new Container().render();
document.body.appendChild(container);
const header = new Header();
container.appendChild(header.render());
const main = new Main().render();
container.appendChild(main);
const footer = new Footer();
container.appendChild(footer.render());

if (!localStorage.getItem("movies")) {
    localStorage.setItem("movies", JSON.stringify(moviesJSON));
}

function renderRoute(location) {
const movies = JSON.parse(localStorage.getItem("movies"));

    if(location.pathname==="/"){
        main.innerHTML = "";
        const greeting = new Greeting();
        main.appendChild(greeting.render());
    }
    if(location.hash==="#list"){
        main.innerHTML = "";
        const movie = movies.map(movie => new MovieCard(movie));
        movie.forEach(card => main.appendChild(card.render()));
    }  
    if(location.hash===`#list-${movies.find(movie => movie.id === location.hash.slice(6))?.id}`){
        main.innerHTML = "";
        const movie = movies.find(movie => movie.id === location.hash.slice(6));
        const moviePage = new MoviePage(movie);
        main.appendChild(moviePage.render());

    }
}



appHistory.listen((listener) => {
    renderRoute(listener.location);
});

renderRoute(appHistory.location);
