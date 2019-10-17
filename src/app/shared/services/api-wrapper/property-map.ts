export function propertyMap(sourceProperty: string) {
  return (target: any, propertyKey: string) => {
    if (!target.constructor._propertyMap) {
      target.constructor._propertyMap = {};
    }
    target.constructor._propertyMap[propertyKey] = sourceProperty;
  };
}
