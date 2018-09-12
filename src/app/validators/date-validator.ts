import { FormControl } from "@angular/forms";

export function dateValidator(until?: number) {
  return (control: FormControl) => {
    if (control.value) {
      let now = Date.now();
      let miliseconds = formatDate(control.value, until);
      let valido = false;
      if (miliseconds <= now) {
        valido = true;
      }
      return valido ? null : { actual: { valid: false } };
    } else {
      return null;
    }
  };
}

function formatDate(date: any, until?: number): number {
  let year = date.year.value;
  let month = date.month.value - 1;
  let day = date.day.value;
  let hour = 0,
    minute = 0,
    seconds = 0;
  if (until != null) {
    if (until >= 1 && until <= 3) {
      if (until >= 1) {
        hour = date.hour.value;
      }
      if (until >= 2) {
        minute = date.minute.value;
      }
      if (until == 3) {
        seconds = date.second.value;
      }
    }
  }

  let dateISO = new Date(year, month, day, hour, minute, seconds).toISOString();
  return new Date(dateISO).getTime();
}
