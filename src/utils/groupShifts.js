import { format } from 'date-fns';

export function groupeShifts(shifts) {
  return shifts
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reduce((acc, shift) => {
      const date = format(new Date(shift.date), 'dd.MM.yyyy');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(shift);
      return acc;
    }, {});
}
