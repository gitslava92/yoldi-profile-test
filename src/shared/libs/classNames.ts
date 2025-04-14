export function classNames(
  ...args: Array<string | undefined | false | null | Record<string, boolean>>
): string {
  return args
    .flatMap((arg) => {
      if (!arg) return [];
      if (typeof arg === 'string') return [arg];
      if (typeof arg === 'object')
        return Object.entries(arg)
          .filter(([, value]) => value)
          .map(([key]) => key);
      return [];
    })
    .join(' ');
}
