const css = {
  header: {
    borderBottom: "1px solid #e8e6df",
    marginBottom: "1.25rem",
    paddingBottom: "0.75rem",
    display: "flex",
    alignItems: "baseline",
    gap: 12,
  },
  title: { fontSize: 20, fontWeight: 600, margin: 0, letterSpacing: "-0.02em" },
  subtitle: { fontSize: 13, color: "#888780" },
  tabs: {
    display: "flex",
    gap: 4,
    marginBottom: "1.25rem",
    background: "#f0ede6",
    borderRadius: 10,
    padding: 4,
  },
  tab: (active) => ({
    flex: 1,
    padding: "8px 0",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    borderRadius: 7,
    background: active ? "#fff" : "transparent",
    color: active ? "#1a1a18" : "#888780",
    boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
    transition: "all 0.15s",
  }),
};

export default function Header(props) {
  const { tab, setTab, TABS } = props;
  return (
    <>
      <div style={css.header}>
        <h1 style={css.title}>🥐 クレープ販売管理</h1>
        <span style={css.subtitle}>学祭レジシステム</span>
      </div>
      <div style={css.tabs}>
        {TABS.map((t) => (
          <button
            key={t.id}
            style={css.tab(tab === t.id)}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </>
  );
}
