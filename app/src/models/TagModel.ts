export default interface TagModel {
  readonly _id: string;
  readonly title: string;
  readonly guid: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type TagFormModel = {
  readonly _id?: string | null;
  readonly title: string;
  readonly guid: string;
};
