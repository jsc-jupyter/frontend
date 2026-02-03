import React, { useState } from "react";

// TODO : Implement actual theme switching

const ThemePicker = () => {
  const [theme, setTheme] = useState<string>("light");

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default ThemePicker;
