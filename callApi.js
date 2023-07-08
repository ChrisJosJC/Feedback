export default async function ($fact, $currency, $joke, $quote, $word, $mean) {
  // Fact text
  fetch("https://api.api-ninjas.com/v1/facts?limit=1", {
    method: "GET",
    headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
    contentType: "application/json",
  })
    .then((res) => res.json())
    .then((data) => {
      $fact.textContent = data[0].fact;
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
    .then((data) => {
      $word.textContent = data.word;
      return data.word;
    })
    .then(word => {
        fetch("https://api.api-ninjas.com/v1/dictionary?word=" + word, {
            method: "GET",
            headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
            contentType: "application/json",
          })
            .then((res) => res.json())
            .then((data) => {
              $mean.textContent = data.definition?.split(". 2. ")[0];
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
    .then((data) => {
      $quote.innerHTML = `${data[0].quote}  
        
        <i>${data[0].author}</i>`;
    })
    .catch((err) => console.log(err));

  // Jokes
  fetch("https://api.api-ninjas.com/v1/jokes", {
    method: "GET",
    headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
    contentType: "application/json",
  })
    .then((res) => res.json())
    .then((data) => {
      $joke.textContent = data[0].joke;
    })
    .catch((err) => console.log(err));
}
