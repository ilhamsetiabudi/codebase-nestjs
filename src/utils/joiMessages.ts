export const joiCustomMessages = (errors: any) => {
  errors.forEach(function (err: any) {
    switch (err.type) {
      case 'any.required':
        err.message = `${err.context.key} is required`;
        break;
      case 'any.empty':
        err.message = `${err.context.key} is empty`;
        break;
      case 'number.base':
        err.message = `${err.context.key} must be a number`;
        break;
      case 'string.min':
        err.message = `${err.context.key} tidak boleh kurang dari ${err.context.limit} karakter`;
        break;
      case 'string.max':
        err.message = `${err.context.key} tidak boleh lebih dari ${err.context.limit} karakter`;
        break;
      case 'string.email':
        err.message = `Format ${err.context.key} domain yang dimasukkan tidak valid`;
        break;
      case 'any.allowOnly':
        err.message = `${err.context.key} must be one of ${err.context.valids
          .toString()
          .replace(/,/g, ' or ')}`;
        break;
      case 'string.regex.name':
        err.message = `${err.context.key} tidak valid`;
        if (err.context.key == 'phone') {
          err.message = `${err.context.key} tidak boleh dimulai dari 0`;
        }
        break;
    }
  });
  return errors;
};
