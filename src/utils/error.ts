type FieldErrorParams = {
  componentName: string;
  field: string;
}


export class FieldError extends Error {
  constructor(params: FieldErrorParams) {
    let message = '';
    message += `Component - ${params.componentName}\n`;
    message += `There is a problem with the ${params.field}.`
    message += `Please check the data file.`;
    super(message);
    Object.setPrototypeOf(this, FieldError.prototype);
  }
}