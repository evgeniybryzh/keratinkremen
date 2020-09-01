"use strict";
import { useForm } from "./form";
import { useGenerator } from "./generator";
import { showQuestions, getLogic } from "./logic";
import { startTitileShow } from "./m-page-title";

var $ = require("jquery");

// const { useForm } = require("./form");
Foundation.addToJquery($);
$(document).foundation();
startTitileShow();
useForm();
useGenerator();
showQuestions();
getLogic();

$;
