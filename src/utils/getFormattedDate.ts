import { getI18n } from "react-i18next";

const getFormattedDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString(getI18n().language);
};

export default getFormattedDate;
