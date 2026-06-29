type DateStyle = "short" | "medium" | "long";

export function formatDate(
  date: Date | string | number,
  style: DateStyle = "medium",
) {
  const value = new Date(date);

  const options: Record<DateStyle, Intl.DateTimeFormatOptions> = {
    short: {
      year: "2-digit",
      month: "numeric",
      day: "numeric",
    },

    medium: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },

    long: {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  };

  return new Intl.DateTimeFormat("en-CA", options[style]).format(value);
}

export function formatTime(
  date: Date | string | number,
  includeSeconds = false,
) {
  const value = new Date(date);

  return new Intl.DateTimeFormat("en-CA", {
    hour: "2-digit",
    minute: "2-digit",
    second: includeSeconds ? "2-digit" : undefined,
  }).format(value);
}

export function formatDateTime(
  date: Date | string | number,
  params?: { style?: DateStyle; includeSeconds?: boolean },
) {
  return `${formatDate(date, params?.style)} ${formatTime(date, params?.includeSeconds)}`;
}
