export const createValidator = (value: string) => {
  const errors: string[] = [];

  const isMin = (min: number) => {
    if (value.length < min) {
      errors.push(`Минимум ${min} символов`);
    }
    return { isMin, isMax, isRequired, isEmail, getErrors };
  };

  const isMax = (max: number) => {
    if (value.length > max) {
      errors.push(`Максимум ${max} символов`);
    }
    return { isMin, isMax, isRequired, isEmail, getErrors };
  };

  const isRequired = () => {
    if (!value) {
      errors.push('Это поле обязательно');
    }
    return { isMin, isMax, isRequired, isEmail, getErrors };
  };

  const isEmail = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(value)) {
      errors.push('Введите корректный e-mail');
    }
    return { isMin, isMax, isRequired, isEmail, getErrors };
  };

  const getErrors = () => errors;

  return { isMin, isMax, isRequired, isEmail, getErrors };
};
