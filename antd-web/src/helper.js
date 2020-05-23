/**
 * Use in catch block to deal with errors from form submits. Make sure to throw the response object.
 * @param {Object} response responst object from fetch
 * @param {function} setAlert useState function
 * @param {Object} form ant design form
 */
export const handleErrors = async (response, setAlert, form) => {
  if (!response.headers) {
    setAlert({
      message: "We're sorry, something seems to have gone wrong.",
      type: 'error',
    });
    console.error(response);
  } else if (!response.headers.get('content-type')) {
    setAlert({ message: response.statusText, type: 'error' });
    console.error(response.statusText);
  } else if (
    response.headers.get('content-type').includes('application/json')
  ) {
    const json = await response.json();
    if (response.status === 400 || response.status === 401) {
      // field based errors
      json.forEach(i =>
        form.setFields([
          {
            name: i.field,
            errors: [i.message],
          },
        ])
      );
    } else {
      setAlert({ message: json.message, type: 'error' });
    }
    console.error(json);
  } else {
    // if not json data
    const text = await response.text();
    setAlert({ message: text, type: 'error' });
  }
};
