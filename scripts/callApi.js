import { Translate as Translate } from "./translater";

export default async function ($fact, $currency, $joke, $quote, $quoteAuthor, $word, $mean, $word_en) {
  // Fact text
  fetch("https://api.api-ninjas.com/v1/facts?limit=1", {
    method: "GET",
    headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
    contentType: "application/json",
  })
    .then((res) => res.json())
    .then(async (data) => {
      await Translate(data[0].fact, $fact)
    })
    .catch((err) => console.log(err));

  // Convert currancy
  fetch(
    "https://api.api-ninjas.com/v1/convertcurrency?have=USD&want=DOP&amount=1",
    {
      method: "GET",
      headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
      contentType: "application/json",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      $currency.textContent = data.new_amount;
    })
    .catch((err) => console.log(err));

  // Random word
  fetch("https://api.api-ninjas.com/v1/randomword", {
    method: "GET",
    headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
    contentType: "application/json",
  })
    .then((res) => res.json())
    .then(async (data) => {
      await Translate(data.word, $word)
      $word_en.textContent = data.word
      return data.word;
    })
    .then((word) => {
      fetch("https://api.api-ninjas.com/v1/dictionary?word=" + word, {
        method: "GET",
        headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
        contentType: "application/json",
      })
        .then((res) => res.json())
        .then(async (data) => {
          let texto = await data.definition.split(". 2. " || "\n")[0]
          console.log("Significado de la palabra:", texto)
          setTimeout(()=>{},1500)
          Translate(texto,$mean)
        });
    })
    .catch((err) => console.log(err));

  // Quotes
  fetch("https://api.api-ninjas.com/v1/quotes?category=god", {
    method: "GET",
    headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
    contentType: "application/json",
  })
    .then((res) => res.json())
    .then(async (data) => {
      await Translate(data[0].quote, $quote)
      $quoteAuthor.textContent = data[0].author
    })
    .catch((err) => console.log(err));

  // Jokes
  fetch(
    "https://v2.jokeapi.dev/joke/Any?lang=es&blacklistFlags=religious,political&type=single"
  )
    .then((res) => res.json())
    .then((data) => {
      $joke.textContent = data.joke;
    })
    .catch((err) => console.log(err));
}
