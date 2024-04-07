// To add a text package, just add it to the TeX extenstions array, appended with ".js"

window.MathJax = {
  config: ["MMLorHTML.js"],
  jax: ["input/TeX","input/MathML","input/AsciiMath","output/HTML-CSS","output/NativeMML", "output/PreviewHTML"],
  extensions: ["tex2jax.js","mml2jax.js","asciimath2jax.js","MathMenu.js","MathZoom.js", "fast-preview.js", "AssistiveMML.js", "a11y/accessibility-menu.js","mediawiki-texvc.js","autobold.js"],
  tex: {
    packages: {'[+]': ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js","color.js","mhchem.js","cancel.js","autobold.js"]},
    macros: {
      RR: "{\\mathbb{R}}",
      bold: ["{\\bf #1}", 1],
      boldxtb: ["{\\bf #1}", 1],
      eo: "{\\varepsilon_0}",
      e: ["{\\times 10^{#1}}", 1],
      epsilon: "{\\varepsilon}",
      k: "{1.381\\times10^{-23}}",
      q: "{1.602\\times10^{-19}}",
      eon: "{8.854\\times10^{-12}}",
      cnmr: "{\\ce{^13C-NMR}}",
      hnmr: "{\\ce{^1H-NMR}}",
      AA: "{\\unicode{x212B}}",
      infin: "{\\unicode{x221E}}", 
      kjmol: "{KJ\\cdot mol^{-1}}",
      il: ["{[\\ce{#1}][\\ce{#2}]}", 2]
    },
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  }
};

// document$.subscribe(() => {
//   MathJax.typesetPromise()
// })