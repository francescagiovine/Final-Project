import { object } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      name: null,
      //timeline: {},
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      getUser: () => {
        fetch(process.env.BACKEND_URL + "/api/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            setStore({ name: data.name });
          });
      },
      getMessage: () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        // fetching data from the backend

        fetch(process.env.BACKEND_URL + "/api/hello", opts)
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      getSingleTravel: (id) => {
        fetch(process.env.BACKEND_URL + "/travel/".concat(id)).then(
          (response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.log(error);
            }
          }
        );
      },

      getTravelActivities: (id) => {
        fetch(process.env.BACKEND_URL + "/getActivitiesByTravel/".concat(id)).then(
          (response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.log(error);
            }
          }
        );
      },


      syncTokenSessionStore: () => {
        const token = sessionStorage.getItem("token");
        console.log("token stored");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },

      logout: () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("travel");
        console.log("log out");
        setStore({ token: null });
        setStore({ name: null });
        setStore({ email: null });
        setStore({ id: null });
        setStore({ travel: null });
      },
      //fetch para timeline

      //timeline: async() => {
      //const response = await fetch("https://3001-francescagiovin-finalpro-k48xhblu4u0.ws-eu34.gitpod.io/api/timelinehttps://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=&font=Default&lang=en&initial_zoom=1&height=300");
      //const data = await response.json();
      //setStore({timeline : data})
      //},




      //traer el fetch del login aqui (como hice antes)
      login: async (email, password) => {
        try {
          if (email === "" || password === "") {
            setMissingField("Please enter all the fields");
          } else {
            const response = await fetch(
              process.env.BACKEND_URL + "/api/login",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password }),
              }
            );

            if (response.status != 200) {
              alert("invalid user or password");
              return false;
            }
            const responseFromApi = await response.json(); //puedo cambiar la alerta por una funcion que suelte un html y así homogeneizar las alertas
            console.log("response from API", responseFromApi);
            sessionStorage.setItem("name", responseFromApi.name);
            sessionStorage.setItem("token", responseFromApi.token);
            sessionStorage.setItem("email", responseFromApi.email); //con esto podemos recuperar el email y el nombre directamente en el front sin tener que hacer llamada
            sessionStorage.setItem("id", responseFromApi.id);
            setStore({
              name: responseFromApi.name,
              token: responseFromApi.token,
              email: responseFromApi.email,
            });
          }
        } catch (error) {
          console.log("There is an error in login process");
        }
      },
    },
  };
};

export default getState;
