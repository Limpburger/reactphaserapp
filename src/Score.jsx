import React, { useState } from 'react';

function Score() {
  const [score, setScore] = useState(0);

  const increaseScore = () => {
    setScore(score + 1);
  };

  return (
    <div>
      <p>Score: {score}</p>
      <button onClick={increaseScore}>Increase Score</button>
    </div>
  );
}

export default Score;
