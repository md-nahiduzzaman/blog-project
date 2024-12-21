import mongoose, { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // search(searchableFields: string[]) {
  //   const searchTerm = this?.query?.search as string;

  //   this.modelQuery = this.modelQuery.find({
  //     $or: searchableFields.map((field: any) => ({
  //       [field]: { $regex: searchTerm, $options: 'i' },
  //     })),
  //   } as FilterQuery<T>);
  //   return this;
  // }

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

  filter() {
    const queryObj: Record<string, unknown> = { ...this.query };
    const excludingImportant = ['search', 'sortOrder', 'sortBy'];

    excludingImportant.forEach((key) => delete queryObj[key]);

    // ✅ Convert 'filter' to ObjectId and assign it to 'author'
    if (
      queryObj.filter &&
      mongoose.Types.ObjectId.isValid(queryObj.filter as string)
    ) {
      queryObj.author = new mongoose.Types.ObjectId(queryObj.filter as string);
      delete queryObj.filter; // Remove 'filter' after assigning it to 'author'
    }

    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }

  // filter() {
  //   const queryObj = { ...this.query };
  //   const excludingImportant = ['search', 'sortBy', 'sortOrder'];

  //   excludingImportant.forEach((key) => delete queryObj[key]);

  //   if (queryObj.filter) {
  //     queryObj.author = queryObj.filter;
  //     delete queryObj.filter;
  //   }

  //   this.modelQuery = this.modelQuery.find(queryObj);

  //   return this;
  // }

  // filter() {
  //   const queryObj = { ...this?.query };
  //   const excludingImportant = ['search', 'sortOrder', 'sortBy'];

  //   excludingImportant.forEach((key) => delete queryObj[key]);

  //   this.modelQuery = this.modelQuery.find(queryObj);

  //   return this;
  // }

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
