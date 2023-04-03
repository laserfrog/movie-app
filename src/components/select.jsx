const Select = ({ label, value, options, onChange, onClick }) => {
    return (
        <label>
            {label}
            <select onClick={onClick} value={value} onChange={onChange}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    )

}

export default Select