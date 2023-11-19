export type ObjectKey<T> = {
  [key: string]: T;
};

export const objectToParams = <T = ObjectKey<string | number>>(
  objects?: ObjectKey<T>
) => {
  if (!objects) return "";
  const queryString = Object.keys(objects)
    .map((key) => key + "=" + objects[key])
    .join("&");
  return queryString !== "" ? `?${queryString}` : "";
};
