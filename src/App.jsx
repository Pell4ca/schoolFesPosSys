import { useState, } from "react";
import { loadState } from "./store/storage.js";
import Header from "./components/Header.jsx";
import POSPage from "./Tabs/PosTab.jsx";
import MenuTab from "./Tabs/MenuTab.jsx";
import StatsTab from "./Tabs/StatsTab.jsx";
import CustomerTab from "./Tabs/CustomerTab.jsx";



const css = {
  app: {
    fontFamily: "'Noto Sans JP', sans-serif",
    padding: "1rem",
    minHeight: "100vh",
    background: "#fafaf8",
    color: "#1a1a18",
  }
}


const TABS = [
  { id: "pos", label: "レジ" },
  { id: "menu", label: "メニュー管理" },
  { id: "stats", label: "集計" },
  { id: "customers", label: "来客" },
];

export default function App() {
  const [tab, setTab] = useState("pos");
  const [state, setState] = useState(loadState);

  return (
    <div style={css.app}>
    <Header tab={tab} setTab={setTab} TABS={TABS}/>
      {tab === "pos" && <POSPage state={state} setState={setState} />}
      {tab === "menu" && <MenuTab state={state} setState={setState}  />}
      {tab === "stats" && <StatsTab state={state} />}
      {tab === "customers" && <CustomerTab state={state} setState={setState} />}
    </div>
  );
}
