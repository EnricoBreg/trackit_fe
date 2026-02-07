const formatDateByLocale = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};
export default formatDateByLocale;
