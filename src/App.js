import { CssBaseline, makeStyles } from "@material-ui/core";
import Nav from "./components/Nav";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CreateAdForm from "./components/CreateAdForm";
import PopularCategories from "./components/PopularCategories";
import AdCards from "./components/AdCards";
import Footer from "./components/Footer";
import AdDetails from "./components/AdDetails";
import ManageAds from "./components/ManageAds";
import ScrollButton from "./components/ScrollButton";
import Dashboard from "./components/Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  toolbar: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <header>
        <Nav />
      </header>
      <div className={classes.toolbar}></div>
      <main>
        {/* <Login /> */}
        {/* <SignUp /> */}
        {/* <CreateAdForm /> */}
        {/* <PopularCategories /> */}
        {/* <AdCards /> */}
        {/* <AdDetails /> */}
        {/* <ManageAds /> */}
        {/* <Dashboard /> */}
      </main>
      <ScrollButton />
      <Footer />
    </div>
  );
}

export default App;
