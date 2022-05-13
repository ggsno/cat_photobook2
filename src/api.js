export const API_END_POINT =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async url => {
  try {
    const response = await fetch(url);
    if (response.ok) return response.json();
    throw new Error("error : bad request");
  } catch (e) {
    alert(e.message);
  }
};

export const fetchNodes = id => request(`${API_END_POINT}/${id ? id : ""}`);
