import { OrderType } from "./enums";

type ListQueryModel = {
  paging?: number;
  pageSize?: number;
  page?: number;
  order?: string;
  orderBy?: OrderType | null;
  s?: string;
  sType?: string;
};

export default ListQueryModel;
