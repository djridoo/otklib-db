import { PropValue } from '@otklib/core'

export enum QueryAstFn {
  NOT = 'not',
  OR = 'or',
  AND = 'and',
  EQUALS = 'equals',
  MATCH = 'match',
  LESS = 'less',
  GREATER = 'greater',
  ANY = 'any',
  IS_NULL = 'isNull',
  OVERLAP = 'overlap',
}

export type QueryAstValue = PropValue | PropValue[]

export type QueryAstArg = QueryAstValue | QueryAst

export type QueryAst = {
  fn: QueryAstFn
  args: QueryAstArg[]
}

export const not = (arg): QueryAst => ({ fn: QueryAstFn.NOT, args: [arg] })
export const or = (...args): QueryAst => ({ fn: QueryAstFn.OR, args })
export const and = (...args): QueryAst => ({ fn: QueryAstFn.AND, args })
export const equals = (field, value): QueryAst => ({ fn: QueryAstFn.EQUALS, args: [field, value] })
export const match = (field, value): QueryAst => ({ fn: QueryAstFn.MATCH, args: [field, value] })
export const less = (field, value): QueryAst => ({ fn: QueryAstFn.LESS, args: [field, value] })
export const greater = (field, value): QueryAst => ({ fn: QueryAstFn.GREATER, args: [field, value] })
export const any = (field, values): QueryAst => ({ fn: QueryAstFn.ANY, args: [field, values] })
export const isNull = (field): QueryAst => ({ fn: QueryAstFn.IS_NULL, args: [field] })
export const overlap = (field, values): QueryAst => ({ fn: QueryAstFn.OVERLAP, args: [field, values] })
