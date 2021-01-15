import "./App.css";
import NavbarHeader from "./components/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import SignUp from "./components/SignUp";
import Albums from "./components/Albums/Albums";
import Album from "./components/Albums/Album";
import EditAlbum from "./components/Albums/EditAlbum";
import CreateAlbums from "./components/CreateAlbums";
import NotFound from "./components/NotFound";
import AuthRoute from "./components/AuthRoute";
import ReviewAlbum from "./components/Albums/ReviewAlbum";
import DonePage from "./components/Albums/DonePage";

import AuthContextProvider from "./contexts/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <div className="App">
            <NavbarHeader />
            <Switch>
              <AuthRoute exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/done" component={DonePage} />
              <Route exact path="/review/:albumId" component={ReviewAlbum} />
              <AuthRoute exact path="/albums" component={Albums} />
              <AuthRoute exact path="/albums/create" component={CreateAlbums} />
              <AuthRoute exact path="/albums/:albumId" component={Album} />
              <AuthRoute
                exact
                path="/albums/edit/:albumId"
                component={EditAlbum}
              />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
