import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import axios from "axios";
import Moment from "react-moment";

import "./style.css";

const NewsFeedHeader = (props) => {
  return (
    <Row>
      <Col span={18} offset={3}>
        <div className="homeSectionLabel">News</div>
      </Col>
    </Row>
  );
};

const NewsFeedList = (props) => {
  const [rssFeed, setRssFeed] = useState(null);

  const fetchRSSData = async () => {
    try {
      const wolcenNewsData = await axios.get("/api/home/news");
      setRssFeed(wolcenNewsData.data);
    } catch (error) {
      console.error(`Failed to get RSS Feed. ${error.message}`);
    }
  };

  useEffect(() => {
    fetchRSSData();
  }, []);

  return (
    <Row>
      <Col span={18} offset={3}>
        {rssFeed &&
          rssFeed.items.map((item) => {
            return (
              <div key={item.title} className="feedItemContainer">
                <a target="_blank" rel="noopener noreferrer" href={item.link}>
                  <div className="newsFeedData">{item.title}</div>
                </a>
                <div className="feedItemDate">
                  <Moment format="MMM DD[,] YYYY [|] LT">{item.pubDate}</Moment>
                </div>
              </div>
            );
          })}
      </Col>
    </Row>
  );
};

const NewsFeed = () => {
  return (
    <div>
      <NewsFeedHeader />
      <NewsFeedList />
    </div>
  );
};

export default NewsFeed;
