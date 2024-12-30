// Support component names relative to this directory:
// @ts-ignore
var componentRequireContext = require.context("components", true);
// @ts-ignore
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
