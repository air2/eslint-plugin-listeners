import type { TSESTree } from '@typescript-eslint/utils';

export enum RuleType {
  MissingRemoveEventListener = 'no-missing-remove-event-listener',
  MatchingRemoveEventListener = 'matching-remove-event-listener',
  InlineFunctionEventListener = 'no-inline-function-event-listener',
}

export const isNodeIdentifier = (node: TSESTree.Expression | TSESTree.Super): boolean => node?.type === 'Identifier';
export const isNodeMemberExpression = (node: TSESTree.Expression | TSESTree.Super): boolean =>
  node?.type === 'MemberExpression';
export const isNodeThisExpression = (node: TSESTree.Expression | TSESTree.Super): boolean =>
  node?.type === 'ThisExpression';
export const isNodeFunctionExpression = (node: TSESTree.Expression | TSESTree.Super): boolean =>
  node?.type === 'FunctionExpression';
export const isNodeArrowFunctionExpression = (node: TSESTree.Expression | TSESTree.Super): boolean =>
  node?.type === 'ArrowFunctionExpression';

export const parseMemberExpression = (node: TSESTree.MemberExpression): string => {
  let value;

  if (isNodeIdentifier(node.object)) {
    value = (<TSESTree.Identifier>node.object).name;
  }

  if (isNodeMemberExpression(node.object)) {
    value = parseMemberExpression(<TSESTree.MemberExpression>node.object);
  }

  if (isNodeThisExpression(node.object)) {
    value = `this.${(<TSESTree.Identifier>node.property).name}`;
  }

  return value;
};

export const getDescription = (ruleName: RuleType): string => {
  switch (ruleName) {
    case RuleType.MissingRemoveEventListener:
      return 'No missing removeEventListener if addEventListener exists';
    case RuleType.MatchingRemoveEventListener:
      return 'Handler for removeEventListener should match addEventListener';
    case RuleType.InlineFunctionEventListener:
      return 'Handler for event listener should not be an inline function';
  }
};
