import { QueryAst, QueryAstFn, and, any, equals, less, match, greater, not, or, isNull } from '../src/query/query-ast'

describe('Query AST', () => {
  test('create query ast', () => {
    const ast: QueryAst = and(
      equals('a', 'b'),
      match('c', 'd'),
      or(
        not(any('e', ['f', 'g', 'h'])), //
        less('i', 'j'),
        greater('k', 'l'),
        isNull('q'),
      ),
    )

    expect(ast).toEqual({
      fn: QueryAstFn.AND,
      args: [
        { fn: QueryAstFn.EQUALS, args: ['a', 'b'] },
        { fn: QueryAstFn.MATCH, args: ['c', 'd'] },
        {
          fn: QueryAstFn.OR,
          args: [
            {
              fn: QueryAstFn.NOT,
              args: [{ fn: QueryAstFn.ANY, args: ['e', ['f', 'g', 'h']] }],
            },
            { fn: QueryAstFn.LESS, args: ['i', 'j'] },
            { fn: QueryAstFn.GREATER, args: ['k', 'l'] },
            { fn: QueryAstFn.IS_NULL, args: ['q'] },
          ],
        },
      ],
    })
  })
})
