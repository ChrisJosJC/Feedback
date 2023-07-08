import translate from 'bing-translate-api';

export function setupTranslater(text="Hola mundo") {
  translate(text, null, 'en').then(res => {
    console.log(res.translation);
    return res.translation
  }).catch(err => {
    console.error(err);
  });
}
