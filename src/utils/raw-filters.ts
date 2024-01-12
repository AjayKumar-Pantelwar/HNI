import { cloneDeep } from 'lodash';
import { Pagination } from 'src/types/api.types';

type FilterLike = Pagination & { [key: string]: any };

export const getRawFilters = (object: FilterLike) => {
  const copiedObject = cloneDeep(object);
  delete copiedObject.page_no;
  delete copiedObject.no_of_records;
  return copiedObject;
};
