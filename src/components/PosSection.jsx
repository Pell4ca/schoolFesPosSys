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
  empty: {
    textAlign: "center",
    color: "#888780",
    fontSize: 14,
    padding: "1.5rem 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: 8,
  },
  itemName: { fontSize: 13, fontWeight: 500 },
  itemPrice: { fontSize: 11, color: "#888780", marginTop: 2 },
  counter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 6,
  },
  countBtn: {
    width: 24,
    height: 24,
    border: "1px solid #e8e6df",
    borderRadius: 6,
    background: "#f0ede6",
    cursor: "pointer",
    fontSize: 14,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  countNum: {
    fontSize: 14,
    fontWeight: 600,
    minWidth: 16,
    textAlign: "center",
  },
};

export default function Section({ title, items, type, sel, onToggle }) {
  return (
    <div style={css.card}>
      <div style={css.cardTitle}>{title}</div>
      {items.length === 0 ? (
        <div style={css.empty}>メニューがありません</div>
      ) : (
        <div style={css.grid}>
          {items.map((item) => {
            const qty = (sel[type + "s"] || {})[item.id] || 0;
            return (
              <div key={item.id} style={css.itemWrap}>
                <div style={css.itemName}>{item.name}</div>
                <div style={css.itemPrice}>¥{item.price}</div>
                <div style={css.counter}>
                  <button
                    style={css.countBtn}
                    onClick={() => onToggle(type + "s", item.id, -1)}
                  >
                    －
                  </button>
                  <span style={css.countNum}>{qty}</span>
                  <button
                    style={css.countBtn}
                    onClick={() => onToggle(type + "s", item.id, +1)}
                  >
                    ＋
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
