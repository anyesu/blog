export const enum Syntax {
  /**
   * ref: https://github.com/orgs/community/discussions/16925
   */
  ALERT = 'ALERT',
}

export const ALERT_TYPES = {
  NOTE: '注意',
  TIP: '提示',
  IMPORTANT: '重要',
  WARNING: '警告',
  CAUTION: '危险警告',
} as const;
