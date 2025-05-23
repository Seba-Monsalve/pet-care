import { differenceInMonths, differenceInYears } from "date-fns"

export const calculateYear = (dob: string) => {
    return `${differenceInYears(new Date(), new Date(dob))} años` +
        ` ${differenceInMonths(new Date(), new Date(dob)) % 12} meses`
}
