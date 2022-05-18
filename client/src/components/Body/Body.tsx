import { TableCell, TableRow } from "@mui/material";
import moment from "moment";
import React, { FC } from "react";
import { PriceTicker } from "../../types/types";
import Image from "../Image/Image";
import arrowDown from "../../assets/arrow_down.svg";
import arrowUp from "../../assets/arrow_up.svg";

interface BodyProps {
  ticker: PriceTicker;
}

const Body: FC<BodyProps> = ({ ticker }) => (
  <TableRow className="table-cell">
    <TableCell component="th" scope="row" className="table-cell">
      {ticker.ticker}
    </TableCell>
    <TableCell component="th" scope="row" className="table-cell">
      {ticker.exchange}
    </TableCell>
    <TableCell
      component="th"
      scope="row"
      className="table-cell"
      padding="checkbox"
      sx={{ minWidth: 100 }}
    >
      {"$ " + ticker.price}
    </TableCell>
    <TableCell
      component="th"
      scope="row"
      className={
        ticker.changeArrow === 0
          ? "table-cell"
          : ticker.changeArrow === 1
          ? "table-cell green"
          : "table-cell red"
      }
      sx={{ minWidth: 100 }}
    >
      {"$" + ticker.change}
      {ticker.changeArrow === 0 ? (
        ""
      ) : ticker.changeArrow === 1 ? (
        <Image image={arrowUp} />
      ) : (
        <Image image={arrowDown} />
      )}
    </TableCell>
    <TableCell
      component="th"
      scope="row"
      className={
        ticker.changePercentArrow === 0
          ? "table-cell"
          : ticker.changePercentArrow === 1
          ? "table-cell green"
          : "table-cell red"
      }
      sx={{ minWidth: 100, width: 100 }}
    >
      {(ticker.change_percent * 100).toFixed(0) + "%"}
      {ticker.changePercentArrow === 0 ? (
        ""
      ) : ticker.changePercentArrow === 1 ? (
        <Image image={arrowUp} />
      ) : (
        <Image image={arrowDown} />
      )}
    </TableCell>
    <TableCell component="th" scope="row" className="table-cell">
      {ticker.dividend}
    </TableCell>
    <TableCell component="th" scope="row" className="table-cell">
      {ticker.yield}
    </TableCell>
    <TableCell component="th" scope="row" className="table-cell">
      {moment(ticker.last_trade_time).format("hh:mm:ss")}
    </TableCell>
  </TableRow>
);

export default Body;
