import { createElement } from "react";

import { MainLayout } from "@/layouts";
import { Route, Routes } from "react-router";

import { routes } from "@/utils/helpers";
import SnackbarChainAlert from "@/components/snackbars/SnackbarChainAlert";
import { SnackbarError } from "@/components/snackbars";
import { useErrors } from "@/stores";

function App() {
  const { isSomethingWrong, setIsSomethingWrong } = useErrors();

  return (
    <>
      <MainLayout>
        <Routes>
          {routes.main.map((route) => (
            <Route key={route.id} path={route.path} element={createElement(route.element)} />
          ))}
        </Routes>
      </MainLayout>

      <SnackbarChainAlert />
      <SnackbarError
        isOpen={!!isSomethingWrong}
        setIsOpen={setIsSomethingWrong}
        text={typeof isSomethingWrong === "string" ? isSomethingWrong : undefined}
      />
    </>
  );
}

export default App;
