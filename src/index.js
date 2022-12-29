import store from "./store";

console.log(store.getState());

const unsubs = store.subscribe(() =>
  console.log("Store changed:", store.getState())
);

store.dispatch({
  type: "bugAdded",
  payload: {
    desc: "Bug1",
  },
});

unsubs();

store.dispatch({
  type: "bugRemoved",
  payload: {
    id: "1",
  },
});
