import React from 'react';

export default function ResetTodoList({ onReset }) {
  const handleResetClick = () => {
    onReset();
  };

  return (
    <div className='resetButton'>
      <button onClick={handleResetClick}>Reset</button>
    </div>
  );
}
