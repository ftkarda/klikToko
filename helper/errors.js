function errors(err) {
    if (err.name === "SequelizeValidationError") {
      let errors = err.errors.map((el) => el.message);
      return errors;
    }
    return err;
  }
  
  module.exports = errors;
  