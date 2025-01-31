import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Applayout from "./component/page/AppLayout";
import { FavouriteSong } from "./FavouriteSong";
import { Home } from "./Home";
import './App.css'
import { Play } from "./component/ui/play";
import { song_all_Det } from "./songdetails";

const App = () => {
  const router = createBrowserRouter([
    {   
      path: "/",
      element: <Applayout />,
      children: [ // Fixed property name
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/favourite",
          element: <FavouriteSong/>,
        },
        {
          path: "/Play",
          element: <Play/>,
        },
        {
          path: "/:id",
          element: <Play/>,
          loader:song_all_Det,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
