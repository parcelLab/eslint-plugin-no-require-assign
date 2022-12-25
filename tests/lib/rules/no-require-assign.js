/**
 * @fileoverview Tests for no-require-assign rule.
 * @author Chia Wei <https://github.com/weiliddat>
 * @credit Toru Nagashima <https://github.com/mysticatea>
 * @license MIT (https://github.com/eslint/eslint/blob/main/LICENSE)
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-require-assign");
const { RuleTester } = require("eslint");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
	},
	globals: {
		Reflect: "readonly",
	},
});

ruleTester.run("no-require-assign", rule, {
	valid: [
		"const mod = require('mod');",
		"const mod = require('mod'); const b = mod",
		"const mod = require('mod'); const b = mod.foo",
		"const mod = copy(require('mod')); mod = 0",
		"const mod = copy(require('mod')); mod.foo = 0",
	],
	invalid: [
		{
			code: "const mod1 = require('mod'); mod1 = 0",
			errors: [
				{ messageId: "readonly", data: { name: "mod1" }, column: 30 },
			],
		},
		{
			code: "const mod2 = require('mod'); mod2 += 0",
			errors: [
				{ messageId: "readonly", data: { name: "mod2" }, column: 30 },
			],
		},
		{
			code: "const mod3 = require('mod'); mod3++",
			errors: [
				{ messageId: "readonly", data: { name: "mod3" }, column: 30 },
			],
		},
		{
			code: "const mod4 = require('mod'); for (mod4 in foo);",
			errors: [
				{ messageId: "readonly", data: { name: "mod4" }, column: 30 },
			],
		},
		{
			code: "const mod5 = require('mod'); for (mod5 of foo);",
			errors: [
				{ messageId: "readonly", data: { name: "mod5" }, column: 30 },
			],
		},
		{
			code: "const mod6 = require('mod'); mod6.foo = 0",
			errors: [
				{
					messageId: "readonlyMember",
					data: { name: "mod6" },
					column: 30,
				},
			],
		},
		{
			code: "const {named1} = require('mod'); named1 = 0",
			errors: [
				{ messageId: "readonly", data: { name: "named1" }, column: 34 },
			],
		},
		{
			code: "const {named2} = require('mod'); named2 += 0",
			errors: [
				{ messageId: "readonly", data: { name: "named2" }, column: 34 },
			],
		},
		{
			code: "const {named3} = require('mod'); named3++",
			errors: [
				{ messageId: "readonly", data: { name: "named3" }, column: 34 },
			],
		},
		{
			code: "const {named4} = require('mod'); named4.foo = 0",
			errors: [
				{
					messageId: "readonlyMember",
					data: { name: "named4" },
					column: 34,
				},
			],
		},

		// Optional chaining
		{
			code: "const mod = require('mod'); Object?.defineProperty(mod, key, d)",
			parserOptions: { ecmaVersion: 2020 },
			errors: [
				{
					messageId: "readonlyMember",
					data: { name: "mod" },
					column: 29,
				},
			],
		},
		{
			code: "const mod = require('mod'); (Object?.defineProperty)(mod, key, d)",
			parserOptions: { ecmaVersion: 2020 },
			errors: [
				{
					messageId: "readonlyMember",
					data: { name: "mod" },
					column: 29,
				},
			],
		},
		{
			code: "const mod = require('mod'); delete mod?.prop",
			parserOptions: { ecmaVersion: 2020 },
			errors: [
				{
					messageId: "readonlyMember",
					data: { name: "mod" },
					column: 29,
				},
			],
		},
	],
});
