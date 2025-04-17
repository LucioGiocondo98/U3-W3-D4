import { useSelector, useDispatch } from "react-redux";
import { removeFromFavourite } from "../redux/actions";
import { Container, ListGroup, Button, Alert } from "react-bootstrap";

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites.list);
  const dispatch = useDispatch();

  return (
    <Container className="mt-4">
      <h2>Lista Preferiti</h2>
      <ListGroup>
        {favourites.length === 0 ? (
          <Alert variant="info">No favourites yet.</Alert>
        ) : (
          favourites.map((company, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <span>{company}</span>
              <Button
                variant="danger"
                onClick={() => dispatch(removeFromFavourite(company))}
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Container>
  );
};

export default Favourites;
