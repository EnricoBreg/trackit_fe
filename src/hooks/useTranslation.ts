import { useTranslation } from "react-i18next";

const useAppTranslation = (keyPrefix = "") =>
  useTranslation("translation", { keyPrefix });

export default useAppTranslation;
