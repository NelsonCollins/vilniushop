// import React, {useState, useEffect} from 'react';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import  {useDispatch, useSelector} from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import {listProductDetails} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
// import products from '../products';
// import axios from 'axios';
 

function ProductScreen() {
    let { id } = useParams();
    let navigate = useNavigate();
    // const [product, setProduct] = useState({})

    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    useEffect(() => {

        dispatch(listProductDetails(id))
    //     const fetchProduct = async () => {
    //     //   const { data } = await axios.get(`/api/products/${id}`)
    //     const { data } = await axios.get(`/api/products/${id}`)
          
    //     //   setProduct(data)
    //     }
        
    //     // fetchProduct()
    //  }, [id])
    },[dispatch, id])
    
    //const product = products.find((p) => p._id === id);

    
const addToCatHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
}

    return <>
    <Link className='btn btn-dark my-3' to='/'>
        Go Back
    </Link>
   
    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Row>
        <Col md={6}> 
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
            
        <Col md={3}>
        <ListGroup variant='flush'>
                <ListGroupItem>
                    <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                    <Rating 
                    value={product.name} 
                    text={`${product.numReviews} reviews`} />  
                </ListGroupItem>
                <ListGroupItem>
                    Price: €{product.price}
                </ListGroupItem>
                <ListGroupItem>
                    Description: {product.description}
                </ListGroupItem>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <Row>
                            <Col>Price:</Col>
                            <Col>
                                <strong>€{product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                            </Col>
                        </Row>
                    </ListGroupItem>

                    {product.countInStock > 0 && (
                        <ListGroupItem>
                            <Row>
                                <Col>Qty</Col>
                                <Col>
                                    <Form.Control as='select' value={qty}
                                    onChange={(e) => setQty(e.target.value)}>
                                    
                                      { [...Array(product.countInStock).keys()].map(x => (
                                           <option key={x+1} value={x + 1}>
                                               {x + 1}
                                           </option>
                                       )) }
                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    )}

                    <ListGroupItem>
                            <Button onClick={addToCatHandler}
                            className='btn-block' type='button' disabled={product.countInStock === 0}>
                                Add To Cart
                            </Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    )}

 
    </>
}

export default ProductScreen;
