import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../redux/actions";

const MainSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jobs = useSelector((state) => state.research.results);
  const isLoading = useSelector((state) => state.research.isLoading);
  const error = useSelector((state) => state.research.error);

  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchJobs(""));
  }, [dispatch]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchJobs(query));
  };

  return (
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1>Remote Jobs Search</h1>
          <Button onClick={() => navigate("/favourites")}>Favourites</Button>
        </Col>

        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="Type and press Enter"
            />
          </Form>
        </Col>

        <Col xs={10} className="mx-auto mb-5">
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : jobs.length > 0 ? (
            jobs.map((jobData) => <Job key={jobData._id} data={jobData} />)
          ) : (
            <Alert variant="warning">No jobs found.</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
