/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  const Errors = value(form, 'Errors');
  const Params = value(form, 'Params');


  if (Errors && Errors.length > 0) {
    throw Errors.join('\n');
  }
}
