import "bootstrap";
import html from "./modal.html";
import { v4 as uuidv4 } from "uuid";
import { BaseUiComponent } from "../base-ui-component";
import newField from "./newField.html";
import { appHistory } from "../app-history";
import { deepCopy } from "../deepCopy";

export class Modal extends BaseUiComponent {
  constructor(data) {
    super(html);
    if (data) {
      this.id = data;
    }
  }

  activate() {
    this.modal = new bootstrap.Modal(document.getElementById("modal"));
    const buttonSave = this._element.querySelector("button.save");
    buttonSave.addEventListener("click", this.onSave.bind(this));
    const buttonAddField = this._element.querySelector("#btn-add-field");
    buttonAddField.addEventListener("click", this.addNewPosition.bind(this));
    const buttonClose = this._element.querySelector("#close");
    buttonClose.addEventListener("click", this.closeModal.bind(this));
    this.modal.show();
  }

  onSave(event) {
    event.preventDefault();
    const movies = JSON.parse(localStorage.getItem("movies"));
    var movie = {};
    if (this.id === null || this.id == undefined) {
      movie = {
        id: uuidv4(),
        like: 0,
        dislike: 0,
      };
    } else {
      movie.id = this.id;
      movie.like = movies.find((el) => el.id === movie.id).like;
      movie.dislike = movies.find((el) => el.id === movie.id).dislike;
    }
    (movie.title = this._element.querySelector("#title").value),
      (movie.origin = this._element.querySelector("#origin_title").value),
      (movie.year = this._element.querySelector("#year").value),
      (movie.country = this._element.querySelector("#country").value),
      (movie.tagline = this._element.querySelector("#tagline").value),
      (movie.producer = this._element.querySelector("#producer").value),
      (movie.actors = this._element.querySelector("#actors").value.split(", ")),
      (movie.rating = `IMDb: ${this._element.querySelector("#rating").value}`),
      (movie.description = this._element.querySelector("#description").value),
      (movie.image = this._element.querySelector("#image").value),
      (movie.additionalPositions = []);
    const newFields = this._element.querySelectorAll(".new-field");
    newFields.forEach((field) => {
      const newPosition = {};
      newPosition[
        field.querySelector("input[name=position]").value.toLowerCase()
      ] = field.querySelector("input[name=name]").value;
      movie.additionalPositions.push(newPosition);
    });
    const index = movies.findIndex((el) => el.id === movie.id);
    if (index < 0) {
      movies.push(movie);
    } else {
      for (var key in movie) {
        if (movies[index][key] !== movie[key]) {
          movies[index][key] = deepCopy(movie[key]);
        }
      }
    }
    localStorage.setItem("movies", JSON.stringify(movies));
    appHistory.push({ pathname: "/", hash: "#list", search: "" });
    this.closeModal();
  }

  addNewPosition() {
    const field = new BaseUiComponent(newField).render();
    field.classList.add("new-field");
    this._element.querySelector("fieldset").appendChild(field);
    const btnRemove = field.querySelector(".btn-remove-field");
    btnRemove.addEventListener("click", (event) => {
      event.target.closest(".new-field").remove();
    });
  }

  fillInFields() {
    const movies = JSON.parse(localStorage.getItem("movies"));
    const movie = deepCopy(movies.find((el) => el.id === this.id));
    console.log(movie);
    this._element.querySelector("#title").value = movie.title;
    this._element.querySelector("#origin_title").value = movie.origin;
    this._element.querySelector("#year").value = movie.year;
    this._element.querySelector("#country").value = movie.country;
    this._element.querySelector("#tagline").value = movie.tagline;
    this._element.querySelector("#producer").value = movie.producer;
    this._element.querySelector("#actors").value = movie.actors.join(", ");
    this._element.querySelector("#rating").value = movie.rating.slice(6);
    this._element.querySelector("#description").value = movie.description;
    this._element.querySelector("#image").value = movie.image;
    if (movie.additionalPositions.length > 0) {
      movie.additionalPositions.forEach(this.addNewPosition.bind(this));
      const newFields = this.render().querySelectorAll(".new-field");
      newFields.forEach((field, index) => {
        field.querySelector("input[name=position]").value = Object.keys(
          movie.additionalPositions[index]
        )[0];
        field.querySelector("input[name=name]").value = Object.values(
          movie.additionalPositions[index]
        )[0];
      });
    }
  }

  closeModal() {
    this.modal.hide();
    this._element.remove();
  }
}
