export function isInfoUnchanged(
  fields: string[],
  initialData: Record<string, any>,
  finalData: Record<string, any>
): boolean {
  // If fields array is empty, return false
  if (fields.length === 0) {
    return false;
  }

  // Check if all fields are unchanged
  return fields.every((field) => initialData[field] === finalData[field]);
}

const timeFormat: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

const dateFormat: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
};

const dateTimeFormat: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'short',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

export const formatDate = (
  inputDate: string | Date,
  formatType: 'date' | 'time' | 'dateTime' = 'date'
): string => {
  const date = new Date(inputDate);

  const formattedString =
    formatType === 'date'
      ? date.toLocaleDateString('en-US', dateFormat)
      : date.toLocaleTimeString(
          'en-US',
          formatType === 'time' ? timeFormat : dateTimeFormat
        );

  return formattedString;
};

export function convertFromEnum(enumVal?: string) {
  return enumVal
    ? enumVal
        .toLowerCase()
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' ')
    : '';
}
