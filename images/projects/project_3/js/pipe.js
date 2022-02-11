function isFunction(functionToCheck) {
	return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

const pipe = (value, ...funcs) => {
    let tempValue = value;

    try {
        for (let i = 0; i < funcs.length; i++) {
            if (isFunction(funcs[i])) {
                tempValue = funcs[i](tempValue);
            } else {
                throw new Error(`Provided argument at position ${i} is not a function!`);
            }
        }
        return tempValue;
    } catch(err) {
        alert(err.message);
        throw new Error(err.message);
    } 
};