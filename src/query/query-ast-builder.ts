import { Props } from '@otklib/core'
import { and, any, equals, greater, isNull, less, match, overlap, QueryAst, QueryAstFn } from './query-ast'

export class QueryAstBuilder {
  public static build(filter: Props): QueryAst {
    const astEntries: QueryAst[] = []
    const filterEntries = Object.entries(filter)

    for (const [key, value] of filterEntries) {
      const keyChunks = key.split(':')
      if (keyChunks.length === 2 && keyChunks[1] === QueryAstFn.GREATER) astEntries.push(greater(keyChunks[0], value))
      if (keyChunks.length === 2 && keyChunks[1] === QueryAstFn.LESS) astEntries.push(less(keyChunks[0], value))
      if (keyChunks.length === 2 && keyChunks[1] === QueryAstFn.MATCH) astEntries.push(match(keyChunks[0], value))
      if (keyChunks.length === 2 && keyChunks[1] === QueryAstFn.ANY) astEntries.push(any(keyChunks[0], `${value}`.split(',')))
      if (keyChunks.length === 2 && keyChunks[1] === QueryAstFn.IS_NULL) astEntries.push(isNull(keyChunks[0]))
      if (keyChunks.length === 2 && keyChunks[1] === QueryAstFn.OVERLAP) astEntries.push(overlap(keyChunks[0], value))
      if (keyChunks.length === 1) astEntries.push(equals(keyChunks[0], value))
    }

    return and(...astEntries)
  }
}
