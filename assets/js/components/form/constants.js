export const FormStatus = Object.freeze({
  Default: 'default',
  Success: 'success',
  Failure: 'failure'
});

export const FormErrorCode = Object.freeze({
  /**
   * Form has been disabled
   */
  Inactive: 'INACTIVE',
  
  /**
   * Form has been blocked
   */
  Blocked: 'BLOCKED',

  /**
   * No data was submitted
   */
  Empty: 'EMPTY',

  /**
   * An invalid project key was used to submit the form
   */
  ProjectNotFound: 'PROJECT_NOT_FOUND',

  /**
   * An invalid form hashid was used to submit the form
   */
  FormNotFound: 'FORM_NOT_FOUND',

  /**
   * File uploads are not supported for this form
   */
  NoFileUploads: 'NO_FILE_UPLOADS',

  /**
   * The form was submitted with too many file attachments
   */
  TooManyFiles: 'TOO_MANY_FILES',

  /**
   *  	One or more files uploaded exceeded the max file size
   */
  FilesTooBig: 'FILES_TOO_BIG',

  /**
   * Field error - A field is required, but no value was provided
   */
  RequiredFieldMissing: 'REQUIRED_FIELD_MISSING',

  /**
   * Field error - A field is required, but a blank or empty string was provided
   */
  RequiredFieldEmpty: 'REQUIRED_FIELD_EMPTY',

  /**
   * Field error - A field should contain an email
   */
  TypeEmail: 'TYPE_EMAIL',

  /**
   *  Field error - A field should contain a number 
   */
  TypeNumeric: 'TYPE_NUMERIC',

  /**
   *  Field error - A field should contain text 
   */
  TypeText: 'TYPE_TEXT',

  /**
   *  Field error - Stripe key missing 
   */
  StripeClientError: 'STRIPE_CLIENT_ERROR',

  /**
   * Field error - Stripe SCA error.
   */
  StripeSCAError: 'STRIPE_SCA_ERROR',
});