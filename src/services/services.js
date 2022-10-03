const { net } = require("electron");
function Services(){
  const endPoint = "https://integration.relogtechnology.com/occurrences-app/api";
  const endPointReposts = "https://relogtechnology.com/api/reports/general_info?family=";

  Services.prototype.Auth = async function (params) {
    let response;
    const body = JSON.stringify(params);
    const request = net.request({
      method: "POST",
      url: `${endPoint}/users/sign_in`
    });
    request.setHeader("Content-Type", "application/json");
    request.write(body, "utf-8");
    request.end();
    await new Promise((resolve, reject) => {
      request.on("response", (res) => {
        res.on("data", (data) => {
          data = JSON.parse(`${data}`);
          response = Object.assign(data,{status: res.statusCode});
          resolve();
        });
      })
    });
    return response;
  }
};

module.exports = Services;