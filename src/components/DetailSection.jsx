import React from "react";
import Icon from "./Icon";
import { catalogDetailStyles } from "../styles/catalogDetailStyles";

const DetailSection = ({ title, items, iconName = "check-circle" }) => {
  return (
    <div>
      <h4 className={catalogDetailStyles.sectionTitle}>{title}</h4>
      <ul className={catalogDetailStyles.listContainer}>
        {items.map((item, index) => (
          <li key={index} className={catalogDetailStyles.listItem}>
            <Icon name={iconName} className={catalogDetailStyles.icon} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailSection;
