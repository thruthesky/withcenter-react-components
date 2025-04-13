/**
 * Input component for text input fields.
 *
 * @param params - The props for the Input component.
 * @param params.type - The type of the input field (default: "text").
 * @param params.name - The name of the input field.
 * @param params.required - Whether the input field is required (default: false).
 * @param params.label - The label for the input field.
 *   - if label is not provided, the placeholder or name will be used as the label.
 * @param params.placeholder - The placeholder text for the input field.
 * @param params.onChange - The function to call when the input value changes.
 * @param params.onBlur - The function to call when the input field loses focus.
 * @param params.className - Additional CSS classes for the input field.
 * @param params.id - The id of the input field.
 * @param params.value - The controlled value of the input field.
 * @param params.defaultValue - The default value of the input field.
 * @param params.errorMessage - The error message to display if there is an error.
 * @param params.ref - The ref for the input field.
 * @returns
 */
export default function Input({
  type = "text",
  name = "",
  required = false,

  label = "",
  placeholder = "",
  onChange,
  onBlur,
  className = "",
  id = "",
  value,
  defaultValue = "",
  errorMessage,
  ref,
}: {
  type?: string;
  name?: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  errorMessage?: string;
  ref?: React.Ref<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col mb-4">
      <label>
        <p>{label || placeholder || name}</p>
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          id={id}
          className={`border border-gray-300 rounded-md px-4 py-2 ${className}`}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </label>
    </div>
  );
}
