import {
  report,
  ruleMessages,
  styleSearch,
  isAutoprefixable,
  validateOptions
} from "../../utils"

export const ruleName = "selector-no-vendor-prefix"

export const messages = ruleMessages(ruleName, {
  rejected: p => `Unexpected vendor-prefixed selector "${p}"`,
})

export default function (o) {
  return (root, result) => {
    validateOptions({ ruleName, result, actual: o })

    root.eachRule(rule => {
      const selector = rule.selector

      // Check each pseudo-selector
      styleSearch({ source: selector, target: ":" }, match => {
        const pseudoSelector = /:{1,2}[a-z-]+\b/.exec(selector.slice(match.startIndex))[0]

        if (isAutoprefixable.selector(pseudoSelector)) {
          report({
            message: messages.rejected(pseudoSelector),
            node: rule,
            result,
            ruleName,
          })
        }
      })
    })
  }
}
