const Incident = require("../../models/incident.model");
const mailer = require("../../email");
require("dotenv").config();

//GET - http://localhost:4000/api/
exports.listOfAllIncidents = function (request, response) {
  const findObj = {}
  if (request.query.status) {
    const inStatusArr = request.query.status === 'all' ? ["open", "closed"] : [request.query.status];
    findObj["warning.status"] = { $in: inStatusArr}
  }
  if (request.query.cinema) {
    findObj["cinema.id"] = request.query.cinema
  }

  return Incident.find(findObj)
    .then((data) => response.send(data))
    .catch((error) => {
      response.json(error);
    });
};

exports.listOfAllCinemas = function (request, response){
  const nameStr = request.params.name
  return Incident.find({
    "cinema.name": {$regex: nameStr},
  })
      .select("cinema")
      .then(data => {
        const resultData = []
        const tmpData = data.filter((element, index, self) => index === self.findIndex(t => (t.cinema.id === element.cinema.id)))
        tmpData.forEach((element) => {
          const id = element.cinema.id;
          const name = element.cinema.name;
          resultData.push({value: id, label: name})
        })
        response.send(resultData)
      })
      .catch(error => {
        response.json(error)
      })
}
//Get a single incident
//GET - http://localhost:4000/api/613e537beff671450347cdaa
exports.singleIncident = function (request, response) {
  return Incident.findOne({ _id: request.params.id })
    .then((data) => response.send(data))
    .catch((error) => {
      response.json(error);
    });
};

//Create a new incident in the DB
//POST - http://localhost:4000/api/
exports.create = function (request, response) {
  Incident.find(
    {
      "cinema.id": request.body.cinema.id,
      "screen.id": request.body.screen.id,
      "assignee.id": request.body.assignee.id,
      "warning.errorCode": request.body.warning.errorCode,
      "warning.status": { $in: ["open", "progress"] },
    },
    (err, obj) => {
      if (obj.length !== 0 && !err) {
        console.log("Incident already exists");
        response.status(409);
        response.send("Incident already exists");
      } else {
        const incident = new Incident({
          cinema: request.body.cinema,
          screen: request.body.screen,
          assignee: request.body.assignee,
          warning: request.body.warning,
        });

        incident
          .save()
          .then((data) => {
            response.send(data);

            let email = {
              from: process.env.EMAIL_FROM,
              to: process.env.EMAIL_TO,
              subject: `Incident for the Cinema ${data.cinema.name}(Id: ${data.cinema.id}) is assigned to you`,
              text: `Incident id ${data._id} is assigned to you\n
              Cinema Name : ${data.cinema.name}\n
              Cinema Id : ${data.cinema.id}\n
              Screen Name : ${data.screen.name}\n
              Screen Id :  ${data.screen.id}\n
              Warning Information\n
              Warning Id : ${data.warning.errorCode}\n 
              Warning Description : ${data.warning.errorDescription}\n
              Could you please fix it ASAP?\n
              Thank you!\n
              Warm Regards\n
              Cinemataztic`,
              html: `<p>Hi,</p>
              <h1>Incident id ${data._id} is assigned to you</h1>
              <p>Cinema Name: <strong>${data.cinema.name}</strong><br/>
              Cinema Id: <strong>${data.cinema.id}</strong> </p>
              <p>Screen Name: <strong>${data.screen.name}</strong><br/>
              Screen Id: <strong>${data.screen.id}</strong> </p>
              <h2>Warning Information</h2>
              <p>Warning Id: <strong>${data.warning.errorCode}</strong><br/>
              Warning description: <strong>${data.warning.errorDescription}</strong></p>
              <p>Could you please fix it ASAP?</p>
              <h3>Warm Regards</h3>
              <p>Cinemataztic</p>`,
            };

            mailer.sendMail(email, function (err, info) {
              if (err) {
                console.log("Error occured :" + err);
              } else {
                console.log("Message sent: " + info.message);
              }
            });
          })
          .catch((error) => {
            response.json(error);
          });
      }
    }
  );
};

//Delete a incident by ID
//DELETE - http://localhost:4000/api/613e537beff671450347cdaa
exports.removeIncidentById = function (request, response) {
  return Incident.deleteOne({ _id: request.params.id })
    .then((data) => response.send(data))
    .catch((error) => {
      response.json(error);
    });
};
