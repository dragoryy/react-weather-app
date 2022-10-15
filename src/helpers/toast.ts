import { Notyf } from "notyf";

export const warningToast = () => {
  const notyf = new Notyf();
  notyf.error("Something went wrong...Try again!");
};
