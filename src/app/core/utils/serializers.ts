export const ID_SERIALIZER = {
  Serialize(obj: {id: number}) {
    if (obj) {
      return obj.id;
    }
  },
};

export const TYPE_SERIALIZER = {
  Serialize(obj: {type: number}) {
    if (obj) {
      return obj.type;
    }
  },
};
