import { BaseUiComponent } from "../base-ui-component";
import html from "./greeting.html";

export class Greeting extends BaseUiComponent {
    constructor() {
        super(html);
    }
}
