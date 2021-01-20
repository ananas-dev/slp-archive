import React, { useState, useEffect } from "react";
import SlpCard from "./SlpCard";
import Row from "react-bootstrap/Row";
import CardColumns from "react-bootstrap/CardColumns";
import Container from "react-bootstrap/Container";
import useSWR from "swr";

const SlpCardGrid = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/files", fetcher);

  return (
    <Container>
      <Row>
        <CardColumns>
          {data?.map((file, i) => (
            <SlpCard key={i} file={file} />
          ))}
        </CardColumns>
      </Row>
    </Container>
  );
};

export default SlpCardGrid;
