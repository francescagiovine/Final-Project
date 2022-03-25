import React, { useState } from "react";

export default function Home() {
  const [name, setName] = useState("GFG");

  // HandleChange method to update the states
  const handleChange = () => {};

  return (
    <div>
      <form>
        <input value={name} onChange={handleChange} />
      </form>
    </div>
  );
}
