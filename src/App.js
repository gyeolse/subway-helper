import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { CONFIG_KEY } from "./config/key";

function App() {
  const [result, setresult] = useState([]);
  const [line, setline] = useState(0);

  const url =
    "http://swopenapi.seoul.go.kr/api/subway/" +
    CONFIG_KEY +
    "/json/realtimePosition/0/50/" +
    line +
    "호선";

  async function buttonClickListener() {
    axios
      .get(url)
      .then(function (res) {
        // console.log(res.data.realtimePositionList);
        setresult(res.data.realtimePositionList);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  const lineChange = (e) => {
    if (e.target.value >= 10) {
      alert("맞는 호선을 입력해주십시오");
    } else {
      setline(e.target.value);
    }
    // console.log("target value test : " + line + "호선");
  };

  return (
    <div className="App">
      <div>
        <h1>호선 입력 후, 결과 확인</h1>
        <input type="number" name="line" onChange={lineChange} />

        <button onClick={buttonClickListener}>Test Button</button>
      </div>
      {result.map((train) => {
        {
          console.log(train);
          return <h1>{train.statnNm}</h1>;
        }
      })}
    </div>
  );
}

export default App;
