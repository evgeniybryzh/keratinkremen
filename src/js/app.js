"use strict";
import { useForm } from "./form";
import { useGenerator } from "./generator";
var $ = require("jquery");
// const { useForm } = require("./form");
Foundation.addToJquery($);
$(document).foundation();
useForm();
useGenerator();
