// Dynamic Bengali Date Formatter
export function getBengaliDate(inputDate?: Date | string): string {
  if (!inputDate) return '';

  const dateObj = typeof inputDate === 'string' ? new Date(inputDate) : inputDate;

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('bn-BD', options).format(dateObj);
}

// Converts English numbers to Bengali digits
export function toBengaliNumerals(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

// Formats change badge text & colors
export function getChangeBadge(change: number) {
  const formattedVal = toBengaliNumerals(Math.abs(change).toFixed(1));
  if (change > 0) {
    return {
      text: `▲ ${formattedVal}%`,
      className: 'bg-red-100 text-red-600',
    };
  } else if (change < 0) {
    return {
      text: `▼ ${formattedVal}%`,
      className: 'bg-green-100 text-green-600',
    };
  }
  return {
    text: `- 0.0%`,
    className: 'bg-gray-100 text-gray-500',
  };
}