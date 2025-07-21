import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Tabs.css";

const Tabs = ({ visibleTabs = {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef({});

  // Build base path depending on whether we're viewing current user or another user
  const basePath = userId ? `/profile/${userId}` : "/profile";

  // Define different tabs based on whether it's current user or another user
  const tabs = [
    // Show "MY RECIPES" tab only for current user, "RECIPES" tab only for other users
    ...(userId
      ? [{ label: "RECIPES", path: `${basePath}/my-recipes`, key: "recipes" }]
      : [{ label: "MY RECIPES", path: `${basePath}/my-recipes`, key: "myRecipes" }]
    ),
    { label: "MY FAVORITES", path: `${basePath}/favorites`, key: "favorites" },
    { label: "FOLLOWERS", path: `${basePath}/followers`, key: "followers" },
    { label: "FOLLOWING", path: `${basePath}/following`, key: "following" },
  ];

  // Filter visible tabs
  const visibleTabsList = tabs.filter(tab => visibleTabs[tab.key] !== false);

  // Update indicator position when location changes
  useEffect(() => {
    const updateIndicator = () => {
      const activeTab = visibleTabsList.find(tab => location.pathname === tab.path);
      if (activeTab && tabsRef.current[activeTab.key]) {
        const tabElement = tabsRef.current[activeTab.key];
        const { offsetLeft, offsetWidth } = tabElement;

        setIndicatorStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
          opacity: 1
        });
      } else {
        // If no active tab is found, hide the indicator
        setIndicatorStyle({ opacity: 0 });
      }
    };

    // Delay the initial update slightly to ensure DOM is fully rendered
    const timer = setTimeout(updateIndicator, 50);

    // Add resize listener to handle window size changes
    window.addEventListener('resize', updateIndicator);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [location.pathname, visibleTabsList]);

  return (
    <div className="tabs-container">
      <ul className="tabs-wrapper">
        {visibleTabsList.map((tab) => (
          <li
            key={tab.key}
            ref={el => tabsRef.current[tab.key] = el}
            className={`tab ${
              location.pathname === tab.path ? "active" : ""
            }`}
            onClick={() => navigate(tab.path)}
          >
            {tab.label}
          </li>
        ))}
        <div className="tab-indicator" style={indicatorStyle}></div>
      </ul>
    </div>
  );
};

export default Tabs;
