export const toLocalDate = (value) => {
  if (!value) return "";
  const date = new Date(value).toLocaleDateString("en-Np", {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  return date;
};

export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const formatForDateTimeInput = (iso) => {
  if (!iso) return "";
  const d = new Date(iso)

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");

  return `${y}-${m}-${day}T${h}:${min}`;
};
