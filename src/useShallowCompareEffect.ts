import { DependencyList, EffectCallback } from 'react';
import { equal as isShallowEqual } from 'fast-shallow-equal';
import useCustomCompareEffect from './useCustomCompareEffect';

const isPrimitive = (val: any) => val !== Object(val);
const shallowCompareDepsList = (depsListA: DependencyList, depsListB: DependencyList) =>
  depsListA.some((dep, index) => isShallowEqual(dep, depsListB[index]));

const useShallowCompareEffect = (effect: EffectCallback, deps: DependencyList) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!deps || !deps.length) {
      console.warn('`useDeepCompareEffect` should not be used with no dependencies. Use React.useEffect instead.');
    }

    if (deps.every(isPrimitive)) {
      console.warn(
        '`useDeepCompareEffect` should not be used with dependencies that are all primitive values. Use React.useEffect instead.'
      );
    }
  }

  useCustomCompareEffect(effect, deps, shallowCompareDepsList);
};

export default useShallowCompareEffect;