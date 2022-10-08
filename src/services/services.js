const axios = require('axios');

function Services(){
  const endPoint = "https://integration.relogtechnology.com/occurrences-app/api";
  const endPointReposts = "https://relogtechnology.com/api";

  Services.prototype.Auth = async function (params) {
    const response = await axios.post(`${endPoint}/users/sign_in`, params )
    .catch(function (error) {
      throw Error(error);
    })
    return response;
  }

  Services.prototype.reportsAuth = async function (params) {
    const response = await axios.post(`${endPointReposts}/users/sign_in`, params )
    .catch(function (error) {
      throw Error(error);
    })
    return response;
  }

  Services.prototype.reportsSettings = async function (accessToken) {
    const response = await axios.get(`${endPointReposts}/settings`,{
      headers: {
        'Authorization': accessToken
      }
    })
    .catch(function (error) {
      throw Error(error);
    })
    return response;
  }

  Services.prototype.reportsGeneralInfo = async function (accessToken) {
    const response = await axios.get(`${endPointReposts}/reports/general_info`,{
      headers: {
        'Authorization': accessToken
      }
    })
    .catch(function (error) {
      throw Error(error);
    })
    return response;
  }

  Services.prototype.filtedGeneralInfo = async function (generalInfo, settings){
    return true ;
  }
};

module.exports = Services;