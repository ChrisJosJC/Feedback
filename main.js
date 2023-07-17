import "./style.css";
import "./callApi.js";
import callApi from "./callApi.js";

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

setTimeout(() => {
  $("main").style.display = "block";
  $("#logo-icon").style.display = "none";
}, 900);
callApi(
  $("#fact-text"),
  $("#currency-text"),
  $("#joke-text"),
  $("#quote-text"),
  $("#quote-author"),
  $("#word-text"),
  $("#mean-text"),
  $("#word-text-en"),
);
