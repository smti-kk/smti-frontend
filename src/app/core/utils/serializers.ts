export const ID_SERIALIZER = {
  Serialize(obj: {id: number, _id: number}) {
    if (obj && obj.id) {
      return obj.id;
    } else if (obj && obj._id) {
      return obj._id;
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
