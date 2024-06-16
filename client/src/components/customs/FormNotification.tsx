import { Errors } from '../../hooks/useEditAccount.ts';

const FormNotification = ({
  errors,
  success,
}: {
  errors: Errors;
  success: boolean;
}) => {
  const showErrors = Object.keys(errors).length > 0;

  return (
    <div>
      {showErrors && (
        <div className="w-full flex flex-col p-7 border border-red-500 mt-4 text-red-500 rounded-2xl break-words">
          {Object.entries(errors).map(([key, message], index) => (
            <p className="text-sm" key={index}>
              {key}: {message}
            </p>
          ))}
        </div>
      )}
      {success && (
        <div className="w-full flex flex-col p-7 border border-green-500 mt-4 text-green-500 rounded-2xl break-words">
          <p className="text-sm">Change successful!</p>
        </div>
      )}
    </div>
  );
};

export default FormNotification;
