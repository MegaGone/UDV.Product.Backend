import { DataSource } from "typeorm";
import { ProductData, BaseRepository } from "src/database";
import { PaginationResult } from "src/types";

export class ProductService {
  private readonly _repository: BaseRepository<ProductData>;

  constructor(private readonly _datasource: DataSource) {
    this._repository = new BaseRepository(this._datasource, ProductData);
  }

  public async store(record: Partial<ProductData>): Promise<number> {
    try {
      const { identifiers } = await this._repository.insert(record);
      const { Id } = identifiers[0];

      return Id;
    } catch (error) {
      console.log(`[ERROR][PRODUCT SERVICE][INSERT] ${error}`);
      return 0;
    }
  }

  public async findOneById(id: string): Promise<ProductData | null> {
    try {
      const product = await this._repository.findOne({ Id: id });
      return product;
    } catch (error) {
      console.log(`[ERROR][PRODUCT SERVICE][FIND ONE BY ID] ${error}`);
      return null;
    }
  }

  public async findOneByName(name: string): Promise<ProductData | null> {
    try {
      const product = await this._repository.findOne({ Name: name });
      return product;
    } catch (error) {
      console.log(`[ERROR][PRODUCT SERVICE][FIND ONE BY NAME] ${error}`);
      return null;
    }
  }

  public async update(id: string, product: Partial<ProductData>): Promise<boolean> {
    try {
      const { affected } = await this._repository.update(
        {
          Id: id,
        },
        product,
      );

      return affected && affected >= 1 ? true : false;
    } catch (error) {
      console.log(`[ERROR][PRODUCT SERVICE][UPDATE] ${error}`);
      return false;
    }
  }

  public async findPaginated(page: number, size: number): Promise<PaginationResult<ProductData>> {
    try {
      const take = size;
      const skip = (page - 1) * size;

      const { data, count } = await this._repository.findWithPagination(
        {},
        {
          CreatedAt: "DESC",
        },
        take,
        skip,
        [],
      );

      return {
        data: data,
        count: count,
        pageCount: Math.ceil(count / size),
        currentPage: page,
      };
    } catch (error) {
      console.log(`[ERROR][PRODUCT SERVICE][FIND PAGINATED] ${error}`);
      return { data: [], count: 0, pageCount: 0, currentPage: 0 };
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      await this._repository.delete({ Id: id });
      return true;
    } catch (error) {
      console.log(`[ERROR][PRODUCT SERVICE][DELETE] ${error}`);
      return false;
    }
  }
}
