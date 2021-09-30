import { Field, InputType, Int } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { IsNumber, Min } from 'class-validator';

@InputType()
export default class QueryListParam {
  @Field(() => GraphQLJSONObject, { description: '查询条件 Op = _' })
  where?: Record<string, unknown>;

  @Field(() => [[String]], { description: '排序 ASC DESC' })
  order?: [[string]];

  @IsNumber()
  @Min(0)
  @Field(() => Int)
  limit?: number;

  @IsNumber()
  @Min(0)
  @Field(() => Int)
  offset?: number;
}
