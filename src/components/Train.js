import { Paper, TableContainer } from "@material-ui/core";
import { Table, TableRow, TableCell } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

function Train({ statnNm, trainNo, trainSttus, statnTnm, updnLine, directAt }) {
  const Test = () => {
    console.log(trainSttus);
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Link
          to={{
            pathname: `/report/${trainNo}`,
            state: {
              statnNm,
              trainNo,
              trainSttus,
              statnTnm,
              updnLine,
              directAt,
            },
          }}
        >
          {statnNm}
        </Link>
      </TableCell>
      <TableCell>{trainNo}</TableCell>
      <TableCell align="middle">{trainSttus}</TableCell>
      <TableCell align="middle">{statnTnm}</TableCell>
      <TableCell align="middle">
        {updnLine === 0 ? "상행 " : "하행 "} {directAt === 1 ? "급행 " : " "}{" "}
      </TableCell>
    </TableRow>
  );
}

const style = {
  container: {
    marginRight: 8,
  },
};

export default Train;
