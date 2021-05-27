import { BaseUiComponent } from "../base-ui-component";
import html from "./card.html";

export class MovieCard extends BaseUiComponent {
    constructor(data) {
        super(html,data);
    }
}
