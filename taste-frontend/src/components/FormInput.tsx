import React from "react";

type Props = {
	label: string;
	helpText?: string;
	error?: string;
	onChange: (value: string) => void;
	value?: string;
	className?: string;
};

const FormInput = ({
	label,
	helpText,
	error,
	onChange,
	value,
	className,
}: Props) => {
	return (
		<div className={className}>
			<div className="mb-2">{label}</div>
			<input
				onChange={(e) => onChange(e.currentTarget.value)}
				className="ring-0 outline-none bg-gray-50 rounded-md border-gray-100 border-2 py-2 px-3 mb-1 w-full"
			/>
			{helpText && <div className="text-gray-500 text-sm">{helpText}</div>}
		</div>
	);
};

export default FormInput;
