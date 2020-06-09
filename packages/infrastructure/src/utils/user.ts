import {
  ComponentResource,
  ComponentResourceOptions,
  Input,
} from '@pulumi/pulumi';
import * as gcp from '@pulumi/gcp';
import * as random from '@pulumi/random';

export interface UserArgs {
  readonly instance: Input<string>;
  readonly name: Input<string>;
}

export class User extends ComponentResource {
  readonly password: random.RandomPassword;

  readonly user: gcp.sql.User;

  constructor(name: string, args: UserArgs, opts?: ComponentResourceOptions) {
    super('tixco:databases:User', name, {}, opts);

    this.password = new random.RandomPassword(
      `${name}-password`,
      {
        length: 20,
        overrideSpecial: '_%@',
        special: true,
      },
      { parent: this }
    );

    this.user = new gcp.sql.User(
      `${name}-user`,
      {
        name: args.name,
        password: this.password.result,
        instance: args.instance,
      },
      { parent: this }
    );
  }
}
