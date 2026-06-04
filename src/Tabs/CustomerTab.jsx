import { saveState, defaultState } from "../store/storage.js";

const css = {
  metricGrid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: "1rem",
  },
  metric: {
    background: "#f0ede6",
    borderRadius: 10,
    padding: "0.75rem 1rem",
  },
  metricLabel: { fontSize: 12, color: "#888780", marginBottom: 4 },
  metricValue: { fontSize: 22, fontWeight: 600 },
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
  empty: {
    textAlign: "center",
    color: "#888780",
    fontSize: 14,
    padding: "1.5rem 0",
  },
  custRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #f0ede6",
    fontSize: 14,
  },
  badge: {
    fontSize: 11,
    background: "#f0ede6",
    border: "1px solid #e8e6df",
    borderRadius: 999,
    padding: "3px 10px",
    color: "#888780",
  },
  dangerBtn: {
    padding: "8px 16px",
    fontSize: 13,
    border: "1px solid #e24b4a",
    borderRadius: 8,
    background: "#fff",
    color: "#e24b4a",
    cursor: "pointer",
    fontWeight: 500,
  },
};

export default function CustomerTab({ state, setState }) {
  const TODAY_KEY = new Date().toDateString();
  const total = state.orders.reduce((sum, o) => sum + (o.headCount || 1), 0);
  const today = state.orders
    .filter((o) => o.dateKey === TODAY_KEY)
    .reduce((sum, o) => sum + (o.headCount || 1), 0);
  const rev = [...state.orders].reverse();

  const resetAll = () => {
    if (
      !window.confirm("全データをリセットしますか？この操作は取り消せません。")
    )
      return;
    setState(defaultState);
    saveState(defaultState);
  };

  return (
    <div>
      <div style={css.metricGrid2}>
        <div style={css.metric}>
          <div style={css.metricLabel}>総来客数（累計）</div>
          <div style={css.metricValue}>{total}</div>
        </div>
        <div style={css.metric}>
          <div style={css.metricLabel}>本日の来客数</div>
          <div style={css.metricValue}>{today}</div>
        </div>
      </div>
      <div style={css.card}>
        <div style={css.cardTitle}>来客履歴</div>
        {rev.length === 0 ? (
          <div style={css.empty}>まだ来客がありません</div>
        ) : (
          rev.map((o) => {
            const d = new Date(o.time);
            const time = d.toLocaleTimeString("ja-JP", {
              hour: "2-digit",
              minute: "2-digit",
            });
            const date = d.toLocaleDateString("ja-JP", {
              month: "short",
              day: "numeric",
            });
            const tops = o.items
              .filter((x) => x.type === "topping")
              .map((x) => x.name)
              .join("・");
            return (
              <div key={o.id} style={css.custRow}>
                <div>
                  <span style={{ fontSize: 12, color: "#888780" }}>
                    #{o.id}{" "}
                  </span>
                  <span style={{ fontWeight: 600 }}>
                    ¥{o.total.toLocaleString()}
                  </span>
                  <span
                    style={{ fontSize: 12, color: "#888780", marginLeft: 6 }}
                  >
                    {o.headCount || 1}人
                  </span>
                  {tops && (
                    <div
                      style={{ fontSize: 12, color: "#888780", marginTop: 2 }}
                    >
                      {tops}
                    </div>
                  )}
                </div>
                <span style={css.badge}>
                  {date} {time}
                </span>
              </div>
            );
          })
        )}
      </div>
      <div style={{ textAlign: "right", marginTop: 8 }}>
        <button style={css.dangerBtn} onClick={resetAll}>
          データをリセット
        </button>
      </div>
    </div>
  );
}
