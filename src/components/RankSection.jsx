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
  rankTable: { width: "100%", borderCollapse: "collapse", fontSize: 14 },
};

export default function RankSection({ title, type, orders }) {
  const rank = (type) => {
    const map = {};
    if (!orders) return [];
    orders.forEach((o) =>
      o.items
        .filter((i) => i.type === type)
        .forEach((i) => {
          map[i.name] = (map[i.name] || 0) + (i.qty || 1);
        }),
    );
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  };
  const rows = rank(type);
  const max = rows[0]?.[1] || 1;
  return (
    <div style={css.card}>
      <div style={css.cardTitle}>{title}</div>
      {rows.length === 0 ? (
        <div style={css.empty}>まだデータがありません</div>
      ) : (
        <table style={css.rankTable}>
          <thead>
            <tr>
              <th
                style={{
                  fontSize: 12,
                  color: "#888780",
                  fontWeight: 500,
                  textAlign: "left",
                  paddingBottom: 8,
                }}
              >
                名前
              </th>
              <th></th>
              <th
                style={{
                  fontSize: 12,
                  color: "#888780",
                  fontWeight: 500,
                  textAlign: "right",
                  paddingBottom: 8,
                }}
              >
                個数
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, cnt]) => (
              <tr key={name}>
                <td
                  style={{
                    padding: "6px 0",
                    borderTop: "1px solid #f0ede6",
                    whiteSpace: "nowrap",
                  }}
                >
                  {name}
                </td>
                <td
                  style={{
                    padding: "6px 8px",
                    borderTop: "1px solid #f0ede6",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      background: "#f0ede6",
                      borderRadius: 999,
                      height: 6,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.round((cnt / max) * 100)}%`,
                        height: "100%",
                        background: "#1a1a18",
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </td>
                <td
                  style={{
                    padding: "6px 0",
                    borderTop: "1px solid #f0ede6",
                    textAlign: "right",
                    fontWeight: 600,
                  }}
                >
                  {cnt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
