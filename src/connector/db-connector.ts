import { Props } from '@otklib/core'

export interface DbConnector {
  query(sql: string, props: Props): Promise<Props[]>
}
