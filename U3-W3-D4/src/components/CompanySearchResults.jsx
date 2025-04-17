import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import Job from "./Job";
import { useParams } from "react-router-dom";

const CompanySearchResults = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  const baseEndpoint =
    "https://strive-benchmark.herokuapp.com/api/jobs?company=";

  useEffect(() => {
    getJobs();
  }, [params.companyName]);

  const getJobs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(baseEndpoint + params.companyName);
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
      } else {
        setError("Error fetching results");
      }
    } catch (error) {
      setError("An error occurred while fetching data.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : jobs.length === 0 ? (
            <Alert variant="warning">No jobs found for this company.</Alert>
          ) : (
            jobs.map((jobData) => <Job key={jobData._id} data={jobData} />)
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanySearchResults;
