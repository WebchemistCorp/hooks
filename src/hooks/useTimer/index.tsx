export type UseTimerReturn = {
  date: Date;
  hour: number;
  minute: number;
  second: number;
};

export const useTimer = (date: string) => {
  if (typeof date !== 'string') {
    throw new Error('The type of `date` is `string`.');
  }

  if (/\d{4}-\d{2}=\d{2} \d{2}:\d{2}:\d{2}/.test(date)) {
    throw new Error();
  }

  return {};
};
