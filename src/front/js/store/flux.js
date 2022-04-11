const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
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

      getMessage: () => {
        const store = getStore();
        const opts = {
          headers: {
            "Authorization": "Bearer " + store.token
          }
        }
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
      getSingleTrip: (id) => {
        fetch(
          "https://3001-francescagiovin-finalpro-m4vz8yo8vlu.ws-eu38.gitpod.io/trip/".concat(
            id
          )
        ).then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log(error);
          }
        });
      },

      syncTokenSessionStore: () => {
        const token = sessionStorage.getItem("token");
        console.log("token stored");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },

      logout: () => {
        sessionStorage.removeItem("token");
        console.log("log out");
        setStore({ token: null });
      },

      //traer el fetch del login aqui (como hice antes)
      login: async (email, password) => {
        try {
          if (email === "" || password === "") {
            setMissingField("Please enter all the fields");
          } else {
            const response = await fetch(
              "https://3001-francescagiovin-finalpro-k48xhblu4u0.ws-eu38.gitpod.io/api/login",
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
            sessionStorage.setItem("token", responseFromApi.token);
            setStore({ token: responseFromApi.token });
          }
        } catch (error) {
          console.log("There is an error in login process");
        }
      },
    },
  };
};

export default getState;
