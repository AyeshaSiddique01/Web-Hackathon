import React ,{useState, useEffect}from 'react'
import 'react-bootstrap'
import 'bootstrap'
import "./css/CreateEvent.css";
import Login from "./Login"
import { createSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import * as XLSX from "xlsx";
export default function 
() {
    const [data_get, setData] = useState([]);
    const navigate = useNavigate();
    const [values, setSearchValue] = useState("");
  
    const [selectedFile, setSelectedFile] = useState(null);
    const [data, setdata] = useState({});
    const [selectedeventDate, setEventDate] = useState("");
    const [selectedeventDesc, setEventDesc] = useState("");
    const [allCats, setAllCats] = useState([]);
    const [selectedCats, setSelectedCats] = useState("");
    const [selectedrecursive, setRecursive] = useState("");
    const [selectedtitle, setTitle] = useState("");
    const [selectedtime, setTime] = useState("");
    const accessToken = localStorage.getItem("access_token");
    useEffect(() => {
        const retrieve = async () => {
          const response = await axios.get("http://127.0.0.1:5000/allCategories");
          setAllCats(response.data);
        };
        retrieve();
      }, []);
    
      function OnSubmit()
      {
        const url = "http://127.0.0.1:5000/createEvent";
    var List = [];
    List.push(
      selectedCats,
      selectedeventDate,
      selectedeventDesc,
      selectedrecursive,
      selectedtitle,
      selectedtime
    );
    axios
      .post(url, List)
      .then((res) => {
        const responseData = res.data;
        navigate("/home");
      })
      .catch((err) => alert(err + " OOPS! BAD REQUEST"));
      }

    function showOpenFileDialog() {
        var input = document.createElement("input");
        input.type = "file";
        input.onchange = (e) => {
          let files = input.files;
          setSelectedFile(files[0].name);
          const file = e.target.files[0];
          addfile(e);
        };
        input.click();
      }
      function addfile(event) {
        let file = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (event) => {
          let arrayBuffer = fileReader.result;
          var workbook = XLSX.read(arrayBuffer, { type: "binary" });
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
          var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
          setdata(arraylist);
        };
      }
      function uploadFile() {
        const url = "http://127.0.0.1:5000/getDataFromReact";
        const progressing = document.getElementById("progressbarvalue");
        const progressblue = document.getElementById("progressBlue");
        var formData = new FormData();
        formData.append("fileName", JSON.stringify(selectedFile));
        formData.append("ArrayList", JSON.stringify(data));
        const config = {
          onUploadProgress: function (progressEvent) {
            const percentCompleted =
              Math.round(progressEvent.loaded / progressEvent.total) * 100;
            progressblue.setAttribute("value", percentCompleted);
            progressing.textContent = percentCompleted;
            if (percentCompleted === 100) {
              progressing.textContent = "Upload Completed!";
            }
          },
        };
        axios
          .post(url, formData, config)
          .then((res) => console.log(res))
          .catch((err) => alert(err + "  OOPS! BAD REQUEST  "));
      }
      if (!accessToken) {
        // return <Login />; // Render the Login component if access token doesn't exist
      }
  return (
    <>
    <div className = "CE" >
        <div className="testbox">
            <form >
                <div className="banner">
                    <div className="words word-1">
                        <span>C</span>
                        <span>R</span>
                        <span>E</span>
                        <span>A</span>
                        <span>T</span>
                        <span>E</span>
                    </div>
                    
                    <div className="words word-2">
                    <span>Y</span>
                    <span>O</span>
                    <span>U</span>
                    <span>R</span>
                    </div>
                    
                    <div className="words word-3">
                    <span>E</span>
                    <span>V</span>
                    <span>E</span>
                    <span>N</span>
                    <span>T</span>
                    </div>
                </div>
                <div className="item">
                    <p>Date of Event</p>
                    <input type="date" name="bdate" onChange={(e) => setEventDate(e.target.value)} required />
                    <i className="fas fa-calendar-alt"></i>
                </div>
                <div className="item">
                    <p>Time of Event</p>
                    <input type="time" name="name" onChange={(e) => setTime(e.target.value)}/>
                    <i className="fas fa-clock"></i>
                </div>
                {/* <!-- <div className="item">
                    <p>Select Artist</p>
                    <select>
                        <option value=""></option>
                        <option value="1">*Please select*</option>
                        <option value="2">Artist 1</option>
                        <option value="3">Artist 2</option>
                        <option value="4">Artist 3</option>
                        <option value="5">Artist 4</option>
                    </select>
                </div> --> */}
                <div className="item">
                    <p>Description of Event</p>
                    <textarea rows="3" onChange={(e) => setEventDesc(e.target.value)}></textarea>
                </div>
                {/* <!-- <div className="item">
                    <p>Promoter's Name</p>
                    <input type="text" name="name" />
                </div> --> */}
                <div className="item">
                    <p>Title</p>
                    <input type="text" name="name" onChange={(e) => setTitle(e.target.value)}/>
                </div>
                {/* <div className="item">
                    <p>Venue Address</p>
                    <input type="text" name="name" placeholder="Street address" />
                    <input type="text" name="name" placeholder="Street address line 2" />
                    <div className="city-item">
                        <input type="text" name="name" placeholder="City" />
                        <input type="text" name="name" placeholder="Region" />
                        <input type="text" name="name" placeholder="Postal / Zip code" />
                        <select>
                            <option value="">Country</option>
                            <option value="1">Pakistan</option>
                            <option value="2">Germany</option>
                            <option value="3">France</option>
                            <option value="4">Armenia</option>
                            <option value="5">USA</option>
                        </select>
                    </div>
                </div> */}
                <div className="item">
                    <p>Total Seats of the Event</p>
                    <input type="number" name="capacity" />
                </div>
                {/* <div className="item">
                    <p>Expected Attendance</p>
                    <input type="text" name="name" />
                </div>  */}
                <div className="item"  value={selectedCats}
                          name="Categories"
                          onChange={(event) =>
                            setSelectedCats(event.target.value)
                          }>
                    <p>Category of the event</p>
                    {allCats.map((num, index) => {
                      return (
                        <option key={index} value={num}>
                          {num}
                        </option>
                      );
                    })}
                </div>
                <div>
                <button
                type="button"
                className="btn btn-secondary"
                data-toggle="modal"
                data-target="#exampleModal"
                style={{ margin: 8 }}
            >
                Upload Event Poster
            </button>
                </div>
                <div className="question">
                    <p>Will this event be one Day or recursive?</p>
                    <div className="question-answer">
                        <div>
                            <input type="radio" value="none" id="radio_1" name="recorded" onChange={(e) => setRecursive(e.target.value)}/>
                            <label for="radio_1" className="radio"><span>One Day</span></label>
                        </div>
                        <div>
                            <input type="radio" value="none" id="radio_2" name="recorded" onChange={(e) => setRecursive(e.target.value)}/>
                            <label for="radio_2" className="radio"><span>Recursive</span></label>
                        </div>

                    </div>
                </div>
                <div className="btn-block">
                    <button type="submit" onClick = {OnSubmit}>SEND</button>
                </div>
            </form>
        </div>
    </div>
    <div
    className="modal fade"
    id="exampleModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Upload Image
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <label>Upload Your File </label>
          <div className="container" id="modell">
            <div id="browsing">
              <h1>
                <i className="fa fa-download" aria-hidden="true"></i>
              </h1>
              <button
                className="btn btn-primary"
                onClick={showOpenFileDialog}
              >
                Import Data
              </button>
            </div>
          </div>
          <div>
            <p>Your File Name: {selectedFile} </p>
          </div>
          <div>
            <label id="progressbarvalue" htmlFor="progressBar">
              0 %
            </label>
            <progress id="progressBlue" value="0" max="100"></progress>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button className="btn btn-primary" onClick={uploadFile}>
            Upload
          </button>
        </div>
      </div>
    </div>
    </div>
    </>
//     <div>
//     <title>Entertainment Booking Form</title>
//     <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />
//     <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous" />
//     <link rel="stylesheet" href="EventForm.css" />  
//     <div className="testbox">
//       <form action="/">
//         <div className="banner">
//           <div className="words word-1">
//             <span>C</span>
//             <span>R</span>
//             <span>E</span>
//             <span>A</span>
//             <span>T</span>
//             <span>E</span>
//           </div>
//           <div className="words word-2">
//             <span>Y</span>
//             <span>O</span>
//             <span>U</span>
//             <span>R</span>
//           </div>
//           <div className="words word-3">
//             <span>E</span>
//             <span>V</span>
//             <span>E</span>
//             <span>N</span>
//             <span>T</span>
//           </div>
//         </div>
//         <div className="item">
//           <p>Date of Event</p>
//           <input type="date" name="bdate" />
//           <i className="fas fa-calendar-alt" />
//         </div>
//         <div className="item">
//           <p>Time of Event</p>
//           <input type="time" name="name" />
//           <i className="fas fa-clock" />
//         </div>
//         {/* <div class="item">
//             <p>Select Artist</p>
//             <select>
//                 <option value=""></option>
//                 <option value="1">*Please select*</option>
//                 <option value="2">Artist 1</option>
//                 <option value="3">Artist 2</option>
//                 <option value="4">Artist 3</option>
//                 <option value="5">Artist 4</option>
//             </select>
//         </div> */}
//         <div className="item">
//           <p>Description of Event</p>
//           <textarea rows={3} defaultValue={""} />
//         </div>
//         {/* <div class="item">
//             <p>Promoter's Name</p>
//             <input type="text" name="name" />
//         </div> */}
//         <div className="item">
//           <p>Venue Name</p>
//           <input type="text" name="name" />
//         </div>
//         <div className="item">
//           <p>Venue Address</p>
//           <input type="text" name="name" placeholder="Street address" />
//           <input type="text" name="name" placeholder="Street address line 2" />
//           <div className="city-item">
//             <input type="text" name="name" placeholder="City" />
//             <input type="text" name="name" placeholder="Region" />
//             <input type="text" name="name" placeholder="Postal / Zip code" />
//             <select>
//               <option value>Country</option>
//               <option value={1}>Pakistan</option>
//               <option value={2}>Germany</option>
//               <option value={3}>France</option>
//               <option value={4}>Armenia</option>
//               <option value={5}>USA</option>
//             </select>
//           </div>
//         </div>
//         <div className="item">
//           <p>Total Seats of the Event</p>
//           <input type="text" name="name" />
//         </div>
//         {/* <div class="item">
//             <p>Expected Attendance</p>
//             <input type="text" name="name" />
//         </div> */}
//         <div className="item">
//           <p>Category of the event</p>
//           <select>
//             <option value />
//             <option value={1}>*Please select*</option>
//             <option value={2}>IT Seminar</option>
//             <option value={3}>Musical drama</option>
//             <option value={2}>Theatre</option>
//             <option value={2}>Concert</option>
//             <option value={2}>Medical</option>
//           </select>
//         </div>
//         <div className="item">
//           <p>Set Time (in minutes)</p>
//           <input type="text" name="name" />
//         </div>
//         <div className="item">
//           <p>Contact Person</p>
//           <div className="name-item">
//             <input type="text" name="name" placeholder="First" />
//             <input type="text" name="name" placeholder="Last" />
//           </div>
//         </div>
//         <div className="item">
//           <p>Contact Email</p>
//           <input type="text" name="name" />
//         </div>
//         <div className="item">
//           <p>Contact Number</p>
//           <input type="text" name="name" />
//         </div>
//         <div className="question">
//           <p>Will this event be one Day or recursive?</p>
//           <div className="question-answer">
//             <div>
//               <input type="radio" defaultValue="none" id="radio_1" name="recorded" />
//               <label htmlFor="radio_1" className="radio"><span>One Day</span></label>
//             </div>
//             <div>
//               <input type="radio" defaultValue="none" id="radio_2" name="recorded" />
//               <label htmlFor="radio_2" className="radio"><span>Recursive</span></label>
//             </div>
//           </div>
//         </div>
//         <div className="btn-block">
//           <button type="submit" href="/">SEND</button>
//         </div>
//       </form>
//     </div>
//   </div>
  )
}

// var MyClass = React.createClass({
//     render: function() {
//       return (
      
//       );
//     }
//   });