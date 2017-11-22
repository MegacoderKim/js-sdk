export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      // console.log(derivedCtor.prototype[name], baseCtor.prototype[name], name);
      derivedCtor.prototype[name] = derivedCtor.prototype[name] && !name.includes('_') ? derivedCtor.prototype[name] : baseCtor.prototype[name];
    });
  });
}