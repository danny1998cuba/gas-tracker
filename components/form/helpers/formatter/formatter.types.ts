export type Formatter<T> = {
  format(value: T): string;

  parse(text: string): T;

  mode?: "always" | "blur" | "never";

  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "phone-pad"
    | "email-address";

  inputMode?: "text" | "numeric" | "decimal" | "email" | "tel";
};
