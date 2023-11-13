import { ChangeEvent, useState } from 'react';
import './App.css';
import * as cheerio from 'cheerio';

function App() {
  const [articleText, setArticleText] = useState('');
  const [articleUrl, setArticleUrl] = useState('');

  const handleClick = async () => {
    await fetch(articleUrl)
      .then((val) => {
        return val.text();
      })
      .then((data) => {
        const $ = cheerio.load(data);

        console.log($.html());

        $('h1').each((i, el) => {
          const text = $(el).text();
          setArticleText(text);
          console.log('🚀 ~ file: App.tsx:22 ~ $ ~ text:', text);
        });
      });
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArticleUrl(e.target.value);
  };

  return (
    <>
      <h1>
        Please insert a valid link to an NHK Easy article to see the text:
      </h1>
      <h2>
        https://www3.nhk.or.jp/news/easy/k10014252431000/k10014252431000.html
      </h2>
      <input
        value={articleUrl}
        onChange={handleUrlChange}
        type="text"
        style={{ minWidth: '35rem' }}
      />
      <button type="button" onClick={handleClick}>
        Get article text
      </button>
      <br />
      <p style={{ maxWidth: '30rem' }}>{articleText}</p>
    </>
  );
}

export default App;
