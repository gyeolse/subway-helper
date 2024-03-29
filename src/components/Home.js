import React from "react";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { CONFIG_KEY } from "../config/Key";
import Train from "./Train";
import Button from "@material-ui/core/Button";
import { useInView } from "react-intersection-observer";
import useCurrentLocation from "../hooks/useCurrentPosition";
import Location from "./Location";

import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TableContainer,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from "@material-ui/core";

const Home = () => {
  //호선 번호
  let lineNumber = [
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" },
    { id: 4, value: "4" },
    { id: 5, value: "5" },
    { id: 6, value: "6" },
    { id: 7, value: "7" },
    { id: 8, value: "8" },
    { id: 9, value: "9" },
  ];

  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
    maximumAge: 1000 * 3600 * 24, // 24 hour
  };

  const { location: currentLocation, error: currentError } =
    useCurrentLocation(geolocationOptions);
  const [result, setresult] = useState([]);
  const [line, setline] = useState(0);
  const [isLineChecked, setisLineChecked] = useState(false);
  const [startNum, setstartNum] = useState(0);
  const [endNum, setendNum] = useState(10);

  const _infiniteScroll = () => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );

    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      setstartNum(startNum + 10);
      setendNum(endNum + 10);
    }
  };

  const checkTrainStatus = (trainStatus) => {
    // console.log(trainStatus);

    if (trainStatus == "0" || trainStatus == 0) {
      return "진입";
    } else if (trainStatus == "1" || trainStatus == 1) {
      return "도착";
    } else {
      return "출발";
    }
  };

  const url =
    "http://swopenapi.seoul.go.kr/api/subway/" +
    CONFIG_KEY +
    "/json/realtimePosition/0/50/" +
    line +
    "호선";

  async function buttonClickListener() {
    //1. 호선 체크 확인
    if (line == 0) {
      alert("호선을 입력해주세요");
      return;
    }

    //2. 데이터가 담겨있는지 확인
    if (result != null) {
      setresult([]);
    }

    await axios
      .get(url)
      .then(function (res) {
        setresult(res.data.realtimePositionList);
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
    setisLineChecked(true);
  }

  //호선 value 확인
  const lineChange = (e) => {
    if (e.target.value >= 10) {
      alert("맞는 호선을 입력해주십시오");
    } else {
      setline(e.target.value);
    }
  };

  return (
    <div className="App">
      <div>
        <h1>SUBWAY - TEST PAGE</h1>
        <Location location={currentLocation} error={currentError} />
        <FormControl>
          <InputLabel id="demo-simple-select-label">호선</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={line}
            onChange={lineChange}
          >
            {lineNumber.map((hosun) => {
              return (
                <MenuItem key={hosun.id} value={hosun.value}>
                  {hosun.value}호선
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/* <input type="number" name="line" onChange={lineChange} /> */}

        <Button onClick={buttonClickListener}>열차 검색</Button>
      </div>
      {/* {result.map((train) => {
          {
            console.log(train);
            return <h1>{train.statnNm}</h1>;
          }
        })} */}

      {isLineChecked == true ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>현재 위치</TableCell>
                <TableCell>열차 번호</TableCell>
                <TableCell>진입 상태</TableCell>
                <TableCell>종점</TableCell>
                <TableCell>상/하행</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map((trainData) => (
                // statnNm, trainNo, trainStatus, statnTnm, updnLine, directAt
                <Train
                  key={trainData.rowNum}
                  statnNm={trainData.statnNm}
                  trainNo={trainData.trainNo}
                  trainSttus={checkTrainStatus(trainData.trainSttus)}
                  statnTnm={trainData.statnTnm}
                  updnLine={trainData.updnLine}
                  directAt={trainData.directAt}
                  subwayNm={trainData.subwayNm}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
