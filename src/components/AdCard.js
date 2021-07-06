import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import "../assets/adCard.css";

const AdCard = ({ name, img, price, category, date }) => {
  return (
    <Box component="div" className="picks">
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
          <div class="second">
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
