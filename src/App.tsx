import { useState } from "react";
import "./App.css";
import * as cheerio from "cheerio";

function App() {
  const [articleText, setArticleText] = useState("");

  const handleClick = async () => {
    await fetch(
      "https://www3.nhk.or.jp/news/easy/k10014223691000/k10014223691000.html"
    )
      .then((val) => {
        return val.text();
      })
      .then((data) => {
        const $ = cheerio.load(data);

        console.log($.html());

        $("h1").each((i, el) => {
          const text = $(el).text();
          console.log("🚀 ~ file: App.tsx:22 ~ $ ~ text:", text);
        });
      });
  };

  return (
    <>
      <h1>
        Please insert a valid link to an NHK Easy article to see the text:
      </h1>
      <input type="text" style={{ minWidth: "35rem" }}></input>
      <button type="button" onClick={handleClick}>
        Get article text
      </button>
      <br />
      <p style={{ maxWidth: "30rem" }}>{articleText}</p>
    </>
  );
}

export default App;
