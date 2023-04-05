

const Select = ({ label, value, options, onChange, onClick, asc }) => {

    const buttonText = asc ? 'down' : 'up'
    return (
        <>
            <label>
                {label}
                <select value={value} onChange={onChange}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </label>
            <button onClick={onClick}>{buttonText} </button>
        </>
    )

}

export default Select