/**
 * Copied from eslint/lib/rules/utils/ast-utils because it's not exported
 * @author Gyandeep Singh
 * @license MIT (https://github.com/eslint/eslint/blob/main/LICENSE)
 */

function skipChainExpression(node) {
	return node && node.type === "ChainExpression" ? node.expression : node;
}

function isSpecificMemberAccess(node, objectName, propertyName) {
	const checkNode = skipChainExpression(node);

	if (checkNode.type !== "MemberExpression") {
		return false;
	}

	if (objectName && !isSpecificId(checkNode.object, objectName)) {
		return false;
	}

	if (propertyName) {
		const actualPropertyName = getStaticPropertyName(checkNode);

		if (
			typeof actualPropertyName !== "string" ||
			!checkText(actualPropertyName, propertyName)
		) {
			return false;
		}
	}

	return true;
}

function isSpecificId(node, name) {
	return node.type === "Identifier" && checkText(node.name, name);
}

function checkText(actual, expected) {
	return typeof expected === "string"
		? actual === expected
		: expected.test(actual);
}

function getStaticPropertyName(node) {
	let prop;

	switch (node && node.type) {
		case "ChainExpression":
			return getStaticPropertyName(node.expression);

		case "Property":
		case "PropertyDefinition":
		case "MethodDefinition":
			prop = node.key;
			break;

		case "MemberExpression":
			prop = node.property;
			break;

		// no default
	}

	if (prop) {
		if (prop.type === "Identifier" && !node.computed) {
			return prop.name;
		}

		return getStaticStringValue(prop);
	}

	return null;
}

function getStaticStringValue(node) {
	switch (node.type) {
		case "Literal":
			if (node.value === null) {
				if (isNullLiteral(node)) {
					return String(node.value); // "null"
				}
				if (node.regex) {
					return `/${node.regex.pattern}/${node.regex.flags}`;
				}
				if (node.bigint) {
					return node.bigint;
				}

				// Otherwise, this is an unknown literal. The function will return null.
			} else {
				return String(node.value);
			}
			break;
		case "TemplateLiteral":
			if (node.expressions.length === 0 && node.quasis.length === 1) {
				return node.quasis[0].value.cooked;
			}
			break;

		// no default
	}

	return null;
}

function isNullLiteral(node) {
	/*
	 * Checking `node.value === null` does not guarantee that a literal is a null literal.
	 * When parsing values that cannot be represented in the current environment (e.g. unicode
	 * regexes in Node 4), `node.value` is set to `null` because it wouldn't be possible to
	 * set `node.value` to a unicode regex. To make sure a literal is actually `null`, check
	 * `node.regex` instead. Also see: https://github.com/eslint/eslint/issues/8020
	 */
	return (
		node.type === "Literal" &&
		node.value === null &&
		!node.regex &&
		!node.bigint
	);
}

module.exports = {
	skipChainExpression,
	isSpecificMemberAccess,
};
