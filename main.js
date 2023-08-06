import callApi from "./scripts/callApi.js";

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

setTimeout(()=>{
  $("main").style.display = "block";
  $("#logo-icon").style.display = "none";
},4000)
callApi({
  $fact: $("#fact-text"),
  $currency: $("#currency-text"),
  $joke:$("#joke-text"),
  $quote:$("#quote-text"),
  $quoteAuthor: $("#quote-author"),
  $word: $("#word-text"),
  $mean: $("#mean-text"),
  $word_en: $("#word-text-en"),
  $news: $("#news-content"),
  $verse: $("#verse"),
});