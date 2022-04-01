export const getError = (error) => {
  console.log(error);
  const errorMessage = "API Error, please try again.";

  if (error.name === "Fetch User") {
    return error.message;
  }
  if (error.name === "DniError") {
    return error.message;
  }

  if (!error.response) {
    console.error(`API ${error?.config?.url} not found`);
    return errorMessage;
  }

  if (process.env.NODE_ENV === "development") {
    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);
  }

  if (error.response.data && error.response.data.data) {
    return error.response.data.data;
  }

  if (error.response.status === 500) {
    return error.response.statusText;
  }

  return errorMessage;
};
