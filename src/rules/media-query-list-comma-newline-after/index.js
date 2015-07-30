import {
  ruleMessages,
  validateOptions,
  whitespaceChecker
} from "../../utils"
import { mediaQueryListCommaWhitespaceChecker } from "../media-query-list-comma-space-after"

export const ruleName = "media-query-list-comma-newline-after"

export const messages = ruleMessages(ruleName, {
  expectedAfter: () => `Expected newline after ","`,
  expectedAfterMultiLine: () => `Expected newline after "," in a multi-line list`,
  rejectedAfterMultiLine: () => `Unexpected whitespace after "," in a multi-line list`,
})

export default function (expectation) {
  const checker = whitespaceChecker("newline", expectation, messages)

  return (root, result) => {
    validateOptions({ result, ruleName,
      actual: expectation,
      possible: [
        "always",
        "always-multi-line",
        "never-multi-line",
      ],
    })

    // Only check for the newline after the comma, while allowing
    // arbitrary indentation after the newline
    mediaQueryListCommaWhitespaceChecker(checker.afterOneOnly, root, result)
  }
}
