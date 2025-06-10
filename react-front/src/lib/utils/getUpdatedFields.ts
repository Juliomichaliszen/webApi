type AnyObj = Record<string, unknown>;

function isDate(v: unknown): v is Date {
  return v instanceof Date;
}

export function getUpdatedFields<T extends AnyObj>(
  current: Partial<T>,
  original?: Partial<T>
): Partial<T> {
  if (!original) return current;

  const diff: Partial<Record<keyof T, unknown>> = {};

  for (const k in current) {
    const key = k as keyof T;
    const cur = current[key];
    const ori = original[key];

    /* ---------- ARRAYS ---------- */
    if (Array.isArray(cur) && Array.isArray(ori)) {
      const changed =
        cur.length !== ori.length ||
        cur.some((v) => !ori.includes(v)) ||
        ori.some((v) => !cur.includes(v));
      if (changed) diff[key] = cur;
      continue;
    }

    /* ---------- DATAS ---------- */
    if (isDate(cur) && isDate(ori)) {
      if (cur.getTime() !== ori.getTime()) diff[key] = cur;
      continue;
    }

    /* ---------- OBJETOS ---------- */
    if (
      cur &&
      ori &&
      typeof cur === "object" &&
      typeof ori === "object" &&
      !Array.isArray(cur) &&
      !Array.isArray(ori)
    ) {
      const nested = getUpdatedFields(cur as AnyObj, ori as AnyObj);
      if (Object.keys(nested).length) diff[key] = nested;
      continue;
    }

    /* ---------- PRIMITIVOS ---------- */
    if (cur !== ori) diff[key] = cur;
  }

  return diff as Partial<T>;
}
