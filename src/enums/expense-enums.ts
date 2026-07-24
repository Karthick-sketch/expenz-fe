enum ExpenseDuration {
  THIS_WEEK = "THIS_WEEK",
  LAST_WEEK = "LAST_WEEK",
  THIS_MONTH = "THIS_MONTH",
  LAST_MONTH = "LAST_MONTH",
  THIS_YEAR = "THIS_YEAR",
  LAST_YEAR = "LAST_YEAR",
  ALL_TIME = "ALL_TIME",
  DATE_RANGE = "DATE_RANGE",
}

enum ExpenseType {
  ALL = "ALL",
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export { ExpenseDuration, ExpenseType };
