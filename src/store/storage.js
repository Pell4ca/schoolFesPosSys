const STORAGE_KEY = "crepe_v1";

export const defaultState = {
  bases: [
    { id: 1, name: "プレーン", price: 400 },
    { id: 2, name: "チョコ",   price: 450 },
  ],
  toppings: [
    { id: 3, name: "いちご",       price: 100 },
    { id: 4, name: "バナナ",       price: 100 },
    { id: 5, name: "生クリーム",   price: 80  },
    { id: 6, name: "チョコソース", price: 80  },
  ],
  drinks: [
    { id: 7, name: "コーラ",           price: 200 },
    { id: 8, name: "オレンジジュース", price: 200 },
    { id: 9, name: "お水",             price: 100 },
  ],
  orders: [],
  nextMenuId: 10,
  nextOrderId:1,
};

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultState;
  } catch {
    return defaultState;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("保存に失敗しました", e);
  }
}