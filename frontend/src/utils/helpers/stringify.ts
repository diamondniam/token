export function safeStringify(obj: any) {
  return JSON.stringify(obj, (_key, value) =>
    typeof value === "bigint" ? value.toString() : value,
  );
}

export function stringifiedEqual(a: any, b: any) {
  return safeStringify(a) === safeStringify(b);
}
