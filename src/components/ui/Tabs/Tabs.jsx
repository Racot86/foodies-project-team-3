import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Tabs.css";

const Tabs = ({ visibleTabs = {} }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { label: "MY RECIPES", path: "/profile/me/my-recipes", key: "myRecipes" },
    { label: "MY FAVORITES", path: "/profile/me/favorites", key: "favorites" },
    { label: "FOLLOWERS", path: "/profile/me/followers", key: "followers" },
    { label: "FOLLOWING", path: "/profile/me/following", key: "following" },
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
