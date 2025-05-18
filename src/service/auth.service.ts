import { DataSource } from "typeorm";
import { UserData, BaseRepository } from "src/database";

export class AuthService {
  private readonly _authRepository: BaseRepository<UserData>;

  constructor(private readonly _datasource: DataSource) {
    this._authRepository = new BaseRepository(this._datasource, UserData);
  }

  public async insertRecord(record: Partial<UserData>): Promise<number> {
    try {
      const { identifiers } = await this._authRepository.insert(record);
      const { Id } = identifiers[0];

      return !Id || +Id <= 0 ? 0 : Id;
    } catch (error) {
      return 0;
    }
  }

  public async findRecord(email: string): Promise<UserData | null> {
    try {
      const record: UserData | null = await this._authRepository.findOne({ Email: email });

      return !record ? null : record;
    } catch (error) {
      return null;
    }
  }
}
