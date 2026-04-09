import "./App.css";
import Nav from "./components/nav";
import { Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <main className="mx-auto max-w-6xl px-4 py-10">
              <h1 className="text-2xl font-semibold text-slate-900">
                Welcome
              </h1>
              <p className="mt-2 text-slate-600">
                Go to{" "}
                <a className="font-medium text-slate-900 underline" href="/register">
                  /register
                </a>{" "}
                to create an account.
              </p>
            </main>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
