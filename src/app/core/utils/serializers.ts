// noinspection JSUnusedGlobalSymbols
export const ID_SERIALIZER = {
  Serialize(obj: {id: number; _id: number}): number {
    if (obj && obj.id) {
      return obj.id;
    }
    if (obj && obj._id) {
      return obj._id;
    }
    throw Error(`Serialize obj ${obj}: unknown obj`);
  },
};

// noinspection JSUnusedGlobalSymbols
export const TYPE_SERIALIZER = {
  Serialize(obj: {type: number}): number {
    if (obj) {
      return obj.type;
    }
    throw Error(`Serialize TYPE_SERIALIZER ${obj}: unknown obj`);
  },
};
