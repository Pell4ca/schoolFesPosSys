import { useState } from "react";
import { saveState } from "../store/storage.js";
import MenuSection from "../components/MenuSection.jsx";

const css = {
  alert: {
    background: "#f0ede6",
    borderLeft: "3px solid #888780",
    borderRadius: "0 8px 8px 0",
    padding: "10px 14px",
    fontSize: 13,
    color: "#888780",
    marginBottom: 12,
  },
};

export default function MenuTab(props) {
  const { state, setState } = props;
  const [inputs, setInputs] = useState({
    baseName: "",
    basePrice: "",
    toppingName: "",
    toppingPrice: "",
    drinkName: "",
    drinkPrice: "",
  });

  const set = (key, val) => setInputs((s) => ({ ...s, [key]: val }));

  const addItem = (type, nameKey, priceKey) => {
    const name = inputs[nameKey].trim();
    const price = parseInt(inputs[priceKey]);
    if (!name || isNaN(price) || price < 0) return;
    const next = {
      ...state,
      [type]: [...state[type], { id: state.nextMenuId, name, price }],
      nextMenuId: state.nextMenuId + 1,
    };
    setState(next);
    saveState(next);
    setInputs((s) => ({ ...s, [nameKey]: "", [priceKey]: "" }));
  };

  const removeItem = (type, id) => {
    const next = { ...state, [type]: state[type].filter((x) => x.id !== id) };
    setState(next);
    saveState(next);
  };

  return (
    <div>
      <div style={css.alert}>変更はリアルタイムで反映されます。</div>
      <MenuSection
        title="🫓 クレープベース"
        type="bases"
        nameKey="baseName"
        priceKey="basePrice"
        placeholder="例：プレーン"
        inputs={inputs}
        set={set}
        addItem={addItem}
        removeItem={removeItem}
        state={state}
      />
      <MenuSection
        title="🍓 トッピング"
        type="toppings"
        nameKey="toppingName"
        priceKey="toppingPrice"
        placeholder="例：いちご"
        inputs={inputs}
        set={set}
        addItem={addItem}
        removeItem={removeItem}
        state={state}
      />
      {/* <MenuSection
        title="🥤 ドリンク"
        type="drinks"
        nameKey="drinkName"
        priceKey="drinkPrice"
        placeholder="例：コーラ"
        inputs={inputs}
        set={set}
        addItem={addItem}
        removeItem={removeItem}
        state={state}
      /> */}
    </div>
  );
}
