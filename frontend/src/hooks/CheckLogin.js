import axios from "axios";

const CheckLogin = async () => {
  let val = false;
  let user = {}
  try {
    await axios.get("http://localhost:5001/users/get/current/loggedin", { withCredentials: true })
      .then((res) => {
        if (res.status == 200) {
          val = true;
          user = res.data.data
        }
      })
      .catch((err) => {
        val = false;
      });
  } catch (err) {
    val = false;
  }

  return {loggedin: val, user}
};

export default CheckLogin;
