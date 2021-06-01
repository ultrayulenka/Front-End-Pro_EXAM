import html from "./header.html";
import { BaseUiComponent } from "../base-ui-component";
import "bootstrap";
import { appHistory } from "../app-history";
import { Modal } from "../modal/modal";


//global.jQuery = global.$ = $;
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');

export class Header extends BaseUiComponent {
    constructor() {
        super(html);
        const links = this._element.querySelectorAll("a");
        links.forEach((link) => {
            link.addEventListener("click", this.onClick.bind(this));
        });

        const search = this._element.querySelector("#search");
        search.addEventListener("submit", this.onSearch.bind(this));

        const addButton = this._element.querySelector("#add-new");
        addButton.addEventListener("click", this.onAddNew.bind(this));
    }

    onClick(event) {
        event.preventDefault();
        const { href } = event.target;
        appHistory.push({
            pathname: href,
            hash:'',
        });
    }

    onSearch(event){
        event.preventDefault();
        appHistory.push({
            hash:'#search'
        })
    }

    onAddNew(event){
      event.preventDefault();
      const modal = new Modal();
      document.body.appendChild(modal.render());
      modal.activate();
    }
}
