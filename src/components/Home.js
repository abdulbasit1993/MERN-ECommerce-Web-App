import { Component } from "react";
import AppNavbar from "./AppNavbar";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getItems } from "../store/actions/itemActions";
import { addtoCart } from "../store/actions/cartActions";

class Home extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    addtoCart: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  onAddToCart = async (id, productId) => {
    await this.props.addtoCart(id, productId, 1);
    alert("Item added to Cart");
  };

  render() {
    const { items } = this.props.item;
    const user = this.props.user;
    return (
      <div>
        <AppNavbar />
        <Container>
          <div className="row">
            {items.map((item) => (
              <div className="col-md-4">
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle tag="h5">{item.title}</CardTitle>
                    <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                    <CardText>{item.category}</CardText>
                    {this.props.isAuthenticated ? (
                      <Button
                        color="success"
                        size="sm"
                        onClick={this.onAddToCart.bind(
                          this,
                          user._id,
                          item._id
                        )}
                      >
                        Add To Cart
                      </Button>
                    ) : null}
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStatetoProps, { getItems, addtoCart })(Home);
