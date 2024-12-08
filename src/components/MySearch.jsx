import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react"
import { Form, Col, Row, Button } from "react-bootstrap"

function MySearch ({query, onSearchChange, onSearchClick}){
    return (
    <Row >
      <Col xs={12} md={10} >
        <Form.Group>
          <Form.Control
            type="search"
            placeholder="Cerca una città"
            value={query}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Form.Group>
      </Col>
      <Col xs={12} md={2} >
        <Button style={{backgroundColor: "#6ec5e2", border: "none"}} className='mt-2 mt-md-0' onClick={onSearchClick}>
          Cerca
        </Button>
      </Col>
    </Row>
    )
}

export default MySearch

