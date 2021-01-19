import Head from 'next/head'
import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";

import SlpUpload from "../components/SlpUpload";
import SlpCardGrid from "../components/SlpCardGrid";

export default function Home() {
  return (
    <Container>
    <Head>
      <Row>
        <Col>
          <h1 className="text-center display-3 header-text"><Badge variant="success">.SLP</Badge> Archive</h1>
          <meta property="og:title" content=".SLP Archive" key="title" />
        </Col>
      </Row>
    </Head>
      <Row>
        <SlpUpload />
      <Row>
        <SlpCardGrid/>
      </Row>
      </Row>
      <Row>
        <Col>
          <Alert variant="danger">
            This is a test prototype, files you upload here may disapear. The server and client code is public on {' '}
            <Alert.Link href="https://github.com/ananas-dev/slp-archive">Github</Alert.Link>
            .
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}
