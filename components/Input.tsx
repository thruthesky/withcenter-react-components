export default function Input({
  type = "text",
  name = "",
  required = false,
  placeholder = "",
  onChange,
  onBlur,
  className = "",
  id = "",
  value,
  defaultValue = "",
  ref,
}: {
  type?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  ref?: React.Ref<HTMLInputElement>;
}) {
  return (
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
  );
}
