import React from "react";
import { useState } from "react";
import axios from "axios";
import { CONFIG_KEY } from "../config/Key";
import Train from "./Train";
import Button from "@material-ui/core/Button";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";

function Home() {
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
        if (result !== null) {
          setresult([]);
          setresult(res.data.realtimePositionList);
        } else {
          setresult(res.data.realtimePositionList);
        }
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
        <FormControl>
          <InputLabel id="demo-simple-select-label">호선</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={line}
            onChange={lineChange}
          >
            <MenuItem value={1}>1호선</MenuItem>
            <MenuItem value={2}>2호선</MenuItem>
            <MenuItem value={3}>3호선</MenuItem>
            <MenuItem value={4}>4호선</MenuItem>
            <MenuItem value={5}>5호선</MenuItem>
            <MenuItem value={6}>6호선</MenuItem>
            <MenuItem value={7}>7호선</MenuItem>
            <MenuItem value={8}>8호선</MenuItem>
            <MenuItem value={9}>9호선</MenuItem>
          </Select>
        </FormControl>
        {/* <input type="number" name="line" onChange={lineChange} /> */}

        <Button onClick={buttonClickListener}>Test Button</Button>
      </div>
      {/* {result.map((train) => {
          {
            console.log(train);
            return <h1>{train.statnNm}</h1>;
          }
        })} */}

      {result.map((trainData) => (
        // statnNm, trainNo, trainStatus, statnTnm, updnLine, directAt
        <Train
          key={trainData.trainNo + new Date().getTime()}
          statnNm={trainData.statnNm}
          trainNo={trainData.trainNo}
          trainSttus={trainData.trainSttus}
          statnTnm={trainData.statnTnm}
          updnLine={trainData.updnLine}
          directAt={trainData.directAt}
        />
      ))}
    </div>
  );
}

export default Home;
