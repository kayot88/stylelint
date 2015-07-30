import {
  report,
  ruleMessages,
  validateOptions,
  whitespaceChecker
} from "../../utils"

export const ruleName = "declaration-colon-space-after"

export const messages = ruleMessages(ruleName, {
  expectedAfter: () => `Expected single space after ":"`,
  rejectedAfter: () => `Unexpected whitespace after ":"`,
})

export default function (expectation) {
  const checker = whitespaceChecker("space", expectation, messages)
  return (root, result) => {
    validateOptions({ result, ruleName,
      actual: expectation,
      possible: [
        "always",
        "never",
      ],
    })

    declarationColonSpaceChecker(checker.after, root, result)
  }
}

export function declarationColonSpaceChecker(locationChecker, root, result) {
  root.eachDecl(decl => {
    const declString = decl.toString()

    for (let i = 0, l = declString.length; i < l; i++) {
      if (declString[i] !== ":") { continue }
      check(declString, i, decl)
      break
    }
  })

  function check(source, index, node) {
    locationChecker({ source, index, err: m =>
      report({
        message: m,
        node: node,
        result,
        ruleName,
      }),
    })
  }
}
