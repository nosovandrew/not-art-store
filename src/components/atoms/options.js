export default function Options({ name, values, selectedOptions, setOptions }) {
    return (
        <fieldset className='text-center'>
            <legend className='mb-2'>{name}</legend>
            <div className='flex items-center justify-center space-x-2'>
                {values.map((value) => {
                    const id = `option-${name}-${value}`;
                    const checked = selectedOptions[name] === value;

                    return (
                        <label key={id} htmlFor={id}>
                            <input
                                className='sr-only'
                                type='radio'
                                id={id}
                                name={`option-${name}`}
                                value={value}
                                checked={checked}
                                onChange={() => {
                                    setOptions(name, value);
                                }}
                            />
                            <div
                                className={`p-1 mx-2 block cursor-pointer ${
                                    checked
                                        ? 'text-white bg-black'
                                        : 'text-black bg-ivory'
                                }`}
                            >
                                <span className='px-2'>{value}</span>
                            </div>
                        </label>
                    );
                })}
            </div>
        </fieldset>
    );
}
