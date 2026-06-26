export function clearEmptyStrings<T>(
  value: T,
  toSet: "null" | "undefined" = "undefined",
): T {
  if (Array.isArray(value)) {
    return value.map((v) => clearEmptyStrings(v, toSet)) as T;
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [
        key,
        clearEmptyStrings(
          String(val).trim() === ""
            ? toSet === "undefined"
              ? undefined
              : null
            : val,
        ),
      ]),
    ) as T;
  }

  return value;
}
