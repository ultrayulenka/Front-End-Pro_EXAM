import { BaseUiComponent } from "../base-ui-component";
import html from "./header.html";
import { appHistory } from "../app-history";

export class Header extends BaseUiComponent {
    constructor() {
        super(html);
        const links = this._element.querySelectorAll("a");
        links.forEach((link) => {
            link.addEventListener("click", this.onClick.bind(this));
        });
    }

    onClick(event) {
        event.preventDefault();
        const { href } = event.target;
        if(!appHistory.location.hash){
            appHistory.push({pathname: href});
        }
    }
}
