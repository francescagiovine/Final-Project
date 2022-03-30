const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
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

			Login : async (email, password) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					  },
					  body: JSON.stringify({
						email: email,
						password: password,
					  }),
				};
				try{
					const response = await fetch(process.env.BACKEND_URL + "/api/login", options)
					if (response.status != 200){
						alert('error');
						return false;
					}

					const data = await response.json();
					console.log("dta from backend", response);
					sessionStorage.setItem("token", response.token);
					setStore({token: data.token})
					return true;
				}

				catch(error){
					console.log('error')
				}			 
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("loging out");
				setStore({ token: null});
			}
			

		}
	};
};

export default getState;
