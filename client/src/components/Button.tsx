import React, {MouseEvent, memo, useCallback} from 'react';

const Button: React.FC<any> = ({ onClick, id, disabled, children }) => {
	const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onClick(id);
	}, []);

	return (
		<button onClick={handleClick} disabled={disabled}>{children}</button>
	)
}

export default memo(Button);
