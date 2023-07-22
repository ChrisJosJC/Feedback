export async function Translate(text = "Hello world!", assignment = null) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDU4YTk2NWUtNjQ4NC00MTAxLTlhOTktOGE3NTBiNjNlMmFjIiwidHlwZSI6ImFwaV90b2tlbiJ9._uD46odZY4yJRi0cUAjthQbZwMIQawdi-87m6YBMSrw'
    },
    body: JSON.stringify({
      providers: 'phedone',
      response_as_dict: true,
      target_language: 'es',
      source_language: 'en',
      text: text
    })
  };
  
  fetch('https://api.edenai.run/v2/translation/automatic_translation', options)
    .then(response => response.json())
    .then(response => {
      let result = response?.phedone?.text;
      if(assignment != null) {
        assignment.textContent = result
      }
      return result})
    .catch(err => console.error(err));

    
}
