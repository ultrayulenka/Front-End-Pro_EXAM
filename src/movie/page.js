import { BaseUiComponent } from "../base-ui-component";
import html from "./page.html";

export class MoviePage extends BaseUiComponent {
    constructor(data) {
        super(html,data);
        this.movie = data;
        const buttons = this._element.querySelectorAll("button svg");
        buttons.forEach((button) => {
            button.addEventListener("click", this.onClick.bind(this));
        });
    }

    onClick(event) {
        const movies = JSON.parse(localStorage.getItem("movies"));
        if(event.target.classList.contains("octicon-thumbsup")){
            this.movie.like++
            movies.find(movie => movie.id === this.movie.id).like++;
            event.target.closest("button").dataset.count++;
        }
        if(event.target.classList.contains("octicon-thumbsdown")){
            this.movie.dislike++
            movies.find(movie => movie.id === this.movie.id).dislike++;
            event.target.closest("button").dataset.count++;
        }
        localStorage.setItem("movies", JSON.stringify(movies));
    }
}
