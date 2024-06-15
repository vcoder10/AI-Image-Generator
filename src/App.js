import { useRef, useState } from "react";
import "./App.css";
import default_Image from "./assests/default_image.svg";

function App() {
  const [searchText, setSearchText] = useState("");
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);

  const generateImage = async () => {
    console.log(searchText);
    if (inputRef.current.value === "") return 0;
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer your api key",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: inputRef.current.value,
          n: 1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    console.log(data);
    setImage_url(data.data[0].url);
  };
  return (
    <div className="App">
      <h1>Ai Image Generator</h1>
      <div>
        <img
          src={image_url === "/" ? default_Image : image_url}
          alt="default-logo"
        />
      </div>
      <div>
        <input
          ref={inputRef}
          placeholder="What do you want to see?"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={generateImage}>Generate</button>
      </div>
    </div>
  );
}

export default App;
