import React ,{useState, useEffect}from 'react'
import 'react-bootstrap'
import 'bootstrap'
import "./css/CreateEvent.css";
import Login from "./Login"
import Pagination from "./Pagination"
import { createSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import * as XLSX from "xlsx";
export default function Home() {
  
  const navigate = useNavigate();
  const [data_get, setData] = useState([]);
  const [data, setdata] = useState({});

  const [values, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7); // Set the number of items to display per page
  // Logic to calculate the current items to display based on current page and itemsPerPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data_get.slice(indexOfFirstItem, indexOfLastItem);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const retrieve = async () => {
      const response = await axios.get("http://127.0.0.1:5000/Feed");
      setData(response.data);
    };
    retrieve();
  }, []);
  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleClick = (event) => {
    // window.open("/FORMPDF",{search: createSearchParams (event.target.id).toString()});
    navigate({
      state: {
        pathname: "/EventDetails",
        search: createSearchParams(event.target.id).toString(),
      },
    });
  };
  const handleWishListClick = (event) => {
    axios
      .post("http://127.0.0.1:5000/AddToWishList", { Id: event.target.id })
      .catch((err) => alert(err + " OOPS! BAD REQUEST"));
  };
  if (!accessToken) {
    // return <Login />; // Render the Login component if access token doesn't exist
  }
  return (
    <>
    <div className="container">
        <div className="d-flex flex-row-reverse bd-highlight">
          <p className="form-inline">
            <input
              style={{ marginTop: "5px" }}
              id="searching"
              className="form-control mr-sm-2"
              onChange={(event) => setSearchValue(event.target.value)}
              type="search"
              placeholder="Search"
            />
            <Button
              className="updBtn"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Create Your Event
            </Button>
          </p>
        </div>
        <div className="d-flex flex-row bd-highlight">
          <p className="form-inline"></p>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr
                style={{ fontWeight: "bold", border: "1px" }}
                className="headingTable"
              >
                {/*Id, Events.Title, Events.Description, Events.Poster, Events.Date, Events.Time, Events.Duration, EventCategies.Tag */}
                <td>ID</td>
                <td>Title</td>
                <td>Date</td>
                <td>Time</td>
                <td>WishList</td>
                <td>Event Details</td>
              </tr>
            </thead>
            <tbody>
              {currentItems
                ? currentItems
                    .filter((item) => {
                      if (values === "") {
                        return item;
                      } else if (
                        item[5].toLowerCase().includes(values.toLowerCase())
                      ) {
                        return item;
                      }
                    })
                    .map((item) => (
                      <tr
                        style={{ border: "1px" }}
                        key={item[0]}
                        id={item[0]}
                        onClick={() =>
                          navigate({
                            pathname: "/FORMPDF",
                            search: createSearchParams({
                              courseId: item[0],
                            }).toString(),
                          })
                        }
                        // <td>ID</td>
                        // <td>Title</td>
                        // <td>Date</td>
                        // <td>Time</td>
                        // <td>Event Details</td>
                        //  {/*Id, Events.Title, Events.Description, Events.Poster, Events.Date, Events.Time, Events.Duration, EventCategies.Tag */}
                      >
                        <td className="tableText">{item[0]}</td>
                        <td className="tableText">{item[1]}</td>
                        <td className="tableText">{item[4]}</td>
                        <td className="tableText">{item[5]}</td>
                        <td className="tableText">
                          <button
                            className="showDutyTableBtn"
                            id={item[0]}
                            onClick={handleWishListClick}
                          >
                            Add To WishList
                          </button>
                        </td>
                        <td className="tableText">
                          <button
                            className="showDutyTableBtn"
                            id={item[0]}
                            onClick={handleClick}
                          >
                            Event Details
                          </button>
                        </td>
                      </tr>
                    ))
                : "Loading..."}
            </tbody>
          </table>
          <Pagination
            pageCount={Math.ceil(data_get.length / itemsPerPage)} // Calculate total number of pages
            handlePageChange={handlePageChange} // Pass the handlePageChange function as a prop
          />
        </div>
      </div>
         </>
  )
}
