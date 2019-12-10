import { IEnum, INewable, ISerializable } from 'cerialize/src/serialize';
import { autoserializeAs } from 'cerialize';

// tslint:disable-next-line:ban-types max-line-length
export const autoserializeAnyTypesAs = (type: string[] | Function[] | INewable<any>[] | ISerializable[] | IEnum[], keyName?: string): any => {
  // @ts-ignore
  const functions: any[] = type.map(t => {
    return autoserializeAs(t, keyName);
  });

  return (target: any, actualKeyName: string): any => {
    functions.forEach(f => {
      console.log(target, actualKeyName);
      f(target[actualKeyName], actualKeyName);
      console.log(target);
    });

    return functions[0];
  };
};

// tslint:disable-next-line:max-line-length ban-types
// export const autoserializeAnyTypesAs = (keyNameOrType: string|Function|INewable<any>|ISerializable|IEnum, keyName? : string): any => {
//   // @ts-ignore
//   const function = autoserializeAs(keyNameOrType, keyName);
//
//   return (target: any, actualKeyName: string): any => {
//     functions.forEach(f => {
//       console.log(f);
//       console.log(f(target, actualKeyName));
//     });
//   };
// };
