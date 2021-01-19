import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Stages from "../public/static/data/stages";
import axios from "axios";
import Image from 'next/image';

const SlpCardGrid = () => {
  const [fileInfos, setFileInfos] = useState([]);

  const stageNameFromId = (id) => {
    for (const i of Stages) {
      if (i.id === String(id))
        return i.name
    }
  }

  useEffect(() => {
    axios.get("api/files").then(response => setFileInfos(response.data));
  }, []);

  const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, day, year].join('/');
  }

  const getTimeFromFrame = (lastFrame, fps) => {
    let minutes = Math.floor(lastFrame/fps/60);
    let seconds = Math.floor(lastFrame/fps - minutes * 60);
    return minutes + ":" + seconds;
  }
  return(
    <Container>
      <Row>
        <CardColumns>
          {fileInfos && fileInfos.map((file, index) => (
            <Card className="text-center">
              <Card.Img variant="top" src={"static/images/stages/" + stageNameFromId(file.settings.stageId) + ".png"} />
              <Card.Body>
                <Card.Title>
                  <Badge className="user-badge" variant="danger">
                    <img className="stock-icon" alt="Stock Icon P1" src={"static/images/characters/" + file.settings.players[0].characterId + "/" + file.settings.players[0].characterColor + "/stock.png"}/>
                    {file.metadata.players[0].names.code}
                  </Badge>
                  <small className="text-muted">vs</small>
                  <Badge className="user-badge" variant="info">
                    {file.metadata.players[1].names.code}
                    <img className="stock-icon" alt="Stock Icon P2" src={"static/images/characters/" + file.settings.players[1].characterId + "/" + file.settings.players[0].characterColor + "/stock.png"}/>
                  </Badge>
                </Card.Title>
                <Card.Text>
                  <small className="text-muted">{formatDate(file.metadata.startAt) + " • " + getTimeFromFrame(file.metadata.lastFrame, 60)}</small>
                </Card.Text>
                <Card.Link className="stretched-link" href={file.url}></Card.Link>
              </Card.Body>
            </Card>
          ))}
        </CardColumns>
      </Row>
    </Container>
  )
}

export default SlpCardGrid;