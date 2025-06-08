type ClassValue = string | undefined | null | false | Record<string, boolean>;

export function classNames(...classes: ClassValue[]): string {
  return classes
    .flatMap(cls => {
      if (!cls) return [];
      if (typeof cls === 'string') return cls;
      return Object.entries(cls)
        .filter(([_, value]) => value)
        .map(([key]) => key);
    })
    .join(' ');
}