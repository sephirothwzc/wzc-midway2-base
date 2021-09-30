import { Field, ID, ObjectType, InputType, Int } from 'type-graphql';

import { IsString, Length } from 'class-validator';

@ObjectType()
export default class AppUser {
  @Field(() => ID)
  id!: number;

  @Field()
  name!: string;
}

@ObjectType()
export class AppUserList {
  @Field(() => [AppUser])
  list: AppUser[];

  @Field(() => Int, { nullable: true })
  count: number;
}

@InputType()
export class AppUserSaveIn {
  @Field()
  @IsString()
  @Length(2, 10)
  name!: string;
}
