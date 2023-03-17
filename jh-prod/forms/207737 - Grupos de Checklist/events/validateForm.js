/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  var Errors = value(form, 'Errors');
  var Params = value(form, 'Params');

  if (Errors && Errors.length > 0) {
    throw Errors.join('\n');
  }
}