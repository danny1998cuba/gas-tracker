import type { Formatter } from "./formatter.types";
import { formatPhone, onlyDigits } from "./phone-number.helper";

export const textFormatter: Formatter<string> = {
  format(value) {
    return value ?? "";
  },

  parse(value) {
    return value;
  },

  keyboardType: "default",

  inputMode: "text",

  mode: "never",
};

export const phoneFormatter: Formatter<string> = {
  format(value) {
    return formatPhone(value);
  },

  parse(value) {
    return onlyDigits(value);
  },

  keyboardType: "phone-pad",

  inputMode: "tel",

  mode: "blur",
};

export const emailFormatter: Formatter<string> = {
  format(value) {
    return value ?? "";
  },

  parse(value) {
    return value;
  },

  keyboardType: "email-address",

  inputMode: "email",

  mode: "never",
};

export const numberFormatter: Formatter<number | null> = {
  format(value) {
    if (value == null) return "";

    return value.toString();
  },

  parse(value) {
    const n = Number(value);

    return Number.isNaN(n) ? null : n;
  },

  keyboardType: "decimal-pad",

  inputMode: "decimal",

  mode: "always",
};

export const currencyFormatter: Formatter<number | null> = {
  format(value) {
    if (value == null) return "";

    return value.toFixed(2);
  },

  parse(value) {
    const clean = value.replace(",", ".");

    const n = Number(clean);

    return Number.isNaN(n) ? null : n;
  },

  keyboardType: "decimal-pad",

  inputMode: "decimal",

  mode: "always",
};
