import React from 'react';

const Protected = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1>Protected Page</h1>
          <p>This is a protected page that requires authentication.</p>
        </div>
      </div>
    </div>
  );
};

export default Protected;