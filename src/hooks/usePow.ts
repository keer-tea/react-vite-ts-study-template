import { useMemo } from 'react';

export default (list: number[]) => {
  return useMemo(() => list.map(num => {
    console.log('hook 执行了');
    return Math.pow(num, 2)
  }), [])
}
console.log(123);
