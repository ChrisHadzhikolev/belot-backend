require('dotenv').config('../../.env');

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]): any {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): { cli: { entitiesDir: string; migrationsDir: string }; secretArn: string; type: any; password: string; database: string; driver: undefined; migrationsTableName: string; port: number; entities: string[]; migrations: string[]; migrationsRun: boolean; name: string; host: string; location: string; resourceArn: string; region: string; username: string; synchronize: boolean } {
    return {
      driver: undefined, location: "", region: "", resourceArn: "", secretArn: "",
      name: 'default',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: (this.getValue('DB_TYPE') as any) || 'mysql',
      port: parseInt(this.getValue('DB_PORT')) || 3306,
      host: this.getValue('DB_HOST') || 'localhost',
      username: this.getValue('DB_USERNAME') || 'root',
      password: this.getValue('DB_PASSWORD') || 'root',
      database: this.getValue('DB_NAME') || 'users',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
      migrationsRun: false,
      synchronize: true,
      cli: {
        entitiesDir: 'src/database/entities',
        migrationsDir: 'src/database/migrations',
      }
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_TYPE',
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_NAME',
]);

export { configService };
