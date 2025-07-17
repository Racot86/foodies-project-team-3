import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Tabs.css";

const Tabs = ({ visibleTabs = {} }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { label: "MY RECIPES", path: "/profile/my-recipes", key: "myRecipes" },
    { label: "MY FAVORITES", path: "/profile/favorites", key: "favorites" },
    { label: "FOLLOWERS", path: "/profile/followers", key: "followers" },
    { label: "FOLLOWING", path: "/profile/following", key: "following" },
  ];

  return (
    <div className="tabs-container">
      {tabs.map((tab) =>
        visibleTabs[tab.key] !== false ? (
          <div
            key={tab.key}
            className={`tab ${
              location.pathname === tab.path ? "active" : ""
            }`}
            onClick={() => navigate(tab.path)}
          >
            {tab.label}
          </div>
        ) : null
      )}
    </div>
  );
};

export default Tabs;
