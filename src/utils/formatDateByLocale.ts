const formatDateByLocale = (date: Date | string, locale: string) => {
  let d: Date;
  if (date instanceof Date) {
    d = date;
  } else {
    d = new Date(date);
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
};
export default formatDateByLocale;
