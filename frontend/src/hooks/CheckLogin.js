import axios from "axios";

const CheckLogin = async () => {
  let val = false;
  let user = {email: ""}
  let err = false;
  try {
    await axios.get("http://localhost:5001/users/get/current/loggedin", { withCredentials: true })
      .then((res) => {
        if (res.status == 200) {
          val = true;
          user = res.data.data
        }
      })
      .catch((error) => {
        err = true;
      });
  } catch (error) {
    err = true
  }

  return {loggedin: val, user, err}
};

export default CheckLogin;
