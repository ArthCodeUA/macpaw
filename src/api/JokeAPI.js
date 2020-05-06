import Constants from "./Constants"

const JokeAPI = {
    getJoke: function (type, successCallback, failCallback) {
        fetch(Constants.API + type, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error " + response.status.toString());
            }
        }).then(data => {
            successCallback(data);
        }).catch(err => {
            failCallback(err);
        });
    }
};

export default JokeAPI;
