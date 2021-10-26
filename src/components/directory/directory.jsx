import React from "react";
import { useSelector } from "react-redux";
import MenuItem from "../menuItem/menuItem.jsx";
import "./directory.scss";

const Directory = () => {
  const useSelectorDirectory = useSelector((state) => state.directory.sections);
  return (
    <div className="directory-menu">
      {useSelectorDirectory.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

export default Directory;
