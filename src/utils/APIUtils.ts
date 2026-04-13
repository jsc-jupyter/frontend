export function buildHumanReadableQuery(
  payload: Record<string, unknown>,
): string {
  const params = new URLSearchParams();

  function addValue(key: string, value: unknown): void {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((v) => addValue(key, v));
    } else if (typeof value === "object") {
      Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
        addValue(`${key}.${k}`, v);
      });
    } else {
      params.append(key, String(value));
    }
  }

  Object.entries(payload).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length === 0) return;
    if (
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.keys(value as object).length === 0
    )
      return;
    addValue(key, value);
  });

  return params.toString();
}
