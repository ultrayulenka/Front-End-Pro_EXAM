import { BaseUiComponent } from "../base-ui-component";
import html from "./card.html";

export class MovieCard extends BaseUiComponent {
    constructor(data) {
        super(html,data);
        this.movie = data;
        const buttons = this._element.querySelectorAll("button");
        buttons.forEach((button) => {
            button.addEventListener("click", this.onClick.bind(this));
        });
    }

    onClick(event) {
        const movies = JSON.parse(localStorage.getItem("movies"));
        if(event.target.classList.contains("btn-delete") || event.target.closest("button").classList.contains("btn-delete") ){
            const confirmation = confirm(`Вы действительно хотели бы удалить фильм "${this.movie.title}"?`);
            if(confirmation){
                const index = movies.findIndex(movie => movie.id === this.movie.id);
                movies.splice(index,1);
                this._element.remove();
            } else return;
        }
        localStorage.setItem("movies", JSON.stringify(movies));
    }
    
}
