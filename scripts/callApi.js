import { Translate as Translate } from "./translater";

export default async function ({ $fact,
  $currency,
  $joke,
  $quote,
  $quoteAuthor,
  $word,
  $mean,
  $word_en,
  $verse,
  $news
}) {
  // Fact text
  setTimeout(() => {}, 500);
  fetch("https://api.api-ninjas.com/v1/facts?limit=1", {
    method: "GET",
    headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
    contentType: "application/json",
  })
    .then((res) => res.json())
    .then(async (data) => {
      await Translate(data[0].fact, $fact);
    })
    .catch((err) => console.log(err));

  // Convert currancy
  setTimeout(() => {}, 500);
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
  setTimeout(() => {}, 500);
  fetch("https://api.api-ninjas.com/v1/randomword", {
    method: "GET",
    headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
    contentType: "application/json",
  })
    .then((res) => res.json())
    .then(async (data) => {
      await Translate(data.word, $word);
      $word_en.textContent = data.word;
      return data.word;
    })
    .then((word) => {
      setTimeout(() => {}, 500);
      fetch("https://api.api-ninjas.com/v1/dictionary?word=" + word, {
        method: "GET",
        headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
        contentType: "application/json",
      })
        .then((res) => res.json())
        .then(async (data) => {
          let texto = await data.definition.split(". 2. " || "\n")[0];
          console.log("Significado de la palabra:", texto);
          setTimeout(() => {}, 2000);
          Translate(texto, $mean);
        });
    })
    .catch((err) => console.log(err));

  // Quotes
  setTimeout(() => {}, 500);
  fetch("https://api.api-ninjas.com/v1/quotes", {
    method: "GET",
    headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
    contentType: "application/json",
  })
    .then((res) => res.json())
    .then(async (data) => {
      await Translate(data[0].quote, $quote);
      $quoteAuthor.textContent = data[0].author;
    })
    .catch((err) => console.log(err));

  // Jokes
  setTimeout(() => {}, 500);
  fetch(
    "https://v2.jokeapi.dev/joke/Any?lang=es&blacklistFlags=religious,political&type=single"
  )
    .then((res) => res.json())
    .then((data) => {
      $joke.textContent = data.joke;
    })
    .catch((err) => console.log(err));

    fetch("https://labs.bible.org/api/?passage=random&type=json")
      .then((response) => response.json())
      .then((result) => {
        const [res] = result;
        let text = `${res.text}<br><i class="opacity-30">${res.bookname} ${res.chapter}:${res.verse}</i>`;
        $verse.innerHTML = text
      });

    fetch("https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=f36db7a3d8754aaeb725820a58b1549d")
      .then((response) => response.json())
      .then((result) => {
        const {articles} = result;
        let [article] = articles;
        let {author,title,description,url } = article

        $news.querySelector("#title").textContent = title
        $news.querySelector("#description").textContent = description
        $news.querySelector("#author").textContent = author
      });
}

