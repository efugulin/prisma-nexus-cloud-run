import { ComponentResource, ComponentResourceOptions } from '@pulumi/pulumi';
import * as gcp from '@pulumi/gcp';

import label from './utils/label';
import { User } from './utils/user';

export interface DatabaseArgs {
  diskSize: number;
  tier: string;
  ha: boolean;
}

export class Database extends ComponentResource {
  readonly instance: gcp.sql.DatabaseInstance;

  readonly database: gcp.sql.Database;

  readonly serviceUser: User;

  readonly migrationUser: User;

  public connectionName() {
    return this.instance.connectionName;
  }

  constructor(args: DatabaseArgs, opts?: ComponentResourceOptions) {
    const name = 'database'; // Prevents duplicates
    super('efugulin:Database', name, opts);

    // Database
    this.instance = new gcp.sql.DatabaseInstance(
      `${name}-instance`,
      {
        name: label(name),
        databaseVersion: 'POSTGRES_11',
        settings: {
          tier: args.tier,
          availabilityType: args.ha ? 'REGIONAL' : 'ZONAL',
          diskAutoresize: true,
          diskSize: args.diskSize,
          diskType: 'PD_SSD',
          backupConfiguration: {
            enabled: true,
            startTime: '11:00', // 7AM EASTERN
          },
          ipConfiguration: {
            ipv4Enabled: true, // Note: Cloud Run only works with public IP at the moment
          },
          maintenanceWindow: {
            day: 1,
            hour: 10, // 6AM EASTERN
            updateTrack: 'stable',
          },
        },
      },
      {
        parent: this,
        ignoreChanges: ['settings.ipConfiguration.authorizedNetworks'],
      }
    );

    this.database = new gcp.sql.Database(
      `${name}-database`,
      { name: 'demo', instance: this.instance.name },
      { parent: this }
    );

    // Users
    this.serviceUser = new User(
      `${name}-service-user`,
      {
        name: 'efugulin',
        instance: this.instance.name,
      },
      { parent: this }
    );

    this.migrationUser = new User(
      `${name}-migration-user`,
      {
        name: 'efugulin-migration',
        instance: this.instance.name,
      },
      { parent: this }
    );
  }
}
