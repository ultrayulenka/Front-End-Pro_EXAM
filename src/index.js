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
    main.innerHTML = "";
    if(location.hash===''){
        const greeting = new Greeting();
        main.appendChild(greeting.render());
    } else if(location.hash==="#list"){
        const movie = movies.map(movie => new MovieCard(movie));
        movie.forEach(card => main.appendChild(card.render()));
    }  else if(location.hash===`#list-${movies.find(movie => movie.id === location.hash.slice(6))?.id}`){
        const movie = movies.find(movie => movie.id === location.hash.slice(6));
        const moviePage = new MoviePage(movie);
        main.appendChild(moviePage.render());
    } else if(location.hash==="#search"){
        const input = document.querySelector("#search input");
        const result = movies.filter(movie => movie.title.toLowerCase().includes(input.value.toLowerCase()));
        if(result.length>0) {
            const movie = result.map(movie => new MovieCard(movie));
            movie.forEach(card => main.appendChild(card.render()));
        } else { 
            const paragraph = document.createElement("p");
            paragraph.innerText = "По вашему запросу ничего не найдено";
            paragraph.className = "not-found";
            main.appendChild(paragraph);
        }
    } else {
        const paragraph = document.createElement("p");
        paragraph.innerText = "По вашему запросу ничего не найдено";
        paragraph.className = "mb-4 lead not-found";
        main.appendChild(paragraph);
    }
}



appHistory.listen((listener) => {
    renderRoute(listener.location);
});

renderRoute(appHistory.location);
