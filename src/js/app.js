"use strict";
import { useForm } from "./form";
import { useGenerator } from "./generator";
import { showQuestions, getLogic } from "./logic";
import { startTitileShow } from "./m-page-title";

var $ = require("jquery");

document.addEventListener("DOMContentLoaded", function () {
  Foundation.addToJquery($);
  $(document).foundation();
  startTitileShow();
  useForm();
  useGenerator();
  showQuestions();
  getLogic();
});
