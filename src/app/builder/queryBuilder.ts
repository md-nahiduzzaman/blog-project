/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search as string;
    this.modelQuery = this.modelQuery.find({
      $or: searchableFields.map((field: any) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    } as FilterQuery<T>);
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludingImportant = ['search', 'sortBy', 'sortOrder'];

    excludingImportant.forEach((key) => delete queryObj[key]);

    if (queryObj.filter) {
      queryObj.author = queryObj.filter;
      delete queryObj.filter;
    }

    this.modelQuery = this.modelQuery.find(queryObj);

    return this;
  }

  sort() {
    let sortStr = '-createdAt';

    if (this?.query?.sortBy) {
      const sortBy = this?.query?.sortBy;
      const sortOrder = this?.query?.sortOrder === 'desc' ? '-' : '';
      sortStr = `${sortOrder}${sortBy}`;
    }

    this.modelQuery = this.modelQuery.sort(sortStr);
    return this;
  }
}

export default QueryBuilder;
