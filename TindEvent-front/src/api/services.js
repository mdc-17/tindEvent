import axios from "axios";

const service = axios.create({
  baseURL: ("http://localhost:4000/upload", `${process.env.REACT_APP_API_URI}/upload`)
  // withCredentials: true //
});
const errorHandler = (err) => {
  console.error(err);
  throw err;
};
export default {
  service,
  handleUpload(theFile) {
    return service
      .post("/upload", theFile)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};