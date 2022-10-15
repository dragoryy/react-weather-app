export function formatDate(
  datetime?: number,
  timezone?: number,
  type?: string,
  width?: string
): string | number {
  const d = new Date((datetime! + timezone! - 10800 + 1) * 1000);
  let dayNameSt;
  if (type === "hour") {
    dayNameSt = d.toLocaleTimeString("en-us", {
      hour: "numeric",
      hour12: false,
    });
    return dayNameSt;
  }
  if (type === "timehour") {
    return d.toLocaleTimeString("en-us", { hour: "2-digit" });
  }
  if (type === "airtimehour") {
    const newd = new Date((datetime! + timezone! - 10800) * 1000);
    return newd.toLocaleTimeString("en-us", { hour: "2-digit" });
  }
  if (type === "dayafter") {
    const newDayAfter = new Date(
      (datetime! + timezone! - 10800 + 86400) * 1000
    );
    if (width === "long") {
      return newDayAfter.toLocaleDateString("en-us", { weekday: "long" });
    }
    return newDayAfter.toLocaleDateString("en-us", { weekday: "short" });
  }
  if (type === "dayafterafter") {
    const newDayAfterAfter = new Date(
      (datetime! + timezone! - 10800 + 2 * 86400) * 1000
    );
    return newDayAfterAfter.toLocaleDateString("en-us", { weekday: "short" });
  }
  if (type === "day") {
    if (width === "short") {
      dayNameSt = d.toLocaleDateString("en-us", { weekday: "short" });
    } else {
      dayNameSt = d.toLocaleDateString("en-us", { weekday: "long" });
    }
    return dayNameSt;
  }
  return d.toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" });
}
