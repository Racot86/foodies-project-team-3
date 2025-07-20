import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Tabs.css";

const Tabs = ({ visibleTabs = {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();

  // Build base path depending on whether we're viewing current user or another user
  const basePath = userId ? `/profile/${userId}` : "/profile";

  // Change label based on whether it's current user or another user
  const recipesLabel = userId ? "RECIPES" : "MY RECIPES";

  const tabs = [
    { label: recipesLabel, path: `${basePath}/my-recipes`, key: "myRecipes" },
    { label: "MY FAVORITES", path: `${basePath}/favorites`, key: "favorites" },
    { label: "FOLLOWERS", path: `${basePath}/followers`, key: "followers" },
    { label: "FOLLOWING", path: `${basePath}/following`, key: "following" },
  ];

  return (
    <div className="tabs-container">
      <ul className="tabs-wrapper">
        {tabs.map((tab) =>
          visibleTabs[tab.key] !== false ? (
            <li
              key={tab.key}
              className={`tab ${
                location.pathname === tab.path ? "active" : ""
              }`}
              onClick={() => navigate(tab.path)}
            >
              {tab.label}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default Tabs;
