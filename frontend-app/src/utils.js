export function throttle(fn, time) {
  let timeout;
  return (...args) => {
    if (timeout) return;
    setTimeout(() => {
      fn.apply(this, args);
      timeout = null;
    }, time);
  };
}
