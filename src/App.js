import BlogDetails from "./BlogDetails";
import Create from "./Create";
import Home from "./Home";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import UpdateBlog from "./UpdateBlog";
import Testing from "./Testing";
import Testing2 from "./Testing2";
import Testing3 from "./Testing3";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/blogs/:id" element={<BlogDetails />}></Route>
            <Route path="/update/:id" element={<UpdateBlog />}></Route>
            <Route path="/testing" element={<Testing />}>
              <Route path="testing2" element={<Testing2 />} />
              <Route path="testing3" element={<Testing3 />} />
            </Route>
            {/* <Route path="*" element={<NotFound />}></Route> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
