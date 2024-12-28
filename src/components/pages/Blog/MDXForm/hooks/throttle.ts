const throttlify = (function () {
  let timeout: NodeJS.Timeout | undefined = undefined;
  return function throttlify(callback: (args?: any) => void, delay: number) {
    if (timeout === undefined) {
      callback();
      timeout = setTimeout(() => {
        // allow another call to be throttled
        timeout = undefined;
      }, delay);
    }
  };
})();

export default function throttle(
  callback: (args?: any) => void,
  delay: number,
) {
  return function throttled(event: any) {
    throttlify(() => {
      callback(event);
    }, delay);
  };
}
