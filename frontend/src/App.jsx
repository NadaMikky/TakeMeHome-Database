import React, { useEffect } from 'react';


function App() {
  useEffect(() => {
    fetch('http://localhost:8081/Users')
      .then(res => res.json())
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
    </div>
  );
}

export default App;