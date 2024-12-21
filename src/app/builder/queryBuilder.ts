import mongoose, { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // search logic
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search as string;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  // filter logic
  filter() {
    const queryObj: Record<string, unknown> = { ...this.query };
    const excludingImportant = ['search', 'sortOrder', 'sortBy'];

    excludingImportant.forEach((key) => delete queryObj[key]);

    if (
      queryObj.filter &&
      mongoose.Types.ObjectId.isValid(queryObj.filter as string)
    ) {
      queryObj.author = new mongoose.Types.ObjectId(queryObj.filter as string);
      delete queryObj.filter;
    }

    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }

  // sort and sort-by logic
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
