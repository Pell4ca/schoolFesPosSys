import { useState } from "react";
import { saveState } from "../store/storage.js";
import Section from "../components/PosSection.jsx";

const TODAY_KEY = new Date().toDateString();

const css = {
  card: {
    background: "#fff",
    border: "1px solid #e8e6df",
    borderRadius: 12,
    padding: "1rem 1.25rem",
    marginBottom: "1rem",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: "0.75rem",
    color: "#1a1a18",
  },
  orderLine: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: "1px solid #f0ede6",
    fontSize: 14,
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0 0",
    fontSize: 16,
    fontWeight: 600,
  },
  primaryBtn: (disabled) => ({
    width: "100%",
    marginTop: 12,
    padding: "12px 0",
    fontSize: 15,
    fontWeight: 600,
    border: "none",
    borderRadius: 10,
    background: disabled ? "#d0cfc8" : "#1a1a18",
    color: "#fff",
    cursor: disabled ? "not-allowed" : "pointer",
    letterSpacing: "-0.01em",
  }),
  empty: {
    textAlign: "center",
    color: "#888780",
    fontSize: 14,
    padding: "1.5rem 0",
  },
  headCountInput: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  inputStyle: {
    width: 60,
    padding: "6px 8px",
    fontSize: 14,
    border: "1px solid #e8e6df",
    borderRadius: 8,
  },
};

export default function POSPage(props) {
  const { state, setState } = props;

  const [sel, setSel] = useState({
    bases: {},
    toppings: {},
    drinks: {},
    headCount: "1",
  });

  //数量変更・削除処理
  const handleCount = (type, id, delta) => {
    setSel((sel) => {
      const currentMenu = sel[type][id] || 0;
      const next = currentMenu + delta;
      if (next <= 0) {
        // 0以下になったら削除（選択解除）
        const updated = { ...sel[type] };
        delete updated[id];
        return { ...sel, [type]: updated };
      }
      return { ...sel, [type]: { ...sel[type], [id]: next } };
    });
  };
  //計算ロジック
  const lines = [];
  let total = 0;
  Object.entries(sel.bases).forEach(([id, qty]) => {
    const b = state.bases.find((x) => x.id === Number(id));
    if (b) {
      lines.push({ name: b.name, price: b.price, qty });
      total += b.price * qty;
    }
  });
  Object.entries(sel.toppings).forEach(([id, qty]) => {
    const t = state.toppings.find((x) => x.id === Number(id));
    if (t) {
      lines.push({ name: t.name, price: t.price, qty });
      total += t.price * qty;
    }
  });
  Object.entries(sel.drinks).forEach(([id, qty]) => {
    const d = state.drinks.find((x) => x.id === Number(id));
    if (d) {
      lines.push({ name: d.name, price: d.price, qty });
      total += d.price * qty;
    }
  });
  //会計確定処理
  const checkout = () => {
    const items = [];
    Object.entries(sel.bases).forEach(([id, qty]) => {
      const b = state.bases.find((x) => x.id === Number(id));
      if (b)
        items.push({
          type: "base",
          id: b.id,
          name: b.name,
          price: b.price,
          qty,
        });
    });
    Object.entries(sel.toppings).forEach(([id, qty]) => {
      const t = state.toppings.find((x) => x.id === Number(id));
      if (t)
        items.push({
          type: "topping",
          id: t.id,
          name: t.name,
          price: t.price,
          qty,
        });
    });
    Object.entries(sel.drinks).forEach(([id, qty]) => {
      const d = state.drinks.find((x) => x.id === Number(id));
      if (d)
        items.push({
          type: "drink",
          id: d.id,
          name: d.name,
          price: d.price,
          qty,
        });
    });
    const newOrder = {
      id: state.nextOrderId,
      total,
      items,
      headCount: Math.max(1, parseInt(sel.headCount) || 1),
      time: new Date().toISOString(),
      dateKey: TODAY_KEY,
    };
    const next = {
      ...state,
      orders: [...state.orders, newOrder],
      nextOrderId: state.nextOrderId + 1,
    };
    setState(next);
    saveState(next);
    setSel({ bases: {}, toppings: {}, drinks: {}, headCount: "1" });
    alert(`¥${total.toLocaleString()} の会計が完了しました！`);
  };

  return (
    <div>
      <Section
        title="🫓 クレープベース"
        items={state.bases}
        type="base"
        sel={sel}
        onToggle={handleCount}
      />
      <Section
        title="🍓 トッピング"
        items={state.toppings}
        type="topping"
        sel={sel}
        onToggle={handleCount}
      />
      {/* <Section
        title="🥤 ドリンク"
        items={state.drinks}
        type="drink"
        sel={sel}
        onToggle={handleCount}
      /> */}
      <div style={css.card}>
        <div style={css.cardTitle}>🧾 会計</div>

        <div style={css.headCountInput}>
          <span style={{ fontSize: 14 }}>人数</span>
          <input
            type="number"
            min={1}
            value={sel.headCount}
            onChange={(e) =>
              setSel((s) => ({ ...s, headCount: e.target.value }))
            }
            onBlur={(e) => {
              const val = parseInt(e.target.value, 10);
              if (isNaN(val) || val < 1) {
                setSel((s) => ({ ...s, headCount: "1" }));
              }
            }}
            style={css.inputStyle}
          />
          <span style={{ fontSize: 14 }}>人</span>
        </div>

        {lines.length === 0 ? (
          <div style={css.empty}>まだ何も選ばれていません</div>
        ) : (
          lines.map((l, i) => (
            <div key={i} style={css.orderLine}>
              <span>
                {l.name} × {l.qty}
              </span>
              <span>¥{(l.price * l.qty).toLocaleString()}</span>
            </div>
          ))
        )}
        <div style={css.totalRow}>
          <span>合計</span>
          <span>¥{total.toLocaleString()}</span>
        </div>
        <button
          style={css.primaryBtn(Object.keys(sel.bases).length === 0 && Object.keys(sel.toppings).length === 0)}
          disabled={Object.keys(sel.bases).length === 0 && Object.keys(sel.toppings).length === 0}
          onClick={checkout}
        >
          会計する
        </button>
      </div>
    </div>
  );
}
