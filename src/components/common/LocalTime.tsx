"use client";

import React, { useState, useEffect } from "react";

const LocalTime = () => {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const formatted = new Date().toLocaleTimeString("en-US", options);
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-sans text-xs font-bold text-orange-400 tracking-[0.35em] uppercase whitespace-nowrap">
      NEW DELHI, INDIA Â· {timeStr}
    </span>
  );
};

export default LocalTime;

