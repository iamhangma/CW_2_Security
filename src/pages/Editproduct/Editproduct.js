import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  UpdateProduct,
} from "../../actions/productActions";
import HashLoader from "react-spinners/HashLoader";
import {
  Input,
  InputGroup,
  Box,
  Checkbox,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";
import "./Editproduct.css";

const Editproduct = ({ match, history }) => {
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [Url1, setUrl1] = useState("");
  const [Url2, setUrl2] = useState("");
  const [Url3, setUrl3] = useState("");

//   const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [category, setCategory] = useState([]);
  const [Menselected, setMenselected] = useState(false);
  const [Womenselected, setWomenselected] = useState(false);
  const [Bagselected, setBagselected] = useState(false);
  const [Watchesselected, setWatchesselected] = useState(false);
  const [Shoesselected, setShoesselected] = useState(false);
  const [Jacketselected, setJacketselected] = useState(false);

  const [Sselected, setSselected] = useState(false);
  const [Mselected, setMselected] = useState(false);
  const [Lselected, setLselected] = useState(false);
  const [XLselected, setXLselected] = useState(false);

  const [message, ] = useState(null);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setUrl1(product.images[0]);
        setUrl2(product.images[1]);
        setUrl3(product.images[2]);
        setCategory(product.category);
        setSizes(product.sizes);
        setCountInStock(product.countInStock);
        setBagselected(product.category.includes("Bag"));
        setJacketselected(product.category.includes("Jacket"));
        setShoesselected(product.category.includes("Shoes"));
        setMenselected(product.category.includes("Men"));
        setWomenselected(product.category.includes("Women"));
        setWatchesselected(product.category.includes("Watches"));
        setSselected(product.sizes.includes("S"));
        setMselected(product.sizes.includes("M"));
        setLselected(product.sizes.includes("L"));
        setXLselected(product.sizes.includes("XL"));
      }
    }
  }, [dispatch, productId, history, product, successUpdate]);

  useEffect(() => {
    setSizes((prevSizes) => {
      const updatedSizes = [...prevSizes];
      if (Sselected && !updatedSizes.includes("S")) updatedSizes.push("S");
      if (Mselected && !updatedSizes.includes("M")) updatedSizes.push("M");
      if (Lselected && !updatedSizes.includes("L")) updatedSizes.push("L");
      if (XLselected && !updatedSizes.includes("XL")) updatedSizes.push("XL");
      return updatedSizes;
    });
  }, [Sselected, Mselected, Lselected, XLselected]);

  useEffect(() => {
    setCategory((prevCategory) => {
      const updatedCategory = [...prevCategory];
      if (Menselected && !updatedCategory.includes("Men"))
        updatedCategory.push("Men");
      if (Womenselected && !updatedCategory.includes("Women"))
        updatedCategory.push("Women");
      if (Bagselected && !updatedCategory.includes("Bag"))
        updatedCategory.push("Bag");
      if (Watchesselected && !updatedCategory.includes("Watches"))
        updatedCategory.push("Watches");
      if (Shoesselected && !updatedCategory.includes("Shoes"))
        updatedCategory.push("Shoes");
      if (Jacketselected && !updatedCategory.includes("Jacket"))
        updatedCategory.push("Jacket");
      return updatedCategory;
    });
  }, [
    Menselected,
    Womenselected,
    Bagselected,
    Watchesselected,
    Shoesselected,
    Jacketselected,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      UpdateProduct({
        _id: productId,
        name,
        price,
        images: [Url1, Url2, Url3],
        category,
        sizes,
        countInStock,
        description,
      })
    );
  };

  const checkboxHandlerSizes = (size) => {
    switch (size) {
      case "S":
        setSselected((prev) => !prev);
        break;
      case "M":
        setMselected((prev) => !prev);
        break;
      case "L":
        setLselected((prev) => !prev);
        break;
      case "XL":
        setXLselected((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const checkboxHandlerCategory = (category) => {
    switch (category) {
      case "Men":
        setMenselected((prev) => !prev);
        break;
      case "Women":
        setWomenselected((prev) => !prev);
        break;
      case "Bag":
        setBagselected((prev) => !prev);
        break;
      case "Watches":
        setWatchesselected((prev) => !prev);
        break;
      case "Shoes":
        setShoesselected((prev) => !prev);
        break;
      case "Jacket":
        setJacketselected((prev) => !prev);
        break;
      default:
        break;
    }
  };

  return (
    <div className="Edituser">
      <Helmet>
        <title>Edit Product</title>
      </Helmet>
      {error && <h4>{error}</h4>}
      {loading || loadingUpdate ? (
        <div className="loading">
          <HashLoader color={"#1e1e2c"} loading={loadingUpdate} size={40} />
        </div>
      ) : errorUpdate ? (
        <h4>{errorUpdate}</h4>
      ) : (
        <div>
          <h4 className="Edittitle">Edit Product :</h4>
          <div className="formedit">
            <form onSubmit={submitHandler}>
              <div>
                <div className="input-div zz">
                  Name :
                  <div className="div">
                    <InputGroup>
                      <Input
                        type="text"
                        value={name}
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </InputGroup>
                  </div>
                </div>

                <div className="input-div one">
                  Price :
                  <div className="div">
                    <InputGroup>
                      <Input
                        type="text"
                        value={price}
                        placeholder="Enter price"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </InputGroup>
                  </div>
                </div>

                <div className="input-div one">
                  Count In Stock :
                  <div className="div">
                    <InputGroup>
                      <Input
                        type="text"
                        value={countInStock}
                        placeholder="Enter count"
                        onChange={(e) => setCountInStock(e.target.value)}
                      />
                    </InputGroup>
                  </div>
                </div>

                <div className="input-div one">
                  Description/Category
                  <div className="div">
                    <Stack direction="column" spacing={4}>
                      <InputGroup>
                        <Textarea
                          size="sm"
                          value={description}
                          placeholder="Enter description"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </InputGroup>
                      <Stack direction="row">
                        <Checkbox
                          onChange={() => checkboxHandlerCategory("Men")}
                          isChecked={Menselected}
                        >
                          Men
                        </Checkbox>
                        <Checkbox
                          onChange={() => checkboxHandlerCategory("Women")}
                          isChecked={Womenselected}
                        >
                          Women
                        </Checkbox>
                        <Checkbox
                          onChange={() => checkboxHandlerCategory("Bag")}
                          isChecked={Bagselected}
                        >
                          Bag
                        </Checkbox>
                        <Checkbox
                          onChange={() => checkboxHandlerCategory("Watches")}
                          isChecked={Watchesselected}
                        >
                          Watches
                        </Checkbox>
                        <Checkbox
                          onChange={() => checkboxHandlerCategory("Shoes")}
                          isChecked={Shoesselected}
                        >
                          Shoes
                        </Checkbox>
                        <Checkbox
                          onChange={() => checkboxHandlerCategory("Jacket")}
                          isChecked={Jacketselected}
                        >
                          Jacket
                        </Checkbox>
                      </Stack>
                    </Stack>
                  </div>
                </div>

                <div className="input-div pass">
                  Sizes:
                  <div className="div">
                    <Stack direction="row">
                      <Checkbox
                        onChange={() => checkboxHandlerSizes("S")}
                        isChecked={Sselected}
                      >
                        S
                      </Checkbox>
                      <Checkbox
                        onChange={() => checkboxHandlerSizes("M")}
                        isChecked={Mselected}
                      >
                        M
                      </Checkbox>
                      <Checkbox
                        onChange={() => checkboxHandlerSizes("L")}
                        isChecked={Lselected}
                      >
                        L
                      </Checkbox>
                      <Checkbox
                        onChange={() => checkboxHandlerSizes("XL")}
                        isChecked={XLselected}
                      >
                        XL
                      </Checkbox>
                    </Stack>
                  </div>
                </div>

                <div className="input-div pass">
                  URLs for images:
                  <div className="div urls">
                    <Box>
                      <Stack direction="column">
                        <Input
                          type="text"
                          value={Url1}
                          onChange={(e) => setUrl1(e.target.value)}
                        />
                        <Input
                          type="text"
                          value={Url2}
                          onChange={(e) => setUrl2(e.target.value)}
                        />
                        <Input
                          type="text"
                          value={Url3}
                          onChange={(e) => setUrl3(e.target.value)}
                        />
                      </Stack>
                    </Box>
                  </div>
                </div>

                {message && <h4 className="Message">{message}</h4>}
                <input
                  type="submit"
                  className="btna2 postionbtnupdate"
                  value="Update"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editproduct;
