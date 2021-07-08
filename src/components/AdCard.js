import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import "../assets/adCard.css";

const AdCard = ({ id, name, img, price, category, date }) => {
  const history = useHistory();

  return (
    <Box
      component="div"
      className="picks"
      onClick={() => history.push(`/ad/${id}`)}
    >
      <figure>
        <div className="productImage">
          <img src={img} alt={name} />
        </div>
        <figcaption>
          <div className="first">
            <span className="price">Rs.{price}</span>
            <Typography
              variant="body2"
              className="date"
              style={{ marginTop: "4.5px" }}
            >
              {date}
            </Typography>
          </div>
          <div className="second">
            <Typography variant="subtitle1" className="adTitle">
              {name}
            </Typography>
          </div>
          <div className="productCategory">
            <Typography variant="body2">Category: {category}</Typography>
          </div>
        </figcaption>
      </figure>
    </Box>
  );
};

export default AdCard;
