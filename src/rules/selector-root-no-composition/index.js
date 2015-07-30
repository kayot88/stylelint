import {
  report,
  ruleMessages,
  validateOptions
} from "../../utils"

export const ruleName = "selector-root-no-composition"

export const messages = ruleMessages(ruleName, {
  rejected: `Unexpected composition of the ":root" selector`,
})

export default function (o) {
  return (root, result) => {
    validateOptions({ ruleName, result, actual: o })

    root.eachRule(rule => {
      if (rule.selector.indexOf(":root") === -1) { return }

      if (rule.selector.trim() === ":root") { return }

      report({
        message: messages.rejected,
        node: rule,
        result,
        ruleName,
      })
    })
  }
}
