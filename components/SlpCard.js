import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import SlpCardThumbnail from "./SlpCardThumbnail";
import formatDate from "../util/formatDate";
import stageNameFromId from "../util/stageNameFromId";
import getTimeFromFrame from "../util/getTimeFromFrame";

const SlpCard = ({ file }) => {
  const { settings, metadata } = file;

  return (
    <Card className="text-center">
      <Card.Body>
        <SlpCardThumbnail
          players={settings.players}
          stage={stageNameFromId(settings.stageId)}
        />
        <Card.Title>
          <Badge className="user-badge" variant="danger">
            <img
              className="stock-icon"
              alt="Stock Icon P1"
              src={
                "static/images/characters/" +
                settings.players[0].characterId +
                "/" +
                settings.players[0].characterColor +
                "/stock.png"
              }
            />
            {metadata.players[0].names.code}
          </Badge>
          <small className="text-muted">vs</small>
          <Badge className="user-badge" variant="info">
            {metadata.players[1].names.code}
            <img
              className="stock-icon"
              alt="Stock Icon P2"
              src={
                "static/images/characters/" +
                settings.players[1].characterId +
                "/" +
                settings.players[0].characterColor +
                "/stock.png"
              }
            />
          </Badge>
        </Card.Title>
        <Card.Text>
          <small className="text-muted">
            {formatDate(metadata.startAt) +
              " • " +
              getTimeFromFrame(metadata.lastFrame, 60)}
          </small>
        </Card.Text>
        <Card.Link className="stretched-link" href={file.url}></Card.Link>
      </Card.Body>
    </Card>
  );
};

export default SlpCard;
