fetch("travel_recommendation_api.json")
  .then((Response) => Response.json())
  .then((data) => console.log(data.beaches[0]));
