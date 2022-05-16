import { useEffect } from "react";
import "../src/styles/App.scss";
import { io } from "socket.io-client";
import { PriceTicker } from "./types/types";
import { useAppDispatch } from "./hooks/useRedux";
import { fetchData } from "./redux/reducers/PriceTickerSlice";
import { useRoutes } from "./routes/routes";

const App = () => {
  const dispatch = useAppDispatch();

  const socket = io("http://localhost:4000/");
  socket.emit("start");

  useEffect(() => {
    socket.on("ticker", (quotes: PriceTicker[]) => {
      if (quotes) {
        dispatch(fetchData(quotes));
      }
    });
  }, []);

  const routes = useRoutes();
  return <div className="App">{routes}</div>;
};

export default App;
