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
  inputRow: { display: "flex", gap: 8, marginBottom: 0 },
  input: {
    flex: 1,
    padding: "8px 10px",
    fontSize: 14,
    border: "1px solid #e8e6df",
    borderRadius: 8,
    background: "#fff",
    color: "#1a1a18",
    outline: "none",
  },
  inputSmall: {
    width: 90,
    padding: "8px 10px",
    fontSize: 14,
    border: "1px solid #e8e6df",
    borderRadius: 8,
    background: "#fff",
    color: "#1a1a18",
    outline: "none",
  },
  addBtn: {
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 600,
    border: "1px solid #1a1a18",
    borderRadius: 8,
    background: "#fff",
    color: "#1a1a18",
    cursor: "pointer",
  },
  tagList: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 },
  tag: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#f0ede6",
    border: "1px solid #e8e6df",
    borderRadius: 999,
    padding: "4px 12px",
    fontSize: 13,
  },
  tagDel: {
    cursor: "pointer",
    color: "#888780",
    fontSize: 16,
    lineHeight: 1,
    background: "none",
    border: "none",
    padding: 0,
  },
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

export default function MenuSection({
  title,
  type,
  nameKey,
  priceKey,
  placeholder,
  inputs,
  set,
  addItem,
  removeItem,
  state,
}) {
  return (
    <div style={css.card}>
      <div style={css.cardTitle}>{title}</div>
      <div style={css.inputRow}>
        <input
          style={css.input}
          placeholder={placeholder}
          value={inputs[nameKey]}
          onChange={(e) => set(nameKey, e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && addItem(type, nameKey, priceKey)
          }
        />
        <input
          style={css.inputSmall}
          type="number"
          placeholder="価格"
          min="0"
          value={inputs[priceKey]}
          onChange={(e) => set(priceKey, e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && addItem(type, nameKey, priceKey)
          }
        />
        <button
          style={css.addBtn}
          onClick={() => addItem(type, nameKey, priceKey)}
        >
          追加
        </button>
      </div>
      <div style={css.tagList}>
        {state[type].map((item) => (
          <span key={item.id} style={css.tag}>
            {item.name} ¥{item.price}
            <button
              style={css.tagDel}
              onClick={() => removeItem(type, item.id)}
              title="削除"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
