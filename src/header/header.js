import { BaseUiComponent } from "../base-ui-component";
import html from "./header.html";
import { appHistory } from "../app-history";
import { Modal } from "../modal/modal";

window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");

export class Header extends BaseUiComponent {
  constructor() {
    super(html);
    const link = this._element.querySelector("a");
    link.addEventListener("click", this.onClick.bind(this));
    const search = this._element.querySelector("#search");
    search.addEventListener("submit", this.onSearch.bind(this));
    const addButton = this._element.querySelector("#add-new");
    addButton.addEventListener("click", this.onAddNew.bind(this));
  }

  onClick(event) {
    event.preventDefault();
    appHistory.push({ 
        pathname: "/", 
        hash: "#list", 
        search: "" 
    });
    console.log(appHistory);
  }

  onSearch(event) {
    event.preventDefault();
    appHistory.push({
      hash: "#search",
      search: `?query=${event.target.query.value}`,
    });
    event.target.query.value = "";
  }

  onAddNew(event) {
    event.preventDefault();
    const modal = new Modal();
    document.body.appendChild(modal.render());
    modal.activate();
  }
}
