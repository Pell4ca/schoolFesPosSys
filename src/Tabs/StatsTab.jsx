import RankSection from "../components/RankSection.jsx";

const css = {
  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
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
};

export default function StatsTab({ state }) {
  const total = state.orders.reduce((s, o) => s + o.total, 0);
  const count = state.orders.reduce((sum, o) => sum + (o.headCount || 1), 0);
  const avg = count ? Math.round(total / count) : 0;

  return (
    <div>
      <div style={css.metricGrid}>
        <div style={css.metric}>
          <div style={css.metricLabel}>総売上</div>
          <div style={css.metricValue}>¥{total.toLocaleString()}</div>
        </div>
        <div style={css.metric}>
          <div style={css.metricLabel}>会計数</div>
          <div style={css.metricValue}>{count}</div>
        </div>
        <div style={css.metric}>
          <div style={css.metricLabel}>客単価</div>
          <div style={css.metricValue}>¥{avg.toLocaleString()}</div>
        </div>
      </div>
      <RankSection
        title="🍓 トッピング 売上ランキング"
        type="topping"
        orders={state.orders}
      />
      <RankSection
        title="🥤 ドリンク 売上ランキング"
        type="drink"
        orders={state.orders}
      />
      <RankSection
        title="🫓 生地 売上ランキング"
        type="base"
        orders={state.orders}
      />
    </div>
  );
}
