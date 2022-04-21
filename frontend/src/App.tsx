import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteConstants from "./app/constants/route.constants";
import CreateSellersPage from "./pages/seller/create";
import EditSellersPage from "./pages/seller/edit";
import ListSellersPage from "./pages/seller/list";
import CreateCategoryPage from "./pages/category/create";
import EditCategoryPage from "./pages/category/edit";
import ListCategoryPage from "./pages/category/list";
import Navbar from "./resources/layouts/navbar";

function App() {
	return (
		<BrowserRouter>
			<div className="bg-gray-100 text-gray-900 tracking-wider leading-normal h-screen">
				<Navbar />

				<div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-16">
					<section className="w-full lg:w-5/5">
						<Routes>
							<Route
								path={RouteConstants.ROOT}
								element={<ListSellersPage />}
							/>

							<Route
								path={RouteConstants.LIST_SELLER}
								element={<ListSellersPage />}
							/>

							<Route
								path={RouteConstants.CREATE_SELLER}
								element={<CreateSellersPage />}
							/>

							<Route
								path={RouteConstants.EDIT_SELLER}
								element={<EditSellersPage />}
							/>
							<Route
								path={RouteConstants.LIST_CATEGORY}
								element={<ListCategoryPage />}
							/>

							<Route
								path={RouteConstants.CREATE_CATEGORY}
								element={<CreateCategoryPage />}
							/>

							<Route
								path={RouteConstants.EDIT_CATEGORY}
								element={<EditCategoryPage />}
							/>
						</Routes>
					</section>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
